#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uSharp;
uniform sampler2D uBlurred;
uniform sampler2D uSceneDepth;
uniform float uNear;
uniform float uFar;
uniform float uFocusDistance;
uniform float uFocusRange;
uniform float uStrength;
out vec4 oColor;

float linearDepth(float raw){
  float ndc=raw*2.0-1.0;
  return (2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));
}

void main(){
  if(uStrength<=0.0001){
    oColor=vec4(texture(uSharp,vUv).rgb,1.0);
    return;
  }

  vec2 texelSize=1.0/vec2(textureSize(uSharp,0));
  float depth=linearDepth(texture(uSceneDepth,vUv).r);

  // Signed disparity relative to physical focal plane:
  // Foreground (signedDisparity < 0) exhibits optical hyper-focal expansion,
  // blurring at a steeper rate than background (signedDisparity > 0).
  float signedDisparity=depth-uFocusDistance;
  float normRange=max(uFocusRange,0.0001);
  float signedCoc=(signedDisparity<0.0)
    ?(signedDisparity/(normRange*0.75))
    :(signedDisparity/(normRange*1.25));
  float rawCoc=clamp(abs(signedCoc),0.0,1.0)*clamp(uStrength,0.0,1.0);

  // Depth-aware disparity weighting to prevent out-of-focus foreground halos
  // from bleeding over sharp in-focus background edges.
  float depthN=linearDepth(texture(uSceneDepth,vUv+vec2(0.0,texelSize.y*2.0)).r);
  float depthS=linearDepth(texture(uSceneDepth,vUv-vec2(0.0,texelSize.y*2.0)).r);
  float depthE=linearDepth(texture(uSceneDepth,vUv+vec2(texelSize.x*2.0,0.0)).r);
  float depthW=linearDepth(texture(uSceneDepth,vUv-vec2(texelSize.x*2.0,0.0)).r);
  float minNeighborDepth=min(min(depthN,depthS),min(depthE,depthW));

  // If this pixel is in-focus background but neighbors are close foreground,
  // suppress foreground halo bleeding onto this sharp pixel.
  float coc=rawCoc;
  if(depth>uFocusDistance && minNeighborDepth<uFocusDistance){
    float bleedProtection=clamp((depth-minNeighborDepth)/(normRange*2.0),0.0,1.0);
    coc=mix(rawCoc,rawCoc*0.25,bleedProtection);
  }

  // Smooth cubic hermite curve for cinematic optical circle of confusion
  float smoothCoc=coc*coc*(3.0-2.0*coc);

  // Longitudinal (axial) chromatic aberration inside the optical bokeh circle:
  // Out-of-focus highlights separate into subtle complementary chromatic fringes.
  vec2 radialDir=vUv-vec2(0.5);
  float radialDist=length(radialDir);
  vec2 chromaDir=(radialDist>0.001)?(radialDir/radialDist):vec2(0.0,1.0);
  vec2 chromaOffset=chromaDir*(smoothCoc*texelSize*2.8*sign(signedDisparity));

  vec3 blurred=vec3(
    texture(uBlurred,vUv-chromaOffset).r,
    texture(uBlurred,vUv).g,
    texture(uBlurred,vUv+chromaOffset).b
  );

  vec3 sharp=texture(uSharp,vUv).rgb;
  oColor=vec4(mix(sharp,blurred,smoothCoc),1.0);
}
