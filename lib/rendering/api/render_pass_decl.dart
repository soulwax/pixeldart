import 'handles.dart';
import 'shaders.dart';

/// Read/write hazard role of an attachment in a declared render graph pass.
enum RenderPassAccess { read, write, readWrite, historyRead }

/// Pixel/depth storage format for a declared transient or external pass target.
enum RenderPassTargetFormat { rgba8, rgba16f, depth24, depth32f }

/// Canonical insertion point inside Pixeldart's safe render graph (`R3`).
enum RenderPassAnchor {
  beforeShadow,
  afterShadow,
  beforeDepth,
  afterDepth,
  beforeWorld,
  afterWorld,
  afterResolve,
  beforeGrade,
  afterGrade,
  beforePresent,
}

/// Declares an attachment read or write performed by a host render pass.
final class RenderPassAttachmentDecl {
  final String name;
  final RenderPassTargetFormat format;
  final RenderPassAccess access;
  final bool transient;
  final double scale;

  const RenderPassAttachmentDecl({
    required this.name,
    this.format = RenderPassTargetFormat.rgba8,
    this.access = RenderPassAccess.write,
    this.transient = true,
    this.scale = 1.0,
  });

  Map<String, Object?> toJson() => {
    'name': name,
    'format': format.name,
    'access': access.name,
    'transient': transient,
    'scale': scale,
  };
}

/// Host-declared render graph pass descriptor (`R3`).
final class RenderPassDecl {
  final String id;
  final RenderPassAnchor anchor;
  final List<RenderPassAttachmentDecl> attachments;
  final List<String> dependsOn;
  final ShaderOverride? shader;
  final Map<String, ShaderUniform> uniforms;
  final Map<String, TextureHandle> textures;
  final int priority;
  final bool enabled;

  const RenderPassDecl({
    required this.id,
    this.anchor = RenderPassAnchor.afterWorld,
    this.attachments = const [],
    this.dependsOn = const [],
    this.shader,
    this.uniforms = const {},
    this.textures = const {},
    this.priority = 0,
    this.enabled = true,
  });

  Iterable<RenderPassAttachmentDecl> get reads => attachments.where(
    (a) =>
        a.access == RenderPassAccess.read ||
        a.access == RenderPassAccess.readWrite ||
        a.access == RenderPassAccess.historyRead,
  );

  Iterable<RenderPassAttachmentDecl> get writes => attachments.where(
    (a) =>
        a.access == RenderPassAccess.write ||
        a.access == RenderPassAccess.readWrite,
  );

  Map<String, Object?> toJson() => {
    'id': id,
    'anchor': anchor.name,
    'priority': priority,
    'enabled': enabled,
    'dependsOn': dependsOn,
    'attachments': attachments.map((a) => a.toJson()).toList(),
    'uniformNames': uniforms.keys.toList(),
    'textureNames': textures.keys.toList(),
  };
}

/// Recorded indirect draw batch submission metadata for `DrawBatcherComponent`.
final class SubmittedIndirectBatch {
  final String passId;
  final List<MeshHandle> meshes;
  final List<MaterialHandle> materials;
  final int instanceCount;
  final int drawCommandCount;

  const SubmittedIndirectBatch({
    required this.passId,
    required this.meshes,
    required this.materials,
    this.instanceCount = 0,
    this.drawCommandCount = 0,
  });
}

/// Frozen capacity constants, shader slot IDs, and uniform names shared between
/// `pixeldart` and `gl_volition` across Wave 12 (`[P4-W12-0]`).
abstract final class RenderingShaderContracts {
  /// Maximum bone palette matrices uploaded for skeletal GPU skinning.
  static const int maxSkinJoints = 64;

  /// Fixed joint influences per skinned vertex (`JOINTS_0` / `WEIGHTS_0`).
  static const int maxJointInfluencesPerVertex = 4;

  static const String skinEnabledUniform = 'uSkinEnabled';
  static const String skinJointCountUniform = 'uJointCount';
  static const String skinPaletteUniformPrefix = 'uJointMatrices_';

  /// Order-2 Spherical Harmonics band count (9 RGB coefficients: c0..c8).
  static const int sh3CoefficientCount = 9;
  static const String sh3EnabledUniform = 'uLightProbeShEnabled';
  static const String sh3UniformPrefix = 'uLightProbeSh_';
  static const String sh3OriginUniform = 'uLightProbeShOrigin';
  static const String sh3IntensityUniform = 'uLightProbeShIntensity';

  static String sh3CoefficientUniform(int bandIndex) =>
      '$sh3UniformPrefix$bandIndex';

  static String skinJointMatrixUniform(int jointIndex) =>
      '$skinPaletteUniformPrefix$jointIndex';

  /// Host-declared `R3` pass IDs & uniform names for decoupled subsystems.
  static const String lighting2dPassId = 'lighting2d_overlay';
  static const String lighting2dAmbientUniform = 'uLighting2dAmbient';
  static const String lighting2dLightCountUniform = 'uLighting2dCount';
  static const String lighting2dCasterCountUniform = 'uLighting2dCasterCount';
  static const String lighting2dLightmapTexture = 'uLighting2dMap';

  static const String softBodyPassId = 'soft_body_deform';
  static const String indirectBatchPassId = 'indirect_batch';
}
