#version 300 es
layout(location=0) in vec3 aPosition;
layout(location=4) in vec3 aUvMat;
uniform mat4 uViewProjection;
uniform mat4 uModel;
uniform float uVertexSnapGrid;
uniform float uAffineWarpStrength;
out highp vec2 vUv;
out highp float vUvW;
// This prepass must land geometry on exactly the same pixels shadowedWorld
// will, because its depth is what SSAO occludes against and what
// shadowedWorld then samples back at its *own* gl_FragCoord. Snapping there
// and not here would mean the AO texel a fragment reads was computed for a
// slightly different surface than the one being shaded, and the error grows
// with the grid. The snap math below is deliberately identical to
// shadowed_world.vert's, including uVertexSnapGrid==0 skipping the branch.
// The same reasoning now covers UVs: an alpha-masked surface's holes must
// land on the same pixels in both passes, and affine sampling moves where a
// given texel lands, so the w-premultiply below is the same expression
// shadowed_world.vert uses and is driven from the same per-material weight.
void main(){
  vec4 clip=uViewProjection*uModel*vec4(aPosition,1.0);
  if(uVertexSnapGrid>0.0){
    vec2 ndc=clip.xy/clip.w;
    ndc=floor(ndc/uVertexSnapGrid+0.5)*uVertexSnapGrid;
    clip.xy=ndc*clip.w;
  }
  gl_Position=clip;
  float affineW=mix(1.0,clip.w,uAffineWarpStrength);
  vUv=aUvMat.xy*affineW;
  vUvW=affineW;
}
