import 'dart:math' as math;
import 'dart:typed_data';

import 'lights.dart';
import 'materials.dart';
import 'shaders.dart';

/// Standard render queue constants matching Unity conventions (`[S4-0]`).
abstract final class RenderQueue {
  static const int background = 1000;
  static const int geometry = 2000;
  static const int alphaTest = 2450;
  static const int transparent = 3000;
  static const int overlay = 4000;

  static bool isTransparent(int queue) => queue >= transparent;
}

/// Per-renderer material overrides applied without duplicating the shared
/// [MaterialDefinition] (`[S4-0]`).
final class MaterialPropertyBlock {
  final Map<String, double> _floats = <String, double>{};
  final Map<String, List<double>> _vectors = <String, List<double>>{};
  final Map<String, String> _textureGuids = <String, String>{};

  void setFloat(String name, double value) => _floats[name] = value;
  void setVec3(String name, double x, double y, double z) =>
      _vectors[name] = <double>[x, y, z];
  void setVec4(String name, double x, double y, double z, double w) =>
      _vectors[name] = <double>[x, y, z, w];
  void setColor(String name, LinearColor color) =>
      _vectors[name] = <double>[color.r, color.g, color.b, 1.0];
  void setTextureGuid(String name, String guid) => _textureGuids[name] = guid;

  double? getFloat(String name) => _floats[name];
  List<double>? getVector(String name) => _vectors[name];
  String? getTextureGuid(String name) => _textureGuids[name];

  Map<String, double> get floats => Map.unmodifiable(_floats);
  Map<String, List<double>> get vectors => Map.unmodifiable(_vectors);
  Map<String, String> get textureGuids => Map.unmodifiable(_textureGuids);

  bool get isEmpty =>
      _floats.isEmpty && _vectors.isEmpty && _textureGuids.isEmpty;

  void clear() {
    _floats.clear();
    _vectors.clear();
    _textureGuids.clear();
  }

  /// Applies known PBR scalar/tint overrides on top of [base], returning an
  /// effective [MaterialDefinition].
  MaterialDefinition applyTo(MaterialDefinition base) {
    if (isEmpty) return base;
    final tint = _vectors['uMaterialTint'] ?? _vectors['albedoColor'];
    return MaterialDefinition(
      key: '${base.key}#mpb',
      worldShader: base.worldShader,
      albedoTexture: base.albedoTexture,
      albedoColorSpace: base.albedoColorSpace,
      tintR: tint != null && tint.isNotEmpty ? tint[0] : base.tintR,
      tintG: tint != null && tint.length > 1 ? tint[1] : base.tintG,
      tintB: tint != null && tint.length > 2 ? tint[2] : base.tintB,
      emissiveTexture: base.emissiveTexture,
      emissiveStrength: _floats['emissiveStrength'] ?? base.emissiveStrength,
      normalTexture: base.normalTexture,
      normalColorSpace: base.normalColorSpace,
      normalStrength: _floats['normalStrength'] ?? base.normalStrength,
      ormTexture: base.ormTexture,
      ormColorSpace: base.ormColorSpace,
      roughness: _floats['roughness'] ?? base.roughness,
      metallic: _floats['metallic'] ?? base.metallic,
      occlusionStrength: _floats['occlusionStrength'] ?? base.occlusionStrength,
      clearcoatStrength: _floats['clearcoatStrength'] ?? base.clearcoatStrength,
      clearcoatRoughness:
          _floats['clearcoatRoughness'] ?? base.clearcoatRoughness,
      lightmapTexture: base.lightmapTexture,
      lightmapIntensity: _floats['lightmapIntensity'] ?? base.lightmapIntensity,
      uvScaleU: base.uvScaleU,
      uvScaleV: base.uvScaleV,
      uvOffsetU: base.uvOffsetU,
      uvOffsetV: base.uvOffsetV,
      alphaMode: base.alphaMode,
      alphaCutoff: _floats['alphaCutoff'] ?? base.alphaCutoff,
      doubleSided: base.doubleSided,
      receivesShadow: base.receivesShadow,
      affineSampling: base.affineSampling,
      quantized: base.quantized,
    );
  }
}

/// `.vmat` material asset schema (`[S4-0]`).
final class VmatAsset {
  final String guid;
  final String name;
  final String shaderId;
  final Set<ShaderKeyword> keywords;
  final Map<String, Object?> properties;
  final Map<String, String> textureGuids;
  final int renderQueue;
  final int sortingLayer;
  final int sortingOrder;

