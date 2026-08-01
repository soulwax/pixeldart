#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uSource;
uniform vec2 uTexelStep;
out vec4 oColor;

const float WEIGHTS[5]=float[5](0.227027,0.1945946,0.1216216,0.054054,0.016216);

void main(){
  vec3 sum=texture(uSource,vUv).rgb*WEIGHTS[0];
  for(int i=1;i<5;i++){
    vec2 offset=uTexelStep*float(i);
    sum+=texture(uSource,vUv+offset).rgb*WEIGHTS[i];
    sum+=texture(uSource,vUv-offset).rgb*WEIGHTS[i];
  }
  oColor=vec4(sum,1.0);
}
