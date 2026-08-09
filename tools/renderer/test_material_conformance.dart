import 'package:pixeldart/rendering/api/materials.dart';
import 'package:pixeldart/rendering/assets/texture_store.dart';
import 'package:pixeldart/rendering/passes/shadowed_world.dart';
import 'package:pixeldart/rendering/webgl/generated_shaders.dart';

import 'fake_gpu_device.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

void main() {
  _materialRangesAreDeterministic();
  _neutralTextureFallbacksAreDistinct();
  _shadowedWorldContractBindsEveryMaterialV2Slot();
  print('Renderer material-v2 conformance fixtures passed.');
}

void _materialRangesAreDeterministic() {
  const material = MaterialDefinition(
    key: 'conformance',
    normalStrength: 0.75,
    roughness: 0.2,
    metallic: 1,
    occlusionStrength: 0,
    uvScaleU: 2,
    uvScaleV: -1,
    uvOffsetU: 0.25,
  );
  material.validate();

  for (final invalid in [
    const MaterialDefinition(key: 'bad', normalStrength: -0.1),
    const MaterialDefinition(key: 'bad', roughness: 1.1),
    const MaterialDefinition(key: 'bad', metallic: double.nan),
    const MaterialDefinition(key: 'bad', occlusionStrength: -1),
  ]) {
    var threw = false;
    try {
      invalid.validate();
    } catch (_) {
      threw = true;
    }
    require(threw, 'invalid material-v2 scalar was accepted');
  }
}

void _neutralTextureFallbacksAreDistinct() {
  final store = TextureStore(FakeGpuDevice());
  final albedo = store.resolveAlbedo(null);
  final normal = store.resolveNormal(null);
  final orm = store.resolveOrm(null);
  final emissive = store.resolveEmissive(null);
  require(!identical(albedo, normal), 'normal fallback aliases albedo');
  require(!identical(normal, orm), 'ORM fallback aliases normal');
  require(!identical(orm, emissive), 'emissive fallback aliases ORM');
  require(identical(normal, store.fallbackNormal), 'normal fallback unstable');
  require(identical(orm, store.fallbackOrm), 'ORM fallback unstable');
  require(
    identical(emissive, store.fallbackEmissive),
    'emissive fallback unstable',
  );
  final pending = store.declare(width: 1, height: 1);
  require(
    identical(store.resolveNormal(pending), normal),
    'unloaded normal map must use the normal fallback',
  );
  require(
    identical(store.resolveOrm(pending), orm),
    'unloaded ORM map must use the ORM fallback',
  );
  require(
    identical(store.resolveEmissive(pending), emissive),
    'unloaded emissive map must use the emissive fallback',
  );
}

void _shadowedWorldContractBindsEveryMaterialV2Slot() {
  final source = ShadowedWorldProgramSource.build(
    vertexSource: shadowedWorldVertSrc,
    fragmentSource: shadowedWorldFragSrc,
  );
  require(source.samplerUnits['uNormalMap'] == 3, 'normal sampler unit drift');
  require(source.samplerUnits['uOrmMap'] == 4, 'ORM sampler unit drift');
  require(
    source.samplerUnits['uEmissiveMap'] == 5,
    'emissive sampler unit drift',
  );
  for (final uniform in [
    'uUvScaleOffset',
    'uNormalStrength',
    'uRoughness',
    'uMetallic',
    'uOcclusionStrength',
  ]) {
    require(
      source.requiredUniforms.contains(uniform),
      'material-v2 uniform missing from contract: $uniform',
    );
    require(
      source.fragmentSource.contains(uniform),
      'material-v2 uniform missing from shader: $uniform',
    );
  }
  for (final term in ['dFdx', 'dFdy', 'uEmissiveMap', 'texture(uOrmMap']) {
    require(
      source.fragmentSource.contains(term),
      'material-v2 shader behavior missing: $term',
    );
  }
}
