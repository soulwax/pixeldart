import 'dart:math' as math;

import '../math/quat.dart';
import '../math/transform.dart';
import '../math/vec.dart';
import 'gerstner_waves.dart';

/// Physical 4-probe buoyant vessel simulating heave, pitch, and roll on dynamic ocean waves.
final class BuoyantVesselBody {
  Vec3 position;
  final double width;
  final double length;
  final double mass;
  final double linearDamping;
  final double angularDamping;
  final double rightingStiffness;

  double velocityY = 0.0;
  double roll = 0.0;
  double pitch = 0.0;
  double rollVelocity = 0.0;
  double pitchVelocity = 0.0;
  double yaw = 0.0;

  BuoyantVesselBody({
    required this.position,
    this.width = 1.8,
    this.length = 3.2,
    this.mass = 1.0,
    this.linearDamping = 4.5,
    this.angularDamping = 6.0,
    this.rightingStiffness = 14.0,
    this.yaw = 0.0,
  }) {
    if (width <= 0) throw ArgumentError.value(width, 'width', 'must be > 0');
    if (length <= 0) throw ArgumentError.value(length, 'length', 'must be > 0');
    if (mass <= 0) throw ArgumentError.value(mass, 'mass', 'must be > 0');
  }

  /// Calculates world coordinates of the 4 hull contact probes.
  List<Vec3> getProbes() {
    final hw = width * 0.5;
    final hl = length * 0.5;

    final cosY = math.cos(yaw);
    final sinY = math.sin(yaw);

    Vec3 rotate(double lx, double lz) {
      final wx = lx * cosY - lz * sinY;
      final wz = lx * sinY + lz * cosY;
      return Vec3(position.x + wx, position.y, position.z + wz);
    }

    return [
      rotate(-hw, hl),  // Front-Left (bow-port)
      rotate(hw, hl),   // Front-Right (bow-starboard)
      rotate(-hw, -hl), // Rear-Left (stern-port)
      rotate(hw, -hl),  // Rear-Right (stern-starboard)
    ];
  }

  /// Simulates hydrodynamics for time step [dt] against [waves] at current simulation [time].
  Transform update(double dt, double time, GerstnerWaveEvaluator waves) {
    if (dt <= 0.0) return currentTransform;

    final clampedDt = dt.clamp(0.001, 0.1);
    final probes = getProbes();

    final hFL = waves.sampleHeight(probes[0].x, probes[0].z, time);
    final hFR = waves.sampleHeight(probes[1].x, probes[1].z, time);
    final hBL = waves.sampleHeight(probes[2].x, probes[2].z, time);
    final hBR = waves.sampleHeight(probes[3].x, probes[3].z, time);

    // Equilibrium target surface water level
    final targetY = (hFL + hFR + hBL + hBR) * 0.25;

    // Desired roll and pitch angles dictated by water slope across the 4 probes
    final targetRoll = math.atan2((hFL + hBL) - (hFR + hBR), width * 2.0);
    final targetPitch = math.atan2((hBL + hBR) - (hFL + hFR), length * 2.0);

    // Heave (vertical bob) spring-damper integration
    final heaveForce = (targetY - position.y) * 20.0 - velocityY * linearDamping;
    velocityY += (heaveForce / mass) * clampedDt;
    final newY = position.y + velocityY * clampedDt;
    position = Vec3(position.x, newY, position.z);

    // Roll rotational spring-damper integration
    final rollTorque = (targetRoll - roll) * rightingStiffness - rollVelocity * angularDamping;
    rollVelocity += (rollTorque / mass) * clampedDt;
    roll = (roll + rollVelocity * clampedDt).clamp(-0.65, 0.65);

    // Pitch rotational spring-damper integration
    final pitchTorque = (targetPitch - pitch) * rightingStiffness - pitchVelocity * angularDamping;
    pitchVelocity += (pitchTorque / mass) * clampedDt;
    pitch = (pitch + pitchVelocity * clampedDt).clamp(-0.65, 0.65);

    return currentTransform;
  }

  /// Returns the current 6-DoF world transform representing vessel pose.
  Transform get currentTransform {
    final qYaw = Quat.axisAngle(const Vec3(0, 1, 0), yaw);
    final qPitch = Quat.axisAngle(const Vec3(1, 0, 0), pitch);
    final qRoll = Quat.axisAngle(const Vec3(0, 0, 1), roll);
    final rot = qYaw * qPitch * qRoll;

    return Transform(
      translation: position,
      rotation: rot,
      scale: 1.0,
    );
  }
}
