// Finance, audit, analytics and AgentOps data (PRD Sections 5, 14, 15)
export const finance = {
  summary: {
    mrr: 770000,
    mrrDelta: 8.2,
    outstanding: 420000,
    dso: 21,
    budgetVariance: -3.4,
    invoicesThisMonth: 9,
    collectedThisMonth: 560000
  },
  invoices: [
    { id: 'INV-2026-0912', client: 'City Care Multispeciality Hospital', amount: 240000, status: 'pending_authorisation', issued: '2026-10-29', due: '2026-11-12', basis: 'Accepted work AC-0044 · approved scope SC-DEMO-001' },
    { id: 'INV-2026-0908', client: 'Nirvaan Wellness Clinic', amount: 150000, status: 'sent', issued: '2026-10-25', due: '2026-11-08', basis: 'Accepted work AC-0041 · approved scope SC-DEMO-002' },
    { id: 'INV-2026-0901', client: 'Arogya Ayurveda Centre', amount: 110000, status: 'paid', issued: '2026-10-18', due: '2026-11-01', basis: 'Accepted work AC-0038 · approved scope SC-DEMO-004' },
    { id: 'INV-2026-0896', client: 'MediScan Diagnostics', amount: 180000, status: 'overdue', issued: '2026-09-30', due: '2026-10-14', basis: 'Accepted work AC-0035 · approved scope SC-DEMO-005', flag: '15 days overdue — collections tracker active' },
    { id: 'INV-2026-0890', client: 'City Care Multispeciality Hospital', amount: 240000, status: 'paid', issued: '2026-09-28', due: '2026-10-12', basis: 'Accepted work AC-0031 · approved scope SC-DEMO-001' }
  ],
  cashflow: [
    { month: 'May', inflow: 610, outflow: 480 },
    { month: 'Jun', inflow: 640, outflow: 495 },
    { month: 'Jul', inflow: 680, outflow: 510 },
    { month: 'Aug', inflow: 700, outflow: 520 },
    { month: 'Sep', inflow: 740, outflow: 540 },
    { month: 'Oct', inflow: 770, outflow: 555 }
  ]
}

export const auditLog = [
  { id: 'AUD-99120', time: '2026-10-29 10:14:22', actor: 'Vikram (Founder)', action: 'APPROVAL_VIEWED', target: 'APR-002 (budget cap)', detail: 'Opened major ad-spend approval', ip: '10.0.4.12' },
  { id: 'AUD-99119', time: '2026-10-29 10:02:10', actor: 'System (workflow engine)', action: 'GATE_BLOCKED', target: 'TASK-0007', detail: 'Client review blocked: QA gate not passed', ip: '—' },
  { id: 'AUD-99118', time: '2026-10-29 09:48:55', actor: 'Satya (GOV-001)', action: 'FINDING_RECORDED', target: 'FIND-0087', detail: 'Clinical claim lacks source backing — linked to evidence EV-2210', ip: '10.0.4.31' },
  { id: 'AUD-99117', time: '2026-10-29 09:30:02', actor: 'Lakshmi (FIN-001)', action: 'INVOICE_DRAFTED', target: 'INV-2026-0912', detail: 'Draft from accepted work AC-0044; payment authorisation pending', ip: '10.0.4.40' },
  { id: 'AUD-99116', time: '2026-10-29 08:55:41', actor: 'R. Iyer (Client Admin)', action: 'BRIEF_SUBMITTED', target: 'BRIEF-0003 v2', detail: 'Client submitted revised brief (2 fields still missing)', ip: 'external' },
  { id: 'AUD-99115', time: '2026-10-29 08:12:19', actor: 'System (tool gateway)', action: 'TOOL_DENIED', target: 'SAM-AG-134 → connector.publish', detail: 'Denied: client approval record absent. Attempt logged.', ip: '—' },
  { id: 'AUD-99114', time: '2026-10-29 07:40:33', actor: 'Arjun (TEC-001)', action: 'ROLE_VERSIONED', target: 'CRT-004 (Lekha) v1.1', detail: 'Prompt updated: added claims-flagging rule. Editor: Arjun. Reason: QA finding FIND-0084', ip: '10.0.4.22' },
  { id: 'AUD-99113', time: '2026-10-29 07:15:08', actor: 'System (tenant check)', action: 'CROSS_TENANT_DENIED', target: 'CLIENT-DEMO-002 → CLIENT-DEMO-001 record', detail: 'Negative isolation test passed: access denied and logged', ip: '—' },
  { id: 'AUD-99112', time: '2026-10-28 22:03:47', actor: 'System (Ollama adapter)', action: 'MODEL_TIMEOUT', target: 'SAM-AG-156', detail: 'Inference timeout after 30s; deterministic fallback used; retry succeeded', ip: '—' },
  { id: 'AUD-99111', time: '2026-10-28 18:22:14', actor: 'Divya (CEX-001)', action: 'APPROVAL_REQUESTED', target: 'APR-001', detail: 'Routed publish approval to client + policy approver', ip: '10.0.4.15' },
  { id: 'AUD-99110', time: '2026-10-28 16:40:00', actor: 'Sandeep (PMG-001)', action: 'SPEND_CHANGE_REQUESTED', target: 'APR-002', detail: 'Budget cap change ₹80k → ₹1.2L; reserved decision routed to Founder', ip: '10.0.4.28' },
  { id: 'AUD-99109', time: '2026-10-28 14:05:51', actor: 'System (evaluation)', action: 'EVALUATION_RECORDED', target: 'COPY-0007 v2', detail: 'Rubric R-12 score 8.2/10; evaluator GOV-002; 1 claim flagged', ip: '—' }
]

