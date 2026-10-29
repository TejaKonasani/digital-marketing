import { Link } from 'react-router-dom'
import {
  Users, Bot, Workflow, Wallet, ArrowRight, AlertTriangle, CheckCircle2,
  Clock, TrendingUp, ShieldCheck, PlayCircle
} from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts'
import { Card, KpiCard, StatusBadge, Badge, ProgressBar, SimulationBanner, Avatar } from '../components/ui'
import { useApp } from '../state/AppContext'
import { departments, totalPositions } from '../data/departments'
import { positions } from '../data/positions'
import { clients } from '../data/clients'
import { analytics, agentRuns } from '../data/finance'
import { operatingStages } from '../data/workflows'

const activePositions = positions.filter((p) => p.status === 'active').length
const needsReview = positions.filter((p) => p.status === 'needs_review').length

const activity = [
  { icon: CheckCircle2, tone: 'emerald', text: 'QA technical checks passed for ASSET-0021 v1', who: 'Pariksha (CRT-022)', time: '12m ago' },
  { icon: AlertTriangle, tone: 'amber', text: 'Clinical claim escalated to GOV-008 for independent review', who: 'Shuddhi (CRT-021)', time: '48m ago' },
  { icon: Clock, tone: 'sky', text: 'Client review gate opened for cardiac social post (pending QA pass)', who: 'Workflow engine', time: '1h ago' },
  { icon: ShieldCheck, tone: 'indigo', text: 'Cross-tenant isolation negative test passed — access denied and logged', who: 'System (tenant check)', time: '2h ago' },
  { icon: TrendingUp, tone: 'emerald', text: 'Meta Ads ROAS improved 12% week-over-week', who: 'Drishti (DAT-002)', time: '3h ago' },
  { icon: CheckCircle2, tone: 'emerald', text: 'Role versioned: Lekha (CRT-004) v1.0 → v1.1 with claims-flagging rule', who: 'Arjun (TEC-012)', time: '5h ago' }
]

const deptColors = ['#6366f1', '#f59e0b', '#d946ef', '#14b8a6', '#0ea5e9', '#f43f5e', '#f97316', '#8b5cf6', '#10b981', '#06b6d4', '#64748b']

