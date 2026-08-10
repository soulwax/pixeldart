import 'dart:js_interop';
import 'dart:math' as math;
import 'dart:typed_data';

import 'package:web/web.dart' as web;

import 'package:pixeldart/rendering/assets/material_store.dart';
import 'package:pixeldart/rendering/assets/mesh_store.dart';
import 'package:pixeldart/rendering/assets/texture_store.dart';
import 'package:pixeldart/rendering/core/batching.dart';
import 'package:pixeldart/rendering/core/frame_render_encoder.dart';
import 'package:pixeldart/rendering/core/frame_telemetry.dart';
import 'package:pixeldart/rendering/core/program_library.dart';
import 'package:pixeldart/rendering/core/render_feature.dart';
import 'package:pixeldart/rendering/passes/bloom_resources.dart';
import 'package:pixeldart/rendering/passes/depth_debug_graph.dart';
import 'package:pixeldart/rendering/passes/depth_resources.dart';
import 'package:pixeldart/rendering/passes/dof_resources.dart';
import 'package:pixeldart/rendering/passes/grade_resources.dart';
import 'package:pixeldart/rendering/passes/ps1_resources.dart';
import 'package:pixeldart/rendering/passes/shadow_graph.dart';
import 'package:pixeldart/rendering/passes/vhs_resources.dart';
import 'package:pixeldart/rendering/passes/shadow_resources.dart';
import 'package:pixeldart/rendering/passes/ssao_resources.dart';
import 'package:pixeldart/rendering/passes/world.dart';
import 'package:pixeldart/rendering/rendering.dart';
import 'package:pixeldart/rendering/webgl/device_api.dart';
import 'package:pixeldart/rendering/webgl/draw_encoder.dart';
import 'package:pixeldart/rendering/webgl/webgl2_device.dart';
import 'package:pixeldart/rendering/passes/pass_context_impl.dart';
import 'package:pixeldart/rendering/passes/safe_graph_resources.dart';

late web.HTMLTextAreaElement _debugLog;
final List<String> _debugLines = [];
bool _lastLineWasRunningStatus = false;

/// Appends a timestamped line to the right-hand debug panel rather than
/// replacing its content, so the full session's boot/error/state history
/// stays visible and selectable in one `<textarea>` — copy-pasteable as
/// plain text for pasting back into a bug report, no screenshot needed.
/// Every call replaces the previous line if (and only if) it was itself a
/// running-status update, so the periodic per-frame status doesn't grow the
/// log unboundedly over a long session while every other line (boot steps,
/// errors) stays permanently in the history.
void _setStatus(String text, {bool isRunningStatus = false}) {
  final ms = web.window.performance.now().toStringAsFixed(0);
  if (_lastLineWasRunningStatus && _debugLines.isNotEmpty) {
    _debugLines.removeLast();
  }
  _debugLines.add('[$ms] $text');
  _lastLineWasRunningStatus = isRunningStatus;
  _debugLog.value = _debugLines.join('\n\n');
  _debugLog.scrollTop = _debugLog.scrollHeight;
}

void _logDebugToggle(bool active) {
  _setStatus(
    active
        ? 'depth debug view ON — showing DepthPrepassFeature\'s linearized scene depth (press D to return)'
        : 'depth debug view OFF — back to the shadowed world graph',
  );
}

void _logDofToggle(bool active) {
  _setStatus(
    active
        ? 'DOF ON — depthOfFieldStrength 1.0 (press F to disable)'
        : 'DOF OFF — depthOfFieldStrength 0.0, dofComposite still runs but coc is always 0',
  );
}

void _logGradeToggle(bool active) {
  _setStatus(
    active
        ? 'grade ON — colorGradeStrength 1.0 (press G to disable)'
        : 'grade OFF — colorGradeStrength 0.0, grade pass still runs but output equals input',
  );
}

void _logPs1Toggle(bool active) {
  _setStatus(
    active
        ? 'PS1 ON — quantizationBits 4, ditherStrength 0.5, vertexSnapGrid 0.01 (press P to disable)'
        : 'PS1 OFF — quantizationBits 8, ditherStrength 0.0, vertexSnapGrid 0.0 (bit-exact passthrough)',
  );
}

void _logAffineToggle(bool active) {
  _setStatus(
    active
        ? 'affine UV ON — affineWarpStrength 1.0, applied only to materials '
              'with affineSampling:true (ground + spinning cube); the '
              'cull-test quad and glowing cube stay perspective-correct '
              '(press A to disable)'
        : 'affine UV OFF — affineWarpStrength 0.0, every material samples '
              'perspective-correct; the fragment skips the divide entirely, '
              'so this is the exact pre-affine path',
  );
}

void _logMaskToggle(bool active) {
  _setStatus(
    active
        ? 'alpha mask ON — panel material alphaCutoff $_maskedCutoff, above '
              'the lattice openings\' own alpha '
              '($_latticeOpeningAlpha/255); the openings discard in all '
              'three geometry passes, so the panel, its shadow and the '
              'prepass depth SSAO reads all show the same holes (press M to '
              'disable)'
        : 'alpha mask OFF — same material, same texture, alphaCutoff '
              '$_unmaskedCutoff, below the openings\' own alpha, so nothing '
              'is discarded and the panel draws solid. Only the threshold '
              'changed',
  );
}

void _logVhsToggle(bool active) {
  _setStatus(
    active
        ? 'VHS ON — chroma 0.05, tracking 0.04, noise 0.03, headSwitch 0.06, '
              'dropout 0.05 (varied-width streaks, ~6Hz reroll), ghost 0.04 '
              '(press V to disable)'
        : 'VHS OFF — all six weights 0.0, vhs pass still runs but output equals input',
  );
}

void _logFogToggle(bool active) {
  _setStatus(
    active
        ? 'fog ON — fogStart 2.0, fogEnd 6.5, heightFalloff 0.1, density '
              '0.2 (press H to disable)'
        : 'fog OFF — fogStart/End pushed far past the scene (bit-exact passthrough)',
  );
}

void _logSsaoToggle(bool active) {
  _setStatus(
    active
        ? 'SSAO ON — ssaoStrength 1.2 (press S to disable)'
        : 'SSAO OFF — ssaoStrength 0.0, occlusion+blur skip their expensive '
              'draws entirely and clear straight to white (ao=1, no occlusion)',
  );
}

void _logBloomToggle(bool active) {
  _setStatus(
    active
        ? 'bloom ON — bloomStrength 1.0 (press B to disable)'
        : 'bloom OFF — bloomStrength 0.0, blur H/V and composite all skip '
              'their draws entirely — composite blends in place, so skipping '
              'it leaves sceneColor exactly as shadowedWorld wrote it',
  );
}

CameraView _buildCamera(double aspect) {
  const eye = Vec3(0, 2.0, 4.5);
  const forward = Vec3(0, -0.4, -1);
  const up = Vec3(0, 1, 0);
  final view = Mat4.lookAt(eye: eye, forward: forward, up: up);
  final projection = Mat4.perspective(
    fovYRadians: 60 * 3.1415926535 / 180,
    aspect: aspect,
    near: 0.1,
    far: 100,
  );
  return CameraView(
    view: view,
    projection: projection,
    viewProjection: projection * view,
    eye: eye,
    forward: forward,
    near: 0.1,
    far: 100,
    aspect: aspect,
  );
}

/// Builds a unit cube in the compatibility 14-float layout: white vertex
/// color (so the albedo texture shows unmodified) and a full 0..1 UV square
/// repeated per face, deliberately not deduplicated so each face keeps its
/// own per-face normal and UV origin — proves `MeshStore`'s indexed-upload
/// path (real vertex+index buffers, real VAO, real `drawElements`) and the
/// textured/mipmapped sampling path together, without a binary QMSH
/// fixture, since QMSH decode itself is already pure-tested in
/// `tools/renderer/test_qmesh.dart`.
MeshData _buildTestCube() {
  const s = 0.6;
  final faces = <(Vec3 normal, List<Vec3> corners)>[
    (
      const Vec3(0, 0, 1),
      [Vec3(-s, -s, s), Vec3(s, -s, s), Vec3(s, s, s), Vec3(-s, s, s)],
    ),
    (
      const Vec3(0, 0, -1),
      [Vec3(s, -s, -s), Vec3(-s, -s, -s), Vec3(-s, s, -s), Vec3(s, s, -s)],
    ),
    (
      const Vec3(1, 0, 0),
      [Vec3(s, -s, s), Vec3(s, -s, -s), Vec3(s, s, -s), Vec3(s, s, s)],
    ),
    (
      const Vec3(-1, 0, 0),
      [Vec3(-s, -s, -s), Vec3(-s, -s, s), Vec3(-s, s, s), Vec3(-s, s, -s)],
    ),
    (
      const Vec3(0, 1, 0),
      [Vec3(-s, s, s), Vec3(s, s, s), Vec3(s, s, -s), Vec3(-s, s, -s)],
    ),
    (
      const Vec3(0, -1, 0),
      [Vec3(-s, -s, -s), Vec3(s, -s, -s), Vec3(s, -s, s), Vec3(-s, -s, s)],
    ),
  ];
  const faceUvs = [(0.0, 0.0), (1.0, 0.0), (1.0, 1.0), (0.0, 1.0)];

  final floats = <double>[];
  for (final (normal, corners) in faces) {
    for (var i = 0; i < corners.length; i++) {
      final corner = corners[i];
      final (u, v) = faceUvs[i];
      floats.addAll([
        corner.x,
        corner.y,
        corner.z,
        normal.x,
        normal.y,
        normal.z,
        1.0,
        1.0,
        1.0,
        0.0,
        1.0,
        u,
        v,
        0,
      ]);
    }
  }

  final indices = <int>[];
  for (var face = 0; face < 6; face++) {
    final base = face * 4;
    indices.addAll([base, base + 1, base + 2, base, base + 2, base + 3]);
  }

  return MeshData(
    layout: VertexLayoutDescriptor.compatibility14,
    vertices: Float32List.fromList(floats),
    indices: Uint16List.fromList(indices),
    localBounds: const Aabb(Vec3(-s, -s, -s), Vec3(s, s, s)),
  );
}

