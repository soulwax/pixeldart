import 'dart:math' as math;

import '../api/handles.dart';
import '../api/materials.dart';
import '../api/renderer.dart';
import '../math/vec.dart';

/// Playback modes for spritesheet particle animation.
enum ParticleSpritePlaybackMode {
  /// Particle remains on the frame assigned at birth.
  staticFrame,

  /// Sprite frames advance proportionally across the particle's normalized lifetime [0, 1].
  animatedOverLifetime,

  /// Sprite frames loop continuously at the animation's configured frame rate.
  loopingAnimation,

  /// Particle randomly samples a uniform frame from the spritesheet upon birth.
  random,

  /// Particle samples a frame weighted by [ParticleSprite.weight] upon birth.
  weightedRandom,

  /// Particle sprite is assigned manually and never changed automatically.
  manual,
}

/// Metadata describing a single sprite frame within a [ParticleSpriteSheet].
final class ParticleSprite {
  /// Human-readable unique identifier for this sprite (e.g. 'flame_01', 'spark', 'coin').
  final String name;

  /// Zero-based index within the spritesheet.
  final int index;

  /// Minimum horizontal UV coordinate [0, 1].
  final double uMin;

  /// Minimum vertical UV coordinate [0, 1].
  final double vMin;

  /// Maximum horizontal UV coordinate [0, 1].
  final double uMax;

  /// Maximum vertical UV coordinate [0, 1].
  final double vMax;

  /// Derived horizontal UV scale matching the shader uniform `uUvScaleOffset.x`.
  final double uvScaleU;

  /// Derived vertical UV scale matching the shader uniform `uUvScaleOffset.y`.
  final double uvScaleV;

  /// Derived horizontal UV offset matching the shader uniform `uUvScaleOffset.z`.
  final double uvOffsetU;

  /// Derived vertical UV offset matching the shader uniform `uUvScaleOffset.w`.
  final double uvOffsetV;

  /// Authored pixel width, if known.
  final int? pixelWidth;

  /// Authored pixel height, if known.
  final int? pixelHeight;

  /// Width-to-height aspect ratio (width / height). Defaults to 1.0 for square sprites.
  final double aspectRatio;

  /// Normalized pivot anchor point. Default is center (0.5, 0.5).
  final Vec2 anchor;

  /// Probability weight when randomly sampling frames. Default is 1.0.
  final double weight;

  /// Optional classification or query tags (e.g. {'fire', 'small'}).
  final Set<String> tags;

  /// Optional arbitrary user-defined metadata.
  final Map<String, dynamic>? customData;

  /// Cached GPU material handle once bound via [ParticleSpriteSheet.bind].
  MaterialHandle? materialHandle;

  ParticleSprite({
    required this.name,
    required this.index,
    required this.uMin,
    required this.vMin,
    required this.uMax,
    required this.vMax,
    int? pixelWidth,
    int? pixelHeight,
    double? aspectRatio,
    this.anchor = const Vec2(0.5, 0.5),
    this.weight = 1.0,
    Set<String>? tags,
    this.customData,
    this.materialHandle,
  })  : uvScaleU = uMax - uMin,
        uvScaleV = vMax - vMin,
        uvOffsetU = uMin,
        uvOffsetV = vMin,
        pixelWidth = pixelWidth,
        pixelHeight = pixelHeight,
        aspectRatio = aspectRatio ??
            ((pixelWidth != null && pixelHeight != null && pixelHeight > 0)
                ? pixelWidth / pixelHeight
                : 1.0),
        tags = tags == null ? const {} : Set.unmodifiable(tags) {
    validate();
  }

  void validate() {
    if (name.isEmpty) throw ArgumentError('ParticleSprite name must not be empty');
    if (index < 0) throw ArgumentError('ParticleSprite index must be >= 0');
    if (!uMin.isFinite || !vMin.isFinite || !uMax.isFinite || !vMax.isFinite) {
      throw ArgumentError('ParticleSprite UV coordinates must be finite: $name');
    }
    if (uMin < 0.0 || uMax > 1.0 || uMin >= uMax) {
      throw ArgumentError('ParticleSprite horizontal UV range invalid: [$uMin, $uMax] for $name');
    }
    if (vMin < 0.0 || vMax > 1.0 || vMin >= vMax) {
      throw ArgumentError('ParticleSprite vertical UV range invalid: [$vMin, $vMax] for $name');
    }
    if (!aspectRatio.isFinite || aspectRatio <= 0) {
      throw ArgumentError('ParticleSprite aspectRatio must be finite and > 0');
    }
    if (!anchor.isFinite) {
      throw ArgumentError('ParticleSprite anchor must be finite');
    }
    if (!weight.isFinite || weight < 0) {
      throw ArgumentError('ParticleSprite weight must be finite and >= 0');
    }
  }
}

