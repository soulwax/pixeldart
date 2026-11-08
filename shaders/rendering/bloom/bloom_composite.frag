#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uBloom;
uniform float uBloomStrength;
out vec4 oColor;

void main(){
  oColor=vec4(texture(uBloom,vUv).rgb*uBloomStrength,1.0);
}
