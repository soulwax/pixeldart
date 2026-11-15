#version 300 es
layout(location=0) in vec3 aPosition;
layout(location=1) in vec3 aNormal;
layout(location=2) in vec4 aColor;
layout(location=3) in float aAlpha;
layout(location=4) in vec3 aUvMat;
uniform mat4 uViewProjection;
uniform mat4 uModel;
uniform mat4 uNormalMatrix;
uniform mat4 uInstanceModels[16];
uniform mat4 uInstanceNormalMatrices[16];
uniform float uUseInstances;
uniform float uVertexSnapGrid;
out vec4 vColor;
out vec3 vNormal;
void main(){
  mat4 model=uModel;
  mat4 normalMatrix=uNormalMatrix;
  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];normalMatrix=uInstanceNormalMatrices[gl_InstanceID];}
  vColor=vec4(aColor.rgb,aAlpha);
  vNormal=mat3(normalMatrix)*aNormal;
  vec4 clip=uViewProjection*model*vec4(aPosition,1.0);
  if(uVertexSnapGrid>0.0){
    vec2 ndc=clip.xy/clip.w;
    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;
    clip.xy=ndc*clip.w;
  }
  gl_Position=clip;
}
