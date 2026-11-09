import 'capabilities.dart';

/// Why the renderer draws with fewer samples than the configuration asked for.
enum MsaaFallbackReason {
  /// The request was honoured as given.
  none,

  /// The device reports `maxSamples < 2`; multisampling is unavailable.
  unsupported,

  /// The request exceeded `RenderCapabilities.maxSamples` and was clamped.
  exceedsDeviceLimit,

  /// The device could not complete a multisampled framebuffer at the
  /// negotiated count, so lower counts were tried, down to 1×.
  framebufferIncomplete,
}

/// The sample count a renderer negotiated: what was requested, what it
/// actually allocated, and why the two differ.
final class MsaaStatus {
  final int requested;
  final int effective;
  final MsaaFallbackReason reason;

  const MsaaStatus({
    required this.requested,
    required this.effective,
    this.reason = MsaaFallbackReason.none,
  });

  const MsaaStatus.off()
    : requested = 1,
      effective = 1,
      reason = MsaaFallbackReason.none;

  bool get isMultisampled => effective > 1;
  bool get fellBack => reason != MsaaFallbackReason.none;

  /// Clamps [requested] to what [capabilities] can allocate. 1× is always
  /// honoured and never touches multisample storage.
  static MsaaStatus negotiate(int requested, RenderCapabilities capabilities) {
    if (requested <= 0) {
      throw ArgumentError.value(requested, 'requested', 'must be > 0');
    }
    if (requested == 1) return MsaaStatus(requested: 1, effective: 1);
    if (capabilities.maxSamples < 2) {
      return MsaaStatus(
        requested: requested,
        effective: 1,
        reason: MsaaFallbackReason.unsupported,
      );
    }
    if (requested > capabilities.maxSamples) {
      return MsaaStatus(
        requested: requested,
        effective: capabilities.maxSamples,
        reason: MsaaFallbackReason.exceedsDeviceLimit,
      );
    }
    return MsaaStatus(requested: requested, effective: requested);
  }

  /// The next count to try after a framebuffer at [effective] samples was
  /// incomplete: half as many, bottoming out at 1×.
  MsaaStatus afterIncompleteFramebuffer() {
    if (effective <= 1) {
      throw StateError('a 1× framebuffer has no lower sample count to try');
    }
    final next = effective ~/ 2;
    return MsaaStatus(
      requested: requested,
      effective: next < 1 ? 1 : next,
      reason: MsaaFallbackReason.framebufferIncomplete,
    );
  }

  Map<String, Object> toMap() => {
    'requested': requested,
    'effective': effective,
    'reason': reason.name,
  };

  @override
  bool operator ==(Object other) =>
      other is MsaaStatus &&
      other.requested == requested &&
      other.effective == effective &&
      other.reason == reason;

  @override
  int get hashCode => Object.hash(requested, effective, reason);

  @override
  String toString() => fellBack
      ? 'MsaaStatus(${requested}x requested, ${effective}x used: ${reason.name})'
      : 'MsaaStatus(${effective}x)';
}
