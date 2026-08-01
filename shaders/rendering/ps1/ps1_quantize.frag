#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uScene;
uniform float uQuantizationBits;
uniform float uDitherStrength;
out vec4 oColor;

const float BAYER4X4[16]=float[16](
  0.0,8.0,2.0,10.0,
  12.0,4.0,14.0,6.0,
  3.0,11.0,1.0,9.0,
  15.0,7.0,13.0,5.0
);

float bayerValue(vec2 fragCoord){
  int x=int(mod(fragCoord.x,4.0));
  int y=int(mod(fragCoord.y,4.0));
  return BAYER4X4[y*4+x]/16.0;
}

// §6.2's "quantization/dither is an explicit composite after LUT grade":
// an ordered (Bayer 4x4) dither offset, scaled to one quantization step, is
// added before rounding to uQuantizationBits levels per channel — this is
// what breaks a hard quantization boundary into a dithered gradient instead
// of a flat color band. uQuantizationBits==8 (RGBA8's own native precision)
// with uDitherStrength==0 round-trips the source exactly: no dither offset
// is added, and floor(x*255+0.5)/255 returns an already-8-bit value
// unchanged.
void main(){
  vec3 scene=texture(uScene,vUv).rgb;
  float levels=pow(2.0,uQuantizationBits)-1.0;
  float dither=(bayerValue(gl_FragCoord.xy)-0.5)*uDitherStrength/levels;
  vec3 dithered=clamp(scene+dither,0.0,1.0);
  vec3 quantized=floor(dithered*levels+0.5)/levels;
  oColor=vec4(quantized,1.0);
}
