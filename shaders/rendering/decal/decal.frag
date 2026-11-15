#version 300 es
precision highp float;
in highp vec2 vUv;
uniform sampler2D uAlbedo;
uniform float uOpacity;
uniform vec4 uDecalTint;
layout(location=0) out vec4 oColor;
layout(location=1) out vec4 oGlow;
void main(){
  vec4 tex=texture(uAlbedo,vUv);
  vec4 color=tex*uDecalTint;
  float alpha=color.a*uOpacity;
  if(alpha<0.01) discard;
  oColor=vec4(color.rgb,alpha);
  oGlow=vec4(0.0);
}
