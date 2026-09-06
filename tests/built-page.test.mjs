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
  assert.match(html, /data-section-index/);
  assert.deepEqual(
    [...html.matchAll(/<a href="(#[^"]+)" data-section-index-link/g)].map((match) => match[1]),
    [
      '#why-evolve',
      '#formulation',
      '#spectrum',
      '#method',
      '#architecture',
      '#results',
      '#resources',
    ],
  );
  assert.match(html, /<a href="#why-evolve">Foundation<\/a>/);
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
    'Why Should Agents Evolve?',
    'A Unified Formulation of Agent Evolution',
    'Why Evolution 3.0 Falls Short',
    'Three Mechanisms for Stage-4 Evolution',
    'System Architecture',
    'Results Coming Soon',
    'Resources',
  ]) {
    assert.match(html, new RegExp(heading));
  }
  assert.match(html, /Spectrum-2\.svg/);
  assert.match(html, /Representative Systems Across the Spectrum/);
  assert.match(html, /Reprensentwork\.svg/);
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
  assert.ok((html.match(/<[^>]+\sdata-motion-item(?:\s|=|>)/g) ?? []).length >= 14);
});

test('frames agent evolution as the response to changing deployment conditions', () => {
  assert.match(html, /data-why-evolve/);
  assert.match(html, /Dynamic/);
  assert.match(html, /Open-Ended Deployment/);
  assert.match(html, /Static/);
  assert.match(html, /Post-Deployment Agent/);
  assert.match(html, /Fail to<br\s*\/?>Adapt/);
  assert.equal((html.match(/data-deployment-signal/g) ?? []).length, 6);
  assert.equal((html.match(/data-agent-layer/g) ?? []).length, 3);
  assert.equal((html.match(/data-agent-symbol/g) ?? []).length, 3);
  assert.equal((html.match(/data-agent-detail/g) ?? []).length, 6);
  assert.match(html, /accumulated interaction evidence/);
});

test('serves paper figures from the organized asset directory', () => {
  assert.match(html, /\/assets\/images\/figures\/Spectrum-2\.svg/);
  assert.match(html, /\/assets\/images\/figures\/Reprensentwork\.svg/);
  assert.match(html, /\/assets\/images\/figures\/architecture\.png/);
  assert.doesNotMatch(html, /(?:src|href)="\/images\//);
});

test('presents the representative research landscape after the spectrum', () => {
  assert.match(html, /data-representative-landscape/);
  assert.match(html, /<strong>Figure 2\.<\/strong>/);
  assert.match(html, /holistic Stage-4 prototype/);
});

test('renders the complete six-component evolutionary architecture topology', () => {
  assert.match(html, /data-architecture-map/);
  assert.deepEqual(
    [...html.matchAll(/data-architecture-component="([^"]+)"/g)].map((match) => match[1]),
    ['Γ', 'Δ', 'C', 'M', 'O', 'B'],
  );
  assert.deepEqual(
    [...html.matchAll(/data-architecture-context="([^"]+)"/g)].map((match) => match[1]),
    ['environment', 'agent', 'history'],
  );
  assert.deepEqual(
    [...html.matchAll(/data-architecture-layer="([^"]+)"/g)].map((match) => match[1]),
    ['context', 'gating', 'supervision', 'optimization'],
  );
  assert.equal((html.match(/longleftrightarrow/g) ?? []).length >= 3, true);
  assert.match(html, /View paper figure/);
  assert.doesNotMatch(html, /class="architecture-figure/);
  assert.doesNotMatch(html, /data-architecture-stage=/);
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
  assert.doesNotMatch(html, /href=""/);
  assert.match(html, /Coming Soon/);
  assert.match(html, /<footer/);
});
