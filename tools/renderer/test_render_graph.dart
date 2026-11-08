import 'package:pixeldart/rendering/core/graph_pass.dart';
import 'package:pixeldart/rendering/core/graph_resource.dart';
import 'package:pixeldart/rendering/core/render_graph.dart';

const _sceneColor = ResourceRef(
  name: 'sceneColor',
  format: ResourceFormat.rgba8,
  width: 384,
  height: 216,
);
const _sceneColorMsaa = ResourceRef(
  name: 'sceneColorMsaa',
  format: ResourceFormat.rgba8,
  width: 384,
  height: 216,
  samples: 4,
);
void main() {
  _readBeforeWriteRejected();
  _duplicateWriterRejected();
  _multisampledSamplingRejected();
  _resolveFormatMismatchRejected();
  _formatOrSizeMismatchRejected();
  _unversionedReadWriteRejected();
  _historyReadWithoutValidFrameRejected();
  _dependencyCycleRejected();
  _missingCapabilityRejected();
  print('Renderer graph negative-case fixtures passed.');
}

void _expectInvalid(RenderGraph graph, GraphValidationFailureKind kind) {
  if (graph.isValid) {
    throw StateError(
      'expected graph to be invalid for $kind, but it validated',
    );
  }
  if (!graph.failures.any((f) => f.kind == kind)) {
    throw StateError('expected a $kind failure, got: ${graph.failures}');
  }
}

void _readBeforeWriteRejected() {
  final builder = RenderGraphBuilder();
  builder.addPass(
    PassDeclaration(
      id: 'present',
      stage: GraphStage.beforePresent,
      uses: [const ResourceUse(_sceneColor, ResourceAccess.read)],
    ),
  );
  final graph = builder.build(
    availableCapabilities: {},
    hasValidPreviousFrame: false,
  );
  _expectInvalid(graph, GraphValidationFailureKind.readBeforeWrite);
}

void _duplicateWriterRejected() {
  final builder = RenderGraphBuilder();
  builder.addPass(
    PassDeclaration(
      id: 'worldA',
      stage: GraphStage.beforeWorld,
      uses: [const ResourceUse(_sceneColor, ResourceAccess.write)],
    ),
  );
  builder.addPass(
    PassDeclaration(
      id: 'worldB',
      stage: GraphStage.beforeWorld,
      uses: [const ResourceUse(_sceneColor, ResourceAccess.write)],
    ),
  );
  final graph = builder.build(
    availableCapabilities: {},
    hasValidPreviousFrame: false,
  );
  _expectInvalid(graph, GraphValidationFailureKind.duplicateWriter);
}

void _multisampledSamplingRejected() {
  final builder = RenderGraphBuilder();
  builder.addPass(
    PassDeclaration(
      id: 'world',
      stage: GraphStage.beforeWorld,
      uses: [const ResourceUse(_sceneColorMsaa, ResourceAccess.write)],
    ),
  );
  builder.addPass(
    PassDeclaration(
      id: 'present',
      stage: GraphStage.beforePresent,
      uses: [const ResourceUse(_sceneColorMsaa, ResourceAccess.read)],
    ),
  );
  final graph = builder.build(
    availableCapabilities: {},
    hasValidPreviousFrame: false,
  );
  _expectInvalid(
    graph,
    GraphValidationFailureKind.sampledMultisampledAttachment,
  );
}

void _resolveFormatMismatchRejected() {
  const resolvedRgba16f = ResourceRef(
    name: 'resolved',
    format: ResourceFormat.rgba16f,
    width: 384,
    height: 216,
    version: 0,
  );
  const resolvedReadAsRgba8 = ResourceRef(
    name: 'resolved',
    format: ResourceFormat.rgba8,
    width: 384,
    height: 216,
    version: 0,
  );
  final builder = RenderGraphBuilder();
  builder.addPass(
    PassDeclaration(
      id: 'world',
      stage: GraphStage.beforeWorld,
      uses: [const ResourceUse(_sceneColorMsaa, ResourceAccess.write)],
    ),
  );
  builder.addPass(
    PassDeclaration(
      id: 'resolve',
      stage: GraphStage.afterResolve,
      uses: [const ResourceUse(resolvedRgba16f, ResourceAccess.write)],
    ),
  );
  builder.addPass(
    PassDeclaration(
      id: 'present',
      stage: GraphStage.beforePresent,
      uses: [const ResourceUse(resolvedReadAsRgba8, ResourceAccess.read)],
    ),
  );
  final graph = builder.build(
    availableCapabilities: {},
    hasValidPreviousFrame: false,
  );
  _expectInvalid(graph, GraphValidationFailureKind.formatOrSizeMismatch);
}

