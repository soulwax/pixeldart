# Built-in shader slot contract

`ShaderOverride` replaces a complete GLSL ES 3.0 vertex or fragment stage. The
other stage stays at its built-in default. Each linked shader is the source of
truth for its typed `in`, `out`, and `uniform` declarations. The renderer binds
the listed samplers and sets the engine uniforms each pass uses.

## Writing a post effect

For `grade`, `ps1Quantize`, `vhs`, `dofComposite` and `sprites`, write one
function instead of a whole stage:

```dart
final app = await PixeldartApp.mount(canvas, shaders: {
  ShaderSlot.grade: ShaderOverride.effect('''
    vec4 effect(vec4 color, vec2 uv) {
      float wave = sin(uv.y * 40.0 + pdTime * 3.0) * uAmount;
      return vec4(color.rgb * (1.0 + wave) * uTint, color.a);
    }
  ''', uniforms: {
    'uAmount': ShaderUniform.float(0.1),
    'uTint': ShaderUniform.vec3(1, 0.9, 0.8),
  }),
});

app!.setShaderUniform(ShaderSlot.grade, 'uAmount', ShaderUniform.float(0.3));
```

`color` is the slot's input at `uv`. The version line, precision, input, output
and the listed `uniforms` are generated for you. Compile errors report line
numbers from your snippet. Sample more of the input with
`texture(pdSource, uv + offset)`, and declare anything else you need, such as
`uniform sampler2D uNoise;`, above the function.

`sprites` takes the same form. There, `color` is the tinted texel before
premultiplication and `uv` is the atlas coordinate; the renderer still applies
blending, glow and color conversion to what you return.

## Adding post effects

`postEffects` adds your own stages after every built-in one and before
present. It works on every profile, including `mount2d`, which has none of the
built-in effect slots:

```dart
final app = await PixeldartApp.mount2d(canvas, postEffects: {
  'crt': ShaderOverride.effect('''
    vec4 effect(vec4 color, vec2 uv) {
      float line = 0.9 + 0.1 * sin(uv.y * pdResolution.y * 3.14159);
      return vec4(color.rgb * line * uBrightness, color.a);
    }
  ''', uniforms: {'uBrightness': ShaderUniform.float(1.1)}),
});

app!.setShaderUniform(const PostEffect('crt'), 'uBrightness',
    ShaderUniform.float(1.3));
```

Stages run in map order and each reads the previous one's output. Each stage
owns one full-resolution color target; an empty map adds no passes or targets.
`await app.setPostEffects({...})` replaces the stack between frames and rebuilds
the graph, so use `setShaderUniform` for anything that changes while running. A
rejected live change keeps the previous stack. A stage that fails at startup
draws as a plain copy and appears in `shaderErrors[const PostEffect('crt')]`.

## Choosing a sprite shader per draw

Register a shader once, then select it on any draw:

```dart
final ripple = app.createSpriteShader(ShaderOverride.effect('''
  vec4 effect(vec4 color, vec2 uv) {
    return color * vec4(uTint, 1.0);
  }
''', uniforms: {'uTint': ShaderUniform.vec3(0.4, 0.8, 1)}));

encoder.drawSprites(water, camera, shader: ripple);
encoder.drawSprites(hud, camera);

app.setShaderUniform(ripple, 'uTint', ShaderUniform.vec3(1, 1, 1));
```

The choice applies to one draw, so one batch can be drawn again with another
shader, for example for an outline. Sorting and batching inside the batch are
unchanged. Programs switch only between draws that differ. `createSpriteShader`
throws `ShaderCompileException` if the shader is invalid. Registered shaders
survive resizes and context restores; `app.releaseSpriteShader(handle)` frees
one, and draws still naming it use the default.

## Host uniforms and textures

`setShaderUniform` and `setShaderTexture` take a `ShaderSlot`, a registered
`ShaderHandle` or a `PostEffect`. An override can bind its own values:

- `ShaderUniform.float`, `.vec2`, `.vec3`, `.vec4`, `.int`, `.mat4` and `.color`
  supply starting values through `uniforms:`. `.mat4` takes a `Mat4` and
  snapshots its 16 elements, so later edits to the source matrix do not
  change a bound value.
