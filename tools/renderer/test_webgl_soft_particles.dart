import 'package:pixeldart/rendering/webgl/generated_shaders.dart';

void main() {
  _testSoftParticlesShaderContract();
  _testDepthLinearizationMath();
  print('Soft particles depth-feathering tests passed.');
}

void _testSoftParticlesShaderContract() {
  assert(
    spriteFragSrc.contains('uSoftParticlesEnabled'),
    'sprite frag shader contains uSoftParticlesEnabled uniform',
  );
  assert(
    spriteFragSrc.contains('uSoftParticleDistance'),
    'sprite frag shader contains uSoftParticleDistance uniform',
  );
  assert(
    spriteFragSrc.contains('uSceneDepth'),
    'sprite frag shader contains uSceneDepth sampler uniform',
  );
  assert(
    spriteFragSrc.contains('linearizeDepth('),
    'sprite frag shader contains depth linearization function',
  );
  assert(
    spriteVertSrc.contains('vViewDepth'),
    'sprite vert shader outputs vViewDepth',
  );
}

void _testDepthLinearizationMath() {
  // Verify perspective depth linearization formula:
  // Z = (near * far) / (far - d * (far - near))
  const near = 0.1;
  const far = 100.0;

  double linearize(double d) => (near * far) / (far - d * (far - near));

  // At near plane (d = 0.0), linear depth = near
  final zNear = linearize(0.0);
  assert((zNear - near).abs() < 1e-6, 'zNear must equal near');

  // At far plane (d = 1.0), linear depth = far
  final zFar = linearize(1.0);
  assert((zFar - far).abs() < 1e-4, 'zFar must equal far');

  // Feathering calculation
  const particleZ = 10.0;
  const featherDistance = 2.0;

  // Scene geometry at depth 11.0 (1.0 units behind particle) -> factor = 1.0 / 2.0 = 0.5
  final sceneZBehind = 11.0;
  final diff = sceneZBehind - particleZ;
  final softFactor = (diff / featherDistance).clamp(0.0, 1.0);
  assert(softFactor == 0.5, 'feather factor must be 0.5');

  // Scene geometry intersecting particle (diff = 0) -> softFactor = 0.0
  final sceneZIntersect = 10.0;
  final diffIntersect = sceneZIntersect - particleZ;
  final softFactorIntersect = (diffIntersect / featherDistance).clamp(0.0, 1.0);
  assert(
    softFactorIntersect == 0.0,
    'feather factor at intersection must be 0.0',
  );

  // Scene geometry far behind (diff >= 2.0) -> softFactor = 1.0
  final sceneZFar = 15.0;
  final diffFar = sceneZFar - particleZ;
  final softFactorFar = (diffFar / featherDistance).clamp(0.0, 1.0);
  assert(softFactorFar == 1.0, 'feather factor far away must be 1.0');
}
