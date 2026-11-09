import 'dart:typed_data';

import '../math/mat4.dart';
import '../webgl/device_api.dart';
import '../webgl/generated_shaders.dart';
import 'handles.dart';
import 'lights.dart';

/// Something host shader values can be bound to: a built-in [ShaderSlot], a
/// registered sprite [ShaderHandle], or a named [PostEffect].
sealed class ShaderTarget {
  /// The built-in pass whose input and output contract this target follows.
  ShaderSlot get contract;

  /// How errors name this target.
  String get label;
}

/// A sprite shader from `registerSpriteShader`, chosen per draw.
final class ShaderHandle implements ShaderTarget {
  final int id;
  final String? debugLabel;
  const ShaderHandle(this.id, [this.debugLabel]);

  @override
  ShaderSlot get contract => ShaderSlot.sprites;

  @override
  String get label => 'sprite shader ${debugLabel ?? id}';

  @override
  bool operator ==(Object other) => other is ShaderHandle && other.id == id;

  @override
  int get hashCode => id.hashCode;
}

/// A material shader compiled for one world pipeline contract.
///
/// A handle registered under the other world contract uses the built-in
/// shader until its `safeWorld` or `shadowedWorld` pipeline is active again.
final class WorldShaderHandle implements ShaderTarget {
  final int id;
  @override
  final ShaderSlot contract;
  final String? debugLabel;

  const WorldShaderHandle(this.id, this.contract, [this.debugLabel]);

  @override
  String get label => 'world shader ${debugLabel ?? id}';

  @override
  bool operator ==(Object other) =>
      other is WorldShaderHandle && other.id == id;

  @override
  int get hashCode => id.hashCode;
}

/// A host post-process stage, named by its key in
/// `RendererConfiguration.postEffects`.
final class PostEffect implements ShaderTarget {
  final String name;
  const PostEffect(this.name);

  @override
  ShaderSlot get contract => ShaderSlot.grade;

  @override
  String get label => 'post effect $name';

  @override
  bool operator ==(Object other) => other is PostEffect && other.name == name;

  @override
  int get hashCode => name.hashCode;
}

enum ShaderSlot implements ShaderTarget {
  safeWorld,
  texturedWorld,
  shadowedWorld,
  shadowCaster,
  depthPrepass,
  depthDebug,
  sprites,
  ssaoOcclusion,
  ssaoBlur,
  volumetricLight,
  volumetricComposite,
  bloomBlurH,
  bloomBlurV,
  bloomComposite,
  dofBlurH,
  dofBlurV,
  dofComposite,
  grade,
  ps1Quantize,
  vhs,
  present;

  @override
  ShaderSlot get contract => this;

  @override
  String get label => name;

  static ShaderSlot? forProgramId(String id) {
    for (final slot in values) {
      if (slot.name == id) return slot;
    }
    return null;
  }

  /// The sampler a [ShaderOverride.effect] filters in this slot, or null when
  /// the slot has no single scene-color input to filter.
  String? get effectInput => switch (this) {
    grade || ps1Quantize || vhs => 'uScene',
    dofComposite => 'uSharp',
    sprites => 'uTex',
    _ => null,
  };
}

/// An immutable value for a host-declared GLSL uniform.
final class ShaderUniform {
  final String glslType;
  final double x, y, z, w;
  final int? integer;
  final Float32List? _matrix;

  const ShaderUniform.float(double value)
    : glslType = 'float',
      x = value,
      y = 0,
      z = 0,
      w = 0,
      integer = null,
      _matrix = null;
  const ShaderUniform.vec2(this.x, this.y)
    : glslType = 'vec2',
      z = 0,
      w = 0,
      integer = null,
      _matrix = null;
  const ShaderUniform.vec3(this.x, this.y, this.z)
    : glslType = 'vec3',
      w = 0,
      integer = null,
      _matrix = null;
  const ShaderUniform.vec4(this.x, this.y, this.z, this.w)
    : glslType = 'vec4',
      integer = null,
      _matrix = null;
  const ShaderUniform.int(int value)
    : glslType = 'int',
      x = 0,
      y = 0,
      z = 0,
      w = 0,
      integer = value,
      _matrix = null;

