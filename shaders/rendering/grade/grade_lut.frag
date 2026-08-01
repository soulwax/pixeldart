#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uScene;
uniform sampler2D uLut;
uniform float uLutSize;
uniform float uStrength;
out vec4 oColor;

// §5.3's "identity LUT" baseline resource and this shader's actual grade LUT
// are both just textures in this same unwrapped-3D-LUT layout (width =
// size*size, height = size, blue index selects a size*size horizontal
// slice) — there is nothing identity-specific about the sampling path
// itself, only about what a given LUT texture's texels happen to encode.
vec3 sampleLut(vec3 color){
  float size=uLutSize;
  float maxIndex=size-1.0;
  vec3 scaled=clamp(color,0.0,1.0)*maxIndex;
  float bLow=floor(scaled.b);
  float bHigh=min(bLow+1.0,maxIndex);
  float bFrac=scaled.b-bLow;
  vec2 texel=vec2(1.0/(size*size),1.0/size);
  vec2 rg=vec2(scaled.r+0.5,scaled.g+0.5);
  vec2 uvLow=vec2((bLow*size+rg.x)*texel.x,rg.y*texel.y);
  vec2 uvHigh=vec2((bHigh*size+rg.x)*texel.x,rg.y*texel.y);
  vec3 colorLow=texture(uLut,uvLow).rgb;
  vec3 colorHigh=texture(uLut,uvHigh).rgb;
  return mix(colorLow,colorHigh,bFrac);
}

void main(){
  vec3 scene=texture(uScene,vUv).rgb;
  vec3 graded=sampleLut(scene);
  oColor=vec4(mix(scene,graded,uStrength),1.0);
}
