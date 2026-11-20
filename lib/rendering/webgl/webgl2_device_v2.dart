part of 'webgl2_device.dart';

extension WebGl2DeviceV2 on WebGl2Device {
  static const int _anySamplesPassedConservative = 0x8D6A;

  int _glInternalFormat(GpuTextureFormat fmt) => switch (fmt) {
    GpuTextureFormat.rgba8 => _G.RGBA8,
    GpuTextureFormat.srgb8Alpha8 => _G.SRGB8_ALPHA8,
    GpuTextureFormat.rgba16f => _G.RGBA16F,
    GpuTextureFormat.rgba32f => _G.RGBA32F,
    GpuTextureFormat.r16f => _G.R16F,
    GpuTextureFormat.r32f => _G.R32F,
    GpuTextureFormat.rg16f => _G.RG16F,
    GpuTextureFormat.depth24 => _G.DEPTH_COMPONENT24,
    GpuTextureFormat.depth32f => _G.DEPTH_COMPONENT32F,
  };

  int _glBaseFormat(GpuTextureFormat fmt) => switch (fmt) {
    GpuTextureFormat.r16f || GpuTextureFormat.r32f => _G.RED,
    GpuTextureFormat.rg16f => _G.RG,
    GpuTextureFormat.depth24 || GpuTextureFormat.depth32f => _G.DEPTH_COMPONENT,
    _ => _G.RGBA,
  };

  int _glColorTargetInternalFormat(GpuColorTargetFormat fmt) => switch (fmt) {
    GpuColorTargetFormat.rgba8 => _G.RGBA8,
    GpuColorTargetFormat.rgba16f => _G.RGBA16F,
    GpuColorTargetFormat.rgba32f => _G.RGBA32F,
  };

  int _glCubeFaceTarget(GpuCubeFace face) => switch (face) {
    GpuCubeFace.positiveX => _G.TEXTURE_CUBE_MAP_POSITIVE_X,
    GpuCubeFace.negativeX => _G.TEXTURE_CUBE_MAP_NEGATIVE_X,
    GpuCubeFace.positiveY => _G.TEXTURE_CUBE_MAP_POSITIVE_Y,
    GpuCubeFace.negativeY => _G.TEXTURE_CUBE_MAP_NEGATIVE_Y,
    GpuCubeFace.positiveZ => _G.TEXTURE_CUBE_MAP_POSITIVE_Z,
    GpuCubeFace.negativeZ => _G.TEXTURE_CUBE_MAP_NEGATIVE_Z,
  };

  // --- Uniform Buffer Objects ---

  GpuObject createUniformBufferImpl(GpuUniformBufferDescriptor descriptor) {
    _requireReady();
    descriptor.validate();
    final buffer = gl.createBuffer();
    if (buffer == null) {
      throw StateError('WebGl2Device: gl.createBuffer() returned null for UBO');
    }
    gl.bindBuffer(_G.UNIFORM_BUFFER, buffer);
    gl.bufferData(
      _G.UNIFORM_BUFFER,
      descriptor.byteLength.toJS,
      _glUsage(descriptor.usage),
    );
    return _WebGpuObject(buffer, contextGeneration);
  }

  void updateUniformBufferImpl(
    GpuObject buffer,
    ByteData data, {
    int dstByteOffset = 0,
  }) {
    _requireReady();
    final handle = (buffer as _WebGpuObject).handle as WebGLBuffer;
    gl.bindBuffer(_G.UNIFORM_BUFFER, handle);
    final view = data.buffer.asUint8List(data.offsetInBytes, data.lengthInBytes);
    gl.bufferSubData(_G.UNIFORM_BUFFER, dstByteOffset, view.toJS);
  }

  void bindUniformBufferBaseImpl(int bindingPoint, GpuObject buffer) {
    _requireReady();
    final handle = (buffer as _WebGpuObject).handle as WebGLBuffer;
    if (_stateCache.shouldBindUbo(bindingPoint, handle)) {
      gl.bindBufferBase(_G.UNIFORM_BUFFER, bindingPoint, handle);
      _stateCache.markUboBound(bindingPoint, handle);
    }
  }

