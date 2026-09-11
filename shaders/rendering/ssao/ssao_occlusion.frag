#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uSceneDepth;
uniform float uNear;
uniform float uFar;
uniform float uProjScaleX;
uniform float uProjScaleY;
uniform float uRadius;
uniform float uStrength;
out vec4 oColor;

const int KERNEL_SIZE=16;
const vec3 KERNEL[16]=vec3[16](
  vec3( 0.35, 0.23, 0.45),
  vec3(-0.28, 0.41, 0.32),
  vec3( 0.18,-0.36, 0.55),
  vec3(-0.42,-0.19, 0.28),
  vec3( 0.51, 0.08, 0.18),
  vec3(-0.11, 0.53, 0.16),
  vec3( 0.07,-0.48, 0.38),
  vec3(-0.33,-0.31, 0.48),
  vec3( 0.22, 0.14, 0.72),
  vec3(-0.18,-0.25, 0.65),
  vec3( 0.42,-0.28, 0.35),
  vec3(-0.36, 0.32, 0.52),
  vec3( 0.15, 0.58, 0.25),
  vec3(-0.48, 0.12, 0.39),
  vec3( 0.28,-0.52, 0.22),
  vec3(-0.24,-0.42, 0.58)
);

float linearDepth(float raw){
  float ndc=raw*2.0-1.0;
  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));
}

vec3 viewPosAt(vec2 uv){
  float viewZ=-linearDepth(texture(uSceneDepth,uv).r);
  vec2 ndc=uv*2.0-1.0;
  float viewX=ndc.x*(-viewZ)/uProjScaleX;
  float viewY=ndc.y*(-viewZ)/uProjScaleY;
  return vec3(viewX,viewY,viewZ);
}

// Pinned per-pixel kernel rotation — a deterministic hash of screen
// position, not per-frame randomness, matching §8.5's "rotates a small
// kernel from pinned blue noise" without the extra machinery of an actual
// noise texture: the rotation angle is stable across frames for a given
// pixel, which is what "pinned" requires (temporal stability), while still
// varying spatially enough to break up banding between neighboring samples.
float pinnedRotation(vec2 fragCoord){
  return fract(sin(dot(fragCoord,vec2(12.9898,78.233)))*43758.5453)*6.2831853;
}

void main(){
  float rawDepth=texture(uSceneDepth,vUv).r;
  if(rawDepth>=0.9999){
    oColor=vec4(1.0);
    return;
  }
  vec3 originView=viewPosAt(vUv);
  // Screen-space derivatives reconstruct a per-fragment normal from
  // neighboring depth samples alone — no G-buffer normal attachment exists
  // (deferred; see depth_prepass.dart's doc comment), which is sufficient
  // for a chunky/stylized AO term rather than a precision-critical one.
  vec3 normalView=normalize(cross(dFdx(originView),dFdy(originView)));

  // Rotates each kernel sample's tangent-plane (x,y) offset in place, before
  // it's transformed into view space by tbn below — this is what actually
  // varies the kernel per pixel; rotating the already-reprojected screen UV
  // afterward would rotate around the wrong origin and misalign every
  // sample from the surface it's meant to test.
  float angle=pinnedRotation(gl_FragCoord.xy);
  float ca=cos(angle);
  float sa=sin(angle);
  mat2 rot=mat2(ca,sa,-sa,ca);

  vec3 up=abs(normalView.z)<0.99?vec3(0.0,0.0,1.0):vec3(1.0,0.0,0.0);
  vec3 tangent=normalize(cross(up,normalView));
  vec3 bitangent=cross(normalView,tangent);
  mat3 tbn=mat3(tangent,bitangent,normalView);

  float occlusion=0.0;
  for(int i=0;i<KERNEL_SIZE;i++){
    vec3 kernelSample=KERNEL[i];
    kernelSample.xy=rot*kernelSample.xy;
    vec3 samplePos=originView+tbn*kernelSample*uRadius;
    // Project the sample's view-space position back to screen UV using the
    // same scale factors used to reconstruct it, inverted.
    vec2 sampleUv=vec2(
      samplePos.x*uProjScaleX/(-samplePos.z),
      samplePos.y*uProjScaleY/(-samplePos.z)
    );
    sampleUv=sampleUv*0.5+0.5;
    if(sampleUv.x<0.0||sampleUv.x>1.0||sampleUv.y<0.0||sampleUv.y>1.0){
      continue;
    }
    vec3 occluderView=viewPosAt(sampleUv);
    float rangeCheck=smoothstep(0.0,1.0,uRadius/max(abs(originView.z-occluderView.z),0.0001));
    vec3 toOccluder=occluderView-originView;
    float angleWeight=max(dot(normalView,normalize(toOccluder)),0.0);
    float bias=max(0.015,abs(originView.z)*0.001);
    occlusion+=(occluderView.z>=samplePos.z+bias?1.0:0.0)*rangeCheck*(0.35+0.65*angleWeight);
  }
  float ao=1.0-clamp((occlusion/float(KERNEL_SIZE))*uStrength,0.0,1.0);
  oColor=vec4(vec3(ao),1.0);
}
