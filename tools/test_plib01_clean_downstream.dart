import 'dart:io';

/// Compiles a tiny package that depends on Pixeldart by path, without the game
/// package in its dependency graph. Runtime lifecycle coverage lives in
/// [test_plib03_downstream_host.dart]; this check proves the install boundary.
void main() {
  final package = _packageDirectory();
  final host = Directory.systemTemp.createTempSync('pixeldart-plib01-');
  try {
    File('${host.path}/pubspec.yaml').writeAsStringSync('''
name: neutral_downstream
environment:
  sdk: ^3.12.0
dependencies:
  pixeldart:
    path: ${package.path}
''');
    Directory('${host.path}/bin').createSync();
    File('${host.path}/bin/main.dart').writeAsStringSync(r'''
import 'dart:typed_data';
import 'package:pixeldart/pixeldart.dart';

void main() {
  const configuration = RendererConfiguration.safe;
  final mesh = MeshData(
    layout: VertexLayoutDescriptor.compatibility14,
    vertices: Float32List(14 * 3),
    localBounds: const Aabb(Vec3(-1, -1, -1), Vec3(1, 1, 1)),
  );
  const material = MaterialDefinition(key: 'neutral');
  final camera = CameraView(
    view: Mat4.identity(),
    projection: Mat4.identity(),
    viewProjection: Mat4.identity(),
    eye: Vec3.zero,
    forward: const Vec3(0, 0, 1),
    near: 0.1,
    far: 10,
    aspect: 1,
  );
  final frame = FrameInput(
    camera: camera,
    environment: const FrameEnvironment(
      directionalLight: DirectionalLight(
        direction: Vec3(0, 0, -1),
        color: LinearColor.white,
      ),
    ),
    post: PostProcessState.off,
    frameIndex: 0,
    historyEpoch: 0,
    noiseSeed: 0,
    timeSeconds: 0,
  );
  if (configuration.profile.kind.name.isEmpty ||
      mesh.vertexCount != 3 || material.key.isEmpty || frame.frameIndex != 0) {
    throw StateError('stable Pixeldart contracts did not compile');
  }
}
''');
    _run(host, ['pub', 'get']);
    _run(host, ['analyze', 'bin/main.dart']);
    print('PLIB-01 clean downstream compile passed.');
  } finally {
    host.deleteSync(recursive: true);
  }
}

void _run(Directory host, List<String> args) {
  final result = Process.runSync(
    Platform.resolvedExecutable,
    args,
    workingDirectory: host.path,
  );
  stdout.write(result.stdout);
  stderr.write(result.stderr);
  if (result.exitCode != 0) {
    throw StateError('downstream command failed: dart ${args.join(' ')}');
  }
}

Directory _packageDirectory() {
  final cwd = Directory.current;
  if (File('${cwd.path}/pubspec.yaml').existsSync()) return cwd.absolute;
  final nested = Directory('${cwd.path}/external/pixeldart');
  if (File('${nested.path}/pubspec.yaml').existsSync()) return nested.absolute;
  throw StateError('cannot locate external/pixeldart package directory');
}
