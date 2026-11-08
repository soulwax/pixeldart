import 'dart:js_interop';
import 'dart:math' as math;

import 'package:pixeldart/pixeldart.dart';
import 'package:pixeldart/rendering/webgl/pixeldart_app.dart';
import 'package:web/web.dart' as web;

/// Rewrites a decoded glTF material before registration. Receives the
/// authored material name (e.g. `metal`, `rock`, `crystal`).
typedef MaterialTweak = MaterialDefinition Function(
  String name,
  MaterialDefinition authored,
);

/// One decoded GLB, registered once with the renderer and stamped out as many
/// times as the game needs.
///
/// `PixeldartApp.loadGlb` attaches a single hierarchy to the scene; a game
/// that pools dozens of meteors wants the handles instead, so this keeps the
/// mesh/material pairs and builds fresh [SceneNode]s on demand. Instances are
/// re-centred on their bounding box so rotation and collision act about the
/// visual middle rather than the asset's authoring origin.
final class Prefab {
  final String name;
  final List<_Part> _parts;
  final Vec3 _center;

  /// Bounding-sphere radius at scale 1, measured from the re-centred origin.
  final double radius;

  Prefab._(this.name, this._parts, this._center, this.radius);

  static Future<Prefab> load(
    PixeldartApp app,
    String url, {
    MaterialTweak? tweak,
  }) async {
    final response = await web.window.fetch(url.toJS).toDart;
    if (!response.ok) {
      throw StateError('Failed to fetch $url (${response.status})');
    }
    final buffer = await response.arrayBuffer().toDart;
    final result = GlbDecoder.decode(buffer.toDart.asUint8List());
    final name = url.split('/').last.replaceAll('.glb', '');

    final materials = <MaterialHandle>[];
    for (final authored in result.materials) {
      final def = tweak?.call(authored.key, authored) ?? authored;
      // Several kits share names like "metal"; keys must stay unique.
      materials.add(app.createMaterial(_rekey(def, '$name/${authored.key}')));
    }

    // The decoder emits one node per primitive, tagged with its material
    // index, in the same order as result.meshes.
    final parts = <_Part>[];
    var cursor = 0;
    result.rootNode.traverse((node) {
      final data = node.meshData;
      if (data == null || cursor >= result.meshes.length) return;
      final matIndex = node.sortTiebreaker.clamp(0, materials.length - 1);
      parts.add(
        _Part(
          app.createMesh(result.meshes[cursor], debugLabel: '$name#$cursor'),
          materials[matIndex],
          result.meshes[cursor],
        ),
      );
      cursor++;
    });

    var lo = const Vec3(double.infinity, double.infinity, double.infinity);
    var hi = const Vec3(-double.infinity, -double.infinity, -double.infinity);
    for (final part in parts) {
      final b = part.data.bounds;
      lo = Vec3(math.min(lo.x, b.min.x), math.min(lo.y, b.min.y), math.min(lo.z, b.min.z));
      hi = Vec3(math.max(hi.x, b.max.x), math.max(hi.y, b.max.y), math.max(hi.z, b.max.z));
    }
    final center = (lo + hi) * 0.5;
    final radius = (hi - lo).length * 0.5;
    return Prefab._(name, parts, center, radius);
  }

  /// Builds a new, unattached instance whose origin is the model's centre.
  SceneNode instantiate({String? name}) {
    final root = SceneNode.group(name: name ?? this.name);
    final pivot = SceneNode.group(transform: Transform.at(-_center));
    root.addChild(pivot);
    for (final part in _parts) {
      pivot.add(mesh: part.mesh, meshData: part.data, material: part.material);
    }
    return root;
  }

  static MaterialDefinition _rekey(MaterialDefinition d, String key) =>
      MaterialDefinition(
        key: key,
        albedoTexture: d.albedoTexture,
        normalTexture: d.normalTexture,
        ormTexture: d.ormTexture,
        emissiveTexture: d.emissiveTexture,
        tintR: d.tintR,
        tintG: d.tintG,
        tintB: d.tintB,
        roughness: d.roughness,
        metallic: d.metallic,
        emissiveStrength: d.emissiveStrength,
        normalStrength: d.normalStrength,
        occlusionStrength: d.occlusionStrength,
        clearcoatStrength: d.clearcoatStrength,
        clearcoatRoughness: d.clearcoatRoughness,
        alphaMode: d.alphaMode,
        alphaCutoff: d.alphaCutoff,
        doubleSided: d.doubleSided,
      );
}

final class _Part {
  final MeshHandle mesh;
  final MaterialHandle material;
  final MeshData data;
  const _Part(this.mesh, this.material, this.data);
}

/// Kenney's kits are authored unlit with metallic=1 everywhere, which renders
/// near-black under PBR without a reflection probe. Map the material names to
/// plausible surface parameters instead.
MaterialDefinition kenneySurface(String name, MaterialDefinition m) {
  final lower = name.toLowerCase();
  final (metallic, roughness, emissive) = switch (lower) {
    'crystal' => (0.0, 0.2, 2.2),
    'metal' || 'metaldark' => (0.55, 0.38, 0.0),
    'metalred' => (0.35, 0.42, 0.0),
    'dark' => (0.15, 0.55, 0.0),
    _ when lower.contains('rock') => (0.0, 0.92, 0.0),
    _ => (0.1, 0.6, 0.0),
  };
  return MaterialDefinition(
    key: m.key,
    tintR: m.tintR,
    tintG: m.tintG,
    tintB: m.tintB,
    metallic: metallic,
    roughness: roughness,
    emissiveStrength: emissive,
  );
}
