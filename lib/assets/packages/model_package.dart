import 'dart:typed_data';

import 'model_package_manifest.dart';

final class ValidatedModelPackage {
  final ModelPackageManifest manifest;
  final Map<String, Uint8List> payloads;

  const ValidatedModelPackage({required this.manifest, required this.payloads});

  Uint8List payload(String path) =>
      payloads[path] ??
      (throw StateError('model package payload is missing: $path'));
}
