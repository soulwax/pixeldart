#version 300 es
precision highp float;
in vec4 vColor;
in vec3 vNormal;
in highp vec2 vUv;
in highp float vUvW;
in highp vec2 vUv1;
in vec4 vLightSpacePos;
in vec3 vWorldPos;
in vec4 vTangent;
in float vViewDepth;
uniform sampler2D uAlbedo;
uniform sampler2D uNormalMap;
uniform sampler2D uOrmMap;
uniform sampler2D uEmissiveMap;
uniform sampler2D uLightmap;
uniform sampler2D uShadowMap;
uniform vec3 uCameraPosition;
uniform vec3 uLightPosition;
uniform vec3 uLightDirection;
uniform vec3 uLightColor;
uniform float uLightIntensity;
uniform float uLightRange;
uniform float uLightInnerCos;
uniform float uLightOuterCos;
uniform float uSpotEnabled;
uniform vec3 uDirectionalDirection;
uniform vec3 uDirectionalColor;
uniform float uDirectionalIntensity;
uniform vec3 uPointPosition0;
uniform vec3 uPointColor0;
uniform float uPointIntensity0;
uniform float uPointRadius0;
uniform vec3 uPointPosition1;
uniform vec3 uPointColor1;
uniform float uPointIntensity1;
uniform float uPointRadius1;
uniform vec3 uPointPosition2;
uniform vec3 uPointColor2;
uniform float uPointIntensity2;
uniform float uPointRadius2;
uniform vec3 uPointPosition3;
uniform vec3 uPointColor3;
uniform float uPointIntensity3;
uniform float uPointRadius3;
uniform vec3 uDirectSpotPosition0;
uniform vec3 uDirectSpotDirection0;
uniform vec3 uDirectSpotColor0;
uniform float uDirectSpotIntensity0;
uniform float uDirectSpotRange0;
uniform float uDirectSpotInnerCos0;
uniform float uDirectSpotOuterCos0;
uniform float uDirectSpotEnabled0;
uniform vec3 uDirectSpotPosition1;
uniform vec3 uDirectSpotDirection1;
uniform vec3 uDirectSpotColor1;
uniform float uDirectSpotIntensity1;
uniform float uDirectSpotRange1;
uniform float uDirectSpotInnerCos1;
uniform float uDirectSpotOuterCos1;
uniform float uDirectSpotEnabled1;
uniform vec3 uDirectSpotPosition2;
uniform vec3 uDirectSpotDirection2;
uniform vec3 uDirectSpotColor2;
uniform float uDirectSpotIntensity2;
uniform float uDirectSpotRange2;
uniform float uDirectSpotInnerCos2;
uniform float uDirectSpotOuterCos2;
uniform float uDirectSpotEnabled2;
uniform vec3 uAmbientColor;
uniform float uAmbientIntensity;
uniform vec2 uShadowMapTexelSize;
uniform vec3 uMaterialTint;
uniform vec4 uUvScaleOffset;
uniform sampler2D uSsao;
uniform vec2 uSceneColorSize;
uniform float uEmissiveStrength;
uniform float uNormalStrength;
uniform float uRoughness;
uniform float uMetallic;
uniform float uOcclusionStrength;
uniform float uClearcoatStrength;
uniform float uClearcoatRoughness;
uniform float uLightmapIntensity;
uniform float uAffineWarpStrength;
uniform float uAlphaCutoff;
uniform float uOpaqueCoverage;
uniform vec3 uFogColor;
uniform float uFogStart;
uniform float uFogEnd;
uniform float uFogHeightFalloff;
uniform float uFogDensity;
uniform float uReceivesShadow;
uniform float uRainWetness;
layout(location=0)out vec4 oColor;
layout(location=1)out vec4 oGlow;

// Distance falloff (smooth to zero at uLightRange, matching SpotLight.range
// rather than an unbounded inverse-square that never reaches zero) times
// cone-edge falloff (smoothstep between the outer and inner cone angles,
  // SpotLight.outerConeRadians/innerConeRadians — both fields existed on the
  // API already but nothing read them before this, so the light previously
  // had a hard-edged, non-attenuating cone that read as flat/harsh instead of
// a graduated pool of light).
float rangeAttenuation(float dist,float range){
  float normalized=clamp(dist/max(range,.001),0.,1.);
  // Smooth quartic cutoff avoids a visible ring at the authored range while
  // retaining an inverse-square response inside the light's influence.
  float cutoff=1.-normalized*normalized*normalized*normalized;
  float inverseSquare=1./(1.+(dist*dist)/max(range*range,.001));
  return cutoff*cutoff*inverseSquare;
}

