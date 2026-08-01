import '../core/graph_resource.dart';

/// RV-09's depth-of-field pipeline resources. [dofBlurH]/[dofBlurV] blur
/// bloom's own composited output at the same half-resolution convention SSAO
/// and bloom already use; [dofOutput] is a full-resolution target the
/// composite pass writes, distinct from `sceneColor` itself (never a
/// `nextVersion()` of it like bloom's own output is) because the composite
/// shader must read the sharp scene color and the blurred one as two
/// separate input textures in the same draw call — it cannot write back
/// onto either source in place the way bloom's additive blend does.
final class DofResources {
  const DofResources._();

  static const ResourceRef dofBlurH = ResourceRef(
    name: 'dofBlurH',
    format: ResourceFormat.rgba8,
    width: 192,
    height: 108,
  );

  static const ResourceRef dofBlurV = ResourceRef(
    name: 'dofBlurV',
    format: ResourceFormat.rgba8,
    width: 192,
    height: 108,
  );

  static const ResourceRef dofOutput = ResourceRef(
    name: 'dofOutput',
    format: ResourceFormat.rgba8,
    width: 384,
    height: 216,
  );
}
