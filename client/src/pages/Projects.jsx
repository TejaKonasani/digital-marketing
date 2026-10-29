import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FolderOpen, ArrowRight, FilePlus2, CheckCircle2, Clock, ClipboardCheck, Info } from 'lucide-react'
import { Card, Badge, StatusBadge, ProgressBar, Tabs, EmptyState } from '../components/ui'
import { projects, onboarding } from '../data/clientData'

export default function Projects() {
  const [tab, setTab] = useState('all')
  const filtered = projects.filter((p) => {
    if (tab === 'all') return true
    if (tab === 'needs_you') return p.needsYou
    if (tab === 'in_progress') return p.status === 'in_progress'
    if (tab === 'completed') return p.status === 'completed'
    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">My projects</h1>
        <p className="mt-1 text-sm text-slate-500">
          Everything we're working on for you. Each project tells you what's happening, what's done, and what happens next.
        </p>
      </div>

      {/* Onboarding reminder */}
      {onboarding.progress < 100 && (
        <div className="flex flex-col gap-3 rounded-2xl bg-brand-50 p-5 ring-1 ring-brand-200 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-white p-2.5 ring-1 ring-brand-100">
              <Info className="h-5 w-5 text-brand-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-brand-900">Let's finish setting up your workspace</p>
              <p className="mt-0.5 text-sm text-brand-800">
                We still need a few brand files from you (fonts and tone of voice). It takes about 10 minutes.
              </p>
              <div className="mt-3 flex items-center gap-3">
                <ProgressBar value={onboarding.progress} className="h-2 w-40" />
                <span className="text-xs font-bold text-brand-800">{onboarding.progress}%</span>
              </div>
            </div>
          </div>
          <button className="btn-primary shrink-0">Complete setup</button>
        </div>
      )}

      <Tabs
        active={tab}
        onChange={setTab}
        tabs={[
          { id: 'all', label: 'All', count: projects.length },
          { id: 'needs_you', label: 'Needs you', count: projects.filter((p) => p.needsYou).length },
          { id: 'in_progress', label: 'In progress', count: projects.filter((p) => p.status === 'in_progress').length },
          { id: 'completed', label: 'Completed', count: projects.filter((p) => p.status === 'completed').length }
        ]}
      />

      <div className="space-y-4">
        {filtered.length === 0 && (
          <EmptyState
            icon={FolderOpen}
            title="No projects here"
            message="Projects in this category will appear here."
            action={<Link to="/new-brief" className="btn-primary"><FilePlus2 className="h-4 w-4" /> Make a new request</Link>}
          />
        )}
        {filtered.map((p) => (
          <Card key={p.id} className="card-hover">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{p.name}</h3>
                  <Badge color="slate">{p.type}</Badge>
                  <StatusBadge status={p.status} label={p.statusLabel} />
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">{p.summary}</p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-500">
                  <span>Started {p.started}</span>
                  <span>Due {p.due}</span>
                  {p.delivered && <span className="text-emerald-600">Delivered {p.delivered}</span>}
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <ProgressBar value={p.progress} className="h-2 w-28" color={p.status === 'completed' ? 'bg-emerald-500' : p.needsYou ? 'bg-amber-500' : 'bg-brand-500'} />
                  <span className="text-sm font-bold text-slate-700">{p.progress}%</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-sm text-slate-600">
                {p.needsYou ? (
                  <><ClipboardCheck className="h-4 w-4 text-amber-500" /><span><span className="font-semibold">What we need from you:</span> {p.nextAction}</span></>
                ) : p.status === 'completed' ? (
                  <><CheckCircle2 className="h-4 w-4 text-emerald-500" /><span>{p.nextAction}</span></>
                ) : (
                  <><Clock className="h-4 w-4 text-brand-500" /><span><span className="font-semibold">What happens next:</span> {p.nextAction}</span></>
                )}
              </p>
              <div className="flex gap-2">
                {p.needsYou && (
                  <Link to="/approvals" className="btn-primary !py-2 text-xs">
                    Review & approve <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
                {p.status === 'completed' && (
                  <Link to="/reports" className="btn-secondary !py-2 text-xs">View results</Link>
                )}
                <Link to="/messages" className="btn-ghost !py-2 text-xs">Ask a question</Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-2xl border border-dashed border-slate-200 bg-white p-5">
        <div>
          <p className="text-sm font-bold text-slate-800">Have something new in mind?</p>
          <p className="mt-0.5 text-xs text-slate-500">Start a new request and we'll take it from there.</p>
        </div>
        <Link to="/new-brief" className="btn-primary">
          <FilePlus2 className="h-4 w-4" /> New request
        </Link>
      </div>
    </div>
  )
}