  ShaderUniform._mat4(this._matrix)
    : glslType = 'mat4',
      x = 0,
      y = 0,
      z = 0,
      w = 0,
      integer = null;

  /// Captures [matrix] now; later edits to it cannot change the bound value.
  factory ShaderUniform.mat4(Mat4 matrix) =>
      ShaderUniform._mat4(Float32List.fromList(matrix.m));

  /// A `vec3` holding [color]'s linear red, green and blue.
  factory ShaderUniform.color(LinearColor color) =>
      ShaderUniform.vec3(color.r, color.g, color.b);

  UniformValue toUniformValue() => switch (glslType) {
    'float' => UniformValue.float1(x),
    'vec2' => UniformValue.float2(Float32List.fromList([x, y])),
    'vec3' => UniformValue.float3(Float32List.fromList([x, y, z])),
    'vec4' => UniformValue.float4(Float32List.fromList([x, y, z, w])),
    'int' => UniformValue.int1(integer!),
    _ => UniformValue.mat4(Float32List.fromList(_matrix!)),
  };

  @override
  bool operator ==(Object other) =>
      other is ShaderUniform &&
      other.glslType == glslType &&
      other.x == x &&
      other.y == y &&
      other.z == z &&
      other.w == w &&
      other.integer == integer &&
      _sameMatrix(other._matrix, _matrix);

  @override
  int get hashCode => Object.hash(
    glslType,
    x,
    y,
    z,
    w,
    integer,
    _matrix == null ? null : Object.hashAll(_matrix),
  );

  @override
  String toString() => switch (glslType) {
    'int' => 'ShaderUniform.int($integer)',
    'mat4' => 'ShaderUniform.mat4($_matrix)',
    _ => 'ShaderUniform.$glslType($x, $y, $z, $w)',
  };

  static bool _sameMatrix(Float32List? a, Float32List? b) {
    if (identical(a, b)) return true;
    if (a == null || b == null) return false;
    for (var i = 0; i < 16; i += 1) {
      if (a[i] != b[i]) return false;
    }
    return true;
  }
}

final class ShaderOverride {
  /// Filled by the renderer in any override that declares it:
  /// `uniform float pdTime`, the frame time in seconds.
  static const String timeUniform = 'pdTime';

  /// Filled by the renderer in any override that declares it:
  /// `uniform vec2 pdResolution`, the internal render size in pixels.
  static const String resolutionUniform = 'pdResolution';

  /// Host textures take texture units 8 to 15, above every engine sampler.
  static const int firstTextureUnit = 8;
  static const int maxTextures = 8;

  final String? vertex;
  final String? fragment;

  /// GLSL defining `vec4 effect(vec4 color, vec2 uv)`, the whole body of a
  /// post-process fragment stage. See [ShaderOverride.effect].
  final String? effect;

  /// Starting values for uniforms the override declares. Change them later
  /// with `setShaderUniform`, which never recompiles.
  final Map<String, ShaderUniform> uniforms;

  /// Textures for `sampler2D` uniforms the override declares.
  final Map<String, TextureHandle> textures;

  const ShaderOverride({
    this.vertex,
    this.fragment,
    this.uniforms = const {},
    this.textures = const {},
  }) : effect = null;

  /// A post-process filter written as one GLSL function:
  ///
  /// ```dart
  /// ShaderOverride.effect('''
  ///   vec4 effect(vec4 color, vec2 uv) {
  ///     return vec4(color.rgb * uTint, color.a);
  ///   }
  /// ''', uniforms: {'uTint': ShaderUniform.vec3(1, 0.8, 0.6)})
  /// ```
  ///
  /// [uniforms] and [textures] are declared for you, along with `pdTime`,
  /// `pdResolution` and `pdSource` (the slot's input sampler, for extra taps).
  /// Valid for the slots with a [ShaderSlot.effectInput], and for sprite
  /// shaders and post effects. On sprites, `color` is the tinted texel before
  /// premultiplication and `uv` is the atlas coordinate.
  const ShaderOverride.effect(
    String this.effect, {
    this.uniforms = const {},
    this.textures = const {},
  }) : vertex = null,
       fragment = null;

