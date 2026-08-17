import 'dart:typed_data';

import '../api/frame.dart';
import '../api/lights.dart';
import '../atmosphere/volumetric_media.dart';
import '../core/graph_pass.dart';
import '../core/graph_resource.dart';
import '../core/program_library.dart';
import '../core/program_source.dart';
import '../core/render_feature.dart';
import '../core/render_graph.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import '../webgl/state_cache.dart';
import '../math/vec.dart';
import 'pass_context_impl.dart';
import 'volumetric_light_resources.dart';

final class VolumetricLightProgramSource {
  static const int maxSources = 4;

  /// Optional source uniforms understood by the stock volumetric shader.
  /// They are intentionally not required so hosts may provide a directional-
  /// only shader while still receiving the stable base pass contract.
  static List<String> get sourceUniforms => [
    'uVolumetricSourceCount',
    for (var i = 0; i < maxSources; i++) ...[
      'uSourcePosition$i',
      'uSourceColor$i',
      'uSourceIntensity$i',
      'uSourceReferenceDistance$i',
      'uSourceCutoffDistance$i',
    ],
  ];

  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
  }) => ProgramSource(
    id: 'volumetricLight',
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {},
    samplerUnits: const {'uSceneDepth': 0},
    requiredUniforms: const [
      'uNear',
      'uFar',
      'uLightDir',
      'uLightColor',
      'uShaftIntensity',
      'uFogDensity',
      'uAnisotropy',
      'uViewProjection',
    ],
  );
}

final class VolumetricCompositeProgramSource {
  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
  }) => ProgramSource(
    id: 'volumetricComposite',
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {},
    samplerUnits: const {'uVolumetric': 0},
    requiredUniforms: const ['uVolumetricStrength'],
  );
}

/// Volumetric Light Shaft and atmospheric in-scattering pass in PixelDart.
final class VolumetricLightFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final String? compositeFragmentSource;
  final GpuDevice device;
  final GpuObject Function() resolveSceneDepth;
  final CameraView Function() resolveCamera;
  final ResourceRef volumetricLightResource;
  final ResourceRef sceneDepthResource;
  final ResourceRef? sceneColorResource;
  final ResourceRef? sceneColorOutputResource;
  final List<GpuObject> _emptyVaos = [];

  VolumetricLightFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    this.compositeFragmentSource,
    required this.device,
    required this.resolveSceneDepth,
    required this.resolveCamera,
    this.sceneDepthResource = const ResourceRef(
      name: 'sceneDepth', format: ResourceFormat.depth24, width: 384, height: 216,
    ),
    this.sceneColorResource,
    this.sceneColorOutputResource,
    this.volumetricLightResource = VolumetricLightResources.volumetricLight,
  });

  @override
  String get id => 'volumetricLight';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(
        id: 'volumetricLight',
        stage: GraphStage.afterDepth,
        uses: [
          ResourceUse(sceneDepthResource, ResourceAccess.read),
          ResourceUse(volumetricLightResource, ResourceAccess.write),
        ],
      ),
    );
    if (sceneColorResource != null && sceneColorOutputResource != null) {
      graph.addPass(
        PassDeclaration(
          id: 'volumetricComposite',
          stage: GraphStage.afterResolve,
          uses: [
            ResourceUse(volumetricLightResource, ResourceAccess.read),
            ResourceUse(sceneColorResource!, ResourceAccess.read),
            ResourceUse(sceneColorOutputResource!, ResourceAccess.write),
          ],
        ),
      );
    }
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    final program = programLibrary.publish(
      VolumetricLightProgramSource.build(
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
      ),
    );
    final emptyVao = device.createVertexArray();
    _emptyVaos.add(emptyVao);
    final passes = <RenderPass>[
      _VolumetricLightPass(
        descriptor: PassDescriptor(
          id: 'volumetricLight',
          stage: GraphStage.afterDepth,
          uses: [
            ResourceUse(sceneDepthResource, ResourceAccess.read),
            ResourceUse(volumetricLightResource, ResourceAccess.write),
          ],
          depthTest: false,
          depthWrite: false,
          cullEnable: false,
        ),
        program: program,
        emptyVao: emptyVao,
        destResourceName: volumetricLightResource.name,
        resolveSceneDepth: resolveSceneDepth,
        resolveCamera: resolveCamera,
      ),
    ];
    final compositeSource = compositeFragmentSource;
    final sceneColor = sceneColorResource;
    final sceneColorOutput = sceneColorOutputResource;
    if (compositeSource != null && sceneColor != null && sceneColorOutput != null) {
      final compositeProgram = programLibrary.publish(
        VolumetricCompositeProgramSource.build(
          vertexSource: vertexSource,
          fragmentSource: compositeSource,
        ),
      );
      final compositeVao = device.createVertexArray();
      _emptyVaos.add(compositeVao);
      passes.add(
        _VolumetricCompositePass(
          descriptor: PassDescriptor(
            id: 'volumetricComposite',
            stage: GraphStage.afterResolve,
            uses: [
              ResourceUse(volumetricLightResource, ResourceAccess.read),
              ResourceUse(sceneColor, ResourceAccess.read),
              ResourceUse(sceneColorOutput, ResourceAccess.write),
            ],
            depthTest: false,
            depthWrite: false,
            cullEnable: false,
            blendEnable: true,
          ),
          program: compositeProgram,
          emptyVao: compositeVao,
          volumetricLightResource: volumetricLightResource,
          outputResource: sceneColorOutput,
        ),
      );
    }
    return passes;
  }

  @override
  void dispose() {
    for (final vao in _emptyVaos) {
      device.deleteVertexArray(vao);
    }
    _emptyVaos.clear();
  }
}

