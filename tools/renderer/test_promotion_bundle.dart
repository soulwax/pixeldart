import 'dart:typed_data';

import 'package:pixeldart/assets/assets.dart';
import 'package:pixeldart/rendering/rendering.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

BrowserLifecycleEvidence life(String scenario, {int items = 0}) =>
    BrowserLifecycleEvidence(
      scenario: scenario,
      liveWorldItems: items,
      liveMeshResources: items,
      liveCacheReferences: items,
      collisionPreserved: true,
      focusPreserved: true,
      savePreserved: true,
    );

BrowserPerformanceEvidence perf(String profile) => BrowserPerformanceEvidence(
  profile: profile,
  parseMicros: 1,
  decodeMicros: 1,
  uploadMicros: 1,
  firstDrawMicros: 1,
  cycleCount: 100,
  initialResourceCount: 1,
  finalResourceCount: 1,
);

void main() {
  final scene = normalizeGltfScene({
    'meshes': [
      {
        'primitives': [
          {
            'attributes': {'POSITION': 0},
          },
        ],
      },
    ],
  });
  final emitted = ModelPackageEmitter.emit(
    assetId: 'room',
    sourceFormat: 'gltf',
    scene: scene,
    payloads: {
      'primitive-000.qmesh': Uint8List.fromList([1, 2, 3]),
    },
  );
  final base = ModelPackageManifest(
    assetId: 'room',
    packageHash: '0'.padRight(64, '0'),
    sourceFormat: 'gltf',
    parts: emitted.manifest.parts,
    materials: emitted.manifest.materials,
    provenance: {
      'promotion': 'approved',
      'runtimeProfile': 'runtime',
      'licenseId': 'cc-by-4.0',
      'sourceHash': 'b'.padRight(64, 'b'),
    },
  );
  final manifest = ModelPackageManifest(
    assetId: base.assetId,
    packageHash: ModelPackageEmitter.computePackageHash(base, emitted.payloads),
    sourceFormat: base.sourceFormat,
    parts: base.parts,
    materials: base.materials,
    provenance: base.provenance,
  );
  final captures =
      [
            const BrowserPromotionCapture(
              packageHash: '',
              lod: 'LOD0',
              width: 1920,
              height: 1080,
              nonEmptyPixels: 1,
              bounds: [-1, -1, -1, 1, 1, 1],
            ),
            const BrowserPromotionCapture(
              packageHash: '',
              lod: 'LOD1',
              width: 1280,
              height: 720,
              nonEmptyPixels: 1,
              bounds: [-1, -1, -1, 1, 1, 1],
            ),
          ]
          .map(
            (capture) => BrowserPromotionCapture(
              packageHash: manifest.packageHash,
              lod: capture.lod,
              width: capture.width,
              height: capture.height,
              nonEmptyPixels: capture.nonEmptyPixels,
              bounds: capture.bounds,
            ),
          )
          .toList();
  final lifecycle =
      [
            'disabled',
            'lod0',
            'lod1',
            'missing-package',
            'corrupt-package',
            'context-loss',
            'rollback',
          ]
          .map((scenario) => life(scenario, items: scenario == 'lod0' ? 1 : 0))
          .toList();
  final report = const PromotionBundleGate().evaluate(
    manifest: manifest,
    payloads: emitted.payloads,
    captures: captures,
    lifecycle: lifecycle,
    performance: [perf('high'), perf('standard'), perf('safe')],
  );
  require(report.passed, 'complete promotion bundle passes');
  final failed = const PromotionBundleGate().evaluate(
    manifest: manifest,
    payloads: emitted.payloads,
    captures: captures.sublist(0, 1),
    lifecycle: lifecycle,
    performance: [perf('high')],
  );
  require(
    !failed.passed && failed.failures.any((item) => item.startsWith('pixels:')),
    'bundle preserves lane failures',
  );
  print('Promotion bundle tests passed.');
}
