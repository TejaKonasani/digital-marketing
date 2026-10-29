import { Link } from 'react-router-dom'
import {
  FolderOpen, ClipboardCheck, Megaphone, BarChart3, ArrowRight, Sparkles,
  CheckCircle2, Clock, FilePlus2, MessageSquare
} from 'lucide-react'
import { Card, Badge, StatusBadge, ProgressBar, NextStepBanner, Avatar } from '../components/ui'
import { useClient } from '../state/ClientContext'
import { clientProfile, projects, reports, onboarding } from '../data/clientData'

export default function Home() {
  const { user } = useClient()
  const needsYou = projects.filter((p) => p.needsYou)
  const inProgress = projects.filter((p) => p.status === 'in_progress')
  const completed = projects.filter((p) => p.status === 'completed')
  const latestReport = reports.find((r) => r.status === 'available')

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="card overflow-hidden">
        <div className="relative bg-gradient-to-br from-brand-700 to-brand-900 p-6 sm:p-8">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 85% 15%, rgba(255,255,255,0.4) 0, transparent 40%)' }} />
          <div className="relative">
            <p className="text-sm font-medium text-brand-100">Welcome back,</p>
            <h1 className="mt-0.5 text-2xl font-bold text-white">{user?.name?.split(' ')[0] || 'there'}</h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-brand-100">
              Here's a simple picture of where things stand for <span className="font-semibold text-white">{clientProfile.name}</span>.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {needsYou.length > 0 && (
                <Link to="/approvals" className="btn bg-white text-brand-800 hover:bg-brand-50">
                  <ClipboardCheck className="h-4 w-4" />
                  {needsYou.length} item{needsYou.length > 1 ? 's' : ''} need your approval
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              <Link to="/new-brief" className="btn bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20">
                <FilePlus2 className="h-4 w-4" /> New request
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* What needs you */}
      {needsYou.length > 0 && (
        <NextStepBanner
          tone="amber"
          title={`You have ${needsYou.length} thing${needsYou.length > 1 ? 's' : ''} to look at`}
          body={needsYou.map((p) => p.name).join(' and ')}
          action={
            <Link to="/approvals" className="btn-primary">
              Review now <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
      )}

      {/* Status summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card p-5">
          <div className="flex items-center gap-2 text-slate-500">
            <Clock className="h-4 w-4 text-brand-500" />
            <p className="text-xs font-bold uppercase tracking-wide">In progress</p>
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900">{inProgress.length}</p>
          <p className="mt-1 text-xs text-slate-500">We're working on these for you right now.</p>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-2 text-slate-500">
            <ClipboardCheck className="h-4 w-4 text-amber-500" />
            <p className="text-xs font-bold uppercase tracking-wide">Needs your approval</p>
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900">{needsYou.length}</p>
          <p className="mt-1 text-xs text-slate-500">These are waiting on your decision.</p>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-2 text-slate-500">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <p className="text-xs font-bold uppercase tracking-wide">Completed</p>
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900">{completed.length}</p>
          <p className="mt-1 text-xs text-slate-500">Delivered and ready for you to use.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Projects */}
        <div className="lg:col-span-2">
          <Card
            title="Your projects"
            subtitle="What we're working on, and where each one stands"
            actions={<Link to="/projects" className="text-xs font-semibold text-brand-600 hover:text-brand-700">See all</Link>}
            bodyClass="p-0"
          >
            <div className="divide-y divide-slate-100">
              {projects.map((p) => (
                <Link to="/projects" key={p.id} className="block px-5 py-4 transition hover:bg-slate-50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-bold text-slate-800">{p.name}</p>
                        <Badge color="slate">{p.type}</Badge>
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">{p.summary}</p>
                    </div>
                    <StatusBadge status={p.status} label={p.statusLabel} />
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <ProgressBar value={p.progress} className="h-2 flex-1" color={p.status === 'completed' ? 'bg-emerald-500' : p.needsYou ? 'bg-amber-500' : 'bg-brand-500'} />
                    <span className="text-xs font-semibold text-slate-600">{p.progress}%</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-600">Next:</span> {p.nextAction}
                    <span className="ml-2 text-slate-400">· Due {p.due}</span>
                  </p>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <Card title="Latest report" actions={<Link to="/reports" className="text-xs font-semibold text-brand-600 hover:text-brand-700">All reports</Link>}>
            {latestReport ? (
              <div>
                <p className="text-sm font-bold text-slate-800">{latestReport.title}</p>
                <p className="mt-1 text-xs text-slate-500">Delivered {latestReport.delivered}</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {latestReport.highlights.slice(0, 2).map((h) => (
                    <div key={h.label} className="rounded-xl bg-slate-50 p-3">
                      <p className="text-lg font-bold text-slate-900">{h.value}</p>
                      <p className="text-[11px] text-slate-500">{h.label}</p>
                    </div>
                  ))}
                </div>
                <Link to="/reports" className="btn-light mt-3 w-full !py-2 text-xs">
                  Read the report <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : (
              <p className="text-sm text-slate-500">No reports yet.</p>
            )}
          </Card>

          <Card title="Onboarding" subtitle="Setting up your workspace">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <ProgressBar value={onboarding.progress} className="h-2" />
              </div>
              <span className="text-sm font-bold text-slate-700">{onboarding.progress}%</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Almost done! We just need a couple more brand files from you to finish setting things up.
            </p>
            <Link to="/projects" className="btn-secondary mt-3 w-full !py-2 text-xs">
              Complete setup
            </Link>
          </Card>

          <div className="card p-5">
            <div className="flex items-center gap-3">
              <Avatar name={clientProfile.contact} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-800">{clientProfile.contact}</p>
                <p className="text-xs text-slate-500">{clientProfile.role} · {clientProfile.name}</p>
              </div>
            </div>
            <Link to="/messages" className="btn-ghost mt-3 w-full !py-2 text-xs">
              <MessageSquare className="h-3.5 w-3.5" /> Message your team
            </Link>
          </div>
        </div>
      </div>

      {/* How it works */}
      <Card title="How your work moves through our process" subtitle="A simple view of what happens after you make a request">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: 1, t: 'You tell us what you need', d: 'Share your idea, goals and any files. We clarify the details with you.' },
            { n: 2, t: 'We plan and create', d: 'Our team researches, writes and designs, checking quality and healthcare accuracy along the way.' },
            { n: 3, t: 'You review and approve', d: 'You see the exact content, approve it, or ask for changes. Nothing goes live without your yes.' },
            { n: 4, t: 'We publish and report', d: 'We publish (or simulate it in this demo) and show you clear results with explanations.' }
          ].map((s) => (
            <div key={s.n} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">{s.n}</div>
              <p className="mt-3 text-sm font-bold text-slate-800">{s.t}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{s.d}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}