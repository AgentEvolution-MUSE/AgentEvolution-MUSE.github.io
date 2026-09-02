import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [controller, styles] = await Promise.all([
  readFile(new URL('../src/components/PageMotion.astro', import.meta.url), 'utf8'),
  readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8'),
]);

test('removes stagger delay after a motion group has entered', () => {
  assert.match(controller, /data-motion-settled/);
  assert.match(
    styles,
    /\[data-motion-group\]\[data-motion-settled\][^{]*\[data-motion-item\]\s*\{[^}]*transition-delay:\s*0ms/s,
  );
});
