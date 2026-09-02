import assert from 'node:assert/strict';
import test from 'node:test';

import {
  affiliations,
  authors,
  evolutionStrategy,
  lifecycleStages,
  mechanisms,
  resources,
  site,
  stageComparisons,
} from '../src/data/site.ts';

test('publishes the finalized paper metadata', () => {
  assert.equal(site.name, 'MUSE');
  assert.equal(site.paperTitle, 'Metacognitive Unison Self-Evolution');
  assert.equal(authors.length, 12);
  assert.equal(affiliations.length, 4);
  assert.deepEqual(
    authors.map((author) => [author.name, author.affiliationIds]),
    [
      ['Zongru Wu', [1, 2]],
      ['Hongbo Qiu', [4]],
      ['Bobo Li', [2]],
      ['Hao Fei', [3]],
      ['Tianjie Ju', [2]],
      ['Kelvin J. L. Koa', [2]],
      ['Wynne Hsu', [2]],
      ['Mong Li Lee', [2]],
      ['Zhuosheng Zhang', [1]],
      ['Gongshen Liu', [1]],
      ['Michael Wooldridge', [3]],
      ['Shengqiong Wu', [3]],
    ],
  );
  assert.deepEqual(
    authors.filter((author) => author.corresponding).map((author) => author.name),
    ['Zhuosheng Zhang', 'Gongshen Liu', 'Shengqiong Wu'],
  );
});

test('defines institution logos in publication order', () => {
  assert.deepEqual(
    affiliations.map(({ name, logo }) => [name, logo]),
    [
      ['Shanghai Jiao Tong University', '/assets/images/branding/institutions/sjtu.png'],
      ['National University of Singapore', '/assets/images/branding/institutions/nus.png'],
      ['University of Oxford', '/assets/images/branding/institutions/oxford.jpeg'],
      ['Shenzhen University', '/assets/images/branding/institutions/szu.svg'],
    ],
  );
});

test('keeps unpublished resources non-navigable', () => {
  assert.equal(resources.length, 4);
  for (const resource of resources) {
    assert.equal(resource.status, 'coming-soon');
    assert.equal(resource.href, undefined);
  }
});

test('defines the complete method narrative', () => {
  assert.equal(stageComparisons.length, 3);
  assert.equal(mechanisms.length, 3);
  assert.deepEqual(lifecycleStages, [
    'Monitor',
    'Diagnose',
    'Generate',
    'Coordinate',
    'Evaluate',
  ]);
});

test('defines paper-aligned math and one coherent example across the six-tuple', () => {
  assert.deepEqual(
    evolutionStrategy.map(({ symbol, math }) => [symbol, math]),
    [
      ['Δ', '\\Delta'],
      ['C', '\\mathcal{C}'],
      ['M', '\\mathcal{M}'],
      ['Γ', '\\Gamma'],
      ['O', '\\mathcal{O}'],
      ['B', '\\mathcal{B}'],
    ],
  );
  assert.equal(evolutionStrategy.length, 6);
  const exampleEvidence = [
    /validated tasks/,
    /eligible for adaptation/,
    /synchronizes them with the model policy/,
    /activate evolution/,
    /reschedule the trip/,
    /replayed to reject updates/,
  ];
  evolutionStrategy.forEach((component, index) => {
    assert.match(component.example, exampleEvidence[index]);
  });
});
