#version 300 es
layout(location=0) in vec3 aPosition;
layout(location=1) in vec3 aNormal;
layout(location=2) in vec4 aColor;
layout(location=3) in float aAlpha;
layout(location=4) in vec3 aUvMat;
uniform mat4 uViewProjection;
uniform mat4 uModel;
uniform mat4 uNormalMatrix;
out vec4 vColor;
out vec3 vNormal;
void main(){
  vColor=vec4(aColor.rgb,aAlpha);
  vNormal=mat3(uNormalMatrix)*aNormal;
  gl_Position=uViewProjection*uModel*vec4(aPosition,1.0);
}