  const VmatAsset({
    required this.guid,
    required this.name,
    this.shaderId = 'vrp/lit',
    this.keywords = const {},
    this.properties = const {},
    this.textureGuids = const {},
    this.renderQueue = RenderQueue.geometry,
    this.sortingLayer = 0,
    this.sortingOrder = 0,
  });

  /// Compiles this `.vmat` asset into a runtime [MaterialDefinition].
  MaterialDefinition toMaterialDefinition() {
    final tint = properties['tint'] as List?;
    final alphaName = properties['alphaMode'] as String? ?? 'opaque';
    final alphaMode = AlphaMode.values.firstWhere(
      (a) => a.name == alphaName,
      orElse: () => AlphaMode.opaque,
    );
    return MaterialDefinition(
      key: guid.isNotEmpty ? guid : name,
      tintR: tint != null && tint.isNotEmpty ? (tint[0] as num).toDouble() : 1,
      tintG: tint != null && tint.length > 1 ? (tint[1] as num).toDouble() : 1,
      tintB: tint != null && tint.length > 2 ? (tint[2] as num).toDouble() : 1,
      roughness: (properties['roughness'] as num?)?.toDouble() ?? 0.5,
      metallic: (properties['metallic'] as num?)?.toDouble() ?? 0.0,
      normalStrength: (properties['normalStrength'] as num?)?.toDouble() ?? 1.0,
      occlusionStrength:
          (properties['occlusionStrength'] as num?)?.toDouble() ?? 1.0,
      emissiveStrength:
          (properties['emissiveStrength'] as num?)?.toDouble() ?? 0.0,
      clearcoatStrength:
          (properties['clearcoatStrength'] as num?)?.toDouble() ?? 0.0,
      clearcoatRoughness:
          (properties['clearcoatRoughness'] as num?)?.toDouble() ?? 0.2,
      alphaMode: alphaMode,
      alphaCutoff: (properties['alphaCutoff'] as num?)?.toDouble() ?? 0.5,
      doubleSided: properties['doubleSided'] as bool? ?? false,
      receivesShadow: properties['receivesShadow'] as bool? ?? true,
      affineSampling: keywords.contains(ShaderKeyword.ps1Affine),
      quantized: keywords.contains(ShaderKeyword.quantized),
    );
  }

  Map<String, Object?> toJson() => {
    'schemaVersion': 1,
    'guid': guid,
    'name': name,
    'shaderId': shaderId,
    'keywords': [for (final k in keywords) k.name]..sort(),
    'properties': properties,
    'textureGuids': textureGuids,
    'renderQueue': renderQueue,
    'sortingLayer': sortingLayer,
    'sortingOrder': sortingOrder,
  };

  factory VmatAsset.fromJson(Map<String, Object?> json) {
    final kwList = (json['keywords'] as List?) ?? const [];
    final keywords = <ShaderKeyword>{};
    for (final raw in kwList) {
      for (final k in ShaderKeyword.values) {
        if (k.name == raw || k.defineName == raw) {
          keywords.add(k);
          break;
        }
      }
    }
    final rawProps = json['properties'];
    final props = rawProps is Map
        ? rawProps.map((k, v) => MapEntry('$k', v))
        : const <String, Object?>{};
    final rawTex = json['textureGuids'];
    final tex = rawTex is Map
        ? rawTex.map((k, v) => MapEntry('$k', '$v'))
        : const <String, String>{};

    return VmatAsset(
      guid: json['guid'] as String? ?? '',
      name: json['name'] as String? ?? 'Material',
      shaderId: json['shaderId'] as String? ?? 'vrp/lit',
      keywords: keywords,
      properties: props,
      textureGuids: tex,
      renderQueue: (json['renderQueue'] as num?)?.toInt() ?? RenderQueue.geometry,
      sortingLayer: (json['sortingLayer'] as num?)?.toInt() ?? 0,
      sortingOrder: (json['sortingOrder'] as num?)?.toInt() ?? 0,
    );
  }
}

/// std140 Environment & SH9 Irradiance UBO packer (`[S4-0]`):
/// 9 vec4 SH9 coefficients + vec4 exposure/sky/probe params = 40 floats (160 bytes).
abstract final class EnvironmentBlockLayout {
  static const int floatCount = 40;
  static const int byteSize = floatCount * 4;

