#version 300 es
layout(location=0) in vec3 aPosition;
layout(location=1) in vec3 aNormal;
layout(location=2) in vec4 aColor;
layout(location=3) in float aAlpha;
layout(location=4) in vec3 aUvMat;
uniform mat4 uViewProjection;
uniform mat4 uView;
uniform mat4 uModel;
uniform mat4 uNormalMatrix;
uniform mat4 uLightViewProjection;
uniform float uVertexSnapGrid;
uniform float uAffineWarpStrength;
out vec4 vColor;
out vec3 vNormal;
out highp vec2 vUv;
out highp float vUvW;
out vec4 vLightSpacePos;
out vec3 vWorldPos;
out float vViewDepth;
void main(){
  vColor=vec4(aColor.rgb,aAlpha);
  vNormal=mat3(uNormalMatrix)*aNormal;
  vec4 worldPos=uModel*vec4(aPosition,1.0);
  vWorldPos=worldPos.xyz;
  vLightSpacePos=uLightViewProjection*worldPos;
  // RV-09 rung 5's fog: the same "linear view depth" convention SSAO/DOF
  // already reconstruct from a depth texture, computed directly here
  // instead — this pass rasterizes the actual geometry, so there is a true
  // view-space Z per-vertex already, with no texture round-trip needed.
  vViewDepth=-(uView*worldPos).z;
  vec4 clip=uViewProjection*worldPos;
  // RV-09 rung 3's PS1 profile: snaps clip-space xy to a fixed grid before
  // the perspective divide, emulating the fixed-point vertex transform
  // precision loss that gives PS1 geometry its characteristic wobble as it
  // moves. uVertexSnapGrid==0 skips the branch entirely, so the default/
  // safe path is bit-for-bit unchanged from before this rung.
  if(uVertexSnapGrid>0.0){
    vec2 ndc=clip.xy/clip.w;
    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;
    clip.xy=ndc*clip.w;
  }
  gl_Position=clip;
  // Affine UV, the PS1 rung's deferred half. GLSL ES 300 has no
  // `noperspective` qualifier, so the divide the rasterizer already performs
  // is cancelled instead of disabled: hardware hands the fragment
  // interp(v/w)/interp(1/w), so premultiplying a varying by w makes that
  // expression collapse to interp(v) — screen-space linear, which *is*
  // affine. Both varyings are scaled by the same factor so the fragment's
  // vUv/vUvW recovers exactly that, and the intermediate blend between the
  // two regimes stays continuous rather than popping at any strength.
  // uAffineWarpStrength==0 gives affineW==1.0 exactly, leaving vUv equal to
  // aUvMat.xy bit-for-bit; the fragment then skips the divide entirely on
  // the same uniform, so the perspective-correct path is untouched rather
  // than merely round-tripped. Snapping above only rewrites clip.xy, never
  // clip.w, so the two PS1 halves are independent.
  float affineW=mix(1.0,clip.w,uAffineWarpStrength);
  vUv=aUvMat.xy*affineW;
  vUvW=affineW;
}
