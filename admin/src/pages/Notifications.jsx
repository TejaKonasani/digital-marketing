import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bell, Clock, AlertCircle, ShieldAlert, Calendar, Settings, CheckCheck,
  Search, Filter, CheckCircle2, FileText, Mail, CheckSquare, Activity,
  Phone, TrendingUp, ChevronRight, X, ExternalLink, ArrowRight, Lock,
  Building2, User, Sparkles, MessageSquare, Check, RefreshCw
} from 'lucide-react'
import { Card, Badge } from '../components/ui'
import { useApp } from '../state/AppContext'
import { defaultNotificationPreferences } from '../data/notificationsData'

export default function Notifications() {
  const {
    notifications,
    markRead,
    markAllRead,
    notificationPreferences,
    updateNotificationPreferences,
    toast
  } = useApp()
  const navigate = useNavigate()

  // Selected Notification for Detail Panel (default to first notification)
  const [selectedId, setSelectedId] = useState(notifications[0]?.id || 'NOTIF-001')
  const selectedNotification = useMemo(() => {
    return notifications.find((n) => n.id === selectedId) || notifications[0]
  }, [notifications, selectedId])

  // Category Pill Filter
  const [categoryFilter, setCategoryFilter] = useState('all')

  // Search & Secondary Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [clientFilter, setClientFilter] = useState('all')
  const [deptFilter, setDeptFilter] = useState('all')
  const [dateRangeFilter, setDateRangeFilter] = useState('7d')

  // Detail Panel Active Tab
  const [detailTab, setDetailTab] = useState('details')

  // Preferences Modal
  const [prefsOpen, setPrefsOpen] = useState(false)
  const [prefsForm, setPrefsForm] = useState(notificationPreferences || defaultNotificationPreferences)

  // ----------------------------------------------------------------------------
  // DYNAMIC COUNTS CALCULATION
  // ----------------------------------------------------------------------------
  const counts = useMemo(() => {
    const unread = notifications.filter((n) => !n.read).length
    const actionRequired = notifications.filter((n) => n.actionRequired).length
    const approvals = notifications.filter((n) => n.categoryKey === 'approvals').length
    const tasks = notifications.filter((n) => n.categoryKey === 'tasks').length
    const client = notifications.filter((n) => n.categoryKey === 'client').length
    const project = notifications.filter((n) => n.categoryKey === 'project').length
    const agent = notifications.filter((n) => n.categoryKey === 'agent').length
    const communications = notifications.filter((n) => n.categoryKey === 'communications').length
    const system = notifications.filter((n) => n.categoryKey === 'system').length
    const failedComms = notifications.filter(
      (n) => n.categoryKey === 'communications' && n.status.toLowerCase().includes('fail')
    ).length
    const critical = notifications.filter(
      (n) => n.priority.toLowerCase() === 'critical' || n.categoryKey === 'system'
    ).length

    return {
      all: notifications.length,
      unread,
      actionRequired,
      approvals,
      tasks,
      client,
      project,
      agent,
      communications,
      system,
      failedComms,
      critical,
      today: notifications.length
    }
  }, [notifications])

  // ----------------------------------------------------------------------------
  // FILTERED NOTIFICATIONS LIST
  // ----------------------------------------------------------------------------
  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      // Category Pill Filter
      if (categoryFilter === 'unread' && item.read) return false
      if (categoryFilter === 'action_required' && !item.actionRequired) return false
      if (categoryFilter === 'approvals' && item.categoryKey !== 'approvals') return false
      if (categoryFilter === 'tasks' && item.categoryKey !== 'tasks') return false
      if (categoryFilter === 'client' && item.categoryKey !== 'client') return false
      if (categoryFilter === 'project' && item.categoryKey !== 'project') return false
      if (categoryFilter === 'agent' && item.categoryKey !== 'agent') return false
      if (categoryFilter === 'communications' && item.categoryKey !== 'communications') return false
      if (categoryFilter === 'system' && item.categoryKey !== 'system') return false

      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        const matchTitle = item.title.toLowerCase().includes(q)
        const matchDesc = item.description.toLowerCase().includes(q)
        const matchClient = item.client?.toLowerCase().includes(q)
        const matchProject = item.project?.toLowerCase().includes(q)
        const matchId = item.id.toLowerCase().includes(q) || item.eventId.toLowerCase().includes(q)
        if (!matchTitle && !matchDesc && !matchClient && !matchProject && !matchId) return false
      }

      // Priority Filter
      if (priorityFilter !== 'all' && item.priority.toLowerCase() !== priorityFilter.toLowerCase()) {
        return false
      }

      // Client Filter
      if (clientFilter !== 'all' && !item.client?.toLowerCase().includes(clientFilter.toLowerCase())) {
        return false
      }

      // Department Filter
      if (deptFilter !== 'all' && !item.department?.toLowerCase().includes(deptFilter.toLowerCase())) {
        return false
      }

      return true
    })
  }, [notifications, categoryFilter, searchQuery, priorityFilter, clientFilter, deptFilter])

  // Group by dateGroup
  const groupedNotifications = useMemo(() => {
    const groups = {
      Today: [],
      Yesterday: [],
      'Previous 7 days': [],
      Older: []
    }
    filteredNotifications.forEach((n) => {
      if (groups[n.dateGroup]) {
        groups[n.dateGroup].push(n)
      } else {
        groups.Older.push(n)
      }
    })
    return groups
  }, [filteredNotifications])

  // Handlers
  const handleSelectNotification = (item) => {
    setSelectedId(item.id)
    if (!item.read) {
      markRead(item.id)
    }
  }

  const handleMarkAllRead = () => {
    markAllRead()
    toast('All notifications marked as read.', 'success')
  }

  const handleSavePreferences = (e) => {
    e.preventDefault()
    updateNotificationPreferences(prefsForm)
    setPrefsOpen(false)
    toast('Notification preferences saved successfully.', 'success')
  }

  // Helper for category icons
  const getCategoryIcon = (categoryKey, eventType) => {
    const t = (eventType || '').toLowerCase()
    const k = (categoryKey || '').toLowerCase()

    if (t.includes('approval') || t.includes('budget')) {
      return (
        <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
          <CheckCircle2 className="h-4 w-4" />
        </div>
      )
    }
    if (k === 'approvals' || t.includes('commercial')) {
      return (
        <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shrink-0">
          <FileText className="h-4 w-4" />
        </div>
      )
    }
    if (k === 'communications' || t.includes('email') || t.includes('whatsapp')) {
      return (
        <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
          <Mail className="h-4 w-4" />
        </div>
      )
    }
    if (k === 'tasks' || t.includes('task')) {
      return (
        <div className="w-8 h-8 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shrink-0">
          <CheckSquare className="h-4 w-4" />
        </div>
      )
    }
    if (t.includes('call')) {
      return (
        <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 shrink-0">
          <Phone className="h-4 w-4" />
        </div>
      )
    }
    if (k === 'project' || t.includes('milestone')) {
      return (
        <div className="w-8 h-8 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shrink-0">
          <TrendingUp className="h-4 w-4" />
        </div>
      )
    }
    if (k === 'system' || t.includes('violation')) {
      return (
        <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
          <ShieldAlert className="h-4 w-4" />
        </div>
      )
    }
    return (
      <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
        <Activity className="h-4 w-4" />
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 lg:p-6 max-w-7xl mx-auto pb-16">
      {/* 1. Page Header matching Reference Image */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">Notifications</h1>
          <p className="text-xs lg:text-sm text-slate-600 mt-1">
            Stay informed about client activity, project progress, tasks, approvals, agent executions and system issues.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={() => setPrefsOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Settings className="h-3.5 w-3.5 text-slate-600" />
            <span>Notification preferences</span>
          </button>
          <button
            onClick={handleMarkAllRead}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            <span>Mark all as read</span>
          </button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards (5 Cards matching Image) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Unread */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-600">Unread</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Bell className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">{counts.unread}</div>
          <div className="text-[11px] font-semibold text-rose-600 mt-1 flex items-center gap-1">
            <span>↗ +4 since yesterday</span>
          </div>
        </div>

        {/* Card 2: Action required */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-600">Action required</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <Clock className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">{counts.actionRequired}</div>
          <div className="text-[11px] text-slate-600 mt-1">
            3 approvals · 5 tasks
          </div>
        </div>

        {/* Card 3: Failed communications */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-600">Failed communications</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
              <AlertCircle className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">{counts.failedComms}</div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-1">
            ↘ -2 since yesterday
          </div>
        </div>

        {/* Card 4: Critical alerts */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-600">Critical alerts</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
              <ShieldAlert className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">{counts.critical}</div>
          <div className="text-[11px] text-slate-600 mt-1">
            1 system · 1 agent
          </div>
        </div>

        {/* Card 5: Today */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-600">Today</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Calendar className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">{counts.today}</div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-1">
            ↗ +6 vs yesterday
          </div>
        </div>
      </div>

      {/* 3. Filter Navigation Pills matching Reference Image */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
        {[
          { id: 'all', label: `All (${counts.all})` },
          { id: 'unread', label: `Unread (${counts.unread})` },
          { id: 'action_required', label: `Action required (${counts.actionRequired})` },
          { id: 'approvals', label: `Approvals (${counts.approvals})` },
          { id: 'tasks', label: `Tasks (${counts.tasks})` },
          { id: 'client', label: `Client activity (${counts.client})` },
          { id: 'project', label: `Project activity (${counts.project})` },
          { id: 'agent', label: `Agent activity (${counts.agent})` },
          { id: 'communications', label: `Communications (${counts.communications})` },
          { id: 'system', label: `System alerts (${counts.system})` }
        ].map((pill) => (
          <button
            key={pill.id}
            onClick={() => setCategoryFilter(pill.id)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors shadow-xs ${
              categoryFilter === pill.id
                ? 'bg-indigo-600 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {pill.label}
          </button>
        ))}
      </div>

      {/* 4. Search and Secondary Filters Toolbar matching Image */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="h-4 w-4 text-slate-600 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notifications..."
            className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-1 focus:ring-indigo-500 shadow-xs"
          >
            <option value="all">All priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Normal">Normal</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={clientFilter}
            onChange={(e) => setClientFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-1 focus:ring-indigo-500 shadow-xs"
          >
            <option value="all">All clients</option>
            <option value="City Care">City Care Hospital</option>
            <option value="Nirvaan">Nirvaan Wellness Clinic</option>
            <option value="Sunrise">Sunrise Dental Studio</option>
            <option value="Arogya">Arogya Clinics</option>
            <option value="Zenith">Zenith Diagnostic Centers</option>
            <option value="MediScan">MediScan Diagnostics</option>
          </select>

          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-1 focus:ring-indigo-500 shadow-xs"
          >
            <option value="all">All departments</option>
            <option value="Marketing">Marketing & Content</option>
            <option value="Finance">Finance</option>
            <option value="Sales">Sales & BD</option>
            <option value="Design">Design & Creative</option>
            <option value="Technology">Technology</option>
            <option value="Assurance">Assurance</option>
          </select>

          <select
            value={dateRangeFilter}
            onChange={(e) => setDateRangeFilter(e.target.value)}
            className="text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-1 focus:ring-indigo-500 shadow-xs"
          >
            <option value="7d">Last 7 days</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="30d">Last 30 days</option>
          </select>
        </div>
      </div>

      {/* 5. Main Content: Feed (Left) & Inspector Drawer (Right) matching Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Notification Feed (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-xs text-slate-600 shadow-xs">
              No notifications match the selected filters.
            </div>
          ) : (
            Object.entries(groupedNotifications).map(([groupTitle, items]) => {
              if (items.length === 0) return null
              const unreadInGroup = items.filter((i) => !i.read).length

              return (
                <div key={groupTitle} className="space-y-3">
                  {/* Group header */}
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{groupTitle}</h3>
                    {unreadInGroup > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        {unreadInGroup} new
                      </span>
                    )}
                  </div>

                  {/* Notification item rows */}
                  <div className="space-y-2.5">
                    {items.map((item) => {
                      const isSelected = selectedId === item.id

                      return (
                        <div
                          key={item.id}
                          onClick={() => handleSelectNotification(item)}
                          className={`bg-white rounded-xl border p-3.5 transition-all cursor-pointer flex items-start gap-3.5 shadow-xs ${
                            isSelected
                              ? 'border-indigo-600 ring-1 ring-indigo-600/30 bg-slate-50/40'
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                          }`}
                        >
                          {/* Category Icon */}
                          {getCategoryIcon(item.categoryKey, item.eventType)}

                          {/* Center Content */}
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="text-xs font-bold text-slate-900 truncate">
                                {item.title}
                              </h4>
                              <span className="text-[11px] font-mono text-slate-600 shrink-0">
                                {item.time}
                              </span>
                            </div>

                            <p className="text-xs text-slate-600 line-clamp-1 leading-snug">
                              {item.description}
                            </p>

                            {/* Tags row */}
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              {item.clientTag && (
                                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                                  {item.clientTag}
                                </span>
                              )}
                              {item.projectTag && (
                                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                                  {item.projectTag}
                                </span>
                              )}
                              {item.departmentTag && (
                                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                                  {item.departmentTag}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Right status badge, link, unread dot */}
                          <div className="flex flex-col items-end justify-between shrink-0 self-stretch pl-1">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                                  item.status.toLowerCase().includes('approved') || item.status.toLowerCase().includes('completed')
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : item.status.toLowerCase().includes('action')
                                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                    : item.status.toLowerCase().includes('failed') || item.status.toLowerCase().includes('high priority')
                                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                                }`}
                              >
                                {item.status}
                              </span>
                              {!item.read && (
                                <span className="w-2 h-2 rounded-full bg-blue-600" />
                              )}
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleSelectNotification(item)
                                if (item.deepLink) {
                                  navigate(item.deepLink)
                                }
                              }}
                              className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-0.5 pt-2"
                            >
                              <span>{item.actionLabel}</span>
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Right Column: Notification Details Panel (5 Cols) matching Image */}
        <div className="lg:col-span-5">
          {selectedNotification ? (
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4 sticky top-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-start gap-2.5">
                  {getCategoryIcon(selectedNotification.categoryKey, selectedNotification.eventType)}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      {selectedNotification.title}
                    </h3>
                    <p className="text-[11px] text-slate-600 font-mono mt-0.5">
                      {selectedNotification.timestamp}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedId(null)}
                  className="p-1 rounded-lg text-slate-600 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Highlight Banner (Green background) */}
              <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-lg flex items-start gap-2.5 text-xs text-emerald-900">
                <CheckSquare className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-semibold leading-relaxed">
                  {selectedNotification.highlightText || selectedNotification.description}
                </span>
              </div>

              {/* 3 Detail Tabs */}
              <div className="border-b border-slate-200">
                <nav className="flex gap-4 text-xs font-semibold">
                  <button
                    onClick={() => setDetailTab('details')}
                    className={`pb-2.5 border-b-2 transition-colors ${
                      detailTab === 'details'
                        ? 'border-indigo-600 text-indigo-700'
                        : 'border-transparent text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    Details
                  </button>
                  <button
                    onClick={() => setDetailTab('related')}
                    className={`pb-2.5 border-b-2 transition-colors ${
                      detailTab === 'related'
                        ? 'border-indigo-600 text-indigo-700'
                        : 'border-transparent text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    Related items
                  </button>
                  <button
                    onClick={() => setDetailTab('history')}
                    className={`pb-2.5 border-b-2 transition-colors ${
                      detailTab === 'history'
                        ? 'border-indigo-600 text-indigo-700'
                        : 'border-transparent text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    Activity history
                  </button>
                </nav>
              </div>

              {/* TAB 1: DETAILS (Key-value list matching Image) */}
              {detailTab === 'details' && (
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-start justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">Event type</span>
                    <span className="font-semibold text-slate-900 text-right">
                      {selectedNotification.eventType}
                    </span>
                  </div>

                  <div className="flex items-start justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">Client</span>
                    <span className="font-semibold text-slate-900 text-right">
                      {selectedNotification.client}
                    </span>
                  </div>

                  <div className="flex items-start justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">Project</span>
                    <button
                      onClick={() => navigate(`/analytics/projects/${selectedNotification.projectId || 'PROJ-001'}`)}
                      className="font-mono font-semibold text-indigo-600 hover:underline text-right"
                    >
                      {selectedNotification.projectId || 'PROJ-001'}
                    </button>
                  </div>

                  {selectedNotification.workflow && (
                    <div className="flex items-start justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-600">Workflow</span>
                      <button
                        onClick={() => navigate('/workflows')}
                        className="font-mono font-semibold text-indigo-600 hover:underline text-right"
                      >
                        {selectedNotification.workflow}
                      </button>
                    </div>
                  )}

                  {selectedNotification.position && (
                    <div className="flex items-start justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-600">Position / Agent</span>
                      <span className="font-semibold text-slate-800 text-right">
                        {selectedNotification.position}
                      </span>
                    </div>
                  )}

                  {selectedNotification.approvalId && (
                    <div className="flex items-start justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-600">Approval ID</span>
                      <button
                        onClick={() => navigate('/tasks')}
                        className="font-mono font-bold text-indigo-600 hover:underline text-right"
                      >
                        {selectedNotification.approvalId}
                      </button>
                    </div>
                  )}

                  {selectedNotification.approvedBy && (
                    <div className="flex items-start justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-600">Approved by</span>
                      <span className="font-medium text-slate-800 text-right">
                        {selectedNotification.approvedBy}
                      </span>
                    </div>
                  )}

                  {selectedNotification.approvedContent && (
                    <div className="flex items-start justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-600">Approved content</span>
                      <span className="font-medium text-slate-800 text-right">
                        {selectedNotification.approvedContent}
                      </span>
                    </div>
                  )}

                  {selectedNotification.comments && (
                    <div className="py-1 border-b border-slate-100 space-y-0.5">
                      <span className="text-slate-600">Comments</span>
                      <p className="text-slate-700 italic bg-slate-50 p-2 rounded border border-slate-200">
                        "{selectedNotification.comments}"
                      </p>
                    </div>
                  )}

                  {selectedNotification.nextAction && (
                    <div className="flex items-start justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-600">Next action</span>
                      <span className="font-medium text-slate-800 text-right max-w-xs">
                        {selectedNotification.nextAction}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-600">Priority</span>
                    <span className="font-semibold text-emerald-700 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {selectedNotification.priority}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-600">Status</span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {selectedNotification.status}
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 2: RELATED ITEMS */}
              {detailTab === 'related' && (
                <div className="space-y-2 text-xs">
                  <div
                    onClick={() => navigate('/clients')}
                    className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{selectedNotification.client}</div>
                      <div className="text-[11px] text-slate-600">Client Workspace & Profile</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-600" />
                  </div>

                  <div
                    onClick={() => navigate(`/analytics/projects/${selectedNotification.projectId || 'PROJ-001'}`)}
                    className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{selectedNotification.project}</div>
                      <div className="text-[11px] text-slate-600">Project Performance Report</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-600" />
                  </div>

                  <div
                    onClick={() => navigate('/technology')}
                    className="p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-slate-900">Local AI Runtime & AgentOps</div>
                      <div className="text-[11px] text-slate-600">Ollama Model Telemetry</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-600" />
                  </div>
                </div>
              )}

              {/* TAB 3: ACTIVITY HISTORY */}
              {detailTab === 'history' && (
                <div className="space-y-3 text-xs">
                  <div className="relative pl-5 space-y-3 before:absolute before:left-2 before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-slate-200">
                    <div className="relative">
                      <div className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
                      <div className="font-bold text-slate-900">Notification Instantiated</div>
                      <div className="text-[11px] text-slate-600">{selectedNotification.timestamp}</div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-blue-500 border border-white" />
                      <div className="font-bold text-slate-900">Triggered by: {selectedNotification.sourceModule}</div>
                      <div className="text-[11px] text-slate-600">Event ID: {selectedNotification.eventId}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Action Buttons matching Image */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5">
                <button
                  onClick={() => {
                    if (selectedNotification.deepLink) {
                      navigate(selectedNotification.deepLink)
                    } else {
                      navigate('/tasks')
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Open approval record</span>
                </button>
                <button
                  onClick={() => navigate(`/analytics/projects/${selectedNotification.projectId || 'PROJ-001'}`)}
                  className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-slate-600" />
                  <span>View project</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-xs text-slate-600 shadow-xs">
              Select a notification to view its complete audit details.
            </div>
          )}
        </div>
      </div>

      {/* 6. Notification Preferences Modal */}
      {prefsOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Notification Preferences</h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Configure delivery channels, subscription categories, and alert thresholds.
                </p>
              </div>
              <button
                onClick={() => setPrefsOpen(false)}
                className="p-1 rounded-lg text-slate-600 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSavePreferences} className="p-5 space-y-4 text-xs">
              {/* Delivery Channels */}
              <div className="space-y-2">
                <h4 className="font-bold uppercase tracking-wider text-slate-600 text-[11px]">
                  Delivery Channels
                </h4>
                <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="font-medium text-slate-800">In-app notifications (Console)</span>
                    <input
                      type="checkbox"
                      checked={prefsForm.channels?.inApp}
                      onChange={(e) =>
                        setPrefsForm({
                          ...prefsForm,
                          channels: { ...prefsForm.channels, inApp: e.target.checked }
                        })
                      }
                      className="text-indigo-600 focus:ring-indigo-500 rounded h-4 w-4"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="font-medium text-slate-800">Email notifications (High & Critical)</span>
                    <input
                      type="checkbox"
                      checked={prefsForm.channels?.email}
                      onChange={(e) =>
                        setPrefsForm({
                          ...prefsForm,
                          channels: { ...prefsForm.channels, email: e.target.checked }
                        })
                      }
                      className="text-indigo-600 focus:ring-indigo-500 rounded h-4 w-4"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="font-medium text-slate-800">WhatsApp emergency alerts</span>
                    <input
                      type="checkbox"
                      checked={prefsForm.channels?.whatsApp}
                      onChange={(e) =>
                        setPrefsForm({
                          ...prefsForm,
                          channels: { ...prefsForm.channels, whatsApp: e.target.checked }
                        })
                      }
                      className="text-indigo-600 focus:ring-indigo-500 rounded h-4 w-4"
                    />
                  </label>
                </div>
              </div>

              {/* Subscribed Categories */}
              <div className="space-y-2">
                <h4 className="font-bold uppercase tracking-wider text-slate-600 text-[11px]">
                  Subscribed Categories
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prefsForm.categories?.clientActivity}
                      onChange={(e) =>
                        setPrefsForm({
                          ...prefsForm,
                          categories: { ...prefsForm.categories, clientActivity: e.target.checked }
                        })
                      }
                      className="text-indigo-600 focus:ring-indigo-500 rounded h-4 w-4"
                    />
                    <span className="font-medium text-slate-800">Client activity</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prefsForm.categories?.tasksAssignments}
                      onChange={(e) =>
                        setPrefsForm({
                          ...prefsForm,
                          categories: { ...prefsForm.categories, tasksAssignments: e.target.checked }
                        })
                      }
                      className="text-indigo-600 focus:ring-indigo-500 rounded h-4 w-4"
                    />
                    <span className="font-medium text-slate-800">Tasks & assignments</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prefsForm.categories?.approvalsDecisions}
                      onChange={(e) =>
                        setPrefsForm({
                          ...prefsForm,
                          categories: { ...prefsForm.categories, approvalsDecisions: e.target.checked }
                        })
                      }
                      className="text-indigo-600 focus:ring-indigo-500 rounded h-4 w-4"
                    />
                    <span className="font-medium text-slate-800">Approvals & decisions</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prefsForm.categories?.agentActivity}
                      onChange={(e) =>
                        setPrefsForm({
                          ...prefsForm,
                          categories: { ...prefsForm.categories, agentActivity: e.target.checked }
                        })
                      }
                      className="text-indigo-600 focus:ring-indigo-500 rounded h-4 w-4"
                    />
                    <span className="font-medium text-slate-800">Agent activity</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 bg-slate-50 rounded border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={prefsForm.categories?.communications}
                      onChange={(e) =>
                        setPrefsForm({
                          ...prefsForm,
                          categories: { ...prefsForm.categories, communications: e.target.checked }
                        })
                      }
                      className="text-indigo-600 focus:ring-indigo-500 rounded h-4 w-4"
                    />
                    <span className="font-medium text-slate-800">Communications</span>
                  </label>

                  <div className="flex items-center gap-2 p-2 bg-slate-100/70 rounded border border-slate-200 text-slate-600">
                    <Lock className="h-3.5 w-3.5 text-slate-600" />
                    <span className="font-medium">System alerts (Mandatory)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setPrefsOpen(false)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
                >
                  Save preferences
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
