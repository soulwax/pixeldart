import 'capabilities.dart';
import 'renderer.dart';
import 'settings.dart';

/// One rung of a [bootstrapRenderer] attempt.
final class ProfileAttempt {
  /// The profile that was tried.
  final QualityProfile profile;

  /// Null when this rung succeeded, otherwise why it did not.
  final Object? error;

  const ProfileAttempt({required this.profile, this.error});

  bool get succeeded => error == null;

  Map<String, Object?> toMap() => {
    'profile': profile.kind.name,
    'succeeded': succeeded,
    if (error != null) 'error': '$error',
  };

  @override
  String toString() =>
      succeeded ? '${profile.kind.name}: ok' : '${profile.kind.name}: $error';
}

/// What [bootstrapRenderer] settled on, and everything it tried first.
final class BootstrapResult {
  /// The renderer, initialized and ready for [SceneRenderer.createWorld].
  final SceneRenderer renderer;

  /// The profile actually running — not necessarily the one requested.
  final QualityProfile profile;

  /// The configuration committed for [profile].
  final RendererConfiguration configuration;

  /// Every rung tried, in order, the last of which succeeded.
  final List<ProfileAttempt> attempts;

  const BootstrapResult({
    required this.renderer,
    required this.profile,
    required this.configuration,
    required this.attempts,
  });

  /// True when the requested profile failed and a lower one is running.
  bool get didFallBack => attempts.length > 1;

  /// A one-line human-readable reason, or null when the first rung worked.
  ///
  /// Worth surfacing in host diagnostics: a silent downgrade is the difference
  /// between "the renderer is slow" and "the renderer is running the safe
  /// graph because MSAA allocation failed", and only the host can show it.
  String? get fallbackReason {
    if (!didFallBack) return null;
    final failed = attempts.where((a) => !a.succeeded);
    return failed
        .map((a) => '${a.profile.kind.name} failed: ${a.error}')
        .join('; ');
  }

  Map<String, Object?> toMap() => {
    'profile': profile.kind.name,
    'didFallBack': didFallBack,
    if (fallbackReason != null) 'fallbackReason': fallbackReason,
    'attempts': [for (final a in attempts) a.toMap()],
  };
}

/// Initializes [renderer] against the first profile in [ladder] that works.
///
/// Every host that has integrated this package has written the same
/// try/catch/retry-on-safe block, and each has reported the downgrade
/// differently or not at all. This is that block, once, with the outcome as a
/// value the host can show.
///
/// [ladder] is tried in order and must end in a profile that can run
/// anywhere — [QualityProfile.safe] unless the host knows better. If every
/// rung fails, the last error is rethrown rather than returning a renderer
/// that was never initialized.
///
/// [configurationFor] maps a profile to its configuration, so the host keeps
/// ownership of resolution, sample count, and capacity policy. It is called
/// once per attempt, which lets a host lower internal resolution on the way
/// down the ladder rather than only changing the feature set.
///
/// ```dart
/// final boot = await bootstrapRenderer(
///   renderer: SceneRendererImpl(device),
///   surface: SurfaceMetrics.forCanvas(
///     cssWidth: canvas.clientWidth,
///     cssHeight: canvas.clientHeight,
///     devicePixelRatio: window.devicePixelRatio,
///   ),
///   ladder: const [QualityProfile.cinematic, QualityProfile.minimal,
///                  QualityProfile.safe],
///   configurationFor: (profile) => myPolicy.configuration(profile),
/// );
/// if (boot.didFallBack) reportToPlayer(boot.fallbackReason!);
/// ```
Future<BootstrapResult> bootstrapRenderer({
  required SceneRenderer renderer,
  required SurfaceMetrics surface,
  required List<QualityProfile> ladder,
  required RendererConfiguration Function(QualityProfile profile)
  configurationFor,
}) async {
  if (ladder.isEmpty) {
    throw ArgumentError(
      'bootstrapRenderer requires a non-empty profile ladder',
    );
  }
  surface.validate();
  final attempts = <ProfileAttempt>[];
  for (var rung = 0; rung < ladder.length; rung++) {
    final profile = ladder[rung];
    final configuration = configurationFor(profile);
    if (configuration.profile != profile) {
      throw ArgumentError(
        'configurationFor(${profile.kind.name}) returned a configuration for '
        '${configuration.profile.kind.name}. The mapping must be total and '
        'faithful, or the renderer runs a graph the host did not choose.',
      );
    }
    try {
      await renderer.initialize(configuration, surface);
      attempts.add(ProfileAttempt(profile: profile));
      return BootstrapResult(
        renderer: renderer,
        profile: profile,
        configuration: configuration,
        attempts: List.unmodifiable(attempts),
      );
    } catch (error) {
      attempts.add(ProfileAttempt(profile: profile, error: error));
      if (rung == ladder.length - 1) rethrow;
    }
  }
  // Unreachable: the final rung either returns or rethrows.
  throw StateError('bootstrapRenderer exhausted its ladder without a result');
}

/// The conventional ladder: [requested], then each standard profile below it,
/// ending at [QualityProfile.safe].
///
/// A host-authored profile the standard ladder does not know is tried first and
/// then falls through every standard rung — the enum's declaration order is not
/// a quality ordering (`deterministicReference`, `shipping` and
/// `legacyComparison` are purposes, not tiers), so no attempt is made to slot
/// an unknown profile into the middle of the ladder.
List<QualityProfile> defaultProfileLadder(QualityProfile requested) {
  const descending = [
    QualityProfile.cinematic,
    QualityProfile.clean,
    QualityProfile.minimal,
    QualityProfile.safe,
  ];
  final startIndex = descending.indexWhere((p) => p == requested);
  if (startIndex >= 0) {
    return List.unmodifiable(descending.sublist(startIndex));
  }
  return List.unmodifiable(<QualityProfile>{requested, ...descending});
}
