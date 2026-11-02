import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Layers, Clock, UserCheck, CheckCircle2, AlertTriangle, Plus, Search,
  Filter, ArrowRight, ExternalLink, Image, Video, FileText, Package, Megaphone,
  Sparkles, Check, ChevronRight, TrendingUp, TrendingDown, Minus, RefreshCw,
  X, CheckSquare, Eye, ShieldAlert, BarChart3
} from 'lucide-react'
import { Card, Badge, ProgressBar } from '../components/ui'
import {
  initialContentItems,
  initialCampaigns,
  initialSeoItems
} from '../data/marketingContentData'
import ContentItemDetail from './ContentItemDetail'
import { useApp } from '../state/AppContext'

export default function Marketing() {
  const { id, contentId } = useParams()
  const navigate = useNavigate()
  const { toast } = useApp()

  // If URL has an ID parameter, show the detail page
  if (id || contentId) {
    return <ContentItemDetail />
  }

  const [activeTab, setActiveTab] = useState('production')
  const [items, setItems] = useState(initialContentItems)
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [seoItems, setSeoItems] = useState(initialSeoItems)

  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [clientFilter, setClientFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  // Create Modal
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [createForm, setCreateForm] = useState({
    title: '',
    client: 'City Care Hospital',
    type: 'Social Media',
    due: '15 Nov 2026',
    owner: 'K. Sharma',
    objective: ''
  })

  // Filtered Content Items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.client.toLowerCase().includes(searchQuery.toLowerCase())

      const matchClient =
        clientFilter === 'all' || item.client.toLowerCase().includes(clientFilter.toLowerCase())

      const matchType =
        typeFilter === 'all' || item.type.toLowerCase().includes(typeFilter.toLowerCase())

      const matchStatus =
        statusFilter === 'all' || item.status.toLowerCase().includes(statusFilter.toLowerCase())

      return matchSearch && matchClient && matchType && matchStatus
    })
  }, [items, searchQuery, clientFilter, typeFilter, statusFilter])

  const handleCreateSubmit = (e) => {
    e.preventDefault()
    if (!createForm.title.trim()) {
      toast('Please enter a content deliverable title.', 'warning')
      return
    }

    const nextId = `CNT-00${items.length + 1}`
    const newItem = {
      id: nextId,
      title: createForm.title,
      client: createForm.client,
      clientId: 'CLIENT-001',
      project: 'Brand & Content Operations',
      type: createForm.type,
      contentTypeBadge: createForm.type,
      version: 'v1',
      progress: 15,
      status: 'In Production',
      statusColor: 'blue',
      due: createForm.due,
      owner: createForm.owner,
      ownerInitials: createForm.owner.split(' ').map((n) => n[0]).join('').substring(0, 2),
      ownerDept: 'Creative & Content (CRT)',
      assignedPosition: 'CRT-004 (Content Specialist)',
      qaStatus: 'Drafting initiated',
      clientApprovalStatus: 'Not submitted yet',
      publishingStatus: 'In production',
      brief: {
        objective: createForm.objective || 'Deliver approved content assets for client campaign.',
        targetAudience: 'Target patient & community demographic.',
        keyMessage: createForm.title,
        format: 'Approved client format specification',
        brandGuidelines: 'Client Brand Identity v2.0',
        createdDate: 'Today by Marketing Lead'
      },
      currentVersion: {
        version: 'v1',
        label: 'v1 - Initial Draft',
        createdDate: 'Today',
        headline: createForm.title,
        bodyText: createForm.objective || 'Drafting in progress under creative guidelines.',
        assetName: 'draft_spec_v1.pdf',
        assetSize: '240 KB'
      },
      reviewStatus: [
        { name: 'Draft created', date: 'Today', status: 'approved', reviewer: 'Creative Team' },
        { name: 'Creative review', date: 'Pending', status: 'in_review', reviewer: 'Creative Lead' },
        { name: 'Brand review', date: 'Pending', status: 'pending', reviewer: 'Brand Specialist' },
        { name: 'QA review', date: 'Pending', status: 'pending', reviewer: 'Content QA' },
        { name: 'Client approval', date: 'Pending', status: 'pending', reviewer: 'Client Admin' },
        { name: 'Publishing', date: 'Pending', status: 'pending', reviewer: 'Channel Publisher' }
      ]
    }

    setItems([newItem, ...items])
    setCreateModalOpen(false)
    setCreateForm({
      title: '',
      client: 'City Care Hospital',
      type: 'Social Media',
      due: '15 Nov 2026',
      owner: 'K. Sharma',
      objective: ''
    })
    toast(`Content deliverable ${nextId} created successfully.`, 'success')
  }

  const getTypeIcon = (type) => {
    const t = (type || '').toLowerCase()
    if (t.includes('video')) return <Video className="h-4 w-4 text-rose-600" />
    if (t.includes('blog') || t.includes('article')) return <FileText className="h-4 w-4 text-emerald-600" />
    if (t.includes('pack')) return <Package className="h-4 w-4 text-purple-600" />
    if (t.includes('ad')) return <Megaphone className="h-4 w-4 text-indigo-600" />
    return <Image className="h-4 w-4 text-blue-600" />
  }

  const getTypeBg = (type) => {
    const t = (type || '').toLowerCase()
    if (t.includes('video')) return 'bg-rose-50 border-rose-200'
    if (t.includes('blog') || t.includes('article')) return 'bg-emerald-50 border-emerald-200'
    if (t.includes('pack')) return 'bg-purple-50 border-purple-200'
    if (t.includes('ad')) return 'bg-indigo-50 border-indigo-200'
    return 'bg-blue-50 border-blue-200'
  }

  const getStatusBadge = (status) => {
    const s = (status || '').toLowerCase()
    if (s.includes('blocked')) {
      return (
        <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-rose-50 text-rose-700 border border-rose-200 inline-flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" /> Blocked
        </span>
      )
    }
    if (s.includes('client review') || s.includes('client')) {
      return (
        <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-teal-50 text-teal-700 border border-teal-200 inline-flex items-center gap-1">
          <Clock className="h-3 w-3" /> Client Review
        </span>
      )
    }
    if (s.includes('in review') || s.includes('review')) {
      return (
        <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-amber-50 text-amber-700 border border-amber-200 inline-flex items-center gap-1">
          <Clock className="h-3 w-3" /> In Review
        </span>
      )
    }
    if (s.includes('ready') || s.includes('approved')) {
      return (
        <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" /> {status}
        </span>
      )
    }
    return (
      <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-700 border border-blue-200 inline-flex items-center gap-1">
        <Sparkles className="h-3 w-3" /> In Production
      </span>
    )
  }

  return (
    <div className="space-y-6 p-4 lg:p-6 max-w-7xl mx-auto pb-16">
      {/* 1. Header matching Panel 2 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">Marketing & Content</h1>
          <p className="text-xs lg:text-sm text-slate-600 mt-1">
            Plan, produce and track marketing content, campaigns and growth activities.
          </p>
        </div>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" /> Create Content
        </button>
      </div>

      {/* 2. Top Metric Cards matching Panel 2 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Content in Production (42) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-600">Content in Production</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Layers className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">42</div>
        </div>

        {/* Card 2: Awaiting Review (8) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-600">Awaiting Review</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">8</div>
        </div>

        {/* Card 3: Awaiting Client Approval (6) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-600">Awaiting Client Approval</span>
            <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600">
              <UserCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">6</div>
        </div>

        {/* Card 4: Approved Deliverables (28) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-600">Approved Deliverables</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">28</div>
        </div>

        {/* Card 5: Blocked Items (5) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-600">Blocked Items</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">5</div>
        </div>
      </div>

      {/* 3. Four Tabs matching Panel 2 */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-6 overflow-x-auto">
          {[
            { id: 'production', label: 'Content production' },
            { id: 'creative', label: 'Creative review' },
            { id: 'campaigns', label: 'Campaigns & paid media' },
            { id: 'seo', label: 'SEO & growth' }
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

      {/* TAB 1: CONTENT PRODUCTION BOARD MATCHING PANEL 2 */}
      {activeTab === 'production' && (
        <div className="space-y-4">
          {/* Filter and Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="h-4 w-4 text-slate-600 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search content by title, client or content ID..."
                className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={clientFilter}
                onChange={(e) => setClientFilter(e.target.value)}
                className="text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-1 focus:ring-indigo-500"
              >
                <option value="all">All clients</option>
                <option value="City Care">City Care Hospital</option>
                <option value="Nirvaan">Nirvaan Wellness</option>
                <option value="MediScan">MediScan Diagnostics</option>
                <option value="Arogya">Arogya Ayurveda</option>
                <option value="Sunrise">Sunrise Dental Studio</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-1 focus:ring-indigo-500"
              >
                <option value="all">All types</option>
                <option value="Social Media">Social Media</option>
                <option value="Blog">Blog Article</option>
                <option value="Video">Video</option>
                <option value="Content Pack">Content Pack</option>
                <option value="Paid Ads">Paid Ads</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-1 focus:ring-indigo-500"
              >
                <option value="all">All status</option>
                <option value="In Production">In Production</option>
                <option value="In Review">In Review</option>
                <option value="Client Review">Client Review</option>
                <option value="Ready for Approval">Ready for Approval</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
          </div>

          {/* Content Items List matching Panel 2 */}
          <div className="space-y-3">
            {filteredItems.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-xs text-slate-600">
                No content items match the selected filters.
              </div>
            ) : (
              filteredItems.map((c) => (
                <div
                  key={c.id}
                  onClick={() => navigate(`/marketing/${c.id}`)}
                  className="bg-white rounded-xl border border-slate-200 p-4 hover:border-indigo-300 hover:shadow-xs transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  {/* Left: Icon, Title, Subtitle, Badges, Progress */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${getTypeBg(
                        c.type
                      )}`}
                    >
                      {getTypeIcon(c.type)}
                    </div>

                    <div className="space-y-2 flex-1 min-w-0 max-w-xl">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-900 truncate hover:text-indigo-600 transition-colors">
                            {c.title}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-600">
                          {c.id} · {c.client}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] px-2 py-0.5 rounded font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {c.type}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded font-mono font-semibold bg-slate-100 text-slate-700">
                          {c.version}
                        </span>
                      </div>

                      {/* Progress Bar matching Panel 2 */}
                      <div className="flex items-center gap-2.5 max-w-md pt-0.5">
                        <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              c.status.toLowerCase().includes('blocked')
                                ? 'bg-rose-500'
                                : c.progress >= 90
                                ? 'bg-emerald-500'
                                : 'bg-indigo-600'
                            }`}
                            style={{ width: `${c.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-600">{c.progress}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Status badge, Due date, Avatar */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    {getStatusBadge(c.status)}
                    <div className="text-xs text-slate-600 font-medium">Due {c.due}</div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-[10px] text-slate-700">
                        {c.ownerInitials || 'AG'}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CREATIVE REVIEW */}
      {activeTab === 'creative' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 mb-1">Creative Review & Quality Assurance</h2>
            <p className="text-xs text-slate-600 mb-4">
              Deliverables awaiting internal creative check, clinical claim screening, or client review.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items
                .filter((c) =>
                  ['In Review', 'Ready for Approval', 'Blocked'].includes(c.status)
                )
                .map((c) => (
                  <div
                    key={c.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-300 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-mono text-slate-600">{c.id}</span>
                        <h4 className="text-sm font-bold text-slate-900">{c.title}</h4>
                        <p className="text-xs text-slate-600">{c.client} · {c.version}</p>
                      </div>
                      {getStatusBadge(c.status)}
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">QA Progress:</span>
                        <span className="font-semibold text-slate-800">{c.qaStatus}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Assigned Reviewer:</span>
                        <span className="font-semibold text-slate-800">{c.assignedPosition}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-slate-600">Target Due: {c.due}</span>
                      <button
                        onClick={() => navigate(`/marketing/${c.id}`)}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
                      >
                        Inspect Review <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CAMPAIGNS & PAID MEDIA */}
      {activeTab === 'campaigns' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Paid Media Campaigns & Ad Spend</h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Platform connections, active budgets, performance telemetry, and commercial authority thresholds.
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg inline-flex items-center gap-1.5 self-start">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Platform APIs Connected
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <th className="p-3.5">Campaign Name</th>
                    <th className="p-3.5">Client & Channel</th>
                    <th className="p-3.5">Monthly Budget</th>
                    <th className="p-3.5">Current Spend</th>
                    <th className="p-3.5">CPC / CPA</th>
                    <th className="p-3.5">Conversions</th>
                    <th className="p-3.5">Platform Status</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {campaigns.map((camp) => (
                    <tr key={camp.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{camp.name}</div>
                        <div className="text-[11px] font-mono text-slate-600">{camp.id}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-medium text-slate-800">{camp.client}</div>
                        <div className="text-[11px] text-slate-600">{camp.channel}</div>
                      </td>
                      <td className="p-3.5 font-bold text-slate-900">
                        ₹{(camp.budgetMonthly).toLocaleString('en-IN')}
                      </td>
                      <td className="p-3.5">
                        <div className="font-semibold text-slate-800">
                          ₹{(camp.spendCurrent).toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-slate-600">
                          {Math.round((camp.spendCurrent / camp.budgetMonthly) * 100)}% utilized
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-medium text-slate-800">{camp.cpc}</div>
                        <div className="text-[11px] text-slate-600">CPA: {camp.cpa}</div>
                      </td>
                      <td className="p-3.5 font-semibold text-slate-800">
                        {camp.conversions > 0 ? camp.conversions : '—'}
                      </td>
                      <td className="p-3.5">
                        <span className="text-[11px] px-2 py-0.5 rounded font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {camp.platformConnection}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                            camp.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : camp.status === 'Awaiting Approval'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {camp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-amber-50 border-t border-amber-200 flex items-start gap-3 text-xs text-amber-800">
              <ShieldAlert className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Human Commercial Authority Rule:</span> Any ad spend commitment exceeding ₹50,000/month or external campaign activation requires verified human sign-off via Tasks & Approvals.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SEO & GROWTH */}
      {activeTab === 'seo' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-slate-200">
              <h2 className="text-sm font-bold text-slate-900">Organic Search Rankings & Traffic Trends</h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Target keyword positions, URL rankings, and monthly organic patient search intent.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <th className="p-3.5">Monitored Keyword</th>
                    <th className="p-3.5">Client & Target Page</th>
                    <th className="p-3.5">Current Position</th>
                    <th className="p-3.5">Previous (30d)</th>
                    <th className="p-3.5">Organic Traffic</th>
                    <th className="p-3.5">Trajectory</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {seoItems.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">
                        "{item.kw}"
                      </td>
                      <td className="p-3.5">
                        <div className="font-medium text-slate-800">{item.client}</div>
                        <div className="text-[11px] font-mono text-indigo-600">{item.page}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="text-sm font-bold text-slate-900">#{item.pos}</span>
                      </td>
                      <td className="p-3.5 text-slate-600">
                        #{item.prev}
                      </td>
                      <td className="p-3.5 font-semibold text-slate-800">
                        {item.traffic.toLocaleString()} visits/mo
                      </td>
                      <td className="p-3.5">
                        {item.status === 'Improving' && (
                          <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" /> Improving (+{item.prev - item.pos})
                          </span>
                        )}
                        {item.status === 'Stable' && (
                          <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-700 border border-blue-200 inline-flex items-center gap-1">
                            <Minus className="h-3 w-3" /> Stable
                          </span>
                        )}
                        {item.status === 'Declining' && (
                          <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-rose-50 text-rose-700 border border-rose-200 inline-flex items-center gap-1">
                            <TrendingDown className="h-3 w-3" /> Declining ({item.prev - item.pos})
                          </span>
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

      {/* Create Content Deliverable Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Create Content Deliverable</h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Initialize a new creative asset in the content production pipeline.
                </p>
              </div>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-1 rounded-lg text-slate-600 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Deliverable Title *
                </label>
                <input
                  type="text"
                  required
                  value={createForm.title}
                  onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                  placeholder="e.g. Hypertension Awareness Infographic"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Client Organisation
                  </label>
                  <select
                    value={createForm.client}
                    onChange={(e) => setCreateForm({ ...createForm, client: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="City Care Hospital">City Care Hospital</option>
                    <option value="Nirvaan Wellness">Nirvaan Wellness</option>
                    <option value="MediScan Diagnostics">MediScan Diagnostics</option>
                    <option value="Arogya Ayurveda">Arogya Ayurveda</option>
                    <option value="Sunrise Dental Studio">Sunrise Dental Studio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Deliverable Type
                  </label>
                  <select
                    value={createForm.type}
                    onChange={(e) => setCreateForm({ ...createForm, type: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="Social Media">Social Media Post</option>
                    <option value="Blog">Blog Article</option>
                    <option value="Video">Video / Reel</option>
                    <option value="Content Pack">Content Pack</option>
                    <option value="Paid Ads">Paid Ad Creative</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Deadline
                  </label>
                  <input
                    type="text"
                    value={createForm.due}
                    onChange={(e) => setCreateForm({ ...createForm, due: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Assigned Owner
                  </label>
                  <input
                    type="text"
                    value={createForm.owner}
                    onChange={(e) => setCreateForm({ ...createForm, owner: e.target.value })}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Brief Objective & Key Message
                </label>
                <textarea
                  rows={2}
                  value={createForm.objective}
                  onChange={(e) => setCreateForm({ ...createForm, objective: e.target.value })}
                  placeholder="Outline core message and clinical accuracy requirements..."
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
                >
                  Create Deliverable
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
