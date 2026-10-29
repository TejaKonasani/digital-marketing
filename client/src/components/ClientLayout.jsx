import { useState } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  Home, FolderOpen, FilePlus2, ClipboardCheck, Megaphone, BarChart3,
  MessageSquare, Bell, Settings, HelpCircle, LogOut, Menu, X, Sparkles, ChevronDown, LifeBuoy
} from 'lucide-react'
import { useClient } from '../state/ClientContext'
import { Avatar } from './ui'

const nav = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/projects', label: 'My projects', icon: FolderOpen },
  { to: '/new-brief', label: 'New request', icon: FilePlus2 },
  { to: '/approvals', label: 'Approvals', icon: ClipboardCheck, badgeKey: 'approvals' },
  { to: '/campaigns', label: 'Campaigns', icon: Megaphone },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
  { to: '/messages', label: 'Messages', icon: MessageSquare },
  { to: '/support', label: 'Help & support', icon: LifeBuoy }
]

function SidebarContent({ onNavigate }) {
  const { notifications } = useClient()
  const unreadApprovals = 2 // R-001 + R-002 pending
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-800">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-bold text-slate-900">Samrudhi</p>
          <p className="text-[11px] font-medium text-slate-500">Your workspace</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-6">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            <item.icon className="h-4.5 w-4.5 h-[18px] w-[18px] shrink-0" />
            <span className="flex-1">{item.label}</span>
            {item.badgeKey === 'approvals' && unreadApprovals > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1.5 text-[10px] font-bold text-white">
                {unreadApprovals}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-slate-100 px-4 py-3">
        <NavLink to="/settings" onClick={onNavigate} className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
          <Settings className="h-[18px] w-[18px]" />
          <span>Account settings</span>
        </NavLink>
        <div className="mt-2 flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 ring-1 ring-amber-100">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
          </span>
          <div className="leading-tight">
            <p className="text-[11px] font-semibold text-amber-900">Demo environment</p>
            <p className="text-[10px] text-amber-700">Sample data · no real actions</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ClientLayout() {
  const { user, logout, notifications, toast, dismissToast } = useClient()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const unread = notifications.filter((n) => !n.read).length

  const pageTitle = (() => {
    for (const it of nav) if (it.to === location.pathname) return it.label
    if (location.pathname === '/settings') return 'Account settings'
    return 'Samrudhi'
  })()

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-white animate-fade-in">
            <button className="absolute right-3 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100" onClick={() => setMobileOpen(false)}>
              <X className="h-5 w-5" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 sm:px-6">
          <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <h2 className="hidden text-sm font-bold text-slate-700 sm:block">{pageTitle}</h2>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <button
                className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100"
                onClick={() => { setNotifOpen((o) => !o); setUserOpen(false) }}
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                {unread > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-white">
                    {unread}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 z-30 mt-2 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-pop animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                    <p className="text-sm font-bold text-slate-800">Notifications</p>
                    <button className="text-xs font-medium text-brand-600 hover:text-brand-700" onClick={() => { setNotifOpen(false); navigate('/messages') }}>
                      View messages
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <button
                        key={n.id}
                        className={`flex w-full flex-col gap-0.5 border-b border-slate-50 px-4 py-3 text-left hover:bg-slate-50 ${!n.read ? 'bg-brand-50/40' : ''}`}
                        onClick={() => { setNotifOpen(false); navigate(n.link) }}
                      >
                        <span className="flex items-center gap-2">
                          {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />}
                          <span className="text-xs font-bold text-slate-800">{n.title}</span>
                        </span>
                        <span className="line-clamp-2 text-xs text-slate-500">{n.body}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-100" onClick={() => { setUserOpen((o) => !o); setNotifOpen(false) }}>
                <Avatar name={user?.name || 'Client'} size="sm" />
                <div className="hidden text-left leading-tight sm:block">
                  <p className="text-xs font-bold text-slate-800">{user?.name || 'Client'}</p>
                  <p className="text-[10px] text-slate-500">{user?.role || 'Client'}</p>
                </div>
                <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
              </button>
              {userOpen && (
                <div className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-pop animate-fade-in">
                  <div className="border-b border-slate-100 px-4 py-3">
                    <p className="text-sm font-bold text-slate-800">{user?.name}</p>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                    <span className="mt-1.5 inline-block rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-medium text-brand-700">{user?.role}</span>
                  </div>
                  <button className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50" onClick={() => { setUserOpen(false); navigate('/settings') }}>
                    <Settings className="h-4 w-4" /> Account settings
                  </button>
                  <button className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50" onClick={() => { setUserOpen(false); navigate('/support') }}>
                    <HelpCircle className="h-4 w-4" /> Help & support
                  </button>
                  <button className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50" onClick={() => { logout(); navigate('/login') }}>
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto" onClick={() => { if (notifOpen) setNotifOpen(false); if (userOpen) setUserOpen(false) }}>
          <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>

      {toast && (
        <div className="fixed bottom-5 right-5 z-[60] w-80 animate-fade-in">
          <div className={`rounded-2xl border p-4 shadow-pop ${toast.tone === 'success' ? 'border-emerald-200 bg-white' : 'border-sky-200 bg-white'}`}>
            <div className="flex items-start gap-3">
              <div className={`rounded-full p-1.5 ${toast.tone === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-sky-100 text-sky-600'}`}>
                <ClipboardCheck className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-800">{toast.title}</p>
                <p className="mt-0.5 text-xs text-slate-500">{toast.body}</p>
              </div>
              <button className="text-slate-400 hover:text-slate-600" onClick={dismissToast}>
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}