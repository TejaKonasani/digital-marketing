import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  BarChart3, FolderKanban, CheckCircle2, Clock, AlertTriangle, ArrowUpRight,
  TrendingUp, Download, Filter, ChevronRight, Layers, ArrowLeft, MoreHorizontal,
  Building2, Users, FileText, Check, AlertCircle, ExternalLink, RefreshCw
} from 'lucide-react'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  Legend, PieChart, Pie, Cell
} from 'recharts'
import { Card, Badge, ProgressBar } from '../components/ui'
import {
  analyticsOverviewMetrics,
  projectProgressWeeks,
  executionOutcomesSummary,
  departmentPerformance,
  projectReportDetails,
  getProjectReportById
} from '../data/analyticsAgentOpsData'
import { useApp } from '../state/AppContext'

export default function Analytics() {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const { toast } = useApp()

  // ----------------------------------------------------------------------------
  // PROJECT REPORT VIEW (Matching Panel 4 in user reference image)
  // ----------------------------------------------------------------------------
  if (projectId) {
    const project = getProjectReportById(projectId)
    return <ProjectReportScreen project={project} onBack={() => navigate('/analytics')} />
  }

  // ----------------------------------------------------------------------------
  // OVERVIEW DASHBOARD (Matching Panel 1 in user reference image)
  // ----------------------------------------------------------------------------
  const [dateRange, setDateRange] = useState('30d')
  const [selectedDept, setSelectedDept] = useState('all')
  const [selectedClient, setSelectedClient] = useState('all')
  const [activeTab, setActiveTab] = useState('overview')

  const pieData = [
    { name: 'Successful', value: executionOutcomesSummary.successful, color: '#10b981' },
    { name: 'Failed', value: executionOutcomesSummary.failed, color: '#f43f5e' },
    { name: 'Retried', value: executionOutcomesSummary.retried, color: '#f59e0b' }
  ]

  const filteredDepts = useMemo(() => {
    if (selectedDept === 'all') return departmentPerformance
    return departmentPerformance.filter((d) =>
      d.department.toLowerCase().includes(selectedDept.toLowerCase())
    )
  }, [selectedDept])

  const handleExport = () => {
    toast('Operational analytics report exported successfully.', 'success')
  }

  return (
    <div className="space-y-6 p-4 lg:p-6 max-w-7xl mx-auto pb-16">
      {/* 1. Header with Filters matching Panel 1 */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">Analytics & Reporting</h1>
          <p className="text-xs lg:text-sm text-slate-600 mt-1">
            Track project performance across projects, departments and agent execution outcomes.
          </p>
        </div>

        {/* Filter controls toolbar */}
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
            <option value="Client">Client Operations</option>
            <option value="Research">Research & Analysis</option>
            <option value="Design">Design & Creative</option>
            <option value="Technology">Technology & AgentOps</option>
            <option value="Assurance">Independent Assurance</option>
          </select>

          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium focus:ring-1 focus:ring-indigo-500 shadow-xs"
          >
            <option value="all">All clients</option>
            <option value="City Care">City Care Hospital</option>
            <option value="Nirvaan">Nirvaan Wellness</option>
            <option value="Sunrise">Sunrise Dental Studio</option>
            <option value="MediScan">MediScan Diagnostics</option>
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

      {/* 2. Top Summary KPI Cards matching Panel 1 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Card 1: Total Projects */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-600">Total Projects</span>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              {analyticsOverviewMetrics.totalProjectsDelta}
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">
            {analyticsOverviewMetrics.totalProjects}
          </div>
        </div>

        {/* Card 2: Active Projects */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-600">Active Projects</span>
            <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
              {analyticsOverviewMetrics.activeProjectsDelta}
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">
            {analyticsOverviewMetrics.activeProjects}
          </div>
        </div>

        {/* Card 3: Completed Projects */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-600">Completed Projects</span>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              {analyticsOverviewMetrics.completedProjectsDelta}
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">
            {analyticsOverviewMetrics.completedProjects}
          </div>
        </div>

        {/* Card 4: Pending Decisions */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-600">Pending Decisions</span>
            <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
              {analyticsOverviewMetrics.pendingDecisionsDelta}
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">
            {analyticsOverviewMetrics.pendingDecisions}
          </div>
        </div>

        {/* Card 5: Successful Executions */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-600">Successful Executions</span>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              {analyticsOverviewMetrics.successfulExecutionsRate}
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">
            {analyticsOverviewMetrics.successfulExecutions}
          </div>
        </div>

        {/* Card 6: Failed Executions */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-600">Failed Executions</span>
            <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
              {analyticsOverviewMetrics.failedExecutionsRate}
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight">
            {analyticsOverviewMetrics.failedExecutions}
          </div>
        </div>
      </div>

      {/* 3. Charts Section matching Panel 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Chart: Project progress (Started vs Completed over W1, W2, W3, W4) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900">Project progress</h3>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-slate-600">Started</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-600">Completed</span>
              </div>
            </div>
          </div>

          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectProgressWeeks} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: '1px solid #e2e8f0',
                    fontSize: 12,
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="started" name="Started" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="completed" name="Completed" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart: Execution outcomes (Donut / Outcomes Summary) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-slate-900">Execution outcomes</h3>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="flex items-center gap-1 text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Success
              </span>
              <span className="flex items-center gap-1 text-rose-700">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Failed
              </span>
              <span className="flex items-center gap-1 text-amber-700">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Retried
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 py-2">
            {/* Pie Chart */}
            <div className="relative w-36 h-36 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={3}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-slate-600 font-medium">Total Runs</span>
                <span className="text-base font-bold text-slate-900">
                  {executionOutcomesSummary.totalRuns.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Breakdown List */}
            <div className="space-y-3 flex-1 text-xs">
              <div>
                <div className="flex items-center justify-between font-medium">
                  <span className="text-slate-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    {executionOutcomesSummary.successful.toLocaleString()}
                  </span>
                  <span className="text-emerald-700 font-bold">{executionOutcomesSummary.successfulRate}%</span>
                </div>
                <div className="text-[11px] text-slate-600 ml-3.5">Successful</div>
              </div>

              <div>
                <div className="flex items-center justify-between font-medium">
                  <span className="text-slate-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    {executionOutcomesSummary.failed}
                  </span>
                  <span className="text-rose-700 font-bold">{executionOutcomesSummary.failedRate}%</span>
                </div>
                <div className="text-[11px] text-slate-600 ml-3.5">Failed</div>
              </div>

              <div>
                <div className="flex items-center justify-between font-medium">
                  <span className="text-slate-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    {executionOutcomesSummary.retried}
                  </span>
                  <span className="text-amber-700 font-bold">2%</span>
                </div>
                <div className="text-[11px] text-slate-600 ml-3.5">Retried</div>
              </div>
            </div>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs text-slate-600 mt-2">
            <span>Average Execution Latency:</span>
            <span className="font-bold text-slate-800">2m 04s</span>
          </div>
        </div>
      </div>

      {/* 4. Department Performance Table matching Panel 1 */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Department performance</h3>
            <p className="text-xs text-slate-600">
              Capacity, executions and active workloads across all 11 organizational departments.
            </p>
          </div>
          <button
            onClick={() => navigate('/analytics/projects/PROJ-001')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View City Care Project Report</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="p-3.5">Department</th>
                <th className="p-3.5">Positions</th>
                <th className="p-3.5">Executed</th>
                <th className="p-3.5">Success</th>
                <th className="p-3.5">Failed</th>
                <th className="p-3.5">Pending</th>
                <th className="p-3.5 w-48">Workload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDepts.map((d, idx) => (
                <tr
                  key={idx}
                  onClick={() => navigate('/departments')}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                >
                  <td className="p-3.5 font-bold text-slate-900 flex items-center gap-2">
                    <Building2 className="h-3.5 w-3.5 text-slate-600" />
                    <span>{d.department}</span>
                  </td>
                  <td className="p-3.5 text-slate-700 font-semibold">{d.positions}</td>
                  <td className="p-3.5 text-slate-700">{d.executed}</td>
                  <td className="p-3.5 text-emerald-700 font-semibold">{d.success}</td>
                  <td className="p-3.5 text-rose-700 font-semibold">{d.failed}</td>
                  <td className="p-3.5 text-slate-600">{d.pending}</td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${d.workload}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-700">{d.workload}%</span>
                    </div>
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
// SUB-SCREEN: PROJECT REPORT (Matching Panel 4 in user reference image)
// ------------------------------------------------------------------------------
function ProjectReportScreen({ project, onBack }) {
  const [activeTab, setActiveTab] = useState('overview')
  const navigate = useNavigate()
  const { toast } = useApp()

  return (
    <div className="space-y-5 p-4 lg:p-6 max-w-7xl mx-auto pb-16">
      {/* 1. Breadcrumb navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-600">
        <button
          onClick={onBack}
          className="hover:text-indigo-600 flex items-center gap-1 font-medium transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Analytics & Reporting
        </button>
        <ChevronRight className="h-3 w-3 text-slate-600" />
        <span className="text-slate-600">Projects</span>
        <ChevronRight className="h-3 w-3 text-slate-600" />
        <span className="text-slate-800 font-semibold truncate">{project.name}</span>
      </nav>

      {/* 2. Header banner matching Panel 4 */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0 font-bold text-rose-700 text-sm shadow-xs">
              CC
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">{project.name}</h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {project.status}
                </span>
              </div>
              <p className="text-xs text-slate-600">
                {project.industry} · {project.location} · Client since {project.clientSince}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => toast('Project report exported as PDF document.', 'success')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
            >
              <span>Actions</span>
              <MoreHorizontal className="h-3.5 w-3.5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Six Tabs matching Panel 4 */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-6 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'tasks', label: `Tasks (${project.tasksTotal || 12})` },
            { id: 'positions', label: `Positions (${project.positionsActive || 8})` },
            { id: 'executions', label: `Executions (${project.executionsCount || 156})` },
            { id: 'approvals', label: `Approvals (${project.pendingApprovals || 4})` },
            { id: 'deliverables', label: `Deliverables (${project.deliverablesCount || 6})` }
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

      {/* 4. Content Grid matching Panel 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Project information card */}
        <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">Project information</h3>

          <dl className="grid grid-cols-2 gap-y-3.5 gap-x-4 text-xs">
            <div>
              <dt className="text-slate-600">Project ID</dt>
              <dd className="font-mono font-bold text-slate-900 mt-0.5">{project.id}</dd>
            </div>
            <div>
              <dt className="text-slate-600">Client</dt>
              <dd className="font-semibold text-slate-900 mt-0.5">{project.client}</dd>
            </div>
            <div>
              <dt className="text-slate-600">Industry</dt>
              <dd className="text-slate-800 mt-0.5">{project.industry}</dd>
            </div>
            <div>
              <dt className="text-slate-600">Location</dt>
              <dd className="text-slate-800 mt-0.5">{project.location}</dd>
            </div>
            <div>
              <dt className="text-slate-600">Start date</dt>
              <dd className="text-slate-800 mt-0.5">{project.startDate}</dd>
            </div>
            <div>
              <dt className="text-slate-600">Target date</dt>
              <dd className="text-slate-800 mt-0.5">{project.targetDate}</dd>
            </div>
            <div>
              <dt className="text-slate-600">Status</dt>
              <dd className="mt-0.5">
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {project.status}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-slate-600">Owner</dt>
              <dd className="font-semibold text-slate-800 mt-0.5">{project.owner}</dd>
            </div>
          </dl>

          <div className="pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-600 font-medium">Description</span>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed">{project.description}</p>
          </div>
        </div>

        {/* Right Column: Progress and Task Completion by Department */}
        <div className="lg:col-span-6 space-y-5">
          {/* Top Progress Card matching Panel 4 */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Progress</span>
              <span className="text-lg font-bold text-slate-900">{project.progress}%</span>
            </div>

            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${project.progress}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2 text-center">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-xs font-bold text-slate-900">
                  {project.tasksCompleted} / {project.tasksTotal}
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">Tasks completed</div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <div className="text-xs font-bold text-slate-900">{project.positionsActive}</div>
                <div className="text-[11px] text-slate-600 mt-0.5">Positions active</div>
              </div>

              <div className="p-2.5 bg-amber-50/60 rounded-lg border border-amber-100">
                <div className="text-xs font-bold text-amber-900">{project.pendingApprovals}</div>
                <div className="text-[11px] text-amber-700 mt-0.5">Pending approvals</div>
              </div>
            </div>
          </div>

          {/* Bottom Task completion (by department) matching Panel 4 */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Task completion (by department)
            </h3>

            <div className="space-y-3 text-xs">
              {project.departmentCompletion?.map((dept, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">{dept.department}</span>
                    <span className="text-slate-600 font-mono">
                      {dept.completed}/{dept.total}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500 rounded-full"
                      style={{ width: `${dept.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
