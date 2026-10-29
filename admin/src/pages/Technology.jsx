import { Cpu, Plug, Activity, AlertTriangle, Server, RefreshCw, ShieldCheck, Terminal } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { Card, PageHeader, KpiCard, Badge, StatusBadge, DetailRow, SimulationBanner } from '../components/ui'
import { connectors, agentRuns, incidents } from '../data/finance'

const connectorTone = {
  connected: 'green',
  degraded: 'amber',
  simulation: 'amber',
  not_connected: 'slate'
}

export default function Technology() {
  return (
    <div>
      <PageHeader
        title="Technology, MCP & AgentOps"
        description="TEC operates the architecture, agent runtime, MCP connectors, identity, permissions, context/memory, routing, observability, testing and recovery."
      />
      <SimulationBanner />

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Runtime availability" value="99.6%" icon={Server} tone="teal" hint="30-day window" />
        <KpiCard label="Run success rate" value="97.4%" icon={Activity} tone="indigo" hint="2,276 runs this week" />
        <KpiCard label="Connectors healthy" value="5 / 10" icon={Plug} tone="amber" hint="1 degraded · 2 simulation · 2 not connected" />
        <KpiCard label="Incident MTTR" value="38m" icon={AlertTriangle} tone="rose" hint="Mean time to resolve" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="MCP connectors & integrations" subtitle="Each capability needs a connector, credentials, scopes and visible status" bodyClass="p-0">
          <div className="divide-y divide-slate-100">
            {connectors.map((c) => (
              <div key={c.name} className="flex items-start gap-3 px-5 py-3.5">
                <span className={`mt-0.5 rounded-lg p-2 ${c.status === 'connected' ? 'bg-emerald-50 text-emerald-600' : c.status === 'degraded' ? 'bg-amber-50 text-amber-600' : c.status === 'simulation' ? 'bg-amber-50 text-amber-500' : 'bg-slate-100 text-slate-400'}`}>
                  <Plug className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-slate-800">{c.name}</p>
                    <Badge color="slate">{c.type}</Badge>
                    <Badge color="slate">{c.env}</Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">{c.detail}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <StatusBadge status={c.status} />
                  <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600" title="Re-check status (simulated)">
                    <RefreshCw className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-5 mb-5 mt-3 flex items-start gap-2 rounded-lg bg-sky-50 px-3 py-2.5 text-xs text-sky-800 ring-1 ring-sky-200">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              Ollama provides model inference only — it does not automatically connect to email, social, ad accounts or banking.
              Where a connector is absent, the UI says <span className="font-semibold">Not connected</span> or <span className="font-semibold">Simulation mode</span>.
            </span>
          </div>
        </Card>

        <div className="space-y-4">
          <Card title="Ollama / local model adapter" bodyClass="p-0">
            <div className="divide-y divide-slate-50 px-5">
              <DetailRow label="Endpoint">localhost:11434 (configured outside UI code)</DetailRow>
              <DetailRow label="Model">configured-local-model (Llama)</DetailRow>
              <DetailRow label="Status"><Badge color="green" dot>Connected</Badge></DetailRow>
              <DetailRow label="p50 latency">840ms</DetailRow>
              <DetailRow label="Runs today">14</DetailRow>
            </div>
            <div className="mx-5 mb-5 mt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Failure handling (deterministic)</p>
              <div className="flex flex-wrap gap-2">
                {['connection refused', 'model not found', 'timeout', 'context overflow', 'malformed JSON', 'empty response'].map((f) => (
                  <span key={f} className="rounded-lg bg-slate-50 px-2.5 py-1 font-mono text-[11px] text-slate-600 ring-1 ring-slate-200">{f}</span>
                ))}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                A model response is not proof a tool ran — actual tool results come from the adapter.
                Deterministic validation and state transitions keep working when the model is unavailable, and each run records model/provider and role/prompt version.
              </p>
            </div>
          </Card>

          <Card title="Incidents" bodyClass="p-0">
            <div className="divide-y divide-slate-100">
              {incidents.map((i) => (
                <div key={i.id} className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-800">{i.title}</p>
                    <Badge color={i.severity === 'high' ? 'red' : i.severity === 'medium' ? 'orange' : 'slate'}>{i.severity}</Badge>
                    <StatusBadge status={i.status} />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{i.id} · opened {i.opened} · owner {i.owner}</p>
                  <p className="mt-1 text-xs text-slate-600">{i.statusNote}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Card title="Agent execution log" subtitle="Input/output refs, role/model version, tools, validation, errors, status and handoff" className="mt-4" bodyClass="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="border-b border-slate-100 bg-slate-50/60">
              <tr>
                <th className="th">Run</th>
                <th className="th">Agent</th>
                <th className="th">Task</th>
                <th className="th">Model</th>
                <th className="th">Role ver.</th>
                <th className="th">Validation</th>
                <th className="th">Handoff</th>
                <th className="th">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {agentRuns.map((r) => (
                <tr key={r.id} className="transition hover:bg-slate-50/60">
                  <td className="td font-mono text-xs text-slate-500">{r.id}</td>
                  <td className="td">
                    <span className="font-medium text-slate-800">{r.agent.split(' ')[0]}</span>
                    <span className="ml-1.5 font-mono text-[11px] text-slate-400">{r.agent.match(/SAM-AG-\d+/)?.[0]}</span>
                  </td>
                  <td className="td max-w-[200px] truncate text-slate-600">{r.task}</td>
                  <td className="td max-w-[160px] truncate font-mono text-[11px] text-slate-500">{r.model}</td>
                  <td className="td text-slate-500">v{r.roleVersion}</td>
                  <td className="td max-w-[160px] truncate text-xs text-slate-500">{r.validation}</td>
                  <td className="td max-w-[160px] truncate text-xs text-indigo-600">{r.handoff}</td>
                  <td className="td"><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mx-5 mb-5 mt-4 flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2.5 text-xs text-slate-600 ring-1 ring-slate-200">
          <Terminal className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
          <span>
            Retry safety: before any retry the system checks for possible side effects. An ambiguous outcome blocks for inspection —
            side effects can never be duplicated silently (verified by INC-0019 / CAPA-0036).
          </span>
        </div>
      </Card>
    </div>
  )
}