#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uSharp;
uniform sampler2D uBlurred;
uniform sampler2D uSceneDepth;
uniform float uNear;
uniform float uFar;
uniform float uFocusDistance;
uniform float uFocusRange;
uniform float uStrength;
out vec4 oColor;

float linearDepth(float raw){
  float ndc=raw*2.0-1.0;
  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));
}

// Circle-of-confusion is a simple linear ramp from the focus distance
// outward (front and back treated the same — no separate near/far falloff
// curve), clamped to [0,1] and scaled by uStrength so
// PostProcessState.depthOfFieldStrength == 0 is a true no-op (coc == 0
// everywhere, oColor == the sharp source exactly).
void main(){
  float depth=linearDepth(texture(uSceneDepth,vUv).r);
  float coc=clamp(abs(depth-uFocusDistance)/max(uFocusRange,0.0001),0.0,1.0)*uStrength;
  vec3 sharp=texture(uSharp,vUv).rgb;
  vec3 blurred=texture(uBlurred,vUv).rgb;
  oColor=vec4(mix(sharp,blurred,coc),1.0);
}
