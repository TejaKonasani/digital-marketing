import { useState, useMemo } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft, ChevronRight, Building2, Globe, Mail, Phone, Users, FileText,
  Download, Calendar, Target, CheckCircle2, Circle, Clock, AlertTriangle,
  Sparkles, ExternalLink, ShieldCheck, CheckSquare, Edit3, Send, UserCheck,
  MoreHorizontal, Plus, ArrowRight, Copy, Check
} from 'lucide-react'
import { Card, Badge, ProgressBar, EmptyState } from '../components/ui'
import { initialOpportunities, getOpportunityById, pipelineStages } from '../data/salesPipelineData'
import { useApp } from '../state/AppContext'

export default function SalesOpportunityDetail({ opportunityId }) {
  const { id: paramId, opportunityId: routeOppId } = useParams()
  const resolvedId = opportunityId || routeOppId || paramId
  const navigate = useNavigate()
  const { toast } = useApp()

  const seedOpp = useMemo(() => getOpportunityById(resolvedId, initialOpportunities), [resolvedId])
  const [opportunity, setOpportunity] = useState(seedOpp)
  const [activeTab, setActiveTab] = useState('overview')
  const [actionsMenuOpen, setActionsMenuOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: seedOpp?.name || '',
    industry: seedOpp?.industry || '',
    location: seedOpp?.location || '',
    website: seedOpp?.organisationDetails?.website || '',
    contactPerson: seedOpp?.organisationDetails?.contactPerson || '',
    email: seedOpp?.organisationDetails?.email || '',
    phone: seedOpp?.organisationDetails?.phone || '',
    companySize: seedOpp?.organisationDetails?.companySize || '',
    description: seedOpp?.organisationDetails?.description || '',
    value: seedOpp?.value || 0,
    nextAction: seedOpp?.nextAction || ''
  })

  if (!opportunity) {
    return (
      <div className="p-8 space-y-4">
        <button
          onClick={() => navigate('/sales')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Sales Pipeline
        </button>
        <EmptyState
          icon={Building2}
          title="Opportunity Not Found"
          message={`No opportunity found matching identifier "${resolvedId}".`}
          action={
            <button className="btn-primary text-xs" onClick={() => navigate('/sales')}>
              Back to Pipeline
            </button>
          }
        />
      </div>
    )
  }

  const handleAdvanceStage = () => {
    const stageOrder = ['discovered', 'researching', 'qualified', 'discovery', 'proposal_draft', 'awaiting_approval', 'awaiting_response', 'negotiation', 'approved_scope']
    const currentIndex = stageOrder.indexOf(opportunity.stage)
    if (currentIndex < stageOrder.length - 1) {
      const nextStageKey = stageOrder[currentIndex + 1]
      const nextStageObj = pipelineStages.find((s) => s.id === nextStageKey)
      setOpportunity((prev) => ({
        ...prev,
        stage: nextStageKey,
        stageName: nextStageObj ? nextStageObj.name : nextStageKey,
        stepperStages: prev.stepperStages.map((st, i) =>
          i <= currentIndex + 1
            ? { ...st, status: i === currentIndex + 1 ? 'current' : 'completed' }
            : st
        ),
        activityLog: [
          {
            date: 'Just now',
            actor: 'Current User (SBD)',
            text: `Advanced stage to ${nextStageObj ? nextStageObj.name : nextStageKey}.`
          },
          ...(prev.activityLog || [])
        ]
      }))
      toast?.({ title: 'Stage Advanced', body: `Moved to ${nextStageObj ? nextStageObj.name : nextStageKey}` })
    }
  }

  const handleGenerateCexHandoff = () => {
    setOpportunity((prev) => ({
      ...prev,
      stage: 'approved_scope',
      stageName: 'Approved Scope',
      commercialHandoff: {
        handoffId: `HD-${Math.floor(1000 + Math.random() * 9000)}`,
        approvedDate: 'Today',
        scopeReference: `SCOPE-${prev.id} v1.0`,
        contractValue: prev.formattedValue,
        assignedCexLead: 'Divya (CEX-001 Client Experience Lead)',
        status: 'Transmitted to CEX for Workspace Provisioning'
      }
    }))
    toast?.({
      title: 'CEX Handoff Generated',
      body: 'Structured scope and client dossier transmitted to Client Experience (CEX-001).'
    })
  }

  const handleSaveEdit = (e) => {
    e.preventDefault()
    setOpportunity((prev) => ({
      ...prev,
      name: editForm.name,
      industry: editForm.industry,
      location: editForm.location,
      nextAction: editForm.nextAction,
      organisationDetails: {
        ...prev.organisationDetails,
        name: editForm.name,
        industry: editForm.industry,
        location: editForm.location,
        website: editForm.website,
        contactPerson: editForm.contactPerson,
        email: editForm.email,
        phone: editForm.phone,
        companySize: editForm.companySize,
        description: editForm.description
      }
    }))
    setEditModalOpen(false)
    toast?.({ title: 'Opportunity Updated', body: 'Changes saved to opportunity profile.' })
  }

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs">
        <button
          onClick={() => navigate('/sales')}
          className="inline-flex items-center gap-1.5 font-semibold text-slate-700 hover:text-indigo-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:border-indigo-300 hover:bg-indigo-50/50 shadow-2xs transition"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-indigo-600" /> Sales Pipeline
        </button>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        <span className="font-semibold text-slate-800">{opportunity.name}</span>
        <span className="font-mono text-slate-400 text-[11px]">({opportunity.id})</span>
      </div>

      {/* Header Card (Matching Panel 4) */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sky-500 text-white text-xl font-black shadow-sm">
              {opportunity.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">{opportunity.name}</h1>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" /> {opportunity.stageName}
                </span>
                <span className="font-mono text-xs text-slate-500 font-semibold bg-slate-100 px-2 py-0.5 rounded">
                  {opportunity.id}
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                {opportunity.industry} · {opportunity.location}
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
                onClick={() => setActionsMenuOpen(!actionsMenuOpen)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
              >
                <span>Actions</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {actionsMenuOpen && (
                <div className="absolute right-0 mt-1 w-56 rounded-xl bg-white py-1 shadow-lg ring-1 ring-slate-900/10 z-20 text-xs">
                  <button
                    onClick={() => {
                      setActionsMenuOpen(false)
                      handleAdvanceStage()
                    }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <ArrowRight className="h-3.5 w-3.5 text-indigo-600" /> Advance Stage
                  </button>
                  <button
                    onClick={() => {
                      setActionsMenuOpen(false)
                      handleGenerateCexHandoff()
                    }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <UserCheck className="h-3.5 w-3.5 text-emerald-600" /> Generate CEX Handoff
                  </button>
                  <button
                    onClick={() => {
                      setActionsMenuOpen(false)
                      navigate('/tasks')
                    }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-amber-600" /> Request Human Sign-off
                  </button>
                  <button
                    onClick={() => {
                      setActionsMenuOpen(false)
                      navigator.clipboard?.writeText(opportunity.id)
                      toast?.({ title: 'Copied', body: 'Opportunity ID copied to clipboard' })
                    }}
                    className="w-full text-left px-3.5 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2 border-t border-slate-100"
                  >
                    <Copy className="h-3.5 w-3.5 text-slate-400" /> Copy Opportunity ID
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Five Metrics Strip (Matching Panel 4) */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3 border-t border-slate-100 pt-5 text-xs">
          <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
            <span className="text-slate-400 font-medium text-[11px] block">Qualification score</span>
            <span className="text-lg font-bold text-slate-900 mt-0.5 block">{opportunity.qualificationScore}/100</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
            <span className="text-slate-400 font-medium text-[11px] block">Est. opportunity value</span>
            <span className="text-lg font-bold text-slate-900 mt-0.5 block">
              {opportunity.formattedValue} <span className="text-[11px] font-normal text-slate-400">({opportunity.valueType})</span>
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
            <span className="text-slate-400 font-medium text-[11px] block">Expected close</span>
            <span className="text-lg font-bold text-slate-900 mt-0.5 block">{opportunity.expectedClose || 'Dec 2026'}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
            <span className="text-slate-400 font-medium text-[11px] block">Next action</span>
            <span className="text-xs font-bold text-indigo-600 mt-1 block truncate">{opportunity.nextAction}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50/70 border border-slate-100">
            <span className="text-slate-400 font-medium text-[11px] block">Owner</span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                {opportunity.ownerInitials || 'KS'}
              </span>
              <span className="font-bold text-slate-800 truncate">{opportunity.owner}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-6 overflow-x-auto pb-px text-sm">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'research', label: 'Research & contacts' },
            { id: 'requirements', label: 'Requirements' },
            { id: 'proposals', label: 'Proposals' },
            { id: 'communications', label: 'Communications' },
            { id: 'approvals', label: 'Approvals' },
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
      {/* TAB 1: OVERVIEW (Matching Panel 4 in reference image) */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2/3): Organisation details & Key documents */}
          <div className="lg:col-span-2 space-y-6">
            {/* Organisation details card */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
              <h3 className="font-bold text-slate-900 text-sm pb-3 border-b border-slate-100">
                Organisation details
              </h3>
              <div className="mt-3.5 space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Organisation name</span>
                  <span className="font-semibold text-slate-900">{opportunity.organisationDetails?.name || opportunity.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Industry</span>
                  <span className="font-semibold text-slate-800">{opportunity.organisationDetails?.industry || opportunity.industry}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Location</span>
                  <span className="font-semibold text-slate-800">{opportunity.organisationDetails?.location || opportunity.location}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Website</span>
                  <a
                    href={`https://${(opportunity.organisationDetails?.website || 'www.sunrisedental.in').replace(/^https?:\/\//, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-indigo-600 hover:underline flex items-center gap-1"
                  >
                    <Globe className="h-3 w-3" /> {opportunity.organisationDetails?.website || 'www.sunrisedental.in'}
                  </a>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Contact person</span>
                  <span className="font-semibold text-slate-900">{opportunity.organisationDetails?.contactPerson || 'Dr. Rohit Mehta'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Email</span>
                  <span className="text-slate-700">{opportunity.organisationDetails?.email || 'rohit@sunrisedental.in'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Phone</span>
                  <span className="text-slate-700">{opportunity.organisationDetails?.phone || '+91 98765 43210'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Company size</span>
                  <span className="text-slate-700">{opportunity.organisationDetails?.companySize || '20-50 employees'}</span>
                </div>
                <div className="pt-1">
                  <span className="text-slate-400 font-medium block mb-1">Description</span>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {opportunity.organisationDetails?.description ||
                      'Modern dental clinic chain focused on preventive care and cosmetic dentistry.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Key documents card */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
              <h3 className="font-bold text-slate-900 text-sm pb-3 border-b border-slate-100">
                Key documents
              </h3>
              <div className="mt-3.5 space-y-2">
                {(opportunity.keyDocuments && opportunity.keyDocuments.length > 0
                  ? opportunity.keyDocuments
                  : [
                      { name: 'Research summary v1.0', size: '1.2 MB · 18 Oct 2026' },
                      { name: 'Initial proposal v1.1', size: '2.4 MB · 19 Oct 2026' }
                    ]
                ).map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-200/70 bg-slate-50/60 hover:bg-slate-100/60 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="h-4 w-4 text-indigo-600" />
                      <div>
                        <p className="font-semibold text-slate-800 text-xs">{doc.name}</p>
                        <p className="text-[10px] text-slate-400">{doc.size || '1.8 MB · 18 Oct 2026'}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toast?.({ title: 'Download Document', body: `Downloading ${doc.name}...` })}
                      className="text-slate-400 hover:text-indigo-600 p-1 rounded transition"
                      title="Download document"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* CEX Handoff Record Card (Visible when in Approved Scope or handoff generated) */}
            {opportunity.commercialHandoff && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 shadow-2xs">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <UserCheck className="h-5 w-5" />
                    <h3 className="font-bold text-sm">Client Experience (CEX) Handoff Record</h3>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                    Transmitted
                  </span>
                </div>
                <div className="mt-3 space-y-1.5 text-xs text-slate-700">
                  <p><strong>Handoff ID:</strong> {opportunity.commercialHandoff.handoffId}</p>
                  <p><strong>Scope Reference:</strong> {opportunity.commercialHandoff.scopeReference}</p>
                  <p><strong>Approved Value:</strong> {opportunity.commercialHandoff.contractValue}</p>
                  <p><strong>Assigned CEX Lead:</strong> {opportunity.commercialHandoff.assignedCexLead}</p>
                  <p className="pt-2 text-[11px] text-slate-500">
                    *Client onboarding workspace provisioned with strict tenant isolation. Normal onboarding initiated.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (1/3): Opportunity progress stepper */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm pb-3 border-b border-slate-100">
                Opportunity progress
              </h3>

              {/* Stepper matching reference Panel 4 */}
              <div className="mt-4 space-y-4">
                {[
                  { name: 'Discovered', date: '12 Oct 2026', status: 'completed' },
                  { name: 'Researching', date: '15 Oct 2026', status: 'completed' },
                  { name: 'Qualified', date: '19 Oct 2026', status: opportunity.stage === 'qualified' ? 'current' : 'completed' },
                  { name: 'Discovery', date: 'Pending', status: opportunity.stage === 'discovery' ? 'current' : 'upcoming' },
                  { name: 'Proposal draft', date: 'Pending', status: opportunity.stage === 'proposal_draft' ? 'current' : 'upcoming' },
                  { name: 'Awaiting internal approval', date: 'Pending', status: opportunity.stage === 'awaiting_approval' ? 'current' : 'upcoming' },
                  { name: 'Awaiting client response', date: 'Pending', status: opportunity.stage === 'awaiting_response' ? 'current' : 'upcoming' },
                  { name: 'Negotiation', date: 'Pending', status: opportunity.stage === 'negotiation' ? 'current' : 'upcoming' },
                  { name: 'Approved scope', date: 'Pending', status: opportunity.stage === 'approved_scope' ? 'completed' : 'upcoming' }
                ].map((st, i) => (
                  <div key={i} className="flex items-start gap-3 relative">
                    <div className="flex flex-col items-center">
                      {st.status === 'completed' ? (
                        <div className="h-4 w-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                          <Check className="h-2.5 w-2.5" />
                        </div>
                      ) : st.status === 'current' ? (
                        <div className="h-4 w-4 rounded-full bg-indigo-600 ring-4 ring-indigo-100 flex items-center justify-center shrink-0">
                          <span className="h-1.5 w-1.5 rounded-full bg-white" />
                        </div>
                      ) : (
                        <div className="h-4 w-4 rounded-full border border-slate-300 bg-white flex items-center justify-center shrink-0" />
                      )}
                      {i < 8 && <div className="w-0.5 h-6 bg-slate-200 mt-1" />}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-xs ${st.status === 'current' ? 'font-bold text-indigo-700' : st.status === 'completed' ? 'font-semibold text-slate-800' : 'text-slate-400'}`}>
                        {st.name}
                      </p>
                      {st.date !== 'Pending' && (
                        <p className="text-[10px] text-slate-400 font-mono">{st.date}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100">
              <button
                onClick={handleAdvanceStage}
                className="w-full btn-primary text-xs flex items-center justify-center gap-1.5"
              >
                <span>Advance to Next Stage</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RESEARCH & CONTACTS */}
      {activeTab === 'research' && (
        <Card title="Prospect Research Evidence & Sources" subtitle="AI-collected evidence and verified medical registry findings">
          <div className="space-y-4 text-xs">
            {(opportunity.discoveryEvidence || []).map((ev, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{ev.source}</span>
                  <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                    Verified Source
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">{ev.finding}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* TAB 3: REQUIREMENTS */}
      {activeTab === 'requirements' && (
        <Card title="Discovery & Clinical Requirements" subtitle="Speciality priorities, target audience, and scope parameters">
          <div className="space-y-3 text-xs text-slate-700">
            <p><strong>Primary Focus:</strong> Cosmetic orthodontics, clear aligners, and preventive pediatric dental hygiene.</p>
            <p><strong>Target Locations:</strong> Kothrud, Baner, and Viman Nagar clinics in Pune.</p>
            <p><strong>Target Monthly Patient Inquiries:</strong> 120 qualified consultations.</p>
          </div>
        </Card>
      )}

      {/* TAB 4: PROPOSALS */}
      {activeTab === 'proposals' && (
        <Card title="Proposal Versions & Commercial Drafts" subtitle="Structured pricing tiers and scope boundaries">
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Commercial Proposal v1.1</p>
                <p className="text-slate-500 text-[11px]">Prepared by SBD-006 Nitin · 19 Oct 2026</p>
              </div>
              <button className="btn-secondary text-xs">View Document</button>
            </div>
          </div>
        </Card>
      )}

      {/* TAB 5: COMMUNICATIONS */}
      {activeTab === 'communications' && (
        <Card title="Stakeholder Outreach & Communications" subtitle="Logged interactions with prospect leadership">
          <p className="text-xs text-slate-500">Initial outreach scheduled following SBD Head authorization.</p>
        </Card>
      )}

      {/* TAB 6: APPROVALS */}
      {activeTab === 'approvals' && (
        <Card title="Commercial & Outreach Decision Gates" subtitle="Human sign-offs required under role authority rules">
          <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-slate-900">Outreach Authorization Gate</p>
              <p className="text-slate-600 text-[11px]">Human approval required before contacting Dr. Rohit Mehta.</p>
            </div>
            <button onClick={() => navigate('/tasks')} className="btn-primary text-xs">Review in Tasks</button>
          </div>
        </Card>
      )}

      {/* TAB 7: ACTIVITY HISTORY */}
      {activeTab === 'history' && (
        <Card title="Chronological Audit Log" subtitle="Persistent record of agent actions and state transitions">
          <div className="divide-y divide-slate-100 text-xs">
            {(opportunity.activityLog || []).map((log, i) => (
              <div key={i} className="py-2.5 flex justify-between gap-4">
                <div>
                  <p className="font-bold text-slate-800">{log.actor}</p>
                  <p className="text-slate-600 mt-0.5">{log.text}</p>
                </div>
                <span className="text-[11px] text-slate-400 font-mono shrink-0">{log.date}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Edit Opportunity</h3>
              <button onClick={() => setEditModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                ×
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Organisation Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="input text-xs"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Industry</label>
                  <input
                    type="text"
                    value={editForm.industry}
                    onChange={(e) => setEditForm({ ...editForm, industry: e.target.value })}
                    className="input text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Location</label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    className="input text-xs"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={editForm.contactPerson}
                    onChange={(e) => setEditForm({ ...editForm, contactPerson: e.target.value })}
                    className="input text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="input text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Next Action</label>
                <input
                  type="text"
                  value={editForm.nextAction}
                  onChange={(e) => setEditForm({ ...editForm, nextAction: e.target.value })}
                  className="input text-xs"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
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
