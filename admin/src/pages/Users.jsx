import { useState, useMemo } from 'react'
import { UserCog, Search, ShieldCheck, KeyRound, UserPlus } from 'lucide-react'
import { Card, PageHeader, Badge, StatusBadge, Tabs, EmptyState, Avatar, SimulationBanner } from '../components/ui'
import { users, accessRoles } from '../data/tasks'

export default function Users() {
  const [tab, setTab] = useState('users')
  const [query, setQuery] = useState('')
  const [portal, setPortal] = useState('all')

  const filtered = useMemo(() => {
    return users.filter((u) => {
      if (portal !== 'all' && !u.portal.toLowerCase().includes(portal)) return false
      if (query && !u.name.toLowerCase().includes(query.toLowerCase()) && !u.email.toLowerCase().includes(query.toLowerCase()) && !u.role.toLowerCase().includes(query.toLowerCase())) return false
      return true
    })
  }, [query, portal])

  return (
    <div>
      <PageHeader
        title="Users & Access Control"
        description="Role-based access with least privilege. Permission changes are audited. Disabled users cannot sign in, but their historical actions remain attributable."
        actions={<button className="btn-primary"><UserPlus className="h-4 w-4" /> Invite user</button>}
      />
      <SimulationBanner />

      <div className="mb-4">
        <Tabs
          active={tab}
          onChange={setTab}
          tabs={[
            { id: 'users', label: 'Users', count: users.length },
            { id: 'roles', label: 'Roles & boundaries', count: accessRoles.length }
          ]}
        />
      </div>

      {tab === 'users' && (
        <>
          <Card className="mb-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input className="input pl-9" placeholder="Search users by name, email or role…" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <select className="input lg:w-56" value={portal} onChange={(e) => setPortal(e.target.value)}>
                <option value="all">All portals</option>
                <option value="company">Company console</option>
                <option value="client">Client portal</option>
              </select>
            </div>
          </Card>
          <Card bodyClass="p-0" title={`Users (${filtered.length})`}>
            {filtered.length === 0 ? (
              <div className="p-6"><EmptyState icon={UserCog} title="No users match" /></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[820px]">
                  <thead className="border-b border-slate-100 bg-slate-50/60">
                    <tr>
                      <th className="th">User</th>
                      <th className="th">Role</th>
                      <th className="th">Portal</th>
                      <th className="th">MFA</th>
                      <th className="th">Last active</th>
                      <th className="th">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filtered.map((u) => (
                      <tr key={u.id} className="transition hover:bg-slate-50/60">
                        <td className="td">
                          <div className="flex items-center gap-2.5">
                            <Avatar name={u.name} size="sm" />
                            <div>
                              <p className="font-medium text-slate-800">{u.name}</p>
                              <p className="text-xs text-slate-400">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="td text-slate-600">{u.role}</td>
                        <td className="td">
                          <Badge color={u.portal.includes('Client') ? 'teal' : u.portal.includes('demo') ? 'amber' : 'indigo'}>{u.portal}</Badge>
                          {u.client && <p className="mt-1 max-w-[160px] truncate text-[11px] text-slate-400">{u.client}</p>}
                        </td>
                        <td className="td">
                          {u.mfa ? <Badge color="green">Enabled</Badge> : <Badge color="slate">Off</Badge>}
                        </td>
                        <td className="td text-slate-500">{u.lastActive}</td>
                        <td className="td"><StatusBadge status={u.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </>
      )}

      {tab === 'roles' && (
        <Card title="Access boundaries by role" subtitle="From the PRD user/access matrix — server-side enforced, not just hidden UI" bodyClass="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px]">
              <thead className="border-b border-slate-100 bg-slate-50/60">
                <tr>
                  <th className="th">Role</th>
                  <th className="th">Needs</th>
                  <th className="th">Access boundary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {accessRoles.map((r) => (
                  <tr key={r.role} className="transition hover:bg-slate-50/60">
                    <td className="td">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 shrink-0 text-indigo-500" />
                        <span className="font-medium text-slate-800">{r.role}</span>
                      </div>
                    </td>
                    <td className="td max-w-[280px] text-slate-600">{r.permissions}</td>
                    <td className="td max-w-[280px] text-slate-500">{r.scope}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mx-5 mb-5 mt-4 flex items-start gap-2 rounded-lg bg-indigo-50 px-3 py-2.5 text-xs text-indigo-800 ring-1 ring-indigo-200">
            <KeyRound className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              Authentication routes users to the correct portal and role-specific landing page. Demo accounts are seeded locally,
              password-hashed, and replaced before any non-demo deployment.
            </span>
          </div>
        </Card>
      )}
    </div>
  )
}