import { useState, useRef, useEffect } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Building2, Users, Bot, Workflow, Handshake, TrendingUp,
  ClipboardList, Megaphone, CheckSquare, BarChart3, Wallet, Cpu, ShieldCheck,
  Bell, Settings, Menu, X, Search, LogOut, ChevronDown, Sparkles,
  ArrowRight, Folder, CheckCircle2
} from 'lucide-react'
import { useApp } from '../state/AppContext'
import { Avatar } from './ui'
import { ErrorBoundary } from './ErrorBoundary'
import { searchWorkspace } from '../data/overviewData'

const nav = [
  { section: 'Overview', items: [
    { to: '/', label: 'Overview', icon: LayoutDashboard, end: true }
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
  { section: 'Intelligence & Control', items: [
    { to: '/analytics', label: 'Analytics & reporting', icon: BarChart3 },
    { to: '/finance', label: 'Finance & administration', icon: Wallet },
    { to: '/technology', label: 'Technology & AgentOps', icon: Cpu },
    { to: '/assurance', label: 'Assurance & audit', icon: ShieldCheck }
  ]},
  { section: 'Platform', items: [
    { to: '/notifications', label: 'Notifications', icon: Bell },
    { to: '/settings', label: 'Settings', icon: Settings }
  ] }
]

function SidebarContent({ onNavigate }) {
  const { notifications } = useApp()
  const unreadCount = notifications.filter((n) => !n.read).length
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
                  {((item.to === '/notifications' ? unreadCount : item.badgeCount) > 0) && (
                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                      {item.to === '/notifications' ? unreadCount : item.badgeCount}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  )
}

export default function Layout() {
  const { user, logout, notifications, markRead, markAllRead, toast, dismissToast } = useApp()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const unread = notifications.filter((n) => !n.read).length

  const searchResults = searchQuery.trim() ? searchWorkspace(searchQuery) : []

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const pageTitle = (() => {
    for (const g of nav) for (const it of g.items) if (it.to === location.pathname) return it.label
    return 'Overview'
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
          <h2 className="hidden text-base font-semibold text-slate-800 sm:block">{pageTitle}</h2>
          
          <div className="ml-auto flex items-center gap-3">
            {/* Functional Global Search with Dropdown */}
            <div className="relative hidden md:block" ref={searchRef}>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setSearchOpen(true)
                }}
                onFocus={() => setSearchOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchResults.length > 0) {
                    navigate(searchResults[0].link)
                    setSearchOpen(false)
                    setSearchQuery('')
                  }
                  if (e.key === 'Escape') {
                    setSearchOpen(false)
                  }
                }}
                className="w-72 rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-8 text-sm placeholder-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
                placeholder="Search clients, projects, agents, tasks…"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); setSearchOpen(false) }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}

              {/* Search Results Dropdown */}
              {searchOpen && searchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-96 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl animate-fade-in">
                  <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Results ({searchResults.length})
                  </div>
                  {searchResults.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        navigate(item.link)
                        setSearchOpen(false)
                        setSearchQuery('')
                      }}
                      className="flex w-full items-start gap-2.5 rounded-lg px-2.5 py-2 text-left transition hover:bg-slate-50"
                    >
                      <span className={`mt-0.5 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                        item.category === 'Client' ? 'bg-sky-50 text-sky-600 border border-sky-200' :
                        item.category === 'Project' ? 'bg-indigo-50 text-indigo-600 border border-indigo-200' :
                        item.category === 'Agent' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                        item.category === 'Position' ? 'bg-purple-50 text-purple-600 border border-purple-200' :
                        'bg-amber-50 text-amber-600 border border-amber-200'
                      }`}>
                        {item.category}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-slate-800">{item.title}</p>
                        <p className="truncate text-[11px] text-slate-400">{item.subtitle}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 transition"
                onClick={() => { setNotifOpen((o) => !o); setUserOpen(false) }}
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                {unread > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white shadow-xs">
                    {unread}
                  </span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 z-30 mt-2 w-84 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-pop animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 bg-slate-50/50">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-800">Notifications</p>
                      {unread > 0 && (
                        <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700">
                          {unread} new
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {unread > 0 && (
                        <button
                          className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700"
                          onClick={() => markAllRead()}
                        >
                          Mark read
                        </button>
                      )}
                      <button
                        className="text-[11px] font-semibold text-slate-500 hover:text-slate-700"
                        onClick={() => { setNotifOpen(false); navigate('/notifications') }}
                      >
                        View all
                      </button>
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.slice(0, 5).map((n) => (
                      <button
                        key={n.id}
                        className={`flex w-full flex-col gap-1 px-4 py-3 text-left hover:bg-slate-50 transition ${!n.read ? 'bg-indigo-50/30' : ''}`}
                        onClick={() => {
                          markRead(n.id)
                          setNotifOpen(false)
                          navigate(n.link)
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            {!n.read && <span className="h-2 w-2 rounded-full bg-indigo-600" />}
                            <span className="text-xs font-bold text-slate-800">{n.title}</span>
                          </span>
                          <span className="text-[10px] text-slate-400">{n.time}</span>
                        </div>
                        <span className="line-clamp-2 text-xs text-slate-500 leading-snug">{n.body}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill */}
            <div className="relative">
              <button
                className="flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-white py-1 pl-1 pr-3 hover:bg-slate-50 transition shadow-xs"
                onClick={() => { setUserOpen((o) => !o); setNotifOpen(false) }}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                  DU
                </div>
                <div className="text-left leading-tight hidden sm:block">
                  <p className="text-xs font-bold text-slate-800">{user?.name || 'Super Admin'}</p>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>
              {userOpen && (
                <div className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-pop animate-fade-in">
                  <div className="border-b border-slate-100 px-4 py-3">
                    <p className="text-sm font-bold text-slate-800">{user?.name || 'Super Admin'}</p>
                    <p className="text-xs text-slate-500">{user?.email || 'admin@samrudhi.ai'}</p>
                    <span className="mt-1.5 inline-block rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">Company Admin</span>
                  </div>
                  <button className="flex w-full items-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition" onClick={() => { setUserOpen(false); navigate('/settings') }}>
                    <Settings className="h-4 w-4" /> Settings
                  </button>
                  <button className="flex w-full items-center gap-2 px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition" onClick={() => { logout(); navigate('/login') }}>
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto" onClick={() => { if (notifOpen) setNotifOpen(false); if (userOpen) setUserOpen(false); if (searchOpen) setSearchOpen(false) }}>
          <div className="mx-auto max-w-[1600px] w-full px-4 py-6 sm:px-6 lg:px-8">
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[60] w-84 animate-fade-in">
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
