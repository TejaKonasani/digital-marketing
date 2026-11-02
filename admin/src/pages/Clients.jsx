import { useState, useMemo, useEffect, useRef } from 'react'
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom'
import {
  Handshake, Search, ArrowLeft, FolderOpen, FileText, Wallet, AlertTriangle,
  CheckCircle2, UserPlus, Building2, Users, Mail, Phone, Globe, ExternalLink,
  Clock, ShieldCheck, CheckSquare, Plus, X, ChevronRight, ChevronDown,
  Layers, Lock, Eye, Download, Send, RotateCcw, MessageSquare, AlertCircle,
  FileCheck, Sparkles, Filter, SlidersHorizontal, ArrowUpRight, Copy, Check, ArrowRight, Circle,
  Play, Calendar, Target, Activity, MoreHorizontal, Edit3, LayoutGrid, Table as TableIcon,
  CheckCircle, FolderKanban
} from 'lucide-react'
import {
  Card, PageHeader, Badge, StatusBadge, DetailRow, ProgressBar, EmptyState,
  Avatar, Tabs, SimulationBanner, Drawer
} from '../components/ui'
import {
  clients as seedClients,
  opportunitiesList,
  getClientsSummaryMetrics,
  getClientById,
  briefs
} from '../data/clients'
import { workflowProjects } from '../data/workflowProjectsData'
import { useApp } from '../state/AppContext'

// ----------------------------------------------------
// HELPER BADGE STYLES
// ----------------------------------------------------
function AccountStatusBadge({ status }) {
  const s = String(status || '').toLowerCase()
  if (s === 'active') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" /> Active
      </span>
    )
  }
  if (s === 'at_risk') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 ring-1 ring-inset ring-rose-600/20">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-600" /> At Risk
      </span>
    )
  }
  if (s === 'onboarding') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/20">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" /> Onboarding
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 ring-1 ring-inset ring-slate-400/20">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-500" /> {status}
    </span>
  )
}

function OnboardingBadge({ status }) {
  const s = String(status || '').toLowerCase()
  if (s === 'completed') {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-200">
        Completed
      </span>
    )
  }
  if (s === 'in_progress' || s === 'onboarding') {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 border border-blue-200">
        In Progress
      </span>
    )
  }
  if (s === 'on_hold') {
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 border border-amber-200">
        On Hold
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
      {status}
    </span>
  )
}

function HealthScorePill({ score }) {
  const val = Number(score) || 75
  const isHigh = val >= 85
  const isMid = val >= 70 && val < 85
  const isLow = val < 70

  const colorClass = isHigh
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : isMid
    ? 'bg-amber-50 text-amber-700 border-amber-200'
    : 'bg-rose-50 text-rose-700 border-rose-200'

  return (
    <span className={`inline-flex items-center justify-center font-bold px-2.5 py-1 text-xs rounded-lg border ${colorClass}`}>
      {val}
    </span>
  )
}

