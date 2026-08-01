part of 'webgl2_device.dart';

extension WebGl2DeviceTargets on WebGl2Device {
  GpuObject createTargetImpl(GpuTargetDescriptor descriptor) {
    _requireReady();
    if (descriptor.width <= 0 || descriptor.height <= 0) {
      throw ArgumentError(
        'WebGl2Device.createTarget requires positive dimensions, '
        'got ${descriptor.width}x${descriptor.height}',
      );
    }
    final fbo = gl.createFramebuffer();
    if (fbo == null) {
      throw StateError('WebGl2Device: gl.createFramebuffer() returned null');
    }
    gl.bindFramebuffer(_G.FRAMEBUFFER, fbo);

    final depthOnly = descriptor.attachments == GpuTargetAttachment.depthOnly;
    if (depthOnly && !descriptor.hasDepth) {
      throw ArgumentError(
        'WebGl2Device.createTarget: GpuTargetAttachment.depthOnly requires '
        'hasDepth: true — a depth-only target with no depth attachment has '
        'nothing to render into',
      );
    }
    // §8.7's "declared emissive attachment": a second color attachment
    // (COLOR_ATTACHMENT1) a world pass writes glow into alongside its
    // normal lit color, so bloom has a real source distinct from final
    // composited luma rather than inferring glow by thresholding it.
    final hasGlow =
        descriptor.attachments == GpuTargetAttachment.colorAndGlow ||
        descriptor.attachments == GpuTargetAttachment.colorDepthGlow;

    web.WebGLTexture? colorTex;
    web.WebGLRenderbuffer? colorRb;
    web.WebGLTexture? glowTex;
    web.WebGLRenderbuffer? glowRb;
    if (depthOnly) {
      // A depth-only framebuffer must explicitly disable the color draw/read
      // buffer, or WebGL2 reports FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT
      // for the absent COLOR_ATTACHMENT0 — this is what makes a shadow map's
      // target valid with zero color storage.
      gl.drawBuffers(<JSNumber>[_G.NONE.toJS].toJS);
      gl.readBuffer(_G.NONE);
    } else if (descriptor.samples > 1) {
      colorRb = gl.createRenderbuffer();
      gl.bindRenderbuffer(_G.RENDERBUFFER, colorRb);
      gl.renderbufferStorageMultisample(
        _G.RENDERBUFFER,
        descriptor.samples,
        _G.RGBA8,
        descriptor.width,
        descriptor.height,
      );
      gl.framebufferRenderbuffer(
        _G.FRAMEBUFFER,
        _G.COLOR_ATTACHMENT0,
        _G.RENDERBUFFER,
        colorRb,
      );
      if (hasGlow) {
        glowRb = gl.createRenderbuffer();
        gl.bindRenderbuffer(_G.RENDERBUFFER, glowRb);
        gl.renderbufferStorageMultisample(
          _G.RENDERBUFFER,
          descriptor.samples,
          _G.RGBA8,
          descriptor.width,
          descriptor.height,
        );
        gl.framebufferRenderbuffer(
          _G.FRAMEBUFFER,
          _G.COLOR_ATTACHMENT1,
          _G.RENDERBUFFER,
          glowRb,
        );
        gl.drawBuffers(
          <JSNumber>[_G.COLOR_ATTACHMENT0.toJS, _G.COLOR_ATTACHMENT1.toJS].toJS,
        );
      }
    } else {
      colorTex = gl.createTexture();
      gl.bindTexture(_G.TEXTURE_2D, colorTex);
      gl.texStorage2D(
        _G.TEXTURE_2D,
        1,
        _G.RGBA8,
        descriptor.width,
        descriptor.height,
      );
      gl.texParameteri(_G.TEXTURE_2D, _G.TEXTURE_MIN_FILTER, _G.LINEAR);
      gl.texParameteri(_G.TEXTURE_2D, _G.TEXTURE_MAG_FILTER, _G.LINEAR);
      gl.framebufferTexture2D(
        _G.FRAMEBUFFER,
        _G.COLOR_ATTACHMENT0,
        _G.TEXTURE_2D,
        colorTex,
        0,
      );
      if (hasGlow) {
        glowTex = gl.createTexture();
        gl.bindTexture(_G.TEXTURE_2D, glowTex);
        gl.texStorage2D(
          _G.TEXTURE_2D,
          1,
          _G.RGBA8,
          descriptor.width,
          descriptor.height,
        );
        gl.texParameteri(_G.TEXTURE_2D, _G.TEXTURE_MIN_FILTER, _G.LINEAR);
        gl.texParameteri(_G.TEXTURE_2D, _G.TEXTURE_MAG_FILTER, _G.LINEAR);
        gl.framebufferTexture2D(
          _G.FRAMEBUFFER,
          _G.COLOR_ATTACHMENT1,
          _G.TEXTURE_2D,
          glowTex,
          0,
        );
        gl.drawBuffers(
          <JSNumber>[_G.COLOR_ATTACHMENT0.toJS, _G.COLOR_ATTACHMENT1.toJS].toJS,
        );
      }
    }

    web.WebGLRenderbuffer? depthRb;
    web.WebGLTexture? depthTex;
    if (descriptor.hasDepth) {
      if (descriptor.samples > 1) {
        depthRb = gl.createRenderbuffer();
        gl.bindRenderbuffer(_G.RENDERBUFFER, depthRb);
        gl.renderbufferStorageMultisample(
          _G.RENDERBUFFER,
          descriptor.samples,
          _G.DEPTH_COMPONENT24,
          descriptor.width,
          descriptor.height,
        );
        gl.framebufferRenderbuffer(
          _G.FRAMEBUFFER,
          _G.DEPTH_ATTACHMENT,
          _G.RENDERBUFFER,
          depthRb,
        );
      } else {
        depthTex = gl.createTexture();
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
    }

    final complete =
        gl.checkFramebufferStatus(_G.FRAMEBUFFER) == _G.FRAMEBUFFER_COMPLETE;
    gl.bindFramebuffer(_G.FRAMEBUFFER, null);
    if (!complete) {
      _deleteFramebufferParts(
        fbo,
        colorTex,
        colorRb,
        depthRb,
        depthTex,
        glowTex,
        glowRb,
      );
      throw StateError('WebGl2Device.createTarget: framebuffer incomplete');
    }

    return _WebGpuObject(
      _WebGlFramebuffer(
        fbo: fbo,
        colorTex: colorTex,
        colorRb: colorRb,
        depthRb: depthRb,
        depthTex: depthTex,
        glowTex: glowTex,
        glowRb: glowRb,
        width: descriptor.width,
        height: descriptor.height,
        samples: descriptor.samples,
      ),
    );
  }

  void _deleteFramebufferParts(
    WebGLFramebuffer fbo,
    web.WebGLTexture? colorTex,
    web.WebGLRenderbuffer? colorRb,
    web.WebGLRenderbuffer? depthRb,
    web.WebGLTexture? depthTex,
    web.WebGLTexture? glowTex,
    web.WebGLRenderbuffer? glowRb,
  ) {
    gl.deleteFramebuffer(fbo);
    if (colorTex != null) gl.deleteTexture(colorTex);
    if (colorRb != null) gl.deleteRenderbuffer(colorRb);
    if (depthRb != null) gl.deleteRenderbuffer(depthRb);
    if (depthTex != null) gl.deleteTexture(depthTex);
    if (glowTex != null) gl.deleteTexture(glowTex);
    if (glowRb != null) gl.deleteRenderbuffer(glowRb);
  }

  void deleteTargetImpl(GpuObject target) {
    final fb = _asFramebuffer(target);
    _deleteFramebufferParts(
      fb.fbo,
      fb.colorTex,
      fb.colorRb,
      fb.depthRb,
      fb.depthTex,
      fb.glowTex,
      fb.glowRb,
    );
  }

  _WebGlFramebuffer _asFramebuffer(GpuObject target) =>
      (target as _WebGpuObject).handle as _WebGlFramebuffer;

  GpuObject createVertexArrayImpl() {
    _requireReady();
    final vao = gl.createVertexArray();
    if (vao == null) {
      throw StateError('WebGl2Device: gl.createVertexArray() returned null');
    }
    return _WebGpuObject(vao);
  }

  void deleteVertexArrayImpl(GpuObject vao) {
    gl.deleteVertexArray(
      (vao as _WebGpuObject).handle as WebGLVertexArrayObject,
    );
  }

  WebGLShader _compileStage(int type, String source) {
    final shader = gl.createShader(type);
    if (shader == null) {
      throw ShaderCompileException(
        type == _G.VERTEX_SHADER
            ? ShaderCompileStage.vertex
            : ShaderCompileStage.fragment,
        'gl.createShader() returned null',
      );
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, _G.COMPILE_STATUS).dartify() != true) {
      final log = gl.getShaderInfoLog(shader) ?? '(no info log)';
      gl.deleteShader(shader);
      throw ShaderCompileException(
        type == _G.VERTEX_SHADER
            ? ShaderCompileStage.vertex
            : ShaderCompileStage.fragment,
        log,
      );
    }
    return shader;
  }