  void uniformBlockBindingImpl(
    GpuObject program,
    String blockName,
    int bindingPoint,
  ) {
    _requireReady();
    final prog = (program as _WebGpuObject).handle as WebGLProgram;
    final blockIndex = gl.getUniformBlockIndex(prog, blockName);
    if (blockIndex != _G.INVALID_INDEX) {
      gl.uniformBlockBinding(prog, blockIndex, bindingPoint);
    }
  }

  // --- Cubemap Textures ---

  GpuObject createCubeTextureImpl(GpuCubeTextureDescriptor descriptor) {
    _requireReady();
    descriptor.validate();
    final texture = gl.createTexture();
    if (texture == null) {
      throw StateError('WebGl2Device: gl.createTexture() returned null');
    }
    gl.bindTexture(_G.TEXTURE_CUBE_MAP, texture);
    gl.texStorage2D(
      _G.TEXTURE_CUBE_MAP,
      descriptor.mipLevelCount,
      _glInternalFormat(descriptor.format),
      descriptor.size,
      descriptor.size,
    );
    gl.texParameteri(
      _G.TEXTURE_CUBE_MAP,
      _G.TEXTURE_MIN_FILTER,
      _glFilter(descriptor.minFilter),
    );
    gl.texParameteri(
      _G.TEXTURE_CUBE_MAP,
      _G.TEXTURE_MAG_FILTER,
      _glFilter(descriptor.magFilter),
    );
    gl.texParameteri(_G.TEXTURE_CUBE_MAP, _G.TEXTURE_WRAP_S, _G.CLAMP_TO_EDGE);
    gl.texParameteri(_G.TEXTURE_CUBE_MAP, _G.TEXTURE_WRAP_T, _G.CLAMP_TO_EDGE);
    gl.texParameteri(_G.TEXTURE_CUBE_MAP, _G.TEXTURE_WRAP_R, _G.CLAMP_TO_EDGE);
    return _WebGpuObject(
      _WebGlTexture(
        handle: texture,
        width: descriptor.size,
        height: descriptor.size,
        layers: 6,
        hasMips: descriptor.hasMips,
        anisotropy: const AnisotropyDecision(
          requested: 1,
          effective: 1,
          maxSupported: 1,
          extensionAvailable: false,
        ),
        target: GpuTextureTarget.cubeMap,
        format: descriptor.format,
      ),
      contextGeneration,
    );
  }

  void uploadCubeFaceImpl(
    GpuObject texture,
    GpuCubeFace face,
    Uint8List pixels, {
    int mipLevel = 0,
  }) {
    _requireReady();
    final tex = (texture as _WebGpuObject).handle as _WebGlTexture;
    final dim = (tex.width >> mipLevel).clamp(1, tex.width);
    gl.bindTexture(_G.TEXTURE_CUBE_MAP, tex.handle);
    gl.texSubImage2D(
      _glCubeFaceTarget(face),
      mipLevel,
      0,
      0,
      dim.toJS,
      dim.toJS,
      _glBaseFormat(tex.format).toJS,
      _G.UNSIGNED_BYTE,
      pixels.toJS,
    );
  }

  void uploadCubeFaceFloatImpl(
    GpuObject texture,
    GpuCubeFace face,
    Float32List pixels, {
    int mipLevel = 0,
  }) {
    _requireReady();
    final tex = (texture as _WebGpuObject).handle as _WebGlTexture;
    final dim = (tex.width >> mipLevel).clamp(1, tex.width);
    gl.bindTexture(_G.TEXTURE_CUBE_MAP, tex.handle);
    gl.texSubImage2D(
      _glCubeFaceTarget(face),
      mipLevel,
      0,
      0,
      dim.toJS,
      dim.toJS,
      _glBaseFormat(tex.format).toJS,
      _G.FLOAT,
      pixels.toJS,
    );
  }

