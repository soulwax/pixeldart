import 'handles.dart';

enum AlphaMode { opaque, masked, blended }

/// Authored material definition, keyed by a stable string rather than a
/// hash (§8.2). The legacy `lib/engine/materials.dart` assigns runtime
/// identity from a djb2-style hash of field values with no collision
/// handling; a [ResourceLibrary] assigns the collision-safe
/// [MaterialHandle] instead, so this type carries no derived identity of
/// its own.
final class MaterialDefinition {
  final String key;
  final TextureHandle? albedoTexture;
  final double tintR, tintG, tintB;
  final TextureHandle? emissiveTexture;
  final double emissiveStrength;
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
    this.tintR = 1,
    this.tintG = 1,
    this.tintB = 1,
    this.emissiveTexture,
    this.emissiveStrength = 0,
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

  void validate() {
    if (key.isEmpty) {
      throw ArgumentError('MaterialDefinition.key must not be empty');
    }
    if (!emissiveStrength.isFinite || emissiveStrength < 0) {
      throw ArgumentError(
        'MaterialDefinition.emissiveStrength must be >= 0: $emissiveStrength',
      );
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
}
