part of 'test_alpha_mask.dart';

/// `doubleSided` is the third thing the three passes have to agree about,
/// alongside the cutoff and the affine weight. Disagreement here is not a
/// subtle shading difference: the world pass shades a surface from both
/// sides while the prepass writes no depth for it and the caster casts no
/// shadow, for exactly the half of the view or the light's travel that sees
/// its back face. Both were real omissions — each of those two passes
/// applied its own cull state once and never varied it.
void _everyPassAgreesOnWhichFacesExist() {
  final scene = [
    _item(_doubleSidedHandle, drawMode: DrawMode.masked),
    _item(_plainHandle),
    _item(_maskedHandle, drawMode: DrawMode.masked),
  ];
  const expected = [false, true, true];
  for (final (name, culls) in [
    ('shadowedWorld', _runWorldPass(scene, const [], 1).perDrawCullEnable()),
    ('depthPrepass', _runPrepass(scene, 1).perDrawCullEnable()),
    ('shadowCaster', _runShadowCaster(scene).perDrawCullEnable()),
  ]) {
    _expect(
      culls.length == expected.length,
      '$name must decide cull state once per draw, got ${culls.length} '
      'decisions for ${expected.length} draws',
    );
    for (var i = 0; i < expected.length; i++) {
      _expect(
        culls[i] == expected[i],
        '$name draw $i: expected cullEnable=${expected[i]}, got ${culls[i]} '
        '(a doubleSided material must disable culling in every pass that '
        'rasterizes it, not only in the one that shades it)',
      );
    }
  }
}

/// Bug 18. Only a blended draw writes real transparency; opaque and masked
/// draws write coverage, which is 1. The value reaches the canvas through
/// `present.frag`, so getting it wrong makes solid geometry see-through —
/// and it is invisible until some material samples a texture that actually
/// has transparent texels, which is why this went unnoticed until masking
/// introduced the first such texture.
void _onlyBlendedDrawsWriteRealTransparency() {
  _expectDoubles(
    _runWorldPass(
      [_item(_plainHandle), _item(_maskedHandle, drawMode: DrawMode.masked)],
      [_item(_blendedHandle, drawMode: DrawMode.blended)],
      1,
    ).float1s('uOpaqueCoverage'),
    [1, 1, 0],
    'opaque and masked draws must write full coverage; only blended draws '
    'may write a texel alpha through to the target',
  );
}

/// `AlphaMode.blended` carries an `alphaCutoff` like every other material —
/// the field has a default and nothing stops an author setting it — and it
/// must be ignored. A blended surface that also discarded would lose its
/// soft edges to a hard cut, which is the failure a naive
/// `alphaCutoff > 0` test would produce.
void _blendedMaterialsNeverCutOut() {
  _expectDoubles(
    _runWorldPass(const [], [
      _item(_blendedHandle, drawMode: DrawMode.blended),
    ], 1).float1s('uAlphaCutoff'),
    [0],
    'a blended material must not cut out, whatever its alphaCutoff says',
  );
}
