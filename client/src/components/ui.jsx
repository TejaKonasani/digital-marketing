import React from 'react'
import { X } from 'lucide-react'

const badgeColors = {
  slate: 'bg-slate-100 text-slate-700 ring-slate-200',
  green: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  amber: 'bg-amber-50 text-amber-700 ring-amber-200',
  red: 'bg-rose-50 text-rose-700 ring-rose-200',
  blue: 'bg-sky-50 text-sky-700 ring-sky-200',
  brand: 'bg-brand-50 text-brand-700 ring-brand-200',
  violet: 'bg-violet-50 text-violet-700 ring-violet-200'
}

export function Badge({ color = 'slate', children, dot = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${badgeColors[color] || badgeColors.slate} ${className}`}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />}
      {children}
    </span>
  )
}

export function statusColor(status) {
  const map = {
    done: 'green',
    completed: 'green',
    active: 'green',
    available: 'green',
    approved: 'green',
    received: 'green',
    in_progress: 'blue',
    running: 'blue',
    pending: 'amber',
    awaiting_approval: 'amber',
    in_review: 'amber',
    approval: 'amber',
    missing: 'red',
    blocked: 'red'
  }
  return map[status] || 'slate'
}

export function StatusBadge({ status, label }) {
  return <Badge color={statusColor(status)} dot>{label || status.replace(/_/g, ' ')}</Badge>
}

export function Card({ title, subtitle, actions, children, className = '', bodyClass = '' }) {
  return (
    <div className={`card ${className}`}>
      {(title || actions) && (
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div>
            {title && <h3 className="text-sm font-bold text-slate-800">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={`p-5 ${bodyClass}`}>{children}</div>
    </div>
  )
}

export function ProgressBar({ value, color = 'bg-brand-500', className = '' }) {
  return (
    <div className={`h-2.5 w-full overflow-hidden rounded-full bg-slate-100 ${className}`}>
      <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  )
}

export function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-12 text-center">
      {Icon && (
        <div className="mb-3 rounded-full bg-white p-3 shadow-card ring-1 ring-slate-200">
          <Icon className="h-6 w-6 text-slate-400" />
        </div>
      )}
      <h4 className="text-sm font-bold text-slate-700">{title}</h4>
      {message && <p className="mt-1 max-w-sm text-xs text-slate-500">{message}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}

export function Modal({ open, onClose, title, subtitle, children, footer, wide = false }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className={`relative z-10 flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-pop sm:rounded-2xl animate-fade-in ${wide ? 'sm:max-w-3xl' : 'sm:max-w-lg'}`}>
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">{title}</h3>
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

export function DetailRow({ label, children }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5">
      <span className="shrink-0 text-xs font-medium text-slate-500">{label}</span>
      <span className="text-right text-sm text-slate-800">{children}</span>
    </div>
  )
}

export function Avatar({ name, size = 'md' }) {
  const initials = (name || '?').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  const sizes = { sm: 'h-8 w-8 text-[11px]', md: 'h-10 w-10 text-sm', lg: 'h-12 w-12 text-base' }
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-full bg-brand-600 font-semibold text-white ${sizes[size]}`}>
      {initials}
    </span>
  )
}

// Friendly "what's happening / what's next" explainer
export function NextStepBanner({ title, body, action, tone = 'brand' }) {
  const tones = {
    brand: 'bg-brand-50 ring-brand-200 text-brand-900',
    amber: 'bg-amber-50 ring-amber-200 text-amber-900',
    green: 'bg-emerald-50 ring-emerald-200 text-emerald-900'
  }
  return (
    <div className={`flex flex-col gap-3 rounded-2xl p-5 ring-1 sm:flex-row sm:items-center sm:justify-between ${tones[tone]}`}>
      <div>
        <p className="text-sm font-bold">{title}</p>
        <p className="mt-0.5 text-sm opacity-80">{body}</p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
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
            <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] ${active === t.id ? 'bg-brand-100 text-brand-700' : 'bg-slate-200 text-slate-500'}`}>
              {t.count}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}