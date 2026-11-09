import '../api/handles.dart';
import '../api/materials.dart';
import '../api/mesh.dart';
import '../api/renderer.dart';
import '../math/bounds.dart';
import '../math/transform.dart';
import '../math/vec.dart';
import '../scene/scene_node.dart';
import 'glb_decoder.dart';

/// Rewrites a decoded material before it is registered. Receives the
/// authored material name (`metal`, `crystal`, ...) and its decoded
/// definition, textures already bound.
typedef MaterialOverride = MaterialDefinition Function(String name, MaterialDefinition authored);

/// A decoded model registered once and instantiated any number of times.
///
/// `GlbDecoder` produces CPU data and one scene tree; a game usually wants
/// many copies (a pool of meteors, a fleet of ships). A [ModelAsset]
/// registers every mesh and material with the [ResourceLibrary] once, keeps
/// the asset's node hierarchy (multi-part models place masts, wheels or
/// turrets with node transforms), and stamps out fresh, unattached
/// [SceneNode] trees with [instantiate].
///
/// Textures are supplied by the caller, one handle per glTF image (see
/// [GlbResult.images]). `PixeldartApp.loadModel` does that in the browser,
/// including images referenced by a relative URI.
final class ModelAsset {
  /// Name used for debug labels, usually the file name.
  final String name;

  /// Model-space bounds of every mesh at the asset's own transforms.
  final Aabb bounds;

  /// Decoder warnings (approximated scale, unresolved images).
  final List<String> warnings;

  final List<_TemplateNode> _nodes;

  ModelAsset._(this.name, this.bounds, this.warnings, this._nodes);

  /// Registers [result]'s meshes and materials with [resources].
  ///
  /// [images] holds one texture handle per entry of [GlbResult.images]
  /// (null where an image could not be loaded). [materialOverride] can
  /// rewrite each material before registration.
  factory ModelAsset.fromGlb(
    GlbResult result,
    ResourceLibrary resources, {
    String name = 'model',
    List<TextureHandle?> images = const [],
    MaterialOverride? materialOverride,
  }) {
    TextureHandle? imageFor(int? textureIndex) {
      final image = result.imageForTexture(textureIndex);
      return image != null && image < images.length ? images[image] : null;
    }

    final materials = <MaterialHandle>[];
    for (var i = 0; i < result.materials.length; i++) {
      final authored = result.materials[i];
      final slots = i < result.materialTextures.length ? result.materialTextures[i] : const GlbMaterialTextures();
      var def = authored.copyWith(
        key: '$name/${authored.key}',
        albedoTexture: imageFor(slots.albedoTextureIndex),
        normalTexture: imageFor(slots.normalTextureIndex),
        ormTexture: imageFor(slots.ormTextureIndex),
        emissiveTexture: imageFor(slots.emissiveTextureIndex),
      );
      if (materialOverride != null) def = materialOverride(authored.key, def);
      materials.add(resources.registerMaterial(def));
    }
    if (materials.isEmpty) {
      materials.add(resources.registerMaterial(MaterialDefinition(key: '$name/default')));
    }

    // Mesh nodes are matched by MeshData identity: the decoder's flat mesh
    // list follows glTF mesh order, which need not match node traversal.
    final meshes = <MeshData, MeshHandle>{};
    final index = <SceneNode, int>{};
    final nodes = <_TemplateNode>[];
    Aabb? bounds;
    result.rootNode.traverse((node) {
      final data = node.meshData;
      final parent = node.parent;
      index[node] = nodes.length;
      nodes.add(
        _TemplateNode(
          parent: parent == null ? -1 : index[parent]!,
          name: node.name,
          transform: node.localTransform,
          data: data,
          mesh: data == null
              ? null
              : meshes.putIfAbsent(data, () => resources.registerMesh(data, debugLabel: '$name/${node.name}')),
          material: data == null ? null : materials[result.materialOf(node).clamp(0, materials.length - 1)],
        ),
      );
      final world = node.worldBounds;
      if (data != null && world != null) bounds = bounds?.union(world) ?? world;
    });

    return ModelAsset._(name, bounds ?? const Aabb(Vec3.zero, Vec3.zero), result.warnings, nodes);
  }

  /// Builds a new, unattached copy of the model. [transform] replaces the
  /// root's own transform when given.
  SceneNode instantiate({String? name, Transform? transform}) {
    final built = <SceneNode>[];
    for (var i = 0; i < _nodes.length; i++) {
      final t = _nodes[i];
      final node = SceneNode(
        name: i == 0 ? (name ?? this.name) : t.name,
        transform: i == 0 && transform != null ? transform : t.transform,
        mesh: t.mesh,
        meshData: t.data,
        material: t.material,
      );
      if (t.parent >= 0) built[t.parent].addChild(node);
      built.add(node);
    }
    return built.first;
  }
}

final class _TemplateNode {
  final int parent;
  final String? name;
  final Transform transform;
  final MeshData? data;
  final MeshHandle? mesh;
  final MaterialHandle? material;

  const _TemplateNode({
    required this.parent,
    required this.name,
    required this.transform,
    this.data,
    this.mesh,
    this.material,
  });
}