  void bindCubeTextureImpl(int unit, GpuObject texture) {
    _requireReady();
    final tex = (texture as _WebGpuObject).handle as _WebGlTexture;
    if (_stateCache.shouldBindTexture(unit, _G.TEXTURE_CUBE_MAP, tex.handle)) {
      gl.activeTexture(_G.TEXTURE0 + unit);
      gl.bindTexture(_G.TEXTURE_CUBE_MAP, tex.handle);
      _stateCache.markTextureBound(unit, _G.TEXTURE_CUBE_MAP, tex.handle);
    }
  }

  // --- 2D Texture Arrays ---

  GpuObject createTextureArrayImpl(GpuTextureArrayDescriptor descriptor) {
    _requireReady();
    descriptor.validate();
    final texture = gl.createTexture();
    if (texture == null) {
      throw StateError('WebGl2Device: gl.createTexture() returned null');
    }
    gl.bindTexture(_G.TEXTURE_2D_ARRAY, texture);
    gl.texStorage3D(
      _G.TEXTURE_2D_ARRAY,
      descriptor.mipLevelCount,
      _glInternalFormat(descriptor.format),
      descriptor.width,
      descriptor.height,
      descriptor.layers,
    );
    gl.texParameteri(
      _G.TEXTURE_2D_ARRAY,
      _G.TEXTURE_MIN_FILTER,
      _glFilter(descriptor.minFilter),
    );
    gl.texParameteri(
      _G.TEXTURE_2D_ARRAY,
      _G.TEXTURE_MAG_FILTER,
      _glFilter(descriptor.magFilter),
    );
    gl.texParameteri(
      _G.TEXTURE_2D_ARRAY,
      _G.TEXTURE_WRAP_S,
      _glWrap(descriptor.wrap),
    );
    gl.texParameteri(
      _G.TEXTURE_2D_ARRAY,
      _G.TEXTURE_WRAP_T,
      _glWrap(descriptor.wrap),
    );
    return _WebGpuObject(
      _WebGlTexture(
        handle: texture,
        width: descriptor.width,
        height: descriptor.height,
        layers: descriptor.layers,
        hasMips: descriptor.hasMips,
        anisotropy: const AnisotropyDecision(
          requested: 1,
          effective: 1,
          maxSupported: 1,
          extensionAvailable: false,
        ),
        target: GpuTextureTarget.tex2dArray,
        format: descriptor.format,
      ),
      contextGeneration,
    );
  }

  void uploadTextureArrayLayerImpl(
    GpuObject texture,
    int layer,
    Uint8List pixels, {
    int mipLevel = 0,
  }) {
    _requireReady();
    final tex = (texture as _WebGpuObject).handle as _WebGlTexture;
    final w = (tex.width >> mipLevel).clamp(1, tex.width);
    final h = (tex.height >> mipLevel).clamp(1, tex.height);
    gl.bindTexture(_G.TEXTURE_2D_ARRAY, tex.handle);
    gl.texSubImage3D(
      _G.TEXTURE_2D_ARRAY,
      mipLevel,
      0,
      0,
      layer,
      w,
      h,
      1,
      _glBaseFormat(tex.format),
      _G.UNSIGNED_BYTE,
      pixels.toJS,
    );
  }

  void uploadTextureArrayLayerFloatImpl(
    GpuObject texture,
    int layer,
    Float32List pixels, {
    int mipLevel = 0,
  }) {
    _requireReady();
    final tex = (texture as _WebGpuObject).handle as _WebGlTexture;
    final w = (tex.width >> mipLevel).clamp(1, tex.width);
    final h = (tex.height >> mipLevel).clamp(1, tex.height);
    gl.bindTexture(_G.TEXTURE_2D_ARRAY, tex.handle);
    gl.texSubImage3D(
      _G.TEXTURE_2D_ARRAY,
      mipLevel,
      0,
      0,
      layer,
      w,
      h,
      1,
      _glBaseFormat(tex.format),
      _G.FLOAT,
      pixels.toJS,
    );
  }