final class _VolumetricLightPass implements RenderPass {
  @override
  final PassDescriptor descriptor;

  final CompiledProgram program;
  final GpuObject emptyVao;
  final String destResourceName;
  final GpuObject Function() resolveSceneDepth;
  final CameraView Function() resolveCamera;

  const _VolumetricLightPass({
    required this.descriptor,
    required this.program,
    required this.emptyVao,
    required this.destResourceName,
    required this.resolveSceneDepth,
    required this.resolveCamera,
  });

  @override
  void execute(RenderPassContext context) {
    final view = context.viewOf(destResourceName) as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;
    final cam = resolveCamera();
    final environment = context.frameScene.environment as FrameEnvironment;
    final directional = environment.directionalLight;

    encoder.bindTarget(view.gpuObject);
    encoder.applyDrawState(descriptor.toDrawState());
    encoder.clear(ClearMask.colorOnly);
    encoder.useProgram(program.handle);

    encoder.bindTexture(0, resolveSceneDepth());
    encoder.setUniform('uSceneDepth', const UniformValue.sampler(0));
    encoder.setUniform('uNear', UniformValue.float1(cam.near));
    encoder.setUniform('uFar', UniformValue.float1(cam.far));
    encoder.setUniform(
      'uViewProjection',
      UniformValue.mat4(Float32List.fromList(cam.viewProjection.m)),
    );
    encoder.setUniform(
      'uShaftIntensity',
      UniformValue.float1(
        directional == null ? 0.0 : directional.intensity * 0.15,
      ),
    );
    encoder.setUniform(
      'uFogDensity',
      UniformValue.float1(environment.fogDensity ?? 0.0),
    );
    encoder.setUniform('uAnisotropy', const UniformValue.float1(0.70));
    final lightDirection = directional?.direction.normalized ?? Vec3.unitY;
    final lightColor = directional?.color ?? LinearColor.black;
    encoder.setUniform(
      'uLightDir',
      UniformValue.float3(
        Float32List.fromList([
          lightDirection.x,
          lightDirection.y,
          lightDirection.z,
        ]),
      ),
    );
    encoder.setUniform(
      'uLightColor',
      UniformValue.float3(
        Float32List.fromList([lightColor.r, lightColor.g, lightColor.b]),
      ),
    );
    final sources = selectVolumetricSources(
      sources: environment.volumetricSources,
      referencePosition: cam.eye,
      limit: VolumetricLightProgramSource.maxSources,
    );
    encoder.setUniform(
      'uVolumetricSourceCount',
      UniformValue.float1(sources.length.toDouble()),
    );
    for (var i = 0; i < VolumetricLightProgramSource.maxSources; i++) {
      final source = i < sources.length ? sources[i] : null;
      final position = source?.position ?? Vec3.zero;
      final color = source?.color ?? Vec3.zero;
      encoder.setUniform(
        'uSourcePosition$i',
        UniformValue.float3(
          Float32List.fromList([position.x, position.y, position.z]),
        ),
      );
      encoder.setUniform(
        'uSourceColor$i',
        UniformValue.float3(Float32List.fromList([color.x, color.y, color.z])),
      );
      encoder.setUniform(
        'uSourceIntensity$i',
        UniformValue.float1(source?.luminousIntensity ?? 0),
      );
      encoder.setUniform(
        'uSourceReferenceDistance$i',
        UniformValue.float1(source?.referenceDistance ?? 1),
      );
      encoder.setUniform(
        'uSourceCutoffDistance$i',
        UniformValue.float1(source?.cutoffDistance ?? 1),
      );
    }

    encoder.bindVertexArray(emptyVao);
    encoder.drawArrays(first: 0, count: 3);
  }
}

final class _VolumetricCompositePass implements RenderPass {
  @override
  final PassDescriptor descriptor;
  final CompiledProgram program;
  final GpuObject emptyVao;
  final ResourceRef volumetricLightResource;
  final ResourceRef outputResource;

  const _VolumetricCompositePass({
    required this.descriptor,
    required this.program,
    required this.emptyVao,
    required this.volumetricLightResource,
    required this.outputResource,
  });

  @override
  void execute(RenderPassContext context) {
    final output = context.viewOfResource(outputResource) as BoundResourceView;
    final source = context.viewOfResource(volumetricLightResource)
        as BoundResourceView;
    final encoder = context.commandEncoder as DrawCommandEncoder;
    encoder.bindTarget(output.gpuObject);
    // The scene-color target normally carries a second emissive attachment;
    // this additive pass writes only the lighting attachment.
    encoder.setColorAttachmentCount(1);
    encoder.applyDrawState(
      const DrawStateDescriptor(
        depthTest: false,
        depthWrite: false,
        cullEnable: false,
        blendEnable: true,
        blendSrc: BlendFactor.one,
        blendDst: BlendFactor.one,
        blendEquation: BlendEquation.add,
      ),
    );
    encoder.useProgram(program.handle);
    encoder.bindTexture(0, source.gpuObject);
    encoder.setUniform('uVolumetric', const UniformValue.sampler(0));
    encoder.setUniform('uVolumetricStrength', const UniformValue.float1(1.0));
    encoder.bindVertexArray(emptyVao);
    encoder.drawArrays(first: 0, count: 3);
  }
}
