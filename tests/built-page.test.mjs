import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');

test('builds the MUSE document metadata and landmarks', () => {
  assert.match(html, /<title>MUSE \| Metacognitive Unison Self-Evolution<\/title>/);
  assert.match(html, /<meta name="description" content="[^"]+"/);
  assert.match(
    html,
    /<link rel="icon" type="image\/png" href="\/assets\/images\/branding\/MUSE_avatar\.png"/,
  );
  assert.match(html, /href="#main-content"/);
  assert.match(html, /<header[^>]*data-site-header/);
  assert.match(html, /<main[^>]*id="main-content"/);
});

test('renders the MUSE avatar as the header brand icon', () => {
  assert.match(
    html,
    /<img[^>]*class="brand-mark"[^>]*src="\/assets\/images\/branding\/MUSE_avatar\.png"[^>]*alt=""/,
  );
  assert.doesNotMatch(html, /<span class="brand-mark"/);
});

test('renders the complete research narrative', () => {
  for (const heading of [
    'Metacognitive Unison Self-Evolution',
    'A Unified Formulation of Agent Evolution',
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

test('replaces the abstract with the six-component evolution formulation', () => {
  assert.match(html, /data-evolution-formulation/);
  assert.deepEqual(
    [...html.matchAll(/data-evolution-component="([^"]+)"/g)].map((match) => match[1]),
    ['Δ', 'C', 'M', 'Γ', 'O', 'B'],
  );
  assert.match(html, /data-formulation-equation/);
  assert.match(html, /data-evolution-process/);
  assert.match(html, /One Evolution Round/);
  assert.match(html, /Continuous Evolutionary Trajectory/);
  assert.match(html, /class="katex"/);
  assert.equal(
    (html.match(/<[^>]+\sdata-example-control(?:\s|=|>)/g) ?? []).length,
    6,
  );
  assert.match(html, /data-formulation-example/);
  assert.match(html, /Changed Service Workflow/);
  assert.doesNotMatch(html, />Abstract<\/h2>/);
});

test('wires progressive motion across the explanatory sequence', () => {
  assert.match(html, /<main[^>]*data-page-motion/);
  assert.equal((html.match(/data-motion-group=/g) ?? []).length, 5);
  assert.equal((html.match(/<[^>]+\sdata-motion-item(?:\s|=|>)/g) ?? []).length, 18);
});

test('serves paper figures from the organized asset directory', () => {
  assert.match(html, /\/assets\/images\/figures\/evolution-spectrum\.png/);
  assert.match(html, /\/assets\/images\/figures\/architecture\.png/);
  assert.doesNotMatch(html, /(?:src|href)="\/images\//);
});

test('summarizes the architecture as an interactive three-stage evolution flow', () => {
  assert.match(html, /data-architecture-flow/);
  assert.deepEqual(
    [...html.matchAll(/data-architecture-stage="([^"]+)"/g)].map((match) => match[1]),
    ['diagnose', 'coordinate', 'verify'],
  );
  assert.deepEqual(
    [...html.matchAll(/data-architecture-context="([^"]+)"/g)].map((match) => match[1]),
    ['environment', 'agent', 'history'],
  );
  assert.match(html, /data-architecture-outcome/);
  assert.match(html, /View full technical architecture/);
  assert.doesNotMatch(html, /class="architecture-figure/);
  assert.doesNotMatch(html, /Level 0[12]/);
});

test('renders four institution logos in publication order', () => {
  assert.deepEqual(
    [...html.matchAll(/data-institution-logo="([^"]+)"/g)].map((match) => match[1]),
    ['1', '2', '3', '4'],
  );
  assert.match(html, /src="\/assets\/images\/branding\/institutions\/szu\.svg"/);
});

test('renders stable repeated structures and truthful resource states', () => {
  assert.equal((html.match(/data-stage-comparison/g) ?? []).length, 3);
  assert.equal((html.match(/data-mechanism/g) ?? []).length, 3);
  assert.equal((html.match(/data-lifecycle-stage/g) ?? []).length, 5);
  assert.doesNotMatch(html, /href=""/);
  assert.match(html, /Coming Soon/);
  assert.match(html, /<footer/);
});
