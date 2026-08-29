import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');

test('builds the MUSE document metadata and landmarks', () => {
  assert.match(html, /<title>MUSE \| Metacognitive Unison Self-Evolution<\/title>/);
  assert.match(html, /<meta name="description" content="[^"]+"/);
  assert.match(html, /href="#main-content"/);
  assert.match(html, /<header[^>]*data-site-header/);
  assert.match(html, /<main[^>]*id="main-content"/);
});

test('renders the complete research narrative', () => {
  for (const heading of [
    'Metacognitive Unison Self-Evolution',
    'Abstract',
    'Why Evolution 3.0 Falls Short',
    'Three Mechanisms for Stage-4 Evolution',
    'System Architecture',
    'Evolution in Action',
    'Results Coming Soon',
    'Resources',
  ]) {
    assert.match(html, new RegExp(heading));
  }
  assert.match(html, /evolution-spectrum\.png/);
  assert.match(html, /architecture\.png/);
});

test('renders stable repeated structures and truthful resource states', () => {
  assert.equal((html.match(/data-stage-comparison/g) ?? []).length, 3);
  assert.equal((html.match(/data-mechanism/g) ?? []).length, 3);
  assert.equal((html.match(/data-lifecycle-stage/g) ?? []).length, 5);
  assert.doesNotMatch(html, /href=""/);
  assert.match(html, /Coming Soon/);
  assert.match(html, /<footer/);
});
