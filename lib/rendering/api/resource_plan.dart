import 'capabilities.dart';
import 'settings.dart';

final class OwnedResourcePlan {
  final Set<String> resources;
  final bool hasHistory;

  const OwnedResourcePlan({required this.resources, required this.hasHistory});

  factory OwnedResourcePlan.forConfiguration(
    RendererConfiguration configuration,
  ) {
    final resources = <String>{'sceneColor', 'present'};
    final profile = configuration.profile;
    if (profile.installs(PipelineFeatures.shadows)) {
      resources.addAll({'shadowMap', 'sceneDepth'});
    }
    if (profile.installs(PipelineFeatures.ssao)) {
      resources.addAll({'ssaoRaw', 'ssaoBlurred'});
    }
    if (profile.installs(PipelineFeatures.bloom)) {
      resources.addAll({'bloomBlurH', 'bloomBlurV', 'sceneColor#1'});
    }
    if (profile.installs(PipelineFeatures.dof)) {
      resources.addAll({'dofBlurH', 'dofBlurV', 'dofOutput'});
    }
    if (profile.installs(PipelineFeatures.grade)) resources.add('gradeOutput');
    if (profile.installs(PipelineFeatures.ps1)) resources.add('ps1Output');
    final hasHistory = profile.installs(PipelineFeatures.vhs);
    if (hasHistory) resources.add('vhsOutput');
    return OwnedResourcePlan(
      resources: Set.unmodifiable(resources),
      hasHistory: hasHistory,
    );
  }
}
