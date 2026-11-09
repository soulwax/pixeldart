import '../api/handles.dart';
import '../api/lights.dart';
import '../api/materials.dart';
import '../api/renderer.dart';
import '../geometry/procedural_textures.dart';
import '../webgl/device_api.dart' show GpuTextureFilter, GpuTextureWrap;

/// Ready-made particle materials.
abstract final class ParticleMaterials {
  static final Expando<TextureHandle> _softTextures = Expando('pixeldart.softParticle');

  /// A round, soft-edged sprite texture shared per [resources]. Its RGB
  /// falls off together with its alpha, so it works as an emissive map too:
  /// glow fades with the sprite instead of filling its quad.
  static TextureHandle softTexture(ResourceLibrary resources) => _softTextures[resources] ??= () {
    const size = 64;
    final handle = resources.registerTexture(
      width: size,
      height: size,
      hasMips: true,
      minFilter: GpuTextureFilter.linearMipmapLinear,
      wrap: GpuTextureWrap.clampToEdge,
      pixels: ProceduralTextures.radialParticle(
        width: size,
        height: size,
        innerRadius: 0.05,
        edgeColor: const LinearColor(0, 0, 0),
      ),
      debugLabel: 'particle_soft',
    );
    resources.finalizeTextureMips(handle);
    return handle;
  }();

  /// The definition behind [soft], for hosts that derive variants (such as
  /// a colour-gradient ramp) from it.
  static MaterialDefinition softDefinition(
    ResourceLibrary resources, {
    required String key,
    LinearColor color = const LinearColor(1, 1, 1),
    double glow = 2,
  }) {
    final texture = softTexture(resources);
    return MaterialDefinition(
      key: key,
      albedoTexture: texture,
      emissiveTexture: texture,
      tintR: color.r,
      tintG: color.g,
      tintB: color.b,
      emissiveStrength: glow,
      roughness: 1,
      metallic: 0,
      alphaMode: AlphaMode.blended,
      doubleSided: true,
    );
  }

  /// A soft, glowing sprite material: [color] tint with [glow] emission.
  /// Pair it with `BlendMode.additive` for fire, sparks and magic, or the
  /// default alpha blend for smoke and dust.
  static MaterialHandle soft(
    ResourceLibrary resources, {
    required String key,
    LinearColor color = const LinearColor(1, 1, 1),
    double glow = 2,
  }) => resources.registerMaterial(softDefinition(resources, key: key, color: color, glow: glow));
}