  static Float32List pack({
    required Float32List sh9Rgb,
    double exposure = 1.0,
    double iblIntensity = 1.0,
    double probeBlendWeight = 0.0,
    double skyRotationRadians = 0.0,
  }) {
    if (sh9Rgb.length < 27) {
      throw ArgumentError('sh9Rgb must contain 27 floats (9 RGB bands)');
    }
    final out = Float32List(floatCount);
    for (var i = 0; i < 9; i++) {
      out[i * 4 + 0] = sh9Rgb[i * 3 + 0];
      out[i * 4 + 1] = sh9Rgb[i * 3 + 1];
      out[i * 4 + 2] = sh9Rgb[i * 3 + 2];
      out[i * 4 + 3] = 0.0;
    }
    out[36] = exposure;
    out[37] = iblIntensity;
    out[38] = probeBlendWeight.clamp(0.0, 1.0);
    out[39] = skyRotationRadians;
    return out;
  }
}

/// Volume-driven post-processing override profile (`[S4-0]` / `[S4-D]`).
final class PostProcessVolumeProfile {
  final double? bloomIntensity;
  final double? bloomThreshold;
  final double? exposureEv100;
  final bool? taaEnabled;
  final double? taaSharpen;
  final bool? ssrEnabled;
  final double? ssrMaxDistance;
  final bool? gtaoEnabled;
  final double? gtaoRadius;
  final double? gtaoIntensity;
  final bool? motionBlurEnabled;
  final double? motionBlurShutterAngle;

  const PostProcessVolumeProfile({
    this.bloomIntensity,
    this.bloomThreshold,
    this.exposureEv100,
    this.taaEnabled,
    this.taaSharpen,
    this.ssrEnabled,
    this.ssrMaxDistance,
    this.gtaoEnabled,
    this.gtaoRadius,
    this.gtaoIntensity,
    this.motionBlurEnabled,
    this.motionBlurShutterAngle,
  });

  static const PostProcessVolumeProfile defaults = PostProcessVolumeProfile(
    bloomIntensity: 0.25,
    bloomThreshold: 1.0,
    exposureEv100: 0.0,
    taaEnabled: true,
    taaSharpen: 0.25,
    ssrEnabled: false,
    ssrMaxDistance: 32.0,
    gtaoEnabled: true,
    gtaoRadius: 0.6,
    gtaoIntensity: 1.0,
    motionBlurEnabled: false,
    motionBlurShutterAngle: 180.0,
  );

  /// Linearly blends [override] onto [this] using weight `t` in `[0, 1]`.
  PostProcessVolumeProfile blendWith(PostProcessVolumeProfile override, double t) {
    final w = t.clamp(0.0, 1.0);
    if (w <= 0.0) return this;
    double? lerpD(double? a, double? b) {
      if (b == null) return a;
      if (a == null) return b;
      return a + (b - a) * w;
    }

    bool? lerpB(bool? a, bool? b) => b == null ? a : (w >= 0.5 ? b : a);

    return PostProcessVolumeProfile(
      bloomIntensity: lerpD(bloomIntensity, override.bloomIntensity),
      bloomThreshold: lerpD(bloomThreshold, override.bloomThreshold),
      exposureEv100: lerpD(exposureEv100, override.exposureEv100),
      taaEnabled: lerpB(taaEnabled, override.taaEnabled),
      taaSharpen: lerpD(taaSharpen, override.taaSharpen),
      ssrEnabled: lerpB(ssrEnabled, override.ssrEnabled),
      ssrMaxDistance: lerpD(ssrMaxDistance, override.ssrMaxDistance),
      gtaoEnabled: lerpB(gtaoEnabled, override.gtaoEnabled),
      gtaoRadius: lerpD(gtaoRadius, override.gtaoRadius),
      gtaoIntensity: lerpD(gtaoIntensity, override.gtaoIntensity),
      motionBlurEnabled: lerpB(motionBlurEnabled, override.motionBlurEnabled),
      motionBlurShutterAngle: lerpD(
        motionBlurShutterAngle,
        override.motionBlurShutterAngle,
      ),
    );
  }
}

/// Deterministic Halton(2, 3) sub-pixel jitter sequence for TAA (`[S4-D]`).
abstract final class HaltonJitter {
  static double radicalInverse(int index, int base) {
    var result = 0.0;
    var f = 1.0 / base;
    var i = index;
    while (i > 0) {
      result += f * (i % base);
      i ~/= base;
      f /= base;
    }
    return result;
  }

  /// Returns jitter offset `(jx, jy)` in `[-0.5, 0.5]` pixels for [frameIndex].
  static (double, double) pixelOffset(int frameIndex, {int sequenceLength = 16}) {
    final len = sequenceLength < 1 ? 1 : sequenceLength;
    final idx = (frameIndex % len) + 1;
    return (radicalInverse(idx, 2) - 0.5, radicalInverse(idx, 3) - 0.5);
  }
}
