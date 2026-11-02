import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ChevronRight, FileText, Download, CheckCircle2, Circle, Clock,
  AlertTriangle, Check, ExternalLink, Image, Share2, Eye, Edit3, MoreHorizontal,
  ArrowRight, ShieldCheck, UserCheck, Sparkles, MessageSquare, Copy
} from 'lucide-react'
import { Card, Badge, ProgressBar, EmptyState } from '../components/ui'
import { initialContentItems, getContentItemById } from '../data/marketingContentData'
import { useApp } from '../state/AppContext'

export default function ContentItemDetail({ contentId }) {
  const { id: paramId, contentId: routeContentId } = useParams()
  const resolvedId = contentId || routeContentId || paramId
  const navigate = useNavigate()
  const { toast } = useApp()

  const seedItem = useMemo(() => getContentItemById(resolvedId, initialContentItems), [resolvedId])
  const [item, setItem] = useState(seedItem)
  const [activeTab, setActiveTab] = useState('overview')
  const [actionsOpen, setActionsOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  // Edit form state
  const [editForm, setEditForm] = useState({
    title: seedItem?.title || '',
    type: seedItem?.type || '',
    owner: seedItem?.owner || '',
    due: seedItem?.due || '',
    progress: seedItem?.progress || 0,
    objective: seedItem?.brief?.objective || '',
    keyMessage: seedItem?.brief?.keyMessage || ''
  })

  if (!item) {
    return (
      <div className="p-8 space-y-4">
        <button
          onClick={() => navigate('/marketing')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Marketing & Content
        </button>
        <EmptyState
          icon={FileText}
          title="Content Item Not Found"
          message={`No deliverable matching identifier "${resolvedId}".`}
          action={
            <button className="btn-primary text-xs" onClick={() => navigate('/marketing')}>
              Back to Content Production
            </button>
          }
        />
      </div>
    )
  }

  const handleAdvanceReview = () => {
    setItem((prev) => ({
      ...prev,
      progress: Math.min(100, prev.progress + 15),
      status: prev.progress >= 85 ? 'Ready for Client Approval' : 'In Review',
      reviewStatus: prev.reviewStatus.map((r, i) =>
        i === 3 ? { ...r, status: 'approved', date: 'Today' } : r
      )
    }))
    toast?.({ title: 'Review Advanced', body: 'QA checkpoint completed.' })
  }

  const handleSaveEdit = (e) => {
    e.preventDefault()
    setItem((prev) => ({
      ...prev,
      title: editForm.title,
      type: editForm.type,
      owner: editForm.owner,
      due: editForm.due,
      progress: Number(editForm.progress),
      brief: {
        ...prev.brief,
        objective: editForm.objective,
        keyMessage: editForm.keyMessage
      }
    }))
    setEditModalOpen(false)
    toast?.({ title: 'Deliverable Updated', body: 'Changes saved to content brief.' })
  }

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs">
        <button
          onClick={() => navigate('/marketing')}
          className="inline-flex items-center gap-1.5 font-semibold text-slate-700 hover:text-indigo-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:border-indigo-300 hover:bg-indigo-50/50 shadow-2xs transition"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-indigo-600" /> Marketing & Content
        </button>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        <span className="font-semibold text-slate-800">{item.title}</span>
        <span className="font-mono text-slate-400 text-[11px]">({item.id})</span>
      </div>

      {/* Header Card (Matching Panel 5 in reference image) */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-sm">
              <Share2 className="h-6 w-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">{item.title}</h1>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-600" /> {item.status}
                </span>
                <span className="font-mono text-xs text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded">
                  {item.id}
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                Client: <strong className="text-slate-700">{item.client}</strong> · Project: <span className="font-medium text-slate-700">{item.project}</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setEditModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition shadow-2xs"
            >
              <Edit3 className="h-3.5 w-3.5 text-slate-500" /> Edit
            </button>
            <div className="relative">
              <button
                onClick={() => setActionsOpen(!actionsOpen)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
              >
                <span>Actions</span>
                <MoreHorizontal className="h-3.5 w-3.5" />
              </button>
              {actionsOpen && (
                <div className="absolute right-0 mt-1 w-56 rounded-xl bg-white py-1 shadow-lg ring-1 ring-slate-900/10 z-20 text-xs">
                  <button
                    onClick={() => {
                      setActionsOpen(false)
                      handleAdvanceReview()
                    }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Mark QA Passed
                  </button>
                  <button
                    onClick={() => {
                      setActionsOpen(false)
                      navigate('/tasks')
                    }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" /> Request Client Approval
                  </button>
                  <button
                    onClick={() => {
                      setActionsOpen(false)
                      navigator.clipboard?.writeText(item.id)
                      toast?.({ title: 'Copied', body: 'Deliverable ID copied to clipboard' })
                    }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2 border-t border-slate-100"
                  >
                    <Copy className="h-3.5 w-3.5 text-slate-400" /> Copy Content ID
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Metrics Strip (Matching Panel 5) */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3 border-t border-slate-100 pt-5 text-xs">
          <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
            <span className="text-slate-400 font-medium text-[11px] block">Progress</span>
            <div className="flex items-center gap-2 mt-1">
              <ProgressBar value={item.progress} className="h-2 flex-1 rounded-full" />
              <span className="font-bold text-slate-900">{item.progress}%</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
            <span className="text-slate-400 font-medium text-[11px] block">Type</span>
            <span className="text-sm font-bold text-slate-900 mt-1 block">{item.type}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
            <span className="text-slate-400 font-medium text-[11px] block">Version</span>
            <span className="text-sm font-mono font-bold text-slate-900 mt-1 block">{item.version}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
            <span className="text-slate-400 font-medium text-[11px] block">Due date</span>
            <span className="text-sm font-bold text-slate-900 mt-1 block">{item.due}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
            <span className="text-slate-400 font-medium text-[11px] block">Owner</span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                {item.ownerInitials || 'KS'}
              </span>
              <span className="font-bold text-slate-800 truncate">{item.owner}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-6 overflow-x-auto pb-px text-sm">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'brief', label: 'Brief & assets' },
            { id: 'versions', label: 'Versions' },
            { id: 'reviews', label: 'Reviews' },
            { id: 'client_feedback', label: 'Client feedback' },
            { id: 'publishing', label: 'Publishing' },
            { id: 'history', label: 'Activity history' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap border-b-2 py-3 px-1 text-xs font-semibold transition ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 font-bold'
                  : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: OVERVIEW (Matching Panel 5 in reference image) */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2/3): Content brief & Current version graphic card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Content brief card */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
              <h3 className="font-bold text-slate-900 text-sm pb-3 border-b border-slate-100">
                Content brief
              </h3>
              <div className="mt-3.5 space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Objective</span>
                  <span className="font-semibold text-slate-900 text-right max-w-md">
                    {item.brief?.objective || 'Increase awareness about cardiac health checkups'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Target audience</span>
                  <span className="font-semibold text-slate-800 text-right">
                    {item.brief?.targetAudience || 'Adults 30–60, urban'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Key message</span>
                  <span className="font-semibold text-slate-800 text-right max-w-md">
                    {item.brief?.keyMessage || 'Regular checkups prevent heart diseases'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Format</span>
                  <span className="font-semibold text-slate-800 text-right">
                    {item.brief?.format || 'Instagram & LinkedIn post (image + caption)'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Brand guidelines</span>
                  <span className="font-semibold text-indigo-600 text-right">
                    {item.brief?.brandGuidelines || 'City Care brand v2.1'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Created</span>
                  <span className="text-slate-700 text-right">
                    {item.brief?.createdDate || '20 Oct 2026 by MKT-Creative'}
                  </span>
                </div>
              </div>
            </div>

            {/* Current version graphic preview card (Matching Panel 5) */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
              <h3 className="font-bold text-slate-900 text-sm pb-3 border-b border-slate-100">
                Current version
              </h3>

              <div className="mt-4 rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                <div className="p-6 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white min-h-[180px] flex flex-col justify-between rounded-t-xl">
                  <div className="flex justify-between items-start">
                    <span className="rounded bg-white/20 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                      Preventive Cardiology
                    </span>
                    <span className="text-xs font-mono text-indigo-300">City Care Hospital</span>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white max-w-md">
                      Your Heart Deserves Regular Care
                    </h2>
                    <p className="mt-1 text-xs text-indigo-200/80">
                      Comprehensive preventive screening and clinical diagnostics.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-white border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                  <div>
                    <p className="font-bold text-slate-900">
                      {item.currentVersion?.label || 'v2 - For client review'}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {item.currentVersion?.createdDate || 'Created 28 Oct 2026 by Creative Team'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toast?.({ title: 'Asset Download', body: 'Downloading 1.4 MB PNG package...' })}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition"
                    >
                      <Download className="h-3.5 w-3.5 text-slate-500" />
                      <span>Download asset (1.4 MB)</span>
                    </button>
                    <button
                      onClick={() => toast?.({ title: 'Full Screen Preview', body: 'Viewing 1080x1080 canvas.' })}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 p-1.5"
                    >
                      <span>View in full size</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (1/3): Review status stepper & Internal feedback */}
          <div className="space-y-6">
            {/* Review status card matching Panel 5 */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
              <h3 className="font-bold text-slate-900 text-sm pb-3 border-b border-slate-100">
                Review status
              </h3>

              <div className="mt-4 space-y-4">
                {[
                  { name: 'Draft created', detail: 'Approved', status: 'approved' },
                  { name: 'Creative review', detail: 'Approved (22 Oct 2026)', status: 'approved' },
                  { name: 'Brand review', detail: 'Approved (24 Oct 2026)', status: 'approved' },
                  { name: 'QA review', detail: 'In review (85%)', status: 'in_review' },
                  { name: 'Client approval', detail: 'Pending', status: 'pending' },
                  { name: 'Publishing', detail: 'Pending', status: 'pending' }
                ].map((st, i) => (
                  <div key={i} className="flex items-start gap-3 relative">
                    <div className="flex flex-col items-center">
                      {st.status === 'approved' ? (
                        <div className="h-4 w-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                          <Check className="h-2.5 w-2.5" />
                        </div>
                      ) : st.status === 'in_review' ? (
                        <div className="h-4 w-4 rounded-full bg-indigo-600 ring-4 ring-indigo-100 flex items-center justify-center shrink-0">
                          <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        </div>
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-slate-300 bg-white flex items-center justify-center shrink-0" />
                      )}
                      {i < 5 && <div className="w-0.5 h-6 bg-slate-200 mt-1" />}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-xs ${st.status === 'in_review' ? 'font-bold text-indigo-700' : st.status === 'approved' ? 'font-semibold text-slate-800' : 'text-slate-400'}`}>
                        {st.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">{st.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Internal feedback card matching Panel 5 */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
              <h3 className="font-bold text-slate-900 text-sm pb-3 border-b border-slate-100">
                Internal feedback
              </h3>

              <div className="mt-3.5 space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">S. Mehta · Brand Team</span>
                    <span className="text-[10px] text-slate-400 font-mono">24 Oct 2026</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    "Looks good. Please ensure font size is readable on mobile devices."
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">GOV-008 · Clinical Lead</span>
                    <span className="text-[10px] text-slate-400 font-mono">28 Oct 2026</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    "ICMR citation verified. Medical disclaimer on slide 5 confirmed compliant."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BRIEF & ASSETS */}
      {activeTab === 'brief' && (
        <Card title="Full Production Brief & Uploaded Assets" subtitle="Acceptance criteria and creative source files">
          <div className="space-y-4 text-xs text-slate-700">
            <p><strong>Acceptance Criteria:</strong> {item.brief?.acceptanceCriteria || 'All brand and clinical checks verified.'}</p>
            <p><strong>Asset Dimensions:</strong> 1080x1080 (Carousel 1:1 format, sRGB color profile).</p>
          </div>
        </Card>
      )}

      {/* TAB 3: VERSIONS */}
      {activeTab === 'versions' && (
        <Card title="Immutable Version History" subtitle="Prior revisions and author changes">
          <div className="divide-y divide-slate-100 text-xs">
            {(item.versionHistory || [
              { version: 'v2', date: '28 Oct 2026', author: 'CRT-004', note: 'Medical disclaimer update' },
              { version: 'v1', date: '22 Oct 2026', author: 'CRT-004', note: 'Initial draft' }
            ]).map((v, i) => (
              <div key={i} className="py-2.5 flex justify-between items-center">
                <div>
                  <span className="font-bold font-mono text-indigo-600">{v.version}</span>
                  <span className="text-slate-600 ml-2">{v.note}</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">{v.date}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 4: REVIEWS */}
      {activeTab === 'reviews' && (
        <Card title="Review Checkpoints" subtitle="Internal QA signoffs and factual checks">
          <p className="text-xs text-slate-600">QA passed with 85% score. Final client decision pending.</p>
        </Card>
      )}

      {/* TAB 5: CLIENT FEEDBACK */}
      {activeTab === 'client_feedback' && (
        <Card title="Client Review Feedback" subtitle="Comments and approvals submitted by client reviewer">
          <p className="text-xs text-slate-500">Waiting for Dr. Anitha Reddy to complete review gate.</p>
        </Card>
      )}

      {/* TAB 6: PUBLISHING */}
      {activeTab === 'publishing' && (
        <Card title="Channel Publishing Verification" subtitle="Direct integration status and execution logs">
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 text-xs text-amber-800 space-y-1">
            <p className="font-bold">Publishing Authorization Required</p>
            <p>Content cannot be pushed to live channels until client approval is signed and connector token is verified.</p>
          </div>
        </Card>
      )}

      {/* TAB 7: ACTIVITY HISTORY */}
      {activeTab === 'history' && (
        <Card title="Deliverable Activity Log" subtitle="Persistent tracking of workflow events">
          <div className="divide-y divide-slate-100 text-xs">
            {(item.activityLog || [
              { date: '28 Oct 2026, 10:12', actor: 'CRT-004', text: 'Submitted version v2 to QA and Client Approval gate.' }
            ]).map((l, i) => (
              <div key={i} className="py-2.5 flex justify-between">
                <span><strong>{l.actor}:</strong> {l.text}</span>
                <span className="text-[11px] text-slate-400 font-mono">{l.date}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Edit Deliverable</h3>
              <button onClick={() => setEditModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                ×
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="input text-xs"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Content Type</label>
                  <input
                    type="text"
                    value={editForm.type}
                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                    className="input text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Due Date</label>
                  <input
                    type="text"
                    value={editForm.due}
                    onChange={(e) => setEditForm({ ...editForm, due: e.target.value })}
                    className="input text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Objective</label>
                <textarea
                  rows={2}
                  value={editForm.objective}
                  onChange={(e) => setEditForm({ ...editForm, objective: e.target.value })}
                  className="input text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
                <button type="button" onClick={() => setEditModalOpen(false)} className="btn-secondary text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
