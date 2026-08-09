#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uTex;
uniform float uExposure;
uniform float uVignette;
uniform float uGrain;
uniform float uOutputEncoding;
uniform float uToneMap;
out vec4 oColor;

float hash(vec2 p){
  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);
}

vec3 reinhardToneMap(vec3 color){
  return color/(vec3(1.)+color);
}

vec3 linearToSrgb(vec3 color){
  vec3 cutoff=step(vec3(.0031308),color);
  vec3 low=color*12.92;
  vec3 high=1.055*pow(max(color,vec3(0.)),vec3(1./2.4))-.055;
  return mix(low,high,cutoff);
}

void main(){
  vec4 source=texture(uTex,vUv);
  // Exposure operates in scene-linear space; tone mapping prevents HDR
  // highlights from clipping before the selected output transfer function.
  vec3 color=max(source.rgb,vec3(0.))*max(uExposure,0.);
  color=mix(color,reinhardToneMap(color),clamp(uToneMap,0.,1.));
  float edge=distance(vUv,vec2(.5));
  float vignette=smoothstep(.35,.78,edge);
  color*=1.-clamp(uVignette,0.,1.)*vignette;
  if(uOutputEncoding>.5) color=linearToSrgb(max(color,vec3(0.)));
  // A stable screen-space grain keeps captures reproducible for a fixed
  // viewport while still giving the dark gothic presentation a fine film
  // texture. It is deliberately tiny and never changes alpha.
  color+=((hash(gl_FragCoord.xy)-.5)*.06)*max(uGrain,0.);
  oColor=vec4(clamp(color,0.,1.),source.a);
}
