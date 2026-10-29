import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FilePlus2, CheckCircle2, Upload, ArrowRight, Save, Info } from 'lucide-react'
import { Card, Badge } from '../components/ui'
import { useClient } from '../state/ClientContext'

const serviceOptions = [
  { id: 'social', label: 'Social media content', desc: 'Posts, captions and images for Instagram, Facebook etc.' },
  { id: 'web', label: 'Website / SEO page', desc: 'A webpage that helps people find you online' },
  { id: 'ads', label: 'Paid advertising', desc: 'Ads on Google, Meta or other platforms' },
  { id: 'video', label: 'Video', desc: 'Short videos, explainers or patient education' },
  { id: 'report', label: 'Report / analysis', desc: 'A deeper look at how your marketing is performing' }
]

const audiences = ['Patients & families', 'Local community', 'Healthcare professionals', 'Corporate clients', 'Not sure yet']
const tones = ['Warm & caring', 'Professional & trustworthy', 'Friendly & simple', 'Authoritative', 'Not sure yet']

const steps = [
  { id: 1, label: 'What do you need?' },
  { id: 2, label: 'Goals & audience' },
  { id: 3, label: 'Details & files' },
  { id: 4, label: 'Review & submit' }
]

const emptyForm = {
  service: '',
  title: '',
  goal: '',
  audience: '',
  tone: '',
  cta: '',
  notes: '',
  restrictions: '',
  files: []
}

