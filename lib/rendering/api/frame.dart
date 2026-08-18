import '../math/frustum.dart';
import '../math/mat4.dart';
import '../math/vec.dart';
import '../atmosphere/volumetric_media.dart';
import '../atmosphere/thermal_field.dart';
import 'effects.dart';
import 'handles.dart';
import 'lights.dart';

/// Authoritative per-frame camera snapshot. Built by the caller's adapter
/// from its live camera's actual projection; the renderer never guesses a
/// FOV or reconstructs a different one (§5.2). Culling, depth
/// reconstruction, SSAO, fog, and the world shader all read this same
/// snapshot so they cannot disagree within one frame.
final class CameraView {
  final Mat4 view;
  final Mat4 projection;
  final Mat4 viewProjection;
  final Vec3 eye;
  final Vec3 forward;
  final double near;
  final double far;
  final double aspect;

  /// Inverse projection used by screen-space passes to reconstruct the exact
  /// camera ray authored by the host. It is derived once from [projection]
  /// and cached for the lifetime of this immutable camera snapshot.
  late final Mat4 inverseProjection = projection.inverse();

  /// Inverse view used to reconstruct world rays for presentation effects.
  late final Mat4 inverseView = view.inverse();

  CameraView({
    required this.view,
    required this.projection,
    required this.viewProjection,
    required this.eye,
    required this.forward,
    required this.near,
    required this.far,
    required this.aspect,
  });

  Frustum buildFrustum() => Frustum.fromViewProjection(viewProjection);

  void validate() {
    if (!eye.isFinite) {
      throw ArgumentError('CameraView.eye must be finite: $eye');
    }
    if (!forward.isFinite || forward.lengthSquared < 1e-12) {
      throw ArgumentError(
        'CameraView.forward must be finite and nonzero: $forward',
      );
    }
    if (!near.isFinite || !far.isFinite || near <= 0 || far <= near) {
      throw ArgumentError('CameraView requires 0 < near < far, got $near/$far');
    }
    if (!aspect.isFinite || aspect <= 0) {
      throw ArgumentError('CameraView.aspect must be finite and > 0: $aspect');
    }
    if (!view.isFinite || !projection.isFinite || !viewProjection.isFinite) {
      throw ArgumentError('CameraView matrices must be finite');
    }
  }
}

/// Game-owned skybox declaration consumed by the renderer's presentation
/// pass. The game chooses the asset identity and atmospheric colors; Pixeldart
/// owns how the declaration becomes pixels.
final class SkyboxDeclaration {
  final String assetId;
  final TextureHandle? texture;
  final LinearColor horizon;
  final LinearColor zenith;
  final LinearColor ground;
  final double horizonGlow;
  final double starDensity;
  final double rotationRadians;
  final double exposure;
  final bool textureIsSrgb;

  /// Bounded procedural cloud shell controls. The host supplies coverage,
  /// density, altitude, wind, and phase; Pixeldart owns the ray-marched sky
  /// presentation and can reduce samples without changing scene geometry.
  final double cloudCoverage;
  final double cloudDensity;
  final double cloudBaseHeight;
  final double cloudThickness;
  final double cloudScale;
  final double cloudWindX;
  final double cloudWindZ;
  final double cloudPhase;
  final double cloudDetail;
  final double cloudSilverLining;
  final int cloudSampleCount;

  const SkyboxDeclaration({
    required this.assetId,
    this.texture,
    required this.horizon,
    required this.zenith,
    required this.ground,
    this.horizonGlow = 0.08,
    this.starDensity = 0.0025,
    this.rotationRadians = 0,
    this.exposure = 1,
    this.textureIsSrgb = true,
    this.cloudCoverage = 0,
    this.cloudDensity = 0,
    this.cloudBaseHeight = 650,
    this.cloudThickness = 350,
    this.cloudScale = 0.0012,
    this.cloudWindX = 0,
    this.cloudWindZ = 0,
    this.cloudPhase = 0,
    this.cloudDetail = 0.55,
    this.cloudSilverLining = 0.25,
    this.cloudSampleCount = 12,
  });

