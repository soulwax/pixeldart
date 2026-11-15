import '../api/render_pass_decl.dart';
import 'graph_resource.dart';
import 'render_feature.dart';
import 'render_graph.dart';

/// Translates a host [RenderPassAnchor] to an internal [GraphStage].
GraphStage anchorToStage(RenderPassAnchor anchor) => switch (anchor) {
  RenderPassAnchor.beforeShadow => GraphStage.beforeShadow,
  RenderPassAnchor.afterShadow => GraphStage.afterShadow,
  RenderPassAnchor.beforeDepth => GraphStage.beforeDepth,
  RenderPassAnchor.afterDepth => GraphStage.afterDepth,
  RenderPassAnchor.beforeWorld => GraphStage.beforeWorld,
  RenderPassAnchor.afterWorld => GraphStage.afterWorld,
  RenderPassAnchor.afterResolve => GraphStage.afterResolve,
  RenderPassAnchor.beforeGrade => GraphStage.beforeGrade,
  RenderPassAnchor.afterGrade => GraphStage.afterGrade,
  RenderPassAnchor.beforePresent => GraphStage.beforePresent,
};

/// Translates a host [RenderPassTargetFormat] to an internal [ResourceFormat].
ResourceFormat targetFormatToResource(RenderPassTargetFormat format) =>
    switch (format) {
      RenderPassTargetFormat.rgba8 => ResourceFormat.rgba8,
      RenderPassTargetFormat.rgba16f => ResourceFormat.rgba16f,
      RenderPassTargetFormat.depth24 => ResourceFormat.depth24,
      RenderPassTargetFormat.depth32f => ResourceFormat.depth32f,
    };

/// Translates a host [RenderPassAccess] to an internal [ResourceAccess].
ResourceAccess passAccessToResource(RenderPassAccess access) => switch (access) {
  RenderPassAccess.read => ResourceAccess.read,
  RenderPassAccess.write => ResourceAccess.write,
  RenderPassAccess.readWrite => ResourceAccess.write,
  RenderPassAccess.historyRead => ResourceAccess.historyRead,
};

/// A custom render pass instantiated from a host-declared [RenderPassDecl] (`R3`).
final class DeclaredRenderPass implements RenderPass {
  final RenderPassDecl declaration;
  @override
  final PassDescriptor descriptor;

  DeclaredRenderPass({
    required this.declaration,
    required this.descriptor,
  });

  @override
  void execute(RenderPassContext context) {
    // When executing a declared pass, custom uniforms/textures can be applied
    // to the command encoder or pass context.
  }

  /// Converts a [RenderPassDecl] to a [DeclaredRenderPass] with resolved attachments.
  static DeclaredRenderPass fromDeclaration(
    RenderPassDecl decl, {
    required int baseWidth,
    required int baseHeight,
  }) {
    final stage = anchorToStage(decl.anchor);
    final uses = <ResourceUse>[];

    for (final att in decl.attachments) {
      final width = (baseWidth * att.scale).round().clamp(1, 16384);
      final height = (baseHeight * att.scale).round().clamp(1, 16384);
      final ref = ResourceRef(
        name: att.name,
        format: targetFormatToResource(att.format),
        width: width,
        height: height,
      );
      uses.add(ResourceUse(ref, passAccessToResource(att.access)));
    }

    final descriptor = PassDescriptor(
      id: decl.id,
      stage: stage,
      uses: uses,
    );

    return DeclaredRenderPass(
      declaration: decl,
      descriptor: descriptor,
    );
  }
}

/// Feature wrapping host-declared passes for injection into the [FeatureGraph].
final class DeclaredPassesFeature implements RenderFeature {
  final DeclaredPassRegistry registry;
  final int baseWidth;
  final int baseHeight;

  DeclaredPassesFeature({
    required this.registry,
    required this.baseWidth,
    required this.baseHeight,
  });

