import { BarChart3, TrendingUp, Database, PieChart as PieIcon, Activity } from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts'
import { Card, PageHeader, KpiCard, Badge, SimulationBanner } from '../components/ui'
import { analytics } from '../data/finance'

const PIE_COLORS = ['#6366f1', '#14b8a6', '#f59e0b', '#f43f5e', '#8b5cf6']

const kpiDefinitions = [
  { kpi: 'ROAS', def: 'Revenue ÷ ad spend, per campaign, 30-day window', source: 'Google/Meta Ads + billing (simulated)', freshness: '24h', owner: 'DAT-005' },
  { kpi: 'CPA', def: 'Spend ÷ conversions attributed to the campaign', source: 'Ad platforms + CRM events', freshness: '24h', owner: 'DAT-005' },
  { kpi: 'Organic traffic', def: 'Sessions from organic search, GA4', source: 'Google Analytics 4', freshness: '1h', owner: 'DAT-001' },
  { kpi: 'Approval turnaround', def: 'Median time from approval request to decision', source: 'Workflow engine audit log', freshness: 'Real-time', owner: 'CEX-007' },
  { kpi: 'First-pass QA rate', def: 'Drafts passing QA without revision ÷ total drafts', source: 'QA rubric results', freshness: 'Daily', owner: 'GOV-002' },
  { kpi: 'DSO', def: 'Accounts receivable ÷ revenue × days in period', source: 'Finance ledger (simulated)', freshness: 'Daily', owner: 'FIN-001' }
]

export default function Analytics() {
  return (
    <div>
      <PageHeader
        title="Analytics, Intelligence & Reporting"
        description="DAT integrates, validates and reconciles data, governs KPIs and produces reports with definitions, period, source, freshness and caveats. Department teams cannot silently redefine governed metrics."
      />
      <SimulationBanner />

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Report on-time rate" value="96%" icon={BarChart3} tone="indigo" hint="Last 30 days" />
        <KpiCard label="Data freshness" value="1h" icon={Database} tone="teal" hint="Median across feeds" />
        <KpiCard label="KPI coverage" value="42 / 45" icon={PieIcon} tone="violet" hint="Governed metrics defined" />
        <KpiCard label="Anomalies flagged" value="3" icon={Activity} tone="amber" hint="2 auto-triaged, 1 open" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Content funnel" subtitle="Briefs → published (this quarter)">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={analytics.contentFunnel} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="stage" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} width={90} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Bar dataKey="value" name="Items" fill="#6366f1" radius={[0, 6, 6, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Agent run volume & success" subtitle="Simulated execution telemetry">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={analytics.agentRuns} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="runs" name="Runs" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={14} />
              <Bar dataKey="success" name="Success" fill="#14b8a6" radius={[4, 4, 0, 0]} barSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Channel performance (30d)" subtitle="Impressions, clicks and CPC from authorised data">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px]">
              <thead className="border-b border-slate-100 bg-slate-50/60">
                <tr>
                  <th className="th">Channel</th>
                  <th className="th">Impressions</th>
                  <th className="th">Clicks</th>
                  <th className="th">CTR</th>
                  <th className="th">CPC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {analytics.channelPerformance.map((c) => {
                  const ctr = c.impressions ? ((c.clicks / c.impressions) * 100).toFixed(1) : '—'
                  return (
                    <tr key={c.channel} className="transition hover:bg-slate-50/60">
                      <td className="td font-medium text-slate-800">{c.channel}</td>
                      <td className="td text-slate-600">{(c.impressions / 1000).toFixed(0)}k</td>
                      <td className="td text-slate-600">{(c.clicks / 1000).toFixed(1)}k</td>
                      <td className="td text-slate-600">{ctr}%</td>
                      <td className="td text-slate-600">{c.cpc ? `₹${c.cpc}` : '—'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Department workload" subtitle="Active vs queued vs blocked tasks">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={analytics.deptWorkload} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="dept" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="active" name="Active" stackId="a" fill="#6366f1" barSize={22} />
              <Bar dataKey="queued" name="Queued" stackId="a" fill="#c7d2fe" barSize={22} />
              <Bar dataKey="blocked" name="Blocked" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="Governed KPI definitions" subtitle="Metrics are governed by DAT — changes require a versioned, audited update" className="mt-4" bodyClass="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead className="border-b border-slate-100 bg-slate-50/60">
              <tr>
                <th className="th">KPI</th>
                <th className="th">Definition</th>
                <th className="th">Source</th>
                <th className="th">Freshness</th>
                <th className="th">Owner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {kpiDefinitions.map((k) => (
                <tr key={k.kpi} className="transition hover:bg-slate-50/60">
                  <td className="td font-semibold text-slate-800">{k.kpi}</td>
                  <td className="td max-w-[280px] text-slate-600">{k.def}</td>
                  <td className="td max-w-[200px] text-slate-500">{k.source}</td>
                  <td className="td"><Badge color="teal">{k.freshness}</Badge></td>
                  <td className="td font-mono text-xs text-slate-500">{k.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-4 flex items-start gap-2 rounded-xl bg-violet-50 px-4 py-3 text-sm text-violet-900 ring-1 ring-violet-200">
        <TrendingUp className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Every report carries <span className="font-semibold">definition, period, source, freshness and limitations</span>.
          Metrics are shown only from authorised data; missing evidence stays missing rather than estimated silently.
        </p>
      </div>
    </div>
  )
}