  GpuObject compileProgramImpl({
    required String vertexSource,
    required String fragmentSource,
    required List<String> requiredAttributes,
    required List<String> requiredUniforms,
  }) {
    _requireReady();
    final vertexShader = _compileStage(_G.VERTEX_SHADER, vertexSource);
    final WebGLShader fragmentShader;
    try {
      fragmentShader = _compileStage(_G.FRAGMENT_SHADER, fragmentSource);
    } catch (_) {
      gl.deleteShader(vertexShader);
      rethrow;
    }

    final program = gl.createProgram();
    if (program == null) {
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      throw const ShaderCompileException(
        ShaderCompileStage.link,
        'gl.createProgram() returned null',
      );
    }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    // §7.2 step 7: delete stage objects only after publication succeeds.
    final linked =
        gl.getProgramParameter(program, _G.LINK_STATUS).dartify() == true;
    if (!linked) {
      final log = gl.getProgramInfoLog(program) ?? '(no info log)';
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      throw ShaderCompileException(ShaderCompileStage.link, log);
    }

    for (final attr in requiredAttributes) {
      if (gl.getAttribLocation(program, attr) < 0) {
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        throw ShaderCompileException(
          ShaderCompileStage.validation,
          'missing required attribute: $attr',
        );
      }
    }
    for (final uniform in requiredUniforms) {
      if (gl.getUniformLocation(program, uniform) == null) {
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        throw ShaderCompileException(
          ShaderCompileStage.validation,
          'missing required uniform: $uniform',
        );
      }
    }

    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return _WebGpuObject(program);
  }

  void deleteProgramImpl(GpuObject program) {
    gl.deleteProgram((program as _WebGpuObject).handle as WebGLProgram);
  }
}