/// A single-sided quad (one face, CCW winding as seen from `+Z` — the same
/// front-facing convention `_buildTestCube` uses) with no matching back
/// face at all. `CULL_FACE` was, like `DEPTH_TEST` before it, only ever
/// modeled as `DrawStateDescriptor` data and never actually issued via a
/// real `gl.enable`/`cullFace` call — this mesh is what a fixed test cube
/// can't prove, since every visible face on a closed cube is a front face
/// by construction. Spinning this quad past 90 degrees turns its back to
/// the camera each half-rotation: with culling active, the quad disappears
/// entirely there (no back face exists to shade); with culling inactive
/// (the pre-fix state), the same checkerboard paints on both sides,
/// visually indistinguishable from a real front face.
MeshData _buildCullTestQuad() {
  const s = 0.5;
  const normal = Vec3(0, 0, 1);
  final corners = [
    const Vec3(-s, -s, 0),
    const Vec3(s, -s, 0),
    const Vec3(s, s, 0),
    const Vec3(-s, s, 0),
  ];
  const faceUvs = [(0.0, 0.0), (1.0, 0.0), (1.0, 1.0), (0.0, 1.0)];

  final floats = <double>[];
  for (var i = 0; i < corners.length; i++) {
    final corner = corners[i];
    final (u, v) = faceUvs[i];
    floats.addAll([
      corner.x,
      corner.y,
      corner.z,
      normal.x,
      normal.y,
      normal.z,
      1.0,
      1.0,
      1.0,
      0.0,
      1.0,
      u,
      v,
      0,
    ]);
  }

  return MeshData(
    layout: VertexLayoutDescriptor.compatibility14,
    vertices: Float32List.fromList(floats),
    indices: Uint16List.fromList([0, 1, 2, 0, 2, 3]),
    localBounds: const Aabb(Vec3(-s, -s, 0), Vec3(s, s, 0)),
  );
}

/// RV-09 rung 6's transient billboard mesh — a single doubleSided quad
/// (unlike `_buildCullTestQuad`, which is deliberately single-sided to
/// prove culling) parameterized by width/height/vertex alpha. [alpha] is
/// baked into the mesh's own `aAlpha` attribute, not `MaterialDefinition`
/// (which has no alpha field) — the same per-vertex alpha channel every
/// mesh in this bootstrap already carries, just set to something other
/// than the usual `1.0` so `BlendMode.alpha` items are genuinely
/// translucent rather than optically indistinguishable from opaque at
/// `srcAlpha=1`. Width and height are independent (unlike `Transform`'s
/// own uniform-only scale, §5.7) specifically so a "shaft" instance can be
/// tall and narrow while a "mote" instance is small and roughly square,
/// without needing non-uniform instance scale this renderer deliberately
/// does not support.
MeshData _buildBillboardQuad({
  required double halfWidth,
  required double halfHeight,
  required double alpha,
}) {
  const normal = Vec3(0, 0, 1);
  final corners = [
    Vec3(-halfWidth, -halfHeight, 0),
    Vec3(halfWidth, -halfHeight, 0),
    Vec3(halfWidth, halfHeight, 0),
    Vec3(-halfWidth, halfHeight, 0),
  ];
  const faceUvs = [(0.0, 0.0), (1.0, 0.0), (1.0, 1.0), (0.0, 1.0)];

  final floats = <double>[];
  for (var i = 0; i < corners.length; i++) {
    final corner = corners[i];
    final (u, v) = faceUvs[i];
    floats.addAll([
      corner.x,
      corner.y,
      corner.z,
      normal.x,
      normal.y,
      normal.z,
      1.0,
      1.0,
      1.0,
      0.0,
      alpha,
      u,
      v,
      0,
    ]);
  }

  return MeshData(
    layout: VertexLayoutDescriptor.compatibility14,
    vertices: Float32List.fromList(floats),
    indices: Uint16List.fromList([0, 1, 2, 0, 2, 3]),
    localBounds: Aabb(
      Vec3(-halfWidth, -halfHeight, 0),
      Vec3(halfWidth, halfHeight, 0),
    ),
  );
}

/// Cells per side of the ground grid. High enough that no single triangle
/// spans a large share of the viewport's depth range (which is what makes
/// affine UV read as swim rather than as breakage), low enough that the
/// artifact stays clearly visible — subdividing far enough would hide the
/// very thing this bootstrap exists to show.
const _groundSubdivisions = 8;

/// A large flat plane beneath the scene — the shadow-receiving surface
/// §8.4's gate ("bannister shadow across a wall/floor") requires a real
/// receiver to demonstrate against. `castsShadow: false`,
/// `receivesShadow: true` on its `RetainedItemDescriptor` (set at the call
/// site) since a flat ground plane casting onto itself is degenerate.
///
/// Subdivided into a [_groundSubdivisions] grid rather than the two
/// triangles it was until affine UV landed. Affine error is a per-triangle
/// quantity — it is zero at the vertices and grows with how much depth
/// range one triangle spans — so two triangles covering the whole viewport
/// is the worst case that exists, and it read as "the floor's perspective
/// is simply wrong" rather than as anything a PS1 ever displayed. Real
/// hardware-affine content tessellated floors for exactly this reason.
/// Subdividing keeps each triangle's depth span small, which is what turns
/// the artifact into the characteristic swim/wobble under camera motion and
/// gives vertex snapping enough vertices to act on. The perspective-correct
/// path is unaffected either way; this changes only how honest the demo is.
MeshData _buildGroundPlane() {
  const s = 3.0;
  const uvSpan = 4.0;
  const normal = Vec3(0, 1, 0);
  const steps = _groundSubdivisions;

  final floats = <double>[];
  for (var row = 0; row <= steps; row++) {
    for (var col = 0; col <= steps; col++) {
      final alongX = col / steps;
      final alongZ = row / steps;
      floats.addAll([
        -s + 2 * s * alongX,
        0.0,
        s - 2 * s * alongZ,
        normal.x,
        normal.y,
        normal.z,
        1.0,
        1.0,
        1.0,
        0.0,
        1.0,
        uvSpan * alongX,
        uvSpan * alongZ,
        0,
      ]);
    }
  }

  // Same winding as the two-triangle original (+y normal, CCW seen from
  // above): within a cell, `origin` is its near-left corner and the two
  // triangles are (near-left, near-right, far-right) and (near-left,
  // far-right, far-left).
  final indices = <int>[];
  for (var row = 0; row < steps; row++) {
    for (var col = 0; col < steps; col++) {
      final origin = row * (steps + 1) + col;
      final nextRow = origin + steps + 1;
      indices.addAll([
        origin,
        origin + 1,
        nextRow + 1,
        origin,
        nextRow + 1,
        nextRow,
      ]);
    }
  }

  return MeshData(
    layout: VertexLayoutDescriptor.compatibility14,
    vertices: Float32List.fromList(floats),
    indices: Uint16List.fromList(indices),
    localBounds: const Aabb(Vec3(-s, 0, -s), Vec3(s, 0, s)),
  );
}

/// A high-contrast procedural checkerboard, deliberately not smooth —
/// mip-level transitions are only visible if adjacent texels disagree
/// strongly, which a photographic or gradient texture would hide.
Uint8List _buildCheckerboardTexture(int size) {
  final pixels = Uint8List(size * size * 4);
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      final checker = ((x ~/ 8) + (y ~/ 8)).isEven;
      final value = checker ? 255 : 0;
      final i = (y * size + x) * 4;
      pixels[i] = value;
      pixels[i + 1] = checker ? 40 : 220;
      pixels[i + 2] = value;
      pixels[i + 3] = 255;
    }
  }
  return pixels;
}

/// High-contrast payload for the standalone R-09 residency fixture. The
/// handle is declared without pixels first (so the material samples the
/// store's white fallback), then this payload arrives on that same handle.
/// The deliberately different magenta/teal pattern makes the transition
/// visible in a capture as well as in the DOM/resource evidence.
Uint8List _buildResidencyTexture(int size) {
  final pixels = Uint8List(size * size * 4);
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      final stripe = ((x ~/ 8) + (y ~/ 8)).isEven;
      final i = (y * size + x) * 4;
      pixels[i] = stripe ? 238 : 24;
      pixels[i + 1] = stripe ? 42 : 210;
      pixels[i + 2] = stripe ? 170 : 220;
      pixels[i + 3] = 255;
    }
  }
  return pixels;
}

/// The alpha-masked demo surface: a lattice of bars with square openings
/// punched through it, carrying three distinct alpha levels rather than a
/// binary in/out mask — 255 inside a bar, 128 along a one-texel ramp at
/// every opening's edge, and [_latticeOpeningAlpha] (1/255) inside the
/// openings themselves.
///
/// Three levels, not two, because they are what make `alphaCutoff` a real
/// threshold the demo can be wrong about. Against a hard 0/255 mask every
/// cutoff in (0,1) produces the identical silhouette, so the uniform could
/// carry any value at all and nothing on screen would notice. Here a
/// cutoff below the opening alpha keeps the whole quad, 0.5 cuts the
/// openings while keeping the ramp, and a cutoff above 0.502 would eat the
/// ramp too — three visibly different results from one texture.
///
/// The openings are *nearly* transparent rather than exactly transparent
/// for the same reason: it leaves room for a valid cutoff underneath them,
/// which is what lets the demo's own A/B toggle change nothing but the
/// threshold. Colour is uniform across the bars so that everything the eye
/// reads as shape here is the work of the discard.
Uint8List _buildLatticeTexture(int size) {
  const cell = 16;
  const bar = 5;
  bool isOpening(int x, int y) => (x % cell) >= bar && (y % cell) >= bar;
  // Wrapped neighbour lookups, because the texture samples with
  // GpuTextureWrap.repeat — an edge computed as if the texture ended at
  // its border would put a seam down every tile boundary.
  bool bordersOpening(int x, int y) =>
      isOpening((x + 1) % size, y) ||
      isOpening((x + size - 1) % size, y) ||
      isOpening(x, (y + 1) % size) ||
      isOpening(x, (y + size - 1) % size);

  final pixels = Uint8List(size * size * 4);
  for (var y = 0; y < size; y++) {
    for (var x = 0; x < size; x++) {
      final alpha = isOpening(x, y)
          ? _latticeOpeningAlpha
          : (bordersOpening(x, y) ? 128 : 255);
      final i = (y * size + x) * 4;
      pixels[i] = 210;
      pixels[i + 1] = 190;
      pixels[i + 2] = 150;
      pixels[i + 3] = alpha;
    }
  }
  return pixels;
}

/// The lattice openings' own alpha, in 0..255. The two demo cutoffs below
/// straddle it: `_maskedCutoff` is far above, `_unmaskedCutoff` just below
/// (1/255 is ~0.0039), so the same material and the same texture produce a
/// pierced quad or a solid one purely from the threshold.
const _latticeOpeningAlpha = 1;
const _maskedCutoff = 0.5;
const _unmaskedCutoff = 0.002;

