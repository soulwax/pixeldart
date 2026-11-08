#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uScene;
uniform sampler2D uHistory;
uniform float uTime;
uniform float uChromaWeight;
uniform float uTrackingWeight;
uniform float uNoiseWeight;
uniform float uHeadSwitchWeight;
uniform float uDropoutWeight;
uniform float uGhostWeight;
out vec4 oColor;

float hash(vec2 p){
  return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);
}

// §8.10: "sample the jittered/tracking UV before YIQ/chroma work so later
// sampling does not overwrite earlier effects" — tracking jitter is
// computed and applied to the UV exactly once, up front; every later
// effect either operates on the resulting single sample or samples a
// further offset FROM that same jittered UV, never re-reading uScene at
// the original vUv.
void main(){
  float scanline=vUv.y;

  // Tracking: a per-scanline horizontal jitter, re-rolled roughly 8 times
  // a second (not per-frame) so it reads as tape wobble rather than
  // high-frequency noise. Comfort clamp: 0.02 UV (a few source texels at
  // this bootstrap's 384-wide internal resolution) is the max displacement
  // regardless of weight — a weight of 1.0 must read as "visibly glitchy,"
  // never as "the image is unreadable."
  float trackingNoise=hash(vec2(floor(scanline*216.0),floor(uTime*8.0)))-0.5;
  float jitter=trackingNoise*0.02*uTrackingWeight;
  vec2 uv=vec2(clamp(vUv.x+jitter,0.0,1.0),vUv.y);
  vec3 raw=texture(uScene,uv).rgb;

  // Chroma bleed: convert to YIQ, sample a second, further-offset UV for
  // the chroma (I/Q) channels only — luma (what reads as "sharp" to the
  // eye) stays exactly where tracking already put it; only color smears.
  vec2 chromaUv=vec2(clamp(uv.x+0.01*uChromaWeight,0.0,1.0),uv.y);
  vec3 rawChroma=texture(uScene,chromaUv).rgb;
  float y=dot(raw,vec3(0.299,0.587,0.114));
  float i=dot(rawChroma,vec3(0.596,-0.274,-0.322));
  float q=dot(rawChroma,vec3(0.211,-0.523,0.312));
  vec3 yiqColor=vec3(
    y+0.956*i+0.621*q,
    y-0.272*i-0.647*q,
    y-1.106*i+1.703*q
  );
  vec3 color=mix(raw,yiqColor,uChromaWeight);

  // Static/snow: modeled in YIQ (luma + chroma), the same conversion
  // chroma bleed already uses above, not independent RGB — real analog
  // colour noise comes from the chroma subcarrier, so its hues are
  // correlated/limited rather than arbitrary per-channel static. Noise
  // cells are quantized coarser along x than y, giving each speckle a
  // short horizontal dash instead of an isolated dot — a "vague line
  // shape," matching how scanline-based static actually streaks. A
  // sparser, stronger sparkle layer and a rare single-sample micro-
  // distortion (an actual tiny position offset, not just colour) are both
  // gated by a high-threshold mask so only occasional pixels carry the
  // effect — small magnitude on top of that sparsity, for a sprinkle, not
  // a wash.
  vec2 noiseCell=vec2(floor(gl_FragCoord.x/3.0),gl_FragCoord.y)+uTime*60.0;
  float noiseY=(hash(noiseCell)-0.5)*0.05;
  float noiseI=(hash(noiseCell+vec2(17.0,3.0))-0.5)*0.14;
  float noiseQ=(hash(noiseCell+vec2(53.0,29.0))-0.5)*0.14;
  vec3 noiseYiq=vec3(
    noiseY+0.956*noiseI+0.621*noiseQ,
    noiseY-0.272*noiseI-0.647*noiseQ,
    noiseY-1.106*noiseI+1.703*noiseQ
  );
  color+=noiseYiq*uNoiseWeight;
  float sparkleMask=step(0.995,hash(noiseCell+vec2(97.0,3.0)));
  float sparkleI=(hash(noiseCell+5.0)-0.5)*2.0;
  float sparkleQ=(hash(noiseCell+9.0)-0.5)*2.0;
  vec3 sparkleYiq=0.5+0.5*vec3(
    0.956*sparkleI+0.621*sparkleQ,
    -0.272*sparkleI-0.647*sparkleQ,
    -1.106*sparkleI+1.703*sparkleQ
  );
  color+=sparkleYiq*sparkleMask*0.3*uNoiseWeight;
  float distortMask=step(0.997,hash(noiseCell+vec2(43.0,61.0)));
  vec2 distortOffset=
    vec2(hash(noiseCell+1.0)-0.5,hash(noiseCell+2.0)-0.5)*0.01;
  vec3 distortColor=texture(uScene,clamp(uv+distortOffset,0.0,1.0)).rgb;
  color=mix(color,distortColor,distortMask*0.5*uNoiseWeight);

  // Head-switch band: a thin strip near the bottom of frame (where a real
  // VCR's playback head crosses the tape edge) gets a stronger tear,
  // fading smoothly over the band's height rather than a hard cutoff.
  float headSwitchBand=smoothstep(0.06,0.0,abs(scanline-0.98));
  float headSwitchJitter=(hash(vec2(uTime*30.0,scanline))-0.5)*0.06;
  vec2 headSwitchUv=vec2(
    clamp(uv.x+headSwitchJitter*uHeadSwitchWeight*headSwitchBand,0.0,1.0),
    uv.y
  );
  vec3 headSwitchColor=texture(uScene,headSwitchUv).rgb;
  color=mix(color,headSwitchColor,uHeadSwitchWeight*headSwitchBand);

  // Dropout: sparse, per-scanline streaks mimicking analog tape dropout.
  // Real dropout is neither a flat full-width bar nor a fixed brightness —
  // a per-x noise mask (smoothstepped, not a hard cutoff) makes each
  // streak's width and edges vary along its length, and a per-streak
  // random intensity keeps consecutive dropouts from looking identical. A
  // slow ~6Hz reroll (not per-frame) and a high activation threshold keep
  // this an occasional glitch rather than a strobe — subtle enough not to
  // distract during continuous play, even at uDropoutWeight's full value.
  float dropoutCell=floor(uTime*6.0);
  float dropoutRoll=hash(vec2(floor(scanline*216.0),dropoutCell));
  float dropoutActive=step(0.994,dropoutRoll);
  float dropoutIntensity=hash(vec2(dropoutCell,17.0))*0.5+0.4;
  float dropoutMask=hash(
    vec2(floor(uv.x*48.0),floor(scanline*216.0)+dropoutCell*3.0)
  );
  float dropoutStripe=
    dropoutActive*uDropoutWeight*smoothstep(0.3,0.9,dropoutMask);
  color=mix(color,vec3(dropoutIntensity),dropoutStripe*0.8);

  // Ghosting: blends in last frame's own VHS *output* (uHistory, never
  // uScene), horizontally offset, for a trailing double-image echo —
  // reading the previous frame's already-composited result is what makes
  // this a genuine feedback trail rather than a static double-exposure.
  vec2 ghostUv=vec2(clamp(uv.x-0.015,0.0,1.0),uv.y);
  vec3 ghostColor=texture(uHistory,ghostUv).rgb;
  color=mix(color,ghostColor,uGhostWeight*0.5);

  oColor=vec4(clamp(color,0.0,1.0),1.0);
}
