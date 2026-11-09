import 'package:pixeldart/pixeldart.dart';
import 'package:pixeldart/rendering/webgl/pixeldart_app.dart';
import 'package:web/web.dart' as web;

import 'art.dart';
import 'game.dart';
import 'sound.dart';

// PROCESSION: a horde-escort on the sprite layer. Nothing here is a mesh or
// a scene node: the map is two TileLayers, everything that moves is one
// y-sorted SpriteBatch, and the night is a batch of multiply rectangles.

void main() async {
  final canvas = web.document.querySelector('#game');
  if (canvas is! web.HTMLCanvasElement) return;
  final app = await PixeldartApp.mount2d(
    canvas,
    bloom: true,
    clearColor: const LinearColor(0.02, 0.02, 0.05),
  );
  if (app == null) {
    _fail('This browser cannot run Procession (WebGL2 is required).');
    return;
  }
  app.enableBloom(strength: 0.55);

  final Art art;
  try {
    art = await Art.load(app);
  } catch (e, s) {
    print('Procession failed to load: $e\n$s');
    _fail('Could not load the game art: $e');
    return;
  }

  final query = Uri.base.queryParameters;
  final game = Game(
    app,
    art,
    _sounds(),
    bot: query.containsKey('bot'),
    stress: int.tryParse(query['stress'] ?? '') ?? 0,
    debug: query.containsKey('debug'),
  );
  if (query.containsKey('autostart')) game.start();

  app.onBeforeFrame = (_, dt) => game.update(dt);
  app.onFrame = game.render;
  app.start();
}

Sound _sounds() => Sound()
  ..register('swing', 'knifeSlice', volume: 0.25, voices: 3)
  ..register('shot', 'drawKnife2', volume: 0.18, voices: 4)
  ..register('zap', 'bookFlip1', volume: 0.3)
  ..register('boom', 'chop', volume: 0.5)
  ..register('pulse', 'metalPot1', volume: 0.3)
  ..register('crunch', 'dropLeather', volume: 0.25, voices: 5)
  ..register('join', 'handleCoins', volume: 0.5)
  ..register('bank', 'handleCoins2', volume: 0.55, voices: 4)
  ..register('hurt', 'metalLatch', volume: 0.6)
  ..register('break', 'creak2', volume: 0.6)
  ..register('die', 'doorClose_3', volume: 0.5)
  ..register('gate', 'doorOpen_1', volume: 0.6);

void _fail(String message) {
  final card = web.document.createElement('p') as web.HTMLParagraphElement;
  card.textContent = message;
  card.style.cssText = 'position:fixed;inset:40% 0;text-align:center;color:#f4e9d0;font-family:monospace';
  web.document.body?.appendChild(card);
}
