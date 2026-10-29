import { useState } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Building2, Users, Bot, Workflow, Handshake, TrendingUp,
  ClipboardList, Megaphone, CheckSquare, BarChart3, Wallet, Cpu, ShieldCheck,
  Bell, Settings, UserCog, PlayCircle, Menu, X, Search, LogOut, ChevronDown, Sparkles
} from 'lucide-react'
import { useApp } from '../state/AppContext'
import { Avatar } from './ui'

const nav = [
  { section: 'Overview', items: [
    { to: '/', label: 'Executive overview', icon: LayoutDashboard, end: true },
    { to: '/demo', label: 'Demo mode', icon: PlayCircle, badge: 'demo' }
  ]},
  { section: 'Organisation', items: [
    { to: '/departments', label: 'Departments', icon: Building2 },
    { to: '/positions', label: '194 positions', icon: Users },
    { to: '/agents', label: 'Agent directory', icon: Bot }
  ]},
  { section: 'Delivery', items: [
    { to: '/workflows', label: 'Workflows', icon: Workflow },
    { to: '/clients', label: 'Clients & accounts', icon: Handshake },
    { to: '/sales', label: 'Sales pipeline', icon: TrendingUp },
    { to: '/marketing', label: 'Marketing & content', icon: Megaphone },
    { to: '/tasks', label: 'Tasks & approvals', icon: CheckSquare }
  ]},
  { section: 'Insight', items: [
    { to: '/analytics', label: 'Analytics & reporting', icon: BarChart3 },
    { to: '/finance', label: 'Finance & admin', icon: Wallet },
    { to: '/technology', label: 'Technology & AgentOps', icon: Cpu },
    { to: '/assurance', label: 'Assurance & audit', icon: ShieldCheck }
  ]},
  { section: 'Platform', items: [
    { to: '/notifications', label: 'Notifications', icon: Bell },
    { to: '/users', label: 'Users & access', icon: UserCog },
    { to: '/settings', label: 'Settings', icon: Settings }
  ]}
]

function SidebarContent({ onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-teal-500 shadow-sm">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-bold text-white">Samrudhi</p>
          <p className="text-[11px] font-medium text-slate-400">Agentic AI · Console</p>
        </div>
      </div>
      <nav className="flex-1 space-y-5 overflow-y-auto px-3 pb-6">
        {nav.map((group) => (
          <div key={group.section}>
            <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">{group.section}</p>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={onNavigate}
                  className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge === 'demo' && (
                    <span className="rounded-full bg-amber-400/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-300">demo</span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t border-white/10 px-4 py-3">
        <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="text-[11px] font-semibold text-slate-200">Simulation mode</p>
            <p className="truncate text-[10px] text-slate-400">External writes disabled</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Layout() {
  const { user, logout, notifications, toast, dismissToast } = useApp()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const unread = notifications.filter((n) => !n.read).length

  const pageTitle = (() => {
    for (const g of nav) for (const it of g.items) if (it.to === location.pathname) return it.label
    return 'Samrudhi Console'
  })()

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 bg-slate-900 lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-slate-900 animate-fade-in">
            <button className="absolute right-3 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-white/10" onClick={() => setMobileOpen(false)}>
              <X className="h-5 w-5" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 sm:px-6">
          <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
          <h2 className="hidden text-sm font-semibold text-slate-700 sm:block">{pageTitle}</h2>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                className="w-64 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm placeholder-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
                placeholder="Search clients, agents, tasks…"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                onClick={() => { setNotifOpen((o) => !o); setUserOpen(false) }}
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                {unread > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                    {unread}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 z-30 mt-2 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-pop animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                    <p className="text-sm font-semibold text-slate-800">Notifications</p>
                    <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700" onClick={() => navigate('/notifications')}>
                      View all
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.slice(0, 5).map((n) => (
                      <button
                        key={n.id}
                        className={`flex w-full flex-col gap-0.5 border-b border-slate-50 px-4 py-3 text-left hover:bg-slate-50 ${!n.read ? 'bg-indigo-50/40' : ''}`}
                        onClick={() => navigate(n.link)}
                      >
                        <span className="flex items-center gap-2">
                          {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />}
                          <span className="text-xs font-semibold text-slate-800">{n.title}</span>
                        </span>
                        <span className="line-clamp-2 text-xs text-slate-500">{n.body}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User */}
            <div className="relative">
              <button
                className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-slate-100"
                onClick={() => { setUserOpen((o) => !o); setNotifOpen(false) }}
              >
                <Avatar name={user?.name || 'Demo User'} size="sm" />
                <div className="hidden text-left leading-tight sm:block">
                  <p className="text-xs font-semibold text-slate-800">{user?.name || 'Demo User'}</p>
                  <p className="text-[10px] text-slate-500">{user?.role || 'Demo'}</p>
                </div>
                <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
              </button>
              {userOpen && (
                <div className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-pop animate-fade-in">
                  <div className="border-b border-slate-100 px-4 py-3">
                    <p className="text-sm font-semibold text-slate-800">{user?.name}</p>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                    <span className="mt-1.5 inline-block rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-medium text-indigo-700">{user?.role}</span>
                  </div>
                  <button className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50" onClick={() => { setUserOpen(false); navigate('/settings') }}>
                    <Settings className="h-4 w-4" /> Settings
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
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[60] w-80 animate-fade-in">
          <div className={`rounded-xl border p-4 shadow-pop ${toast.tone === 'success' ? 'border-emerald-200 bg-white' : 'border-sky-200 bg-white'}`}>
            <div className="flex items-start gap-3">
              <div className={`rounded-full p-1.5 ${toast.tone === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-sky-100 text-sky-600'}`}>
                <CheckSquare className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">{toast.title}</p>
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