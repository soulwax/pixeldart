import '../math/bounds.dart';
import '../math/transform.dart';
import 'handles.dart';

enum DrawMode { opaque, masked, blended }

enum BlendMode { alpha, additive }

final class RetainedItemDescriptor {
  final MeshHandle mesh;
  final MaterialHandle material;
  final Transform transform;
  final int visibilityMask;
  final DrawMode drawMode;
  final BlendMode blendMode;
  final bool castsShadow;
  final bool receivesShadow;
  final int sortTiebreaker;
  final int? instanceFamilyKey;

  const RetainedItemDescriptor({
    required this.mesh,
    required this.material,
    this.transform = Transform.identity,
    this.visibilityMask = -1,
    this.drawMode = DrawMode.opaque,
    this.blendMode = BlendMode.alpha,
    this.castsShadow = true,
    this.receivesShadow = true,
    this.sortTiebreaker = 0,
    this.instanceFamilyKey,
  });

  void validate() {
    transform.validate();
  }
}

abstract interface class RetainedItemView {
  InstanceId get id;
  RetainedItemDescriptor get descriptor;
  Aabb get worldBounds;
}

abstract interface class RenderWorld {
  InstanceId addItem(RetainedItemDescriptor descriptor);
  void updateItem(InstanceId id, RetainedItemDescriptor descriptor);
  void removeItem(InstanceId id);
  RetainedItemView itemView(InstanceId id);
  Iterable<RetainedItemView> get items;
  void dispose();
}

abstract interface class RenderEncoder {
  void submit(RetainedItemDescriptor transientItem);
}
