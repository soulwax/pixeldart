#version 300 es
precision highp float;
in vec4 vColor;
in vec3 vNormal;
in highp vec2 vUv;
in highp float vUvW;
in vec4 vLightSpacePos;
in vec3 vWorldPos;
in float vViewDepth;
uniform sampler2D uAlbedo;
uniform sampler2D uShadowMap;
uniform vec3 uLightPosition;
uniform vec3 uLightDirection;
uniform float uLightRange;
uniform float uLightInnerCos;
uniform float uLightOuterCos;
uniform vec3 uAmbientColor;
uniform float uAmbientIntensity;
uniform vec2 uShadowMapTexelSize;
uniform vec3 uMaterialTint;
uniform sampler2D uSsao;
uniform vec2 uSceneColorSize;
uniform float uEmissiveStrength;
uniform float uAffineWarpStrength;
uniform float uAlphaCutoff;
uniform float uOpaqueCoverage;
uniform vec3 uFogColor;
uniform float uFogStart;
uniform float uFogEnd;
uniform float uFogHeightFalloff;
uniform float uFogDensity;
layout(location=0)out vec4 oColor;
layout(location=1)out vec4 oGlow;

// Distance falloff (smooth to zero at uLightRange, matching SpotLight.range
// rather than an unbounded inverse-square that never reaches zero) times
// cone-edge falloff (smoothstep between the outer and inner cone angles,
  // SpotLight.outerConeRadians/innerConeRadians — both fields existed on the
  // API already but nothing read them before this, so the light previously
  // had a hard-edged, non-attenuating cone that read as flat/harsh instead of
// a graduated pool of light).
float lightAttenuation(vec3 worldPos){
  vec3 toFrag=worldPos-uLightPosition;
  float dist=length(toFrag);
  float distFalloff=clamp(1.-dist/uLightRange,0.,1.);
  distFalloff*=distFalloff;
  float cosAngle=dot(normalize(toFrag),normalize(uLightDirection));
  float coneFalloff=smoothstep(uLightOuterCos,uLightInnerCos,cosAngle);
  return distFalloff*coneFalloff;
}

float sampleShadow(vec3 projCoord,float bias){
  float shadowDepth=texture(uShadowMap,projCoord.xy).r;
  return projCoord.z-bias>shadowDepth?0.:1.;
}

// §8.5's fog: "distance plus restrained height/damp modulation" — the base
// term is a smoothstepped distance ramp (uFogStart..uFogEnd), not a plain
// linear one: a linear ramp's density right at uFogStart is already
// visibly nonzero, which reads as a hard onset band across a large
// continuous surface like the ground plane. smoothstep's derivative is
// zero at both ends, so density stays low just past uFogStart and eases
// in gradually instead. Height falloff and density are each optional in
// FrameEnvironment (nullable there, 0.0 here) and each written so 0.0 is
// an exact no-op, rather than needing a separate enabled flag per term:
//   - height: exp(-0*y) == 1, an identity multiply, when no falloff is set;
//   - density: 1-exp(-0*depth) == 0, so max(distance, 0) leaves the plain
//     distance term untouched when no density is set. Density can only
//     ever push fog stronger than the base distance ramp, never weaker —
//     "restrained" in the sense that it augments, never overrides.
float fogFactor(float viewDepth,float worldY){
  float distFactor=smoothstep(uFogStart,uFogEnd,viewDepth);
  float densityFactor=1.-exp(-uFogDensity*viewDepth);
  float factor=max(distFactor,densityFactor);
  float heightFactor=exp(-uFogHeightFalloff*max(worldY,0.));
  return clamp(factor*heightFactor,0.,1.);
}

float shadowFactor(float ndotl){
  vec3 projCoord=vLightSpacePos.xyz/vLightSpacePos.w;
  projCoord=projCoord*.5+.5;
  if(projCoord.x<0.||projCoord.x>1.||projCoord.y<0.||projCoord.y>1.||projCoord.z>1.){
    return 1.;
  }
  float bias=max(.004*(1.-ndotl),.0015);
  float sum=0.;
  sum+=sampleShadow(projCoord+vec3(-.5,-.5,0.)*vec3(uShadowMapTexelSize,0.),bias);
  sum+=sampleShadow(projCoord+vec3(.5,-.5,0.)*vec3(uShadowMapTexelSize,0.),bias);
  sum+=sampleShadow(projCoord+vec3(-.5,.5,0.)*vec3(uShadowMapTexelSize,0.),bias);
  sum+=sampleShadow(projCoord+vec3(.5,.5,0.)*vec3(uShadowMapTexelSize,0.),bias);
  return sum*.25;
}

