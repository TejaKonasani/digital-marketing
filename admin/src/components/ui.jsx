import React from 'react'
import { X } from 'lucide-react'

// ---------- Badge ----------
const badgeColors = {
  slate: 'bg-slate-100 text-slate-700 ring-slate-200',
  green: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  amber: 'bg-amber-50 text-amber-700 ring-amber-200',
  yellow: 'bg-amber-50 text-amber-700 ring-amber-200',
  red: 'bg-rose-50 text-rose-700 ring-rose-200',
  rose: 'bg-rose-50 text-rose-700 ring-rose-200',
  blue: 'bg-sky-50 text-sky-700 ring-sky-200',
  sky: 'bg-sky-50 text-sky-700 ring-sky-200',
  indigo: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  violet: 'bg-violet-50 text-violet-700 ring-violet-200',
  teal: 'bg-teal-50 text-teal-700 ring-teal-200',
  orange: 'bg-orange-50 text-orange-700 ring-orange-200',
  fuchsia: 'bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200',
  cyan: 'bg-cyan-50 text-cyan-700 ring-cyan-200'
}

export function Badge({ color = 'slate', children, dot = false, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${badgeColors[color] || badgeColors.slate} ${className}`}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />}
      {children}
    </span>
  )
}

// Map common status values to badge colors
export function statusColor(status) {
  const map = {
    active: 'green',
    completed: 'green',
    paid: 'green',
    connected: 'green',
    pass: 'green',
    resolved: 'green',
    in_progress: 'blue',
    sent: 'blue',
    in_review: 'blue',
    monitoring: 'blue',
    onboarding: 'blue',
    pending: 'amber',
    pending_approval: 'amber',
    pending_authorisation: 'amber',
    needs_review: 'amber',
    needs_information: 'amber',
    draft: 'amber',
    simulation: 'amber',
    degraded: 'amber',
    at_risk: 'orange',
    overdue: 'red',
    blocked: 'red',
    escalated: 'red',
    error: 'red',
    critical: 'red',
    high: 'orange',
    medium: 'amber',
    low: 'slate',
    idle: 'slate',
    not_connected: 'slate',
    disabled: 'slate',
    queued: 'slate',
    retry: 'amber',
    retried: 'amber'
  }
  return map[status] || 'slate'
}

export function StatusBadge({ status, label }) {
  return <Badge color={statusColor(status)} dot>{label || status.replace(/_/g, ' ')}</Badge>
}

// ---------- Card ----------
export function Card({ title, subtitle, actions, children, className = '', bodyClass = '' }) {
  return (
    <div className={`card ${className}`}>
      {(title || actions) && (
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div>
            {title && <h3 className="text-sm font-semibold text-slate-800">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={`p-5 ${bodyClass}`}>{children}</div>
    </div>
  )
}

// ---------- KPI ----------
export function KpiCard({ label, value, delta, deltaLabel, icon: Icon, tone = 'indigo', hint }) {
  const tones = {
    indigo: 'bg-indigo-50 text-indigo-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-600',
    sky: 'bg-sky-50 text-sky-600',
    violet: 'bg-violet-50 text-violet-600',
    teal: 'bg-teal-50 text-teal-600'
  }
  const positive = delta !== undefined && delta >= 0
  return (
    <div className="card card-hover p-5">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
          {delta !== undefined && (
            <p className={`mt-1.5 flex items-center gap-1 text-xs font-medium ${positive ? 'text-emerald-600' : 'text-rose-600'}`}>
              <span className="inline-block text-[10px]">{positive ? '▲' : '▼'}</span>
              {Math.abs(delta)}%{deltaLabel && <span className="text-slate-400 font-normal"> {deltaLabel}</span>}
            </p>
          )}
          {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
        </div>
        {Icon && (
          <div className={`rounded-lg p-2.5 ${tones[tone]}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  )
}

// ---------- Modal ----------
export function Modal({ open, onClose, title, subtitle, children, footer, wide = false }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={onClose} />
      <div
        className={`relative z-10 flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-pop sm:rounded-2xl animate-fade-in ${wide ? 'sm:max-w-3xl' : 'sm:max-w-lg'}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/60 px-6 py-4">{footer}</div>}
      </div>
    </div>
  )
}

// ---------- Drawer (right side) ----------
export function Drawer({ open, onClose, title, subtitle, children, footer }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col bg-white shadow-pop animate-slide-in">
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-slate-900">{title}</h3>
            {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50/60 px-6 py-4">{footer}</div>}
      </div>
    </div>
  )
}

// ---------- Progress ----------
export function ProgressBar({ value, color = 'bg-indigo-500', className = '' }) {
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-slate-100 ${className}`}>
      <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  )
}

// ---------- Empty state ----------
export function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-12 text-center">
      {Icon && (
        <div className="mb-3 rounded-full bg-white p-3 shadow-card ring-1 ring-slate-200">
          <Icon className="h-6 w-6 text-slate-400" />
        </div>
      )}
      <h4 className="text-sm font-semibold text-slate-700">{title}</h4>
      {message && <p className="mt-1 max-w-sm text-xs text-slate-500">{message}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

// ---------- Tabs ----------
export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 overflow-x-auto rounded-lg bg-slate-100 p-1">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition ${
            active === t.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {t.label}
          {t.count !== undefined && (
            <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] ${active === t.id ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-500'}`}>
              {t.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

// ---------- Page header ----------
export function PageHeader({ title, description, actions, breadcrumbs }) {
  return (
    <div className="mb-6">
      {breadcrumbs && (
        <nav className="mb-2 flex items-center gap-1.5 text-xs text-slate-400">
          {breadcrumbs.map((b, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span>/</span>}
              <span className={i === breadcrumbs.length - 1 ? 'text-slate-600 font-medium' : ''}>{b}</span>
            </React.Fragment>
          ))}
        </nav>
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">{title}</h1>
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </div>
  )
}

// ---------- Simulation banner ----------
export function SimulationBanner({ compact = false }) {
  return (
    <div className={`flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 text-amber-800 ${compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm'}`}>
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
      </span>
      <span className="font-medium">Demo / simulation mode</span>
      <span className="hidden sm:inline text-amber-700/80">— external actions are simulated and never executed. No real emails, publishes, or payments occur.</span>
    </div>
  )
}

// ---------- Detail row ----------
export function DetailRow({ label, children }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <span className="shrink-0 text-xs font-medium text-slate-500">{label}</span>
      <span className="text-right text-sm text-slate-800">{children}</span>
    </div>
  )
}

// ---------- Avatar ----------
const avatarPalette = ['bg-indigo-500', 'bg-teal-500', 'bg-rose-500', 'bg-amber-500', 'bg-violet-500', 'bg-sky-500', 'bg-emerald-500', 'bg-fuchsia-500']
export function Avatar({ name, size = 'md' }) {
  const initials = (name || '?').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  const color = avatarPalette[(name || '').length % avatarPalette.length]
  const sizes = { sm: 'h-7 w-7 text-[10px]', md: 'h-9 w-9 text-xs', lg: 'h-11 w-11 text-sm' }
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${color} ${sizes[size]}`}>
      {initials}
    </span>
  )
}