part of 'test_alpha_mask.dart';

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

void _onlyBlendedDrawsWriteRealTransparency() {
  _expectDoubles(
    _runWorldPass(
      [_item(_plainHandle), _item(_maskedHandle, drawMode: DrawMode.masked)],
      [_item(_blendedHandle, drawMode: DrawMode.blended)],
      1,
    ).float1s('uOpaqueCoverage'),
    [1, 0],
    'opaque and masked draws must write full coverage; only blended draws '
    'may write a texel alpha through to the target',
  );
}

void _blendedMaterialsNeverCutOut() {
  _expectDoubles(
    _runWorldPass(const [], [
      _item(_blendedHandle, drawMode: DrawMode.blended),
    ], 1).float1s('uAlphaCutoff'),
    [0],
    'a blended material must not cut out, whatever its alphaCutoff says',
  );
}

void _heroLightingUniformsAndReceiversArePerFrameAndPerDraw() {
  const environment = FrameEnvironment(
    directionalLight: DirectionalLight(
      direction: Vec3(0.25, 0.9, -0.2),
      color: LinearColor(0.7, 0.8, 1),
      intensity: 0.7,
    ),
    pointLights: [
      PointLight(
        id: 4,
        position: Vec3(1, 2, 3),
        color: LinearColor(1, 0.35, 0.12),
        intensity: 0.4,
        radius: 6,
      ),
      PointLight(
        id: 5,
        position: Vec3(-1, 1, 2),
        color: LinearColor(0.2, 0.3, 1),
        intensity: 0.2,
        radius: 4,
      ),
    ],
  );
  const directSpots = [
    SpotLight(
      id: 20,
      position: Vec3(0, 2, 1),
      direction: Vec3(0, -1, 0),
      color: LinearColor(1, 0.25, 0.1),
      intensity: 0.9,
      range: 5,
    ),
    SpotLight(
      id: 21,
      position: Vec3(2, 2, 0),
      direction: Vec3(-1, -1, 0),
      color: LinearColor(0.1, 0.25, 1),
      intensity: 0.35,
      range: 4,
    ),
  ];
  final run = _runWorldPass(
    [_item(_plainHandle), _item(_plainHandle, receivesShadow: false)],
    const [],
    1,
    environment,
    directSpots,
    768,
  );
  _expectDoubles(run.float1s('uDirectionalIntensity'), [
    0.7,
  ], 'directional daylight must be uploaded once per frame');
  _expectDoubles(run.float1s('uPointIntensity0'), [
    0.4,
  ], 'the first practical light must occupy point slot 0');
  _expectDoubles(run.float1s('uPointIntensity1'), [
    0.2,
  ], 'the second practical light must occupy point slot 1');
  _expectDoubles(run.float1s('uPointIntensity2'), [
    0,
  ], 'unused point slots must be explicitly disabled');
  _expectDoubles(run.float1s('uPointIntensity3'), [
    0,
  ], 'all unused point slots must be explicitly disabled');
  _expectDoubles(run.float1s('uSpotEnabled'), [
    0,
  ], 'a frame without a selected shadow spot must disable spot contribution');
  _expectDoubles(run.float1s('uDirectSpotIntensity0'), [
    0.9,
  ], 'the first direct spot must upload its authored intensity');
  _expectDoubles(run.float1s('uDirectSpotIntensity1'), [
    0.35,
  ], 'the second direct spot must upload its authored intensity');
  _expectDoubles(run.float1s('uDirectSpotIntensity2'), [
    0,
  ], 'unused direct spot slots must be explicitly disabled');
  final shadowTexel = run.device.float2Sequence('uShadowMapTexelSize').single;
  _expect(
    (shadowTexel[0] - 1 / 768).abs() < 1e-9 &&
        (shadowTexel[1] - 1 / 768).abs() < 1e-9,
    'shadow texel size must follow configured shadow-map dimensions',
  );
  _expectDoubles(run.float1s('uReceivesShadow'), [
    1,
    0,
  ], 'shadow reception must follow each retained item descriptor');
}