void main(){
  // The divide that undoes the rasterizer's own perspective correction (see
  // shadowed_world.vert). Branched on the uniform rather than always
  // dividing, so a zero-strength draw samples the untouched vUv and is
  // bit-identical to the pre-affine path — the divisor is 1.0 there, but
  // only after an interpolate/divide round-trip that need not return
  // exactly 1.0. The branch is uniform across the whole draw, so it costs
  // no divergence.
  vec2 uv=uAffineWarpStrength>0.?vUv/vUvW:vUv;
  vec4 tex=texture(uAlbedo,uv);
  // §6.2's alpha-masked route. Deliberately the first thing after the
  // fetch it depends on, and ahead of all the lighting below: a discarded
  // fragment must not pay for four shadow-map taps and two normalizes it
  // will never use. uAlphaCutoff==0 is the pass's "this material has no
  // cutout" sentinel (MaterialDefinition.validate forbids a real zero), so
  // opaque and blended draws take a path containing no alpha compare at
  // all rather than one comparing against an unreachable threshold. The
  // same test, against the same uv, runs in depth_prepass.frag and
  // shadow_caster.frag — three passes must agree on which fragments exist
  // or SSAO, DOF and shadowing all occlude against holes this pass shaded
  // through.
  if(uAlphaCutoff>0.&&tex.a<uAlphaCutoff)discard;
  vec3 n=normalize(vNormal);
  vec3 toLight=normalize(uLightPosition-vWorldPos);
  float ndotl=max(dot(n,toLight),0.);
  float shadow=shadowFactor(ndotl);
  float attenuation=lightAttenuation(vWorldPos);
  // §8.5: "modulates ambient only" — SSAO must never darken the direct
  // (N.L * shadow * attenuation) term, only the ambient fill, or it would
  // double up with real shadowing and read as an incorrect global darkening
  // rather than contact occlusion specifically.
  vec2 screenUv=gl_FragCoord.xy/uSceneColorSize;
  float ao=texture(uSsao,screenUv).r;
  vec3 ambient=uAmbientColor*uAmbientIntensity*ao;
  vec3 lit=vColor.rgb*tex.rgb*uMaterialTint*clamp(ambient+vec3(ndotl*shadow*attenuation),0.,1.);
  // Fog blends the surface's own lit color toward uFogColor only — never
  // oGlow below, which stays a declared emissive quantity independent of
  // how much atmosphere sits between the surface and the camera, matching
  // §8.7's "does not infer glow from final luma" scoping: fog is a
  // property of oColor's reflected/lit light, not of emission.
  float fog=fogFactor(vViewDepth,vWorldPos.y);
  vec3 foggedLit=mix(lit,uFogColor,fog);
  // Bug 18: vColor.a*tex.a is the correct alpha for a blended draw and the
  // wrong one for everything else. present.frag copies this channel
  // straight through to a canvas created with the default alpha:true, so an
  // opaque or masked surface that emitted a texel's own alpha would show
  // the *page* through solid geometry. Coverage, not transparency, is what
  // an opaque or masked fragment writes: whatever survived the discard
  // above is fully covering, and an opaque draw always was. uOpaqueCoverage
  // is exactly 0 or 1, so the mix is exact in both directions and the
  // blended path keeps its pre-existing expression bit-for-bit.
  float outAlpha=mix(vColor.a*tex.a,1.,uOpaqueCoverage);
  oColor=vec4(foggedLit,outAlpha);
  // §8.7: bloom reads this declared attachment directly, never inferring
  // glow from oColor's final luma — a bright-but-non-emissive lit surface
  // (e.g. the checkerboard floor under strong light) must never bloom, only
  // a material with real emissiveStrength does, independent of how the
  // surface happens to be lit this frame.
  oGlow=vec4(uMaterialTint*uEmissiveStrength,1.);
}