- `app.setShaderUniform(slot, name, value)` changes one at any time. It never
  recompiles, an unchanged value does nothing, and live values survive resizes,
  graph rebuilds and context restores.
- `app.setShaderTexture(slot, name, handle)` points a declared `sampler2D` at a
  `TextureHandle`, up to `ShaderOverride.maxTextures` (8) per shader, on texture
  units 8 to 15. A texture handle does not exist until after mount, so declare
  the sampler in GLSL and bind it once `app` is ready.
- Declare `uniform float pdTime` (seconds) or `uniform vec2 pdResolution`
  (internal size in pixels) in any override and the renderer fills them.

Names starting with `pd` are reserved. A name the built-in shader already
declares belongs to the renderer and cannot be bound. Binding a name the shader
does not declare, or with the wrong type, is an error that lists what the
shader does declare. Passing a new value through `setShader` also skips
recompiling; it resets that slot to the values in the new override.

`PixeldartApp.loadShaderSource(url)` fetches GLSL from a file.

## Rules checked before compiling

An override may ignore any engine attribute, uniform or sampler it has no use
for. What it does declare must agree with the default:

- A vertex attribute keeps its type and location.
- A uniform with an engine name keeps its type and array length.
- Each fragment input needs a matching vertex output.
- Fragment outputs use the same attachment locations and types as the default.
  A single `vec4` output may omit `layout(location=0)`; passes with two outputs
  must declare both locations. The depth-only passes declare no color output.

Compilation and linking still depend on the browser's WebGL 2 driver. A failed
live change retains the previous graph; a failed startup override uses the
default and appears in `shaderErrors`.

## When an override runs

The built-in `grade`, `ps1Quantize`, `vhs` and `dofComposite` are skipped when
their settings make them do nothing. A host override on those slots always
runs, whatever those settings are. The other passes keep their own skip rules:
SSAO, bloom, DOF blur and the volumetric passes still follow their strength
settings, so raise the strength for an override there to draw. On `dofComposite`
the `uBlurred` input is only current while `depthOfFieldStrength` is above zero.

## Vertex inputs

- `safeWorld`, `texturedWorld`: `aPosition` 0, `aNormal` 1, `aColor` 2,
  `aAlpha` 3, `aUvMat` 4.
- `shadowedWorld`: the same, plus `aTangent` 5 and `aUv1` 6.
- `shadowCaster`, `depthPrepass`: `aPosition` 0 and `aUvMat` 4.
- `sprites`: `aCorner` 0, `aAxes` 1, `aOrigin` 2, `aUv` 3,
  `aColor` 4, `aParams` 5.
- All other slots use the full-screen [vertex shader](../shaders/rendering/post/present.vert).
  It derives vertices from `gl_VertexID` and supplies `vUv`; no vertex buffer
  attributes are bound.

## Slots

The links expose the complete typed uniform and varying declarations. Sampler
numbers are the texture units assigned by the renderer. `0:vec4` means a
`vec4` fragment output at color attachment 0. Colors in intermediate targets
are scene-linear unless the row describes a depth, mask, or display result.

