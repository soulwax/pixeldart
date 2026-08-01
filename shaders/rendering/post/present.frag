#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uTex;
out vec4 oColor;
void main(){
  oColor=texture(uTex,vUv);
}
