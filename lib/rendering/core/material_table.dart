import '../api/materials.dart';
import 'batching.dart';

/// Manages material table capacity, deduplication, and dirty slot tracking.
final class MaterialTable {
  final int capacity;
  final List<MaterialDefinition?> _slots;
  final Set<int> _dirtySlots = {};
  final Map<int, int> _slotByDefinitionHash = {};

  MaterialTable({this.capacity = 32})
      : _slots = List<MaterialDefinition?>.filled(capacity, null);

  int get slotCount => _slots.length;
  Iterable<int> get dirtySlots => _dirtySlots;
  bool get hasDirty => _dirtySlots.isNotEmpty;

  bool isDirty(int slot) => _dirtySlots.contains(slot);

  void markDirty(int slot) {
    if (slot >= 0 && slot < capacity) {
      _dirtySlots.add(slot);
    }
  }

  void clearDirty() {
    _dirtySlots.clear();
  }

  MaterialDefinition? getSlot(int slot) {
    if (slot < 0 || slot >= capacity) return null;
    return _slots[slot];
  }

  /// Allocates or deduplicates a material definition into a table slot.
  ///
  /// Returns the assigned slot index (0..capacity-1), or -1 if the table is full.
  int allocateOrDeduplicate(MaterialDefinition definition) {
    final hash = _definitionHash(definition);
    final existingSlot = _slotByDefinitionHash[hash];
    if (existingSlot != null && _definitionsMatch(_slots[existingSlot], definition)) {
      return existingSlot;
    }

    // Find free slot
    for (var i = 0; i < capacity; i++) {
      if (_slots[i] == null) {
        _slots[i] = definition;
        _slotByDefinitionHash[hash] = i;
        _dirtySlots.add(i);
        return i;
      }
    }

    // Table is full
    return -1;
  }

  /// Sets definition at specific slot and tracks dirty state.
  void setSlot(int slot, MaterialDefinition definition) {
    if (slot < 0 || slot >= capacity) {
      throw RangeError.range(slot, 0, capacity - 1, 'slot');
    }
    final current = _slots[slot];
    if (current == null || !_definitionsMatch(current, definition)) {
      _slots[slot] = definition;
      _dirtySlots.add(slot);
    }
  }

  /// Clears a slot in the table.
  void releaseSlot(int slot) {
    if (slot >= 0 && slot < capacity && _slots[slot] != null) {
      final current = _slots[slot]!;
      _slotByDefinitionHash.remove(_definitionHash(current));
      _slots[slot] = null;
      _dirtySlots.add(slot);
    }
  }

  /// Clears the entire table.
  void reset() {
    for (var i = 0; i < capacity; i++) {
      if (_slots[i] != null) {
        _slots[i] = null;
        _dirtySlots.add(i);
      }
    }
    _slotByDefinitionHash.clear();
  }

  /// Partitions a list of [InstanceBatch]es so no partition references more than
  /// [capacity] unique materials.
  List<List<InstanceBatch>> splitBatches(
    List<InstanceBatch> batches, {
    int? maxCapacity,
  }) {
    final cap = maxCapacity ?? capacity;
    if (cap <= 0 || batches.length <= 1) return [batches];

    final chunks = <List<InstanceBatch>>[];
    var currentChunk = <InstanceBatch>[];
    final activeMaterials = <int>{};

    for (final batch in batches) {
      final slot = batch.representative.descriptor.material.slot;
      if (!activeMaterials.contains(slot) && activeMaterials.length >= cap) {
        // Current partition reached capacity; start new chunk
        chunks.add(currentChunk);
        currentChunk = <InstanceBatch>[];
        activeMaterials.clear();
      }
      activeMaterials.add(slot);
      currentChunk.add(batch);
    }

    if (currentChunk.isNotEmpty) {
      chunks.add(currentChunk);
    }

    return chunks;
  }

  static int _definitionHash(MaterialDefinition def) => Object.hash(
    def.key,
    def.albedoTexture,
    def.normalTexture,
    def.ormTexture,
    def.emissiveTexture,
    def.tintR,
    def.tintG,
    def.tintB,
    def.roughness,
    def.metallic,
    def.alphaMode,
    def.alphaCutoff,
    def.affineSampling,
  );

  static bool _definitionsMatch(MaterialDefinition? a, MaterialDefinition? b) {
    if (identical(a, b)) return true;
    if (a == null || b == null) return false;
    return a.key == b.key &&
        a.albedoTexture == b.albedoTexture &&
        a.normalTexture == b.normalTexture &&
        a.ormTexture == b.ormTexture &&
        a.emissiveTexture == b.emissiveTexture &&
        a.tintR == b.tintR &&
        a.tintG == b.tintG &&
        a.tintB == b.tintB &&
        a.roughness == b.roughness &&
        a.metallic == b.metallic &&
        a.alphaMode == b.alphaMode &&
        a.alphaCutoff == b.alphaCutoff &&
        a.affineSampling == b.affineSampling;
  }
}
