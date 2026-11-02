import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Cpu, Server, Database, Activity, CheckCircle2, AlertTriangle, ArrowLeft,
  ChevronRight, Copy, Check, MoreHorizontal, Terminal, RefreshCw, Plug,
  HardDrive, Layers, FileCode, Play, ShieldAlert, Sparkles, Clock, ExternalLink
} from 'lucide-react'
import { Card, Badge, ProgressBar } from '../components/ui'
import {
  systemServices,
  localResources,
  ollamaRuntime,
  activeExecutions,
  initialExecutionHistory,
  getExecutionById
} from '../data/analyticsAgentOpsData'
import { useApp } from '../state/AppContext'

export default function Technology() {
  const { execId } = useParams()
  const navigate = useNavigate()
  const { toast } = useApp()

  // ----------------------------------------------------------------------------
  // EXECUTION DETAIL VIEW (Matching Panel 5 in user reference image)
  // ----------------------------------------------------------------------------
  if (execId) {
    const execution = getExecutionById(execId)
    return <ExecutionDetailScreen execution={execution} onBack={() => navigate('/technology')} />
  }

  // ----------------------------------------------------------------------------
  // TECHNOLOGY & AGENTOPO OVERVIEW (Matching Panel 2 in user reference image)
  // ----------------------------------------------------------------------------
  const [activeTab, setActiveTab] = useState('overview')
  const [testingOllama, setTestingOllama] = useState(false)
  const [retryingId, setRetryingId] = useState(null)

  const handleTestOllama = () => {
    setTestingOllama(true)
    setTimeout(() => {
      setTestingOllama(false)
      toast('Ollama local runtime healthy. 3 models available at localhost:11434 (latency: 14ms).', 'success')
    }, 600)
  }

  const handleRetryExecution = (id) => {
    setRetryingId(id)
    setTimeout(() => {
      setRetryingId(null)
      toast(`Retry initiated for execution ${id}. Agent queue updated.`, 'info')
    }, 500)
  }

  return (
    <div className="space-y-6 p-4 lg:p-6 max-w-7xl mx-auto pb-16">
      {/* 1. Header matching Panel 2 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">Technology & AgentOps</h1>
          <p className="text-xs lg:text-sm text-slate-600 mt-1">
            Monitor local infrastructure, AI models and agent execution health.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleTestOllama}
            disabled={testingOllama}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-slate-600 ${testingOllama ? 'animate-spin' : ''}`} />
            <span>Test Local Runtime</span>
          </button>
        </div>
      </div>

      {/* 2. Top Summary Service Cards matching Panel 2 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Card 1: Backend API */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-600">Backend API</span>
          <div className="flex items-center gap-2 mt-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-sm font-bold text-slate-900">Connected</span>
          </div>
          <div className="text-[11px] text-slate-600 mt-1">12 ms</div>
        </div>

        {/* Card 2: Database */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-600">Database</span>
          <div className="flex items-center gap-2 mt-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-sm font-bold text-slate-900">Connected</span>
          </div>
          <div className="text-[11px] text-slate-600 mt-1">8 ms</div>
        </div>

        {/* Card 3: Ollama Runtime */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-600">Ollama Runtime</span>
          <div className="flex items-center gap-2 mt-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-sm font-bold text-slate-900">Connected</span>
          </div>
          <div className="text-[11px] text-slate-600 mt-1">3 models</div>
        </div>

        {/* Card 4: Available Models */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-600">Available Models</span>
          <div className="text-2xl font-bold text-purple-700 tracking-tight mt-1">3</div>
          <div className="text-[11px] text-slate-600 mt-0.5">All loaded</div>
        </div>

        {/* Card 5: Active Executions */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-600">Active Executions</span>
          <div className="text-2xl font-bold text-blue-600 tracking-tight mt-1">
            {activeExecutions.length}
          </div>
          <div className="text-[11px] text-blue-600 font-medium mt-0.5">Running now</div>
        </div>

        {/* Card 6: Failed Executions */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-xs font-semibold text-slate-600">Failed Executions</span>
          <div className="text-2xl font-bold text-rose-600 tracking-tight mt-1">1</div>
          <div className="text-[11px] text-slate-600 mt-0.5">Last 24 hours</div>
        </div>
      </div>

      {/* 3. Sub-Tabs for Deep Inspection */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-6 overflow-x-auto">
          {[
            { id: 'overview', label: 'System Overview' },
            { id: 'runtime', label: 'Local AI Runtime (Ollama)' },
            { id: 'executions', label: `Execution Monitor (${initialExecutionHistory.length})` },
            { id: 'errors', label: 'Error & Failure Logs (1)' }
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

      {/* TAB 1: SYSTEM OVERVIEW (Matching Panel 2) */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Split 2-Column Section: System Health (Left) & Resource Usage (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* System Health Column */}
            <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">System health</h3>
              <div className="divide-y divide-slate-100">
                {systemServices.map((svc) => (
                  <div key={svc.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-900">{svc.name}</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">Last check {svc.lastCheck}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded-full font-semibold text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {svc.status}
                      </span>
                      <span className="font-mono text-slate-600 w-16 text-right">{svc.latency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resource Usage (local) Column */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-5">
              <h3 className="text-sm font-bold text-slate-900">Resource usage (local)</h3>

              <div className="space-y-4 text-xs">
                {/* CPU */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-slate-800">CPU</span>
                    <span className="text-slate-900">{localResources.cpu.label}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${localResources.cpu.percent}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-slate-600">{localResources.cpu.cores}</div>
                </div>

                {/* Memory */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-slate-800">Memory</span>
                    <span className="text-slate-900">{localResources.memory.label}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${localResources.memory.percent}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-slate-600 font-mono">
                    {localResources.memory.used} / {localResources.memory.total}
                  </div>
                </div>

                {/* Disk */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-slate-800">Disk</span>
                    <span className="text-slate-900">{localResources.disk.label}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500 rounded-full"
                      style={{ width: `${localResources.disk.percent}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-slate-600 font-mono">
                    {localResources.disk.used} / {localResources.disk.total}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Table: Active executions matching Panel 2 */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Active executions</h3>
              <button
                onClick={() => setActiveTab('executions')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
              >
                <span>View all</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <th className="p-3.5">Position</th>
                    <th className="p-3.5">Project</th>
                    <th className="p-3.5">Started</th>
                    <th className="p-3.5">Duration</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeExecutions.map((exec) => (
                    <tr
                      key={exec.id}
                      onClick={() => navigate(`/technology/executions/${exec.id}`)}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                    >
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{exec.positionName}</div>
                        <div className="text-[11px] text-slate-600 font-mono">{exec.positionId}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-medium text-slate-800">{exec.project}</div>
                        <div className="text-[11px] text-slate-600">{exec.client}</div>
                      </td>
                      <td className="p-3.5 font-mono text-slate-700">{exec.started}</td>
                      <td className="p-3.5 font-mono text-slate-700">{exec.duration}</td>
                      <td className="p-3.5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-semibold text-[11px] bg-blue-50 text-blue-700 border border-blue-200">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                          Running
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LOCAL AI RUNTIME (OLLAMA & MODEL REGISTRY) */}
      {activeTab === 'runtime' && (
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Ollama Runtime Adapter</h3>
                <p className="text-xs text-slate-600">
                  Local model inference host at {ollamaRuntime.host} (v{ollamaRuntime.version})
                </p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Connected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-600 font-medium">Configured Host</span>
                <p className="font-mono font-bold text-slate-900 mt-0.5">{ollamaRuntime.host}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-600 font-medium">Median Inference Latency</span>
                <p className="font-mono font-bold text-slate-900 mt-0.5">{ollamaRuntime.p50Latency}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-600 font-medium">Models Loaded in VRAM</span>
                <p className="font-mono font-bold text-purple-700 mt-0.5">{ollamaRuntime.totalLoadedModels} Models</p>
              </div>
            </div>
          </div>

          {/* Model Registry Cards */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Verified Model Registry</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ollamaRuntime.models.map((mod) => (
                <div key={mod.id} className="p-4 bg-slate-50/60 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-mono">{mod.name}</h4>
                      <span className="text-[11px] text-slate-600">{mod.tag}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-semibold">
                      Loaded
                    </span>
                  </div>

                  <dl className="grid grid-cols-2 gap-y-2 text-xs border-t border-slate-200/60 pt-2.5">
                    <div>
                      <dt className="text-slate-600 text-[11px]">Size</dt>
                      <dd className="font-mono font-bold text-slate-800">{mod.size}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-600 text-[11px]">Context</dt>
                      <dd className="font-mono font-bold text-slate-800">{mod.contextWindow}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-600 text-[11px]">Executions</dt>
                      <dd className="font-mono font-bold text-slate-800">{mod.executionsCount.toLocaleString()}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-600 text-[11px]">Last Used</dt>
                      <dd className="text-slate-800">{mod.lastUsed}</dd>
                    </div>
                  </dl>

                  <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-200/60">
                    <span className="font-medium text-slate-700">Role Mapping:</span> {mod.assignedRoles}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AGENT EXECUTION MONITOR */}
      {activeTab === 'executions' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs space-y-0">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Agent Execution Monitor</h3>
              <p className="text-xs text-slate-600">
                Complete audit trail of agent executions across all positions and workflows.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <th className="p-3.5">Execution ID</th>
                  <th className="p-3.5">Position & Title</th>
                  <th className="p-3.5">Project</th>
                  <th className="p-3.5">Model</th>
                  <th className="p-3.5">Duration</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {initialExecutionHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-indigo-600">
                      <button
                        onClick={() => navigate(`/technology/executions/${item.id}`)}
                        className="hover:underline flex items-center gap-1"
                      >
                        {item.executionId}
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-600">{item.positionName}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-medium text-slate-800">{item.project}</div>
                      <div className="text-[11px] text-slate-600">{item.client}</div>
                    </td>
                    <td className="p-3.5 font-mono text-slate-700">{item.model}</td>
                    <td className="p-3.5 font-mono text-slate-700">{item.duration}</td>
                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-semibold text-xs ${
                          item.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => navigate(`/technology/executions/${item.id}`)}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center gap-1"
                      >
                        Inspect <ChevronRight className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: ERROR & FAILURE LOGS */}
      {activeTab === 'errors' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-rose-200 p-5 shadow-xs space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center shrink-0 text-rose-600">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      EXEC-2026-001242
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">
                      Unauthorised external publishing attempt
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-rose-100 text-rose-800 border border-rose-200">
                      High Severity
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Position: Content Publisher (POS-028) · Project: Diwali Health Tips Campaign
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleRetryExecution('EXEC-2026-001242')}
                disabled={retryingId === 'EXEC-2026-001242'}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
              >
                {retryingId === 'EXEC-2026-001242' ? 'Re-evaluating...' : 'Safely Re-evaluate'}
              </button>
            </div>

            <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-lg text-xs space-y-2">
              <div className="font-mono font-bold text-rose-900">
                ERR_PERMISSION_VIOLATION: Unauthorised external publishing attempt
              </div>
              <p className="text-slate-700">
                Missing human approval gate sign-off for external side effect. Action blocked by security runtime (Class D policy).
              </p>
              <div className="flex items-center gap-4 text-[11px] text-slate-600 pt-1 border-t border-rose-200/60">
                <span>Category: Governance & Security Rule</span>
                <span>·</span>
                <span>Retry Policy: Requires human authorization</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ------------------------------------------------------------------------------
// SUB-SCREEN: EXECUTION DETAIL (Matching Panel 5 in user reference image)
// ------------------------------------------------------------------------------
function ExecutionDetailScreen({ execution, onBack }) {
  const [activeTab, setActiveTab] = useState('io')
  const { toast } = useApp()

  const copyToClipboard = (text, label) => {
    navigator.clipboard?.writeText(typeof text === 'object' ? JSON.stringify(text, null, 2) : text)
    toast(`${label} copied to clipboard`, 'info')
  }

  return (
    <div className="space-y-5 p-4 lg:p-6 max-w-7xl mx-auto pb-16">
      {/* 1. Breadcrumb navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-600">
        <button
          onClick={onBack}
          className="hover:text-indigo-600 flex items-center gap-1 font-medium transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Technology & AgentOps
        </button>
        <ChevronRight className="h-3 w-3 text-slate-600" />
        <span className="text-slate-600">Executions</span>
        <ChevronRight className="h-3 w-3 text-slate-600" />
        <span className="text-slate-800 font-semibold truncate">{execution.executionId}</span>
      </nav>

      {/* 2. Header banner matching Panel 5 */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">{execution.title}</h1>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                  execution.status === 'Completed'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
              >
                {execution.status}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => toast('Execution log exported to file.', 'info')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
            >
              <span>Actions</span>
              <MoreHorizontal className="h-3.5 w-3.5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Header metadata bar matching Panel 5 */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-xs">
          <div>
            <span className="text-slate-600 text-[11px]">Execution ID</span>
            <div className="font-mono font-bold text-slate-900 mt-0.5">{execution.executionId}</div>
          </div>
          <div className="sm:col-span-2">
            <span className="text-slate-600 text-[11px]">Position</span>
            <div className="font-semibold text-slate-800 mt-0.5">{execution.positionName}</div>
          </div>
          <div>
            <span className="text-slate-600 text-[11px]">Project</span>
            <div className="font-semibold text-slate-800 mt-0.5">{execution.project}</div>
          </div>
          <div>
            <span className="text-slate-600 text-[11px]">Started</span>
            <div className="font-mono text-slate-800 mt-0.5">{execution.started}</div>
          </div>
          <div>
            <span className="text-slate-600 text-[11px]">Duration</span>
            <div className="font-mono text-slate-800 mt-0.5">{execution.duration}</div>
          </div>
          <div>
            <span className="text-slate-600 text-[11px]">Model</span>
            <div className="font-mono font-bold text-indigo-700 mt-0.5">{execution.model}</div>
          </div>
          <div>
            <span className="text-slate-600 text-[11px]">Retry count</span>
            <div className="font-mono text-slate-800 mt-0.5">{execution.retryCount}</div>
          </div>
        </div>
      </div>

      {/* 3. Five Tabs matching Panel 5 */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-6 overflow-x-auto">
          {[
            { id: 'io', label: 'Input & Output' },
            { id: 'logs', label: 'Execution logs' },
            { id: 'tools', label: 'Tools used' },
            { id: 'evaluation', label: 'Evaluation' },
            { id: 'records', label: 'Related records' }
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

      {/* 4. Split Two-Column Viewer matching Panel 5 */}
      {activeTab === 'io' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left Column: Input (JSON viewer) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Input</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-mono text-[10px] font-semibold">
                  JSON
                </span>
                <button
                  onClick={() => copyToClipboard(execution.input, 'Input JSON')}
                  className="p-1 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
                  title="Copy JSON"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <pre className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 overflow-x-auto leading-relaxed">
              {JSON.stringify(execution.input, null, 2)}
            </pre>
          </div>

          {/* Right Column: Output (Markdown viewer) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Output</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-mono text-[10px] font-semibold">
                  Markdown
                </span>
                <button
                  onClick={() => copyToClipboard(execution.output, 'Output')}
                  className="p-1 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors"
                  title="Copy Output"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {execution.output ? (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 space-y-3 font-sans leading-relaxed whitespace-pre-line max-h-96 overflow-y-auto">
                {execution.output}
              </div>
            ) : (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800">
                <p className="font-bold">No Output Generated</p>
                <p className="mt-1">{execution.errorDetails?.message || 'Execution halted due to runtime exception.'}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB: TOOLS USED */}
      {activeTab === 'tools' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Authorised Tools Invoked</h3>
          <div className="divide-y divide-slate-100 text-xs">
            {execution.toolCalls?.map((tc, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-indigo-700">{tc.name}</span>
                  <span className="text-slate-600 ml-2">({tc.target})</span>
                </div>
                <span className="px-2 py-0.5 rounded font-semibold bg-emerald-50 text-emerald-700 text-[11px]">
                  {tc.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: EVALUATION */}
      {activeTab === 'evaluation' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Independent Assurance Evaluation</h3>
            <span
              className={`px-2.5 py-0.5 rounded-full font-semibold text-xs ${
                execution.evaluation?.result === 'Passed'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              {execution.evaluation?.result}
            </span>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
            "{execution.evaluation?.notes}"
          </p>
          <div className="text-[11px] text-slate-600">
            Evaluator Identity: <span className="font-mono font-semibold">{execution.evaluation?.evaluatorId}</span> ({execution.evaluation?.positionId})
          </div>
        </div>
      )}
    </div>
  )
}
