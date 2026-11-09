import 'dart:typed_data';

import '../api/handles.dart';
import '../api/settings.dart';
import '../api/shaders.dart';
import '../core/frame_queue.dart';
import '../core/graph_pass.dart';
import '../core/graph_resource.dart';
import '../core/program_library.dart';
import '../core/program_source.dart';
import '../core/render_feature.dart';
import '../core/render_graph.dart';
import '../sprites/sprite_batch.dart';
import '../sprites/sprite_encoder.dart';
import '../webgl/device_api.dart';
import '../webgl/draw_encoder.dart';
import '../webgl/generated_shaders.dart';
import '../webgl/state_cache.dart';
import 'pass_context_impl.dart';

final class SpriteProgramSource {
  static ProgramSource build({
    required String vertexSource,
    required String fragmentSource,
    String id = 'sprites',
  }) => ProgramSource(
    id: id,
    vertexSource: vertexSource,
    fragmentSource: fragmentSource,
    attributeLocations: const {
      'aCorner': 0,
      'aAxes': 1,
      'aOrigin': 2,
      'aUv': 3,
      'aColor': 4,
      'aParams': 5,
    },
    samplerUnits: const {'uTex': 0},
    requiredUniforms: const [
      'uViewProjection',
      'uTex',
      'uLinearize',
      'uMultiply',
    ],
  );
}

const int spriteEvictionFrames = 300;

const int _streamBufferCount = 3;
const int _minStreamBytes = 64 * 1024;

const int _recordWords = SpriteBatch.recordBytes ~/ 4;

const DrawStateDescriptor _alpha = DrawStateDescriptor(
  depthTest: false,
  depthWrite: false,
  blendEnable: true,
  blendSrc: BlendFactor.one,
  blendDst: BlendFactor.oneMinusSrcAlpha,
  cullEnable: false,
);
const DrawStateDescriptor _alphaDepth = DrawStateDescriptor(
  depthFunc: DepthFunc.lessEqual,
  depthWrite: false,
  blendEnable: true,
  blendSrc: BlendFactor.one,
  blendDst: BlendFactor.oneMinusSrcAlpha,
  cullEnable: false,
);
const DrawStateDescriptor _multiply = DrawStateDescriptor(
  depthTest: false,
  depthWrite: false,
  blendEnable: true,
  blendSrc: BlendFactor.zero,
  blendDst: BlendFactor.srcColor,
  cullEnable: false,
);
const DrawStateDescriptor _multiplyDepth = DrawStateDescriptor(
  depthFunc: DepthFunc.lessEqual,
  depthWrite: false,
  blendEnable: true,
  blendSrc: BlendFactor.zero,
  blendDst: BlendFactor.srcColor,
  cullEnable: false,
);

final class _SpriteVertices {
  final GpuObject vao;
  final GpuObject buffer;
  final int byteCapacity;
  int offset = -1;

  _SpriteVertices(this.vao, this.buffer, this.byteCapacity);
}

final class _BatchEntry {
  int version = -1;
  int lastFrame = -1;
  bool isRetained = false;
  _SpriteVertices? retained;
}

final class SpritesFeature implements RenderFeature {
  final ProgramLibrary programLibrary;
  final String vertexSource;
  final String fragmentSource;
  final GpuDevice device;
  final SpriteSubmissions submissions;
  final GpuObject Function(TextureHandle? texture) resolveTexture;
  final ResourceRef sceneColorResource;
  final ColorEncoding outputEncoding;

  final bool clearGlow;

  /// Registered per-draw shaders to build along with this feature's passes.
  final Map<ShaderHandle, ShaderOverride> registeredShaders;

  final Map<ShaderHandle, CompiledProgram> _shaderPrograms = {};
  CompiledProgram? _program;
  GpuObject? _quad;
  final Map<SpriteBatch, _BatchEntry> _entries = {};
  final List<_SpriteVertices?> _worldRing = List.filled(
    _streamBufferCount,
    null,
  );
  final List<_SpriteVertices?> _overlayRing = List.filled(
    _streamBufferCount,
    null,
  );
  int _worldNext = 0;
  int _overlayNext = 0;
  int _frame = 0;
  Int32List _offsets = Int32List(64);
  late final SpritesOverlayFeature overlay = SpritesOverlayFeature._(this);

  SpritesFeature({
    required this.programLibrary,
    this.vertexSource = spriteVertSrc,
    this.fragmentSource = spriteFragSrc,
    required this.device,
    required this.submissions,
    required this.resolveTexture,
    required this.sceneColorResource,
    this.outputEncoding = ColorEncoding.srgb,
    this.clearGlow = false,
    this.registeredShaders = const {},
  });

