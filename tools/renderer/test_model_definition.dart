import 'dart:typed_data';

import 'package:pixeldart/rendering/api/materials.dart';
import 'package:pixeldart/rendering/assets/model_definition.dart';
import 'package:pixeldart/rendering/assets/model_binding.dart';
import 'package:pixeldart/rendering/assets/material_store.dart';
import 'package:pixeldart/rendering/assets/mesh_store.dart';
import 'package:pixeldart/rendering/api/handles.dart';
import 'package:pixeldart/rendering/api/mesh.dart';
import 'package:pixeldart/rendering/math/bounds.dart';
import 'package:pixeldart/rendering/math/transform.dart';
import 'package:pixeldart/rendering/math/vec.dart';

import 'fake_gpu_device.dart';

void main() {
  _validModelResolvesPartsLodsAndVariants();
  _bindingResolvesRetainedMeshAndMaterialStores();
  _invalidPartContractsAreRejected();
  _invalidModelIdentityAndSocketsAreRejected();
  print('Renderer model-definition fixtures passed.');
}

void _bindingResolvesRetainedMeshAndMaterialStores() {
  final device = FakeGpuDevice();
  final meshes = MeshStore(device);
  final materials = MaterialStore();
  final mesh = meshes.upload(
    MeshData(
      layout: VertexLayoutDescriptor.compatibility14,
      vertices: Float32List(
        VertexLayoutDescriptor.compatibility14.strideFloats * 3,
      ),
      localBounds: _bounds,
    ),
  );
  final base = materials.register(const MaterialDefinition(key: 'base'));
  final wet = materials.register(const MaterialDefinition(key: 'wet'));
  final model = ModelDefinition(
    key: 'bound-prop',
    parts: [
      ModelPart(
        key: 'body',
        mesh: mesh,
        material: base,
        localBounds: _bounds,
        materialVariants: [ModelMaterialVariant(key: 'wet', material: wet)],
      ),
    ],
    combinedBounds: _bounds,
  );
  final binding = model.bind(meshes: meshes, materials: materials);
  final bound = binding.part('body');
  if (bound == null ||
      !device.isLive(bound.mesh.vao) ||
      bound.materialForVariant('wet').key != 'wet') {
    throw StateError('model binding did not resolve retained resources');
  }

  meshes.release(mesh);
  var staleRejected = false;
  try {
    model.bind(meshes: meshes, materials: materials);
  } catch (error) {
    if (error is! Exception) rethrow;
    staleRejected = true;
  }
  if (!staleRejected) {
    throw StateError('binding a released mesh must be rejected');
  }
  materials.release(base);
  materials.release(wet);
}

const _bounds = Aabb(Vec3(-1, -1, -1), Vec3(1, 1, 1));
const _mesh = MeshHandle(1, 1, 'hero-mesh');
const _material = MaterialHandle(2, 1, 'hero-material');

ModelPart _part({String key = 'body', List<ModelLod>? lods}) => ModelPart(
  key: key,
  mesh: _mesh,
  material: _material,
  localBounds: _bounds,
  materialSlot: 'surface',
  lods:
      lods ??
      const [
        ModelLod(key: 'hero', minDistance: 0, maxDistance: 8),
        ModelLod(key: 'mid', minDistance: 8, maxDistance: 24),
      ],
  materialVariants: const [
    ModelMaterialVariant(
      key: 'wet',
      material: MaterialHandle(3, 1, 'hero-wet'),
    ),
  ],
);

void _validModelResolvesPartsLodsAndVariants() {
  final model = ModelDefinition(
    key: 'hero-prop',
    parts: [_part()],
    combinedBounds: _bounds,
    sockets: const [ModelSocket('grip', Transform.identity)],
  );
  model.validate();
  if (model.part('body') == null || model.part('missing') != null) {
    throw StateError('model part lookup must return only authored parts');
  }
  final part = model.part('body')!;
  if (part.variant('wet')?.key != 'wet' ||
      part.variant('wet')?.material != const MaterialHandle(3, 1)) {
    throw StateError('material variant lookup must resolve by stable handle');
  }
  if (part.variant('dry') != null || model.socket('grip') == null) {
    throw StateError(
      'missing variant/socket lookup returned an authored value',
    );
  }
  if (part.materialForVariant() != _material ||
      part.materialForVariant('') != _material ||
      part.materialForVariant('wet') != const MaterialHandle(3, 1)) {
    throw StateError(
      'material selection did not resolve default/variant handles',
    );
  }
  if (part.lodForDistance(0)?.key != 'hero' ||
      part.lodForDistance(8)?.key != 'mid' ||
      part.lodForDistance(24) != null) {
    throw StateError('LOD selection did not honor half-open authored ranges');
  }
  var unknownVariantRejected = false;
  try {
    part.materialForVariant('missing');
  } catch (error) {
    if (error is! ArgumentError) rethrow;
    unknownVariantRejected = true;
  }
  if (!unknownVariantRejected) {
    throw StateError('unknown material variants must be rejected');
  }
  for (final distance in <double>[-1, double.nan]) {
    var invalidDistanceRejected = false;
    try {
      part.lodForDistance(distance);
    } catch (error) {
      if (error is! ArgumentError) rethrow;
      invalidDistanceRejected = true;
    }
    if (!invalidDistanceRejected) {
      throw StateError('invalid LOD distance $distance must be rejected');
    }
  }
}

void _invalidPartContractsAreRejected() {
  final invalidParts = <ModelPart>[
    ModelPart(
      key: 'bad-bounds',
      mesh: _mesh,
      material: _material,
      localBounds: const Aabb(Vec3(1, 0, 0), Vec3(-1, 0, 0)),
    ),
    ModelPart(
      key: 'bad-lod',
      mesh: _mesh,
      material: _material,
      localBounds: _bounds,
      lods: const [ModelLod(key: 'near', minDistance: 2, maxDistance: 4)],
    ),
    ModelPart(
      key: 'overlap',
      mesh: _mesh,
      material: _material,
      localBounds: _bounds,
      lods: const [
        ModelLod(key: 'near', minDistance: 0, maxDistance: 4),
        ModelLod(key: 'far', minDistance: 3, maxDistance: 8),
      ],
    ),
    ModelPart(
      key: 'bad-variant',
      mesh: _mesh,
      material: _material,
      localBounds: _bounds,
      materialSlot: 'surface',
      materialVariants: const [
        ModelMaterialVariant(key: 'surface', material: _material),
      ],
    ),
  ];
  for (final part in invalidParts) {
    var rejected = false;
    try {
      part.validate(index: 0);
    } catch (error) {
      if (error is! ArgumentError) rethrow;
      rejected = true;
    }
    if (!rejected) {
      throw StateError('invalid model part was accepted: ${part.key}');
    }
  }
}

void _invalidModelIdentityAndSocketsAreRejected() {
  final duplicateParts = ModelDefinition(
    key: 'duplicate',
    parts: [_part(), _part()],
    combinedBounds: _bounds,
  );
  final duplicateSockets = ModelDefinition(
    key: 'sockets',
    parts: [_part()],
    combinedBounds: _bounds,
    sockets: const [
      ModelSocket('grip', Transform.identity),
      ModelSocket('grip', Transform.identity),
    ],
  );
  for (final model in [duplicateParts, duplicateSockets]) {
    var rejected = false;
    try {
      model.validate();
    } catch (error) {
      if (error is! ArgumentError) rethrow;
      rejected = true;
    }
    if (!rejected) throw StateError('invalid model identity was accepted');
  }
}
