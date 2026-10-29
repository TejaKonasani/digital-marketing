import { useState } from 'react'
import { MessageSquare, Send, Paperclip, Smile } from 'lucide-react'
import { Card, Avatar, Badge } from '../components/ui'
import { conversations } from '../data/clientData'

export default function Messages() {
  const [activeId, setActiveId] = useState(conversations[0].id)
  const [draft, setDraft] = useState('')
  const [extra, setExtra] = useState({})
  const active = conversations.find((c) => c.id === activeId)

  const allMessages = (c) => [...c.messages, ...(extra[c.id] || [])]

  const send = () => {
    if (!draft.trim()) return
    setExtra((e) => ({ ...e, [activeId]: [...(e[activeId] || []), { from: 'me', text: draft.trim(), time: 'Just now' }] }))
    setDraft('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Messages</h1>
        <p className="mt-1 text-sm text-slate-500">Talk to your Samrudhi team. Ask questions, share files, or give feedback on anything.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Conversation list */}
        <div className="card p-3 lg:col-span-1">
          <div className="space-y-1">
            {conversations.map((c) => {
              const msgs = allMessages(c)
              const last = msgs[msgs.length - 1]
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${activeId === c.id ? 'bg-brand-50' : 'hover:bg-slate-50'}`}
                >
                  <Avatar name={c.with} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-slate-800">{c.with}</p>
                      {c.unread > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1.5 text-[10px] font-bold text-white">{c.unread}</span>}
                    </div>
                    <p className="truncate text-xs text-slate-500">{last?.text}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Thread */}
        <div className="card flex h-[560px] flex-col lg:col-span-2">
          <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
            <Avatar name={active?.with} size="sm" />
            <div>
              <p className="text-sm font-bold text-slate-800">{active?.with}</p>
              <p className="text-xs text-emerald-600">Typically replies within a few hours</p>
            </div>
          </div>
          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
            {allMessages(active).map((m, i) => (
              <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${m.from === 'me' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                  <p className="text-sm leading-relaxed">{m.text}</p>
                  <p className={`mt-1 text-[10px] ${m.from === 'me' ? 'text-brand-100' : 'text-slate-400'}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 p-4">
            <div className="flex items-center gap-2">
              <button className="rounded-xl p-2 text-slate-400 hover:bg-slate-100" aria-label="Attach file"><Paperclip className="h-4.5 w-4.5 h-[18px] w-[18px]" /></button>
              <input
                className="input flex-1"
                placeholder="Type your message…"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
              />
              <button className="btn-primary !px-3" onClick={send} aria-label="Send">
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              In this demo, messages are stored locally — our team won't actually receive them.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}