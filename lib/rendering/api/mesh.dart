import 'dart:typed_data';
import 'dart:math' as math;

import '../math/bounds.dart';

enum VertexAttributeKind {
  position,
  normal,
  color,
  emissive,
  alpha,
  uv0,
  tangent4,
  uv1,
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

  /// Surface-v2 compatibility layout. Tangent W is the handedness (+/-1);
  /// UV1 is intentionally a separate opt-in descriptor so lightmap data can
  /// be added without changing the stride of existing v2 meshes.
  static const VertexLayoutDescriptor surfaceV2 = VertexLayoutDescriptor(
    name: 'surfaceV2',
    strideFloats: 18,
    attributes: [
      VertexAttributeSlot(VertexAttributeKind.position, 0, 3),
      VertexAttributeSlot(VertexAttributeKind.normal, 3, 3),
      VertexAttributeSlot(VertexAttributeKind.tangent4, 6, 4),
      VertexAttributeSlot(VertexAttributeKind.color, 10, 4),
      VertexAttributeSlot(VertexAttributeKind.alpha, 14, 1),
      VertexAttributeSlot(VertexAttributeKind.uv0, 15, 2),
      VertexAttributeSlot(VertexAttributeKind.legacyMaterialEffect, 17, 1),
    ],
  );

  static const VertexLayoutDescriptor surfaceV2WithUv1 = VertexLayoutDescriptor(
    name: 'surfaceV2WithUv1',
    strideFloats: 20,
    attributes: [
      VertexAttributeSlot(VertexAttributeKind.position, 0, 3),
      VertexAttributeSlot(VertexAttributeKind.normal, 3, 3),
      VertexAttributeSlot(VertexAttributeKind.tangent4, 6, 4),
      VertexAttributeSlot(VertexAttributeKind.color, 10, 4),
      VertexAttributeSlot(VertexAttributeKind.alpha, 14, 1),
      VertexAttributeSlot(VertexAttributeKind.uv0, 15, 2),
      VertexAttributeSlot(VertexAttributeKind.uv1, 17, 2),
      VertexAttributeSlot(VertexAttributeKind.legacyMaterialEffect, 19, 1),
    ],
  );

  void validate() {
    if (strideFloats <= 0) {
      throw ArgumentError('VertexLayoutDescriptor.strideFloats must be > 0');
    }
    for (final attr in attributes) {
      if (attr.floatCount <= 0) {
        throw ArgumentError(
          'VertexLayoutDescriptor "$name": attribute ${attr.kind} '
          'must have a positive floatCount',
        );
      }
      if (attr.floatOffset < 0 ||
          attr.floatOffset + attr.floatCount > strideFloats) {
        throw ArgumentError(
          'VertexLayoutDescriptor "$name": attribute ${attr.kind} '
          'range [${attr.floatOffset}, ${attr.floatOffset + attr.floatCount}) '
          'exceeds stride $strideFloats',
        );
      }
    }
    final tangent = attributes.where(
      (attr) => attr.kind == VertexAttributeKind.tangent4,
    );
    for (final attr in tangent) {
      if (attr.floatCount != 4) {
        throw ArgumentError(
          'VertexLayoutDescriptor "$name": tangent4 must contain 4 floats',
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
    _validateFiniteSurfaceV2Tangents();
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

  void _validateFiniteSurfaceV2Tangents() {
    final tangent = layout.attributes.where(
      (attr) => attr.kind == VertexAttributeKind.tangent4,
    );
    if (tangent.isEmpty) return;
    final normal = layout.attributes.where(
      (attr) => attr.kind == VertexAttributeKind.normal,
    );
    if (normal.length != 1) {
      throw ArgumentError('surface-v2 tangent data requires one normal slot');
    }
    final tangentSlot = tangent.single;
    final normalSlot = normal.single;
    for (var vertex = 0; vertex < vertexCount; vertex++) {
      final base = vertex * layout.strideFloats;
      final nx = vertices[base + normalSlot.floatOffset];
      final ny = vertices[base + normalSlot.floatOffset + 1];
      final nz = vertices[base + normalSlot.floatOffset + 2];
      final tx = vertices[base + tangentSlot.floatOffset];
      final ty = vertices[base + tangentSlot.floatOffset + 1];
      final tz = vertices[base + tangentSlot.floatOffset + 2];
      final handedness = vertices[base + tangentSlot.floatOffset + 3];
      final normalLength = nx * nx + ny * ny + nz * nz;
      final tangentLength = tx * tx + ty * ty + tz * tz;
      if (![
        nx,
        ny,
        nz,
        tx,
        ty,
        tz,
        handedness,
      ].every((value) => value.isFinite)) {
        throw ArgumentError('surface-v2 tangent basis must be finite');
      }
      if (normalLength < 1e-8 || tangentLength < 1e-8) {
        throw ArgumentError('surface-v2 tangent basis must be non-zero');
      }
      final normalizedDot =
          (nx * tx + ny * ty + nz * tz) /
          math.sqrt(normalLength * tangentLength);
      if (normalizedDot.abs() > 0.05) {
        throw ArgumentError(
          'surface-v2 tangent must be orthogonal to its normal: $normalizedDot',
        );
      }
      if ((handedness.abs() - 1).abs() > 0.05) {
        throw ArgumentError(
          'surface-v2 tangent handedness must be -1 or +1: $handedness',
        );
      }
    }
  }
}