export default function NewBrief() {
  const { setBriefDraft } = useClient()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(emptyForm)
  const [submitted, setSubmitted] = useState(false)
  const [saved, setSaved] = useState(false)

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const saveDraft = () => {
    setBriefDraft({ ...form, savedAt: 'Just now' })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const submit = () => {
    setBriefDraft({ ...form, submittedAt: 'Just now' })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl">
        <div className="card p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="mt-4 text-xl font-bold text-slate-900">Thank you — your request is in!</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            We've received your request for <span className="font-semibold">{form.service ? serviceOptions.find((s) => s.id === form.service)?.label : 'a new project'}</span>.
            Here's what happens next:
          </p>
          <div className="mt-6 space-y-3 text-left">
            {[
              { t: 'We review your request', d: 'Our team will look over the details you shared.' },
              { t: 'We may ask a few questions', d: 'If anything is unclear, we’ll message you to clarify.' },
              { t: 'We share a plan', d: 'You’ll see the project appear under “My projects” with a clear timeline.' }
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">{i + 1}</div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{s.t}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Link to="/projects" className="btn-primary">Go to my projects</Link>
            <button className="btn-secondary" onClick={() => { setStep(1); setForm(emptyForm); setSubmitted(false) }}>
              Make another request
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Make a new request</h1>
        <p className="mt-1 text-sm text-slate-500">
          Tell us what you need in your own words. You don't need to know the technical terms — we'll handle the details.
        </p>
      </div>

      {/* Stepper */}
      <div className="mb-6 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s.id} className="flex flex-1 items-center gap-2">
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${step > s.id ? 'bg-emerald-500 text-white' : step === s.id ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
              {step > s.id ? <CheckCircle2 className="h-4 w-4" /> : s.id}
            </div>
            <span className={`hidden text-xs font-semibold sm:block ${step === s.id ? 'text-slate-900' : 'text-slate-400'}`}>{s.label}</span>
            {i < steps.length - 1 && <div className={`h-0.5 flex-1 rounded ${step > s.id ? 'bg-emerald-400' : 'bg-slate-200'}`} />}
          </div>
        ))}
      </div>

      <Card>
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="label">What kind of help do you need?</label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {serviceOptions.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => set('service', o.id)}
                    className={`rounded-xl border p-3.5 text-left transition ${form.service === o.id ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-200' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <p className="text-sm font-bold text-slate-800">{o.label}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{o.desc}</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="label" htmlFor="b-title">Give it a short name</label>
              <input id="b-title" className="input" placeholder="e.g. Diwali health tips social posts" value={form.title} onChange={(e) => set('title', e.target.value)} />
              <p className="help">This helps you find it later. You can change it any time.</p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label className="label" htmlFor="b-goal">What would you like to achieve?</label>
              <textarea id="b-goal" className="input min-h-[90px] resize-y" placeholder="e.g. More people booking heart check-ups, or more awareness about our maternity services" value={form.goal} onChange={(e) => set('goal', e.target.value)} />
              <p className="help">Write it the way you'd say it to a friend. Examples: “more website visits”, “more appointment bookings”, “reach more local patients”.</p>
            </div>
            <div>
              <label className="label">Who are you trying to reach?</label>
              <div className="flex flex-wrap gap-2">
                {audiences.map((a) => (
                  <button key={a} onClick={() => set('audience', a)} className={`rounded-full px-3.5 py-2 text-xs font-semibold transition ${form.audience === a ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                    {a}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="label">What tone feels right for your brand?</label>
              <div className="flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button key={t} onClick={() => set('tone', t)} className={`rounded-full px-3.5 py-2 text-xs font-semibold transition ${form.tone === t ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div>
              <label className="label" htmlFor="b-cta">What should people do after seeing this?</label>
              <input id="b-cta" className="input" placeholder="e.g. Book an appointment, call us, visit our website" value={form.cta} onChange={(e) => set('cta', e.target.value)} />
              <p className="help">This is the action we'll guide people towards.</p>
            </div>
            <div>
              <label className="label" htmlFor="b-notes">Anything else we should know?</label>
              <textarea id="b-notes" className="input min-h-[90px] resize-y" placeholder="Ideas, references, past content you liked, dates to avoid…" value={form.notes} onChange={(e) => set('notes', e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="b-restrictions">Anything we must avoid?</label>
              <textarea id="b-restrictions" className="input min-h-[70px] resize-y" placeholder="e.g. no claims about cure times, avoid certain images, follow our brand guidelines" value={form.restrictions} onChange={(e) => set('restrictions', e.target.value)} />
              <p className="help">This helps us stay accurate and on-brand, especially for healthcare claims.</p>
            </div>
            <div>
              <label className="label">Add files (optional)</label>
              <button className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-4 py-8 text-center transition hover:border-brand-300 hover:bg-brand-50/30">
                <Upload className="h-6 w-6 text-slate-400" />
                <p className="mt-2 text-sm font-semibold text-slate-600">Click to upload or drag files here</p>
                <p className="mt-0.5 text-xs text-slate-400">Logos, photos, brand guidelines, examples — PDF, PNG, JPG, DOCX up to 20MB</p>
              </button>
              {form.files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {form.files.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> {f}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="flex items-start gap-2 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-900 ring-1 ring-brand-200">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              <span>Please check everything below. You can go back and change anything before submitting.</span>
            </div>
            <div className="divide-y divide-slate-100 rounded-xl border border-slate-200">
              {[
                ['Service', form.service ? serviceOptions.find((s) => s.id === form.service)?.label : '—'],
                ['Name', form.title || '—'],
                ['Goal', form.goal || '—'],
                ['Audience', form.audience || '—'],
                ['Tone', form.tone || '—'],
                ['Call to action', form.cta || '—'],
                ['Notes', form.notes || '—'],
                ['Restrictions', form.restrictions || '—']
              ].map(([k, v]) => (
                <div key={k} className="flex items-start justify-between gap-4 px-4 py-3">
                  <span className="shrink-0 text-xs font-semibold text-slate-500">{k}</span>
                  <span className="text-right text-sm text-slate-800">{v}</span>
                </div>
              ))}
            </div>
            <p className="text-xs leading-relaxed text-slate-500">
              By submitting, you're asking us to plan and create this work. We'll confirm the plan and timeline with you before anything is produced or published. Nothing is published without your approval.
            </p>
          </div>
        )}

        {/* Footer nav */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
          <button className="btn-ghost" onClick={() => (step === 1 ? null : setStep((s) => s - 1))} disabled={step === 1}>
            Back
          </button>
          <div className="flex items-center gap-2">
            <button className="btn-ghost !text-xs" onClick={saveDraft}>
              <Save className="h-3.5 w-3.5" /> {saved ? 'Draft saved' : 'Save draft'}
            </button>
            {step < 4 ? (
              <button className="btn-primary" onClick={() => setStep((s) => s + 1)}>
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button className="btn-primary" onClick={submit}>
                <FilePlus2 className="h-4 w-4" /> Submit request
              </button>
            )}
          </div>
        </div>
      </Card>

      <p className="mt-4 text-center text-xs text-slate-400">
        Your progress is saved automatically. You can leave and come back any time.
      </p>
    </div>
  )
}