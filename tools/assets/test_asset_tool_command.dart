import 'package:pixeldart/assets/assets.dart';

void check(bool value, String message) {
  if (!value) throw StateError('FAIL: $message');
}

void main() {
  final package = AssetToolCommand.parse([
    'package',
    'assets-src/fbx/living-room',
    '--out',
    '/tmp/review',
  ]);
  check(package?.subcommand == AssetToolSubcommand.package, 'package parses');
  check(package?.arguments.last == '/tmp/review', 'output path is retained');

  final init = AssetToolCommand.parse([
    'init',
    'living-room',
    'assimp-cli',
    '6.0.0',
    'import.json',
  ]);
  check(init?.subcommand == AssetToolSubcommand.init, 'init parses');
  check(
    AssetToolCommand.parse(['package', 'room']) == null,
    'bad shape rejects',
  );
  check(AssetToolCommand.usage.contains('preflight'), 'usage is complete');
  print('RF-02 asset command contract passed.');
}
