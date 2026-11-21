#version 300 es
precision highp float;

in vec2 vUv;

uniform sampler2D uHdrSceneColor;
uniform sampler2D uBloomTex;
uniform float uExposure;
uniform float uBloomIntensity;
uniform int uTonemapperMode; // 0=ACES, 1=AgX, 2=KhronosNeutral

layout(location=0) out vec4 oColor;

vec3 tonemapAces(vec3 x) {
  x = max(x, vec3(0.0));
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}

vec3 tonemapAgX(vec3 c) {
  c = max(c, vec3(0.0));
  const mat3 inset = mat3(
    0.842479062253094, 0.0423282422610123, 0.0423756549057051,
    0.0784335999999992, 0.878468636469772, 0.0784336,
    0.0792237451477643, 0.0791661274605434, 0.879142973793104
  );
  vec3 v = inset * c;
  v = clamp((log2(max(v, vec3(1e-10))) + 12.47393) / 16.5, 0.0, 1.0);
  vec3 v2 = v * v;
  vec3 v4 = v2 * v2;
  return clamp(
    15.5 * v4 * v2 - 40.14 * v4 * v + 31.96 * v4 - 6.868 * v2 * v + 0.4298 * v2 + 0.1191 * v - 0.00232,
    0.0,
    1.0
  );
}

vec3 tonemapKhronosNeutral(vec3 color) {
  color = max(color, vec3(0.0));
  const float startCompression = 0.76;
  const float desaturation = 0.15;
  float x = min(color.r, min(color.g, color.b));
  float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
  color -= offset;
  float peak = max(color.r, max(color.g, color.b));
  if (peak < startCompression) return clamp(color, 0.0, 1.0);
  const float d = 1.0 - startCompression;
  float newPeak = 1.0 - d * d / (peak + d - startCompression);
  color *= newPeak / peak;
  float g = 1.0 - 1.0 / (desaturation * (peak - newPeak) + 1.0);
  return clamp(mix(color, vec3(newPeak), g), 0.0, 1.0);
}

vec3 linearToSrgb(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  vec3 lo = c * 12.92;
  vec3 hi = 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055;
  return mix(lo, hi, step(vec3(0.0031308), c));
}

void main() {
  vec3 hdr = texture(uHdrSceneColor, vUv).rgb;
  vec3 bloom = texture(uBloomTex, vUv).rgb * uBloomIntensity;
  vec3 exposed = (hdr + bloom) * uExposure;
  vec3 mapped;
  if (uTonemapperMode == 1) {
    mapped = tonemapAgX(exposed);
  } else if (uTonemapperMode == 2) {
    mapped = tonemapKhronosNeutral(exposed);
  } else {
    mapped = tonemapAces(exposed);
  }
  oColor = vec4(linearToSrgb(mapped), 1.0);
}
