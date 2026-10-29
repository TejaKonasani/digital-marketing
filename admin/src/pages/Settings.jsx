import { useState } from 'react'
import { Settings as SettingsIcon, Bell, ShieldCheck, Database, Save, CheckCircle2 } from 'lucide-react'
import { Card, PageHeader, Badge, SimulationBanner } from '../components/ui'

function Toggle({ label, desc, defaultOn = false }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-medium text-slate-800">{label}</p>
        <p className="mt-0.5 text-xs text-slate-500">{desc}</p>
      </div>
      <button
        onClick={() => setOn((o) => !o)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${on ? 'bg-indigo-600' : 'bg-slate-200'}`}
        role="switch"
        aria-checked={on}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? 'left-[22px]' : 'left-0.5'}`} />
      </button>
    </div>
  )
}

export default function Settings() {
  const [saved, setSaved] = useState(false)
  const save = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Platform configuration. In this prototype, settings are stored in local frontend state only — no backend persistence."
        actions={
          <button className="btn-primary" onClick={save}>
            {saved ? <><CheckCircle2 className="h-4 w-4" /> Saved</> : <><Save className="h-4 w-4" /> Save changes</>}
          </button>
        }
      />
      <SimulationBanner />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Workspace" bodyClass="p-5">
          <div className="space-y-4">
            <div>
              <label className="label">Company name</label>
              <input className="input" defaultValue="Samrudhi Agentic AI" />
            </div>
            <div>
              <label className="label">Default timezone</label>
              <select className="input" defaultValue="Asia/Calcutta (UTC+5:30)">
                <option>Asia/Calcutta (UTC+5:30)</option>
                <option>Asia/Kolkata (UTC+5:30)</option>
                <option>UTC</option>
              </select>
            </div>
            <div>
              <label className="label">Currency</label>
              <select className="input" defaultValue="INR (₹)">
                <option>INR (₹)</option>
                <option>USD ($)</option>
              </select>
            </div>
          </div>
        </Card>

        <Card title="Notifications" bodyClass="p-5">
          <div className="divide-y divide-slate-100">
            <Toggle label="Approval requests" desc="Notify approvers when a decision gate opens" defaultOn />
            <Toggle label="Escalations & incidents" desc="Notify leads on escalations and new incidents" defaultOn />
            <Toggle label="Client activity" desc="Notify account owners of client portal activity" defaultOn />
            <Toggle label="Connector health" desc="Notify on connector degradation or failure" defaultOn />
            <Toggle label="Weekly digest" desc="Monday summary of workflows, approvals and findings" />
          </div>
        </Card>

        <Card title="Simulation & safety" bodyClass="p-5">
          <div className="divide-y divide-slate-100">
            <Toggle label="Simulation mode" desc="External actions are recorded, never executed" defaultOn />
            <Toggle label="Block external writes in demo" desc="Demo accounts cannot trigger real side effects" defaultOn />
            <Toggle label="Require approval for Class D actions" desc="Publishing / sending / spend always gated" defaultOn />
            <Toggle label="Require human payment authorisation" desc="Class E — payments are never agent-executed" defaultOn />
          </div>
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2.5 text-xs text-amber-800 ring-1 ring-amber-200">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>These safety gates mirror the production governance model. In this prototype they are enforced by the UI and mock state.</span>
          </div>
        </Card>

        <Card title="Data & model" bodyClass="p-5">
          <div className="space-y-4">
            <div>
              <label className="label">Model adapter (Ollama)</label>
              <input className="input font-mono" defaultValue="http://localhost:11434" />
              <p className="mt-1 text-[11px] text-slate-400">Configured outside UI code. In this prototype the adapter is simulated.</p>
            </div>
            <div>
              <label className="label">Model</label>
              <select className="input" defaultValue="configured-local-model (Llama)">
                <option>configured-local-model (Llama)</option>
                <option>llama3.1:8b</option>
              </select>
            </div>
            <div>
              <label className="label">Retention policy</label>
              <select className="input" defaultValue="Audit logs: 7 years · Run logs: 2 years">
                <option>Audit logs: 7 years · Run logs: 2 years</option>
                <option>Audit logs: 3 years · Run logs: 1 year</option>
              </select>
            </div>
            <div className="flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2.5 text-xs text-slate-600 ring-1 ring-slate-200">
              <Database className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
              <span>No database is used in this prototype. All data is mock data in organised frontend files; interactions use local state.</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}