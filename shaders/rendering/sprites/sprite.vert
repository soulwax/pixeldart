#version 300 es
precision highp float;
layout(location=0) in vec2 aCorner;
layout(location=1) in vec4 aAxes;
layout(location=2) in vec3 aOrigin;
layout(location=3) in vec4 aUv;
layout(location=4) in vec4 aColor;
layout(location=5) in vec4 aParams;
uniform mat4 uViewProjection;
out vec2 vUv;
out vec4 vColor;
out vec3 vParams;

void main(){
  vec2 world=aOrigin.xy+aAxes.xy*aCorner.x+aAxes.zw*aCorner.y;
  vUv=mix(aUv.xy,aUv.zw,aCorner);
  vColor=aColor;
  vParams=aParams.xyz;
  gl_Position=uViewProjection*vec4(world,aOrigin.z,1.);
}
