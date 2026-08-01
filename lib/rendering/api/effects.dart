/// Post-processing feature weights, not game states (§5.2). The caller's
/// `GameFrameAdapter` maps `GameTime`, mantle data, panel state,
/// `RuptureState`, URL profile, and accessibility preferences into these
/// values; no switch on a game-side step type belongs in `lib/rendering/**`.
final class PostProcessState {
  final double exposure;
  final double bloomStrength;
  final double ssaoStrength;
  final double depthOfFieldStrength;
  final double vignette;
  final double grain;
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
  }

  Map<String, double> get _weights => {
    'exposure': exposure,
    'bloomStrength': bloomStrength,
    'ssaoStrength': ssaoStrength,
    'depthOfFieldStrength': depthOfFieldStrength,
    'vignette': vignette,
    'grain': grain,
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