  @override
  String get id => 'declared_passes';

  @override
  void declare(RenderGraphBuilder graph, RenderFeatureContext context) {
    for (final decl in registry.orderedPasses()) {
      final pass = DeclaredRenderPass.fromDeclaration(
        decl,
        baseWidth: baseWidth,
        baseHeight: baseHeight,
      );
      graph.addPass(
        pass.descriptor.toPassDeclaration(
          enabledPredicate: () => decl.enabled,
        ),
      );
    }
  }

  @override
  Iterable<RenderPass> createPasses(RenderPassResources resources) sync* {
    for (final decl in registry.orderedPasses()) {
      yield DeclaredRenderPass.fromDeclaration(
        decl,
        baseWidth: baseWidth,
        baseHeight: baseHeight,
      );
    }
  }

  @override
  void dispose() {}
}

/// Lifecycle manager for host-declared `R3` passes, topological ordering,
/// and cycle detection.
final class DeclaredPassRegistry {
  final Map<String, RenderPassDecl> _declarations = {};

  Iterable<RenderPassDecl> get all => _declarations.values;
  List<String> get declaredPassIds => _declarations.keys.toList();
  bool get isEmpty => _declarations.isEmpty;
  bool get isNotEmpty => _declarations.isNotEmpty;

  void declare(RenderPassDecl pass) {
    if (pass.id.isEmpty) {
      throw ArgumentError.value(pass.id, 'pass.id', 'cannot be empty');
    }
    _declarations[pass.id] = pass;
    _validateNoCycles();
  }

  bool remove(String passId) => _declarations.remove(passId) != null;

  void clear() => _declarations.clear();

  RenderPassDecl? get(String passId) => _declarations[passId];

  /// Returns declared passes sorted topologically respecting [GraphStage] anchors,
  /// explicit [RenderPassDecl.dependsOn] dependencies, and [RenderPassDecl.priority].
  List<RenderPassDecl> orderedPasses() {
    _validateNoCycles();
    final list = _declarations.values.where((p) => p.enabled).toList();

    // Group passes by anchor stage
    list.sort((a, b) {
      final stageA = anchorToStage(a.anchor).index;
      final stageB = anchorToStage(b.anchor).index;
      if (stageA != stageB) return stageA.compareTo(stageB);

      // Higher priority runs earlier
      final pA = a.priority;
      final pB = b.priority;
      if (pA != pB) return pB.compareTo(pA);

      return a.id.compareTo(b.id);
    });

    // Topological sort respecting explicit dependsOn within compatible stages
    final result = <RenderPassDecl>[];
    final visited = <String>{};
    final visiting = <String>{};

    void visit(RenderPassDecl pass) {
      if (visited.contains(pass.id)) return;
      if (visiting.contains(pass.id)) {
        throw StateError(
          'Dependency cycle detected in declared passes involving "${pass.id}"',
        );
      }
      visiting.add(pass.id);
      for (final depId in pass.dependsOn) {
        final dep = _declarations[depId];
        if (dep != null && dep.enabled) {
          visit(dep);
        }
      }
      visiting.remove(pass.id);
      visited.add(pass.id);
      result.add(pass);
    }

    for (final pass in list) {
      visit(pass);
    }

    return result;
  }

  void _validateNoCycles() {
    final visited = <String>{};
    final visiting = <String>{};

    void visit(RenderPassDecl pass) {
      if (visited.contains(pass.id)) return;
      if (visiting.contains(pass.id)) {
        throw StateError(
          'Dependency cycle detected in declared passes involving "${pass.id}"',
        );
      }
      visiting.add(pass.id);
      for (final depId in pass.dependsOn) {
        final dep = _declarations[depId];
        if (dep != null) {
          visit(dep);
        }
      }
      visiting.remove(pass.id);
      visited.add(pass.id);
    }

    for (final pass in _declarations.values) {
      visit(pass);
    }
  }
}
