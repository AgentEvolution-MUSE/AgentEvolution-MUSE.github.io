import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const styles = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

test('places a subdued spectrum beneath upper-left hero copy', () => {
  assert.doesNotMatch(styles, /\.hero-visual::after\s*\{/);
  assert.match(styles, /\.hero-visual\s*\{[^}]*place-items:\s*center;/s);
  assert.match(
    styles,
    /\.hero-visual img\s*\{[^}]*width:\s*100%;[^}]*height:\s*100%;[^}]*max-height:\s*none;[^}]*object-fit:\s*contain;[^}]*object-position:\s*center bottom;[^}]*opacity:\s*0\.10;[^}]*transform:\s*translate\(2%,\s*12%\);/s,
  );
  assert.match(
    styles,
    /\.hero-content\s*\{[^}]*padding:\s*clamp\(44px,\s*6vh,\s*70px\) 0 54px;[^}]*justify-content:\s*flex-start;/s,
  );
  assert.match(styles, /\.hero-visual img\s*\{[^}]*width:\s*92%;[^}]*height:\s*92%;[^}]*max-height:\s*none;[^}]*object-fit:\s*cover;[^}]*opacity:\s*0\.18;/s);
});