  /// The fragment stage to compile for [slot]: [fragment], or the source
  /// generated from [effect]. Null when neither applies.
  String? fragmentFor(ShaderSlot slot) {
    final body = effect;
    if (body == null) return fragment;
    final input = slot.effectInput;
    if (input == null) return null;
    final host = StringBuffer();
    for (final entry in uniforms.entries) {
      host.writeln('uniform ${entry.value.glslType} ${entry.key};');
    }
    for (final name in textures.keys) {
      host.writeln('uniform sampler2D $name;');
    }
    // Compile errors report line numbers from the host's own snippet.
    host
      ..writeln('#line 1')
      ..write(body);
    final template = slot == ShaderSlot.sprites
        ? spriteEffectFragSrc
        : hostEffectFragSrc;
    return template
        .replaceAll('PD_INPUT', input)
        .replaceFirst('// PD_HOST_CODE', host.toString());
  }

  /// Whether [other] compiles to the same program; only bound values differ.
  bool sameStages(ShaderOverride other) =>
      other.vertex == vertex &&
      other.fragment == fragment &&
      other.effect == effect &&
      (effect == null ||
          (_sameKeys(other.uniforms, uniforms) &&
              _sameKeys(other.textures, textures) &&
              uniforms.entries.every(
                (entry) =>
                    other.uniforms[entry.key]!.glslType == entry.value.glslType,
              )));

  void validate() {
    if (vertex == null && fragment == null && effect == null) {
      throw ArgumentError('ShaderOverride needs a vertex or fragment source');
    }
    if (vertex != null && vertex!.trim().isEmpty) {
      throw ArgumentError('ShaderOverride.vertex must not be empty');
    }
    if (fragment != null && fragment!.trim().isEmpty) {
      throw ArgumentError('ShaderOverride.fragment must not be empty');
    }
    if (effect != null && effect!.trim().isEmpty) {
      throw ArgumentError('ShaderOverride.effect must not be empty');
    }
    if (textures.length > maxTextures) {
      throw ArgumentError(
        'ShaderOverride binds ${textures.length} textures; the limit is '
        '$maxTextures',
      );
    }
    for (final name in [...uniforms.keys, ...textures.keys]) {
      if (!_identifier.hasMatch(name)) {
        throw ArgumentError(
          'ShaderOverride binding "$name" is not a GLSL name',
        );
      }
      if (name.startsWith('pd')) {
        throw ArgumentError(
          'ShaderOverride binding "$name" uses the reserved "pd" prefix',
        );
      }
    }
  }

  @override
  bool operator ==(Object other) =>
      other is ShaderOverride &&
      other.vertex == vertex &&
      other.fragment == fragment &&
      other.effect == effect &&
      _sameEntries(other.uniforms, uniforms) &&
      _sameEntries(other.textures, textures);

  @override
  int get hashCode => Object.hash(
    vertex,
    fragment,
    effect,
    Object.hashAllUnordered(
      uniforms.entries.map((entry) => Object.hash(entry.key, entry.value)),
    ),
    Object.hashAllUnordered(
      textures.entries.map((entry) => Object.hash(entry.key, entry.value)),
    ),
  );

  static final RegExp _identifier = RegExp(r'^[A-Za-z_]\w*$');

  static bool _sameKeys(Map<String, Object> a, Map<String, Object> b) =>
      a.length == b.length && a.keys.every(b.containsKey);

  static bool _sameEntries(Map<String, Object> a, Map<String, Object> b) =>
      a.length == b.length && a.keys.every((key) => a[key] == b[key]);
}
