#version 300 es
precision highp float;
in vec2 vUv;
in vec4 vColor;
in vec3 vParams;
uniform sampler2D uTex;
uniform float uLinearize;
uniform float uMultiply;
layout(location=0) out vec4 oColor;
layout(location=1) out vec4 oGlow;

vec3 srgbToLinear(vec3 c){
  vec3 cutoff=step(vec3(.04045),c);
  vec3 low=c/12.92;
  vec3 high=pow((c+.055)/1.055,vec3(2.4));
  return mix(low,high,cutoff);
}

void main(){
  vec4 tex=texture(uTex,vUv);
  float additive=vParams.x;
  float glow=vParams.y;
  float flash=vParams.z;
  vec3 rgb=mix(tex.rgb*vColor.rgb,vColor.rgb,flash);
  float a=tex.a*vColor.a;
  if(uLinearize>.5) rgb=srgbToLinear(rgb);
  if(uMultiply>.5){
    // Blended as dst*src: full coverage multiplies, no coverage leaves dst.
    oColor=vec4(mix(vec3(1.),rgb,a),1.);
    oGlow=oColor;
    return;
  }
  // Premultiplied: output alpha 0 adds light, 1 covers what is behind.
  vec3 premultiplied=rgb*a;
  float coverage=a*(1.-additive);
  oColor=vec4(premultiplied,coverage);
  oGlow=vec4(premultiplied*glow,coverage);
}
