import 'dart:math' as math;

import '../math/frustum.dart';
import '../math/mat4.dart';
import '../math/ray.dart';
import '../math/vec.dart';
import '../atmosphere/volumetric_media.dart';
import '../atmosphere/thermal_field.dart';
import 'effects.dart';
import 'handles.dart';
import 'lights.dart';

final class CameraView {
  final Mat4 view;
  final Mat4 projection;
  final Mat4 viewProjection;
  final Vec3 eye;
  final Vec3 forward;
  final double near;
  final double far;
  final double aspect;

  late final Mat4 inverseProjection = projection.inverse();

  late final Mat4 inverseView = view.inverse();

  late final Mat4 inverseViewProjection = viewProjection.inverse();

  Ray screenPointToRay(
    double screenX,
    double screenY,
    int viewportWidth,
    int viewportHeight,
  ) {
    if (viewportWidth <= 0 || viewportHeight <= 0) {
      throw ArgumentError('Viewport dimensions must be > 0');
    }
    final ndcX = (screenX / viewportWidth) * 2.0 - 1.0;
    final ndcY = 1.0 - (screenY / viewportHeight) * 2.0;

    final nearPoint = inverseViewProjection.transformPoint(Vec3(ndcX, ndcY, -1.0));
    final farPoint = inverseViewProjection.transformPoint(Vec3(ndcX, ndcY, 1.0));
    final dir = (farPoint - nearPoint).normalized;

    // Perspective rays all leave the eye. Orthographic rays are parallel and
    // leave the near plane at the pixel's own position.
    final orthographic = projection.at(3, 3) != 0;
    return Ray(origin: orthographic ? nearPoint : eye, direction: dir);
  }

  Vec2? worldToScreenPoint(
    Vec3 point,
    int viewportWidth,
    int viewportHeight,
  ) {
    if (viewportWidth <= 0 || viewportHeight <= 0) {
      throw ArgumentError('Viewport dimensions must be > 0');
    }
    final m = viewProjection.m;
    final x = m[0] * point.x + m[4] * point.y + m[8] * point.z + m[12];
    final y = m[1] * point.x + m[5] * point.y + m[9] * point.z + m[13];
    final w = m[3] * point.x + m[7] * point.y + m[11] * point.z + m[15];
    if (w <= 1e-9) return null;
    return Vec2(
      (x / w * 0.5 + 0.5) * viewportWidth,
      (0.5 - y / w * 0.5) * viewportHeight,
    );
  }

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

  factory CameraView.look({
    required Vec3 eye,
    required Vec3 forward,
    required double fovYRadians,
    required double aspect,
    required double near,
    required double far,
    Vec3 up = const Vec3(0, 1, 0),
  }) {
    if (!forward.isFinite || forward.lengthSquared < 1e-12) {
      throw ArgumentError(
        'CameraView.look requires a finite, nonzero forward: $forward',
      );
    }
    if (!fovYRadians.isFinite || fovYRadians <= 0 || fovYRadians >= math.pi) {
      throw ArgumentError(
        'CameraView.look requires 0 < fovYRadians < pi: $fovYRadians',
      );
    }
    final direction = forward.normalized;
    if (up.cross(direction).lengthSquared < 1e-12) {
      throw ArgumentError(
        'CameraView.look requires up ($up) not parallel to forward ($forward)',
      );
    }
    final view = Mat4.lookAt(eye: eye, forward: direction, up: up);
    final projection = Mat4.perspective(
      fovYRadians: fovYRadians,
      aspect: aspect,
      near: near,
      far: far,
    );
    return CameraView(
      view: view,
      projection: projection,
      viewProjection: projection * view,
      eye: eye,
      forward: direction,
      near: near,
      far: far,
      aspect: aspect,
    )..validate();
  }

