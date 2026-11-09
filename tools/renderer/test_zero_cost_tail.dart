part of 'test_zero_cost.dart';

// ---- Grade / PS1 quantize / VHS: the documented non-skippers ----

void _gradePs1VhsAlwaysDrawRegardlessOfWeight() {
  final device = FakeGpuDevice();
  final library = ProgramLibrary(device);
  final lutTexture = device.createTexture(
    const GpuTextureDescriptor(width: 4, height: 4),
  );
  final vhsGhostTarget = device.createTarget(
    const GpuTargetDescriptor(width: 4, height: 4),
  );

  final grade = GradeFeature(
    programLibrary: library,
    vertexSource: presentVertSrc,
    fragmentSource: gradeLutFragSrc,
    device: device,
    resolveLut: () => lutTexture,
  ).createPasses(_AlwaysAvailableResources()).single;
  final ps1 = Ps1QuantizeFeature(
    programLibrary: library,
    vertexSource: presentVertSrc,
    fragmentSource: ps1QuantizeFragSrc,
    device: device,
  ).createPasses(_AlwaysAvailableResources()).single;
  final vhs = VhsFeature(
    programLibrary: library,
    vertexSource: presentVertSrc,
    fragmentSource: vhsFragSrc,
    device: device,
    resolveHistory: () => vhsGhostTarget,
    resolveTime: () => 0.0,
  ).createPasses(_AlwaysAvailableResources()).single;

  for (final weight in [0.0, 1.0]) {
    _expect(
      _drawCountFor(
        device: device,
        pass: grade,
        resourceNames: [
          DofResources.dofOutput.name,
          GradeResources.gradeOutput.name,
        ],
        post: PostProcessState(colorGradeStrength: weight),
      ),
      1,
      'grade at weight $weight',
    );
    _expect(
      _drawCountFor(
        device: device,
        pass: ps1,
        resourceNames: [
          GradeResources.gradeOutput.name,
          Ps1Resources.ps1Output.name,
        ],
        post: PostProcessState(ditherStrength: weight),
      ),
      1,
      'ps1Quantize at weight $weight',
    );
    _expect(
      _drawCountFor(
        device: device,
        pass: vhs,
        resourceNames: [
          Ps1Resources.ps1Output.name,
          VhsResources.vhsOutput.name,
        ],
        post: PostProcessState(vhsChromaWeight: weight),
      ),
      1,
      'vhs at weight $weight',
    );
  }
}
