#version 300 es
layout(location=0) in vec3 aPosition;
layout(location=1) in vec3 aNormal;
layout(location=2) in vec4 aColor;
layout(location=3) in float aAlpha;
layout(location=4) in vec3 aUvMat;
layout(location=5) in vec4 aTangent;
layout(location=6) in vec2 aUv1;
layout(location=7) in vec4 aInstanceModel0;
layout(location=8) in vec4 aInstanceModel1;
layout(location=9) in vec4 aInstanceModel2;
layout(location=10) in vec4 aInstanceModel3;
layout(location=11) in vec4 aInstanceNormal0;
layout(location=12) in vec4 aInstanceNormal1;
layout(location=13) in vec4 aInstanceNormal2;
layout(location=14) in vec4 aInstanceNormal3;

layout(std140) uniform FrameBlock {
  mat4 uFrameViewProjection;
  mat4 uFrameView;
  vec4 uFrameCameraPosTime;
  vec4 uFrameExposureParams;
};

layout(std140) uniform SkinBlock {
  mat4 uJointMatrices[256];
};

uniform float uUseFrameUbo;
uniform mat4 uViewProjection;
uniform mat4 uView;
uniform mat4 uModel;
uniform mat4 uNormalMatrix;
uniform float uUseInstances;
uniform float uVertexSnapGrid;
uniform float uAffineWarpStrength;
uniform float uSkinEnabled;
uniform int uJointCount;

out vec4 vColor;
out vec3 vNormal;
out highp vec2 vUv;
out highp float vUvW;
out highp vec2 vUv1;
out vec3 vWorldPos;
out vec4 vTangent;
out float vViewDepth;

void main() {
  mat4 viewProj = uUseFrameUbo > 0.5 ? uFrameViewProjection : uViewProjection;
  mat4 viewMat = uUseFrameUbo > 0.5 ? uFrameView : uView;

  mat4 model = uModel;
  mat4 normalMatrix = uNormalMatrix;
#ifdef VRP_INSTANCED
  model = mat4(aInstanceModel0, aInstanceModel1, aInstanceModel2, aInstanceModel3);
  normalMatrix = mat4(aInstanceNormal0, aInstanceNormal1, aInstanceNormal2, aInstanceNormal3);
#else
  if (uUseInstances > 0.5) {
    model = mat4(aInstanceModel0, aInstanceModel1, aInstanceModel2, aInstanceModel3);
    normalMatrix = mat4(aInstanceNormal0, aInstanceNormal1, aInstanceNormal2, aInstanceNormal3);
  }
#endif

  vec3 inPos = aPosition;
  vec3 inNorm = aNormal;
#ifdef VRP_SKINNED
  if (uJointCount > 0) {
    mat4 skinMat = uJointMatrices[0];
    inPos = (skinMat * vec4(inPos, 1.0)).xyz;
    inNorm = mat3(skinMat) * inNorm;
  }
#else
  if (uSkinEnabled > 0.5 && uJointCount > 0) {
    mat4 skinMat = uJointMatrices[0];
    inPos = (skinMat * vec4(inPos, 1.0)).xyz;
    inNorm = mat3(skinMat) * inNorm;
  }
#endif

  vColor = vec4(aColor.rgb, aAlpha);
  vNormal = mat3(normalMatrix) * inNorm;
  vec4 worldPos = model * vec4(inPos, 1.0);
  vWorldPos = worldPos.xyz;
  vTangent = vec4(mat3(normalMatrix) * aTangent.xyz, aTangent.w);
  vViewDepth = -(viewMat * worldPos).z;

  vec4 clip = viewProj * worldPos;
#ifdef VRP_QUANTIZED
  if (uVertexSnapGrid > 0.0) {
    vec2 ndc = clip.xy / max(clip.w, 1e-5);
    ndc = floor(ndc / uVertexSnapGrid + 0.5) * uVertexSnapGrid;
    clip.xy = ndc * clip.w;
  }
#endif
  gl_Position = clip;

#ifdef VRP_PS1_AFFINE
  float affineW = mix(1.0, clip.w, uAffineWarpStrength);
#else
  float affineW = 1.0;
#endif
  vUv = aUvMat.xy * affineW;
  vUvW = affineW;
  vUv1 = aUv1;
}