// ----------------------------------------------------
// NEW WORKSPACE MODAL (Step-by-Step Flow matching Panel 2)
// ----------------------------------------------------
export function NewWorkspaceModal({ open, onClose, onCreated }) {
  const [step, setStep] = useState(1) // 1: Select record, 2: Client profile, 3: Approved scope, 4: Access & ownership, 5: Review & create
  const [selectedOppId, setSelectedOppId] = useState(opportunitiesList[0].id)
  const [activeOppTab, setActiveOppTab] = useState('approved') // approved | eligible | existing

  // Form State
  const [orgName, setOrgName] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [industry, setIndustry] = useState('Healthcare')
  const [location, setLocation] = useState('Hyderabad, IN')
  const [accountOwner, setAccountOwner] = useState('R. Iyer')
  const [confirmedAuth, setConfirmedAuth] = useState(false)
  const [sendInvite, setSendInvite] = useState(true)

  const selectedOpp = useMemo(
    () => opportunitiesList.find((o) => o.id === selectedOppId) || opportunitiesList[0],
    [selectedOppId]
  )

  // Initialize fields when opportunity changes
  useEffect(() => {
    if (selectedOpp) {
      setOrgName(selectedOpp.name)
      setContactName(selectedOpp.primaryContact?.name || '')
      setContactEmail(selectedOpp.primaryContact?.email || '')
      setContactPhone(selectedOpp.primaryContact?.phone || '')
      setIndustry(selectedOpp.industry || 'Healthcare')
      setLocation(selectedOpp.location || 'India')
      setAccountOwner(selectedOpp.owner || 'R. Iyer')
    }
  }, [selectedOpp])

  if (!open) return null

  const handleNext = () => {
    if (step === 1 && !selectedOpp.eligible) return
    setStep((s) => Math.min(s + 1, 5))
  }

  const handleBack = () => {
    setStep((s) => Math.max(s - 1, 1))
  }

  const handleCreate = () => {
    if (!confirmedAuth) return
    const newId = `CLIENT-${String(Math.floor(Math.random() * 900) + 100)}`
    const newClient = {
      id: newId,
      name: orgName,
      initials: orgName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
      avatarBg: 'bg-indigo-600 text-white',
      industry,
      clientType: `${industry} Organization`,
      location,
      status: 'active',
      statusLabel: 'Active',
      workspaceStatus: 'Active',
      workspaceId: `WS-${newId}`,
      onboardingStatus: 'in_progress',
      onboardingStatusLabel: 'In Progress',
      owner: accountOwner,
      activeProjects: 1,
      completedProjects: 0,
      pendingApprovals: 0,
      awaitingInfo: 1,
      health: 85,
      healthEvaluation: 'Good',
      healthExplanation: 'New workspace provisioned; awaiting client asset ingestion.',
      lastActivity: 'Just now',
      nextAction: 'Complete onboarding checklist',
      since: '29 Oct 2026',
      lastUpdated: '29 Oct 2026, 15:00',
      website: `www.${orgName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      mrr: selectedOpp?.mrr || 150000,
      primaryContact: {
        name: contactName,
        role: 'Client Administrator',
        email: contactEmail,
        phone: contactPhone
      },
      description: `${orgName} workspace provisioned from approved commercial opportunity ${selectedOpp?.id || 'OPP-081'}.`,
      primaryObjectives: [
        'Establish digital presence and patient engagement',
        'Deploy verified multi-channel campaigns',
        'Execute clinical content in compliance with PRD rubrics'
      ],
      approvedServices: selectedOpp?.services || ['Content generation', 'Social media management'],
      documents: [
        { name: `Approved Scope ${selectedOpp?.scopeRef || 'v1.0'}`, size: '2.1 MB', date: '29 Oct 2026', version: 'v1.0' }
      ],
      onboardingStepsCompleted: 2,
      onboardingTotalSteps: 10,
      onboardingChecklist: [
        { id: 1, title: 'Basic organisation details', completed: true, date: '29 Oct 2026', owner: 'CEX-002' },
        { id: 2, title: 'Primary contact information', completed: true, date: '29 Oct 2026', owner: 'CEX-002' },
        { id: 3, title: 'Service requirements', completed: false, date: 'Pending', owner: 'CEX-002' },
        { id: 4, title: 'Brand guidelines', completed: false, date: 'Pending', owner: 'CRT-002' },
        { id: 5, title: 'Content themes & tone', completed: false, date: 'Pending', owner: 'CRT-001' },
        { id: 6, title: 'Asset sharing', completed: false, date: 'Pending', owner: 'CEX-007' },
        { id: 7, title: 'Review and confirmation', completed: false, date: 'Pending', owner: 'CEX-001' },
        { id: 8, title: 'Workspace access setup', completed: true, date: '29 Oct 2026', owner: 'TEC-004' },
        { id: 9, title: 'Final approval', completed: false, date: 'Pending', owner: 'CEX-001' },
        { id: 10, title: 'Kickoff meeting', completed: false, date: 'Pending', owner: 'CEX-001' }
      ],
      projects: [
        {
          id: `PRJ-${newId}-01`,
          name: `${orgName} Launch Campaign`,
          workflowId: 'WF-NEW-01',
          stage: 'Onboarding',
          stageBadge: 'blue',
          progress: 15,
          completedTasks: 2,
          totalTasks: 16,
          deadline: '15 Nov 2026',
          approvalStatus: 'Pending',
          status: 'On track',
          department: 'CRT'
        }
      ],
      communications: [
        {
          id: 'COMM-NEW-01',
          date: '29 Oct 2026 15:00',
          from: 'System Orchestrator',
          to: contactName,
          type: 'team_to_client',
          subject: `Welcome to Samrudhi Agentic AI — ${orgName} Workspace Created`,
          content: `Welcome ${contactName}! Your dedicated tenant workspace WS-${newId} has been provisioned. Please review the onboarding checklist to upload your brand kit.`,
          project: 'Onboarding',
          channel: 'Email',
          status: 'Delivered (Simulated)',
          statusColor: 'emerald',
          nextAction: 'Asset upload',
          owner: accountOwner
        }
      ],
      approvals: [],
      deliverables: [],
      reports: [],
      workspaceUsers: [
        { name: contactName, role: 'Owner / Admin', email: contactEmail, status: 'Active', permissions: 'Full workspace administration & approval authority' },
        { name: accountOwner, role: 'Account Lead', email: `${accountOwner.toLowerCase().replace(/[^a-z]/g, '')}@samrudhi.ai`, status: 'Active', permissions: 'Samrudhi Internal CEX Lead' }
      ],
      accountHistory: [
        { date: '29 Oct 2026', event: 'Workspace provisioned', detail: `Tenant workspace WS-${newId} created from opportunity ${selectedOpp?.id}.`, actor: `${accountOwner} (CEX)` },
        { date: '29 Oct 2026', event: 'Commercial scope confirmed', detail: `Scope ${selectedOpp?.scopeRef || 'v1.0'} initialized.`, actor: 'SBD-007' }
      ]
    }

    onCreated(newClient)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                {step}
              </span>
              <h2 className="text-base font-bold text-slate-900">
                New Workspace — Create Client Workspace
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Guided flow to create a dedicated tenant workspace for an eligible, approved client or commercial opportunity.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 5-Step Stepper Header */}
        <div className="border-b border-slate-200 bg-white px-6 py-3 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[600px] text-xs">
            {[
              { num: 1, title: 'Select record', subtitle: 'Choose eligible opportunity' },
              { num: 2, title: 'Client profile', subtitle: 'Confirm details' },
              { num: 3, title: 'Approved scope', subtitle: 'Review scope' },
              { num: 4, title: 'Access & ownership', subtitle: 'Setup workspace' },
              { num: 5, title: 'Review & create', subtitle: 'Finalize' }
            ].map((st) => (
              <div key={st.num} className="flex items-center gap-2.5">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                    step === st.num
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-200'
                      : step > st.num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {step > st.num ? <Check className="h-3.5 w-3.5" /> : st.num}
                </span>
                <div className="text-left">
                  <p className={`font-semibold ${step === st.num ? 'text-indigo-600' : 'text-slate-700'}`}>
                    {st.title}
                  </p>
                  <p className="text-[10px] text-slate-400">{st.subtitle}</p>
                </div>
                {st.num < 5 && <ChevronRight className="h-3.5 w-3.5 text-slate-300 ml-2" />}
              </div>
            ))}
          </div>
        </div>

        {/* Modal Body per Step */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* STEP 1: SELECT RECORD */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Step 1: Select an eligible opportunity or client</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Choose a converted prospect or approved commercial opportunity to create a workspace.
                </p>
              </div>

              {/* Sub-Tabs */}
              <div className="flex border-b border-slate-200 text-xs font-semibold text-slate-600">
                <button
                  onClick={() => setActiveOppTab('approved')}
                  className={`pb-2 px-3 border-b-2 transition ${
                    activeOppTab === 'approved' ? 'border-indigo-600 text-indigo-600 font-bold' : 'border-transparent text-slate-500'
                  }`}
                >
                  Approved opportunities (3)
                </button>
                <button
                  onClick={() => setActiveOppTab('eligible')}
                  className={`pb-2 px-3 border-b-2 transition ${
                    activeOppTab === 'eligible' ? 'border-indigo-600 text-indigo-600 font-bold' : 'border-transparent text-slate-500'
                  }`}
                >
                  Eligible prospects (2)
                </button>
                <button
                  onClick={() => setActiveOppTab('existing')}
                  className={`pb-2 px-3 border-b-2 transition ${
                    activeOppTab === 'existing' ? 'border-indigo-600 text-indigo-600 font-bold' : 'border-transparent text-slate-500'
                  }`}
                >
                  Existing clients (24)
                </button>
              </div>

              {/* Opportunity Selection Cards */}
              <div className="space-y-2.5">
                {opportunitiesList.map((opp) => {
                  const isSelected = selectedOppId === opp.id
                  return (
                    <div
                      key={opp.id}
                      onClick={() => setSelectedOppId(opp.id)}
                      className={`cursor-pointer rounded-xl border p-4 transition ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/40 shadow-sm ring-1 ring-indigo-600'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="selectedOpportunity"
                            checked={isSelected}
                            onChange={() => setSelectedOppId(opp.id)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                          />
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 font-bold text-xs text-slate-700">
                            {opp.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{opp.name}</p>
                            <p className="text-xs text-slate-500">
                              {opp.id} · Created {opp.createdDate} · {opp.department}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              opp.status === 'Approved'
                                ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                                : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                            }`}
                          >
                            {opp.status}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              opp.eligible
                                ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {opp.eligible ? 'Ready for workspace' : 'Not eligible yet'}
                          </span>
                        </div>
                      </div>

                      {/* Ineligibility Warning Explanation */}
                      {!opp.eligible && isSelected && (
                        <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                          <p className="font-bold flex items-center gap-1.5">
                            <AlertTriangle className="h-4 w-4" /> Commercial Gate Requirement:
                          </p>
                          <p className="mt-0.5">{opp.ineligibilityReason}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {selectedOpp.eligible && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5 text-xs text-emerald-900">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>
                    This opportunity has an approved scope and completed commercial review. You can now create a client workspace.
                  </span>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: CLIENT PROFILE */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Step 2: Client Profile</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Confirm organization profile and primary authorized decision-maker contact details.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Organization Name *</label>
                  <input
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="input text-xs"
                    placeholder="e.g. City Care Multispeciality Hospital"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Industry Sector *</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="input text-xs"
                  >
                    <option value="Healthcare">Healthcare</option>
                    <option value="Dental">Dental</option>
                    <option value="Diagnostics">Diagnostics</option>
                    <option value="Retail Pharma">Retail Pharma</option>
                    <option value="Wellness">Wellness</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Primary Contact Name *</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="input text-xs"
                    placeholder="e.g. Dr. Anitha Reddy"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Verified Email Address *</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="input text-xs"
                    placeholder="e.g. anitha@citycarehospitals.in"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="input text-xs"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Location / Headquarters</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="input text-xs"
                    placeholder="e.g. Hyderabad, IN"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Assigned Account Owner (CEX)</label>
                  <select
                    value={accountOwner}
                    onChange={(e) => setAccountOwner(e.target.value)}
                    className="input text-xs"
                  >
                    <option value="R. Iyer">R. Iyer (CEX Lead)</option>
                    <option value="S. Mehta">S. Mehta (Account Manager)</option>
                    <option value="K. Sharma">K. Sharma (Client Coordinator)</option>
                    <option value="P. Nair">P. Nair (CEX Specialist)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: APPROVED SCOPE */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Step 3: Approved Services & Scope</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Review the scope reference approved during the Sales & Business Development cycle.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Commercial Scope Reference</span>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
                    {selectedOpp.scopeRef}
                  </span>
                </div>
                <p className="text-xs text-slate-700">Commercial Signoff: <strong className="text-slate-900">{selectedOpp.commercialSignoff}</strong></p>

                <div className="pt-2 border-t border-slate-200">
                  <p className="text-xs font-bold text-slate-700 mb-1.5">Approved Service Modules:</p>
                  <div className="flex flex-wrap gap-2">
                    {(selectedOpp.services || []).map((srv, idx) => (
                      <span key={idx} className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 border border-indigo-200">
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <p className="text-xs font-bold text-slate-700 mb-1">Deliverables Schedule:</p>
                  <ul className="space-y-1">
                    {(selectedOpp.deliverables || []).map((del, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check className="h-3.5 w-3.5 text-emerald-500" /> {del}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <p className="text-xs font-bold text-slate-700 mb-1">Constraints & Exclusions:</p>
                  <p className="text-xs text-slate-600 italic">
                    {selectedOpp.exclusions?.[0] || 'Standard ASCI healthcare advertising guidelines apply.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: ACCESS & OWNERSHIP */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Step 4: Workspace Access & Role Allocation</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Configure client users and enforce tenant isolation according to PRD RBAC standards.
                </p>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Client Owner / Admin</p>
                      <p className="text-[11px] text-slate-500">Full workspace administration, billing review, and approval authority.</p>
                    </div>
                    <span className="rounded bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-700">Admin</span>
                  </div>
                  <input
                    type="text"
                    disabled
                    value={`${contactName} (${contactEmail})`}
                    className="input text-xs bg-white"
                  />
                </div>

                <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Client Reviewer</p>
                      <p className="text-[11px] text-slate-500">Authorized to review creative copy, visual mockups, and leave feedback.</p>
                    </div>
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">Reviewer</span>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Marketing Team (marketing@hospital.in)"
                    className="input text-xs bg-white"
                    defaultValue="marketing@hospital.in"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="sendInvite"
                    checked={sendInvite}
                    onChange={(e) => setSendInvite(e.target.checked)}
                    className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="sendInvite" className="text-xs font-medium text-slate-700">
                    Send simulated activation email and invitation tokens upon creation
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW & CREATE */}
          {step === 5 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Step 5: Review & Finalize Workspace Creation</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Confirm all details before provisioning isolated tenant workspace.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400">Client Organization:</span>
                    <p className="font-bold text-slate-900 text-sm mt-0.5">{orgName}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Sector / Industry:</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{industry} ({location})</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Primary Contact:</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{contactName} ({contactEmail})</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Assigned Account Lead:</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{accountOwner}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-400">Commercial Scope:</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedOpp.scopeRef} — {selectedOpp.commercialSignoff}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-indigo-200 bg-indigo-50/50 p-4">
                <input
                  type="checkbox"
                  id="confirmedAuth"
                  checked={confirmedAuth}
                  onChange={(e) => setConfirmedAuth(e.target.checked)}
                  className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 mt-0.5"
                />
                <label htmlFor="confirmedAuth" className="text-xs font-medium text-indigo-950 leading-relaxed">
                  I confirm that commercial terms have been agreed, scope is authorized, and creating this client workspace complies with Samrudhi operating model governance rules.
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button
            onClick={step === 1 ? onClose : handleBack}
            className="btn-secondary text-xs"
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </button>

          <div className="flex items-center gap-2">
            {step < 5 ? (
              <button
                disabled={step === 1 && !selectedOpp.eligible}
                onClick={handleNext}
                className="btn-primary text-xs flex items-center gap-1.5 disabled:opacity-50"
              >
                Next: {step === 1 ? 'Client profile' : step === 2 ? 'Approved scope' : step === 3 ? 'Access & ownership' : 'Review & create'} <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                disabled={!confirmedAuth}
                onClick={handleCreate}
                className="btn-primary text-xs flex items-center gap-1.5 disabled:opacity-50"
              >
                <CheckCircle2 className="h-4 w-4" /> Finalize & Create Workspace
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------
// FULL-PAGE CLIENT DETAILS SCREEN (Panel 3 & 4-11)
// 9 Tabs: Overview, Projects, Onboarding, Communications,
// Approvals, Deliverables, Reports, Workspace, History
// ----------------------------------------------------
export { ClientDetailScreen } from './ClientDetailScreen'

// ----------------------------------------------------
// CLIENTS LANDING PAGE (Panel 1 in Reference Image)
// 6 Summary Cards + Search & Filter Toolbar + 24-Client Table
// ----------------------------------------------------
export function ClientsLandingPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const urlStatus = searchParams.get('status') || 'all'
  const urlIndustry = searchParams.get('industry') || 'all'
  const urlOwner = searchParams.get('owner') || 'all'
  const urlQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(urlQuery)
  const [statusFilter, setStatusFilter] = useState(urlStatus)
  const [industryFilter, setIndustryFilter] = useState(urlIndustry)
  const [ownerFilter, setOwnerFilter] = useState(urlOwner)
  const [healthFilter, setHealthFilter] = useState('all')

  // Secondary actions popover dropdown state
  const [openMenuId, setOpenMenuId] = useState(null)

  useEffect(() => {
    const handleGlobalClick = () => setOpenMenuId(null)
    window.addEventListener('click', handleGlobalClick)
    return () => window.removeEventListener('click', handleGlobalClick)
  }, [])

  // Pagination (8 items per page matching Reference Screenshot)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Active client dataset state (allows new workspace creation)
  const [clientsList, setClientsList] = useState(seedClients)
  const [workspaceModalOpen, setWorkspaceModalOpen] = useState(false)

  const summary = useMemo(() => getClientsSummaryMetrics(clientsList), [clientsList])

  const distinctIndustries = useMemo(() => {
    return Array.from(new Set(clientsList.map((c) => c.industry)))
  }, [clientsList])

  const distinctOwners = useMemo(() => {
    return Array.from(new Set(clientsList.map((c) => c.owner)))
  }, [clientsList])

  const clearFilters = () => {
    setQuery('')
    setStatusFilter('all')
    setIndustryFilter('all')
    setOwnerFilter('all')
    setHealthFilter('all')
    setCurrentPage(1)
    setSearchParams({})
  }

  const filteredClients = useMemo(() => {
    return clientsList.filter((c) => {
      if (statusFilter !== 'all') {
        if (statusFilter === 'active' && c.status !== 'active') return false
        if (statusFilter === 'onboarding' && c.status !== 'onboarding' && c.onboardingStatus !== 'in_progress') return false
        if (statusFilter === 'at_risk' && c.status !== 'at_risk') return false
        if (statusFilter === 'inactive' && c.status !== 'inactive' && c.status !== 'paused') return false
        if (statusFilter === 'pending_approvals' && (c.pendingApprovals || 0) === 0) return false
        if (statusFilter === 'awaiting_info' && (c.awaitingInfo || 0) === 0) return false
      }

      if (industryFilter !== 'all' && c.industry !== industryFilter) return false
      if (ownerFilter !== 'all' && c.owner !== ownerFilter) return false

      if (healthFilter !== 'all') {
        if (healthFilter === 'high' && c.health < 85) return false
        if (healthFilter === 'mid' && (c.health < 70 || c.health >= 85)) return false
        if (healthFilter === 'low' && c.health >= 70) return false
      }

      if (query) {
        const q = query.toLowerCase()
        if (
          !c.name.toLowerCase().includes(q) &&
          !c.id.toLowerCase().includes(q) &&
          !c.industry.toLowerCase().includes(q) &&
          !c.owner.toLowerCase().includes(q)
        ) {
          return false
        }
      }

      return true
    })
  }, [clientsList, statusFilter, industryFilter, ownerFilter, healthFilter, query])

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage) || 1
  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredClients.slice(start, start + itemsPerPage)
  }, [filteredClients, currentPage])

  const handleWorkspaceCreated = (newClient) => {
    setClientsList([newClient, ...clientsList])
    navigate(`/clients/${newClient.id}`)
  }

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Page Header (Matching Reference Screenshot) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Clients & Accounts</h1>
          <p className="mt-1 text-xs text-slate-500">
            Manage all confirmed client accounts, their workspaces, projects, approvals and ongoing relationship.
          </p>
        </div>
        <button
          onClick={() => setWorkspaceModalOpen(true)}
          className="btn-primary text-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <UserPlus className="h-4 w-4" /> New Workspace
        </button>
      </div>

      {/* 6 Compact Summary Cards (Matching Reference Screenshot & PRD Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Card 1: Total Clients */}
        <button
          onClick={() => { setStatusFilter('all'); setCurrentPage(1); }}
          className={`card card-hover p-4 text-left transition rounded-xl bg-white border ${
            statusFilter === 'all'
              ? 'ring-2 ring-indigo-500 border-indigo-300 shadow-sm bg-indigo-50/20'
              : 'border-slate-200/80 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-200/60">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 leading-none">{summary.total.count}</span>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">TOTAL CLIENTS</p>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 font-medium mt-2.5">{summary.total.label}</p>
        </button>

        {/* Card 2: Active Clients */}
        <button
          onClick={() => { setStatusFilter('active'); setCurrentPage(1); }}
          className={`card card-hover p-4 text-left transition rounded-xl bg-white border ${
            statusFilter === 'active'
              ? 'ring-2 ring-emerald-500 border-emerald-300 shadow-sm bg-emerald-50/20'
              : 'border-slate-200/80 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 leading-none">{summary.active.count}</span>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">ACTIVE CLIENTS</p>
            </div>
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-2.5">{summary.active.label}</p>
        </button>

        {/* Card 3: Onboarding */}
        <button
          onClick={() => { setStatusFilter('onboarding'); setCurrentPage(1); }}
          className={`card card-hover p-4 text-left transition rounded-xl bg-white border ${
            statusFilter === 'onboarding'
              ? 'ring-2 ring-blue-500 border-blue-300 shadow-sm bg-blue-50/20'
              : 'border-slate-200/80 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60">
              <UserPlus className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 leading-none">{summary.onboarding.count}</span>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">ONBOARDING</p>
            </div>
          </div>
          <p className="text-[11px] text-blue-600 font-semibold mt-2.5">{summary.onboarding.label}</p>
        </button>

        {/* Card 4: At Risk */}
        <button
          onClick={() => { setStatusFilter('at_risk'); setCurrentPage(1); }}
          className={`card card-hover p-4 text-left transition rounded-xl bg-white border ${
            statusFilter === 'at_risk'
              ? 'ring-2 ring-rose-500 border-rose-300 shadow-sm bg-rose-50/20'
              : 'border-slate-200/80 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600 border border-rose-200/60">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 leading-none">{summary.atRisk.count}</span>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">AT RISK</p>
            </div>
          </div>
          <p className="text-[11px] text-rose-600 font-semibold mt-2.5">{summary.atRisk.label}</p>
        </button>

        {/* Card 5: Approvals */}
        <button
          onClick={() => { setStatusFilter('pending_approvals'); setCurrentPage(1); }}
          className={`card card-hover p-4 text-left transition rounded-xl bg-white border ${
            statusFilter === 'pending_approvals'
              ? 'ring-2 ring-amber-500 border-amber-300 shadow-sm bg-amber-50/20'
              : 'border-slate-200/80 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 leading-none">{summary.pendingApprovals.count}</span>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">APPROVALS</p>
            </div>
          </div>
          <p className="text-[11px] text-amber-600 font-semibold mt-2.5">{summary.pendingApprovals.label}</p>
        </button>

        {/* Card 6: Awaiting Information */}
        <button
          onClick={() => { setStatusFilter('awaiting_info'); setCurrentPage(1); }}
          className={`card card-hover p-4 text-left transition rounded-xl bg-white border ${
            statusFilter === 'awaiting_info'
              ? 'ring-2 ring-indigo-500 border-indigo-300 shadow-sm bg-indigo-50/20'
              : 'border-slate-200/80 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 border border-slate-200/60">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 leading-none">{summary.awaitingInfo.count}</span>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">AWAITING INFO</p>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-2.5">{summary.awaitingInfo.label}</p>
        </button>
      </div>

      {/* Search & Filter Toolbar (Matching Reference Screenshot) */}
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <div className="relative sm:col-span-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by client name, client ID, industry, or account owner..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }}
              className="input pl-9 text-xs"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="input text-xs"
            >
              <option value="all">All status</option>
              <option value="active">Active</option>
              <option value="onboarding">Onboarding</option>
              <option value="at_risk">At Risk</option>
              <option value="inactive">Inactive</option>
              <option value="pending_approvals">Pending Approvals</option>
              <option value="awaiting_info">Awaiting Client Info</option>
            </select>
          </div>

          <div>
            <select
              value={industryFilter}
              onChange={(e) => { setIndustryFilter(e.target.value); setCurrentPage(1); }}
              className="input text-xs truncate"
            >
              <option value="all">All industries</option>
              {distinctIndustries.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={healthFilter}
              onChange={(e) => { setHealthFilter(e.target.value); setCurrentPage(1); }}
              className="input text-xs"
            >
              <option value="all">All health</option>
              <option value="high">Health: &gt; 85</option>
              <option value="mid">Health: 70 - 84</option>
              <option value="low">Health: &lt; 70</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={ownerFilter}
              onChange={(e) => { setOwnerFilter(e.target.value); setCurrentPage(1); }}
              className="input text-xs flex-1 truncate"
            >
              <option value="all">All owners</option>
              {distinctOwners.map((own) => (
                <option key={own} value={own}>{own}</option>
              ))}
            </select>

            {(statusFilter !== 'all' || industryFilter !== 'all' || ownerFilter !== 'all' || healthFilter !== 'all' || query) && (
              <button
                onClick={clearFilters}
                className="btn-secondary text-xs px-2.5 py-1.5 shrink-0"
                title="Clear filters"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* Client Cards Grid (3 columns on desktop, 2 on tablet, 1 on mobile matching Reference Screenshot) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {paginatedClients.map((client) => {
          return (
            <div
              key={client.id}
              className="card card-hover p-5 border border-slate-200/90 bg-white rounded-2xl flex flex-col justify-between transition-all hover:shadow-md group relative"
            >
              <div>
                {/* Card Top: Avatar + Client Info + Stacked Badges */}
                <div className="flex items-start gap-3.5">
                  {/* Initials Avatar */}
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${client.avatarBg || 'bg-rose-500 text-white'} text-sm font-bold shadow-2xs`}>
                    {client.initials}
                  </div>

                  {/* Title, Badges & Subtitle */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1.5">
                      <h3
                        onClick={() => navigate(`/clients/${client.id}`)}
                        className="text-sm font-bold text-slate-900 truncate hover:text-indigo-600 cursor-pointer transition leading-snug"
                        title={client.name}
                      >
                        {client.name}
                      </h3>

                      {/* Top-Right Badges Stack */}
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        {/* Account Status Badge */}
                        {client.status === 'active' && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200/60">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active
                          </span>
                        )}
                        {client.status === 'at_risk' && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700 border border-rose-200/60">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> At Risk
                          </span>
                        )}
                        {client.status === 'onboarding' && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 border border-blue-200/60">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" /> Onboarding
                          </span>
                        )}
                        {client.status !== 'active' && client.status !== 'at_risk' && client.status !== 'onboarding' && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 border border-slate-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" /> {client.statusLabel || client.status}
                          </span>
                        )}

                        {/* Onboarding Stage Badge */}
                        {client.onboardingStatus === 'completed' && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50/80 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200/50">
                            <Check className="h-2.5 w-2.5 text-emerald-600 stroke-[3]" /> Completed
                          </span>
                        )}
                        {(client.onboardingStatus === 'in_progress' || client.onboardingStatus === 'onboarding') && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-blue-50/80 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 border border-blue-200/50">
                            <FileText className="h-2.5 w-2.5 text-blue-600" /> In Progress
                          </span>
                        )}
                        {client.onboardingStatus === 'on_hold' && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-amber-50/80 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 border border-amber-200/50">
                            <AlertCircle className="h-2.5 w-2.5 text-amber-600" /> On Hold
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Code & Location */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <span className="font-mono text-indigo-600 font-semibold">{client.id}</span>
                      <span>·</span>
                      <span className="truncate">{client.industry} · {client.location}</span>
                    </div>
                  </div>
                </div>

                {/* Health Score */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Health Score</span>
                    <span className="font-bold text-slate-900">{client.health}/100</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mt-1.5">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        client.health >= 85
                          ? 'bg-emerald-500'
                          : client.health >= 70
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${Math.min(100, Math.max(5, client.health))}%` }}
                    />
                  </div>
                </div>

                {/* Stats Row (3 Columns with Icons) */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100/90">
                  {/* Item 1: Active Projects */}
                  <div className="flex items-start gap-1.5">
                    <FolderOpen className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block leading-tight">{client.activeProjects}</span>
                      <span className="text-[10px] text-slate-400 font-medium leading-none block mt-0.5">Active projects</span>
                    </div>
                  </div>

                  {/* Item 2: Pending Approvals */}
                  <div className="flex items-start gap-1.5">
                    <FileCheck className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                    <div>
                      <span className={`text-xs font-bold block leading-tight ${client.pendingApprovals > 0 ? 'text-amber-600' : 'text-slate-900'}`}>
                        {client.pendingApprovals || 0}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium leading-none block mt-0.5">Pending approvals</span>
                    </div>
                  </div>

                  {/* Item 3: Last Activity */}
                  <div className="flex items-start gap-1.5">
                    <Clock className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-900 block leading-tight truncate" title={client.lastActivity}>
                        {client.lastActivity}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium leading-none block mt-0.5">Last activity</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: View Client + Menu */}
              <div className="mt-3.5 pt-3 border-t border-slate-100/90 flex items-center justify-between">
                <button
                  onClick={() => navigate(`/clients/${client.id}`)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50/70 hover:bg-indigo-100/80 border border-indigo-200/50 px-3 py-1.5 rounded-lg transition"
                >
                  View Client <span className="text-indigo-500 font-bold">→</span>
                </button>

                {/* Secondary Action Popover */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setOpenMenuId(openMenuId === client.id ? null : client.id)
                    }}
                    className="h-7 w-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition"
                    title="More actions"
                  >
                    <span className="font-bold text-sm tracking-widest leading-none mb-1">···</span>
                  </button>

                  {openMenuId === client.id && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 bottom-full mb-1.5 w-48 rounded-xl bg-white shadow-xl border border-slate-200 py-1.5 z-20 text-xs animate-scale-in"
                    >
                      <button
                        onClick={() => {
                          setOpenMenuId(null)
                          navigate(`/clients/${client.id}?tab=workspace`)
                        }}
                        className="w-full text-left px-3 py-1.5 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2"
                      >
                        <Building2 className="h-3.5 w-3.5 text-slate-400" /> Open Workspace
                      </button>
                      <button
                        onClick={() => {
                          setOpenMenuId(null)
                          navigate(`/clients/${client.id}?tab=projects`)
                        }}
                        className="w-full text-left px-3 py-1.5 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2"
                      >
                        <FolderOpen className="h-3.5 w-3.5 text-slate-400" /> View Projects ({client.activeProjects})
                      </button>
                      <button
                        onClick={() => {
                          setOpenMenuId(null)
                          navigate(`/clients/${client.id}?tab=approvals`)
                        }}
                        className="w-full text-left px-3 py-1.5 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2"
                      >
                        <FileCheck className="h-3.5 w-3.5 text-slate-400" /> View Approvals ({client.pendingApprovals})
                      </button>
                      <div className="border-t border-slate-100 my-1" />
                      <button
                        onClick={() => {
                          setOpenMenuId(null)
                          navigate(`/clients/${client.id}?tab=overview`)
                        }}
                        className="w-full text-left px-3 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <Eye className="h-3.5 w-3.5 text-slate-400" /> Client Overview
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <div className="card p-12 bg-white rounded-2xl border border-slate-200 text-center">
          <EmptyState
            icon={Handshake}
            title="No clients match your filter criteria"
            message="Try adjusting your status, industry, health score, or search query."
            action={
              <button className="btn-secondary text-xs" onClick={clearFilters}>
                Clear all filters
              </button>
            }
          />
        </div>
      )}

      {/* Pagination (Showing 1 to 8 of 24 clients < 1 2 3 >) */}
      {filteredClients.length > 0 && (
        <div className="flex flex-wrap items-center justify-between border-t border-slate-200/80 pt-4 text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-700">{((currentPage - 1) * itemsPerPage) + 1}</span> to{' '}
            <span className="font-semibold text-slate-700">{Math.min(currentPage * itemsPerPage, filteredClients.length)}</span> of{' '}
            <span className="font-semibold text-slate-700">{filteredClients.length}</span> clients
          </div>

          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="h-7 w-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 disabled:opacity-30 hover:bg-slate-50 hover:border-slate-300 transition"
              title="Previous page"
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => setCurrentPage(pg)}
                className={`h-7 min-w-[28px] px-2 rounded-lg text-xs font-bold transition ${
                  currentPage === pg
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {pg}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="h-7 w-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-600 disabled:opacity-30 hover:bg-slate-50 hover:border-slate-300 transition"
              title="Next page"
            >
              ›
            </button>
          </div>
        </div>
      )}

      {/* Guided New Workspace Modal Flow */}
      <NewWorkspaceModal
        open={workspaceModalOpen}
        onClose={() => setWorkspaceModalOpen(false)}
        onCreated={handleWorkspaceCreated}
      />
    </div>
  )
}

// ----------------------------------------------------
// CLEAN ROUTER DISPATCHER (Strictly 1 hook)
// Guaranteed zero Rules of Hooks violation
// ----------------------------------------------------
export default function Clients() {
  const { id } = useParams()
  if (id) return <ClientDetailScreen key={id} clientId={id} />
  return <ClientsLandingPage />
}
