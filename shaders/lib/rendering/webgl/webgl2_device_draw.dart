part of 'webgl2_device.dart';

extension WebGl2DeviceDraw on WebGl2Device {
  void bindTargetImpl(GpuObject? target) {
    _requireReady();
    if (target == null) {
      gl.bindFramebuffer(_G.FRAMEBUFFER, null);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      return;
    }
    final fb = _asFramebuffer(target);
    gl.bindFramebuffer(_G.FRAMEBUFFER, fb.fbo);
    gl.viewport(0, 0, fb.width, fb.height);
  }

  void setColorAttachmentCountImpl(int count) {
    _requireReady();
    switch (count) {
      case 1:
        gl.drawBuffers(<JSNumber>[_G.COLOR_ATTACHMENT0.toJS].toJS);
      case 2:
        gl.drawBuffers(
          <JSNumber>[_G.COLOR_ATTACHMENT0.toJS, _G.COLOR_ATTACHMENT1.toJS].toJS,
        );
      default:
        throw ArgumentError(
          'WebGl2Device.setColorAttachmentCount: count must be 1 or 2, '
          'got $count',
        );
    }
  }

  void resolveTargetImpl(GpuObject source, GpuObject destination) {
    _requireReady();
    final src = _asFramebuffer(source);
    final dst = _asFramebuffer(destination);
    if (src.samples <= 1) {
      throw ArgumentError(
        'WebGl2Device.resolveTarget: source must be multisampled '
        '(samples > 1), got ${src.samples}',
      );
    }
    if (dst.samples > 1) {
      throw ArgumentError(
        'WebGl2Device.resolveTarget: destination must be single-sample, '
        'got samples=${dst.samples}',
      );
    }
    if (src.width != dst.width || src.height != dst.height) {
      throw ArgumentError(
        'WebGl2Device.resolveTarget: source (${src.width}x${src.height}) and '
        'destination (${dst.width}x${dst.height}) must match',
      );
    }
    // Each attachment resolves only when both sides own it: the destination
    // is sized by its readers, so a missing glow or depth there means no
    // later pass samples it and the blit would be wasted bandwidth.
    final resolveColor =
        (src.colorRb != null || src.colorTex != null) &&
        (dst.colorRb != null || dst.colorTex != null);
    final resolveGlow =
        (src.glowRb != null || src.glowTex != null) &&
        (dst.glowRb != null || dst.glowTex != null);
    final resolveDepth =
        (src.depthRb != null || src.depthTex != null) &&
        (dst.depthRb != null || dst.depthTex != null);

    gl.bindFramebuffer(_G.READ_FRAMEBUFFER, src.fbo);
    gl.bindFramebuffer(_G.DRAW_FRAMEBUFFER, dst.fbo);

    // §8.7's emissive-continuity requirement ("MSAA on/off preserves the
    // source") means the glow attachment must resolve exactly like color
    // does. blitFramebuffer resolves whatever the read framebuffer's
    // current readBuffer names into the draw framebuffer's active draw
    // buffers — for a two-attachment target that means two passes, each
    // isolating one attachment via readBuffer/drawBuffers, since a single
    // blit call cannot target two source/destination attachment pairs at
    // once.
    if (resolveColor) {
      if (resolveGlow) {
        gl.readBuffer(_G.COLOR_ATTACHMENT0);
        gl.drawBuffers(
          <JSNumber>[_G.COLOR_ATTACHMENT0.toJS, _G.NONE.toJS].toJS,
        );
      }
      gl.blitFramebuffer(
        0,
        0,
        src.width,
        src.height,
        0,
        0,
        dst.width,
        dst.height,
        _G.COLOR_BUFFER_BIT,
        _G.LINEAR,
      );
    }
    if (resolveGlow) {
      gl.readBuffer(_G.COLOR_ATTACHMENT1);
      gl.drawBuffers(<JSNumber>[_G.NONE.toJS, _G.COLOR_ATTACHMENT1.toJS].toJS);
      gl.blitFramebuffer(
        0,
        0,
        src.width,
        src.height,
        0,
        0,
        dst.width,
        dst.height,
        _G.COLOR_BUFFER_BIT,
        _G.LINEAR,
      );
    }
    if (resolveDepth) {
      gl.blitFramebuffer(
        0,
        0,
        src.width,
        src.height,
        0,
        0,
        dst.width,
        dst.height,
        _G.DEPTH_BUFFER_BIT,
        _G.NEAREST,
      );
    }

    // Only dst.fbo's draw-buffer state was mutated above (drawBuffers only
    // ever affects whichever framebuffer is bound to DRAW_FRAMEBUFFER,
    // never READ_FRAMEBUFFER) — restore it to the two-attachment state
    // createTargetImpl established, or a later pass rendering into dst
    // would silently stop writing one of its two color attachments. The
    // source's read buffer goes back to its default for the same reason.
    if (resolveGlow) {
      gl.readBuffer(_G.COLOR_ATTACHMENT0);
      gl.drawBuffers(
        <JSNumber>[_G.COLOR_ATTACHMENT0.toJS, _G.COLOR_ATTACHMENT1.toJS].toJS,
      );
    }

    gl.bindFramebuffer(_G.READ_FRAMEBUFFER, null);
    gl.bindFramebuffer(_G.DRAW_FRAMEBUFFER, null);
  }

