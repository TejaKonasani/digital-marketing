import { departments, deptById } from './departments'
import { deptTitles } from './positionTitles'

// Deterministic per-department authority distribution (PRD Section 2.1 autonomy classes).
// Most roles are B (draft/recommend) or C (internal action); D (external side effect)
// is limited to publishing/spend roles; E (reserved human) appears on finance payment and
// clinical sign-off roles.
const authorityByDept = {
  CEO: { A: 2, B: 3, C: 1 },
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

const authorityLabel = {
  A: 'Read / analyse',
  B: 'Draft / recommend',
  C: 'Internal action',
  D: 'External side effect',
  E: 'Reserved human decision'
}

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
      const authority = idx === 0 ? (dist.D ? 'C' : 'C') : authList[idx]
      const isLead = idx === 0
      // Evaluator: assurance (GOV) evaluates producing roles; within GOV, the lead evaluates
      const evaluator =
        dept.id === 'GOV'
          ? 'GOV-001 (Assurance Lead)'
          : dept.id === 'TEC'
            ? 'GOV-010 (Agent Performance & Drift Monitor)'
            : 'GOV-002 (Output Quality & Competency Evaluator)'
      positions.push({
        samAgId,
        positionId,
        deptId: dept.id,
        title: title.t,
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
        status: statusFor(rand, dept.id, idx),
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

function statusFor(rand, deptId, idx) {
  const r = rand()
  if (r < 0.62) return 'active'
  if (r < 0.8) return 'idle'
  if (r < 0.9) return 'needs_review'
  return 'error'
}

function lastRunFor(rand) {
  const mins = Math.floor(rand() * 2880)
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return `Today ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export const positions = buildPositions()

export const positionsByDept = (deptId) => positions.filter((p) => p.deptId === deptId)
export const positionById = (positionId) => positions.find((p) => p.positionId === positionId)

export const authorityClasses = [
  { id: 'A', name: 'Read / analyse', desc: 'Read authorised data, classify, summarise and detect issues.', color: 'sky' },
  { id: 'B', name: 'Draft / recommend', desc: 'Prepare a proposed output without external side effects.', color: 'indigo' },
  { id: 'C', name: 'Internal action', desc: 'Update permitted internal records; assign tasks when authorised.', color: 'teal' },
  { id: 'D', name: 'External side effect', desc: 'Publish, send, spend or change a live account. Connector + explicit approval gate required.', color: 'amber' },
  { id: 'E', name: 'Reserved human decision', desc: 'Legal signature, clinical sign-off, major commercial commitment or actual payment.', color: 'rose' }
]