  void validate() {
    if (assetId.trim().isEmpty ||
        !horizon.isFinite ||
        !zenith.isFinite ||
        !ground.isFinite ||
        !horizonGlow.isFinite ||
        horizonGlow < 0 ||
        horizonGlow > 1 ||
        !starDensity.isFinite ||
        starDensity < 0 ||
        starDensity > 0.1 ||
        !rotationRadians.isFinite ||
        !exposure.isFinite ||
        exposure <= 0 ||
        cloudCoverage < 0 ||
        cloudCoverage > 1 ||
        !cloudCoverage.isFinite ||
        cloudDensity < 0 ||
        cloudDensity > 1 ||
        !cloudDensity.isFinite ||
        cloudBaseHeight <= 0 ||
        cloudBaseHeight > 100000 ||
        !cloudBaseHeight.isFinite ||
        cloudThickness <= 0 ||
        cloudThickness > 100000 ||
        !cloudThickness.isFinite ||
        cloudScale <= 0 ||
        cloudScale > 1 ||
        !cloudScale.isFinite ||
        !cloudWindX.isFinite ||
        !cloudWindZ.isFinite ||
        cloudWindX.abs() > 1000 ||
        cloudWindZ.abs() > 1000 ||
        !cloudPhase.isFinite ||
        cloudDetail < 0 ||
        cloudDetail > 1 ||
        !cloudDetail.isFinite ||
        cloudSilverLining < 0 ||
        cloudSilverLining > 1 ||
        !cloudSilverLining.isFinite ||
        cloudSampleCount < 4 ||
        cloudSampleCount > 24) {
      throw ArgumentError('SkyboxDeclaration contains invalid values');
    }
  }
}

/// Neutral scene environment values only — no application-domain semantics
/// state (§5.2).
final class FrameEnvironment {
  final LinearColor clearColor;
  final LinearColor fogColor;
  final double fogStart;
  final double fogEnd;
  final double? fogHeightFalloff;
  final double? fogDensity;

  /// Neutral participating-medium controls. Hosts can map rain, mist, smoke,
  /// or clear air into these values without making the renderer own weather.
  final LinearColor volumetricAlbedo;
  final double volumetricHeightFalloff;

  /// Additional near-field particulate density for dust, steam, or fine
  /// airborne debris. Zero is an exact no-dust path.
  final double volumetricDustDensity;
  final double volumetricAnisotropy;
  final double volumetricJitter;
  final double volumetricIntensity;

  /// Bounded raymarch sample count. Profiles and developer settings may lower
  /// it for a cheaper preview or raise it for clean shafts and long fog paths.
  final int volumetricSampleCount;

  /// Shadow-filter footprint in shadow-map texels. Zero is a hard comparison;
  /// larger values widen the deterministic PCF kernel for broad cloud light.
  final double shadowFilterRadius;

  /// Global lighting multipliers resolved by the host. These are frame facts
  /// so a host can expose them as live controls without rebuilding the graph.
  final double ambientLightScale;
  final double directLightScale;

  /// Global material response multipliers for the high/shadowed world path.
  /// Authored material descriptors remain unchanged while the lab can inspect
  /// the renderer's BRDF response interactively.
  final double normalStrengthScale;
  final double roughnessScale;
  final double metallicScale;
  final double specularScale;

  /// Receiver-plane shadow bias in normalized light-space depth units.
  final double shadowBias;

  /// Bounded environment reflection fallback for glossy and wet surfaces.
  /// Confidence distinguishes a real probe/history hit from this fallback.
  final LinearColor reflectionColor;
  final double reflectionIntensity;
  final double reflectionConfidence;
  final LinearColor ambientColor;
  final double ambientIntensity;
  final DirectionalLight? directionalLight;
  final List<PointLight> pointLights;
  final List<SpotLight> spotLights;

  /// Host-resolved practical or transient sources for participating media.
  /// The volumetric pass applies its own deterministic capability limit.
  final List<VolumetricSource> volumetricSources;

  /// Bounded warm-object fields used for spatial material thaw/dissolution.
  final List<ThermalSource> thermalSources;
  final SkyboxDeclaration? skybox;

  const FrameEnvironment({
    this.clearColor = LinearColor.black,
    this.fogColor = LinearColor.black,
    this.fogStart = 0,
    this.fogEnd = 1,
    this.fogHeightFalloff,
    this.fogDensity,
    this.volumetricAlbedo = LinearColor.white,
    this.volumetricHeightFalloff = 0.02,
    this.volumetricDustDensity = 0.0,
    this.volumetricAnisotropy = 0.70,
    this.volumetricJitter = 0.35,
    this.volumetricIntensity = 1.0,
    this.volumetricSampleCount = 12,
    this.shadowFilterRadius = 1.0,
    this.ambientLightScale = 1.0,
    this.directLightScale = 1.0,
    this.normalStrengthScale = 1.0,
    this.roughnessScale = 1.0,
    this.metallicScale = 1.0,
    this.specularScale = 1.0,
    this.shadowBias = 0.003,
    this.reflectionColor = LinearColor.black,
    this.reflectionIntensity = 0.0,
    this.reflectionConfidence = 0.0,
    this.ambientColor = LinearColor.white,
    this.ambientIntensity = 0,
    this.directionalLight,
    this.pointLights = const [],
    this.spotLights = const [],
    this.volumetricSources = const [],
    this.thermalSources = const [],
    this.skybox,
  });

