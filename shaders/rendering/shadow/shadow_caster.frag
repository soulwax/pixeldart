#version 300 es
precision highp float;
in highp vec2 vUv;
uniform sampler2D uAlbedo;
uniform float uAlphaCutoff;
// §6.2: "alpha-masked geometry participates in shadow, prepass, and opaque
// depth-writing routes." Without this discard a lattice, a leaf or a grille
// casts the solid shadow of its bounding quad — the single most obvious way
// a masked material reads as fake. uAlphaCutoff==0 skips the fetch, so
// every opaque caster costs exactly what it did before this existed.
void main(){
  if(uAlphaCutoff>0.&&texture(uAlbedo,vUv).a<uAlphaCutoff)discard;
}