void _formatOrSizeMismatchRejected() {
  const wrongSize = ResourceRef(
    name: 'sceneColor',
    format: ResourceFormat.rgba8,
    width: 192,
    height: 108,
  );
  final builder = RenderGraphBuilder();
  builder.addPass(
    PassDeclaration(
      id: 'world',
      stage: GraphStage.beforeWorld,
      uses: [const ResourceUse(_sceneColor, ResourceAccess.write)],
    ),
  );
  builder.addPass(
    PassDeclaration(
      id: 'present',
      stage: GraphStage.beforePresent,
      uses: [const ResourceUse(wrongSize, ResourceAccess.read)],
    ),
  );
  final graph = builder.build(
    availableCapabilities: {},
    hasValidPreviousFrame: false,
  );
  _expectInvalid(graph, GraphValidationFailureKind.formatOrSizeMismatch);
}

void _unversionedReadWriteRejected() {
  final builder = RenderGraphBuilder();
  builder.addPass(
    PassDeclaration(
      id: 'seed',
      stage: GraphStage.beforeWorld,
      uses: [const ResourceUse(_sceneColor, ResourceAccess.write)],
    ),
  );
  builder.addPass(
    PassDeclaration(
      id: 'feedback',
      stage: GraphStage.afterWorld,
      uses: [
        const ResourceUse(_sceneColor, ResourceAccess.read),
        const ResourceUse(_sceneColor, ResourceAccess.write),
      ],
    ),
  );
  final graph = builder.build(
    availableCapabilities: {},
    hasValidPreviousFrame: false,
  );
  _expectInvalid(graph, GraphValidationFailureKind.unversionedReadWrite);
}

void _historyReadWithoutValidFrameRejected() {
  final builder = RenderGraphBuilder();
  builder.addPass(
    PassDeclaration(
      id: 'vhs',
      stage: GraphStage.afterGrade,
      uses: [const ResourceUse(_sceneColor, ResourceAccess.historyRead)],
    ),
  );
  final graph = builder.build(
    availableCapabilities: {},
    hasValidPreviousFrame: false,
  );
  _expectInvalid(graph, GraphValidationFailureKind.invalidHistoryRead);

  final validGraph = builder.build(
    availableCapabilities: {},
    hasValidPreviousFrame: true,
  );
  if (!validGraph.isValid) {
    throw StateError(
      'history read must be accepted once a valid previous frame exists: ${validGraph.failures}',
    );
  }
}

void _dependencyCycleRejected() {
  const x = ResourceRef(
    name: 'x',
    format: ResourceFormat.rgba8,
    width: 8,
    height: 8,
  );
  const y = ResourceRef(
    name: 'y',
    format: ResourceFormat.rgba8,
    width: 8,
    height: 8,
  );

  // passA writes x and reads y; passB writes y and reads x: a two-node cycle
  // with no duplicate writer and no same-version read/write on either pass.
  final builder = RenderGraphBuilder();
  builder.addPass(
    PassDeclaration(
      id: 'passA',
      stage: GraphStage.beforeWorld,
      uses: [
        const ResourceUse(y, ResourceAccess.read),
        const ResourceUse(x, ResourceAccess.write),
      ],
    ),
  );
  builder.addPass(
    PassDeclaration(
      id: 'passB',
      stage: GraphStage.beforeWorld,
      uses: [
        const ResourceUse(x, ResourceAccess.read),
        const ResourceUse(y, ResourceAccess.write),
      ],
    ),
  );
  final graph = builder.build(
    availableCapabilities: {},
    hasValidPreviousFrame: false,
  );
  _expectInvalid(graph, GraphValidationFailureKind.dependencyCycle);
}

void _missingCapabilityRejected() {
  final builder = RenderGraphBuilder();
  builder.addPass(
    PassDeclaration(
      id: 'ssao',
      stage: GraphStage.beforeWorld,
      uses: [const ResourceUse(_sceneColor, ResourceAccess.write)],
      requiredCapabilities: const {'float-render-target'},
    ),
  );
  final graph = builder.build(
    availableCapabilities: {},
    hasValidPreviousFrame: false,
  );
  _expectInvalid(graph, GraphValidationFailureKind.missingCapability);

  final withCapability = builder.build(
    availableCapabilities: {'float-render-target'},
    hasValidPreviousFrame: false,
  );
  if (!withCapability.isValid) {
    throw StateError(
      'expected graph to validate once the capability is available',
    );
  }
}
