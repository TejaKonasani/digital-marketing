import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bot, Search, Cpu, Activity, ShieldCheck, ArrowUpRight } from 'lucide-react'
import { Card, PageHeader, Badge, StatusBadge, Drawer, DetailRow, EmptyState, Avatar } from '../components/ui'
import { positions, authorityClasses } from '../data/positions'
import { departments, deptById } from '../data/departments'
import { agentRuns } from '../data/finance'

// Featured agents with richer profiles (named roles from the PRD)
const featured = ['CRT-002', 'CRT-003', 'CRT-004', 'CRT-005', 'CRT-021', 'CRT-022', 'CRT-013', 'OPS-002', 'OPS-003', 'DAT-002', 'GOV-001', 'GOV-002', 'GOV-008', 'SBD-001', 'CEX-001', 'CEO-001']

function AgentDrawer({ positionId, onClose }) {
  const p = positions.find((x) => x.positionId === positionId)
  if (!p) return null
  const dept = deptById(p.deptId)
  const ac = authorityClasses.find((a) => a.id === p.authority)
  const runs = agentRuns.filter((r) => r.agent.includes(p.positionId) || r.agent.includes(p.samAgId))

  return (
    <Drawer
      open
      onClose={onClose}
      title={p.person ? `${p.person} — ${p.title}` : p.title}
      subtitle={`${p.samAgId} · ${p.positionId} · role v${p.version}`}
      footer={
        <>
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-primary" onClick={onClose}>Open position contract</button>
        </>
      }
    >
      <div className="space-y-5">
        <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <Avatar name={p.person || p.title} size="lg" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-900">{p.person || 'Logical position'}</p>
            <p className="text-xs text-slate-500">{dept?.name}</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              <StatusBadge status={p.status} />
              <Badge color={ac?.color || 'slate'}>{p.authority} · {p.authorityLabel}</Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { v: p.status === 'active' ? 'Healthy' : p.status === 'error' ? 'Attention' : 'Stable', l: 'Runtime health' },
            { v: '840ms', l: 'p50 latency' },
            { v: `${runs.length || '—'}`, l: 'Runs (today)' }
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-slate-200 p-3 text-center">
              <p className="text-sm font-bold text-slate-900">{s.v}</p>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-400">{s.l}</p>
            </div>
          ))}
        </div>

        <div>
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500"><Activity className="h-3.5 w-3.5" /> Recent runs</p>
          {runs.length ? (
            <div className="mt-2 space-y-2">
              {runs.map((r) => (
                <div key={r.id} className="rounded-lg border border-slate-200 p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-500">{r.id}</span>
                    <StatusBadge status={r.status} />
                  </div>
                  <p className="mt-1 text-sm font-medium text-slate-800">{r.task}</p>
                  <p className="mt-0.5 text-xs text-slate-500">Model: {r.model} · role v{r.roleVersion} · {r.duration}</p>
                  {r.handoff !== '—' && <p className="mt-1 text-xs text-indigo-600">Handoff: {r.handoff}</p>}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-slate-500">No runs recorded in the current demo window.</p>
          )}
        </div>

        <div className="rounded-xl border border-slate-200">
          <div className="border-b border-slate-100 bg-slate-50/60 px-4 py-2.5">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500"><Cpu className="h-3.5 w-3.5" /> Identity & execution</p>
          </div>
          <div className="divide-y divide-slate-50 px-4">
            <DetailRow label="Canonical ID">{p.samAgId}</DetailRow>
            <DetailRow label="Position ID">{p.positionId}</DetailRow>
            <DetailRow label="Model">ollama / configured-local-model</DetailRow>
            <DetailRow label="Role version">v{p.version}</DetailRow>
            <DetailRow label="Evaluator">{p.evaluator}</DetailRow>
            <DetailRow label="Last run">{p.lastRun}</DetailRow>
          </div>
        </div>

        <div>
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500"><ShieldCheck className="h-3.5 w-3.5" /> Tool allow-list</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {p.tools.map((t) => (
              <code key={t} className="rounded-md bg-slate-900 px-2 py-1 font-mono text-[11px] text-slate-100">{t}</code>
            ))}
          </div>
        </div>

        <p className="rounded-lg bg-sky-50 px-3 py-2.5 text-[11px] leading-relaxed text-sky-800 ring-1 ring-sky-200">
          Execution lifecycle: identity → context → validation → execution → output validation → persistence → routing. A model response is not proof a tool ran; actual tool results come from the adapter and are recorded with correlation IDs.
        </p>
      </div>
    </Drawer>
  )
}

