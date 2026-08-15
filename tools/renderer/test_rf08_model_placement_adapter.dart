import 'package:pixeldart/rendering/rendering.dart';

final class FakePlacementBinding implements PlacementBinding {
  bool attached = false;
  bool disposed = false;
  final bool fail;
  FakePlacementBinding({this.fail = false});
  @override
  void attach() {
    if (fail) throw StateError('synthetic attach failure');
    attached = true;
  }

  @override
  void dispose() => disposed = true;
}

void require(bool condition, String message) {
  if (!condition) throw StateError(message);
}

void main() {
  final created = <FakePlacementBinding>[];
  final adapter = ModelPlacementAdapter((placement) {
    final binding = FakePlacementBinding(
      fail: placement.packageAssetId == 'broken',
    );
    created.add(binding);
    return binding;
  });
  const first = ModelPlacementDescriptor(
    placementId: 'hero',
    packageAssetId: 'room',
  );
  adapter.attach(first);
  require(
    adapter.count == 1 && created.single.attached,
    'attach registers placement',
  );
  var duplicateRejected = false;
  try {
    adapter.attach(first);
  } catch (error) {
    duplicateRejected = error is StateError;
  }
  require(duplicateRejected, 'duplicate placement is rejected');
  var invalidMaskRejected = false;
  try {
    adapter.attach(
      const ModelPlacementDescriptor(
        placementId: 'hidden',
        packageAssetId: 'room',
        visibilityMask: 0,
      ),
    );
  } catch (error) {
    invalidMaskRejected = error is ArgumentError;
  }
  require(invalidMaskRejected, 'zero visibility mask is rejected');
  adapter.replace(
    const ModelPlacementDescriptor(
      placementId: 'hero',
      packageAssetId: 'room-v2',
    ),
  );
  require(
    created[0].disposed && adapter.count == 1,
    'replacement disposes old binding',
  );
  var failed = false;
  try {
    adapter.replace(
      const ModelPlacementDescriptor(
        placementId: 'hero',
        packageAssetId: 'broken',
      ),
    );
  } catch (error) {
    failed = error is StateError;
  }
  require(failed && created.last.disposed, 'failed replacement is rolled back');
  adapter.remove('hero');
  require(adapter.count == 0, 'remove releases placement');
  adapter.dispose();
  print('RF-08 model placement adapter tests passed.');
}
