import 'handles.dart';
import 'lights.dart';
import 'shaders.dart';

enum AlphaMode { opaque, masked, blended }

enum MaterialMapColorSpace { srgb, linear }

final class MaterialDefinition {
  final String key;

  /// A registered world shader for this material, or the built-in default.
  final WorldShaderHandle? worldShader;
  final TextureHandle? albedoTexture;
  final MaterialMapColorSpace albedoColorSpace;
  final double tintR, tintG, tintB;
  final TextureHandle? emissiveTexture;

  final double emissiveStrength;

  final TextureHandle? normalTexture;
  final MaterialMapColorSpace normalColorSpace;
  final double normalStrength;

  final TextureHandle? ormTexture;
  final MaterialMapColorSpace ormColorSpace;
  final double roughness;
  final double metallic;
  final double occlusionStrength;
  final double clearcoatStrength;
  final double clearcoatRoughness;

  final TextureHandle? lightmapTexture;
  final double lightmapIntensity;
  final double uvScaleU, uvScaleV;
  final double uvOffsetU, uvOffsetV;
  final AlphaMode alphaMode;

  final double alphaCutoff;
  final bool doubleSided;
  final bool receivesShadow;
  final bool affineSampling;
  final bool quantized;

  const MaterialDefinition({
    required this.key,
    this.worldShader,
    this.albedoTexture,
    this.albedoColorSpace = MaterialMapColorSpace.srgb,
    this.tintR = 1,
    this.tintG = 1,
    this.tintB = 1,
    this.emissiveTexture,
    this.emissiveStrength = 0,
    this.normalTexture,
    this.normalColorSpace = MaterialMapColorSpace.linear,
    this.normalStrength = 1,
    this.ormTexture,
    this.ormColorSpace = MaterialMapColorSpace.linear,
    this.roughness = 1,
    this.metallic = 0,
    this.occlusionStrength = 1,
    this.clearcoatStrength = 0,
    this.clearcoatRoughness = 0.2,
    this.lightmapTexture,
    this.lightmapIntensity = 0,
    this.uvScaleU = 1,
    this.uvScaleV = 1,
    this.uvOffsetU = 0,
    this.uvOffsetV = 0,
    this.alphaMode = AlphaMode.opaque,
    this.alphaCutoff = 0.5,
    this.doubleSided = false,
    this.receivesShadow = true,
    this.affineSampling = false,
    this.quantized = false,
  });

  factory MaterialDefinition.metal({
    String key = 'metal',
    required LinearColor color,
    double roughness = 0.2,
    double clearcoat = 0.0,
  }) => MaterialDefinition(
    key: key,
    tintR: color.r,
    tintG: color.g,
    tintB: color.b,
    metallic: 1.0,
    roughness: roughness,
    clearcoatStrength: clearcoat,
  );

  factory MaterialDefinition.dielectric({
    String key = 'dielectric',
    required LinearColor color,
    double roughness = 0.5,
    double clearcoat = 0.0,
  }) => MaterialDefinition(
    key: key,
    tintR: color.r,
    tintG: color.g,
    tintB: color.b,
    metallic: 0.0,
    roughness: roughness,
    clearcoatStrength: clearcoat,
  );

  factory MaterialDefinition.gold({
    String key = 'gold',
    double roughness = 0.15,
  }) => MaterialDefinition(
    key: key,
    tintR: 1.0,
    tintG: 0.78,
    tintB: 0.35,
    metallic: 1.0,
    roughness: roughness,
  );

  factory MaterialDefinition.silver({
    String key = 'silver',
    double roughness = 0.12,
  }) => MaterialDefinition(
    key: key,
    tintR: 0.97,
    tintG: 0.96,
    tintB: 0.91,
    metallic: 1.0,
    roughness: roughness,
  );

  factory MaterialDefinition.copper({
    String key = 'copper',
    double roughness = 0.20,
  }) => MaterialDefinition(
    key: key,
    tintR: 0.95,
    tintG: 0.64,
    tintB: 0.54,
    metallic: 1.0,
    roughness: roughness,
  );

