#version 300 es
precision highp float;

in vec2 vUv;
layout(location = 0) out vec4 oColor;
uniform sampler2D uVolumetric;
uniform float uVolumetricStrength;

void main() {
  vec3 light = texture(uVolumetric, vUv).rgb;
  oColor = vec4(light * max(uVolumetricStrength, 0.0), 1.0);
}
