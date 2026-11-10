import '../api/frame.dart';
import '../math/vec.dart';

abstract interface class CameraController {
  Vec3 get eye;
  Vec3 get forward;
  void update(double deltaTime);
  CameraView toCameraView(double aspect);
}