  factory MaterialDefinition.chrome({
    String key = 'chrome',
    double roughness = 0.05,
  }) => MaterialDefinition(
    key: key,
    tintR: 0.95,
    tintG: 0.95,
    tintB: 0.98,
    metallic: 0.98,
    roughness: roughness,
  );

  factory MaterialDefinition.iron({
    String key = 'iron',
    double roughness = 0.40,
  }) => MaterialDefinition(
    key: key,
    tintR: 0.56,
    tintG: 0.57,
    tintB: 0.58,
    metallic: 0.85,
    roughness: roughness,
  );

  factory MaterialDefinition.plastic({
    String key = 'plastic',
    required LinearColor color,
    double roughness = 0.25,
  }) => MaterialDefinition(
    key: key,
    tintR: color.r,
    tintG: color.g,
    tintB: color.b,
    metallic: 0.0,
    roughness: roughness,
    clearcoatStrength: 0.3,
  );

  factory MaterialDefinition.ceramic({
    String key = 'ceramic',
    required LinearColor color,
    double roughness = 0.10,
    double clearcoat = 0.85,
  }) => MaterialDefinition(
    key: key,
    tintR: color.r,
    tintG: color.g,
    tintB: color.b,
    metallic: 0.0,
    roughness: roughness,
    clearcoatStrength: clearcoat,
    clearcoatRoughness: 0.08,
  );

  factory MaterialDefinition.matte({
    String key = 'matte',
    required LinearColor color,
    double roughness = 0.90,
  }) => MaterialDefinition(
    key: key,
    tintR: color.r,
    tintG: color.g,
    tintB: color.b,
    metallic: 0.0,
    roughness: roughness,
  );

  factory MaterialDefinition.emissive({
    String key = 'emissive',
    required LinearColor color,
    double strength = 2.0,
  }) => MaterialDefinition(
    key: key,
    tintR: color.r,
    tintG: color.g,
    tintB: color.b,
    emissiveStrength: strength,
    roughness: 0.5,
    metallic: 0.0,
  );

  MaterialDefinition copyWith({
    String? key,
    WorldShaderHandle? worldShader,
    TextureHandle? albedoTexture,
    MaterialMapColorSpace? albedoColorSpace,
    double? tintR,
    double? tintG,
    double? tintB,
    TextureHandle? emissiveTexture,
    double? emissiveStrength,
    TextureHandle? normalTexture,
    MaterialMapColorSpace? normalColorSpace,
    double? normalStrength,
    TextureHandle? ormTexture,
    MaterialMapColorSpace? ormColorSpace,
    double? roughness,
    double? metallic,
    double? occlusionStrength,
    double? clearcoatStrength,
    double? clearcoatRoughness,
    TextureHandle? lightmapTexture,
    double? lightmapIntensity,
    double? uvScaleU,
    double? uvScaleV,
    double? uvOffsetU,
    double? uvOffsetV,
    AlphaMode? alphaMode,
    double? alphaCutoff,
    bool? doubleSided,
    bool? receivesShadow,
    bool? affineSampling,
    bool? quantized,
  }) => MaterialDefinition(
    key: key ?? this.key,
    worldShader: worldShader ?? this.worldShader,
    albedoTexture: albedoTexture ?? this.albedoTexture,
    albedoColorSpace: albedoColorSpace ?? this.albedoColorSpace,
    tintR: tintR ?? this.tintR,
    tintG: tintG ?? this.tintG,
    tintB: tintB ?? this.tintB,
    emissiveTexture: emissiveTexture ?? this.emissiveTexture,
    emissiveStrength: emissiveStrength ?? this.emissiveStrength,
    normalTexture: normalTexture ?? this.normalTexture,
    normalColorSpace: normalColorSpace ?? this.normalColorSpace,
    normalStrength: normalStrength ?? this.normalStrength,
    ormTexture: ormTexture ?? this.ormTexture,
    ormColorSpace: ormColorSpace ?? this.ormColorSpace,
    roughness: roughness ?? this.roughness,
    metallic: metallic ?? this.metallic,
    occlusionStrength: occlusionStrength ?? this.occlusionStrength,
    clearcoatStrength: clearcoatStrength ?? this.clearcoatStrength,
    clearcoatRoughness: clearcoatRoughness ?? this.clearcoatRoughness,
    lightmapTexture: lightmapTexture ?? this.lightmapTexture,
    lightmapIntensity: lightmapIntensity ?? this.lightmapIntensity,
    uvScaleU: uvScaleU ?? this.uvScaleU,
    uvScaleV: uvScaleV ?? this.uvScaleV,
    uvOffsetU: uvOffsetU ?? this.uvOffsetU,
    uvOffsetV: uvOffsetV ?? this.uvOffsetV,
    alphaMode: alphaMode ?? this.alphaMode,
    alphaCutoff: alphaCutoff ?? this.alphaCutoff,
    doubleSided: doubleSided ?? this.doubleSided,
    receivesShadow: receivesShadow ?? this.receivesShadow,
    affineSampling: affineSampling ?? this.affineSampling,
    quantized: quantized ?? this.quantized,
  );

