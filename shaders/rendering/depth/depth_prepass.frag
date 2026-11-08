#version 300 es
precision highp float;
in highp vec2 vUv;
in highp float vUvW;
uniform sampler2D uAlbedo;
uniform float uAlphaCutoff;
uniform float uAffineWarpStrength;
// §6.2: "includes opaque + alpha-masked depth." A masked surface's holes
// must not write depth, or SSAO occludes against geometry the world pass
// discarded and DOF's CoC defocuses against a surface nothing shaded. The
// compare is bit-identical to shadowed_world.frag's — same uv recovery,
// same threshold, same direction — because any divergence reintroduces
// exactly the class of bug the vertex-snap parity fix (bug 17) closed.
// Everything is inside the uAlphaCutoff>0. branch, so an unmasked draw
// costs no texture fetch at all here, only the interpolation the varyings
// were already going to do.
void main(){
  if(uAlphaCutoff>0.){
    vec2 uv=uAffineWarpStrength>0.?vUv/vUvW:vUv;
    if(texture(uAlbedo,uv).a<uAlphaCutoff)discard;
  }
}
