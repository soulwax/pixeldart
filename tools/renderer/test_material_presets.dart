import 'package:pixeldart/rendering/api/lights.dart';
import 'package:pixeldart/rendering/api/materials.dart';

void main() {
  final gold = MaterialDefinition.gold();
  gold.validate();
  assert(gold.metallic == 1.0);
  assert(gold.tintR == 1.0 && gold.tintG == 0.78 && gold.tintB == 0.35);

  final silver = MaterialDefinition.silver();
  silver.validate();
  assert(silver.metallic == 1.0);
  assert(silver.tintR == 0.97 && silver.tintG == 0.96 && silver.tintB == 0.91);

  final copper = MaterialDefinition.copper();
  copper.validate();
  assert(copper.metallic == 1.0);

  final chrome = MaterialDefinition.chrome();
  chrome.validate();
  assert(chrome.metallic == 0.98);
  assert(chrome.roughness == 0.05);

  final iron = MaterialDefinition.iron();
  iron.validate();
  assert(iron.metallic == 0.85);

  final plastic = MaterialDefinition.plastic(color: const LinearColor(0.2, 0.5, 0.8));
  plastic.validate();
  assert(plastic.metallic == 0.0);
  assert(plastic.clearcoatStrength == 0.3);

  final ceramic = MaterialDefinition.ceramic(color: const LinearColor(0.9, 0.9, 0.9));
  ceramic.validate();
  assert(ceramic.metallic == 0.0);
  assert(ceramic.clearcoatStrength == 0.85);

  final matte = MaterialDefinition.matte(color: const LinearColor(0.4, 0.4, 0.4));
  matte.validate();
  assert(matte.metallic == 0.0);
  assert(matte.roughness == 0.90);

  final emissive = MaterialDefinition.emissive(color: const LinearColor(1.0, 0.2, 0.1), strength: 3.5);
  emissive.validate();
  assert(emissive.emissiveStrength == 3.5);

  final metal = MaterialDefinition.metal(color: const LinearColor(0.8, 0.7, 0.2), roughness: 0.25);
  metal.validate();
  assert(metal.metallic == 1.0);
  assert(metal.roughness == 0.25);

  final dielectric = MaterialDefinition.dielectric(color: const LinearColor(0.1, 0.8, 0.3), roughness: 0.4, clearcoat: 0.5);
  dielectric.validate();
  assert(dielectric.metallic == 0.0);
  assert(dielectric.clearcoatStrength == 0.5);

  print('Material presets tests passed.');
}
