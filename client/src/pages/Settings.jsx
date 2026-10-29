import { useState } from 'react'
import { User, Bell, ShieldCheck, Building2, Save, CheckCircle2 } from 'lucide-react'
import { Card, Badge } from '../components/ui'
import { useClient } from '../state/ClientContext'
import { clientProfile } from '../data/clientData'

function Toggle({ label, desc, defaultOn = false }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        <p className="mt-0.5 text-xs text-slate-500">{desc}</p>
      </div>
      <button onClick={() => setOn((o) => !o)} className={`relative h-6 w-11 shrink-0 rounded-full transition ${on ? 'bg-brand-600' : 'bg-slate-200'}`} role="switch" aria-checked={on}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? 'left-[22px]' : 'left-0.5'}`} />
      </button>
    </div>
  )
}

export default function Settings() {
  const { user } = useClient()
  const [saved, setSaved] = useState(false)
  const save = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Account settings</h1>
          <p className="mt-1 text-sm text-slate-500">Manage your profile, notifications and workspace details.</p>
        </div>
        <button className="btn-primary self-start sm:self-auto" onClick={save}>
          {saved ? <><CheckCircle2 className="h-4 w-4" /> Saved</> : <><Save className="h-4 w-4" /> Save changes</>}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Your profile" bodyClass="p-5">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white">
                {(user?.name || 'C').split(' ').map((w) => w[0]).slice(0, 2).join('')}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.role}</p>
              </div>
            </div>
            <div>
              <label className="label">Full name</label>
              <input className="input" defaultValue={user?.name} />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" defaultValue={user?.email} />
            </div>
            <div>
              <label className="label">Phone</label>
              <input className="input" placeholder="+91 …" />
            </div>
          </div>
        </Card>

        <Card title="Notifications" bodyClass="p-5">
          <div className="divide-y divide-slate-100">
            <Toggle label="Approvals needed" desc="Notify me when something is ready for my review" defaultOn />
            <Toggle label="Project updates" desc="Notify me when a project moves to a new stage" defaultOn />
            <Toggle label="New reports" desc="Notify me when a report is ready to read" defaultOn />
            <Toggle label="Messages" desc="Notify me when my team sends a message" defaultOn />
            <Toggle label="Weekly summary" desc="A short Monday summary of what's happening" />
          </div>
        </Card>

        <Card title="Workspace" bodyClass="p-5">
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
              <div className="rounded-xl bg-white p-2.5 ring-1 ring-slate-200">
                <Building2 className="h-5 w-5 text-brand-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-800">{clientProfile.name}</p>
                <p className="text-xs text-slate-500">{clientProfile.type} · {clientProfile.location}</p>
              </div>
              <Badge color="brand">Client since {clientProfile.since}</Badge>
            </div>
            <div>
              <label className="label">Services</label>
              <div className="flex flex-wrap gap-2">
                {clientProfile.services.map((s) => (
                  <span key={s} className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">{s}</span>
                ))}
              </div>
              <p className="help">To add or change services, please contact your account owner.</p>
            </div>
          </div>
        </Card>

        <Card title="Security & privacy" bodyClass="p-5">
          <div className="space-y-4">
            <div>
              <label className="label">Change password</label>
              <div className="flex gap-2">
                <input className="input" type="password" placeholder="New password" />
                <button className="btn-secondary shrink-0">Update</button>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-xs text-emerald-800 ring-1 ring-emerald-200">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                Your workspace is private and isolated. Only people you invite can access your projects, files and reports.
                In this demo, sign-in is simulated — this is not production authentication.
              </span>
            </div>
            <div>
              <label className="label">Invite a teammate</label>
              <div className="flex gap-2">
                <input className="input" placeholder="teammate@hospital.in" />
                <button className="btn-primary shrink-0">Invite</button>
              </div>
              <p className="help">They can review content and approve on your behalf, based on the role you give them.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}