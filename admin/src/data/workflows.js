// ==============================================================================
// SAMRUDHI AGENTIC AI — WORKFLOWS & OPERATING MODEL DATA
// Re-exports authoritative project registry from workflowProjectsData.js
// Maintains full backward compatibility for existing modules
// ==============================================================================

import {
  operatingStages as stagesData,
  workflowProjects as projectsData,
  getWorkflowSummaryMetrics as getSummary,
  getWorkflowProjectById as getProjectById,
  cityCareTasks,
  cityCareApprovals,
  cityCareDeliverables,
  cityCareActivityLog,
  cityCareIssues
} from './workflowProjectsData'

export const operatingStages = stagesData
export const workflowProjects = projectsData
export const getWorkflowSummaryMetrics = getSummary
export const getWorkflowProjectById = getProjectById

// Backward compatibility for demo simulation run
export const demoWorkflow = {
  id: 'WF-CLIENT-CONTENT-0001',
  name: 'Healthcare Social Post — Cardiac Awareness Week',
  client: 'CLIENT-DEMO-001',
  clientName: 'City Care Multispeciality Hospital',
  status: 'in_progress',
  stage: 8,
  progress: 58,
  startedAt: '2026-10-10 09:00',
  eta: '2026-10-31 17:00',
  tasks: cityCareTasks
}

// Convert workflowProjects to legacy workflowRuns structure for any legacy views
export const workflowRuns = projectsData.map((p) => ({
  id: p.id,
  workflowId: p.workflowId,
  name: p.name,
  client: p.id === 'PRJ-2026-001' ? 'City Care Multispeciality Hospital' : p.clientName,
  type: p.department,
  status: p.status === 'awaiting_approval' ? 'approval' : p.status,
  stage: p.currentStage?.id || 8,
  progress: p.progress,
  startedAt: p.startDate,
  eta: p.dueDate,
  owner: p.departmentCode,
  tasks: p.totalTasks,
  done: p.completedTasks,
  flag: p.currentBlocker !== 'None' ? p.currentBlocker : null
}))

// Demo simulation steps
export const demoRunSteps = [
  { label: 'Brief structuring (Shruti CRT-002)', detail: 'Parsing client brief, extracting audience, CTA, restrictions…', ms: 900 },
  { label: 'Planning task graph (Sankalan OPS-002)', detail: 'Creating research → copy → visual → QA → review → publish tasks…', ms: 900 },
  { label: 'Audience & clinical research (Anvesh CRT-003)', detail: 'Gathering peer-reviewed ICMR findings with citations and dates…', ms: 1100 },
  { label: 'Caption & copy draft (Lekha CRT-004)', detail: 'Drafting multi-platform carousel copy with disclaimer blocks…', ms: 1000 },
  { label: 'Visual asset design (Chitra CRT-005)', detail: 'Producing 1080×1080 visual linked to copy version and brand kit…', ms: 1000 },
  { label: 'QA & governance audit (Shuddhi / Pariksha GOV-008)', detail: 'Screening clinical claims, brand, technical and policy checks…', ms: 1200 },
  { label: 'Client review gate (Priya S. CEX-001)', detail: 'Waiting for client approval — this step requires a human decision.', ms: 1000 }
]
