import { useState } from 'react'
import { BarChart3, FileText, TrendingUp, TrendingDown, Minus, Info, Download } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { Card, Badge, StatusBadge, Modal } from '../components/ui'
import { reports } from '../data/clientData'

const trendData = [
  { month: 'Jun', reach: 1.6, visits: 38, enquiries: 210 },
  { month: 'Jul', reach: 1.7, visits: 41, enquiries: 240 },
  { month: 'Aug', reach: 1.9, visits: 43, enquiries: 264 },
  { month: 'Sep', reach: 2.1, visits: 48, enquiries: 312 }
]

function ReportModal({ report, onClose }) {
  if (!report) return null
  return (
    <Modal open onClose={onClose} title={report.title} subtitle={`${report.period} · ${report.delivered}`} wide>
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {report.highlights.map((h) => (
            <div key={h.label} className="rounded-xl bg-slate-50 p-3.5">
              <p className="text-lg font-bold text-slate-900">{h.value}</p>
              <p className="text-[11px] text-slate-500">{h.label}</p>
              <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <TrendingUp className="h-3 w-3" /> {h.change}
              </p>
            </div>
          ))}
        </div>

        <div>
          <p className="label">Reach & website visits (last 4 months)</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={trendData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="reach" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2f8280" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#2f8280" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Area type="monotone" dataKey="reach" name="Reach (M)" stroke="#2f8280" strokeWidth={2.5} fill="url(#reach)" />
              <Area type="monotone" dataKey="visits" name="Visits (k)" stroke="#6366f1" strokeWidth={2} fill="none" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div>
          <p className="label">What this means for you</p>
          <p className="text-sm leading-relaxed text-slate-700">{report.summary}</p>
        </div>

        <div className="flex items-start gap-2 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-600 ring-1 ring-slate-200">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          <span>
            <span className="font-semibold">How to read this:</span> Every number includes its definition, the period it covers, where the data came from and how fresh it is.
            Where data is limited, we say so instead of guessing.
          </span>
        </div>
      </div>
    </Modal>
  )
}

export default function Reports() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Reports</h1>
        <p className="mt-1 text-sm text-slate-500">
          Clear summaries of how your marketing is performing — with plain-language explanations, not just numbers.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {reports.map((r) => (
          <Card key={r.id} className="card-hover">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={`rounded-xl p-2.5 ring-1 ${r.status === 'available' ? 'bg-emerald-50 ring-emerald-100' : 'bg-slate-50 ring-slate-200'}`}>
                  <FileText className={`h-5 w-5 ${r.status === 'available' ? 'text-emerald-600' : 'text-slate-400'}`} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{r.title}</h3>
                  <p className="mt-0.5 text-xs text-slate-500">{r.period}</p>
                  <div className="mt-2">
                    <StatusBadge status={r.status} label={r.status === 'available' ? 'Ready to read' : 'In progress'} />
                  </div>
                </div>
              </div>
            </div>

            {r.status === 'available' && r.highlights.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {r.highlights.map((h) => (
                  <div key={h.label} className="rounded-xl bg-slate-50 p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-base font-bold text-slate-900">{h.value}</p>
                      <span className="flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600">
                        <TrendingUp className="h-3 w-3" /> {h.change.split(' ')[0]}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">{h.label}</p>
                  </div>
                ))}
              </div>
            )}

            <p className="mt-4 line-clamp-3 text-xs leading-relaxed text-slate-500">{r.summary}</p>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-xs text-slate-400">{r.delivered === 'In progress' ? 'Expected 31 Oct 2026' : `Delivered ${r.delivered}`}</span>
              {r.status === 'available' ? (
                <button className="btn-primary !py-2 text-xs" onClick={() => setSelected(r)}>
                  <BarChart3 className="h-3.5 w-3.5" /> Open report
                </button>
              ) : (
                <Badge color="blue">Being prepared</Badge>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card title="What every report includes" bodyClass="p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: 'Plain-language summary', d: 'What happened and what it means for you — no jargon.' },
            { t: 'Clear definitions', d: 'Every metric explains how it is measured.' },
            { t: 'Period & source', d: 'The time window and where the data came from, with freshness.' },
            { t: 'Honest limitations', d: 'Where data is limited or estimated, we say so clearly.' }
          ].map((s) => (
            <div key={s.t} className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-bold text-slate-800">{s.t}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{s.d}</p>
            </div>
          ))}
        </div>
      </Card>

      {selected && <ReportModal report={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}