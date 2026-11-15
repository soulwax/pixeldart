import 'package:pixeldart/rendering/core/debug_views.dart';
import 'package:pixeldart/rendering/webgl/generated_shaders.dart';

void main() {
  _testVertexSnappingContract();
  _testAffineUvContract();
  _testVertexLightingContract();
  _testDebugViewModesContract();
  _testSh3AndSkinningContracts();
  print('WebGL retro & contract features tests passed.');
}

void _testVertexSnappingContract() {
  assert(
    safeWorldVertSrc.contains('uVertexSnapGrid'),
    'safe world vert contains uVertexSnapGrid',
  );
  assert(
    texturedWorldVertSrc.contains('uVertexSnapGrid'),
    'textured world vert contains uVertexSnapGrid',
  );
  assert(
    shadowedWorldVertSrc.contains('uVertexSnapGrid'),
    'shadowed world vert contains uVertexSnapGrid',
  );
}

void _testAffineUvContract() {
  assert(
    texturedWorldVertSrc.contains('uAffineWarpStrength'),
    'textured world vert contains uAffineWarpStrength',
  );
  assert(
    texturedWorldVertSrc.contains('vUvW'),
    'textured world vert outputs vUvW',
  );
  assert(
    texturedWorldFragSrc.contains('uAffineWarpStrength'),
    'textured world frag contains uAffineWarpStrength',
  );
  assert(
    texturedWorldFragSrc.contains('vUv/vUvW'),
    'textured world frag performs affine division',
  );

  assert(
    shadowedWorldVertSrc.contains('uAffineWarpStrength'),
    'shadowed world vert contains uAffineWarpStrength',
  );
  assert(
    shadowedWorldFragSrc.contains('uAffineWarpStrength'),
    'shadowed world frag contains uAffineWarpStrength',
  );
}

void _testVertexLightingContract() {
  assert(
    shadowedWorldVertSrc.contains('uVertexLightingEnabled'),
    'shadowed world vert contains uVertexLightingEnabled',
  );
  assert(
    shadowedWorldVertSrc.contains('vVertexLighting'),
    'shadowed world vert outputs vVertexLighting',
  );
  assert(
    shadowedWorldFragSrc.contains('uVertexLightingEnabled'),
    'shadowed world frag contains uVertexLightingEnabled',
  );
  assert(
    shadowedWorldFragSrc.contains('vVertexLighting'),
    'shadowed world frag receives vVertexLighting',
  );
}

void _testDebugViewModesContract() {
  assert(
    shadowedWorldFragSrc.contains('uDebugViewMode'),
    'shadowed world frag contains uDebugViewMode',
  );
  assert(
    shadowedWorldFragSrc.contains('uDebugViewMode==1'),
    'shadowed world frag handles albedo debug mode (code 1)',
  );
  assert(
    shadowedWorldFragSrc.contains('uDebugViewMode==2'),
    'shadowed world frag handles normals debug mode (code 2)',
  );
  assert(
    shadowedWorldFragSrc.contains('uDebugViewMode==3'),
    'shadowed world frag handles roughness debug mode (code 3)',
  );
  assert(
    shadowedWorldFragSrc.contains('uDebugViewMode==4'),
    'shadowed world frag handles lightHeatmap debug mode (code 4)',
  );
  assert(
    shadowedWorldFragSrc.contains('uDebugViewMode==5'),
    'shadowed world frag handles overdraw debug mode (code 5)',
  );

  // Validate DebugViewMode codes
  assert(DebugViewMode.albedo.code == 1);
  assert(DebugViewMode.normals.code == 2);
  assert(DebugViewMode.roughness.code == 3);
  assert(DebugViewMode.lightHeatmap.code == 4);
  assert(DebugViewMode.overdraw.code == 5);
}

void _testSh3AndSkinningContracts() {
  // SH3 probe uniforms
  assert(
    shadowedWorldFragSrc.contains('uLightProbeShEnabled'),
    'shadowed world frag contains uLightProbeShEnabled',
  );
  assert(
    shadowedWorldFragSrc.contains('evaluateLightProbeSh3('),
    'shadowed world frag contains evaluateLightProbeSh3',
  );
  for (var i = 0; i < 9; i++) {
    assert(
      shadowedWorldFragSrc.contains('uLightProbeSh_$i'),
      'shadowed world frag contains uLightProbeSh_$i',
    );
  }

  // Skinning uniforms
  assert(
    shadowedWorldVertSrc.contains('uSkinEnabled'),
    'shadowed world vert contains uSkinEnabled',
  );
  assert(
    shadowedWorldVertSrc.contains('uJointCount'),
    'shadowed world vert contains uJointCount',
  );
  assert(
    shadowedWorldVertSrc.contains('uJointMatrices'),
    'shadowed world vert contains uJointMatrices',
  );
}
