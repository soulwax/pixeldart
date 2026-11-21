// VRP Clustered Forward+ Lighting (S3-B)
// Samples froxel cluster grid & light index list to evaluate >=256 punctual lights.

uniform ivec3 uClusterDims;
uniform vec2 uClusterNearFar;
uniform vec2 uViewportSize;
uniform int uClusteredLightCount;
uniform highp usampler2D uClusterGridTex;
uniform highp usampler2D uLightIndexTex;
uniform highp sampler2D uPunctualLightDataTex;

int vrpComputeClusterZ(float viewDepth, float nearZ, float farZ, int dimZ) {
  float d = clamp(viewDepth, nearZ, farZ);
  float slice = log(d / max(nearZ, 1e-4)) / max(log(farZ / max(nearZ, 1e-4)), 1e-4);
  return clamp(int(floor(slice * float(dimZ))), 0, dimZ - 1);
}

ivec3 vrpComputeClusterCoord(vec2 fragCoord, float viewDepth) {
  int cx = clamp(int(floor((fragCoord.x / max(uViewportSize.x, 1.0)) * float(uClusterDims.x))), 0, uClusterDims.x - 1);
  int cy = clamp(int(floor((fragCoord.y / max(uViewportSize.y, 1.0)) * float(uClusterDims.y))), 0, uClusterDims.y - 1);
  int cz = vrpComputeClusterZ(viewDepth, uClusterNearFar.x, uClusterNearFar.y, uClusterDims.z);
  return ivec3(cx, cy, cz);
}

vec3 vrpClusterHeatmapColor(int count) {
  float t = clamp(float(count) / 16.0, 0.0, 1.0);
  if (t < 0.25) return mix(vec3(0.0, 0.1, 0.35), vec3(0.0, 0.7, 0.9), t * 4.0);
  if (t < 0.5) return mix(vec3(0.0, 0.7, 0.9), vec3(0.2, 0.9, 0.2), (t - 0.25) * 4.0);
  if (t < 0.75) return mix(vec3(0.2, 0.9, 0.2), vec3(1.0, 0.85, 0.0), (t - 0.5) * 4.0);
  return mix(vec3(1.0, 0.85, 0.0), vec3(1.0, 0.1, 0.1), (t - 0.75) * 4.0);
}

vec3 vrpEvaluateClusteredLights(
  vec2 fragCoord,
  float viewDepth,
  vec3 worldPos,
  vec3 N,
  vec3 V,
  VrpSurface s,
  out int outClusterLightCount
) {
  outClusterLightCount = 0;
  if (uClusteredLightCount <= 0) return vec3(0.0);

  ivec3 c = vrpComputeClusterCoord(fragCoord, viewDepth);
  int clusterIdx = (c.z * uClusterDims.y + c.y) * uClusterDims.x + c.x;
  int gridW = max(uClusterDims.x * uClusterDims.y, 1);
  uvec2 header = texelFetch(uClusterGridTex, ivec2(clusterIdx % gridW, clusterIdx / gridW), 0).rg;
  int offset = int(header.r);
  int count = int(header.g);
  outClusterLightCount = count;

  vec3 accum = vec3(0.0);
  for (int i = 0; i < 64; i++) {
    if (i >= count) break;
    int listIdx = offset + i;
    int lightId = int(texelFetch(uLightIndexTex, ivec2(listIdx & 255, listIdx >> 8), 0).r);
    if (lightId >= uClusteredLightCount) continue;

    vec4 posRange = texelFetch(uPunctualLightDataTex, ivec2(0, lightId), 0);
    vec4 colorInt = texelFetch(uPunctualLightDataTex, ivec2(1, lightId), 0);
    vec4 dirType = texelFetch(uPunctualLightDataTex, ivec2(2, lightId), 0);
    vec4 coneShadow = texelFetch(uPunctualLightDataTex, ivec2(3, lightId), 0);

    vec3 toLight = posRange.xyz - worldPos;
    float dist = length(toLight);
    if (dist >= posRange.w) continue;

    vec3 L = toLight / max(dist, 1e-5);
    float atten = vrpRangeAttenuation(dist, posRange.w);
    if (dirType.w > 0.5) {
      atten *= vrpSpotConeAttenuation(-L, normalize(dirType.xyz), coneShadow.x, coneShadow.y);
    }
    if (atten <= 0.0) continue;

    vec3 brdf = vrpEvaluateDirectBRDF(
      N, V, L, s.albedo, s.metallic, s.roughness, s.clearcoat, s.clearcoatRoughness
    );
    accum += brdf * colorInt.rgb * colorInt.w * atten;
  }
  return accum;
}
