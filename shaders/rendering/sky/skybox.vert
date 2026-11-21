#version 300 es
layout(location=0) in vec3 aPosition;

uniform mat4 uViewRotationProjection;

out vec3 vSampleDir;

void main() {
  vSampleDir = aPosition;
  vec4 clip = uViewRotationProjection * vec4(aPosition, 1.0);
  gl_Position = clip.xyww;
}
