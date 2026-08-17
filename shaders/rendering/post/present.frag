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

vec3 srgbToLinear(vec3 color){
  vec3 low=color/12.92;
  vec3 high=pow((color+0.055)/1.055,vec3(2.4));
  return mix(low,high,step(vec3(0.04045),color));
}

vec3 equirectangularSky(vec2 uv){
  vec2 ndc=uv*2.0-1.0;
  vec4 viewPoint=uInverseProjection*vec4(ndc,1.0,1.0);
  vec3 viewDirection=normalize(viewPoint.xyz/viewPoint.w);
  vec3 worldDirection=normalize((uInverseView*vec4(viewDirection,0.0)).xyz);
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
    source.rgb=uSkyTextureEnabled>0.5
      ? equirectangularSky(vUv)
      : skyBackground(vUv);
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
