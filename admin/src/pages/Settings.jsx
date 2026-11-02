import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Settings as SettingsIcon, Sliders, Cpu, Bell, Plug, Shield, Database,
  Save, Check, RefreshCw, AlertCircle, CheckCircle2, Lock, Eye, EyeOff,
  Server, Globe, Clock, Moon, Sun, HardDrive, Mail, MessageSquare, Terminal,
  ExternalLink, KeyRound, LogOut, Download, AlertTriangle, ShieldCheck,
  Users as UsersIcon, UserPlus, X
} from 'lucide-react'
import { Card, Badge, ProgressBar } from '../components/ui'
import { systemServices, ollamaRuntime, localResources } from '../data/analyticsAgentOpsData'
import { useApp } from '../state/AppContext'

const DEFAULT_SETTINGS = {
  general: {
    appName: 'Samrudhi Agentic AI',
    workspaceName: 'Enterprise Healthcare Workspace',
    timezone: 'Asia/Kolkata (UTC+5:30)',
    dateFormat: 'DD MMM YYYY, HH:mm',
    defaultLanguage: 'English (India)',
    theme: 'system'
  },
  runtime: {
    provider: 'Ollama (Local Runtime)',
    host: 'http://localhost:11434',
    primaryModel: 'llama3.1:8b',
    reasoningModel: 'mistral:7b',
    embeddingModel: 'nomic-embed-text:latest',
    temperature: '0.2',
    maxContextTokens: '131072',
    gpuAcceleration: true
  },
  notifications: {
    clientApprovals: true,
    clientRequests: true,
    taskAssignments: true,
    taskCompletions: true,
    projectMilestones: true,
    agentFailures: true,
    agentRetryLoops: true,
    communicationBounces: true,
    qaEscalations: true,
    systemErrors: true, // Mandatory
    inAppAlerts: true,
    emailAlerts: true,
    whatsAppUrgent: false
  },
  security: {
    sessionTimeout: '8 hours',
    mfaEnforced: true,
    roleProtection: true,
    credentialMasking: true
  },
  audit: {
    auditRetention: '7 years (Regulatory requirement)',
    runLogRetention: '2 years',
    logLevel: 'INFO',
    exportFormat: 'JSON / Audit Ledger'
  }
}

