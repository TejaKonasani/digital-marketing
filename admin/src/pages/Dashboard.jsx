import { useState, useMemo, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Users, Folder, CheckCircle2, Layers, Calendar as CalendarIcon,
  MessageSquare, AlertTriangle, ChevronRight, ChevronLeft, ArrowUpRight,
  Send, Edit3, PlusCircle, FileText, AlertCircle, PauseCircle,
  MinusCircle, Unplug, RotateCcw, MoreVertical, ExternalLink,
  Sun, Info, Sparkles, Building2, HeartPulse, Activity, Smile,
  Package, Smartphone, Presentation, ShieldAlert, Check,
  Hourglass, Bot, Maximize2, Minimize2, X, RefreshCw,
  Clock, ArrowRight, CornerDownLeft
} from 'lucide-react'
import { Drawer, DetailRow, Badge, EmptyState } from '../components/ui'
import { useApp } from '../state/AppContext'
import {
  SIMULATION_TODAY,
  overviewKpis,
  projectHealth,
  agentStatusSummary,
  pendingApprovals,
  upcomingDeadlines,
  recentClientActivities,
  agentAlertsAndIssues,
  assistantPrompts,
  assistantAnswers,
  generateAssistantReply,
  calculateDaysRemaining,
  formatDeadlineDate
} from '../data/overviewData'