/// Named sequence of sprite frame indices forming an animated sequence.
final class SpriteAnimation {
  /// Unique name for this animation (e.g. 'burn', 'explode', 'spin').
  final String name;

  /// Ordered frame indices referencing sprites in the owning [ParticleSpriteSheet].
  final List<int> frameIndices;

  /// Playback speed in frames per second.
  final double frameRate;

  /// Whether the animation loops continuously or holds on the final frame.
  final bool isLooping;

  SpriteAnimation({
    required this.name,
    required List<int> frameIndices,
    this.frameRate = 12.0,
    this.isLooping = true,
  }) : frameIndices = List.unmodifiable(frameIndices) {
    validate();
  }

  void validate() {
    if (name.isEmpty) throw ArgumentError('SpriteAnimation name must not be empty');
    if (frameIndices.isEmpty) throw ArgumentError('SpriteAnimation must have at least one frame');
    if (!frameRate.isFinite || frameRate <= 0) {
      throw ArgumentError('SpriteAnimation frameRate must be finite and > 0');
    }
    for (final idx in frameIndices) {
      if (idx < 0) throw ArgumentError('SpriteAnimation frameIndex must be >= 0');
    }
  }

  /// Total duration of one cycle in seconds.
  double get duration => frameIndices.length / frameRate;

  /// Total frame count in the sequence.
  int get frameCount => frameIndices.length;

  /// Returns the sprite index corresponding to elapsed time in seconds.
  int frameIndexAtTime(double timeSeconds) {
    if (frameIndices.length == 1) return frameIndices.first;
    final totalFrames = (timeSeconds * frameRate).floor();
    if (isLooping) {
      final wrapped = totalFrames % frameIndices.length;
      return frameIndices[wrapped < 0 ? wrapped + frameIndices.length : wrapped];
    } else {
      final clamped = totalFrames.clamp(0, frameIndices.length - 1);
      return frameIndices[clamped];
    }
  }

  /// Returns the sprite index corresponding to normalized lifetime [0, 1].
  int frameIndexAtNormalizedTime(double t) {
    if (frameIndices.length == 1) return frameIndices.first;
    final clamped = t.clamp(0.0, 0.999999);
    final idx = (clamped * frameIndices.length).floor().clamp(0, frameIndices.length - 1);
    return frameIndices[idx];
  }
}

/// An authored or procedurally generated spritesheet containing multiple sub-sprite frames
/// and optional animation sequences.
final class ParticleSpriteSheet {
  /// The underlying GPU texture containing the sprite frames.
  final TextureHandle texture;

  /// The list of all sprite definitions indexed by frame index.
  final List<ParticleSprite> sprites;

  /// Named animation sequences defined for this sheet.
  final Map<String, SpriteAnimation> animations;

  final Map<String, int> _nameToIndex = {};
  final Map<String, List<int>> _tagToIndices = {};
  final List<MaterialHandle> _materials = [];
  List<double>? _cumulativeWeights;

  ParticleSpriteSheet({
    required this.texture,
    required List<ParticleSprite> sprites,
    Map<String, SpriteAnimation>? animations,
  })  : sprites = List.unmodifiable(sprites),
        animations = animations == null ? const {} : Map.unmodifiable(animations) {
    _indexData();
    validate();
  }