/// RV-09 rung 2's demo grade LUT — an unwrapped-3D-LUT texture (`size`
/// horizontal slices of `size`x`size`, one per blue level, exactly the
/// layout `grade_lut.frag`'s `sampleLut` expects) encoding a classic
/// teal-shadows/orange-highlights split-tone plus a mild contrast boost.
/// Not tuned against any real target look — like RV-08's bloom intensity,
/// this exists to prove the LUT pipeline samples and blends correctly, not
/// as a final art decision. `GradeFeature` never special-cases an identity
/// LUT at the shader level (see grade.dart's doc comment); this is simply
/// the one LUT texture this bootstrap ever loads, and
/// `PostProcessState.colorGradeStrength == 0` already reproduces an
/// identity LUT's observable effect without a second texture asset.
Uint8List _buildTealOrangeLut(int size) {
  final pixels = Uint8List(size * size * size * 4);
  final maxIndex = size - 1;
  for (var b = 0; b < size; b++) {
    for (var g = 0; g < size; g++) {
      for (var r = 0; r < size; r++) {
        final rf = r / maxIndex;
        final gf = g / maxIndex;
        final bf = b / maxIndex;
        final luma = rf * 0.299 + gf * 0.587 + bf * 0.114;
        final tone = (luma - 0.5) * 0.24;
        final cr = ((rf - 0.5) * 1.15 + 0.5 + tone).clamp(0.0, 1.0);
        final cg = ((gf - 0.5) * 1.15 + 0.5).clamp(0.0, 1.0);
        final cb = ((bf - 0.5) * 1.15 + 0.5 - tone).clamp(0.0, 1.0);
        // Slice b occupies texel columns [b*size, b*size+size); row g.
        final x = b * size + r;
        final i = (g * (size * size) + x) * 4;
        pixels[i] = (cr * 255).round();
        pixels[i + 1] = (cg * 255).round();
        pixels[i + 2] = (cb * 255).round();
        pixels[i + 3] = 255;
      }
    }
  }
  return pixels;
}

/// The shadow-casting spot light, orbiting around the Y axis at a fixed
/// radius/height and always aimed back at the scene's center — so the
/// shadows it casts sweep visibly around the ground plane over time,
/// making it obvious by eye whether a shadow's position genuinely tracks
/// the light (correct) or lags/disagrees with it (the two-light bug this
/// scene exists to keep proven fixed). Position/direction drive
/// `ShadowLightView.fromSpotLight`'s light-space camera directly, so this
/// is the single source of truth both the caster pass and the shadowed
/// world pass's fragment-side comparison agree on.
SpotLight _orbitingShadowCasterLight(double t) {
  const radius = 2.2;
  const height = 2.4;
  final orbitAngle = t * 0.4;
  final position = Vec3(
    radius * math.cos(orbitAngle),
    height,
    radius * math.sin(orbitAngle),
  );
  final direction = Vec3(-position.x, -position.y, -position.z).normalized;
  return SpotLight(
    id: 1,
    position: position,
    direction: direction,
    color: LinearColor.white,
    intensity: 1,
    range: 8,
    innerConeRadians: 0.5,
    outerConeRadians: 0.75,
    castsShadow: true,
  );
}

// uLightPosition in shadowed_world.frag is derived per-fragment from the
// current frame's SpotLight.position (the same light the shadow caster pass
// used to build its light-space camera) — not a separate DirectionalLight,
// which would give the lit side and the shadowed side of the scene two
// different, disagreeing ideas of where the light actually is.
// RV-09 rung 5's fog demo values — deliberately "aggressive, room-scale"
// per §8.5, tuned against this bootstrap's actual scene depths (the test
// cluster sits ~4.5-5.5 view-space units out, the ground plane extends
// well past that): fogStart sits just past the near cluster so it stays
// legible, fogEnd close enough that the ground clearly fades rather than
// needing a much larger scene to ever show the effect. fogColor is a dark
// blue-gray rather than pure black specifically so fogged geometry reads
// as "fading into atmosphere," not "fading into the identical-looking
// void background" — the whole point of a demo needing to be provable by
// eye. fogHeightFalloff/fogDensity are both small, restrained modulations
// layered on top of the required distance term, matching §8.5's wording.
FrameEnvironment _litEnvironment(SpotLight light, {required bool fogActive}) =>
    FrameEnvironment(
      ambientColor: LinearColor.white,
      ambientIntensity: 0.25,
      spotLights: [light],
      fogColor: const LinearColor(0.04, 0.05, 0.09),
      fogStart: fogActive ? 2.0 : 1000.0,
      fogEnd: fogActive ? 6.5 : 1001.0,
      fogHeightFalloff: fogActive ? 0.1 : 0.0,
      fogDensity: fogActive ? 0.2 : 0.0,
    );

final class _StaticFrameScene implements FrameSceneData {
  final List<Object> items;
  final CameraView cameraOverride;
  final FrameEnvironment environmentOverride;
  final PostProcessState postOverride;
  final List<Object> blendedItems;
  const _StaticFrameScene(
    this.items,
    this.cameraOverride,
    this.environmentOverride, [
    this.postOverride = PostProcessState.off,
    this.blendedItems = const [],
  ]);
  @override
  Iterable<Object> get opaqueBatches => items;
  @override
  Iterable<Object> get blendedItemsBackToFront => blendedItems;
  @override
  Object get camera => cameraOverride;
  @override
  Object get environment => environmentOverride;
  @override
  Object get post => postOverride;
}

/// Passes that must run against the resolved (single-sample) sceneColor
/// target rather than the multisampled one — bloom's blur/composite
/// passes plus present, all of which read or write the target only
/// `device.resolveTarget` (not any declared graph stage) produces, so the
/// bootstrap itself is what enforces this split rather than the graph.
const _postResolvePassIds = {
  'bloomBlurH',
  'bloomBlurV',
  'bloomComposite',
  'dofBlurH',
  'dofBlurV',
  'dofComposite',
  'grade',
  'ps1Quantize',
  'vhs',
  'present',
};

const _instanceProbeFamilyKey = 901;

void main() {
  _debugLog =
      web.document.getElementById('debug-log') as web.HTMLTextAreaElement;
  try {
    _boot();
  } catch (error, stack) {
    _setStatus('boot error:\n$error\n$stack');
    web.console.error('boot error: $error\n$stack'.toJS);
  }
}

