import 'dart:io';

List<String> discoverScripts(Directory packageRoot) {
  final rendererDir = Directory(
    '${packageRoot.path}${Platform.pathSeparator}tools${Platform.pathSeparator}renderer',
  );
  final names =
      rendererDir
          .listSync()
          .whereType<File>()
          .map((file) => file.uri.pathSegments.last)
          .where(
            (name) =>
                name.startsWith('test_') &&
                name.endsWith('.dart') &&
                name != 'test_all.dart',
          )
          .toList()
        ..sort();
  return List.unmodifiable([for (final name in names) 'tools/renderer/$name']);
}

Directory packageRootFromScript() {
  final script = File.fromUri(Platform.script).absolute;
  // test_all.dart lives at <package>/tools/renderer/test_all.dart.
  return script.parent.parent.parent;
}

void main() {
  final packageRoot = packageRootFromScript();
  final scripts = discoverScripts(packageRoot);
  if (scripts.isEmpty) {
    stderr.writeln(
      'No renderer test scripts discovered in ${packageRoot.path}',
    );
    exit(2);
  }

  var failures = 0;
  for (final script in scripts) {
    stdout.writeln('--- $script ---');
    final result = Process.runSync(Platform.resolvedExecutable, [
      '--suppress-analytics',
      'run',
      script,
    ], workingDirectory: packageRoot.path);
    stdout.write(result.stdout);
    if (result.exitCode != 0) {
      failures += 1;
      stderr.write(result.stderr);
      stderr.writeln('FAILED: $script (exit ${result.exitCode})');
    }
  }

  if (failures == 0) {
    stdout.writeln('All ${scripts.length} renderer test scripts passed.');
    return;
  }
  stderr.writeln(
    '$failures of ${scripts.length} renderer test scripts failed.',
  );
  exit(1);
}