  void bindTextureArrayImpl(int unit, GpuObject texture) {
    _requireReady();
    final tex = (texture as _WebGpuObject).handle as _WebGlTexture;
    if (_stateCache.shouldBindTexture(unit, _G.TEXTURE_2D_ARRAY, tex.handle)) {
      gl.activeTexture(_G.TEXTURE0 + unit);
      gl.bindTexture(_G.TEXTURE_2D_ARRAY, tex.handle);
      _stateCache.markTextureBound(unit, _G.TEXTURE_2D_ARRAY, tex.handle);
    }
  }

  // --- MRT & Half-Float/Float Targets ---

  GpuObject createMrtTargetImpl(GpuMrtTargetDescriptor descriptor) {
    _requireReady();
    descriptor.validate();
    final fbo = gl.createFramebuffer();
    if (fbo == null) {
      throw StateError('WebGl2Device: gl.createFramebuffer() returned null');
    }
    gl.bindFramebuffer(_G.FRAMEBUFFER, fbo);

    final colorAttachments = <web.WebGLTexture>[];
    final drawBufs = <JSNumber>[];
    for (var i = 0; i < descriptor.colorFormats.length; i++) {
      final tex = gl.createTexture()!;
      gl.bindTexture(_G.TEXTURE_2D, tex);
      gl.texStorage2D(
        _G.TEXTURE_2D,
        1,
        _glColorTargetInternalFormat(descriptor.colorFormats[i]),
        descriptor.width,
        descriptor.height,
      );
      gl.texParameteri(_G.TEXTURE_2D, _G.TEXTURE_MIN_FILTER, _G.LINEAR);
      gl.texParameteri(_G.TEXTURE_2D, _G.TEXTURE_MAG_FILTER, _G.LINEAR);
      gl.framebufferTexture2D(
        _G.FRAMEBUFFER,
        _G.COLOR_ATTACHMENT0 + i,
        _G.TEXTURE_2D,
        tex,
        0,
      );
      colorAttachments.add(tex);
      drawBufs.add((_G.COLOR_ATTACHMENT0 + i).toJS);
    }
    if (drawBufs.isEmpty) {
      gl.drawBuffers(<JSNumber>[_G.NONE.toJS].toJS);
      gl.readBuffer(_G.NONE);
    } else {
      gl.drawBuffers(drawBufs.toJS);
    }

    web.WebGLTexture? depthTex;
    if (descriptor.hasDepth) {
      depthTex = gl.createTexture()!;
      gl.bindTexture(_G.TEXTURE_2D, depthTex);
      gl.texStorage2D(
        _G.TEXTURE_2D,
        1,
        _G.DEPTH_COMPONENT24,
        descriptor.width,
        descriptor.height,
      );
      gl.texParameteri(_G.TEXTURE_2D, _G.TEXTURE_MIN_FILTER, _G.NEAREST);
      gl.texParameteri(_G.TEXTURE_2D, _G.TEXTURE_MAG_FILTER, _G.NEAREST);
      gl.framebufferTexture2D(
        _G.FRAMEBUFFER,
        _G.DEPTH_ATTACHMENT,
        _G.TEXTURE_2D,
        depthTex,
        0,
      );
    }

    final complete =
        gl.checkFramebufferStatus(_G.FRAMEBUFFER) == _G.FRAMEBUFFER_COMPLETE;
    gl.bindFramebuffer(_G.FRAMEBUFFER, null);
    if (!complete) {
      gl.deleteFramebuffer(fbo);
      for (final tex in colorAttachments) {
        gl.deleteTexture(tex);
      }
      if (depthTex != null) gl.deleteTexture(depthTex);
      throw StateError('WebGl2Device.createMrtTarget: framebuffer incomplete');
    }

    return _WebGpuObject(
      _WebGlFramebuffer(
        fbo: fbo,
        colorTex: colorAttachments.isNotEmpty ? colorAttachments.first : null,
        glowTex: colorAttachments.length > 1 ? colorAttachments[1] : null,
        colorAttachments: colorAttachments,
        depthTex: depthTex,
        width: descriptor.width,
        height: descriptor.height,
        samples: descriptor.samples,
      ),
      contextGeneration,
    );
  }

