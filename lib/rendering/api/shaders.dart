enum ShaderSlot {
  safeWorld,
  texturedWorld,
  shadowedWorld,
  shadowCaster,
  depthPrepass,
  depthDebug,
  sprites,
  ssaoOcclusion,
  ssaoBlur,
  volumetricLight,
  volumetricComposite,
  bloomBlurH,
  bloomBlurV,
  bloomComposite,
  dofBlurH,
  dofBlurV,
  dofComposite,
  grade,
  ps1Quantize,
  vhs,
  present;

  static ShaderSlot? forProgramId(String id) {
    for (final slot in values) {
      if (slot.name == id) return slot;
    }
    return null;
  }
}

final class ShaderOverride {
  final String? vertex;
  final String? fragment;

  const ShaderOverride({this.vertex, this.fragment});

  void validate() {
    if (vertex == null && fragment == null) {
      throw ArgumentError('ShaderOverride needs a vertex or fragment source');
    }
    if (vertex != null && vertex!.trim().isEmpty) {
      throw ArgumentError('ShaderOverride.vertex must not be empty');
    }
    if (fragment != null && fragment!.trim().isEmpty) {
      throw ArgumentError('ShaderOverride.fragment must not be empty');
    }
  }

  @override
  bool operator ==(Object other) =>
      other is ShaderOverride &&
      other.vertex == vertex &&
      other.fragment == fragment;

  @override
  int get hashCode => Object.hash(vertex, fragment);
}
