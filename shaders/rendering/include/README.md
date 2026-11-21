# Shared GLSL ES 3.00 Shader Includes (`[S3-0]`)

Files placed under `shaders/rendering/include/` can be included by any shader in
`shaders/rendering/` using:

```glsl
#include "include/common_math.glsl"
```

`tools/renderer/shaders.dart` resolves `#include` directives recursively with
cycle detection, and `tools/renderer/shaders.dart --check` verifies that
`lib/rendering/webgl/generated_shaders.dart` stays in sync with both top-level
shaders and their included files.
