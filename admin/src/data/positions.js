import { departments, deptById } from './departments'
import { deptTitles } from './positionTitles'

// Deterministic per-department authority distribution (PRD Section 2.1 autonomy classes).
// Most roles are B (draft/recommend) or C (internal action); D (external side effect)
// is limited to publishing/spend roles; E (reserved human) appears on finance payment and
// clinical sign-off roles.
const authorityByDept = {
  CEO: { A: 2, B: 3, C: 1 },
  SAL: { A: 4, B: 6, C: 2, D: 1 },
  SBD: { A: 4, B: 6, C: 2, D: 1 },
  MKT: { A: 4, B: 7, C: 3, D: 2 },
  CEX: { A: 4, B: 5, C: 6, D: 1 },
  OPS: { A: 3, B: 4, C: 11 },
  CRT: { A: 3, B: 12, C: 6, D: 1 },
  PMG: { A: 4, B: 8, C: 4, D: 4 },
  DAT: { A: 10, B: 7, C: 2 },
  FIN: { A: 6, B: 8, C: 5, D: 0, E: 1 },
  TEC: { A: 4, B: 4, C: 14, D: 2 },
  GOV: { A: 10, B: 6, C: 4 }
}

export const authorityLabel = {
  A: 'Level 1 — Read / Analyse',
  B: 'Level 2 — Draft / Recommend',
  C: 'Level 3 — Internal Action',
  D: 'Level 4 — External Side Effect',
  E: 'Level 5 — Reserved Human Decision'
}

// Exactly 5 idle (2.6%), 9 error (4.6%), 18 needs_review (9.3%), 162 active (83.5%) = 194 total positions
const IDLE_POSITIONS = new Set(['SAL-009', 'SBD-009', 'OPS-012', 'CRT-018', 'FIN-016', 'TEC-020'])
const ERROR_POSITIONS = new Set(['CEO-004', 'CEX-009', 'CRT-015', 'PMG-014', 'DAT-012', 'FIN-012', 'TEC-014', 'GOV-016', 'OPS-009'])
const NEEDS_REVIEW_POSITIONS = new Set([
  'CEO-002', 'SAL-007', 'SBD-007', 'MKT-010', 'MKT-014', 'CEX-007', 'OPS-006',
  'CRT-006', 'CRT-011', 'PMG-008', 'PMG-018', 'DAT-007', 'DAT-016',
  'FIN-006', 'FIN-019', 'TEC-008', 'TEC-022', 'GOV-004', 'GOV-012'
])

// Deterministic pseudo-random (stable across renders)
function seeded(seed) {
  let s = seed
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648
    return s / 2147483648
  }
}

