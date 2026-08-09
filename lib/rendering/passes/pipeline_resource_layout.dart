import '../core/graph_resource.dart';
import 'bloom_resources.dart';
import 'depth_resources.dart';
import 'dof_resources.dart';
import 'grade_resources.dart';
import 'ps1_resources.dart';
import 'safe_graph_resources.dart';
import 'shadow_resources.dart';
import 'ssao_resources.dart';
import 'vhs_resources.dart';

/// Configuration-scoped identities for the optional pipeline.
///
/// Resource names and versions remain stable so runtime resolvers and history
/// keys do not change across a resize; only the physical extent metadata is
/// rebuilt. Half-resolution targets round up, matching the GPU adapter's
/// allocation rule for odd internal dimensions.
final class PipelineResourceLayout {
  final int internalWidth;
  final int internalHeight;
  final int halfWidth;
  final int halfHeight;
  final int shadowMapSize;
  final int sampleCount;

  final ResourceRef sceneColor;
  final ResourceRef sceneColorResolved;
  final ResourceRef presentTarget;
  final ResourceRef sceneDepth;
  final ResourceRef shadowMap;
  final ResourceRef ssaoRaw;
  final ResourceRef ssaoBlurred;
  final ResourceRef bloomBlurH;
  final ResourceRef bloomBlurV;
  final ResourceRef sceneColorPostBloom;
  final ResourceRef dofBlurH;
  final ResourceRef dofBlurV;
  final ResourceRef dofOutput;
  final ResourceRef gradeOutput;
  final ResourceRef ps1Output;
  final ResourceRef vhsOutput;

  PipelineResourceLayout({
    required this.internalWidth,
    required this.internalHeight,
    required this.shadowMapSize,
    this.sampleCount = 1,
  }) : halfWidth = (internalWidth + 1) ~/ 2,
       halfHeight = (internalHeight + 1) ~/ 2,
       sceneColor = _sized(
         SafeGraphResources.sceneColor,
         internalWidth,
         internalHeight,
         samples: sampleCount,
       ),
       sceneColorResolved = _sized(
         SafeGraphResources.sceneColor.nextVersion(),
         internalWidth,
         internalHeight,
       ),
       presentTarget = _sized(
         SafeGraphResources.presentTarget,
         internalWidth,
         internalHeight,
       ),
       sceneDepth = _sized(
         DepthPrepassResources.sceneDepth,
         internalWidth,
         internalHeight,
       ),
       shadowMap = _sized(
         ShadowResources.shadowMap,
         shadowMapSize,
         shadowMapSize,
       ),
       ssaoRaw = _sized(
         SsaoResources.ssaoRaw,
         (internalWidth + 1) ~/ 2,
         (internalHeight + 1) ~/ 2,
       ),
       ssaoBlurred = _sized(
         SsaoResources.ssaoBlurred,
         (internalWidth + 1) ~/ 2,
         (internalHeight + 1) ~/ 2,
       ),
       bloomBlurH = _sized(
         BloomResources.bloomBlurH,
         (internalWidth + 1) ~/ 2,
         (internalHeight + 1) ~/ 2,
       ),
       bloomBlurV = _sized(
         BloomResources.bloomBlurV,
         (internalWidth + 1) ~/ 2,
         (internalHeight + 1) ~/ 2,
       ),
       sceneColorPostBloom = _sized(
         BloomResources.sceneColorPostBloom,
         internalWidth,
         internalHeight,
         version: sampleCount > 1 ? 2 : 1,
       ),
       dofBlurH = _sized(
         DofResources.dofBlurH,
         (internalWidth + 1) ~/ 2,
         (internalHeight + 1) ~/ 2,
       ),
       dofBlurV = _sized(
         DofResources.dofBlurV,
         (internalWidth + 1) ~/ 2,
         (internalHeight + 1) ~/ 2,
       ),
       dofOutput = _sized(
         DofResources.dofOutput,
         internalWidth,
         internalHeight,
       ),
       gradeOutput = _sized(
         GradeResources.gradeOutput,
         internalWidth,
         internalHeight,
       ),
       ps1Output = _sized(
         Ps1Resources.ps1Output,
         internalWidth,
         internalHeight,
       ),
       vhsOutput = _sized(
         VhsResources.vhsOutput,
         internalWidth,
         internalHeight,
       );

  static ResourceRef _sized(
    ResourceRef base,
    int width,
    int height, {
    int? samples,
    int? version,
  }) => ResourceRef(
    name: base.name,
    format: base.format,
    width: width,
    height: height,
    samples: samples ?? base.samples,
    version: version ?? base.version,
  );
}