export default function Agents() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [dept, setDept] = useState('all')
  const [status, setStatus] = useState('all')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() => {
    return positions.filter((p) => {
      if (dept !== 'all' && p.deptId !== dept) return false
      if (status !== 'all' && p.status !== status) return false
      if (query) {
        const q = query.toLowerCase()
        if (!p.title.toLowerCase().includes(q) && !p.samAgId.toLowerCase().includes(q) && !p.positionId.toLowerCase().includes(q) && !(p.person || '').toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [query, dept, status])

  const featuredAgents = featured.map((id) => positions.find((p) => p.positionId === id)).filter(Boolean)

  return (
    <div>
      <PageHeader
        title="Agent Directory"
        description="Every logical position is an agent identity: stable canonical ID, versioned role config, tool allow-list, authority class and independent evaluator. Shared runtime services may execute multiple roles — identity and audit history stay distinct."
      />

      {/* Featured named agents */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold text-slate-700">Key roles in the operating model</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {featuredAgents.slice(0, 8).map((p) => {
            const d = deptById(p.deptId)
            return (
              <button key={p.positionId} onClick={() => setSelected(p.positionId)} className="card card-hover flex items-center gap-3 p-4 text-left">
                <Avatar name={p.person || p.title} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">{p.person}</p>
                  <p className="truncate text-xs text-slate-500">{p.title}</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <Badge color={d?.color || 'slate'}>{d?.prefix}</Badge>
                    <StatusBadge status={p.status} />
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300" />
              </button>
            )
          })}
        </div>
      </div>

      <Card className="mb-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input className="input pl-9" placeholder="Search agents by name, ID or role…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <select className="input lg:w-52" value={dept} onChange={(e) => setDept(e.target.value)}>
            <option value="all">All departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>{d.short}</option>
            ))}
          </select>
          <select className="input lg:w-44" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="idle">Idle</option>
            <option value="needs_review">Needs review</option>
            <option value="error">Error</option>
          </select>
        </div>
      </Card>

      <Card bodyClass="p-0" title={`Agents (${filtered.length})`} subtitle="Click a row to inspect identity, runs, tools and evaluator">
        {filtered.length === 0 ? (
          <div className="p-6">
            <EmptyState icon={Bot} title="No agents match" message="Try a different search or filter." />
          </div>
        ) : (
          <div className="max-h-[600px] overflow-auto">
            <table className="w-full min-w-[760px]">
              <thead className="sticky top-0 z-10 border-b border-slate-100 bg-slate-50">
                <tr>
                  <th className="th">Agent</th>
                  <th className="th">Canonical ID</th>
                  <th className="th">Department</th>
                  <th className="th">Authority</th>
                  <th className="th">Model</th>
                  <th className="th">Status</th>
                  <th className="th">Last run</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.slice(0, 80).map((p) => {
                  const d = deptById(p.deptId)
                  const ac = authorityClasses.find((a) => a.id === p.authority)
                  return (
                    <tr key={p.positionId} onClick={() => setSelected(p.positionId)} className="cursor-pointer transition hover:bg-indigo-50/40">
                      <td className="td">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={p.person || p.title} size="sm" />
                          <div>
                            <p className="font-medium text-slate-800">{p.person || p.title}</p>
                            {!p.person && <p className="text-[11px] text-slate-400">{p.title}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="td font-mono text-xs text-slate-500">{p.samAgId}</td>
                      <td className="td"><Badge color={d?.color || 'slate'}>{d?.prefix}</Badge></td>
                      <td className="td"><Badge color={ac?.color || 'slate'}>{p.authority}</Badge></td>
                      <td className="td text-xs text-slate-500">{p.authority === 'E' ? '— (human)' : 'ollama/local'}</td>
                      <td className="td"><StatusBadge status={p.status} /></td>
                      <td className="td text-xs text-slate-500">{p.lastRun}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {selected && <AgentDrawer positionId={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}