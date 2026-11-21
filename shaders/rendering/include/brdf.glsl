// VRP Physically-Based BRDF (S3-A):
// GGX NDF, height-correlated Smith visibility, Schlick Fresnel,
// Kulla-Conty / Fdez-Aguera multi-scatter energy compensation, and clearcoat.

float vrpDistributionGGX(float NdotH, float alpha) {
  float a2 = alpha * alpha;
  float denom = (NdotH * NdotH) * (a2 - 1.0) + 1.0;
  return a2 / max(VRP_PI * denom * denom, 1e-7);
}

float vrpVisibilitySmithGGXCorrelated(float NdotV, float NdotL, float alpha) {
  float a2 = alpha * alpha;
  float lambdaV = NdotL * sqrt(max(NdotV * NdotV * (1.0 - a2) + a2, 1e-7));
  float lambdaL = NdotV * sqrt(max(NdotL * NdotL * (1.0 - a2) + a2, 1e-7));
  return 0.5 / max(lambdaV + lambdaL, 1e-7);
}

float vrpVisibilityKelemen(float LdotH) {
  return 0.25 / max(LdotH * LdotH, 1e-5);
}

vec3 vrpFresnelSchlick(float cosTheta, vec3 F0) {
  float f = pow(vrpSaturate(1.0 - cosTheta), 5.0);
  return F0 + (1.0 - F0) * f;
}

// Analytic single-scatter directional albedo approximation for GGX
// (Karis / Fdez-Aguera) used for multi-scatter energy compensation.
float vrpApproxDirectionalAlbedo(float NdotV, float roughness) {
  vec2 r = vec2(roughness, 1.0 - NdotV);
  float c0 = -1.0 * r.x + 0.0425;
  float c1 = 1.04 * r.x + 0.04;
  float a004 = min(r.x * r.x, exp2(-9.28 * NdotV)) * c0 + c1;
  return vrpSaturate(1.0 - a004 * 0.45);
}

vec3 vrpMultiScatterEnergyCompensation(vec3 F0, float NdotV, float roughness) {
  float ess = max(vrpApproxDirectionalAlbedo(NdotV, roughness), 0.05);
  float ems = 1.0 - ess;
  vec3 fAvg = F0 + (1.0 - F0) / 21.0;
  return 1.0 + F0 * (ems / ess) * fAvg;
}

vec3 vrpEvaluateDirectBRDF(
  vec3 N,
  vec3 V,
  vec3 L,
  vec3 albedo,
  float metallic,
  float roughness,
  float clearcoat,
  float clearcoatRoughness
) {
  float NdotL = max(dot(N, L), 0.0);
  if (NdotL <= 0.0) return vec3(0.0);
  float NdotV = max(dot(N, V), 1e-4);
  vec3 H = normalize(V + L);
  float NdotH = max(dot(N, H), 0.0);
  float VdotH = max(dot(V, H), 0.0);
  float LdotH = max(dot(L, H), 0.0);

  float clampedRoughness = clamp(roughness, 0.045, 1.0);
  float alpha = clampedRoughness * clampedRoughness;

  vec3 F0 = mix(vec3(0.04), albedo, metallic);
  float D = vrpDistributionGGX(NdotH, alpha);
  float Vis = vrpVisibilitySmithGGXCorrelated(NdotV, NdotL, alpha);
  vec3 F = vrpFresnelSchlick(VdotH, F0);
  vec3 energyComp = vrpMultiScatterEnergyCompensation(F0, NdotV, clampedRoughness);

  vec3 specular = (D * Vis) * F * energyComp;
  vec3 kD = (vec3(1.0) - F) * (1.0 - metallic);
  vec3 diffuse = kD * albedo * VRP_INV_PI;
  vec3 color = diffuse + specular;

  if (clearcoat > 0.001) {
    float ccRough = clamp(clearcoatRoughness, 0.045, 1.0);
    float ccAlpha = ccRough * ccRough;
    float Dc = vrpDistributionGGX(NdotH, ccAlpha);
    float Vc = vrpVisibilityKelemen(LdotH);
    float Fc = vrpFresnelSchlick(LdotH, vec3(0.04)).r * clearcoat;
    color = color * (1.0 - Fc) + vec3(Dc * Vc * Fc);
  }

  return color * NdotL;
}
