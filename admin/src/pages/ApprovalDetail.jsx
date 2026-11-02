import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ChevronRight, ShieldCheck, CheckCircle2, AlertTriangle, Clock,
  FileText, Download, Check, ExternalLink, Sparkles, MessageSquare, User,
  Building2, FolderKanban, MoreHorizontal, AlertCircle, HelpCircle, History,
  Send, X, CheckSquare, Layers, CornerDownRight, ArrowUpRight
} from 'lucide-react'
import { Card, Badge, EmptyState } from '../components/ui'
import { initialPendingApprovals, getApprovalById } from '../data/tasksApprovalsData'
import { useApp } from '../state/AppContext'

export default function ApprovalDetail({ approvalId }) {
  const { id: paramId, approvalId: routeApprovalId } = useParams()
  const resolvedId = approvalId || routeApprovalId || paramId
  const navigate = useNavigate()
  const { toast } = useApp()

  const seedApproval = useMemo(() => getApprovalById(resolvedId, initialPendingApprovals), [resolvedId])
  const [approval, setApproval] = useState(seedApproval)
  const [activeTab, setActiveTab] = useState('request')
  const [decisionChoice, setDecisionChoice] = useState('approve')
  const [decisionComment, setDecisionComment] = useState('')
  const [authorityConfirmed, setAuthorityConfirmed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [actionsOpen, setActionsOpen] = useState(false)

  if (!approval) {
    return (
      <div className="p-8 space-y-4">
        <button
          onClick={() => navigate('/tasks')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Tasks & Approvals
        </button>
        <EmptyState
          icon={ShieldCheck}
          title="Approval Request Not Found"
          message={`No decision gate matching identifier "${resolvedId}".`}
          action={
            <button className="btn-primary text-xs" onClick={() => navigate('/tasks')}>
              Back to Pending Decisions
            </button>
          }
        />
      </div>
    )
  }

  const isDecided = approval.status !== 'Pending'

  const handleSubmitDecision = (e) => {
    e.preventDefault()
    if (!decisionComment.trim()) {
      toast('Please enter your decision comments before submitting.', 'warning')
      return
    }
    if (!authorityConfirmed && !isDecided) {
      toast('Please confirm that you hold the required authority level.', 'warning')
      return
    }

    setSubmitting(true)
    setTimeout(() => {
      const outcomeText =
        decisionChoice === 'approve'
          ? 'Approved'
          : decisionChoice === 'changes'
          ? 'Changes Requested'
          : 'Rejected'

      const updated = {
        ...approval,
        status: outcomeText,
        decisionRecorded: {
          outcome: outcomeText,
          comment: decisionComment,
          decidedBy: 'R. Iyer (Client Admin)',
          timestamp: new Date().toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        }
      }

      setApproval(updated)
      setSubmitting(false)
      toast(`Decision recorded: ${approval.id} has been marked as ${outcomeText}.`, 'success')
    }, 400)
  }

  return (
    <div className="space-y-5 p-4 lg:p-6 max-w-7xl mx-auto pb-16">
      {/* 1. Breadcrumb navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-600">
        <button
          onClick={() => navigate('/tasks')}
          className="hover:text-indigo-600 flex items-center gap-1 font-medium transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Tasks & Approvals
        </button>
        <ChevronRight className="h-3 w-3 text-slate-600" />
        <span className="text-slate-800 font-semibold truncate">
          {approval.title} ({approval.id})
        </span>
      </nav>

      {/* 2. Header banner matching Panel 6 */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 text-amber-600 shadow-xs">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">{approval.title}</h1>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                  {approval.id}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                  {approval.type}
                </span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                    approval.priority.toLowerCase().includes('critical')
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  {approval.priority}
                </span>
                {isDecided && (
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                      approval.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : approval.status === 'Changes Requested'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}
                  >
                    Status: {approval.status}
                  </span>
                )}
              </div>

              {/* Subtitle / client info */}
              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-600">Client:</span>
                  <button
                    onClick={() => navigate('/clients')}
                    className="font-semibold text-slate-800 hover:text-indigo-600 inline-flex items-center gap-1"
                  >
                    {approval.client} <ExternalLink className="h-3 w-3 text-slate-600" />
                  </button>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-600">Project:</span>
                  <span className="font-semibold text-slate-800">{approval.project}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="relative shrink-0 flex items-center gap-2">
            <button
              onClick={() => setActionsOpen(!actionsOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
            >
              <span>More actions</span>
              <MoreHorizontal className="h-3.5 w-3.5 text-slate-600" />
            </button>
            {actionsOpen && (
              <div className="absolute right-0 top-10 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 text-xs">
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href)
                    toast('Decision link copied to clipboard', 'info')
                    setActionsOpen(false)
                  }}
                  className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50"
                >
                  Copy decision link
                </button>
                <button
                  onClick={() => {
                    toast('Audit log exported to ledger document.', 'info')
                    setActionsOpen(false)
                  }}
                  className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50"
                >
                  Export verification PDF
                </button>
                <button
                  onClick={() => {
                    toast('Request escalated to Executive Authority Desk.', 'warning')
                    setActionsOpen(false)
                  }}
                  className="w-full text-left px-3.5 py-2 text-rose-600 hover:bg-rose-50 border-t border-slate-100"
                >
                  Escalate to Executive Desk
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Header metadata bar */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-slate-600">
            <div className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center font-bold text-[10px] text-indigo-700">
              KS
            </div>
            <div>
              <span className="text-slate-600">Submitted by: </span>
              <span className="font-semibold text-slate-800">{approval.submittedBy}</span>
              <span className="text-slate-600 ml-1.5 font-mono text-[11px]">{approval.submittedDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <User className="h-3.5 w-3.5 text-slate-600" />
            <div>
              <span className="text-slate-600">Required approver: </span>
              <span className="font-semibold text-slate-800">{approval.requiredApprover}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <Clock className="h-3.5 w-3.5 text-rose-500" />
            <div>
              <span className="text-slate-600">Due date: </span>
              <span className="font-semibold text-rose-700">{approval.dueDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs matching Panel 6 */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-6 overflow-x-auto">
          {[
            { id: 'request', label: 'Request details' },
            { id: 'content', label: 'Proposed content' },
            { id: 'documents', label: 'Supporting documents' },
            { id: 'assessment', label: 'AI assessment' },
            { id: 'history', label: 'Decision history' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-700'
                  : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* 4. Two-Column Layout: Main Content (Left) & Decision Rail (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: 7 Cols */}
        <div className="lg:col-span-7 space-y-5">
          {/* TAB 1: REQUEST DETAILS */}
          {activeTab === 'request' && (
            <div className="space-y-5">
              {/* What is being requested? */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2.5">
                  What is being requested?
                </h3>
                <p className="text-sm font-medium text-slate-800 leading-relaxed">
                  {approval.whatIsRequested}
                </p>
              </div>

              {/* Why is approval required? */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                  Why is approval required?
                </h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {approval.whyRequired?.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related items */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                  Related items
                </h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6 text-xs">
                  <div>
                    <dt className="text-slate-600">Content ID</dt>
                    <dd className="mt-0.5">
                      {approval.relatedItems?.contentId ? (
                        <button
                          onClick={() => navigate(`/marketing/${approval.relatedItems.contentId}`)}
                          className="font-mono font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
                        >
                          {approval.relatedItems.contentId}
                          <ArrowUpRight className="h-3 w-3" />
                        </button>
                      ) : (
                        <span className="font-mono text-slate-800">{approval.id}</span>
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-600">Project</dt>
                    <dd className="mt-0.5 font-medium text-slate-800">{approval.relatedItems?.project}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-600">Client</dt>
                    <dd className="mt-0.5 font-medium text-slate-800">{approval.relatedItems?.client}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-600">Content type</dt>
                    <dd className="mt-0.5 font-medium text-slate-800">{approval.relatedItems?.contentType || 'Social Media'}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-600">Version</dt>
                    <dd className="mt-0.5 font-mono font-semibold text-slate-800">{approval.relatedItems?.version || 'v2'}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-600">Department</dt>
                    <dd className="mt-0.5 font-medium text-slate-800">{approval.department}</dd>
                  </div>
                </dl>
              </div>

              {/* Proposed content summary preview */}
              {approval.proposedContent && (
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Proposed Copy Preview
                    </h3>
                    <button
                      onClick={() => setActiveTab('content')}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
                    >
                      View full asset <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
                    <div className="font-bold text-slate-900">{approval.proposedContent.headline}</div>
                    <p className="text-slate-600 italic">"{approval.proposedContent.copy}"</p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[11px] text-slate-600 font-medium">Channels:</span>
                      {approval.proposedContent.targetChannels?.map((ch, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-semibold">
                          {ch}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PROPOSED CONTENT */}
          {activeTab === 'content' && (
            <div className="space-y-5">
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-bold text-slate-900">Creative Deliverable & Asset Specification</h3>
                  <span className="text-xs font-mono font-semibold text-slate-600">
                    {approval.relatedItems?.version || 'v2.0'}
                  </span>
                </div>

                {approval.proposedContent ? (
                  <div className="space-y-4 text-xs">
                    <div>
                      <span className="text-slate-600 uppercase tracking-wider font-semibold text-[11px]">Primary Headline:</span>
                      <p className="mt-1 text-sm font-bold text-slate-900">{approval.proposedContent.headline}</p>
                    </div>

                    <div>
                      <span className="text-slate-600 uppercase tracking-wider font-semibold text-[11px]">Approved Body Copy:</span>
                      <p className="mt-1 p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 leading-relaxed font-sans">
                        {approval.proposedContent.copy}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3 bg-white border border-slate-200 rounded-lg">
                        <span className="text-slate-600 text-[11px] font-medium">Asset Reference</span>
                        <div className="font-mono text-xs font-semibold text-slate-800 mt-0.5">
                          {approval.proposedContent.assetRef}
                        </div>
                      </div>
                      <div className="p-3 bg-white border border-slate-200 rounded-lg">
                        <span className="text-slate-600 text-[11px] font-medium">Target Platforms</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {approval.proposedContent.targetChannels?.map((ch) => (
                            <span key={ch} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[11px] font-medium">
                              {ch}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-600 p-4 bg-slate-50 rounded-lg">
                    {approval.description}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: SUPPORTING DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 mb-3">Verification Documents & Evidence</h3>
                <div className="space-y-2.5">
                  {approval.supportingDocuments?.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-900">{doc.name}</p>
                          <p className="text-[11px] text-slate-600">
                            {doc.size} · Uploaded {doc.date}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => toast(`Downloading ${doc.name}...`, 'info')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-xs"
                      >
                        <Download className="h-3.5 w-3.5 text-slate-600" /> Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AI ASSESSMENT */}
          {activeTab === 'assessment' && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-indigo-600" />
                    <h3 className="text-sm font-bold text-slate-900">AI Verification Report</h3>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-semibold">
                    {approval.aiAssessment?.recommendation || 'Recommended'}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {approval.aiAssessment?.summary}
                </p>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Automated Verification Checks
                  </h4>
                  <div className="space-y-2">
                    {approval.aiAssessment?.checklist?.map((chk, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-800">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>{chk.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DECISION HISTORY */}
          {activeTab === 'history' && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Audit Trail & Preceding Actions</h3>
              <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                <div className="relative">
                  <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-indigo-600 border-2 border-white" />
                  <p className="text-xs font-semibold text-slate-900">Decision Gate Instantiated</p>
                  <p className="text-[11px] text-slate-600">
                    Triggered by workflow gate for external publication · {approval.submittedDate}
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                  <p className="text-xs font-semibold text-slate-900">Automated QA Verification Passed</p>
                  <p className="text-[11px] text-slate-600">
                    Checked against medical guidelines and brand assets · Zero critical infractions detected
                  </p>
                </div>
                {approval.decisionRecorded && (
                  <div className="relative">
                    <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-emerald-600 border-2 border-white" />
                    <p className="text-xs font-semibold text-slate-900">
                      Human Authority Sign-off: {approval.decisionRecorded.outcome}
                    </p>
                    <p className="text-[11px] text-slate-600">
                      Recorded by {approval.decisionRecorded.decidedBy} at {approval.decisionRecorded.timestamp}
                    </p>
                    <p className="text-xs text-slate-800 mt-1 italic bg-slate-50 p-2.5 rounded border border-slate-200">
                      "{approval.decisionRecorded.comment}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: 5 Cols (AI assessment + Decision Box matching Panel 6) */}
        <div className="lg:col-span-5 space-y-5">
          {/* AI Assessment Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-indigo-600" /> AI assessment
              </h3>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                <Check className="h-3 w-3" />
                {approval.aiAssessment?.recommendation || 'Recommended'}
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              {approval.aiAssessment?.summary}
            </p>

            <div className="mb-3.5 flex items-center gap-2 text-xs">
              <span className="text-slate-600 font-medium">Risk level:</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                {approval.aiAssessment?.risk || 'Low'}
              </span>
            </div>

            <div className="space-y-2 border-t border-slate-100 pt-3">
              {approval.aiAssessment?.checklist?.map((chk, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                  <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 stroke-[2.5]" />
                  <span>{chk.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Decision Action Card matching Panel 6 */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3.5">Decision</h3>

            {isDecided ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Decision Recorded: {approval.status}
                </div>
                <p className="text-xs text-slate-700 italic">
                  "{approval.decisionRecorded?.comment || 'Sign-off confirmed.'}"
                </p>
                <div className="text-[11px] text-slate-600 pt-1 border-t border-emerald-100">
                  Decided by {approval.decisionRecorded?.decidedBy || 'Authorised Officer'} on{' '}
                  {approval.decisionRecorded?.timestamp || 'Today'}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitDecision} className="space-y-4">
                {/* Radio options */}
                <div className="space-y-2.5">
                  <label className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <input
                      type="radio"
                      name="decisionChoice"
                      value="approve"
                      checked={decisionChoice === 'approve'}
                      onChange={(e) => setDecisionChoice(e.target.value)}
                      className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                    />
                    <span className="text-xs font-semibold text-slate-800">
                      Approve and allow publishing
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <input
                      type="radio"
                      name="decisionChoice"
                      value="changes"
                      checked={decisionChoice === 'changes'}
                      onChange={(e) => setDecisionChoice(e.target.value)}
                      className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                    />
                    <span className="text-xs font-semibold text-slate-800">
                      Request changes
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <input
                      type="radio"
                      name="decisionChoice"
                      value="reject"
                      checked={decisionChoice === 'reject'}
                      onChange={(e) => setDecisionChoice(e.target.value)}
                      className="text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                    />
                    <span className="text-xs font-semibold text-slate-800">Reject</span>
                  </label>
                </div>

                {/* Comment Textarea */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Add a comment (required)
                  </label>
                  <textarea
                    rows={3}
                    value={decisionComment}
                    onChange={(e) => setDecisionComment(e.target.value)}
                    placeholder="Enter your decision comments..."
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                {/* Authority Checkbox */}
                <label className="flex items-start gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={authorityConfirmed}
                    onChange={(e) => setAuthorityConfirmed(e.target.checked)}
                    className="text-indigo-600 focus:ring-indigo-500 rounded h-4 w-4 mt-0.5"
                  />
                  <span className="text-[11px] text-slate-600 leading-tight">
                    I confirm that I have verified the associated evidence and hold the required authority level to make this decision.
                  </span>
                </label>

                {/* Buttons row */}
                <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => navigate('/tasks')}
                    className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
                  >
                    {submitting ? 'Recording...' : 'Submit decision'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
