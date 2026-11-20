#version 300 es
layout(location=0) in vec3 aPosition;
layout(location=4) in vec3 aUvMat;
layout(location=7) in vec4 aInstanceModel0;
layout(location=8) in vec4 aInstanceModel1;
layout(location=9) in vec4 aInstanceModel2;
layout(location=10) in vec4 aInstanceModel3;
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
uniform mat4 uModel;
uniform float uUseInstances;
uniform float uVertexSnapGrid;
uniform float uAffineWarpStrength;
uniform float uSkinEnabled;
uniform int uJointCount;
out highp vec2 vUv;
out highp float vUvW;
void main(){
  mat4 viewProj=uUseFrameUbo>0.5?uFrameViewProjection:uViewProjection;
  mat4 model=uModel;
  if(uUseInstances>0.5){
    model=mat4(aInstanceModel0,aInstanceModel1,aInstanceModel2,aInstanceModel3);
  }
  vec3 inPos=aPosition;
  if(uSkinEnabled>0.5 && uJointCount>0){
    mat4 skinMat=uJointMatrices[0];
    inPos=(skinMat*vec4(inPos,1.0)).xyz;
  }
  vec4 clip=viewProj*model*vec4(inPos,1.0);
  if(uVertexSnapGrid>0.0){
    vec2 ndc=clip.xy/clip.w;
    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;
    clip.xy=ndc*clip.w;
  }
  gl_Position=clip;
  float affineW=mix(1.0,clip.w,uAffineWarpStrength);
  vUv=aUvMat.xy*affineW;
  vUvW=affineW;
}
