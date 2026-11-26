import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');

test('builds the MUSE document metadata and landmarks', () => {
  assert.match(html, /<title>MUSE \| Metacognitive Unison Self-Evolution<\/title>/);
  assert.match(html, /<meta name="description" content="[^"]+"/);
  assert.match(
    html,
    /<link rel="icon" type="image\/png" sizes="32x32" href="\/favicon-32-v2\.png"/,
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
    'A Unified Formalization of Agent Evolution',
    'System Architecture',
    'Experimental Results',
    'Resources',
  ]) {
    assert.match(html, new RegExp(heading));
  }
  assert.match(html, /The Five-Stage Evolutionary Spectrum/);
  assert.match(html, /Representative Works/);
  assert.match(html, /data-architecture-map/);
});

test('organizes the results around the five paper research questions in order', () => {
  const ids = [...html.matchAll(/<section id="(rq[1-5])"/g)].map(match => match[1]);
  assert.deepEqual(ids, ['rq1', 'rq2', 'rq3', 'rq4', 'rq5']);
  const evidence = {
    rq1: ['data-result-overview="overall"', 'data-result-table="overall"', '24.41'],
    rq2: ['data-result-table="symbolic"', 'data-joint-comparison', 'data-joint-chart'],
    rq3: ['data-supervision-overview', 'data-result-table="supervision"', 'data-result-table="quality"', 'data-result-table="reliability"', '28.57'],
    rq4: ['data-result-table="gating"', 'data-native-chart="rollouts"', 'data-native-chart="performance"', '29.15'],
    rq5: ['data-evolution-curves', 'Oracle + synthetic tasks', '42.26'],
  };
  for (const [id, values] of Object.entries(evidence)) {
    assert.ok(html.includes(`href="#${id}"`));
    const section = html.split(`<section id="${id}"`)[1].split('</section>')[0];
    for (const value of values) assert.ok(section.includes(value), `${id} is missing ${value}`);
  }
  assert.match(html, /class="rq-tradeoff"/);
  assert.match(html, /Human audit · One complete MUSE run/);
});

test('explains four cases through native interactive execution records', () => {
  for (const id of ['case-supervision', 'case-prefix', 'case-experience', 'case-tool']) {
    assert.ok(html.includes(`id="${id}"`));
  }
  for (const trace of ['guided', 'free', 'prefix', 'experience', 'tool']) {
    assert.ok(html.includes(`data-case-trace="${trace}"`));
  }
  for (const value of ['26.25', '22.00', '0.750', '0.833', '0.53125', '0.84375']) assert.ok(html.includes(value));
  for (const [trace, count] of [['guided',15],['free',24],['prefix',15],['experience',9],['tool',7]]) {
    for (let step=1;step<=count;step++) assert.ok(html.includes(`data-node="${trace}-${step}"`));
  }
  assert.doesNotMatch(html, /data-trace-panel|data-context-panel|trace-pagination/);
  assert.ok(html.includes('Partial execution'));
  assert.ok(html.includes('Candidate principle'));
  assert.doesNotMatch(html, /Evolution in action|Appendix D|rq-case-finding/);
});

test('ships vector evidence inline without redundant image-page links', async () => {
  const assets = JSON.parse(await readFile(new URL('../src/data/result-assets.json', import.meta.url), 'utf8'));
  for (const [asset, size] of Object.entries(assets)) {
    assert.ok(size.every(value => value > 0));
    const interactiveAssets = ['table-3-overall-adaptivity.svg', 'table-4-symbolic-components.svg', 'table-6-supervision.svg', 'table-7-task-quality.svg', 'table-8-reward-reliability.svg', 'table-9-gating.svg', 'table-5-joint-adaptation.svg', 'continuous-evolution-oracle.svg', 'continuous-evolution-synthetic.svg', 'synthetic-task-coverage.svg', 'synthetic-application-composition.svg', 'synthetic-capability-matching.svg', 'synthetic-task-pool-adaptation.svg', 'gating-rollouts-per-round.svg', 'gating-best-observed-sr.svg', 'synthetic-task-case-study.svg', 'exp-principle-case-study.svg', 'tool-invocation-case-study.svg', 'table-30-prefix-potential.svg'];
    if (!interactiveAssets.includes(asset)) assert.ok(html.includes(`src="/assets/images/results/${asset}"`));
    assert.ok(!html.includes(`href="/assets/images/results/${asset}"`));
    const svg = await readFile(new URL(`../dist/assets/images/results/${asset}`, import.meta.url), 'utf8');
    assert.match(svg, /<svg\b/);
  }
});