  /// Constructs a uniform grid spritesheet with [columns] and [rows].
  ///
  /// When [originTopLeft] is true (default for 2D spritesheets), row 0 is mapped
  /// to the top of the image texture.
  factory ParticleSpriteSheet.uniformGrid({
    required TextureHandle texture,
    required int columns,
    required int rows,
    int? frameCount,
    bool originTopLeft = true,
    String framePrefix = 'frame',
    List<String>? frameNames,
    Map<String, SpriteAnimation>? animations,
    double defaultWeight = 1.0,
    Map<int, Set<String>>? frameTags,
    int? textureWidth,
    int? textureHeight,
  }) {
    if (columns <= 0 || rows <= 0) {
      throw ArgumentError('columns and rows must be > 0');
    }
    final total = frameCount ?? (columns * rows);
    if (total <= 0 || total > columns * rows) {
      throw ArgumentError('frameCount must be in 1..${columns * rows}');
    }

    final colW = 1.0 / columns;
    final rowH = 1.0 / rows;
    final pixelW = textureWidth != null ? textureWidth ~/ columns : null;
    final pixelH = textureHeight != null ? textureHeight ~/ rows : null;

    final sprites = <ParticleSprite>[];
    for (var i = 0; i < total; i++) {
      final col = i % columns;
      final row = i ~/ columns;

      final uMin = col * colW;
      final uMax = uMin + colW;

      double vMin, vMax;
      if (originTopLeft) {
        vMax = 1.0 - row * rowH;
        vMin = vMax - rowH;
      } else {
        vMin = row * rowH;
        vMax = vMin + rowH;
      }

      final name = (frameNames != null && i < frameNames.length)
          ? frameNames[i]
          : '${framePrefix}_$i';

      sprites.add(
        ParticleSprite(
          name: name,
          index: i,
          uMin: uMin,
          vMin: vMin,
          uMax: uMax,
          vMax: vMax,
          pixelWidth: pixelW,
          pixelHeight: pixelH,
          weight: defaultWeight,
          tags: frameTags?[i],
        ),
      );
    }

    return ParticleSpriteSheet(
      texture: texture,
      sprites: sprites,
      animations: animations,
    );
  }

  /// Parses a spritesheet from JSON metadata (e.g. TexturePacker format or custom Pixeldart JSON).
  factory ParticleSpriteSheet.fromJson(
    Map<String, dynamic> json, {
    required TextureHandle texture,
    int? textureWidth,
    int? textureHeight,
  }) {
    final meta = json['meta'] as Map<String, dynamic>?;
    final sizeMeta = meta?['size'] as Map<String, dynamic>?;
    final tw = (sizeMeta?['w'] as num?)?.toInt() ?? textureWidth ?? 1;
    final th = (sizeMeta?['h'] as num?)?.toInt() ?? textureHeight ?? 1;

    final sprites = <ParticleSprite>[];
    final framesData = json['frames'];

    if (framesData is List) {
      for (var i = 0; i < framesData.length; i++) {
        final f = framesData[i] as Map<String, dynamic>;
        final name = (f['filename'] ?? f['name'] ?? 'sprite_$i').toString();
        final rect = (f['frame'] ?? f) as Map<String, dynamic>;
        final x = (rect['x'] as num).toDouble();
        final y = (rect['y'] as num).toDouble();
        final w = (rect['w'] as num).toDouble();
        final h = (rect['h'] as num).toDouble();

        final uMin = (x / tw).clamp(0.0, 1.0);
        final vMin = (1.0 - (y + h) / th).clamp(0.0, 1.0);
        final uMax = ((x + w) / tw).clamp(0.0, 1.0);
        final vMax = (1.0 - y / th).clamp(0.0, 1.0);

        final tags = (f['tags'] as List?)?.map((e) => e.toString()).toSet();
        final weight = (f['weight'] as num?)?.toDouble() ?? 1.0;

        sprites.add(
          ParticleSprite(
            name: name,
            index: i,
            uMin: uMin,
            vMin: vMin,
            uMax: uMax,
            vMax: vMax,
            pixelWidth: w.round(),
            pixelHeight: h.round(),
            weight: weight,
            tags: tags,
            customData: f['custom'] as Map<String, dynamic>?,
          ),
        );
      }
    } else if (framesData is Map) {
      var i = 0;
      for (final entry in framesData.entries) {
        final name = entry.key;
        final f = entry.value as Map<String, dynamic>;
        final rect = (f['frame'] ?? f) as Map<String, dynamic>;
        final x = (rect['x'] as num).toDouble();
        final y = (rect['y'] as num).toDouble();
        final w = (rect['w'] as num).toDouble();
        final h = (rect['h'] as num).toDouble();

        final uMin = (x / tw).clamp(0.0, 1.0);
        final vMin = (1.0 - (y + h) / th).clamp(0.0, 1.0);
        final uMax = ((x + w) / tw).clamp(0.0, 1.0);
        final vMax = (1.0 - y / th).clamp(0.0, 1.0);

        final tags = (f['tags'] as List?)?.map((e) => e.toString()).toSet();
        final weight = (f['weight'] as num?)?.toDouble() ?? 1.0;

        sprites.add(
          ParticleSprite(
            name: name,
            index: i++,
            uMin: uMin,
            vMin: vMin,
            uMax: uMax,
            vMax: vMax,
            pixelWidth: w.round(),
            pixelHeight: h.round(),
            weight: weight,
            tags: tags,
            customData: f['custom'] as Map<String, dynamic>?,
          ),
        );
      }
    }

    // Parse animations if defined in JSON
    final anims = <String, SpriteAnimation>{};
    final animsData = json['animations'] as Map<String, dynamic>?;
    if (animsData != null) {
      final nameMap = {for (final s in sprites) s.name: s.index};
      for (final entry in animsData.entries) {
        final a = entry.value as Map<String, dynamic>;
        final rawFrames = a['frames'] as List;
        final frameIndices = <int>[];
        for (final item in rawFrames) {
          if (item is int) {
            frameIndices.add(item);
          } else if (item is String && nameMap.containsKey(item)) {
            frameIndices.add(nameMap[item]!);
          }
        }
        final fps = (a['fps'] as num?)?.toDouble() ?? 12.0;
        final loop = (a['loop'] as bool?) ?? true;
        anims[entry.key] = SpriteAnimation(
          name: entry.key,
          frameIndices: frameIndices,
          frameRate: fps,
          isLooping: loop,
        );
      }
    }

    return ParticleSpriteSheet(
      texture: texture,
      sprites: sprites,
      animations: anims,
    );
  }

