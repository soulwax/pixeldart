#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uTex;
uniform float uExposure;
uniform float uVignette;
uniform float uGrain;
uniform float uOutputEncoding;
uniform float uToneMap;
uniform vec3 uClearColor;
uniform vec3 uSkyHorizon;
uniform vec3 uSkyZenith;
uniform vec3 uSkyGround;
uniform float uSkyEnabled;
uniform float uSkyHorizonGlow;
uniform float uSkyStarDensity;
uniform sampler2D uSkyTexture;
uniform float uSkyTextureEnabled;
uniform float uSkyRotation;
uniform float uSkyExposure;
uniform float uSkyTextureSrgb;
uniform mat4 uInverseProjection;
uniform mat4 uInverseView;
uniform vec3 uCameraPosition;
uniform float uCloudCoverage;
uniform float uCloudDensity;
uniform float uCloudBaseHeight;
uniform float uCloudThickness;
uniform float uCloudScale;
uniform vec2 uCloudWind;
uniform float uCloudPhase;
uniform float uCloudDetail;
uniform float uCloudSilverLining;
uniform float uCloudSampleCount;
uniform vec3 uCloudLightDirection;
uniform vec3 uCloudLightColor;
uniform float uCloudLightIntensity;
out vec4 oColor;

float hash(vec2 p){
  return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);
}

vec3 reinhardToneMap(vec3 color){
  return color/(vec3(1.)+color);
}

vec3 linearToSrgb(vec3 color){
  vec3 cutoff=step(vec3(.0031308),color);
  vec3 low=color*12.92;
  vec3 high=1.055*pow(max(color,vec3(0.)),vec3(1./2.4))-.055;
  return mix(low,high,cutoff);
}

vec3 skyBackground(vec2 uv){
  // A deliberately cheap, high-quality fallback sky: three atmospheric bands
  // provide depth at every camera angle, while the tiny deterministic star
  // field and horizon glow keep the clear background from reading as a flat
  // color. It is an environment layer, not a game/weather simulation.
  float lower=smoothstep(0.0,0.48,uv.y);
  float upper=smoothstep(0.42,1.0,uv.y);
  vec3 color=mix(uSkyGround,uSkyHorizon,lower);
  color=mix(color,uSkyZenith,upper);
  float horizonGlow=exp(-pow((uv.y-0.48)*7.0,2.0));
  color+=uSkyHorizon*horizonGlow*clamp(uSkyHorizonGlow,0.,1.);
  float starMask=smoothstep(0.62,0.92,uv.y);
  float stars=step(1.0-clamp(uSkyStarDensity,0.,.1),hash(floor(uv*vec2(180.0,100.0))))*starMask;
  color+=vec3(0.16,0.19,0.24)*stars;
  return max(color,vec3(0.0));
}

float hash3(vec3 p){
  return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453123);
}

float valueNoise(vec3 p){
  vec3 i=floor(p);
  vec3 f=fract(p);
  f=f*f*(3.0-2.0*f);
  float n000=hash3(i+vec3(0,0,0));
  float n100=hash3(i+vec3(1,0,0));
  float n010=hash3(i+vec3(0,1,0));
  float n110=hash3(i+vec3(1,1,0));
  float n001=hash3(i+vec3(0,0,1));
  float n101=hash3(i+vec3(1,0,1));
  float n011=hash3(i+vec3(0,1,1));
  float n111=hash3(i+vec3(1,1,1));
  float x00=mix(n000,n100,f.x);
  float x10=mix(n010,n110,f.x);
  float x01=mix(n001,n101,f.x);
  float x11=mix(n011,n111,f.x);
  return mix(mix(x00,x10,f.y),mix(x01,x11,f.y),f.z);
}

float cloudNoise(vec3 p){
  float value=0.0;
  float amplitude=0.5;
  for(int octave=0;octave<4;octave++){
    value+=valueNoise(p)*amplitude;
    p=p*2.03+vec3(17.3,11.7,7.1);
    amplitude*=0.5;
  }
  return value;
}

float cloudDensityAt(vec3 position){
  float height01=clamp(
    (position.y-uCloudBaseHeight)/max(uCloudThickness,0.001),
    0.0,1.0
  );
  float vertical=smoothstep(0.0,0.12,height01)*
    (1.0-smoothstep(0.72,1.0,height01));
  vec3 q=position*max(uCloudScale,0.00001)+
    vec3(uCloudWind.x*uCloudPhase,0.0,uCloudWind.y*uCloudPhase);
  float macro=cloudNoise(q*0.82);
  float detail=cloudNoise(q*2.7+vec3(23.0,5.0,41.0));
  float shape=mix(macro,macro*0.68+detail*0.32,clamp(uCloudDetail,0.,1.));
  float threshold=1.0-clamp(uCloudCoverage,0.,1.);
  float body=smoothstep(threshold,threshold+0.26,shape);
  return body*vertical*clamp(uCloudDensity,0.,1.);
}

