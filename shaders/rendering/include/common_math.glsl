// Shared VRP math constants & helpers (S3-0).
const float VRP_PI = 3.14159265359;
const float VRP_INV_PI = 0.31830988618;
float vrpSaturate(float x) { return clamp(x, 0.0, 1.0); }
