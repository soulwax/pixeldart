// VRP Shared Lit Shader Uniforms & Helpers (S3-A)

float vrpRangeAttenuation(float dist, float range) {
  float invRange = 1.0 / max(range, 0.001);
  float ratio = clamp(dist * invRange, 0.0, 1.0);
  float r2 = ratio * ratio;
  float cutoff = max(1.0 - r2 * r2, 0.0);
  return (cutoff * cutoff) / (1.0 + dist * dist * invRange * invRange);
}

float vrpSpotConeAttenuation(vec3 lightToFragDir, vec3 spotDir, float cosInner, float cosOuter) {
  float cosAngle = dot(lightToFragDir, spotDir);
  return smoothstep(cosOuter, cosInner, cosAngle);
}

vec3 vrpApplyFog(vec3 color, float viewDepth, vec3 fogColor, float fogStart, float fogEnd, float fogDensity) {
  if (fogDensity <= 0.0) return color;
  float t = clamp((viewDepth - fogStart) / max(fogEnd - fogStart, 0.001), 0.0, 1.0);
  float factor = clamp(1.0 - exp(-t * fogDensity * 2.0), 0.0, 1.0);
  return mix(color, fogColor, factor);
}
