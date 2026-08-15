import 'dart:convert';

/// Pure one-version reader for moving host settings to a Pixeldart namespace.
final class RendererSettingsMigration {
  const RendererSettingsMigration._();

  static SettingsReadResult read({
    required Map<String, String> storage,
    required String currentKey,
    required String legacyKey,
    required int currentVersion,
  }) {
    final current = _decode(storage[currentKey]);
    if (current != null && current['version'] == currentVersion) {
      return SettingsReadResult(
        current,
        sourceKey: currentKey,
        migrated: false,
      );
    }
    final legacy = _decode(storage[legacyKey]);
    if (legacy == null) {
      return SettingsReadResult(
        {'version': currentVersion},
        sourceKey: null,
        migrated: false,
      );
    }
    return SettingsReadResult(
      {...legacy, 'version': currentVersion},
      sourceKey: legacyKey,
      migrated: true,
    );
  }

  static Map<String, Object?>? _decode(String? encoded) {
    if (encoded == null || encoded.isEmpty) return null;
    try {
      final value = jsonDecode(encoded);
      if (value is! Map) return null;
      return value.map((key, value) => MapEntry(key.toString(), value));
    } on FormatException {
      return null;
    }
  }
}

final class SettingsReadResult {
  final Map<String, Object?> values;
  final String? sourceKey;
  final bool migrated;

  SettingsReadResult(
    Map<String, Object?> values, {
    required this.sourceKey,
    required this.migrated,
  }) : values = Map.unmodifiable(values);
}
