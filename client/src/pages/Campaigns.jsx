import { Megaphone, TrendingUp, MousePointerClick, Users, IndianRupee, Info, Lock } from 'lucide-react'
import { Card, Badge, StatusBadge, ProgressBar } from '../components/ui'
import { campaigns } from '../data/clientData'

export default function Campaigns() {
  const active = campaigns.find((c) => c.status === 'active')
  const pending = campaigns.find((c) => c.status === 'pending')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Campaigns</h1>
        <p className="mt-1 text-sm text-slate-500">
          Your paid advertising at a glance. You'll always see the budget, what's been spent, and the results — in plain numbers.
        </p>
      </div>

      <div className="flex items-start gap-2 rounded-2xl bg-sky-50 px-4 py-3 text-xs text-sky-800 ring-1 ring-sky-200">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <span>
          In this demo, ad spend is <span className="font-semibold">simulated</span> — no real money is spent and no real ads run on any platform.
          The numbers below show how the live view will look.
        </span>
      </div>

      {active && (
        <Card title={active.name} subtitle={`${active.channel} · ${active.statusLabel}`} actions={<StatusBadge status={active.status} label={active.statusLabel} />}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-1.5 text-slate-500"><IndianRupee className="h-3.5 w-3.5" /><p className="text-[11px] font-bold uppercase tracking-wide">Budget</p></div>
              <p className="mt-1.5 text-xl font-bold text-slate-900">₹{(active.budget / 1000).toFixed(0)}k</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-1.5 text-slate-500"><TrendingUp className="h-3.5 w-3.5" /><p className="text-[11px] font-bold uppercase tracking-wide">Spent so far</p></div>
              <p className="mt-1.5 text-xl font-bold text-slate-900">₹{(active.spend / 1000).toFixed(1)}k</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-1.5 text-slate-500"><MousePointerClick className="h-3.5 w-3.5" /><p className="text-[11px] font-bold uppercase tracking-wide">Clicks</p></div>
              <p className="mt-1.5 text-xl font-bold text-slate-900">{(active.clicks / 1000).toFixed(0)}k</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-1.5 text-slate-500"><Users className="h-3.5 w-3.5" /><p className="text-[11px] font-bold uppercase tracking-wide">Leads</p></div>
              <p className="mt-1.5 text-xl font-bold text-slate-900">{active.leads.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600">Budget used</span>
              <span className="text-slate-500">{Math.round((active.spend / active.budget) * 100)}%</span>
            </div>
            <ProgressBar value={(active.spend / active.budget) * 100} className="h-2.5" />
          </div>
          <p className="mt-4 flex items-start gap-2 text-sm text-slate-600">
            <Megaphone className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
            {active.note}
          </p>
        </Card>
      )}

      {pending && (
        <Card title={pending.name} subtitle={`${pending.channel} · ${pending.statusLabel}`} actions={<Badge color="amber" dot>Waiting for your approval</Badge>}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-slate-500">
                <Lock className="h-4 w-4 text-amber-500" />
                <p className="text-sm font-semibold text-slate-700">No spend has happened yet</p>
              </div>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">{pending.note}</p>
              <div className="mt-3 flex items-center gap-4 text-sm">
                <span className="text-slate-500">Proposed budget: <span className="font-bold text-slate-800">₹{(pending.budget / 1000).toFixed(0)}k/month</span></span>
              </div>
            </div>
            <button onClick={() => navigate('/approvals')} className="btn-primary shrink-0">
              Go to approvals
            </button>
          </div>
        </Card>
      )}

      <Card title="How we protect your budget" bodyClass="p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { t: 'You set the cap', d: 'Every campaign has a monthly budget you approve. We never spend beyond it without your explicit sign-off.' },
            { t: 'Bigger changes need your yes', d: 'If we recommend increasing the budget, it comes to you as an approval request first. No surprises.' },
            { t: 'You see it all', d: 'Spend, clicks and leads are shown to you in real time, and summarised in your monthly report.' }
          ].map((s) => (
            <div key={s.t} className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-800">{s.t}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{s.d}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}