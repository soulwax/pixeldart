import 'package:pixeldart/rendering/assets/material_store.dart';
import 'package:pixeldart/rendering/rendering.dart';

void main() {
  _registerResolvesBackToTheSameDefinition();
  _releaseInvalidatesTheHandle();
  _updateDoesNotEmitNewIdentity();
  _invalidDefinitionRejectedAtRegister();
  print('Renderer material store fixtures passed.');
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
    throw StateError('expected liveCount 0 after release, got ${store.liveCount}');
  }
}

void _updateDoesNotEmitNewIdentity() {
  final store = MaterialStore();
  final handle = store.register(const MaterialDefinition(key: 'a'));
  final secondHandle = store.register(const MaterialDefinition(key: 'b'));

  if (handle == secondHandle) {
    throw StateError('two distinct registrations must not collide on identity');
  }
  if (store.resolve(handle).key != 'a' || store.resolve(secondHandle).key != 'b') {
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
