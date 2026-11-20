#version 300 es
layout(location=0) in vec3 aPosition;
layout(location=1) in vec3 aNormal;
layout(location=2) in vec4 aColor;
layout(location=3) in float aAlpha;
layout(location=4) in vec3 aUvMat;
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
uniform float uUseFrameUbo;
uniform mat4 uViewProjection;
uniform mat4 uModel;
uniform mat4 uNormalMatrix;
uniform float uUseInstances;
uniform float uVertexSnapGrid;
out vec4 vColor;
out vec3 vNormal;
void main(){
  mat4 viewProj=uUseFrameUbo>0.5?uFrameViewProjection:uViewProjection;
  mat4 model=uModel;
  mat4 normalMatrix=uNormalMatrix;
  if(uUseInstances>0.5){
    model=mat4(aInstanceModel0,aInstanceModel1,aInstanceModel2,aInstanceModel3);
    normalMatrix=mat4(aInstanceNormal0,aInstanceNormal1,aInstanceNormal2,aInstanceNormal3);
  }
  vColor=vec4(aColor.rgb,aAlpha);
  vNormal=mat3(normalMatrix)*aNormal;
  vec4 clip=viewProj*model*vec4(aPosition,1.0);
  if(uVertexSnapGrid>0.0){
    vec2 ndc=clip.xy/clip.w;
    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;
    clip.xy=ndc*clip.w;
  }
  gl_Position=clip;
}