  void bindGlowTextureImpl(int unit, GpuObject target) {
    _requireReady();
    final fb = _asFramebuffer(target);
    gl.activeTexture(_G.TEXTURE0 + unit);
    if (fb.glowTex != null) {
      gl.bindTexture(_G.TEXTURE_2D, fb.glowTex);
      return;
    }
    throw StateError(
      'WebGl2Device.bindGlowTexture: target has no glow attachment — create '
      'it with GpuTargetAttachment.colorAndGlow/colorDepthGlow, and resolve '
      'a multisampled source before sampling (single-sample only)',
    );
  }

  int _glDepthFunc(DepthFunc fn) => switch (fn) {
    DepthFunc.less => _G.LESS,
    DepthFunc.lessEqual => _G.LEQUAL,
    DepthFunc.always => _G.ALWAYS,
    DepthFunc.never => _G.NEVER,
  };

  int _glCullFace(CullFace face) => switch (face) {
    CullFace.front => _G.FRONT,
    CullFace.back => _G.BACK,
  };

  int _glBlendFactor(BlendFactor factor) => switch (factor) {
    BlendFactor.zero => _G.ZERO,
    BlendFactor.one => _G.ONE,
    BlendFactor.srcAlpha => _G.SRC_ALPHA,
    BlendFactor.oneMinusSrcAlpha => _G.ONE_MINUS_SRC_ALPHA,
    BlendFactor.dstAlpha => _G.DST_ALPHA,
    BlendFactor.oneMinusDstAlpha => _G.ONE_MINUS_DST_ALPHA,
    BlendFactor.srcColor => _G.SRC_COLOR,
  };

  int _glBlendEquation(BlendEquation eq) => switch (eq) {
    BlendEquation.add => _G.FUNC_ADD,
    BlendEquation.subtract => _G.FUNC_SUBTRACT,
    BlendEquation.reverseSubtract => _G.FUNC_REVERSE_SUBTRACT,
  };

  void applyDrawStateImpl(DrawStateDescriptor state) {
    _requireReady();
    final changed = _stateCache.diff(state);
    if (changed.isEmpty) return;

    if (changed.contains(StateField.depthTest)) {
      if (state.depthTest) {
        gl.enable(_G.DEPTH_TEST);
      } else {
        gl.disable(_G.DEPTH_TEST);
      }
    }
    if (changed.contains(StateField.depthFunc)) {
      gl.depthFunc(_glDepthFunc(state.depthFunc));
    }
    if (changed.contains(StateField.depthWrite)) {
      gl.depthMask(state.depthWrite);
    }
    if (changed.contains(StateField.cullEnable)) {
      if (state.cullEnable) {
        gl.enable(_G.CULL_FACE);
      } else {
        gl.disable(_G.CULL_FACE);
      }
    }
    if (changed.contains(StateField.cullFace)) {
      gl.cullFace(_glCullFace(state.cullFace));
    }
    if (changed.contains(StateField.frontFace)) {
      gl.frontFace(state.frontFaceCcw ? _G.CCW : _G.CW);
    }
    if (changed.contains(StateField.blendEnable)) {
      if (state.blendEnable) {
        gl.enable(_G.BLEND);
      } else {
        gl.disable(_G.BLEND);
      }
    }
    if (changed.contains(StateField.blendFunc)) {
      gl.blendFunc(
        _glBlendFactor(state.blendSrc),
        _glBlendFactor(state.blendDst),
      );
    }
    if (changed.contains(StateField.blendEquation)) {
      gl.blendEquation(_glBlendEquation(state.blendEquation));
    }
    if (changed.contains(StateField.colorMask)) {
      gl.colorMask(
        state.colorMaskR,
        state.colorMaskG,
        state.colorMaskB,
        state.colorMaskA,
      );
    }
    if (changed.contains(StateField.scissorEnable)) {
      if (state.scissorEnable) {
        gl.enable(_G.SCISSOR_TEST);
      } else {
        gl.disable(_G.SCISSOR_TEST);
      }
    }
    _stateCache.markApplied(state);
  }