  void validate() {
    if (key.isEmpty) {
      throw ArgumentError('MaterialDefinition.key must not be empty');
    }
    if (albedoColorSpace != MaterialMapColorSpace.srgb) {
      throw ArgumentError(
        'MaterialDefinition.albedoColorSpace must be srgb: $key',
      );
    }
    if (normalColorSpace != MaterialMapColorSpace.linear) {
      throw ArgumentError(
        'MaterialDefinition.normalColorSpace must be linear: $key',
      );
    }
    if (ormColorSpace != MaterialMapColorSpace.linear) {
      throw ArgumentError(
        'MaterialDefinition.ormColorSpace must be linear: $key',
      );
    }
    if (!emissiveStrength.isFinite || emissiveStrength < 0) {
      throw ArgumentError(
        'MaterialDefinition.emissiveStrength must be >= 0: $emissiveStrength',
      );
    }
    if (!normalStrength.isFinite || normalStrength < 0) {
      throw ArgumentError(
        'MaterialDefinition.normalStrength must be >= 0: $normalStrength',
      );
    }
    _validateUnit('roughness', roughness);
    _validateUnit('metallic', metallic);
    _validateUnit('occlusionStrength', occlusionStrength);
    _validateUnit('clearcoatStrength', clearcoatStrength);
    _validateUnit('clearcoatRoughness', clearcoatRoughness);
    if (!lightmapIntensity.isFinite || lightmapIntensity < 0) {
      throw ArgumentError(
        'MaterialDefinition.lightmapIntensity must be >= 0: '
        '$lightmapIntensity',
      );
    }
    for (final (name, value) in [
      ('uvScaleU', uvScaleU),
      ('uvScaleV', uvScaleV),
      ('uvOffsetU', uvOffsetU),
      ('uvOffsetV', uvOffsetV),
      ('tintR', tintR),
      ('tintG', tintG),
      ('tintB', tintB),
    ]) {
      if (!value.isFinite) {
        throw ArgumentError('MaterialDefinition.$name must be finite: $value');
      }
    }
    if (uvScaleU == 0 || uvScaleV == 0) {
      throw ArgumentError('MaterialDefinition uv scale must not be zero');
    }
    if (!alphaCutoff.isFinite || alphaCutoff <= 0 || alphaCutoff > 1) {
      throw ArgumentError(
        'MaterialDefinition.alphaCutoff must be in (0, 1]: $alphaCutoff',
      );
    }
  }

  static void _validateUnit(String name, double value) {
    if (!value.isFinite || value < 0 || value > 1) {
      throw ArgumentError('MaterialDefinition.$name must be in [0, 1]: $value');
    }
  }
}
