import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Handshake, Search, ArrowLeft, FolderOpen, FileText, MessageSquare, Wallet, AlertTriangle, CheckCircle2, UserPlus } from 'lucide-react'
import { Card, PageHeader, Badge, StatusBadge, Drawer, DetailRow, ProgressBar, EmptyState, Avatar, Tabs, SimulationBanner } from '../components/ui'
import { clients, briefs, onboardingQueue } from '../data/clients'
import { workflowRuns } from '../data/workflows'
import { finance } from '../data/finance'

function ClientDetail({ clientId }) {
  const navigate = useNavigate()
  const c = clients.find((x) => x.id === clientId)
  if (!c) return <EmptyState icon={Handshake} title="Client not found" />
  const clientRuns = workflowRuns.filter((r) => r.client === c.name)
  const clientBriefs = briefs.filter((b) => b.client === c.name)
  const clientInvoices = finance.invoices.filter((i) => i.client === c.name)

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/clients')} className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800">
        <ArrowLeft className="h-4 w-4" /> All clients
      </button>

      <div className="card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar name={c.name} size="lg" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900">{c.name}</h1>
                <StatusBadge status={c.status} />
                <Badge color="slate">{c.id}</Badge>
              </div>
              <p className="mt-1 text-sm text-slate-500">{c.type} · {c.location} · Client since {c.since}</p>
              <p className="mt-0.5 text-xs text-slate-400">Account owner: {c.owner}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{c.health}</p>
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Health score</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">₹{(c.mrr / 1000).toFixed(0)}k</p>
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Monthly (sim.)</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{c.openApprovals}</p>
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">Open approvals</p>
            </div>
          </div>
        </div>
        {c.flag && (
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-800 ring-1 ring-rose-200">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{c.flag}</span>
          </div>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {c.services.map((s) => (
            <span key={s} className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">{s}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Active workflows" subtitle={`${clientRuns.length} runs in this workspace`} bodyClass="p-0">
          {clientRuns.length ? (
            <div className="divide-y divide-slate-100">
              {clientRuns.map((r) => (
                <button key={r.id} onClick={() => navigate(`/workflows/${r.id}`)} className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition hover:bg-slate-50">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">{r.name}</p>
                    <p className="text-xs text-slate-500">Stage {r.stage} · {r.progress}%</p>
                  </div>
                  <StatusBadge status={r.status} />
                </button>
              ))}
            </div>
          ) : (
            <div className="p-5"><EmptyState icon={FolderOpen} title="No workflows yet" message="Workflows appear here once onboarding and the first brief are complete." /></div>
          )}
        </Card>

        <Card title="Briefs" subtitle="Versioned client briefs" bodyClass="p-0">
          {clientBriefs.length ? (
            <div className="divide-y divide-slate-100">
              {clientBriefs.map((b) => (
                <div key={b.id} className="flex items-center gap-3 px-5 py-3.5">
                  <FileText className="h-4 w-4 shrink-0 text-slate-400" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">{b.title}</p>
                    <p className="text-xs text-slate-500">{b.id} · {b.version} · submitted {b.submitted}</p>
                  </div>
                  {b.missing > 0 ? <Badge color="amber">{b.missing} missing</Badge> : <StatusBadge status={b.status} />}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-5"><EmptyState icon={FileText} title="No briefs yet" message="The client will submit their first brief from the client portal." /></div>
          )}
        </Card>

        <Card title="Financial records" subtitle="Prepared by FIN — payments remain human-authorised" bodyClass="p-0">
          {clientInvoices.length ? (
            <div className="divide-y divide-slate-100">
              {clientInvoices.map((i) => (
                <div key={i.id} className="flex items-center gap-3 px-5 py-3.5">
                  <Wallet className="h-4 w-4 shrink-0 text-slate-400" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-800">{i.id}</p>
                    <p className="text-xs text-slate-500">₹{i.amount.toLocaleString()} · due {i.due}</p>
                  </div>
                  <StatusBadge status={i.status} />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-5"><EmptyState icon={Wallet} title="No invoices yet" message="Invoices are drafted from accepted work and approved scope." /></div>
          )}
        </Card>

        <Card title="Workspace & isolation" bodyClass="p-0">
          <div className="divide-y divide-slate-50 px-5">
            <DetailRow label="Tenant scope">{c.id} (isolated)</DetailRow>
            <DetailRow label="Client users">R. Iyer (Admin), 2 reviewers</DetailRow>
            <DetailRow label="Files & assets">Scoped to this workspace only</DetailRow>
            <DetailRow label="Cross-tenant access">Denied and logged (negative-tested)</DetailRow>
            <DetailRow label="Next review">{c.nextReview}</DetailRow>
          </div>
          <div className="mx-5 mb-5 mt-3 flex items-start gap-2 rounded-lg bg-emerald-50 px-3 py-2.5 text-xs text-emerald-800 ring-1 ring-emerald-200">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>Every project, brief, file, message, report and workflow run inherits this client's workspace scope. A client cannot access another client's record by changing a URL or identifier.</span>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default function Clients() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState('all')

  if (id) return <ClientDetail clientId={id} />

  const filtered = useMemo(() => {
    return clients.filter((c) => {
      if (tab !== 'all' && c.status !== tab) return false
      if (query && !c.name.toLowerCase().includes(query.toLowerCase()) && !c.type.toLowerCase().includes(query.toLowerCase())) return false
      return true
    })
  }, [query, tab])

  return (
    <div>
      <PageHeader
        title="Clients & Accounts"
        description="Client workspaces with strict tenant isolation. CEX coordinates communication and approvals — a status update is never approval to publish or change scope."
        actions={<button className="btn-primary"><UserPlus className="h-4 w-4" /> New workspace</button>}
      />

      <Card className="mb-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input className="input pl-9" placeholder="Search clients by name or type…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <Tabs
            active={tab}
            onChange={setTab}
            tabs={[
              { id: 'all', label: 'All', count: clients.length },
              { id: 'active', label: 'Active', count: clients.filter((c) => c.status === 'active').length },
              { id: 'onboarding', label: 'Onboarding', count: clients.filter((c) => c.status === 'onboarding').length },
              { id: 'at_risk', label: 'At risk', count: clients.filter((c) => c.status === 'at_risk').length }
            ]}
          />
        </div>
      </Card>

      {tab === 'onboarding' && (
        <Card title="Onboarding queue" subtitle="Workspace creation, profile, assets, goals and restrictions" className="mb-4" bodyClass="p-0">
          <div className="divide-y divide-slate-100">
            {onboardingQueue.map((o) => (
              <div key={o.client} className="px-5 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-800">{o.client}</p>
                  <Badge color={o.progress === 0 ? 'slate' : 'blue'}>{o.progress}%</Badge>
                </div>
                <ProgressBar value={o.progress} className="mt-2" />
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Missing information</p>
                    <ul className="mt-1 space-y-1">
                      {o.missing.map((m) => (
                        <li key={m} className="flex items-center gap-1.5 text-xs text-slate-600">
                          <span className="h-1 w-1 rounded-full bg-amber-400" />{m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500">Next action</p>
                    <p className="mt-1 text-xs text-slate-600">{o.next}</p>
                    <p className="mt-1 text-[11px] text-slate-400">Owner: {o.owner} · Started: {o.started}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((c) => (
          <div key={c.id} onClick={() => navigate(`/clients/${c.id}`)} className="card card-hover cursor-pointer p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar name={c.name} />
                <div>
                  <p className="text-sm font-bold text-slate-900">{c.name}</p>
                  <p className="text-xs text-slate-500">{c.type} · {c.location}</p>
                </div>
              </div>
              <StatusBadge status={c.status} />
            </div>
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-500">Health</span>
                <span className="font-semibold text-slate-700">{c.health}/100</span>
              </div>
              <ProgressBar value={c.health} color={c.health >= 80 ? 'bg-emerald-500' : c.health >= 65 ? 'bg-amber-500' : 'bg-rose-500'} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center">
              <div>
                <p className="text-sm font-bold text-slate-900">{c.projects}</p>
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Projects</p>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{c.openApprovals}</p>
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Approvals</p>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">₹{(c.mrr / 1000).toFixed(0)}k</p>
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Monthly</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <EmptyState icon={Handshake} title="No clients match" message="Try a different search or tab." />}
    </div>
  )
}