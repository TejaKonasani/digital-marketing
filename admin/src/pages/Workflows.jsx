import { useState, useMemo, useEffect, useRef } from 'react'
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom'
import {
  Workflow, PlayCircle, CheckCircle2, Circle, Clock, AlertTriangle, Lock,
  ArrowRight, ArrowLeft, RotateCcw, Loader2, GitBranch, FileText, Eye, Send,
  BarChart3, Search, Filter, SlidersHorizontal, ChevronRight, ChevronDown,
  Building2, Users, Bot, ShieldCheck, CheckSquare, Sparkles, AlertCircle,
  ExternalLink, Calendar, HelpCircle, Layers, Check, MessageSquare, Rocket,
  Info, RefreshCw, X, FolderCheck, FileCode, Tag, ArrowUpRight, Copy, Share2
} from 'lucide-react'
import {
  Card, PageHeader, Badge, StatusBadge, Drawer, DetailRow, ProgressBar,
  SimulationBanner, EmptyState, Tabs, Avatar
} from '../components/ui'
import { useApp } from '../state/AppContext'
import {
  operatingStages,
  workflowProjects,
  getWorkflowSummaryMetrics,
  getWorkflowProjectById,
  demoRunSteps
} from '../data/workflows'

// ----------------------------------------------------
// HELPER BADGE STYLES
// ----------------------------------------------------
function ProjectStatusBadge({ status }) {
  const s = String(status || '').toLowerCase()
  if (s === 'in_progress' || s === 'running') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/20">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" /> In Progress
      </span>
    )
  }
  if (s === 'awaiting_approval' || s === 'approval') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Awaiting Approval
      </span>
    )
  }
  if (s === 'requests') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700 ring-1 ring-inset ring-purple-600/20">
        <span className="h-1.5 w-1.5 rounded-full bg-purple-600" /> Requests
      </span>
    )
  }
  if (s === 'revisions') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 ring-1 ring-inset ring-rose-600/20">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-600" /> Revisions
      </span>
    )
  }
  if (s === 'completed') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" /> Completed
      </span>
    )
  }
  if (s === 'blocked') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700 ring-1 ring-inset ring-red-600/20">
        <span className="h-1.5 w-1.5 rounded-full bg-red-600" /> Blocked
      </span>
    )
  }
  if (s === 'draft') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 ring-1 ring-inset ring-slate-500/20">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-500" /> Draft
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-inset ring-slate-300">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" /> {status}
    </span>
  )
}

function PriorityPill({ priority }) {
  const p = String(priority || '').toLowerCase()
  if (p === 'critical' || p === 'high') {
    return <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600"><span className="h-2 w-2 rounded-full bg-rose-500" /> High</span>
  }
  if (p === 'medium') {
    return <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600"><span className="h-2 w-2 rounded-full bg-amber-500" /> Medium</span>
  }
  return <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-600"><span className="h-2 w-2 rounded-full bg-slate-400" /> Low</span>
}

