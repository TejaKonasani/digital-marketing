import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Users, Search, ArrowLeft, ShieldCheck, GitBranch, Plug, Target, FileOutput, FileInput, AlertTriangle } from 'lucide-react'
import { Card, PageHeader, Badge, StatusBadge, Drawer, DetailRow, EmptyState, Tabs } from '../components/ui'
import { departments, deptById } from '../data/departments'
import { positions, authorityClasses } from '../data/positions'

function PositionDetail({ positionId, onClose }) {
  const p = positions.find((x) => x.positionId === positionId)
  if (!p) return null
  const dept = deptById(p.deptId)
  const ac = authorityClasses.find((a) => a.id === p.authority)

  return (
    <Drawer
      open
      onClose={onClose}
      title={p.title}
      subtitle={`${p.positionId} · ${p.samAgId} · ${dept?.short}`}
      footer={
        <>
          <button className="btn-secondary" onClick={onClose}>Close</button>
          <button className="btn-primary" onClick={onClose}>View in agent directory</button>
        </>
      }
    >
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={p.status} />
          <Badge color={ac?.color || 'slate'}>{p.authority} · {p.authorityLabel}</Badge>
          <Badge color={dept?.color || 'slate'}>{dept?.prefix}</Badge>
          {p.isLead && <Badge color="indigo">Department lead</Badge>}
          <Badge color="slate">Role v{p.version}</Badge>
        </div>

        {p.note && (
          <div className="flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2.5 text-xs text-amber-800 ring-1 ring-amber-200">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>{p.note}</span>
          </div>
        )}

        <div>
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500"><Target className="h-3.5 w-3.5" /> Purpose</p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{p.purpose}</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-sky-50/60 p-4 ring-1 ring-sky-100">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-sky-700"><FileInput className="h-3.5 w-3.5" /> Input contract</p>
            <p className="mt-1.5 text-sm text-slate-700">{p.input}</p>
          </div>
          <div className="rounded-xl bg-emerald-50/60 p-4 ring-1 ring-emerald-100">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700"><FileOutput className="h-3.5 w-3.5" /> Output contract</p>
            <p className="mt-1.5 text-sm text-slate-700">{p.output}</p>
          </div>
        </div>

        <div>
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500"><GitBranch className="h-3.5 w-3.5" /> Dependencies</p>
          {p.dependencies.length ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {p.dependencies.map((d) => (
                <span key={d} className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">{d}</span>
              ))}
            </div>
          ) : (
            <p className="mt-1.5 text-sm text-slate-500">None — this is a top-level role in the department.</p>
          )}
        </div>

        <div>
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500"><Plug className="h-3.5 w-3.5" /> Tool allow-list</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {p.tools.map((t) => (
              <code key={t} className="rounded-md bg-slate-900 px-2 py-1 font-mono text-[11px] text-slate-100">{t}</code>
            ))}
          </div>
          {p.authority === 'D' && (
            <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800 ring-1 ring-amber-200">
              External side-effect authority: every tool call is permission-checked and requires an explicit approval/policy gate. Denied calls are logged.
            </p>
          )}
          {p.authority === 'E' && (
            <p className="mt-2 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-800 ring-1 ring-rose-200">
              Reserved human decision: the agent prepares and recommends; the human identity and decision are recorded.
            </p>
          )}
        </div>

        <div className="rounded-xl border border-slate-200">
          <div className="border-b border-slate-100 bg-slate-50/60 px-4 py-2.5">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500"><ShieldCheck className="h-3.5 w-3.5" /> Governance</p>
          </div>
          <div className="divide-y divide-slate-50 px-4">
            <DetailRow label="Independent evaluator">{p.evaluator}</DetailRow>
            <DetailRow label="Authority class">{p.authorityLabel}</DetailRow>
            <DetailRow label="Role version">v{p.version}</DetailRow>
            <DetailRow label="Last run">{p.lastRun}</DetailRow>
            <DetailRow label="Acceptance check">Schema valid + evidence present + policy flags clear + evaluator score ≥ threshold</DetailRow>
          </div>
        </div>

        <p className="rounded-lg bg-slate-50 px-3 py-2.5 text-[11px] leading-relaxed text-slate-500">
          A producing role cannot be the sole evaluator of its output. This position's output is independently evaluated by {p.evaluator} against a versioned rubric; findings remain traceable and cannot be silently deleted or rewritten.
        </p>
      </div>
    </Drawer>
  )
}

