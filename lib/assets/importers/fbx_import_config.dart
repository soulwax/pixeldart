import 'dart:convert';

/// Immutable settings for one deterministic offline FBX import.
///
/// The FBX name is deliberately confined to this offline importer library;
/// runtime package and rendering APIs remain source-neutral.
final class FbxImportConfig {
  final String schema;
  final String assetId;
  final String sourceFormat;
  final String converterId;
  final String converterVersion;
  final String settingsHash;
  final String units;
  final String upAxis;
  final String forwardAxis;
  final double scaleToMetres;
  final String pivot;
  final bool triangulate;
  final String generateTangents;
  final String lodPolicy;
  final int textureCap;
  final String animationPolicy;

  const FbxImportConfig({
    required this.schema,
    required this.assetId,
    required this.sourceFormat,
    required this.converterId,
    required this.converterVersion,
    required this.settingsHash,
    required this.units,
    required this.upAxis,
    required this.forwardAxis,
    required this.scaleToMetres,
    required this.pivot,
    required this.triangulate,
    required this.generateTangents,
    required this.lodPolicy,
    required this.textureCap,
    required this.animationPolicy,
  });

  factory FbxImportConfig.recommended({
    required String assetId,
    required String converterId,
    required String converterVersion,
  }) {
    final seed = FbxImportConfig(
      schema: 'pixeldart-fbx-import-v1',
      assetId: assetId,
      sourceFormat: 'fbx',
      converterId: converterId,
      converterVersion: converterVersion,
      settingsHash: '0' * 64,
      units: 'metres',
      upAxis: 'Y-up',
      forwardAxis: '-Z',
      scaleToMetres: 1,
      pivot: 'floor-center',
      triangulate: true,
      generateTangents: 'mikktspace-v2',
      lodPolicy: 'lod-s-0-1-2',
      textureCap: 4096,
      animationPolicy: 'reject-skinned-input',
    );
    return seed.withSettingsHash(seed.computedSettingsHash());
  }

  factory FbxImportConfig.fromJson(Map<String, dynamic> json) {
    T requiredValue<T>(String key) {
      final value = json[key];
      if (value is! T) throw FormatException('import config requires $key');
      return value;
    }

    return FbxImportConfig(
      schema: requiredValue<String>('schema'),
      assetId: requiredValue<String>('assetId'),
      sourceFormat: requiredValue<String>('sourceFormat'),
      converterId: requiredValue<String>('converterId'),
      converterVersion: requiredValue<String>('converterVersion'),
      settingsHash: requiredValue<String>('settingsHash'),
      units: requiredValue<String>('units'),
      upAxis: requiredValue<String>('upAxis'),
      forwardAxis: requiredValue<String>('forwardAxis'),
      scaleToMetres:
          (json['scaleToMetres'] as num?)?.toDouble() ??
          (throw const FormatException('import config requires scaleToMetres')),
      pivot: requiredValue<String>('pivot'),
      triangulate: requiredValue<bool>('triangulate'),
      generateTangents: requiredValue<String>('generateTangents'),
      lodPolicy: requiredValue<String>('lodPolicy'),
      textureCap: requiredValue<int>('textureCap'),
      animationPolicy: requiredValue<String>('animationPolicy'),
    );
  }

  List<String> validate() {
    final errors = <String>[];
    if (schema != 'pixeldart-fbx-import-v1') errors.add('unsupported schema');
    if (!RegExp(r'^[a-z0-9]+(?:-[a-z0-9]+)*$').hasMatch(assetId)) {
      errors.add('assetId must be kebab-case');
    }
    if (sourceFormat != 'fbx') errors.add('sourceFormat must be fbx');
    if (converterId.isEmpty || converterVersion.isEmpty) {
      errors.add('converter identity is required');
    }
    if (!RegExp(r'^[0-9a-f]{64}$').hasMatch(settingsHash)) {
      errors.add('settingsHash must be lowercase SHA-256');
    }
    if (units != 'metres') errors.add('units must be metres');
    if (upAxis != 'Y-up') errors.add('upAxis must be Y-up');
    if (forwardAxis != '-Z') errors.add('forwardAxis must be -Z');
    if (!scaleToMetres.isFinite || scaleToMetres <= 0) {
      errors.add('scaleToMetres must be positive and finite');
    }
    if (pivot != 'floor-center' && pivot != 'origin') {
      errors.add('pivot must be floor-center or origin');
    }
    if (!triangulate) errors.add('triangulate must be enabled');
    if (generateTangents != 'mikktspace-v2') {
      errors.add('generateTangents must be mikktspace-v2');
    }
    if (lodPolicy != 'lod-s-0-1-2') errors.add('unsupported lodPolicy');
    if (textureCap <= 0 || textureCap > 4096) {
      errors.add('textureCap must be in 1..4096');
    }
    if (animationPolicy != 'reject-skinned-input' &&
        animationPolicy != 'bake-glb-clips') {
      errors.add('unsupported animationPolicy');
    }
    return errors;
  }

  Map<String, dynamic> toJson() => {
    'schema': schema,
    'assetId': assetId,
    'sourceFormat': sourceFormat,
    'converterId': converterId,
    'converterVersion': converterVersion,
    'settingsHash': settingsHash,
    'units': units,
    'upAxis': upAxis,
    'forwardAxis': forwardAxis,
    'scaleToMetres': scaleToMetres,
    'pivot': pivot,
    'triangulate': triangulate,
    'generateTangents': generateTangents,
    'lodPolicy': lodPolicy,
    'textureCap': textureCap,
    'animationPolicy': animationPolicy,
  };

