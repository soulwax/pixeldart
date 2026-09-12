import 'handles.dart';
import 'lights.dart';

enum AlphaMode { opaque, masked, blended }

/// Colour-space contract for authored material maps. Albedo is sampled as
/// display-referred colour; shading data must remain linear.
enum MaterialMapColorSpace { srgb, linear }

/// Authored material definition, keyed by a stable string rather than a
/// hash (§8.2). The legacy `lib/engine/materials.dart` assigns runtime
/// identity from a djb2-style hash of field values with no collision
/// handling; a [ResourceLibrary] assigns the collision-safe
/// [MaterialHandle] instead, so this type carries no derived identity of
/// its own.
final class MaterialDefinition {
  final String key;
  final TextureHandle? albedoTexture;
  final MaterialMapColorSpace albedoColorSpace;
  final double tintR, tintG, tintB;
  final TextureHandle? emissiveTexture;
  final double emissiveStrength;

  /// Tangent-space normal map. The current compatibility vertex layout does
  /// not carry authored tangents, so the shader derives a stable TBN from
  /// world-position/UV derivatives; surface-v2 can replace that with a
  /// supplied tangent without changing this material contract.
  final TextureHandle? normalTexture;
  final MaterialMapColorSpace normalColorSpace;
  final double normalStrength;

  /// Linear ORM map: R=occlusion, G=roughness, B=metalness. Scalar values
  /// remain useful as deterministic fallbacks when the optional map is
  /// absent or still loading.
  final TextureHandle? ormTexture;
  final MaterialMapColorSpace ormColorSpace;
  final double roughness;
  final double metallic;
  final double occlusionStrength;
  final double clearcoatStrength;
  final double clearcoatRoughness;

  /// Optional neutral-indirect/lightmap texture sampled with UV1. Intensity
  /// is zero by default so a missing map cannot brighten compatibility meshes.
  final TextureHandle? lightmapTexture;
  final double lightmapIntensity;
  final double uvScaleU, uvScaleV;
  final double uvOffsetU, uvOffsetV;
  final AlphaMode alphaMode;

  /// Sampled albedo alpha below this value is discarded when [alphaMode] is
  /// [AlphaMode.masked]; ignored entirely for the other two modes. Must stay
  /// strictly positive: the three geometry passes encode "this draw has no
  /// cutout" as a zero `uAlphaCutoff`, and the shaders branch on that
  /// sentinel to skip the compare (and, in the prepass and shadow caster,
  /// the albedo fetch itself), so a legitimately-zero cutoff would be
  /// indistinguishable from an unmasked draw.
  final double alphaCutoff;
  final bool doubleSided;
  final bool receivesShadow;
  final bool affineSampling;
  final bool quantized;

  const MaterialDefinition({
    required this.key,
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

  /// Creates a standard metallic material.
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

  /// Creates a standard dielectric (non-metallic) material.
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

  /// Physically calibrated gold preset (F0 = [1.0, 0.78, 0.35], metallic = 1.0).
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

  /// Physically calibrated silver preset (F0 = [0.97, 0.96, 0.91], metallic = 1.0).
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

  /// Physically calibrated copper preset (F0 = [0.95, 0.64, 0.54], metallic = 1.0).
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

  /// High-reflectivity chrome / mirror preset.
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

  /// Rough cast iron preset.
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

  /// Smooth glossy plastic preset.
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

  /// Glazed ceramic / porcelain preset with strong dielectric clearcoat.
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

  /// Rough matte diffuse surface.
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

  /// Glowing emissive material.
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
