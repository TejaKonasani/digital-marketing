// 11 departments — names, mandates and boundaries preserved from the PRD (Section 6)
export const departments = [
  {
    id: 'CEO',
    prefix: 'CEO',
    name: 'CEO Office & Enterprise Strategy',
    short: 'CEO Office',
    positions: 6,
    mandate:
      'Translate human-approved strategy into coordinated enterprise priorities, KPI oversight, decisions, risks and milestones.',
    boundary: 'Strategy is human-approved; the office coordinates and tracks execution, it does not re-decide reserved matters.',
    lead: 'Arjun',
    leadRole: 'AI Chief Executive Officer',
    color: 'indigo',
    kpis: ['Strategy milestone completion', 'Decision turnaround time', 'KPI variance', 'Escalation volume']
  },
  {
    id: 'SAL',
    prefix: 'SAL',
    alias: 'SBD',
    name: 'Sales & Business Development',
    short: 'Sales & BD',
    positions: 13,
    mandate:
      'Research and qualify prospects, coordinate outreach and discovery, prepare proposals, track commercial status and hand over approved scope.',
    boundary: 'Prepares commercial records; contracts and pricing commitments remain human-authorised.',
    lead: 'Vikram',
    leadRole: 'AI Chief Growth Officer',
    color: 'amber',
    kpis: ['Qualified opportunities', 'Proposal conversion', 'Pipeline value', 'Discovery-to-proposal time']
  },
  {
    id: 'MKT',
    prefix: 'MKT',
    name: 'Samrudhi Brand & Marketing',
    short: 'Brand & Marketing',
    positions: 16,
    mandate:
      'Build Samrudhi itself through positioning, demand generation, owned-channel content, website, campaigns, partnerships and reputation.',
    boundary: 'MKT markets Samrudhi itself. PMG delivers paid media, SEO and growth services for Samrudhi clients.',
    lead: 'Prerna',
    leadRole: 'Head of Brand & Marketing Strategy',
    color: 'fuchsia',
    kpis: ['Inbound enquiries', 'Brand reach', 'Content pipeline health', 'Partner pipeline']
  },
  {
    id: 'CEX',
    prefix: 'CEX',
    name: 'Client Experience & Account Management',
    short: 'Client Experience',
    positions: 16,
    mandate:
      'Manage client onboarding, requirements, communications, approvals, support, complaints, health, renewal and expansion.',
    boundary:
      'CEX coordinates client communication and approval; a status update is not approval to publish or change scope.',
    lead: 'Mitra',
    leadRole: 'AI Chief Client Experience Officer',
    color: 'teal',
    kpis: ['Onboarding completion', 'Approval turnaround', 'CSAT / health score', 'Renewal rate']
  },
  {
    id: 'OPS',
    prefix: 'OPS',
    name: 'Operations & Delivery Management',
    short: 'Operations',
    positions: 18,
    mandate:
      'Plan delivery, allocate capacity, orchestrate tasks, manage dependencies, monitor blockers, coordinate rework and verify acceptance.',
    boundary: 'OPS coordinates delivery; TEC owns the technical platform/runtime supporting delivery.',
    lead: 'Daksh',
    leadRole: 'AI Chief Operating Officer',
    color: 'sky',
    kpis: ['On-time delivery', 'Blocker aging', 'Capacity utilisation', 'Rework rate']
  },
  {
    id: 'CRT',
    prefix: 'CRT',
    name: 'Creative, Content & Social Media',
    short: 'Creative & Content',
    positions: 22,
    mandate:
      'Research and create client healthcare content, copy, visuals, video, social assets and localised variants, then coordinate quality and publishing.',
    boundary: 'CRT creates content/assets; GOV independently evaluates quality, compliance and agent performance.',
    lead: 'Aarya',
    leadRole: 'AI Chief Creative Officer',
    color: 'rose',
    kpis: ['Content throughput', 'First-pass QA pass rate', 'Version churn', 'Publishing latency']
  },
  {
    id: 'PMG',
    prefix: 'PMG',
    name: 'Paid Media, SEO & Growth Marketing',
    short: 'Paid Media & SEO',
    positions: 20,
    mandate:
      'Deliver client paid media, SEO, conversion optimisation, measurement, experimentation and advertising policy/budget monitoring.',
    boundary: 'Budget changes beyond approved caps require human approval; spend monitoring is continuous.',
    lead: 'Tejas',
    leadRole: 'AI Head of Client Performance',
    color: 'orange',
    kpis: ['ROAS / CPA', 'Organic traffic growth', 'Experiment velocity', 'Budget variance']
  },
  {
    id: 'DAT',
    prefix: 'DAT',
    name: 'Analytics, Intelligence & Reporting',
    short: 'Analytics & Data',
    positions: 19,
    mandate:
      'Integrate, validate and reconcile data; govern KPIs; produce dashboards/reports, attribution, forecasts, anomaly signals and lineage.',
    boundary: 'DAT owns shared data/KPI governance. Department teams cannot silently redefine governed metrics.',
    lead: 'Medha',
    leadRole: 'AI Chief Data & Analytics Officer',
    color: 'violet',
    kpis: ['Data freshness', 'KPI coverage', 'Report on-time rate', 'Anomaly detection lead time']
  },
  {
    id: 'FIN',
    prefix: 'FIN',
    name: 'Finance & Administration',
    short: 'Finance & Admin',
    positions: 20,
    mandate:
      'Maintain financial control, billing, receivables, reconciliation, cash-flow views, budgeting, profitability, procurement and administration.',
    boundary: 'Finance agents prepare and reconcile records; actual payments remain human-authorised.',
    lead: 'Niti',
    leadRole: 'AI Chief Financial Officer',
    color: 'emerald',
    kpis: ['DSO', 'Invoice accuracy', 'Reconciliation coverage', 'Budget variance']
  },
  {
    id: 'TEC',
    prefix: 'TEC',
    name: 'Technology, MCP & AgentOps',
    short: 'Technology & AgentOps',
    positions: 24,
    mandate:
      'Operate architecture, agent runtime, MCP/connectors, identity, permissions, context/memory, routing, observability, testing and recovery.',
    boundary: 'Owns the runtime and connectors; does not own business content decisions.',
    lead: 'Sutra',
    leadRole: 'AI Chief Technology Officer',
    color: 'cyan',
    kpis: ['Runtime availability', 'Connector health', 'Run success rate', 'Incident MTTR']
  },
  {
    id: 'GOV',
    prefix: 'GOV',
    name: 'Independent Assurance, Compliance & Agent Performance',
    short: 'Assurance & Compliance',
    positions: 20,
    mandate:
      'Independently evaluate outputs, competency, compliance, privacy, audit evidence, incidents, corrective actions and governance reporting.',
    boundary:
      'Assurance reports independently to the designated human governance authority for material findings. A producing role cannot be the sole evaluator of its output.',
    lead: 'Satya',
    leadRole: 'AI Chief Assurance Officer',
    color: 'slate',
    kpis: ['Findings closed on time', 'Audit coverage', 'CAPA effectiveness', 'Compliance exceptions']
  }
]

export const totalPositions = departments.reduce((s, d) => s + d.positions, 0) // 194

export const deptById = (id) => {
  if (!id) return null
  const clean = String(id).toUpperCase().trim()
  if (clean === 'SBD') return departments.find((d) => d.id === 'SAL')
  return departments.find(
    (d) => d.id.toUpperCase() === clean || d.prefix.toUpperCase() === clean || d.short.toUpperCase() === clean || (d.alias && d.alias.toUpperCase() === clean)
  ) || null
}