  String canonicalJson() =>
      const JsonEncoder.withIndent('  ').convert(toJson());

  String canonicalSettingsJson() {
    final settings = Map<String, dynamic>.from(toJson())
      ..remove('settingsHash');
    return const JsonEncoder.withIndent('  ').convert(settings);
  }

  String computedSettingsHash() =>
      Sha256.compute(utf8.encode(canonicalSettingsJson()));

  FbxImportConfig withSettingsHash(String hash) => FbxImportConfig(
    schema: schema,
    assetId: assetId,
    sourceFormat: sourceFormat,
    converterId: converterId,
    converterVersion: converterVersion,
    settingsHash: hash,
    units: units,
    upAxis: upAxis,
    forwardAxis: forwardAxis,
    scaleToMetres: scaleToMetres,
    pivot: pivot,
    triangulate: triangulate,
    generateTangents: generateTangents,
    lodPolicy: lodPolicy,
    textureCap: textureCap,
    animationPolicy: animationPolicy,
  );
}

/// Small dependency-free SHA-256 implementation shared by offline records.
final class Sha256 {
  static const _k = <int>[
    0x428a2f98,
    0x71374491,
    0xb5c0fbcf,
    0xe9b5dba5,
    0x3956c25b,
    0x59f111f1,
    0x923f82a4,
    0xab1c5ed5,
    0xd807aa98,
    0x12835b01,
    0x243185be,
    0x550c7dc3,
    0x72be5d74,
    0x80deb1fe,
    0x9bdc06a7,
    0xc19bf174,
    0xe49b69c1,
    0xefbe4786,
    0x0fc19dc6,
    0x240ca1cc,
    0x2de92c6f,
    0x4a7484aa,
    0x5cb0a9dc,
    0x76f988da,
    0x983e5152,
    0xa831c66d,
    0xb00327c8,
    0xbf597fc7,
    0xc6e00bf3,
    0xd5a79147,
    0x06ca6351,
    0x14292967,
    0x27b70a85,
    0x2e1b2138,
    0x4d2c6dfc,
    0x53380d13,
    0x650a7354,
    0x766a0abb,
    0x81c2c92e,
    0x92722c85,
    0xa2bfe8a1,
    0xa81a664b,
    0xc24b8b70,
    0xc76c51a3,
    0xd192e819,
    0xd6990624,
    0xf40e3585,
    0x106aa070,
    0x19a4c116,
    0x1e376c08,
    0x2748774c,
    0x34b0bcb5,
    0x391c0cb3,
    0x4ed8aa4a,
    0x5b9cca4f,
    0x682e6ff3,
    0x748f82ee,
    0x78a5636f,
    0x84c87814,
    0x8cc70208,
    0x90befffa,
    0xa4506ceb,
    0xbef9a3f7,
    0xc67178f2,
  ];

  static int _u32(int value) => value & 0xffffffff;
  static int _rotr(int value, int count) =>
      _u32((value >>> count) | (value << (32 - count)));

  static String compute(List<int> input) {
    final bytes = List<int>.from(input)..add(0x80);
    while (bytes.length % 64 != 56) {
      bytes.add(0);
    }
    final bitLength = input.length * 8;
    for (var shift = 56; shift >= 0; shift -= 8) {
      bytes.add((bitLength >>> shift) & 0xff);
    }
    var h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a;
    var h4 = 0x510e527f, h5 = 0x9b05688c, h6 = 0x1f83d9ab, h7 = 0x5be0cd19;
    for (var offset = 0; offset < bytes.length; offset += 64) {
      final w = List<int>.filled(64, 0);
      for (var i = 0; i < 16; i++) {
        final j = offset + i * 4;
        w[i] =
            (bytes[j] << 24) |
            (bytes[j + 1] << 16) |
            (bytes[j + 2] << 8) |
            bytes[j + 3];
      }
      for (var i = 16; i < 64; i++) {
        final s0 =
            _rotr(w[i - 15], 7) ^ _rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
        final s1 =
            _rotr(w[i - 2], 17) ^ _rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
        w[i] = _u32(w[i - 16] + s0 + w[i - 7] + s1);
      }
      var a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7;
      for (var i = 0; i < 64; i++) {
        final s1 = _rotr(e, 6) ^ _rotr(e, 11) ^ _rotr(e, 25);
        final ch = (e & f) ^ (_u32(~e) & g);
        final t1 = _u32(h + s1 + ch + _k[i] + w[i]);
        final s0 = _rotr(a, 2) ^ _rotr(a, 13) ^ _rotr(a, 22);
        final maj = (a & b) ^ (a & c) ^ (b & c);
        final t2 = _u32(s0 + maj);
        h = g;
        g = f;
        f = e;
        e = _u32(d + t1);
        d = c;
        c = b;
        b = a;
        a = _u32(t1 + t2);
      }
      h0 = _u32(h0 + a);
      h1 = _u32(h1 + b);
      h2 = _u32(h2 + c);
      h3 = _u32(h3 + d);
      h4 = _u32(h4 + e);
      h5 = _u32(h5 + f);
      h6 = _u32(h6 + g);
      h7 = _u32(h7 + h);
    }
    return [
      h0,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      h7,
    ].map((x) => x.toRadixString(16).padLeft(8, '0')).join();
  }
}
