import { useState, useMemo, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom'
import {
  Handshake, Search, ArrowLeft, FolderOpen, FileText, Wallet, AlertTriangle,
  CheckCircle2, UserPlus, Building2, Users, Mail, Phone, Globe, ExternalLink,
  Clock, ShieldCheck, CheckSquare, Plus, X, ChevronRight, ChevronDown,
  Layers, Lock, Eye, Download, Send, RotateCcw, MessageSquare, AlertCircle,
  FileCheck, Sparkles, Filter, SlidersHorizontal, ArrowUpRight, Copy, Check, ArrowRight, Circle,
  Play, Calendar, Target, Activity, MoreHorizontal, Edit3, LayoutGrid, Table as TableIcon,
  CheckCircle, FolderKanban, Info, EyeOff
} from 'lucide-react'
import {
  Card, PageHeader, Badge, StatusBadge, DetailRow, ProgressBar, EmptyState,
  Avatar, Tabs, SimulationBanner, Drawer
} from '../components/ui'
import {
  clients as seedClients,
  getClientById
} from '../data/clients'
import { useApp } from '../state/AppContext'

// ----------------------------------------------------
// HELPER BADGE STYLES
// ----------------------------------------------------
function AccountStatusBadge({ status }) {
  const s = String(status || '').toLowerCase()
  if (s === 'active') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" /> Active
      </span>
    )
  }
  if (s === 'at_risk' || s === 'delayed') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 ring-1 ring-inset ring-rose-600/20">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-600" /> At Risk
      </span>
    )
  }
  if (s === 'onboarding') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/20">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> Onboarding
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 ring-1 ring-inset ring-slate-400/20">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-500" /> {status}
    </span>
  )
}

function HealthScorePill({ score }) {
  const val = Number(score) || 75
  const isHigh = val >= 85
  const isMid = val >= 70 && val < 85

  const colorClass = isHigh
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-500/10'
    : isMid
    ? 'bg-amber-50 text-amber-700 border-amber-200 ring-1 ring-amber-500/10'
    : 'bg-rose-50 text-rose-700 border-rose-200 ring-1 ring-rose-500/10'

  return (
    <span className={`inline-flex items-center gap-1 font-bold px-2.5 py-0.5 text-xs rounded-lg border ${colorClass}`}>
      <span>{val}</span>
      <span className="text-[10px] font-medium opacity-80">({isHigh ? 'Excellent' : isMid ? 'Good' : 'Needs attention'})</span>
    </span>
  )
}

function ProjectStatusBadge({ status, stage }) {
  const st = String(status || stage || '').toLowerCase()
  if (st.includes('completed') || st.includes('delivered')) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200/80">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Completed
      </span>
    )
  }
  if (st.includes('production') || st.includes('progress') || st.includes('active')) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-700 border border-purple-200/80">
        <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" /> In Production
      </span>
    )
  }
  if (st.includes('review')) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-200/80">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> In Review
      </span>
    )
  }
  if (st.includes('planning') || st.includes('draft')) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200/80">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Planning
      </span>
    )
  }
  if (st.includes('attention') || st.includes('delayed') || st.includes('blocked') || st.includes('risk')) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 border border-rose-200/80">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Needs Attention
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
      {status || stage}
    </span>
  )
}

