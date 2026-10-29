import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import {
  Workflow, PlayCircle, CheckCircle2, Circle, Clock, AlertTriangle, Lock,
  ArrowRight, RotateCcw, Loader2, GitBranch, FileText, Eye, Send, BarChart3
} from 'lucide-react'
import { Card, PageHeader, Badge, StatusBadge, Drawer, DetailRow, ProgressBar, SimulationBanner, EmptyState, Tabs } from '../components/ui'
import { useApp } from '../state/AppContext'
import { operatingStages, workflowRuns, demoRunSteps } from '../data/workflows'

const stageIcon = (stage) => {
  if (stage <= 3) return FileText
  if (stage <= 5) return FileText
  if (stage <= 7) return Eye
  if (stage <= 8) return GitBranch
  if (stage <= 10) return CheckCircle2
  if (stage === 11) return Send
  return BarChart3
}

// ---------- Demo run simulator ----------
function DemoRunner({ open, onClose }) {
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
              This simulates the agent handoffs for one social post — brief → planning → research → copy → visual → QA → client review.
              No external action is executed; every step is recorded in demo state only.
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
                    {i === demoRunSteps.length - 1 && state !== 'pending' && (
                      <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800 ring-1 ring-amber-200">
                        <Lock className="mr-1 inline h-3 w-3" />
                        Client review is a human decision gate — in the demo it stays here. Publishing never happens without client approval of the exact version.
                      </p>
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

// ---------- Task detail drawer ----------
function TaskDrawer({ task, onClose }) {
  if (!task) return null
  const stage = operatingStages.find((s) => s.id === task.stage)
  return (
    <Drawer open onClose={onClose} title={task.name} subtitle={`${task.id} · Stage ${task.stage} — ${stage?.name || ''}`}>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={task.status} />
          <Badge color="indigo">{task.owner}</Badge>
          {task.completedAt && <Badge color="green">Completed {task.completedAt}</Badge>}
        </div>
        {task.warnings?.length > 0 && (
          <div className="space-y-2">
            {task.warnings.map((w, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2.5 text-xs text-amber-800 ring-1 ring-amber-200">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>{w}</span>
              </div>
            ))}
          </div>
        )}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-sky-50/60 p-4 ring-1 ring-sky-100">
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Inputs</p>
            <ul className="mt-2 space-y-1.5">
              {task.input.map((inp) => (
                <li key={inp} className="flex items-start gap-1.5 text-sm text-slate-700">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky-400" />{inp}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-emerald-50/60 p-4 ring-1 ring-emerald-100">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Output / handoff</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{task.output}</p>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200">
          <div className="border-b border-slate-100 bg-slate-50/60 px-4 py-2.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Execution record</p>
          </div>
          <div className="divide-y divide-slate-50 px-4">
            <DetailRow label="Agent / role">{task.agent}</DetailRow>
            <DetailRow label="Position ID">{task.positionId}</DetailRow>
            <DetailRow label="Canonical ID">{task.samAgId}</DetailRow>
            <DetailRow label="Started">{task.startedAt || '—'}</DetailRow>
            <DetailRow label="Completed">{task.completedAt || '—'}</DetailRow>
            <DetailRow label="Model">ollama / configured-local-model</DetailRow>
            <DetailRow label="Correlation ID">corr_{task.id.toLowerCase().replace('-', '')}_01</DetailRow>
          </div>
        </div>
        <p className="rounded-lg bg-slate-50 px-3 py-2.5 text-[11px] leading-relaxed text-slate-500">
          Handoff rule: this task's output becomes downstream input only after schema validation, policy checks and any required approval. Generated text alone does not complete a task.
        </p>
      </div>
    </Drawer>
  )
}

// ---------- Workflow detail (single run) ----------
function WorkflowDetail({ runId }) {
  const { demoWorkflow } = useApp()
  const run = runId === demoWorkflow.id ? demoWorkflow : workflowRuns.find((r) => r.id === runId)
  const [selectedTask, setSelectedTask] = useState(null)
  const [runnerOpen, setRunnerOpen] = useState(false)
  if (!run) return <EmptyState icon={Workflow} title="Workflow not found" />
  const isDemo = run.id === demoWorkflow.id

  return (
    <div className="space-y-6">
      <button onClick={() => history.back()} className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800">
        <ArrowRight className="h-4 w-4 rotate-180" /> All workflows
      </button>

      <div className="card p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900">{run.name}</h1>
              <StatusBadge status={run.status} />
              {run.flag && <Badge color="amber">{run.flag}</Badge>}
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {run.id} · {run.client} · Owner: {run.owner} · Started {run.startedAt} · ETA {run.eta}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-2xl font-bold text-slate-900">{run.progress}%</p>
              <p className="text-xs text-slate-500">{run.tasks ? `${run.done}/${run.tasks} tasks` : `${run.tasks.filter((t) => t.status === 'completed').length}/${run.tasks.length} tasks`}</p>
            </div>
            {isDemo && (
              <button className="btn-primary" onClick={() => setRunnerOpen(true)}>
                <PlayCircle className="h-4 w-4" /> Run simulation
              </button>
            )}
          </div>
        </div>
        <ProgressBar value={run.progress} className="mt-4 h-2.5" />
      </div>

      {isDemo ? (
        <>
          {/* 14-stage operating model strip */}
          <Card title="Operating model — 14 stages" subtitle="Where this run sits in the end-to-end flow">
            <div className="flex gap-1 overflow-x-auto pb-2">
              {operatingStages.map((s) => {
                const state = s.id < run.stage ? 'done' : s.id === run.stage ? 'current' : 'pending'
                const Icon = stageIcon(s.id)
                return (
                  <div key={s.id} className="min-w-[104px] flex-1">
                    <div className={`flex flex-col items-center rounded-xl border p-3 text-center transition ${state === 'done' ? 'border-emerald-200 bg-emerald-50/60' : state === 'current' ? 'border-indigo-300 bg-indigo-50 shadow-sm' : 'border-slate-200 bg-white'}`}>
                      <Icon className={`h-4 w-4 ${state === 'done' ? 'text-emerald-500' : state === 'current' ? 'text-indigo-600' : 'text-slate-300'}`} />
                      <p className={`mt-1.5 text-[10px] font-semibold leading-tight ${state === 'pending' ? 'text-slate-400' : 'text-slate-700'}`}>{s.name}</p>
                      <p className="mt-0.5 text-[9px] text-slate-400">Stage {s.id}</p>
                    </div>
                    {s.id < operatingStages.length && (
                      <div className="hidden" />
                    )}
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Task list */}
          <Card title="Tasks & handoffs" subtitle="Click a task to inspect inputs, outputs, warnings and the execution record" bodyClass="p-0">
            <div className="divide-y divide-slate-100">
              {run.tasks.map((t, i) => {
                const stage = operatingStages.find((s) => s.id === t.stage)
                return (
                  <button key={t.id} onClick={() => setSelectedTask(t)} className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-indigo-50/40">
                    <div className="flex flex-col items-center">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${t.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : t.status === 'in_progress' ? 'bg-indigo-100 text-indigo-700' : t.status === 'blocked' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-500'}`}>
                        {t.status === 'completed' ? <CheckCircle2 className="h-4 w-4" /> : t.status === 'in_progress' ? <Loader2 className="h-4 w-4 animate-spin" /> : t.status === 'blocked' ? <Lock className="h-4 w-4" /> : i + 1}
                      </span>
                      {i < run.tasks.length - 1 && <span className="mt-1 h-6 w-px bg-slate-200" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-slate-800">{t.name}</p>
                        <Badge color="slate">Stage {t.stage} · {stage?.name}</Badge>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {t.agent} · {t.positionId}
                        {t.startedAt && ` · started ${t.startedAt}`}
                        {t.completedAt && ` · done ${t.completedAt}`}
                      </p>
                      {t.warnings?.length > 0 && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-amber-600">
                          <AlertTriangle className="h-3 w-3" /> {t.warnings[0]}
                        </p>
                      )}
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                      <StatusBadge status={t.status} />
                      <span className="text-[10px] text-slate-400">{t.id}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </Card>
        </>
      ) : (
        <Card title="Run summary" bodyClass="p-0">
          <div className="divide-y divide-slate-50 px-5">
            <DetailRow label="Workflow ID">{run.id}</DetailRow>
            <DetailRow label="Type">{run.type}</DetailRow>
            <DetailRow label="Current stage">Stage {run.stage} — {operatingStages.find((s) => s.id === run.stage)?.name}</DetailRow>
            <DetailRow label="Tasks">{run.done} of {run.tasks} complete</DetailRow>
            <DetailRow label="Owner department">{run.owner}</DetailRow>
            <DetailRow label="Started">{run.startedAt}</DetailRow>
            <DetailRow label="ETA / completed">{run.completedAt ? `Completed ${run.completedAt}` : run.eta}</DetailRow>
          </div>
          {run.flag && (
            <div className="mx-5 mb-5 flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2.5 text-xs text-amber-800 ring-1 ring-amber-200">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>{run.flag}</span>
            </div>
          )}
        </Card>
      )}

      {selectedTask && <TaskDrawer task={selectedTask} onClose={() => setSelectedTask(null)} />}
      <DemoRunner open={runnerOpen} onClose={() => setRunnerOpen(false)} />
    </div>
  )
}

// ---------- Workflow board ----------
export default function Workflows() {
  const { id } = useParams()
  const [tab, setTab] = useState('all')
  const [runnerOpen, setRunnerOpen] = useState(false)
  const { demoWorkflow } = useApp()

  if (id) return <WorkflowDetail runId={id} />

  const allRuns = [demoWorkflow, ...workflowRuns]
  const filtered = allRuns.filter((r) => {
    if (tab === 'all') return true
    if (tab === 'in_progress') return r.status === 'in_progress'
    if (tab === 'approval') return r.status === 'approval'
    if (tab === 'blocked') return r.status === 'blocked'
    if (tab === 'completed') return r.status === 'completed'
    return true
  })

  return (
    <div>
      <PageHeader
        title="Workflow Orchestration"
        description="Every client request flows through the 14-stage operating model. Handoffs are explicit: upstream output becomes downstream input only after schema validation, policy checks and required approval."
        actions={
          <button className="btn-primary" onClick={() => setRunnerOpen(true)}>
            <PlayCircle className="h-4 w-4" /> Start demo workflow
          </button>
        }
      />

      <div className="mb-4">
        <Tabs
          active={tab}
          onChange={setTab}
          tabs={[
            { id: 'all', label: 'All', count: allRuns.length },
            { id: 'in_progress', label: 'In progress', count: allRuns.filter((r) => r.status === 'in_progress').length },
            { id: 'approval', label: 'Awaiting approval', count: allRuns.filter((r) => r.status === 'approval').length },
            { id: 'blocked', label: 'Blocked', count: allRuns.filter((r) => r.status === 'blocked').length },
            { id: 'completed', label: 'Completed', count: allRuns.filter((r) => r.status === 'completed').length }
          ]}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filtered.map((r) => (
          <div key={r.id} onClick={() => navigate(`/workflows/${r.id}`)} className="card card-hover block cursor-pointer p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-slate-900">{r.name}</p>
                </div>
                <p className="mt-1 text-xs text-slate-500">{r.id} · {r.client}</p>
              </div>
              <StatusBadge status={r.status} />
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-600">Stage {r.stage} · {operatingStages.find((s) => s.id === r.stage)?.name}</span>
                  <span className="text-slate-400">{r.progress}%</span>
                </div>
                <ProgressBar value={r.progress} color={r.status === 'blocked' ? 'bg-rose-500' : r.status === 'completed' ? 'bg-emerald-500' : 'bg-indigo-500'} />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {r.startedAt} → {r.eta}</span>
              <span>{r.tasks ? `${r.done}/${r.tasks} tasks` : `${r.tasks.filter((t) => t.status === 'completed').length}/${r.tasks.length} tasks`}</span>
              <Badge color="slate">{r.owner}</Badge>
            </div>
            {r.flag && (
              <p className="mt-2 flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs text-amber-700">
                <AlertTriangle className="h-3 w-3 shrink-0" /> {r.flag}
              </p>
            )}
          </div>
        ))}
      </div>

      <DemoRunner open={runnerOpen} onClose={() => setRunnerOpen(false)} />
    </div>
  )
}