#version 300 es
layout(location=0) in vec3 aPosition;
layout(location=4) in vec3 aUvMat;
uniform mat4 uLightViewProjection;
uniform mat4 uModel;
out highp vec2 vUv;
// No affine premultiply here, unlike depth_prepass.vert. Affine sampling is
// an artifact of *this camera's* screen-space rasterization; the shadow map
// rasterizes the same triangle from the light, where the equivalent warp
// would be a different, unrelated distortion. A masked surface therefore
// cuts its shadow from the perspective-correct UVs — the geometrically
// right holes — while the camera passes cut theirs from whatever the PS1
// profile asked for. That divergence is deliberate: the two rasterizations
// have no shared screen space to agree in.
void main(){
  vUv=aUvMat.xy;
  gl_Position=uLightViewProjection*uModel*vec4(aPosition,1.0);
}
