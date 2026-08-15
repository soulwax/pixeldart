import 'dart:convert';

import 'package:pixeldart/rendering/rendering.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

void main() {
  const currentKey = 'pixeldart.graphics.profile.v1';
  const legacyKey = 'quarantine.graphics.profile';
  final migrated = RendererSettingsMigration.read(
    storage: {
      legacyKey: jsonEncode({'profile': 'safe', 'fbxDiagnostics': false}),
    },
    currentKey: currentKey,
    legacyKey: legacyKey,
    currentVersion: 1,
  );
  require(migrated.migrated, 'legacy settings are marked migrated');
  require(migrated.values['version'] == 1, 'migration stamps current version');
  require(migrated.values['profile'] == 'safe', 'legacy values are preserved');

  final current = RendererSettingsMigration.read(
    storage: {
      currentKey: jsonEncode({'version': 1, 'profile': 'high'}),
    },
    currentKey: currentKey,
    legacyKey: legacyKey,
    currentVersion: 1,
  );
  require(
    !current.migrated && current.sourceKey == currentKey,
    'current settings win',
  );

  final empty = RendererSettingsMigration.read(
    storage: {currentKey: '{bad'},
    currentKey: currentKey,
    legacyKey: legacyKey,
    currentVersion: 1,
  );
  require(
    empty.values['version'] == 1 && !empty.migrated,
    'malformed settings fail closed',
  );

  const diagnostics = ModelPackageDiagnostics(
    assetId: 'room',
    activeLod: 'LOD0',
    attached: false,
    itemCount: 0,
    meshCount: 0,
    cacheReferenceCount: 0,
  );
  final encoded = jsonDecode(diagnostics.encode()) as Map<String, dynamic>;
  require(
    encoded['schema'] == 'pixeldart-model-package-diagnostic-v1',
    'diagnostic schema is stable',
  );
  require(encoded['attached'] == false, 'diagnostic reports detached state');
  print('RF-07 diagnostics/settings tests passed.');
}
