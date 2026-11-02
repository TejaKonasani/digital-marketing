import { useState, useMemo, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft, CheckCircle2, Clock, AlertTriangle, FileText, Download,
  ExternalLink, Bot, Send, Sparkles, User, Building2, Calendar,
  Layers, Video, Image, FileSpreadsheet, Eye, ChevronRight, ShieldCheck,
  Check, ArrowRight, HelpCircle, X, ThumbsUp, MessageSquare, RotateCcw,
  Sparkle, GitBranch, List, Route, ShieldAlert, FileBox, FolderOpen,
  Info, Cpu, CheckSquare, CornerDownRight, ArrowDown
} from 'lucide-react'
import { useClient } from '../state/ClientContext'
import { getProjectAiResponse } from '../data/clientData'

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { projects, setProjects, setPreviewDoc, setToast } = useClient()

  // Find the requested project safely
  const currentProject = useMemo(() => {
    return projects.find((p) => p.id === id) || projects.find((p) => p.id === 'PRJ-003') || projects[0]
  }, [projects, id])

  // Active top-level tab: strictly 4 tabs
  // 1: tracker | 2: details | 3: documents | 4: ai_chat
  // Project Tracker MUST be selected by default!
  const [activeTab, setActiveTab] = useState('tracker')

  // View mode in Project Tracker: 'timeline' | 'list'
  const [viewMode, setViewMode] = useState('timeline')

  // Selected agent for the side drawer / full view
  const [selectedAgent, setSelectedAgent] = useState(
    currentProject?.roadmap?.find((n) => n.hasApproval) || currentProject?.roadmap?.[6] || currentProject?.roadmap?.[0] || null
  )
  const [agentDrawerOpen, setAgentDrawerOpen] = useState(true)
  const [agentTab, setAgentTab] = useState('overview') // 'overview' | 'work' | 'deliverables' | 'messages'

  // Request changes modal state
  const [changesModalOpen, setChangesModalOpen] = useState(false)
  const [changesComment, setChangesComment] = useState('')

  // AI Assistant Chat state (Project-Specific)
  const [messages, setMessages] = useState([
    {
      id: 'pmsg-1',
      sender: 'user',
      text: 'What has been completed so far in this project?'
    },
    {
      id: 'pmsg-2',
      sender: 'ai',
      text: getProjectAiResponse(currentProject?.id, 'completed', currentProject)
    }
  ])
  const [inputQuery, setInputQuery] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // Document search in Documents tab
  const [docSearch, setDocSearch] = useState('')
  const [docCategory, setDocCategory] = useState('all')

  // Update selected agent if project changes
  useEffect(() => {
    if (currentProject?.roadmap) {
      const approvalNode = currentProject.roadmap.find((n) => n.hasApproval && n.statusKey === 'approval')
      setSelectedAgent(approvalNode || currentProject.roadmap[0])
    }
  }, [currentProject])

  // Approval interaction
  const handleApproveStage = (nodeId) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== currentProject.id) return p

        const updatedRoadmap = p.roadmap.map((node, idx) => {
          if (node.id === nodeId) {
            return {
              ...node,
              status: 'Completed',
              statusKey: 'completed',
              date: 'Approved Just Now',
              actionRequired: null,
              hasApproval: false
            }
          }
          // Unblock the next node if it was not started
          if (idx > 0 && p.roadmap[idx - 1].id === nodeId && node.statusKey === 'not_started') {
            return {
              ...node,
              status: 'In Progress',
              statusKey: 'in_progress',
              date: 'Started Just Now'
            }
          }
          return node
        })

        const hasRemainingApproval = updatedRoadmap.some((n) => n.statusKey === 'approval')

        return {
          ...p,
          progress: Math.min(100, p.progress + 10),
          waitingApproval: hasRemainingApproval,
          roadmap: updatedRoadmap,
          lastUpdated: 'Just now'
        }
      })
    )

    // Update locally selected agent state
    if (selectedAgent && selectedAgent.id === nodeId) {
      setSelectedAgent((prev) => ({
        ...prev,
        status: 'Completed',
        statusKey: 'completed',
        date: 'Approved Just Now',
        actionRequired: null,
        hasApproval: false
      }))
    }

    setToast({
      title: 'Approval Recorded',
      body: 'You have approved this stage. Dependent workflow steps have proceeded to the next phase.',
      tone: 'success'
    })
  }

  // Request changes interaction
  const handleRequestChanges = (nodeId) => {
    if (!changesComment.trim()) return

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== currentProject.id) return p

        const updatedRoadmap = p.roadmap.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              status: 'Changes Requested',
              statusKey: 'changes_requested',
              date: 'Feedback Submitted',
              feedbackNote: changesComment
            }
          }
          return node
        })

        return {
          ...p,
          roadmap: updatedRoadmap,
          lastUpdated: 'Just now'
        }
      })
    )

    if (selectedAgent && selectedAgent.id === nodeId) {
      setSelectedAgent((prev) => ({
        ...prev,
        status: 'Changes Requested',
        statusKey: 'changes_requested',
        date: 'Feedback Submitted',
        feedbackNote: changesComment
      }))
    }

    setChangesModalOpen(false)
    setChangesComment('')

    setToast({
      title: 'Feedback Sent to Agent Team',
      body: 'Your change request has been delivered. The assigned team will make revisions and resubmit.',
      tone: 'info'
    })
  }

  const handleSendAiQuery = (queryText) => {
    const q = (queryText || inputQuery).trim()
    if (!q) return

    const userMsg = { id: `user-${Date.now()}`, sender: 'user', text: q }
    setMessages((prev) => [...prev, userMsg])
    setInputQuery('')
    setIsTyping(true)

    setTimeout(() => {
      const answer = getProjectAiResponse(currentProject.id, q, currentProject)
      const aiMsg = { id: `ai-${Date.now()}`, sender: 'ai', text: answer }
      setMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, 500)
  }

  const handleDownloadDoc = (doc) => {
    setToast({
      title: 'Download started (simulated)',
      body: `Downloading "${doc.name}" (${doc.size || 'File'}). File will be saved to your device.`,
      tone: 'success'
    })
  }

  const projectSuggestions = [
    'What has been completed so far?',
    'What did the Sales Agent do?',
    'Explain the work completed by the Creative Agent',
    'Why is the project waiting for approval?',
    'What is the next agent in the workflow?'
  ]

  const filteredDocuments = useMemo(() => {
    const docs = currentProject.documents || []
    return docs.filter((d) => {
      if (docCategory !== 'all' && d.type !== docCategory) return false
      if (docSearch.trim()) {
        const q = docSearch.toLowerCase()
        if (!d.name.toLowerCase().includes(q) && !d.category.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [currentProject.documents, docSearch, docCategory])

  // Split roadmap into rows of 3 for the continuous snake connected diagram
  const roadmapRows = useMemo(() => {
    const nodes = currentProject.roadmap || []
    const rows = []
    const itemsPerRow = 3
    for (let i = 0; i < nodes.length; i += itemsPerRow) {
      rows.push(nodes.slice(i, i + itemsPerRow))
    }
    return rows
  }, [currentProject.roadmap])

  return (
    <div className="space-y-6 pb-24">
      {/* 1. PROJECT HEADER */}
      <div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition mb-3"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Projects
        </Link>

        {/* Compact & Professional Header Card */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            {/* Left: Thumbnail & Project Meta */}
            <div className="flex items-start gap-4">
              <img
                src={currentProject.image}
                alt={currentProject.name}
                className="h-16 w-16 rounded-2xl object-cover ring-1 ring-slate-200 shrink-0 shadow-xs"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="text-xl font-bold tracking-tight text-slate-900">
                    {currentProject.name}
                  </h2>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      currentProject.statusKey === 'completed'
                        ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                        : currentProject.waitingApproval
                        ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                        : 'bg-teal-50 text-teal-700 ring-1 ring-teal-200'
                    }`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {currentProject.statusKey === 'completed'
                      ? 'Completed'
                      : currentProject.waitingApproval
                      ? 'Waiting for Approval'
                      : currentProject.status}
                  </span>
                </div>

                <p className="mt-1 text-xs text-slate-400 font-medium">
                  {currentProject.id} · <span className="text-slate-600">{currentProject.category}</span>
                </p>

                <p className="mt-2 text-xs text-slate-600 max-w-2xl line-clamp-2 leading-relaxed">
                  {currentProject.shortDesc || currentProject.description}
                </p>
              </div>
            </div>

            {/* Right: Dates, Progress & Project Manager */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 shrink-0">
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Start Date</p>
                <p className="mt-1 text-xs font-bold text-slate-900">{currentProject.startDate}</p>
              </div>

              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                  {currentProject.completedDate ? 'Delivered Date' : 'Expected Completion'}
                </p>
                <p className="mt-1 text-xs font-bold text-slate-900">
                  {currentProject.completedDate || currentProject.dueDate}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1">
                  <span>{currentProject.progress}%</span>
                  <span className="text-[10px] text-slate-400 ml-2">Overall Progress</span>
                </div>
                <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      currentProject.statusKey === 'completed'
                        ? 'bg-emerald-500'
                        : currentProject.waitingApproval
                        ? 'bg-amber-500'
                        : 'bg-teal-600'
                    }`}
                    style={{ width: `${currentProject.progress}%` }}
                  />
                </div>
              </div>

              {currentProject.projectManager && (
                <div className="flex items-center gap-2.5 pl-4 border-l border-slate-100">
                  <img
                    src={currentProject.projectManagerAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
                    alt={currentProject.projectManager}
                    className="h-8 w-8 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">Project Manager</p>
                    <p className="text-xs font-bold text-slate-900 leading-tight">{currentProject.projectManager}</p>
                    <p className="text-[10px] text-slate-500 leading-tight">{currentProject.projectManagerRole || 'Client Lead'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. PROJECT NAVIGATION TABS (Strictly 4) */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('tracker')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'tracker'
              ? 'bg-[#0d3835] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Route className="h-4 w-4" />
          <span>Project Tracker</span>
        </button>

        <button
          onClick={() => setActiveTab('details')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'details'
              ? 'bg-[#0d3835] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <List className="h-4 w-4" />
          <span>Details</span>
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'documents'
              ? 'bg-[#0d3835] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <FileBox className="h-4 w-4" />
          <span>Documents ({currentProject.documents?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('ai_chat')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'ai_chat'
              ? 'bg-[#0d3835] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Bot className="h-4 w-4" />
          <span>AI Chat</span>
        </button>
      </div>

      {/* TAB 1: PROJECT TRACKER — MAIN CONNECTED EXECUTION ROADMAP */}
      {activeTab === 'tracker' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Roadmap Area (7 or 8 columns if drawer open, 12 if closed) */}
          <div className={`${agentDrawerOpen && selectedAgent ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-6 transition-all duration-300`}>
            {/* Roadmap Header & View Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
              <div>
                <h3 className="text-base font-bold text-slate-900">Project Execution Roadmap</h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  End-to-end progress showing how our AI agents work together on your project.
                </p>
              </div>

              {/* View Toggle */}
              <div className="flex items-center rounded-xl bg-slate-100 p-1 text-xs font-semibold self-start sm:self-auto">
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`rounded-lg px-3 py-1.5 transition ${
                    viewMode === 'timeline'
                      ? 'bg-[#0d3835] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Timeline View
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`rounded-lg px-3 py-1.5 transition ${
                    viewMode === 'list'
                      ? 'bg-[#0d3835] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  List View
                </button>
              </div>
            </div>

            {/* TIMELINE VIEW (Snake multi-row connected roadmap) */}
            {viewMode === 'timeline' && (
              <div className="space-y-6">
                {roadmapRows.map((row, rowIdx) => (
                  <div key={`row-${rowIdx}`} className="relative">
                    {/* Row of 3 Cards connected with horizontal arrows */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
                      {row.map((node, nodeIdx) => {
                        const isSelected = selectedAgent?.id === node.id
                        const isLastInRow = nodeIdx === row.length - 1

                        return (
                          <div key={node.id} className="relative flex flex-col">
                            {/* Agent Step Card */}
                            <div
                              onClick={() => {
                                setSelectedAgent(node)
                                setAgentDrawerOpen(true)
                              }}
                              className={`cursor-pointer rounded-2xl border p-4 shadow-xs transition-all flex flex-col justify-between h-full ${
                                isSelected
                                  ? 'border-teal-600 ring-2 ring-teal-100 bg-white shadow-md'
                                  : node.hasApproval && node.statusKey === 'approval'
                                  ? 'border-amber-400 bg-amber-50/20 ring-1 ring-amber-200'
                                  : node.statusKey === 'in_progress'
                                  ? 'border-sky-300 bg-white ring-1 ring-sky-100'
                                  : node.statusKey === 'completed'
                                  ? 'border-slate-200/90 bg-white hover:border-teal-300'
                                  : 'border-slate-200 bg-white opacity-80 hover:opacity-100'
                              }`}
                            >
                              <div>
                                {/* Top: Number Badge, Avatar, Name/ID, Status Badge */}
                                <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-100">
                                  <div className="flex items-center gap-2.5">
                                    {/* Number Circle */}
                                    <div
                                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold ${
                                        node.statusKey === 'completed'
                                          ? 'bg-teal-600 text-white'
                                          : node.statusKey === 'in_progress'
                                          ? 'bg-sky-600 text-white'
                                          : node.statusKey === 'approval'
                                          ? 'bg-amber-500 text-white'
                                          : 'bg-slate-200 text-slate-600'
                                      }`}
                                    >
                                      {node.number}
                                    </div>

                                    {/* Avatar */}
                                    {node.isAutomated ? (
                                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                                        <Cpu className="h-4 w-4" />
                                      </div>
                                    ) : (
                                      <img
                                        src={node.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                                        alt={node.name}
                                        className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-slate-200"
                                      />
                                    )}

                                    {/* Name & ID */}
                                    <div className="min-w-0">
                                      <div className="flex items-center gap-1">
                                        <p className="text-xs font-bold text-slate-900 truncate">{node.name}</p>
                                        <span className="text-[10px] font-mono text-slate-400">{node.agentId}</span>
                                      </div>
                                      <p className="text-[10px] text-slate-500 truncate">{node.role}</p>
                                    </div>
                                  </div>

                                  {/* Status Badge */}
                                  <span
                                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold shrink-0 ${
                                      node.statusKey === 'completed'
                                        ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                                        : node.statusKey === 'in_progress'
                                        ? 'bg-sky-50 text-sky-700 ring-1 ring-sky-200'
                                        : node.statusKey === 'approval'
                                        ? 'bg-amber-100 text-amber-800 ring-1 ring-amber-300'
                                        : node.statusKey === 'changes_requested'
                                        ? 'bg-purple-50 text-purple-700 ring-1 ring-purple-200'
                                        : 'bg-slate-100 text-slate-600'
                                    }`}
                                  >
                                    {node.statusKey === 'approval' && <span className="text-amber-600">⭐</span>}
                                    {node.statusKey === 'completed' && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                                    <span>{node.status}</span>
                                  </span>
                                </div>

                                {/* Title of Assigned Work */}
                                <h4 className="mt-3 text-xs font-bold text-slate-900 leading-snug">
                                  {node.title}
                                </h4>

                                {/* Short description */}
                                <p className="mt-1 text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                                  {node.description}
                                </p>
                              </div>

                              {/* Bottom: Date & Approval Action Buttons if Applicable */}
                              <div className="mt-3.5 pt-2.5 border-t border-slate-100/80">
                                {node.hasApproval && node.statusKey === 'approval' ? (
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between text-[10px] text-amber-800 font-bold">
                                      <span>Action Required</span>
                                      <span>{node.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 pt-1">
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          if (node.deliverables?.[0]) {
                                            setPreviewDoc({
                                              name: node.deliverables[0].name,
                                              size: node.deliverables[0].size,
                                              type: node.deliverables[0].type,
                                              category: 'Approval Document',
                                              taskRef: node.title
                                            })
                                          }
                                        }}
                                        className="btn-secondary py-1 px-2 text-[11px] font-semibold"
                                      >
                                        Preview
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleApproveStage(node.id)
                                        }}
                                        className="btn-primary py-1 px-3 text-[11px] font-bold bg-[#0d3835] hover:bg-[#144945]"
                                      >
                                        Approve
                                      </button>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          setSelectedAgent(node)
                                          setChangesModalOpen(true)
                                        }}
                                        className="rounded-xl border border-rose-200 px-2 py-1 text-[11px] font-bold text-rose-700 hover:bg-rose-50"
                                      >
                                        Request Changes
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-3 w-3" />
                                      <MessageSquare className="h-3 w-3" />
                                    </div>
                                    <span className="font-medium">{node.date}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Horizontal connector arrow to next item in same row */}
                            {!isLastInRow && (
                              <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-teal-600 pointer-events-none">
                                <ArrowRight className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {/* S-curve Serpentine Connector between rows (connecting right of row to left of next row) */}
                    {rowIdx < roadmapRows.length - 1 && (
                      <div className="relative my-2">
                        {/* Desktop serpentine S-connector */}
                        <div className="hidden lg:block h-7 w-full overflow-visible pointer-events-none">
                          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 28">
                            <defs>
                              <linearGradient id={`grad-${rowIdx}`} x1="100%" y1="0%" x2="0%" y2="0%">
                                <stop offset="0%" stopColor="#0d9488" />
                                <stop offset="50%" stopColor="#14b8a6" />
                                <stop offset="100%" stopColor="#0d9488" />
                              </linearGradient>
                            </defs>
                            {/* Connect from rightmost card (around x=980) down, across to left, and into leftmost card of next row (around x=20) */}
                            <path
                              d="M 980 -6 C 980 14, 960 14, 920 14 L 80 14 C 40 14, 20 14, 20 34"
                              fill="none"
                              stroke={`url(#grad-${rowIdx})`}
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                            {/* Small guidance arrow pointing down into next row */}
                            <polygon points="16,30 24,30 20,35" fill="#0d9488" />
                          </svg>
                        </div>

                        {/* Mobile & Tablet vertical indicator */}
                        <div className="flex lg:hidden items-center justify-center my-3 text-teal-600/70">
                          <div className="w-full flex items-center justify-between px-6">
                            <div className="h-0.5 w-1/4 bg-gradient-to-r from-transparent to-teal-200" />
                            <div className="flex items-center gap-1 text-[10px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full ring-1 ring-teal-200">
                              <span>Next Phase</span>
                              <ArrowDown className="h-3 w-3" />
                            </div>
                            <div className="h-0.5 w-1/4 bg-gradient-to-l from-transparent to-teal-200" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* LIST VIEW (Vertical Connected Pipeline) */}
            {viewMode === 'list' && (
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
                <div className="relative space-y-4 before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-teal-200">
                  {currentProject.roadmap?.map((node) => {
                    const isSelected = selectedAgent?.id === node.id

                    return (
                      <div
                        key={node.id}
                        onClick={() => {
                          setSelectedAgent(node)
                          setAgentDrawerOpen(true)
                        }}
                        className={`cursor-pointer relative flex items-start gap-4 p-4 rounded-xl border transition ${
                          isSelected
                            ? 'border-teal-600 bg-teal-50/20 ring-1 ring-teal-200 shadow-xs'
                            : 'border-slate-100 bg-white hover:border-slate-200'
                        }`}
                      >
                        {/* Number circle on line */}
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white z-10 ${
                            node.statusKey === 'completed'
                              ? 'bg-teal-600'
                              : node.statusKey === 'in_progress'
                              ? 'bg-sky-600'
                              : node.statusKey === 'approval'
                              ? 'bg-amber-500'
                              : 'bg-slate-300'
                          }`}
                        >
                          {node.number}
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-slate-900">{node.name}</h4>
                                <span className="font-mono text-xs text-slate-400">({node.agentId})</span>
                                <span className="text-xs text-slate-500">· {node.role}</span>
                              </div>
                              <p className="text-xs font-semibold text-teal-800 mt-0.5">{node.title}</p>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-slate-400">{node.date}</span>
                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                  node.statusKey === 'completed'
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : node.statusKey === 'in_progress'
                                    ? 'bg-sky-50 text-sky-700'
                                    : node.statusKey === 'approval'
                                    ? 'bg-amber-100 text-amber-800 ring-1 ring-amber-300'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {node.status}
                              </span>
                            </div>
                          </div>

                          <p className="mt-1 text-xs text-slate-600">{node.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Side Drawer / Details Panel (Matching Screen 3/4 layout) */}
          {agentDrawerOpen && selectedAgent && (
            <div className="lg:col-span-4 rounded-2xl border border-slate-200/90 bg-white shadow-card overflow-hidden sticky top-24">
              {/* Header with Close */}
              <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
                <button
                  onClick={() => setAgentDrawerOpen(false)}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Agent Details
                </button>
                <button
                  onClick={() => setAgentDrawerOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Agent Profile Summary */}
              <div className="p-5 border-b border-slate-100 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  {selectedAgent.isAutomated ? (
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 shadow-xs">
                      <Cpu className="h-6 w-6" />
                    </div>
                  ) : (
                    <img
                      src={selectedAgent.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'}
                      alt={selectedAgent.name}
                      className="h-12 w-12 rounded-2xl object-cover ring-2 ring-slate-100 shadow-xs"
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-base font-bold text-slate-900">{selectedAgent.name}</h4>
                      <span className="font-mono text-xs font-semibold text-slate-400">{selectedAgent.agentId}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{selectedAgent.role}</p>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    selectedAgent.statusKey === 'completed'
                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                      : selectedAgent.statusKey === 'in_progress'
                      ? 'bg-sky-50 text-sky-700 ring-1 ring-sky-200'
                      : selectedAgent.statusKey === 'approval'
                      ? 'bg-amber-100 text-amber-800 ring-1 ring-amber-300'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {selectedAgent.statusKey === 'approval' && <span>⭐</span>}
                  <span>{selectedAgent.status}</span>
                </span>
              </div>

              {/* Sub-tabs in Drawer: Overview | Work Details | Deliverables | Messages */}
              <div className="flex items-center gap-1 px-4 pt-3 border-b border-slate-100 text-xs font-semibold overflow-x-auto">
                {['overview', 'work', 'deliverables', 'messages'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setAgentTab(t)}
                    className={`rounded-lg px-3 py-1.5 capitalize transition whitespace-nowrap ${
                      agentTab === t
                        ? 'bg-teal-50 text-teal-800 font-bold'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {t === 'overview' ? 'Overview' : t === 'work' ? 'Work Details' : t === 'deliverables' ? 'Deliverables' : 'Messages'}
                  </button>
                ))}
              </div>

              {/* Drawer Content */}
              <div className="p-5 space-y-5 max-h-[560px] overflow-y-auto text-xs">
                {/* SUBTAB 1: OVERVIEW */}
                {agentTab === 'overview' && (
                  <div className="space-y-4">
                    {/* About this Agent */}
                    <div className="space-y-2.5">
                      <h5 className="font-bold text-slate-900 text-xs">About this Agent</h5>
                      <div className="divide-y divide-slate-100 text-xs">
                        <div className="flex items-center justify-between py-1.5">
                          <span className="text-slate-400">Department</span>
                          <span className="font-semibold text-slate-800 text-right">{selectedAgent.department}</span>
                        </div>
                        <div className="flex items-center justify-between py-1.5">
                          <span className="text-slate-400">Role in this Project</span>
                          <span className="font-semibold text-slate-800 text-right">{selectedAgent.roleInProject || selectedAgent.title}</span>
                        </div>
                        <div className="flex items-center justify-between py-1.5">
                          <span className="text-slate-400">Assigned Date</span>
                          <span className="font-semibold text-slate-800">{selectedAgent.date}</span>
                        </div>
                        <div className="flex items-center justify-between py-1.5">
                          <span className="text-slate-400">Current Status</span>
                          <span className="font-semibold text-amber-700">{selectedAgent.status}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed pt-1">
                        {selectedAgent.aboutDesc || selectedAgent.description}
                      </p>
                    </div>

                    {/* Work Summary Checklist */}
                    {selectedAgent.workSummary && (
                      <div className="pt-2 border-t border-slate-100 space-y-2">
                        <h5 className="font-bold text-slate-900 text-xs">Work Summary</h5>
                        <div className="space-y-2">
                          {selectedAgent.workSummary.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-[11px]">
                              {item.status === 'completed' ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                              ) : item.status === 'in_progress' ? (
                                <span className="h-3.5 w-3.5 rounded-full border-2 border-teal-600 border-t-transparent animate-spin shrink-0 mt-0.5" />
                              ) : (
                                <span className="h-3.5 w-3.5 rounded-full border border-slate-300 shrink-0 mt-0.5" />
                              )}
                              <div className="min-w-0 flex-1">
                                <p className="text-slate-800 font-medium">{item.label}</p>
                                <p className="text-[10px] text-slate-400">{item.date}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Deliverables Section */}
                    {selectedAgent.deliverables && selectedAgent.deliverables.length > 0 && (
                      <div className="pt-2 border-t border-slate-100 space-y-2">
                        <h5 className="font-bold text-slate-900 text-xs">Deliverables</h5>
                        <div className="space-y-2">
                          {selectedAgent.deliverables.map((del, dIdx) => (
                            <div
                              key={dIdx}
                              className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50/50"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <FileText className="h-4 w-4 text-rose-500 shrink-0" />
                                <div className="min-w-0">
                                  <p className="text-xs font-bold text-slate-900 truncate">{del.name}</p>
                                  <p className="text-[10px] text-slate-400">{del.size} · {del.desc}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setPreviewDoc({
                                      name: del.name,
                                      size: del.size,
                                      type: del.type,
                                      category: 'Deliverable',
                                      taskRef: selectedAgent.title
                                    })
                                  }
                                  className="p-1 text-slate-400 hover:text-slate-700"
                                  title="Preview"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDownloadDoc(del)}
                                  className="p-1 text-teal-700 hover:text-teal-900"
                                  title="Download"
                                >
                                  <Download className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Required Box (Amber alert box matching screenshot) */}
                    {selectedAgent.hasApproval && selectedAgent.statusKey === 'approval' && (
                      <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 space-y-3">
                        <div className="flex items-start gap-2 text-amber-900">
                          <Clock className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold">Action Required</p>
                            <p className="text-[11px] text-amber-800 mt-0.5">
                              {selectedAgent.actionRequired?.message || 'Your approval is needed to proceed to the next stage.'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              if (selectedAgent.deliverables?.[0]) {
                                setPreviewDoc({
                                  name: selectedAgent.deliverables[0].name,
                                  size: selectedAgent.deliverables[0].size,
                                  type: selectedAgent.deliverables[0].type,
                                  category: 'Budget Plan',
                                  taskRef: selectedAgent.title
                                })
                              }
                            }}
                            className="btn-secondary py-1.5 px-3 text-xs font-semibold flex-1"
                          >
                            Preview
                          </button>
                          <button
                            type="button"
                            onClick={() => handleApproveStage(selectedAgent.id)}
                            className="btn-primary py-1.5 px-4 text-xs font-bold bg-[#0d3835] hover:bg-[#144945] flex-1"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => setChangesModalOpen(true)}
                            className="rounded-xl border border-rose-300 bg-white py-1.5 px-3 text-xs font-bold text-rose-700 hover:bg-rose-50"
                          >
                            Request Changes
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* SUBTAB 2: WORK DETAILS */}
                {agentTab === 'work' && (
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-bold text-slate-900 text-xs mb-1">Inputs Received</h5>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-700 leading-relaxed">
                        {selectedAgent.inputs || 'Project charter and requirements from upstream stage.'}
                      </div>
                    </div>

                    <div>
                      <h5 className="font-bold text-slate-900 text-xs mb-1">Outputs Generated</h5>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-700 leading-relaxed">
                        {selectedAgent.outputs || 'Deliverables and analytical parameters passed to downstream team.'}
                      </div>
                    </div>

                    {selectedAgent.handoff && (
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <h5 className="font-bold text-slate-900 text-xs">Collaboration & Handoff</h5>
                        <div className="rounded-xl border border-slate-200 p-3 space-y-2 bg-slate-50/50 text-[11px]">
                          <div>
                            <span className="text-slate-400">Received from: </span>
                            <span className="font-bold text-slate-800">{selectedAgent.handoff.from}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Handed off to: </span>
                            <span className="font-bold text-slate-800">{selectedAgent.handoff.to}</span>
                          </div>
                          <p className="text-slate-600 italic mt-1 pt-1 border-t border-slate-200/50">
                            "{selectedAgent.handoff.notes}"
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* SUBTAB 3: DELIVERABLES */}
                {agentTab === 'deliverables' && (
                  <div className="space-y-3">
                    {selectedAgent.deliverables && selectedAgent.deliverables.length > 0 ? (
                      selectedAgent.deliverables.map((del, dIdx) => (
                        <div key={dIdx} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-rose-500 shrink-0" />
                              <div>
                                <p className="text-xs font-bold text-slate-900">{del.name}</p>
                                <p className="text-[10px] text-slate-400">{del.size} · {del.type}</p>
                              </div>
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-600">{del.desc}</p>
                          <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                            <button
                              type="button"
                              onClick={() =>
                                setPreviewDoc({
                                  name: del.name,
                                  size: del.size,
                                  type: del.type,
                                  category: 'Deliverable',
                                  taskRef: selectedAgent.title
                                })
                              }
                              className="btn-secondary py-1 px-2.5 text-xs flex-1"
                            >
                              Preview
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDownloadDoc(del)}
                              className="btn-primary py-1 px-2.5 text-xs bg-[#0d3835] hover:bg-[#144945] flex-1"
                            >
                              Download
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 text-center py-4">
                        No direct files associated with this agent node.
                      </p>
                    )}
                  </div>
                )}

                {/* SUBTAB 4: MESSAGES */}
                {agentTab === 'messages' && (
                  <div className="space-y-3">
                    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3 space-y-2.5">
                      <div className="flex items-center gap-2">
                        <img
                          src={selectedAgent.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'}
                          alt={selectedAgent.name}
                          className="h-6 w-6 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-bold text-slate-900">{selectedAgent.name} <span className="font-normal text-slate-400">· {selectedAgent.role}</span></p>
                          <p className="text-[10px] text-slate-400">{selectedAgent.date || 'Today'}</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-700 leading-relaxed pl-8">
                        {selectedAgent.handoff?.notes ||
                          `Stage review initiated for ${selectedAgent.title}. All deliverables have been submitted for review.`}
                      </p>
                    </div>

                    {selectedAgent.feedbackNote && (
                      <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-3 space-y-1.5">
                        <div className="flex items-center gap-2 text-rose-800">
                          <AlertTriangle className="h-4 w-4" />
                          <p className="text-[11px] font-bold">Feedback from Client</p>
                        </div>
                        <p className="text-[11px] text-rose-900 pl-6">
                          "{selectedAgent.feedbackNote}"
                        </p>
                      </div>
                    )}

                    <div className="pt-2 text-center">
                      <button
                        type="button"
                        onClick={() => setActiveTab('ai_chat')}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900"
                      >
                        <Bot className="h-3.5 w-3.5" /> Ask AI about this agent's work
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: DETAILS TAB */}
      {activeTab === 'details' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Objectives & Scope */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
            <h4 className="text-base font-bold text-slate-900">Project Objectives & Scope</h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              {currentProject.objectives?.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-slate-100">
              <h5 className="text-xs font-bold text-slate-900 mb-2">Agreed Key Deliverables</h5>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {currentProject.deliverablesList?.map((del, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-600 shrink-0" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Project Details Spec */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
            <h4 className="text-base font-bold text-slate-900">Project Parameters</h4>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-400">Category</span>
                <span className="font-semibold text-slate-800">{currentProject.category}</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-400">Client Organization</span>
                <span className="font-semibold text-slate-800">City Care Multispeciality Hospital</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-400">Project Manager</span>
                <span className="font-semibold text-slate-800">{currentProject.projectManager} ({currentProject.projectManagerRole})</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-400">Workflow Execution</span>
                <span className="font-semibold text-teal-700">{currentProject.roadmap?.length || 12} Assigned Agents</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-400">Start Date</span>
                <span className="font-semibold text-slate-800">{currentProject.startDate}</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-slate-400">Target Delivery</span>
                <span className="font-semibold text-slate-800">{currentProject.dueDate}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DOCUMENTS TAB */}
      {activeTab === 'documents' && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-slate-900">Documents & Deliverables</h4>
              <p className="text-xs text-slate-500">
                All outputs generated by AI agents for {currentProject.name}.
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search deliverables..."
                value={docSearch}
                onChange={(e) => setDocSearch(e.target.value)}
                className="input py-1.5 text-xs w-48"
              />
              <select
                value={docCategory}
                onChange={(e) => setDocCategory(e.target.value)}
                className="input py-1.5 text-xs w-36"
              >
                <option value="all">All Types</option>
                <option value="PDF">PDF Reports</option>
                <option value="Spreadsheet">Spreadsheets</option>
                <option value="Archive">Design Packs</option>
                <option value="Document">Word Docs</option>
              </select>
            </div>
          </div>

          {filteredDocuments.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-8">No matching deliverables found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-start justify-between p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-100">
                      <FileText className="h-5 w-5 text-rose-500" />
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-slate-900 truncate">{doc.name}</h5>
                      <p className="text-[11px] text-slate-400">{doc.category} · {doc.size}</p>
                      <p className="mt-1 text-[11px] text-slate-600 line-clamp-1">{doc.previewText}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <button
                      onClick={() => setPreviewDoc(doc)}
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                      title="Preview"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDownloadDoc(doc)}
                      className="rounded-lg p-2 text-teal-700 hover:bg-teal-50 hover:text-teal-900"
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: AI CHAT TAB */}
      {activeTab === 'ai_chat' && (
        <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs max-w-3xl mx-auto flex flex-col h-[600px] overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0d3835] text-white">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Project AI Assistant</h4>
                <p className="text-[11px] text-slate-500">Dedicated solely to {currentProject.name}</p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md font-semibold">
              Project Isolated
            </span>
          </div>

          {/* Chat Thread */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-start gap-2.5 ${
                  m.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {m.sender === 'ai' && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[#0d3835] text-white">
                    <Sparkles className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`rounded-2xl p-3.5 max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-teal-600 text-white rounded-br-xs font-medium'
                      : 'bg-slate-50 text-slate-800 border border-slate-200/70 rounded-bl-xs'
                  }`}
                >
                  <p>{m.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs pl-9">
                <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-ping" />
                <span>AI assistant is querying project execution history...</span>
              </div>
            )}
          </div>

          {/* Suggested question chips */}
          <div className="p-3 border-t border-slate-100 bg-slate-50/50">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Suggested Questions:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {projectSuggestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSendAiQuery(q)}
                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:border-teal-300 hover:bg-teal-50/50 transition truncate max-w-full"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendAiQuery()
            }}
            className="p-3 border-t border-slate-100 bg-white flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask a question about this project's roadmap, agents or deliverables..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="input py-2 text-xs flex-1 rounded-xl"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0d3835] text-white hover:bg-[#144743] disabled:opacity-40 transition"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* REQUEST CHANGES FEEDBACK MODAL */}
      {changesModalOpen && selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-pop space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-base font-bold text-slate-900">Request Revisions</h4>
              <button onClick={() => setChangesModalOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100">
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Provide feedback for <span className="font-bold text-slate-900">{selectedAgent.name} ({selectedAgent.role})</span> on the <span className="font-semibold">{selectedAgent.title}</span> stage.
            </p>

            <textarea
              rows={4}
              placeholder="Specify the changes or adjustments required (e.g. adjust Google Search budget to ₹40k, focus Meta ads on private birthing suites)..."
              value={changesComment}
              onChange={(e) => setChangesComment(e.target.value)}
              className="input text-xs"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setChangesModalOpen(false)}
                className="btn-secondary text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!changesComment.trim()}
                onClick={() => handleRequestChanges(selectedAgent.id)}
                className="btn-primary text-xs bg-[#0d3835] hover:bg-[#144743]"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
