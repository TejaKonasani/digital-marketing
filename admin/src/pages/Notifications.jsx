import { Bell, BellOff, CheckCheck, AlertTriangle, Clock, User, Wallet, Cpu, Inbox } from 'lucide-react'
import { Card, PageHeader, Badge, Tabs, EmptyState } from '../components/ui'
import { useApp } from '../state/AppContext'

const typeMeta = {
  approval: { icon: Bell, tone: 'bg-amber-50 text-amber-600', label: 'Approval' },
  escalation: { icon: AlertTriangle, tone: 'bg-rose-50 text-rose-600', label: 'Escalation' },
  blocked: { icon: Clock, tone: 'bg-orange-50 text-orange-600', label: 'Blocked' },
  connector: { icon: Cpu, tone: 'bg-sky-50 text-sky-600', label: 'Connector' },
  client: { icon: User, tone: 'bg-indigo-50 text-indigo-600', label: 'Client' },
  finance: { icon: Wallet, tone: 'bg-emerald-50 text-emerald-600', label: 'Finance' },
  onboarding: { icon: Inbox, tone: 'bg-teal-50 text-teal-600', label: 'Onboarding' },
  system: { icon: Cpu, tone: 'bg-slate-100 text-slate-500', label: 'System' }
}

export default function Notifications() {
  const { notifications, markRead, markAllRead } = useApp()
  const [tab, setTab] = useState('all')

  const filtered = notifications.filter((n) => (tab === 'all' ? true : tab === 'unread' ? !n.read : n.type === tab))

  return (
    <div>
      <PageHeader
        title="Notifications"
        description="Approvals, escalations, blocked workflows, connector health and client events. Notifications are in-app in this prototype; email delivery would run through the (simulated) mail connector."
        actions={<button className="btn-secondary" onClick={markAllRead}><CheckCheck className="h-4 w-4" /> Mark all read</button>}
      />

      <div className="mb-4">
        <Tabs
          active={tab}
          onChange={setTab}
          tabs={[
            { id: 'all', label: 'All', count: notifications.length },
            { id: 'unread', label: 'Unread', count: notifications.filter((n) => !n.read).length },
            ...Object.entries(typeMeta).map(([id, m]) => ({ id, label: m.label, count: notifications.filter((n) => n.type === id).length }))
          ]}
        />
      </div>

      <Card bodyClass="p-0">
        {filtered.length === 0 ? (
          <div className="p-6">
            <EmptyState icon={BellOff} title="Nothing here" message="No notifications in this view." />
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((n) => {
              const meta = typeMeta[n.type] || typeMeta.system
              return (
                <div key={n.id} className={`flex items-start gap-3 px-5 py-4 transition hover:bg-slate-50 ${!n.read ? 'bg-indigo-50/30' : ''}`}>
                  <span className={`mt-0.5 rounded-lg p-2 ${meta.tone}`}>
                    <meta.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {!n.read && <span className="h-2 w-2 rounded-full bg-indigo-500" />}
                      <p className="text-sm font-semibold text-slate-800">{n.title}</p>
                      <Badge color="slate">{meta.label}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{n.body}</p>
                    <p className="mt-1 text-xs text-slate-400">{n.time}</p>
                  </div>
                  {!n.read && (
                    <button className="btn-ghost !px-2.5 !py-1 !text-xs" onClick={() => markRead(n.id)}>
                      Mark read
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </Card>
    </div>
  )
}