void _boot() {
  final canvas =
      web.document.getElementById('test-canvas') as web.HTMLCanvasElement;
  final r09InstanceFixture = web.window.location.search.contains(
    'r09-instances',
  );
  final r09ResidencyFixture = web.window.location.search.contains(
    'r09-residency',
  );
  final r09ShadowFixture = web.window.location.search.contains(
    'r09-shadow-proof',
  );
  final r09ShadowDisabled = web.window.location.search.contains(
    'r09-shadow-off',
  );
  // The canvas fills #viewport via CSS (width/height: 100%); its backing
  // pixel buffer must be sized to match explicitly, or WebGL2 defaults to
  // the element's default 300x150 attribute size regardless of how large
  // it renders on screen, producing an upscaled/blurry result instead of a
  // real fullscreen framebuffer.
  final width = canvas.clientWidth;
  final height = canvas.clientHeight;
  canvas.width = width;
  canvas.height = height;
  final aspect = width / height;

  final ctx = canvas.getContext('webgl2') as web.WebGL2RenderingContext?;
  if (ctx == null) {
    canvas.setAttribute('data-gpu-timing-status', 'unsupported');
    canvas.setAttribute('data-gpu-timing-polls', '0');
    if (r09ShadowFixture) {
      canvas
        ..setAttribute('data-r09-shadow-capability', 'unsupported')
        ..setAttribute('data-r09-shadow-status', 'unsupported')
        ..setAttribute('data-r09-shadow-pixel-proof', 'unsupported')
        ..setAttribute('data-r09-shadow-reason', 'webgl2-context-unavailable');
    }
    _setStatus('WebGL2 unavailable in this browser/context.');
    return;
  }

  _setStatus('context acquired, constructing WebGl2Device…');
  final device = WebGl2Device(ctx);

  _setStatus('device constructed, querying capabilities…');
  final caps = device.queryCapabilities();
  _startGpuTimingProbe(device, caps);
  _setStatus(
    'capabilities: ${caps.rendererString ?? "?"} / ${caps.vendorString ?? "?"}\n'
    'max texture: ${caps.maxTextureSize}, max samples: ${caps.maxSamples}\n'
    'building safe graph…',
  );

  final programLibrary = ProgramLibrary(device);

  // Real RV-06 Phase B path: renderer-neutral MeshData -> MeshStore.upload
  // -> real GPU vertex+index buffers and a real VAO, resolved back to a
  // ResolvedMesh per draw by MeshHandle. No manual buffer/VAO wiring here
  // anymore — that responsibility now lives in MeshStore.
  final meshStore = MeshStore(device);
  final cubeHandle = meshStore.upload(
    _buildTestCube(),
    debugLabel: 'test-cube',
  );
  final cullQuadHandle = meshStore.upload(
    _buildCullTestQuad(),
    debugLabel: 'cull-test-quad',
  );
  final groundHandle = meshStore.upload(
    _buildGroundPlane(),
    debugLabel: 'ground-plane',
  );
  // RV-09 rung 6: generic transient submission proof. moteHandle is small
  // and translucent (BlendMode.alpha); shaftHandle is tall/narrow and
  // fully opaque-alpha but additively blended (BlendMode.additive) — its
  // visible difference from opaque comes entirely from the blend
  // equation, not from vertex alpha, since additive light only ever adds.
  final moteHandle = meshStore.upload(
    _buildBillboardQuad(halfWidth: 0.05, halfHeight: 0.05, alpha: 0.35),
    debugLabel: 'transient-mote',
  );
  final shaftHandle = meshStore.upload(
    _buildBillboardQuad(halfWidth: 0.18, halfHeight: 1.6, alpha: 1.0),
    debugLabel: 'transient-shaft',
  );
  // The alpha-masked panel: one upright quad whose UV square maps the whole
  // lattice texture, so its openings are large enough to read individually
  // both on the panel and in the shadow it casts.
  final maskedPanelHandle = meshStore.upload(
    _buildBillboardQuad(halfWidth: 0.9, halfHeight: 0.9, alpha: 1.0),
    debugLabel: 'masked-panel',
  );

  // RV-08 rung 1: a real material table, resolved per draw item rather than
  // a placeholder MaterialHandle. cullQuadMaterial's warm tint is what
  // proves uMaterialTint is genuinely wired into the shader rather than a
  // uniform nobody reads — deliberately left doubleSided:false (the
  // default) since the cull-test quad's whole purpose is proving CULL_FACE
  // makes it vanish when edge-on (RV-07); a doubleSided override here would
  // silently undo that earlier proof by making both "sides" render.
  final materialStore = MaterialStore();

  // RP-2's TextureStore, replacing the ad-hoc `resolveAlbedo` closure this
  // bootstrap hand-rolled before a real store existed. Declared before any
  // material below, since every one of them now names its albedo
  // explicitly rather than relying on a bootstrap-only "null means
  // checkerboard" convention — the store's own fallback for `null` is
  // white (§5.3's real missing-art contract), so making the checkerboard
  // opt-in per material is what surfaces that correctly rather than
  // papering over it the way the old closure did.
  final textureStore = TextureStore(device);
  // Texture + mip path: allocate mip storage, upload the base level, then
  // finalizeMips — the exact sequence whose missing last step
  // (generateMipmap) was found and fixed in the RV-07 packet.
  const textureSize = 64;
  final albedoHandle = textureStore.declare(
    width: textureSize,
    height: textureSize,
    hasMips: true,
    wrap: GpuTextureWrap.repeat,
    pixels: _buildCheckerboardTexture(textureSize),
    debugLabel: 'checkerboard',
  );
  textureStore.finalizeMips(albedoHandle);
  // The masked panel's own albedo. Deliberately unmipped, unlike the
  // checkerboard above: minification averages a cutout's alpha with its
  // openings', so an alpha-tested surface's silhouette dissolves at higher
  // mip levels. This panel is close and screen-large enough to sample
  // level 0 throughout, and a real cutout asset wants either no mips or
  // alpha-to-coverage, neither of which this rung is about.
  final latticeHandle = textureStore.declare(
    width: textureSize,
    height: textureSize,
    wrap: GpuTextureWrap.repeat,
    pixels: _buildLatticeTexture(textureSize),
    debugLabel: 'lattice',
  );
  // RV-09 rung 2's grade LUT: an unwrapped-3D-LUT texture, no mips
  // (blending across mip levels would corrupt lookups — this is a lookup
  // table, not a displayed image) and clamp-to-edge (the shader's own
  // texel-center math already keeps every sample inside its own slice, but
  // clamping is still the correct wrap policy for a lookup texture
  // regardless).
  const gradeLutSize = 16;
  final gradeLutHandle = textureStore.declare(
    width: gradeLutSize * gradeLutSize,
    height: gradeLutSize,
    pixels: _buildTealOrangeLut(gradeLutSize),
    debugLabel: 'grade-lut',
  );
  // R-09 package-boundary fixture: reserve a real logical texture handle
  // without pixels. The first frame therefore draws through the store's
  // fallback; a later frame uploads the payload into this same handle and
  // draws it without rebuilding the material or scene item.
  final residencyHandle = textureStore.declare(
    width: textureSize,
    height: textureSize,
    wrap: GpuTextureWrap.repeat,
    debugLabel: 'r09-residency-payload',
  );
  final residencyManager = TextureResidencyManager(textureStore);
  final residencyRequest = TextureResidencyRequest(
    key: 'r09-residency-payload',
    handle: residencyHandle,
    priority: 10,
  );
  TextureResidencyReport? residencyReport;
  var residencyUploaded = false;

  // affineSampling opts these two into the PS1 affine-UV path; every other
  // material below deliberately stays at the default (false) so a
  // PS1-profiled frame renders warped and perspective-correct surfaces side
  // by side. cullTestQuad is the direct control — the same two-triangle quad
  // shape as the ground, at a comparable angle, whose texture must stay
  // straight while the ground's swims.
  final cubeMaterial = materialStore.register(
    MaterialDefinition(
      key: 'test-cube',
      albedoTexture: albedoHandle,
      affineSampling: true,
    ),
    debugLabel: 'test-cube-material',
  );
  final cullQuadMaterial = materialStore.register(
    MaterialDefinition(
      key: 'cull-test-quad',
      albedoTexture: albedoHandle,
      tintR: 1.0,
      tintG: 0.55,
      tintB: 0.35,
    ),
    debugLabel: 'cull-quad-material',
  );
  final groundMaterial = materialStore.register(
    MaterialDefinition(
      key: 'ground-plane',
      albedoTexture: albedoHandle,
      affineSampling: true,
    ),
    debugLabel: 'ground-material',
  );
  // RV-08 rung 6: the one material in this bootstrap with real
  // emissiveStrength — everything else stays at the MaterialDefinition
  // default (0), so bloom has exactly one real source to prove itself
  // against, and every other lit-but-non-emissive surface (the floor under
  // strong direct light, the spinning cube) staying bloom-free is itself
  // part of the proof (§8.7: "non-emissive white surface does not [bloom]").
  final glowingCubeMaterial = materialStore.register(
    MaterialDefinition(
      key: 'glowing-cube',
      albedoTexture: albedoHandle,
      tintR: 1.0,
      tintG: 0.85,
      tintB: 0.55,
      emissiveStrength: 2.5,
    ),
    debugLabel: 'glowing-cube-material',
  );
  final residencyMaterial = materialStore.register(
    MaterialDefinition(
      key: 'r09-residency-payload',
      albedoTexture: residencyHandle,
      tintR: 1.0,
      tintG: 1.0,
      tintB: 1.0,
      emissiveStrength: 0.15,
    ),
    debugLabel: 'r09-residency-material',
  );
  final moteMaterial = materialStore.register(
    MaterialDefinition(
      key: 'transient-mote',
      albedoTexture: albedoHandle,
      tintR: 0.9,
      tintG: 0.85,
      tintB: 0.7,
      doubleSided: true,
    ),
    debugLabel: 'transient-mote-material',
  );
  final shaftMaterial = materialStore.register(
    MaterialDefinition(
      key: 'transient-shaft',
      albedoTexture: albedoHandle,
      tintR: 1.0,
      tintG: 0.9,
      tintB: 0.6,
      emissiveStrength: 0.4,
      doubleSided: true,
    ),
    debugLabel: 'transient-shaft-material',
  );
  // §6.2's alpha-masked route. Both materials name latticeHandle and both
  // are AlphaMode.masked — they differ only in alphaCutoff, so the M key's
  // A/B changes one float and nothing else. Keeping the "off" state masked
  // rather than switching it to AlphaMode.opaque is deliberate: an opaque
  // material sampling an alpha-carrying texture would write that alpha
  // into sceneColor and, via present.frag, straight out to a canvas that
  // has an alpha channel — the control would show holes of its own, from
  // an entirely different mechanism, and prove nothing.
  final maskedPanelMaterial = materialStore.register(
    MaterialDefinition(
      key: 'masked-lattice',
      albedoTexture: latticeHandle,
      alphaMode: AlphaMode.masked,
      alphaCutoff: _maskedCutoff,
      tintR: 1.0,
      tintG: 0.95,
      tintB: 0.85,
      doubleSided: true,
    ),
    debugLabel: 'masked-panel-material',
  );
  final unmaskedPanelMaterial = materialStore.register(
    MaterialDefinition(
      key: 'unmasked-lattice',
      albedoTexture: latticeHandle,
      alphaMode: AlphaMode.masked,
      alphaCutoff: _unmaskedCutoff,
      tintR: 1.0,
      tintG: 0.95,
      tintB: 0.85,
      doubleSided: true,
    ),
    debugLabel: 'unmasked-panel-material',
  );

  // §8.4's shadow map target: depth-only, no color attachment at all, so a
  // world pass can later sample its depth texture directly.
  final shadowMapTarget = device.createTarget(
    GpuTargetDescriptor(
      width: ShadowResources.shadowMap.width,
      height: ShadowResources.shadowMap.height,
      attachments: GpuTargetAttachment.depthOnly,
      hasDepth: true,
    ),
  );

  // §8.4 rung 4's single-sample scene-depth prepass target, separate from
  // both the shadow map (light-space) and sceneColor's own depth attachment
  // (which only exists inside the multisampled/resolved color targets).
  // Created before buildShadowGraph below (which now renders into it every
  // frame, feeding SSAO) and reused by depthDebugGraph further down — one
  // real depth buffer, sampled by two independent consumers.
  final sceneDepthTarget = device.createTarget(
    GpuTargetDescriptor(
      width: DepthPrepassResources.sceneDepth.width,
      height: DepthPrepassResources.sceneDepth.height,
      attachments: GpuTargetAttachment.depthOnly,
      hasDepth: true,
    ),
  );

  // §8.5's SSAO pipeline targets, both at half sceneColor resolution.
  // ssaoRaw is the kernel pass's noisy direct output; ssaoBlurred is what
  // shadowedWorld actually samples — never the raw one, per §8.5's
  // depth-aware-blur requirement.
  final ssaoRawTarget = device.createTarget(
    GpuTargetDescriptor(
      width: SsaoResources.ssaoRaw.width,
      height: SsaoResources.ssaoRaw.height,
    ),
  );
  final ssaoBlurredTarget = device.createTarget(
    GpuTargetDescriptor(
      width: SsaoResources.ssaoBlurred.width,
      height: SsaoResources.ssaoBlurred.height,
    ),
  );

  // The camera never moves in this bootstrap, so it's built once here
  // (rather than per-frame in tick()) and captured by every closure below
  // that needs it — must be declared before buildShadowGraph's
  // resolveCamera closure references it, since Dart does not allow a
  // closure to reference a local variable declared later in the same
  // function scope even though the closure itself only runs much later.
  final camera = _buildCamera(aspect);

  // Read by resolveCasterLight below and written at the top of every
  // tick() — the graph is assembled once, but the light orbits every
  // frame, so the callback needs a live cell to read rather than a value
  // captured at graph-build time.
  SpotLight? currentLight;

  // RV-08 rung 2: sceneColor is rendered multisampled, then explicitly
  // resolved (device.resolveTarget) into a single-sample target before
  // PresentFeature samples it — bindTexture already refuses to sample a
  // multisampled attachment directly, so without this resolve step the
  // present pass would throw every frame. maxSamples is capability-queried
  // rather than hardcoded, capped at 4 since higher counts buy little on
  // a 384x216-scale target and cost more resolve bandwidth for it.
  final msaaSamples = caps.maxSamples >= 4 ? 4 : (caps.maxSamples >= 2 ? 2 : 1);
  // RV-08 rung 6: both sceneColor targets carry a second (glow) color
  // attachment now — shadowedWorld's shader writes both every draw, and
  // §8.7's "MSAA on/off preserves the source" requires the glow attachment
  // to survive the resolve exactly like color does, so the resolved target
  // needs the same colorAndGlow shape as the multisampled one. Created here
  // (before buildShadowGraph) rather than near sceneColorTarget's other
  // uses below, since buildShadowGraph's resolveResolvedSceneColor/
  // resolveBloomBlurH/V closures need these declared first.
  final sceneColorMsaaTarget = device.createTarget(
    GpuTargetDescriptor(
      width: width,
      height: height,
      hasDepth: true,
      samples: msaaSamples,
      attachments: GpuTargetAttachment.colorAndGlow,
    ),
  );
  final sceneColorTarget = device.createTarget(
    GpuTargetDescriptor(
      width: width,
      height: height,
      hasDepth: true,
      attachments: GpuTargetAttachment.colorAndGlow,
    ),
  );
  final bloomBlurHTarget = device.createTarget(
    GpuTargetDescriptor(
      width: BloomResources.bloomBlurH.width,
      height: BloomResources.bloomBlurH.height,
    ),
  );
  final bloomBlurVTarget = device.createTarget(
    GpuTargetDescriptor(
      width: BloomResources.bloomBlurV.width,
      height: BloomResources.bloomBlurV.height,
    ),
  );
  // RV-09's DOF targets: dofBlurH/V mirror bloom's own half-res blur chain
  // (same shader, plain color rather than a glow attachment); dofOutput is
  // a genuinely separate full-res target the composite pass writes to,
  // since it reads sceneColorTarget as one of its two input textures in the
  // same draw call and cannot also write back onto it in place.
  final dofBlurHTarget = device.createTarget(
    GpuTargetDescriptor(
      width: DofResources.dofBlurH.width,
      height: DofResources.dofBlurH.height,
    ),
  );
  final dofBlurVTarget = device.createTarget(
    GpuTargetDescriptor(
      width: DofResources.dofBlurV.width,
      height: DofResources.dofBlurV.height,
    ),
  );
  final dofOutputTarget = device.createTarget(
    GpuTargetDescriptor(
      width: DofResources.dofOutput.width,
      height: DofResources.dofOutput.height,
    ),
  );
  // RV-09 rung 2's grade output — full-res, distinct from dofOutput for the
  // same reason dofOutput is distinct from sceneColor: this pass reads
  // dofOutput as an input texture while writing a different one.
  final gradeOutputTarget = device.createTarget(
    GpuTargetDescriptor(
      width: GradeResources.gradeOutput.width,
      height: GradeResources.gradeOutput.height,
    ),
  );
  // RV-09 rung 3's PS1 quantize+dither output — distinct from gradeOutput
  // for the same reason every prior post-DOF target is distinct from its
  // own input.
  final ps1OutputTarget = device.createTarget(
    GpuTargetDescriptor(
      width: Ps1Resources.ps1Output.width,
      height: Ps1Resources.ps1Output.height,
    ),
  );
  // RV-09 rung 4's VHS ghost ping-pong — two physical targets backing the
  // one logical `vhsOutput` name, since VhsFeature both writes this frame's
  // output and reads last frame's own output back as history (ghosting's
  // feedback trail). Which target is "this frame's write" vs. "last
  // frame's history" swaps every frame in tick() below. Both cleared to
  // black before the render loop starts so frame 1's history read samples
  // an explicit, defined value rather than driver-undefined contents —
  // §8.10's "use an explicit valid history target."
  final vhsGhostA = device.createTarget(
    GpuTargetDescriptor(
      width: VhsResources.vhsOutput.width,
      height: VhsResources.vhsOutput.height,
    ),
  );
  final vhsGhostB = device.createTarget(
    GpuTargetDescriptor(
      width: VhsResources.vhsOutput.width,
      height: VhsResources.vhsOutput.height,
    ),
  );
  final setupEncoder = DeviceDrawCommandEncoder(device);
  for (final ghostTarget in [vhsGhostA, vhsGhostB]) {
    setupEncoder.bindTarget(ghostTarget);
    setupEncoder.clear(ClearMask.colorOnly, r: 0, g: 0, b: 0, a: 1);
  }
  var vhsWriteTarget = vhsGhostA;
  var vhsHistoryTarget = vhsGhostB;
  var currentAnimTime = 0.0;

  // RV-09 rung 6: one shared encoder, cleared and resubmitted every frame —
  // "frame-local," per §5.5's own description of what RenderEncoder is for.
  final transientEncoder = FrameRenderEncoder();

  final featureGraph = buildShadowGraph(
    programLibrary,
    device: device,
    resolveMesh: (mesh) {
      final uploaded = meshStore.resolve(mesh);
      return ResolvedMesh(
        vao: uploaded.vao,
        isIndexed: uploaded.isIndexed,
        drawCount: uploaded.indexCount,
      );
    },
    resolveMaterial: materialStore.resolve,
    resolveAlbedo: textureStore.resolveAlbedo,
    resolveShadowMap: () => shadowMapTarget,
    resolveCasterLight: () => currentLight,
    resolveSceneDepth: () => sceneDepthTarget,
    resolveCamera: () => camera,
    resolveSsaoRaw: () => ssaoRawTarget,
    resolveSsaoBlurred: () => ssaoBlurredTarget,
    sceneColorWidth: width,
    sceneColorHeight: height,
    resolveResolvedSceneColor: () => sceneColorTarget,
    resolveBloomBlurH: () => bloomBlurHTarget,
    resolveBloomBlurV: () => bloomBlurVTarget,
    resolveDofBlurH: () => dofBlurHTarget,
    resolveDofBlurV: () => dofBlurVTarget,
    resolveGradeLut: () => textureStore.resolve(gradeLutHandle),
    resolveVhsHistory: () => vhsHistoryTarget,
    resolveTime: () => currentAnimTime,
  );

  _setStatus('graph assembled, validating…');
  final result = featureGraph.build(
    featureContext: RenderFeatureContext(
      capabilities: caps,
      profile: QualityProfile.safe,
    ),
    availableCapabilities: const {},
    // RV-09 rung 4's vhs pass declares a historyRead against vhsOutput —
    // valid from frame 1 onward because vhsGhostA/B are both cleared to
    // black before this build() call, not because a previous frame
    // genuinely ran yet. §8.10's "use an explicit valid history target"
    // is what makes true here honest rather than a lie of convenience.
    hasValidPreviousFrame: true,
    resources: _AlwaysAvailable(),
  );
  _setStatus(
    'SSAO: ${SsaoResources.ssaoRaw.width}x${SsaoResources.ssaoRaw.height} '
    '(half of ${width}x$height), kernel size 8, radius 0.4, strength driven '
    'by PostProcessState.ssaoStrength (1.2), 5x5 depth-aware bilateral blur '
    '— modulates ambient only, toggled by the S key (zero-cost-off: both '
    'passes skip their draw and clear to white when off)',
  );
  _setStatus(
    'Bloom: ${BloomResources.bloomBlurH.width}x${BloomResources.bloomBlurH.height} '
    'separable 5-tap gaussian (H then V), strength driven by '
    'PostProcessState.bloomStrength (1.0), additive composite — only '
    'glowingCubeMaterial (emissiveStrength 2.5) has a real source, toggled '
    'by the B key (zero-cost-off: all three passes skip their draw when off)',
  );
  _setStatus(
    'DOF: focusDistance 5.0, focusRange 2.8, same 5-tap gaussian blur as '
    'bloom (H then V, half-res) — CoC mix(sharp, blurred) driven by '
    'PostProcessState.depthOfFieldStrength, toggled by the F key',
  );
  _setStatus(
    'Grade: $gradeLutSize'
    'x$gradeLutSize'
    'x$gradeLutSize unwrapped-3D LUT, teal-shadows/orange-highlights '
    'split-tone + mild contrast — driven by '
    'PostProcessState.colorGradeStrength, toggled by the G key',
  );
  _setStatus(
    'PS1: vertex snapping in shadowed_world.vert (clip-space grid snap '
    'before the perspective divide) + Bayer-4x4 ordered dither/quantize '
    'composite after grade — driven by PostProcessState.vertexSnapGrid/'
    'ditherStrength/quantizationBits, toggled by the P key. Vertex lighting '
    'is NOT implemented (see board)',
  );
  _setStatus(
    'Affine UV: w-premultiplied vUv/vUvW varyings in shadowed_world.vert, '
    'divided back in the fragment to cancel the rasterizer\'s own '
    'perspective correction — driven by PostProcessState.affineWarpStrength '
    'and gated per-material by MaterialDefinition.affineSampling (ground + '
    'spinning cube only; the cull-test quad is the perspective-correct '
    'control), toggled independently by the A key. The ground is a '
    '${_groundSubdivisions}x$_groundSubdivisions grid, not two triangles — '
    'affine error is per-triangle, so tessellation is what turns it into '
    'PS1 swim instead of a structurally wrong floor',
  );
  _setStatus(
    'Alpha mask: §6.2\'s "alpha-masked geometry participates in shadow, '
    'prepass, and opaque depth-writing routes" — discard now lives in '
    'shadowed_world.frag, depth_prepass.frag and shadow_caster.frag, all '
    'three driven by MaterialDefinition.alphaMode/alphaCutoff resolved per '
    'draw. The upright lattice panel is the demo; the prepass cuts the same '
    'holes (so SSAO and DOF never occlude through them) and the caster cuts '
    'them from light space, so the shadow is a lattice too. Toggled by the '
    'M key, which changes alphaCutoff and nothing else. Albedo is now '
    'resolved per material rather than bound once per pass — '
    'MaterialDefinition.albedoTexture\'s first real consumer',
  );
  _setStatus(
    'VHS: tracking jitter -> YIQ chroma bleed -> noise -> head-switch band '
    '-> dropout -> ghost feedback (real 2-target ping-pong history) — all '
    'six weights independently driven by PostProcessState.vhs*Weight, '
    'toggled by the V key. reducedMotion halves tracking + zeroes ghost '
    '(logic implemented, not separately demoed by a key this rung)',
  );
  _setStatus(
    'Fog: distance ramp (2.0-6.5) + restrained height falloff (0.1) + '
    'density (0.2), consistent view-space depth computed per-vertex in '
    'shadowed_world.vert — driven by FrameEnvironment.fog*, toggled by '
    'the H key. oGlow is never fogged (§8.7 scoping). No dedicated '
    'fog-factor debug view this rung (see board)',
  );
  _setStatus(
    'Transient submission: FrameRenderEncoder (a real RenderEncoder), 6 '
    'drifting BlendMode.alpha motes + 1 BlendMode.additive shaft resubmitted '
    'every frame, sorted back-to-front, drawn through shadowedWorld\'s '
    'existing blended path with real per-item blend-state switching '
    '(alpha/additive/opaque no longer share one pass-wide draw state). '
    '"breath"/"rain" share this same path, not independently demoed',
  );

  final depthDebugGraph = buildDepthDebugGraph(
    programLibrary,
    device: device,
    resolveMesh: (mesh) {
      final uploaded = meshStore.resolve(mesh);
      return ResolvedMesh(
        vao: uploaded.vao,
        isIndexed: uploaded.isIndexed,
        drawCount: uploaded.indexCount,
      );
    },
    // The debug prepass must cut the same holes the main graph's prepass
    // does, or the depth view would show a solid panel where the shaded
    // frame shows a lattice — the visualization would disagree with the
    // thing it exists to visualize.
    resolveMaterial: materialStore.resolve,
    resolveAlbedo: textureStore.resolveAlbedo,
    resolveSceneDepth: () => sceneDepthTarget,
    near: 0.1,
    far: 100,
    // The camera's real projection far (100) would crush this scene's
    // actual depth span (camera at ~4.9 units from origin, geometry within
    // a few units of it) into a sliver near 0.0 if used to normalize
    // display shade — this is a separate, scene-scale distance chosen so
    // nearby geometry shows a real visible gradient instead of a flat
    // silhouette against a solid white background.
    displayRange: 9,
  );
  final depthDebugResult = depthDebugGraph.build(
    featureContext: RenderFeatureContext(
      capabilities: caps,
      profile: QualityProfile.safe,
    ),
    availableCapabilities: const {},
    hasValidPreviousFrame: false,
    resources: _AlwaysAvailable(),
  );
  if (!depthDebugResult.isValid) {
    _setStatus(
      'depth debug graph INVALID:\n${depthDebugResult.graph.failures.join("\n")}',
    );
    return;
  }

  var depthDebugActive = false;
  var dofActive = true;
  var gradeActive = true;
  var ps1Active = true;
  var vhsActive = true;
  var fogActive = true;
  var ssaoActive = true;
  var bloomActive = true;
  // Affine UV gets its own key rather than riding on P: the other three PS1
  // knobs (snap/dither/quantize) all repaint the whole frame, so a P-only
  // A/B cannot show what the UV warp alone did. This is the isolating
  // control the capability actually needs to be judged on.
  var affineActive = true;
  // Alpha masking has no per-frame weight in PostProcessState — a hole in a
  // surface is a property of the surface, not of the frame's post chain — so
  // this toggle swaps which of two materials the panel draws with. Both are
  // AlphaMode.masked against the same texture and differ only in
  // alphaCutoff, which keeps the A/B down to one float.
  var maskActive = true;
  web.document.addEventListener(
    'keydown',
    ((web.KeyboardEvent event) {
      if (event.key.toLowerCase() == 'd') {
        depthDebugActive = !depthDebugActive;
        _logDebugToggle(depthDebugActive);
      } else if (event.key.toLowerCase() == 'f') {
        dofActive = !dofActive;
        _logDofToggle(dofActive);
      } else if (event.key.toLowerCase() == 'g') {
        gradeActive = !gradeActive;
        _logGradeToggle(gradeActive);
      } else if (event.key.toLowerCase() == 'p') {
        ps1Active = !ps1Active;
        _logPs1Toggle(ps1Active);
      } else if (event.key.toLowerCase() == 'v') {
        vhsActive = !vhsActive;
        _logVhsToggle(vhsActive);
      } else if (event.key.toLowerCase() == 'h') {
        fogActive = !fogActive;
        _logFogToggle(fogActive);
      } else if (event.key.toLowerCase() == 's') {
        ssaoActive = !ssaoActive;
        _logSsaoToggle(ssaoActive);
      } else if (event.key.toLowerCase() == 'b') {
        bloomActive = !bloomActive;
        _logBloomToggle(bloomActive);
      } else if (event.key.toLowerCase() == 'a') {
        affineActive = !affineActive;
        _logAffineToggle(affineActive);
      } else if (event.key.toLowerCase() == 'm') {
        maskActive = !maskActive;
        _logMaskToggle(maskActive);
      }
    }).toJS,
  );

  if (!result.isValid) {
    _setStatus('graph INVALID:\n${result.graph.failures.join("\n")}');
    return;
  }

  var frame = 0;
  void tick(num highResTime) {
    frame += 1;
    // Freeze the dedicated residency fixture so its pending/resident
    // screenshots differ only because the uploaded payload arrived, not
    // because the demo's animated light/cubes moved between captures.
    final t = r09ResidencyFixture || r09ShadowFixture
        ? 0.0
        : highResTime / 1000;
    currentAnimTime = t;
    if (r09ResidencyFixture) {
      // Leave a visible pending window for browser capture, then fulfill the
      // request in place. The manager is probed again after upload to prove
      // the status transition without allocating a second logical handle.
      if (frame == 1) {
        residencyReport = residencyManager.prewarm([residencyRequest]);
      } else if (frame == 45 && !residencyUploaded) {
        textureStore.updatePixels(
          residencyHandle,
          _buildResidencyTexture(textureSize),
        );
        residencyUploaded = true;
        residencyReport = residencyManager.prewarm([residencyRequest]);
      }
      final report = residencyReport;
      if (report != null) {
        final result = report.results.single;
        canvas
          ..setAttribute(
            'data-r09-texture-residency-status',
            result.status.name,
          )
          ..setAttribute(
            'data-r09-texture-residency-handle',
            '${residencyHandle.slot}.${residencyHandle.generation}',
          )
          ..setAttribute('data-r09-texture-residency-frame', '$frame')
          ..setAttribute(
            'data-r09-texture-residency-draw',
            result.isUsable ? 'resident-material' : 'fallback-material',
          )
          ..setAttribute(
            'data-r09-texture-residency-resources',
            'live=${textureStore.liveCount};created=${textureStore.createCount};'
                'deleted=${textureStore.deleteCount};bytes=${textureStore.liveGpuBytes}',
          );
      }
    }
    // Swaps which physical ghost target is "this frame's VHS write" vs.
    // "last frame's VHS history read" every frame — the ping-pong itself.
    if (frame.isEven) {
      vhsWriteTarget = vhsGhostA;
      vhsHistoryTarget = vhsGhostB;
    } else {
      vhsWriteTarget = vhsGhostB;
      vhsHistoryTarget = vhsGhostA;
    }
    final light = _orbitingShadowCasterLight(t);
    currentLight = light;
    final environment = _litEnvironment(light, fogActive: fogActive);

    // Hovers above the ground plane so its shadow falls clearly onto a
    // real receiving surface — the §8.4 gate this whole graph exists to
    // prove ("bannister shadow across a wall/floor").
    final shadowCastsEnabled = !r09ShadowFixture || !r09ShadowDisabled;
    final spinningCube = _TestCubeItem(
      cubeHandle,
      cubeMaterial,
      Transform(
        translation: const Vec3(0, 0.9, 0),
        rotation: Quat.axisAngle(const Vec3(0.4, 1, 0.2), t),
      ),
      castsShadow: shadowCastsEnabled,
      instanceSlot: 1,
      instanceFamilyKey: _instanceProbeFamilyKey,
    );
    // Shares the cube mesh/material/family with [spinningCube], but keeps a
    // distinct translation. The resulting InstanceBatch is the browser
    // proof that one instanced draw carries three different model matrices.
    final instanceProbeCube = _TestCubeItem(
      cubeHandle,
      cubeMaterial,
      Transform(
        translation: const Vec3(0.85, 0.9, 0),
        rotation: Quat.axisAngle(const Vec3(0.4, 1, 0.2), -0.35),
      ),
      castsShadow: shadowCastsEnabled,
      instanceSlot: 2,
      instanceFamilyKey: _instanceProbeFamilyKey,
    );
    final instanceProbeCubeTwo = _TestCubeItem(
      cubeHandle,
      cubeMaterial,
      Transform(
        translation: const Vec3(-0.85, 0.9, 0),
        rotation: Quat.axisAngle(const Vec3(0.4, 1, 0.2), 0.35),
      ),
      castsShadow: shadowCastsEnabled,
      instanceSlot: 3,
      instanceFamilyKey: _instanceProbeFamilyKey,
    );
    // Spins purely around Y so its single face sweeps edge-on to the camera
    // twice per revolution — the moment CULL_FACE must make it vanish
    // entirely, since this mesh has no back face to shade in its place.
    final cullTestQuad = _TestCubeItem(
      cullQuadHandle,
      cullQuadMaterial,
      Transform(
        translation: const Vec3(-1.8, 0.9, 0),
        rotation: Quat.axisAngle(const Vec3(0, 1, 0), t * 1.5),
      ),
      castsShadow: shadowCastsEnabled,
    );
    // Bobs vertically in place at a fixed XZ position, rotating on none of
    // the axes the other two test items do — a motion this visually
    // distinct from "spinning" or "edge-on sweep" makes it obvious whether
    // a shadow's own motion is coming from the *light* orbiting overhead
    // (every shadow should sweep together, in lockstep, regardless of what
    // its caster is individually doing) or from the caster's own transform.
    final bobbingCube = _TestCubeItem(
      cubeHandle,
      r09ResidencyFixture ? residencyMaterial : glowingCubeMaterial,
      Transform(translation: Vec3(1.8, 1.0 + math.sin(t * 1.3) * 0.5, -0.4)),
      castsShadow: shadowCastsEnabled,
    );
    final ground = _TestCubeItem(
      groundHandle,
      groundMaterial,
      Transform.identity,
      castsShadow: false,
    );
    // Tilted back rather than stood upright, which matters for what this
    // item exists to show. The caster light orbits at radius 2.2 and height
    // 2.4 aimed at the origin, so it looks down on the scene at roughly 45
    // degrees; an upright quad is nearly edge-on to it and throws a thin
    // sliver no lattice could be read in. Leaning the panel back by the
    // same angle turns its face toward the light, so the openings project
    // onto the ground as a real grid of light patches that sweeps as the
    // light orbits — the only way the shadow-caster third of §6.2's route
    // is visible at all rather than merely asserted by a fixture.
    // `DrawMode.masked` puts it in the opaque batch list, which is §8.6's
    // "masked materials stay in depth-writing opaque order" — the first
    // item in this bootstrap ever submitted under that mode, so it is also
    // what proves that route is real and not an enum value nothing picks.
    //
    // It also yaws slowly, which is not decoration. The panel is a single
    // face with a doubleSided material, and `doubleSided` is only
    // observable when something actually looks at the back of it — held
    // still at this tilt the light's dot product with the panel normal
    // stays positive across the entire orbit, so every pass sees a front
    // face forever and honouring the flag or ignoring it produce identical
    // frames. Turning it puts its back to the camera and to the light in
    // turn, which is what makes "the shadow no longer blinks out" a claim
    // this scene can be wrong about. Slow enough (0.3 rad/s) that an A/B
    // pair captured a third of a second apart barely moves it.
    final maskedPanel = _TestCubeItem(
      maskedPanelHandle,
      maskActive ? maskedPanelMaterial : unmaskedPanelMaterial,
      Transform(
        translation: const Vec3(-1.05, 1.15, -0.9),
        rotation:
            Quat.axisAngle(const Vec3(0, 1, 0), t * 0.3) *
            Quat.axisAngle(const Vec3(1, 0, 0), -0.85),
      ),
      castsShadow: shadowCastsEnabled,
      drawMode: DrawMode.masked,
    );

    // RV-09 rung 6: transient blended submission via the generic
    // RenderEncoder — six drifting, translucent (BlendMode.alpha) motes and
    // one additively-blended (BlendMode.additive) light shaft, angled above
    // the bobbing cube as if it were the source. "breath" and "rain" are
    // the same generic mesh+DrawMode.blended+BlendMode path proven here,
    // not independently demoed as their own visual instances this rung
    // (see board). Neither casts nor receives shadows — transient
    // atmosphere, not scene geometry.
    transientEncoder.clear();
    for (var i = 0; i < 6; i++) {
      final phase = i * 1.047;
      final driftX = math.sin(t * 0.3 + phase) * 1.5;
      final driftY = 0.6 + math.sin(t * 0.5 + phase * 1.3) * 0.4 + i * 0.15;
      final driftZ = math.cos(t * 0.25 + phase) * 1.2 - 0.5;
      transientEncoder.submit(
        RetainedItemDescriptor(
          mesh: moteHandle,
          material: moteMaterial,
          transform: Transform(translation: Vec3(driftX, driftY, driftZ)),
          drawMode: DrawMode.blended,
          blendMode: BlendMode.alpha,
          castsShadow: false,
          receivesShadow: false,
        ),
      );
    }
    transientEncoder.submit(
      RetainedItemDescriptor(
        mesh: shaftHandle,
        material: shaftMaterial,
        transform: Transform(
          translation: const Vec3(1.8, 2.2, -0.4),
          rotation: Quat.axisAngle(const Vec3(1, 0, 0), 0.35),
        ),
        drawMode: DrawMode.blended,
        blendMode: BlendMode.additive,
        castsShadow: false,
        receivesShadow: false,
      ),
    );
    // §6.2's "sorts blended back-to-front" — farthest-from-camera first, so
    // painter's-algorithm blending composites correctly with no depth-write
    // from these items to fight over.
    final blendedItems = transientEncoder.items.toList()
      ..sort((a, b) {
        final da =
            (a.descriptor.transform.translation - camera.eye).lengthSquared;
        final db =
            (b.descriptor.transform.translation - camera.eye).lengthSquared;
        return db.compareTo(da);
      });
    // Close the frame-local encoder before the graph executes. The next
    // animation frame may call `clear()` again; leaving it active would make
    // the second frame fail with the encoder's double-begin guard.
    transientEncoder.endFrame();

    final instanceBatch = InstanceBatch(spinningCube, [
      spinningCube,
      instanceProbeCube,
      instanceProbeCubeTwo,
    ]);
    canvas
      ..setAttribute('data-instance-family-key', '$_instanceProbeFamilyKey')
      ..setAttribute('data-instance-count', '${instanceBatch.instanceCount}')
      ..setAttribute(
        'data-instance-transforms',
        '${spinningCube.transform.translation.x},'
            '${spinningCube.transform.translation.y},'
            '${spinningCube.transform.translation.z};'
            '${instanceProbeCube.transform.translation.x},'
            '${instanceProbeCube.transform.translation.y},'
            '${instanceProbeCube.transform.translation.z};'
            '${instanceProbeCubeTwo.transform.translation.x},'
            '${instanceProbeCubeTwo.transform.translation.y},'
            '${instanceProbeCubeTwo.transform.translation.z}',
      )
      ..setAttribute('data-instance-draw-mode', 'instanced');
    final frameScene = _StaticFrameScene(
      r09InstanceFixture
          ? <Object>[instanceBatch]
          : <Object>[
              ground,
              instanceBatch,
              cullTestQuad,
              bobbingCube,
              maskedPanel,
            ],
      camera,
      environment,
      r09InstanceFixture || r09ResidencyFixture || r09ShadowFixture
          ? PostProcessState.off
          : PostProcessState(
              ssaoStrength: ssaoActive ? 1.2 : 0.0,
              bloomStrength: bloomActive ? 1.0 : 0.0,
              depthOfFieldStrength: dofActive ? 1.0 : 0.0,
              colorGradeStrength: gradeActive ? 1.0 : 0.0,
              vertexSnapGrid: ps1Active ? 0.01 : 0.0,
              ditherStrength: ps1Active ? 0.5 : 0.0,
              quantizationBits: ps1Active ? 4 : 8,
              affineWarpStrength: affineActive ? 1.0 : 0.0,
              vhsChromaWeight: vhsActive ? 0.05 : 0.0,
              vhsTrackingWeight: vhsActive ? 0.04 : 0.0,
              vhsNoiseWeight: vhsActive ? 0.03 : 0.0,
              vhsHeadSwitchWeight: vhsActive ? 0.06 : 0.0,
              vhsDropoutWeight: vhsActive ? 0.05 : 0.0,
              vhsGhostWeight: vhsActive ? 0.04 : 0.0,
            ),
      r09InstanceFixture || r09ShadowFixture ? const <Object>[] : blendedItems,
    );
    final frameTelemetry = FrameDrawTelemetry();
    final encoder = DeviceDrawCommandEncoder(device, telemetry: frameTelemetry);

    // Bloom/DOF's own targets, plus resolved sceneColor — only ever read in
    // the non-debug branch below (the debug branch executes its own,
    // separately-built graph's present pass against depthDebugContext
    // instead, since DOF's present now reads `dofOutput`, a target only
    // this graph's dofComposite pass ever writes; depthDebugResult's own
    // graph has no DOF stage and must keep reading plain `sceneColor`).
    final resolvedContext = BoundPassContext(
      views: {
        SafeGraphResources.sceneColor.name: BoundResourceView(
          SafeGraphResources.sceneColor,
          sceneColorTarget,
        ),
        BloomResources.bloomBlurH.name: BoundResourceView(
          BloomResources.bloomBlurH,
          bloomBlurHTarget,
        ),
        BloomResources.bloomBlurV.name: BoundResourceView(
          BloomResources.bloomBlurV,
          bloomBlurVTarget,
        ),
        DofResources.dofBlurH.name: BoundResourceView(
          DofResources.dofBlurH,
          dofBlurHTarget,
        ),
        DofResources.dofBlurV.name: BoundResourceView(
          DofResources.dofBlurV,
          dofBlurVTarget,
        ),
        DofResources.dofOutput.name: BoundResourceView(
          DofResources.dofOutput,
          dofOutputTarget,
        ),
        GradeResources.gradeOutput.name: BoundResourceView(
          GradeResources.gradeOutput,
          gradeOutputTarget,
        ),
        Ps1Resources.ps1Output.name: BoundResourceView(
          Ps1Resources.ps1Output,
          ps1OutputTarget,
        ),
        VhsResources.vhsOutput.name: BoundResourceView(
          VhsResources.vhsOutput,
          vhsWriteTarget,
        ),
      },
      encoder: encoder,
      frameScene: frameScene,
    );

    if (depthDebugActive) {
      // §8.4 rung 4's proof path: depthPrepass (main camera, single-sample,
      // depth-only) -> depthDebug (samples that depth, writes linearized
      // grayscale into sceneColor) -> present. No MSAA here — the prepass
      // itself is required single-sample per the plan, and this debug view
      // has no reason to add multisampling on top of a proof that isn't
      // about antialiasing at all.
      final depthDebugContext = BoundPassContext(
        views: {
          DepthPrepassResources.sceneDepth.name: BoundResourceView(
            DepthPrepassResources.sceneDepth,
            sceneDepthTarget,
          ),
          SafeGraphResources.sceneColor.name: BoundResourceView(
            SafeGraphResources.sceneColor,
            sceneColorTarget,
          ),
        },
        encoder: encoder,
        frameScene: frameScene,
      );
      // Runs depthDebugResult's own present pass too (distinct programId
      // 'presentDepthDebug', reading plain 'sceneColor') rather than
      // falling through to the shared unconditional present below — that
      // used to work only because bloom's present also read 'sceneColor'
      // by coincidence of naming; DOF's present reads 'dofOutput' instead,
      // a target this debug graph never writes, so each graph must now run
      // its own present pass end-to-end.
      for (final pass in depthDebugResult.passes) {
        frameTelemetry.beginPass(pass.descriptor.id);
        pass.execute(depthDebugContext);
      }
    } else {
      // Shadow caster + shadowedWorld both write into the multisampled
      // sceneColor target — declared graph resources don't yet model a
      // resolve step as its own stage, so the two context objects below
      // (msaaContext writes, resolvedContext reads) are how this bootstrap
      // expresses "the present pass must never see the multisampled target
      // directly," matching what bindTexture already enforces at the GL
      // level.
      final msaaContext = BoundPassContext(
        views: {
          DepthPrepassResources.sceneDepth.name: BoundResourceView(
            DepthPrepassResources.sceneDepth,
            sceneDepthTarget,
          ),
          SsaoResources.ssaoRaw.name: BoundResourceView(
            SsaoResources.ssaoRaw,
            ssaoRawTarget,
          ),
          SsaoResources.ssaoBlurred.name: BoundResourceView(
            SsaoResources.ssaoBlurred,
            ssaoBlurredTarget,
          ),
          ShadowResources.shadowMap.name: BoundResourceView(
            ShadowResources.shadowMap,
            shadowMapTarget,
          ),
          SafeGraphResources.sceneColor.name: BoundResourceView(
            SafeGraphResources.sceneColor,
            sceneColorMsaaTarget,
          ),
        },
        encoder: encoder,
        frameScene: frameScene,
      );
      for (final pass in result.passes) {
        if (_postResolvePassIds.contains(pass.descriptor.id)) continue;
        frameTelemetry.beginPass(pass.descriptor.id);
        pass.execute(msaaContext);
      }

      device.resolveTarget(sceneColorMsaaTarget, sceneColorTarget);

      // Bloom only ever runs here, in the non-debug branch — running it
      // unconditionally (regardless of depthDebugActive) was a real bug
      // caught before ever reaching the browser: the composite pass would
      // additively blend stale (or frame-1 undefined) bloom onto whatever
      // depthDebug had just written, corrupting the depth visualization
      // with leftover glow it has nothing to do with.
      for (final pass in result.passes) {
        if (pass.descriptor.id == 'present') continue;
        if (!_postResolvePassIds.contains(pass.descriptor.id)) continue;
        frameTelemetry.beginPass(pass.descriptor.id);
        pass.execute(resolvedContext);
      }

      for (final pass in result.passes) {
        if (pass.descriptor.id != 'present') continue;
        frameTelemetry.beginPass(pass.descriptor.id);
        pass.execute(resolvedContext);
      }
    }

    if (frame == 1) {
      _publishR09InstancePixelProof(device.gl, canvas, camera, [
        spinningCube,
        instanceProbeCube,
        instanceProbeCubeTwo,
      ]);
      if (r09ShadowFixture) {
        _publishR09ShadowProof(
          device.gl,
          canvas,
          frameTelemetry,
          disabled: r09ShadowDisabled,
        );
      }
    }

    if (frame == 1 || frame % 60 == 0) {
      _setStatus(
        'running — frame $frame\n'
        '${caps.rendererString ?? "?"}\n'
        'device status: ${device.status.name}',
        isRunningStatus: true,
      );
    }
    web.window.requestAnimationFrame(tick.toJS);
  }

  web.window.requestAnimationFrame(tick.toJS);
}