  /// Compiles [shader] for draws that select [handle]. With [allowFallback],
  /// a failure draws with the built-in sprite shader and is reported through
  /// `shaderErrors`; without it the failure is thrown.
  void publishShader(
    ShaderHandle handle,
    ShaderOverride shader, {
    bool allowFallback = false,
  }) {
    _shaderPrograms[handle] = programLibrary.publishVariant(
      source: SpriteProgramSource.build(
        vertexSource: spriteVertSrc,
        fragmentSource: spriteFragSrc,
        id: 'sprites#${handle.id}',
      ),
      target: handle,
      variant: shader,
      allowFallback: allowFallback,
    );
  }

  void releaseShader(ShaderHandle handle) {
    _shaderPrograms.remove(handle);
    programLibrary.releaseVariant(handle);
  }

  int get retainedCount {
    var count = 0;
    for (final entry in _entries.values) {
      if (entry.retained != null) count += 1;
    }
    return count;
  }

  static const String _passId = 'worldSprites';

  List<ResourceUse> get _uses => [
    ResourceUse(sceneColorResource, ResourceAccess.append),
  ];

  @override
  String get id => 'sprites';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      PassDeclaration(id: _passId, stage: GraphStage.afterWorld, uses: _uses),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) {
    _program = programLibrary.publish(
      SpriteProgramSource.build(
        vertexSource: vertexSource,
        fragmentSource: fragmentSource,
      ),
    );
    // A shader that compiled once must not be able to block a resize or a
    // context restore.
    registeredShaders.forEach(
      (handle, shader) => publishShader(handle, shader, allowFallback: true),
    );
    final quad = device.createBuffer(
      const GpuBufferDescriptor(
        byteLength: 48,
        usage: GpuBufferUsage.staticDraw,
      ),
    );
    device.uploadBuffer(
      quad,
      Float32List.fromList(const [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
    );
    _quad = quad;
    return [
      _WorldSpritesPass(
        this,
        PassDescriptor(
          id: _passId,
          stage: GraphStage.afterWorld,
          uses: _uses,
          depthTest: false,
          depthWrite: false,
          blendEnable: true,
          cullEnable: false,
        ),
      ),
    ];
  }

  void _runWorld(RenderPassContext context) {
    _frame += 1;
    final hasSprites = _stageHasSprites(SpriteStage.world);
    if (clearGlow || hasSprites) {
      final view = context.viewOf(sceneColorResource.name) as BoundResourceView;
      final encoder = context.commandEncoder as DrawCommandEncoder;
      encoder.bindTarget(view.gpuObject);
      // Earlier composites narrow this target to one draw buffer.
      encoder.setColorAttachmentCount(2);
      if (clearGlow) {
        encoder.applyDrawState(_alpha);
        device.clearColorAttachment(1);
      }
      if (hasSprites) {
        _draw(
          encoder,
          SpriteStage.world,
          linearize: outputEncoding == ColorEncoding.srgb,
        );
      }
    }
    if (_frame % 60 == 0) _evict();
  }

  void _runOverlay(RenderPassContext context) {
    if (!_stageHasSprites(SpriteStage.overlay)) return;
    final encoder = context.commandEncoder as DrawCommandEncoder;
    encoder.bindTarget(null);
    _draw(encoder, SpriteStage.overlay, linearize: false);
  }

  bool _stageHasSprites(SpriteStage stage) {
    for (var i = 0; i < submissions.spriteCount; i += 1) {
      if (submissions.spriteAt(i).stage == stage) return true;
    }
    return false;
  }

  void _draw(
    DrawCommandEncoder encoder,
    SpriteStage stage, {
    required bool linearize,
  }) {
    final count = submissions.spriteCount;
    if (_offsets.length < count) _offsets = Int32List(count * 2);
    final offsets = _offsets;

    var streamBytes = 0;
    for (var i = 0; i < count; i += 1) {
      final submission = submissions.spriteAt(i);
      if (submission.stage != stage) continue;
      final batch = submission.batch..prepare();
      final entry = _update(batch);
      if (entry.isRetained) {
        offsets[i] = -1;
      } else {
        offsets[i] = streamBytes;
        streamBytes += batch.length * SpriteBatch.recordBytes;
      }
    }

    final stream = streamBytes > 0 ? _nextStream(stage, streamBytes) : null;
    if (stream != null) {
      for (var i = 0; i < count; i += 1) {
        if (offsets[i] < 0) continue;
        final submission = submissions.spriteAt(i);
        if (submission.stage != stage) continue;
        final batch = submission.batch;
        device.uploadBuffer(
          stream.buffer,
          Float32List.sublistView(
            batch.records,
            0,
            batch.length * _recordWords,
          ),
          dstByteOffset: offsets[i],
        );
      }
    }

    CompiledProgram? boundProgram;
    GpuObject? boundTexture;
    DrawStateDescriptor? boundState;
    Float32List? boundProjection;
    var multiply = -1;

    for (var i = 0; i < count; i += 1) {
      final submission = submissions.spriteAt(i);
      if (submission.stage != stage) continue;
      final selected = submission.shader;
      final program = selected == null
          ? _program!
          : _shaderPrograms[selected] ?? _program!;
      if (!identical(program, boundProgram)) {
        // Uniforms belong to the program, so a switch sets them again.
        encoder.useProgram(program.handle);
        encoder.setUniform('uTex', const UniformValue.sampler(0));
        encoder.setUniform(
          'uLinearize',
          UniformValue.float1(linearize ? 1 : 0),
        );
        boundProgram = program;
        boundProjection = null;
        multiply = -1;
      }
      final batch = submission.batch;
      final vertices = offsets[i] < 0 ? _entries[batch]!.retained! : stream!;
      final base = offsets[i] < 0 ? 0 : offsets[i];
      final projection = submission.viewProjection;
      if (boundProjection == null ||
          !_sameProjection(boundProjection, projection)) {
        encoder.setUniform('uViewProjection', UniformValue.mat4(projection));
        boundProjection = projection;
      }
      encoder.bindVertexArray(vertices.vao);
      final useDepth = submission.depthTest && stage == SpriteStage.world;

      for (var run = 0; run < batch.runCount; run += 1) {
        final isMultiply = batch.runBlend(run) == SpriteBlend.multiply;
        final state = isMultiply
            ? (useDepth ? _multiplyDepth : _multiply)
            : (useDepth ? _alphaDepth : _alpha);
        if (!identical(state, boundState)) {
          encoder.applyDrawState(state);
          boundState = state;
        }
        final wanted = isMultiply ? 1 : 0;
        if (wanted != multiply) {
          encoder.setUniform(
            'uMultiply',
            UniformValue.float1(wanted.toDouble()),
          );
          multiply = wanted;
        }
        final texture = resolveTexture(batch.runTexture(run));
        if (!identical(texture, boundTexture)) {
          encoder.bindTexture(0, texture);
          boundTexture = texture;
        }
        _pointInstances(
          vertices,
          base + batch.runFirst(run) * SpriteBatch.recordBytes,
        );
        encoder.drawArraysInstanced(
          first: 0,
          count: 6,
          instanceCount: batch.runLength(run),
        );
      }
    }
  }

  static bool _sameProjection(Float32List a, Float32List b) {
    for (var i = 0; i < 16; i += 1) {
      if (a[i] != b[i]) return false;
    }
    return true;
  }

  _BatchEntry _update(SpriteBatch batch) {
    final entry = _entries.putIfAbsent(batch, _BatchEntry.new);
    if (entry.lastFrame == _frame) return entry;
    final unchanged = entry.lastFrame >= 0 && entry.version == batch.version;
    entry.lastFrame = _frame;
    if (entry.version != batch.version || !unchanged) {
      entry.version = batch.version;
      _dropRetained(entry);
      entry.isRetained = false;
      return entry;
    }
    if (entry.retained == null) {
      final bytes = batch.length * SpriteBatch.recordBytes;
      final buffer = device.createBuffer(
        GpuBufferDescriptor(
          byteLength: bytes,
          usage: GpuBufferUsage.staticDraw,
        ),
      );
      device.uploadBuffer(
        buffer,
        Float32List.sublistView(batch.records, 0, batch.length * _recordWords),
      );
      entry.retained = _createVertices(buffer, bytes);
    }
    entry.isRetained = true;
    return entry;
  }

  _SpriteVertices _nextStream(SpriteStage stage, int bytes) {
    final ring = stage == SpriteStage.world ? _worldRing : _overlayRing;
    final index = stage == SpriteStage.world ? _worldNext : _overlayNext;
    if (stage == SpriteStage.world) {
      _worldNext = (index + 1) % _streamBufferCount;
    } else {
      _overlayNext = (index + 1) % _streamBufferCount;
    }
    final existing = ring[index];
    if (existing != null && existing.byteCapacity >= bytes) return existing;
    if (existing != null) _deleteVertices(existing);
    final capacity = bytes + bytes ~/ 2 > _minStreamBytes
        ? bytes + bytes ~/ 2
        : _minStreamBytes;
    final buffer = device.createBuffer(
      GpuBufferDescriptor(
        byteLength: capacity,
        usage: GpuBufferUsage.streamDraw,
      ),
    );
    return ring[index] = _createVertices(buffer, capacity);
  }

  _SpriteVertices _createVertices(GpuObject buffer, int byteCapacity) {
    final vao = device.createVertexArray();
    device.bindVertexArray(vao);
    device.bindArrayBuffer(_quad!);
    device.vertexAttribPointer(
      location: 0,
      componentCount: 2,
      strideBytes: 8,
      offsetBytes: 0,
    );
    device.enableVertexAttribArray(0);
    device.vertexAttribDivisor(0, 0);
    for (var location = 1; location <= 5; location += 1) {
      device.enableVertexAttribArray(location);
      device.vertexAttribDivisor(location, 1);
    }
    return _SpriteVertices(vao, buffer, byteCapacity);
  }

  void _pointInstances(_SpriteVertices vertices, int offset) {
    if (vertices.offset == offset) return;
    vertices.offset = offset;
    const stride = SpriteBatch.recordBytes;
    device.bindArrayBuffer(vertices.buffer);
    device.vertexAttribPointer(
      location: 1,
      componentCount: 4,
      strideBytes: stride,
      offsetBytes: offset,
    );
    device.vertexAttribPointer(
      location: 2,
      componentCount: 3,
      strideBytes: stride,
      offsetBytes: offset + 16,
    );
    device.vertexAttribPointer(
      location: 3,
      componentCount: 4,
      strideBytes: stride,
      offsetBytes: offset + 28,
      format: GpuAttribFormat.unorm16,
    );
    device.vertexAttribPointer(
      location: 4,
      componentCount: 4,
      strideBytes: stride,
      offsetBytes: offset + 36,
      format: GpuAttribFormat.unorm8,
    );
    device.vertexAttribPointer(
      location: 5,
      componentCount: 4,
      strideBytes: stride,
      offsetBytes: offset + 40,
      format: GpuAttribFormat.unorm8,
    );
  }

  void _deleteVertices(_SpriteVertices vertices) {
    device.deleteVertexArray(vertices.vao);
    device.deleteBuffer(vertices.buffer);
  }

  void _dropRetained(_BatchEntry entry) {
    final retained = entry.retained;
    if (retained == null) return;
    _deleteVertices(retained);
    entry.retained = null;
  }

  void _evict() {
    final oldest = _frame - spriteEvictionFrames;
    _entries.removeWhere((_, entry) {
      if (entry.lastFrame >= oldest) return false;
      _dropRetained(entry);
      return true;
    });
  }

  @override
  void dispose() {
    for (final entry in _entries.values) {
      _dropRetained(entry);
    }
    _entries.clear();
    for (final ring in [_worldRing, _overlayRing]) {
      for (var i = 0; i < ring.length; i += 1) {
        final vertices = ring[i];
        if (vertices != null) _deleteVertices(vertices);
        ring[i] = null;
      }
    }
    final quad = _quad;
    if (quad != null) device.deleteBuffer(quad);
    _quad = null;
  }
}

final class SpritesOverlayFeature implements RenderFeature {
  final SpritesFeature _parent;
  SpritesOverlayFeature._(this._parent);

  // Named so `SceneRenderer.endFrame`'s per-pass "world" stats include it.
  static const String _passId = 'worldSpritesOverlay';

  @override
  String get id => 'spritesOverlay';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    graph.addPass(
      const PassDeclaration(
        id: _passId,
        stage: GraphStage.beforePresent,
        uses: [],
      ),
    );
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) => [
    _OverlaySpritesPass(
      _parent,
      const PassDescriptor(
        id: _passId,
        stage: GraphStage.beforePresent,
        uses: [],
        depthTest: false,
        depthWrite: false,
        blendEnable: true,
        cullEnable: false,
      ),
    ),
  ];

  @override
  void dispose() {}
}

final class _WorldSpritesPass implements RenderPass {
  final SpritesFeature _feature;
  @override
  final PassDescriptor descriptor;
  _WorldSpritesPass(this._feature, this.descriptor);

  @override
  void execute(RenderPassContext context) => _feature._runWorld(context);
}

final class _OverlaySpritesPass implements RenderPass {
  final SpritesFeature _feature;
  @override
  final PassDescriptor descriptor;
  _OverlaySpritesPass(this._feature, this.descriptor);

  @override
  void execute(RenderPassContext context) => _feature._runOverlay(context);
}
