// Stage assignments follow Figure 3 of the latest paper (MUSE_Arxiv.pdf).
export const spectrumStages = [
  { id: 1, title: 'Human-Engineered Maintenance', color: '#609bd6', tint: '#edf5ff',
    dimensions: ['Human-Controlled', 'Human-Specified', 'Externally Managed'],
    works: ['ELIZA', 'PARRY', 'SHRDLU', 'MYCIN', 'ALICE', 'XCON', 'INTERNIST-I'] },
  { id: 2, title: 'Interaction-Driven Accumulation', color: '#349d69', tint: '#effaf3',
    dimensions: ['Data-Reactive', 'Interaction-Derived', 'Persistent / Accumulative'],
    works: ['MemGPT', 'MemoryBank', 'Generative Agents', 'MemPrompt', 'ChatDB', 'Mem0', 'MemoryOS', 'AnnaAgent', 'A-Mem'] },
  { id: 3, title: 'Partial Self-Evolution', color: '#b28a19', tint: '#fff9e6',
    dimensions: ['Task / Feedback-Conditioned', 'Externally Provided / Internally Generated', 'Component-Specific'],
    works: ['Evo-Memory', 'AutoFlow', 'Puppeteer', 'Skill-SP', 'MA-Evolve', 'SPICE', 'AFLOW', 'SCA', 'ALMA', 'SkillProx', 'SIA', 'CoMAS', 'SELF', 'SAD', 'ADA', 'EvoAgent', 'Sophia', 'EvoTest', 'SCoRe', 'ScoreFlow', 'COVE', 'OpenSkill', 'Agent0', 'Voyager', 'MemEvolve', 'AgentEvolver', 'GiGPO', 'SIOP', 'AgentHPO', 'Creator', 'ToolGen', 'SkillMentor', 'HarnessBank', 'MetaSkill-Evolve', 'HyperAgents', 'SEES', 'ScholarEvolve'] },
  { id: 4, title: 'Metacognitive Self-Evolution', color: '#c8792e', tint: '#fff4e9',
    dimensions: ['Lifecycle Metacognitive Control', 'Interaction-Grounded Self-Supervised', 'Heterogeneous and Coordinated'],
    works: ['MUSE'] },
  { id: 5, title: 'Recursive Meta-Evolution', color: '#c96874', tint: '#fff0f2',
    dimensions: ['Strategy-Adaptive / Recursive', 'Meta-Evaluative', 'Agent + Evolutionary Strategy'],
    works: [], note: 'Future research: agents refine the evolutionary strategy itself.' },
];
export const spectrumDimensions = [
  ['EA', 'Evolutionary Autonomy'],
  ['SA', 'Supervision Autonomy'],
  ['SC', 'Optimization Scope and Coordination'],
];

// Primary optimization scopes use the font colors in the paper's Figure 3.
// Secondary scopes are not inferred from the primary classification.
export const workScopes: Record<string, string> = {};
for (const name of ['AFLOW', 'AutoFlow', 'Agent0', 'SPICE', 'MA-Evolve', 'EvoAgent', 'AgentEvolver', 'CoMAS', 'GiGPO', 'SCA', 'SCoRe', 'ScoreFlow', 'SELF', 'Puppeteer', 'SAD', 'SIA', 'COVE', 'SIOP', 'SEES', 'Skill-SP']) workScopes[name] = 'Parametric';
for (const name of ['ADA', 'AgentHPO']) workScopes[name] = 'Hyperparameters';
for (const stage of spectrumStages.filter(stage => stage.id === 2 || stage.id === 3)) {
  for (const name of stage.works) workScopes[name] ??= 'Symbolic';
}
export const scopeLabels = ['Parametric', 'Symbolic', 'Hyperparameters'];