// ----------------------------------------------------
// DEMO SIMULATOR RUNNER DRAWER
// ----------------------------------------------------
export function DemoRunner({ open, onClose }) {
  const { demoRun, startDemoRun, advanceDemoRun, finishDemoRun, resetDemoRun } = useApp()
  const timer = useRef(null)

  useEffect(() => {
    if (!open || !demoRun || !demoRun.running) return
    const step = demoRunSteps[demoRun.stepIndex]
    if (!step) return
    timer.current = setTimeout(() => {
      if (demoRun.stepIndex >= demoRunSteps.length - 1) {
        finishDemoRun()
      } else {
        advanceDemoRun(demoRun.stepIndex + 1)
      }
    }, step.ms)
    return () => clearTimeout(timer.current)
  }, [open, demoRun, advanceDemoRun, finishDemoRun])

  if (!open) return null
  return (
    <Drawer
      open
      onClose={onClose}
      title="Simulated workflow execution"
      subtitle="Watch a healthcare social post move through the operating model"
      footer={
        <>
          <button className="btn-secondary" onClick={() => { resetDemoRun(); onClose() }}>
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
          {!demoRun && (
            <button className="btn-primary" onClick={startDemoRun}>
              <PlayCircle className="h-4 w-4" /> Start demo run
            </button>
          )}
        </>
      }
    >
      <div className="space-y-5">
        <SimulationBanner compact />
        {!demoRun ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-6 text-center">
            <PlayCircle className="mx-auto h-10 w-10 text-slate-300" />
            <p className="mt-3 text-sm font-semibold text-slate-700">Ready to run the seeded scenario</p>
            <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-slate-500">
              Simulates agent handoffs for one social post — brief → planning → research → copy → visual → QA → client review.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {demoRunSteps.map((step, i) => {
              const state = i < demoRun.stepIndex ? 'done' : i === demoRun.stepIndex ? (demoRun.done ? 'done' : 'running') : 'pending'
              return (
                <div key={i} className={`flex items-start gap-3 rounded-xl border p-4 transition ${state === 'done' ? 'border-emerald-200 bg-emerald-50/50' : state === 'running' ? 'border-indigo-300 bg-indigo-50/50' : 'border-slate-200 bg-white'}`}>
                  <div className="mt-0.5">
                    {state === 'done' ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    ) : state === 'running' ? (
                      <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-slate-300" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-semibold ${state === 'pending' ? 'text-slate-400' : 'text-slate-800'}`}>{step.label}</p>
                    {(state === 'running' || state === 'done') && (
                      <p className="mt-0.5 text-xs text-slate-500">{step.detail}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Drawer>
  )
}

// ----------------------------------------------------
// FULL-PAGE TASK INSPECTION MODAL / DRAWER
// Section 4.C: Inspect any task in full detail
// ----------------------------------------------------
export function TaskInspectorModal({ task, project, onClose }) {
  const [activeTab, setActiveTab] = useState('overview') // overview | input | processing | output | feedback
  if (!task) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-200 bg-slate-50/80 px-6 py-4">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                {task.id}
              </span>
              <h2 className="text-lg font-bold text-slate-900">{task.name}</h2>
              <ProjectStatusBadge status={task.status} />
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Project: <span className="font-semibold text-slate-700">{project?.name || 'Project'}</span> · Stage {task.stage}: {task.stageName || 'Execution'} · Responsible: <span className="font-semibold text-slate-700">{task.positionId} ({task.positionTitle})</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-slate-200 bg-white px-6">
          {[
            { id: 'overview', label: 'Task Info & Objectives' },
            { id: 'input', label: 'Inputs Consumed' },
            { id: 'processing', label: 'Processing & Execution' },
            { id: 'output', label: 'Output Deliverable' },
            { id: 'feedback', label: 'Review & Feedback' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`border-b-2 px-4 py-3 text-xs font-semibold transition ${
                activeTab === t.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Responsible Role & Agent</p>
                  <p className="mt-2 text-sm font-bold text-slate-900">{task.positionTitle} ({task.positionId})</p>
                  <p className="mt-0.5 text-xs text-slate-600">Assigned Agent: <span className="font-semibold text-indigo-600">{task.agent || 'Automated / Assigned Agent'}</span></p>
                  <p className="mt-0.5 text-xs text-slate-500">Canonical ID: {task.samAgId || 'SAM-AG-000'}</p>
                  <p className="mt-0.5 text-xs text-slate-500">Department: {task.department} ({task.departmentCode})</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Execution Timeline</p>
                  <p className="mt-2 text-xs text-slate-600">Started: <span className="font-semibold text-slate-900">{task.startedAt || 'Pending launch'}</span></p>
                  <p className="mt-1 text-xs text-slate-600">Completed: <span className="font-semibold text-slate-900">{task.completedAt || 'In progress'}</span></p>
                  <p className="mt-1 text-xs text-slate-600">Duration: <span className="font-semibold text-slate-900">{task.duration || 'Running'}</span></p>
                  <p className="mt-1 text-xs text-slate-600">Next Receiving Owner: <span className="font-semibold text-slate-900">{task.nextOwner || 'Downstream Workflow Queue'}</span></p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Task Objective</h4>
                <p className="mt-1.5 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-3.5 leading-relaxed">
                  {task.objective || 'Execute assigned operating responsibilities in compliance with PRD role contracts.'}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Acceptance Criteria</h4>
                <p className="mt-1.5 text-sm text-slate-800 bg-emerald-50/50 border border-emerald-200/80 rounded-xl p-3.5 leading-relaxed text-emerald-900">
                  {task.acceptanceCriteria || 'Verified outputs adhering to quality rubric and validation criteria.'}
                </p>
              </div>

              {task.dependencies?.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Prerequisite Dependencies</h4>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {task.dependencies.map((dep) => (
                      <span key={dep} className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-mono font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200">
                        {dep} (Satisfied)
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {task.warnings?.length > 0 && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <AlertTriangle className="h-4 w-4" /> Operational Note / Warning
                  </div>
                  <p>{task.warnings[0]}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'input' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Exact Project-Specific Inputs Received</h4>
                <span className="text-[11px] text-slate-400">Schema validated & authenticated</span>
              </div>
              <ul className="space-y-2">
                {(task.inputs || ['Project creative brief v1', 'Client guidelines']).map((inp, idx) => (
                  <li key={idx} className="flex items-start gap-3 rounded-xl border border-sky-200 bg-sky-50/40 p-3.5 text-sm text-slate-800">
                    <FileText className="h-4 w-4 shrink-0 text-sky-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">{inp}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Handoff payload confirmed with checksum & tenant scope CLT-001</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 leading-relaxed">
                <p className="font-bold text-slate-800">Input Constraints & Governance Boundaries:</p>
                <p className="mt-1">All patient-facing healthcare copy must adhere to ASCI compliance guidelines. No unverified statistical guarantees or cure promises are permitted.</p>
              </div>
            </div>
          )}

          {activeTab === 'processing' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Execution Work Performed</h4>
              <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                {task.processing || 'Automated multi-step processing executed according to role instructions.'}
              </div>

              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Automated Tools & Verification Checks</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> Schema & JSON validation: Passed
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> Tenant isolation barrier: Passed
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> Medical claims rubric: Verified
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> Accessibility (WCAG 2.1 AA): Compliant
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'output' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Generated Deliverable / Output</h4>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                  Version: {task.outputVersion || 'v1.0'}
                </span>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 text-sm text-slate-800 leading-relaxed font-mono whitespace-pre-line">
                {task.outputs || 'Task output generated and ready for downstream handoff.'}
              </div>

              {task.outputFiles?.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Associated Files & Artifacts</p>
                  <div className="space-y-1.5">
                    {task.outputFiles.map((f, i) => (
                      <div key={i} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-white text-xs">
                        <span className="flex items-center gap-2 font-mono text-slate-700">
                          <FileCode className="h-4 w-4 text-indigo-500" /> {f}
                        </span>
                        <span className="text-[11px] font-semibold text-indigo-600">Verified Artifact</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Review & Governance History</h4>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800 leading-relaxed">
                <p className="font-semibold text-slate-900">Review Outcome & Decision Record:</p>
                <p className="mt-1">{task.feedback || 'Pending formal review gate submission.'}</p>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-xs text-amber-900">
                <p className="font-bold flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5" /> Human-in-the-Loop Review Policy
                </p>
                <p className="mt-1 leading-relaxed">
                  Generated creative and medical copy remains internal until formally signed off by the assigned human account lead and designated client decision-maker.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-3.5">
          <span className="text-xs text-slate-500 font-mono">Correlation ID: corr_{task.id.toLowerCase()}_prj001</span>
          <button
            onClick={onClose}
            className="btn-primary text-xs"
          >
            Close Task Inspector
          </button>
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------
// DELIVERABLE CONTENT PREVIEW MODAL
// ----------------------------------------------------
export function DeliverablePreviewModal({ deliverable, onClose }) {
  if (!deliverable) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 overflow-hidden my-auto">
        <div className="flex items-start justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-700 font-mono">{deliverable.id}</span>
              <h3 className="text-base font-bold text-slate-900">{deliverable.name}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">{deliverable.category} · Version {deliverable.version} · Produced by {deliverable.producingPosition}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 ring-1 ring-emerald-200">
              QA Status: {deliverable.qaStatus}
            </span>
            <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700 ring-1 ring-blue-200">
              Approval: {deliverable.approvalStatus}
            </span>
            <span className="text-slate-400">Date: {deliverable.date}</span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Content Preview</p>
            <div className="whitespace-pre-line font-sans text-sm text-slate-800 leading-relaxed bg-white border border-slate-200 rounded-lg p-4">
              {deliverable.previewContent || deliverable.summary}
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-200 bg-slate-50 px-6 py-3">
          <button onClick={onClose} className="btn-secondary text-xs">Done</button>
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------
// FULL-PAGE PROJECT DETAILS SCREEN
// Section 3: Full-page route /workflows/:id
// Breadcrumb: Workflows > Project Name
// ----------------------------------------------------
export function ProjectDetailScreen({ projectId }) {
  const { id: paramId } = useParams()
  const resolvedId = projectId || paramId
  const navigate = useNavigate()
  const { decideApproval, toast } = useApp()

  const project = useMemo(() => getWorkflowProjectById(resolvedId), [resolvedId])

  // 7 Tabs: overview | execution | tasks | approvals | deliverables | activity | issues
  const [activeTab, setActiveTab] = useState('overview')

  // Modals state
  const [inspectingTask, setInspectingTask] = useState(null)
  const [previewingDeliverable, setPreviewingDeliverable] = useState(null)
  const [runnerOpen, setRunnerOpen] = useState(false)

  // Local simulated approval state
  const [approvalsList, setApprovalsList] = useState(project?.approvals || [])

  // Tasks filter in Tasks tab
  const [taskSearch, setTaskSearch] = useState('')
  const [taskStatusFilter, setTaskStatusFilter] = useState('all')

  // Execution tracker filter
  const [trackerStatusFilter, setTrackerStatusFilter] = useState('all')

  // Activity log filter
  const [activityTypeFilter, setActivityTypeFilter] = useState('all')

  // Reset tab & state on project change
  useEffect(() => {
    setActiveTab('overview')
    setInspectingTask(null)
    setPreviewingDeliverable(null)
    setApprovalsList(project?.approvals || [])
  }, [resolvedId, project])

  if (!project) {
    return (
      <div className="space-y-4 p-8">
        <button
          onClick={() => navigate('/workflows')}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4" /> All Workflows
        </button>
        <EmptyState
          icon={Workflow}
          title="Project not found"
          message={`No project matches the identifier "${resolvedId}". Return to the Workflows dashboard.`}
          action={
            <button className="btn-primary" onClick={() => navigate('/workflows')}>
              Back to Workflows
            </button>
          }
        />
      </div>
    )
  }

  const tasks = project.tasks || []
  const filteredTasks = tasks.filter((t) => {
    if (taskStatusFilter !== 'all' && t.status !== taskStatusFilter) return false
    if (taskSearch) {
      const q = taskSearch.toLowerCase()
      if (
        !t.name.toLowerCase().includes(q) &&
        !t.id.toLowerCase().includes(q) &&
        !t.positionId.toLowerCase().includes(q) &&
        !t.positionTitle.toLowerCase().includes(q)
      ) {
        return false
      }
    }
    return true
  })

  // Simulated decision handler
  const handleSimulatedApproval = (approvalId, decision) => {
    setApprovalsList((prev) =>
      prev.map((a) =>
        a.id === approvalId
          ? {
              ...a,
              status: decision === 'approve' ? 'approved' : 'revision_requested',
              clientResponse: decision === 'approve' ? 'Client signed off on deliverable package.' : 'Client requested modifications.',
              respondedAt: 'Just now (Simulated)'
            }
          : a
      )
    )
  }

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Breadcrumb Navigation (Section 3) */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <button
          onClick={() => navigate('/workflows')}
          className="hover:text-indigo-600 transition flex items-center gap-1"
        >
          Workflows
        </button>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        <span className="font-semibold text-slate-800 truncate max-w-md">{project.name}</span>
      </div>

      {/* Top Project Header Card */}
      <div className="card p-6 bg-white shadow-sm border border-slate-200/80">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 shadow-sm">
              <Layers className="h-7 w-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl font-bold text-slate-900">{project.name}</h1>
                <ProjectStatusBadge status={project.status} />
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-mono font-semibold text-slate-700">{project.id}</span>
                <span>·</span>
                <span className="font-mono">{project.workflowId}</span>
                <span>·</span>
                <span>Owned by <strong className="text-slate-700">{project.owner}</strong></span>
                <span>·</span>
                <span>Dept: <strong className="text-slate-700">{project.department}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 lg:border-l lg:border-slate-100 lg:pl-6">
            <div className="text-right min-w-[140px]">
              <div className="flex items-baseline justify-end gap-1.5">
                <span className="text-3xl font-extrabold text-slate-900">{project.progress}%</span>
                <span className="text-xs font-semibold text-slate-500">
                  {project.completedTasks}/{project.totalTasks} tasks
                </span>
              </div>
              <ProgressBar value={project.progress} className="mt-2 h-2.5 w-36" />
            </div>

            <button
              onClick={() => setRunnerOpen(true)}
              className="btn-primary text-xs flex items-center gap-1.5"
            >
              <PlayCircle className="h-4 w-4" /> Simulate Execution
            </button>
          </div>
        </div>
      </div>

      {/* 7 Core Navigation Tabs (Section 8) */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-6 overflow-x-auto pb-px text-sm">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'execution', label: 'Execution Tracker' },
            { id: 'tasks', label: `Tasks (${project.totalTasks})` },
            { id: 'approvals', label: `Approvals & Communications (${approvalsList.length})` },
            { id: 'deliverables', label: `Deliverables (${(project.deliverables || []).length})` },
            { id: 'activity', label: 'Activity Log' },
            { id: 'issues', label: `Issues & Risks (${(project.issues || []).length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap border-b-2 py-3 px-1 font-semibold text-xs transition ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 font-bold'
                  : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: OVERVIEW (Exact match to Reference Image) */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Card 1: Project Overview (3-Column Layout from Screenshot) */}
          <Card title="Project Overview" actions={<button className="text-xs font-semibold text-indigo-600 hover:underline">Edit</button>}>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Left Column */}
              <div className="space-y-3.5 border-b lg:border-b-0 lg:border-r border-slate-100 pb-4 lg:pb-0 lg:pr-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Client</p>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-900">{project.clientName} ({project.clientId})</p>
                    <button
                      onClick={() => navigate(`/clients/${project.clientId}`)}
                      className="text-xs font-semibold text-indigo-600 hover:underline"
                    >
                      View client
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Department</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">{project.department}</p>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Project Owner</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">{project.owner}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Start Date</p>
                    <p className="mt-0.5 text-xs font-medium text-slate-700">{project.startDate}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Target Completion</p>
                    <p className="mt-0.5 text-xs font-medium text-slate-700">{project.dueDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Priority</p>
                    <p className="mt-1"><PriorityPill priority={project.priority} /></p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Risk Level</p>
                    <p className="mt-1 text-xs font-bold text-amber-600 flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-amber-500" /> {project.riskLevel}
                    </p>
                  </div>
                </div>
              </div>

              {/* Middle Column */}
              <div className="space-y-4 border-b lg:border-b-0 lg:border-r border-slate-100 pb-4 lg:pb-0 lg:pr-6">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Description</p>
                  <p className="mt-1.5 text-xs text-slate-700 leading-relaxed">{project.description}</p>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Objectives</p>
                  <ul className="mt-1.5 space-y-1">
                    {(project.objectives || []).map((obj, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-500" /> {obj}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Deliverables</p>
                  <ul className="mt-1.5 space-y-1">
                    {(project.deliverablesScope || []).map((del, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-500" /> {del}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Current Stage</p>
                  <div className="mt-2 flex items-center gap-3 rounded-xl border border-indigo-100 bg-indigo-50/50 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-900">{project.currentStage?.name || 'Content Creation'}</p>
                      <p className="text-xs text-slate-500">{project.currentStage?.department || 'Marketing & Content'}</p>
                    </div>
                    <span className="text-xs font-bold text-indigo-700">{project.currentStage?.progress || project.progress}%</span>
                  </div>
                  <ProgressBar value={project.currentStage?.progress || project.progress} className="mt-2 h-2" />
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Next Milestone</p>
                  <p className="mt-1 text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-indigo-500" /> {project.nextMilestone}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Current Blockers</p>
                  <div className="mt-1 flex items-start gap-1.5 rounded-lg bg-amber-50 p-2.5 text-xs font-medium text-amber-800 border border-amber-200">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-600 mt-0.5" />
                    <span>{project.currentBlocker}</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Last Updated</p>
                  <p className="mt-0.5 text-xs text-slate-600">{project.lastUpdated}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Card 2: Key Metrics (6 Cards in Grid from Screenshot) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Key Metrics</h3>
              <button
                onClick={() => setActiveTab('tasks')}
                className="text-xs font-semibold text-indigo-600 hover:underline"
              >
                View all
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm text-center">
                <p className="text-xs font-semibold text-slate-500 flex items-center justify-center gap-1">
                  <CheckSquare className="h-3.5 w-3.5 text-slate-400" /> Total Tasks
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{project.totalTasks}</p>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-4 shadow-sm text-center">
                <p className="text-xs font-semibold text-emerald-700 flex items-center justify-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Completed
                </p>
                <p className="mt-1 text-2xl font-bold text-emerald-700">{project.completedTasks}</p>
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50/30 p-4 shadow-sm text-center">
                <p className="text-xs font-semibold text-blue-700 flex items-center justify-center gap-1">
                  <Loader2 className="h-3.5 w-3.5 text-blue-600 animate-spin" /> In Progress
                </p>
                <p className="mt-1 text-2xl font-bold text-blue-700">{project.inProgressTasks}</p>
              </div>

              <div className="rounded-xl border border-indigo-200 bg-indigo-50/30 p-4 shadow-sm text-center">
                <p className="text-xs font-semibold text-indigo-700 flex items-center justify-center gap-1">
                  <Eye className="h-3.5 w-3.5 text-indigo-600" /> Awaiting Review
                </p>
                <p className="mt-1 text-2xl font-bold text-indigo-700">{project.awaitingReviewTasks}</p>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50/30 p-4 shadow-sm text-center">
                <p className="text-xs font-semibold text-amber-700 flex items-center justify-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-amber-600" /> Awaiting Approval
                </p>
                <p className="mt-1 text-2xl font-bold text-amber-700">{project.awaitingApprovalTasks}</p>
              </div>

              <div className="rounded-xl border border-rose-200 bg-rose-50/30 p-4 shadow-sm text-center">
                <p className="text-xs font-semibold text-rose-700 flex items-center justify-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5 text-rose-600" /> Blocked
                </p>
                <p className="mt-1 text-2xl font-bold text-rose-700">{project.blockedTasks}</p>
              </div>
            </div>
          </div>

          {/* Card 3: Client Details Card (3 Columns from Screenshot) */}
          <Card
            title="Client Details"
            actions={
              <button
                onClick={() => navigate(`/clients/${project.clientId}`)}
                className="text-xs font-semibold text-indigo-600 hover:underline"
              >
                View all
              </button>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200 font-bold">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{project.clientName} ({project.clientId})</p>
                  <p className="text-xs text-slate-500 mt-0.5">Contact: {project.clientContact?.name || 'Client Lead'}</p>
                  <p className="text-xs text-slate-500">{project.clientContact?.email || 'contact@client.com'}</p>
                  <p className="text-xs text-slate-500">{project.clientContact?.phone || '+91 98000 00000'}</p>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Organization</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{project.clientContact?.organization || project.clientName}</p>
                <p className="text-xs text-slate-500 mt-0.5">{project.clientContact?.location || 'India'}</p>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Requirements</p>
                <ul className="mt-1 space-y-1">
                  {(project.clientContact?.requirements || ['Modern website', 'Content strategy', 'Social presence']).map((req, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400" /> {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* Card 4: Project Execution Tracker Preview (From Screenshot) */}
          <Card
            title="Project Execution Tracker"
            subtitle="Real-time multi-agent workflow tracking"
            actions={
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Live Tracking
              </span>
            }
          >
            {/* Horizontal Timeline Stepper */}
            <div className="mb-6 overflow-x-auto pb-2">
              <div className="flex min-w-[700px] items-center justify-between">
                {(project.stepperStages || []).map((stage, i) => {
                  const isDone = stage.status === 'completed'
                  const isCurrent = stage.status === 'current'
                  return (
                    <div key={stage.id} className="flex flex-1 items-center last:flex-none">
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                            isDone
                              ? 'bg-emerald-600 text-white'
                              : isCurrent
                              ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                              : 'bg-slate-100 text-slate-400 border border-slate-200'
                          }`}
                        >
                          {isDone ? <Check className="h-4 w-4" /> : i + 1}
                        </div>
                        <p className={`mt-1.5 text-xs font-semibold ${isCurrent ? 'text-indigo-600 font-bold' : isDone ? 'text-slate-800' : 'text-slate-400'}`}>
                          {stage.name}
                        </p>
                        <p className="text-[10px] text-slate-400">{stage.date}</p>
                      </div>
                      {i < (project.stepperStages.length - 1) && (
                        <div
                          className={`h-0.5 flex-1 mx-3 ${
                            isDone ? 'bg-emerald-500' : 'bg-slate-200'
                          }`}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Split Sub-Boxes: Current Activity vs Recent Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Current Activity Box */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Current Activity</p>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 font-bold">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900">{project.currentActivity?.stage || 'Content Creation'}</p>
                    <p className="text-xs text-slate-500">{project.currentActivity?.department || 'Marketing & Content'}</p>
                  </div>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-bold text-blue-700">
                    {project.currentActivity?.status || 'Running'}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs border-t border-slate-200/60 pt-2.5">
                  <div>
                    <span className="text-slate-400">Assigned to:</span>
                    <p className="font-semibold text-slate-800">{project.currentActivity?.assignedAgent || 'Riya Mehta (Agent)'}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Started / Elapsed:</span>
                    <p className="font-semibold text-slate-800">{project.currentActivity?.elapsed || '2h 35m'}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                      <span>Progress</span>
                      <span>{project.currentActivity?.progressSubtasks || '3/5 subtasks'}</span>
                    </div>
                    <ProgressBar value={project.currentActivity?.progressPercent || 60} className="h-1.5" />
                  </div>
                  <button
                    onClick={() => {
                      const activeT = (project.tasks || []).find((t) => t.status === 'in_progress') || project.tasks?.[0]
                      setInspectingTask(activeT)
                    }}
                    className="text-xs font-semibold text-indigo-600 hover:underline shrink-0"
                  >
                    View details
                  </button>
                </div>
              </div>

              {/* Recent Activity Box */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Recent Activity</p>
                <div className="space-y-2">
                  {(project.recentActivity || []).map((act, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                      <div className="min-w-0 flex-1">
                        <span className="font-semibold text-slate-500 text-[11px] mr-1">{act.time}:</span>
                        <span>{act.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-right">
                  <button
                    onClick={() => setActiveTab('activity')}
                    className="text-xs font-semibold text-indigo-600 hover:underline"
                  >
                    View full activity history →
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: EXECUTION TRACKER (Section 4 in PRD Requirements) */}
      {/* ========================================================================= */}
      {activeTab === 'execution' && (
        <div className="space-y-6">
          {/* Execution Summary Header (Section 4.A) */}
          <div className="card p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-md">
            <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-300">Execution Status Summary</h3>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400">Current Stage:</span>
                <p className="font-bold text-sm text-white mt-0.5">{project.currentStage?.name || 'Content Creation'}</p>
                <p className="text-[11px] text-indigo-200">{project.currentStage?.department || 'Marketing & Content'}</p>
              </div>
              <div>
                <span className="text-slate-400">Active Task:</span>
                <p className="font-bold text-sm text-white mt-0.5">TASK-015: Social Copy & Captions</p>
                <p className="text-[11px] text-indigo-200">Riya Mehta · CRT-004 (Running 2h 35m)</p>
              </div>
              <div>
                <span className="text-slate-400">Last Successful Task:</span>
                <p className="font-bold text-sm text-emerald-300 mt-0.5">TASK-014: Patient Education Guide</p>
                <p className="text-[11px] text-slate-300">Outputs validated & archived</p>
              </div>
              <div>
                <span className="text-slate-400">Next Action Gate:</span>
                <p className="font-bold text-sm text-amber-300 mt-0.5">Stage 10: Client Review</p>
                <p className="text-[11px] text-amber-200">Awaiting client feedback</p>
              </div>
            </div>
          </div>

          {/* 14-Stage Operating Model Stepper */}
          <Card title="Operating Model — 14 Stages Tracking" subtitle="Progress of deliverables across the end-to-end Samrudhi lifecycle">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {operatingStages.map((stg) => {
                const currentStageId = project.currentStage?.id || 8
                const isPassed = stg.id < currentStageId
                const isCurrent = stg.id === currentStageId
                const isBlocked = stg.id === 11 && project.blockedTasks > 0
                return (
                  <div
                    key={stg.id}
                    className={`rounded-xl border p-3 text-center transition ${
                      isPassed
                        ? 'border-emerald-200 bg-emerald-50/60'
                        : isCurrent
                        ? 'border-indigo-300 bg-indigo-50 shadow-sm ring-1 ring-indigo-300'
                        : isBlocked
                        ? 'border-rose-200 bg-rose-50/50'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      {isPassed ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      ) : isCurrent ? (
                        <Loader2 className="h-4 w-4 text-indigo-600 animate-spin" />
                      ) : isBlocked ? (
                        <Lock className="h-4 w-4 text-rose-500" />
                      ) : (
                        <Circle className="h-4 w-4 text-slate-300" />
                      )}
                    </div>
                    <p className={`mt-1.5 text-xs font-bold leading-tight ${isCurrent ? 'text-indigo-900' : isPassed ? 'text-slate-800' : 'text-slate-400'}`}>
                      {stg.name}
                    </p>
                    <p className="mt-0.5 text-[10px] text-slate-400">Stage {stg.id} · {stg.dept}</p>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Interactive Task Execution Table (Section 4.B) */}
          <Card
            title="Complete Task Execution History"
            subtitle="Click any row to inspect inputs, outputs, validation checks, and review records"
            bodyClass="p-0"
          >
            <div className="border-b border-slate-100 p-4 bg-slate-50/60 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-semibold text-slate-600">Showing {tasks.length} execution tasks for this project</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Filter:</span>
                {['all', 'completed', 'in_progress', 'awaiting_review', 'blocked'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setTrackerStatusFilter(st)}
                    className={`px-2.5 py-1 text-[11px] rounded-lg font-semibold transition ${
                      trackerStatusFilter === st
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {st === 'all' ? 'All' : st.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Task ID & Name</th>
                    <th className="py-3 px-4">Position / Agent</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Duration</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Deliverable Ref</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tasks
                    .filter((t) => trackerStatusFilter === 'all' || t.status === trackerStatusFilter)
                    .map((t) => (
                      <tr
                        key={t.id}
                        onClick={() => setInspectingTask(t)}
                        className="hover:bg-indigo-50/40 cursor-pointer transition"
                      >
                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-900">{t.name}</p>
                          <p className="font-mono text-[11px] text-indigo-600">{t.id} · Stage {t.stage}</p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-semibold text-slate-800">{t.positionTitle}</p>
                          <p className="text-slate-400 text-[11px]">{t.positionId} ({t.agent})</p>
                        </td>
                        <td className="py-3 px-4">
                          <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                            {t.departmentCode}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {t.duration || (t.completedAt ? 'Completed' : 'Running')}
                        </td>
                        <td className="py-3 px-4">
                          <ProjectStatusBadge status={t.status} />
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-500 truncate max-w-[150px]">
                          {t.outputFiles?.[0] || 'Draft Record'}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setInspectingTask(t)
                            }}
                            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 transition"
                          >
                            Inspect Task
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: TASKS REGISTRY (Section 4) */}
      {/* ========================================================================= */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          <Card>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search tasks by name, ID, or position..."
                  value={taskSearch}
                  onChange={(e) => setTaskSearch(e.target.value)}
                  className="input pl-9 text-xs"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {['all', 'completed', 'in_progress', 'awaiting_review', 'awaiting_approval', 'blocked'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setTaskStatusFilter(st)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      taskStatusFilter === st
                        ? 'bg-indigo-600 text-white'
                        : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {st === 'all' ? 'All Tasks' : st.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            {filteredTasks.map((t, idx) => (
              <div
                key={t.id}
                onClick={() => setInspectingTask(t)}
                className="card card-hover cursor-pointer p-4 transition border border-slate-200"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600 font-mono">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-indigo-600">{t.id}</span>
                        <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                        <ProjectStatusBadge status={t.status} />
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        Responsible: <span className="font-semibold text-slate-700">{t.positionTitle} ({t.positionId})</span> · Agent: <span className="font-semibold text-slate-700">{t.agent}</span> · Dept: {t.departmentCode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="text-xs text-slate-400 font-mono">{t.completedAt || t.startedAt || 'Pending'}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setInspectingTask(t)
                      }}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 border-t border-slate-100 pt-2.5 text-xs text-slate-600">
                  <div className="truncate">
                    <span className="font-bold text-slate-700">Inputs:</span> {t.inputs?.[0] || 'Creative brief specifications'}
                  </div>
                  <div className="truncate">
                    <span className="font-bold text-slate-700">Output:</span> {t.outputs || 'Deliverable record in production'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: APPROVALS & COMMUNICATIONS (Section 5) */}
      {/* ========================================================================= */}
      {activeTab === 'approvals' && (
        <div className="space-y-6">
          <SimulationBanner
            title="Human Decision Gates & Approvals"
            description="External activations, publishing, and contractual signoffs strictly require human authorization according to PRD governance."
          />

          <div className="space-y-4">
            {approvalsList.map((appr) => (
              <div key={appr.id} className="card p-5 border border-slate-200 bg-white shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">{appr.id}</span>
                      <h4 className="text-sm font-bold text-slate-900">{appr.type}</h4>
                      <ProjectStatusBadge status={appr.status} />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">Related Task: <span className="font-semibold text-slate-700">{appr.taskId} — {appr.taskName}</span></p>
                  </div>
                  <span className="text-xs text-slate-400">Sent: {appr.sentAt}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-1">
                    <p className="font-bold text-slate-700">Sender / Account Coordinator:</p>
                    <p className="text-slate-800 font-semibold">{appr.sender}</p>
                    <p className="font-bold text-slate-700 mt-2">Designated Client Approver:</p>
                    <p className="text-slate-800 font-semibold">{appr.recipient}</p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-1">
                    <p className="font-bold text-slate-700">Deliverable Attached:</p>
                    <p className="text-indigo-600 font-mono font-semibold">{appr.deliverableRef}</p>
                    <p className="font-bold text-slate-700 mt-2">Delivery Status:</p>
                    <p className="text-emerald-700 font-semibold">{appr.deliveryStatus}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/40">
                  <p className="text-xs font-bold text-slate-800">Subject: {appr.subject}</p>
                  <p className="mt-2 text-xs text-slate-600 whitespace-pre-line leading-relaxed font-sans">
                    {appr.content}
                  </p>
                </div>

                {appr.clientResponse && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-900">
                    <p className="font-bold">Client Decision Response ({appr.respondedAt}):</p>
                    <p className="mt-1">{appr.clientResponse}</p>
                  </div>
                )}

                {/* Simulated Decision Actions */}
                {appr.status === 'awaiting_approval' && (
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => handleSimulatedApproval(appr.id, 'revision')}
                      className="btn-secondary text-xs"
                    >
                      Request Revision
                    </button>
                    <button
                      onClick={() => handleSimulatedApproval(appr.id, 'approve')}
                      className="btn-primary text-xs"
                    >
                      Authorize & Approve Deliverable
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: DELIVERABLES */}
      {/* ========================================================================= */}
      {activeTab === 'deliverables' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(project.deliverables || cityCareDeliverables).map((del) => (
              <div key={del.id} className="card p-5 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">{del.id}</span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">{del.name}</h4>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700">
                      {del.version}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">{del.summary}</p>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs border-t border-slate-100 pt-3">
                    <div>
                      <span className="text-slate-400">Produced by:</span>
                      <p className="font-semibold text-slate-700">{del.producingPosition}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Format:</span>
                      <p className="font-semibold text-slate-700">{del.format}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-700">QA: {del.qaStatus}</span>
                  <button
                    onClick={() => setPreviewingDeliverable(del)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition"
                  >
                    Preview Content
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: ACTIVITY LOG (Section 6) */}
      {/* ========================================================================= */}
      {activeTab === 'activity' && (
        <div className="space-y-4">
          <Card title="Chronological Project Activity History" subtitle="Immutable event records from project creation to present">
            <div className="divide-y divide-slate-100">
              {(project.activityLog || cityCareActivityLog).map((evt) => (
                <div key={evt.id} className="py-3.5 flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold mt-0.5">
                    <Clock className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs font-bold text-slate-900">{evt.description}</p>
                      <span className="text-[11px] text-slate-400 font-mono">{evt.time}</span>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                      <span>Actor: <strong className="text-slate-700">{evt.actor}</strong></span>
                      <span>·</span>
                      <span className="font-mono text-indigo-600">{evt.positionId}</span>
                      <span>·</span>
                      <span className="font-semibold text-slate-700">{evt.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: ISSUES & RISKS (Section 7) */}
      {/* ========================================================================= */}
      {activeTab === 'issues' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {(project.issues || cityCareIssues).map((iss) => (
              <div key={iss.id} className="card p-5 border border-slate-200 bg-white shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-800 font-mono">{iss.id}</span>
                    <h4 className="text-sm font-bold text-slate-900">{iss.title}</h4>
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                      iss.severity === 'Critical' || iss.severity === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {iss.severity} Severity
                    </span>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                    Status: {iss.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div>
                    <span className="font-bold text-slate-500">Affected Task / Role:</span>
                    <p className="mt-0.5 font-semibold text-slate-900">{iss.affectedTask} ({iss.affectedPosition})</p>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500">Assigned Owner:</span>
                    <p className="mt-0.5 font-semibold text-slate-900">{iss.assignedOwner}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700 leading-relaxed">
                  <p className="font-bold text-slate-800">Impact Analysis:</p>
                  <p className="mt-0.5">{iss.impact}</p>
                  <p className="font-bold text-slate-800 mt-2">Recommended Next Action:</p>
                  <p className="mt-0.5">{iss.recommendedAction}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inspection Modals */}
      {inspectingTask && (
        <TaskInspectorModal
          task={inspectingTask}
          project={project}
          onClose={() => setInspectingTask(null)}
        />
      )}

      {previewingDeliverable && (
        <DeliverablePreviewModal
          deliverable={previewingDeliverable}
          onClose={() => setPreviewingDeliverable(null)}
        />
      )}

      <DemoRunner open={runnerOpen} onClose={() => setRunnerOpen(false)} />
    </div>
  )
}

// ----------------------------------------------------
// WORKFLOWS LANDING PAGE (Main List View)
// Section 1: 5 Summary Cards + Search/Filters + Table
// ----------------------------------------------------
export function WorkflowsLandingPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const urlStatus = searchParams.get('status') || 'all'
  const urlClient = searchParams.get('client') || 'all'
  const urlDept = searchParams.get('dept') || 'all'
  const urlQuery = searchParams.get('q') || ''
  const urlSort = searchParams.get('sort') || 'latest'

  const [query, setQuery] = useState(urlQuery)
  const [statusFilter, setStatusFilter] = useState(urlStatus)
  const [clientFilter, setClientFilter] = useState(urlClient)
  const [deptFilter, setDeptFilter] = useState(urlDept)
  const [sortOption, setSortOption] = useState(urlSort)
  const [showMoreFilters, setShowMoreFilters] = useState(false)
  const [ownerFilter, setOwnerFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')

  // Pagination state (10 items per page)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const summary = useMemo(() => getWorkflowSummaryMetrics(), [])

  // Sync state to URL
  const updateFilter = (key, val) => {
    const next = new URLSearchParams(searchParams)
    if (val && val !== 'all') {
      next.set(key, val)
    } else {
      next.delete(key)
    }
    setSearchParams(next)
  }

  // Clear all filters
  const clearFilters = () => {
    setQuery('')
    setStatusFilter('all')
    setClientFilter('all')
    setDeptFilter('all')
    setSortOption('latest')
    setOwnerFilter('all')
    setPriorityFilter('all')
    setCurrentPage(1)
    setSearchParams({})
  }

  // Distinct clients and departments for filter dropdowns
  const distinctClients = useMemo(() => {
    return Array.from(new Set(workflowProjects.map((p) => p.clientName)))
  }, [])

  const distinctDepts = useMemo(() => {
    return Array.from(new Set(workflowProjects.map((p) => p.department)))
  }, [])

  const distinctOwners = useMemo(() => {
    return Array.from(new Set(workflowProjects.map((p) => p.owner)))
  }, [])

  // Filtered & sorted projects
  const filteredProjects = useMemo(() => {
    return workflowProjects.filter((p) => {
      // Status filter
      if (statusFilter !== 'all') {
        if (statusFilter === 'active') {
          if (!['in_progress', 'draft', 'ready', 'running'].includes(p.status)) return false
        } else if (statusFilter === 'awaiting_approval') {
          if (!['awaiting_approval', 'approval'].includes(p.status)) return false
        } else if (statusFilter === 'requests') {
          if (!['requests', 'revisions'].includes(p.status)) return false
        } else if (statusFilter === 'blocked') {
          if (!['blocked', 'at_risk'].includes(p.status)) return false
        } else if (p.status !== statusFilter) {
          return false
        }
      }

      // Client filter
      if (clientFilter !== 'all' && p.clientName !== clientFilter) return false

      // Department filter
      if (deptFilter !== 'all' && p.department !== deptFilter) return false

      // Owner filter
      if (ownerFilter !== 'all' && p.owner !== ownerFilter) return false

      // Priority filter
      if (priorityFilter !== 'all' && p.priority !== priorityFilter) return false

      // Text search
      if (query) {
        const q = query.toLowerCase()
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.id.toLowerCase().includes(q) &&
          !p.workflowId.toLowerCase().includes(q) &&
          !p.clientName.toLowerCase().includes(q) &&
          !p.owner.toLowerCase().includes(q)
        ) {
          return false
        }
      }

      return true
    }).sort((a, b) => {
      if (sortOption === 'deadline') {
        return a.dueDate.localeCompare(b.dueDate)
      }
      if (sortOption === 'progress_high') {
        return b.progress - a.progress
      }
      if (sortOption === 'progress_low') {
        return a.progress - b.progress
      }
      if (sortOption === 'priority') {
        const pOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 }
        return (pOrder[b.priority] || 0) - (pOrder[a.priority] || 0)
      }
      // default: latest activity (ID order)
      return a.id.localeCompare(b.id)
    })
  }, [statusFilter, clientFilter, deptFilter, ownerFilter, priorityFilter, query, sortOption])

  // Paginated slice
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage) || 1
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredProjects.slice(start, start + itemsPerPage)
  }, [filteredProjects, currentPage])

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Top Header */}
      <PageHeader
        title="Workflows"
        description="Comprehensive enterprise project tracking, task dependency management, and multi-agent execution oversight."
      />

      {/* ========================================================================= */}
      {/* SECTION A: 5 SUMMARY CARDS (Exact match to Reference Image) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Active Projects */}
        <button
          onClick={() => {
            const next = statusFilter === 'active' ? 'all' : 'active'
            setStatusFilter(next)
            updateFilter('status', next)
            setCurrentPage(1)
          }}
          className={`card card-hover p-4 text-left transition relative border ${
            statusFilter === 'active'
              ? 'ring-2 ring-emerald-500 border-emerald-300 bg-emerald-50/20'
              : 'border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <Rocket className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-500">Active Projects</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-bold text-slate-900">{summary.active.count}</span>
                <span className="text-xs text-slate-400">of {summary.total} total</span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600 self-end mb-1">{summary.active.trend}</span>
          </div>
        </button>

        {/* Card 2: Awaiting Approval */}
        <button
          onClick={() => {
            const next = statusFilter === 'awaiting_approval' ? 'all' : 'awaiting_approval'
            setStatusFilter(next)
            updateFilter('status', next)
            setCurrentPage(1)
          }}
          className={`card card-hover p-4 text-left transition relative border ${
            statusFilter === 'awaiting_approval'
              ? 'ring-2 ring-amber-500 border-amber-300 bg-amber-50/20'
              : 'border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <Clock className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-500">Awaiting Approval</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-bold text-slate-900">{summary.awaitingApproval.count}</span>
                <span className="text-xs text-slate-400">of {summary.total} total</span>
              </div>
            </div>
            <span className="text-xs font-bold text-rose-500 self-end mb-1">{summary.awaitingApproval.trend}</span>
          </div>
        </button>

        {/* Card 3: Requests / Revisions */}
        <button
          onClick={() => {
            const next = statusFilter === 'requests' ? 'all' : 'requests'
            setStatusFilter(next)
            updateFilter('status', next)
            setCurrentPage(1)
          }}
          className={`card card-hover p-4 text-left transition relative border ${
            statusFilter === 'requests'
              ? 'ring-2 ring-purple-500 border-purple-300 bg-purple-50/20'
              : 'border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-200">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-500">Requests / Revisions</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-bold text-slate-900">{summary.requestsRevisions.count}</span>
                <span className="text-xs text-slate-400">of {summary.total} total</span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600 self-end mb-1">{summary.requestsRevisions.trend}</span>
          </div>
        </button>

        {/* Card 4: Completed Projects */}
        <button
          onClick={() => {
            const next = statusFilter === 'completed' ? 'all' : 'completed'
            setStatusFilter(next)
            updateFilter('status', next)
            setCurrentPage(1)
          }}
          className={`card card-hover p-4 text-left transition relative border ${
            statusFilter === 'completed'
              ? 'ring-2 ring-indigo-500 border-indigo-300 bg-indigo-50/20'
              : 'border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-500">Completed Projects</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-bold text-slate-900">{summary.completed.count}</span>
                <span className="text-xs text-slate-400">of {summary.total} total</span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600 self-end mb-1">{summary.completed.trend}</span>
          </div>
        </button>

        {/* Card 5: Blocked / At Risk */}
        <button
          onClick={() => {
            const next = statusFilter === 'blocked' ? 'all' : 'blocked'
            setStatusFilter(next)
            updateFilter('status', next)
            setCurrentPage(1)
          }}
          className={`card card-hover p-4 text-left transition relative border ${
            statusFilter === 'blocked'
              ? 'ring-2 ring-rose-500 border-rose-300 bg-rose-50/20'
              : 'border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600 border border-rose-200">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-500">Blocked / At Risk</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-bold text-slate-900">{summary.blocked.count}</span>
                <span className="text-xs text-slate-400">of {summary.total} total</span>
              </div>
            </div>
            <span className="text-xs font-bold text-rose-500 self-end mb-1">{summary.blocked.trend}</span>
          </div>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SECTION B: PROJECTS LIST HEADER + SEARCH & FILTERS BAR */}
      {/* ========================================================================= */}
      <Card>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Projects List</h2>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-500">{filteredProjects.length} projects</span>
              {(statusFilter !== 'all' || clientFilter !== 'all' || deptFilter !== 'all' || query || ownerFilter !== 'all' || priorityFilter !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-semibold text-indigo-600 hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {/* Search input */}
            <div className="relative sm:col-span-2">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects, clients, IDs..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  updateFilter('q', e.target.value)
                  setCurrentPage(1)
                }}
                className="input pl-9 text-xs"
              />
            </div>

            {/* Status Dropdown */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value)
                  updateFilter('status', e.target.value)
                  setCurrentPage(1)
                }}
                className="input text-xs"
              >
                <option value="all">Status: All</option>
                <option value="in_progress">In Progress</option>
                <option value="awaiting_approval">Awaiting Approval</option>
                <option value="requests">Requests</option>
                <option value="revisions">Revisions</option>
                <option value="completed">Completed</option>
                <option value="blocked">Blocked</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {/* Client Dropdown */}
            <div>
              <select
                value={clientFilter}
                onChange={(e) => {
                  setClientFilter(e.target.value)
                  updateFilter('client', e.target.value)
                  setCurrentPage(1)
                }}
                className="input text-xs truncate"
              >
                <option value="all">Client: All</option>
                {distinctClients.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Department Dropdown */}
            <div>
              <select
                value={deptFilter}
                onChange={(e) => {
                  setDeptFilter(e.target.value)
                  updateFilter('dept', e.target.value)
                  setCurrentPage(1)
                }}
                className="input text-xs"
              >
                <option value="all">Department: All</option>
                {distinctDepts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div>
              <select
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value)
                  updateFilter('sort', e.target.value)
                }}
                className="input text-xs"
              >
                <option value="latest">Sort: Latest activity</option>
                <option value="deadline">Sort: Nearest deadline</option>
                <option value="progress_high">Sort: Progress (High to Low)</option>
                <option value="progress_low">Sort: Progress (Low to High)</option>
                <option value="priority">Sort: Priority</option>
              </select>
            </div>
          </div>

          {/* More Filters Toggle */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              {showMoreFilters ? 'Hide extra filters' : 'More filters'}
            </button>
          </div>

          {showMoreFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 animate-fade-in">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Project Owner</label>
                <select
                  value={ownerFilter}
                  onChange={(e) => setOwnerFilter(e.target.value)}
                  className="input text-xs"
                >
                  <option value="all">All Owners</option>
                  {distinctOwners.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Priority Level</label>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="input text-xs"
                >
                  <option value="all">All Priorities</option>
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* ========================================================================= */}
      {/* SECTION C: PROJECTS TABLE (Matching Reference Image) */}
      {/* ========================================================================= */}
      <Card bodyClass="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/70 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
              <tr>
                <th className="py-3 px-4">PROJECT</th>
                <th className="py-3 px-4">CLIENT</th>
                <th className="py-3 px-4">DEPARTMENT</th>
                <th className="py-3 px-4">PROGRESS ↕</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">DUE DATE</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedProjects.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => navigate(`/workflows/${p.id}`)}
                  className="hover:bg-indigo-50/40 cursor-pointer transition"
                >
                  {/* PROJECT column */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        p.iconColor === 'blue' ? 'bg-blue-50 text-blue-600 border border-blue-200' :
                        p.iconColor === 'amber' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                        p.iconColor === 'green' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                        p.iconColor === 'rose' ? 'bg-rose-50 text-rose-600 border border-rose-200' :
                        p.iconColor === 'indigo' ? 'bg-indigo-50 text-indigo-600 border border-indigo-200' :
                        p.iconColor === 'teal' ? 'bg-teal-50 text-teal-600 border border-teal-200' :
                        'bg-slate-50 text-slate-600 border border-slate-200'
                      }`}>
                        <Layers className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate max-w-xs">{p.name}</p>
                        <p className="text-[11px] text-slate-500 font-mono">
                          {p.id} · <span className="font-sans">Owner: {p.owner}</span>
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* CLIENT column */}
                  <td className="py-3 px-4">
                    <p className="font-medium text-slate-800 truncate max-w-[140px]">{p.clientName}</p>
                  </td>

                  {/* DEPARTMENT column */}
                  <td className="py-3 px-4">
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {p.department}
                    </span>
                  </td>

                  {/* PROGRESS column */}
                  <td className="py-3 px-4">
                    <div className="w-32">
                      <div className="flex items-baseline justify-between text-xs mb-1">
                        <span className="font-bold text-slate-900">{p.progress}%</span>
                        <span className="text-[11px] text-slate-400">{p.completedTasks}/{p.totalTasks} tasks</span>
                      </div>
                      <ProgressBar
                        value={p.progress}
                        color={
                          p.status === 'blocked' ? 'bg-rose-500' :
                          p.status === 'completed' ? 'bg-emerald-500' :
                          p.status === 'awaiting_approval' ? 'bg-amber-500' : 'bg-indigo-600'
                        }
                        className="h-1.5"
                      />
                    </div>
                  </td>

                  {/* STATUS column */}
                  <td className="py-3 px-4">
                    <ProjectStatusBadge status={p.status} />
                  </td>

                  {/* DUE DATE column */}
                  <td className="py-3 px-4 text-xs font-medium text-slate-600">
                    {p.dueDate}
                  </td>

                  {/* ACTIONS column */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => navigate(`/workflows/${p.id}`)}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => navigate(`/workflows/${p.id}`)}
                        className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        title="Options"
                      >
                        ⋮
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProjects.length === 0 && (
          <div className="p-8">
            <EmptyState
              icon={Workflow}
              title="No projects match"
              message="Try adjusting your status, department, or keyword search criteria."
              action={
                <button className="btn-secondary" onClick={clearFilters}>
                  Clear all filters
                </button>
              }
            />
          </div>
        )}

        {/* Pagination bar (Matching screenshot: Showing 1-10 of 42 projects < 1 2 3 4 5 >) */}
        {filteredProjects.length > 0 && (
          <div className="flex flex-wrap items-center justify-between border-t border-slate-100 px-5 py-3.5 text-xs text-slate-500">
            <div>
              Showing {((currentPage - 1) * itemsPerPage) + 1}–{Math.min(currentPage * itemsPerPage, filteredProjects.length)} of {filteredProjects.length} projects
            </div>

            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="h-7 w-7 rounded border border-slate-200 bg-white flex items-center justify-center text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition"
              >
                ‹
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  onClick={() => setCurrentPage(pg)}
                  className={`h-7 min-w-[28px] px-1.5 rounded text-xs font-bold transition ${
                    currentPage === pg
                      ? 'bg-indigo-600 text-white'
                      : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {pg}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="h-7 w-7 rounded border border-slate-200 bg-white flex items-center justify-center text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

// ----------------------------------------------------
// CLEAN ROUTER DISPATCHER (Strictly 1 hook)
// Guaranteed zero Rules of Hooks violation
// ----------------------------------------------------
export default function Workflows() {
  const { id } = useParams()
  if (id) return <ProjectDetailScreen key={id} projectId={id} />
  return <WorkflowsLandingPage />
}