  void _indexData() {
    _nameToIndex.clear();
    _tagToIndices.clear();
    for (final sprite in sprites) {
      _nameToIndex[sprite.name] = sprite.index;
      for (final tag in sprite.tags) {
        _tagToIndices.putIfAbsent(tag, () => []).add(sprite.index);
      }
    }
  }

  void validate() {
    if (!texture.isValid) {
      throw ArgumentError('ParticleSpriteSheet texture handle must be valid');
    }
    if (sprites.isEmpty) {
      throw ArgumentError('ParticleSpriteSheet must contain at least one sprite');
    }
    for (var i = 0; i < sprites.length; i++) {
      final s = sprites[i];
      if (s.index != i) {
        throw ArgumentError('Sprite index ${s.index} does not match slot $i');
      }
      s.validate();
    }
    for (final anim in animations.values) {
      anim.validate();
      for (final idx in anim.frameIndices) {
        if (idx >= sprites.length) {
          throw ArgumentError('Animation ${anim.name} references out-of-range index $idx');
        }
      }
    }
  }

  /// Registers materials for each sprite frame using [resources].
  ///
  /// If [baseMaterial] is provided, its shading parameters (tint, alpha mode, roughness,
  /// emissive strength, etc.) are cloned and updated with each frame's exact UV scale and offset.
  /// If omitted, a standard blended unlit particle material is used.
  void bind(ResourceLibrary resources, {MaterialDefinition? baseMaterial}) {
    _materials.clear();
    final base = baseMaterial ??
        MaterialDefinition(
          key: 'spritesheet_${texture.slot}_base',
          albedoTexture: texture,
          alphaMode: AlphaMode.blended,
          roughness: 1.0,
          metallic: 0.0,
        );

    for (var i = 0; i < sprites.length; i++) {
      final s = sprites[i];
      final matDef = base.copyWith(
        key: '${base.key}_s${i}_${s.name}',
        albedoTexture: texture,
        uvScaleU: s.uvScaleU,
        uvScaleV: s.uvScaleV,
        uvOffsetU: s.uvOffsetU,
        uvOffsetV: s.uvOffsetV,
      );
      final handle = resources.registerMaterial(matDef);
      s.materialHandle = handle;
      _materials.add(handle);
    }
  }

  /// Whether material handles have been bound for all sprite frames.
  bool get isBound => _materials.length == sprites.length;

  /// Returns the registered material handles for all sprite frames.
  List<MaterialHandle> get materials => List.unmodifiable(_materials);

  /// Looks up a sprite definition by unique [name].
  ParticleSprite? getSprite(String name) {
    final idx = _nameToIndex[name];
    return idx != null ? sprites[idx] : null;
  }

  /// Returns the sprite definition at integer [index].
  ParticleSprite getSpriteByIndex(int index) {
    if (index < 0 || index >= sprites.length) {
      throw RangeError.index(index, sprites, 'sprites');
    }
    return sprites[index];
  }