float lightAttenuation(vec3 worldPos){
  vec3 toFrag=worldPos-uLightPosition;
  float dist=length(toFrag);
  float cosAngle=dot(normalize(toFrag),normalize(uLightDirection));
  float coneFalloff=smoothstep(uLightOuterCos,uLightInnerCos,cosAngle);
  return rangeAttenuation(dist,uLightRange)*coneFalloff;
}

float pointAttenuation(vec3 worldPos,vec3 lightPosition,float lightRadius){
  float dist=length(lightPosition-worldPos);
  return rangeAttenuation(dist,lightRadius);
}

vec3 pointContribution(vec3 normal,vec3 worldPos,vec3 lightPosition,
  vec3 lightColor,float lightIntensity,float lightRadius){
  vec3 toLight=lightPosition-worldPos;
  float ndotl=max(dot(normal,normalize(toLight)),0.);
  return lightColor*lightIntensity*ndotl*
    pointAttenuation(worldPos,lightPosition,lightRadius);
}

vec3 directSpotContribution(vec3 normal,vec3 worldPos,vec3 lightPosition,
  vec3 lightDirection,vec3 lightColor,float lightIntensity,float lightRange,
  float innerCos,float outerCos,float enabled){
  vec3 toLight=lightPosition-worldPos;
  float ndotl=max(dot(normal,normalize(toLight)),0.);
  vec3 toFrag=worldPos-lightPosition;
  float cosAngle=dot(normalize(toFrag),normalize(lightDirection));
  float coneFalloff=smoothstep(outerCos,innerCos,cosAngle);
  float distanceFalloff=rangeAttenuation(length(toFrag),lightRange);
  return lightColor*lightIntensity*ndotl*coneFalloff*
    distanceFalloff*enabled;
}

// Compact Cook-Torrance response for the clean/high path. The bounded
// per-light evaluation makes roughness and metallic maps visibly useful
// without introducing a deferred light buffer.
float distributionGgx(float ndoth,float roughness){
  float a=roughness*roughness;
  float a2=a*a;
  float denom=ndoth*ndoth*(a2-1.0)+1.0;
  return a2/(3.14159265*denom*denom);
}

float geometrySchlick(float ndotv,float roughness){
  float k=(roughness+1.0)*(roughness+1.0)/8.0;
  return ndotv/(ndotv*(1.0-k)+k);
}

float geometrySmith(float ndotv,float ndotl,float roughness){
  return geometrySchlick(ndotv,roughness)*geometrySchlick(ndotl,roughness);
}

vec3 fresnelSchlick(float cosTheta,vec3 f0){
  return f0+(1.0-f0)*pow(1.0-clamp(cosTheta,0.0,1.0),5.0);
}