export const findings = [
  { id: 'FIND-0087', severity: 'high', status: 'open', title: 'Clinical claim lacks source backing', artefact: 'Diwali pack v1 (claim #1)', owner: 'GOV-008', raised: '2026-10-29', due: '2026-10-31', capa: 'CAPA-0041' },
  { id: 'FIND-0086', severity: 'medium', status: 'in_progress', title: 'Stale source used in research output', artefact: 'RESEARCH-0003 (source S7)', owner: 'CRT-003', raised: '2026-10-28', due: '2026-11-03', capa: 'CAPA-0040' },
  { id: 'FIND-0085', severity: 'low', status: 'open', title: 'Alt text missing on 1 asset variant', artefact: 'ASSET-0021 v1 (mobile crop)', owner: 'CRT-022', raised: '2026-10-28', due: '2026-11-05', capa: '—' },
  { id: 'FIND-0084', severity: 'medium', status: 'resolved', title: 'Claims flagging rule absent in copy prompt', artefact: 'CRT-004 role config', owner: 'TEC-012', raised: '2026-10-24', due: '2026-10-29', capa: 'CAPA-0038', resolved: 'Role v1.1 deployed 2026-10-29' },
  { id: 'FIND-0083', severity: 'high', status: 'resolved', title: 'Duplicate side-effect risk on retry', artefact: 'Publish task retry path', owner: 'TEC-010', raised: '2026-10-18', due: '2026-10-25', capa: 'CAPA-0036', resolved: 'Idempotency key added; retry tests pass' }
]

export const analytics = {
  monthlyRevenue: [
    { month: 'May', revenue: 610, target: 600 },
    { month: 'Jun', revenue: 640, target: 630 },
    { month: 'Jul', revenue: 680, target: 660 },
    { month: 'Aug', revenue: 700, target: 700 },
    { month: 'Sep', revenue: 740, target: 730 },
    { month: 'Oct', revenue: 770, target: 780 }
  ],
  contentFunnel: [
    { stage: 'Briefs', value: 42 },
    { stage: 'Planned', value: 38 },
    { stage: 'Produced', value: 31 },
    { stage: 'QA passed', value: 27 },
    { stage: 'Approved', value: 24 },
    { stage: 'Published', value: 21 }
  ],
  channelPerformance: [
    { channel: 'Social', impressions: 1240000, clicks: 38400, cpc: 0.42 },
    { channel: 'Google Ads', impressions: 860000, clicks: 29800, cpc: 1.18 },
    { channel: 'Meta Ads', impressions: 1520000, clicks: 41200, cpc: 0.36 },
    { channel: 'Organic (SEO)', impressions: 410000, clicks: 18900, cpc: 0 },
    { channel: 'Email', impressions: 96000, clicks: 5100, cpc: 0 }
  ],
  agentRuns: [
    { day: 'Mon', runs: 312, success: 298 },
    { day: 'Tue', runs: 341, success: 330 },
    { day: 'Wed', runs: 356, success: 337 },
    { day: 'Thu', runs: 328, success: 319 },
    { day: 'Fri', runs: 289, success: 281 },
    { day: 'Sat', runs: 122, success: 120 },
    { day: 'Sun', runs: 98, success: 96 }
  ],
  deptWorkload: [
    { dept: 'CRT', active: 14, queued: 9, blocked: 2 },
    { dept: 'PMG', active: 11, queued: 6, blocked: 1 },
    { dept: 'DAT', active: 8, queued: 4, blocked: 0 },
    { dept: 'CEX', active: 9, queued: 7, blocked: 3 },
    { dept: 'GOV', active: 6, queued: 5, blocked: 2 },
    { dept: 'OPS', active: 7, queued: 3, blocked: 1 },
    { dept: 'FIN', active: 4, queued: 2, blocked: 0 },
    { dept: 'TEC', active: 5, queued: 2, blocked: 0 }
  ]
}

