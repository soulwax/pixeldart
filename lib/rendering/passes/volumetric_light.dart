import 'dart:typed_data';

import '../api/frame.dart';
import '../api/lights.dart';
import '../core/graph_pass.dart';
import '../core/graph_resource.dart';
import '../core/program_library.dart';
import '../core/program_source.dart';
import '../core/render_feature.dart';
import '../core/render_graph.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import '../math/vec.dart';
import 'pass_context_impl.dart';
import 'volumetric_light_resources.dart';

final class VolumetricLightProgramSource {
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
    ],
  );
}

/// Volumetric Light Shaft and atmospheric in-scattering pass in PixelDart.
final class VolumetricLightFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final GpuDevice device;
  final GpuObject Function() resolveSceneDepth;
  final CameraView Function() resolveCamera;
  final ResourceRef volumetricLightResource;

  VolumetricLightFeature({
    required this.programLibrary,
    required this.vertexSource,
    required this.fragmentSource,
    required this.device,
    required this.resolveSceneDepth,
    required this.resolveCamera,
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
        uses: [ResourceUse(volumetricLightResource, ResourceAccess.write)],
      ),
    );
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
    return [
      _VolumetricLightPass(
        descriptor: PassDescriptor(
          id: 'volumetricLight',
          stage: GraphStage.afterDepth,
          uses: [ResourceUse(volumetricLightResource, ResourceAccess.write)],
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
  }

  @override
  void dispose() {}
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

    encoder.bindVertexArray(emptyVao);
    encoder.drawArrays(first: 0, count: 3);
  }
}
