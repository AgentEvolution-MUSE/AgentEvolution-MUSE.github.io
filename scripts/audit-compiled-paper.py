"""Audit all seven experimental tables and the prefix case against the compiled PDF.
Usage: python3 scripts/audit-compiled-paper.py /path/to/MUSE_Arxiv-3.pdf
Requires PyMuPDF. Coordinates are guarded by the reviewed PDF SHA-256.
"""
import fitz,json,re,pathlib,sys,hashlib
repo=pathlib.Path(__file__).resolve().parents[1]
revision=json.loads((repo/'docs/paper-revision-corrections.json').read_text())
path=pathlib.Path(sys.argv[1])
accepted_hashes={revision['sha256'], *(item['sha256'] for item in revision.get('verifiedEquivalentPapers', []))}
assert hashlib.sha256(path.read_bytes()).hexdigest() in accepted_hashes, 'Review page coordinates for a new paper revision.'
pdf=fitz.open(path)
tables=json.loads((repo/'src/data/result-tables.json').read_text()); joint=json.loads((repo/'src/data/interactive-results.json').read_text())
heat=json.loads((repo/'src/data/result-table-shading.json').read_text())
specs=[('overall',27,[164.3,187.3,197.7,208.2,218.6,229.1,251.9],330),('symbolic',28,[154.2,178.1,189.1,213,223.9],180),('joint',28,[341.5,365.4,376.4,387.3,411.2],295),('supervision',30,[178.1,189.1,200,224,234.8,258.8,269.8,293.7,304.6],200),('quality',30,[420.2,431.2],250),('reliability',30,[581.6,592.5],250),('gating',32,[177.9,189.5,201],220)]
errors=[];checked=0;bold_errors=[]
for name,page,ys,minx in specs:
 rows=[[v for v in r['metrics'].values()] for r in joint['table']] if name=='joint' else [r['values'] for r in tables[name]]
 hs=heat[name]
 if name=='symbolic':rows=[rows[i]+rows[i+1] for i in range(0,10,2)];hs=[hs[i]+hs[i+1] for i in range(0,10,2)]
 for ri,y in enumerate(ys):
  spans=[dict(text=''.join(s['text'] for s in l['spans']),bbox=l['bbox'],font=' '.join(s['font'] for s in l['spans'])) for b in pdf[page].get_text('dict')['blocks'] for l in b.get('lines',[]) if abs(l['bbox'][1]-y)<1.2 and l['bbox'][0]>minx]
  spans=sorted([s for s in spans if re.fullmatch(r'[+−-]?\d[\d,.]*%?|–|N/A',s['text'])],key=lambda s:s['bbox'][0])
  vals=[None if s['text'] in ['–','N/A'] else float(s['text'].replace(',','').replace('%','').replace('−','-')) for s in spans]
  assert len(vals)==len(rows[ri]),(name,ri,vals,rows[ri])
  for ci,(p,w) in enumerate(zip(vals,rows[ri])):
   checked+=1
   if p!=w:errors.append(dict(table=name,row=ri,column=ci,paper=p,web=w,page=page+1))
   bold=any(font in spans[ci]['font'] for font in ['Medi','CMBX','CMMIB'])
   if hs[ri][ci] and bold!=hs[ri][ci]['bold']:bold_errors.append((name,ri,ci,bold,hs[ri][ci]['bold']))
print(json.dumps(dict(checked=checked,valueDifferences=errors,boldDifferences=bold_errors),indent=2))
# Independent prefix table extraction from compiled PDF.
text=pdf[88].get_text().split('(iii) Continual Task-Pool')[0]
values=[float(v.replace('−','-')) for v in re.findall(r'[+−-]?\d+\.\d{3}\b',text)]
source=(repo/'src/data/case-studies.ts').read_text().split('export const prefix:')[1].split('export const experience:')[0]
web=[.361]+[float(x) for pair in re.findall(r'potential:([.\d]+),reward:([.\d-]+)',source) for x in pair]
assert values==web,(values,web)
print('Prefix table: all 31 numeric entries match latest PDF')

assert not errors and not bold_errors, 'Compiled paper and website differ; see details above.'
