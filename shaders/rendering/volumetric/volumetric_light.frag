#version 300 es
precision highp float;

in vec2 vUv;
layout(location = 0) out vec4 oColor;

uniform sampler2D uSceneDepth;
uniform float uNear;
uniform float uFar;
uniform mat4 uViewProjection;
uniform vec3 uLightDir;
uniform vec3 uLightColor;
uniform float uShaftIntensity;
uniform float uFogDensity;
uniform float uAnisotropy;
uniform float uVolumetricSourceCount;

uniform vec3 uSourcePosition0;
uniform vec3 uSourceColor0;
uniform float uSourceIntensity0;
uniform float uSourceReferenceDistance0;
uniform float uSourceCutoffDistance0;
uniform vec3 uSourcePosition1;
uniform vec3 uSourceColor1;
uniform float uSourceIntensity1;
uniform float uSourceReferenceDistance1;
uniform float uSourceCutoffDistance1;
uniform vec3 uSourcePosition2;
uniform vec3 uSourceColor2;
uniform float uSourceIntensity2;
uniform float uSourceReferenceDistance2;
uniform float uSourceCutoffDistance2;
uniform vec3 uSourcePosition3;
uniform vec3 uSourceColor3;
uniform float uSourceIntensity3;
uniform float uSourceReferenceDistance3;
uniform float uSourceCutoffDistance3;

float linearDepth(float depth) {
  float z = depth * 2.0 - 1.0;
  return (2.0 * uNear * uFar) / max(uFar + uNear - z * (uFar - uNear), 1e-4);
}

float phaseHenyeyGreenstein(float cosTheta, float anisotropy) {
  float g = clamp(anisotropy, -0.85, 0.85);
  float denominator = 1.0 + g * g - 2.0 * g * cosTheta;
  return (1.0 - g * g) / (12.5663706 * pow(max(denominator, 1e-3), 1.5));
}

vec3 sourceContribution(
  vec3 position,
  vec3 color,
  float intensity,
  float referenceDistance,
  float cutoffDistance,
  vec3 viewRay
) {
  vec4 clip = uViewProjection * vec4(position, 1.0);
  if (clip.w <= 0.0) return vec3(0.0);
  vec2 sourceUv = clip.xy / clip.w * 0.5 + 0.5;
  float screenDistance = distance(vUv, sourceUv);
  float radius = max(referenceDistance / max(clip.w, 1.0), 0.002);
  float disc = 1.0 - smoothstep(radius * 0.35, radius, screenDistance);
  float depthFade = 1.0 - smoothstep(cutoffDistance * 0.65, cutoffDistance, clip.w);
  float inverseSquare = intensity * referenceDistance * referenceDistance /
      max(clip.w * clip.w, referenceDistance * referenceDistance);
  float phase = phaseHenyeyGreenstein(dot(normalize(-uLightDir), viewRay), uAnisotropy);
  return color * (disc * depthFade * inverseSquare * phase);
}

void main() {
  float depth = texture(uSceneDepth, vUv).r;
  float rayLength = min(linearDepth(depth), uFar);
  vec3 viewRay = normalize(vec3(vUv * 2.0 - 1.0, 1.0));
  float density = max(uFogDensity, 0.0);

  // A fixed, bounded integral keeps the pass deterministic and makes its
  // cost predictable on weak adapters. The depth buffer stops integration at
  // the first opaque surface, so shafts do not leak through geometry.
  const int sampleCount = 12;
  vec3 scatter = vec3(0.0);
  float transmittance = 1.0;
  float stepLength = rayLength / float(sampleCount);
  for (int i = 0; i < sampleCount; i++) {
    float distanceAlongRay = (float(i) + 0.5) * stepLength;
    float heightWeight = exp(-max(distanceAlongRay * 0.02, 0.0));
    float opticalDepth = density * stepLength * heightWeight;
    float sampleTransmittance = exp(-opticalDepth);
    float phase = phaseHenyeyGreenstein(dot(normalize(-uLightDir), viewRay), uAnisotropy);
    scatter += transmittance * (uLightColor * uShaftIntensity * phase) * opticalDepth;
    transmittance *= sampleTransmittance;
  }

  if (uVolumetricSourceCount > 0.5) {
    scatter += sourceContribution(
      uSourcePosition0, uSourceColor0, uSourceIntensity0,
      uSourceReferenceDistance0, uSourceCutoffDistance0, viewRay);
  }
  if (uVolumetricSourceCount > 1.5) {
    scatter += sourceContribution(
      uSourcePosition1, uSourceColor1, uSourceIntensity1,
      uSourceReferenceDistance1, uSourceCutoffDistance1, viewRay);
  }
  if (uVolumetricSourceCount > 2.5) {
    scatter += sourceContribution(
      uSourcePosition2, uSourceColor2, uSourceIntensity2,
      uSourceReferenceDistance2, uSourceCutoffDistance2, viewRay);
  }
  if (uVolumetricSourceCount > 3.5) {
    scatter += sourceContribution(
      uSourcePosition3, uSourceColor3, uSourceIntensity3,
      uSourceReferenceDistance3, uSourceCutoffDistance3, viewRay);
  }

  // Fade the final sample at the far plane and keep the additive output
  // bounded so a storm flash cannot blow out the entire frame.
  float farFade = 1.0 - smoothstep(uFar * 0.75, uFar, rayLength);
  oColor = vec4(min(scatter * farFade, vec3(8.0)), 1.0);
}
