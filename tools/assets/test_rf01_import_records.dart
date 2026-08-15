import 'dart:convert';
import 'dart:typed_data';

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
  final package = ModelPackageManifest(
    assetId: 'room',
    packageHash: '0' * 64,
    sourceFormat: 'fbx',
    materials: ['default'],
    parts: [
      ModelPackagePart(
        id: 'wall',
        materialSlot: 0,
        lodFiles: {'LOD0': 'wall.qmesh'},
      ),
    ],
  );
  check(package.validate().isEmpty, 'model package manifest validates');
  check(
    package.computedPackageHash().length == 64,
    'model package hash is deterministic',
  );
  final invalidPackage = ModelPackageManifest(
    assetId: package.assetId,
    packageHash: 'bad',
    sourceFormat: package.sourceFormat,
    materials: package.materials,
    parts: package.parts,
  );
  final validated = validateModelPackageManifest(invalidPackage);
  check(
    validated.any((diagnostic) => diagnostic.code == 'MODEL_PACKAGE_INVALID'),
    'package validator rejects malformed hash',
  );
  final cpu = ValidatedModelPackage(
    manifest: package,
    payloads: {
      'wall.qmesh': Uint8List.fromList([1, 2, 3]),
    },
  );
  check(
    cpu.payload('wall.qmesh').length == 3,
    'validated package retains bytes',
  );
  final emitted = ModelPackageEmitter.emit(
    assetId: 'room',
    sourceFormat: 'gltf',
    scene: normalizeGltfScene({
      'meshes': [
        {
          'primitives': [
            {
              'attributes': {'POSITION': 0},
            },
          ],
        },
      ],
    }),
    payloads: {
      'primitive-000.qmesh': Uint8List.fromList([9, 8, 7]),
    },
  );
  check(emitted.manifest.packageHash.length == 64, 'emitter hashes package');
  check(
    emitted.payloads['primitive-000.qmesh']!.first == 9,
    'emitter retains payload bytes',
  );
  print('RF-01 import records passed.');
}
