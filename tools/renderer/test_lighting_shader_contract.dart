import 'package:pixeldart/rendering/webgl/generated_shaders.dart';

void main() {
  const shadowTerms = <String>[
    'uDirectionalColor*uDirectionalIntensity',
    'pointContribution(n,vWorldPos,uPointPosition0',
    'directSpotContribution(n,vWorldPos,uDirectSpotPosition0',
    'uLightColor*uLightIntensity*spotNdotL*shadow',
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
  const presentTerms = <String>[
    'uniform float uExposure;',
    'uniform float uVignette;',
    'uniform float uGrain;',
    'uniform float uRainIntensity;',
    'uniform float uRainWindowVisibility;',
    'uniform float uOutputEncoding;',
    'uniform float uToneMap;',
    'vec3 reinhardToneMap(vec3 color)',
    'vec3 linearToSrgb(vec3 color)',
    'if(uOutputEncoding>.5) color=linearToSrgb',
    'color*=1.-clamp(uVignette,0.,1.)*vignette;',
    'color=mix(color,vec3(.56,.67,.76),rain*rainStreak(vUv)*.16);',
    'clamp(uRainWindowVisibility,0.,1.)',
  ];
  for (final term in presentTerms) {
    if (!presentFragSrc.contains(term)) {
      throw StateError('present shader lost composite term: $term');
    }
  }
  print('Renderer lighting/composite shader-contract fixtures passed.');
}