| Slot | Default vertex / fragment | Samplers (unit) | Outputs and meaning |
| --- | --- | --- | --- |
| `safeWorld` | [vertex](../shaders/rendering/world/safe_world.vert) / [fragment](../shaders/rendering/world/safe_world.frag) | None | `0:vec4` scene color |
| `texturedWorld` | [vertex](../shaders/rendering/world/textured_world.vert) / [fragment](../shaders/rendering/world/textured_world.frag) | `uAlbedo` 0 | `0:vec4` scene color |
| `shadowedWorld` | [vertex](../shaders/rendering/world/shadowed_world.vert) / [fragment](../shaders/rendering/world/shadowed_world.frag) | `uAlbedo` 0, `uShadowMap` 1, `uSsao` 2, `uNormalMap` 3, `uOrmMap` 4, `uEmissiveMap` 5, `uLightmap` 6 | `0:vec4` scene color, `1:vec4` glow |
| `shadowCaster` | [vertex](../shaders/rendering/shadow/shadow_caster.vert) / [fragment](../shaders/rendering/shadow/shadow_caster.frag) | `uAlbedo` 0 | Depth only; no color output |
| `depthPrepass` | [vertex](../shaders/rendering/depth/depth_prepass.vert) / [fragment](../shaders/rendering/depth/depth_prepass.frag) | `uAlbedo` 0 | Depth only; no color output |
| `depthDebug` | [full-screen vertex](../shaders/rendering/post/present.vert) / [fragment](../shaders/rendering/post/depth_debug.frag) | `uSceneDepth` 0 | `0:vec4` depth visualization |
| `sprites` | [vertex](../shaders/rendering/sprites/sprite.vert) / [fragment](../shaders/rendering/sprites/sprite.frag) | `uTex` 0 | `0:vec4` premultiplied scene color, `1:vec4` premultiplied glow |
| `ssaoOcclusion` | [full-screen vertex](../shaders/rendering/post/present.vert) / [fragment](../shaders/rendering/ssao/ssao_occlusion.frag) | `uSceneDepth` 0 | `0:vec4` occlusion mask |
| `ssaoBlur` | [full-screen vertex](../shaders/rendering/post/present.vert) / [fragment](../shaders/rendering/ssao/ssao_blur.frag) | `uSsaoRaw` 0, `uSceneDepth` 1 | `0:vec4` occlusion mask |
| `volumetricLight` | [full-screen vertex](../shaders/rendering/post/present.vert) / [fragment](../shaders/rendering/volumetric/volumetric_light.frag) | `uSceneDepth` 0 | `0:vec4` linear light |
| `volumetricComposite` | [full-screen vertex](../shaders/rendering/post/present.vert) / [fragment](../shaders/rendering/volumetric/volumetric_composite.frag) | `uVolumetric` 0 | `0:vec4` linear light |
| `bloomBlurH`, `bloomBlurV` | [full-screen vertex](../shaders/rendering/post/present.vert) / [fragment](../shaders/rendering/bloom/bloom_blur.frag) | `uSource` 0 | `0:vec4` linear bloom |
| `bloomComposite` | [full-screen vertex](../shaders/rendering/post/present.vert) / [fragment](../shaders/rendering/bloom/bloom_composite.frag) | `uBloom` 0 | `0:vec4` linear bloom |
| `dofBlurH`, `dofBlurV` | [full-screen vertex](../shaders/rendering/post/present.vert) / [fragment](../shaders/rendering/bloom/bloom_blur.frag) | `uSource` 0 | `0:vec4` scene color |
| `dofComposite` | [full-screen vertex](../shaders/rendering/post/present.vert) / [fragment](../shaders/rendering/dof/dof_composite.frag) | `uSharp` 0, `uBlurred` 1, `uSceneDepth` 2 | `0:vec4` scene color |
| `grade` | [full-screen vertex](../shaders/rendering/post/present.vert) / [fragment](../shaders/rendering/grade/grade_lut.frag) | `uScene` 0, `uLut` 1 | `0:vec4` scene color |
| `ps1Quantize` | [full-screen vertex](../shaders/rendering/post/present.vert) / [fragment](../shaders/rendering/ps1/ps1_quantize.frag) | `uScene` 0 | `0:vec4` scene color |
| `vhs` | [full-screen vertex](../shaders/rendering/post/present.vert) / [fragment](../shaders/rendering/vhs/vhs.frag) | `uScene` 0, `uHistory` 1 | `0:vec4` scene color |
| `present` | [full-screen vertex](../shaders/rendering/post/present.vert) / [fragment](../shaders/rendering/post/present.frag) | `uTex` 0, `uSkyTexture` 1 | `0:vec4` display color, encoded according to `uOutputEncoding` |

For `sprites`, `uLinearize` controls conversion of sampled sRGB colors to
linear light, and the output uses premultiplied alpha. Keep both attachment
outputs even when a custom effect emits no glow. For `present`, preserve the
tone-map and output-encoding policy when replacing the default, or explicitly
implement the equivalent result in the replacement.
