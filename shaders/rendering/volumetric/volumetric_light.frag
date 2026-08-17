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
uniform mat4 uView;
uniform mat4 uInverseProjection;
uniform vec3 uVolumetricAlbedo;
uniform float uVolumetricHeightFalloff;
uniform float uVolumetricDustDensity;
uniform float uVolumetricJitter;
uniform float uVolumetricIntensity;
uniform float uVolumetricSampleCount;
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
  vec3 viewRay,
  float rayLength
) {
  vec4 clip = uViewProjection * vec4(position, 1.0);
  if (clip.w <= 0.0) return vec3(0.0);
  vec3 sourceView = (uView * vec4(position, 1.0)).xyz;
  float sourceDistance = length(sourceView);
  float tClosest = clamp(dot(sourceView, viewRay), 0.0, rayLength);
  vec3 sampleToSource = sourceView - viewRay * tClosest;
  float distanceToSource = max(length(sampleToSource), 1e-3);
  float cutoff = 1.0 - smoothstep(
    cutoffDistance * 0.65, cutoffDistance, sourceDistance);
  float inverseSquare = intensity * referenceDistance * referenceDistance /
      max(distanceToSource * distanceToSource,
          referenceDistance * referenceDistance);
  // The incoming direction is source -> sample and the outgoing direction is
  // sample -> camera. This is the same phase convention as the directional
  // medium path, but now evaluated against the located source.
  float phase = phaseHenyeyGreenstein(
    dot(normalize(sampleToSource), viewRay), uAnisotropy);
  // Located practicals and lightning must also acquire visible body in a
  // dust-filled room. Use the same broad haze plus particulate density as the
  // directional march; otherwise a clear-air fog toggle would accidentally
  // erase dust-lit source rays while the directional shafts still showed it.
  float mediumDensity = max(uFogDensity + uVolumetricDustDensity, 0.0);
  float mediumWeight = 1.0 - exp(-max(
    mediumDensity * min(rayLength, cutoffDistance), 0.0));
  float pathWeight = clamp(
    rayLength / max(sourceDistance, referenceDistance), 0.0, 1.0);
  return color * inverseSquare * phase * cutoff * mediumWeight * pathWeight *
    uVolumetricIntensity * 0.35;
}

void main() {
  float depth = texture(uSceneDepth, vUv).r;
  vec4 viewPoint = uInverseProjection * vec4(vUv * 2.0 - 1.0, -1.0, 1.0);
  viewPoint /= max(abs(viewPoint.w), 1e-5);
  vec3 viewRay = normalize(viewPoint.xyz);
  // linearDepth is camera-space Z; convert it to distance along the actual
  // reconstructed ray so wide and tall projections integrate equally.
  float cameraDepth = linearDepth(depth);
  float rayLength = min(cameraDepth / max(-viewRay.z, 1e-3), uFar);
  float density = max(uFogDensity, 0.0);

  // A fixed, bounded integral keeps the pass deterministic and makes its
  // cost predictable on weak adapters. The depth buffer stops integration at
  // the first opaque surface, so shafts do not leak through geometry.
  const int maxSampleCount = 24;
  int sampleCount = int(clamp(uVolumetricSampleCount, 4.0, 24.0));
  vec3 scatter = vec3(0.0);
  float transmittance = 1.0;
  float stepLength = rayLength / float(sampleCount);
  float jitterSeed = fract(sin(dot(vUv, vec2(127.1, 311.7))) * 43758.5453);
  float jitter = (jitterSeed - 0.5) * clamp(uVolumetricJitter, 0.0, 0.5);
  for (int i = 0; i < maxSampleCount; i++) {
    if (i >= sampleCount) break;
    float distanceAlongRay = clamp(
      (float(i) + 0.5 + jitter) * stepLength, 0.0, rayLength);
    float heightWeight = exp(-max(distanceAlongRay * uVolumetricHeightFalloff, 0.0));
    // Dust is a separate, host-resolved particulate phase. It is denser near
    // the occupied room volume than the broad atmospheric haze, so shafts gain
    // visible body without turning the far horizon opaque. At zero density the
    // extra term is exactly zero and the established fog path is unchanged.
    float dustWeight = exp(-max(distanceAlongRay *
      uVolumetricHeightFalloff * 0.45, 0.0));
    float opticalDensity = density +
      max(uVolumetricDustDensity, 0.0) * dustWeight;
    float opticalDepth = opticalDensity * stepLength * heightWeight;
    float sampleTransmittance = exp(-opticalDepth);
    float phase = phaseHenyeyGreenstein(dot(normalize(-uLightDir), viewRay), uAnisotropy);
    scatter += transmittance * (uLightColor * uVolumetricAlbedo *
      uShaftIntensity * uVolumetricIntensity * phase) * opticalDepth;
    transmittance *= sampleTransmittance;
  }

  if (uVolumetricSourceCount > 0.5) {
    scatter += sourceContribution(
      uSourcePosition0, uSourceColor0, uSourceIntensity0,
      uSourceReferenceDistance0, uSourceCutoffDistance0, viewRay, rayLength);
  }
  if (uVolumetricSourceCount > 1.5) {
    scatter += sourceContribution(
      uSourcePosition1, uSourceColor1, uSourceIntensity1,
      uSourceReferenceDistance1, uSourceCutoffDistance1, viewRay, rayLength);
  }
  if (uVolumetricSourceCount > 2.5) {
    scatter += sourceContribution(
      uSourcePosition2, uSourceColor2, uSourceIntensity2,
      uSourceReferenceDistance2, uSourceCutoffDistance2, viewRay, rayLength);
  }
  if (uVolumetricSourceCount > 3.5) {
    scatter += sourceContribution(
      uSourcePosition3, uSourceColor3, uSourceIntensity3,
      uSourceReferenceDistance3, uSourceCutoffDistance3, viewRay, rayLength);
  }

  // Fade the final sample at the far plane and keep the additive output
  // bounded so a storm flash cannot blow out the entire frame.
  float farFade = 1.0 - smoothstep(uFar * 0.75, uFar, rayLength);
  oColor = vec4(min(scatter * farFade, vec3(8.0)), 1.0);
}
