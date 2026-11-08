import 'package:pixeldart/rendering/api/capabilities.dart';
import 'package:pixeldart/rendering/passes/bloom_resources.dart';
import 'package:pixeldart/rendering/passes/dof_resources.dart';
import 'package:pixeldart/rendering/passes/grade_resources.dart';
import 'package:pixeldart/rendering/passes/ps1_resources.dart';
import 'package:pixeldart/rendering/passes/safe_graph_resources.dart';
import 'package:pixeldart/rendering/passes/shadow_graph.dart';
import 'package:pixeldart/rendering/passes/shadow_resources.dart';
import 'package:pixeldart/rendering/passes/ssao_resources.dart';
import 'package:pixeldart/rendering/passes/vhs_resources.dart';

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

void main() {
  final safe = PipelineResourcePlan.forProfile(QualityProfile.safe);
  require(safe.resources.length == 2, 'safe profile owns optional resources');
  require(!safe.hasHistory, 'safe profile owns history');

  final minimal = PipelineResourcePlan.forProfile(QualityProfile.minimal);
  require(
    minimal.resources.contains(ShadowResources.shadowMap),
    'minimal lacks shadow map',
  );
  require(
    minimal.resources.contains(SsaoResources.ssaoBlurred) == false,
    'minimal owns SSAO',
  );
  require(!minimal.hasHistory, 'minimal owns history');

  final full = PipelineResourcePlan.forProfile(QualityProfile.ps1Full);
  for (final resource in [
    ShadowResources.shadowMap,
    SsaoResources.ssaoRaw,
    BloomResources.bloomBlurH,
    BloomResources.sceneColorPostBloom,
    DofResources.dofOutput,
    GradeResources.gradeOutput,
    Ps1Resources.ps1Output,
    VhsResources.vhsOutput,
  ]) {
    require(full.resources.contains(resource), 'full profile misses $resource');
  }
  require(
    full.resources.contains(SafeGraphResources.presentTarget),
    'full profile misses present',
  );
  require(full.hasHistory, 'full profile misses VHS history');
  print('Renderer profile resource fixtures passed.');
}
