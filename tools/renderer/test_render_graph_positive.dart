import 'package:pixeldart/rendering/core/graph_pass.dart';
import 'package:pixeldart/rendering/core/graph_resource.dart';
import 'package:pixeldart/rendering/core/render_graph.dart';

const _sceneColor = ResourceRef(
  name: 'sceneColor',
  format: ResourceFormat.rgba8,
  width: 384,
  height: 216,
);
const _presentTarget = ResourceRef(
  name: 'present',
  format: ResourceFormat.rgba8,
  width: 384,
  height: 216,
);

void main() {
  _validSafeGraphAccepted();
  _mandatoryGraphIndependentOfOptionalEffects();
  print('Renderer graph positive-control fixtures passed.');
}

void _validSafeGraphAccepted() {
  final builder = RenderGraphBuilder();
  builder.addPass(
    PassDeclaration(
      id: 'worldOpaque',
      stage: GraphStage.beforeWorld,
      uses: [const ResourceUse(_sceneColor, ResourceAccess.write)],
    ),
  );
  builder.addPass(
    PassDeclaration(
      id: 'worldTransparent',
      stage: GraphStage.afterWorld,
      uses: [const ResourceUse(_sceneColor, ResourceAccess.read)],
    ),
  );
  builder.addPass(
    PassDeclaration(
      id: 'present',
      stage: GraphStage.beforePresent,
      uses: [
        const ResourceUse(_sceneColor, ResourceAccess.read),
        const ResourceUse(_presentTarget, ResourceAccess.write),
      ],
    ),
  );
  final graph = builder.build(
    availableCapabilities: {},
    hasValidPreviousFrame: false,
  );
  if (!graph.isValid) {
    throw StateError(
      'the mandatory safe graph must validate cleanly: ${graph.failures}',
    );
  }
  if (graph.orderedPasses.length != 3) {
    throw StateError('expected exactly 3 passes in the safe graph');
  }
}

void _mandatoryGraphIndependentOfOptionalEffects() {
  var bloomInstalled = false;
  final builder = RenderGraphBuilder();
  builder.addPass(
    PassDeclaration(
      id: 'worldOpaque',
      stage: GraphStage.beforeWorld,
      uses: [const ResourceUse(_sceneColor, ResourceAccess.write)],
    ),
  );
  builder.addPass(
    PassDeclaration(
      id: 'present',
      stage: GraphStage.beforePresent,
      uses: [const ResourceUse(_sceneColor, ResourceAccess.read)],
    ),
  );
  builder.addPass(
    PassDeclaration(
      id: 'bloom',
      stage: GraphStage.afterResolve,
      uses: const [],
      enabledPredicate: () => bloomInstalled,
    ),
  );

  final withoutBloom = builder.build(
    availableCapabilities: {},
    hasValidPreviousFrame: false,
  );
  if (!withoutBloom.isValid) {
    throw StateError(
      'mandatory world/present must build independent of optional bloom: ${withoutBloom.failures}',
    );
  }
  if (withoutBloom.orderedPasses.any((p) => p.id == 'bloom')) {
    throw StateError(
      'disabled optional pass must be absent from orderedPasses',
    );
  }

  bloomInstalled = true;
  final withBloom = builder.build(
    availableCapabilities: {},
    hasValidPreviousFrame: false,
  );
  if (!withBloom.orderedPasses.any((p) => p.id == 'bloom')) {
    throw StateError('enabled optional pass must appear in orderedPasses');
  }
}
