import { useState, useMemo } from 'react'
import { CheckSquare, Search, AlertTriangle, ShieldCheck, Clock, UserCheck, ThumbsUp, MessageSquare, FileCheck } from 'lucide-react'
import { Card, PageHeader, Badge, StatusBadge, Modal, DetailRow, Tabs, EmptyState, SimulationBanner } from '../components/ui'
import { useApp } from '../state/AppContext'
import { tasks as seedTasks } from '../data/tasks'

function ApprovalModal({ approval, onClose }) {
  const { decideApproval } = useApp()
  const [comment, setComment] = useState('')
  if (!approval) return null
  const decided = ['approved', 'revision'].includes(approval.status)

  return (
    <Modal
      open
      onClose={onClose}
      title={approval.title}
      subtitle={`${approval.id} · ${approval.type} · ${approval.client}`}
      wide
      footer={
        decided ? (
          <button className="btn-secondary" onClick={onClose}>Close</button>
        ) : (
          <>
            <button className="btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn-danger" onClick={() => { decideApproval(approval.id, 'revise', comment); onClose() }}>
              <MessageSquare className="h-4 w-4" /> Request revision
            </button>
            <button className="btn-primary" onClick={() => { decideApproval(approval.id, 'approve', comment); onClose() }}>
              <ThumbsUp className="h-4 w-4" /> Approve (simulated)
            </button>
          </>
        )
      }
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={approval.status} />
          <Badge color={approval.risk === 'critical' ? 'red' : approval.risk === 'high' ? 'orange' : 'amber'}>{approval.risk} risk</Badge>
          <Badge color="slate">Due {approval.due}</Badge>
        </div>

        {decided && (
          <div className={`rounded-xl p-4 ${approval.status === 'approved' ? 'bg-emerald-50 ring-1 ring-emerald-200' : 'bg-amber-50 ring-1 ring-amber-200'}`}>
            <p className={`text-sm font-semibold ${approval.status === 'approved' ? 'text-emerald-800' : 'text-amber-800'}`}>
              {approval.status === 'approved' ? '✓ Approved (simulated decision recorded)' : '↩ Revision requested (simulated)'}
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Decided by {approval.decidedBy} · {approval.decidedAt}.
              {approval.status === 'approved'
                ? ' No external action was executed — publishing still requires the authorised connector and all gates to pass.'
                : ' A revision task has been created; the producing role will be re-routed.'}
            </p>
            {approval.comment && <p className="mt-2 rounded-lg bg-white/70 px-3 py-2 text-xs text-slate-600">“{approval.comment}”</p>}
          </div>
        )}

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Why approval is required</p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{approval.reason}</p>
        </div>

        <div className="rounded-xl border border-slate-200">
          <div className="divide-y divide-slate-50 px-4">
            <DetailRow label="Requested by">{approval.requestedBy}</DetailRow>
            <DetailRow label="Approver">{approval.approver}</DetailRow>
            <DetailRow label="Submitted">{approval.submitted}</DetailRow>
            <DetailRow label="Due">{approval.due}</DetailRow>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Artefacts under review</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {approval.artefacts.map((a) => (
              <code key={a} className="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-700">{a}</code>
            ))}
          </div>
        </div>

        {!decided && (
          <div>
            <label className="label" htmlFor="appr-comment">Decision note (optional)</label>
            <textarea id="appr-comment" className="input min-h-[80px] resize-y" placeholder="Add context for the audit trail…" value={comment} onChange={(e) => setComment(e.target.value)} />
          </div>
        )}

        <p className="rounded-lg bg-slate-50 px-3 py-2.5 text-[11px] leading-relaxed text-slate-500">
          This is a simulated approval. In production the decision is recorded with the approver's authenticated identity, timestamp and the exact version under review; material edits after approval require re-approval.
        </p>
      </div>
    </Modal>
  )
}