export default function Dashboard() {
  const { approvals, tasks, user } = useApp()
  const pendingApprovals = approvals.filter((a) => ['pending', 'in_review', 'escalated'].includes(a.status))
  const blockedTasks = tasks.filter((t) => ['blocked', 'escalated'].includes(t.status))

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Good morning, {user?.name?.split(' ')[0] || 'there'}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here's what's happening across the 11 departments today, Thursday 29 Oct 2026.
          </p>
        </div>
        <Link to="/demo" className="btn-primary self-start sm:self-auto">
          <PlayCircle className="h-4 w-4" /> Start demo workflow
        </Link>
      </div>

      <SimulationBanner />

      {/* KPI row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Active clients" value={clients.filter((c) => c.status === 'active').length} delta={16.7} deltaLabel="vs last month" icon={Users} tone="indigo" hint={`${clients.length} total workspaces`} />
        <KpiCard label="Digital workforce" value={`${activePositions} / ${totalPositions}`} delta={2.1} deltaLabel="utilised" icon={Bot} tone="teal" hint={`${needsReview} positions awaiting review`} />
        <KpiCard label="Workflows in flight" value={8} delta={14.3} deltaLabel="vs last week" icon={Workflow} tone="sky" hint={`${blockedTasks.length} blocked / escalated`} />
        <KpiCard label="MRR (simulated)" value="₹7.7L" delta={8.2} deltaLabel="MoM" icon={Wallet} tone="emerald" hint="Payments remain human-authorised" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Revenue vs target (₹ thousands)" subtitle="Simulated financials — no real transactions" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={analytics.monthlyRevenue} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Area type="monotone" dataKey="target" name="Target" stroke="#cbd5e1" strokeDasharray="4 4" fill="none" strokeWidth={2} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Workforce by department" subtitle="194 logical positions">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={departments} dataKey="positions" nameKey="short" innerRadius={55} outerRadius={85} paddingAngle={2} strokeWidth={0}>
                {departments.map((d, i) => (
                  <Cell key={d.id} fill={deptColors[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5">
            {departments.map((d, i) => (
              <div key={d.id} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: deptColors[i] }} />
                <span className="truncate">{d.short}</span>
                <span className="ml-auto font-semibold text-slate-700">{d.positions}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Pending approvals */}
        <Card
          title="Pending decisions"
          subtitle={`${pendingApprovals.length} items require human action`}
          actions={<Link to="/tasks" className="text-xs font-medium text-indigo-600 hover:text-indigo-700">View all</Link>}
          bodyClass="p-0"
        >
          <div className="divide-y divide-slate-100">
            {pendingApprovals.slice(0, 4).map((a) => (
              <Link to="/tasks" key={a.id} className="flex items-start gap-3 px-5 py-3.5 transition hover:bg-slate-50">
                <span className={`mt-0.5 rounded-lg p-1.5 ${a.risk === 'critical' ? 'bg-rose-50 text-rose-600' : a.risk === 'high' ? 'bg-orange-50 text-orange-600' : 'bg-amber-50 text-amber-600'}`}>
                  <AlertTriangle className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800">{a.title}</p>
                  <p className="mt-0.5 truncate text-xs text-slate-500">{a.approver}</p>
                </div>
                <StatusBadge status={a.status} />
              </Link>
            ))}
          </div>
        </Card>

        {/* Workflow progress */}
        <Card title="Operating model — live stages" subtitle="14-stage end-to-end flow" actions={<Link to="/workflows" className="text-xs font-medium text-indigo-600 hover:text-indigo-700">Workflows</Link>}>
          <div className="space-y-3">
            {[
              { name: 'Research / strategy', count: 3, tone: 'bg-sky-500' },
              { name: 'Production', count: 4, tone: 'bg-indigo-500' },
              { name: 'QA / assurance', count: 3, tone: 'bg-amber-500' },
              { name: 'Client review', count: 2, tone: 'bg-teal-500' },
              { name: 'Publish / activate', count: 1, tone: 'bg-emerald-500' },
              { name: 'Measure / report', count: 2, tone: 'bg-violet-500' }
            ].map((s) => (
              <div key={s.name}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-600">{s.name}</span>
                  <span className="text-slate-400">{s.count} active</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${s.tone}`} style={{ width: `${s.count * 22}%` }} />
                </div>
              </div>
            ))}
            <p className="pt-1 text-[11px] text-slate-400">
              Full model: {operatingStages.map((s) => s.name).slice(0, 4).join(' → ')} → … → Improve
            </p>
          </div>
        </Card>

        {/* Activity feed */}
        <Card title="Recent activity" subtitle="Agent & system events" bodyClass="p-0">
          <div className="divide-y divide-slate-100">
            {activity.map((a, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-3">
                <span className={`mt-0.5 rounded-lg p-1.5 ${a.tone === 'emerald' ? 'bg-emerald-50 text-emerald-600' : a.tone === 'amber' ? 'bg-amber-50 text-amber-600' : a.tone === 'sky' ? 'bg-sky-50 text-sky-600' : 'bg-indigo-50 text-indigo-600'}`}>
                  <a.icon className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs leading-snug text-slate-700">{a.text}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">{a.who} · {a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Agent runs + client health */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Latest agent runs" subtitle="Simulated execution log" className="lg:col-span-2" bodyClass="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="border-b border-slate-100 bg-slate-50/60">
                <tr>
                  <th className="th">Run</th>
                  <th className="th">Agent</th>
                  <th className="th">Task</th>
                  <th className="th">Status</th>
                  <th className="th">Duration</th>
                  <th className="th">Handoff</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {agentRuns.map((r) => (
                  <tr key={r.id} className="transition hover:bg-slate-50/60">
                    <td className="td font-mono text-xs text-slate-500">{r.id}</td>
                    <td className="td">
                      <span className="font-medium text-slate-800">{r.agent.split(' ')[0]}</span>
                      <span className="ml-1.5 text-xs text-slate-400">{r.agent.match(/SAM-AG-\d+/)?.[0]}</span>
                    </td>
                    <td className="td max-w-[200px] truncate">{r.task}</td>
                    <td className="td"><StatusBadge status={r.status} /></td>
                    <td className="td text-slate-500">{r.duration}</td>
                    <td className="td max-w-[160px] truncate text-xs text-slate-500">{r.handoff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Client health" subtitle="Account status at a glance" actions={<Link to="/clients" className="text-xs font-medium text-indigo-600 hover:text-indigo-700">All clients</Link>} bodyClass="p-0">
          <div className="divide-y divide-slate-100">
            {clients.map((c) => (
              <Link to={`/clients/${c.id}`} key={c.id} className="flex items-center gap-3 px-5 py-3 transition hover:bg-slate-50">
                <Avatar name={c.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-800">{c.name}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <ProgressBar value={c.health} color={c.health >= 80 ? 'bg-emerald-500' : c.health >= 65 ? 'bg-amber-500' : 'bg-rose-500'} className="h-1.5 max-w-[100px]" />
                    <span className="text-[11px] font-medium text-slate-500">{c.health}</span>
                  </div>
                </div>
                <StatusBadge status={c.status} />
              </Link>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { to: '/positions', label: 'Browse 194 positions', icon: Users },
          { to: '/workflows', label: 'Track workflows', icon: Workflow },
          { to: '/assurance', label: 'Assurance & audit', icon: ShieldCheck },
          { to: '/technology', label: 'AgentOps & MCP', icon: TrendingUp }
        ].map((q) => (
          <Link key={q.to} to={q.to} className="card card-hover flex items-center justify-between p-4">
            <span className="text-sm font-medium text-slate-700">{q.label}</span>
            <q.icon className="h-4 w-4 text-slate-400" />
          </Link>
        ))}
      </div>
    </div>
  )
}