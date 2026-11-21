// VRP Image-Based Lighting (S4-A / S4-B):
// SH9 diffuse irradiance, GGX split-sum specular IBL, and box-projected probes.

layout(std140) uniform EnvironmentBlock {
  vec4 uEnvSh[9];
  vec4 uEnvParams; // x=exposure, y=iblIntensity, z=probeBlendWeight, w=skyRot
};

vec3 vrpEvaluateSh9Irradiance(vec3 n) {
  float x = n.x;
  float y = n.y;
  float z = n.z;
  vec3 irrad =
    uEnvSh[0].rgb * 0.2820948 +
    uEnvSh[1].rgb * (0.4886025 * y) +
    uEnvSh[2].rgb * (0.4886025 * z) +
    uEnvSh[3].rgb * (0.4886025 * x) +
    uEnvSh[4].rgb * (1.0925484 * x * y) +
    uEnvSh[5].rgb * (1.0925484 * y * z) +
    uEnvSh[6].rgb * (0.3153916 * (3.0 * z * z - 1.0)) +
    uEnvSh[7].rgb * (1.0925484 * x * z) +
    uEnvSh[8].rgb * (0.5462742 * (x * x - y * y));
  return max(irrad, vec3(0.0)) * uEnvParams.y;
}

vec3 vrpBoxProjectReflection(vec3 worldPos, vec3 reflDir, vec3 probePos, vec3 boxMin, vec3 boxMax) {
  vec3 invDir = 1.0 / max(abs(reflDir), vec3(1e-5)) * sign(reflDir);
  vec3 tMax = (boxMax - worldPos) * invDir;
  vec3 tMin = (boxMin - worldPos) * invDir;
  vec3 tFar = max(tMax, tMin);
  float dist = min(min(tFar.x, tFar.y), tFar.z);
  vec3 hitPos = worldPos + reflDir * dist;
  return normalize(hitPos - probePos);
}

vec3 vrpEvaluateSplitSumIbl(
  samplerCube prefilterMap,
  sampler2D brdfLut,
  vec3 N,
  vec3 V,
  vec3 F0,
  float roughness,
  float maxMipLevel
) {
  float NdotV = max(dot(N, V), 1e-4);
  vec3 R = reflect(-V, N);
  vec3 prefiltered = textureLod(prefilterMap, R, roughness * maxMipLevel).rgb;
  vec2 envBrdf = texture(brdfLut, vec2(NdotV, roughness)).rg;
  return prefiltered * (F0 * envBrdf.x + envBrdf.y) * uEnvParams.y;
}