export default function Tasks() {
  const { tasks, moveTask, approvals } = useApp()
  const [tab, setTab] = useState('approvals')
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedApproval, setSelectedApproval] = useState(null)

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (statusFilter !== 'all' && t.status !== statusFilter) return false
      if (query) {
        const q = query.toLowerCase()
        if (!t.name.toLowerCase().includes(q) && !t.client.toLowerCase().includes(q) && !t.id.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [tasks, query, statusFilter])

  const openApprovals = approvals.filter((a) => ['pending', 'in_review', 'escalated'].includes(a.status))
  const decidedApprovals = approvals.filter((a) => ['approved', 'revision'].includes(a.status))

  return (
    <div>
      <PageHeader
        title="Tasks, Approvals & Decisions"
        description="The work queue and the human decision gates. Actions requiring human approval appear here as pending — never as automatically completed."
      />
      <SimulationBanner />

      <div className="mb-4">
        <Tabs
          active={tab}
          onChange={setTab}
          tabs={[
            { id: 'approvals', label: 'Approvals & decisions', count: openApprovals.length },
            { id: 'tasks', label: 'Task queue', count: tasks.length },
            { id: 'decided', label: 'Decision history', count: decidedApprovals.length }
          ]}
        />
      </div>

      {tab === 'approvals' && (
        <div className="space-y-3">
          {openApprovals.length === 0 && (
            <EmptyState icon={FileCheck} title="No pending approvals" message="All decision gates are clear. New approvals appear here when agents request them." />
          )}
          {openApprovals.map((a) => (
            <Card key={a.id} className="card-hover">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className={`mt-0.5 rounded-lg p-2 ${a.risk === 'critical' ? 'bg-rose-50 text-rose-600' : a.risk === 'high' ? 'bg-orange-50 text-orange-600' : 'bg-amber-50 text-amber-600'}`}>
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-slate-900">{a.title}</p>
                      <StatusBadge status={a.status} />
                      <Badge color={a.risk === 'critical' ? 'red' : a.risk === 'high' ? 'orange' : 'amber'}>{a.risk}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{a.client} · {a.type}</p>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">{a.reason}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {a.artefacts.map((art) => (
                        <code key={art} className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600">{art}</code>
                      ))}
                    </div>
                    <p className="mt-2 flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Submitted {a.submitted}</span>
                      <span className="flex items-center gap-1"><UserCheck className="h-3 w-3" /> {a.approver}</span>
                    </p>
                  </div>
                </div>
                <button className="btn-primary shrink-0 self-start sm:self-center" onClick={() => setSelectedApproval(a)}>
                  Review & decide
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'tasks' && (
        <>
          <Card className="mb-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input className="input pl-9" placeholder="Search tasks by name, client or ID…" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <select className="input lg:w-52" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All statuses</option>
                <option value="in_progress">In progress</option>
                <option value="blocked">Blocked</option>
                <option value="escalated">Escalated</option>
                <option value="pending_approval">Pending approval</option>
                <option value="needs_information">Needs information</option>
              </select>
            </div>
          </Card>
          <Card bodyClass="p-0" title={`Task queue (${filteredTasks.length})`} subtitle="Move a task through its permitted stages — simulated, with side-effect checks">
            {filteredTasks.length === 0 ? (
              <div className="p-6"><EmptyState icon={CheckSquare} title="No tasks match" /></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[860px]">
                  <thead className="border-b border-slate-100 bg-slate-50/60">
                    <tr>
                      <th className="th">Task</th>
                      <th className="th">Client</th>
                      <th className="th">Owner</th>
                      <th className="th">Stage</th>
                      <th className="th">Priority</th>
                      <th className="th">Due</th>
                      <th className="th">Status</th>
                      <th className="th">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredTasks.map((t) => (
                      <tr key={t.id} className="transition hover:bg-slate-50/60">
                        <td className="td">
                          <p className="font-medium text-slate-800">{t.name}</p>
                          {t.note && <p className="mt-0.5 flex items-center gap-1 text-xs text-amber-600"><AlertTriangle className="h-3 w-3" /> {t.note}</p>}
                        </td>
                        <td className="td max-w-[160px] truncate text-slate-600">{t.client}</td>
                        <td className="td text-slate-600">{t.owner}</td>
                        <td className="td text-slate-500">{t.stage ? `Stage ${t.stage}` : '—'}</td>
                        <td className="td"><Badge color={t.priority === 'critical' ? 'red' : t.priority === 'high' ? 'orange' : t.priority === 'medium' ? 'amber' : 'slate'}>{t.priority}</Badge></td>
                        <td className="td text-slate-500">{t.due}</td>
                        <td className="td"><StatusBadge status={t.status} /></td>
                        <td className="td">
                          {t.status === 'blocked' && (
                            <button className="btn-secondary !px-2.5 !py-1 !text-xs" onClick={() => moveTask(t.id, 'in_progress')}>Unblock (sim.)</button>
                          )}
                          {t.status === 'needs_information' && (
                            <button className="btn-secondary !px-2.5 !py-1 !text-xs" onClick={() => moveTask(t.id, 'in_progress')}>Mark received</button>
                          )}
                          {t.status === 'in_progress' && (
                            <button className="btn-secondary !px-2.5 !py-1 !text-xs" onClick={() => moveTask(t.id, 'pending_approval')}>Send to approval</button>
                          )}
                          {t.status === 'pending_approval' && (
                            <button className="btn-primary !px-2.5 !py-1 !text-xs" onClick={() => moveTask(t.id, 'in_progress')}>Approve (sim.)</button>
                          )}
                          {t.status === 'escalated' && (
                            <button className="btn-secondary !px-2.5 !py-1 !text-xs" onClick={() => moveTask(t.id, 'in_progress')}>Resolve</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </>
      )}

      {tab === 'decided' && (
        <Card bodyClass="p-0" title="Decision history" subtitle="Recorded decisions with identity, version and timestamp">
          {decidedApprovals.length === 0 ? (
            <div className="p-6"><EmptyState icon={FileCheck} title="No decisions yet" message="Approvals you decide in this session will appear here with their audit record." /></div>
          ) : (
            <div className="divide-y divide-slate-100">
              {decidedApprovals.map((a) => (
                <div key={a.id} className="flex items-center gap-3 px-5 py-4">
                  <span className={`rounded-lg p-2 ${a.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {a.status === 'approved' ? <ThumbsUp className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-800">{a.title}</p>
                    <p className="text-xs text-slate-500">{a.client} · by {a.decidedBy} · {a.decidedAt}</p>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {selectedApproval && <ApprovalModal approval={selectedApproval} onClose={() => setSelectedApproval(null)} />}
    </div>
  )
}