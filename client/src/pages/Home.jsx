import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FolderKanban, CheckCircle2, Clock, AlertTriangle, ArrowRight,
  Plus, Calendar, Video, Bot, Send, Sparkles, ChevronLeft, ChevronRight,
  FileText, ExternalLink, HelpCircle, Layers, ShieldCheck, ArrowUpRight
} from 'lucide-react'
import { useClient } from '../state/ClientContext'
import { getHomeAiResponse } from '../data/clientData'

// Mini October 2026 Calendar Widget
function OctoberCalendar({ selectedDate, onSelectDate, meetingDays = [28, 30] }) {
  // Days in October 2026: 31 days. Oct 1, 2026 was a Thursday (index 4: Sun=0, Mon=1, Tue=2, Wed=3, Thu=4)
  const firstDayIndex = 4
  const daysInMonth = 31
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const calendarDays = []
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push(null)
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d)
  }

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h4 className="text-xs font-bold text-slate-800">October 2026</h4>
        <div className="flex items-center gap-1 text-slate-400">
          <button className="p-1 hover:text-slate-700 rounded-md hover:bg-slate-50" title="Previous month">
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button className="p-1 hover:text-slate-700 rounded-md hover:bg-slate-50" title="Next month">
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1 text-center">
        {daysOfWeek.map((dow) => (
          <span key={dow} className="text-[10px] font-semibold text-slate-400">
            {dow}
          </span>
        ))}

        {calendarDays.map((day, idx) => {
          if (!day) return <div key={`empty-${idx}`} className="h-6 w-6" />
          const hasMeeting = meetingDays.includes(day)
          const isSelected = selectedDate === day
          const isToday = day === 30

          return (
            <button
              key={day}
              onClick={() => onSelectDate && onSelectDate(day)}
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-medium transition mx-auto ${
                isToday
                  ? 'bg-[#0d3835] text-white font-bold ring-2 ring-teal-200'
                  : hasMeeting
                  ? 'bg-teal-100 text-teal-900 font-bold'
                  : isSelected
                  ? 'bg-slate-200 text-slate-900'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { user, projects, meetings, metrics, setRequestModalOpen, setProjectsFilter, setToast } = useClient()

  // Selected date on calendar
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(30)

  // AI Assistant Chat State (Home Page)
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'user',
      text: 'What is the current status of my campaigns?'
    },
    {
      id: 'm2',
      sender: 'ai',
      text: 'You currently have 3 ongoing projects for City Care Hospital:',
      bullets: [
        'Cardiac Awareness Campaign is 70% complete and awaiting your content plan approval.',
        'Diabetes Care Website is 45% complete and the homepage design is in review.',
        'Maternity Services Campaign is 85% complete and pending your approval for ad creatives.'
      ]
    }
  ])
  const [inputQuery, setInputQuery] = useState('')
  const [isAiTyping, setIsAiTyping] = useState(false)

  // Active projects for Home (prioritize ongoing / approval)
  const activeProjects = useMemo(() => {
    return projects
      .filter((p) => p.statusKey === 'in_progress' || p.statusKey === 'approval')
      .slice(0, 3)
  }, [projects])

  // Suggested questions for AI Assistant
  const suggestedQuestions = [
    'Show upcoming meetings',
    'What needs my approval?',
    'Summarise this week\'s progress',
    'List all deliverables'
  ]

  const handleSendAiMessage = (queryToSend) => {
    const q = (queryToSend || inputQuery).trim()
    if (!q) return

    const userMsg = { id: `msg-${Date.now()}`, sender: 'user', text: q }
    setMessages((prev) => [...prev, userMsg])
    setInputQuery('')
    setIsAiTyping(true)

    setTimeout(() => {
      const resp = getHomeAiResponse(q, projects, meetings)
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: resp.text,
        bullets: resp.bullets,
        footer: resp.footer
      }
      setMessages((prev) => [...prev, aiMsg])
      setIsAiTyping(false)
    }, 600)
  }

  const handleMeetingJoin = (meeting) => {
    if (meeting.meetingLink) {
      window.open(meeting.meetingLink, '_blank')
    } else {
      setToast({
        title: 'Meeting link ready',
        body: `Connecting to ${meeting.title} via Google Meet.`,
        tone: 'success'
      })
    }
  }

  return (
    <div className="space-y-6 pb-12">
      {/* 2.1 Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Welcome back, {user?.name || 'R. Iyer'} 👋
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Here's an overview of your projects, recent progress and upcoming activities.
          </p>
        </div>

        <button
          onClick={() => setRequestModalOpen(true)}
          className="btn-primary self-start sm:self-auto shrink-0 shadow-xs"
        >
          <Plus className="h-4 w-4" /> Request a New Project
        </button>
      </div>

      {/* 2.2 Project Overview Metrics (3 Cards) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Card 1: Ongoing Projects */}
        <div
          onClick={() => {
            setProjectsFilter('ongoing')
            navigate('/projects')
          }}
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-teal-300 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Ongoing Projects</p>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                {metrics.ongoing}
              </p>
              <p className="mt-1 text-xs text-slate-500">Actively in progress</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-teal-200 shadow-xs transition group-hover:scale-105">
              <FolderKanban className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Card 2: Completed Projects */}
        <div
          onClick={() => {
            setProjectsFilter('completed')
            navigate('/projects')
          }}
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-emerald-300 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Completed Projects</p>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                {metrics.completed}
              </p>
              <p className="mt-1 text-xs text-slate-500">Delivered successfully</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 shadow-xs transition group-hover:scale-105">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Card 3: Waiting for Your Approval */}
        <div
          onClick={() => {
            setProjectsFilter('approval')
            navigate('/projects')
          }}
          className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-amber-300 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Waiting for Your Approval</p>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                {metrics.waitingApproval}
              </p>
              <p className="mt-1 text-xs text-slate-500">Need your review</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700 ring-1 ring-amber-200 shadow-xs transition group-hover:scale-105">
              <Clock className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Column (Active Projects) + Middle Column (Upcoming Meetings) + Right Column (AI Assistant) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* 2.3 Left Column: Active & Upcoming Projects (5 cols on lg) */}
        <div className="space-y-4 lg:col-span-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Your Active Projects</h3>
            <Link
              to="/projects"
              className="text-xs font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-1"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3.5">
            {activeProjects.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs hover:border-slate-300 transition"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-12 w-12 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-slate-900 truncate">{p.name}</h4>
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 shrink-0">
                        {p.category}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500 line-clamp-1">{p.shortDesc}</p>
                  </div>
                </div>

                {/* Progress bar & status */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[11px] mb-1 font-semibold">
                    <span className="text-slate-600">{p.progress}%</span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.waitingApproval
                          ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                          : 'bg-teal-50 text-teal-700 ring-1 ring-teal-200'
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {p.waitingApproval ? 'Waiting for Approval' : p.status}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        p.waitingApproval ? 'bg-amber-500' : 'bg-teal-600'
                      }`}
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>

                {/* Next milestone & action */}
                <div className="mt-3.5 flex items-center justify-between pt-2.5 border-t border-slate-100 text-[11px]">
                  <div className="min-w-0 pr-2">
                    <span className="text-slate-400">Next: </span>
                    <span className="font-semibold text-slate-700 truncate">{p.nextMilestone}</span>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <span className="text-slate-400 font-medium">{p.dueDate}</span>
                    <Link
                      to={`/projects/${p.id}`}
                      className="font-bold text-teal-700 hover:text-teal-900 flex items-center gap-0.5"
                    >
                      View Project <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2.5 Middle Column: Calendar and Upcoming Meetings (3 cols on lg) */}
        <div className="space-y-4 lg:col-span-3">
          <h3 className="text-base font-bold text-slate-900">Upcoming Meetings</h3>

          {/* Mini Calendar */}
          <OctoberCalendar
            selectedDate={selectedCalendarDate}
            onSelectDate={(d) => setSelectedCalendarDate(d)}
            meetingDays={[28, 30]}
          />

          {/* Meeting cards */}
          <div className="space-y-3">
            {meetings.map((m) => (
              <div
                key={m.id}
                className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs space-y-2 hover:border-slate-300 transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                      <Calendar className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900">{m.title}</h5>
                      <p className="text-[10px] text-slate-500">{m.date} · {m.timeShort}</p>
                    </div>
                  </div>
                  {m.isToday && (
                    <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[9px] font-bold text-rose-700 ring-1 ring-rose-200">
                      Today
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-600 line-clamp-1">
                  Project: <span className="font-semibold">{m.projectName}</span>
                </p>

                <button
                  onClick={() => handleMeetingJoin(m)}
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-teal-200 bg-teal-50/60 py-1.5 text-xs font-bold text-teal-800 hover:bg-teal-100 transition"
                >
                  <Video className="h-3.5 w-3.5 text-teal-600" /> Join Meeting <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 2.4 Right Column: AI Project Assistant - Home (4 cols on lg) */}
        <div className="space-y-4 lg:col-span-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
              <Bot className="h-4 w-4 text-teal-700" /> AI Assistant
            </h3>
            <p className="text-xs text-slate-500">
              Ask questions about your projects, progress and deliverables.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs flex flex-col h-[520px] overflow-hidden">
            {/* Chat message history */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start gap-2 ${
                    m.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {m.sender === 'ai' && (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#0d3835] text-white">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                  )}

                  <div
                    className={`rounded-2xl p-3 max-w-[85%] leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-teal-600 text-white rounded-br-xs font-medium'
                        : 'bg-slate-50 text-slate-800 border border-slate-200/60 rounded-bl-xs'
                    }`}
                  >
                    <p>{m.text}</p>
                    {m.bullets && (
                      <div className="mt-2 space-y-1 text-[11px] text-slate-700">
                        {m.bullets.map((b, bIdx) => (
                          <p key={bIdx}>{b}</p>
                        ))}
                      </div>
                    )}
                    {m.footer && (
                      <p className="mt-2 text-[10px] text-slate-400 italic pt-1 border-t border-slate-200/50">
                        {m.footer}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {isAiTyping && (
                <div className="flex items-center gap-2 text-slate-400 text-xs pl-8">
                  <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-ping" />
                  <span>AI assistant is retrieving project data...</span>
                </div>
              )}
            </div>

            {/* Suggested Question Pills */}
            <div className="p-3 border-t border-slate-100 bg-slate-50/50">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                You may also ask:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSendAiMessage(q)}
                    className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold text-slate-700 hover:border-teal-300 hover:bg-teal-50/50 transition truncate max-w-full"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendAiMessage()
              }}
              className="p-3 border-t border-slate-100 bg-white flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask a question about your projects..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="input py-2 text-xs flex-1 rounded-xl"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isAiTyping}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0d3835] text-white hover:bg-[#144743] disabled:opacity-40 transition"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