export default function Positions() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [dept, setDept] = useState('all')
  const [authority, setAuthority] = useState('all')
  const [tab, setTab] = useState('all')

  const filtered = useMemo(() => {
    return positions.filter((p) => {
      if (dept !== 'all' && p.deptId !== dept) return false
      if (authority !== 'all' && p.authority !== authority) return false
      if (tab === 'leads' && !p.isLead) return false
      if (tab === 'external' && p.authority !== 'D') return false
      if (tab === 'reserved' && p.authority !== 'E') return false
      if (query) {
        const q = query.toLowerCase()
        if (!p.title.toLowerCase().includes(q) && !p.positionId.toLowerCase().includes(q) && !p.samAgId.toLowerCase().includes(q) && !(p.person || '').toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [query, dept, authority, tab])

  if (id) {
    return (
      <div>
        <button onClick={() => navigate('/positions')} className="mb-4 flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800">
          <ArrowLeft className="h-4 w-4" /> All positions
        </button>
        <PositionDetail positionId={id} onClose={() => navigate('/positions')} />
        <div className="h-8" />
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="194 Logical Positions"
        description="The complete proposed digital workforce registry. Each position has a stable canonical ID, purpose, input/output contract, dependencies, tool allow-list, authority class and independent evaluator."
        actions={<Badge color="indigo" className="px-3 py-1">{positions.length} positions · 11 departments</Badge>}
      />

      <Card className="mb-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input className="input pl-9" placeholder="Search by title, position ID, canonical ID or person…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <select className="input lg:w-56" value={dept} onChange={(e) => setDept(e.target.value)}>
            <option value="all">All departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>{d.short} ({d.positions})</option>
            ))}
          </select>
          <select className="input lg:w-52" value={authority} onChange={(e) => setAuthority(e.target.value)}>
            <option value="all">All authority classes</option>
            {authorityClasses.map((a) => (
              <option key={a.id} value={a.id}>{a.id} — {a.name}</option>
            ))}
          </select>
        </div>
        <div className="mt-3">
          <Tabs
            active={tab}
            onChange={setTab}
            tabs={[
              { id: 'all', label: 'All', count: positions.length },
              { id: 'leads', label: 'Department leads', count: positions.filter((p) => p.isLead).length },
              { id: 'external', label: 'External side-effect (D)', count: positions.filter((p) => p.authority === 'D').length },
              { id: 'reserved', label: 'Reserved human (E)', count: positions.filter((p) => p.authority === 'E').length }
            ]}
          />
        </div>
      </Card>

      <Card bodyClass="p-0" title={`Registry (${filtered.length})`} subtitle="Click a row to open the full role contract">
        {filtered.length === 0 ? (
          <div className="p-6">
            <EmptyState icon={Users} title="No positions match" message="Try clearing the search or filters." />
          </div>
        ) : (
          <div className="max-h-[640px] overflow-auto">
            <table className="w-full min-w-[820px]">
              <thead className="sticky top-0 z-10 border-b border-slate-100 bg-slate-50">
                <tr>
                  <th className="th">Position</th>
                  <th className="th">Canonical ID</th>
                  <th className="th">Department</th>
                  <th className="th">Authority</th>
                  <th className="th">Evaluator</th>
                  <th className="th">Status</th>
                  <th className="th">Ver.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((p) => {
                  const d = deptById(p.deptId)
                  const ac = authorityClasses.find((a) => a.id === p.authority)
                  return (
                    <tr key={p.positionId} onClick={() => navigate(`/positions/${p.positionId}`)} className="cursor-pointer transition hover:bg-indigo-50/40">
                      <td className="td">
                        <span className="font-medium text-slate-800">{p.title}</span>
                        {p.person && <span className="ml-2 text-xs text-slate-400">{p.person}</span>}
                        {p.isLead && <Badge color={d?.color || 'slate'} className="ml-2">Lead</Badge>}
                      </td>
                      <td className="td font-mono text-xs text-slate-500">{p.positionId} <span className="text-slate-300">/</span> {p.samAgId}</td>
                      <td className="td"><Badge color={d?.color || 'slate'}>{d?.prefix}</Badge></td>
                      <td className="td"><Badge color={ac?.color || 'slate'}>{p.authority}</Badge></td>
                      <td className="td max-w-[180px] truncate text-xs text-slate-500">{p.evaluator}</td>
                      <td className="td"><StatusBadge status={p.status} /></td>
                      <td className="td text-xs text-slate-500">v{p.version}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {authorityClasses.map((a) => (
          <div key={a.id} className="card p-4">
            <div className="flex items-center justify-between">
              <Badge color={a.color}>{a.id}</Badge>
              <span className="text-lg font-bold text-slate-900">{positions.filter((p) => p.authority === a.id).length}</span>
            </div>
            <p className="mt-2 text-xs font-semibold text-slate-700">{a.name}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{a.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}