import { useState, useMemo, useEffect } from 'react'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import {
  Users, Search, ArrowLeft, ShieldCheck, GitBranch, Plug, Target,
  FileOutput, FileInput, AlertTriangle, CheckCircle2, Clock, Check,
  ChevronRight, ChevronLeft, ExternalLink, Calendar, Info, Layers, Folder,
  Activity, ArrowRight, FileText, Send, UserCheck, ShieldAlert, X,
  Filter, RotateCcw, Sliders, Sparkles, Cpu, Award, ListTodo,
  HelpCircle, CheckSquare, Square, Eye, Shield, AlertCircle, Bot
} from 'lucide-react'
import { PageHeader, Badge, StatusBadge, EmptyState, Drawer, DetailRow } from '../components/ui'
import { departments, deptById } from '../data/departments'
import { positions, positionById } from '../data/positions'
import {
  authorityLevelMap,
  getAuthorityDisplay,
  getPositionDetail
} from '../data/positionsData'
import { getPositionActivityLogs, agentById } from '../data/agentActivityData'

// ----------------------------------------------------
// AUTHORITY TOOLTIP / BADGE COMPONENT
// ----------------------------------------------------
export function AuthorityBadge({ authCode }) {
  const [open, setOpen] = useState(false)
  const auth = getAuthorityDisplay(authCode)

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setOpen(!open)
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset transition ${auth.badgeClass}`}
      >
        <ShieldCheck className="h-3 w-3 shrink-0" />
        <span>{auth.label}</span>
      </button>

      {open && (
        <div
          className="absolute z-50 left-0 top-full mt-1.5 w-80 rounded-xl border border-slate-200 bg-white p-3.5 shadow-xl ring-1 ring-black/5 text-left text-xs"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-indigo-600" />
              {auth.label}
            </span>
            <span className="text-[10px] font-mono text-slate-400">Class {authCode}</span>
          </div>
          <p className="mt-2 text-slate-600 leading-relaxed text-[11px]">{auth.desc}</p>

          <div className="mt-3 space-y-2 pt-2 border-t border-slate-100 text-[11px]">
            <div>
              <p className="font-bold text-emerald-700 flex items-center gap-1">
                <Check className="h-3 w-3" /> What it can do:
              </p>
              <p className="text-slate-600 mt-0.5 pl-4">{auth.canDo}</p>
            </div>
            <div>
              <p className="font-bold text-rose-700 flex items-center gap-1">
                <X className="h-3 w-3" /> What it cannot do:
              </p>
              <p className="text-slate-600 mt-0.5 pl-4">{auth.cannotDo}</p>
            </div>
            <div>
              <p className="font-bold text-amber-700 flex items-center gap-1">
                <Shield className="h-3 w-3" /> Requires Approval:
              </p>
              <p className="text-slate-600 mt-0.5 pl-4">{auth.approvalReq}</p>
            </div>
            <div>
              <p className="font-bold text-indigo-700 flex items-center gap-1">
                <Plug className="h-3 w-3" /> External Effects:
              </p>
              <p className="text-slate-600 mt-0.5 pl-4">{auth.externalEffects}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ----------------------------------------------------
// FULL-PAGE POSITION DETAILS SCREEN
// ----------------------------------------------------
export function PositionDetailScreen({ positionId }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const posId = positionId || id
  
  // Retrieve comprehensive data for this position (safely normalized)
  const detail = useMemo(() => getPositionDetail(posId), [posId])

  // Active navigation tab:
  // 1: responsibilities | 2: projects-tasks | 3: inputs-outputs | 4: activity-logs
  const [activeTab, setActiveTab] = useState('responsibilities')

  // Selected project for project-specific tabs
  const [selectedProjectId, setSelectedProjectId] = useState(
    detail?.activeProjects?.[0]?.id || null
  )

  // Document inspection modal state (inputs or outputs)
  const [inspectDoc, setInspectDoc] = useState(null)

  // Task inspection modal state
  const [inspectTask, setInspectTask] = useState(null)

  // Activity logs inspection modal state
  const [selectedLogEvent, setSelectedLogEvent] = useState(null)

  // Completed vs Active toggle on Projects tab
  const [projectsFilter, setProjectsFilter] = useState('active')

  // Ensure state resets cleanly when switching between positions
  useEffect(() => {
    setActiveTab('responsibilities')
    setSelectedProjectId((detail?.activeProjects || [])[0]?.id || null)
    setInspectDoc(null)
    setInspectTask(null)
    setSelectedLogEvent(null)
    setProjectsFilter('active')
  }, [posId])

  // Tasks search & status filter
  const [taskQuery, setTaskQuery] = useState('')
  const [taskStatusFilter, setTaskStatusFilter] = useState('all')

  // Activity history & logs filters
  const [activityDateRange, setActivityDateRange] = useState('7days')
  const [customStart, setCustomStart] = useState('2026-10-23')
  const [customEnd, setCustomEnd] = useState('2026-10-29')
  const [activityProjectFilter, setActivityProjectFilter] = useState('all')
  const [activityTypeFilter, setActivityTypeFilter] = useState('all')
  const [activityStatusFilter, setActivityStatusFilter] = useState('all')
  const [activitySearchQuery, setActivitySearchQuery] = useState('')

  // Find active project object safely
  const activeProjectsList = detail?.activeProjects || []
  const activeProject = useMemo(() => {
    if (!activeProjectsList.length) return null
    if (!selectedProjectId) return activeProjectsList[0] || null
    return (
      activeProjectsList.find((p) => p.id === selectedProjectId) ||
      activeProjectsList[0] ||
      null
    )
  }, [activeProjectsList, selectedProjectId])

  // Filter tasks safely
  const tasksList = detail?.tasks || []
  const filteredTasks = useMemo(() => {
    return tasksList.filter((t) => {
      if (taskStatusFilter !== 'all' && t.status !== taskStatusFilter) return false
      if (taskQuery) {
        const q = taskQuery.toLowerCase()
        if (
          !t.title?.toLowerCase().includes(q) &&
          !t.id?.toLowerCase().includes(q) &&
          !t.project?.toLowerCase().includes(q)
        ) {
          return false
        }
      }
      return true
    })
  }, [tasksList, taskQuery, taskStatusFilter])

  // Activity logs data derived from date selection
  const activityData = useMemo(() => {
    if (!detail) return { events: [], summary: { total: 0, byType: {}, byStatus: {} } }
    return getPositionActivityLogs(detail.positionId, activityDateRange, customStart, customEnd)
  }, [detail, activityDateRange, customStart, customEnd])

  // Filtered activity events
  const filteredActivityEvents = useMemo(() => {
    return (activityData.events || []).filter((evt) => {
      if (activityProjectFilter !== 'all' && evt.project !== activityProjectFilter) return false
      if (activityTypeFilter !== 'all' && evt.type !== activityTypeFilter) return false
      if (activityStatusFilter !== 'all' && evt.status !== activityStatusFilter) return false
      if (activitySearchQuery) {
        const q = activitySearchQuery.toLowerCase()
        if (
          !evt.title?.toLowerCase().includes(q) &&
          !evt.description?.toLowerCase().includes(q) &&
          !evt.project?.toLowerCase().includes(q)
        ) {
          return false
        }
      }
      return true
    })
  }, [activityData.events, activityProjectFilter, activityTypeFilter, activityStatusFilter, activitySearchQuery])

  // Group events by date for timeline view
  const eventsByDate = useMemo(() => {
    const groups = {}
    filteredActivityEvents.forEach((evt) => {
      const d = evt.displayDate || evt.date
      if (!groups[d]) groups[d] = []
      groups[d].push(evt)
    })
    return groups
  }, [filteredActivityEvents])

  // Unique projects from activity events
  const activityProjects = useMemo(() => {
    return Array.from(new Set((activityData.events || []).map((e) => e.project)))
  }, [activityData.events])

  // Formatted date range display pill
  const dateRangeDisplay = useMemo(() => {
    if (activityDateRange === 'today') return '📅 29 Oct 2026'
    if (activityDateRange === 'yesterday') return '📅 28 Oct 2026'
    if (activityDateRange === '7days') return '📅 23 Oct 2026 - 29 Oct 2026'
    if (activityDateRange === '30days') return '📅 30 Sep 2026 - 29 Oct 2026'
    if (activityDateRange === 'custom') return `📅 ${customStart} - ${customEnd}`
    return '📅 23 Oct 2026 - 29 Oct 2026'
  }, [activityDateRange, customStart, customEnd])

  if (!detail) {
    return (
      <div className="p-8">
        <EmptyState
          icon={Users}
          title="Position not found"
          message={`The requested position ID "${posId}" does not exist in the 194-position registry.`}
          action={
            <button className="btn-secondary mt-4" onClick={() => navigate('/positions')}>
              Return to Positions Registry
            </button>
          }
        />
      </div>
    )
  }

  const dept = deptById(detail.deptId)
  const auth = getAuthorityDisplay(detail.authority)
  const assignedAgent = agentById(detail.samAgId || detail.positionId)

  const workload = detail.workload || {
    activeProjects: activeProjectsList.length,
    completedProjects: (detail.completedProjects || []).length,
    assignedTasks: tasksList.length,
    waitingReview: 1,
    blockedTasks: 0,
    totalCompletedTasks: 18
  }

  return (
    <div className="space-y-6 pb-16">
      {/* Top Breadcrumbs: 194 Positions › [Department Name] › [Position Title] */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => navigate('/positions')}
            className="hover:text-slate-900 transition flex items-center gap-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> 194 Positions
          </button>
          <span>›</span>
          <Link
            to={`/departments/${detail.deptId}`}
            className="hover:text-slate-900 text-slate-600 transition"
          >
            {dept?.name || detail.deptId}
          </Link>
          <span>›</span>
          <span className="text-slate-900 font-bold">{detail.title}</span>
          <span className="font-mono text-slate-400">({detail.positionId})</span>
        </div>

        <button
          onClick={() => navigate(`/agents/${detail.samAgId || detail.positionId}`)}
          className="rounded-xl border border-indigo-200 bg-indigo-50/60 text-indigo-700 px-3.5 py-1.5 text-xs font-semibold hover:bg-indigo-100 transition shadow-2xs flex items-center gap-1.5"
        >
          <Bot className="h-3.5 w-3.5" />
          <span>View agent ({detail.samAgId})</span>
        </button>
      </div>

      {/* Position Header Banner */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 shadow-xs">
              <Users className="h-7 w-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  {detail.title}
                </h1>
                {detail.person && (
                  <span className="text-xs text-slate-400 font-medium">({detail.person})</span>
                )}
                {detail.isLead && (
                  <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 ring-1 ring-indigo-200">
                    Lead
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-500 font-mono flex items-center gap-2 flex-wrap">
                <span className="font-bold text-indigo-600">{detail.positionId}</span>
                <span>·</span>
                <span>{detail.samAgId}</span>
                <span>·</span>
                <span className="font-sans font-medium text-slate-700">{dept?.name || detail.deptId}</span>
              </p>
            </div>
          </div>

          {/* Right Badges & Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
            <StatusBadge status={detail.status} />
            <AuthorityBadge authCode={detail.authority} />
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-mono font-medium text-slate-600 ring-1 ring-slate-200">
              Role v{detail.version || '2.0'}
            </span>
            <button
              onClick={() => navigate(`/agents/${detail.samAgId || detail.positionId}`)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs"
            >
              View in Agent Directory
            </button>
          </div>
        </div>

        {/* 6 Metric Cards in a Row */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 pt-5 border-t border-slate-100">
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
              <Folder className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900">{workload.activeProjects}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Projects</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900">{workload.completedProjects}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completed Projects</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <ListTodo className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900">{workload.assignedTasks}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assigned Tasks</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900">{workload.waitingReview}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Waiting Review</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900">{workload.blockedTasks}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Failed / Blocked</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900">{workload.totalCompletedTasks}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completed Tasks</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Distinct Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto">
        {[
          { id: 'responsibilities', label: 'Responsibilities & Boundaries' },
          { id: 'projects-tasks', label: `Active Projects & Tasks (${activeProjectsList.length + (detail.completedProjects || []).length})` },
          { id: 'inputs-outputs', label: 'Inputs & Outputs' },
          { id: 'activity-logs', label: 'Activity Logs' }
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
      {/* TAB 1: RESPONSIBILITIES & BOUNDARIES */}
      {/* ==================================================== */}
      {activeTab === 'responsibilities' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left: Position Overview & Responsibilities */}
            <div className="lg:col-span-7 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-5">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Position Overview</h3>
                <h4 className="text-sm font-bold text-slate-900 mt-1">Core Purpose</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                  {detail.responsibilities?.[0] || 'Execute core domain responsibilities within approved authority boundaries.'}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Responsibilities</h4>
                <ul className="mt-2.5 space-y-2 text-xs text-slate-600">
                  {(detail.responsibilities || []).map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Input & Output Overview
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-xl border border-sky-100 bg-sky-50/50 p-3.5">
                    <p className="text-[11px] font-bold text-sky-900 uppercase tracking-wider flex items-center gap-1.5">
                      <FileInput className="h-3.5 w-3.5 text-sky-600" />
                      Typical Inputs Received
                    </p>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{detail.inputOverview || 'Task context packages, project briefs, and upstream deliverables.'}</p>
                  </div>
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3.5">
                    <p className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                      <FileOutput className="h-3.5 w-3.5 text-emerald-600" />
                      Typical Outputs Generated
                    </p>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{detail.outputOverview || 'Structured deliverables, status updates, and QA audit packages.'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Authority & Restrictions Card + Assigned Agent Card */}
            <div className="lg:col-span-5 space-y-6">
              {/* Authority Level Definition */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4">
                  <div className="flex items-center justify-between text-indigo-700 font-bold text-xs uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4" />
                      {auth.label}
                    </span>
                    <span className="font-mono text-[10px]">Class {detail.authority}</span>
                  </div>
                  <p className="mt-2 text-xs text-indigo-950 leading-relaxed">
                    {auth.desc}
                  </p>

                  <div className="mt-3.5 space-y-2 border-t border-indigo-100 pt-3 text-[11px]">
                    <div>
                      <span className="font-bold text-emerald-700">What it can do: </span>
                      <span className="text-slate-600">{auth.canDo}</span>
                    </div>
                    <div>
                      <span className="font-bold text-rose-700">What it cannot do: </span>
                      <span className="text-slate-600">{auth.cannotDo}</span>
                    </div>
                    <div>
                      <span className="font-bold text-amber-700">Actions requiring approval: </span>
                      <span className="text-slate-600">{auth.approvalReq}</span>
                    </div>
                    <div>
                      <span className="font-bold text-indigo-700">External system effects: </span>
                      <span className="text-slate-600">{auth.externalEffects}</span>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  <DetailRow label="Department">{dept?.name || detail.deptId}</DetailRow>
                  <DetailRow label="Canonical ID">{detail.samAgId}</DetailRow>
                  <DetailRow label="Independent Evaluator">{detail.evaluator || 'GOV-002'}</DetailRow>
                  <DetailRow label="Assigned Model">{detail.model || 'Gemini 1.5 Pro'}</DetailRow>
                  <DetailRow label="Execution Tools">
                    <div className="flex flex-wrap gap-1">
                      {(detail.tools || []).map((t) => (
                        <code key={t} className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-700">
                          {t}
                        </code>
                      ))}
                    </div>
                  </DetailRow>
                </div>
              </div>

              {/* Assigned Agent Card */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Assigned Agent Identity</span>
                  <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 ring-1 ring-indigo-200">
                    Live Runtime
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-base shadow-xs">
                    {assignedAgent?.name?.charAt(0) || detail.title.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{assignedAgent?.name || detail.title}</h4>
                    <p className="text-xs text-slate-500 font-mono">
                      <span>{detail.samAgId}</span> · <span>{assignedAgent?.model?.split(' ')[0] || 'GPT-4.1'}</span>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Operational Status</span>
                    <p className="font-semibold text-slate-800 mt-0.5 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                      {assignedAgent?.operationalStatus || 'Running'}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">Runtime Health</span>
                    <p className="font-semibold text-emerald-700 mt-0.5 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {assignedAgent?.runtimeHealth || 'Healthy'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/agents/${detail.samAgId || detail.positionId}`)}
                  className="w-full mt-2 rounded-xl border border-indigo-200 bg-indigo-50/60 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition flex items-center justify-center gap-1.5"
                >
                  <Bot className="h-3.5 w-3.5" />
                  <span>Open in Agent Directory →</span>
                </button>
              </div>
            </div>
          </div>

          {/* Role Dependencies Architecture */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Role Dependencies Architecture</h3>
              <p className="text-xs text-slate-500">
                Interactive upstream briefings and downstream delivery / QA handoff connections. Click any role to navigate directly.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* 1. Upstream Roles (Inputs) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700">
                  <FileInput className="h-4 w-4" />
                  <span>Upstream Roles (Inputs)</span>
                </div>
                <div className="space-y-3">
                  {(detail.dependencies?.upstream || []).map((up) => (
                    <div
                      key={up.positionId}
                      onClick={() => navigate(`/positions/${up.positionId}`)}
                      className="cursor-pointer rounded-xl border border-sky-100 bg-sky-50/40 p-4 hover:border-sky-300 hover:bg-sky-50/80 transition"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-sky-800 text-xs">{up.positionId}</span>
                        <AuthorityBadge authCode={up.authority} />
                      </div>
                      <h5 className="font-bold text-slate-900 text-xs mt-1">{up.title}</h5>
                      <p className="mt-1 text-[11px] text-slate-600">{up.relationship}</p>
                      <div className="mt-2 pt-2 border-t border-sky-100 text-[10px] text-sky-900 font-semibold flex items-center justify-between">
                        <span>Artifact: {up.artifact}</span>
                        <ArrowRight className="h-3 w-3 text-sky-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Current Position (Execution) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700">
                  <Cpu className="h-4 w-4" />
                  <span>Current Role Transformation</span>
                </div>
                <div className="rounded-xl border-2 border-indigo-300 bg-indigo-50/50 p-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-indigo-700 text-xs">{detail.positionId}</span>
                    <AuthorityBadge authCode={detail.authority} />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mt-2">{detail.title}</h4>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {detail.dependencies?.current?.coreTransform || 'Transforms verified inputs into structured deliverables according to defined rubrics.'}
                  </p>

                  <div className="mt-4 pt-3 border-t border-indigo-200/80 text-[11px] space-y-1.5">
                    <p className="font-bold text-slate-800">Allowed Execution Tools:</p>
                    <div className="flex flex-wrap gap-1">
                      {(detail.tools || []).map((t) => (
                        <code key={t} className="rounded bg-white px-1.5 py-0.5 font-mono text-[10px] text-indigo-700 border border-indigo-200">
                          {t}
                        </code>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Downstream Roles (Delivery & QA) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                  <FileOutput className="h-4 w-4" />
                  <span>Downstream Roles (Delivery & QA)</span>
                </div>
                <div className="space-y-3">
                  {(detail.dependencies?.downstream || []).map((down) => (
                    <div
                      key={down.positionId}
                      onClick={() => navigate(`/positions/${down.positionId}`)}
                      className="cursor-pointer rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 hover:border-emerald-300 hover:bg-emerald-50/80 transition"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-emerald-800 text-xs">{down.positionId}</span>
                        <AuthorityBadge authCode={down.authority} />
                      </div>
                      <h5 className="font-bold text-slate-900 text-xs mt-1">{down.title}</h5>
                      <p className="mt-1 text-[11px] text-slate-600">{down.relationship}</p>
                      <div className="mt-2 pt-2 border-t border-emerald-100 text-[10px] text-emerald-900 font-semibold flex items-center justify-between">
                        <span>Artifact: {down.artifact}</span>
                        <ArrowRight className="h-3 w-3 text-emerald-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 2: ACTIVE PROJECTS & TASKS */}
      {/* ==================================================== */}
      {activeTab === 'projects-tasks' && (
        <div className="space-y-8">
          {/* Section A: Projects */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Project Engagements</h3>
                <p className="text-xs text-slate-500">
                  Client campaigns where {detail.title} has assigned deliverables.
                </p>
              </div>

              {/* Toggle Active vs Completed */}
              <div className="flex items-center rounded-xl bg-slate-100 p-1">
                <button
                  onClick={() => setProjectsFilter('active')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    projectsFilter === 'active'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Active Projects ({activeProjectsList.length})
                </button>
                <button
                  onClick={() => setProjectsFilter('completed')}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    projectsFilter === 'completed'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Completed Projects ({(detail.completedProjects || []).length})
                </button>
              </div>
            </div>

            {/* ACTIVE PROJECTS LIST */}
            {projectsFilter === 'active' && (
              activeProjectsList.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {activeProjectsList.map((p) => (
                    <div
                      key={p.id}
                      className="rounded-xl border border-slate-200 p-5 hover:border-indigo-300 transition shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">{p.name}</h4>
                            <p className="text-xs text-slate-500">{p.client}</p>
                          </div>
                          <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 ring-1 ring-indigo-200">
                            {p.status}
                          </span>
                        </div>

                        <p className="mt-3 text-xs text-slate-600 leading-relaxed line-clamp-2">
                          {p.objective}
                        </p>

                        <div className="mt-4 space-y-2 text-xs">
                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span>Current Stage:</span>
                            <strong className="text-slate-800">{p.currentStage}</strong>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span>Role:</span>
                            <span className="text-slate-700">{p.roleInProject}</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <span>Deadline:</span>
                            <span className="font-semibold text-rose-600">{p.deadline} ({p.deadlineDays})</span>
                          </div>

                          {/* Progress bar */}
                          <div className="pt-2">
                            <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold mb-1">
                              <span>Progress</span>
                              <span>{p.progress}%</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                                style={{ width: `${p.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end">
                        <button
                          onClick={() => {
                            setSelectedProjectId(p.id)
                            setActiveTab('inputs-outputs')
                          }}
                          className="rounded-lg px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition"
                        >
                          Inspect Inputs & Outputs →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Folder}
                  title="No active projects"
                  message="This position is not currently assigned to an active project campaign."
                />
              )
            )}

            {/* COMPLETED PROJECTS TABLE */}
            {projectsFilter === 'completed' && (
              (detail.completedProjects || []).length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] text-left">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <th className="pb-3 pl-2">Project Name</th>
                        <th className="pb-3">Client</th>
                        <th className="pb-3">Dates</th>
                        <th className="pb-3">Final Output Summary</th>
                        <th className="pb-3">Evaluator Score</th>
                        <th className="pb-3 pr-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {(detail.completedProjects || []).map((cp) => (
                        <tr key={cp.id} className="hover:bg-slate-50/70 transition">
                          <td className="py-3 pl-2 font-semibold text-slate-900">{cp.name}</td>
                          <td className="py-3 text-slate-600">{cp.client}</td>
                          <td className="py-3 text-slate-500 whitespace-nowrap">
                            {cp.startDate} → {cp.completedDate}
                          </td>
                          <td className="py-3 text-slate-600 max-w-xs">{cp.finalOutput}</td>
                          <td className="py-3 whitespace-nowrap">
                            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-200">
                              {cp.feedbackScore}
                            </span>
                          </td>
                          <td className="py-3 pr-2 text-right">
                            <button
                              onClick={() => setInspectDoc({
                                item: cp.name,
                                source: cp.client,
                                details: cp.finalOutput,
                                receivedOn: cp.startDate,
                                createdOn: cp.completedDate,
                                approval: 'Approved',
                                status: 'Completed',
                                type: 'Final Deliverable Package'
                              })}
                              className="rounded-lg px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition"
                            >
                              View Summary
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <EmptyState
                  icon={Folder}
                  title="No completed projects recorded"
                  message="No past completed project packages recorded for this role."
                />
              )
            )}
          </div>

          {/* Section B: Assigned Tasks & Queues */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Assigned Tasks & Deliverables ({tasksList.length})
                </h3>
                <p className="text-xs text-slate-500">
                  All individual work units assigned to {detail.positionId}.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                  <input
                    className="rounded-xl border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs focus:border-indigo-400 focus:bg-white focus:outline-none"
                    placeholder="Filter tasks..."
                    value={taskQuery}
                    onChange={(e) => setTaskQuery(e.target.value)}
                  />
                </div>

                <select
                  value={taskStatusFilter}
                  onChange={(e) => setTaskStatusFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 py-1.5 px-3 text-xs focus:border-indigo-400 focus:bg-white focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="In Progress">In Progress</option>
                  <option value="In Review">In Review</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto pt-2">
              <table className="w-full min-w-[760px] text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="pb-3 pl-2">Task ID</th>
                    <th className="pb-3">Project</th>
                    <th className="pb-3">Task Title</th>
                    <th className="pb-3">Priority</th>
                    <th className="pb-3">Due Date</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Next Role</th>
                    <th className="pb-3 pr-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredTasks.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 pl-2 font-mono font-bold text-indigo-600">{t.id}</td>
                      <td className="py-3 text-slate-600">{t.project}</td>
                      <td className="py-3 font-semibold text-slate-900">{t.title}</td>
                      <td className="py-3">
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                            t.priority === 'High'
                              ? 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
                              : t.priority === 'Medium'
                              ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {t.priority}
                        </span>
                      </td>
                      <td className="py-3 text-slate-500 whitespace-nowrap">{t.dueDate}</td>
                      <td className="py-3 whitespace-nowrap">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                            t.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                              : t.status === 'In Review'
                              ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                              : 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200'
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3 text-slate-600">{t.nextRole}</td>
                      <td className="py-3 pr-2 text-right">
                        <button
                          onClick={() => setInspectTask(t)}
                          className="rounded-lg px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 3: PROJECT INPUTS & OUTPUTS */}
      {/* ==================================================== */}
      {activeTab === 'inputs-outputs' && (
        <div className="space-y-6">
          {/* Top Project Selector Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Project:</span>
              <select
                value={selectedProjectId || ''}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 py-1.5 px-3 text-xs font-semibold text-slate-800 focus:border-indigo-400 focus:bg-white focus:outline-none"
              >
                {activeProjectsList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.client})
                  </option>
                ))}
              </select>
            </div>

            {activeProject && (
              <span className="self-start sm:self-auto rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {activeProject.status}
              </span>
            )}
          </div>

          {activeProject ? (
            <div className="space-y-6">
              {/* Part A: Project Context Card */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                      <Folder className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{activeProject.name}</h3>
                      <p className="text-xs text-slate-500">
                        Client: <strong className="text-slate-700">{activeProject.client}</strong> · Department: <strong className="text-slate-700">{dept?.name || detail.deptId}</strong>
                      </p>
                      <p className="mt-1 text-xs text-slate-600 max-w-2xl leading-relaxed">
                        Objective: {activeProject.objective}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 text-xs shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    <div className="text-center">
                      <p className="font-semibold text-slate-800">{activeProject.currentStage}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Current Stage</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-rose-600">{activeProject.deadline}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">{activeProject.deadlineDays}</p>
                    </div>
                  </div>
                </div>

                {/* Milestones Tracker */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                    <span>Workflow Stage Progression</span>
                    <span className="text-indigo-600 font-bold">{activeProject.progress}% Complete</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                    {(activeProject.milestones || []).map((m, idx) => (
                      <div
                        key={idx}
                        className={`rounded-lg p-2 text-[10px] border flex items-center gap-1.5 ${
                          m.status === 'completed'
                            ? 'bg-emerald-50/60 border-emerald-200 text-emerald-800'
                            : m.status === 'current'
                            ? 'bg-indigo-50/60 border-indigo-200 text-indigo-800 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                        }`}
                      >
                        {m.status === 'completed' ? (
                          <Check className="h-3 w-3 text-emerald-600 shrink-0" />
                        ) : m.status === 'current' ? (
                          <span className="h-2 w-2 rounded-full bg-indigo-600 shrink-0" />
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-slate-300 shrink-0" />
                        )}
                        <span className="truncate">{m.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Part B: Inputs Received */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Inputs Received ({(activeProject.inputs || []).length})
                  </h4>
                  <span className="text-[11px] text-slate-400">Verified upstream data artifacts</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[680px] text-left">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <th className="pb-3 pl-2">Input Item</th>
                        <th className="pb-3">Source Entity</th>
                        <th className="pb-3">Received On</th>
                        <th className="pb-3">Schema</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 pr-2 text-right">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {(activeProject.inputs || []).map((inp) => (
                        <tr key={inp.id} className="hover:bg-slate-50/70 transition">
                          <td className="py-3 pl-2 font-semibold text-slate-900">{inp.item}</td>
                          <td className="py-3 text-slate-600">{inp.source}</td>
                          <td className="py-3 text-slate-500 whitespace-nowrap">{inp.receivedOn}</td>
                          <td className="py-3 font-mono text-[11px] text-slate-500">{inp.schema}</td>
                          <td className="py-3 whitespace-nowrap">
                            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200 inline-flex items-center gap-1">
                              <Check className="h-3 w-3" /> {inp.status}
                            </span>
                          </td>
                          <td className="py-3 pr-2 text-right">
                            <button
                              onClick={() => setInspectDoc(inp)}
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

              {/* Part C: Work Performed */}
              {activeProject.workPerformed && (
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Work Performed
                  </h4>

                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="lg:col-span-8 space-y-2.5">
                      {(activeProject.workPerformed.steps || []).map((st, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 mt-0.5">
                            <Check className="h-3 w-3" />
                          </span>
                          <span>{st}</span>
                        </div>
                      ))}
                    </div>

                    <div className="lg:col-span-4 rounded-xl border border-slate-100 bg-slate-50/70 p-4 space-y-3 text-xs">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Status</p>
                        <p className="font-semibold text-emerald-700 mt-0.5 flex items-center gap-1">
                          <span className="h-2 w-2 rounded-full bg-emerald-500" />
                          {activeProject.workPerformed.status}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Completed On</p>
                        <p className="font-medium text-slate-700 mt-0.5">{activeProject.workPerformed.completedOn}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Next Step</p>
                        <span className="inline-block mt-0.5 rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-700 ring-1 ring-indigo-200">
                          {activeProject.workPerformed.nextStep}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Part D: Outputs Generated */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Outputs Generated ({(activeProject.outputs || []).length})
                  </h4>
                  <span className="text-[11px] text-slate-400">Versioned deliverables</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <th className="pb-3 pl-2">Output Item</th>
                        <th className="pb-3">Type</th>
                        <th className="pb-3">Created On</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Next Recipient</th>
                        <th className="pb-3">Approval Required</th>
                        <th className="pb-3 pr-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {(activeProject.outputs || []).map((out) => (
                        <tr key={out.id} className="hover:bg-slate-50/70 transition">
                          <td className="py-3 pl-2 font-semibold text-slate-900">{out.item}</td>
                          <td className="py-3 text-slate-500">{out.type}</td>
                          <td className="py-3 text-slate-500 whitespace-nowrap">{out.createdOn}</td>
                          <td className="py-3 whitespace-nowrap">
                            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200">
                              {out.status}
                            </span>
                          </td>
                          <td className="py-3 text-slate-700 font-medium">{out.nextRecipient}</td>
                          <td className="py-3 whitespace-nowrap">
                            <span
                              className={`rounded-md px-2 py-0.5 text-[11px] font-bold ${
                                out.approval === 'Yes'
                                  ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {out.approval}
                            </span>
                          </td>
                          <td className="py-3 pr-2 text-right">
                            <button
                              onClick={() => setInspectDoc(out)}
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

              {/* Part E: Feedback & Reviews Card */}
              {activeProject.feedback && (
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Independent Quality Evaluation & Feedback
                    </h4>
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">
                      Score: {activeProject.feedback.score}
                    </span>
                  </div>

                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">Evaluator: {activeProject.feedback.evaluator}</span>
                      <span className="text-slate-400 font-mono text-[11px]">{activeProject.feedback.reviewDate}</span>
                    </div>
                    <p className="text-slate-700 italic">"{activeProject.feedback.comments}"</p>
                    <div className="flex items-center gap-2 pt-1 text-[11px]">
                      <span className="font-mono text-slate-400">{activeProject.feedback.rubric}</span>
                      <span>·</span>
                      <span className="font-semibold text-emerald-800">{activeProject.feedback.status}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Part F: Handoff Flow Chain */}
              {activeProject.handoffs && (
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Handoff Sequence — {activeProject.name}
                  </h4>
                  <div className="space-y-3">
                    {activeProject.handoffs.map((h, i) => (
                      <div key={i} className="flex items-start gap-4 rounded-xl border border-slate-200 p-3.5 bg-slate-50/50">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white text-xs font-bold">
                          {i + 1}
                        </div>
                        <div className="flex-1 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">{h.stage}</span>
                            <span className="text-slate-400">{h.time}</span>
                          </div>
                          <p className="mt-1 text-slate-600">
                            Handoff: <strong className="text-slate-800">{h.from}</strong> → <strong className="text-slate-800">{h.to}</strong>
                          </p>
                          <span
                            className={`inline-block mt-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              h.status === 'Completed'
                                ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                                : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                            }`}
                          >
                            {h.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <EmptyState
              icon={Folder}
              title="No active project available"
              message="This position has no active project assignments to display inputs and outputs."
            />
          )}
        </div>
      )}

      {/* ==================================================== */}
      {/* TAB 4: ACTIVITY LOGS — DATE-WISE PERMANENT HISTORY */}
      {/* ==================================================== */}
      {activeTab === 'activity-logs' && (
        <div className="space-y-6">
          {/* Top Period Metric Cards */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Events</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{activityData.metrics.totalEvents}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Recorded in selected period</p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Completed</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{activityData.metrics.completed}</p>
              <p className="text-[11px] text-emerald-700 font-medium mt-0.5">Validated deliverables</p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800">Failed / Blocked</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{activityData.metrics.failed}</p>
              <p className="text-[11px] text-rose-700 font-medium mt-0.5">Exceptions or timeouts</p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Waiting for Review</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{activityData.metrics.waitingReview}</p>
              <p className="text-[11px] text-amber-700 font-medium mt-0.5">Pending evaluator gate</p>
            </div>
          </div>

          {/* Date Range Quick Filters & Calendar Bar */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'today', label: 'Today' },
                  { id: 'yesterday', label: 'Yesterday' },
                  { id: '7days', label: 'Last 7 days' },
                  { id: '30days', label: 'Last 30 days' },
                  { id: 'custom', label: 'Custom range' }
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setActivityDateRange(btn.id)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                      activityDateRange === btn.id
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* Formatted Date Range Display Pill */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 font-mono">
                  {dateRangeDisplay}
                </span>
              </div>
            </div>

            {/* Custom Range Picker Inputs (if custom selected) */}
            {activityDateRange === 'custom' && (
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100 text-xs">
                <span className="font-semibold text-slate-600">From:</span>
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="rounded-lg border border-slate-200 px-2 py-1 text-xs"
                />
                <span className="font-semibold text-slate-600">To:</span>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="rounded-lg border border-slate-200 px-2 py-1 text-xs"
                />
              </div>
            )}

            {/* Additional Filter Bar */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center pt-2 border-t border-slate-100">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  value={activitySearchQuery}
                  onChange={(e) => setActivitySearchQuery(e.target.value)}
                  placeholder="Search events, tasks or projects..."
                  className="input pl-8 text-xs py-1.5 w-full"
                />
              </div>

              <select
                value={activityProjectFilter}
                onChange={(e) => setActivityProjectFilter(e.target.value)}
                className="input text-xs py-1.5 sm:w-44"
              >
                <option value="all">All projects</option>
                {activityProjects.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>

              <select
                value={activityTypeFilter}
                onChange={(e) => setActivityTypeFilter(e.target.value)}
                className="input text-xs py-1.5 sm:w-40"
              >
                <option value="all">All event types</option>
                <option value="Execution">Execution</option>
                <option value="Review">Review</option>
                <option value="Handoff">Handoff</option>
              </select>

              <select
                value={activityStatusFilter}
                onChange={(e) => setActivityStatusFilter(e.target.value)}
                className="input text-xs py-1.5 sm:w-36"
              >
                <option value="all">All statuses</option>
                <option value="Completed">Completed</option>
                <option value="Waiting for review">Waiting for review</option>
                <option value="Failed">Failed</option>
              </select>

              {(activityProjectFilter !== 'all' || activityTypeFilter !== 'all' || activityStatusFilter !== 'all' || activitySearchQuery) && (
                <button
                  onClick={() => {
                    setActivityProjectFilter('all')
                    setActivityTypeFilter('all')
                    setActivityStatusFilter('all')
                    setActivitySearchQuery('')
                  }}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 whitespace-nowrap"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Timeline of events grouped by date */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-6">
            {Object.keys(eventsByDate).length === 0 ? (
              <div className="p-8 text-center">
                <Clock className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">No activity was recorded for this position on the selected date.</p>
                <p className="text-xs text-slate-400 mt-1">Try switching to "Last 7 days" or "Last 30 days" to inspect historical operations.</p>
              </div>
            ) : (
              Object.entries(eventsByDate).map(([dStr, evts]) => (
                <div key={dStr} className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-100">
                    {dStr}
                  </h4>

                  <div className="space-y-2.5">
                    {evts.map((evt) => (
                      <div
                        key={evt.id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/60 transition"
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`h-2.5 w-2.5 rounded-full mt-1 shrink-0 ${
                              evt.status === 'Completed'
                                ? 'bg-emerald-500'
                                : evt.status === 'Waiting for review'
                                ? 'bg-amber-500'
                                : 'bg-rose-500'
                            }`}
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[11px] text-slate-400 font-medium">{evt.time}</span>
                              <p className="text-xs font-bold text-slate-900">{evt.title}</p>
                            </div>
                            <p className="text-xs text-slate-600 mt-0.5">{evt.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto pl-5 sm:pl-0">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              evt.status === 'Completed'
                                ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                                : evt.status === 'Waiting for review'
                                ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                                : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
                            }`}
                          >
                            {evt.status}
                          </span>

                          <button
                            onClick={() => setSelectedLogEvent(evt)}
                            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition"
                          >
                            View details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* DETAILED LOG RECORD VIEW MODAL */}
      {selectedLogEvent && (
        <Drawer
          open
          onClose={() => setSelectedLogEvent(null)}
          title={selectedLogEvent.title}
          subtitle={`Event ID: ${selectedLogEvent.id} · ${selectedLogEvent.displayDate} ${selectedLogEvent.time}`}
          footer={
            <div className="flex justify-between items-center w-full">
              {selectedLogEvent.runId && (
                <button
                  className="text-xs text-indigo-600 hover:underline font-semibold flex items-center gap-1"
                  onClick={() => {
                    navigate(`/agents/${detail.samAgId || detail.positionId}/runs/${selectedLogEvent.runId}`)
                  }}
                >
                  Inspect Full Run Details ({selectedLogEvent.runId}) →
                </button>
              )}
              <button className="btn-secondary text-xs" onClick={() => setSelectedLogEvent(null)}>
                Close
              </button>
            </div>
          }
        >
          <div className="space-y-5 text-xs">
            {/* Event Summary Section */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
              <p className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Event Summary</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-slate-400">Event Type:</span> <strong className="text-slate-800">{selectedLogEvent.type}</strong></div>
                <div><span className="text-slate-400">Timestamp:</span> <strong className="text-slate-800">{selectedLogEvent.displayDate} {selectedLogEvent.time}</strong></div>
                <div><span className="text-slate-400">Project:</span> <strong className="text-slate-800">{selectedLogEvent.project}</strong></div>
                <div><span className="text-slate-400">Status:</span> <strong className="text-slate-800">{selectedLogEvent.status}</strong></div>
                <div><span className="text-slate-400">Position ID:</span> <span className="font-mono font-bold text-indigo-600">{selectedLogEvent.positionId}</span></div>
                <div><span className="text-slate-400">Agent:</span> <span className="text-slate-800 font-semibold">{selectedLogEvent.agentName}</span></div>
              </div>
            </div>

            {/* Input Received Section */}
            {selectedLogEvent.inputReceived && (
              <div className="rounded-xl border border-sky-100 bg-sky-50/40 p-4 space-y-2">
                <p className="font-bold text-sky-900 uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <FileInput className="h-3.5 w-3.5 text-sky-600" /> Input Received
                </p>
                <div>
                  <p className="font-semibold text-slate-900">{selectedLogEvent.inputReceived.item}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Source: <strong className="text-slate-700">{selectedLogEvent.inputReceived.source}</strong> · Schema: <span className="font-mono">{selectedLogEvent.inputReceived.schema}</span>
                  </p>
                  <p className="mt-2 text-xs text-slate-700 bg-white/80 p-2.5 rounded-lg border border-sky-100 font-mono text-[11px]">
                    {selectedLogEvent.inputReceived.excerpt}
                  </p>
                </div>
              </div>
            )}

            {/* Action Taken Section */}
            {selectedLogEvent.actionTaken && (
              <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 space-y-2">
                <p className="font-bold text-indigo-900 uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <Cpu className="h-3.5 w-3.5 text-indigo-600" /> Action Taken
                </p>
                <div className="space-y-1.5">
                  <p className="font-semibold text-slate-800">Autonomous Transformation Steps:</p>
                  <ul className="space-y-1 pl-4 list-disc text-slate-700">
                    {(selectedLogEvent.actionTaken.steps || []).map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-slate-500 pt-1">
                    Tools utilized: <span className="font-mono font-semibold text-indigo-700">{(selectedLogEvent.actionTaken.tools || []).join(', ')}</span> · Duration: <span className="font-bold text-slate-800">{selectedLogEvent.actionTaken.duration}</span>
                  </p>
                </div>
              </div>
            )}

            {/* Outputs Generated Section */}
            {selectedLogEvent.outputGenerated && (
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4 space-y-2">
                <p className="font-bold text-emerald-900 uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <FileOutput className="h-3.5 w-3.5 text-emerald-600" /> Outputs Generated
                </p>
                <div>
                  <p className="font-semibold text-slate-900">{selectedLogEvent.outputGenerated.item}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Format: {selectedLogEvent.outputGenerated.format} · Next Recipient: <strong className="text-slate-700">{selectedLogEvent.outputGenerated.recipient}</strong>
                  </p>
                  <p className="mt-2 text-xs text-slate-700 bg-white/80 p-2.5 rounded-lg border border-emerald-100 font-mono text-[11px]">
                    {selectedLogEvent.outputGenerated.excerpt}
                  </p>
                </div>
              </div>
            )}

            {/* Handoff Section */}
            {selectedLogEvent.handoff && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1.5">
                <p className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Handoff Delivery</p>
                <div className="flex items-center justify-between font-semibold text-slate-800">
                  <span>From: {selectedLogEvent.handoff.from}</span>
                  <span>→</span>
                  <span>To: {selectedLogEvent.handoff.to}</span>
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  Artifact: {selectedLogEvent.handoff.artifact} · Status: <span className="text-emerald-700 font-bold">{selectedLogEvent.handoff.status}</span>
                </p>
              </div>
            )}
          </div>
        </Drawer>
      )}

      {/* DOCUMENT INSPECTION MODAL */}
      {inspectDoc && (
        <Drawer
          open
          onClose={() => setInspectDoc(null)}
          title={inspectDoc.item}
          subtitle={`Type: ${inspectDoc.type || 'Input Item'} · Status: ${inspectDoc.status}`}
          footer={
            <div className="flex justify-end w-full">
              <button className="btn-secondary text-xs" onClick={() => setInspectDoc(null)}>
                Close
              </button>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Item Content Summary</p>
              <p className="mt-1 text-xs text-slate-800 leading-relaxed">{inspectDoc.details}</p>
            </div>

            <div className="divide-y divide-slate-100">
              {inspectDoc.source && <DetailRow label="Source Entity">{inspectDoc.source}</DetailRow>}
              {inspectDoc.receivedOn && <DetailRow label="Received On">{inspectDoc.receivedOn}</DetailRow>}
              {inspectDoc.createdOn && <DetailRow label="Created On">{inspectDoc.createdOn}</DetailRow>}
              {inspectDoc.schema && <DetailRow label="Schema Definition">{inspectDoc.schema}</DetailRow>}
              {inspectDoc.nextRecipient && <DetailRow label="Next Recipient">{inspectDoc.nextRecipient}</DetailRow>}
              {inspectDoc.approval && <DetailRow label="Requires Human Approval">{inspectDoc.approval}</DetailRow>}
              <DetailRow label="Position Context">{detail.positionId} ({detail.title})</DetailRow>
            </div>
          </div>
        </Drawer>
      )}

      {/* TASK INSPECTION MODAL */}
      {inspectTask && (
        <Drawer
          open
          onClose={() => setInspectTask(null)}
          title={inspectTask.title}
          subtitle={`Task ID: ${inspectTask.id} · Priority: ${inspectTask.priority}`}
          footer={
            <div className="flex justify-end w-full">
              <button className="btn-secondary text-xs" onClick={() => setInspectTask(null)}>
                Close
              </button>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Task Instructions</p>
              <p className="mt-1 text-xs text-slate-800 leading-relaxed">{inspectTask.description}</p>
            </div>

            <div className="divide-y divide-slate-100">
              <DetailRow label="Project">{inspectTask.project}</DetailRow>
              <DetailRow label="Status">{inspectTask.status}</DetailRow>
              <DetailRow label="Due Date">{inspectTask.dueDate}</DetailRow>
              <DetailRow label="Next Responsible Role">{inspectTask.nextRole}</DetailRow>
              <DetailRow label="Input Artifacts">
                <div className="flex flex-wrap gap-1">
                  {(inspectTask.inputArtifacts || []).map((art, idx) => (
                    <span key={idx} className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-700">
                      {art}
                    </span>
                  ))}
                </div>
              </DetailRow>
              <DetailRow label="Execution Logs">
                <p className="text-[11px] text-slate-600 font-mono">{inspectTask.logs}</p>
              </DetailRow>
            </div>
          </div>
        </Drawer>
      )}
    </div>
  )
}

// ----------------------------------------------------
// MAIN 194-POSITIONS REGISTRY DIRECTORY PAGE
// ----------------------------------------------------
export function PositionsDirectory() {
  const navigate = useNavigate()

  // State for search & filters
  const [query, setQuery] = useState('')
  const [deptFilter, setDeptFilter] = useState('all')
  const [authorityFilter, setAuthorityFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  // Pagination state (10 positions per page)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  // Selection state for checkboxes
  const [selectedIds, setSelectedIds] = useState(new Set())

  // Summary counts partitioning 194 positions into mutually exclusive categories:
  // Working: 162 (83.5%)
  // Waiting for Review: 18 (9.3%)
  // Inactive / Error: 9 (4.6%)
  // Idle / Not Assigned: 5 (2.6%)
  const summaryCounts = useMemo(() => {
    let working = 0
    let review = 0
    let error = 0
    let idle = 0

    positions.forEach((p) => {
      if (p.status === 'active') working++
      else if (p.status === 'needs_review') review++
      else if (p.status === 'error') error++
      else if (p.status === 'idle') idle++
    })

    return {
      total: positions.length,
      working,
      workingPct: ((working / positions.length) * 100).toFixed(1),
      review,
      reviewPct: ((review / positions.length) * 100).toFixed(1),
      error,
      errorPct: ((error / positions.length) * 100).toFixed(1),
      idle,
      idlePct: ((idle / positions.length) * 100).toFixed(1)
    }
  }, [])

  // Filtered positions based on search & filters
  const filtered = useMemo(() => {
    return positions.filter((p) => {
      if (deptFilter !== 'all' && p.deptId !== deptFilter) return false
      if (authorityFilter !== 'all' && p.authority !== authorityFilter) return false
      if (statusFilter !== 'all' && p.status !== statusFilter) return false
      if (query) {
        const q = query.toLowerCase()
        if (
          !p.title.toLowerCase().includes(q) &&
          !p.positionId.toLowerCase().includes(q) &&
          !p.samAgId.toLowerCase().includes(q) &&
          !(p.person || '').toLowerCase().includes(q)
        ) {
          return false
        }
      }
      return true
    })
  }, [query, deptFilter, authorityFilter, statusFilter])

  // Total pages
  const totalPages = Math.ceil(filtered.length / pageSize) || 1

  // Paginated slice
  const paginatedPositions = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, currentPage, pageSize])

  // Reset pagination when filter changes
  const handleFilterChange = (setter, val) => {
    setter(val)
    setCurrentPage(1)
  }

  // Clear all filters
  const handleClearFilters = () => {
    setQuery('')
    setDeptFilter('all')
    setAuthorityFilter('all')
    setStatusFilter('all')
    setCurrentPage(1)
  }

  const isFiltered = query !== '' || deptFilter !== 'all' || authorityFilter !== 'all' || statusFilter !== 'all'

  // Master checkbox toggle
  const allPageSelected = paginatedPositions.length > 0 && paginatedPositions.every((p) => selectedIds.has(p.positionId))
  const toggleSelectAll = () => {
    const next = new Set(selectedIds)
    if (allPageSelected) {
      paginatedPositions.forEach((p) => next.delete(p.positionId))
    } else {
      paginatedPositions.forEach((p) => next.add(p.positionId))
    }
    setSelectedIds(next)
  }

  const toggleSelectOne = (posId, e) => {
    e.stopPropagation()
    const next = new Set(selectedIds)
    if (next.has(posId)) next.delete(posId)
    else next.add(posId)
    setSelectedIds(next)
  }

  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        title="194 Logical Positions"
        description="The complete proposed digital workforce registry across 11 departments. Each position has a defined canonical ID, authority level, purpose, and independent evaluator."
        actions={
          <Badge color="indigo" className="px-3 py-1 font-semibold">
            {positions.length} positions · 11 departments
          </Badge>
        }
      />

      {/* Search and Filters Bar */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm space-y-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="input pl-9 text-xs w-full"
              placeholder="Search by position name, position ID, canonical ID, or keyword..."
              value={query}
              onChange={(e) => handleFilterChange(setQuery, e.target.value)}
            />
          </div>

          {/* Department Filter (11 Departments) */}
          <select
            className="input text-xs lg:w-56"
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

          {/* Authority Level Filter */}
          <select
            className="input text-xs lg:w-56"
            value={authorityFilter}
            onChange={(e) => handleFilterChange(setAuthorityFilter, e.target.value)}
          >
            <option value="all">All Authority Levels</option>
            <option value="A">Level 1 — Read / Analyse</option>
            <option value="B">Level 2 — Draft / Recommend</option>
            <option value="C">Level 3 — Internal Action</option>
            <option value="D">Level 4 — External Side Effect</option>
            <option value="E">Level 5 — Reserved Human Decision</option>
          </select>

          {/* Status Filter */}
          <select
            className="input text-xs lg:w-48"
            value={statusFilter}
            onChange={(e) => handleFilterChange(setStatusFilter, e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="active">Working (Active)</option>
            <option value="needs_review">Waiting for Review</option>
            <option value="error">Inactive / Error</option>
            <option value="idle">Idle / Not Assigned</option>
          </select>

          {/* Clear Filters Action */}
          {isFiltered && (
            <button
              onClick={handleClearFilters}
              className="btn-secondary text-xs shrink-0 flex items-center gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* 5 Position Summary Cards Partitioning Registry */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {/* Card 1: Total Positions */}
        <div
          onClick={() => handleFilterChange(setStatusFilter, 'all')}
          className={`cursor-pointer rounded-2xl border p-4 transition shadow-xs ${
            statusFilter === 'all'
              ? 'border-indigo-400 bg-indigo-50/40 ring-1 ring-indigo-300'
              : 'border-slate-200/80 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Positions</span>
            <Users className="h-4 w-4 text-slate-400" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">{summaryCounts.total}</p>
          <p className="mt-1 text-[11px] text-slate-500">11 Operating Departments</p>
        </div>

        {/* Card 2: Working Positions */}
        <div
          onClick={() => handleFilterChange(setStatusFilter, 'active')}
          className={`cursor-pointer rounded-2xl border p-4 transition shadow-xs ${
            statusFilter === 'active'
              ? 'border-emerald-400 bg-emerald-50/40 ring-1 ring-emerald-300'
              : 'border-slate-200/80 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Working Positions</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">{summaryCounts.working}</p>
          <p className="mt-1 text-[11px] text-emerald-700 font-semibold">{summaryCounts.workingPct}% of total registry</p>
        </div>

        {/* Card 3: Waiting for Review */}
        <div
          onClick={() => handleFilterChange(setStatusFilter, 'needs_review')}
          className={`cursor-pointer rounded-2xl border p-4 transition shadow-xs ${
            statusFilter === 'needs_review'
              ? 'border-amber-400 bg-amber-50/40 ring-1 ring-amber-300'
              : 'border-slate-200/80 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Waiting for Review</span>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">{summaryCounts.review}</p>
          <p className="mt-1 text-[11px] text-amber-700 font-semibold">{summaryCounts.reviewPct}% in evaluation</p>
        </div>

        {/* Card 4: Inactive / Error */}
        <div
          onClick={() => handleFilterChange(setStatusFilter, 'error')}
          className={`cursor-pointer rounded-2xl border p-4 transition shadow-xs ${
            statusFilter === 'error'
              ? 'border-rose-400 bg-rose-50/40 ring-1 ring-rose-300'
              : 'border-slate-200/80 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800">Inactive / Error</span>
            <AlertTriangle className="h-4 w-4 text-rose-500" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">{summaryCounts.error}</p>
          <p className="mt-1 text-[11px] text-rose-700 font-semibold">{summaryCounts.errorPct}% require intervention</p>
        </div>

        {/* Card 5: Idle / Not Assigned */}
        <div
          onClick={() => handleFilterChange(setStatusFilter, 'idle')}
          className={`cursor-pointer rounded-2xl border p-4 transition shadow-xs ${
            statusFilter === 'idle'
              ? 'border-slate-400 bg-slate-100 ring-1 ring-slate-300'
              : 'border-slate-200/80 bg-white hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">Idle / Not Assigned</span>
            <span className="h-2 w-2 rounded-full bg-slate-400" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">{summaryCounts.idle}</p>
          <p className="mt-1 text-[11px] text-slate-500">{summaryCounts.idlePct}% unallocated capacity</p>
        </div>
      </div>

      {/* Positions Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Positions Directory ({filtered.length} matches)
          </h3>
          <span className="text-xs text-slate-400">
            Click any row to open full-page position details
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="p-8">
            <EmptyState
              icon={Users}
              title="No positions match your criteria"
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
            <table className="w-full min-w-[840px] text-left">
              <thead className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3 pl-4 w-10">
                    <button
                      type="button"
                      onClick={toggleSelectAll}
                      className="text-slate-400 hover:text-slate-700"
                    >
                      {allPageSelected ? (
                        <CheckSquare className="h-4 w-4 text-indigo-600" />
                      ) : (
                        <Square className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th className="py-3">Position ID</th>
                  <th className="py-3">Position Name</th>
                  <th className="py-3">Department</th>
                  <th className="py-3">Authority Level</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Active Projects</th>
                  <th className="py-3 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {paginatedPositions.map((p) => {
                  const d = deptById(p.deptId)
                  const isSelected = selectedIds.has(p.positionId)
                  return (
                    <tr
                      key={p.positionId}
                      onClick={() => navigate(`/positions/${p.positionId}`)}
                      className={`cursor-pointer transition ${
                        isSelected ? 'bg-indigo-50/30' : 'hover:bg-slate-50/70'
                      }`}
                    >
                      <td className="py-3.5 pl-4" onClick={(e) => toggleSelectOne(p.positionId, e)}>
                        {isSelected ? (
                          <CheckSquare className="h-4 w-4 text-indigo-600" />
                        ) : (
                          <Square className="h-4 w-4 text-slate-300 hover:text-slate-500" />
                        )}
                      </td>
                      <td className="py-3.5 font-mono font-bold text-indigo-600">
                        {p.positionId}
                        <span className="block text-[10px] font-normal text-slate-400">{p.samAgId}</span>
                      </td>
                      <td className="py-3.5">
                        <span className="font-semibold text-slate-900">{p.title}</span>
                        {p.isLead && (
                          <span className="ml-2 rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold text-indigo-600 ring-1 ring-indigo-200">
                            Lead
                          </span>
                        )}
                        {p.person && (
                          <span className="block text-[11px] text-slate-400">{p.person}</span>
                        )}
                      </td>
                      <td className="py-3.5 text-slate-600">{d?.name || p.deptId}</td>
                      <td className="py-3.5 whitespace-nowrap">
                        <AuthorityBadge authCode={p.authority} />
                      </td>
                      <td className="py-3.5 whitespace-nowrap">
                        <StatusBadge status={p.status} />
                      </td>
                      <td className="py-3.5 whitespace-nowrap text-slate-700 font-medium">
                        {p.activeProjectsCount > 0 ? (
                          <span className="inline-flex items-center gap-1">
                            <Folder className="h-3.5 w-3.5 text-sky-500" />
                            {p.activeProjectsCount} {p.activeProjectsCount === 1 ? 'project' : 'projects'}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="py-3.5 pr-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/positions/${p.positionId}`)
                          }}
                          className="rounded-lg px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50/60 hover:bg-indigo-100 transition shadow-2xs"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Standard Pagination Bar */}
        {filtered.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-t border-slate-100 bg-slate-50/40 text-xs text-slate-500">
            <div>
              Showing{' '}
              <strong className="text-slate-900">
                {(currentPage - 1) * pageSize + 1}
              </strong>{' '}
              to{' '}
              <strong className="text-slate-900">
                {Math.min(currentPage * pageSize, filtered.length)}
              </strong>{' '}
              of <strong className="text-slate-900">{filtered.length}</strong> positions
            </div>

            <div className="flex items-center gap-1 self-end sm:self-auto">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-slate-200 bg-white p-1.5 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Render Page Numbers */}
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
export default function Positions() {
  const { id } = useParams()
  if (id) {
    return <PositionDetailScreen key={id} positionId={id} />
  }
  return <PositionsDirectory />
}
