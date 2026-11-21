#version 300 es
precision highp float;

in vec3 vSampleDir;

uniform samplerCube uSkyCubemap;
uniform float uSkyIntensity;
uniform float uSkyRotationRadians;

layout(location=0) out vec4 oColor;

void main() {
  float c = cos(uSkyRotationRadians);
  float s = sin(uSkyRotationRadians);
  vec3 d = normalize(vSampleDir);
  vec3 rot = vec3(c * d.x + s * d.z, d.y, -s * d.x + c * d.z);
  vec3 sky = texture(uSkyCubemap, rot).rgb * uSkyIntensity;
  oColor = vec4(sky, 1.0);
}
