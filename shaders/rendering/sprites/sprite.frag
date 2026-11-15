#version 300 es
precision highp float;
in vec2 vUv;
in vec4 vColor;
in vec3 vParams;
in float vViewDepth;
uniform sampler2D uTex;
uniform sampler2D uSceneDepth;
uniform float uLinearize;
uniform float uMultiply;
uniform float uSoftParticlesEnabled;
uniform float uSoftParticleDistance;
uniform float uNear;
uniform float uFar;
uniform vec2 uViewportResolution;
layout(location=0) out vec4 oColor;
layout(location=1) out vec4 oGlow;

vec3 srgbToLinear(vec3 c){
  vec3 cutoff=step(vec3(.04045),c);
  vec3 low=c/12.92;
  vec3 high=pow((c+.055)/1.055,vec3(2.4));
  return mix(low,high,cutoff);
}

float linearizeDepth(float d){
  float n=uNear>0.0?uNear:0.1;
  float f=uFar>0.0?uFar:100.0;
  return (n*f)/(f-d*(f-n));
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
  if(uSoftParticlesEnabled>0.5 && uSoftParticleDistance>0.0 && uViewportResolution.x>0.0){
    vec2 screenUv=gl_FragCoord.xy/uViewportResolution;
    float sceneDepth=texture(uSceneDepth,screenUv).r;
    float sceneZ=linearizeDepth(sceneDepth);
    float diff=sceneZ-vViewDepth;
    float softFactor=clamp(diff/uSoftParticleDistance,0.0,1.0);
    premultiplied*=softFactor;
    coverage*=softFactor;
  }
  oColor=vec4(premultiplied,coverage);
  oGlow=vec4(premultiplied*glow,coverage);
}