function buildPositions() {
  const positions = []
  let samAg = 1
  for (const dept of departments) {
    const titles = deptTitles[dept.id]
    const dist = authorityByDept[dept.id]
    // Expand distribution into an ordered list
    const authList = []
    for (const [cls, count] of Object.entries(dist)) for (let i = 0; i < count; i++) authList.push(cls)
    // Shuffle deterministically so authority is spread, but keep lead at index 0 sensible
    const rand = seeded(dept.id.length * 7919 + dept.positions * 31)
    for (let i = authList.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1))
      ;[authList[i], authList[j]] = [authList[j], authList[i]]
    }
    titles.forEach((title, idx) => {
      const posNum = idx + 1
      const positionId = `${dept.prefix}-${String(posNum).padStart(3, '0')}`
      const samAgId = `SAM-AG-${String(samAg).padStart(3, '0')}`
      
      // MKT-009 is Social (Brand) Media Manager with Level 1 — Read / Analyse
      let authority = idx === 0 ? (dist.D ? 'C' : 'C') : authList[idx]
      if (positionId === 'MKT-009') {
        authority = 'A'
      }

      const isLead = idx === 0
      // Evaluator: assurance (GOV) evaluates producing roles; within GOV, the lead evaluates
      const evaluator =
        dept.id === 'GOV'
          ? 'GOV-001 (Assurance Lead)'
          : dept.id === 'TEC'
            ? 'GOV-010 (Agent Performance & Drift Monitor)'
            : 'GOV-002 (Output Quality & Competency Evaluator)'

      let status = 'active'
      if (IDLE_POSITIONS.has(positionId)) {
        status = 'idle'
      } else if (ERROR_POSITIONS.has(positionId)) {
        status = 'error'
      } else if (NEEDS_REVIEW_POSITIONS.has(positionId)) {
        status = 'needs_review'
      }

      // Active projects count
      let activeProjectsCount = 0
      if (positionId === 'MKT-009') {
        activeProjectsCount = 3
      } else if (status === 'active') {
        activeProjectsCount = isLead ? 3 : ((idx % 2) + 1)
      } else if (status === 'needs_review') {
        activeProjectsCount = 1
      }

      // Pilot roles specification
      const PILOT_SAM_AG_IDS = new Set([
        'SAM-AG-001', 'SAM-AG-002', 'SAM-AG-003', 'SAM-AG-004', 'SAM-AG-007', 'SAM-AG-009', 'SAM-AG-010',
        'SAM-AG-050', 'SAM-AG-059', 'SAM-AG-076', 'SAM-AG-077', 'SAM-AG-080', 'SAM-AG-081', 'SAM-AG-082',
        'SAM-AG-083', 'SAM-AG-084', 'SAM-AG-094', 'SAM-AG-125', 'SAM-AG-146', 'SAM-AG-158', 'SAM-AG-162',
        'SAM-AG-166', 'SAM-AG-183', 'SAM-AG-186'
      ])
      const isPilotRole = PILOT_SAM_AG_IDS.has(samAgId)

      positions.push({
        samAgId,
        positionId,
        deptId: dept.id,
        title: title.t,
        isActive: isPilotRole || isLead,
        assignedAgentId: samAgId,
        fulfillmentType: isPilotRole ? 'AGENT' : (isLead ? 'AGENT' : 'UNASSIGNED'),
        runtimeStatus: isPilotRole ? 'AVAILABLE' : (isLead ? 'AVAILABLE' : 'DISABLED'),
        person: title.n || null,
        note: title.note || null,
        isLead,
        authority,
        authorityLabel: authorityLabel[authority],
        evaluator,
        purpose: purposeFor(dept, title, isLead),
        input: inputFor(dept, title),
        output: outputFor(dept, title),
        dependencies: depsFor(dept, idx),
        tools: toolsFor(dept, authority),
        status,
        activeProjectsCount,
        version: isLead ? '2.1' : '1.0',
        lastRun: lastRunFor(rand)
      })
      samAg++
    })
  }
  return positions
}

function purposeFor(dept, title, isLead) {
  if (isLead) return `Owns the ${dept.short} mandate: ${dept.mandate}`
  const t = title.t.toLowerCase()
  if (t.includes('analyst') || t.includes('monitor') || t.includes('intelligence'))
    return `Analyses and reports on ${dept.short} signals with sourced evidence, caveats and freshness metadata.`
  if (t.includes('coordinator') || t.includes('manager') || t.includes('orchestrat') || t.includes('planner'))
    return `Coordinates and orchestrates ${dept.short} work: routing, dependencies, timelines and handoffs.`
  if (t.includes('specialist') || t.includes('writer') || t.includes('designer') || t.includes('producer'))
    return `Produces ${dept.short} deliverables to the versioned output contract, with evidence and warnings.`
  return `Executes ${dept.short} responsibilities within its authority class, with structured output and audit trail.`
}

function inputFor(dept, title) {
  const t = title.t.toLowerCase()
  if (t.includes('research')) return 'Brief (versioned), authorised sources, client scope'
  if (t.includes('copy') || t.includes('writer') || t.includes('caption'))
    return 'Approved strategy, brief, research findings, brand kit'
  if (t.includes('design') || t.includes('visual') || t.includes('creative'))
    return 'Approved copy version, brand kit, asset requirements'
  if (t.includes('qa') || t.includes('evaluat') || t.includes('compliance') || t.includes('review'))
    return 'Draft artefact + version, sources, platform rules, versioned rubric'
  if (t.includes('publish') || t.includes('scheduler') || t.includes('activation'))
    return 'Approved version, authorised connector, approval record'
  if (t.includes('report') || t.includes('dashboard') || t.includes('insight'))
    return 'Authorised data feeds, KPI definitions, period, freshness rules'
  if (t.includes('onboard') || t.includes('intake') || t.includes('brief'))
    return 'Client request, discovery record, approved scope reference'
  if (t.includes('invoice') || t.includes('billing') || t.includes('receivable'))
    return 'Accepted work, approved scope, transaction evidence'
  if (t.includes('connector') || t.includes('runtime') || t.includes('engineer'))
    return 'Role config, schemas, tool allow-list, runtime events'
  return 'Assigned task context, upstream validated outputs, client workspace scope'
}

