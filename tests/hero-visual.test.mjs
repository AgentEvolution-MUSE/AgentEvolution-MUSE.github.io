import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const styles = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

test('uses a uniformly subdued and centered spectrum hero', () => {
  assert.doesNotMatch(styles, /\.hero-visual::after\s*\{/);
  assert.match(styles, /\.hero-visual\s*\{[^}]*place-items:\s*center;/s);
  assert.match(
    styles,
    /\.hero-visual img\s*\{[^}]*width:\s*82%;[^}]*height:\s*82%;[^}]*max-height:\s*none;[^}]*object-fit:\s*contain;[^}]*object-position:\s*center;[^}]*opacity:\s*0\.10;[^}]*transform:\s*translate\(-4%,\s*12%\);/s,
  );
  assert.match(styles, /\.hero-visual img\s*\{[^}]*width:\s*92%;[^}]*height:\s*92%;[^}]*max-height:\s*none;[^}]*object-fit:\s*cover;[^}]*opacity:\s*0\.18;/s);
});
