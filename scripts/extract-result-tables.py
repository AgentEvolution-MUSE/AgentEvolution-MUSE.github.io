"""Extract the remaining published result tables from LaTeX, keeping missing values null."""
from pathlib import Path
import re,json,sys,hashlib
source=Path(sys.argv[1]);tex=source.read_text();repo=Path(__file__).resolve().parents[1]
def block(label):return tex.split('\\label{tab:'+label+'}')[1].split('\\end{table*}')[0]
def values(cells):
 out=[]
 for cell in cells:
  cell=re.sub(r'\\cellcolor\{[^}]+\}', '',cell)
  n=re.search(r'[+-]?\d[\d,]*(?:\.\d+)?',cell)
  out.append(float(n[0].replace(',','')) if n else None)
 return out
palette={name:[int(v) for v in rgb.split(',')] for name,rgb in re.findall(r'\\definecolor\{([^}]+)\}\{RGB\}\{([\d,]+)\}',tex)}
shading={}
raw_rows={}
def cell_style(cell):
 match=re.search(r'\\cellcolor\{([^!}]+)!(\d+)\}',cell)
 if not match:return None
 name,amount=match.groups();level=int(amount)
 rgb=[int(255+(v-255)*level/100+.5) for v in palette[name]]
 return dict(color=name,level=level,background='#'+''.join(f'{v:02x}' for v in rgb),bold=bool(re.search(r'\\(?:textbf|boldsymbol)\{',cell)))
def rows(label,pattern,skip):
 b=block(label);matches=list(re.finditer(pattern,b));out=[];shading[label]=[];raw_rows[label]=[]
 for m in matches:
  cells=b[m.start():].split(r'\\',1)[0].split('&');raw_rows[label].append(cells)
  out.append(values(cells[skip:]));shading[label].append([cell_style(c) for c in cells[skip:]])
 return out
out={}
nums=rows('overall_adaptivity',r'(?:Base Model|Reflexion|MemP|ReasoningBank|SkillMentor|Vanilla GRPO|\\textbf\{MUSE\})\s*&',4)
assert len(nums)==7 and all(len(r)==4 for r in nums)
labels=['Base Model','Reflexion','MemP','ReasoningBank','SkillMentor','Vanilla GRPO','MUSE']
config=['No refinement','Symbolic · executor fixed','Symbolic · executor fixed','Symbolic · executor fixed','Symbolic · auxiliary model updated','Parametric · executor updated','Symbolic + parametric · executor updated']
out['overall']=[dict(name=n,detail=d,values=v) for n,d,v in zip(labels,config,nums)]
nums=rows('symbolic_contribution',r'(?:Base Model|\$K_\{\\mathrm\{exp\}\}[^\n]*\$|\$T_\{\\mathrm\{tool\}\}\$)\s*&',1)
assert len(nums)==5 and all(len(r)==8 for r in nums)
labels=['Base Model','Experience','Tools','Experience + principles','Experience + principles + tools']
out['symbolic']=[dict(name=n,group=g,values=v[i:i+4]) for n,v in zip(labels,nums) for g,i in [('9B',0),('27B',4)]]
nums=rows('supplementary_supervision_effectiveness',r'Oracle(?: \+ Synthetic)?\s*&',2)
assert len(nums)==9 and all(len(r)==5 for r in nums)
groups=['Parametric · 100% oracle']*3+['Parametric · 25% oracle']*2+['Joint · 100% oracle']*2+['Joint · 25% oracle']*2
names=['Oracle','Oracle','Oracle + synthetic']+['Oracle','Oracle + synthetic']*3
out['supervision']=[dict(name=n,group=g,detail='Without prefix potential' if i==0 else 'With prefix potential',values=v) for i,(n,g,v) in enumerate(zip(names,groups,nums))]
for key,label,pattern,names,details in [
 ('quality','synthetic_task_quality',r'(?:Generated Candidates|Admitted Synthetic Tasks)\s*&',['Generated candidates','Admitted tasks'],['39 / 40 assessable','36 / 36 assessable']),
 ('reliability','synthetic_outcome_reward_reliability',r'(?:Guided Executions|Free Executions)\s*&',['Guided execution','Free execution'],['31 / 31 assessable','31 / 31 assessable'])]:
 nums=rows(label,pattern,2);assert len(nums)==2 and all(len(r)==4 for r in nums)
 out[key]=[dict(name=n,detail=d,values=v) for n,d,v in zip(names,details,nums)]
