import { useState, useMemo } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import {
  TrendingUp, Search, Plus, Filter, Users, Sparkles, Building2,
  Calendar, CheckCircle2, Clock, AlertTriangle, ArrowRight, LayoutGrid, Table as TableIcon,
  ChevronRight, ArrowUpRight, Globe, Check
} from 'lucide-react'
import { initialOpportunities, pipelineStages } from '../data/salesPipelineData'
import SalesOpportunityDetail from './SalesOpportunityDetail'
import { useApp } from '../state/AppContext'

export default function Sales() {
  const { id, opportunityId } = useParams()
  if (id || opportunityId) {
    return <SalesOpportunityDetail opportunityId={id || opportunityId} />
  }

  const navigate = useNavigate()
  const { toast } = useApp()
  const [opportunities, setOpportunities] = useState(initialOpportunities)
  const [query, setQuery] = useState('')
  const [stageFilter, setStageFilter] = useState('all')
  const [industryFilter, setIndustryFilter] = useState('all')
  const [ownerFilter, setOwnerFilter] = useState('all')
  const [viewMode, setViewMode] = useState('kanban') // 'kanban' | 'list'
  const [addModalOpen, setAddModalOpen] = useState(false)

  // New opportunity form
  const [newOpp, setNewOpp] = useState({
    name: '',
    industry: 'Dental Clinic',
    location: '',
    contactPerson: '',
    email: '',
    phone: '',
    value: 5000000,
    owner: 'K. Sharma',
    stage: 'discovered'
  })

  // Filtered opportunities
  const filtered = useMemo(() => {
    return opportunities.filter((o) => {
      if (query) {
        const q = query.toLowerCase()
        const matchesName = o.name.toLowerCase().includes(q)
        const matchesId = o.id.toLowerCase().includes(q)
        const matchesContact = o.organisationDetails?.contactPerson?.toLowerCase().includes(q)
        if (!matchesName && !matchesId && !matchesContact) return false
      }
      if (stageFilter !== 'all' && o.stage !== stageFilter) return false
      if (industryFilter !== 'all' && !o.industry.toLowerCase().includes(industryFilter.toLowerCase())) return false
      if (ownerFilter !== 'all' && o.owner !== ownerFilter) return false
      return true
    })
  }, [opportunities, query, stageFilter, industryFilter, ownerFilter])

  // Top Business Metrics (Matching Panel 1)
  const totalCount = 52
  const discoveredCount = 14
  const qualifiedCount = 18
  const awaitingApprovalCount = 8
  const awaitingResponseCount = 7
  const approvedScopeCount = 5

  const handleAddOpportunity = (e) => {
    e.preventDefault()
    if (!newOpp.name) return
    const idNum = opportunities.length + 1
    const createdId = `OPP-${String(idNum).padStart(3, '0')}`
    const stageObj = pipelineStages.find((s) => s.id === newOpp.stage) || pipelineStages[0]

    const created = {
      id: createdId,
      name: newOpp.name,
      industry: newOpp.industry,
      location: newOpp.location || 'India',
      city: newOpp.location || 'India',
      stage: newOpp.stage,
      stageName: stageObj.name,
      qualificationScore: 65,
      value: Number(newOpp.value) || 5000000,
      formattedValue: `₹${(Number(newOpp.value) / 100000).toFixed(0)}L`,
      valueType: 'Estimated',
      probability: 50,
      expectedClose: 'Q1 2027',
      discoverySource: 'Manual SBD Inbound',
      sourceTag: 'Newly Discovered',
      assignedPosition: 'SBD-002 (Inbound Lead Qualifier)',
      owner: newOpp.owner,
      ownerInitials: newOpp.owner.slice(0, 2).toUpperCase(),
      ownerAvatarBg: 'bg-indigo-600',
      daysAgo: 'Just now',
      lastActivity: 'Just now',
      nextAction: 'Qualify requirements',
      pendingApproval: false,
      organisationDetails: {
        name: newOpp.name,
        industry: newOpp.industry,
        location: newOpp.location,
        contactPerson: newOpp.contactPerson,
        email: newOpp.email,
        phone: newOpp.phone,
        description: 'Newly captured commercial prospect.'
      },
      stepperStages: [
        { name: 'Discovered', date: 'Today', status: 'current' }
      ]
    }

    setOpportunities([created, ...opportunities])
    setAddModalOpen(false)
    setNewOpp({
      name: '',
      industry: 'Dental Clinic',
      location: '',
      contactPerson: '',
      email: '',
      phone: '',
      value: 5000000,
      owner: 'K. Sharma',
      stage: 'discovered'
    })
    toast?.({ title: 'Opportunity Added', body: `${created.name} (${created.id}) created successfully.` })
  }

  const distinctIndustries = useMemo(() => {
    return Array.from(new Set(opportunities.map((o) => o.industry.split(' ')[0])))
  }, [opportunities])

  const distinctOwners = useMemo(() => {
    return Array.from(new Set(opportunities.map((o) => o.owner)))
  }, [opportunities])

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Top Header matching Panel 1 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Sales Pipeline & Leads
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Discover and qualify prospects, manage opportunities, and track progress to approved commercial scope.
          </p>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" /> Add Opportunity
        </button>
      </div>

      {/* Six Prominent Business Metrics (Matching Panel 1) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div
          onClick={() => setStageFilter('all')}
          className={`p-4 rounded-2xl border transition cursor-pointer ${
            stageFilter === 'all'
              ? 'bg-indigo-50/70 border-indigo-200 ring-1 ring-indigo-500/20'
              : 'bg-white border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-indigo-600">
            <Building2 className="h-4 w-4" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">{totalCount}</div>
          <p className="text-[11px] font-semibold text-slate-600 mt-0.5">Total Opportunities</p>
        </div>

        <div
          onClick={() => setStageFilter('discovered')}
          className={`p-4 rounded-2xl border transition cursor-pointer ${
            stageFilter === 'discovered'
              ? 'bg-blue-50/70 border-blue-200 ring-1 ring-blue-500/20'
              : 'bg-white border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-blue-600">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">{discoveredCount}</div>
          <p className="text-[11px] font-semibold text-slate-600 mt-0.5">Newly Discovered</p>
        </div>

        <div
          onClick={() => setStageFilter('qualified')}
          className={`p-4 rounded-2xl border transition cursor-pointer ${
            stageFilter === 'qualified'
              ? 'bg-emerald-50/70 border-emerald-200 ring-1 ring-emerald-500/20'
              : 'bg-white border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">{qualifiedCount}</div>
          <p className="text-[11px] font-semibold text-slate-600 mt-0.5">Qualified</p>
        </div>

        <div
          onClick={() => setStageFilter('awaiting_approval')}
          className={`p-4 rounded-2xl border transition cursor-pointer ${
            stageFilter === 'awaiting_approval'
              ? 'bg-amber-50/70 border-amber-200 ring-1 ring-amber-500/20'
              : 'bg-white border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-amber-600">
            <Clock className="h-4 w-4" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">{awaitingApprovalCount}</div>
          <p className="text-[11px] font-semibold text-slate-600 mt-0.5">Awaiting Approval</p>
        </div>

        <div
          onClick={() => setStageFilter('awaiting_response')}
          className={`p-4 rounded-2xl border transition cursor-pointer ${
            stageFilter === 'awaiting_response'
              ? 'bg-purple-50/70 border-purple-200 ring-1 ring-purple-500/20'
              : 'bg-white border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-purple-600">
            <Users className="h-4 w-4" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">{awaitingResponseCount}</div>
          <p className="text-[11px] font-semibold text-slate-600 mt-0.5">Awaiting Response</p>
        </div>

        <div
          onClick={() => setStageFilter('approved_scope')}
          className={`p-4 rounded-2xl border transition cursor-pointer ${
            stageFilter === 'approved_scope'
              ? 'bg-emerald-50/70 border-emerald-200 ring-1 ring-emerald-500/20'
              : 'bg-white border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-emerald-600">
            <Check className="h-4 w-4" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">{approvedScopeCount}</div>
          <p className="text-[11px] font-semibold text-slate-600 mt-0.5">Approved Scope</p>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by organisation, contact, or opportunity ID..."
              className="input pl-9 text-xs"
            />
          </div>

          {/* Stage Dropdown */}
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="input text-xs sm:w-40"
          >
            <option value="all">All stages</option>
            {pipelineStages.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          {/* Industry Dropdown */}
          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="input text-xs sm:w-36"
          >
            <option value="all">All industries</option>
            {distinctIndustries.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>

          {/* Owner Dropdown */}
          <select
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value)}
            className="input text-xs sm:w-36"
          >
            <option value="all">All owners</option>
            {distinctOwners.map((owner) => (
              <option key={owner} value={owner}>{owner}</option>
            ))}
          </select>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('kanban')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
              viewMode === 'kanban' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Kanban</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
              viewMode === 'list' ? 'bg-white text-indigo-600 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <TableIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">List</span>
          </button>
        </div>
      </div>

      {/* KANBAN BOARD VIEW (Matching Panel 1) */}
      {viewMode === 'kanban' ? (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-[1280px]">
            {pipelineStages.slice(0, 4).map((stage) => {
              const stageItems = filtered.filter((o) => o.stage === stage.id)
              return (
                <div key={stage.id} className="flex-1 min-w-[280px] rounded-2xl bg-slate-50/70 border border-slate-200/80 p-3 flex flex-col">
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-2.5 px-1 border-b border-slate-200/60 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-800">{stage.name}</span>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[11px] font-bold text-slate-700">
                        {stageItems.length}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-900 font-mono">
                      {stage.totalValue}
                    </span>
                  </div>

                  {/* Column Cards */}
                  <div className="space-y-3 flex-1">
                    {stageItems.map((o) => (
                      <div
                        key={o.id}
                        onClick={() => navigate(`/sales/${o.id}`)}
                        className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-2xs hover:shadow-md hover:border-indigo-300 transition cursor-pointer space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h4 className="font-bold text-xs text-slate-900 truncate leading-snug">{o.name}</h4>
                            <p className="text-[10px] text-slate-400 font-mono">{o.id}</p>
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                            {o.daysAgo}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-500">
                          {o.industry.split(' ')[0]} · {o.city}
                        </p>

                        <div className="pt-1">
                          <span className="inline-flex rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 border border-slate-200/60">
                            {o.sourceTag || 'Qualified'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                              {o.ownerInitials || 'KS'}
                            </span>
                            <span className="text-slate-600 text-[10px]">{o.owner}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-bold text-indigo-700 font-mono text-xs">
                              {o.qualificationScore}
                            </span>
                            <span className="font-bold text-slate-900 text-xs">
                              {o.formattedValue}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {stageItems.length === 0 && (
                      <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                        No opportunities in this stage
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        /* LIST VIEW */
        <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">ORGANISATION</th>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">STAGE</th>
                  <th className="py-3 px-4">SCORE</th>
                  <th className="py-3 px-4">VALUE</th>
                  <th className="py-3 px-4">PROBABILITY</th>
                  <th className="py-3 px-4">OWNER</th>
                  <th className="py-3 px-4">NEXT ACTION</th>
                  <th className="py-3 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((o) => (
                  <tr
                    key={o.id}
                    onClick={() => navigate(`/sales/${o.id}`)}
                    className="hover:bg-indigo-50/40 cursor-pointer transition"
                  >
                    <td className="py-3 px-4 font-bold text-slate-900">{o.name}</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{o.id}</td>
                    <td className="py-3 px-4">
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                        {o.stageName}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-indigo-700">{o.qualificationScore}/100</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{o.formattedValue}</td>
                    <td className="py-3 px-4 text-slate-600">{o.probability}%</td>
                    <td className="py-3 px-4 text-slate-700">{o.owner}</td>
                    <td className="py-3 px-4 text-slate-600">{o.nextAction}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/sales/${o.id}`)
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

      {/* Add Opportunity Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10 p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Add New Commercial Opportunity</h3>
              <button onClick={() => setAddModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                ×
              </button>
            </div>
            <form onSubmit={handleAddOpportunity} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Organisation Name</label>
                <input
                  type="text"
                  placeholder="e.g. Apollo Diagnostics Hub"
                  value={newOpp.name}
                  onChange={(e) => setNewOpp({ ...newOpp, name: e.target.value })}
                  className="input text-xs"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Industry</label>
                  <select
                    value={newOpp.industry}
                    onChange={(e) => setNewOpp({ ...newOpp, industry: e.target.value })}
                    className="input text-xs"
                  >
                    <option value="Dental Clinic">Dental Clinic</option>
                    <option value="Hospital / Healthcare">Hospital / Healthcare</option>
                    <option value="Diagnostics">Diagnostics</option>
                    <option value="Specialty Clinic">Specialty Clinic</option>
                    <option value="Home Healthcare">Home Healthcare</option>
                    <option value="Wellness & Ayurveda">Wellness & Ayurveda</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Hyderabad, IN"
                    value={newOpp.location}
                    onChange={(e) => setNewOpp({ ...newOpp, location: e.target.value })}
                    className="input text-xs"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Contact Person</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Ramesh Kumar"
                    value={newOpp.contactPerson}
                    onChange={(e) => setNewOpp({ ...newOpp, contactPerson: e.target.value })}
                    className="input text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Contact Email</label>
                  <input
                    type="email"
                    placeholder="ramesh@clinic.in"
                    value={newOpp.email}
                    onChange={(e) => setNewOpp({ ...newOpp, email: e.target.value })}
                    className="input text-xs"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Est. Contract Value (₹)</label>
                  <input
                    type="number"
                    value={newOpp.value}
                    onChange={(e) => setNewOpp({ ...newOpp, value: e.target.value })}
                    className="input text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Assigned SBD Owner</label>
                  <select
                    value={newOpp.owner}
                    onChange={(e) => setNewOpp({ ...newOpp, owner: e.target.value })}
                    className="input text-xs"
                  >
                    <option value="K. Sharma">K. Sharma (SBD-004)</option>
                    <option value="R. Iyer">R. Iyer (SBD-006)</option>
                    <option value="D. Gupta">D. Gupta (SBD-002)</option>
                    <option value="S. Mehta">S. Mehta (SBD-006)</option>
                    <option value="A. Khan">A. Khan (SBD-007)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Initial Pipeline Stage</label>
                <select
                  value={newOpp.stage}
                  onChange={(e) => setNewOpp({ ...newOpp, stage: e.target.value })}
                  className="input text-xs"
                >
                  <option value="discovered">Discovered</option>
                  <option value="researching">Researching</option>
                  <option value="qualified">Qualified</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
                <button type="button" onClick={() => setAddModalOpen(false)} className="btn-secondary text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs">
                  Create Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
