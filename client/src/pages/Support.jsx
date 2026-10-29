import { useState } from 'react'
import { LifeBuoy, MessageCircle, Mail, Clock, ChevronDown, Send, CheckCircle2 } from 'lucide-react'
import { Card } from '../components/ui'

const faqs = [
  {
    q: 'How do I approve content?',
    a: 'Go to the “Approvals” page. You’ll see anything that’s ready for your decision. Open it, review the exact content, and either approve it or request changes. Nothing is published until you approve it.'
  },
  {
    q: 'What does “simulation mode” mean?',
    a: 'This is a demo environment. When we “publish” a post or “start” a campaign, it is simulated — no real post goes live and no real money is spent. You’ll see a clear “simulated” label so you always know it’s not a real action.'
  },
  {
    q: 'Can I change something after I approve it?',
    a: 'Yes. If you want to change approved content, just message us or request a revision. If we make a meaningful change, we’ll send it back to you for approval again — we never change approved work silently.'
  },
  {
    q: 'How are healthcare claims handled?',
    a: 'We check medical and health claims carefully before they reach you. Some claims need extra review by our quality team. We never publish medical claims without proper checks, and we follow your restrictions.'
  },
  {
    q: 'Who can I talk to if I have a problem?',
    a: 'Use the Messages page to contact your team, or email us. You can also reach your account owner directly. We typically respond within a few business hours.'
  },
  {
    q: 'Is my data private?',
    a: 'Yes. Your workspace is isolated — you can only see your own projects, files and reports. We can’t see other clients’ data, and you can’t see theirs.'
  }
]

export default function Support() {
  const [open, setOpen] = useState(0)
  const [msg, setMsg] = useState({ subject: '', body: '' })
  const [sent, setSent] = useState(false)

  const send = () => {
    if (!msg.body.trim()) return
    setSent(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Help & support</h1>
        <p className="mt-1 text-sm text-slate-500">Answers to common questions, and a simple way to reach our team.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { icon: MessageCircle, t: 'Message your team', d: 'Fastest way to ask a question or share feedback.', action: 'Go to Messages', to: '/messages' },
          { icon: Mail, t: 'Email support', d: 'support@samrudhi.ai — for anything not urgent.', action: 'Copy address' },
          { icon: Clock, t: 'Response times', d: 'We typically reply within a few business hours.', action: 'Mon–Sat, 9am–7pm IST' }
        ].map((c) => (
          <Card key={c.t}>
            <div className="rounded-xl bg-brand-50 p-3 text-brand-600 w-fit">
              <c.icon className="h-5 w-5" />
            </div>
            <p className="mt-3 text-sm font-bold text-slate-800">{c.t}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-500">{c.d}</p>
            <p className="mt-2 text-xs font-semibold text-brand-600">{c.action}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Frequently asked questions" bodyClass="p-0">
          <div className="divide-y divide-slate-100">
            {faqs.map((f, i) => (
              <div key={i}>
                <button
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition hover:bg-slate-50"
                  onClick={() => setOpen(open === i ? -1 : i)}
                >
                  <span className="text-sm font-semibold text-slate-800">{f.q}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open === i ? 'rotate-180' : ''}`} />
                </button>
                {open === i && (
                  <p className="px-5 pb-4 text-sm leading-relaxed text-slate-600">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card title="Send us a message" subtitle="We'll get back to you soon">
          {sent ? (
            <div className="rounded-2xl bg-emerald-50 p-6 text-center ring-1 ring-emerald-200">
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />
              <p className="mt-3 text-sm font-bold text-emerald-800">Message sent (simulated)</p>
              <p className="mt-1 text-xs text-emerald-700">In this demo, the message is stored locally. Our team won't actually receive it.</p>
              <button className="btn-secondary mt-4 !py-2 text-xs" onClick={() => { setSent(false); setMsg({ subject: '', body: '' }) }}>
                Send another
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="label" htmlFor="s-subject">Subject</label>
                <input id="s-subject" className="input" placeholder="e.g. Question about my September report" value={msg.subject} onChange={(e) => setMsg((m) => ({ ...m, subject: e.target.value }))} />
              </div>
              <div>
                <label className="label" htmlFor="s-body">Message</label>
                <textarea id="s-body" className="input min-h-[120px] resize-y" placeholder="How can we help?" value={msg.body} onChange={(e) => setMsg((m) => ({ ...m, body: e.target.value }))} />
              </div>
              <button className="btn-primary w-full" onClick={send} disabled={!msg.body.trim()}>
                <Send className="h-4 w-4" /> Send message
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}