// VRP Shadows (S3-C): Directional CSM + Spot/Point Shadow Atlas, PCF 3x3/5x5 & PCSS.

uniform int uShadowCascadeCount;
uniform vec4 uCascadeSplits;
layout(std140) uniform ShadowCascadeBlock {
  mat4 uCascadeMatrices[4];
  vec4 uCascadeAtlasRects[4];
};
uniform vec2 uShadowAtlasTexelSize;
uniform float uShadowDepthBias;
uniform float uShadowNormalBias;
uniform float uShadowPcssLightRadius;

float vrpSampleShadowPcf3x3(sampler2D atlas, vec2 uv, float compareDepth, vec2 texelSize, vec4 rect) {
  float sum = 0.0;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 sampleUv = clamp(uv + vec2(float(x), float(y)) * texelSize, rect.xy + texelSize * 0.5, rect.xy + rect.zw - texelSize * 0.5);
      float d = texture(atlas, sampleUv).r;
      sum += compareDepth <= d ? 1.0 : 0.0;
    }
  }
  return sum / 9.0;
}

float vrpSampleShadowPcss(sampler2D atlas, vec2 uv, float compareDepth, vec2 texelSize, vec4 rect, float lightRadius) {
  float blockerSum = 0.0;
  float blockerCount = 0.0;
  float searchRadius = max(lightRadius, 1.0);
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 sUv = clamp(uv + vec2(float(x), float(y)) * texelSize * searchRadius, rect.xy + texelSize * 0.5, rect.xy + rect.zw - texelSize * 0.5);
      float d = texture(atlas, sUv).r;
      if (d < compareDepth) {
        blockerSum += d;
        blockerCount += 1.0;
      }
    }
  }
  if (blockerCount < 0.5) return 1.0;
  float avgBlocker = blockerSum / blockerCount;
  float penumbra = clamp((compareDepth - avgBlocker) / max(avgBlocker, 0.001) * lightRadius * 6.0, 1.0, 3.0);
  return vrpSampleShadowPcf3x3(atlas, uv, compareDepth, texelSize * penumbra, rect);
}

int vrpSelectCascade(float viewDepth, int count, vec4 splits) {
  if (count <= 1) return 0;
  if (viewDepth < splits.x) return 0;
  if (count > 2 && viewDepth < splits.y) return 1;
  if (count > 3 && viewDepth < splits.z) return 2;
  return count - 1;
}

float vrpEvaluateDirectionalCsm(
  sampler2D shadowAtlas,
  vec3 worldPos,
  vec3 worldNormal,
  vec3 lightDir,
  float viewDepth,
  out int outCascadeIndex
) {
  outCascadeIndex = 0;
#if !defined(VRP_SHADOWS_PCF) && !defined(VRP_SHADOWS_PCSS)
  return 1.0;
#else
  if (uShadowCascadeCount <= 0) return 1.0;
  int idx = vrpSelectCascade(viewDepth, uShadowCascadeCount, uCascadeSplits);
  outCascadeIndex = idx;

  float ndotl = max(dot(worldNormal, lightDir), 0.0);
  float slopeBias = uShadowDepthBias * (1.0 + 2.0 * (1.0 - ndotl));
  vec3 biasedPos = worldPos + worldNormal * uShadowNormalBias;
  vec4 ls = uCascadeMatrices[idx] * vec4(biasedPos, 1.0);
  vec3 proj = ls.xyz / max(ls.w, 1e-5) * 0.5 + 0.5;
  if (proj.x < 0.0 || proj.x > 1.0 || proj.y < 0.0 || proj.y > 1.0 || proj.z > 1.0) {
    return 1.0;
  }

  vec4 rect = uCascadeAtlasRects[idx];
  vec2 atlasUv = rect.xy + proj.xy * rect.zw;
  float cmpDepth = proj.z - slopeBias;

#ifdef VRP_SHADOWS_PCSS
  return vrpSampleShadowPcss(shadowAtlas, atlasUv, cmpDepth, uShadowAtlasTexelSize, rect, uShadowPcssLightRadius);
#else
  return vrpSampleShadowPcf3x3(shadowAtlas, atlasUv, cmpDepth, uShadowAtlasTexelSize, rect);
#endif
#endif
}
