import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ShieldCheck, ArrowRight, Building2, Lock } from 'lucide-react'
import { useApp } from '../state/AppContext'

const demoAccounts = [
  { name: 'Vikram', role: 'Founder / Super Admin', email: 'vikram@samrudhi.ai', password: 'demo1234', tone: 'indigo' },
  { name: 'Divya', role: 'Client Experience Lead', email: 'divya@samrudhi.ai', password: 'demo1234', tone: 'teal' },
  { name: 'Satya', role: 'Independent Assurance Lead', email: 'satya@samrudhi.ai', password: 'demo1234', tone: 'slate' },
  { name: 'Demo User', role: 'Demo workspace (all modules)', email: 'demo@samrudhi.ai', password: 'demo1234', tone: 'amber' }
]

export default function Login() {
  const { login } = useApp()
  const navigate = useNavigate()
  const [email, setEmail] = useState('demo@samrudhi.ai')
  const [password, setPassword] = useState('demo1234')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setError('')
    const account = demoAccounts.find((a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password)
    if (!account) {
      setError('Invalid demo credentials. Use one of the quick-select accounts below.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      login({ name: account.name, email: account.email, role: account.role })
      navigate('/')
    }, 500)
  }

  const quick = (a) => {
    setEmail(a.email)
    setPassword(a.password)
    setError('')
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Left brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-slate-900 p-12 lg:flex">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(99,102,241,0.35) 0, transparent 45%), radial-gradient(circle at 80% 70%, rgba(20,184,166,0.3) 0, transparent 45%)' }} />
        <div className="relative flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-teal-500">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-lg font-bold text-white">Samrudhi Agentic AI</p>
            <p className="text-xs text-slate-400">Company Administration Console</p>
          </div>
        </div>
        <div className="relative max-w-md">
          <h1 className="text-3xl font-bold leading-tight text-white">
            A 194-position digital workforce, orchestrated and governed.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            11 departments. Explicit handoffs. Human approval gates for clinical claims, publishing, ad spend and payments.
            Independent assurance on every output.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { v: '194', l: 'Logical positions' },
              { v: '11', l: 'Departments' },
              { v: '14', l: 'Operating stages' }
            ].map((s) => (
              <div key={s.l} className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="text-2xl font-bold text-white">{s.v}</p>
                <p className="mt-1 text-xs text-slate-400">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="h-4 w-4 text-teal-400" />
          Frontend prototype — authentication is simulated. Demo access is not production authentication.
        </div>
      </div>

      {/* Right form */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-teal-500">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Samrudhi Agentic AI</p>
              <p className="text-xs text-slate-500">Company Administration Console</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Sign in to the console</h2>
          <p className="mt-1 text-sm text-slate-500">Use a demo account to explore the seeded scenario.</p>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
            <span className="font-semibold">Simulation mode is active.</span> No real emails, publishes, ad spend or payments are ever executed in this prototype.
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="label" htmlFor="email">Work email</label>
              <input id="email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@samrudhi.ai" />
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <input id="password" type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Signing in…' : 'Sign in'} {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <div className="mt-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Quick demo access</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {demoAccounts.map((a) => (
                <button
                  key={a.email}
                  onClick={() => quick(a)}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:border-indigo-300 hover:shadow-card"
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${a.tone === 'indigo' ? 'bg-indigo-50 text-indigo-600' : a.tone === 'teal' ? 'bg-teal-50 text-teal-600' : a.tone === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-600'}`}>
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">{a.name}</p>
                    <p className="truncate text-[11px] text-slate-500">{a.role}</p>
                  </div>
                </button>
              ))}
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400">
              <Lock className="h-3 w-3" /> All demo accounts use password <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[10px] text-slate-600">demo1234</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}