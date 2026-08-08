import 'package:pixeldart/rendering/rendering.dart';

ProgramSource source(String id) => ProgramSource(
  id: id,
  vertexSource: 'void main() {}',
  fragmentSource: 'void main() {}',
  attributeLocations: const {},
);

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

void main() {
  const planner = ProgramSetPlanner();
  final planned = planner.plan(
    profile: QualityProfile.clean,
    base: source('world'),
    featureSources: {
      PipelineFeatures.bloom: source('bloom'),
      PipelineFeatures.dof: source('dof'),
      PipelineFeatures.grade: source('grade'),
      PipelineFeatures.shadows: source('shadows'),
      PipelineFeatures.ssao: source('ssao'),
    },
  );
  require(planned.first.id == 'world', 'base program must be first');
  require(
    planned.map((program) => program.id).join(',') ==
        'world,bloom,dof,grade,shadows,ssao',
    'profile program order must be canonical',
  );
  var rejected = false;
  try {
    planner.plan(
      profile: QualityProfile.ps1Full,
      base: source('world'),
      featureSources: const {},
    );
  } catch (_) {
    rejected = true;
  }
  require(rejected, 'missing feature source must reject before GPU work');
  print('Renderer program-set planner fixtures passed.');
}
