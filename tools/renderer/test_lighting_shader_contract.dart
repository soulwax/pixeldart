import 'package:pixeldart/rendering/webgl/generated_shaders.dart';

void main() {
  const shadowTerms = <String>[
    'uDirectionalColor*uDirectionalIntensity',
    'pointContribution(n,vWorldPos,uPointPosition0',
    'directSpotContribution(n,vWorldPos,uDirectSpotPosition0',
    'uLightColor*uLightIntensity*spotNdotL*shadow',
    'uShadowMapTexelSize*clamp(uShadowFilterRadius,0.,3.)',
    'uShadowBias*(1.-ndotl)',
    'uAmbientLightScale',
    'uDirectLightScale',
    'uSpecularScale',
  ];
  for (final term in shadowTerms) {
    if (!shadowedWorldFragSrc.contains(term)) {
      throw StateError('shadowed-world shader lost lighting term: $term');
    }
  }
  const wetnessTerms = <String>[
    'uniform float uRainWetness;',
    'smoothstep(2.0,18.0,max(vViewDepth,0.0))',
    'wetness*(0.035+0.075*(1.0-rough))',
  ];
  for (final term in wetnessTerms) {
    if (!shadowedWorldFragSrc.contains(term)) {
      throw StateError(
        'shadowed-world shader lost depth-aware rain term: $term',
      );
    }
  }
  const mediumTerms = <String>[
    'float heightFogOpticalDepth(vec3 rayStart,vec3 rayEnd)',
    'float opticalDepth=heightFogOpticalDepth(uCameraPosition,vWorldPos);',
    'float mediumFactor=1.-exp(-opticalDepth);',
  ];
  for (final term in mediumTerms) {
    if (!shadowedWorldFragSrc.contains(term)) {
      throw StateError('shadowed-world shader lost analytic fog term: $term');
    }
  }
  for (final term in [
    'uniform float uThermalSourceCount;',
    'distance(vWorldPos,uThermalSourcePosition0)',
    'thermalDissolution=max(thermalDissolution,',
  ]) {
    if (!shadowedWorldFragSrc.contains(term)) {
      throw StateError(
        'shadowed-world shader lost spatial thermal term: $term',
      );
    }
  }
  final appearanceIndex = shadowedWorldFragSrc.indexOf(
    'float thermalDissolution=clamp(uSurfaceDissolution,0.0,1.0);',
  );
  final specularIndex = shadowedWorldFragSrc.indexOf(
    'float specRough=max(0.045,sqrt(rough*rough+normalVariance*0.18));',
  );
  if (appearanceIndex < 0 ||
      specularIndex < 0 ||
      appearanceIndex > specularIndex) {
    throw StateError(
      'weather appearance must resolve before the specular roughness lobe',
    );
  }
  const presentTerms = <String>[
    'uniform float uExposure;',
    'uniform float uVignette;',
    'uniform float uGrain;',
    'uniform float uOutputEncoding;',
    'uniform float uToneMap;',
    'vec3 reinhardToneMap(vec3 color)',
    'vec3 linearToSrgb(vec3 color)',
    'if(uOutputEncoding>.5) color=linearToSrgb',
    'color*=1.-clamp(uVignette,0.,1.)*vignette;',
  ];
  for (final term in presentTerms) {
    if (!presentFragSrc.contains(term)) {
      throw StateError('present shader lost composite term: $term');
    }
  }
  for (final forbidden in [
    'rainStreak',
    'uRainIntensity',
    'uRainWindowVisibility',
  ]) {
    if (presentFragSrc.contains(forbidden)) {
      throw StateError(
        'present shader must not paint screen-space precipitation: $forbidden',
      );
    }
  }
  print('Renderer lighting/composite shader-contract fixtures passed.');
}
