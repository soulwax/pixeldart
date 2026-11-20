#version 300 es
layout(location=0) in vec3 aPosition;
layout(location=4) in vec3 aUvMat;
layout(location=7) in vec4 aInstanceModel0;
layout(location=8) in vec4 aInstanceModel1;
layout(location=9) in vec4 aInstanceModel2;
layout(location=10) in vec4 aInstanceModel3;
layout(std140) uniform SkinBlock {
  mat4 uJointMatrices[256];
};
uniform mat4 uLightViewProjection;
uniform mat4 uModel;
uniform float uUseInstances;
uniform float uSkinEnabled;
uniform int uJointCount;
out highp vec2 vUv;
void main(){
  mat4 model=uModel;
  if(uUseInstances>0.5){
    model=mat4(aInstanceModel0,aInstanceModel1,aInstanceModel2,aInstanceModel3);
  }
  vec3 inPos=aPosition;
  if(uSkinEnabled>0.5 && uJointCount>0){
    mat4 skinMat=uJointMatrices[0];
    inPos=(skinMat*vec4(inPos,1.0)).xyz;
  }
  vUv=aUvMat.xy;
  gl_Position=uLightViewProjection*model*vec4(inPos,1.0);
}
