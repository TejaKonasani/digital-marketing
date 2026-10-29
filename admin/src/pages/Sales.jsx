import { useState, useMemo } from 'react'
import { TrendingUp, Search, Phone, FileText, Calendar, Sparkles } from 'lucide-react'
import { Card, PageHeader, Badge, KpiCard, EmptyState, Avatar, SimulationBanner } from '../components/ui'
import { pipeline, pipelineStages } from '../data/clients'

const stageTone = {
  Lead: 'bg-slate-100 text-slate-600',
  Qualified: 'bg-sky-100 text-sky-700',
  Discovery: 'bg-indigo-100 text-indigo-700',
  Proposal: 'bg-amber-100 text-amber-700',
  'Approved scope': 'bg-emerald-100 text-emerald-700'
}

export default function Sales() {
  const [query, setQuery] = useState('')
  const [stageFilter, setStageFilter] = useState('all')

  const filtered = useMemo(() => {
    return pipeline.filter((o) => {
      if (stageFilter !== 'all' && o.stage !== stageFilter) return false
      if (query && !o.name.toLowerCase().includes(query.toLowerCase())) return false
      return true
    })
  }, [query, stageFilter])

  const totalValue = pipeline.reduce((s, o) => s + o.value, 0)
  const weighted = pipeline.reduce((s, o) => s + o.value * (o.probability / 100), 0)

  return (
    <div>
      <PageHeader
        title="Sales Pipeline & Leads"
        description="SBD researches and qualifies prospects, coordinates discovery, prepares proposals and tracks commercial status. Contracts and pricing commitments remain human-authorised."
      />
      <SimulationBanner />

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Open opportunities" value={pipeline.length} icon={TrendingUp} tone="indigo" hint="Across 5 stages" />
        <KpiCard label="Pipeline value" value={`₹${(totalValue / 100000).toFixed(1)}L`} icon={Sparkles} tone="emerald" hint="Simulated" />
        <KpiCard label="Weighted forecast" value={`₹${(weighted / 100000).toFixed(1)}L`} icon={TrendingUp} tone="violet" hint="Probability-adjusted" />
        <KpiCard label="Avg. probability" value={`${Math.round(pipeline.reduce((s, o) => s + o.probability, 0) / pipeline.length)}%`} icon={Calendar} tone="sky" hint="Across open deals" />
      </div>

      {/* Stage columns (kanban) */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9" placeholder="Search opportunities…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button onClick={() => setStageFilter('all')} className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${stageFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'}`}>All</button>
          {pipelineStages.map((s) => (
            <button key={s} onClick={() => setStageFilter(s)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${stageFilter === s ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'}`}>{s}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {pipelineStages.map((stage) => {
          const items = filtered.filter((o) => o.stage === stage)
          const stageValue = items.reduce((s, o) => s + o.value, 0)
          return (
            <div key={stage} className="rounded-xl bg-slate-100/70 p-3">
              <div className="mb-3 flex items-center justify-between px-1">
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${stageTone[stage]}`}>{stage}</span>
                <span className="text-xs font-medium text-slate-500">{items.length} · ₹{(stageValue / 1000).toFixed(0)}k</span>
              </div>
              <div className="space-y-3">
                {items.map((o) => (
                  <div key={o.id} className="card p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800">{o.name}</p>
                        <p className="mt-0.5 text-xs text-slate-400">{o.id} · {o.source}</p>
                      </div>
                      <span className="shrink-0 text-sm font-bold text-slate-900">₹{(o.value / 1000).toFixed(0)}k</span>
                    </div>
                    <div className="mt-3">
                      <div className="mb-1 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Win probability</span>
                        <span className="font-semibold text-slate-700">{o.probability}%</span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-indigo-500" style={{ width: `${o.probability}%` }} />
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                      <div className="flex items-center gap-1.5">
                        <Avatar name={o.owner} size="sm" />
                        <span className="text-xs text-slate-500">{o.owner}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">Touch: {o.lastTouch}</span>
                    </div>
                    <div className="mt-2 flex items-start gap-1.5 rounded-lg bg-slate-50 px-2.5 py-2 text-xs text-slate-600">
                      <Calendar className="mt-0.5 h-3 w-3 shrink-0 text-slate-400" />
                      <span>{o.next}</span>
                    </div>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="rounded-lg border border-dashed border-slate-200 bg-white/50 px-3 py-6 text-center text-xs text-slate-400">
                    No opportunities
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <Card title="Handoff to delivery" subtitle="Approved scope is the only input onboarding may use" className="mt-4">
        <div className="flex flex-col items-start gap-3 rounded-xl bg-emerald-50/60 p-4 ring-1 ring-emerald-100 sm:flex-row sm:items-center">
          <FileText className="h-5 w-5 shrink-0 text-emerald-600" />
          <p className="text-sm leading-relaxed text-emerald-900">
            When an opportunity reaches <span className="font-semibold">Approved scope</span>, SBD hands over a human-reviewed commercial record and approved scope reference.
            Onboarding (CEX) starts only from that approved scope — discovery notes alone never trigger delivery.
          </p>
        </div>
      </Card>
    </div>
  )
}