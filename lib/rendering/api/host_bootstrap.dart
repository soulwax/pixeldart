import 'capabilities.dart';
import 'renderer.dart';
import 'settings.dart';

final class ProfileAttempt {
  final QualityProfile profile;

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

final class BootstrapResult {
  final SceneRenderer renderer;

  final QualityProfile profile;

  final RendererConfiguration configuration;

  final List<ProfileAttempt> attempts;

  const BootstrapResult({
    required this.renderer,
    required this.profile,
    required this.configuration,
    required this.attempts,
  });

  bool get didFallBack => attempts.length > 1;

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
