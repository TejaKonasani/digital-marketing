import { Wallet, TrendingUp, FileText, AlertTriangle, ShieldCheck, Receipt } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { Card, PageHeader, KpiCard, Badge, StatusBadge, DetailRow, SimulationBanner } from '../components/ui'
import { finance } from '../data/finance'

export default function Finance() {
  const f = finance
  return (
    <div>
      <PageHeader
        title="Finance & Administration"
        description="FIN prepares and reconciles financial records from accepted work and approved scope. Actual payments remain human-authorised — no payment is ever executed by an agent."
      />
      <SimulationBanner />

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="MRR (simulated)" value={`₹${(f.summary.mrr / 1000).toFixed(0)}k`} delta={f.summary.mrrDelta} deltaLabel="MoM" icon={Wallet} tone="emerald" />
        <KpiCard label="Outstanding receivables" value={`₹${(f.summary.outstanding / 1000).toFixed(0)}k`} icon={Receipt} tone="amber" hint={`DSO ${f.summary.dso} days`} />
        <KpiCard label="Collected this month" value={`₹${(f.summary.collectedThisMonth / 1000).toFixed(0)}k`} icon={TrendingUp} tone="indigo" hint={`${f.summary.invoicesThisMonth} invoices issued`} />
        <KpiCard label="Budget variance" value={`${f.summary.budgetVariance}%`} icon={ShieldCheck} tone="sky" hint="Under budget" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Cash flow (₹ thousands)" subtitle="Simulated inflow vs outflow" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={f.cashflow} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="in" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="out" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
              <Area type="monotone" dataKey="inflow" name="Inflow" stroke="#10b981" strokeWidth={2.5} fill="url(#in)" />
              <Area type="monotone" dataKey="outflow" name="Outflow" stroke="#f43f5e" strokeWidth={2} fill="url(#out)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Control & governance" bodyClass="p-0">
          <div className="divide-y divide-slate-50 px-5">
            <DetailRow label="Invoices traceable to accepted work">100%</DetailRow>
            <DetailRow label="Reconciliation coverage">98%</DetailRow>
            <DetailRow label="Overdue invoices">1 (MediScan)</DetailRow>
            <DetailRow label="Payment authorisation">Human-only (Class E)</DetailRow>
            <DetailRow label="Banking connector">Not connected</DetailRow>
          </div>
          <div className="mx-5 mb-5 mt-4 flex items-start gap-2 rounded-lg bg-rose-50 px-3 py-2.5 text-xs text-rose-800 ring-1 ring-rose-200">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>Finance agents prepare and reconcile records. Actual payments remain human-authorised — the banking connector is intentionally not connected in this prototype.</span>
          </div>
        </Card>
      </div>

      <Card title="Invoices" subtitle="Each invoice references accepted work and approved scope; discrepancies are flagged" className="mt-4" bodyClass="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px]">
            <thead className="border-b border-slate-100 bg-slate-50/60">
              <tr>
                <th className="th">Invoice</th>
                <th className="th">Client</th>
                <th className="th">Amount</th>
                <th className="th">Issued</th>
                <th className="th">Due</th>
                <th className="th">Basis</th>
                <th className="th">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {f.invoices.map((i) => (
                <tr key={i.id} className="transition hover:bg-slate-50/60">
                  <td className="td font-mono text-xs font-semibold text-indigo-600">{i.id}</td>
                  <td className="td max-w-[180px] truncate text-slate-700">{i.client}</td>
                  <td className="td font-semibold text-slate-800">₹{i.amount.toLocaleString()}</td>
                  <td className="td text-slate-500">{i.issued}</td>
                  <td className="td text-slate-500">{i.due}</td>
                  <td className="td max-w-[220px]">
                    <p className="truncate text-xs text-slate-500">{i.basis}</p>
                    {i.flag && <p className="mt-0.5 flex items-center gap-1 text-xs text-rose-600"><AlertTriangle className="h-3 w-3" /> {i.flag}</p>}
                  </td>
                  <td className="td"><StatusBadge status={i.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card p-5">
          <div className="flex items-center gap-2 text-slate-700">
            <FileText className="h-4 w-4 text-indigo-500" />
            <p className="text-sm font-semibold">Invoice preparation rule</p>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            A draft invoice must reference approved scope and accepted work. Any discrepancy between scope and delivered work is flagged before the invoice can be sent.
          </p>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-2 text-slate-700">
            <Receipt className="h-4 w-4 text-emerald-500" />
            <p className="text-sm font-semibold">Collections tracking</p>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            Receivables are tracked against due dates. Overdue invoices trigger the collections tracker and surface on the client health score.
          </p>
        </div>
        <div className="card p-5">
          <div className="flex items-center gap-2 text-slate-700">
            <ShieldCheck className="h-4 w-4 text-rose-500" />
            <p className="text-sm font-semibold">Human payment gate</p>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            No agent can initiate an actual payment. Payment authorisation is a reserved human decision recorded with identity and timestamp.
          </p>
        </div>
      </div>
    </div>
  )
}