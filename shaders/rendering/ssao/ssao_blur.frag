#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uSsaoRaw;
uniform sampler2D uSceneDepth;
uniform vec2 uTexelSize;
uniform float uNear;
uniform float uFar;
out vec4 oColor;

float linearDepth(float raw){
  float ndc=raw*2.0-1.0;
  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));
}

// §8.5: "uses a depth-aware bilateral blur rather than smearing across
// silhouettes" — a plain box blur would bleed occlusion from a near object
// onto a far background behind it (or vice versa) whenever they share
// screen-space pixels near a silhouette edge; weighting each tap by how
// close its depth is to the center tap's depth is what keeps the blur
// confined to one surface at a time.
void main(){
  float centerDepth=linearDepth(texture(uSceneDepth,vUv).r);
  float sum=0.0;
  float weightSum=0.0;
  for(int y=-2;y<=2;y++){
    for(int x=-2;x<=2;x++){
      vec2 offset=vec2(float(x),float(y))*uTexelSize;
      vec2 sampleUv=vUv+offset;
      float sampleDepth=linearDepth(texture(uSceneDepth,sampleUv).r);
      float depthWeight=1.0/(1.0+abs(sampleDepth-centerDepth)*4.0);
      sum+=texture(uSsaoRaw,sampleUv).r*depthWeight;
      weightSum+=depthWeight;
    }
  }
  float blurred=sum/max(weightSum,0.0001);
  oColor=vec4(vec3(blurred),1.0);
}
