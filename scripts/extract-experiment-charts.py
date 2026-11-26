"""Rebuild six native chart datasets from the published vector PDFs.
Usage: PYTHONPATH=/tmp/muse-pdf-libs python3 scripts/extract-experiment-charts.py /path/to/MUSE_Arxiv
Drawing indices are tied to the recorded source hashes; assertions guard geometry and reported totals.
"""
from pathlib import Path
import sys, json, hashlib
import fitz
source = Path(sys.argv[1]) / 'figs/experiments'
repo = Path(__file__).resolve().parents[1]
provenance = []
def drawings(name):
    path = source / (name + '.pdf')
    page = fitz.open(path)[0]
    provenance.append({'file': 'figs/experiments/' + path.name, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest()})
    return page.get_drawings()
def grid(ds):
    return sorted({round(d['rect'].y0, 6) for d in ds if len(d['items']) == 1 and d['items'][0][0] == 'l' and d['rect'].width > 250 and d['rect'].height < .001 and d['color'] and min(d['color']) > .85}, reverse=True)
def integer(v):
    assert abs(v-round(v)) < .005, v
    return round(v)
def rects(ds, start, n):
    return [d['rect'] for d in ds[start:start+n]]
d = drawings('synthetic_task_coverage')
scale = (d[8]['rect'].x0-d[2]['rect'].x0)/60
coverage = []
for start, name, size in [(12,'Oracle · 90 tasks',90),(21,'Synthetic · 36 tasks',36)]:
    counts = [integer(r.width / scale * size / 100) for r in rects(d,start,9)]
    coverage.append({'name':name,'size':size,'counts':counts,'values':[round(c/size*100,6) for c in counts]})
assert coverage[0]['counts'] == [48,30,21,15,12,0,0,0,0]
d = drawings('synthetic_application_composition'); g=grid(d); scale=(g[0]-g[-1])/80
composition=[]
for start,name,size in [(17,'Oracle · 90 tasks',90),(20,'Test · 168 tasks',168),(23,'Synthetic · 36 tasks',36)]:
    counts=[integer(r.height/scale*size/100) for r in rects(d,start,3)]
    assert sum(counts)==size
    composition.append({'name':name,'size':size,'counts':counts,'values':[round(c/size*100,6) for c in counts]})
assert composition[2]['counts']==[1,24,11]
d=drawings('synthetic_task_pool_adaptation'); g=grid(d); scale=(g[0]-g[-1])/40
pool=[{'name':name,'values':[integer(r.height/scale) for r in rects(d,start,8)]} for start,name in [(22,'Active'),(30,'Retired')]]
assert [sum(v) for v in zip(*[s['values'] for s in pool])] == [3,9,13,17,24,28,30,36]
assert pool[0]['values'][-1]==26
d=drawings('synthetic_capability_matching'); g=grid(d); scale=g[0]-g[-1]
pairs=[]
for line in d[16:47]:
    assert len(line['items'])==1 and line['items'][0][0]=='l'
    _,a,b=line['items'][0]
    pairs.append([round((g[0]-a.y)/scale,6),round((g[0]-b.y)/scale,6)])
assert len(pairs)==31 and all(0<=v<=1 for p in pairs for v in p)
means=[sum(p[i] for p in pairs)/31 for i in [0,1]]
assert [round(v,3) for v in means]==[.978,.334]
d=drawings('gating_rollouts_per_round'); g=grid(d); scale=(g[0]-g[-1])/4000
rollouts=[{'name':name,'values':[integer(r.height/scale) for r in rects(d,start,8)]} for start,name in [(22,'Always-on'),(30,'Random'),(38,'Metacognitive')]]
assert [sum(s['values']) for s in rollouts]==[31208,21960,22112]
d=drawings('gating_best_observed_sr'); g=grid(d); scale=(g[0]-g[-1])/25
performance=[]
for start,name in [(27,'Always-on'),(35,'Random'),(43,'Metacognitive')]:
    values=[]; cumulative=[]
    for r in rects(d,start,8):
        raw=30+(g[0]-(r.y0+r.y1)/2)/scale
        assert abs(raw-round(raw,2)) < .00002
        values.append(round(raw,2))
        cumulative.append(integer(((r.x0+r.x1)/2-d[2]['rect'].x0)/(d[3]['rect'].x0-d[2]['rect'].x0)*5000))
    costs=next(s['values'] for s in rollouts if s['name']==name)
    assert cumulative==[sum(costs[:i+1]) for i in range(8)]
    performance.append({'name':name,'values':values,'x':cumulative})
assert [max(s['values']) for s in performance]==[52.38,51.79,54.76]
assert performance[2]['values']==json.loads((repo/'src/data/interactive-results.json').read_text())['curves']['synthetic'][2]['values']
result=dict(coverage=coverage,composition=composition,pool=pool,pairs=pairs,means=means,rollouts=rollouts,performance=performance)
(repo/'src/data/experiment-charts.json').write_text(json.dumps(result,indent=2)+'\n')
(repo/'docs/experiment-charts-provenance.json').write_text(json.dumps(provenance,indent=2)+'\n')
print(json.dumps(result,indent=2))
