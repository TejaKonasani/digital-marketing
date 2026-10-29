import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, Lock, ShieldCheck, HeartPulse } from 'lucide-react'
import { useClient } from '../state/ClientContext'
import { clientDemoAccounts } from '../data/clientData'

export default function ClientLogin() {
  const { login } = useClient()
  const navigate = useNavigate()
  const [email, setEmail] = useState('riyer@citycare.in')
  const [password, setPassword] = useState('demo1234')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setError('')
    const account = clientDemoAccounts.find((a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password)
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
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-800 to-brand-950 p-12 lg:flex">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(75,158,155,0.5) 0, transparent 45%), radial-gradient(circle at 80% 75%, rgba(255,255,255,0.12) 0, transparent 40%)' }} />
        <div className="relative flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-lg font-bold text-white">Samrudhi</p>
            <p className="text-xs text-brand-100">Client Portal</p>
          </div>
        </div>
        <div className="relative max-w-md">
          <h1 className="text-3xl font-bold leading-tight text-white">
            Your healthcare marketing, made simple.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-brand-100">
            See what we're working on, review and approve your content, track your campaigns, and read your reports — all in plain language, in one place.
          </p>
          <div className="mt-8 space-y-3">
            {[
              'Always know what is happening and what happens next',
              'Approve content with one click, or request changes',
              'Clear reports that explain your results'
            ].map((t) => (
              <div key={t} className="flex items-center gap-3 rounded-xl bg-white/5 p-3.5 ring-1 ring-white/10">
                <HeartPulse className="h-5 w-5 shrink-0 text-brand-300" />
                <p className="text-sm text-white">{t}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex items-center gap-2 text-xs text-brand-200">
          <ShieldCheck className="h-4 w-4" />
          Demo environment — sample data only. No real campaigns, emails or payments.
        </div>
      </div>

      {/* Right form */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-800">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Samrudhi</p>
              <p className="text-xs text-slate-500">Client Portal</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back</h2>
          <p className="mt-1 text-sm text-slate-500">Sign in to your workspace to see your projects and approvals.</p>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
            <span className="font-semibold">This is a demo.</span> Sign-in is simulated and uses sample data for City Care Multispeciality Hospital. Nothing is sent to real ad platforms or email.
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="label" htmlFor="c-email">Email</label>
              <input id="c-email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@hospital.in" />
            </div>
            <div>
              <label className="label" htmlFor="c-password">Password</label>
              <input id="c-password" type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            {error && <p className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Signing in…' : 'Sign in to my workspace'} {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <div className="mt-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Quick demo access</p>
            <div className="space-y-2">
              {clientDemoAccounts.map((a) => (
                <button
                  key={a.email}
                  onClick={() => quick(a)}
                  className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:border-brand-300 hover:shadow-card"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                    <HeartPulse className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">{a.name}</p>
                    <p className="truncate text-[11px] text-slate-500">{a.role}</p>
                  </div>
                  <span className="text-[11px] text-slate-400">{a.email}</span>
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