/// Runs one real WebGL timer-query probe and publishes its lifecycle on the
/// canvas for browser automation. This is deliberately separate from the
/// renderer's frame loop: a ready value is reported only when the adapter
/// returns one, while unsupported/disjoint/pending states never receive a
/// fabricated elapsed time.
void _startGpuTimingProbe(WebGl2Device device, RenderCapabilities caps) {
  final canvas = device.gl.canvas as web.HTMLCanvasElement;
  void publish(GpuTimerPoll result, {int? polls}) {
    canvas.setAttribute('data-gpu-timing-status', result.status.name);
    if (polls != null) {
      canvas.setAttribute('data-gpu-timing-polls', '$polls');
    }
    final elapsed = result.elapsedNanoseconds;
    if (elapsed == null) {
      canvas.removeAttribute('data-gpu-timing-elapsed-ns');
    } else {
      canvas.setAttribute('data-gpu-timing-elapsed-ns', '$elapsed');
    }
  }

  if (!caps.disjointTimerQuery) {
    const unsupported = GpuTimerPoll(GpuTimerStatus.unsupported);
    publish(unsupported, polls: 0);
    _setStatus(
      'GPU timing: unsupported — EXT_disjoint_timer_query_webgl2 is absent; '
      'no duration reported',
    );
    return;
  }

  final query = device.beginGpuTimer();
  if (query == null) {
    const unsupported = GpuTimerPoll(GpuTimerStatus.unsupported);
    publish(unsupported, polls: 0);
    _setStatus('GPU timing: unsupported — query allocation returned null');
    return;
  }

  // A clear is enough real GPU work to exercise the query without depending
  // on the demo graph's later resource setup or changing its frame stats.
  device.gl.clearColor(0, 0, 0, 0);
  device.gl.clear(web.WebGL2RenderingContext.COLOR_BUFFER_BIT);
  device.gl.flush();
  device.endGpuTimer(query);

  var polls = 0;
  void poll(num _) {
    polls += 1;
    final result = device.pollGpuTimer(query);
    publish(result, polls: polls);
    switch (result.status) {
      case GpuTimerStatus.pending:
        if (polls < 120) {
          web.window.requestAnimationFrame(poll.toJS);
          return;
        }
        // Keep the truthful pending state but clean up the query rather than
        // turning a slow adapter into a made-up duration.
        device.deleteGpuTimer(query);
        _setStatus('GPU timing: pending after $polls polls — duration omitted');
      case GpuTimerStatus.ready:
        device.deleteGpuTimer(query);
        _setStatus(
          'GPU timing: ready — ${result.elapsedNanoseconds} ns '
          '(polls: $polls)',
        );
      case GpuTimerStatus.disjoint:
        device.deleteGpuTimer(query);
        _setStatus(
          'GPU timing: disjoint — adapter invalidated the sample; '
          'duration omitted',
        );
      case GpuTimerStatus.unsupported:
        device.deleteGpuTimer(query);
        _setStatus('GPU timing: unsupported — duration omitted');
    }
  }

  // The first poll is expected to be pending on a real adapter, but the
  // implementation remains correct if a driver makes the result ready
  // immediately.
  web.window.requestAnimationFrame(poll.toJS);
}

