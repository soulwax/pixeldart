import 'dart:convert';

import 'package:pixeldart/assets/assets.dart';

void check(bool value, String message) {
  if (!value) throw StateError('FAIL: $message');
}

void main() {
  final config = FbxImportConfig.recommended(
    assetId: 'test-room',
    converterId: 'assimp-cli',
    converterVersion: '6.0.0',
  );
  check(config.validate().isEmpty, 'recommended config validates');
  check(
    FbxImportConfig.fromJson(config.toJson()).canonicalJson() ==
        config.canonicalJson(),
    'config canonical JSON round-trips',
  );
  check(
    config.settingsHash == config.computedSettingsHash(),
    'settings hash is deterministic',
  );
  check(
    Sha256.compute(const []) ==
        'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    'SHA-256 matches the standard empty-input vector',
  );

  const diagnostic = AssetImportDiagnostic(
    code: 'SOURCE_MISSING',
    severity: DiagnosticSeverity.error,
    stage: 'source',
    relativePath: 'source/room.fbx',
    message: 'source file is missing',
    remediation: 'restore the licensed source packet',
  );
  const preflight = FbxPreflightResult(
    sourcePath: 'source/room.fbx',
    sourceBytes: 0,
    binaryHeader: false,
    diagnostics: [diagnostic],
  );
  check(!preflight.passed, 'error diagnostic fails preflight');
  final encoded = jsonDecode(jsonEncode(preflight.toJson()));
  check(
    encoded is Map && encoded['schema'] == 'pixeldart-fbx-preflight-v1',
    'preflight schema is stable',
  );
  final packageDiagnostics = validateGeneratedPackageManifest({
    'assetId': 'test-room',
    'packageHash': 'bad',
  });
  check(
    packageDiagnostics.any((diagnostic) => diagnostic.code == 'PACKAGE_HASH'),
    'package validation emits stable hash code',
  );
  print('RF-01 import records passed.');
}
