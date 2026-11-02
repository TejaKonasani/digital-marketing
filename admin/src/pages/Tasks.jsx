import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ShieldCheck, AlertTriangle, Clock, CheckCircle2, Search, Filter,
  ArrowRight, ExternalLink, UserCheck, AlertCircle, RefreshCw, X,
  Check, FileText, ChevronRight, HelpCircle, User, Building2, CheckSquare,
  ShieldAlert, History
} from 'lucide-react'
import { Card, Badge, EmptyState } from '../components/ui'
import {
  initialPendingApprovals,
  initialBlockedItems,
  initialDecisionHistory,
  getApprovalById
} from '../data/tasksApprovalsData'
import ApprovalDetail from './ApprovalDetail'
import { useApp } from '../state/AppContext'

export default function Tasks() {
  const { id, approvalId } = useParams()
  const navigate = useNavigate()
  const { toast } = useApp()

  // If URL has an ID parameter, render the dedicated ApprovalDetail page
  if (id || approvalId) {
    return <ApprovalDetail />
  }

  const [activeTab, setActiveTab] = useState('pending')
  const [approvals, setApprovals] = useState(initialPendingApprovals)
  const [blockedItems, setBlockedItems] = useState(initialBlockedItems)
  const [history, setHistory] = useState(initialDecisionHistory)

  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [clientFilter, setClientFilter] = useState('all')

  // Resolve Blocked Item Modal
  const [resolvingBlock, setResolvingBlock] = useState(null)
  const [resolutionNote, setResolutionNote] = useState('')

  // Filtered Pending Decisions
  const filteredApprovals = useMemo(() => {
    return approvals.filter((item) => {
      const matchSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.project && item.project.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchType =
        typeFilter === 'all' || item.type.toLowerCase().includes(typeFilter.toLowerCase())

      const matchPriority =
        priorityFilter === 'all' || item.priority.toLowerCase().includes(priorityFilter.toLowerCase())

      const matchClient =
        clientFilter === 'all' || item.client.toLowerCase().includes(clientFilter.toLowerCase())

      return matchSearch && matchType && matchPriority && matchClient
    })
  }, [approvals, searchQuery, typeFilter, priorityFilter, clientFilter])

  // Filtered Blocked Items
  const filteredBlocked = useMemo(() => {
    return blockedItems.filter((item) => {
      if (!searchQuery) return true
      const q = searchQuery.toLowerCase()
      return (
        item.title.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.client.toLowerCase().includes(q) ||
        item.rootCause.toLowerCase().includes(q)
      )
    })
  }, [blockedItems, searchQuery])

  const handleResolveBlockSubmit = (e) => {
    e.preventDefault()
    if (!resolvingBlock) return

    setBlockedItems((prev) => prev.filter((b) => b.id !== resolvingBlock.id))
    toast(`Exception ${resolvingBlock.id} marked as resolved. Task unblocked in agent queue.`, 'success')
    setResolvingBlock(null)
    setResolutionNote('')
  }

  const getPriorityBadge = (priority) => {
    const p = (priority || '').toLowerCase()
    if (p.includes('critical')) {
      return (
        <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-rose-100 text-rose-800 border border-rose-200">
          Critical
        </span>
      )
    }
    if (p.includes('high')) {
      return (
        <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-rose-50 text-rose-700 border border-rose-200">
          High priority
        </span>
      )
    }
    return (
      <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-amber-50 text-amber-700 border border-amber-200">
        Medium
      </span>
    )
  }

  return (
    <div className="space-y-6 p-4 lg:p-6 max-w-7xl mx-auto pb-16">
      {/* 1. Header matching Panel 3 */}
      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">
          Tasks, Approvals & Decisions
        </h1>
        <p className="text-xs lg:text-sm text-slate-600 mt-1">
          Review and take action on items that require human decision or are blocked.
        </p>
      </div>

      {/* 2. Three Tabs matching Panel 3 */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('pending')}
            className={`pb-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'pending'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <span>Pending decisions</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                activeTab === 'pending' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {approvals.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('blocked')}
            className={`pb-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'blocked'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <span>Blocked & escalated</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                activeTab === 'blocked' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {blockedItems.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <span>Decision history</span>
          </button>
        </nav>
      </div>

      {/* 3. Search and Filters Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="h-4 w-4 text-slate-600 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, client, project or ID..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {activeTab === 'pending' && (
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">All types</option>
              <option value="Client approval">Client approval</option>
              <option value="Commercial approval">Commercial approval</option>
              <option value="External outreach">External outreach</option>
              <option value="Publishing approval">Publishing approval</option>
              <option value="Technical approval">Technical approval</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">All priority</option>
              <option value="Critical">Critical</option>
              <option value="High priority">High priority</option>
              <option value="Medium">Medium</option>
            </select>

            <select
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              className="text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-1 focus:ring-indigo-500"
            >
              <option value="all">All clients</option>
              <option value="City Care Hospital">City Care Hospital</option>
              <option value="Sunrise Dental Studio">Sunrise Dental Studio</option>
              <option value="CarePoint Home Nursing">CarePoint Home Nursing</option>
              <option value="Nirvaan Wellness">Nirvaan Wellness</option>
            </select>
          </div>
        )}
      </div>

      {/* TAB 1: PENDING DECISIONS MATCHING PANEL 3 */}
      {activeTab === 'pending' && (
        <div className="space-y-3">
          {filteredApprovals.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-xs text-slate-600">
              No pending decision gates match the selected filters.
            </div>
          ) : (
            filteredApprovals.map((appr) => (
              <div
                key={appr.id}
                className="bg-white rounded-xl border border-slate-200 p-4 hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Left: Icon, Title, Subtext, Description, Badges */}
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 text-amber-600">
                    <ShieldCheck className="h-5 w-5" />
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3
                        onClick={() => navigate(`/tasks/${appr.id}`)}
                        className="text-sm font-bold text-slate-900 cursor-pointer hover:text-indigo-600 transition-colors"
                      >
                        {appr.title}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        {appr.type}
                      </span>
                      {getPriorityBadge(appr.priority)}
                    </div>

                    <div className="text-xs text-slate-600 font-medium">
                      {appr.subtext}
                    </div>

                    <p className="text-xs text-slate-600 truncate max-w-2xl">
                      {appr.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-600 font-mono">
                      <span>ID: {appr.id}</span>
                      <span>·</span>
                      <span>Due: {appr.dueDate}</span>
                      <span>·</span>
                      <span>By: {appr.submittedBy}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Review & Decide button matching Panel 3 */}
                <div className="shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => navigate(`/tasks/${appr.id}`)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                  >
                    <span>Review & decide</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: BLOCKED & ESCALATED (5 items) */}
      {activeTab === 'blocked' && (
        <div className="space-y-3">
          {filteredBlocked.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-xs text-slate-600">
              No blocked exceptions found.
            </div>
          ) : (
            filteredBlocked.map((blk) => (
              <div
                key={blk.id}
                className="bg-white rounded-xl border border-rose-200 p-4 hover:shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0 text-rose-600">
                    <AlertTriangle className="h-5 w-5" />
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {blk.id}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">{blk.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-rose-100 text-rose-800 border border-rose-200">
                        {blk.severity} Severity
                      </span>
                    </div>

                    <div className="text-xs text-slate-600">
                      {blk.client} · <span className="font-semibold text-slate-700">{blk.project}</span>
                    </div>

                    <div className="p-2.5 bg-rose-50/60 rounded-lg border border-rose-100 text-xs space-y-1">
                      <div className="text-rose-900 font-semibold">
                        Root cause: {blk.rootCause}
                      </div>
                      <div className="text-slate-600">
                        Logical position halted: <span className="font-mono text-slate-800">{blk.position}</span> ({blk.department})
                      </div>
                      <div className="text-slate-700">
                        Resolution required: {blk.resolutionRequired}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2 self-end md:self-center">
                  <button
                    onClick={() => setResolvingBlock(blk)}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                  >
                    Resolve Block
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 3: DECISION HISTORY */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Immutable Decision & Audit Trail</h2>
            <span className="text-xs text-slate-600 font-mono">Ledger synced</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <th className="p-3.5">Decision ID</th>
                  <th className="p-3.5">Title & Type</th>
                  <th className="p-3.5">Client & Project</th>
                  <th className="p-3.5">Outcome</th>
                  <th className="p-3.5">Approver</th>
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5">Resulting Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {history.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-slate-900">{rec.decisionId}</td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{rec.title}</div>
                      <div className="text-[11px] text-slate-600">{rec.type}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-medium text-slate-800">{rec.client}</div>
                      <div className="text-[11px] text-slate-600">{rec.project}</div>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                          rec.decision === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {rec.decision}
                      </span>
                    </td>
                    <td className="p-3.5 font-medium text-slate-800">{rec.approver}</td>
                    <td className="p-3.5 text-slate-600 font-mono text-[11px]">{rec.timestamp}</td>
                    <td className="p-3.5 text-slate-700 max-w-xs">{rec.resultingAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Resolve Block Modal */}
      {resolvingBlock && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Resolve Blocked Exception</h3>
                <p className="text-xs text-slate-600 font-mono">{resolvingBlock.id}</p>
              </div>
              <button
                onClick={() => setResolvingBlock(null)}
                className="p-1 rounded-lg text-slate-600 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleResolveBlockSubmit} className="p-5 space-y-4">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1">
                <div className="font-bold text-slate-900">{resolvingBlock.title}</div>
                <div className="text-slate-600">Root cause: {resolvingBlock.rootCause}</div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Resolution Action & Notes *
                </label>
                <textarea
                  required
                  rows={3}
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  placeholder="Explain how the block was addressed and authorize resuming execution..."
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setResolvingBlock(null)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
                >
                  Confirm & Unblock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