  factory CameraView.orthographic({
    required Vec3 eye,
    required Vec3 forward,
    required double halfWidth,
    required double halfHeight,
    required double near,
    required double far,
    Vec3 up = const Vec3(0, 1, 0),
  }) {
    if (!forward.isFinite || forward.lengthSquared < 1e-12) {
      throw ArgumentError('CameraView.orthographic requires a finite, nonzero forward: $forward');
    }
    if (!halfWidth.isFinite || halfWidth <= 0 || !halfHeight.isFinite || halfHeight <= 0) {
      throw ArgumentError(
        'CameraView.orthographic requires positive half extents, got $halfWidth x $halfHeight',
      );
    }
    final direction = forward.normalized;
    if (up.cross(direction).lengthSquared < 1e-12) {
      throw ArgumentError(
        'CameraView.orthographic requires up ($up) not parallel to forward ($forward)',
      );
    }
    final view = Mat4.lookAt(eye: eye, forward: direction, up: up);
    final projection = Mat4.orthographic(
      left: -halfWidth,
      right: halfWidth,
      bottom: -halfHeight,
      top: halfHeight,
      near: near,
      far: far,
    );
    return CameraView(
      view: view,
      projection: projection,
      viewProjection: projection * view,
      eye: eye,
      forward: direction,
      near: near,
      far: far,
      aspect: halfWidth / halfHeight,
    )..validate();
  }

  factory CameraView.lookAt({
    required Vec3 eye,
    required Vec3 target,
    required double fovYRadians,
    required double aspect,
    required double near,
    required double far,
    Vec3 up = const Vec3(0, 1, 0),
  }) {
    final forward = target - eye;
    if (forward.lengthSquared < 1e-12) {
      throw ArgumentError(
        'CameraView.lookAt requires target ($target) distinct from eye ($eye)',
      );
    }
    return CameraView.look(
      eye: eye,
      forward: forward,
      fovYRadians: fovYRadians,
      aspect: aspect,
      near: near,
      far: far,
      up: up,
    );
  }

