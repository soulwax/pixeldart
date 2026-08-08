part of 'test_zero_cost.dart';

// ---- Grade / PS1 quantize / VHS: the documented non-skippers ----

/// None of these three passes have ever claimed a per-frame skip (no board
/// entry lists one), and this fixture is what makes that claim checkable
/// rather than assumed: each draws exactly once regardless of its own
/// weight, at both a zero and a representative nonzero value. Their
/// zero-cost story is RP-3's build-time exclusion — never constructed at
/// all under a profile that excludes them — not a branch inside `execute()`
/// the way SSAO/bloom/DOF's blur stages have. A per-frame skip here would
/// need a fallback-copy path (the same shape DOF's own composite already
/// can't avoid), which is exactly why build-time exclusion, not a runtime
/// branch, is the mechanism RP-3 builds instead.
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
