// VRP Surface Evaluation (S3-A)

struct VrpSurface {
  vec3 albedo;
  float alpha;
  vec3 normal;
  float metallic;
  float roughness;
  float ao;
  vec3 emissive;
  float clearcoat;
  float clearcoatRoughness;
};

VrpSurface vrpEvaluateSurface(
  vec2 uv,
  vec4 vertColor,
  vec3 worldNormal,
  vec4 worldTangent,
  sampler2D albedoTex,
  sampler2D normalTex,
  sampler2D ormTex,
  sampler2D emissiveTex,
  vec3 materialTint,
  float normalStrength,
  float roughnessFactor,
  float metallicFactor,
  float occlusionStrength,
  float emissiveStrength,
  float clearcoatStrength,
  float clearcoatRoughnessFactor,
  float alphaCutoff
) {
  VrpSurface s;
  vec4 albedoSample = texture(albedoTex, uv);
  s.albedo = albedoSample.rgb * vertColor.rgb * materialTint;
  s.alpha = albedoSample.a * vertColor.a;

#ifdef VRP_ALPHA_TEST
  if (s.alpha < alphaCutoff) {
    discard;
  }
#endif

  vec3 N = normalize(worldNormal);
#ifdef VRP_NORMAL_MAP
  vec3 T = normalize(worldTangent.xyz - N * dot(N, worldTangent.xyz));
  vec3 B = cross(N, T) * worldTangent.w;
  vec3 nSample = texture(normalTex, uv).xyz * 2.0 - 1.0;
  nSample.xy *= normalStrength;
  N = normalize(T * nSample.x + B * nSample.y + N * nSample.z);
#endif
  s.normal = N;

  s.ao = 1.0;
  s.roughness = roughnessFactor;
  s.metallic = metallicFactor;
#ifdef VRP_ORM_MAP
  vec3 orm = texture(ormTex, uv).rgb;
  s.ao = mix(1.0, orm.r, occlusionStrength);
  s.roughness = clamp(orm.g * roughnessFactor, 0.045, 1.0);
  s.metallic = clamp(orm.b * metallicFactor, 0.0, 1.0);
#endif

  s.emissive = vec3(0.0);
#ifdef VRP_EMISSIVE_MAP
  s.emissive = texture(emissiveTex, uv).rgb * emissiveStrength;
#endif

  s.clearcoat = clearcoatStrength;
  s.clearcoatRoughness = clearcoatRoughnessFactor;
  return s;
}
