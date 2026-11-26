import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
const data = JSON.parse(await readFile(new URL('../src/data/interactive-results.json', import.meta.url), 'utf8'));
const sources = JSON.parse(await readFile(new URL('../docs/interactive-results-provenance.json', import.meta.url), 'utf8'));

test('native Table 5 preserves every reported metric, including missing EvoGain', () => {
  assert.deepEqual(data.table.map(row => Object.values(row.metrics)), [
    [30.35, null, 30.35, 0, 20.66],
    [36.90, 6.55, 33.33, 1.97, 19.69],
    [44.64, 14.29, 44.04, 10.83, 18.83],
    [48.21, 17.86, 47.61, 12.91, 17.48],
    [54.76, 24.41, 51.19, 20.28, 15.20],
  ]);
});

test('round curves agree with independent manuscript peak and final metrics', () => {
  for (const curve of data.curves.oracle) {
    const row = data.table.find(row => row.id === curve.id);
    assert.equal(curve.values.length, 8);
    assert.equal(Math.max(...curve.values), row.metrics.best);
    assert.equal(curve.values.at(-1), row.metrics.final);
  }
  const synthetic = Object.fromEntries(data.curves.synthetic.map(s => [s.id, s.values]));
  assert.equal(Math.max(...synthetic.parametric), 54.76);
  assert.equal(synthetic.parametric.at(-1), 42.26);
  assert.equal(Math.max(...synthetic.joint), 52.38);
  assert.equal(synthetic.joint.at(-1), 51.78);
  assert.equal(synthetic.muse.indexOf(Math.max(...synthetic.muse)) + 1, 4);
  assert.equal(synthetic.muse.at(-1), 46.42);
  assert.equal(data.reference, 30.35);
  for (const source of sources) assert.match(source.sha256, /^[a-f0-9]{64}$/);
  for (const source of sources.slice(1)) assert.ok(source.maxRoundingResidual < .0001);
});

test('native experiment plots preserve independent published counts and gating totals', async () => {
  const charts = JSON.parse(await readFile(new URL('../src/data/experiment-charts.json', import.meta.url), 'utf8'));
  assert.deepEqual(charts.composition.map(s => s.counts.reduce((a,v)=>a+v,0)), [90,168,36]);
  assert.deepEqual(charts.composition[2].counts, [1,24,11]);
  assert.equal(charts.coverage[0].counts.filter(v=>v===0).length,4);
  assert.ok(charts.coverage[1].counts.every(v=>v>0));
  assert.deepEqual(charts.pool[0].values.map((v,i)=>v+charts.pool[1].values[i]),[3,9,13,17,24,28,30,36]);
  assert.equal(charts.pool[0].values.at(-1),26);
  assert.deepEqual(charts.rollouts.map(s=>s.values.reduce((a,v)=>a+v,0)),[31208,21960,22112]);
  charts.performance.forEach((s,j)=>{
    assert.deepEqual(s.x,charts.rollouts[j].values.map((_,i)=>charts.rollouts[j].values.slice(0,i+1).reduce((a,v)=>a+v,0)));
  });
  assert.deepEqual(charts.performance.map(s=>Math.max(...s.values)),[52.38,51.79,54.76]);
  assert.deepEqual(charts.performance.map(s=>s.values.at(-1)),[51.78,51.19,46.42]);
  assert.equal(charts.pairs.length,31);
  assert.deepEqual([0,1].map(i=>+(charts.pairs.reduce((a,p)=>a+p[i],0)/31).toFixed(3)),[.978,.334]);
});

test('native result tables agree with independently extracted trajectories and preserve missing values', async () => {
  const tables=JSON.parse(await readFile(new URL('../src/data/result-tables.json',import.meta.url),'utf8'));
  assert.equal(tables.overall.length,7);
  assert.deepEqual(tables.overall.at(-1).values,[54.76,24.41,16.91,-3.75]);
  assert.deepEqual(tables.overall[0].values,[30.35,null,20.66,null]);
  assert.equal(tables.symbolic.filter(r=>r.group==='27B').length,5);
  assert.equal(tables.symbolic.find(r=>r.name==='Tools'&&r.group==='9B').values[2],-2.64);
  for(const [name,id] of [['Always-on','joint'],['Metacognitive','muse']]) {
    const values=data.curves.synthetic.find(c=>c.id===id).values;
    const row=tables.gating.find(r=>r.name===name);
    assert.equal(row.values[0],Math.max(...values));
    assert.equal(row.values[1],values.at(-1));
  }
  const oracle=tables.supervision.filter(r=>r.group==='Joint · 100% oracle'&&r.name==='Oracle')[0];
  assert.deepEqual(oracle.values,Object.values(data.table.find(r=>r.id==='joint').metrics));
  assert.equal(new Set(tables.supervision.map(r=>r.group)).size,4);
  assert.equal(tables.reliability[0].values.at(-1),null);
  assert.equal(tables.gating[0].values.at(-1),null);
});

test('paper heatmaps preserve exact color levels, tied cells and missing entries', async () => {
 const heat=JSON.parse(await readFile(new URL('../src/data/result-table-shading.json',import.meta.url),'utf8'));
 assert.deepEqual(heat.overall.map(row=>row.map(c=>c?.level??null)),[
  [8,null,12,null],[12,12,6,6],[18,18,20,20],[24,24,20,20],[35,35,45,45],[45,45,35,35],[60,60,60,60]
 ]);
 assert.equal(heat.overall[6][0].background,'#c3d4e5');
 assert.equal(heat.overall[6][2].background,'#edd9c4');
 assert.equal(heat.overall[6][3].bold,true);
 assert.equal(heat.symbolic.length,10);
 assert.equal(heat.supervision.length,9);
 assert.equal(heat.joint.length,5);
 assert.equal(heat.reliability[0][3],null);
});

test('native tables retain publication configuration columns and row order', async () => {
 const t=JSON.parse(await readFile(new URL('../src/data/result-tables.json',import.meta.url),'utf8'));
 assert.deepEqual(t.overall.map(r=>r.name),['Base Model','Reflexion','MemP','ReasoningBank','SkillMentor','Vanilla GRPO','MUSE']);
 assert.deepEqual(t.overall.map(r=>r.attributes),[
  ['—','×','×'],['Symbolic','×','×'],['Symbolic','×','×'],['Symbolic','×','×'],['Symbolic','×','✓'],['Parametric','✓','×'],['Symbolic + parametric','✓','×']
 ]);
 assert.deepEqual(t.supervision.map(r=>r.attributes[0]),['×','✓','✓','✓','✓','✓','✓','✓','✓']);
 assert.deepEqual(t.quality.map(r=>r.attributes[0]),['39 / 40','36 / 36']);
 assert.deepEqual(t.reliability.map(r=>r.attributes[0]),['31 / 31','31 / 31']);
 assert.ok(t.gating.every(r=>r.attributes[0]==='MUSE'));
});