nums=rows('gating_effectiveness',r'(?:Always-on|Random|\\textbf\{Metacognitive\})\s*&',1)
assert len(nums)==3 and all(len(r)==5 for r in nums)
out['gating']=[dict(name=n,values=v) for n,v in zip(['Always-on','Random','Metacognitive'],nums)]
assert out['overall'][-1]['values']==[54.76,24.41,16.91,-3.75]
assert out['gating'][-1]['values']==[54.76,46.42,15.96,22112,29.15]
assert out['reliability'][0]['values'][-1] is None
joint=rows('unison_contribution',r'(?:Base Model|Vanilla GRPO|MUSE \(Symbolic\)|MUSE \(Parametric\)|MUSE \(Joint\))\s*&',3)
assert len(joint)==5 and all(len(r)==5 for r in joint)
styles={key:shading[label] for key,label in [('overall','overall_adaptivity'),('supervision','supplementary_supervision_effectiveness'),('quality','synthetic_task_quality'),('reliability','synthetic_outcome_reward_reliability'),('gating','gating_effectiveness'),('joint','unison_contribution')]}
styles['symbolic']=[v[i:i+4] for v in shading['symbolic_contribution'] for i in (0,4)]
# Retain every nonnumeric source column as explicit fields in the native tables.
for row,cells in zip(out['overall'],raw_rows['overall_adaptivity']):
 scope=cells[1]
 components='Symbolic + parametric' if r'\Theta' in scope and r'\Psi' in scope else 'Parametric' if r'\Theta' in scope else 'Symbolic' if r'\Psi' in scope else '—'
 row['attributes']=[components,'✓' if r'\checkmark' in cells[2] else '×','✓' if r'\checkmark' in cells[3] else '×']
for row,cells in zip(out['supervision'],raw_rows['supplementary_supervision_effectiveness']):
 row['attributes']=['✓' if r'\checkmark' in cells[1] else '×']
for key,label in [('quality','synthetic_task_quality'),('reliability','synthetic_outcome_reward_reliability')]:
 for row,cells in zip(out[key],raw_rows[label]):
  row['attributes']=[re.sub(r'\s+',' ',cells[1]).strip()]
for row in out['gating']:row['attributes']=['MUSE']
# Explicit corrections from the newer compiled paper; retain the original TeX provenance.
revision=json.loads((repo/'docs/paper-revision-corrections.json').read_text())
assert hashlib.sha256(source.read_bytes()).hexdigest()==revision['sourceTexSha256'], 'Review revision corrections before applying to a different manuscript.'
for fix in revision['corrections']:
 row=out[fix['table']][fix['row']]
 assert row['values'][fix['column']]==fix['previous']
 row['values'][fix['column']]=fix['value']
 styles[fix['table']][fix['row']][fix['column']]['bold']=fix['bold']
(repo/'src/data/result-table-shading.json').write_text(json.dumps(styles,indent=2)+'\n')
(repo/'src/data/result-tables.json').write_text(json.dumps(out,indent=2)+'\n')
(repo/'docs/result-tables-provenance.json').write_text(json.dumps({'source':'main.tex','revisionCorrections':'paper-revision-corrections.json','sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'tables':['overall_adaptivity','symbolic_contribution','supplementary_supervision_effectiveness','synthetic_task_quality','synthetic_outcome_reward_reliability','gating_effectiveness'],'shading':'Cell colors, white-mix percentages and bold emphasis extracted directly from LaTeX; includes unison_contribution.', 'method':'Direct extraction of numeric cells from LaTeX; null retains -- and N/A. Symbolic notation is expanded into component names.'},indent=2)+'\n')
print({k:len(v) for k,v in out.items()})