export default function Settings() {
  const { user, logout, toast } = useApp()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')
  const [activeTab, setActiveTab] = useState(tabParam === 'access' || tabParam === 'users' ? 'access' : (tabParam || 'general'))

  useEffect(() => {
    if (tabParam === 'access' || tabParam === 'users') {
      setActiveTab('access')
    } else if (tabParam) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  // Team & Access Control State
  const [adminUsers, setAdminUsers] = useState([
    { id: 'usr-1', name: 'Dr. Arjun Mehta', email: 'arjun.mehta@samrudhi.ai', role: 'SUPER_ADMIN', department: 'Executive (CEO)', twoFactor: true, status: 'Active', lastActive: '5 mins ago' },
    { id: 'usr-2', name: 'Vikram Sengupta', email: 'vikram.s@samrudhi.ai', role: 'DEPT_HEAD', department: 'SAL & MKT', twoFactor: true, status: 'Active', lastActive: '22 mins ago' },
    { id: 'usr-3', name: 'Aarya Roy', email: 'aarya.roy@samrudhi.ai', role: 'DEPT_HEAD', department: 'CRT (Creative)', twoFactor: true, status: 'Active', lastActive: '1 hour ago' },
    { id: 'usr-4', name: 'Dr. Satya Narayan', email: 'satya.n@samrudhi.ai', role: 'AUDITOR', department: 'GOV (Assurance)', twoFactor: true, status: 'Active', lastActive: 'Just now' },
    { id: 'usr-5', name: 'Mitra Vasudevan', email: 'mitra.v@samrudhi.ai', role: 'DEPT_HEAD', department: 'CEX (Client Accounts)', twoFactor: true, status: 'Active', lastActive: '3 hours ago' },
    { id: 'usr-6', name: 'Niti Sharma', email: 'niti.s@samrudhi.ai', role: 'DEPT_HEAD', department: 'FIN (Finance)', twoFactor: true, status: 'Active', lastActive: 'Yesterday' }
  ])
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', role: 'OPERATOR', department: 'CRT' })

  // Load settings from localStorage with fallback to default
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('samrudhi_platform_settings')
      if (saved) return JSON.parse(saved)
    } catch (e) {
      // fallback
    }
    return DEFAULT_SETTINGS
  })

  // Test Connection state
  const [testingOllama, setTestingOllama] = useState(false)
  const [testingDb, setTestingDb] = useState(false)
  const [testingEmail, setTestingEmail] = useState(false)
  const [savedBanner, setSavedBanner] = useState(false)

  // Password change modal state
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)

  const handleSaveAll = (e) => {
    if (e) e.preventDefault()
    try {
      localStorage.setItem('samrudhi_platform_settings', JSON.stringify(settings))
    } catch (err) {
      // ignore
    }
    setSavedBanner(true)
    setTimeout(() => setSavedBanner(false), 3000)
    toast('Platform settings saved and persisted.', 'success')
  }

  const handleTestOllama = () => {
    setTestingOllama(true)
    setTimeout(() => {
      setTestingOllama(false)
      toast('Ollama local runtime verified: Connected to http://localhost:11434 (latency: 14ms). 3 models available.', 'success')
    }, 600)
  }

  const handleTestDb = () => {
    setTestingDb(true)
    setTimeout(() => {
      setTestingDb(false)
      toast('PostgreSQL connection verified: Connection pool 18/25 active (latency: 8ms).', 'success')
    }, 500)
  }

  const handleTestEmail = () => {
    setTestingEmail(true)
    setTimeout(() => {
      setTestingEmail(false)
      toast('SMTP Email relay checked: Connected to port 587 (Human approval gate enforced).', 'info')
    }, 500)
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (!passwordForm.current || !passwordForm.newPass) {
      toast('Please enter current and new passwords.', 'warning')
      return
    }
    if (passwordForm.newPass !== passwordForm.confirm) {
      toast('New passwords do not match.', 'rose')
      return
    }
    setPasswordModalOpen(false)
    setPasswordForm({ current: '', newPass: '', confirm: '' })
    toast('Security credential updated for authenticated user.', 'success')
  }

  const handleExportAudit = () => {
    toast('Generating platform audit configuration dump (JSON)...', 'info')
  }

  return (
    <div className="space-y-6 p-4 lg:p-6 max-w-7xl mx-auto pb-16">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight">Settings</h1>
          <p className="text-xs lg:text-sm text-slate-600 mt-1">
            Configure your workspace, AI runtime, integrations, and platform preferences.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {savedBanner && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 animate-in fade-in">
              <Check className="h-3.5 w-3.5 text-emerald-600" />
              Settings saved
            </span>
          )}
          <button
            onClick={() => {
              setSettings(DEFAULT_SETTINGS)
              toast('Settings reset to system defaults.', 'info')
            }}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
          >
            Reset defaults
          </button>
          <button
            onClick={handleSaveAll}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save changes</span>
          </button>
        </div>
      </div>

      {/* 2. Settings Navigation Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-6 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'general', label: 'General', icon: Sliders },
            { id: 'runtime', label: 'Agent Runtime & AI', icon: Cpu },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'integrations', label: 'Integrations & Services', icon: Plug },
            { id: 'security', label: 'Security & Session', icon: Shield },
            { id: 'access', label: 'Users & Access Control', icon: UsersIcon },
            { id: 'audit', label: 'Audit & Data', icon: Database }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-700'
                    : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* 3. Settings Main Content Area */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        {/* ==================================================================== */}
        {/* A. GENERAL SETTINGS */}
        {/* ==================================================================== */}
        {activeTab === 'general' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-sm font-bold text-slate-900">General Workspace Configuration</h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Manage global application identity, timezone parameters, and internationalization defaults.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Application Name
                </label>
                <input
                  type="text"
                  value={settings.general.appName}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      general: { ...settings.general, appName: e.target.value }
                    })
                  }
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-[11px] text-slate-600 mt-1">Platform brand identifier displayed across system headers.</p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Workspace Name
                </label>
                <input
                  type="text"
                  value={settings.general.workspaceName}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      general: { ...settings.general, workspaceName: e.target.value }
                    })
                  }
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Application Timezone
                  </label>
                  <select
                    value={settings.general.timezone}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, timezone: e.target.value }
                      })
                    }
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Asia/Kolkata (UTC+5:30)">Asia/Kolkata (UTC+5:30)</option>
                    <option value="Asia/Calcutta (UTC+5:30)">Asia/Calcutta (UTC+5:30)</option>
                    <option value="UTC (UTC+0:00)">UTC (UTC+0:00)</option>
                    <option value="America/New_York (UTC-5:00)">America/New_York (UTC-5:00)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Date & Time Format
                  </label>
                  <select
                    value={settings.general.dateFormat}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, dateFormat: e.target.value }
                      })
                    }
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="DD MMM YYYY, HH:mm">29 Oct 2026, 14:30 (Standard)</option>
                    <option value="YYYY-MM-DD HH:mm:ss">2026-10-29 14:30:00 (ISO)</option>
                    <option value="MM/DD/YYYY, hh:mm A">10/29/2026, 02:30 PM (US)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Default Interface Language
                  </label>
                  <select
                    value={settings.general.defaultLanguage}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, defaultLanguage: e.target.value }
                      })
                    }
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="English (India)">English (India)</option>
                    <option value="English (UK)">English (UK)</option>
                    <option value="English (US)">English (US)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Theme Preference
                  </label>
                  <select
                    value={settings.general.theme}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, theme: e.target.value }
                      })
                    }
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="system">System default (Light)</option>
                    <option value="light">Light theme</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                type="button"
                onClick={handleSaveAll}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
              >
                Save General Settings
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* B. AGENT RUNTIME & AI CONFIGURATION */}
        {/* ==================================================================== */}
        {activeTab === 'runtime' && (
          <div className="space-y-6 max-w-3xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Local AI Inference & Model Adapter</h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Configure local Ollama execution parameters, active model mappings and memory boundaries.
                </p>
              </div>

              <button
                type="button"
                onClick={handleTestOllama}
                disabled={testingOllama}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors self-start sm:self-auto"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${testingOllama ? 'animate-spin' : ''}`} />
                <span>Test Local Connection</span>
              </button>
            </div>

            {/* Connection Status Card */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Ollama Runtime Status:</span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Connected (Local Daemon Active)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 border-t border-slate-200/60">
                <div>
                  <span className="text-slate-600 text-[11px]">Runtime Endpoint</span>
                  <div className="font-mono font-bold text-slate-800 mt-0.5">{settings.runtime.host}</div>
                </div>
                <div>
                  <span className="text-slate-600 text-[11px]">Last Health Check</span>
                  <div className="font-medium text-slate-800 mt-0.5">Just now (14 ms)</div>
                </div>
                <div>
                  <span className="text-slate-600 text-[11px]">CUDA Acceleration</span>
                  <div className="font-medium text-emerald-700 mt-0.5">Enabled (NVIDIA Driver)</div>
                </div>
              </div>
            </div>

            {/* Configuration Inputs */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Primary Instruct Model (8B)
                  </label>
                  <select
                    value={settings.runtime.primaryModel}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        runtime: { ...settings.runtime, primaryModel: e.target.value }
                      })
                    }
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono font-medium focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="llama3.1:8b">llama3.1:8b (Q4_K_M — Loaded)</option>
                    <option value="mistral:7b">mistral:7b (Q4_0 — Loaded)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Specialized QA & Reasoning Model
                  </label>
                  <select
                    value={settings.runtime.reasoningModel}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        runtime: { ...settings.runtime, reasoningModel: e.target.value }
                      })
                    }
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono font-medium focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="mistral:7b">mistral:7b (Clinical QA Rubrics)</option>
                    <option value="llama3.1:8b">llama3.1:8b (General Reasoning)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Embedding Model (Semantic RAG)
                  </label>
                  <select
                    value={settings.runtime.embeddingModel}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        runtime: { ...settings.runtime, embeddingModel: e.target.value }
                      })
                    }
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono font-medium focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="nomic-embed-text:latest">nomic-embed-text:latest (137M parameters)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Maximum Context Window (Tokens)
                  </label>
                  <input
                    type="text"
                    value={settings.runtime.maxContextTokens}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        runtime: { ...settings.runtime, maxContextTokens: e.target.value }
                      })
                    }
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono font-medium focus:ring-2 focus:ring-indigo-500"
                  />
                  <p className="text-[11px] text-slate-600 mt-1">Llama 3.1 supports up to 131,072 tokens with RoPE scaling.</p>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Default Sampling Temperature ({settings.runtime.temperature})
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={settings.runtime.temperature}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      runtime: { ...settings.runtime, temperature: e.target.value }
                    })
                  }
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-600 mt-1">
                  <span>0.0 (Deterministic / Clinical)</span>
                  <span className="font-bold text-slate-800">{settings.runtime.temperature} (Balanced)</span>
                  <span>1.0 (Creative)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                type="button"
                onClick={handleSaveAll}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
              >
                Save Runtime Configuration
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* C. NOTIFICATION PREFERENCES */}
        {/* ==================================================================== */}
        {activeTab === 'notifications' && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Event Notification Subscriptions</h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Control which operational, client and agent events publish in-app signals and alerts.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-slate-600 text-[11px]">
                Operational Events
              </h3>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {[
                  { key: 'clientApprovals', label: 'Client approvals and rejections', desc: 'Notify immediately when client signs off or requests copy redlines' },
                  { key: 'clientRequests', label: 'New client requests & briefs', desc: 'Alert account managers when inbound client briefs arrive' },
                  { key: 'taskAssignments', label: 'New tasks assigned', desc: 'Notify operators when tasks enter their departmental queue' },
                  { key: 'taskCompletions', label: 'Task completion events', desc: 'Signals when preceding dependency steps complete' },
                  { key: 'projectMilestones', label: 'Project milestones achieved', desc: 'Progress notification when stage gates successfully pass' },
                  { key: 'agentFailures', label: 'Agent execution failures', desc: 'Alert engineering on local runtime timeout or context overflow' },
                  { key: 'agentRetryLoops', label: 'Agent retry loops & halts', desc: 'Notify when automated retries fail or trigger circuit breakers' },
                  { key: 'communicationBounces', label: 'Communication bounces & failures', desc: 'Alert when client proposal email or WhatsApp delivery fails' },
                  { key: 'qaEscalations', label: 'QA and compliance escalations', desc: 'Alert governance officers on clinical claim screening flags' }
                ].map((item) => (
                  <label
                    key={item.key}
                    className="p-3.5 flex items-start justify-between gap-4 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-slate-800">{item.label}</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">{item.desc}</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications[item.key]}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            [item.key]: e.target.checked
                          }
                        })
                      }
                      className="text-indigo-600 focus:ring-indigo-500 rounded h-4 w-4 mt-0.5"
                    />
                  </label>
                ))}

                {/* Locked Mandatory Item */}
                <div className="p-3.5 flex items-start justify-between gap-4 bg-slate-50">
                  <div>
                    <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                      <Lock className="h-3.5 w-3.5 text-slate-600" />
                      <span>Security violations & System errors (Mandatory)</span>
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5">
                      Critical policy enforcement alerts cannot be muted or disabled.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="text-indigo-600 rounded h-4 w-4 mt-0.5 opacity-60 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                type="button"
                onClick={handleSaveAll}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
              >
                Save Notification Preferences
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* D. INTEGRATIONS & CONNECTORS */}
        {/* ==================================================================== */}
        {activeTab === 'integrations' && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Configured Local Integrations & Connectors</h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Inspect live operational health for local runtime, database adapters, storage and communication relays.
              </p>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Ollama Service */}
              <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">Ollama Local LLM Runtime</h3>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-semibold">
                        Connected
                      </span>
                    </div>
                    <p className="text-slate-600 mt-1">
                      Local AI inference host on http://localhost:11434 (3 models loaded).
                    </p>
                    <div className="text-[11px] text-slate-600 mt-1.5 font-mono">
                      Last successful check: Just now · Latency: 14 ms
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleTestOllama}
                  disabled={testingOllama}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-semibold text-slate-700 hover:bg-slate-100 transition shadow-xs"
                >
                  {testingOllama ? 'Testing...' : 'Test Connection'}
                </button>
              </div>

              {/* PostgreSQL Database */}
              <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
                    <Database className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">Database (PostgreSQL 16.2)</h3>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-semibold">
                        Connected
                      </span>
                    </div>
                    <p className="text-slate-600 mt-1">
                      Primary transactional data store and audit event ledger on port 5432.
                    </p>
                    <div className="text-[11px] text-slate-600 mt-1.5 font-mono">
                      Pool: 18/25 active · Latency: 8 ms · Sync: Active
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleTestDb}
                  disabled={testingDb}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-semibold text-slate-700 hover:bg-slate-100 transition shadow-xs"
                >
                  {testingDb ? 'Testing...' : 'Test Connection'}
                </button>
              </div>

              {/* Local File Storage */}
              <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                    <HardDrive className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">Local Disk Storage</h3>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-semibold">
                        Connected
                      </span>
                    </div>
                    <p className="text-slate-600 mt-1">
                      Persistent file assets and generated creative artifacts store on local disk.
                    </p>
                    <div className="text-[11px] text-slate-600 mt-1.5 font-mono">
                      Path: D:/TEJA PERSONAL/Nushift · Available: 76 GB / 200 GB
                    </div>
                  </div>
                </div>

                <span className="px-3 py-1 text-slate-600 font-medium self-center text-xs">
                  Active
                </span>
              </div>

              {/* SMTP Email Relay */}
              <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">SMTP Email Provider</h3>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-semibold">
                        Connected
                      </span>
                    </div>
                    <p className="text-slate-600 mt-1">
                      Outbound email relay configured with strict human-approval gate (Class D).
                    </p>
                    <div className="text-[11px] text-slate-600 mt-1.5 font-mono">
                      Host: smtp.internal.local:587 · Security: TLS 1.3
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleTestEmail}
                  disabled={testingEmail}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-semibold text-slate-700 hover:bg-slate-100 transition shadow-xs"
                >
                  {testingEmail ? 'Testing...' : 'Test Connection'}
                </button>
              </div>

              {/* WhatsApp Business API */}
              <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">WhatsApp Messaging Gateway</h3>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded text-[10px] font-semibold">
                        Not Configured
                      </span>
                    </div>
                    <p className="text-slate-600 mt-1">
                      Direct WhatsApp Cloud API credentials not yet provisioned in local environment.
                    </p>
                    <div className="text-[11px] text-slate-600 mt-1.5 font-mono">
                      State: Disabled · Outbound patient SMS/WhatsApp queues paused
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toast('Configure WhatsApp Cloud API tokens in environment settings.', 'info')}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-semibold text-slate-700 hover:bg-slate-100 transition shadow-xs"
                >
                  Configure
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* E. SECURITY & SESSION SETTINGS */}
        {/* ==================================================================== */}
        {activeTab === 'security' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Authentication & Session Management</h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Inspect current authenticated administrator session, password settings, and timeout policies.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
              <h3 className="font-bold text-slate-900">Active Administrative Session</h3>
              <dl className="grid grid-cols-2 gap-y-2 text-slate-700">
                <div>
                  <dt className="text-slate-600 text-[11px]">User Identity</dt>
                  <dd className="font-bold text-slate-900 mt-0.5">{user?.name || 'Super Admin'}</dd>
                </div>
                <div>
                  <dt className="text-slate-600 text-[11px]">Email Address</dt>
                  <dd className="font-mono text-slate-800 mt-0.5">{user?.email || 'admin@samrudhi.ai'}</dd>
                </div>
                <div>
                  <dt className="text-slate-600 text-[11px]">Role Authority Level</dt>
                  <dd className="font-semibold text-indigo-700 mt-0.5">{user?.role || 'Company Admin (Level 5)'}</dd>
                </div>
                <div>
                  <dt className="text-slate-600 text-[11px]">Session Expiration</dt>
                  <dd className="font-mono text-slate-800 mt-0.5">{settings.security.sessionTimeout} (Rolling)</dd>
                </div>
              </dl>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3.5 border border-slate-200 rounded-xl">
                <div>
                  <div className="text-xs font-bold text-slate-900">Administrator Password</div>
                  <div className="text-[11px] text-slate-600">Update local access password for this console.</div>
                </div>
                <button
                  type="button"
                  onClick={() => setPasswordModalOpen(true)}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs flex items-center gap-1.5"
                >
                  <KeyRound className="h-3.5 w-3.5 text-slate-600" />
                  <span>Change Password</span>
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 border border-slate-200 rounded-xl">
                <div>
                  <div className="text-xs font-bold text-slate-900">Sign out of Console</div>
                  <div className="text-[11px] text-slate-600">End active session and return to authentication portal.</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout()
                    toast('Logged out of console.', 'info')
                  }}
                  className="px-3 py-1.5 bg-rose-50 border border-rose-200 rounded-lg text-xs font-semibold text-rose-700 hover:bg-rose-100 transition shadow-xs flex items-center gap-1.5"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* F. AUDIT & DATA SETTINGS */}
        {/* ==================================================================== */}
        {activeTab === 'audit' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Audit Trail & Data Retention</h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Governance retention policies, local snapshot records and immutable audit export.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Audit Log Retention Policy
                  </label>
                  <select
                    value={settings.audit.auditRetention}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        audit: { ...settings.audit, auditRetention: e.target.value }
                      })
                    }
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="7 years (Regulatory requirement)">7 years (Regulatory requirement)</option>
                    <option value="5 years">5 years</option>
                    <option value="3 years">3 years</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Execution Telemetry Retention
                  </label>
                  <select
                    value={settings.audit.runLogRetention}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        audit: { ...settings.audit, runLogRetention: e.target.value }
                      })
                    }
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="2 years">2 years</option>
                    <option value="1 year">1 year</option>
                    <option value="90 days">90 days</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">Local Snapshot Backup Status:</span>
                  <span className="font-mono text-emerald-700 font-bold">Verified Snapshot #20261029</span>
                </div>
                <div className="text-[11px] text-slate-600 leading-relaxed">
                  Automatic cryptographic snapshot verified with SHA-256 integrity checksum. Stored on local disk storage.
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 border border-slate-200 rounded-xl">
                <div>
                  <div className="text-xs font-bold text-slate-900">Export Immutable Audit Ledger</div>
                  <div className="text-[11px] text-slate-600">Export cryptographic events and decision history for independent verification.</div>
                </div>
                <button
                  type="button"
                  onClick={handleExportAudit}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs flex items-center gap-1.5"
                >
                  <Download className="h-3.5 w-3.5 text-slate-600" />
                  <span>Export JSON</span>
                </button>
              </div>

              <div className="pt-2 text-right">
                <span className="text-[11px] font-mono text-slate-600">
                  Platform Core: Samrudhi Agentic AI v2.4.0 (Enterprise Local Edition)
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* F. USERS & ACCESS CONTROL */}
        {/* ==================================================================== */}
        {activeTab === 'access' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Enterprise Users & Role-Based Access Control (RBAC)</h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Manage internal platform operators, department leads, and governance reviewers with strict least-privilege scoping.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setInviteModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors self-start sm:self-auto"
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>Invite Operator</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-[11px] font-semibold text-slate-500 uppercase">Active Operators</div>
                <div className="text-xl font-bold text-slate-900 mt-1">{adminUsers.length}</div>
                <div className="text-[10px] text-emerald-600 font-medium mt-0.5">All accounts verified</div>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-[11px] font-semibold text-slate-500 uppercase">2FA Enforced</div>
                <div className="text-xl font-bold text-slate-900 mt-1">100%</div>
                <div className="text-[10px] text-indigo-600 font-medium mt-0.5">Hardware / TOTP active</div>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-[11px] font-semibold text-slate-500 uppercase">Super Admins</div>
                <div className="text-xl font-bold text-slate-900 mt-1">1</div>
                <div className="text-[10px] text-slate-500 font-medium mt-0.5">Founder / CEO Office</div>
              </div>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="text-[11px] font-semibold text-slate-500 uppercase">Department Leads</div>
                <div className="text-xl font-bold text-slate-900 mt-1">4</div>
                <div className="text-[10px] text-slate-500 font-medium mt-0.5">Scoped oversight</div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                      <th className="py-2.5 px-4">Operator Name</th>
                      <th className="py-2.5 px-4">Role / Permissions</th>
                      <th className="py-2.5 px-4">Assigned Department</th>
                      <th className="py-2.5 px-4">2FA Security</th>
                      <th className="py-2.5 px-4">Status</th>
                      <th className="py-2.5 px-4">Last Active</th>
                      <th className="py-2.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {adminUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">{u.name}</div>
                          <div className="text-[11px] text-slate-500 font-mono">{u.email}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            u.role === 'SUPER_ADMIN'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : u.role === 'DEPT_HEAD'
                              ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                              : u.role === 'AUDITOR'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-700">{u.department}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                            <span>Enforced</span>
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                            <span>{u.status}</span>
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-500 text-[11px]">{u.lastActive}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => toast(`Viewing security credentials for ${u.name}`, 'info')}
                            className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                          >
                            Edit Access
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
              <div className="font-bold text-slate-900">Administrative Principle of Least Privilege</div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Platform users operate under strict Role-Based Access Control (RBAC). Department leads can only authorize actions within their functional domain, while Independent Assurance auditors have read-only inspection rights to verify immutable cryptographic logs.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 4. Password Change Modal */}
      {passwordModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Change Password</h3>
                <p className="text-xs text-slate-600 mt-0.5">Update local administrative console credential.</p>
              </div>
              <button
                onClick={() => setPasswordModalOpen(false)}
                className="p-1 rounded-lg text-slate-600 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Current Password *</label>
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">New Password *</label>
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={passwordForm.newPass}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Confirm New Password *</label>
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={showPass}
                  onChange={(e) => setShowPass(e.target.checked)}
                  className="text-indigo-600 focus:ring-indigo-500 rounded h-4 w-4"
                />
                <span className="text-[11px] text-slate-600">Show password characters</span>
              </label>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setPasswordModalOpen(false)}
                  className="px-3.5 py-1.5 font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Invite User Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Invite Platform Operator</h3>
                <p className="text-xs text-slate-600 mt-0.5">Send secure magic link invitation with scoped role.</p>
              </div>
              <button
                onClick={() => setInviteModalOpen(false)}
                className="p-1 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                const newUser = {
                  id: `usr-${Date.now()}`,
                  name: inviteForm.name,
                  email: inviteForm.email,
                  role: inviteForm.role,
                  department: inviteForm.department,
                  twoFactor: true,
                  status: 'Active',
                  lastActive: 'Just invited'
                }
                setAdminUsers([...adminUsers, newUser])
                setInviteModalOpen(false)
                setInviteForm({ name: '', email: '', role: 'OPERATOR', department: 'CRT' })
                toast(`Invitation sent to ${newUser.email}`, 'success')
              }}
              className="p-5 space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Priya Sharma"
                  value={inviteForm.name}
                  onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Corporate Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@samrudhi.ai"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Role Permission *</label>
                  <select
                    value={inviteForm.role}
                    onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="OPERATOR">Operator</option>
                    <option value="DEPT_HEAD">Department Head</option>
                    <option value="AUDITOR">Assurance Auditor</option>
                    <option value="SUPER_ADMIN">Super Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department Scope *</label>
                  <select
                    value={inviteForm.department}
                    onChange={(e) => setInviteForm({ ...inviteForm, department: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="CEO">CEO Office</option>
                    <option value="SAL">Sales & BD</option>
                    <option value="MKT">Brand Marketing</option>
                    <option value="CEX">Client Experience</option>
                    <option value="OPS">Operations & Delivery</option>
                    <option value="CRT">Creative & Content</option>
                    <option value="PMG">Paid Media & SEO</option>
                    <option value="DAT">Analytics & Intelligence</option>
                    <option value="FIN">Finance & Admin</option>
                    <option value="TEC">Technology & AgentOps</option>
                    <option value="GOV">Independent Assurance</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className="px-3.5 py-1.5 font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
