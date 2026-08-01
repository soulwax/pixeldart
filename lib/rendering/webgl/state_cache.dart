enum BlendEquation { add, subtract, reverseSubtract }

enum BlendFactor {
  zero,
  one,
  srcAlpha,
  oneMinusSrcAlpha,
  dstAlpha,
  oneMinusDstAlpha,
}

enum CullFace { front, back }

enum DepthFunc { less, lessEqual, always, never }

/// A complete draw-pass state descriptor (§6.4). Every pass supplies one of
/// these; `WebGlStateCache` diffs it against the previously applied
/// descriptor and issues only the GL calls needed to reach the new state,
/// so a shadow, transparent, or debug pass cannot poison the next pass
/// through leaked divisors, color masks, draw buffers, culling, or depth
/// writes.
final class DrawStateDescriptor {
  final bool depthTest;
  final DepthFunc depthFunc;
  final bool depthWrite;
  final bool blendEnable;
  final BlendFactor blendSrc;
  final BlendFactor blendDst;
  final BlendEquation blendEquation;
  final bool cullEnable;
  final CullFace cullFace;
  final bool frontFaceCcw;
  final bool stencilEnable;
  final bool colorMaskR, colorMaskG, colorMaskB, colorMaskA;
  final bool scissorEnable;

  const DrawStateDescriptor({
    this.depthTest = true,
    this.depthFunc = DepthFunc.less,
    this.depthWrite = true,
    this.blendEnable = false,
    this.blendSrc = BlendFactor.one,
    this.blendDst = BlendFactor.zero,
    this.blendEquation = BlendEquation.add,
    this.cullEnable = true,
    this.cullFace = CullFace.back,
    this.frontFaceCcw = true,
    this.stencilEnable = false,
    this.colorMaskR = true,
    this.colorMaskG = true,
    this.colorMaskB = true,
    this.colorMaskA = true,
    this.scissorEnable = false,
  });

  /// A per-draw override for the one field a `MaterialDefinition` is known
  /// to need to override on top of its pass's own declared state
  /// (`doubleSided` disabling cull per-material, not per-pass) — every
  /// other field passes through unchanged.
  DrawStateDescriptor withCullEnable(bool value) => DrawStateDescriptor(
    depthTest: depthTest,
    depthFunc: depthFunc,
    depthWrite: depthWrite,
    blendEnable: blendEnable,
    blendSrc: blendSrc,
    blendDst: blendDst,
    blendEquation: blendEquation,
    cullEnable: value,
    cullFace: cullFace,
    frontFaceCcw: frontFaceCcw,
    stencilEnable: stencilEnable,
    colorMaskR: colorMaskR,
    colorMaskG: colorMaskG,
    colorMaskB: colorMaskB,
    colorMaskA: colorMaskA,
    scissorEnable: scissorEnable,
  );

  static const DrawStateDescriptor opaqueDefault = DrawStateDescriptor();

  static const DrawStateDescriptor blendedDefault = DrawStateDescriptor(
    depthWrite: false,
    blendEnable: true,
    blendSrc: BlendFactor.srcAlpha,
    blendDst: BlendFactor.oneMinusSrcAlpha,
  );

  /// §8.6's "additive shafts use their own blend state" — `one`/`one`
  /// rather than [blendedDefault]'s `srcAlpha`/`oneMinusSrcAlpha`, the same
  /// pure-additive pair bloom's own composite pass already uses, so a
  /// shaft only ever adds light on top of what is already there and never
  /// darkens or replaces it.
  static const DrawStateDescriptor additiveDefault = DrawStateDescriptor(
    depthWrite: false,
    blendEnable: true,
    blendSrc: BlendFactor.one,
    blendDst: BlendFactor.one,
  );
}

enum StateField {
  depthTest,
  depthFunc,
  depthWrite,
  blendEnable,
  blendFunc,
  blendEquation,
  cullEnable,
  cullFace,
  frontFace,
  stencilEnable,
  colorMask,
  scissorEnable,
}

/// Tracks the last-applied [DrawStateDescriptor] and computes the minimal
/// set of changed fields against a new one. Contains no GL calls itself —
/// the WebGL backend consumes [diff] and issues state-setting calls only
/// for the returned fields, which is what makes the diff independently
/// testable without a context.
final class WebGlStateCache {
  DrawStateDescriptor? _applied;

  DrawStateDescriptor? get applied => _applied;

  Set<StateField> diff(DrawStateDescriptor next) {
    final prev = _applied;
    if (prev == null) return StateField.values.toSet();

    final changed = <StateField>{};
    if (prev.depthTest != next.depthTest) changed.add(StateField.depthTest);
    if (prev.depthFunc != next.depthFunc) changed.add(StateField.depthFunc);
    if (prev.depthWrite != next.depthWrite) changed.add(StateField.depthWrite);
    if (prev.blendEnable != next.blendEnable) {
      changed.add(StateField.blendEnable);
    }
    if (prev.blendSrc != next.blendSrc || prev.blendDst != next.blendDst) {
      changed.add(StateField.blendFunc);
    }
    if (prev.blendEquation != next.blendEquation) {
      changed.add(StateField.blendEquation);
    }
    if (prev.cullEnable != next.cullEnable) changed.add(StateField.cullEnable);
    if (prev.cullFace != next.cullFace) changed.add(StateField.cullFace);
    if (prev.frontFaceCcw != next.frontFaceCcw) {
      changed.add(StateField.frontFace);
    }
    if (prev.stencilEnable != next.stencilEnable) {
      changed.add(StateField.stencilEnable);
    }
    if (prev.colorMaskR != next.colorMaskR ||
        prev.colorMaskG != next.colorMaskG ||
        prev.colorMaskB != next.colorMaskB ||
        prev.colorMaskA != next.colorMaskA) {
      changed.add(StateField.colorMask);
    }
    if (prev.scissorEnable != next.scissorEnable) {
      changed.add(StateField.scissorEnable);
    }
    return changed;
  }

  void markApplied(DrawStateDescriptor next) {
    _applied = next;
  }

  /// Forces the next [diff] to report every field, used after a pass whose
  /// state changes were not routed through this cache (a raw-GL debug pass,
  /// or after context restoration).
  void invalidate() {
    _applied = null;
  }
}
