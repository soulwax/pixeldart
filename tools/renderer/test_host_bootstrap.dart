import 'dart:io';

import 'package:pixeldart/rendering/rendering.dart';

void check(bool condition, String message) {
  if (!condition) throw StateError('host bootstrap: $message');
}

Future<void> expectThrows(Future<void> Function() body, String what) async {
  try {
    await body();
  } on Object {
    return;
  }
  throw StateError('host bootstrap: $what should have thrown');
}

/// A renderer double that fails initialization for a chosen set of profiles.
///
/// The bootstrap ladder is a policy over `initialize` outcomes, so the double
/// only needs to model that. Everything else throws, which keeps the fixture
/// honest about what it is exercising.
final class _LadderRenderer implements SceneRenderer {
  final Set<QualityProfileKind> failingKinds;
  final List<QualityProfileKind> attempted = [];

  _LadderRenderer(this.failingKinds);

  RendererConfiguration? _committed;

  @override
  Future<void> initialize(
    RendererConfiguration configuration,
    SurfaceMetrics surface,
  ) async {
    attempted.add(configuration.profile.kind);
    if (failingKinds.contains(configuration.profile.kind)) {
      throw StateError('${configuration.profile.kind.name} allocation failed');
    }
    _committed = configuration;
  }

  @override
  RendererConfiguration get configuration =>
      _committed ?? (throw StateError('not initialized'));

  @override
  dynamic noSuchMethod(Invocation invocation) => throw UnimplementedError(
    '${invocation.memberName} is not part of this '
    'fixture; the bootstrap ladder only drives initialize()',
  );
}

RendererConfiguration _configFor(QualityProfile profile) =>
    RendererConfiguration(
      profile: profile,
      internalWidth: 640,
      internalHeight: 360,
      shadowMapCount: profile == QualityProfile.safe ? 0 : 1,
      shadowMapSize: 512,
    );

Future<void> main() async {
  final surface = SurfaceMetrics.pixels(width: 640, height: 360);

  // The happy path: the first rung works and nothing is reported as a downgrade.
  final clean = _LadderRenderer(const {});
  final ok = await bootstrapRenderer(
    renderer: clean,
    surface: surface,
    ladder: const [QualityProfile.cinematic, QualityProfile.safe],
    configurationFor: _configFor,
  );
  check(ok.profile == QualityProfile.cinematic, 'the first rung must be used');
  check(!ok.didFallBack, 'a first-rung success is not a fallback');
  check(ok.fallbackReason == null, 'a first-rung success has no reason');
  check(ok.attempts.length == 1, 'only one rung should have been tried');
  check(clean.attempted.length == 1, 'no further rungs should be attempted');

  // The path every host hand-rolled: the top profile fails and a lower one
  // runs. The host now learns which, and why, instead of guessing.
  final degraded = _LadderRenderer(const {QualityProfileKind.high});
  final fell = await bootstrapRenderer(
    renderer: degraded,
    surface: surface,
    ladder: const [
      QualityProfile.cinematic,
      QualityProfile.minimal,
      QualityProfile.safe,
    ],
    configurationFor: _configFor,
  );
  check(fell.profile == QualityProfile.minimal, 'must settle on the next rung');
  check(fell.didFallBack, 'a downgrade must be reported as one');
  check(
    fell.fallbackReason!.contains('high failed'),
    'the reason must name the profile that failed, got ${fell.fallbackReason}',
  );
  check(fell.attempts.length == 2, 'two rungs should be recorded');
  check(!fell.attempts.first.succeeded, 'the first attempt must be a failure');
  check(fell.attempts.last.succeeded, 'the last attempt must be the success');

  // Every rung failing must rethrow rather than hand back a renderer that was
  // never initialized — the failure mode that turns into a confusing
  // "beginFrame before readiness" crash three calls later.
  final broken = _LadderRenderer(const {
    QualityProfileKind.high,
    QualityProfileKind.standard,
    QualityProfileKind.safe,
  });
  await expectThrows(
    () => bootstrapRenderer(
      renderer: broken,
      surface: surface,
      ladder: const [QualityProfile.cinematic, QualityProfile.safe],
      configurationFor: _configFor,
    ),
    'an exhausted ladder',
  );
  check(broken.attempted.length == 2, 'an exhausted ladder tries every rung');

  // A configurationFor that returns the wrong profile would silently run a
  // graph the host did not pick. Reject it at the boundary.
  await expectThrows(
    () => bootstrapRenderer(
      renderer: _LadderRenderer(const {}),
      surface: surface,
      ladder: const [QualityProfile.cinematic],
      configurationFor: (_) => _configFor(QualityProfile.safe),
    ),
    'a configurationFor that ignores its argument',
  );

  await expectThrows(
    () => bootstrapRenderer(
      renderer: _LadderRenderer(const {}),
      surface: surface,
      ladder: const [],
      configurationFor: _configFor,
    ),
    'an empty ladder',
  );

  // The default ladder descends and never climbs.
  final fromTop = defaultProfileLadder(QualityProfile.cinematic);
  check(
    fromTop.first == QualityProfile.cinematic,
    'the ladder starts at the request',
  );
  check(fromTop.last == QualityProfile.safe, 'the ladder must end at safe');
  final fromBottom = defaultProfileLadder(QualityProfile.safe);
  check(
    fromBottom.length == 1 && fromBottom.single == QualityProfile.safe,
    'asking for safe must not produce a pointless climb down from itself',
  );
  final fromMiddle = defaultProfileLadder(QualityProfile.minimal);
  check(
    !fromMiddle.contains(QualityProfile.cinematic),
    'the ladder must never try a profile above the request',
  );
  final custom = defaultProfileLadder(QualityProfile.ps1Full);
  check(
    custom.first == QualityProfile.ps1Full,
    'a host profile is tried first',
  );
  check(
    custom.last == QualityProfile.safe,
    'a host profile still ends at safe',
  );

  // The reported result serializes for diagnostics.
  final map = fell.toMap();
  check(map['didFallBack'] == true, 'toMap must report the downgrade');
  check((map['attempts']! as List).length == 2, 'toMap must list the attempts');

  stdout.writeln('Host bootstrap fixtures passed.');
}
