export type Author = {
  name: string;
  affiliationIds: number[];
  corresponding?: boolean;
  href?: string;
};

export type Resource = {
  label: string;
  description: string;
  status: 'coming-soon' | 'available';
  href?: string;
};

export type EvolutionStrategyComponent = {
  symbol: string;
  math: string;
  name: string;
  description: string;
  example: string;
  accent: string;
};

export type Affiliation = {
  id: number;
  name: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
};

export const site = {
  name: 'MUSE',
  paperTitle: 'Metacognitive Unison Self-Evolution',
  description:
    'MUSE is a prototype targeting Stage-4 capabilities through metacognitive gating, interaction-grounded self-supervision, and coordinated component evolution.',
  organization: 'AgentEvolution-MUSE',
};

export const navigation = [
  { label: 'Overview', href: '#overview' },
  { label: 'Foundation', href: '#why-evolve' },
  { label: 'Spectrum', href: '#spectrum' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Results', href: '#results' },
  { label: 'Resources', href: '#resources' },
];

export const affiliations: Affiliation[] = [
  {
    id: 1,
    name: 'Shanghai Jiao Tong University',
    logo: '/assets/images/branding/institutions/sjtu.png',
    logoWidth: 4283,
    logoHeight: 1408,
  },
  {
    id: 2,
    name: 'National University of Singapore',
    logo: '/assets/images/branding/institutions/nus.png',
    logoWidth: 2315,
    logoHeight: 1061,
  },
  {
    id: 3,
    name: 'University of Oxford',
    logo: '/assets/images/branding/institutions/oxford.jpeg',
    logoWidth: 752,
    logoHeight: 228,
  },
  {
    id: 4,
    name: 'Shenzhen University',
    logo: '/assets/images/branding/institutions/szu.svg',
    logoWidth: 141.7323,
    logoHeight: 40.5354,
  },
];

export const authors: Author[] = [
  { name: 'Zongru Wu', href: 'https://zrw00.github.io', affiliationIds: [1, 2] },
  { name: 'Hongbo Qiu', href: 'https://scholar.google.com/citations?hl=zh-CN&user=BjryUhAAAAAJ', affiliationIds: [4] },
  { name: 'Yi Ren', href: 'https://joshua-ren.github.io', affiliationIds: [3] },
  { name: 'Bobo Li', href: 'https://www.libobo.site', affiliationIds: [2] },
  { name: 'Tianjie Ju', href: 'https://jometeorie.github.io', affiliationIds: [2, 1] },
  { name: 'Kelvin J. L. Koa', href: 'https://scholar.google.com/citations?user=0XSajFoAAAAJ&hl=en', affiliationIds: [2] },
  { name: 'Wynne Hsu', href: 'https://www.comp.nus.edu.sg/~whsu/', affiliationIds: [2] },
  { name: 'Mong Li Lee', href: 'https://www.comp.nus.edu.sg/~leeml/', affiliationIds: [2] },
  { name: 'Hao Fei', href: 'https://haofei.vip', affiliationIds: [3] },
  { name: 'Zhuosheng Zhang', href: 'https://bcmi.sjtu.edu.cn/home/zhangzs/', affiliationIds: [1], corresponding: true },
  { name: 'Gongshen Liu', href: 'https://www.cs.sjtu.edu.cn/jiaoshiml/liugongshen.html', affiliationIds: [1], corresponding: true },
  { name: 'Michael Wooldridge', href: 'https://www.cs.ox.ac.uk/people/michael.wooldridge/', affiliationIds: [3] },
  { name: 'Shengqiong Wu', href: 'https://sqwu.top', affiliationIds: [3], corresponding: true },
];

export const resources: Resource[] = [
  {
    label: 'Paper',
    description: 'Read the full paper.',
    status: 'coming-soon',
  },
  {
    label: 'Code',
    description: 'Explore the MUSE implementation.',
    status: 'available',
    href: 'https://github.com/AgentEvolution-MUSE/MUSE',
  },
  {
    label: 'Documentation',
    description: 'Follow setup and extension guides.',
    status: 'coming-soon',
  },
  {
    label: 'BibTeX',
    description: 'Cite MUSE in your research.',
    status: 'coming-soon',
  },
];

export const evolutionStrategy: EvolutionStrategyComponent[] = [
  {
    symbol: 'Δ',
    math: '\\Delta',
    name: 'Supervision Generator',
    description: 'Acquires external supervision or constructs it from interactions.',
    example:
      'Successful recovery interactions are converted into validated tasks, reference trajectories, and reward signals.',
    accent: 'green',
  },
  {
    symbol: 'C',
    math: '\\mathcal{C}',
    name: 'Optimization Scope',
    description: 'Defines which agent components are eligible for updates.',
    example:
      'The booking tool schema, relevant experience memory, and tool-use policy are eligible for adaptation, while unrelated capabilities remain unchanged.',
    accent: 'blue',
  },
  {
    symbol: 'M',
    math: '\\mathcal{M}',
    name: 'Evolutionary Optimizer',
    description: 'Refines selected components using the available supervision.',
    example:
      'Using validated supervision, the optimizer refines the selected symbolic assets and synchronizes them with the model policy.',
    accent: 'orange',
  },
  {
    symbol: 'Γ',
    math: '\\Gamma',
    name: 'Evolutionary Gating',
    description: 'Decides whether to evolve and which eligible components to update this round.',
    example:
      'Repeated workflow failures activate evolution and route adaptation to the booking-related components in the admissible scope.',
    accent: 'yellow',
  },
  {
    symbol: 'O',
    math: '\\mathcal{O}',
    name: 'Evolutionary Objective',
    description: 'Measures environmental fitness and directs evolutionary progress.',
    example:
      'The evolved agent must correctly reschedule the trip, notify every participant, and complete the changed workflow efficiently.',
    accent: 'coral',
  },
  {
    symbol: 'B',
    math: '\\mathcal{B}',
    name: 'Boundary Constraint',
    description: 'Specifies deployment requirements such as safety, alignment, and capability retention.',
    example:
      'Previously supported booking and notification tasks are replayed to reject updates that introduce regressions.',
    accent: 'blue',
  },
];