// SVG Smooth Wave Sparklines for KPI Cards
function Sparkline({ color = '#6366f1', id = 'spark' }) {
  return (
    <svg viewBox="0 0 100 36" fill="none" className="h-7 w-20 shrink-0 overflow-visible">
      <defs>
        <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M2 28 C 15 28, 22 18, 35 22 C 48 26, 56 12, 70 16 C 84 20, 90 6, 98 8"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Donut Chart Component
function DonutChart({ total, label, slices, size = 136, strokeWidth = 14 }) {
  const center = size / 2
  const radius = center - strokeWidth / 2 - 2
  const circumference = 2 * Math.PI * radius

  let accumulated = 0
  const renderedSlices = slices.map((slice) => {
    const fraction = slice.value / total
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
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
        />
        {renderedSlices.map((slice) => (
          <circle
            key={slice.id}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={slice.color}
            strokeWidth={strokeWidth}
            strokeDasharray={slice.strokeDasharray}
            strokeDashoffset={slice.strokeDashoffset}
            strokeLinecap="butt"
            className="transition-all duration-300 hover:opacity-80"
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        <span className="text-2xl font-extrabold tracking-tight text-slate-900 leading-none">{total}</span>
        <span className="mt-1 text-[11px] font-medium text-slate-500 leading-tight">{label}</span>
      </div>
    </div>
  )
}

// Deliverable icon mapping
function DeliverableIcon({ type, className = 'h-4 w-4' }) {
  switch (type) {
    case 'sparkles':
      return <Sparkles className={className} />
    case 'chart':
      return <Activity className={className} />
    case 'activity':
      return <HeartPulse className={className} />
    case 'message':
      return <MessageSquare className={className} />
    case 'target':
      return <Smile className={className} />
    default:
      return <FileText className={className} />
  }
}

// Activity icon mapping
function ActivityIcon({ icon, className = 'h-4 w-4' }) {
  switch (icon) {
    case 'send':
      return <Send className={className} />
    case 'edit':
      return <Edit3 className={className} />
    case 'check':
      return <CheckCircle2 className={className} />
    case 'plus':
      return <PlusCircle className={className} />
    default:
      return <FileText className={className} />
  }
}

// Alert icon mapping
function AlertIcon({ icon, className = 'h-4 w-4' }) {
  switch (icon) {
    case 'alert-circle':
      return <AlertCircle className={className} />
    case 'pause-circle':
      return <PauseCircle className={className} />
    case 'minus-circle':
      return <MinusCircle className={className} />
    case 'unplug':
      return <Unplug className={className} />
    case 'rotate-ccw':
      return <RotateCcw className={className} />
    default:
      return <AlertTriangle className={className} />
  }
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useApp()

  // Deadline Filter: 'days' | 'weeks' | 'months'
  const [deadlineFilter, setDeadlineFilter] = useState('days')

  // Calendar State: October 2026 (month 9)
  const [calendarDate, setCalendarDate] = useState(new Date(2026, 9, 29))
  const [selectedDateFilter, setSelectedDateFilter] = useState(null)

  // Drawer States
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [selectedAlert, setSelectedAlert] = useState(null)

  // Context Menu Dropdown State
  const [activeMenuId, setActiveMenuId] = useState(null)

  // Samrudhi Assistant State
  const [assistantMessages, setAssistantMessages] = useState([])
  const [assistantInput, setAssistantInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [assistantMinimized, setAssistantMinimized] = useState(false)
  const [assistantExpanded, setAssistantExpanded] = useState(false)
  const chatBottomRef = useRef(null)

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [assistantMessages, isTyping])

  // Filtered Deadlines calculation
  const displayedDeadlines = useMemo(() => {
    return upcomingDeadlines
      .map((p) => {
        const daysLeft = calculateDaysRemaining(p.deadline, SIMULATION_TODAY)
        return { ...p, daysLeft }
      })
      .filter((p) => {
        if (selectedDateFilter) {
          return p.deadline === selectedDateFilter
        }
        if (deadlineFilter === 'days') {
          return p.daysLeft >= 0 && p.daysLeft <= 7
        }
        if (deadlineFilter === 'weeks') {
          return p.daysLeft >= 0 && p.daysLeft <= 28
        }
        if (deadlineFilter === 'months') {
          return p.daysLeft >= 0 && p.daysLeft <= 90
        }
        return true
      })
      .sort((a, b) => a.daysLeft - b.daysLeft)
  }, [deadlineFilter, selectedDateFilter])

  // Calendar dots map
  const deadlineDatesMap = useMemo(() => {
    const map = {}
    upcomingDeadlines.forEach((p) => {
      const days = calculateDaysRemaining(p.deadline, SIMULATION_TODAY)
      map[p.deadline] = {
        priority: p.priority,
        daysLeft: days
      }
    })
    return map
  }, [])

  // Calendar grid generator
  const calendarDays = useMemo(() => {
    const year = calendarDate.getFullYear()
    const month = calendarDate.getMonth()
    const firstDayIndex = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const prevDaysInMonth = new Date(year, month, 0).getDate()

    const days = []
    // Prev month padding
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = prevDaysInMonth - i
      const prevDate = new Date(year, month - 1, dayNum)
      const dateStr = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
      days.push({
        dayNum,
        dateStr,
        isCurrentMonth: false,
        isToday: dateStr === SIMULATION_TODAY,
        deadlineInfo: deadlineDatesMap[dateStr]
      })
    }
    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      days.push({
        dayNum: d,
        dateStr,
        isCurrentMonth: true,
        isToday: dateStr === SIMULATION_TODAY,
        deadlineInfo: deadlineDatesMap[dateStr]
      })
    }
    // Next month padding
    const remaining = (7 - (days.length % 7)) % 7
    for (let d = 1; d <= remaining; d++) {
      const nextDate = new Date(year, month + 1, d)
      const dateStr = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      days.push({
        dayNum: d,
        dateStr,
        isCurrentMonth: false,
        isToday: dateStr === SIMULATION_TODAY,
        deadlineInfo: deadlineDatesMap[dateStr]
      })
    }
    return days
  }, [calendarDate, deadlineDatesMap])

  const monthName = calendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const handlePrevMonth = () => {
    setCalendarDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }
  const handleNextMonth = () => {
    setCalendarDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  // Assistant prompt click handler
  const handleAskPrompt = (prompt) => {
    const answer = assistantAnswers[prompt.id]
    setAssistantMessages((prev) => [
      ...prev,
      { sender: 'user', text: prompt.text },
      { sender: 'assistant', data: answer }
    ])
  }

  // Assistant custom question submit
  const handleSendCustomQuestion = (e) => {
    e?.preventDefault()
    if (!assistantInput.trim()) return

    const query = assistantInput
    setAssistantInput('')
    setAssistantMessages((prev) => [...prev, { sender: 'user', text: query }])
    setIsTyping(true)

    setTimeout(() => {
      const reply = generateAssistantReply(query)
      setIsTyping(false)
      setAssistantMessages((prev) => [...prev, { sender: 'assistant', data: reply }])
    }, 450)
  }

  return (
    <div className="space-y-6 pb-12" onClick={() => setActiveMenuId(null)}>
      {/* Page Header with Greeting */}
      <div className="flex items-start gap-3.5">
        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-50 shadow-sm ring-1 ring-amber-200/60">
          <Sun className="h-5 w-5 text-amber-500 fill-amber-400/30" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Good morning, {user?.name?.split(' ')[0] || 'Demo'}
          </h1>
          <p className="mt-0.5 text-xs text-slate-500">
            Here&apos;s what&apos;s happening across Samrudhi today, Thursday 29 Oct 2026.
          </p>
        </div>
      </div>

      {/* Section A — Four Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Active Clients */}
        <div
          onClick={() => navigate(overviewKpis.activeClients.link)}
          className="group relative cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100/70 transition-transform group-hover:scale-105">
              <Users className="h-5 w-5" />
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {overviewKpis.activeClients.label}
            </p>
            <p className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
              {overviewKpis.activeClients.value}
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between pt-1">
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
              ▲ {overviewKpis.activeClients.delta} <span className="font-normal text-slate-400">{overviewKpis.activeClients.deltaLabel}</span>
            </span>
            <Sparkline color="#6366f1" id="clients" />
          </div>
        </div>

        {/* Active Projects */}
        <div
          onClick={() => navigate(overviewKpis.activeProjects.link)}
          className="group relative cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100/70 transition-transform group-hover:scale-105">
              <Folder className="h-5 w-5" />
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-200 group-hover:bg-sky-50 group-hover:text-sky-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {overviewKpis.activeProjects.label}
            </p>
            <p className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
              {overviewKpis.activeProjects.value}
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between pt-1">
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
              ▲ {overviewKpis.activeProjects.delta} <span className="font-normal text-slate-400">{overviewKpis.activeProjects.deltaLabel}</span>
            </span>
            <Sparkline color="#0ea5e9" id="active" />
          </div>
        </div>

        {/* Completed Projects */}
        <div
          onClick={() => navigate(overviewKpis.completedProjects.link)}
          className="group relative cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100/70 transition-transform group-hover:scale-105">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-200 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {overviewKpis.completedProjects.label}
            </p>
            <p className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
              {overviewKpis.completedProjects.value}
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between pt-1">
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
              ▲ {overviewKpis.completedProjects.delta} <span className="font-normal text-slate-400">{overviewKpis.completedProjects.deltaLabel}</span>
            </span>
            <Sparkline color="#10b981" id="completed" />
          </div>
        </div>

        {/* Overall Projects */}
        <div
          onClick={() => navigate(overviewKpis.overallProjects.link)}
          className="group relative cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-300 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 ring-1 ring-purple-100/70 transition-transform group-hover:scale-105">
              <Layers className="h-5 w-5" />
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-200 group-hover:bg-purple-50 group-hover:text-purple-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {overviewKpis.overallProjects.label}
            </p>
            <p className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
              {overviewKpis.overallProjects.value}
            </p>
          </div>
          <div className="mt-3 flex items-center justify-between pt-1">
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
              ▲ {overviewKpis.overallProjects.delta} <span className="font-normal text-slate-400">{overviewKpis.overallProjects.deltaLabel}</span>
            </span>
            <Sparkline color="#8b5cf6" id="overall" />
          </div>
        </div>
      </div>

      {/* Section B — Three Middle Metric Cards */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Project Health Card (5 cols on lg) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <CalendarIcon className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-900">Project Health</h2>
          </div>

          <div className="mt-4 flex flex-col items-center sm:flex-row sm:items-center justify-between gap-6">
            {/* SVG Donut */}
            <DonutChart
              total={projectHealth.total}
              label="Total Projects"
              slices={projectHealth.items}
              size={136}
              strokeWidth={14}
            />

            {/* Status Breakdown Rows */}
            <div className="flex-1 w-full space-y-2">
              {projectHealth.items.map((it) => (
                <div
                  key={it.id}
                  onClick={() => navigate(it.link)}
                  className="group flex items-center justify-between rounded-xl px-2.5 py-1.5 transition hover:bg-slate-50 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${it.dotClass}`} />
                    <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900">{it.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-900">{it.count}</span>
                    <span className="w-8 text-right text-[11px] text-slate-400">{it.pct}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Agent Status Card (4 cols on lg) */}
        <div className="lg:col-span-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
              <Bot className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-900">Agent Status</h2>
          </div>

          <div className="mt-4 flex flex-col items-center sm:flex-row sm:items-center justify-between gap-6">
            {/* SVG Donut */}
            <DonutChart
              total={agentStatusSummary.total}
              label="Total Agents"
              slices={agentStatusSummary.items}
              size={136}
              strokeWidth={14}
            />

            {/* Status Breakdown Rows */}
            <div className="flex-1 w-full space-y-2">
              {agentStatusSummary.items.map((it) => (
                <div
                  key={it.id}
                  onClick={() => navigate(it.link)}
                  className="group flex items-center justify-between rounded-xl px-2.5 py-1.5 transition hover:bg-slate-50 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${it.dotClass}`} />
                    <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900">{it.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-900">{it.count}</span>
                    <span className="w-8 text-right text-[11px] text-slate-400">{it.pct}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Approvals Card (3 cols on lg) */}
        <div className="lg:col-span-3 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-500">
                  <Hourglass className="h-4 w-4" />
                </div>
                <h2 className="text-sm font-bold text-slate-900">Pending Approvals</h2>
              </div>
              <button onClick={() => navigate('/tasks')} className="text-slate-400 hover:text-slate-600">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {pendingApprovals.items.map((app) => (
                <div
                  key={app.id}
                  onClick={() => navigate(app.link)}
                  className="group flex items-center justify-between rounded-xl px-2.5 py-1.5 transition hover:bg-slate-50 cursor-pointer"
                >
                  <span className="text-xs font-medium text-slate-700 group-hover:text-slate-900">
                    {app.label}
                  </span>
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-100 px-2 text-xs font-bold text-slate-700 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition">
                    {app.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Total awaiting action</span>
            <span className="font-extrabold text-slate-800">{pendingApprovals.total}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Area (Deadlines + Activities + Alerts) & Right Area (Samrudhi Assistant) */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Left Column (8 cols on xl if assistant visible, 12 if minimized) */}
        <div className={assistantMinimized ? 'xl:col-span-12 space-y-6' : 'xl:col-span-8 space-y-6'}>
          {/* Section C — Upcoming Deadlines */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            {/* Header */}
            <div className="flex flex-col gap-4 pb-5 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100/70">
                  <CalendarIcon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Upcoming Deadlines</h2>
                  <p className="text-xs text-slate-500">
                    Projects with nearest deadlines. Default view shows next 7 days.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                {/* Filter Toggle Pills: Days | Weeks | Months */}
                <div className="flex items-center rounded-xl bg-slate-100/80 p-1 ring-1 ring-slate-200/50">
                  <button
                    onClick={() => { setDeadlineFilter('days'); setSelectedDateFilter(null) }}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      deadlineFilter === 'days' && !selectedDateFilter
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Days
                  </button>
                  <button
                    onClick={() => { setDeadlineFilter('weeks'); setSelectedDateFilter(null) }}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      deadlineFilter === 'weeks' && !selectedDateFilter
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Weeks
                  </button>
                  <button
                    onClick={() => { setDeadlineFilter('months'); setSelectedDateFilter(null) }}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      deadlineFilter === 'months' && !selectedDateFilter
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Months
                  </button>
                </div>

                <Link
                  to="/workflows"
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition"
                >
                  View all <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Split: Calendar on Left + Deadlines Table on Right */}
            <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Mini Calendar Widget */}
              <div className="lg:col-span-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <button
                    onClick={handlePrevMonth}
                    className="rounded-lg p-1 text-slate-400 hover:bg-white hover:text-slate-700 transition"
                    title="Previous Month"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-800">{monthName}</span>
                  <button
                    onClick={handleNextMonth}
                    className="rounded-lg p-1 text-slate-400 hover:bg-white hover:text-slate-700 transition"
                    title="Next Month"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center">
                  {calendarDays.map((c, i) => {
                    const isSelected = selectedDateFilter === c.dateStr
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          if (c.deadlineInfo) {
                            setSelectedDateFilter(isSelected ? null : c.dateStr)
                          }
                        }}
                        className={`relative flex flex-col items-center justify-center rounded-lg p-1 text-xs font-medium transition ${
                          c.isToday
                            ? 'bg-indigo-600 font-bold text-white shadow-sm'
                            : isSelected
                            ? 'bg-indigo-100 text-indigo-900 ring-2 ring-indigo-500'
                            : c.isCurrentMonth
                            ? 'text-slate-700 hover:bg-white hover:shadow-xs'
                            : 'text-slate-300 hover:text-slate-400'
                        } ${c.deadlineInfo ? 'cursor-pointer' : 'cursor-default'}`}
                      >
                        <span>{c.dayNum}</span>
                        {c.deadlineInfo && (
                          <span
                            className={`mt-0.5 h-1.5 w-1.5 rounded-full ${
                              c.isToday
                                ? 'bg-amber-300'
                                : c.deadlineInfo.daysLeft <= 1
                                ? 'bg-rose-500'
                                : c.deadlineInfo.daysLeft <= 4
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                          />
                        )}
                      </button>
                    )
                  })}
                </div>

                {selectedDateFilter && (
                  <div className="mt-3 flex items-center justify-between rounded-lg bg-indigo-50/80 px-2.5 py-1.5 text-[11px] text-indigo-700">
                    <span>Filter: {formatDeadlineDate(selectedDateFilter)}</span>
                    <button
                      onClick={() => setSelectedDateFilter(null)}
                      className="font-bold hover:underline"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              {/* Deadlines Table */}
              <div className="lg:col-span-8 overflow-x-auto">
                {displayedDeadlines.length > 0 ? (
                  <table className="w-full min-w-[560px] text-left">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <th className="pb-3 pl-2">Project</th>
                        <th className="pb-3">Client</th>
                        <th className="pb-3">Deadline</th>
                        <th className="pb-3">Days Left</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Priority</th>
                        <th className="pb-3 pr-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100/80 text-xs">
                      {displayedDeadlines.map((p) => {
                        const daysLeft = p.daysLeft
                        const isUrgent = daysLeft <= 1
                        return (
                          <tr key={p.id} className="group transition-colors hover:bg-slate-50/70">
                            {/* Project Deliverable & Name */}
                            <td className="py-3 pl-2">
                              <div className="flex items-center gap-2.5">
                                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${p.iconBg}`}>
                                  <DeliverableIcon type={p.iconType} className="h-4 w-4" />
                                </div>
                                <div className="min-w-0">
                                  <p className="truncate font-semibold text-slate-900 group-hover:text-indigo-600 transition">
                                    {p.name}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Client */}
                            <td className="py-3 font-medium text-slate-700 whitespace-nowrap">
                              {p.client}
                            </td>

                            {/* Deadline */}
                            <td className="py-3 text-slate-600 whitespace-nowrap">
                              {p.deadlineFormatted}
                            </td>

                            {/* Days Left */}
                            <td className="py-3 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${
                                  isUrgent
                                    ? 'bg-rose-50 text-rose-700 ring-rose-200'
                                    : 'bg-amber-50 text-amber-700 ring-amber-200'
                                }`}
                              >
                                {p.daysLeftLabel}
                              </span>
                            </td>

                            {/* Status */}
                            <td className="py-3 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ring-inset ${
                                  p.status === 'In Review'
                                    ? 'bg-indigo-50 text-indigo-700 ring-indigo-200'
                                    : p.status === 'Client Approval'
                                    ? 'bg-amber-50 text-amber-700 ring-amber-200'
                                    : p.status === 'In Production'
                                    ? 'bg-purple-50 text-purple-700 ring-purple-200'
                                    : p.status === 'Planning'
                                    ? 'bg-sky-50 text-sky-700 ring-sky-200'
                                    : 'bg-amber-50 text-amber-700 ring-amber-200'
                                }`}
                              >
                                {p.status}
                              </span>
                            </td>

                            {/* Priority */}
                            <td className="py-3 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center gap-1 font-semibold text-[11px] ${
                                  p.priority === 'High'
                                    ? 'text-rose-600'
                                    : p.priority === 'Medium'
                                    ? 'text-amber-600'
                                    : 'text-emerald-600'
                                }`}
                              >
                                <span className="text-[10px]">▲</span>
                                {p.priority}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="py-3 pr-2 text-right whitespace-nowrap">
                              <div className="relative inline-flex items-center gap-1">
                                <button
                                  onClick={() => setSelectedProject(p)}
                                  className="rounded-lg px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition"
                                >
                                  View
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveMenuId(activeMenuId === p.id ? null : p.id)
                                  }}
                                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
                                  aria-label="More options"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </button>

                                {activeMenuId === p.id && (
                                  <div className="absolute right-0 top-8 z-30 w-44 rounded-xl border border-slate-200 bg-white p-1 text-left shadow-lg animate-fade-in">
                                    <button
                                      onClick={() => { setSelectedProject(p); setActiveMenuId(null) }}
                                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                                    >
                                      <FileText className="h-3.5 w-3.5 text-slate-400" />
                                      Inspect Details
                                    </button>
                                    <button
                                      onClick={() => { navigate(p.workflowId ? `/workflows/${p.workflowId}` : '/workflows'); setActiveMenuId(null) }}
                                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                                    >
                                      <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                                      Open Workflow
                                    </button>
                                    <button
                                      onClick={() => { navigate('/clients'); setActiveMenuId(null) }}
                                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                                    >
                                      <Building2 className="h-3.5 w-3.5 text-slate-400" />
                                      View Client
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                ) : (
                  <EmptyState
                    icon={CalendarIcon}
                    title="No upcoming project deadlines"
                    message="No project deadlines scheduled in this window."
                  />
                )}
              </div>
            </div>
          </div>

          {/* Row of Two Cards: Recent Client Activities & Agent Alerts */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Recent Client Activities */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">Recent Client Activities</h2>
                      <p className="text-[11px] text-slate-500">
                        Latest communications and approval requests with clients.
                      </p>
                    </div>
                  </div>
                  <Link to="/tasks" className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                    View all <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="mt-3 divide-y divide-slate-100">
                  {recentClientActivities.map((act) => (
                    <div
                      key={act.id}
                      onClick={() => setSelectedActivity(act)}
                      className="group flex items-start justify-between gap-3 py-3 transition cursor-pointer hover:bg-slate-50/70 rounded-xl px-2"
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${act.iconBg}`}>
                          <ActivityIcon icon={act.icon} className="h-3.5 w-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition">
                            {act.title}
                          </p>
                          <p className="mt-0.5 truncate text-[11px] text-slate-400">
                            {act.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <span className="hidden sm:inline text-[11px] text-slate-400 whitespace-nowrap">
                          {act.time}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset whitespace-nowrap ${
                            act.status === 'Awaiting Approval'
                              ? 'bg-amber-50 text-amber-700 ring-amber-200'
                              : act.status === 'Revision Requested'
                              ? 'bg-sky-50 text-sky-700 ring-sky-200'
                              : act.status === 'Approved'
                              ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                              : act.status === 'In Review'
                              ? 'bg-sky-50 text-sky-700 ring-sky-200'
                              : 'bg-purple-50 text-purple-700 ring-purple-200'
                          }`}
                        >
                          <span className="h-1 w-1 rounded-full bg-current opacity-75" />
                          {act.status}
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedActivity(act) }}
                          className="text-slate-400 hover:text-slate-600"
                        >
                          <MoreVertical className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Agent Alerts & Issues */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">Agent Alerts & Issues</h2>
                      <p className="text-[11px] text-slate-500">
                        Critical issues, failures and items requiring attention.
                      </p>
                    </div>
                  </div>
                  <Link to="/technology" className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                    View all <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="mt-3 divide-y divide-slate-100">
                  {agentAlertsAndIssues.map((alt) => (
                    <div
                      key={alt.id}
                      onClick={() => setSelectedAlert(alt)}
                      className="group flex items-start justify-between gap-3 py-3 transition cursor-pointer hover:bg-slate-50/70 rounded-xl px-2"
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${alt.iconBg}`}>
                          <AlertIcon icon={alt.icon} className="h-3.5 w-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition">
                            {alt.title}
                          </p>
                          <p className="mt-0.5 truncate text-[11px] text-slate-400">
                            {alt.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        <span className="hidden sm:inline text-[11px] text-slate-400 whitespace-nowrap">
                          {alt.time}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset whitespace-nowrap ${
                            alt.severity === 'Critical'
                              ? 'bg-rose-50 text-rose-700 ring-rose-200'
                              : alt.severity === 'High'
                              ? 'bg-amber-50 text-amber-700 ring-amber-200'
                              : 'bg-amber-50 text-amber-700 ring-amber-200'
                          }`}
                        >
                          {alt.severity === 'Critical' && <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />}
                          {alt.severity !== 'Critical' && <span className="text-[9px]">▲</span>}
                          {alt.severity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Samrudhi Assistant (4 cols on xl) */}
        {!assistantMinimized ? (
          <div className="xl:col-span-4 flex flex-col">
            <div className="sticky top-6 rounded-2xl border border-slate-200/80 bg-white shadow-sm flex flex-col h-[700px] overflow-hidden">
              {/* Assistant Header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5 bg-slate-50/40">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xs">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Samrudhi Assistant</h3>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setAssistantExpanded((prev) => !prev)}
                    className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
                    title={assistantExpanded ? 'Collapse' : 'Expand'}
                  >
                    {assistantExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => setAssistantMinimized(true)}
                    className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
                    title="Minimize"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Assistant Chat Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {assistantMessages.length === 0 ? (
                  // Welcome & Prompt Chips
                  <div className="space-y-4">
                    <div>
                      <p className="text-base font-bold text-slate-900">Hi Demo! 👋</p>
                      <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                        I can help you with project status, deadlines, client updates, agent issues and more.
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                        Try asking:
                      </p>
                      <div className="space-y-2">
                        {assistantPrompts.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => handleAskPrompt(p)}
                            className="group flex w-full items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white p-2.5 text-left transition hover:border-indigo-300 hover:bg-slate-50/70 hover:shadow-xs"
                          >
                            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${p.color}`}>
                              {p.id === 'p1' && <Sparkles className="h-3.5 w-3.5" />}
                              {p.id === 'p2' && <CalendarIcon className="h-3.5 w-3.5" />}
                              {p.id === 'p3' && <AlertTriangle className="h-3.5 w-3.5" />}
                              {p.id === 'p4' && <Check className="h-3.5 w-3.5" />}
                              {p.id === 'p5' && <Bot className="h-3.5 w-3.5" />}
                              {p.id === 'p6' && <ShieldAlert className="h-3.5 w-3.5" />}
                            </span>
                            <span className="flex-1 text-xs font-medium text-slate-700 group-hover:text-slate-900">
                              {p.text}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Active Chat Thread
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Conversation</span>
                      <button
                        onClick={() => setAssistantMessages([])}
                        className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:underline"
                      >
                        <RefreshCw className="h-3 w-3" /> Reset
                      </button>
                    </div>

                    {assistantMessages.map((msg, idx) => (
                      <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                        {msg.sender === 'user' ? (
                          <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-indigo-600 px-3.5 py-2 text-xs font-medium text-white shadow-xs">
                            {msg.text}
                          </div>
                        ) : (
                          <div className="w-full rounded-2xl rounded-tl-xs border border-slate-200 bg-slate-50/70 p-3.5 shadow-xs text-xs space-y-2.5">
                            {msg.data?.title && (
                              <p className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                                <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                                {msg.data.title}
                              </p>
                            )}
                            <div className="text-slate-700 leading-relaxed whitespace-pre-line text-xs font-normal">
                              {msg.data?.text}
                            </div>
                            {msg.data?.actions && msg.data.actions.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-200/60">
                                {msg.data.actions.map((act, i) => (
                                  <button
                                    key={i}
                                    onClick={() => navigate(act.link)}
                                    className="flex items-center gap-1 rounded-lg border border-indigo-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-indigo-700 hover:bg-indigo-50 transition shadow-xs"
                                  >
                                    {act.label} <ArrowRight className="h-3 w-3" />
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex items-center gap-1.5 rounded-2xl bg-slate-100 px-3 py-2 text-xs text-slate-500 w-20">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 delay-100" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 delay-200" />
                      </div>
                    )}
                    <div ref={chatBottomRef} />
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <div className="border-t border-slate-100 p-3 bg-white">
                <form onSubmit={handleSendCustomQuestion} className="relative flex items-center">
                  <input
                    type="text"
                    value={assistantInput}
                    onChange={(e) => setAssistantInput(e.target.value)}
                    placeholder="Ask anything about your workspace…"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-3 pr-10 text-xs text-slate-800 placeholder-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                  <button
                    type="submit"
                    disabled={!assistantInput.trim()}
                    className="absolute right-1.5 rounded-lg bg-indigo-600 p-1.5 text-white transition hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600"
                    title="Send query"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          /* Minimized Floating Launcher Pill */
          <div className="fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setAssistantMinimized(false)}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-xs font-bold text-white shadow-xl hover:shadow-2xl transition hover:scale-105"
            >
              <Sparkles className="h-4 w-4" />
              <span>Samrudhi Assistant</span>
            </button>
          </div>
        )}
      </div>

      {/* Slide-over Drawer: Project Deadline Details */}
      {selectedProject && (
        <Drawer
          open
          onClose={() => setSelectedProject(null)}
          title={selectedProject.name}
          subtitle={`${selectedProject.deliverable} · ${selectedProject.fullClient || selectedProject.client}`}
          footer={
            <div className="flex items-center justify-between w-full">
              <button
                className="btn-secondary"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </button>
              <div className="flex items-center gap-2">
                <button
                  className="btn-secondary"
                  onClick={() => {
                    navigate('/clients')
                    setSelectedProject(null)
                  }}
                >
                  <Building2 className="h-4 w-4" /> View Client
                </button>
                <button
                  className="btn-primary"
                  onClick={() => {
                    navigate(selectedProject.workflowId ? `/workflows/${selectedProject.workflowId}` : '/workflows')
                    setSelectedProject(null)
                  }}
                >
                  <ExternalLink className="h-4 w-4" /> Open Workflow
                </button>
              </div>
            </div>
          }
        >
          <div className="space-y-5 text-sm">
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Deadline Window</span>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${
                    selectedProject.daysLeft <= 1
                      ? 'bg-rose-50 text-rose-700 ring-rose-200'
                      : 'bg-amber-50 text-amber-700 ring-amber-200'
                  }`}
                >
                  {selectedProject.daysLeftLabel} remaining
                </span>
              </div>
              <p className="mt-1 text-lg font-bold text-slate-900">
                {selectedProject.deadlineFormatted}
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              <DetailRow label="Project ID">{selectedProject.id}</DetailRow>
              <DetailRow label="Client">{selectedProject.fullClient || selectedProject.client}</DetailRow>
              <DetailRow label="Deliverable">{selectedProject.deliverable}</DetailRow>
              <DetailRow label="Operating Stage">{selectedProject.stage}</DetailRow>
              <DetailRow label="Current Status">
                <span className="font-semibold text-slate-800">{selectedProject.status}</span>
              </DetailRow>
              <DetailRow label="Priority">
                <span className={`font-semibold ${selectedProject.priority === 'High' ? 'text-rose-600' : 'text-amber-600'}`}>
                  {selectedProject.priority}
                </span>
              </DetailRow>
              <DetailRow label="Responsible Agent">{selectedProject.owner}</DetailRow>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Scope Summary</p>
              <p className="text-xs text-slate-600 leading-relaxed rounded-xl border border-slate-100 bg-white p-3.5">
                {selectedProject.description}
              </p>
            </div>
          </div>
        </Drawer>
      )}

      {/* Slide-over Drawer: Recent Client Activity Details */}
      {selectedActivity && (
        <Drawer
          open
          onClose={() => setSelectedActivity(null)}
          title={selectedActivity.title}
          subtitle={`${selectedActivity.client} · ${selectedActivity.time}`}
          footer={
            <div className="flex items-center justify-between w-full">
              <button
                className="btn-secondary"
                onClick={() => setSelectedActivity(null)}
              >
                Close
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  navigate(selectedActivity.link)
                  setSelectedActivity(null)
                }}
              >
                <Check className="h-4 w-4" /> {selectedActivity.actionText}
              </button>
            </div>
          }
        >
          <div className="space-y-5 text-sm">
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Activity Status</span>
                <Badge color={selectedActivity.statusTone || 'indigo'}>{selectedActivity.status}</Badge>
              </div>
              <p className="mt-2 text-xs text-indigo-900 leading-relaxed font-medium">
                {selectedActivity.description}
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              <DetailRow label="Activity ID">{selectedActivity.id}</DetailRow>
              <DetailRow label="Client">{selectedActivity.client}</DetailRow>
              <DetailRow label="Project">{selectedActivity.project}</DetailRow>
              <DetailRow label="Timestamp">{selectedActivity.timestamp} ({selectedActivity.time})</DetailRow>
              <DetailRow label="Initiator / Agent">{selectedActivity.agent}</DetailRow>
            </div>
          </div>
        </Drawer>
      )}

      {/* Slide-over Drawer: Agent Alert Diagnostics & Root Cause */}
      {selectedAlert && (
        <Drawer
          open
          onClose={() => setSelectedAlert(null)}
          title={selectedAlert.title}
          subtitle={`${selectedAlert.agent} · ${selectedAlert.time}`}
          footer={
            <div className="flex items-center justify-between w-full">
              <button
                className="btn-secondary"
                onClick={() => setSelectedAlert(null)}
              >
                Dismiss
              </button>
              <div className="flex items-center gap-2">
                <button
                  className="btn-secondary"
                  onClick={() => {
                    navigate(selectedAlert.link)
                    setSelectedAlert(null)
                  }}
                >
                  <ShieldAlert className="h-4 w-4" /> Open Diagnostics
                </button>
                <button
                  className="btn-primary"
                  onClick={() => {
                    alert(`Simulated Action: Retry triggered for ${selectedAlert.agent}.`)
                    setSelectedAlert(null)
                  }}
                >
                  <RotateCcw className="h-4 w-4" /> Retry Agent Task
                </button>
              </div>
            </div>
          }
        >
          <div className="space-y-5 text-sm">
            <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">Severity Level</span>
                <span className="rounded-full bg-rose-600 px-2.5 py-0.5 text-xs font-bold text-white shadow-xs">
                  {selectedAlert.severity}
                </span>
              </div>
              <p className="mt-2 text-xs text-rose-900 leading-relaxed font-medium">
                {selectedAlert.explanation}
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              <DetailRow label="Alert ID">{selectedAlert.id}</DetailRow>
              <DetailRow label="Agent Position">{selectedAlert.agent}</DetailRow>
              <DetailRow label="Affected Project">{selectedAlert.project}</DetailRow>
              <DetailRow label="Client Workspace">{selectedAlert.client}</DetailRow>
              <DetailRow label="Detection Time">{selectedAlert.timestamp} ({selectedAlert.time})</DetailRow>
              <DetailRow label="Current State">{selectedAlert.status}</DetailRow>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Diagnostic Output</p>
              <div className="rounded-xl bg-slate-900 p-3.5 font-mono text-[11px] text-slate-200 leading-relaxed overflow-x-auto">
                <p className="text-rose-400">[ERROR] {selectedAlert.title}: HTTP Exception at inference gateway</p>
                <p className="text-slate-400">Agent: {selectedAlert.agent}</p>
                <p className="text-slate-400">Context: {selectedAlert.project} (Workspace: {selectedAlert.client})</p>
                <p className="text-emerald-400 mt-1">Simulated fallback: Deterministic state preserved. Human intervention permitted.</p>
              </div>
            </div>
          </div>
        </Drawer>
      )}
    </div>
  )
}
