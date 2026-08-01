#version 300 es
precision highp float;
in vec4 vColor;
in vec3 vNormal;
uniform vec3 uLightDir;
uniform vec3 uAmbientColor;
uniform float uAmbientIntensity;
out vec4 oColor;
void main(){
  vec3 n=normalize(vNormal);
  float ndotl=max(dot(n,normalize(uLightDir)),0.0);
  vec3 lit=vColor.rgb*clamp(uAmbientColor*uAmbientIntensity+vec3(ndotl),0.0,1.0);
  oColor=vec4(lit,vColor.a);
}