/// Reads one small neighborhood around each authored instance center after
/// the present pass. This is intentionally independent of the house: the
/// standalone renderer demo's shared cube mesh/material is enough to prove
/// that three distinct transforms reached a real WebGL draw. A non-black hit
/// at every projected center is stronger than the DOM metadata alone, while
/// the metadata keeps the browser report explainable when a headless adapter
/// has no visible WebGL output.
void _publishR09InstancePixelProof(
  web.WebGL2RenderingContext gl,
  web.HTMLCanvasElement canvas,
  CameraView camera,
  List<_TestCubeItem> items,
) {
  final width = gl.drawingBufferWidth;
  final height = gl.drawingBufferHeight;
  final hits = <int>[];
  for (final item in items) {
    final ndc = camera.viewProjection.transformPoint(
      item.transform.translation,
    );
    final centerX = ((ndc.x * 0.5 + 0.5) * (width - 1)).round();
    final centerY = ((ndc.y * 0.5 + 0.5) * (height - 1)).round();
    var hit = 0;
    for (var dy = -2; dy <= 2; dy += 1) {
      for (var dx = -2; dx <= 2; dx += 1) {
        final x = centerX + dx;
        final y = centerY + dy;
        if (x < 0 || x >= width || y < 0 || y >= height) continue;
        final pixel = Uint8List(4);
        gl.readPixels(
          x,
          y,
          1,
          1,
          web.WebGL2RenderingContext.RGBA,
          web.WebGL2RenderingContext.UNSIGNED_BYTE,
          pixel.toJS,
        );
        if (pixel[0] > 12 || pixel[1] > 12 || pixel[2] > 12) {
          hit += 1;
        }
      }
    }
    hits.add(hit);
  }
  canvas.setAttribute('data-instance-pixel-hits', hits.join(','));
  canvas.setAttribute(
    'data-instance-pixel-proof',
    hits.every((value) => value > 0) ? 'three-distinct' : 'pixel-miss',
  );
}

