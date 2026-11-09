// Run after compiling web/renderer_test/main.dart.js and serving pixeldart on
// port 8090. Connects to a locally started Chromium/Edge debugging port.
const cdpBase = process.env.PIXELDART_CDP_URL ?? 'http://127.0.0.1:9222';
const fixtureBase =
  process.env.PIXELDART_LAB_URL ??
  'http://127.0.0.1:8090/web/renderer_test/';

const results = [];
for (const mode of ['default', 'present', 'reload']) {
  const fixtureUrl = new URL(fixtureBase);
  fixtureUrl.searchParams.set('shader-lab', mode);
  const created = await fetch(`${cdpBase}/json/new?about:blank`, {
    method: 'PUT',
  });
  if (!created.ok) throw new Error(`CDP target creation failed: ${created.status}`);
  const target = await created.json();
  const pending = new Map();
  const exceptions = [];
  let nextId = 1;
  const socket = new WebSocket(target.webSocketDebuggerUrl);

  try {
    await new Promise((resolve, reject) => {
      socket.addEventListener('open', resolve, { once: true });
      socket.addEventListener('error', reject, { once: true });
    });
    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.method === 'Runtime.exceptionThrown') {
        exceptions.push(message.params.exceptionDetails.text);
      }
      if (message.id == null) return;
      const waiter = pending.get(message.id);
      if (waiter == null) return;
      pending.delete(message.id);
      if (message.error) waiter.reject(new Error(message.error.message));
      else waiter.resolve(message.result);
    });

    function call(method, params = {}) {
      const id = nextId++;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        socket.send(JSON.stringify({ id, method, params }));
      });
    }

    await call('Runtime.enable');
    await call('Page.enable');
    await call('Page.navigate', { url: fixtureUrl.href });
    const expression = `(() => {
      const canvas = document.getElementById('test-canvas');
      const gl = canvas?.getContext('webgl2');
      const debug = gl?.getExtension('WEBGL_debug_renderer_info');
      return JSON.stringify({
        status: canvas?.getAttribute('data-shader-lab-status'),
        mode: canvas?.getAttribute('data-shader-lab-mode'),
        pixel: canvas?.getAttribute('data-shader-lab-pixel'),
        glError: canvas?.getAttribute('data-shader-lab-gl-error'),
        renderer: debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : null,
        log: document.getElementById('debug-log')?.value.slice(-500),
      });
    })()`;
    let result;
    const deadline = Date.now() + 15000;
    while (Date.now() < deadline) {
      const evaluated = await call('Runtime.evaluate', {
        expression,
        returnByValue: true,
      });
      if (evaluated.exceptionDetails) {
        throw new Error(evaluated.exceptionDetails.text);
      }
      result = JSON.parse(evaluated.result.value);
      if (result.status != null) break;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    const software = /swiftshader|software|llvmpipe|basic render/i.test(
      result?.renderer ?? '',
    );
    const adapterKnown = Boolean(result?.renderer);
    results.push(result);
    console.log(JSON.stringify({ ...result, exceptions, software, adapterKnown }, null, 2));
    if (
      result?.status !== 'pass' ||
      result?.mode !== mode ||
      exceptions.length !== 0 ||
      software ||
      !adapterKnown
    ) {
      process.exitCode = 1;
    }
  } finally {
    socket.close();
    await fetch(`${cdpBase}/json/close/${target.id}`).catch(() => {});
  }
}
if (results[0]?.pixel === results[1]?.pixel) {
  console.error('Built-in and host present shaders produced identical pixels');
  process.exitCode = 1;
}
