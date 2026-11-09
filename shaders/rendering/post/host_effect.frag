#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D PD_INPUT;
#define pdSource PD_INPUT
uniform float pdTime;
uniform vec2 pdResolution;
out vec4 oColor;
// ShaderOverride.effect fills in PD_INPUT and the marker below with the
// host's uniform declarations and its effect() function.
// PD_HOST_CODE
void main(){
  oColor=effect(texture(pdSource,vUv),vUv);
}
