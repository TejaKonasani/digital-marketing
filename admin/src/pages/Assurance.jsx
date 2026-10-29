import { useState, useMemo } from 'react'
import { ShieldCheck, Search, AlertTriangle, FileCheck, Lock, GitCommitHorizontal } from 'lucide-react'
import { Card, PageHeader, KpiCard, Badge, StatusBadge, Tabs, EmptyState, SimulationBanner } from '../components/ui'
import { auditLog, findings } from '../data/finance'

const actionTone = (action) => {
  if (['FINDING_RECORDED', 'TOOL_DENIED', 'CROSS_TENANT_DENIED', 'GATE_BLOCKED'].includes(action)) return 'rose'
  if (['APPROVAL_REQUESTED', 'SPEND_CHANGE_REQUESTED', 'ROLE_VERSIONED'].includes(action)) return 'amber'
  if (['MODEL_TIMEOUT'].includes(action)) return 'orange'
  return 'slate'
}

export default function Assurance() {
  const [tab, setTab] = useState('audit')
  const [query, setQuery] = useState('')
  const [actionFilter, setActionFilter] = useState('all')

  const actions = [...new Set(auditLog.map((a) => a.action))]
  const filtered = useMemo(() => {
    return auditLog.filter((a) => {
      if (actionFilter !== 'all' && a.action !== actionFilter) return false
      if (query) {
        const q = query.toLowerCase()
        if (!a.actor.toLowerCase().includes(q) && !a.target.toLowerCase().includes(q) && !a.detail.toLowerCase().includes(q) && !a.action.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [query, actionFilter])

  const openFindings = findings.filter((f) => ['open', 'in_progress'].includes(f.status))
  const resolvedFindings = findings.filter((f) => f.status === 'resolved')

  return (
    <div>
      <PageHeader
        title="Independent Assurance, Compliance & Audit"
        description="GOV independently evaluates outputs, competency, compliance, privacy, audit evidence, incidents and corrective actions. A producing role cannot be the sole evaluator of its output; findings report independently to the human governance authority."
      />
      <SimulationBanner />

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Open findings" value={openFindings.length} icon={AlertTriangle} tone="amber" hint={`${resolvedFindings.length} resolved this cycle`} />
        <KpiCard label="Audit coverage" value="100%" icon={FileCheck} tone="emerald" hint="All state changes logged" />
        <KpiCard label="CAPA effectiveness" value="94%" icon={GitCommitHorizontal} tone="indigo" hint="Corrective actions verified" />
        <KpiCard label="Compliance exceptions" value="2" icon={ShieldCheck} tone="rose" hint="Clinical claims in review" />
      </div>

      <div className="mb-4">
        <Tabs
          active={tab}
          onChange={setTab}
          tabs={[
            { id: 'audit', label: 'Audit log', count: auditLog.length },
            { id: 'findings', label: 'Findings & CAPA', count: findings.length },
            { id: 'isolation', label: 'Isolation & safety' }
          ]}
        />
      </div>

      {tab === 'audit' && (
        <>
          <Card className="mb-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input className="input pl-9" placeholder="Search actor, target, detail or action…" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <select className="input lg:w-64" value={actionFilter} onChange={(e) => setActionFilter(e.target.value)}>
                <option value="all">All actions</option>
                {actions.map((a) => (
                  <option key={a} value={a}>{a.replace(/_/g, ' ').toLowerCase()}</option>
                ))}
              </select>
            </div>
          </Card>
          <Card bodyClass="p-0" title={`Audit trail (${filtered.length})`} subtitle="Immutable, append-only. Historical actions remain attributable even if a user is later disabled.">
            {filtered.length === 0 ? (
              <div className="p-6"><EmptyState icon={FileCheck} title="No audit entries match" /></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[860px]">
                  <thead className="border-b border-slate-100 bg-slate-50/60">
                    <tr>
                      <th className="th">Time</th>
                      <th className="th">Actor</th>
                      <th className="th">Action</th>
                      <th className="th">Target</th>
                      <th className="th">Detail</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filtered.map((a) => (
                      <tr key={a.id} className="transition hover:bg-slate-50/60">
                        <td className="td whitespace-nowrap font-mono text-xs text-slate-500">{a.time}</td>
                        <td className="td max-w-[180px] truncate text-slate-700">{a.actor}</td>
                        <td className="td"><Badge color={actionTone(a.action)}>{a.action.replace(/_/g, ' ')}</Badge></td>
                        <td className="td max-w-[200px] truncate font-mono text-xs text-slate-500">{a.target}</td>
                        <td className="td max-w-[320px] text-slate-600">{a.detail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </>
      )}

      {tab === 'findings' && (
        <div className="space-y-4">
          <Card title="Open & in-progress findings" subtitle="Findings are linked to evidence and cannot be silently deleted or rewritten by the production owner" bodyClass="p-0">
            <div className="divide-y divide-slate-100">
              {openFindings.map((f) => (
                <div key={f.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span className={`mt-0.5 rounded-lg p-2 ${f.severity === 'high' ? 'bg-rose-50 text-rose-600' : f.severity === 'medium' ? 'bg-orange-50 text-orange-600' : 'bg-slate-100 text-slate-500'}`}>
                      <AlertTriangle className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-slate-800">{f.title}</p>
                        <Badge color={f.severity === 'high' ? 'red' : f.severity === 'medium' ? 'orange' : 'slate'}>{f.severity}</Badge>
                        <StatusBadge status={f.status} />
                      </div>
                      <p className="mt-1 text-xs text-slate-500">{f.id} · artefact: {f.artefact} · owner {f.owner} · raised {f.raised} · due {f.due}</p>
                      {f.capa !== '—' && <p className="mt-1 text-xs text-indigo-600">Corrective action: {f.capa}</p>}
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button className="btn-secondary !py-1.5 !text-xs">View evidence</button>
                    <button className="btn-secondary !py-1.5 !text-xs">Respond</button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Resolved findings" bodyClass="p-0">
            <div className="divide-y divide-slate-100">
              {resolvedFindings.map((f) => (
                <div key={f.id} className="flex items-start gap-3 px-5 py-4">
                  <span className="mt-0.5 rounded-lg bg-emerald-50 p-2 text-emerald-600">
                    <FileCheck className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-slate-800">{f.title}</p>
                      <Badge color="green">resolved</Badge>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{f.id} · {f.resolved}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === 'isolation' && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card title="Tenant isolation" bodyClass="p-0">
            <div className="space-y-4 p-5">
              {[
                { title: 'Workspace scoping', body: 'Every client-owned project, brief, file, message, report, deliverable, approval and workflow run inherits a client/workspace scope.' },
                { title: 'Server-side verification', body: 'Backend APIs verify membership on every request. Hiding a button is not a security control.' },
                { title: 'Negative cross-tenant tests', body: 'A client cannot access another client record by changing a URL, identifier or request body. Attempts are denied and logged.' },
                { title: 'Live negative test (simulated)', body: 'AUD-99113 — CLIENT-DEMO-002 attempted to read a CLIENT-DEMO-001 record. Result: denied and logged.' }
              ].map((s) => (
                <div key={s.title} className="flex items-start gap-3">
                  <span className="mt-0.5 rounded-lg bg-emerald-50 p-1.5 text-emerald-600"><ShieldCheck className="h-4 w-4" /></span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{s.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Separation of duties & safety gates" bodyClass="p-0">
            <div className="space-y-4 p-5">
              {[
                { title: 'Independent assurance', body: 'Satya and GOV roles preserve independent assurance. Operational owners may respond to findings but cannot silently delete or rewrite them.' },
                { title: 'Human authority is explicit', body: 'Agents draft, analyse, recommend, coordinate and execute bounded actions; they do not assume reserved authority (clinical sign-off, legal signature, payments, major commercial commitments).' },
                { title: 'No hidden handoffs', body: 'Generated text alone does not complete a task — schema, quality and approval gates must pass before routing.' },
                { title: 'Honest simulation', body: 'Simulated external actions are never described as real external success. The UI always labels simulation or blocked states.' }
              ].map((s) => (
                <div key={s.title} className="flex items-start gap-3">
                  <span className="mt-0.5 rounded-lg bg-indigo-50 p-1.5 text-indigo-600"><Lock className="h-4 w-4" /></span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{s.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}