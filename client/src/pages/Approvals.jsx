import { useState } from 'react'
import { ClipboardCheck, ThumbsUp, MessageSquare, Image, FileText, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react'
import { Card, Badge, StatusBadge, Modal, EmptyState } from '../components/ui'
import { useClient } from '../state/ClientContext'

function ReviewModal({ review, onClose }) {
  const { decideReview } = useClient()
  const [mode, setMode] = useState('approve') // 'approve' | 'revise'
  const [comment, setComment] = useState('')
  if (!review) return null
  const decided = ['approved', 'revision'].includes(review.status)

  return (
    <Modal
      open
      onClose={onClose}
      title={review.project}
      subtitle={`${review.type} · ${review.channel} · ${review.version}`}
      wide
      footer={
        decided ? (
          <button className="btn-secondary" onClick={onClose}>Close</button>
        ) : (
          <>
            <button className="btn-secondary" onClick={onClose}>Cancel</button>
            {mode === 'approve' ? (
              <button className="btn-primary" onClick={() => { decideReview(review.id, 'approve', comment); onClose() }}>
                <ThumbsUp className="h-4 w-4" /> Approve this version
              </button>
            ) : (
              <button className="btn-primary" onClick={() => { decideReview(review.id, 'revise', comment); onClose() }}>
                <MessageSquare className="h-4 w-4" /> Send revision request
              </button>
            )}
          </>
        )
      }
    >
      <div className="space-y-4">
        {decided && (
          <div className={`rounded-xl p-4 ${review.status === 'approved' ? 'bg-emerald-50 ring-1 ring-emerald-200' : 'bg-amber-50 ring-1 ring-amber-200'}`}>
            <p className={`text-sm font-bold ${review.status === 'approved' ? 'text-emerald-800' : 'text-amber-800'}`}>
              {review.status === 'approved' ? '✓ Approved — thank you!' : '↩ Revision requested'}
            </p>
            <p className="mt-1 text-xs text-slate-600">
              {review.status === 'approved'
                ? 'We will proceed with this exact version. In this demo, publishing is simulated — you will see a labelled “simulated” status, not a real live post.'
                : 'Our team will make the changes and send the updated version back to you for review. Your feedback is saved to this version.'}
            </p>
            {review.comment && <p className="mt-2 rounded-lg bg-white/70 px-3 py-2 text-xs text-slate-600">“{review.comment}”</p>}
          </div>
        )}

        {/* Content preview */}
        {review.type === 'Social post' ? (
          <div>
            <p className="label">Here's exactly what will be posted</p>
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <div className="flex h-40 items-center justify-center bg-gradient-to-br from-brand-100 to-brand-200">
                <div className="text-center">
                  <Image className="mx-auto h-8 w-8 text-brand-400" />
                  <p className="mt-1 text-xs font-medium text-brand-700">{review.imageLabel}</p>
                </div>
              </div>
              <div className="bg-white p-4">
                <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">{review.caption}</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="label">Here's the plan we need you to approve</p>
            <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200">
              {review.plan.map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-4 px-4 py-3">
                  <span className="shrink-0 text-xs font-semibold text-slate-500">{row.label}</span>
                  <span className="text-right text-sm font-medium text-slate-800">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-start gap-2 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-600 ring-1 ring-slate-200">
          <FileText className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          <span><span className="font-semibold">Our notes:</span> {review.notes}</span>
        </div>

        {!decided && (
          <>
            <div className="flex gap-2">
              <button
                onClick={() => setMode('approve')}
                className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${mode === 'approve' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                It looks good — approve
              </button>
              <button
                onClick={() => setMode('revise')}
                className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${mode === 'revise' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                I'd like some changes
              </button>
            </div>
            <div>
              <label className="label" htmlFor="rev-comment">{mode === 'approve' ? 'A note for our team (optional)' : 'What should we change?'}</label>
              <textarea
                id="rev-comment"
                className="input min-h-[80px] resize-y"
                placeholder={mode === 'approve' ? 'Anything you want us to know…' : 'e.g. “Please make the tone warmer and shorten the caption”'}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </>
        )}

        <p className="rounded-xl bg-slate-50 px-4 py-3 text-[11px] leading-relaxed text-slate-500">
          Your decision is tied to this exact version. If we make any meaningful change after you approve, we will send it back for your approval again.
          In this demo, no real post is published and no real ad spend happens.
        </p>
      </div>
    </Modal>
  )
}

export default function Approvals() {
  const { reviews } = useClient()
  const [selected, setSelected] = useState(null)
  const pending = reviews.filter((r) => r.status === 'pending')
  const decided = reviews.filter((r) => ['approved', 'revision'].includes(r.status))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Approvals</h1>
        <p className="mt-1 text-sm text-slate-500">
          Content and plans that are ready for your decision. You can approve, or ask for changes — nothing goes live without your yes.
        </p>
      </div>

      {pending.length === 0 ? (
        <EmptyState
          icon={ClipboardCheck}
          title="You're all caught up!"
          message="Nothing is waiting on you right now. When something is ready for your review, it will appear here and we'll notify you."
        />
      ) : (
        <div className="space-y-4">
          {pending.map((r) => (
            <Card key={r.id} className="card-hover">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-amber-50 p-2.5 ring-1 ring-amber-100">
                    {r.type === 'Social post' ? <Image className="h-5 w-5 text-amber-600" /> : <FileText className="h-5 w-5 text-amber-600" />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">{r.project}</h3>
                      <Badge color="slate">{r.type}</Badge>
                      <Badge color="amber" dot>Needs your approval</Badge>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{r.channel} · {r.version} · submitted {r.submitted} · due {r.due}</p>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
                      {r.type === 'Social post' ? 'The caption and image are ready. Review them and approve, or tell us what to change.' : 'We need your approval of the campaign plan and budget before any spend begins.'}
                    </p>
                  </div>
                </div>
                <button className="btn-primary shrink-0 self-start sm:self-center" onClick={() => setSelected(r)}>
                  Review <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {decided.length > 0 && (
        <Card title="Recent decisions" subtitle="Your approvals and revision requests" bodyClass="p-0">
          <div className="divide-y divide-slate-100">
            {decided.map((r) => (
              <div key={r.id} className="flex items-center gap-3 px-5 py-4">
                <span className={`rounded-lg p-2 ${r.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                  {r.status === 'approved' ? <CheckCircle2 className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">{r.project}</p>
                  <p className="text-xs text-slate-500">{r.type} · by {r.decidedBy} · {r.decidedAt}</p>
                  {r.comment && <p className="mt-0.5 truncate text-xs text-slate-400">“{r.comment}”</p>}
                </div>
                <StatusBadge status={r.status} label={r.status === 'approved' ? 'Approved' : 'Revision requested'} />
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="flex items-start gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-600 ring-1 ring-slate-200">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
        <span>
          For healthcare content, some claims are checked by our quality team before they reach you. If a claim needs extra review, we'll let you know —
          we never publish medical claims without proper checks.
        </span>
      </div>

      {selected && <ReviewModal review={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}