  /// Looks up the integer frame index for a given sprite [name].
  int? indexOfSprite(String name) => _nameToIndex[name];

  /// Looks up a named animation sequence.
  SpriteAnimation? getAnimation(String name) => animations[name];

  /// Returns all frame indices matching the specified [tag].
  List<int> indicesWithTag(String tag) => _tagToIndices[tag] ?? const [];

  /// Samples a uniformly random sprite index.
  int sampleRandomIndex(math.Random random) {
    return random.nextInt(sprites.length);
  }

  /// Samples a sprite index weighted by each sprite's [ParticleSprite.weight].
  int sampleWeightedIndex(math.Random random) {
    if (sprites.length == 1) return 0;

    var cw = _cumulativeWeights;
    if (cw == null || cw.length != sprites.length) {
      cw = List<double>.filled(sprites.length, 0.0);
      var sum = 0.0;
      for (var i = 0; i < sprites.length; i++) {
        sum += sprites[i].weight;
        cw[i] = sum;
      }
      _cumulativeWeights = cw;
    }

    final totalWeight = cw.last;
    if (totalWeight <= 0) return random.nextInt(sprites.length);

    final roll = random.nextDouble() * totalWeight;
    var low = 0;
    var high = sprites.length - 1;
    while (low < high) {
      final mid = (low + high) >> 1;
      if (cw[mid] < roll) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return low;
  }
}

/// Fluent builder for constructing [ParticleSpriteSheet] instances programmatically.
final class ParticleSpriteSheetBuilder {
  final List<ParticleSprite> _sprites = [];
  final Map<String, SpriteAnimation> _animations = {};

  ParticleSpriteSheetBuilder();

  ParticleSpriteSheetBuilder addSprite({
    required String name,
    required double uMin,
    required double vMin,
    required double uMax,
    required double vMax,
    int? pixelWidth,
    int? pixelHeight,
    double? aspectRatio,
    Vec2 anchor = const Vec2(0.5, 0.5),
    double weight = 1.0,
    Set<String>? tags,
    Map<String, dynamic>? customData,
  }) {
    final index = _sprites.length;
    _sprites.add(
      ParticleSprite(
        name: name,
        index: index,
        uMin: uMin,
        vMin: vMin,
        uMax: uMax,
        vMax: vMax,
        pixelWidth: pixelWidth,
        pixelHeight: pixelHeight,
        aspectRatio: aspectRatio,
        anchor: anchor,
        weight: weight,
        tags: tags,
        customData: customData,
      ),
    );
    return this;
  }

  ParticleSpriteSheetBuilder addPixelSprite({
    required String name,
    required int x,
    required int y,
    required int width,
    required int height,
    required int textureWidth,
    required int textureHeight,
    bool originTopLeft = true,
    Vec2 anchor = const Vec2(0.5, 0.5),
    double weight = 1.0,
    Set<String>? tags,
    Map<String, dynamic>? customData,
  }) {
    final uMin = x / textureWidth;
    final uMax = (x + width) / textureWidth;
    double vMin, vMax;
    if (originTopLeft) {
      vMax = 1.0 - (y / textureHeight);
      vMin = 1.0 - ((y + height) / textureHeight);
    } else {
      vMin = y / textureHeight;
      vMax = (y + height) / textureHeight;
    }

    return addSprite(
      name: name,
      uMin: uMin.clamp(0.0, 1.0),
      vMin: vMin.clamp(0.0, 1.0),
      uMax: uMax.clamp(0.0, 1.0),
      vMax: vMax.clamp(0.0, 1.0),
      pixelWidth: width,
      pixelHeight: height,
      anchor: anchor,
      weight: weight,
      tags: tags,
      customData: customData,
    );
  }

  ParticleSpriteSheetBuilder addAnimation({
    required String name,
    required List<int> frameIndices,
    double frameRate = 12.0,
    bool isLooping = true,
  }) {
    _animations[name] = SpriteAnimation(
      name: name,
      frameIndices: frameIndices,
      frameRate: frameRate,
      isLooping: isLooping,
    );
    return this;
  }

  ParticleSpriteSheet build(TextureHandle texture) {
    return ParticleSpriteSheet(
      texture: texture,
      sprites: _sprites,
      animations: _animations,
    );
  }
}