  int _glClearBits(ClearMask mask) => switch (mask) {
    ClearMask.colorOnly => _G.COLOR_BUFFER_BIT,
    ClearMask.colorAndDepth => _G.COLOR_BUFFER_BIT | _G.DEPTH_BUFFER_BIT,
    ClearMask.depthOnly => _G.DEPTH_BUFFER_BIT,
  };

  void clearImpl(
    ClearMask mask, {
    double r = 0,
    double g = 0,
    double b = 0,
    double a = 1,
  }) {
    _requireReady();
    gl.clearColor(r, g, b, a);
    gl.clear(_glClearBits(mask));
  }

  void clearColorAttachmentImpl(
    int index, {
    double r = 0,
    double g = 0,
    double b = 0,
    double a = 0,
  }) {
    _requireReady();
    gl.clearBufferfv(_G.COLOR, index, Float32List.fromList([r, g, b, a]).toJS);
  }

  void useProgramImpl(GpuObject program) {
    _requireReady();
    final handle = (program as _WebGpuObject).handle as WebGLProgram;
    gl.useProgram(handle);
    setBoundProgram(handle);
  }

  void setUniformImpl(String name, UniformValue value) {
    _requireReady();
    final program = boundProgram;
    if (program == null) {
      throw StateError('WebGl2Device.setUniform called with no bound program');
    }
    // Locations are fixed once a program links; looking them up by string
    // on every set was a third of all frame CPU time.
    final locations = _boundUniforms!;
    var location = locations.found[name];
    if (location == null) {
      if (locations.missing.contains(name)) return;
      location = gl.getUniformLocation(program, name);
      if (location == null) {
        locations.missing.add(name);
        return;
      }
      locations.found[name] = location;
    }
    switch (value.type) {
      case UniformType.float1:
        gl.uniform1f(location, value.value as double);
      case UniformType.float2:
        final v = value.value as Float32List;
        gl.uniform2f(location, v[0], v[1]);
      case UniformType.float3:
        final v = value.value as Float32List;
        gl.uniform3f(location, v[0], v[1], v[2]);
      case UniformType.float4:
        final v = value.value as Float32List;
        gl.uniform4f(location, v[0], v[1], v[2], v[3]);
      case UniformType.int1:
        gl.uniform1i(location, value.value as int);
      case UniformType.mat4:
        gl.uniformMatrix4fv(location, false, (value.value as Float32List).toJS);
      case UniformType.mat4Array:
        gl.uniformMatrix4fv(location, false, (value.value as Float32List).toJS);
      case UniformType.sampler:
        gl.uniform1i(location, value.value as int);
    }
  }

  void bindVertexArrayImpl(GpuObject vao) {
    _requireReady();
    gl.bindVertexArray((vao as _WebGpuObject).handle as WebGLVertexArrayObject);
  }

  void bindArrayBufferImpl(GpuObject buffer) {
    _requireReady();
    gl.bindBuffer(
      _G.ARRAY_BUFFER,
      (buffer as _WebGpuObject).handle as WebGLBuffer,
    );
  }

  void vertexAttribPointerImpl({
    required int location,
    required int componentCount,
    required int strideBytes,
    required int offsetBytes,
    GpuAttribFormat format = GpuAttribFormat.float,
  }) {
    _requireReady();
    gl.vertexAttribPointer(
      location,
      componentCount,
      switch (format) {
        GpuAttribFormat.float => _G.FLOAT,
        GpuAttribFormat.unorm16 => _G.UNSIGNED_SHORT,
        GpuAttribFormat.unorm8 => _G.UNSIGNED_BYTE,
      },
      format != GpuAttribFormat.float,
      strideBytes,
      offsetBytes,
    );
  }

