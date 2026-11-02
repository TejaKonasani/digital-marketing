import { useState, useMemo, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  Building2, Users, ArrowLeft, ArrowRight, ShieldAlert, Target,
  GitBranch, ChevronRight, CheckCircle2, Clock, AlertTriangle,
  Search, ExternalLink, Activity, Info, FileText, Check, Layers,
  Folder, Calendar, AlertCircle, LayoutGrid, X
} from 'lucide-react'
import { Card, PageHeader, Badge, StatusBadge, EmptyState, Drawer, DetailRow } from '../components/ui'
import { departments, deptById, totalPositions } from '../data/departments'
import { positionsByDept } from '../data/positions'
import { departmentMetrics, getAuthorityDisplay, authorityLevelMap } from '../data/departmentData'

const deptColorMap = {
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', ring: 'ring-indigo-200', bar: 'bg-indigo-500', dot: 'bg-indigo-500', badge: 'indigo' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', ring: 'ring-amber-200', bar: 'bg-amber-500', dot: 'bg-amber-500', badge: 'amber' },
  fuchsia: { bg: 'bg-fuchsia-50', text: 'text-fuchsia-600', ring: 'ring-fuchsia-200', bar: 'bg-fuchsia-500', dot: 'bg-fuchsia-500', badge: 'fuchsia' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', ring: 'ring-teal-200', bar: 'bg-teal-500', dot: 'bg-teal-500', badge: 'teal' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-600', ring: 'ring-sky-200', bar: 'bg-sky-500', dot: 'bg-sky-500', badge: 'sky' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-600', ring: 'ring-rose-200', bar: 'bg-rose-500', dot: 'bg-rose-500', badge: 'rose' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', ring: 'ring-orange-200', bar: 'bg-orange-500', dot: 'bg-orange-500', badge: 'orange' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-600', ring: 'ring-violet-200', bar: 'bg-violet-500', dot: 'bg-violet-500', badge: 'violet' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-200', bar: 'bg-emerald-500', dot: 'bg-emerald-500', badge: 'emerald' },
  cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', ring: 'ring-cyan-200', bar: 'bg-cyan-500', dot: 'bg-cyan-500', badge: 'cyan' },
  slate: { bg: 'bg-slate-100', text: 'text-slate-600', ring: 'ring-slate-200', bar: 'bg-slate-500', dot: 'bg-slate-500', badge: 'slate' }
}