  void drawBuffersImpl(List<int> colorAttachmentIndices) {
    _requireReady();
    if (colorAttachmentIndices.isEmpty) {
      gl.drawBuffers(<JSNumber>[_G.NONE.toJS].toJS);
      return;
    }
    final bufs = colorAttachmentIndices
        .map((i) => (i < 0 ? _G.NONE : _G.COLOR_ATTACHMENT0 + i).toJS)
        .toList();
    gl.drawBuffers(bufs.toJS);
  }

  void bindTargetColorAttachmentImpl(
    int unit,
    GpuObject target,
    int attachmentIndex,
  ) {
    _requireReady();
    final fb = _asFramebuffer(target);
    final web.WebGLTexture? tex = attachmentIndex < fb.colorAttachments.length
        ? fb.colorAttachments[attachmentIndex]
        : (attachmentIndex == 0
              ? fb.colorTex
              : attachmentIndex == 1
              ? fb.glowTex
              : null);
    if (tex == null) {
      throw RangeError.index(
        attachmentIndex,
        fb.colorAttachments,
        'attachmentIndex',
        'No color attachment at index $attachmentIndex',
      );
    }
    if (_stateCache.shouldBindTexture(unit, _G.TEXTURE_2D, tex)) {
      gl.activeTexture(_G.TEXTURE0 + unit);
      gl.bindTexture(_G.TEXTURE_2D, tex);
      _stateCache.markTextureBound(unit, _G.TEXTURE_2D, tex);
    }
  }

  // --- Occlusion Queries ---

  GpuObject? beginOcclusionQueryImpl() {
    _requireReady();
    final query = gl.createQuery();
    if (query == null) return null;
    gl.beginQuery(_anySamplesPassedConservative, query);
    return _WebGpuObject(_WebGlOcclusionQuery(query), contextGeneration);
  }

  void endOcclusionQueryImpl(GpuObject query) {
    _requireReady();
    final q = (query as _WebGpuObject).handle as _WebGlOcclusionQuery;
    if (q.ended) throw StateError('WebGl2Device: occlusion query already ended');
    gl.endQuery(_anySamplesPassedConservative);
    q.ended = true;
  }

  GpuOcclusionQueryPoll pollOcclusionQueryImpl(GpuObject query) {
    final q = (query as _WebGpuObject).handle as _WebGlOcclusionQuery;
    if (!q.ended) {
      return const GpuOcclusionQueryPoll(GpuOcclusionQueryStatus.pending);
    }
    final available = gl
        .getQueryParameter(q.query, _G.QUERY_RESULT_AVAILABLE)
        .dartify();
    if (available != true) {
      return const GpuOcclusionQueryPoll(GpuOcclusionQueryStatus.pending);
    }
    final result = gl.getQueryParameter(q.query, _G.QUERY_RESULT).dartify();
    return GpuOcclusionQueryPoll(
      GpuOcclusionQueryStatus.ready,
      result == true || (result is num && result > 0),
    );
  }

  void deleteOcclusionQueryImpl(GpuObject query) {
    if ((query as _WebGpuObject).generation != contextGeneration) return;
    final q = query.handle as _WebGlOcclusionQuery;
    gl.deleteQuery(q.query);
  }

  // --- Per-Pass Timer Query Scopes ---

  GpuPassTimerScope? beginPassTimerImpl(String passName) {
    final query = beginGpuTimer();
    if (query == null) return null;
    return GpuPassTimerScope(passName: passName, query: query);
  }

  void endPassTimerImpl(GpuPassTimerScope scope) {
    endGpuTimer(scope.query);
  }
}
