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
    'From Stage 3 to Stage 4',
    'Three Mechanisms for Stage-4 Evolution',
    'System Architecture',
    'Experimental Results',
    'Resources',
  ]) {
    assert.match(html, new RegExp(heading));
  }
  assert.match(html, /The Five-Stage Evolutionary Spectrum/);
  assert.match(html, /Representative Systems Across the Spectrum/);
  assert.match(html, /architecture\.png/);
});

test('shows the trajectory alongside baseline, peak, and final success rates', async () => {
  const results = html.match(/<section id="results"[^>]*>[\s\S]*?<\/section>/)?.[0];
  assert.ok(results);
  assert.match(results, /APPWorld.*Qwen3\.5-9B.*8 evolution rounds/);
  assert.match(results, /src="\/assets\/images\/results\/evolution-trajectory\.svg"/);
  assert.match(results, /30\.35%[\s\S]*54\.76%[\s\S]*46\.42%/);
  assert.match(results, /<th scope="row">MUSE \(Joint\)<\/th>\s*<td>52\.38%<\/td>\s*<td>51\.78%<\/td>/);
  assert.match(results, /<th scope="row">MUSE \(Parametric\)<\/th>\s*<td>54\.76%<\/td>\s*<td>42\.26%<\/td>/);
  const figure = await readFile(new URL('../dist/assets/images/results/evolution-trajectory.svg', import.meta.url), 'utf8');
  assert.match(figure, /<svg\b/);
});

test('compares rollout totals for all three gating strategies and links the paper chart', async () => {
  assert.match(html, /Always-on<\/span>[\s\S]*?<strong>31,208<\/strong>/);
  assert.match(html, /Random<\/span>[\s\S]*?<strong>21,960<\/strong>/);
  assert.match(html, /Metacognitive<\/span>[\s\S]*?<strong>22,112<\/strong>/);
  assert.match(html, /29\.15% fewer rollouts/);
  assert.match(html, /href="\/assets\/images\/results\/gating-rollouts-per-round\.svg"/);
  const figure = await readFile(new URL('../dist/assets/images/results/gating-rollouts-per-round.svg', import.meta.url), 'utf8');
  assert.match(figure, /<svg\b/);
});

test('publishes the original main and ablation tables and detailed gating figures', async () => {
  const assets = [
    'table-3-overall-adaptivity.png',
    'table-4-symbolic-components.png',
    'table-5-joint-adaptation.png',
    'table-6-supervision.png',
    'gating-best-observed-sr.svg',
    'metacognitive-gating-case-study.svg',
  ];
  assert.doesNotMatch(html, /href="#gating-analysis"/);
  assert.match(html, /<section id="gating-analysis"/);
  assert.equal((html.match(/<details name="results-ablations"/g) ?? []).length, 3);
  for (const asset of assets) {
    assert.ok(html.includes(`src="/assets/images/results/${asset}"`));
    const image = await readFile(new URL(`../dist/assets/images/results/${asset}`, import.meta.url));
    if (asset.endsWith('.png')) {
      assert.equal(image.readUInt32BE(16), 2772);
    } else {
      assert.match(image.toString('utf8'), /<svg\b/);
    }
  }
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
  assert.match(html, /API Update for a Coding Agent/);
  assert.match(html, /Policy Update for a Conversational Agent/);
  assert.match(html, /Tool Calls Break/);
  assert.match(html, /Task Resumes/);
  assert.match(html, /data-component-detail/);
  assert.equal(
    (html.match(/<[^>]+\sdata-scenario-control(?:\s|=|>)/g) ?? []).length,
    2,
  );
  assert.deepEqual(
    [...html.matchAll(/<li[^>]+data-example-node="([^"]+)"/g)].map((match) => match[1]),
    ['Γ', 'Δ', 'C', 'M', 'O', 'B', 'Γ', 'Δ', 'C', 'M', 'O', 'B'],
  );
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
  assert.deepEqual(
    [...html.matchAll(/data-agent-icon="([^"]+)"/g)].map((match) => match[1]),
    [
      'Experience.svg',
      'Tool.svg',
      'ModelWeight.svg',
      'CollaborativeNetwork.svg',
      'RetrieveTopk.svg',
      'Temperature.svg',
    ],
  );
  assert.equal((html.match(/\/assets\/images\/figures\/icons\//g) ?? []).length, 6);
  assert.equal((html.match(/data-agent-detail/g) ?? []).length, 6);
  assert.match(html, /accumulated interaction evidence/);
});

test('serves paper figures from the organized asset directory', () => {
  assert.match(html, /\/assets\/images\/figures\/Spectrum-2\.svg/);
  assert.match(html, /src="\/assets\/images\/figures\/spectrum-capability-requirements\.svg"/);
  assert.match(html, /src="\/assets\/images\/figures\/spectrum-representative-works\.svg"/);
  assert.match(html, /\/assets\/images\/figures\/architecture\.png/);
  assert.doesNotMatch(html, /(?:src|href)="\/images\//);
});

test('explains cumulative stage requirements and positions MUSE as a prototype', () => {
  assert.match(html, /optimization scope and coordination \(SC\)/);
  assert.match(html, /Each stage builds on the requirements of\s+earlier stages/);
  assert.match(html, /data-representative-landscape/);
  assert.match(html, /<strong>Figure 2\.<\/strong>/);
  assert.match(html, /MUSE is a prototype targeting Stage-4 capabilities/);
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
  assert.deepEqual(
    [...html.matchAll(/data-flow-link="([^"]+)"/g)].map((match) => match[1]),
    [
      'context-gating',
      'gating-supervision',
      'supervision-optimizer',
      'scope-optimizer',
      'optimizer-output',
      'objective-optimizer',
      'optimizer-boundary',
    ],
  );
  assert.equal((html.match(/architecture-flow-pulse/g) ?? []).length >= 7, true);
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
