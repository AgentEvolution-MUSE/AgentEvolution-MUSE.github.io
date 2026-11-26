import data from './experiment-charts.json';
export interface ChartSeries { name: string; color: string; values: number[]; counts?: number[]; size?: number; x?: number[]; }
export interface ChartConfig {
  title: string; kind: 'horizontal' | 'bars' | 'stacked' | 'paired' | 'steps';
  unit: string; labels: string[]; max: number; min?: number; ticks: number[];
  series: ChartSeries[]; picker: string; sync?: string;
}
const blue = '#4c7fa8', orange = '#bd804a', green = '#58917b', purple = '#9180ae';
const rounds = Array.from({length:8},(_,i)=>String(i+1));
export const experimentCharts: Record<string, ChartConfig> = {
  coverage: {title:'Application coverage',kind:'horizontal',unit:'Tasks (%)',labels:['Spotify','Phone','Venmo','FileSystem','SimpleNote','Splitwise','Gmail','Todoist','Amazon'],max:60,ticks:[0,20,40,60],picker:'Application',series:data.coverage.map((s,i)=>({...s,color:[blue,orange][i]}))},
  composition: {title:'Applications per task',kind:'bars',unit:'Tasks (%)',labels:['1 app','2 apps','≥3 apps'],max:80,ticks:[0,20,40,60,80],picker:'Composition',series:data.composition.map((s,i)=>({...s,color:[blue,green,orange][i]}))},
  matching: {title:'Guided versus free execution',kind:'paired',unit:'Mean outcome reward',labels:data.pairs.map((_,i)=>`Pair ${String(i+1).padStart(2,'0')}`),max:1,ticks:[0,.2,.4,.6,.8,1],picker:'Task pair',series:['Guided','Free'].map((name,i)=>({name,color:[blue,orange][i],values:data.pairs.map(p=>p[i])}))},
  pool: {title:'Task-pool adaptation',kind:'stacked',unit:'Tasks',labels:rounds,max:40,ticks:[0,10,20,30,40],picker:'Update',series:data.pool.map((s,i)=>({...s,color:[blue,purple][i]}))},
  rollouts: {title:'Exploration cost per round',kind:'bars',unit:'Exploration rollouts',labels:rounds,max:4500,ticks:[0,1000,2000,3000,4000],picker:'Round',sync:'gating',series:data.rollouts.map((s,i)=>({...s,color:[purple,green,blue][i]}))},
  performance: {title:'Performance versus exploration cost',kind:'steps',unit:'Success rate (%)',labels:rounds,min:28,max:58,ticks:[30,35,40,45,50,55],picker:'Round',sync:'gating',series:data.performance.map((s,i)=>({...s,color:[purple,green,blue][i]}))},
};
