import 'package:pixeldart/rendering/assets/material_store.dart';
import 'package:pixeldart/rendering/rendering.dart';

void main() {
  _registerResolvesBackToTheSameDefinition();
  _releaseInvalidatesTheHandle();
  _updateDoesNotEmitNewIdentity();
  _invalidDefinitionRejectedAtRegister();
  _materialMapColorSpacesAreExplicit();
  print('Renderer material store fixtures passed.');
}

void _materialMapColorSpacesAreExplicit() {
  const porcelain = MaterialDefinition(
    key: 'porcelain-mermaid',
    albedoColorSpace: MaterialMapColorSpace.srgb,
    normalColorSpace: MaterialMapColorSpace.linear,
    ormColorSpace: MaterialMapColorSpace.linear,
    roughness: 0.28,
    metallic: 0,
    clearcoatStrength: 0.72,
    clearcoatRoughness: 0.18,
  );
  final store = MaterialStore();
  final handle = store.register(porcelain);
  final resolved = store.resolve(handle);
  if (resolved.albedoColorSpace != MaterialMapColorSpace.srgb ||
      resolved.normalColorSpace != MaterialMapColorSpace.linear ||
      resolved.ormColorSpace != MaterialMapColorSpace.linear) {
    throw StateError('material map color-space metadata was not retained');
  }
  if (resolved.clearcoatStrength != 0.72 ||
      resolved.clearcoatRoughness != 0.18) {
    throw StateError('porcelain clearcoat metadata was not retained');
  }

  var rejected = false;
  try {
    store.register(
      const MaterialDefinition(
        key: 'wrong-normal-space',
        normalColorSpace: MaterialMapColorSpace.srgb,
      ),
    );
  } catch (_) {
    rejected = true;
  }
  if (!rejected) {
    throw StateError('non-linear normal maps must be rejected at registration');
  }
}

void _registerResolvesBackToTheSameDefinition() {
  final store = MaterialStore();
  const definition = MaterialDefinition(
    key: 'plaster-wall',
    tintR: 0.8,
    tintG: 0.75,
    tintB: 0.7,
    doubleSided: true,
  );
  final handle = store.register(definition, debugLabel: 'plaster');
  final resolved = store.resolve(handle);

  if (resolved.key != 'plaster-wall') {
    throw StateError('expected key "plaster-wall", got "${resolved.key}"');
  }
  if (!resolved.doubleSided) {
    throw StateError('expected doubleSided to survive round-trip');
  }
  if (store.liveCount != 1) {
    throw StateError('expected liveCount 1, got ${store.liveCount}');
  }
}

void _releaseInvalidatesTheHandle() {
  final store = MaterialStore();
  final handle = store.register(const MaterialDefinition(key: 'temp'));

  store.release(handle);

  bool threw = false;
  try {
    store.resolve(handle);
  } catch (_) {
    threw = true;
  }
  if (!threw) {
    throw StateError('resolving a released MaterialHandle must throw');
  }
  if (store.liveCount != 0) {
    throw StateError(
      'expected liveCount 0 after release, got ${store.liveCount}',
    );
  }
}

void _updateDoesNotEmitNewIdentity() {
  final store = MaterialStore();
  final handle = store.register(const MaterialDefinition(key: 'a'));
  final secondHandle = store.register(const MaterialDefinition(key: 'b'));

  if (handle == secondHandle) {
    throw StateError('two distinct registrations must not collide on identity');
  }
  if (store.resolve(handle).key != 'a' ||
      store.resolve(secondHandle).key != 'b') {
    throw StateError('resolve must not cross-contaminate between handles');
  }
}

void _invalidDefinitionRejectedAtRegister() {
  final store = MaterialStore();
  bool threw = false;
  try {
    store.register(const MaterialDefinition(key: ''));
  } catch (_) {
    threw = true;
  }
  if (!threw) {
    throw StateError('registering an empty-key MaterialDefinition must throw');
  }
  if (store.liveCount != 0) {
    throw StateError(
      'a rejected register() must not leave a live slot behind, got '
      '${store.liveCount}',
    );
  }
}
