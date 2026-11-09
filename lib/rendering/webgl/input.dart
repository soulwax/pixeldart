import 'dart:js_interop';

import 'package:web/web.dart' as web;

/// Keyboard and pointer state for a canvas, read once per frame.
///
/// Works on its own: construct one for a canvas, read it during the frame
/// and call [endFrame] when the frame is done. `PixeldartApp.input` is one
/// of these, which the app ends for you.
final class InputState {
  final web.HTMLCanvasElement canvas;

  final Set<String> _down = {};
  final Set<String> _pressed = {};
  final Set<String> _released = {};
  int? _pointerId;
  bool _pointerPressed = false;
  bool _pointerReleased = false;
  double _pointerX = 0;
  double _pointerY = 0;

  late final JSFunction _onKeyDown = _keyDown.toJS;
  late final JSFunction _onKeyUp = _keyUp.toJS;
  late final JSFunction _onBlur = _blur.toJS;
  late final JSFunction _onPointerDown = _pointerDownEvent.toJS;
  late final JSFunction _onPointerMove = _pointerMoveEvent.toJS;
  late final JSFunction _onPointerUp = _pointerUpEvent.toJS;

  InputState(this.canvas) {
    // Without this a touch drag scrolls or zooms the page instead.
    canvas.style.touchAction = 'none';
    web.window.addEventListener('keydown', _onKeyDown);
    web.window.addEventListener('keyup', _onKeyUp);
    web.window.addEventListener('blur', _onBlur);
    canvas.addEventListener('pointerdown', _onPointerDown);
    web.window.addEventListener('pointermove', _onPointerMove);
    web.window.addEventListener('pointerup', _onPointerUp);
    web.window.addEventListener('pointercancel', _onPointerUp);
  }

  /// Whether a key is held. [code] is a `KeyboardEvent.code` value such as
  /// `KeyW`, `ArrowUp` or `Space`.
  bool isDown(String code) => _down.contains(code);

  /// Whether a key went down since the last [endFrame]. Auto-repeat does
  /// not count.
  bool wasPressed(String code) => _pressed.contains(code);

  /// Whether a key came up since the last [endFrame].
  bool wasReleased(String code) => _released.contains(code);

  /// Pointer position in device pixels from the canvas's top-left, the
  /// space `Camera2D.screenToWorld` takes.
  double get pointerX => _pointerX;
  double get pointerY => _pointerY;

  /// Whether a mouse button or touch is held down on the canvas.
  bool get pointerDown => _pointerId != null;

  /// Whether a press or release happened since the last [endFrame].
  bool get pointerPressed => _pointerPressed;
  bool get pointerReleased => _pointerReleased;

  /// Clears this frame's presses and releases.
  void endFrame() {
    if (_pressed.isNotEmpty) _pressed.clear();
    if (_released.isNotEmpty) _released.clear();
    _pointerPressed = false;
    _pointerReleased = false;
  }

  /// Removes every listener.
  void dispose() {
    web.window.removeEventListener('keydown', _onKeyDown);
    web.window.removeEventListener('keyup', _onKeyUp);
    web.window.removeEventListener('blur', _onBlur);
    canvas.removeEventListener('pointerdown', _onPointerDown);
    web.window.removeEventListener('pointermove', _onPointerMove);
    web.window.removeEventListener('pointerup', _onPointerUp);
    web.window.removeEventListener('pointercancel', _onPointerUp);
  }

  void _keyDown(web.KeyboardEvent e) {
    if (e.repeat) return;
    if (_down.add(e.code)) _pressed.add(e.code);
  }

  void _keyUp(web.KeyboardEvent e) {
    if (_down.remove(e.code)) _released.add(e.code);
  }

  /// A key released while the window lacks focus never reports its keyup.
  void _blur(web.Event _) {
    _released.addAll(_down);
    _down.clear();
    if (_pointerId != null) {
      _pointerId = null;
      _pointerReleased = true;
    }
  }

  void _track(web.PointerEvent e) {
    final rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    _pointerX = (e.clientX - rect.left) * canvas.width / rect.width;
    _pointerY = (e.clientY - rect.top) * canvas.height / rect.height;
  }

  void _pointerDownEvent(web.PointerEvent e) {
    _track(e);
    if (_pointerId != null) return;
    _pointerId = e.pointerId;
    _pointerPressed = true;
  }

  void _pointerMoveEvent(web.PointerEvent e) {
    if (_pointerId != null && e.pointerId != _pointerId) return;
    _track(e);
  }

  void _pointerUpEvent(web.PointerEvent e) {
    if (e.pointerId != _pointerId) return;
    _track(e);
    _pointerId = null;
    _pointerReleased = true;
  }
}
