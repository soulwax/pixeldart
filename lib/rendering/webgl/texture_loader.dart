import 'dart:async';
import 'dart:js_interop';
import 'dart:typed_data';

import 'package:web/web.dart' as web;

import '../api/handles.dart';
import '../api/renderer.dart';
import 'device_api.dart';

/// Browser utility for asynchronous texture loading from URLs or image elements.
abstract final class TextureLoader {
  /// Asynchronously fetches an image from [url] and registers it with [resources].
  static Future<TextureHandle> loadFromUrl({
    required ResourceLibrary resources,
    required String url,
    bool generateMips = true,
    double anisotropy = 16.0,
    GpuTextureWrap wrap = GpuTextureWrap.repeat,
    GpuTextureFilter minFilter = GpuTextureFilter.linearMipmapLinear,
    GpuTextureFilter magFilter = GpuTextureFilter.linear,
  }) async {
    final completer = Completer<web.HTMLImageElement>();
    final img = web.HTMLImageElement();
    img.crossOrigin = 'anonymous';

    img.onload = ((web.Event _) {
      completer.complete(img);
    }).toJS;

    img.onerror = ((web.Event _) {
      completer.completeError(StateError('Failed to load image from "$url"'));
    }).toJS;

    img.src = url;
    final loadedImg = await completer.future;

    return loadFromImage(
      resources: resources,
      image: loadedImg,
      debugLabel: url,
      generateMips: generateMips,
      anisotropy: anisotropy,
      wrap: wrap,
      minFilter: minFilter,
      magFilter: magFilter,
    );
  }

  /// Asynchronously decodes raw [bytes] (e.g. embedded PNG/JPEG in a GLB)
  /// into a texture registered with [resources].
  static Future<TextureHandle> loadFromBytes({
    required ResourceLibrary resources,
    required Uint8List bytes,
    String mimeType = 'image/png',
    String? debugLabel,
    bool generateMips = true,
    double anisotropy = 16.0,
    GpuTextureWrap wrap = GpuTextureWrap.repeat,
    GpuTextureFilter minFilter = GpuTextureFilter.linearMipmapLinear,
    GpuTextureFilter magFilter = GpuTextureFilter.linear,
  }) async {
    final blob = web.Blob(
      [bytes.toJS].toJS,
      web.BlobPropertyBag(type: mimeType),
    );
    final url = web.URL.createObjectURL(blob);
    try {
      return await loadFromUrl(
        resources: resources,
        url: url,
        generateMips: generateMips,
        anisotropy: anisotropy,
        wrap: wrap,
        minFilter: minFilter,
        magFilter: magFilter,
      );
    } finally {
      web.URL.revokeObjectURL(url);
    }
  }

  /// Extracts pixel data from an [image] element and registers it with [resources].
  static TextureHandle loadFromImage({
    required ResourceLibrary resources,
    required web.HTMLImageElement image,
    String? debugLabel,
    bool generateMips = true,
    double anisotropy = 16.0,
    GpuTextureWrap wrap = GpuTextureWrap.repeat,
    GpuTextureFilter minFilter = GpuTextureFilter.linearMipmapLinear,
    GpuTextureFilter magFilter = GpuTextureFilter.linear,
  }) {
    final width = image.naturalWidth;
    final height = image.naturalHeight;
    if (width <= 0 || height <= 0) {
      throw ArgumentError('Image has invalid dimensions: ${width}x$height');
    }

    final canvas = web.document.createElement('canvas') as web.HTMLCanvasElement;
    canvas.width = width;
    canvas.height = height;

    final ctx = canvas.getContext('2d') as web.CanvasRenderingContext2D;
    ctx.drawImage(image, 0, 0);
    final imgData = ctx.getImageData(0, 0, width, height);
    final rawBytes = imgData.data.toDart;
    final pixels = Uint8List.view(
      rawBytes.buffer,
      rawBytes.offsetInBytes,
      rawBytes.lengthInBytes,
    );

    final handle = resources.registerTexture(
      width: width,
      height: height,
      hasMips: generateMips,
      anisotropy: anisotropy,
      wrap: wrap,
      minFilter: minFilter,
      magFilter: magFilter,
      pixels: pixels,
      debugLabel: debugLabel ?? 'Image_${width}x$height',
    );

    if (generateMips) {
      resources.finalizeTextureMips(handle);
    }

    return handle;
  }
}