  void validate() {
    if (!clearColor.isFinite ||
        !fogColor.isFinite ||
        !ambientColor.isFinite ||
        !volumetricAlbedo.isFinite ||
        !reflectionColor.isFinite) {
      throw ArgumentError('FrameEnvironment colors must be finite');
    }
    skybox?.validate();
    if (!fogStart.isFinite || !fogEnd.isFinite || fogEnd < fogStart) {
      throw ArgumentError(
        'FrameEnvironment requires fogEnd >= fogStart, got $fogStart/$fogEnd',
      );
    }
    if (!ambientIntensity.isFinite || ambientIntensity < 0) {
      throw ArgumentError(
        'FrameEnvironment.ambientIntensity must be >= 0: $ambientIntensity',
      );
    }
    directionalLight?.validate();
    for (final light in pointLights) {
      light.validate();
    }
    for (final light in spotLights) {
      light.validate();
    }
    final sourceIds = <String>{};
    for (final source in volumetricSources) {
      source.validate();
      if (!sourceIds.add(source.id)) {
        throw ArgumentError(
          'FrameEnvironment.volumetricSources contains duplicate id: '
          '${source.id}',
        );
      }
    }
    if (volumetricHeightFalloff < 0 ||
        !volumetricHeightFalloff.isFinite ||
        volumetricDustDensity < 0 ||
        volumetricDustDensity > 0.5 ||
        !volumetricDustDensity.isFinite ||
        volumetricAnisotropy <= -0.999 ||
        volumetricAnisotropy >= 0.999 ||
        !volumetricAnisotropy.isFinite ||
        volumetricJitter < 0 ||
        volumetricJitter > 0.5 ||
        !volumetricJitter.isFinite ||
        volumetricIntensity < 0 ||
        volumetricIntensity > 8 ||
        !volumetricIntensity.isFinite ||
        volumetricSampleCount < 4 ||
        volumetricSampleCount > 24 ||
        shadowFilterRadius < 0 ||
        shadowFilterRadius > 3 ||
        !shadowFilterRadius.isFinite ||
        ambientLightScale < 0 ||
        ambientLightScale > 3 ||
        !ambientLightScale.isFinite ||
        directLightScale < 0 ||
        directLightScale > 3 ||
        !directLightScale.isFinite ||
        normalStrengthScale < 0 ||
        normalStrengthScale > 2 ||
        !normalStrengthScale.isFinite ||
        roughnessScale < 0 ||
        roughnessScale > 2 ||
        !roughnessScale.isFinite ||
        metallicScale < 0 ||
        metallicScale > 2 ||
        !metallicScale.isFinite ||
        specularScale < 0 ||
        specularScale > 3 ||
        !specularScale.isFinite ||
        shadowBias < 0 ||
        shadowBias > 0.01 ||
        !shadowBias.isFinite ||
        reflectionIntensity < 0 ||
        reflectionIntensity > 4 ||
        !reflectionIntensity.isFinite ||
        reflectionConfidence < 0 ||
        reflectionConfidence > 1 ||
        !reflectionConfidence.isFinite) {
      throw ArgumentError('invalid volumetric medium controls');
    }
    final thermalIds = <String>{};
    for (final source in thermalSources) {
      source.validate();
      if (!thermalIds.add(source.id)) {
        throw ArgumentError(
          'FrameEnvironment.thermalSources contains duplicate id: '
          '${source.id}',
        );
      }
    }
  }
}

/// Everything a renderer needs for exactly one frame. [historyEpoch] is the
/// caller's sole public history-invalidation authority (§5.2); there is no
/// second reset method.
final class FrameInput {
  final CameraView camera;
  final FrameEnvironment environment;
  final PostProcessState post;
  final int visibilityMask;
  final int frameIndex;
  final int historyEpoch;
  final int noiseSeed;
  final double timeSeconds;

  const FrameInput({
    required this.camera,
    required this.environment,
    required this.post,
    this.visibilityMask = -1,
    required this.frameIndex,
    required this.historyEpoch,
    required this.noiseSeed,
    required this.timeSeconds,
  });

  void validate() {
    camera.validate();
    environment.validate();
    post.validate();
    if (frameIndex < 0) {
      throw ArgumentError('FrameInput.frameIndex must be >= 0: $frameIndex');
    }
    if (!timeSeconds.isFinite) {
      throw ArgumentError(
        'FrameInput.timeSeconds must be finite: $timeSeconds',
      );
    }
  }
}
