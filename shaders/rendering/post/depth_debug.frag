#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uSceneDepth;
uniform float uNear;
uniform float uFar;
uniform float uDisplayRange;
out vec4 oColor;
void main(){
  float raw=texture(uSceneDepth,vUv).r;
  float ndc=raw*2.0-1.0;
  float linear=(2.0*uNear*uFar)/(uFar+uNear-ndc*(uFar-uNear));
  // uFar is the camera's real projection far plane (100, for correct depth
  // reconstruction above) — normalizing display shade against it directly
  // would crush every visible surface (a handful of units away) into a
  // sliver near 0.0, indistinguishable from black, while the empty
  // background (which clears to exactly uFar) reads pure white. uDisplayRange
  // is a separate, much smaller distance chosen to match this scene's
  // actual scale, so nearby geometry spans a real visible gradient instead
  // of a hard silhouette.
  float shade=clamp(linear/uDisplayRange,0.0,1.0);
  oColor=vec4(vec3(shade),1.0);
}
