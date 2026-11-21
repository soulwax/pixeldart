#version 300 es
precision highp float;

#include "include/common_math.glsl"
#include "include/lit_common.glsl"
#include "include/brdf.glsl"
#include "include/surface.glsl"
#include "include/clustered_lights.glsl"
#include "include/shadows.glsl"

in vec4 vColor;
in vec3 vNormal;
in highp vec2 vUv;
in highp float vUvW;
in highp vec2 vUv1;
in vec3 vWorldPos;
in vec4 vTangent;
in float vViewDepth;

uniform sampler2D uAlbedo;
uniform sampler2D uNormalMap;
uniform sampler2D uOrmMap;
uniform sampler2D uEmissiveMap;
uniform sampler2D uLightmap;
uniform sampler2D uShadowMap;

uniform vec3 uCameraPosition;
uniform vec3 uDirectionalDirection;
uniform vec3 uDirectionalColor;
uniform float uDirectionalIntensity;
uniform vec3 uAmbientColor;
uniform float uAmbientIntensity;
uniform vec3 uMaterialTint;
uniform vec4 uUvScaleOffset;
uniform float uEmissiveStrength;
uniform float uNormalStrength;
uniform float uRoughness;
uniform float uMetallic;
uniform float uOcclusionStrength;
uniform float uClearcoatStrength;
uniform float uClearcoatRoughness;
uniform float uLightmapIntensity;
uniform float uAlphaCutoff;
uniform vec3 uFogColor;
uniform float uFogStart;
uniform float uFogEnd;
uniform float uFogDensity;
uniform int uDebugViewMode;

layout(location=0) out vec4 oColor;
layout(location=1) out vec4 oGlow;

void main() {
  vec2 uv = (vUv / max(vUvW, 1e-5)) * uUvScaleOffset.xy + uUvScaleOffset.zw;
  VrpSurface s = vrpEvaluateSurface(
    uv,
    vColor,
    vNormal,
    vTangent,
    uAlbedo,
    uNormalMap,
    uOrmMap,
    uEmissiveMap,
    uMaterialTint,
    uNormalStrength,
    uRoughness,
    uMetallic,
    uOcclusionStrength,
    uEmissiveStrength,
    uClearcoatStrength,
    uClearcoatRoughness,
    uAlphaCutoff
  );

#ifdef VRP_UNLIT
  vec3 outColor = s.albedo + s.emissive;
  outColor = vrpApplyFog(outColor, vViewDepth, uFogColor, uFogStart, uFogEnd, uFogDensity);
  oColor = vec4(outColor, s.alpha);
  oGlow = vec4(s.emissive, 1.0);
  return;
#endif

  vec3 V = normalize(uCameraPosition - vWorldPos);
  vec3 N = s.normal;
  vec3 dirL = normalize(uDirectionalDirection);

  int cascadeIndex = 0;
  float dirShadow = vrpEvaluateDirectionalCsm(
    uShadowMap, vWorldPos, N, dirL, vViewDepth, cascadeIndex
  );

  vec3 direct = vrpEvaluateDirectBRDF(
    N, V, dirL, s.albedo, s.metallic, s.roughness, s.clearcoat, s.clearcoatRoughness
  ) * uDirectionalColor * uDirectionalIntensity * dirShadow;

  int clusterLightCount = 0;
  vec3 clustered = vrpEvaluateClusteredLights(
    gl_FragCoord.xy, vViewDepth, vWorldPos, N, V, s, clusterLightCount
  );

  vec3 ambient = uAmbientColor * uAmbientIntensity * s.albedo * s.ao;
#ifdef VRP_LIGHTMAP
  ambient += texture(uLightmap, vUv1).rgb * uLightmapIntensity * s.albedo;
#endif

  vec3 color = ambient + direct + clustered + s.emissive;
  color = vrpApplyFog(color, vViewDepth, uFogColor, uFogStart, uFogEnd, uFogDensity);

  // Debug visualization modes: 1=albedo, 2=normals, 3=roughness, 4=light heatmap, 5=cascades
  if (uDebugViewMode == 1) {
    color = s.albedo;
  } else if (uDebugViewMode == 2) {
    color = N * 0.5 + 0.5;
  } else if (uDebugViewMode == 3) {
    color = vec3(s.roughness, s.metallic, s.ao);
  } else if (uDebugViewMode == 4) {
    color = vrpClusterHeatmapColor(clusterLightCount);
  } else if (uDebugViewMode == 5) {
    vec3 cColors[4];
    cColors[0] = vec3(0.2, 0.9, 0.3);
    cColors[1] = vec3(0.95, 0.85, 0.15);
    cColors[2] = vec3(0.95, 0.45, 0.15);
    cColors[3] = vec3(0.9, 0.15, 0.25);
    color = mix(color, cColors[clamp(cascadeIndex, 0, 3)], 0.5);
  }

#ifndef VRP_HDR
  // Fallback in-shader neutral tonemap when rendering to RGBA8 target.
  color = color / (color + vec3(1.0));
#endif

  oColor = vec4(color, s.alpha);
  oGlow = vec4(s.emissive, 1.0);
}
