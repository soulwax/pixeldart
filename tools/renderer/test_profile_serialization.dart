import 'package:pixeldart/rendering/api/capabilities.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

void expectFormatError(Object Function() action, String message) {
  try {
    action();
  } on FormatException {
    return;
  }
  throw StateError(message);
}

void main() {
  for (final profile in [
    QualityProfile.safe,
    QualityProfile.minimal,
    QualityProfile.clean,
    QualityProfile.ps1Full,
  ]) {
    final restored = QualityProfile.fromMap(profile.toMap());
    require(restored.kind == profile.kind, 'profile kind did not round-trip');
    require(
      restored.installedFeatures.length == profile.installedFeatures.length &&
          restored.installedFeatures.containsAll(profile.installedFeatures),
      'profile features did not round-trip',
    );
  }

  expectFormatError(
    () => QualityProfile.fromMap(const {
      'kind': 'shipping',
      'features': ['bogus'],
    }),
    'unknown profile features must be rejected',
  );
  expectFormatError(
    () => QualityProfile.fromMap(const {'kind': 'bogus', 'features': []}),
    'unknown profile kinds must be rejected',
  );
  expectFormatError(
    () => QualityProfile.fromMap(const {
      'kind': 'safe',
      'features': ['bloom'],
    }),
    'safe profiles must not install features',
  );
  print('Renderer profile serialization fixtures passed.');
}