  void enableVertexAttribArrayImpl(int location) {
    _requireReady();
    gl.enableVertexAttribArray(location);
  }

  void vertexAttribDivisorImpl(int location, int divisor) {
    _requireReady();
    gl.vertexAttribDivisor(location, divisor);
  }

  void bindTextureImpl(int unit, GpuObject texture) {
    _requireReady();
    final handle = (texture as _WebGpuObject).handle;
    gl.activeTexture(_G.TEXTURE0 + unit);
    if (handle is _WebGlTexture) {
      final target = handle.layers > 1 ? _G.TEXTURE_2D_ARRAY : _G.TEXTURE_2D;
      gl.bindTexture(target, handle.handle);
      return;
    }
    if (handle is _WebGlFramebuffer) {
      final colorTex = handle.colorTex;
      if (colorTex != null) {
        gl.bindTexture(_G.TEXTURE_2D, colorTex);
        return;
      }
      // A depth-only target (§8.4's shadow map) has no color attachment at
      // all by design — its depth texture is the thing a world pass samples
      // to test a fragment against the light's stored depth, so it is the
      // correct (only) fallback here rather than an error.
      final depthTex = handle.depthTex;
      if (depthTex != null) {
        gl.bindTexture(_G.TEXTURE_2D, depthTex);
        return;
      }
      throw StateError(
        'WebGl2Device.bindTexture: target has no sampleable color or depth '
        'texture (multisampled targets must be resolved to a single-sample '
        'target before sampling)',
      );
    }
    throw StateError(
      'WebGl2Device.bindTexture: unrecognized GpuObject handle type',
    );
  }

  void bindElementArrayBufferImpl(GpuObject buffer) {
    _requireReady();
    gl.bindBuffer(
      _G.ELEMENT_ARRAY_BUFFER,
      (buffer as _WebGpuObject).handle as WebGLBuffer,
    );
  }

  void uploadIndicesImpl(GpuObject buffer, List<int> data) {
    _requireReady();
    final handle = (buffer as _WebGpuObject).handle as WebGLBuffer;
    gl.bindBuffer(_G.ELEMENT_ARRAY_BUFFER, handle);
    switch (data) {
      case Uint16List values:
        gl.bufferData(_G.ELEMENT_ARRAY_BUFFER, values.toJS, _G.STATIC_DRAW);
      default:
        // The current package:web interop exposes Uint16List/Float32List
        // directly but not the 32-bit list. A byte payload preserves the
        // exact little-endian element values while still passing an
        // ArrayBuffer view accepted by WebGL's bufferData overload.
        final bytes = Uint8List(data.length * 4);
        final byteData = ByteData.view(bytes.buffer);
        for (var i = 0; i < data.length; i++) {
          byteData.setUint32(i * 4, data[i], Endian.little);
        }
        gl.bufferData(_G.ELEMENT_ARRAY_BUFFER, bytes.toJS, _G.STATIC_DRAW);
    }
  }

  void drawArraysImpl({required int first, required int count}) {
    _requireReady();
    gl.drawArrays(_G.TRIANGLES, first, count);
  }

  void drawArraysInstancedImpl({
    required int first,
    required int count,
    required int instanceCount,
  }) {
    _requireReady();
    gl.drawArraysInstanced(_G.TRIANGLES, first, count, instanceCount);
  }

  void drawElementsImpl({
    required int count,
    required int offsetBytes,
    required bool index32,
  }) {
    _requireReady();
    gl.drawElements(
      _G.TRIANGLES,
      count,
      index32 ? _G.UNSIGNED_INT : _G.UNSIGNED_SHORT,
      offsetBytes,
    );
  }

  void drawElementsInstancedImpl({
    required int count,
    required int offsetBytes,
    required int instanceCount,
    required bool index32,
  }) {
    _requireReady();
    gl.drawElementsInstanced(
      _G.TRIANGLES,
      count,
      index32 ? _G.UNSIGNED_INT : _G.UNSIGNED_SHORT,
      offsetBytes,
      instanceCount,
    );
  }
}
