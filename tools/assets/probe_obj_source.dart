import 'dart:convert';
import 'dart:io';

import 'package:pixeldart/assets/assets.dart';

/// Offline evidence tool for a licensed OBJ/MTL pair.
///
/// Usage: `dart run .../probe_obj_source.dart model.obj model.mtl`
/// The source remains outside the repository and no output is written beside
/// it. The final line is a stable digest of the normalized scene record.
void main(List<String> arguments) {
  if (arguments.length != 2) {
    stderr.writeln('usage: probe_obj_source.dart MODEL.OBJ MATERIALS.MTL');
    exitCode = 64;
    return;
  }
  final objFile = File(arguments[0]);
  final mtlFile = File(arguments[1]);
  if (!objFile.existsSync() || !mtlFile.existsSync()) {
    stderr.writeln('OBJ and MTL paths must exist');
    exitCode = 66;
    return;
  }
  final scene = parseObj(objFile.readAsStringSync());
  final material = parseMtl(mtlFile.readAsStringSync());
  validateObjMaterialBindings(scene, material);
  final package = ObjModelPackageEmitter.emit(
    assetId: 'porcelain-mermaid',
    scene: scene,
    materials: material,
  );
  final packageErrors = package.manifest.validate();
  if (packageErrors.isNotEmpty) {
    throw FormatException(packageErrors.join('; '));
  }
  final canonical = scene.canonicalJson();
  final digest = Sha256.compute(utf8.encode(canonical));
  stdout.writeln(
    'OBJ evidence: vertices=${scene.positions.length} '
    'triangles=${scene.triangles.length} materials=${material.length} '
    'bounds=${scene.bounds.join(",")} digest=$digest '
    'packageHash=${package.manifest.packageHash} '
    'payloads=${package.payloads.length}',
  );
}