function outputFor(dept, title) {
  const t = title.t.toLowerCase()
  if (t.includes('research')) return 'Source-backed findings with citations, dates and uncertainty'
  if (t.includes('copy') || t.includes('writer') || t.includes('caption'))
    return 'Versioned copy draft with CTA, source notes and claims flags'
  if (t.includes('design') || t.includes('visual') || t.includes('creative'))
    return 'Versioned asset linked to exact copy version and brand kit'
  if (t.includes('qa') || t.includes('evaluat') || t.includes('compliance') || t.includes('review'))
    return 'Pass / revise / escalate decision with evidence and rubric scores'
  if (t.includes('publish') || t.includes('scheduler'))
    return 'Platform response or labelled simulation/blocked state'
  if (t.includes('report') || t.includes('dashboard') || t.includes('insight'))
    return 'Report with definitions, period, source, freshness and caveats'
  if (t.includes('plan') || t.includes('planner') || t.includes('orchestrat'))
    return 'Task graph with owners, dependencies, dates and review gates'
  if (t.includes('invoice') || t.includes('billing')) return 'Draft invoice referencing approved scope and accepted work'
  if (t.includes('connector') || t.includes('runtime')) return 'Health status, run logs, validation results'
  return 'Structured output object with status, evidence, warnings and next owner'
}

function depsFor(dept, idx) {
  if (idx === 0) return []
  const pool = ['Brief (versioned)', 'Approved strategy', 'Research findings', 'Client assets', 'Brand kit', 'KPI definitions', 'Approved scope', 'Upstream validated output']
  const n = 1 + (idx % 3)
  const out = []
  for (let i = 0; i < n; i++) out.push(pool[(idx + i * 2) % pool.length])
  return [...new Set(out)]
}

function toolsFor(dept, authority) {
  const base = ['task.read', 'output.write']
  if (authority === 'A') return [...base, 'data.read', 'search.read']
  if (authority === 'B') return [...base, 'draft.write', 'evidence.attach']
  if (authority === 'C') return [...base, 'task.assign', 'record.update', 'workflow.route']
  if (authority === 'D') return [...base, 'connector.publish', 'connector.send', 'spend.adjust (capped)']
  if (authority === 'E') return ['record.read', 'human.decision.request']
  return base
}

function lastRunFor(rand) {
  const mins = Math.floor(rand() * 2880)
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return `Today ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export const positions = buildPositions()

export const positionsByDept = (deptId) => {
  if (!deptId) return []
  const clean = String(deptId).toUpperCase().trim()
  return positions.filter((p) => p.deptId.toUpperCase() === clean)
}

export const positionById = (positionId) => {
  if (!positionId) return null
  const clean = String(positionId).toUpperCase().trim()
  return positions.find((p) => p.positionId.toUpperCase() === clean || p.samAgId.toUpperCase() === clean) || null
}

export const authorityClasses = [
  { id: 'A', level: 'Level 1', name: 'Level 1 — Read / Analyse', short: 'Read / Analyse', desc: 'Can inspect assigned information and produce analysis. Cannot directly make changes to external systems.', color: 'sky' },
  { id: 'B', level: 'Level 2', name: 'Level 2 — Draft / Recommend', short: 'Draft / Recommend', desc: 'Can prepare drafts, proposals, and recommendations for review. Cannot independently execute restricted external actions. Requires approval before external execution.', color: 'indigo' },
  { id: 'C', level: 'Level 3', name: 'Level 3 — Internal Action', short: 'Internal Action', desc: 'Can perform permitted internal tasks and update authorized internal workflow records within its assigned permissions.', color: 'teal' },
  { id: 'D', level: 'Level 4', name: 'Level 4 — External Side Effect', short: 'External Side Effect', desc: 'Can initiate or perform actions that affect external systems or people, only when the required permissions, approvals, and policy checks are satisfied.', color: 'amber' },
  { id: 'E', level: 'Level 5', name: 'Level 5 — Reserved Human Decision', short: 'Reserved Human Decision', desc: 'Legal signature, clinical sign-off, major commercial commitment or actual payment. AI agents can only prepare recommendations.', color: 'rose' }
]
