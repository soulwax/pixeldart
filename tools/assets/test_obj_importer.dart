import 'package:pixeldart/assets/assets.dart';

void check(bool value, String message) {
  if (!value) throw StateError('FAIL: $message');
}

void main() {
  final mtl = parseMtl(
    'newmtl ceramic\nKd 0.8 0.7 0.6\nKs 0.1 0.1 0.1\nNs 32\nmap_Kd textures/albedo.png\nmap_Bump textures/normal.png',
    availableFiles: {'textures/albedo.png', 'textures/normal.png'},
  );
  check(mtl['ceramic']!.shininess == 32, 'MTL scalar retained');
  check(mtl['ceramic']!.diffuseTexture == 'textures/albedo.png', 'MTL diffuse texture retained');

  const source = '''
# quad with a negative-index triangle
v 0 0 0
v 1 0 0
v 1 1 0
v 0 1 0
vt 0 0
vt 1 0
vt 1 1
vt 0 1
vn 0 0 1
mtllib materials/room.mtl
usemtl ceramic
f 1/1/1 2/2/1 3/3/1 4/4/1
''';
  final scene = parseObj(source);
  check(scene.triangles.length == 2, 'quad triangulates deterministically');
  check(scene.triangles.first.material == 'ceramic', 'material slot retained');
  check(scene.triangles.last.position.join(',') == '0,2,3', 'fan order stable');
  check(scene.bounds.join(',') == '0.0,0.0,0.0,1.0,1.0,0.0', 'bounds declared');
  check(parseObj(source).canonicalJson() == scene.canonicalJson(), 'output deterministic');
  check(
    validateObjMaterialBindings(scene, mtl).canonicalJson() == scene.canonicalJson(),
    'declared MTL material binds',
  );
  var rejected = false;
  rejected = false;
  try {
    validateObjMaterialBindings(scene, const <String, ObjMaterialRecord>{});
  } on FormatException {
    rejected = true;
  }
  check(rejected, 'missing MTL material rejects');

  rejected = false;
  try {
    parseObj('mtllib ../escape.mtl\nv 0 0 0\nv 1 0 0\nv 0 1 0\nf 1 2 3');
  } on FormatException {
    rejected = true;
  }
  check(rejected, 'MTL traversal rejects');
  rejected = false;
  try {
    parseObj('vp 0 0 0\nv 0 0 0\nv 1 0 0\nv 0 1 0\nf 1 2 3');
  } on FormatException {
    rejected = true;
  }
  check(rejected, 'free-form element rejects');
  rejected = false;
  try {
    parseObj('v 0 0 0\nv 1 0 0\nv 0 1 0\nf 1/9 2/9 3/9');
  } on FormatException {
    rejected = true;
  }
  check(rejected, 'out-of-range UV rejects');
  rejected = false;
  try {
    parseMtl('newmtl ceramic\nmap_Kd https://example.invalid/a.png');
  } on FormatException {
    rejected = true;
  }
  check(rejected, 'remote MTL texture rejects');
  rejected = false;
  try {
    parseMtl('newmtl ceramic\nmap_Kd textures/missing.png', availableFiles: {});
  } on FormatException {
    rejected = true;
  }
  check(rejected, 'missing MTL media rejects');
  print('RPA-03 OBJ importer tests passed.');
}