// Native SVG Donut Component (Zero external dependencies, 100% resilient)
function DeptDonut({ total, label, slices, size = 130, strokeWidth = 14 }) {
  const center = size / 2
  const radius = center - strokeWidth / 2 - 2
  const circumference = 2 * Math.PI * radius

  let accumulated = 0
  const renderedSlices = slices.map((slice) => {
    const fraction = total > 0 ? slice.value / total : 0
    const strokeLength = fraction * circumference
    const offset = accumulated
    accumulated += strokeLength
    return {
      ...slice,
      strokeDasharray: `${Math.max(0, strokeLength - 1.5)} ${circumference - Math.max(0, strokeLength - 1.5)}`,
      strokeDashoffset: -offset
    }
  })

  return (
    <div className="relative flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#f1f5f9" strokeWidth={strokeWidth} />
        {renderedSlices.map((slice, idx) => (
          <circle
            key={idx}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={slice.color}
            strokeWidth={strokeWidth}
            strokeDasharray={slice.strokeDasharray}
            strokeDashoffset={slice.strokeDashoffset}
            strokeLinecap="butt"
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <span className="text-xl font-extrabold text-slate-900 leading-none">{total}</span>
        <span className="mt-0.5 text-[10px] font-semibold uppercase text-slate-400">{label}</span>
      </div>
    </div>
  )
}

// ----------------------------------------------------
// FULL-PAGE DEPARTMENT DETAILS SCREEN
// ----------------------------------------------------
export function DepartmentDetail({ deptId }) {
  const { id } = useParams()
  const resolvedDeptId = deptId || id
  const dept = deptById(resolvedDeptId)
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [positionQuery, setPositionQuery] = useState('')
  const [authorityFilter, setAuthorityFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  // Reset state when navigating between departments
  useEffect(() => {
    setActiveTab('overview')
    setPositionQuery('')
    setAuthorityFilter('all')
    setSelectedProject(null)
  }, [resolvedDeptId])

  const deptPositions = dept ? positionsByDept(dept.id) : []

  // Filtered positions inside this department
  const filteredPositions = useMemo(() => {
    return deptPositions.filter((p) => {
      if (authorityFilter !== 'all' && p.authority !== authorityFilter) return false
      if (positionQuery) {
        const q = positionQuery.toLowerCase()
        if (
          !p.title.toLowerCase().includes(q) &&
          !p.positionId.toLowerCase().includes(q) &&
          !p.samAgId.toLowerCase().includes(q)
        ) {
          return false
        }
      }
      return true
    })
  }, [deptPositions, authorityFilter, positionQuery])

  if (!dept) {
    return (
      <div className="p-8">
        <EmptyState
          icon={Building2}
          title="Department not found"
          message={`The department identifier "${deptId}" does not exist in the Samrudhi operating model.`}
          action={
            <button className="btn-secondary mt-4" onClick={() => navigate('/departments')}>
              Return to Departments
            </button>
          }
        />
      </div>
    )
  }

  const metrics = departmentMetrics[dept.id] || {
    activeProjects: 0,
    activeAgents: 0,
    waitingReview: 0,
    status: 'Idle',
    activePositions: Math.max(1, dept.positions - 2),
    waitingReviewPositions: 1,
    inactivePositions: 1,
    description: dept.mandate,
    responsibilities: [
      `Execute ${dept.name} responsibilities within approved authority boundaries.`,
      `Maintain cross-department operational handoffs according to standard operating procedures.`,
      `Track output metrics and escalate blockers to governance authority.`
    ],
    authorityScope: 'Operational tasks executed within assigned boundaries.',
    projects: []
  }

  const c = deptColorMap[dept.color] || deptColorMap.indigo

  // Donut chart data for Position Status Breakdown
  const donutData = [
    { name: 'Active', value: metrics.activePositions, color: '#10b981' },
    { name: 'Waiting Review', value: metrics.waitingReviewPositions, color: '#f59e0b' },
    { name: 'Inactive', value: metrics.inactivePositions, color: '#94a3b8' }
  ]
  const totalInDonut = donutData.reduce((acc, curr) => acc + curr.value, 0)

  return (
    <div className="space-y-6 pb-16">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/departments')}
            className="hover:text-slate-900 transition flex items-center gap-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Departments
          </button>
          <span>›</span>
          <span className="text-slate-900 font-bold">{dept.name}</span>
        </div>

        <Link
          to="/positions"
          className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
        >
          <span>View 194 positions registry</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Department Header Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${c.bg} ${c.text} ring-1 ${c.ring} shadow-xs`}>
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl font-bold tracking-tight text-slate-900">{dept.name}</h1>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs font-bold text-slate-700">
                  {dept.prefix}
                </span>
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${
                  metrics.status === 'Active'
                    ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                    : 'bg-slate-100 text-slate-700 ring-slate-200'
                }`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {metrics.status}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500 max-w-3xl leading-relaxed">
                {dept.mandate}
              </p>
            </div>
          </div>
        </div>

        {/* 5 Stat Cards in a row */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 pt-5 border-t border-slate-100">
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900">{dept.positions}</p>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Total Positions</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900">{metrics.activePositions}</p>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Active Positions</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
              <Folder className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900">{metrics.activeProjects}</p>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Active Projects</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900">{metrics.activeAgents}</p>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Active Agents</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xl font-extrabold text-slate-900">{metrics.waitingReview}</p>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Waiting Review</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'projects', label: `Active Projects (${metrics.projects?.length || 0})` },
          { id: 'positions', label: `Positions (${deptPositions.length})` },
          { id: 'analytics', label: 'Analytics' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-xs font-bold transition border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left: Department Overview & Responsibilities */}
            <div className="lg:col-span-7 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-5">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Department Overview</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-700">
                  {dept.mandate}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Key Responsibilities</h4>
                <ul className="mt-2 space-y-2 text-xs text-slate-600">
                  {(metrics.responsibilities || []).map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Key Performance Indicators</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(dept.kpis || []).map((k) => (
                    <span
                      key={k}
                      className="inline-flex items-center rounded-lg bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700 ring-1 ring-sky-200"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Authority & Scope + Position Breakdown Donut */}
            <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Authority Boundaries</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {dept.boundary}
                </p>
                <p className="mt-2 text-[11px] text-slate-500 leading-relaxed italic border-l-2 border-indigo-200 pl-2.5">
                  {metrics.authorityScope}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Position Status Breakdown</h4>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <DeptDonut
                    total={totalInDonut}
                    label="Roles"
                    slices={donutData}
                    size={120}
                    strokeWidth={12}
                  />

                  <div className="space-y-2 text-xs flex-1 w-full">
                    {donutData.map((d) => {
                      const pct = totalInDonut > 0 ? Math.round((d.value / totalInDonut) * 100) : 0
                      return (
                        <div key={d.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                            <span className="text-slate-600">{d.name}</span>
                          </div>
                          <span className="font-semibold text-slate-800">
                            {d.value} <span className="font-normal text-slate-400">({pct}%)</span>
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section B — Current Active Projects Preview */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Current Active Projects ({metrics.projects?.length || 0})
                </h3>
                <p className="text-xs text-slate-500">
                  Projects currently in progress within {dept.name}.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('projects')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                View all →
              </button>
            </div>

            <div className="mt-4 overflow-x-auto">
              {(metrics.projects || []).length > 0 ? (
                <table className="w-full min-w-[700px] text-left">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <th className="pb-3 pl-2">Project Name</th>
                      <th className="pb-3">Client</th>
                      <th className="pb-3">Deadline</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Priority</th>
                      <th className="pb-3">Department Role</th>
                      <th className="pb-3 pr-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {metrics.projects.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/70 transition">
                        <td className="py-3 pl-2 font-semibold text-slate-900">{p.name}</td>
                        <td className="py-3 font-medium text-slate-600">{p.client}</td>
                        <td className="py-3 text-slate-500 whitespace-nowrap">{p.deadline}</td>
                        <td className="py-3 whitespace-nowrap">
                          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-medium text-indigo-700 ring-1 ring-indigo-200">
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 font-semibold text-[11px] ${
                            p.priority === 'High' ? 'text-rose-600' : p.priority === 'Medium' ? 'text-amber-600' : 'text-sky-600'
                          }`}>
                            {p.priority === 'High' && <AlertTriangle className="h-3.5 w-3.5" />}
                            {p.priority === 'Medium' && <AlertTriangle className="h-3.5 w-3.5" />}
                            {p.priority === 'Low' && <Info className="h-3.5 w-3.5" />}
                            {p.priority}
                          </span>
                        </td>
                        <td className="py-3 text-slate-600 truncate max-w-[220px]">{p.departmentRole}</td>
                        <td className="py-3 pr-2 text-right">
                          <button
                            onClick={() => setSelectedProject(p)}
                            className="rounded-lg px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <EmptyState
                  icon={Folder}
                  title="No active projects"
                  message="This department does not currently have projects in flight."
                />
              )}
            </div>
          </div>

          {/* Section C — Department Positions Preview */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Department Positions ({filteredPositions.length} of {deptPositions.length})
                </h3>
                <p className="text-xs text-slate-500">
                  194-position operating model roles assigned to {dept.short}.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={positionQuery}
                    onChange={(e) => setPositionQuery(e.target.value)}
                    placeholder="Search position ID or title…"
                    className="rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs focus:border-indigo-400 focus:bg-white focus:outline-none"
                  />
                </div>

                <select
                  value={authorityFilter}
                  onChange={(e) => setAuthorityFilter(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-slate-50 py-1.5 px-2 text-xs text-slate-700 focus:border-indigo-400 focus:bg-white focus:outline-none"
                >
                  <option value="all">All Authority Levels</option>
                  <option value="A">Level 1 — Read / Analyse</option>
                  <option value="B">Level 2 — Draft / Recommend</option>
                  <option value="C">Level 3 — Internal Action</option>
                  <option value="D">Level 4 — External Side Effect</option>
                  <option value="E">Level 5 — Reserved Human Decision</option>
                </select>
              </div>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="pb-3 pl-2">Position ID</th>
                    <th className="pb-3">Position Title</th>
                    <th className="pb-3">Department</th>
                    <th className="pb-3">Authority Level</th>
                    <th className="pb-3">Position Status</th>
                    <th className="pb-3">Active Projects</th>
                    <th className="pb-3">Review Status</th>
                    <th className="pb-3 pr-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredPositions.map((pos) => {
                    const auth = getAuthorityDisplay(pos.authority)
                    return (
                      <tr
                        key={pos.positionId}
                        onClick={() => navigate(`/positions/${pos.positionId}`)}
                        className="cursor-pointer hover:bg-slate-50/70 transition"
                      >
                        <td className="py-3 pl-2 font-mono font-bold text-indigo-600">
                          {pos.positionId}
                        </td>
                        <td className="py-3 font-semibold text-slate-900">
                          {pos.title}
                          {pos.isLead && (
                            <span className="ml-2 rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold text-indigo-600 ring-1 ring-indigo-200">
                              Lead
                            </span>
                          )}
                        </td>
                        <td className="py-3 text-slate-600">{dept.short}</td>
                        <td className="py-3 whitespace-nowrap">
                          <span
                            title={auth.desc}
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${
                              auth.color === 'sky'
                                ? 'bg-sky-50 text-sky-700 ring-sky-200'
                                : auth.color === 'indigo'
                                ? 'bg-indigo-50 text-indigo-700 ring-indigo-200'
                                : auth.color === 'teal'
                                ? 'bg-teal-50 text-teal-700 ring-teal-200'
                                : auth.color === 'amber'
                                ? 'bg-amber-50 text-amber-700 ring-amber-200'
                                : 'bg-rose-50 text-rose-700 ring-rose-200'
                            }`}
                          >
                            {auth.level}
                          </span>
                        </td>
                        <td className="py-3 whitespace-nowrap">
                          <StatusBadge status={pos.status} />
                        </td>
                        <td className="py-3 text-slate-700 font-medium">
                          {pos.status === 'active' ? `${pos.activeProjectsCount || 1} project${pos.activeProjectsCount === 1 ? '' : 's'}` : '—'}
                        </td>
                        <td className="py-3 whitespace-nowrap text-slate-500">
                          {pos.status === 'needs_review' ? (
                            <span className="text-amber-600 font-medium">Pending Review</span>
                          ) : (
                            <span className="text-emerald-600 font-medium">Verified</span>
                          )}
                        </td>
                        <td className="py-3 pr-2 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              navigate(`/positions/${pos.positionId}`)
                            }}
                            className="rounded-lg px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition"
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
          </div>
        </div>
      )}

      {/* TAB 2: ACTIVE PROJECTS */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Active Projects in {dept.name}
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Live projects progressing through the operating stages within this department.
            </p>

            {(metrics.projects || []).length > 0 ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {metrics.projects.map((p) => (
                  <div key={p.id} className="rounded-xl border border-slate-200 p-5 hover:border-indigo-300 transition shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{p.name}</h4>
                          <p className="text-xs text-slate-500">{p.client}</p>
                        </div>
                        <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-200">
                          {p.status}
                        </span>
                      </div>
                      <p className="mt-3 text-xs text-slate-600 leading-relaxed">{p.description}</p>
                      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                        <span>Stage: <strong className="text-slate-700">{p.currentStage}</strong></span>
                        <span>Due: <strong className="text-slate-700">{p.deadline}</strong></span>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">Role: {p.departmentRole}</span>
                      <button
                        onClick={() => setSelectedProject(p)}
                        className="rounded-lg px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Folder}
                title="No active projects"
                message="This department does not currently have projects in flight."
              />
            )}
          </div>
        </div>
      )}

      {/* TAB 3: POSITIONS */}
      {activeTab === 'positions' && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                All {dept.positions} Positions in {dept.short}
              </h3>
              <p className="text-xs text-slate-500">
                Authoritative position directory and assigned authority levels.
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {deptPositions.map((pos) => {
              const auth = getAuthorityDisplay(pos.authority)
              return (
                <div
                  key={pos.positionId}
                  onClick={() => navigate(`/positions/${pos.positionId}`)}
                  className="flex items-center justify-between py-3.5 px-3 hover:bg-slate-50/70 transition rounded-xl cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-indigo-600 w-20 shrink-0">
                      {pos.positionId}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        {pos.title}
                        {pos.isLead && <span className="ml-2 text-indigo-600 font-normal">(Lead)</span>}
                      </p>
                      <p className="text-[11px] text-slate-500">{pos.purpose}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[11px] font-semibold text-slate-600">{auth.level}</span>
                    <StatusBadge status={pos.status} />
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* TAB 4: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Operational Analytics & Capacity</h3>
          <p className="text-xs text-slate-500">
            Resource metrics, workload throughput and review cycle performance.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 pt-2">
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Capacity Utilisation</p>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">84.2%</p>
              <p className="text-[11px] text-slate-500 mt-1">{metrics.activePositions} of {dept.positions} positions engaged</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Review Turnaround</p>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">1.8 hrs</p>
              <p className="text-[11px] text-slate-500 mt-1">Average time in QA gate</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Output Quality Score</p>
              <p className="text-2xl font-extrabold text-emerald-600 mt-1">9.4 / 10</p>
              <p className="text-[11px] text-slate-500 mt-1">Evaluated by GOV rubrics</p>
            </div>
          </div>
        </div>
      )}

      {/* Project Details Modal / Drawer */}
      {selectedProject && (
        <Drawer
          open
          onClose={() => setSelectedProject(null)}
          title={selectedProject.name}
          subtitle={`${selectedProject.client} · ${dept.short}`}
          footer={
            <div className="flex items-center justify-between w-full">
              <button className="btn-secondary" onClick={() => setSelectedProject(null)}>Close</button>
              <button
                className="btn-primary"
                onClick={() => {
                  navigate('/workflows')
                  setSelectedProject(null)
                }}
              >
                <ExternalLink className="h-4 w-4" /> Open Full Workflow
              </button>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-bold text-slate-500 uppercase tracking-wider">Project Objective</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{selectedProject.description}</p>
            </div>

            <div className="divide-y divide-slate-100">
              <DetailRow label="Project ID">{selectedProject.id}</DetailRow>
              <DetailRow label="Client">{selectedProject.client}</DetailRow>
              <DetailRow label="Current Stage">{selectedProject.currentStage}</DetailRow>
              <DetailRow label="Deadline">{selectedProject.deadline}</DetailRow>
              <DetailRow label="Department Role">{selectedProject.departmentRole}</DetailRow>
              <DetailRow label="Priority">{selectedProject.priority}</DetailRow>
              <DetailRow label="Next Action">{selectedProject.nextAction}</DetailRow>
            </div>
          </div>
        </Drawer>
      )}
    </div>
  )
}

// ----------------------------------------------------
// MAIN DEPARTMENTS LIST PAGE
// ----------------------------------------------------
export function DepartmentsDirectory() {
  const navigate = useNavigate()
  const [filterMode, setFilterMode] = useState('all') // 'all' | 'active'

  // Calculate Summary Metrics
  const totalDeptsCount = departments.length // 11
  const activeDeptsCount = departments.filter((d) => {
    const m = departmentMetrics[d.id]
    return m && m.activeProjects > 0
  }).length // 8
  const activityPercentage = ((activeDeptsCount / totalDeptsCount) * 100).toFixed(1) // 72.7%

  // Filtered list of departments
  const displayedDepts = useMemo(() => {
    return departments.filter((d) => {
      if (filterMode === 'active') {
        const m = departmentMetrics[d.id]
        return m && m.activeProjects > 0
      }
      return true
    })
  }, [filterMode])

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Departments</h1>
        <p className="mt-0.5 text-xs text-slate-500">
          11 departments · 194 logical positions across the operating model.
        </p>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Card 1: Total Departments */}
        <div
          onClick={() => setFilterMode('all')}
          className={`cursor-pointer rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md ${
            filterMode === 'all' ? 'border-indigo-500 ring-2 ring-indigo-100' : 'border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Total Departments
              </p>
              <p className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
                {totalDeptsCount}
              </p>
              <p className="mt-1 text-xs text-slate-500">Across the organisation</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100 shadow-xs">
              <Building2 className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Card 2: Active Departments */}
        <div
          onClick={() => setFilterMode('active')}
          className={`cursor-pointer rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md ${
            filterMode === 'active' ? 'border-emerald-500 ring-2 ring-emerald-100' : 'border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Active Departments
              </p>
              <p className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
                {activeDeptsCount}
              </p>
              <p className="mt-1 text-xs text-slate-500">Have at least one active project</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 shadow-xs">
              <LayoutGrid className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Card 3: Department Activity */}
        <div
          onClick={() => setFilterMode(filterMode === 'active' ? 'all' : 'active')}
          className="cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Department Activity
              </p>
              <p className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
                {activityPercentage}%
              </p>
              <p className="mt-1 text-xs text-slate-500">{activeDeptsCount} of {totalDeptsCount} departments are currently working</p>
            </div>
            {/* Circular Ring Indicator */}
            <div className="relative flex h-12 w-12 items-center justify-center">
              <svg className="h-12 w-12 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500 transition-all duration-500"
                  strokeDasharray={`${activityPercentage}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-[11px] font-extrabold text-slate-800">
                {Math.round(activityPercentage)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Departments List */}
      <div className="space-y-3">
        {displayedDepts.map((d) => {
          const m = departmentMetrics[d.id] || {
            activePositions: d.positions - 2,
            activeProjects: 0,
            activeAgents: 0,
            waitingReview: 0,
            status: 'Idle'
          }
          const c = deptColorMap[d.color] || deptColorMap.indigo

          return (
            <div
              key={d.id}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              {/* Left Column: Icon + Name + Prefix + Description */}
              <div className="flex items-start gap-4 min-w-0 max-w-xl">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${c.bg} ${c.text} ring-1 ${c.ring}`}>
                  <Building2 className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 hover:text-indigo-600 transition">
                      {d.name}
                    </h3>
                    <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-700">
                      {d.prefix}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {m.description || d.mandate}
                  </p>
                </div>
              </div>

              {/* Right Column: Metrics + Status + View Button */}
              <div className="flex flex-wrap items-center justify-between lg:justify-end gap-5 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                {/* 5 Distinct Metrics */}
                <div className="flex items-center gap-4 sm:gap-6 text-center">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{d.positions}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Positions</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{m.activePositions}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Active</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{m.activeProjects}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Projects</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{m.activeAgents}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Active Agents</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{m.waitingReview}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Waiting Review</p>
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${
                    m.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                      : 'bg-slate-100 text-slate-700 ring-slate-200'
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {m.status}
                </span>

                {/* View Department Button */}
                <Link
                  to={`/departments/${d.id}`}
                  className="rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition flex items-center gap-1.5"
                >
                  View Department <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Clean top-level dispatcher (strictly 1 hook: useParams)
export default function Departments() {
  const { id } = useParams()
  if (id) {
    return <DepartmentDetail key={id} deptId={id} />
  }
  return <DepartmentsDirectory />
}