vec3 specularContribution(vec3 normal,vec3 viewDir,vec3 lightDir,
  vec3 lightColor,float lightIntensity,float attenuation,vec3 baseColor,
  float roughness,float metallic){
  vec3 halfDir=normalize(viewDir+lightDir);
  float ndotv=max(dot(normal,viewDir),0.0);
  float ndotl=max(dot(normal,lightDir),0.0);
  float ndoth=max(dot(normal,halfDir),0.0);
  float hdotv=max(dot(halfDir,viewDir),0.0);
  vec3 f0=mix(vec3(0.04),baseColor,metallic);
  vec3 fresnel=fresnelSchlick(hdotv,f0);
  float distribution=distributionGgx(ndoth,roughness);
  float geometry=geometrySmith(ndotv,ndotl,roughness);
  vec3 numerator=distribution*geometry*fresnel;
  float denominator=max(4.0*ndotv*ndotl,0.001);
  return numerator/denominator*lightColor*lightIntensity*attenuation*ndotl;
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
  // Receiver-plane style slope bias keeps grazing surfaces from acne while
  // avoiding the detached-shadow look of a large constant offset.
  float bias=max(.003*(1.-ndotl),.0008);
  // Fixed low-discrepancy offsets avoid the directional shimmer of a regular
  // square lattice while remaining deterministic and free of per-frame noise.
  vec2 t=uShadowMapTexelSize;
  float sum=0.;
  sum+=sampleShadow(projCoord+vec3(vec2(-.942,-.399)*t,0.),bias);
  sum+=sampleShadow(projCoord+vec3(vec2(.945,-.768)*t,0.),bias);
  sum+=sampleShadow(projCoord+vec3(vec2(-.094,.886)*t,0.),bias);
  sum+=sampleShadow(projCoord+vec3(vec2(.344,.294)*t,0.),bias);
  sum+=sampleShadow(projCoord+vec3(vec2(-.716,.642)*t,0.),bias);
  sum+=sampleShadow(projCoord+vec3(vec2(.688,-.089)*t,0.),bias);
  sum+=sampleShadow(projCoord+vec3(vec2(-.287,-.885)*t,0.),bias);
  sum+=sampleShadow(projCoord+vec3(vec2(.052,.008)*t,0.),bias);
  sum+=sampleShadow(projCoord+vec3(vec2(.831,.486)*t,0.),bias);
  return sum/9.;
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
  uv=uv*uUvScaleOffset.xy+uUvScaleOffset.zw;
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
  // Surface-v2 supplies a tangent4 with OpenGL's +/-1 handedness in W.
  // Compatibility14 meshes leave the attribute at its default zero and use
  // the derivative frame below, so old content and authored tangents share
  // one shader contract.
  if(uNormalStrength>0.0){
    vec3 dp1=dFdx(vWorldPos),dp2=dFdy(vWorldPos);
    vec2 duv1=dFdx(uv),duv2=dFdy(uv);
    vec3 derivativeT=normalize(dp1*duv2.y-dp2*duv1.y);
    vec3 derivativeB=normalize(-dp1*duv2.x+dp2*duv1.x);
    vec3 authoredT=normalize(vTangent.xyz-n*dot(n,vTangent.xyz));
    bool hasAuthoredT=dot(vTangent.xyz,vTangent.xyz)>0.25;
    vec3 t=hasAuthoredT?authoredT:derivativeT;
    vec3 b=hasAuthoredT?normalize(cross(n,t)*vTangent.w):derivativeB;
    vec3 map=texture(uNormalMap,uv).xyz*2.0-1.0;
    map.xy*=uNormalStrength;
    n=normalize(mat3(t,b,n)*normalize(map));
  }
  vec3 orm=texture(uOrmMap,uv).rgb;
  float ao=texture(uSsao,gl_FragCoord.xy/uSceneColorSize).r;
  ao*=mix(1.0,orm.r,clamp(uOcclusionStrength,0.0,1.0));
  vec3 direct=vec3(0.);
  float directionalNdotL=max(dot(n,normalize(uDirectionalDirection)),0.);
  direct+=uDirectionalColor*uDirectionalIntensity*directionalNdotL;
  direct+=pointContribution(n,vWorldPos,uPointPosition0,uPointColor0,
    uPointIntensity0,uPointRadius0);
  direct+=pointContribution(n,vWorldPos,uPointPosition1,uPointColor1,
    uPointIntensity1,uPointRadius1);
  direct+=pointContribution(n,vWorldPos,uPointPosition2,uPointColor2,
    uPointIntensity2,uPointRadius2);
  direct+=pointContribution(n,vWorldPos,uPointPosition3,uPointColor3,
    uPointIntensity3,uPointRadius3);
  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition0,
    uDirectSpotDirection0,uDirectSpotColor0,uDirectSpotIntensity0,
    uDirectSpotRange0,uDirectSpotInnerCos0,uDirectSpotOuterCos0,
    uDirectSpotEnabled0);
  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition1,
    uDirectSpotDirection1,uDirectSpotColor1,uDirectSpotIntensity1,
    uDirectSpotRange1,uDirectSpotInnerCos1,uDirectSpotOuterCos1,
    uDirectSpotEnabled1);
  direct+=directSpotContribution(n,vWorldPos,uDirectSpotPosition2,
    uDirectSpotDirection2,uDirectSpotColor2,uDirectSpotIntensity2,
    uDirectSpotRange2,uDirectSpotInnerCos2,uDirectSpotOuterCos2,
    uDirectSpotEnabled2);
  vec3 toSpot=normalize(uLightPosition-vWorldPos);
  float spotNdotL=max(dot(n,toSpot),0.);
  float shadow=uReceivesShadow>0.5?shadowFactor(spotNdotL):1.;
  float attenuation=lightAttenuation(vWorldPos);
  direct+=uLightColor*uLightIntensity*spotNdotL*shadow*attenuation*uSpotEnabled;
  // §8.5: "modulates ambient only" — SSAO must never darken the direct
  // (N.L * shadow * attenuation) term, only the ambient fill, or it would
  // double up with real shadowing and read as an incorrect global darkening
  // rather than contact occlusion specifically.
  vec3 ambient=uAmbientColor*uAmbientIntensity*ao;
  vec3 baseColor=vColor.rgb*tex.rgb*uMaterialTint;
  // Metallic surfaces contribute less diffuse energy; roughness keeps a
  // small, stable broadening factor until the surface-v2 camera/specular
  // block lands. Both channels therefore affect the live output rather than
  // being metadata-only fields.
  float metal=clamp(uMetallic*orm.b,0.0,1.0);
  float rough=clamp(uRoughness*orm.g,0.0,1.0);
  // Avoid singular highlights while retaining a visibly sharp porcelain
  // response at the authored low end of the roughness range.
  float specRough=max(0.045,rough);
  vec3 viewDir=normalize(uCameraPosition-vWorldPos);
  vec3 specular=vec3(0.0);
  specular+=specularContribution(n,viewDir,normalize(uDirectionalDirection),
    uDirectionalColor,uDirectionalIntensity,1.0,baseColor,specRough,metal);
  specular+=specularContribution(n,viewDir,
    normalize(uPointPosition0-vWorldPos),uPointColor0,uPointIntensity0,
    pointAttenuation(vWorldPos,uPointPosition0,uPointRadius0),baseColor,
    specRough,metal);
  specular+=specularContribution(n,viewDir,
    normalize(uPointPosition1-vWorldPos),uPointColor1,uPointIntensity1,
    pointAttenuation(vWorldPos,uPointPosition1,uPointRadius1),baseColor,
    specRough,metal);
  specular+=specularContribution(n,viewDir,
    normalize(uPointPosition2-vWorldPos),uPointColor2,uPointIntensity2,
    pointAttenuation(vWorldPos,uPointPosition2,uPointRadius2),baseColor,
    specRough,metal);
  specular+=specularContribution(n,viewDir,
    normalize(uPointPosition3-vWorldPos),uPointColor3,uPointIntensity3,
    pointAttenuation(vWorldPos,uPointPosition3,uPointRadius3),baseColor,
    specRough,metal);
  specular+=specularContribution(n,viewDir,
    normalize(uLightPosition-vWorldPos),uLightColor,uLightIntensity,
    lightAttenuation(vWorldPos)*uSpotEnabled,baseColor,specRough,metal);
  // Rain response stays in the world pass so it follows geometry depth rather
  // than painting streaks over the whole screen. Near surfaces receive a
  // restrained cool darkening and a broad wet highlight; distant surfaces
  // fade back to their authored material before the fog composite.
  float wetDepth=1.0-smoothstep(2.0,18.0,max(vViewDepth,0.0));
  float wetness=clamp(uRainWetness,0.0,1.0)*wetDepth;
  baseColor=mix(baseColor,baseColor*vec3(0.84,0.90,0.98),wetness*0.22);
  // Keep reflected energy available to the specular lobe. The previous
  // diffuse-first clamp clipped bright ceramic response before tone mapping,
  // producing the broad plastic patches visible in low-roughness samples.
  // This split is bounded by the material metalness and lets the final
  // composite perform the intentional HDR compression once.
  vec3 diffuseEnergy=baseColor*(1.0-metal)*
    (ambient+direct*(1.0-0.25*rough));
  vec3 lit=diffuseEnergy+specular;
  // A restrained dielectric clearcoat is intentionally separate from the
  // base roughness/metalness response. It gives porcelain a broad, stable
  // grazing highlight without turning the surface into a mirror.
  vec3 coatLight=normalize(uDirectionalDirection);
  vec3 coatHalf=normalize(viewDir+coatLight);
  float coatNdotV=max(dot(n,viewDir),0.);
  float coatNdotH=max(dot(n,coatHalf),0.);
  float coatNdotL=max(dot(n,coatLight),0.);
  float coatPower=mix(128.0,8.0,clamp(uClearcoatRoughness,0.0,1.0));
  float coatFresnel=0.04+0.96*pow(1.0-coatNdotV,5.0);
  float coat=clamp(uClearcoatStrength,0.0,1.0)*coatFresnel*
    pow(coatNdotH,coatPower)*coatNdotL*uDirectionalIntensity;
  lit+=uDirectionalColor*coat;
  lit+=direct*(wetness*(0.035+0.075*(1.0-rough)));
  vec3 emissive=texture(uEmissiveMap,uv).rgb*uMaterialTint*uEmissiveStrength;
  lit+=emissive;
  if(uLightmapIntensity>0.0){
    lit+=baseColor*texture(uLightmap,vUv1).rgb*uLightmapIntensity;
  }
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
  oGlow=vec4(emissive,1.);
}
