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
uniform float uAmbientLightScale;
uniform float uDirectLightScale;
uniform vec3 uReflectionColor;
uniform float uReflectionIntensity;
uniform float uReflectionConfidence;
uniform vec2 uShadowMapTexelSize;
uniform float uShadowFilterRadius;
uniform float uShadowBias;
uniform vec3 uMaterialTint;
uniform vec4 uUvScaleOffset;
uniform sampler2D uSsao;
uniform vec2 uSceneColorSize;
uniform float uEmissiveStrength;
uniform float uNormalStrength;
uniform float uRoughness;
uniform float uMetallic;
uniform float uSpecularScale;
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
uniform float uSurfaceSnowCoverage;
uniform float uSurfaceDissolution;
uniform float uThermalSourceCount;
uniform vec3 uThermalSourcePosition0;
uniform float uThermalSourceRadius0;
uniform float uThermalSourceDissolution0;
uniform vec3 uThermalSourcePosition1;
uniform float uThermalSourceRadius1;
uniform float uThermalSourceDissolution1;
uniform vec3 uThermalSourcePosition2;
uniform float uThermalSourceRadius2;
uniform float uThermalSourceDissolution2;
uniform vec3 uThermalSourcePosition3;
uniform float uThermalSourceRadius3;
uniform float uThermalSourceDissolution3;
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

// §8.5's fog keeps the smooth distance ramp for authored horizon control, but
// the participating-medium term is an analytic optical depth along the actual
// camera-to-surface segment. For rho(y)=density*exp(-falloff*max(y,0)), the
// integral has a stable constant-height limit and therefore does not shimmer
// when a surface is nearly level with the camera. Zero density remains an
// exact no-op; the host can still use the distance ramp independently.
float heightFogOpticalDepth(vec3 rayStart,vec3 rayEnd){
  float segmentLength=length(rayEnd-rayStart);
  if(segmentLength<=0.0001||uFogDensity<=0.)return 0.;
  float falloff=max(uFogHeightFalloff,0.);
  float h0=max(rayStart.y,0.);
  float h1=max(rayEnd.y,0.);
  float integral;
  if(falloff<=0.||abs(h1-h0)<=0.0001){
    integral=segmentLength*exp(-falloff*h0);
  }else{
    float denominator=falloff*(h1-h0);
    integral=segmentLength*(exp(-falloff*h0)-exp(-falloff*h1))/denominator;
  }
  return max(uFogDensity*integral,0.);
}

float fogFactor(float viewDepth,float worldY){
  float distFactor=smoothstep(uFogStart,uFogEnd,viewDepth);
  float opticalDepth=heightFogOpticalDepth(uCameraPosition,vWorldPos);
  float mediumFactor=1.-exp(-opticalDepth);
  return clamp(max(distFactor,mediumFactor),0.,1.);
}