test('retains the floating index and limits in-page enlargement to complex figures', () => {
  assert.match(html, /class="section-rail-research"/);
  assert.equal((html.match(/<button[^>]*data-enlarge-figure/g) ?? []).length, 1);
  assert.doesNotMatch(html, /View full size/);
  assert.match(html, /<dialog[^>]*aria-labelledby="result-lightbox-title"/);
});

test('replaces the abstract with the six-component evolution formulation', () => {
  assert.match(html, /data-evolution-formulation/);
  assert.deepEqual(
    [...html.matchAll(/data-evolution-component="([^"]+)"/g)].map((match) => match[1]),
    ['Δ', 'C', 'M', 'Γ', 'O', 'B'],
  );
  assert.doesNotMatch(html, /data-formulation-equation/);
  assert.doesNotMatch(html, /data-evolution-process/);
  assert.doesNotMatch(html, /One Evolution Round/);
  assert.doesNotMatch(html, /Continuous Evolutionary Trajectory/);
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
  assert.equal((html.match(/data-motion-group=/g) ?? []).length, 4);
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

test('combines stage capabilities and representative works without image-page links', () => {
  assert.match(html, /data-spectrum-explorer/);
  assert.equal((html.match(/data-stage-tab="/g) ?? []).length, 5);
  assert.equal((html.match(/data-stage-panel="/g) ?? []).length, 5);
  assert.match(html, /optimization scope and coordination \(SC\)/);
  assert.match(html, /Each stage builds on the requirements of earlier stages/);
  assert.match(html, /MUSE is a prototype targeting Stage-4 capabilities/);
  assert.doesNotMatch(html, /<a[^>]+href="[^" ]+\.(?:svg|png|jpg)"/);
  assert.doesNotMatch(html, /architecture-paper-figure|View paper figure/);
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
  assert.doesNotMatch(html, /Technical architecture|citation-title|Copy BibTeX/);
  assert.doesNotMatch(html, /class="architecture-figure/);
  assert.doesNotMatch(html, /data-architecture-stage=/);
});

test('shows affiliations as text without a duplicate institution logo band', () => {
  assert.match(html, /<ol class="affiliations" aria-label="Author affiliations">/);
  assert.doesNotMatch(html, /data-institution-logo=|class="institution-band"/);
});

test('renders stable repeated structures and truthful resource states', () => {
  assert.doesNotMatch(html, /data-stage-comparison|From Stage 3 to Stage 4/);
  assert.doesNotMatch(html, /id="method"|href="#method"|data-method-system|Three Mechanisms for Stage-4 Evolution/);
  assert.match(html, /href="#architecture">Explore the architecture/);
  assert.doesNotMatch(html, /href=""/);
  assert.match(html, /Coming Soon/);
  assert.doesNotMatch(html, /<footer/);
});

test('keeps complete result fields visible without metric ranking',()=>{
 assert.doesNotMatch(html,/Rank by|data-table-metric|data-rank-metric|data-table-group/);
 for(const label of ['Executor update','Auxiliary update','Prefix potential','Assessable / Total'])assert.ok(html.includes(label));
 assert.match(html,/<th scope="colgroup" colspan="4">Qwen3.5-9B/);
 assert.match(html,/<th scope="colgroup" colspan="4">Qwen3.5-27B/);
});
