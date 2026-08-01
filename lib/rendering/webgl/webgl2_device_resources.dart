part of 'webgl2_device.dart';

extension WebGl2DeviceResources on WebGl2Device {
  int _glUsage(GpuBufferUsage usage) => switch (usage) {
    GpuBufferUsage.staticDraw => _G.STATIC_DRAW,
    GpuBufferUsage.dynamicDraw => _G.DYNAMIC_DRAW,
    GpuBufferUsage.streamDraw => _G.STREAM_DRAW,
  };

  GpuObject createBufferImpl(GpuBufferDescriptor descriptor) {
    _requireReady();
    final buffer = gl.createBuffer();
    if (buffer == null) {
      throw StateError('WebGl2Device: gl.createBuffer() returned null');
    }
    // The buffer's binding-point family is fixed by this first bind; using
    // the wrong target here (e.g. always ARRAY_BUFFER for what will become
    // an index buffer) is exactly the kind of bug that produces a silent
    // WebGL warning and an unbound element array, not a Dart exception.
    final target = descriptor.kind == GpuBufferKind.indices
        ? _G.ELEMENT_ARRAY_BUFFER
        : _G.ARRAY_BUFFER;
    gl.bindBuffer(target, buffer);
    gl.bufferData(target, descriptor.byteLength.toJS, _glUsage(descriptor.usage));
    return _WebGpuObject(buffer);
  }

  void uploadBufferImpl(
    GpuObject buffer,
    Float32List data, {
    int dstByteOffset = 0,
  }) {
    _requireReady();
    final handle = (buffer as _WebGpuObject).handle as WebGLBuffer;
    gl.bindBuffer(_G.ARRAY_BUFFER, handle);
    gl.bufferSubData(_G.ARRAY_BUFFER, dstByteOffset, data.toJS);
  }

  void deleteBufferImpl(GpuObject buffer) {
    gl.deleteBuffer((buffer as _WebGpuObject).handle as WebGLBuffer);
  }

  int _glFilter(GpuTextureFilter filter) => switch (filter) {
    GpuTextureFilter.nearest => _G.NEAREST,
    GpuTextureFilter.linear => _G.LINEAR,
    GpuTextureFilter.linearMipmapLinear => _G.LINEAR_MIPMAP_LINEAR,
  };

  int _glWrap(GpuTextureWrap wrap) => switch (wrap) {
    GpuTextureWrap.clampToEdge => _G.CLAMP_TO_EDGE,
    GpuTextureWrap.repeat => _G.REPEAT,
  };

  int _mipLevels(int w, int h) {
    var levels = 1;
    for (var size = w > h ? w : h; size > 1; size = (size + 1) ~/ 2) {
      levels++;
    }
    return levels;
  }

  GpuObject createTextureImpl(GpuTextureDescriptor descriptor) {
    _requireReady();
    final texture = gl.createTexture();
    if (texture == null) {
      throw StateError('WebGl2Device: gl.createTexture() returned null');
    }
    final target = descriptor.layers > 1 ? _G.TEXTURE_2D_ARRAY : _G.TEXTURE_2D;
    gl.bindTexture(target, texture);
    final levels = descriptor.hasMips
        ? _mipLevels(descriptor.width, descriptor.height)
        : 1;
    if (descriptor.layers > 1) {
      gl.texStorage3D(
        target,
        levels,
        _G.RGBA8,
        descriptor.width,
        descriptor.height,
        descriptor.layers,
      );
    } else {
      gl.texStorage2D(
        target,
        levels,
        _G.RGBA8,
        descriptor.width,
        descriptor.height,
      );
    }
    gl.texParameteri(
      target,
      _G.TEXTURE_MIN_FILTER,
      _glFilter(descriptor.minFilter),
    );
    gl.texParameteri(
      target,
      _G.TEXTURE_MAG_FILTER,
      _glFilter(descriptor.magFilter),
    );
    gl.texParameteri(target, _G.TEXTURE_WRAP_S, _glWrap(descriptor.wrap));
    gl.texParameteri(target, _G.TEXTURE_WRAP_T, _glWrap(descriptor.wrap));
    return _WebGpuObject(
      _WebGlTexture(
        handle: texture,
        width: descriptor.width,
        height: descriptor.height,
        layers: descriptor.layers,
        hasMips: descriptor.hasMips,
      ),
    );
  }

  void uploadTextureLayerImpl(GpuObject texture, int layer, Uint8List pixels) {
    _requireReady();
    final tex = (texture as _WebGpuObject).handle as _WebGlTexture;
    if (layer < 0 || layer >= tex.layers) {
      throw ArgumentError(
        'WebGl2Device.uploadTextureLayer: layer $layer out of range for '
        '${tex.layers}-layer texture',
      );
    }
    final expectedBytes = tex.width * tex.height * 4;
    if (pixels.length != expectedBytes) {
      throw ArgumentError(
        'WebGl2Device.uploadTextureLayer: expected $expectedBytes RGBA8 bytes '
        'for ${tex.width}x${tex.height}, got ${pixels.length}',
      );
    }
    final target = tex.layers > 1 ? _G.TEXTURE_2D_ARRAY : _G.TEXTURE_2D;
    gl.bindTexture(target, tex.handle);
    if (tex.layers > 1) {
      gl.texSubImage3D(
        target,
        0,
        0,
        0,
        layer,
        tex.width,
        tex.height,
        1,
        _G.RGBA,
        _G.UNSIGNED_BYTE,
        pixels.toJS,
      );
    } else {
      gl.texSubImage2D(
        target,
        0,
        0,
        0,
        tex.width.toJS,
        tex.height.toJS,
        _G.RGBA.toJS,
        _G.UNSIGNED_BYTE,
        pixels.toJS,
      );
    }
  }

  /// Generates mip levels 1..N from the already-uploaded base level.
  /// Deliberately a separate call from [uploadTextureLayerImpl] rather than
  /// implicit after every layer upload — a multi-layer texture array must
  /// have every layer's base level populated before mip generation is
  /// correct, and calling this once per layer would both waste work and
  /// generate mips from incomplete array data on all but the last call.
  /// [createTextureImpl] allocates mip storage via `texStorage2D`/3D's
  /// level count, but never populates levels beyond 0 on its own — omitting
  /// this call left every non-base mip level undefined, which is exactly
  /// the kind of gap that only shows as visibly wrong (black, or garbage)
  /// once something actually samples a minified/mipmapped texture, never as
  /// a WebGL error.
  void finalizeMipsImpl(GpuObject texture) {
    _requireReady();
    final tex = (texture as _WebGpuObject).handle as _WebGlTexture;
    if (!tex.hasMips) return;
    final target = tex.layers > 1 ? _G.TEXTURE_2D_ARRAY : _G.TEXTURE_2D;
    gl.bindTexture(target, tex.handle);
    gl.generateMipmap(target);
  }

  void deleteTextureImpl(GpuObject texture) {
    gl.deleteTexture(
      ((texture as _WebGpuObject).handle as _WebGlTexture).handle,
    );
  }
}