vec4 volumetricClouds(vec3 worldDirection){
  if(uCloudCoverage<=0.0001 || uCloudDensity<=0.0001 || worldDirection.y<=0.001){
    return vec4(0.0);
  }
  float directionY=max(worldDirection.y,0.001);
  float startT=(uCloudBaseHeight-uCameraPosition.y)/directionY;
  float endT=(uCloudBaseHeight+uCloudThickness-uCameraPosition.y)/directionY;
  startT=max(startT,0.0);
  endT=max(endT,0.0);
  if(endT<=startT) return vec4(0.0);
  int sampleCount=int(clamp(uCloudSampleCount,4.,24.));
  float stepLength=(endT-startT)/float(sampleCount);
  float jitter=(hash(gl_FragCoord.xy+vec2(uCloudPhase*0.013))-0.5)*stepLength;
  vec3 sunDirection=normalize(-uCloudLightDirection);
  float transmittance=1.0;
  vec3 inScatter=vec3(0.0);
  for(int i=0;i<24;i++){
    if(i>=sampleCount) break;
    float t=startT+(float(i)+0.5)*stepLength+jitter;
    vec3 position=uCameraPosition+worldDirection*t;
    float density=cloudDensityAt(position);
    float opticalDepth=density*stepLength*0.0035;
    float segmentAlpha=1.0-exp(-opticalDepth);
    float towardLight=cloudDensityAt(position+sunDirection*90.0);
    float lightTransmittance=exp(-towardLight*0.025);
    float phase=0.72+0.28*pow(max(dot(-worldDirection,sunDirection),0.0),2.0);
    vec3 ambient=uSkyHorizon*0.32;
    vec3 direct=uCloudLightColor*
      (0.14+0.86*clamp(uCloudLightIntensity,0.,1.5))*phase;
    float edge=pow(1.0-clamp(density,0.,1.),3.0)*uCloudSilverLining*0.22;
    vec3 sampleLight=(ambient+direct)*lightTransmittance+vec3(edge);
    inScatter+=transmittance*segmentAlpha*sampleLight;
    transmittance*=1.0-segmentAlpha;
    if(transmittance<0.01) break;
  }
  return vec4(inScatter,1.0-transmittance);
}

vec3 srgbToLinear(vec3 color){
  vec3 low=color/12.92;
  vec3 high=pow((color+0.055)/1.055,vec3(2.4));
  return mix(low,high,step(vec3(0.04045),color));
}

vec3 worldDirectionForUv(vec2 uv){
  vec2 ndc=uv*2.0-1.0;
  vec4 viewPoint=uInverseProjection*vec4(ndc,1.0,1.0);
  return normalize(viewPoint.xyz/viewPoint.w);
}

vec3 equirectangularSky(vec2 uv){
  vec3 worldDirection=normalize((uInverseView*vec4(worldDirectionForUv(uv),0.0)).xyz);
  float longitude=atan(worldDirection.z,worldDirection.x)+uSkyRotation;
  float latitude=asin(clamp(worldDirection.y,-1.0,1.0));
  vec2 sampleUv=vec2(
    fract(longitude/(2.0*3.14159265359)+0.5),
    0.5-latitude/3.14159265359
  );
  vec3 encoded=max(texture(uSkyTexture,sampleUv).rgb,vec3(0.0));
  vec3 linear=mix(encoded,srgbToLinear(encoded),clamp(uSkyTextureSrgb,0.,1.));
  return linear*max(uSkyExposure,0.0);
}

void main(){
  vec4 source=texture(uTex,vUv);
  // The world pass clears untouched pixels to uClearColor. Replace only that
  // exact background, so the sky is always active without covering geometry.
  if(uSkyEnabled>0.5 && distance(source.rgb,uClearColor)<0.004){
    vec3 viewDirection=worldDirectionForUv(vUv);
    vec3 worldDirection=normalize((uInverseView*vec4(viewDirection,0.0)).xyz);
    source.rgb=uSkyTextureEnabled>0.5
      ? equirectangularSky(vUv)
      : skyBackground(vUv);
    vec4 clouds=volumetricClouds(worldDirection);
    source.rgb=source.rgb* (1.0-clouds.a)+clouds.rgb;
  }
  // Exposure operates in scene-linear space; tone mapping prevents HDR
  // highlights from clipping before the selected output transfer function.
  vec3 color=max(source.rgb,vec3(0.))*max(uExposure,0.);
  color=mix(color,reinhardToneMap(color),clamp(uToneMap,0.,1.));
  float edge=distance(vUv,vec2(.5));
  float vignette=smoothstep(.35,.78,edge);
  color*=1.-clamp(uVignette,0.,1.)*vignette;
  if(uOutputEncoding>.5) color=linearToSrgb(max(color,vec3(0.)));
  // Atmospheric precipitation is submitted as depth-tested world geometry;
  // the present pass must never paint weather over unrelated surfaces.
  // A stable screen-space grain keeps captures reproducible for a fixed
  // viewport while still giving the dark gothic presentation a fine film
  // texture. It is deliberately tiny and never changes alpha.
  color+=((hash(gl_FragCoord.xy)-.5)*.06)*max(uGrain,0.);
  oColor=vec4(clamp(color,0.,1.),source.a);
}