/// Publishes the standalone renderer's shadow-pass seam for the browser
/// A/B fixture. The direct bootstrap owns the graph execution, so it also
/// owns the pass telemetry that the normal [SceneRendererImpl] wrapper would
/// otherwise expose. A zero draw count is intentionally reported as
/// `zero-pass` rather than being treated as a failed assertion: that is the
/// truthful outcome on a profile/adapter where the shadow feature is absent
/// or where the fixture is explicitly running its shadow-off half.
void _publishR09ShadowProof(
  web.WebGL2RenderingContext gl,
  web.HTMLCanvasElement canvas,
  FrameDrawTelemetry telemetry, {
  required bool disabled,
}) {
  final shadow = telemetry.snapshot()['shadowCaster'];
  final draws = shadow?.drawCalls ?? 0;
  final triangles = shadow?.trianglesSubmitted ?? 0;
  final hasShadowPass = draws > 0 && triangles > 0;
  final width = gl.drawingBufferWidth;
  final height = gl.drawingBufferHeight;
  final pixels = Uint8List(width * height * 4);
  gl.readPixels(
    0,
    0,
    width,
    height,
    web.WebGL2RenderingContext.RGBA,
    web.WebGL2RenderingContext.UNSIGNED_BYTE,
    pixels.toJS,
  );
  // The default framebuffer is transient on some headless adapters: a
  // later browser read can observe a cleared buffer even though this frame's
  // in-loop read was valid (the instance proof above follows the same rule).
  // Publish a compact, deterministic luma grid while the presented pixels
  // are still live so the Node fixture can compare shadow-on and shadow-off
  // without relying on a screenshot decoder.
  const sampleColumns = 64;
  const sampleRows = 36;
  final samples = <int>[];
  for (var row = 0; row < sampleRows; row++) {
    final y = ((row + 0.5) * height / sampleRows).floor();
    for (var column = 0; column < sampleColumns; column++) {
      final x = ((column + 0.5) * width / sampleColumns).floor();
      final index = (y * width + x) * 4;
      samples.add(
        ((pixels[index] + pixels[index + 1] + pixels[index + 2]) / 3).round(),
      );
    }
  }
  canvas
    ..setAttribute('data-r09-shadow-capability', 'available')
    ..setAttribute('data-r09-shadow-mode', disabled ? 'off' : 'on')
    ..setAttribute(
      'data-r09-shadow-status',
      hasShadowPass ? 'shadow-pass' : 'zero-pass',
    )
    ..setAttribute('data-r09-shadow-caster-draws', '$draws')
    ..setAttribute('data-r09-shadow-triangles', '$triangles')
    ..setAttribute('data-r09-shadow-pixel-size', '${sampleColumns}x$sampleRows')
    ..setAttribute('data-r09-shadow-pixel-samples', samples.join(','))
    ..setAttribute(
      'data-r09-shadow-pixel-proof',
      hasShadowPass ? 'shadow-pass' : 'zero-pass',
    )
    ..setAttribute(
      'data-r09-shadow-reason',
      hasShadowPass ? 'caster-pass-recorded' : 'no-shadow-caster-draws',
    );
}

