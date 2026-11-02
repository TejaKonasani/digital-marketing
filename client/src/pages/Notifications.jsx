import { useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Bell, CheckCircle2, Clock, Calendar, FileText, AlertTriangle,
  MessageSquare, User, Check, ArrowRight, Video, ExternalLink,
  Sparkles, CheckCheck, FolderKanban
} from 'lucide-react'
import { useClient } from '../state/ClientContext'

export default function Notifications() {
  const navigate = useNavigate()
  const {
    notifications,
    unreadCount,
    markNotificationRead,
    markAllNotificationsRead,
    setToast
  } = useClient()

  const [filterMode, setFilterMode] = useState('all') // 'all' | 'unread'

  const displayedNotifications = useMemo(() => {
    if (filterMode === 'unread') {
      return notifications.filter((n) => !n.read)
    }
    return notifications
  }, [notifications, filterMode])

  const renderIcon = (category) => {
    switch (category) {
      case 'deliverable':
        return <FileText className="h-4.5 w-4.5 text-rose-500" />
      case 'meeting':
        return <Calendar className="h-4.5 w-4.5 text-sky-500" />
      case 'approval':
        return <AlertTriangle className="h-4.5 w-4.5 text-amber-500" />
      case 'update':
        return <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" />
      case 'message':
        return <MessageSquare className="h-4.5 w-4.5 text-teal-600" />
      case 'account':
        return <User className="h-4.5 w-4.5 text-slate-500" />
      default:
        return <Bell className="h-4.5 w-4.5 text-slate-500" />
    }
  }

  const handleNotificationClick = (item) => {
    markNotificationRead(item.id)

    if (item.meetingLink) {
      window.open(item.meetingLink, '_blank')
      return
    }

    if (item.actionLink) {
      navigate(item.actionLink)
      return
    }

    if (item.projectId) {
      navigate(`/projects/${item.projectId}`)
    }
  }

  return (
    <div className="space-y-6 max-w-4xl pb-16">
      {/* Top Header: Title, Tabs & Mark All as Read */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Notifications</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Stay informed about project milestones, meetings, deliverables and required approvals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Tabs: All vs Unread */}
          <div className="flex items-center rounded-xl bg-slate-100 p-1 text-xs font-semibold">
            <button
              onClick={() => setFilterMode('all')}
              className={`rounded-lg px-3 py-1.5 transition ${
                filterMode === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilterMode('unread')}
              className={`rounded-lg px-3 py-1.5 transition flex items-center gap-1.5 ${
                filterMode === 'unread'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Unread</span>
              {unreadCount > 0 && (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Mark all as read action */}
          {unreadCount > 0 && (
            <button
              onClick={markAllNotificationsRead}
              className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 hover:text-teal-900 transition"
            >
              <CheckCheck className="h-4 w-4" /> Mark all as read
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      {displayedNotifications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
          <Bell className="mx-auto h-10 w-10 text-slate-300" />
          <h4 className="mt-3 text-sm font-bold text-slate-700">No notifications to display</h4>
          <p className="mt-1 text-xs text-slate-400">
            {filterMode === 'unread' ? 'You have read all your notifications.' : 'No activity recorded yet.'}
          </p>
          {filterMode === 'unread' && (
            <button onClick={() => setFilterMode('all')} className="btn-secondary mt-4 text-xs">
              View All Notifications
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-2.5">
          {displayedNotifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleNotificationClick(n)}
              className={`cursor-pointer rounded-2xl border p-4 shadow-xs transition hover:border-slate-300 hover:shadow-sm flex items-start gap-4 ${
                n.read ? 'border-slate-200/80 bg-white' : 'border-teal-200/80 bg-teal-50/20'
              }`}
            >
              {/* Category Icon */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-xs ring-1 ${
                  n.read ? 'bg-slate-50 ring-slate-200' : 'bg-white ring-teal-200'
                }`}
              >
                {renderIcon(n.category)}
              </div>

              {/* Body */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-sm tracking-tight ${
                        n.read ? 'font-semibold text-slate-800' : 'font-bold text-slate-900'
                      }`}
                    >
                      {n.title}
                    </h4>
                    {!n.read && (
                      <span className="h-2 w-2 rounded-full bg-teal-600 shrink-0" title="Unread" />
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 shrink-0">{n.timeAgo}</span>
                </div>

                <p className="mt-1 text-xs text-slate-600 leading-relaxed">{n.body}</p>

                <div className="mt-2.5 flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100/70 text-[11px]">
                  {n.projectName && (
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 font-semibold text-slate-700">
                      {n.projectName}
                    </span>
                  )}

                  <span className="text-teal-700 font-semibold hover:underline flex items-center gap-1 ml-auto">
                    {n.actionText || 'View details'} <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
