import assert from 'node:assert/strict';
import test from 'node:test';

import {
  affiliations,
  authors,
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
