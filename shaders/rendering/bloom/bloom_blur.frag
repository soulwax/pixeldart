#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uSource;
uniform vec2 uTexelStep;
out vec4 oColor;

const float WEIGHTS[7]=float[7](
  0.167465,0.153582,0.118331,0.076665,0.041582,0.018907,0.007203
);

void main(){
  vec3 sum=texture(uSource,vUv).rgb*WEIGHTS[0];
  for(int i=1;i<7;i++){
    vec2 offset=uTexelStep*float(i);
    sum+=texture(uSource,vUv+offset).rgb*WEIGHTS[i];
    sum+=texture(uSource,vUv-offset).rgb*WEIGHTS[i];
  }
  oColor=vec4(sum,1.0);
}
