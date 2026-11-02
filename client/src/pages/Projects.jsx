import { useState, useMemo, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  FolderKanban, Search, Plus, Filter, ArrowRight, CheckCircle2,
  Clock, AlertTriangle, Calendar, Layers, SlidersHorizontal, ArrowUpDown
} from 'lucide-react'
import { useClient } from '../state/ClientContext'

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams()
  const {
    projects,
    metrics,
    setRequestModalOpen,
    projectsFilter,
    setProjectsFilter
  } = useClient()

  // Handle URL query tab if passed (e.g. /projects?tab=approval)
  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam && ['all', 'ongoing', 'approval', 'completed'].includes(tabParam)) {
      setProjectsFilter(tabParam)
    }
  }, [searchParams, setProjectsFilter])

  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState('activity') // 'activity' | 'deadline' | 'progress'

  // Categories list derived from current projects
  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category))
    return ['all', ...Array.from(set)]
  }, [projects])

  // Filtered & sorted projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Tab filter
      if (projectsFilter === 'ongoing' && !(p.statusKey === 'in_progress' || p.statusKey === 'approval')) return false
      if (projectsFilter === 'approval' && !p.waitingApproval) return false
      if (projectsFilter === 'completed' && p.statusKey !== 'completed') return false

      // Category filter
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchName = p.name.toLowerCase().includes(q)
        const matchDesc = p.shortDesc.toLowerCase().includes(q)
        const matchId = p.id.toLowerCase().includes(q)
        const matchCategory = p.category.toLowerCase().includes(q)
        if (!matchName && !matchDesc && !matchId && !matchCategory) return false
      }

      return true
    }).sort((a, b) => {
      if (sortBy === 'progress') return b.progress - a.progress
      if (sortBy === 'deadline') return a.dueDate.localeCompare(b.dueDate)
      return b.lastUpdated.localeCompare(a.lastUpdated)
    })
  }, [projects, projectsFilter, categoryFilter, searchQuery, sortBy])

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header: Title, Search & Request Action */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-72">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-9.5 text-xs py-2 w-full"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input text-xs py-2 w-40 capitalize hidden sm:block"
          >
            <option value="all">All Categories</option>
            {categories.filter((c) => c !== 'all').map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setRequestModalOpen(true)}
          className="btn-primary shrink-0 self-start sm:self-auto shadow-xs"
        >
          <Plus className="h-4 w-4" /> Request New Project
        </button>
      </div>

      {/* 3.1 Project Summary (4 Cards matching Screen 2) */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {/* Card 1: Total Projects */}
        <div
          onClick={() => setProjectsFilter('all')}
          className={`cursor-pointer rounded-2xl border bg-white p-4 shadow-xs transition hover:border-slate-300 ${
            projectsFilter === 'all' ? 'border-teal-500 ring-2 ring-teal-100' : 'border-slate-200/80'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Total Projects</p>
              <p className="mt-1 text-2xl font-extrabold text-slate-900">{metrics.total}</p>
              <p className="text-[10px] text-slate-400">All your projects</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <FolderKanban className="h-4.5 w-4.5" />
            </div>
          </div>
        </div>

        {/* Card 2: Ongoing */}
        <div
          onClick={() => setProjectsFilter('ongoing')}
          className={`cursor-pointer rounded-2xl border bg-white p-4 shadow-xs transition hover:border-slate-300 ${
            projectsFilter === 'ongoing' ? 'border-teal-500 ring-2 ring-teal-100' : 'border-slate-200/80'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Ongoing</p>
              <p className="mt-1 text-2xl font-extrabold text-slate-900">{metrics.ongoing}</p>
              <p className="text-[10px] text-slate-400">In progress</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <Clock className="h-4.5 w-4.5" />
            </div>
          </div>
        </div>

        {/* Card 3: Completed */}
        <div
          onClick={() => setProjectsFilter('completed')}
          className={`cursor-pointer rounded-2xl border bg-white p-4 shadow-xs transition hover:border-slate-300 ${
            projectsFilter === 'completed' ? 'border-teal-500 ring-2 ring-teal-100' : 'border-slate-200/80'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Completed</p>
              <p className="mt-1 text-2xl font-extrabold text-slate-900">{metrics.completed}</p>
              <p className="text-[10px] text-slate-400">Delivered</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="h-4.5 w-4.5" />
            </div>
          </div>
        </div>

        {/* Card 4: Waiting for Approval */}
        <div
          onClick={() => setProjectsFilter('approval')}
          className={`cursor-pointer rounded-2xl border bg-white p-4 shadow-xs transition hover:border-slate-300 ${
            projectsFilter === 'approval' ? 'border-amber-500 ring-2 ring-amber-100' : 'border-slate-200/80'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Waiting for Approval</p>
              <p className="mt-1 text-2xl font-extrabold text-amber-700">{metrics.waitingApproval}</p>
              <p className="text-[10px] text-slate-400">Need your action</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <AlertTriangle className="h-4.5 w-4.5" />
            </div>
          </div>
        </div>
      </div>

      {/* 3.2 Filter Tabs Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-1 overflow-x-auto">
          {[
            { id: 'all', label: `All Projects (${metrics.total})` },
            { id: 'ongoing', label: `Ongoing (${metrics.ongoing})` },
            { id: 'approval', label: `Waiting for Approval (${metrics.waitingApproval})` },
            { id: 'completed', label: `Completed (${metrics.completed})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setProjectsFilter(tab.id)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition whitespace-nowrap ${
                projectsFilter === tab.id
                  ? 'bg-[#0d3835] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 self-end sm:self-auto">
          <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700"
          >
            <option value="activity">Recent Activity</option>
            <option value="deadline">Upcoming Deadline</option>
            <option value="progress">Completion %</option>
          </select>
        </div>
      </div>

      {/* 3.3 Project Cards (2x2 Grid matching Screen 2) */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <FolderKanban className="mx-auto h-10 w-10 text-slate-300" />
          <h4 className="mt-3 text-sm font-bold text-slate-700">No matching projects found</h4>
          <p className="mt-1 text-xs text-slate-400">Try adjusting your search query or switching filters.</p>
          <button
            onClick={() => {
              setProjectsFilter('all')
              setSearchQuery('')
              setCategoryFilter('all')
            }}
            className="btn-secondary mt-4 text-xs"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-slate-300 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                {/* Header: Image, Title, Tag, Status */}
                <div className="flex items-start gap-3.5">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-14 w-14 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-bold text-slate-900 truncate">{p.name}</h3>
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 shrink-0">
                        {p.category}
                      </span>
                    </div>

                    <div className="mt-1.5 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700">{p.progress}%</span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          p.statusKey === 'completed'
                            ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                            : p.waitingApproval
                            ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                            : 'bg-teal-50 text-teal-700 ring-1 ring-teal-200'
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {p.statusKey === 'completed' ? 'Completed' : p.waitingApproval ? 'Waiting for Approval' : p.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      p.statusKey === 'completed'
                        ? 'bg-emerald-500'
                        : p.waitingApproval
                        ? 'bg-amber-500'
                        : 'bg-teal-600'
                    }`}
                    style={{ width: `${p.progress}%` }}
                  />
                </div>

                {/* Dates */}
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>Start: <strong className="text-slate-700">{p.startDate}</strong></span>
                  <span>{p.completedDate ? 'Completed: ' : 'Due: '}<strong className="text-slate-700">{p.completedDate || p.dueDate}</strong></span>
                </div>

                {/* Description */}
                <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {p.description}
                </p>
              </div>

              {/* View Project Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">{p.id}</span>
                <Link
                  to={`/projects/${p.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900 transition"
                >
                  View Project <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
