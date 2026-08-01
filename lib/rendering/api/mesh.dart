import 'dart:typed_data';

import '../math/bounds.dart';

enum VertexAttributeKind {
  position,
  normal,
  color,
  emissive,
  alpha,
  uv0,
  legacyMaterialEffect,
}

final class VertexAttributeSlot {
  final VertexAttributeKind kind;
  final int floatOffset;
  final int floatCount;

  const VertexAttributeSlot(this.kind, this.floatOffset, this.floatCount);
}

/// Describes a packed interleaved vertex buffer layout. The compatibility
/// layout mirrors the legacy engine's 14-float stride (position3, normal3,
/// rgb+glow4, alpha1, uv+mat3) so QMSH v1 decodes losslessly (§5.4), but
/// this type does not hardcode that stride — it is one named instance.
final class VertexLayoutDescriptor {
  final String name;
  final int strideFloats;
  final List<VertexAttributeSlot> attributes;

  const VertexLayoutDescriptor({
    required this.name,
    required this.strideFloats,
    required this.attributes,
  });

  static const VertexLayoutDescriptor compatibility14 = VertexLayoutDescriptor(
    name: 'compatibility14',
    strideFloats: 14,
    attributes: [
      VertexAttributeSlot(VertexAttributeKind.position, 0, 3),
      VertexAttributeSlot(VertexAttributeKind.normal, 3, 3),
      VertexAttributeSlot(VertexAttributeKind.color, 6, 4),
      VertexAttributeSlot(VertexAttributeKind.alpha, 10, 1),
      VertexAttributeSlot(VertexAttributeKind.uv0, 11, 2),
      VertexAttributeSlot(VertexAttributeKind.legacyMaterialEffect, 13, 1),
    ],
  );

  void validate() {
    if (strideFloats <= 0) {
      throw ArgumentError('VertexLayoutDescriptor.strideFloats must be > 0');
    }
    for (final attr in attributes) {
      if (attr.floatOffset < 0 ||
          attr.floatOffset + attr.floatCount > strideFloats) {
        throw ArgumentError(
          'VertexLayoutDescriptor "$name": attribute ${attr.kind} '
          'range [${attr.floatOffset}, ${attr.floatOffset + attr.floatCount}) '
          'exceeds stride $strideFloats',
        );
      }
    }
  }
}

/// Renderer-neutral mesh data (§5.4). Contains no room, examine tag,
/// collision rule, or story meaning — that separation is what lets
/// `lib/rendering/**` stay free of game imports.
final class MeshData {
  final VertexLayoutDescriptor layout;
  final Float32List vertices;
  final Uint16List? indices;
  final Aabb localBounds;

  MeshData({
    required this.layout,
    required this.vertices,
    this.indices,
    required this.localBounds,
  });

  int get vertexCount => vertices.length ~/ layout.strideFloats;

  void validate() {
    layout.validate();
    if (vertices.length % layout.strideFloats != 0) {
      throw ArgumentError(
        'MeshData.vertices length ${vertices.length} is not a multiple of '
        'stride ${layout.strideFloats}',
      );
    }
    if (indices != null) {
      final count = vertexCount;
      for (final index in indices!) {
        if (index >= count) {
          throw ArgumentError(
            'MeshData index $index out of range for $count vertices',
          );
        }
      }
    }
    if (!localBounds.isValid) {
      throw ArgumentError('MeshData.localBounds must be a valid AABB');
    }
  }
}
