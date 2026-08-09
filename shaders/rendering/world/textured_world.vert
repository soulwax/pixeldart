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
out vec4 vColor;
out vec3 vNormal;
out vec2 vUv;
void main(){
  mat4 model=uModel;
  mat4 normalMatrix=uNormalMatrix;
  if(uUseInstances>0.5){model=uInstanceModels[gl_InstanceID];normalMatrix=uInstanceNormalMatrices[gl_InstanceID];}
  vColor=vec4(aColor.rgb,aAlpha);
  vNormal=mat3(normalMatrix)*aNormal;
  vUv=aUvMat.xy;
  gl_Position=uViewProjection*model*vec4(aPosition,1.0);
}