float shadowFactor(float ndotl){
  vec3 projCoord=vLightSpacePos.xyz/vLightSpacePos.w;
  projCoord=projCoord*.5+.5;
  if(projCoord.x<0.||projCoord.x>1.||projCoord.y<0.||projCoord.y>1.||projCoord.z>1.){
    return 1.;
  }
  // Receiver-plane style slope bias keeps grazing surfaces from acne while
  // avoiding the detached-shadow look of a large constant offset.
  float bias=max(uShadowBias*(1.-ndotl),uShadowBias*0.2666667);
  // Fixed low-discrepancy offsets avoid the directional shimmer of a regular
  // square lattice while remaining deterministic and free of per-frame noise.
  vec2 t=uShadowMapTexelSize*clamp(uShadowFilterRadius,0.,3.);
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
  float normalVariance=0.0;
  if(uNormalStrength>0.0){
    // Toksvig-style widening suppresses sub-pixel normal sparkle when a high
    // resolution map is minified. It preserves authored relief at distance
    // while converting unresolved detail into a stable roughness increase.
    vec3 normalSample=texture(uNormalMap,uv).xyz*2.0-1.0;
    vec3 normalDx=dFdx(normalSample);
    vec3 normalDy=dFdy(normalSample);
    normalVariance=dot(normalDx,normalDx)+dot(normalDy,normalDy);
  }
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
  direct*=uDirectLightScale;
  // §8.5: "modulates ambient only" — SSAO must never darken the direct
  // (N.L * shadow * attenuation) term, only the ambient fill, or it would
  // double up with real shadowing and read as an incorrect global darkening
  // rather than contact occlusion specifically.
  vec3 ambient=uAmbientColor*uAmbientIntensity*uAmbientLightScale*ao;
  vec3 baseColor=vColor.rgb*tex.rgb*uMaterialTint;
  // Metallic surfaces contribute less diffuse energy; roughness keeps a
  // small, stable broadening factor until the surface-v2 camera/specular
  // block lands. Both channels therefore affect the live output rather than
  // being metadata-only fields.
  float metal=clamp(uMetallic*orm.b,0.0,1.0);
  float rough=clamp(uRoughness*orm.g,0.0,1.0);
  // Weather changes the material before direct and environment response.
  // Thawing therefore affects the same specular lobe the viewer sees,
  // instead of changing only diffuse color after the highlight is computed.
  float wetDepth=1.0-smoothstep(2.0,18.0,max(vViewDepth,0.0));
  float wetness=clamp(uRainWetness,0.0,1.0)*wetDepth;
  baseColor=mix(baseColor,baseColor*vec3(0.84,0.90,0.98),wetness*0.22);
  float upward=clamp(n.y*0.5+0.5,0.0,1.0);
  float thermalDissolution=clamp(uSurfaceDissolution,0.0,1.0);
  // A steady spherical conductive field decays approximately as 1/r. The
  // host keeps the slow latent material memory in uSurfaceDissolution; this
  // local term therefore models the spatial heat field without making warm
  // surfaces snap back or disappear at an arbitrary exponential radius.
  if(uThermalSourceCount>0.5) thermalDissolution=max(thermalDissolution,
    uThermalSourceDissolution0*clamp(uThermalSourceRadius0/
      max(distance(vWorldPos,uThermalSourcePosition0),uThermalSourceRadius0),0.,1.));
  if(uThermalSourceCount>1.5) thermalDissolution=max(thermalDissolution,
    uThermalSourceDissolution1*clamp(uThermalSourceRadius1/
      max(distance(vWorldPos,uThermalSourcePosition1),uThermalSourceRadius1),0.,1.));
  if(uThermalSourceCount>2.5) thermalDissolution=max(thermalDissolution,
    uThermalSourceDissolution2*clamp(uThermalSourceRadius2/
      max(distance(vWorldPos,uThermalSourcePosition2),uThermalSourceRadius2),0.,1.));
  if(uThermalSourceCount>3.5) thermalDissolution=max(thermalDissolution,
    uThermalSourceDissolution3*clamp(uThermalSourceRadius3/
      max(distance(vWorldPos,uThermalSourcePosition3),uThermalSourceRadius3),0.,1.));
  thermalDissolution=clamp(thermalDissolution,0.0,1.0);
  float snowCoverage=clamp(uSurfaceSnowCoverage,0.0,1.0)*
    smoothstep(0.18,0.82,upward)*(1.0-thermalDissolution*0.72);
  baseColor=mix(baseColor,vec3(0.78,0.86,0.95),snowCoverage*0.82);
  float dissolution=thermalDissolution;
  baseColor=mix(baseColor,baseColor*vec3(0.82,0.86,0.90),dissolution*0.16);
  rough=mix(rough,max(0.06,rough*0.58),dissolution*0.72);
  // Avoid singular highlights while retaining a visibly sharp porcelain
  // response at the authored low end of the roughness range.
  float specRough=max(0.045,sqrt(rough*rough+normalVariance*0.18));
  // A continuous water film forms a second dielectric lobe. It smooths the
  // authored surface only as coverage rises, so damp cloth stays diffuse
  // while puddled stone gains a tight grazing reflection.
  float waterCoverage=smoothstep(0.20,0.88,wetness)*(1.0-0.35*rough);
  specRough=mix(specRough,max(0.035,specRough*0.18),waterCoverage);
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
    lightAttenuation(vWorldPos)*uSpotEnabled*shadow,baseColor,specRough,metal);
  specular*=uDirectLightScale*uSpecularScale;
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
  float coatStrength=max(clamp(uClearcoatStrength,0.0,1.0),waterCoverage*0.82);
  float coat=coatStrength*coatFresnel*
    pow(coatNdotH,coatPower)*coatNdotL*uDirectionalIntensity*
    uDirectLightScale*uSpecularScale;
  lit+=uDirectionalColor*coat;
  lit+=direct*(wetness*(0.035+0.075*(1.0-rough)));
  // Environment fallback reflections are deliberately bounded and weighted
  // by wetness/grazing angle. A real probe/history hit can raise confidence;
  // the current host fallback remains visible but never masquerades as SSR.
  float reflectionNdotV=max(dot(n,viewDir),0.0);
  float reflectionFresnel=0.04+0.96*pow(1.0-reflectionNdotV,5.0);
  float reflectionSurface=clamp(wetness+0.18*dissolution,0.0,1.0);
  float reflectionConfidence=0.20+0.80*clamp(uReflectionConfidence,0.0,1.0);
  float reflectionWeight=clamp(
    uReflectionIntensity*reflectionSurface*reflectionFresnel*
      (1.0-0.72*rough)*reflectionConfidence,
    0.0,1.0);
  lit+=uReflectionColor*reflectionWeight;
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
