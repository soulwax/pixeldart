import 'dart:io';

void main() {
  final package = _packageDirectory();
  final pubspec = File('${package.path}/pubspec.yaml').readAsStringSync();
  final version = RegExp(r'^version:\s*(\S+)', multiLine: true).firstMatch(pubspec)?.group(1);
  if (version == null || !RegExp(r'^0\.\d+\.\d+$').hasMatch(version)) {
    throw StateError('pre-1.0 package version is missing or malformed: $version');
  }
  final changelog = File('${package.path}/CHANGELOG.md').readAsStringSync();
  if (!changelog.contains('## $version')) {
    throw StateError('CHANGELOG.md has no heading for package version $version');
  }
  print('PLIB-10 versioning fixture passed: $version.');
}

Directory _packageDirectory() {
  final cwd = Directory.current;
  if (File('${cwd.path}/pubspec.yaml').existsSync() &&
      File('${cwd.path}/lib/pixeldart.dart').existsSync()) return cwd;
  final nested = Directory('${cwd.path}/external/pixeldart');
  if (File('${nested.path}/pubspec.yaml').existsSync()) return nested;
  throw StateError('cannot locate external/pixeldart package directory');
}