// ----------------------------------------------------
// FULL-PAGE CLIENT DETAILS SCREEN
// ----------------------------------------------------
export function ClientDetailScreen({ clientId }) {
  const { id: paramId } = useParams()
  const resolvedId = clientId || paramId
  const navigate = useNavigate()
  const { toast } = useApp()
  const [searchParams, setSearchParams] = useSearchParams()

  const tabFromUrl = searchParams.get('tab')
  const filterFromUrl = searchParams.get('filter')

  const [activeTab, setActiveTab] = useState(tabFromUrl || 'overview')
  const [projectFilter, setProjectFilter] = useState(filterFromUrl || 'all') // 'all' | 'active' | 'completed' | 'attention' | 'pending_approval'
  const [approvalFilter, setApprovalFilter] = useState('all') // 'all' | 'pending' | 'approved' | 'revision'
  const [projectViewMode, setProjectViewMode] = useState('cards') // 'cards' | 'table'
  const [briefsSubTab, setBriefsSubTab] = useState('briefs') // 'briefs' | 'deliverables'

  // Modals & Drawers
  const [inspectingDeliverable, setInspectingDeliverable] = useState(null)
  const [composeModalOpen, setComposeModalOpen] = useState(false)
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [moreMenuOpen, setMoreMenuOpen] = useState(false)

  // Seed data resolution
  const seedClient = useMemo(() => getClientById(resolvedId, seedClients), [resolvedId])

  // Local editable client state (so editing directly updates UI)
  const [client, setClient] = useState(seedClient)

  // Message compose form
  const [msgSubject, setMsgSubject] = useState('')
  const [msgContent, setMsgContent] = useState('')
  const [msgChannel, setMsgChannel] = useState('Email')
  const [msgIsInternal, setMsgIsInternal] = useState(false)

  // Interactive local communications & approvals state
  const [commsList, setCommsList] = useState(seedClient?.communications || [])
  const [approvalsList, setApprovalsList] = useState(seedClient?.approvals || [])

  // Edit form state
  const [editFormData, setEditFormData] = useState({
    name: seedClient?.name || '',
    industry: seedClient?.industry || '',
    clientType: seedClient?.clientType || '',
    location: seedClient?.location || '',
    website: seedClient?.website || '',
    primaryContactName: seedClient?.primaryContact?.name || '',
    primaryContactEmail: seedClient?.primaryContact?.email || '',
    primaryContactPhone: seedClient?.primaryContact?.phone || '',
    owner: seedClient?.owner || '',
    description: seedClient?.description || '',
    primaryFocus: seedClient?.primaryFocus || seedClient?.description || ''
  })

  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl)
    }
    if (filterFromUrl) {
      setProjectFilter(filterFromUrl)
    }
    setClient(seedClient)
    setCommsList(seedClient?.communications || [])
    setApprovalsList(seedClient?.approvals || [])
    if (seedClient) {
      setEditFormData({
        name: seedClient.name || '',
        industry: seedClient.industry || '',
        clientType: seedClient.clientType || '',
        location: seedClient.location || '',
        website: seedClient.website || '',
        primaryContactName: seedClient.primaryContact?.name || '',
        primaryContactEmail: seedClient.primaryContact?.email || '',
        primaryContactPhone: seedClient.primaryContact?.phone || '',
        owner: seedClient.owner || '',
        description: seedClient.description || '',
        primaryFocus: seedClient.primaryFocus || seedClient.description || ''
      })
    }
  }, [resolvedId, seedClient, tabFromUrl, filterFromUrl])

  // Derive client projects dynamically with fallback generation for other clients
  const clientProjects = useMemo(() => {
    if (!client) return []
    if (client.projects && client.projects.length > 0) {
      return client.projects
    }
    const activeCount = client.activeProjects || 0
    const completedCount = client.completedProjects || 0
    const list = []
    for (let i = 1; i <= activeCount; i++) {
      list.push({
        id: `PRJ-${client.id.replace('CLIENT-', '')}-00${i}`,
        projectId: `PROJ-00${i}`,
        workflowId: `WF-${client.id.replace('CLIENT-', '')}-00${i}`,
        name: `${client.name} — Phase ${i} Digital Campaign`,
        type: i % 2 === 1 ? 'Social Media Campaign' : 'Healthcare Content & SEO',
        stage: i === 1 ? 'In Production' : 'In Review',
        stageBadge: i === 1 ? 'purple' : 'amber',
        status: i === 1 ? 'In Production' : 'In Review',
        progress: i === 1 ? 75 : 45,
        completedTasks: i === 1 ? 8 : 6,
        totalTasks: i === 1 ? 10 : 14,
        positionsCount: 10 + i,
        workingPositions: 3,
        waitingReviewPositions: 1,
        startDate: '10 Oct 2026',
        deadline: '15 Nov 2026',
        department: 'Marketing & Content (CRT)',
        departmentCode: 'CRT',
        pendingApprovalsCount: i === 1 ? (client.pendingApprovals || 0) : 0,
        approvalStatus: i === 1 && (client.pendingApprovals || 0) > 0 ? 'Pending' : 'In Review',
        lastActivity: client.lastActivity || '2 hours ago',
        description: `Targeted patient awareness & digital growth initiative for ${client.name}.`,
        isAttention: (client.status === 'at_risk' || client.needsAttention) && i === 1,
        attentionReason: 'Review pending on compliance guidelines',
        iconColor: i === 1 ? 'indigo' : 'emerald'
      })
    }
    for (let i = 1; i <= completedCount; i++) {
      list.push({
        id: `PRJ-${client.id.replace('CLIENT-', '')}-C0${i}`,
        projectId: `PROJ-C0${i}`,
        workflowId: `WF-${client.id.replace('CLIENT-', '')}-C0${i}`,
        name: `${client.name} — Brand & Telemetry Setup v${i}.0`,
        type: 'Performance Analytics',
        stage: 'Completed',
        stageBadge: 'emerald',
        status: 'Completed',
        progress: 100,
        completedTasks: 12,
        totalTasks: 12,
        positionsCount: 6,
        workingPositions: 0,
        waitingReviewPositions: 0,
        startDate: '01 Sep 2026',
        deadline: '10 Oct 2026',
        department: 'Data & Analytics (DAT)',
        departmentCode: 'DAT',
        pendingApprovalsCount: 0,
        approvalStatus: 'Approved',
        lastActivity: '10 Oct 2026',
        description: 'Brand guidelines, tracking tags, and baseline reporting configured.',
        isAttention: false,
        iconColor: 'blue'
      })
    }
    return list
  }, [client])

  // Metrics computation (100% dynamic - no hardcoded values)
  const totalProjects = clientProjects.length
  const activeProjectsCount = clientProjects.filter(p =>
    p.status === 'Active' || p.status === 'In Production' || p.status === 'In Review' ||
    p.stage === 'In Production' || p.stage === 'In Review' || p.stage === 'Draft / Review' ||
    p.status === 'in_progress'
  ).length
  const completedProjectsCount = clientProjects.filter(p =>
    p.status === 'Completed' || p.stage === 'Completed'
  ).length
  const pendingApprovalsCount = approvalsList.filter(a =>
    a.status === 'Pending' || a.status === 'pending'
  ).length
  const attentionProjectsCount = clientProjects.filter(p =>
    p.isAttention || p.status === 'Needs Attention' || p.status === 'At risk' ||
    p.status === 'Delayed' || p.status === 'Blocked' || p.stage === 'Delayed'
  ).length || (client?.needsAttention ? 1 : 0)

  // Filtered projects for the Projects tab
  const filteredProjects = useMemo(() => {
    if (projectFilter === 'all') return clientProjects
    if (projectFilter === 'active') {
      return clientProjects.filter(p =>
        p.status === 'Active' || p.status === 'In Production' || p.status === 'In Review' ||
        p.stage === 'In Production' || p.stage === 'In Review' || p.stage === 'Draft / Review' ||
        p.status === 'in_progress'
      )
    }
    if (projectFilter === 'completed') {
      return clientProjects.filter(p => p.status === 'Completed' || p.stage === 'Completed')
    }
    if (projectFilter === 'attention') {
      return clientProjects.filter(p =>
        p.isAttention || p.status === 'Needs Attention' || p.status === 'At risk' ||
        p.status === 'Delayed' || p.status === 'Blocked' || p.stage === 'Delayed'
      )
    }
    if (projectFilter === 'pending_approval') {
      return clientProjects.filter(p => (p.pendingApprovalsCount || 0) > 0 || p.approvalStatus === 'Pending')
    }
    return clientProjects
  }, [clientProjects, projectFilter])

  // Filtered approvals
  const filteredApprovals = useMemo(() => {
    if (approvalFilter === 'all') return approvalsList
    if (approvalFilter === 'pending') return approvalsList.filter(a => a.status === 'Pending')
    if (approvalFilter === 'approved') return approvalsList.filter(a => a.status === 'Approved')
    if (approvalFilter === 'revision') return approvalsList.filter(a => a.status === 'Revision requested')
    return approvalsList
  }, [approvalsList, approvalFilter])

  if (!client) {
    return (
      <div className="p-8 space-y-4">
        <button
          onClick={() => navigate('/clients')}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4" /> All clients
        </button>
        <EmptyState
          icon={Handshake}
          title="Client workspace not found"
          message={`No client record matches identifier "${resolvedId}".`}
          action={
            <button className="btn-primary" onClick={() => navigate('/clients')}>
              Back to Clients & Accounts
            </button>
          }
        />
      </div>
    )
  }

  // Handle clicking a metric card
  const handleMetricClick = (tab, filter) => {
    setActiveTab(tab)
    if (tab === 'projects') {
      setProjectFilter(filter)
      setSearchParams({ tab: 'projects', filter })
    } else if (tab === 'approvals') {
      setApprovalFilter(filter)
      setSearchParams({ tab: 'approvals', filter })
    } else {
      setSearchParams({ tab })
    }
  }

  // Handle sending communications
  const handleSendMessage = () => {
    if (!msgSubject || !msgContent) return
    const newMsg = {
      id: `COMM-${Date.now().toString().slice(-4)}`,
      date: 'Just now',
      from: msgIsInternal ? 'Internal Note (Account Team)' : 'R. Iyer (Account Lead)',
      to: msgIsInternal ? 'Internal' : client.primaryContact?.name || client.name,
      type: msgIsInternal ? 'internal_note' : 'team_to_client',
      subject: msgSubject,
      content: msgContent,
      project: clientProjects?.[0]?.name || 'General',
      channel: msgChannel,
      status: msgIsInternal ? '—' : 'Delivered (Simulated)',
      statusColor: msgIsInternal ? 'slate' : 'emerald',
      nextAction: msgIsInternal ? 'Review' : 'Waiting for response',
      owner: client.owner
    }

    setCommsList([newMsg, ...commsList])
    setMsgSubject('')
    setMsgContent('')
    setComposeModalOpen(false)
    toast?.({ title: 'Message Sent', body: 'Communication logged in client timeline.' })
  }

  // Handle decisions on approvals
  const handleDecideApproval = (apprId, decision) => {
    setApprovalsList((prev) =>
      prev.map((a) =>
        a.id === apprId
          ? {
              ...a,
              status: decision === 'approve' ? 'Approved' : 'Revision requested',
              statusColor: decision === 'approve' ? 'emerald' : 'rose'
            }
          : a
      )
    )
    toast?.({
      title: decision === 'approve' ? 'Deliverable Approved' : 'Revision Requested',
      body: `Decision recorded for approval item #${apprId}.`
    })
  }

  // Handle saving edited client details
  const handleSaveClientDetails = (e) => {
    e.preventDefault()
    setClient((prev) => ({
      ...prev,
      name: editFormData.name,
      industry: editFormData.industry,
      clientType: editFormData.clientType,
      location: editFormData.location,
      website: editFormData.website,
      owner: editFormData.owner,
      description: editFormData.description,
      primaryFocus: editFormData.primaryFocus,
      primaryContact: {
        ...prev?.primaryContact,
        name: editFormData.primaryContactName,
        email: editFormData.primaryContactEmail,
        phone: editFormData.primaryContactPhone
      }
    }))
    setEditModalOpen(false)
    toast?.({ title: 'Client Details Saved', body: 'Updated client profile and metadata.' })
  }

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* 1. Breadcrumb navigation and actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2.5 text-xs">
          <button
            onClick={() => navigate('/clients')}
            className="inline-flex items-center gap-1.5 font-semibold text-slate-700 hover:text-indigo-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:border-indigo-300 hover:bg-indigo-50/50 shadow-2xs transition"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-indigo-600" /> All Clients
          </button>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span
              className="text-slate-500 hover:text-slate-800 cursor-pointer transition font-medium"
              onClick={() => navigate('/clients')}
            >
              Clients & Accounts
            </span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800 truncate max-w-xs">{client.name}</span>
            <span className="font-mono text-slate-400 text-[11px]">({client.id})</span>
          </div>
        </div>

        {/* Global search or quick actions if needed */}
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 font-mono text-[11px] text-slate-600">
            Workspace: {client.workspaceId || 'WS-CLT-001'}
          </span>
        </div>
      </div>

      {/* 2. Redesigned Client Information Header (Matching Reference Image) */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Left: Avatar & Identity Details */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${client.avatarBg || 'bg-rose-500 text-white'} text-2xl font-black shadow-sm`}>
              {client.initials}
            </div>
            <div className="flex-1 min-w-0 space-y-2">
              {/* Row 1: Title, ID, Status badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">{client.name}</h1>
                <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-mono font-bold text-slate-700 border border-slate-200/60">
                  {client.id}
                </span>
                <AccountStatusBadge status={client.status} />
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 border border-slate-200">
                  Workspace: <span className="font-semibold text-emerald-700">{client.workspaceStatus || 'Active'}</span>
                </span>
              </div>

              {/* Row 2: Subtitle Industry & Location */}
              <p className="text-xs sm:text-sm font-medium text-slate-500">
                {client.clientType || client.industry} · {client.location}
              </p>

              {/* Row 3: Contact & Links */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600">
                {client.website && (
                  <a
                    href={`https://${client.website.replace(/^https?:\/\//, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 hover:underline font-medium"
                  >
                    <Globe className="h-3.5 w-3.5 text-indigo-500" />
                    <span>{client.website}</span>
                  </a>
                )}
                {client.primaryContact?.name && (
                  <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                    <Users className="h-3.5 w-3.5 text-slate-400" />
                    <span>{client.primaryContact.name}</span>
                  </span>
                )}
                {client.primaryContact?.email && (
                  <a
                    href={`mailto:${client.primaryContact.email}`}
                    className="inline-flex items-center gap-1 text-slate-600 hover:text-indigo-600"
                  >
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    <span>{client.primaryContact.email}</span>
                  </a>
                )}
                {client.primaryContact?.phone && (
                  <span className="inline-flex items-center gap-1 text-slate-600">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    <span>{client.primaryContact.phone}</span>
                  </span>
                )}
              </div>

              {/* Row 4: Account Meta & Health score & Last activity */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-0.5">
                <span>Client since <strong className="text-slate-700 font-semibold">{client.since || '20 Oct 2026'}</strong></span>
                <span>·</span>
                <span>Account owner: <strong className="text-slate-700 font-semibold">{client.owner}</strong></span>
                <span>·</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-slate-500">Health:</span>
                  <HealthScorePill score={client.health} />
                </span>
                <span>·</span>
                <span>Last activity: <strong className="text-slate-700 font-semibold">{client.lastActivity || '2 hours ago'}</strong></span>
              </div>
            </div>
          </div>

          {/* Right: Actions & Primary Focus Callout */}
          <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setComposeModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
              >
                <Send className="h-3.5 w-3.5" /> Message Client
              </button>
              <button
                onClick={() => setInviteModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition shadow-2xs"
              >
                <UserPlus className="h-3.5 w-3.5 text-slate-500" /> Manage Access
              </button>
              <div className="relative">
                <button
                  onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                  className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 shadow-2xs transition"
                  title="More actions"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
                {moreMenuOpen && (
                  <div className="absolute right-0 mt-1 w-48 rounded-xl bg-white py-1 shadow-lg ring-1 ring-slate-900/10 z-20 text-xs">
                    <button
                      onClick={() => {
                        setMoreMenuOpen(false)
                        setEditModalOpen(true)
                      }}
                      className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Edit3 className="h-3.5 w-3.5 text-slate-400" /> Edit Client Details
                    </button>
                    <button
                      onClick={() => {
                        setMoreMenuOpen(false)
                        navigator.clipboard?.writeText(client.workspaceId || client.id)
                        toast?.({ title: 'Copied', body: 'Workspace ID copied to clipboard' })
                      }}
                      className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Copy className="h-3.5 w-3.5 text-slate-400" /> Copy Workspace ID
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Primary Focus Box matching Reference Image */}
            <div className="w-full lg:max-w-xs rounded-xl bg-slate-50 border border-slate-200/70 p-3 text-left">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <Target className="h-3.5 w-3.5 text-indigo-600" />
                <span>Primary Focus</span>
              </div>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                {client.primaryFocus || client.description || 'Preventive care, maternal health and community outreach in Telangana and Andhra Pradesh.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Five Prominent Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Total Projects */}
        <div
          onClick={() => handleMetricClick('projects', 'all')}
          className="group relative rounded-2xl border border-indigo-100/80 bg-gradient-to-br from-indigo-50/50 via-white to-white p-5 shadow-2xs hover:shadow-md hover:border-indigo-300 transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 group-hover:scale-105 transition">
              <FolderOpen className="h-5 w-5" />
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition" />
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {totalProjects}
            </div>
            <div className="mt-1 text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition">
              Total Projects
            </div>
            <p className="mt-0.5 text-xs text-slate-500">
              All projects for this client
            </p>
          </div>
        </div>

        {/* Card 2: Active Projects */}
        <div
          onClick={() => handleMetricClick('projects', 'active')}
          className="group relative rounded-2xl border border-emerald-100/80 bg-gradient-to-br from-emerald-50/50 via-white to-white p-5 shadow-2xs hover:shadow-md hover:border-emerald-300 transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 group-hover:scale-105 transition">
              <Play className="h-5 w-5 fill-emerald-600 text-emerald-600" />
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition" />
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {activeProjectsCount}
            </div>
            <div className="mt-1 text-sm font-bold text-slate-800 group-hover:text-emerald-600 transition">
              Active Projects
            </div>
            <p className="mt-0.5 text-xs text-slate-500">
              Currently in progress
            </p>
          </div>
        </div>

        {/* Card 3: Completed Projects */}
        <div
          onClick={() => handleMetricClick('projects', 'completed')}
          className="group relative rounded-2xl border border-teal-100/80 bg-gradient-to-br from-teal-50/50 via-white to-white p-5 shadow-2xs hover:shadow-md hover:border-teal-300 transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-600 group-hover:scale-105 transition">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-teal-600 group-hover:translate-x-0.5 transition" />
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {completedProjectsCount}
            </div>
            <div className="mt-1 text-sm font-bold text-slate-800 group-hover:text-teal-600 transition">
              Completed Projects
            </div>
            <p className="mt-0.5 text-xs text-slate-500">
              Successfully delivered
            </p>
          </div>
        </div>

        {/* Card 4: Pending Approvals */}
        <div
          onClick={() => handleMetricClick('approvals', 'pending')}
          className="group relative rounded-2xl border border-amber-100/80 bg-gradient-to-br from-amber-50/50 via-white to-white p-5 shadow-2xs hover:shadow-md hover:border-amber-300 transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600 group-hover:scale-105 transition">
              <Clock className="h-5 w-5" />
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-amber-600 group-hover:translate-x-0.5 transition" />
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {pendingApprovalsCount}
            </div>
            <div className="mt-1 text-sm font-bold text-slate-800 group-hover:text-amber-600 transition">
              Pending Approvals
            </div>
            <p className="mt-0.5 text-xs text-slate-500">
              Waiting for client review
            </p>
          </div>
        </div>

        {/* Card 5: Needs Attention */}
        <div
          onClick={() => handleMetricClick('projects', 'attention')}
          className="group relative rounded-2xl border border-rose-100/80 bg-gradient-to-br from-rose-50/50 via-white to-white p-5 shadow-2xs hover:shadow-md hover:border-rose-300 transition cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-600 group-hover:scale-105 transition">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-rose-600 group-hover:translate-x-0.5 transition" />
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {attentionProjectsCount}
            </div>
            <div className="mt-1 text-sm font-bold text-slate-800 group-hover:text-rose-600 transition">
              Needs Attention
            </div>
            <p className="mt-0.5 text-xs text-slate-500">
              Delayed or blocked
            </p>
          </div>
        </div>
      </div>

      {/* 4. Navigation Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-6 overflow-x-auto pb-px text-sm">
          {[
            { id: 'overview', label: 'Client Overview' },
            { id: 'projects', label: `Projects (${totalProjects})` },
            { id: 'approvals', label: `Approvals & Requests (${approvalsList.length})` },
            { id: 'communications', label: `Communications (${commsList.length})` },
            { id: 'briefs', label: `Briefs & Deliverables (${(client.documents?.length || 2) + (client.deliverables?.length || 12)})` },
            { id: 'reports', label: `Reports (${client.reports?.length || 4})` },
            { id: 'workspace', label: 'Workspace & Access' },
            { id: 'history', label: 'Activity History' }
          ].map((tab) => {
            const isActive = activeTab === tab.id || (tab.id === 'briefs' && (activeTab === 'onboarding' || activeTab === 'deliverables'))
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setSearchParams({ tab: tab.id })
                }}
                className={`whitespace-nowrap border-b-2 py-3 px-1 text-xs font-semibold transition ${
                  isActive
                    ? 'border-indigo-600 text-indigo-600 font-bold'
                    : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: CLIENT OVERVIEW */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top 3 Columns Grid: About, Goals & Services, Onboarding Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1. About this client */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">About this client</h3>
                <button
                  onClick={() => setEditModalOpen(true)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 p-1 rounded-lg hover:bg-indigo-50 transition"
                >
                  <Edit3 className="h-3.5 w-3.5" /> Edit
                </button>
              </div>

              <div className="mt-3.5 space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Organisation name</span>
                  <span className="font-semibold text-slate-900 text-right">{client.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Client ID</span>
                  <span className="font-mono font-semibold text-slate-700">{client.id}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Industry</span>
                  <span className="font-semibold text-slate-800">{client.clientType || client.industry}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Location</span>
                  <span className="font-semibold text-slate-800">{client.location}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Website</span>
                  <span className="font-semibold text-indigo-600 flex items-center gap-1">
                    <Globe className="h-3 w-3" /> {client.website}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Primary contact</span>
                  <span className="font-semibold text-slate-900">{client.primaryContact?.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Email</span>
                  <span className="text-slate-700">{client.primaryContact?.email}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Phone</span>
                  <span className="text-slate-700">{client.primaryContact?.phone}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Account owner</span>
                  <span className="font-semibold text-slate-900">{client.owner}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Client since</span>
                  <span className="text-slate-700">{client.since}</span>
                </div>
                <div className="pt-1">
                  <span className="text-slate-400 font-medium block mb-1">Description</span>
                  <p className="text-slate-600 text-xs leading-relaxed">{client.description}</p>
                </div>
              </div>
            </div>

            {/* 2. Goals & services */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">Goals & services</h3>
                <button
                  onClick={() => setEditModalOpen(true)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 p-1 rounded-lg hover:bg-indigo-50 transition"
                >
                  <Edit3 className="h-3.5 w-3.5" /> Edit
                </button>
              </div>

              <div className="mt-3.5 space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 font-medium text-[11px] uppercase tracking-wider block mb-1.5">Primary objectives</span>
                  <ul className="space-y-1.5">
                    {(client.primaryObjectives || [
                      'Increase community health awareness',
                      'Patient education content for preventive care',
                      'Promote preventive care checkup packages',
                      'Multi-language content (English, Telugu)'
                    ]).map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-slate-400 font-medium text-[11px] uppercase tracking-wider block mb-1.5">Approved services</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(client.approvedServices || ['Content generation', 'Social media management', 'Paid media (limited)', 'Reporting & analytics']).map((s, i) => (
                      <span key={i} className="rounded-lg bg-indigo-50/70 px-2.5 py-1 text-[11px] font-semibold text-indigo-700 border border-indigo-200/60">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="text-slate-400 font-medium text-[11px] uppercase tracking-wider block mb-1.5">Key documents</span>
                  <div className="space-y-2">
                    {(client.documents || [
                      { name: 'Brand guidelines v2.1', size: '14 MB', date: '12 Oct 2026' },
                      { name: 'Approved scope v1.0', size: '2.4 MB', date: '18 Oct 2026' }
                    ]).map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-xl border border-slate-200/70 bg-slate-50/60 hover:bg-slate-100/60 transition">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-indigo-500" />
                          <div>
                            <p className="font-semibold text-slate-800">{doc.name}</p>
                            <p className="text-[10px] text-slate-400">{doc.size} · {doc.date}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => toast?.({ title: 'Download Started', body: `Downloading ${doc.name}...` })}
                          className="text-slate-400 hover:text-indigo-600 p-1 rounded transition"
                          title="Download document"
                        >
                          <Download className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Onboarding progress */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm">Onboarding progress</h3>
                  <span className="text-xs font-bold text-indigo-600">80%</span>
                </div>

                <div className="mt-3.5 mb-4">
                  <ProgressBar value={80} className="h-2 rounded-full" />
                </div>

                <div className="space-y-2 text-xs max-h-72 overflow-y-auto pr-1">
                  {(client.onboardingChecklist || []).map((item) => (
                    <div key={item.id} className="flex items-center gap-2.5">
                      {item.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      ) : (
                        <Circle className="h-4 w-4 text-slate-300 shrink-0" />
                      )}
                      <span className={item.completed ? 'text-slate-800 font-medium' : 'text-slate-400'}>
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-right">
                <button
                  onClick={() => {
                    setActiveTab('briefs')
                    setBriefsSubTab('briefs')
                    setSearchParams({ tab: 'briefs' })
                  }}
                  className="text-xs font-semibold text-indigo-600 hover:underline inline-flex items-center gap-1"
                >
                  View full onboarding checklist <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Grid: 2/3 (Projects & Approvals & Comms) + 1/3 (Recent Activity Timeline) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent projects matching reference image */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Recent projects</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Active and recently delivered client projects</p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('projects')
                      setProjectFilter('all')
                      setSearchParams({ tab: 'projects' })
                    }}
                    className="text-xs font-semibold text-indigo-600 hover:underline inline-flex items-center gap-1"
                  >
                    View all projects <ArrowRight className="h-3 w-3" />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {clientProjects.slice(0, 3).map((prj, i) => {
                    const iconBg = i === 0 ? 'bg-indigo-500' : i === 1 ? 'bg-emerald-600' : 'bg-amber-500'
                    return (
                      <div
                        key={prj.id}
                        className="rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-white hover:border-indigo-200 hover:shadow-sm transition p-4 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start gap-2.5">
                            <div className={`h-8 w-8 rounded-lg ${iconBg} text-white flex items-center justify-center shrink-0 shadow-2xs`}>
                              {i === 0 ? <Layers className="h-4 w-4" /> : i === 1 ? <FileText className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-bold text-slate-900 text-xs truncate leading-snug">{prj.name}</h4>
                              <div className="flex items-center gap-1.5 mt-1">
                                <span className="font-mono text-[10px] text-slate-500 font-medium">{prj.projectId || prj.id}</span>
                                <ProjectStatusBadge status={prj.status} stage={prj.stage} />
                              </div>
                            </div>
                          </div>

                          <p className="mt-2 text-[11px] text-slate-500 line-clamp-1">
                            {prj.description || 'Campaign deliverables and healthcare awareness workflows'}
                          </p>

                          <div className="mt-3">
                            <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                              <span className="text-slate-400 font-normal">Progress</span>
                              <span>{prj.progress}%</span>
                            </div>
                            <ProgressBar value={prj.progress} className="h-1.5 rounded-full" />
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                            <span className="flex items-center gap-1 font-medium">
                              <CheckSquare className="h-3 w-3 text-slate-400" /> {prj.completedTasks}/{prj.totalTasks} Tasks
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3 text-slate-400" /> {prj.positionsCount || 10} Positions
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                          <span className="text-[10px] text-slate-400 font-mono">
                            {prj.deadline}
                          </span>
                          <button
                            onClick={() => navigate(`/workflows/${prj.id}`)}
                            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
                          >
                            View Project <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Pending Approvals & Requests Card */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Pending Approvals & Decision Gates</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Deliverables waiting for client review and sign-off</p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('approvals')
                      setApprovalFilter('pending')
                      setSearchParams({ tab: 'approvals' })
                    }}
                    className="text-xs font-semibold text-indigo-600 hover:underline inline-flex items-center gap-1"
                  >
                    View all approvals ({approvalsList.length}) <ArrowRight className="h-3 w-3" />
                  </button>
                </div>

                <div className="mt-3.5 divide-y divide-slate-100 text-xs">
                  {approvalsList.slice(0, 3).map((appr) => (
                    <div key={appr.id} className="py-2.5 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-indigo-600">{appr.id}</span>
                          <p className="font-bold text-slate-900 truncate">{appr.item}</p>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            appr.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' :
                            appr.status === 'In Review' ? 'bg-indigo-50 text-indigo-700' :
                            appr.status === 'Revision requested' ? 'bg-rose-50 text-rose-700' :
                            'bg-amber-50 text-amber-700'
                          }`}>
                            {appr.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {appr.project} · Due: <strong className="text-slate-700">{appr.dueDate}</strong> · Reviewer: {appr.reviewer}
                        </p>
                      </div>

                      {appr.status === 'Pending' ? (
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => handleDecideApproval(appr.id, 'revision')}
                            className="btn-secondary text-[11px] px-2.5 py-1"
                          >
                            Revise
                          </button>
                          <button
                            onClick={() => handleDecideApproval(appr.id, 'approve')}
                            className="btn-primary text-[11px] px-2.5 py-1"
                          >
                            Approve
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs font-medium">Logged</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Communications Card */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Recent Client Communications</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Messages, requests, and feedback exchanges</p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('communications')
                      setSearchParams({ tab: 'communications' })
                    }}
                    className="text-xs font-semibold text-indigo-600 hover:underline inline-flex items-center gap-1"
                  >
                    View all communications ({commsList.length}) <ArrowRight className="h-3 w-3" />
                  </button>
                </div>

                <div className="mt-3.5 divide-y divide-slate-100 text-xs">
                  {commsList.slice(0, 3).map((comm) => (
                    <div key={comm.id} className="py-2.5 flex items-start justify-between gap-3">
                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{comm.from}</span>
                          <span className="text-slate-400">→ {comm.to}</span>
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600 font-mono">
                            {comm.channel}
                          </span>
                        </div>
                        <p className="font-semibold text-slate-800 text-xs truncate">{comm.subject}</p>
                        <p className="text-[11px] text-slate-500 truncate max-w-lg">{comm.content}</p>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono shrink-0 whitespace-nowrap">{comm.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 1 Column: Recent activity timeline matching reference image */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm">Recent activity</h3>
                  <button
                    onClick={() => {
                      setActiveTab('history')
                      setSearchParams({ tab: 'history' })
                    }}
                    className="text-xs font-semibold text-indigo-600 hover:underline inline-flex items-center gap-1"
                  >
                    View all <ArrowRight className="h-3 w-3" />
                  </button>
                </div>

                {/* Timeline */}
                <div className="mt-4 relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {[
                    { title: 'Content draft shared for review', sub: 'Social Media Awareness Campaign', time: '2 hours ago', dotBg: 'bg-indigo-600 ring-indigo-100' },
                    { title: 'Client requested additional topics', sub: 'Patient Education Blog Series', time: '5 hours ago', dotBg: 'bg-emerald-600 ring-emerald-100' },
                    { title: 'Project moved to In Production', sub: 'Social Media Awareness Campaign', time: '1 day ago', dotBg: 'bg-blue-600 ring-blue-100' },
                    { title: 'Brand guidelines uploaded', sub: 'Onboarding', time: '2 days ago', dotBg: 'bg-amber-500 ring-amber-100' },
                    { title: 'Kickoff meeting scheduled', sub: 'Onboarding', time: '3 days ago', dotBg: 'bg-purple-600 ring-purple-100' }
                  ].map((act, idx) => (
                    <div key={idx} className="relative">
                      <span className={`absolute -left-[19px] top-1 h-3 w-3 rounded-full ${act.dotBg} ring-4 bg-white`} />
                      <div>
                        <p className="text-xs font-bold text-slate-900 leading-snug">{act.title}</p>
                        <p className="text-[11px] text-slate-500">{act.sub}</p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">{act.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 text-center">
                <span className="text-[11px] text-slate-400">
                  Audit trail secured by Independent Assurance (GOV-001)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PROJECTS */}
      {/* ========================================================================= */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          {/* Projects Control Bar: Filters, View Mode Toggle, Action */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                onClick={() => setProjectFilter('all')}
                className={`rounded-lg px-3 py-1.5 font-semibold transition ${
                  projectFilter === 'all'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All ({totalProjects})
              </button>
              <button
                onClick={() => setProjectFilter('active')}
                className={`rounded-lg px-3 py-1.5 font-semibold transition ${
                  projectFilter === 'active'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                Active ({activeProjectsCount})
              </button>
              <button
                onClick={() => setProjectFilter('completed')}
                className={`rounded-lg px-3 py-1.5 font-semibold transition ${
                  projectFilter === 'completed'
                    ? 'bg-teal-600 text-white shadow-2xs'
                    : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
                }`}
              >
                Completed ({completedProjectsCount})
              </button>
              <button
                onClick={() => setProjectFilter('attention')}
                className={`rounded-lg px-3 py-1.5 font-semibold transition ${
                  projectFilter === 'attention'
                    ? 'bg-rose-600 text-white shadow-2xs'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                }`}
              >
                Needs Attention ({attentionProjectsCount})
              </button>
              <button
                onClick={() => setProjectFilter('pending_approval')}
                className={`rounded-lg px-3 py-1.5 font-semibold transition ${
                  projectFilter === 'pending_approval'
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                }`}
              >
                Pending Approvals ({pendingApprovalsCount})
              </button>
            </div>

            {/* View Switcher & New Project Action */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/80">
                <button
                  onClick={() => setProjectViewMode('cards')}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                    projectViewMode === 'cards'
                      ? 'bg-white text-indigo-600 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Card View"
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Cards</span>
                </button>
                <button
                  onClick={() => setProjectViewMode('table')}
                  className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                    projectViewMode === 'table'
                      ? 'bg-white text-indigo-600 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Table View"
                >
                  <TableIcon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Table</span>
                </button>
              </div>

              <button
                onClick={() => navigate('/workflows')}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
              >
                <Plus className="h-3.5 w-3.5" /> New Project
              </button>
            </div>
          </div>

          {/* Cards View (Default) — Displaying all 14 required project attributes */}
          {projectViewMode === 'cards' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredProjects.map((prj) => (
                <div
                  key={prj.id}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs hover:shadow-md hover:border-indigo-200 transition flex flex-col justify-between"
                >
                  <div>
                    {/* Header Row: Title, ID, Type, Status */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                          <FolderKanban className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">{prj.name}</h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/60">
                              {prj.projectId || prj.id}
                            </span>
                            <span className="text-xs font-medium text-slate-500">
                              {prj.type || 'Healthcare Marketing Campaign'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <ProjectStatusBadge status={prj.status} stage={prj.stage} />
                    </div>

                    {/* Description */}
                    <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                      {prj.description || 'Campaign deliverables and healthcare awareness workflows.'}
                    </p>

                    {/* Progress Percentage & Bar */}
                    <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                        <span className="text-slate-600">Progress</span>
                        <span className="text-indigo-600">{prj.progress}%</span>
                      </div>
                      <ProgressBar value={prj.progress} className="h-2 rounded-full" />
                    </div>

                    {/* 4-Box Key Metrics Grid */}
                    <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                      <div className="p-2 rounded-xl bg-slate-50/80 border border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Tasks</span>
                        <span className="font-extrabold text-slate-800 text-sm">{prj.completedTasks}/{prj.totalTasks}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50/80 border border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Positions</span>
                        <span className="font-extrabold text-slate-800 text-sm">{prj.positionsCount || 10}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50/80 border border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Working</span>
                        <span className="font-extrabold text-emerald-700 text-sm">{prj.workingPositions ?? 3} active</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50/80 border border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">In Review</span>
                        <span className="font-extrabold text-amber-700 text-sm">{prj.waitingReviewPositions ?? 1} queue</span>
                      </div>
                    </div>

                    {/* Timeline & Metadata Rows */}
                    <div className="mt-3.5 space-y-1.5 text-xs border-t border-slate-100 pt-3 text-slate-600">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Owner Department:</span>
                        <span className="font-semibold text-slate-800">{prj.department || 'Marketing & Content (CRT)'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Timeline:</span>
                        <span>
                          {prj.startDate || '10 Oct 2026'} → <strong className="text-slate-800">{prj.deadline}</strong>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Pending Client Approvals:</span>
                        <span className={(prj.pendingApprovalsCount || 0) > 0 ? 'font-bold text-amber-600' : 'text-slate-500'}>
                          {prj.pendingApprovalsCount || 0} item(s)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Last Activity:</span>
                        <span className="font-mono text-[11px] text-slate-500">{prj.lastActivity || '2 hours ago'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">
                      Workflow Ref: {prj.workflowId || 'WF-001'}
                    </span>
                    <button
                      onClick={() => navigate(`/workflows/${prj.id}`)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3.5 py-2 shadow-2xs transition"
                    >
                      <span>View Project</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Table View */
            <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                    <tr>
                      <th className="py-3 px-4">PROJECT</th>
                      <th className="py-3 px-4">PROJECT ID</th>
                      <th className="py-3 px-4">STAGE</th>
                      <th className="py-3 px-4">PROGRESS</th>
                      <th className="py-3 px-4">TASKS</th>
                      <th className="py-3 px-4">POSITIONS</th>
                      <th className="py-3 px-4">DEADLINE</th>
                      <th className="py-3 px-4">STATUS</th>
                      <th className="py-3 px-4 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredProjects.map((prj) => (
                      <tr
                        key={prj.id}
                        onClick={() => navigate(`/workflows/${prj.id}`)}
                        className="hover:bg-indigo-50/40 cursor-pointer transition"
                      >
                        <td className="py-3 px-4 font-bold text-slate-900">{prj.name}</td>
                        <td className="py-3 px-4 font-mono text-slate-500">{prj.projectId || prj.id}</td>
                        <td className="py-3 px-4">
                          <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-semibold text-purple-700">
                            {prj.stage}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="w-24">
                            <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
                              <span>{prj.progress}%</span>
                            </div>
                            <ProgressBar value={prj.progress} className="h-1.5" />
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{prj.completedTasks}/{prj.totalTasks}</td>
                        <td className="py-3 px-4 text-slate-600">{prj.positionsCount || 10}</td>
                        <td className="py-3 px-4 text-slate-600">{prj.deadline}</td>
                        <td className="py-3 px-4 font-semibold text-emerald-600">
                          <ProjectStatusBadge status={prj.status} stage={prj.stage} />
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              navigate(`/workflows/${prj.id}`)
                            }}
                            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: APPROVALS & REQUESTS */}
      {/* ========================================================================= */}
      {activeTab === 'approvals' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                onClick={() => setApprovalFilter('all')}
                className={`rounded-lg px-3 py-1.5 font-semibold transition ${
                  approvalFilter === 'all'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All ({approvalsList.length})
              </button>
              <button
                onClick={() => setApprovalFilter('pending')}
                className={`rounded-lg px-3 py-1.5 font-semibold transition ${
                  approvalFilter === 'pending'
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                }`}
              >
                Pending ({pendingApprovalsCount})
              </button>
              <button
                onClick={() => setApprovalFilter('approved')}
                className={`rounded-lg px-3 py-1.5 font-semibold transition ${
                  approvalFilter === 'approved'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => setApprovalFilter('revision')}
                className={`rounded-lg px-3 py-1.5 font-semibold transition ${
                  approvalFilter === 'revision'
                    ? 'bg-rose-600 text-white shadow-2xs'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                }`}
              >
                Revision Requested
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                  <tr>
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">PROJECT / DELIVERABLE</th>
                    <th className="py-3 px-4">STATUS</th>
                    <th className="py-3 px-4">DUE DATE</th>
                    <th className="py-3 px-4">REVIEWER</th>
                    <th className="py-3 px-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredApprovals.map((appr) => (
                    <tr key={appr.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-mono font-bold text-indigo-600">{appr.id}</td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900">{appr.item}</p>
                        <p className="text-[11px] text-slate-500">{appr.project} · {appr.deliverableRef}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          appr.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' :
                          appr.status === 'In Review' ? 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200' :
                          appr.status === 'Revision requested' ? 'bg-rose-50 text-rose-700 ring-1 ring-rose-200' :
                          'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                        }`}>
                          {appr.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{appr.dueDate}</td>
                      <td className="py-3 px-4 text-slate-800 font-medium">{appr.reviewer}</td>
                      <td className="py-3 px-4 text-right">
                        {appr.status === 'Pending' ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleDecideApproval(appr.id, 'revision')}
                              className="btn-secondary text-[11px] px-2.5 py-1"
                            >
                              Revise
                            </button>
                            <button
                              onClick={() => handleDecideApproval(appr.id, 'approve')}
                              className="btn-primary text-[11px] px-2.5 py-1"
                            >
                              Approve
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs">Logged</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: COMMUNICATIONS */}
      {/* ========================================================================= */}
      {activeTab === 'communications' && (
        <Card
          title="Communications & Requests"
          subtitle="All client communications, stakeholder emails, and internal notes"
          actions={
            <button
              onClick={() => setComposeModalOpen(true)}
              className="btn-primary text-xs flex items-center gap-1.5"
            >
              <Send className="h-3.5 w-3.5" /> Compose Message
            </button>
          }
          bodyClass="p-0"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">DATE</th>
                  <th className="py-3 px-4">FROM / TO</th>
                  <th className="py-3 px-4">SUBJECT / MESSAGE</th>
                  <th className="py-3 px-4">RELATED PROJECT</th>
                  <th className="py-3 px-4">CHANNEL</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4">NEXT ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {commsList.map((comm) => (
                  <tr
                    key={comm.id}
                    className={`transition ${comm.type === 'internal_note' ? 'bg-amber-50/30' : 'hover:bg-slate-50'}`}
                  >
                    <td className="py-3 px-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">{comm.date}</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{comm.from}</p>
                      <p className="text-[11px] text-slate-400">→ {comm.to}</p>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <p className="font-semibold text-slate-800 truncate">{comm.subject}</p>
                      <p className="text-[11px] text-slate-500 truncate">{comm.content}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{comm.project}</td>
                    <td className="py-3 px-4">
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                        {comm.channel}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        comm.status === 'New' ? 'bg-rose-50 text-rose-700 font-bold' :
                        comm.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700' :
                        comm.status === 'Read' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {comm.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-indigo-600">{comm.nextAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: BRIEFS & DELIVERABLES */}
      {/* ========================================================================= */}
      {(activeTab === 'briefs' || activeTab === 'onboarding' || activeTab === 'deliverables') && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <button
              onClick={() => setBriefsSubTab('briefs')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                briefsSubTab === 'briefs'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Client Brief & Onboarding Checklist
            </button>
            <button
              onClick={() => setBriefsSubTab('deliverables')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                briefsSubTab === 'deliverables'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Generated Deliverables & Assets Library ({client.deliverables?.length || 12})
            </button>
          </div>

          {briefsSubTab === 'briefs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Client Brief Overview" actions={<span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">Approved</span>}>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Target audience</span>
                    <p className="font-semibold text-slate-800 mt-0.5">Patients, caregivers, local community in Telangana & AP</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Services</span>
                    <p className="font-semibold text-slate-800 mt-0.5">Health tips, patient education, outreach campaigns</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Content themes</span>
                    <p className="font-semibold text-slate-800 mt-0.5">Preventive care, maternal health, lifestyle diseases</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Languages</span>
                    <p className="font-semibold text-slate-800 mt-0.5">English, Telugu</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Uploaded Assets</span>
                    <p className="font-semibold text-indigo-600 mt-0.5">14 files verified in asset repository</p>
                  </div>
                </div>
              </Card>

              <Card title="10-Step Onboarding Checklist" subtitle="Complete record of workspace onboarding tasks">
                <div className="space-y-2.5 text-xs">
                  {(client.onboardingChecklist || []).map((step) => (
                    <div key={step.id} className="flex items-center justify-between p-2 rounded-lg border border-slate-100 bg-slate-50/50">
                      <div className="flex items-center gap-2">
                        {step.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-slate-300 shrink-0" />
                        )}
                        <span className={step.completed ? 'font-medium text-slate-800' : 'text-slate-400'}>
                          {step.title}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">{step.date}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {briefsSubTab === 'deliverables' && (
            <Card
              title={`Deliverables & Assets Library (${client.deliverables?.length || 12})`}
              subtitle="All generated content, design assets, and code deliverables for this workspace"
              bodyClass="p-0"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                    <tr>
                      <th className="py-3 px-4">DELIVERABLE</th>
                      <th className="py-3 px-4">CATEGORY</th>
                      <th className="py-3 px-4">STATUS</th>
                      <th className="py-3 px-4">VERSION</th>
                      <th className="py-3 px-4 text-right">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(client.deliverables || []).map((del) => (
                      <tr key={del.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4">
                          <p className="font-bold text-slate-900">{del.name}</p>
                          <p className="font-mono text-[11px] text-slate-400">{del.id}</p>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{del.category}</td>
                        <td className="py-3 px-4">
                          <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                            del.status === 'Active' || del.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' :
                            del.status === 'In Review' ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {del.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-600">{del.version}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setInspectingDeliverable(del)}
                            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition"
                          >
                            Preview
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: REPORTS */}
      {/* ========================================================================= */}
      {activeTab === 'reports' && (
        <Card
          title={`Reports (${client.reports?.length || 4})`}
          subtitle="Project performance, web telemetry, and monthly reconciliation reports"
          bodyClass="p-0"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">REPORT ID & NAME</th>
                  <th className="py-3 px-4">PERIOD</th>
                  <th className="py-3 px-4">GENERATED DATE</th>
                  <th className="py-3 px-4">FORMAT</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(client.reports || []).map((rep) => (
                  <tr key={rep.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{rep.name}</p>
                      <p className="font-mono text-[11px] text-slate-400">{rep.id}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{rep.period}</td>
                    <td className="py-3 px-4 text-slate-500">{rep.generatedDate}</td>
                    <td className="py-3 px-4 text-slate-600">{rep.format}</td>
                    <td className="py-3 px-4">
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                        {rep.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => toast?.({ title: 'Download Report', body: `Generating PDF for ${rep.name}...` })}
                        className="text-xs font-semibold text-indigo-600 hover:underline"
                      >
                        Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: WORKSPACE & ACCESS */}
      {/* ========================================================================= */}
      {activeTab === 'workspace' && (
        <Card
          title={`Workspace Users (${client.workspaceUsers?.length || 3})`}
          subtitle={`Dedicated tenant scope: ${client.workspaceId || 'WS-CLT-001'} (Strict tenant isolation active)`}
          actions={
            <button
              onClick={() => setInviteModalOpen(true)}
              className="btn-primary text-xs flex items-center gap-1.5"
            >
              <UserPlus className="h-3.5 w-3.5" /> + Invite User
            </button>
          }
          bodyClass="p-0"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">USER</th>
                  <th className="py-3 px-4">ROLE</th>
                  <th className="py-3 px-4">PERMISSIONS</th>
                  <th className="py-3 px-4">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(client.workspaceUsers || []).map((u, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{u.name}</p>
                      <p className="text-[11px] text-slate-400">{u.email}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="rounded bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{u.permissions}</td>
                    <td className="py-3 px-4">
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        u.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* TAB 8: ACTIVITY HISTORY */}
      {/* ========================================================================= */}
      {activeTab === 'history' && (
        <Card title="Account History Timeline" subtitle="Immutable historical timeline of client milestones and decisions">
          <div className="divide-y divide-slate-100">
            {(client.accountHistory || [
              { date: '20 Oct 2026', event: 'Client onboarded', detail: 'Workspace WS-CLT-001 provisioned and tenant RBAC access credentials distributed.', actor: 'CEX-002 (Radhika)' },
              { date: '18 Oct 2026', event: 'Commercial agreement executed', detail: 'Contract CTR-2026-089 signed; Scope v1.0 formally approved.', actor: 'SBD-007 (Nitin)' },
              { date: '15 Oct 2026', event: 'Converted from prospect', detail: 'Opportunity OPP-081 qualified and commercial review approved.', actor: 'SBD-006 (Sameer)' },
              { date: '10 Oct 2026', event: 'MSA proposal shared', detail: 'Proposal v1.0 sent to client leadership following discovery meeting.', actor: 'SBD-006 (Sameer)' },
              { date: '05 Oct 2026', event: 'Prospect qualified', detail: 'Inbound enquiry qualified with 92/100 lead score.', actor: 'SBD-002 (Kavita)' }
            ]).map((evt, idx) => (
              <div key={idx} className="py-3.5 flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold mt-0.5">
                  <Clock className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-bold text-slate-900">{evt.event}</p>
                    <span className="text-[11px] text-slate-400 font-mono">{evt.date}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-600">{evt.detail}</p>
                  <p className="mt-1 text-[11px] text-slate-400">Actor: <strong className="text-slate-600">{evt.actor}</strong></p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* Edit Client Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Edit3 className="h-4 w-4 text-indigo-600" /> Edit Client Profile
              </h3>
              <button onClick={() => setEditModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveClientDetails} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Organisation Name</label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="input text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Industry / Client Type</label>
                  <input
                    type="text"
                    value={editFormData.clientType}
                    onChange={(e) => setEditFormData({ ...editFormData, clientType: e.target.value })}
                    className="input text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Location</label>
                  <input
                    type="text"
                    value={editFormData.location}
                    onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                    className="input text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Website</label>
                  <input
                    type="text"
                    value={editFormData.website}
                    onChange={(e) => setEditFormData({ ...editFormData, website: e.target.value })}
                    className="input text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Primary Contact Name</label>
                  <input
                    type="text"
                    value={editFormData.primaryContactName}
                    onChange={(e) => setEditFormData({ ...editFormData, primaryContactName: e.target.value })}
                    className="input text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={editFormData.primaryContactEmail}
                    onChange={(e) => setEditFormData({ ...editFormData, primaryContactEmail: e.target.value })}
                    className="input text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={editFormData.primaryContactPhone}
                    onChange={(e) => setEditFormData({ ...editFormData, primaryContactPhone: e.target.value })}
                    className="input text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Primary Focus (Header Callout)</label>
                <input
                  type="text"
                  value={editFormData.primaryFocus}
                  onChange={(e) => setEditFormData({ ...editFormData, primaryFocus: e.target.value })}
                  placeholder="e.g. Preventive care, maternal health and community outreach in Telangana."
                  className="input text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">About / Description</label>
                <textarea
                  rows={3}
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  className="input text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="btn-secondary text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Compose Message Modal */}
      {composeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Send Communication to {client.name}</h3>
              <button onClick={() => setComposeModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Subject</label>
                <input
                  type="text"
                  value={msgSubject}
                  onChange={(e) => setMsgSubject(e.target.value)}
                  placeholder="e.g. Update regarding cardiac campaign deliverables"
                  className="input text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Channel</label>
                <select
                  value={msgChannel}
                  onChange={(e) => setMsgChannel(e.target.value)}
                  className="input text-xs"
                >
                  <option value="Email">Email</option>
                  <option value="Client Portal">Client Portal</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Message Content</label>
                <textarea
                  rows={4}
                  value={msgContent}
                  onChange={(e) => setMsgContent(e.target.value)}
                  placeholder="Type message content..."
                  className="input text-xs font-sans"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="internalNote"
                  checked={msgIsInternal}
                  onChange={(e) => setMsgIsInternal(e.target.checked)}
                  className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="internalNote" className="text-xs font-medium text-slate-700">
                  Save as Internal Note (not visible to client)
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button onClick={() => setComposeModalOpen(false)} className="btn-secondary text-xs">
                Cancel
              </button>
              <button onClick={handleSendMessage} className="btn-primary text-xs flex items-center gap-1.5">
                <Send className="h-3.5 w-3.5" /> Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite User Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Invite User to Workspace</h3>
              <button onClick={() => setInviteModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <input type="text" placeholder="e.g. Dr. Ramesh Kumar" className="input text-xs" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                <input type="email" placeholder="ramesh@citycarehospitals.in" className="input text-xs" />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Workspace Role</label>
                <select className="input text-xs">
                  <option value="Reviewer">Client Reviewer (Reviews work & approves)</option>
                  <option value="Admin">Client Owner / Admin (Full workspace admin)</option>
                  <option value="Viewer">Client Viewer (Read-only access)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button onClick={() => setInviteModalOpen(false)} className="btn-secondary text-xs">
                Cancel
              </button>
              <button
                onClick={() => {
                  setInviteModalOpen(false)
                  toast?.({ title: 'Invitation Sent', body: 'User invite has been registered in the workspace.' })
                }}
                className="btn-primary text-xs"
              >
                Send Invite
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deliverable Preview Drawer / Modal */}
      {inspectingDeliverable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">{inspectingDeliverable.name}</h3>
                <span className="text-xs font-mono text-slate-400">{inspectingDeliverable.id} · {inspectingDeliverable.category} · {inspectingDeliverable.version}</span>
              </div>
              <button onClick={() => setInspectingDeliverable(null)} className="text-slate-400 hover:text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed font-sans">
                {inspectingDeliverable.preview || 'No text preview available for this asset format.'}
              </div>

              <div className="flex justify-between items-center py-2 text-slate-500 border-t border-slate-100">
                <span>Status: <strong className="text-slate-800">{inspectingDeliverable.status}</strong></span>
                <span>Date: <strong className="text-slate-800">{inspectingDeliverable.date}</strong></span>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                onClick={() => setInspectingDeliverable(null)}
                className="btn-secondary text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  toast?.({ title: 'Downloading Asset', body: `Saved ${inspectingDeliverable.name} to downloads.` })
                  setInspectingDeliverable(null)
                }}
                className="btn-primary text-xs flex items-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5" /> Download Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