  factory CameraView.fromMatrices({
    required Mat4 view,
    required Mat4 projection,
    required double near,
    required double far,
    double? aspect,
  }) {
    if (!view.isFinite || !projection.isFinite) {
      throw ArgumentError('CameraView.fromMatrices requires finite matrices');
    }
    final inverseView = view.inverse();
    final eye = inverseView.transformPoint(Vec3.zero);
    // The camera looks down -Z in view space; column 2 of the inverse view is
    // the world-space +Z basis, so forward is its negation.
    final forward = Vec3(
      -inverseView.at(2, 0),
      -inverseView.at(2, 1),
      -inverseView.at(2, 2),
    );
    // Perspective projections store `f / aspect` at [0][0] and `f` at [1][1].
    final m00 = projection.at(0, 0);
    final m11 = projection.at(1, 1);
    final derivedAspect = aspect ?? (m00 == 0 ? 0.0 : m11 / m00);
    return CameraView(
      view: view,
      projection: projection,
      viewProjection: projection * view,
      eye: eye,
      forward: forward,
      near: near,
      far: far,
      aspect: derivedAspect,
    )..validate();
  }

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
    // A camera whose viewProjection is not projection * view is the one
    // inconsistency this snapshot cannot survive: `buildFrustum` culls against
    // viewProjection while the world shader transforms against it too, so a
    // mismatch silently culls visible geometry or draws culled geometry at the
    // wrong place. Finiteness alone never caught it. The factories above make
    // it unreachable; this catches hosts using the raw constructor.
    final expected = projection * view;
    var worstDelta = 0.0;
    var worstIndex = -1;
    for (var i = 0; i < 16; i++) {
      final delta = (viewProjection.m[i] - expected.m[i]).abs();
      // Float32 storage plus a matrix product accumulates error proportional
      // to element magnitude, so the tolerance scales with it.
      final scale = 1 + expected.m[i].abs();
      if (delta / scale > worstDelta) {
        worstDelta = delta / scale;
        worstIndex = i;
      }
    }
    if (worstDelta > 1e-4) {
      throw ArgumentError(
        'CameraView.viewProjection must equal projection * view. Worst '
        'relative mismatch ${worstDelta.toStringAsExponential(2)} at '
        'column ${worstIndex ~/ 4} row ${worstIndex % 4} '
        '(got ${viewProjection.m[worstIndex]}, '
        'expected ${expected.m[worstIndex]}). '
        'Prefer CameraView.look/lookAt/fromMatrices, which derive it.',
      );
    }
  }
}

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

  SkyboxDeclaration copyWith({
    String? assetId,
    TextureHandle? texture,
    LinearColor? horizon,
    LinearColor? zenith,
    LinearColor? ground,
    double? horizonGlow,
    double? starDensity,
    double? rotationRadians,
    double? exposure,
    bool? textureIsSrgb,
    double? cloudCoverage,
    double? cloudDensity,
    double? cloudBaseHeight,
    double? cloudThickness,
    double? cloudScale,
    double? cloudWindX,
    double? cloudWindZ,
    double? cloudPhase,
    double? cloudDetail,
    double? cloudSilverLining,
    int? cloudSampleCount,
  }) => SkyboxDeclaration(
    assetId: assetId ?? this.assetId,
    texture: texture ?? this.texture,
    horizon: horizon ?? this.horizon,
    zenith: zenith ?? this.zenith,
    ground: ground ?? this.ground,
    horizonGlow: horizonGlow ?? this.horizonGlow,
    starDensity: starDensity ?? this.starDensity,
    rotationRadians: rotationRadians ?? this.rotationRadians,
    exposure: exposure ?? this.exposure,
    textureIsSrgb: textureIsSrgb ?? this.textureIsSrgb,
    cloudCoverage: cloudCoverage ?? this.cloudCoverage,
    cloudDensity: cloudDensity ?? this.cloudDensity,
    cloudBaseHeight: cloudBaseHeight ?? this.cloudBaseHeight,
    cloudThickness: cloudThickness ?? this.cloudThickness,
    cloudScale: cloudScale ?? this.cloudScale,
    cloudWindX: cloudWindX ?? this.cloudWindX,
    cloudWindZ: cloudWindZ ?? this.cloudWindZ,
    cloudPhase: cloudPhase ?? this.cloudPhase,
    cloudDetail: cloudDetail ?? this.cloudDetail,
    cloudSilverLining: cloudSilverLining ?? this.cloudSilverLining,
    cloudSampleCount: cloudSampleCount ?? this.cloudSampleCount,
  );

  void validate() {
    final problems = <String>[];
    void range(String name, double v, double lo, double hi, {bool loOpen = false}) {
      final below = loOpen ? v <= lo : v < lo;
      if (!v.isFinite || below || v > hi) {
        problems.add('$name=$v (expected ${loOpen ? '(' : '['}$lo, $hi])');
      }
    }

    if (assetId.trim().isEmpty) problems.add('assetId must not be empty');
    for (final (name, color) in [('horizon', horizon), ('zenith', zenith), ('ground', ground)]) {
      if (!color.isFinite) problems.add('$name must be finite: $color');
    }
    range('horizonGlow', horizonGlow, 0, 1);
    range('starDensity', starDensity, 0, 0.1);
    if (!rotationRadians.isFinite) problems.add('rotationRadians must be finite: $rotationRadians');
    range('exposure', exposure, 0, double.maxFinite, loOpen: true);
    range('cloudCoverage', cloudCoverage, 0, 1);
    range('cloudDensity', cloudDensity, 0, 1);
    range('cloudBaseHeight', cloudBaseHeight, 0, 100000, loOpen: true);
    range('cloudThickness', cloudThickness, 0, 100000, loOpen: true);
    range('cloudScale', cloudScale, 0, 1, loOpen: true);
    range('cloudWindX', cloudWindX, -1000, 1000);
    range('cloudWindZ', cloudWindZ, -1000, 1000);
    if (!cloudPhase.isFinite) problems.add('cloudPhase must be finite: $cloudPhase');
    range('cloudDetail', cloudDetail, 0, 1);
    range('cloudSilverLining', cloudSilverLining, 0, 1);
    if (cloudCoverage > 0 && (cloudSampleCount < 4 || cloudSampleCount > 24)) {
      problems.add('cloudSampleCount=$cloudSampleCount (expected [4, 24] while cloudCoverage > 0)');
    }
    if (problems.isNotEmpty) {
      throw ArgumentError('SkyboxDeclaration is invalid: ${problems.join('; ')}');
    }
  }
}

final class FrameEnvironment {
  final LinearColor clearColor;
  final LinearColor fogColor;
  final double fogStart;
  final double fogEnd;
  final double? fogHeightFalloff;
  final double? fogDensity;

  final LinearColor volumetricAlbedo;
  final double volumetricHeightFalloff;

  final double volumetricDustDensity;
  final double volumetricAnisotropy;
  final double volumetricJitter;
  final double volumetricIntensity;

  final int volumetricSampleCount;

  final double shadowFilterRadius;

  final double ambientLightScale;
  final double directLightScale;

  final double normalStrengthScale;
  final double roughnessScale;
  final double metallicScale;
  final double specularScale;

  final double shadowBias;

  final LinearColor reflectionColor;
  final double reflectionIntensity;
  final double reflectionConfidence;
  final LinearColor ambientColor;
  final double ambientIntensity;
  final DirectionalLight? directionalLight;
  final List<PointLight> pointLights;
  final List<SpotLight> spotLights;

  final List<VolumetricSource> volumetricSources;

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

  static const _sentinel = Object();

  FrameEnvironment copyWith({
    LinearColor? clearColor,
    LinearColor? fogColor,
    double? fogStart,
    double? fogEnd,
    Object? fogHeightFalloff = _sentinel,
    Object? fogDensity = _sentinel,
    LinearColor? volumetricAlbedo,
    double? volumetricHeightFalloff,
    double? volumetricDustDensity,
    double? volumetricAnisotropy,
    double? volumetricJitter,
    double? volumetricIntensity,
    int? volumetricSampleCount,
    double? shadowFilterRadius,
    double? ambientLightScale,
    double? directLightScale,
    double? normalStrengthScale,
    double? roughnessScale,
    double? metallicScale,
    double? specularScale,
    double? shadowBias,
    LinearColor? reflectionColor,
    double? reflectionIntensity,
    double? reflectionConfidence,
    LinearColor? ambientColor,
    double? ambientIntensity,
    Object? directionalLight = _sentinel,
    List<PointLight>? pointLights,
    List<SpotLight>? spotLights,
    List<VolumetricSource>? volumetricSources,
    List<ThermalSource>? thermalSources,
    Object? skybox = _sentinel,
  }) {
    return FrameEnvironment(
      clearColor: clearColor ?? this.clearColor,
      fogColor: fogColor ?? this.fogColor,
      fogStart: fogStart ?? this.fogStart,
      fogEnd: fogEnd ?? this.fogEnd,
      fogHeightFalloff: identical(fogHeightFalloff, _sentinel)
          ? this.fogHeightFalloff
          : fogHeightFalloff as double?,
      fogDensity: identical(fogDensity, _sentinel)
          ? this.fogDensity
          : fogDensity as double?,
      volumetricAlbedo: volumetricAlbedo ?? this.volumetricAlbedo,
      volumetricHeightFalloff:
          volumetricHeightFalloff ?? this.volumetricHeightFalloff,
      volumetricDustDensity:
          volumetricDustDensity ?? this.volumetricDustDensity,
      volumetricAnisotropy:
          volumetricAnisotropy ?? this.volumetricAnisotropy,
      volumetricJitter: volumetricJitter ?? this.volumetricJitter,
      volumetricIntensity: volumetricIntensity ?? this.volumetricIntensity,
      volumetricSampleCount:
          volumetricSampleCount ?? this.volumetricSampleCount,
      shadowFilterRadius: shadowFilterRadius ?? this.shadowFilterRadius,
      ambientLightScale: ambientLightScale ?? this.ambientLightScale,
      directLightScale: directLightScale ?? this.directLightScale,
      normalStrengthScale: normalStrengthScale ?? this.normalStrengthScale,
      roughnessScale: roughnessScale ?? this.roughnessScale,
      metallicScale: metallicScale ?? this.metallicScale,
      specularScale: specularScale ?? this.specularScale,
      shadowBias: shadowBias ?? this.shadowBias,
      reflectionColor: reflectionColor ?? this.reflectionColor,
      reflectionIntensity:
          reflectionIntensity ?? this.reflectionIntensity,
      reflectionConfidence:
          reflectionConfidence ?? this.reflectionConfidence,
      ambientColor: ambientColor ?? this.ambientColor,
      ambientIntensity: ambientIntensity ?? this.ambientIntensity,
      directionalLight: identical(directionalLight, _sentinel)
          ? this.directionalLight
          : directionalLight as DirectionalLight?,
      pointLights: pointLights ?? this.pointLights,
      spotLights: spotLights ?? this.spotLights,
      volumetricSources: volumetricSources ?? this.volumetricSources,
      thermalSources: thermalSources ?? this.thermalSources,
      skybox: identical(skybox, _sentinel)
          ? this.skybox
          : skybox as SkyboxDeclaration?,
    );
  }
}

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
