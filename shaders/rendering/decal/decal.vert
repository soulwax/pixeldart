#version 300 es
layout(location=0) in vec3 aPosition;
layout(location=4) in vec3 aUvMat;
uniform mat4 uViewProjection;
uniform mat4 uModel;
out highp vec2 vUv;
void main(){
  vUv=aUvMat.xy;
  gl_Position=uViewProjection*uModel*vec4(aPosition,1.0);
}
