/// Frame presentation and appearance weights, not game states (§5.2).
/// A host frame adapter maps simulation time, interaction data, panel state,
/// URL profile, and accessibility preferences into these values. Weather and
/// material facts are resolved by the host; Pixeldart validates and applies
/// them consistently across the world and presentation passes. No switch on
/// a game-side step type belongs in `lib/rendering/**`.
final class PostProcessState {
  final double exposure;
  final double bloomStrength;
  final double ssaoStrength;
  final double depthOfFieldStrength;
  final double vignette;
  final double grain;

  /// Host-provided precipitation amount in [0, 1]. The present pass never
  /// paints precipitation over the image; hosts use this value when mapping
  /// weather facts into physical particle submission and related policies.
  final double rainIntensity;

  /// Material wetness response in [0, 1], independent of screen-space
  /// precipitation.
  final double surfaceWetness;

  /// Host-resolved snow coverage and slow material dissolution. These are
  /// appearance facts only; accumulation, heat and phase changes remain
  /// simulation-owned by the caller.
  final double surfaceSnowCoverage;
  final double surfaceDissolution;

  /// Aperture visibility for physical precipitation in [0, 1]. A closed room
  /// can suppress exterior particle submission without inventing an interior
  /// screen overlay. This is presentation data, not a portal rule.
  final double rainWindowVisibility;
  final double ditherStrength;
  final double colorGradeStrength;
  final double affineWarpStrength;
  final double vertexSnapGrid;
  final int quantizationBits;

  final double vhsChromaWeight;
  final double vhsTrackingWeight;
  final double vhsNoiseWeight;
  final double vhsHeadSwitchWeight;
  final double vhsDropoutWeight;
  final double vhsGhostWeight;

  final bool reducedMotion;

  const PostProcessState({
    this.exposure = 1,
    this.bloomStrength = 0,
    this.ssaoStrength = 0,
    this.depthOfFieldStrength = 0,
    this.vignette = 0,
    this.grain = 0,
    this.rainIntensity = 0,
    this.surfaceWetness = 0,
    this.surfaceSnowCoverage = 0,
    this.surfaceDissolution = 0,
    this.rainWindowVisibility = 1,
    this.ditherStrength = 0,
    this.colorGradeStrength = 0,
    this.affineWarpStrength = 0,
    this.vertexSnapGrid = 0,
    this.quantizationBits = 8,
    this.vhsChromaWeight = 0,
    this.vhsTrackingWeight = 0,
    this.vhsNoiseWeight = 0,
    this.vhsHeadSwitchWeight = 0,
    this.vhsDropoutWeight = 0,
    this.vhsGhostWeight = 0,
    this.reducedMotion = false,
  });

  static const PostProcessState off = PostProcessState();

  void validate() {
    for (final MapEntry(:key, :value) in _weights.entries) {
      if (!value.isFinite || value < 0) {
        throw ArgumentError('PostProcessState.$key must be >= 0: $value');
      }
    }
    if (quantizationBits < 1 || quantizationBits > 8) {
      throw ArgumentError(
        'PostProcessState.quantizationBits must be in [1, 8]: $quantizationBits',
      );
    }
    if (rainIntensity > 1) {
      throw ArgumentError(
        'PostProcessState.rainIntensity must be in [0, 1]: $rainIntensity',
      );
    }
    if (surfaceWetness > 1) {
      throw ArgumentError(
        'PostProcessState.surfaceWetness must be in [0, 1]: '
        '$surfaceWetness',
      );
    }
    if (surfaceSnowCoverage > 1) {
      throw ArgumentError(
        'PostProcessState.surfaceSnowCoverage must be in [0, 1]: '
        '$surfaceSnowCoverage',
      );
    }
    if (surfaceDissolution > 1) {
      throw ArgumentError(
        'PostProcessState.surfaceDissolution must be in [0, 1]: '
        '$surfaceDissolution',
      );
    }
    if (rainWindowVisibility > 1) {
      throw ArgumentError(
        'PostProcessState.rainWindowVisibility must be in [0, 1]: '
        '$rainWindowVisibility',
      );
    }
  }

  Map<String, double> get _weights => {
    'exposure': exposure,
    'bloomStrength': bloomStrength,
    'ssaoStrength': ssaoStrength,
    'depthOfFieldStrength': depthOfFieldStrength,
    'vignette': vignette,
    'grain': grain,
    'rainIntensity': rainIntensity,
    'surfaceWetness': surfaceWetness,
    'surfaceSnowCoverage': surfaceSnowCoverage,
    'surfaceDissolution': surfaceDissolution,
    'rainWindowVisibility': rainWindowVisibility,
    'ditherStrength': ditherStrength,
    'colorGradeStrength': colorGradeStrength,
    'affineWarpStrength': affineWarpStrength,
    'vertexSnapGrid': vertexSnapGrid,
    'vhsChromaWeight': vhsChromaWeight,
    'vhsTrackingWeight': vhsTrackingWeight,
    'vhsNoiseWeight': vhsNoiseWeight,
    'vhsHeadSwitchWeight': vhsHeadSwitchWeight,
    'vhsDropoutWeight': vhsDropoutWeight,
    'vhsGhostWeight': vhsGhostWeight,
  };
}