final class _AlwaysAvailable implements RenderPassResources {
  @override
  bool isAvailable(String resourceName) => true;
}

/// A minimal `RetainedItemView` carrying the real `MeshHandle` returned by
/// `MeshStore.upload` — the mesh resolver ignores this bootstrap's `mesh`
/// value and always resolves `cubeHandle` directly, but a real `RenderWorld`
/// consumer must have a resolvable handle here regardless.
final class _TestCubeItem implements RetainedItemView {
  final MeshHandle mesh;
  final MaterialHandle material;
  final Transform transform;
  final bool castsShadow;
  final DrawMode drawMode;
  final int instanceSlot;
  final int? instanceFamilyKey;
  const _TestCubeItem(
    this.mesh,
    this.material,
    this.transform, {
    this.castsShadow = true,
    this.drawMode = DrawMode.opaque,
    this.instanceSlot = 0,
    this.instanceFamilyKey,
  });
  @override
  InstanceId get id => InstanceId(instanceSlot, 1);
  @override
  RetainedItemDescriptor get descriptor => RetainedItemDescriptor(
    mesh: mesh,
    material: material,
    transform: transform,
    castsShadow: castsShadow,
    drawMode: drawMode,
    instanceFamilyKey: instanceFamilyKey,
  );
  @override
  Aabb get worldBounds => const Aabb(Vec3(-1, -1, -1), Vec3(1, 1, 1));
}
