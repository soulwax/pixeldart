enum BlendEquation { add, subtract, reverseSubtract }

enum BlendFactor {
  zero,
  one,
  srcAlpha,
  oneMinusSrcAlpha,
  dstAlpha,
  oneMinusDstAlpha,
  srcColor,
}

enum CullFace { front, back }

enum DepthFunc { less, lessEqual, always, never }

enum StencilFunc {
  never,
  less,
  lessEqual,
  greater,
  greaterEqual,
  equal,
  notEqual,
  always,
}

enum StencilOp {
  keep,
  zero,
  replace,
  increment,
  incrementWrap,
  decrement,
  decrementWrap,
  invert,
}

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
  final StencilFunc stencilFunc;
  final int stencilRef;
  final int stencilMask;
  final StencilOp stencilFail;
  final StencilOp stencilZFail;
  final StencilOp stencilZPass;
  final int stencilWriteMask;
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
    this.stencilFunc = StencilFunc.always,
    this.stencilRef = 0,
    this.stencilMask = 0xFF,
    this.stencilFail = StencilOp.keep,
    this.stencilZFail = StencilOp.keep,
    this.stencilZPass = StencilOp.keep,
    this.stencilWriteMask = 0xFF,
    this.colorMaskR = true,
    this.colorMaskG = true,
    this.colorMaskB = true,
    this.colorMaskA = true,
    this.scissorEnable = false,
  });

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
    stencilFunc: stencilFunc,
    stencilRef: stencilRef,
    stencilMask: stencilMask,
    stencilFail: stencilFail,
    stencilZFail: stencilZFail,
    stencilZPass: stencilZPass,
    stencilWriteMask: stencilWriteMask,
    colorMaskR: colorMaskR,
    colorMaskG: colorMaskG,
    colorMaskB: colorMaskB,
    colorMaskA: colorMaskA,
    scissorEnable: scissorEnable,
  );

  DrawStateDescriptor withCullFace(CullFace face) => DrawStateDescriptor(
    depthTest: depthTest,
    depthFunc: depthFunc,
    depthWrite: depthWrite,
    blendEnable: blendEnable,
    blendSrc: blendSrc,
    blendDst: blendDst,
    blendEquation: blendEquation,
    cullEnable: cullEnable,
    cullFace: face,
    frontFaceCcw: frontFaceCcw,
    stencilEnable: stencilEnable,
    stencilFunc: stencilFunc,
    stencilRef: stencilRef,
    stencilMask: stencilMask,
    stencilFail: stencilFail,
    stencilZFail: stencilZFail,
    stencilZPass: stencilZPass,
    stencilWriteMask: stencilWriteMask,
    colorMaskR: colorMaskR,
    colorMaskG: colorMaskG,
    colorMaskB: colorMaskB,
    colorMaskA: colorMaskA,
    scissorEnable: scissorEnable,
  );

  DrawStateDescriptor withStencil({
    bool? enable,
    StencilFunc? func,
    int? ref,
    int? mask,
    StencilOp? fail,
    StencilOp? zFail,
    StencilOp? zPass,
    int? writeMask,
  }) => DrawStateDescriptor(
    depthTest: depthTest,
    depthFunc: depthFunc,
    depthWrite: depthWrite,
    blendEnable: blendEnable,
    blendSrc: blendSrc,
    blendDst: blendDst,
    blendEquation: blendEquation,
    cullEnable: cullEnable,
    cullFace: cullFace,
    frontFaceCcw: frontFaceCcw,
    stencilEnable: enable ?? stencilEnable,
    stencilFunc: func ?? stencilFunc,
    stencilRef: ref ?? stencilRef,
    stencilMask: mask ?? stencilMask,
    stencilFail: fail ?? stencilFail,
    stencilZFail: zFail ?? stencilZFail,
    stencilZPass: zPass ?? stencilZPass,
    stencilWriteMask: writeMask ?? stencilWriteMask,
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

  static const DrawStateDescriptor additiveDefault = DrawStateDescriptor(
    depthWrite: false,
    blendEnable: true,
    blendSrc: BlendFactor.one,
    blendDst: BlendFactor.one,
  );

  static const DrawStateDescriptor additiveCoverage = DrawStateDescriptor(
    depthWrite: false,
    blendEnable: true,
    blendSrc: BlendFactor.srcAlpha,
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
  stencilFunc,
  stencilOp,
  stencilMask,
  colorMask,
  scissorEnable,
}

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
    if (prev.stencilFunc != next.stencilFunc ||
        prev.stencilRef != next.stencilRef ||
        prev.stencilMask != next.stencilMask) {
      changed.add(StateField.stencilFunc);
    }
    if (prev.stencilFail != next.stencilFail ||
        prev.stencilZFail != next.stencilZFail ||
        prev.stencilZPass != next.stencilZPass) {
      changed.add(StateField.stencilOp);
    }
    if (prev.stencilWriteMask != next.stencilWriteMask) {
      changed.add(StateField.stencilMask);
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

  void invalidate() {
    _applied = null;
  }
}
