/// Pure command vocabulary shared by the Pixeldart offline asset tools.
///
/// Parsing is deliberately side-effect free. File access, process launch and
/// temporary-directory ownership belong to the CLI layer, not this contract.
enum AssetToolSubcommand { init, verify, convert, package, doctor, preflight }

final class AssetToolCommand {
  final AssetToolSubcommand subcommand;
  final List<String> arguments;

  const AssetToolCommand(this.subcommand, this.arguments);

  static AssetToolCommand? parse(List<String> args) {
    if (args.length == 5 && args.first == 'init') {
      return AssetToolCommand(AssetToolSubcommand.init, args.sublist(1));
    }
    if (args.length == 2 && args.first == 'verify') {
      return AssetToolCommand(AssetToolSubcommand.verify, args.sublist(1));
    }
    if (args.length == 4 && args.first == 'convert' && args[2] == '--out') {
      return AssetToolCommand(AssetToolSubcommand.convert, [args[1], args[3]]);
    }
    if (args.length == 4 && args.first == 'package' && args[2] == '--out') {
      return AssetToolCommand(AssetToolSubcommand.package, [args[1], args[3]]);
    }
    if (args.length == 1 && args.first == 'doctor') {
      return const AssetToolCommand(AssetToolSubcommand.doctor, []);
    }
    if (args.length == 3 && args.first == 'preflight') {
      return AssetToolCommand(AssetToolSubcommand.preflight, args.sublist(1));
    }
    return null;
  }

  static String get usage =>
      'init <asset-id> <converter-id> <converter-version> <import.json>\n'
      'verify <generated-manifest.json>\n'
      'convert <asset-dir> --out <dir>\n'
      'package <asset-dir> --out <dir>\n'
      'doctor\n'
      'preflight <model.fbx> <import.json>';
}
