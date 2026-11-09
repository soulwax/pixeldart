#version 300 es
precision highp float;
in vec2 vUv;
in vec4 vColor;
in vec3 vParams;
uniform sampler2D PD_INPUT;
#define pdSource PD_INPUT
uniform float uLinearize;
uniform float uMultiply;
uniform float pdTime;
uniform vec2 pdResolution;
layout(location=0) out vec4 oColor;
layout(location=1) out vec4 oGlow;

vec3 srgbToLinear(vec3 c){
  vec3 cutoff=step(vec3(.04045),c);
  vec3 low=c/12.92;
  vec3 high=pow((c+.055)/1.055,vec3(2.4));
  return mix(low,high,cutoff);
}
// ShaderOverride.effect fills in PD_INPUT and the marker below with the
// host's uniform declarations and its effect() function.
// PD_HOST_CODE
void main(){
  vec4 tex=texture(pdSource,vUv);
  float additive=vParams.x;
  float glow=vParams.y;
  float flash=vParams.z;
  vec4 shaded=effect(vec4(mix(tex.rgb*vColor.rgb,vColor.rgb,flash),tex.a*vColor.a),vUv);
  vec3 rgb=shaded.rgb;
  float a=shaded.a;
  if(uLinearize>.5) rgb=srgbToLinear(rgb);
  if(uMultiply>.5){
    oColor=vec4(mix(vec3(1.),rgb,a),1.);
    oGlow=oColor;
    return;
  }
  vec3 premultiplied=rgb*a;
  float coverage=a*(1.-additive);
  oColor=vec4(premultiplied,coverage);
  oGlow=vec4(premultiplied*glow,coverage);
}
