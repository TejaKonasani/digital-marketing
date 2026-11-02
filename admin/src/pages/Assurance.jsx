import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ShieldCheck, FileCheck, AlertTriangle, AlertCircle, CheckCircle2,
  ArrowLeft, ChevronRight, Download, Filter, Search, Lock, UserCheck,
  Building2, MoreHorizontal, Check, X, ExternalLink, HelpCircle, ArrowUpRight
} from 'lucide-react'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  Legend, PieChart, Pie, Cell
} from 'recharts'
import { Card, Badge, ProgressBar } from '../components/ui'
import {
  assuranceMetrics,
  evaluationResultsOverTime,
  issuesByCategory,
  recentViolations,
  positionComplianceProfiles,
  getPositionComplianceById
} from '../data/analyticsAgentOpsData'
import { useApp } from '../state/AppContext'

export default function Assurance() {
  const { positionId } = useParams()
  const navigate = useNavigate()
  const { toast } = useApp()

  // ----------------------------------------------------------------------------
  // POSITION COMPLIANCE VIEW (Matching Panel 6 in user reference image)
  // ----------------------------------------------------------------------------
  if (positionId) {
    const profile = getPositionComplianceById(positionId)
    return <PositionComplianceScreen profile={profile} onBack={() => navigate('/assurance')} />
  }

  // ----------------------------------------------------------------------------
  // ASSURANCE & AUDIT OVERVIEW (Matching Panel 3 in user reference image)
  // ----------------------------------------------------------------------------
  const [dateRange, setDateRange] = useState('30d')
  const [selectedDept, setSelectedDept] = useState('all')
  const [selectedEvaluation, setSelectedEvaluation] = useState('all')
  const [activeTab, setActiveTab] = useState('overview')
  const [violations, setViolations] = useState(recentViolations)

  const totalIssuesCount = issuesByCategory.reduce((sum, item) => sum + item.value, 0)

  const handleExport = () => {
    toast('Assurance and compliance audit report exported.', 'success')
  }

  const handleResolveIssue = (issueId) => {
    setViolations((prev) =>
      prev.map((v) => (v.id === issueId ? { ...v, status: 'Resolved' } : v))
    )
    toast(`Issue ${issueId} marked as Resolved in governance ledger.`, 'success')
  }

  return (
    <div className="space-y-6 p-4 lg:p-6 max-w-7xl mx-auto pb-16">
      {/* 1. Header with Filters matching Panel 3 */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">Assurance & Audit</h1>
          <p className="text-xs lg:text-sm text-slate-600 mt-1">
            Ensure agent work is valid, authorised and compliant with defined governance rules.
          </p>
        </div>

        {/* Filter controls toolbar matching Panel 3 */}
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-1 focus:ring-indigo-500 shadow-xs"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="all">All time</option>
          </select>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-1 focus:ring-indigo-500 shadow-xs"
          >
            <option value="all">All departments</option>
            <option value="Marketing">Marketing & Content</option>
            <option value="Sales">Sales & BD</option>
            <option value="Creative">Creative & Content</option>
            <option value="Paid">Paid Media & SEO</option>
            <option value="Assurance">Independent Assurance</option>
          </select>

          <select
            value={selectedEvaluation}
            onChange={(e) => setSelectedEvaluation(e.target.value)}
            className="text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-1 focus:ring-indigo-500 shadow-xs"
          >
            <option value="all">All evaluations</option>
            <option value="passed">Passed only</option>
            <option value="failed">Failed only</option>
            <option value="violations">Violations only</option>
          </select>

          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards matching Panel 3 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Card 1: Total Audited Executions */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-600">Total Audited Executions</span>
          <div className="text-2xl font-bold text-slate-900 tracking-tight mt-1.5">
            {assuranceMetrics.totalAuditedExecutions.toLocaleString()}
          </div>
        </div>

        {/* Card 2: Passed Evaluations */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">Passed Evaluations</span>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              +{assuranceMetrics.passedRate}%
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight mt-1.5">
            {assuranceMetrics.passedEvaluations.toLocaleString()}
          </div>
        </div>

        {/* Card 3: Failed Evaluations */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">Failed Evaluations</span>
            <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
              -{assuranceMetrics.failedRate}%
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight mt-1.5">
            {assuranceMetrics.failedEvaluations}
          </div>
        </div>

        {/* Card 4: Policy Violations */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-600">Policy Violations</span>
          <div className="text-2xl font-bold text-rose-600 tracking-tight mt-1.5">
            {assuranceMetrics.policyViolations}
          </div>
        </div>

        {/* Card 5: Pending Reviews */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-600">Pending Reviews</span>
          <div className="text-2xl font-bold text-amber-600 tracking-tight mt-1.5">
            {assuranceMetrics.pendingReviews}
          </div>
        </div>

        {/* Card 6: Escalated Issues */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-600">Escalated Issues</span>
          <div className="text-2xl font-bold text-rose-700 tracking-tight mt-1.5">
            {assuranceMetrics.escalatedIssues}
          </div>
        </div>
      </div>

      {/* 3. Charts Row matching Panel 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Chart: Evaluation results over time */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">Evaluation results over time</h3>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                <span className="text-slate-600">Passed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="text-slate-600">Failed</span>
              </div>
            </div>
          </div>

          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={evaluationResultsOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: '1px solid #e2e8f0',
                    fontSize: 12,
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="passed" name="Passed" fill="#14b8a6" radius={[4, 4, 0, 0]} barSize={18} />
                <Bar dataKey="failed" name="Failed" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart: Issues by category (Donut Chart) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-slate-900">Issues by category</h3>
            <span className="text-xs text-slate-600 font-medium">All logged</span>
          </div>

          <div className="flex items-center justify-center gap-6 py-2">
            {/* Donut Chart */}
            <div className="relative w-36 h-36 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={issuesByCategory}
                    dataKey="value"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={3}
                  >
                    {issuesByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-bold text-slate-900">{totalIssuesCount}</span>
                <span className="text-[11px] text-slate-600 font-medium">Total Issues</span>
              </div>
            </div>

            {/* Category breakdown legend matching Panel 3 */}
            <div className="space-y-2 flex-1 text-xs">
              {issuesByCategory.map((cat, i) => (
                <div key={i} className="flex items-center justify-between font-medium">
                  <span className="text-slate-700 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    {cat.name}
                  </span>
                  <span className="font-bold text-slate-900">{cat.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs text-slate-600 mt-2">
            <span>Governance Audit Coverage:</span>
            <span className="font-bold text-emerald-700">100% of state changes logged</span>
          </div>
        </div>
      </div>

      {/* 4. Table: Recent violations & escalations matching Panel 3 */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent violations & escalations</h3>
            <p className="text-xs text-slate-600">
              Governance findings, permission exceptions, and compliance reviews requiring attention.
            </p>
          </div>
          <button
            onClick={() => navigate('/assurance/positions/POS-023')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
          >
            <span>View Content Writer Compliance</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="p-3.5">Issue ID</th>
                <th className="p-3.5">Position</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Severity</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Detected</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {violations.map((iss) => (
                <tr key={iss.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-slate-900">{iss.id}</td>
                  <td className="p-3.5 font-medium text-slate-800">
                    <button
                      onClick={() => navigate(`/assurance/positions/${iss.positionId || 'POS-023'}`)}
                      className="hover:text-indigo-600 hover:underline text-left"
                    >
                      {iss.position}
                    </button>
                  </td>
                  <td className="p-3.5 text-slate-700">{iss.type}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        iss.severity === 'High'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {iss.severity}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        iss.status === 'Resolved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : iss.status === 'In Review'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {iss.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-600 font-mono text-[11px]">{iss.detected}</td>
                  <td className="p-3.5 text-right">
                    {iss.status !== 'Resolved' ? (
                      <button
                        onClick={() => handleResolveIssue(iss.id)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded transition-colors"
                      >
                        Resolve
                      </button>
                    ) : (
                      <span className="text-[11px] text-emerald-700 font-medium flex items-center justify-end gap-1">
                        <Check className="h-3 w-3" /> Resolved
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
  )
}

// ------------------------------------------------------------------------------
// SUB-SCREEN: POSITION COMPLIANCE (Matching Panel 6 in user reference image)
// ------------------------------------------------------------------------------
function PositionComplianceScreen({ profile, onBack }) {
  const [activeTab, setActiveTab] = useState('overview')
  const { toast } = useApp()

  return (
    <div className="space-y-5 p-4 lg:p-6 max-w-7xl mx-auto pb-16">
      {/* 1. Breadcrumb navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-600">
        <button
          onClick={onBack}
          className="hover:text-indigo-600 flex items-center gap-1 font-medium transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Assurance & Audit
        </button>
        <ChevronRight className="h-3 w-3 text-slate-600" />
        <span className="text-slate-600">Positions</span>
        <ChevronRight className="h-3 w-3 text-slate-600" />
        <span className="text-slate-800 font-semibold truncate">
          {profile.title} ({profile.positionId})
        </span>
      </nav>

      {/* 2. Header banner matching Panel 6 */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 font-bold text-blue-700 text-sm shadow-xs">
              CW
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">{profile.title}</h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                  <Check className="h-3 w-3" /> Compliant
                </span>
              </div>
              <p className="text-xs text-slate-600 font-mono">
                {profile.positionId} · {profile.department}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => toast('Position compliance dossier exported.', 'info')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
            >
              <span>Actions</span>
              <MoreHorizontal className="h-3.5 w-3.5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Five Tabs matching Panel 6 */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-6 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'permissions', label: 'Permissions' },
            { id: 'evaluations', label: 'Evaluation history' },
            { id: 'violations', label: 'Violations (2)' },
            { id: 'executions', label: 'Executions (156)' }
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

      {/* 4. Split Two-Column Grid matching Panel 6 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Position details & Purpose & Tool permissions */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Position details</h3>

          <dl className="grid grid-cols-2 gap-y-3.5 gap-x-4 text-xs">
            <div>
              <dt className="text-slate-600">Position ID</dt>
              <dd className="font-mono font-bold text-slate-900 mt-0.5">{profile.positionId}</dd>
            </div>
            <div>
              <dt className="text-slate-600">Department</dt>
              <dd className="font-semibold text-slate-900 mt-0.5">{profile.department}</dd>
            </div>
            <div>
              <dt className="text-slate-600">Authority level</dt>
              <dd className="font-semibold text-indigo-700 mt-0.5">{profile.authorityLevel}</dd>
            </div>
            <div>
              <dt className="text-slate-600">Independent evaluator</dt>
              <dd className="font-mono text-slate-800 mt-0.5">{profile.independentEvaluator}</dd>
            </div>
            <div>
              <dt className="text-slate-600">Role config version</dt>
              <dd className="font-mono text-slate-800 mt-0.5">{profile.roleConfigVersion}</dd>
            </div>
            <div>
              <dt className="text-slate-600">Model</dt>
              <dd className="font-mono font-bold text-slate-900 mt-0.5">{profile.model}</dd>
            </div>
          </dl>

          <div className="pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-600 font-medium">Purpose</span>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed">{profile.purpose}</p>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-xs text-slate-600 font-medium">Tool permissions</span>
            <div className="flex flex-wrap gap-2">
              {profile.toolPermissions?.map((perm, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 inline-flex items-center gap-1.5"
                >
                  <Lock className="h-3 w-3 text-slate-600" />
                  {perm}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Compliance status & Recent evaluations */}
        <div className="lg:col-span-6 space-y-5">
          {/* Top Compliance Status Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Compliance status
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-semibold text-xs inline-flex items-center gap-1">
                <Check className="h-3 w-3" /> Compliant
              </span>
            </div>

            <dl className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <div className="font-bold text-slate-900">{profile.lastEvaluation}</div>
                <div className="text-[11px] text-slate-600 mt-0.5">Last evaluation</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <div className="font-bold text-slate-900">{profile.nextReview}</div>
                <div className="text-[11px] text-slate-600 mt-0.5">Next review</div>
              </div>
              <div className="p-2.5 bg-emerald-50/60 rounded-lg border border-emerald-100">
                <div className="font-bold text-emerald-800">{profile.openViolations}</div>
                <div className="text-[11px] text-emerald-700 mt-0.5">Open violations</div>
              </div>
            </dl>
          </div>

          {/* Bottom Recent evaluations matching Panel 6 */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Recent evaluations
            </h3>

            <div className="space-y-2.5 text-xs">
              {profile.recentEvaluations?.map((ev, i) => (
                <div
                  key={i}
                  className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <span className="font-mono text-slate-600 text-[11px]">{ev.date}</span>
                    <p className="font-medium text-slate-800">{ev.notes}</p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-semibold shrink-0 ${
                      ev.status === 'Passed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {ev.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
