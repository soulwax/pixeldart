#version 300 es
precision highp float;
in vec4 vColor;
in vec3 vNormal;
uniform vec3 uLightDir;
uniform vec3 uAmbientColor;
uniform float uAmbientIntensity;
uniform float uAmbientLightScale;
uniform float uDirectLightScale;
out vec4 oColor;
void main(){
  // A double-sided surface seen from behind faces the other way; single-
  // sided materials cull back faces, so this only affects double-sided ones.
  vec3 n=normalize(vNormal)*(gl_FrontFacing?1.0:-1.0);
  float ndotl=max(dot(n,normalize(uLightDir)),0.0);
  vec3 lit=vColor.rgb*clamp(uAmbientColor*uAmbientIntensity*uAmbientLightScale+
    vec3(ndotl)*uDirectLightScale,0.0,1.0);
  oColor=vec4(lit,vColor.a);
}
