# Built-in shader slot contract

`ShaderOverride` replaces a complete GLSL ES 3.0 vertex or fragment stage. The
other stage stays at its built-in default. Each linked shader is the source of
truth for its typed `in`, `out`, and `uniform` declarations. Keep the vertex
attributes at the listed locations, the varyings shared between stages, and
the engine uniforms used by the pass. The renderer binds the listed samplers;
host uniforms and extra textures do not yet have a public binding API.

The compiler checks required attributes and uniforms. Before compilation,
fragment overrides must declare the same attachment locations and types as
the default. A single `vec4` output may omit `layout(location=0)`; passes with
two outputs must declare both locations. The depth-only passes declare no
color output. Compilation and linking still depend on the browser's WebGL 2
driver. A failed live change retains the previous graph; a failed startup
override uses the default and appears in `shaderErrors`.

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
