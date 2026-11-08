import 'dart:js_interop';

import 'package:pixeldart/pixeldart.dart';
import 'package:pixeldart/rendering/webgl/pixeldart_app.dart';
import 'package:web/web.dart' as web;

/// A decoded GLB registered once and instantiated many times, keeping the
/// asset's node hierarchy (multi-part ships place masts and sails with node
/// transforms, so flattening the meshes would scatter them).
///
/// Kenney's newer kits texture everything through one external palette image
/// (`Textures/colormap.png`). The decoder only extracts embedded images, so
/// the caller passes that shared texture in as [palette].
final class Model {
  final List<_Template> _nodes;

  /// Model-space bounds at scale 1.
  final Aabb bounds;

  Model._(this._nodes, this.bounds);

  static Future<Model> load(PixeldartApp app, String url, {required TextureHandle palette}) async {
    final response = await web.window.fetch(url.toJS).toDart;
    if (!response.ok) throw StateError('Failed to fetch $url (${response.status})');
    final bytes = (await response.arrayBuffer().toDart).toDart.asUint8List();
    final result = GlbDecoder.decode(bytes);
    final name = url.split('/').last.replaceAll('.glb', '');

    final materials = [
      for (final m in result.materials)
        app.createMaterial(
          MaterialDefinition(
            key: '$name/${m.key}',
            albedoTexture: palette,
            // Authored as unlit palette art; a matte dielectric reads right
            // under the sun, the lighthouse beam and the flares.
            roughness: 0.78,
            metallic: 0.0,
          ),
        ),
    ];

    // Meshes are matched by MeshData identity: the decoder's flat mesh list
    // is in glTF mesh order, which need not match the node traversal.
    final meshes = <MeshData, MeshHandle>{};
    final index = <SceneNode, int>{};
    final nodes = <_Template>[];
    Aabb? bounds;
    result.rootNode.traverse((node) {
      final data = node.meshData;
      final parent = node.parent;
      index[node] = nodes.length;
      nodes.add(
        _Template(
          parent: parent == null ? -1 : index[parent]!,
          transform: node.localTransform,
          data: data,
          mesh: data == null ? null : meshes.putIfAbsent(data, () => app.createMesh(data, debugLabel: name)),
          material: data == null ? null : materials[node.sortTiebreaker.clamp(0, materials.length - 1)],
        ),
      );
      final world = node.worldBounds;
      if (data != null && world != null) bounds = bounds?.union(world) ?? world;
    });
    return Model._(nodes, bounds ?? Aabb(Vec3.zero, Vec3.zero));
  }

  SceneNode instantiate({String? name, double scale = 1}) {
    final built = <SceneNode>[];
    for (final t in _nodes) {
      final node = SceneNode(
        name: name,
        transform: t.transform,
        mesh: t.mesh,
        meshData: t.data,
        material: t.material,
      );
      if (t.parent >= 0) built[t.parent].addChild(node);
      built.add(node);
    }
    return built.first..scale = scale;
  }
}

final class _Template {
  final int parent;
  final Transform transform;
  final MeshData? data;
  final MeshHandle? mesh;
  final MaterialHandle? material;
  const _Template({
    required this.parent,
    required this.transform,
    this.data,
    this.mesh,
    this.material,
  });
}