export const connectors = [
  { name: 'Ollama (local model)', type: 'Model adapter', status: 'connected', detail: 'Model loaded · latency 840ms p50 · 14 runs today', env: 'local' },
  { name: 'Meta Ads', type: 'Paid media', status: 'degraded', detail: 'Latency above threshold · simulation mode active for publish tests', env: 'external' },
  { name: 'Google Ads', type: 'Paid media', status: 'connected', detail: 'Read + write scopes · last sync 12m ago', env: 'external' },
  { name: 'Google Analytics 4', type: 'Analytics', status: 'connected', detail: 'Read scope · data freshness 1h', env: 'external' },
  { name: 'Google Search Console', type: 'SEO', status: 'connected', detail: 'Read scope · last sync 1h ago', env: 'external' },
  { name: 'Email (SMTP)', type: 'Communication', status: 'simulation', detail: 'Simulation mode — no real mail is sent in demo', env: 'external' },
  { name: 'WhatsApp Business', type: 'Communication', status: 'not_connected', detail: 'Not connected — configure connector and credentials', env: 'external' },
  { name: 'Calendar (Google)', type: 'Scheduling', status: 'connected', detail: 'Read + create events · last sync 30m ago', env: 'external' },
  { name: 'Banking / Payments', type: 'Finance', status: 'not_connected', detail: 'Not connected — payments remain human-authorised', env: 'external' },
  { name: 'CMS / Website publishing', type: 'Publishing', status: 'simulation', detail: 'Simulation mode — publish actions recorded, not executed', env: 'external' }
]

export const agentRuns = [
  { id: 'RUN-88231', agent: 'SAM-AG-124 (Lekha)', task: 'TASK-0004 caption draft', model: 'ollama/configured-local-model', roleVersion: '1.1', status: 'completed', duration: '42s', tokens: 3120, validation: 'pass', handoff: '→ SAM-AG-142 (QA)', time: '10:02' },
  { id: 'RUN-88230', agent: 'SAM-AG-123 (Anvesh)', task: 'TASK-0003 research', model: 'ollama/configured-local-model', roleVersion: '1.0', status: 'completed', duration: '3m 12s', tokens: 8410, validation: 'pass', handoff: '→ SAM-AG-124 (copy)', time: '09:40' },
  { id: 'RUN-88229', agent: 'SAM-AG-134 (Prakash)', task: 'Publish attempt (blocked)', model: '—', roleVersion: '1.0', status: 'blocked', duration: '—', tokens: '—', validation: 'gate: approval missing', handoff: '—', time: '08:55' },
  { id: 'RUN-88228', agent: 'SAM-AG-156 (Data pipeline)', task: 'Nightly ingest', model: 'deterministic', roleVersion: '2.0', status: 'retried', duration: '1m 48s', tokens: '—', validation: 'pass (after retry)', handoff: '→ DAT-002 (reporting)', time: '22:03' },
  { id: 'RUN-88227', agent: 'SAM-AG-187 (GOV-002)', task: 'Evaluation COPY-0007 v2', model: 'ollama/configured-local-model', roleVersion: '1.2', status: 'completed', duration: '58s', tokens: 4210, validation: 'score 8.2/10', handoff: '→ GOV-008 (claims)', time: '14:05' },
  { id: 'RUN-88226', agent: 'SAM-AG-125 (Chitra)', task: 'TASK-0005 visual asset', model: 'ollama/configured-local-model', roleVersion: '1.0', status: 'completed', duration: '2m 04s', tokens: 1980, validation: 'pass', handoff: '→ SAM-AG-142 (QA)', time: '16:45' }
]

export const incidents = [
  { id: 'INC-0021', severity: 'medium', status: 'monitoring', title: 'Meta connector latency spike', opened: '2026-10-29 07:30', owner: 'TEC-020', impact: 'Publish tests run in simulation mode', statusNote: 'Latency recovering; simulation mode retained until 2 consecutive healthy checks' },
  { id: 'INC-0020', severity: 'low', status: 'resolved', title: 'Ollama inference timeout (SAM-AG-156)', opened: '2026-10-28 22:03', owner: 'TEC-011', impact: 'Nightly ingest delayed 14m', statusNote: 'Resolved: deterministic fallback + retry; no side effects duplicated' },
  { id: 'INC-0019', severity: 'high', status: 'resolved', title: 'Duplicate publish risk on retry path', opened: '2026-10-18 11:12', owner: 'TEC-010', impact: 'Potential duplicate external side effect', statusNote: 'Resolved: idempotency keys + retry tests (CAPA-0036)' }
]