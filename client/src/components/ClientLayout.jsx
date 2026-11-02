import { useState, useRef, useEffect } from 'react'
import { NavLink, Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import {
  Home, FolderKanban, Bell, Settings, LogOut, Menu, X, Sparkles,
  ChevronDown, User, Building2, Check, ShieldCheck, Plus, CheckCircle2,
  ExternalLink
} from 'lucide-react'
import { useClient } from '../state/ClientContext'
import NewProjectModal from './NewProjectModal'
import DeliverablePreviewModal from './DeliverablePreviewModal'

// STRICTLY 4 PRIMARY NAVIGATION ITEMS
const primaryNav = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/projects', label: 'Projects', icon: FolderKanban, end: false },
  { to: '/notifications', label: 'Notifications', icon: Bell, end: false, badgeKey: 'notifications' },
  { to: '/settings', label: 'Settings', icon: Settings, end: false }
]

function SidebarContent({ onNavigate }) {
  const { unreadCount } = useClient()

  return (
    <div className="flex h-full flex-col bg-[#0d3835] text-white">
      {/* Brand header */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-[#164a46]/60">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-teal-300 ring-1 ring-white/20 shadow-xs">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="leading-tight">
          <h2 className="text-base font-bold tracking-tight text-white">Samrudhi</h2>
          <p className="text-xs font-medium text-teal-300/80">Client Portal</p>
        </div>
      </div>

      {/* 4 Primary Navigation Items */}
      <nav className="flex-1 space-y-1.5 px-3 py-6">
        {primaryNav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-[#184f4b] text-white shadow-xs'
                  : 'text-teal-100/70 hover:bg-[#144440] hover:text-white'
              }`
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            <span className="flex-1">{item.label}</span>
            {item.badgeKey === 'notifications' && unreadCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[11px] font-bold text-white shadow-xs">
                {unreadCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Branding & Status */}
      <div className="border-t border-[#164a46]/60 px-5 py-4">
        <div className="flex items-center gap-2.5 rounded-xl bg-[#092a28] px-3.5 py-2.5 ring-1 ring-white/10">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <div className="leading-tight">
            <p className="text-xs font-semibold text-teal-100">Enterprise Verified</p>
            <p className="text-[10px] text-teal-300/70">City Care Multispeciality</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Toast({ toast, onClose }) {
  if (!toast) return null
  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-pop animate-slide-in">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-teal-50 p-2 text-teal-600">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-slate-900">{toast.title}</p>
          {toast.body && <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">{toast.body}</p>}
        </div>
        <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default function ClientLayout() {
  const {
    user,
    logout,
    unreadCount,
    toast,
    dismissToast,
    requestModalOpen,
    setRequestModalOpen,
    previewDoc,
    setPreviewDoc,
    projects
  } = useClient()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const userMenuRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(dismissToast, 4000)
      return () => clearTimeout(timer)
    }
  }, [toast, dismissToast])

  // Derive page title
  const pageTitle = (() => {
    if (location.pathname === '/') return 'Home'
    if (location.pathname === '/projects') return 'Projects'
    if (location.pathname.startsWith('/projects/')) {
      const pId = location.pathname.split('/')[2]
      const proj = projects.find((p) => p.id === pId)
      return proj ? proj.name : 'Project Details'
    }
    if (location.pathname === '/notifications') return 'Notifications'
    if (location.pathname === '/settings') return 'Settings'
    return 'Home'
  })()

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      {/* Desktop Sidebar (Fixed 64 / 256px) */}
      <aside className="hidden w-64 shrink-0 shadow-sm lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-[#0d3835] shadow-xl animate-fade-in">
            <div className="flex items-center justify-between px-6 pt-5 pb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">Navigation</span>
              <button onClick={() => setMobileOpen(false)} className="rounded-lg p-1 text-teal-200 hover:bg-white/10">
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main Workspace Frame */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-30 flex h-18 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 lg:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 truncate">
              {pageTitle}
            </h1>
          </div>

          {/* Right Header: Notification Icon & Profile Pill */}
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <Link
              to="/notifications"
              className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              title="Notifications"
            >
              <Bell className="h-4.5 w-4.5" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white shadow-xs">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* Profile Pill with Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white py-1.5 pl-2 pr-3 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0d3835] text-xs font-bold text-white shadow-xs">
                  RI
                </div>
                <div className="hidden text-left sm:block">
                  <p className="text-xs font-bold text-slate-900 leading-tight">R. Iyer</p>
                  <p className="text-[11px] text-slate-500 leading-tight">City Care Hospital</p>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>

              {/* Profile Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-pop ring-1 ring-black/5 animate-fade-in z-50">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">Dr. R. Iyer</p>
                    <p className="text-[11px] text-slate-500 truncate">riyer@citycarehospital.com</p>
                  </div>
                  <div className="py-1 space-y-0.5">
                    <Link
                      to="/settings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <User className="h-4 w-4 text-slate-500" />
                      <span>Account Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Building2 className="h-4 w-4 text-slate-500" />
                      <span>Hospital Organisation</span>
                    </Link>
                    <Link
                      to="/notifications"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Bell className="h-4 w-4 text-slate-500" />
                      <span>Notifications ({unreadCount})</span>
                    </Link>
                  </div>
                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false)
                        logout()
                        navigate('/login')
                      }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global Modals */}
      <NewProjectModal open={requestModalOpen} onClose={() => setRequestModalOpen(false)} />
      <DeliverablePreviewModal doc={previewDoc} onClose={() => setPreviewDoc(null)} />
      <Toast toast={toast} onClose={dismissToast} />
    </div>
  )
}
