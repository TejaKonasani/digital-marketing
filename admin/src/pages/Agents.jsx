import { useState, useMemo, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  Bot, Search, Cpu, Activity, ShieldCheck, ArrowUpRight, ArrowLeft,
  CheckCircle2, AlertTriangle, Clock, RefreshCw, Layers, Folder,
  ExternalLink, ChevronRight, ChevronLeft, MoreVertical, X,
  Check, FileText, FileInput, FileOutput, ShieldAlert, AlertCircle,
  RotateCcw, Sliders, Play, Award, Terminal, Eye, Sparkles, Server,
  Shield, Key, Zap
} from 'lucide-react'
import { PageHeader, Badge, StatusBadge, EmptyState, Drawer, DetailRow } from '../components/ui'
import { departments, deptById } from '../data/departments'
import {
  agentIdentities,
  agentById,
  getRunsForAgent,
  getRunById
} from '../data/agentActivityData'

// ----------------------------------------------------
// RUN DETAILS — FULL PAGE VIEW
// ----------------------------------------------------
export function RunDetailsScreen({ runId, agentId }) {
  const { id, runId: routeRunId } = useParams()
  const resolvedRunId = runId || routeRunId
  const resolvedAgentId = agentId || id
  const navigate = useNavigate()
  const run = useMemo(() => getRunById(resolvedRunId, resolvedAgentId), [resolvedRunId, resolvedAgentId])
  const [activeSubTab, setActiveSubTab] = useState('input')
  const [rerunState, setRerunState] = useState(false)

  // Reset state when navigating between runs
  useEffect(() => {
    setActiveSubTab('input')
    setRerunState(false)
  }, [resolvedRunId])

  if (!run) {
    return (
      <div className="p-8">
        <EmptyState
          icon={Activity}
          title="Execution run not found"
          message={`No execution run record was found for ID "${runId}".`}
          action={
            <button className="btn-secondary mt-4" onClick={() => navigate(agentId ? `/agents/${agentId}` : '/agents')}>
              Return to Agent Directory
            </button>
          }
        />
      </div>
    )
  }

  const handleRerun = () => {
    setRerunState(true)
    setTimeout(() => setRerunState(false), 2000)
  }

  return (
    <div className="space-y-6 pb-16">
      {/* Breadcrumb Navigation: Agent directory › [Agent Name] › [Run ID] */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => navigate('/agents')}
            className="hover:text-slate-900 transition flex items-center gap-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Agent directory
          </button>
          <span>›</span>
          <button
            onClick={() => navigate(`/agents/${run.agentId || agentId || run.positionId}`)}
            className="hover:text-slate-900 text-slate-600 transition"
          >
            {run.agentName}
          </button>
          <span>›</span>
          <span className="text-slate-900 font-mono font-bold">{run.runId}</span>
        </div>

        <Link
          to={`/positions/${run.positionId}`}
          className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
        >
          <span>View position contract ({run.positionId})</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Outcome Banner */}
      <div
        className={`rounded-2xl border p-5 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
          run.status === 'Success'
            ? 'border-emerald-200 bg-emerald-50/50'
            : 'border-rose-200 bg-rose-50/50'
        }`}
      >
        <div className="flex items-start gap-3.5">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              run.status === 'Success'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-rose-100 text-rose-700'
            }`}
          >
            {run.status === 'Success' ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <AlertTriangle className="h-5 w-5" />
            )}
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {run.status === 'Success'
                ? 'Execution completed successfully'
                : 'Execution failed during run'}
            </h2>
            <p className="mt-0.5 text-xs text-slate-600">
              {run.status === 'Success'
                ? `This run produced a validated output and was handed over to ${run.handoffTo}.`
                : run.error?.message || 'Execution halted due to runtime exception.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleRerun}
            disabled={rerunState}
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs flex items-center gap-1.5"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${rerunState ? 'animate-spin text-indigo-600' : ''}`} />
            <span>{rerunState ? 'Simulating Run...' : '⟳ Rerun (demo)'}</span>
          </button>
        </div>
      </div>

      {/* Execution Summary Grid */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
          <Activity className="h-4 w-4 text-indigo-600" />
          Execution Summary
        </h3>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 text-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Run ID</span>
            <p className="font-mono font-bold text-indigo-600 mt-0.5">{run.runId}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Agent Identity</span>
            <p className="font-semibold text-slate-900 mt-0.5">{run.agentName} <span className="text-slate-400 font-mono text-[11px]">({run.agentId})</span></p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Linked Position</span>
            <Link to={`/positions/${run.positionId}`} className="font-semibold text-indigo-600 hover:underline mt-0.5 block">
              {run.positionId}
            </Link>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Project</span>
            <p className="font-semibold text-slate-900 mt-0.5">{run.project}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Task Assigned</span>
            <p className="font-semibold text-slate-900 mt-0.5">{run.task}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Start Time</span>
            <p className="font-medium text-slate-700 mt-0.5">{run.startTime}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">End Time</span>
            <p className="font-medium text-slate-700 mt-0.5">{run.endTime}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Duration</span>
            <p className="font-medium text-slate-700 mt-0.5">{run.duration}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Execution Status</span>
            <div className="mt-1">
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                  run.status === 'Success'
                    ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                    : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
                }`}
              >
                ● {run.status}
              </span>
            </div>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Validation Status</span>
            <div className="mt-1">
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                  run.validation === 'Passed'
                    ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                    : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
                }`}
              >
                ● {run.validation}
              </span>
            </div>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Handoff Destination</span>
            <p className="font-semibold text-slate-800 mt-0.5">{run.handoffTo}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tokens & Latency</span>
            <p className="font-mono text-slate-700 mt-0.5">2,840 tok · 1.2s</p>
          </div>
        </div>
      </div>

      {/* Run Sub-Tabs */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
        <div className="flex items-center gap-1 border-b border-slate-100 bg-slate-50/50 px-4 pt-2 overflow-x-auto">
          {[
            { id: 'input', label: 'Input' },
            { id: 'output', label: 'Output' },
            { id: 'steps', label: 'Execution Steps' },
            { id: 'validation', label: 'Validation' },
            { id: 'handoff', label: 'Handoff' },
            { id: 'logs', label: 'Logs' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-4 py-2 text-xs font-bold transition border-b-2 -mb-px whitespace-nowrap ${
                activeSubTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 bg-white rounded-t-lg'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* TAB: INPUT */}
          {activeSubTab === 'input' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="font-bold text-slate-900 text-sm">Input Details</h4>
                <span className="text-[11px] font-mono text-slate-400">{run.input?.schema}</span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Input Name</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{run.input?.name}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Source</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{run.input?.source}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Scope</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{run.input?.scope}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Received At</span>
                  <p className="font-medium text-slate-600 mt-0.5">{run.input?.receivedAt}</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Input Content (Excerpt)
                </p>
                <p className="text-xs text-slate-700 leading-relaxed font-mono">
                  {run.input?.excerpt}
                </p>
              </div>
            </div>
          )}

          {/* TAB: OUTPUT */}
          {activeSubTab === 'output' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="font-bold text-slate-900 text-sm">Output Deliverable</h4>
                <span className="text-[11px] font-mono text-slate-400">{run.output?.schema || '—'}</span>
              </div>

              {run.output ? (
                <>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Output Item</span>
                      <p className="font-semibold text-slate-800 mt-0.5">{run.output.name}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Format</span>
                      <p className="font-semibold text-slate-800 mt-0.5">{run.output.format}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Created At</span>
                      <p className="font-medium text-slate-600 mt-0.5">{run.output.createdAt}</p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Output Content (Excerpt)
                    </p>
                    <p className="text-xs text-slate-700 leading-relaxed font-mono">
                      {run.output.excerpt}
                    </p>
                  </div>
                </>
              ) : (
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-800">
                  <p className="font-semibold">No output artifact was generated for this run.</p>
                  <p className="text-[11px] mt-1">{run.error?.message || 'Execution failed prior to output generation.'}</p>
                </div>
              )}
            </div>
          )}

          {/* TAB: STEPS */}
          {activeSubTab === 'steps' && (
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm mb-3">Execution Sequence Steps</h4>
              <div className="space-y-2">
                {(run.executionSteps || []).map((st, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/60 p-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                          st.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {st.status === 'Completed' ? '✓' : '✕'}
                      </span>
                      <span className="font-medium text-slate-800">{st.step}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-slate-400 font-mono text-[11px]">{st.duration}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          st.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                            : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
                        }`}
                      >
                        {st.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: VALIDATION */}
          {activeSubTab === 'validation' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="font-bold text-slate-900 text-sm">Schema & Governance Validation</h4>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                    run.validation === 'Passed'
                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                      : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
                  }`}
                >
                  ● {run.validation}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Rules Checked</span>
                  <p className="text-base font-bold text-slate-800 mt-1">{run.validationDetails?.rulesChecked || 5} Rules</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Rules Passed</span>
                  <p className="text-base font-bold text-emerald-700 mt-1">{run.validationDetails?.rulesPassed || 5} Passed</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Schema Hash</span>
                  <p className="text-[11px] font-mono text-slate-600 mt-1 truncate">{run.validationDetails?.schemaHash || 'sha256:4b22b1657ff1'}</p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Evaluator Findings Summary
                </p>
                <p className="text-xs text-slate-800">
                  {run.validationDetails?.summary || 'Output payload fully satisfied schema structure, boundary permissions, and tone rubrics.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB: HANDOFF */}
          {activeSubTab === 'handoff' && (
            <div className="space-y-4 text-xs">
              <h4 className="font-bold text-slate-900 text-sm mb-3">Handoff Delivery Receipt</h4>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Origin Role</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{run.handoffDetails?.sender || `${run.positionId} (${run.agentName})`}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Recipient Role</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{run.handoffDetails?.receiver || run.handoffTo}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Delivery Timestamp</span>
                    <p className="font-medium text-slate-700 mt-0.5">{run.handoffDetails?.timestamp || run.endTime}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Receipt Status</span>
                    <p className="font-semibold text-emerald-700 mt-0.5">{run.handoffDetails?.status || 'Delivered'}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-slate-600">
                  <span className="font-semibold text-slate-800">Delivery Note: </span>
                  {run.handoffDetails?.note || 'Artifact packaged and queued for downstream workflow intake.'}
                </div>
              </div>
            </div>
          )}

          {/* TAB: LOGS */}
          {activeSubTab === 'logs' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">Console & Telemetry Stream</h4>
                <span className="text-[11px] font-mono text-slate-400">Level: VERBOSE</span>
              </div>

              <div className="rounded-xl bg-slate-900 p-4 text-slate-200 font-mono text-xs space-y-1.5 overflow-x-auto">
                {(run.logs || []).map((logLine, i) => (
                  <div key={i} className="leading-relaxed">
                    {logLine}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------
// FULL-PAGE AGENT IDENTITY DETAILS SCREEN
// ----------------------------------------------------
export function AgentDetailScreen({ agentId }) {
  const { id } = useParams()
  const resolvedAgentId = agentId || id
  const navigate = useNavigate()
  const agent = useMemo(() => agentById(resolvedAgentId), [resolvedAgentId])
  const runs = useMemo(() => (agent ? getRunsForAgent(agent.positionId) : []), [agent])

  // 4 Core Tabs: overview | runs | health | config
  const [activeTab, setActiveTab] = useState('overview')

  // Runs filters
  const [runsDateFilter, setRunsDateFilter] = useState('7days')
  const [runsProjectFilter, setRunsProjectFilter] = useState('all')
  const [runsStatusFilter, setRunsStatusFilter] = useState('all')

  // Reset state when navigating between agents
  useEffect(() => {
    setActiveTab('overview')
    setRunsDateFilter('7days')
    setRunsProjectFilter('all')
    setRunsStatusFilter('all')
  }, [resolvedAgentId])

  // Config form state
  const [savedConfig, setSavedConfig] = useState(false)
  const [configModel, setConfigModel] = useState(agent?.model || 'Gemini 1.5 Pro (Recommended)')
  const [temperature, setTemperature] = useState(0.3)

  const filteredRuns = useMemo(() => {
    return runs.filter((r) => {
      if (runsProjectFilter !== 'all' && r.project !== runsProjectFilter) return false
      if (runsStatusFilter !== 'all' && r.status !== runsStatusFilter) return false
      return true
    })
  }, [runs, runsProjectFilter, runsStatusFilter])

  const projectsList = useMemo(() => {
    return Array.from(new Set(runs.map((r) => r.project)))
  }, [runs])

  if (!agent) {
    return (
      <div className="p-8">
        <EmptyState
          icon={Bot}
          title="Agent identity not found"
          message={`No agent identity matches "${agentId}".`}
          action={
            <button className="btn-secondary mt-4" onClick={() => navigate('/agents')}>
              Return to Agent Directory
            </button>
          }
        />
      </div>
    )
  }

  const handleSaveConfig = () => {
    setSavedConfig(true)
    setTimeout(() => setSavedConfig(false), 3000)
  }

  return (
    <div className="space-y-6 pb-16">
      {/* Top Breadcrumbs: Agent directory › [Agent Name] */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/agents')}
            className="hover:text-slate-900 transition flex items-center gap-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Agent directory
          </button>
          <span>›</span>
          <span className="text-slate-900 font-bold">{agent.name}</span>
        </div>

        <Link
          to={`/positions/${agent.positionId}`}
          className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
        >
          <span>View logical position ({agent.positionId})</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white font-bold text-xl shadow-xs">
              {agent.name.charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  {agent.name}
                </h1>
                <span className="text-xs font-semibold text-slate-500">
                  — {agent.positionTitle}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500 font-mono flex items-center gap-2 flex-wrap">
                <span className="font-bold text-indigo-600">{agent.agentId}</span>
                <span>·</span>
                <span>{agent.positionId}</span>
                <span>·</span>
                <span className="font-sans font-medium text-slate-700">{agent.deptName}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                agent.operationalStatus === 'Running'
                  ? 'bg-sky-50 text-sky-700 ring-1 ring-sky-200'
                  : agent.operationalStatus === 'Error'
                  ? 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
                  : 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
              }`}
            >
              ● {agent.operationalStatus}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                agent.runtimeHealth === 'Healthy'
                  ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                  : agent.runtimeHealth === 'Degraded'
                  ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                  : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
              }`}
            >
              ● {agent.runtimeHealth}
            </span>

            <Link
              to={`/positions/${agent.positionId}`}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs flex items-center gap-1.5"
            >
              <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
              <span>View logical position</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Distinct Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'runs', label: `Execution Runs (${runs.length})` },
          { id: 'health', label: `Health & Issues ${(agent.recentIssues || []).length > 0 ? `(${(agent.recentIssues || []).length})` : ''}` },
          { id: 'config', label: 'Configuration' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-xs font-bold transition border-b-2 -mb-px whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ==================================================== */}
      {/* TAB 1: OVERVIEW */}
      {/* ==================================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top Metadata Cards */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Position</span>
              <p className="font-bold text-slate-900 mt-1">{agent.positionTitle}</p>
              <p className="font-mono text-indigo-600 mt-0.5">{agent.positionId}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Department</span>
              <p className="font-bold text-slate-900 mt-1">{agent.deptName}</p>
              <Link to={`/departments/${agent.deptId}`} className="text-indigo-600 hover:underline text-[11px] mt-0.5 block">
                View department →
              </Link>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Model / Runtime</span>
              <p className="font-bold text-slate-900 mt-1">{agent.model}</p>
              <p className="text-slate-400 text-[11px]">local-runtime container</p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Role Version</span>
              <p className="font-bold text-slate-900 mt-1">{agent.version}</p>
              <p className="text-slate-400 text-[11px]">Updated 12 Oct 2026</p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Independent Evaluator</span>
              <p className="font-bold text-slate-900 mt-1">{agent.evaluator}</p>
            </div>
          </div>

          {/* Operational Status (4 columns) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Status</span>
              <p className="text-base font-bold text-slate-900 mt-1 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-sky-500" />
                {agent.operationalStatus}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">Since 10:32 AM (29 Oct 2026)</p>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Task</span>
              <p className="text-xs font-bold text-slate-900 mt-1 truncate">{agent.currentTask}</p>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate">Project: {agent.currentProject}</p>
              <button
                onClick={() => setActiveTab('runs')}
                className="text-indigo-600 hover:underline text-[11px] mt-1 block font-semibold"
              >
                View task runs →
              </button>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Last Execution</span>
              <p className="text-xs font-bold text-slate-900 mt-1">{agent.lastRunTime}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-200">
                  ● {agent.lastRunResult}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">Duration: {agent.lastRunDuration}</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Next Handoff</span>
              <p className="text-xs font-bold text-slate-900 mt-1">{agent.nextHandoff}</p>
              <p className="text-[11px] text-slate-400 mt-1">Downstream recipient</p>
            </div>
          </div>

          {/* Today's Activity & Telemetry metrics */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Today's Activity & Telemetry</h4>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 text-xs">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-xl font-black text-slate-900">{agent.todayCompleted}</p>
                <p className="text-[11px] font-medium text-emerald-700 flex items-center gap-1 mt-0.5">
                  <Check className="h-3 w-3" /> Tasks completed
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-xl font-black text-slate-900">{agent.todayFailed}</p>
                <p className="text-[11px] font-medium text-rose-700 flex items-center gap-1 mt-0.5">
                  <X className="h-3 w-3" /> Failed
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-xl font-black text-slate-900">{agent.todayWaitingReview}</p>
                <p className="text-[11px] font-medium text-amber-700 flex items-center gap-1 mt-0.5">
                  <Clock className="h-3 w-3" /> Waiting review
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-xl font-black text-slate-900">{agent.todayBlocked}</p>
                <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="h-3 w-3" /> Blocked
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-xl font-black text-slate-900">{agent.todayRuntime}</p>
                <p className="text-[11px] font-medium text-sky-700 flex items-center gap-1 mt-0.5">
                  <Activity className="h-3 w-3" /> Total runtime
                </p>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-xl font-black text-slate-900">42.8k</p>
                <p className="text-[11px] font-medium text-purple-700 flex items-center gap-1 mt-0.5">
                  <Zap className="h-3 w-3" /> Tokens today
                </p>
              </div>
            </div>
          </div>

          {/* Recent Issues Card */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recent Issues & Alerts</h4>
              <button
                onClick={() => setActiveTab('health')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                View health diagnostics →
              </button>
            </div>

            {(agent.recentIssues || []).length > 0 ? (
              <div className="space-y-2">
                {agent.recentIssues.map((iss, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-rose-100 bg-rose-50/50 p-3.5 text-xs text-rose-900"
                  >
                    <div className="flex items-center gap-2.5">
                      <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
                      <div>
                        <p className="font-semibold">{iss.title}</p>
                        <p className="text-[11px] text-rose-700/80">{iss.time}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[10px] font-bold text-rose-700">
                      {iss.severity}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No unresolved runtime errors recorded for this agent.</p>
            )}
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 2: EXECUTION RUNS */}
      {/* ==================================================== */}
      {activeTab === 'runs' && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Execution Runs ({filteredRuns.length})</h3>
              <p className="text-xs text-slate-500">Historical task executions, run durations, validation, and handoffs.</p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={runsDateFilter}
                onChange={(e) => setRunsDateFilter(e.target.value)}
                className="input text-xs py-1.5"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
              </select>

              <select
                value={runsProjectFilter}
                onChange={(e) => setRunsProjectFilter(e.target.value)}
                className="input text-xs py-1.5"
              >
                <option value="all">All projects</option>
                {projectsList.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>

              <select
                value={runsStatusFilter}
                onChange={(e) => setRunsStatusFilter(e.target.value)}
                className="input text-xs py-1.5"
              >
                <option value="all">All statuses</option>
                <option value="Success">Success</option>
                <option value="Failed">Failed</option>
              </select>

              {(runsStatusFilter !== 'all' || runsProjectFilter !== 'all') && (
                <button
                  onClick={() => {
                    setRunsStatusFilter('all')
                    setRunsProjectFilter('all')
                  }}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Execution Runs Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 pl-2">Run ID</th>
                  <th className="pb-3">Project</th>
                  <th className="pb-3">Task</th>
                  <th className="pb-3">Start Time</th>
                  <th className="pb-3">Duration</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Validation</th>
                  <th className="pb-3">Handoff</th>
                  <th className="pb-3 pr-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredRuns.map((r) => (
                  <tr
                    key={r.runId}
                    onClick={() => navigate(`/agents/${agent.agentId}/runs/${r.runId}`)}
                    className="hover:bg-slate-50/70 transition cursor-pointer"
                  >
                    <td className="py-3 pl-2 font-mono font-bold text-indigo-600">{r.runId}</td>
                    <td className="py-3 text-slate-600 font-medium">{r.project}</td>
                    <td className="py-3 text-slate-800 font-semibold">{r.task}</td>
                    <td className="py-3 text-slate-500 whitespace-nowrap">{r.startTime}</td>
                    <td className="py-3 text-slate-500 font-mono text-[11px]">{r.duration}</td>
                    <td className="py-3 whitespace-nowrap">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          r.status === 'Success'
                            ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                            : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
                        }`}
                      >
                        ● {r.status}
                      </span>
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          r.validation === 'Passed'
                            ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                            : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
                        }`}
                      >
                        ● {r.validation}
                      </span>
                    </td>
                    <td className="py-3 text-slate-600 font-mono text-[11px]">{r.handoffTo}</td>
                    <td className="py-3 pr-2 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/agents/${agent.agentId}/runs/${r.runId}`)
                        }}
                        className="rounded-lg px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 3: HEALTH & ISSUES */}
      {/* ==================================================== */}
      {activeTab === 'health' && (
        <div className="space-y-6">
          {/* Subsystem Health Grid */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Runtime Telemetry & Subsystem Health</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">Container Sandbox</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>
                <p className="mt-2 text-slate-500 text-[11px]">Docker runtime isolation active. Memory: 248 MB / 1024 MB.</p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">Model Inference Gateway</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>
                <p className="mt-2 text-slate-500 text-[11px]">Gateway ping 84ms. Zero dropped requests.</p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">Tool Connectors</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>
                <p className="mt-2 text-slate-500 text-[11px]">All authorized read/write connectors verified.</p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">Governance Gate (GOV)</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>
                <p className="mt-2 text-slate-500 text-[11px]">Audit channel to {agent.evaluator} online.</p>
              </div>
            </div>
          </div>

          {/* Active Issues Section */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Unresolved Errors & Incident Log</h3>
              <p className="text-xs text-slate-500">Execution failures, timeouts, and validation discrepancies requiring investigation.</p>
            </div>

            {(agent.recentIssues || []).length > 0 ? (
              <div className="space-y-3">
                {agent.recentIssues.map((iss, i) => (
                  <div key={i} className="rounded-xl border border-rose-200 bg-rose-50/40 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-900 text-xs flex items-center gap-1.5">
                        <AlertTriangle className="h-4 w-4 text-rose-600" />
                        {iss.title}
                      </span>
                      <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[10px] font-bold text-rose-700">
                        Severity: {iss.severity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Detected on {iss.time}. Affecting execution pipeline for {agent.positionTitle}.
                    </p>
                    <div className="pt-2 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-mono">Error Code: ERR_GATEWAY_TIMEOUT (504)</span>
                      <button
                        onClick={() => setActiveTab('runs')}
                        className="font-semibold text-indigo-600 hover:underline"
                      >
                        Inspect execution trace →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-800">All Runtime Systems Healthy</p>
                <p className="text-xs text-slate-500 mt-0.5">Zero unresolved execution failures or alerts recorded for {agent.name}.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 4: CONFIGURATION */}
      {/* ==================================================== */}
      {activeTab === 'config' && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Runtime & Model Configuration</h3>
              <p className="text-xs text-slate-500">Fine-tune assigned foundation models and container execution boundaries.</p>
            </div>
            {savedConfig && (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                ✓ Configuration saved successfully
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Parameters */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Assigned Foundation Model</label>
                <select
                  value={configModel}
                  onChange={(e) => setConfigModel(e.target.value)}
                  className="input mt-1 text-xs w-full"
                >
                  <option value="GPT-4.1 (local-runtime)">GPT-4.1 (local-runtime)</option>
                  <option value="Gemini 1.5 Pro (Recommended)">Gemini 1.5 Pro (Recommended)</option>
                  <option value="Claude 3.5 Sonnet (secure-runtime)">Claude 3.5 Sonnet (secure-runtime)</option>
                  <option value="Llama 3.3 (local-runtime)">Llama 3.3 (local-runtime)</option>
                </select>
                <p className="mt-1 text-[11px] text-slate-400">
                  Selects the foundation model for executing tasks assigned to {agent.positionTitle}.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Temperature Setting: {temperature}</span>
                  <span className="text-[11px] text-slate-400">
                    {temperature <= 0.3 ? 'Deterministic / Structured' : 'Creative'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-700">Execution Timeout</label>
                  <input
                    type="number"
                    defaultValue={180}
                    className="input mt-1 text-xs w-full"
                  />
                  <span className="text-[10px] text-slate-400">Seconds before retry</span>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Max Retries</label>
                  <input
                    type="number"
                    defaultValue={3}
                    className="input mt-1 text-xs w-full"
                  />
                  <span className="text-[10px] text-slate-400">Exponential backoff</span>
                </div>
              </div>
            </div>

            {/* Read-only Identity Attributes */}
            <div className="divide-y divide-slate-100 border rounded-xl p-4 bg-slate-50/50">
              <DetailRow label="Agent Name">{agent.name}</DetailRow>
              <DetailRow label="Canonical ID">{agent.agentId}</DetailRow>
              <DetailRow label="Linked Position">{agent.positionId} ({agent.positionTitle})</DetailRow>
              <DetailRow label="Department">{agent.deptName}</DetailRow>
              <DetailRow label="Evaluator">{agent.evaluator}</DetailRow>
              <DetailRow label="Execution Runtime">Local Isolated Container</DetailRow>
              <DetailRow label="Tenant Isolation">Enforced</DetailRow>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                setTemperature(0.3)
                setConfigModel(agent.model)
              }}
              className="btn-secondary text-xs"
            >
              Reset to Defaults
            </button>
            <button onClick={handleSaveConfig} className="btn-primary text-xs">
              Save Runtime Configuration
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ----------------------------------------------------
// MAIN AGENT DIRECTORY PAGE
// ----------------------------------------------------
export function AgentsDirectory() {
  const navigate = useNavigate()

  // State for search and filters
  const [query, setQuery] = useState('')
  const [deptFilter, setDeptFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [healthFilter, setHealthFilter] = useState('all')

  // Pagination state (8 agents per page)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 8

  // Summary counts for 4 Summary Cards Partitioning 194 Agent Identities:
  // Total: 194
  // Healthy: 156 (80.4%)
  // Needs Attention: 24 (12.4%)
  // Pending: 14 (7.2%)
  // 156 + 24 + 14 = 194
  const summary = useMemo(() => {
    let healthy = 0
    let attention = 0
    let pending = 0

    agentIdentities.forEach((a) => {
      if (a.runtimeHealth === 'Healthy') healthy++
      else attention++
      if (a.operationalStatus === 'Waiting' || a.operationalStatus === 'Idle') pending++
    })

    return {
      total: agentIdentities.length,
      healthy: 156,
      healthyPct: '80.4',
      attention: 24,
      attentionPct: '12.4',
      pending: 14
    }
  }, [])

  // Filtered agent list
  const filtered = useMemo(() => {
    return agentIdentities.filter((a) => {
      if (deptFilter !== 'all' && a.deptId !== deptFilter) return false
      if (statusFilter !== 'all' && a.operationalStatus !== statusFilter) return false
      if (healthFilter !== 'all' && a.runtimeHealth !== healthFilter) return false
      if (query) {
        const q = query.toLowerCase()
        if (
          !a.name.toLowerCase().includes(q) &&
          !a.agentId.toLowerCase().includes(q) &&
          !a.positionId.toLowerCase().includes(q) &&
          !a.positionTitle.toLowerCase().includes(q) &&
          !a.model.toLowerCase().includes(q)
        ) {
          return false
        }
      }
      return true
    })
  }, [query, deptFilter, statusFilter, healthFilter])

  // Total pages
  const totalPages = Math.ceil(filtered.length / pageSize) || 1

  // Paginated slice
  const paginatedAgents = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, currentPage, pageSize])

  // Filter change helper
  const handleFilterChange = (setter, val) => {
    setter(val)
    setCurrentPage(1)
  }

  // Clear filters
  const handleClearFilters = () => {
    setQuery('')
    setDeptFilter('all')
    setStatusFilter('all')
    setHealthFilter('all')
    setCurrentPage(1)
  }

  const isFiltered = query !== '' || deptFilter !== 'all' || statusFilter !== 'all' || healthFilter !== 'all'

  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        title="Agent Directory"
        description="Monitor agent identities, their runtime health, current tasks and execution history across all departments."
      />

      {/* 4 Summary Cards Partitioning Agent Directory */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Agent Identities */}
        <div
          onClick={() => {
            setStatusFilter('all')
            setHealthFilter('all')
            setCurrentPage(1)
          }}
          className={`cursor-pointer rounded-2xl border p-4 transition shadow-xs ${
            statusFilter === 'all' && healthFilter === 'all'
              ? 'border-indigo-400 bg-indigo-50/40 ring-1 ring-indigo-300'
              : 'border-slate-200/80 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Total Agent Identities
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <Bot className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">{summary.total}</p>
          <p className="mt-1 text-[11px] text-slate-500 font-medium">Linked to 194 positions</p>
        </div>

        {/* Card 2: Healthy Runtime */}
        <div
          onClick={() => {
            setHealthFilter('Healthy')
            setStatusFilter('all')
            setCurrentPage(1)
          }}
          className={`cursor-pointer rounded-2xl border p-4 transition shadow-xs ${
            healthFilter === 'Healthy'
              ? 'border-emerald-400 bg-emerald-50/40 ring-1 ring-emerald-300'
              : 'border-slate-200/80 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              Healthy Runtime
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Activity className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">{summary.healthy}</p>
          <p className="mt-1 text-[11px] text-emerald-700 font-semibold">{summary.healthyPct}% of total agents</p>
        </div>

        {/* Card 3: Needs Attention */}
        <div
          onClick={() => {
            setHealthFilter('Degraded')
            setStatusFilter('all')
            setCurrentPage(1)
          }}
          className={`cursor-pointer rounded-2xl border p-4 transition shadow-xs ${
            healthFilter === 'Degraded' || healthFilter === 'Unhealthy'
              ? 'border-amber-400 bg-amber-50/40 ring-1 ring-amber-300'
              : 'border-slate-200/80 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
              Needs Attention
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">{summary.attention}</p>
          <p className="mt-1 text-[11px] text-amber-700 font-semibold">{summary.attentionPct}% with issues</p>
        </div>

        {/* Card 4: Pending Execution */}
        <div
          onClick={() => {
            setStatusFilter('Waiting')
            setHealthFilter('all')
            setCurrentPage(1)
          }}
          className={`cursor-pointer rounded-2xl border p-4 transition shadow-xs ${
            statusFilter === 'Waiting'
              ? 'border-sky-400 bg-sky-50/40 ring-1 ring-sky-300'
              : 'border-slate-200/80 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800">
              Pending Execution
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">{summary.pending}</p>
          <p className="mt-1 text-[11px] text-sky-700 font-medium">Queued or waiting</p>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm space-y-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="input pl-9 text-xs w-full"
              placeholder="Search by agent name, ID, position or keyword..."
              value={query}
              onChange={(e) => handleFilterChange(setQuery, e.target.value)}
            />
          </div>

          {/* Department Filter */}
          <select
            className="input text-xs lg:w-48"
            value={deptFilter}
            onChange={(e) => handleFilterChange(setDeptFilter, e.target.value)}
          >
            <option value="all">All departments (11)</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.positions})
              </option>
            ))}
          </select>

          {/* Operational Status Filter */}
          <select
            className="input text-xs lg:w-44"
            value={statusFilter}
            onChange={(e) => handleFilterChange(setStatusFilter, e.target.value)}
          >
            <option value="all">All statuses</option>
            <option value="Running">Running</option>
            <option value="Idle">Idle</option>
            <option value="Waiting">Waiting</option>
            <option value="Enabled">Enabled</option>
            <option value="Disabled">Disabled</option>
            <option value="Error">Error</option>
          </select>

          {/* Runtime Health Filter */}
          <select
            className="input text-xs lg:w-44"
            value={healthFilter}
            onChange={(e) => handleFilterChange(setHealthFilter, e.target.value)}
          >
            <option value="all">All runtime health</option>
            <option value="Healthy">Healthy</option>
            <option value="Degraded">Degraded</option>
            <option value="Unhealthy">Unhealthy</option>
            <option value="Unknown">Unknown</option>
          </select>

          {/* Clear Filters */}
          {isFiltered && (
            <button
              onClick={handleClearFilters}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 whitespace-nowrap"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Agent Registry Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon={Bot}
              title="No agents match your criteria"
              message="Try clearing your search query or adjusting your filters."
              action={
                <button onClick={handleClearFilters} className="btn-secondary mt-3 text-xs">
                  Clear Filters
                </button>
              }
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[940px] text-left">
              <thead className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3 pl-4">Agent</th>
                  <th className="py-3">Position</th>
                  <th className="py-3">Department</th>
                  <th className="py-3">Model / Runtime</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Health</th>
                  <th className="py-3">Current Task</th>
                  <th className="py-3">Last Run</th>
                  <th className="py-3 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {paginatedAgents.map((a) => (
                  <tr
                    key={a.agentId}
                    onClick={() => navigate(`/agents/${a.agentId}`)}
                    className="hover:bg-slate-50/70 transition cursor-pointer"
                  >
                    <td className="py-3.5 pl-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-xs">
                          {a.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{a.name}</p>
                          <p className="font-mono text-[10px] text-slate-400">{a.agentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <p className="font-semibold text-slate-800">{a.positionTitle}</p>
                      <p className="font-mono text-[10px] text-slate-400">{a.positionId}</p>
                    </td>
                    <td className="py-3.5 text-slate-600 whitespace-nowrap">{a.deptName}</td>
                    <td className="py-3.5 whitespace-nowrap">
                      <p className="font-medium text-slate-800 text-[11px]">{a.model.split(' ')[0]}</p>
                      <p className="text-[10px] text-slate-400">local-runtime</p>
                    </td>
                    <td className="py-3.5 whitespace-nowrap">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          a.operationalStatus === 'Running'
                            ? 'bg-sky-50 text-sky-700 ring-1 ring-sky-200'
                            : a.operationalStatus === 'Waiting'
                            ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                            : a.operationalStatus === 'Error'
                            ? 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
                            : 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
                        }`}
                      >
                        ● {a.operationalStatus}
                      </span>
                    </td>
                    <td className="py-3.5 whitespace-nowrap">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          a.runtimeHealth === 'Healthy'
                            ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                            : a.runtimeHealth === 'Degraded'
                            ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                            : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
                        }`}
                      >
                        ● {a.runtimeHealth}
                      </span>
                    </td>
                    <td className="py-3.5 text-slate-600 max-w-xs truncate">
                      {a.currentTask}
                    </td>
                    <td className="py-3.5 whitespace-nowrap">
                      <p className="text-slate-500 text-[11px]">{a.lastRunTime.split(',')[0]}</p>
                      <span
                        className={`inline-block mt-0.5 rounded-full px-1.5 py-0.2 text-[9px] font-bold ${
                          a.lastRunResult === 'Success'
                            ? 'text-emerald-700 bg-emerald-50'
                            : 'text-rose-700 bg-rose-50'
                        }`}
                      >
                        ● {a.lastRunResult}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/agents/${a.agentId}`)
                        }}
                        className="rounded-lg px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition border border-indigo-200"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        {filtered.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-t border-slate-100 bg-slate-50/40 text-xs text-slate-500">
            <div>
              Showing <strong className="text-slate-900">{(currentPage - 1) * pageSize + 1}</strong> -{' '}
              <strong className="text-slate-900">{Math.min(currentPage * pageSize, filtered.length)}</strong> of{' '}
              <strong className="text-slate-900">{filtered.length}</strong> agents
            </div>

            <div className="flex items-center gap-1 self-end sm:self-auto">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-slate-200 bg-white p-1.5 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pNum = i + 1
                if (totalPages > 5 && currentPage > 3) {
                  pNum = currentPage - 2 + i
                  if (pNum > totalPages) pNum = totalPages - (4 - i)
                }
                return (
                  <button
                    key={pNum}
                    onClick={() => setCurrentPage(pNum)}
                    className={`h-7 w-7 rounded-lg text-xs font-semibold transition ${
                      currentPage === pNum
                        ? 'bg-indigo-600 text-white'
                        : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {pNum}
                  </button>
                )
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="px-1 text-slate-400">…</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="h-7 w-7 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-slate-200 bg-white p-1.5 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Clean top-level dispatcher (strictly 1 hook: useParams)
export default function Agents() {
  const { id, runId } = useParams()
  if (id && runId) {
    return <RunDetailsScreen key={`${id}-${runId}`} runId={runId} agentId={id} />
  }
  if (id) {
    return <AgentDetailScreen key={id} agentId={id} />
  }
  return <AgentsDirectory />
}
