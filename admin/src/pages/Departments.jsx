import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Building2, Users, ArrowLeft, ArrowRight, ShieldAlert, Target, GitBranch, ChevronRight } from 'lucide-react'
import { Card, PageHeader, Badge, StatusBadge, ProgressBar, EmptyState } from '../components/ui'
import { departments, deptById, totalPositions } from '../data/departments'
import { positionsByDept } from '../data/positions'
import { authorityClasses } from '../data/positions'

const deptColorMap = {
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', ring: 'ring-indigo-200', bar: 'bg-indigo-500', dot: 'bg-indigo-500' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', ring: 'ring-amber-200', bar: 'bg-amber-500', dot: 'bg-amber-500' },
  fuchsia: { bg: 'bg-fuchsia-50', text: 'text-fuchsia-700', ring: 'ring-fuchsia-200', bar: 'bg-fuchsia-500', dot: 'bg-fuchsia-500' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-700', ring: 'ring-teal-200', bar: 'bg-teal-500', dot: 'bg-teal-500' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-700', ring: 'ring-sky-200', bar: 'bg-sky-500', dot: 'bg-sky-500' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', ring: 'ring-rose-200', bar: 'bg-rose-500', dot: 'bg-rose-500' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-700', ring: 'ring-orange-200', bar: 'bg-orange-500', dot: 'bg-orange-500' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-700', ring: 'ring-violet-200', bar: 'bg-violet-500', dot: 'bg-violet-500' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', ring: 'ring-emerald-200', bar: 'bg-emerald-500', dot: 'bg-emerald-500' },
  cyan: { bg: 'bg-cyan-50', text: 'text-cyan-700', ring: 'ring-cyan-200', bar: 'bg-cyan-500', dot: 'bg-cyan-500' },
  slate: { bg: 'bg-slate-100', text: 'text-slate-700', ring: 'ring-slate-200', bar: 'bg-slate-500', dot: 'bg-slate-500' }
}

function DepartmentDetail({ deptId }) {
  const dept = deptById(deptId)
  const navigate = useNavigate()
  if (!dept) return <EmptyState icon={Building2} title="Department not found" />
  const c = deptColorMap[dept.color]
  const positions = positionsByDept(dept.id)
  const authCounts = {}
  positions.forEach((p) => (authCounts[p.authority] = (authCounts[p.authority] || 0) + 1))

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/departments')} className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800">
        <ArrowLeft className="h-4 w-4" /> All departments
      </button>

      <div className={`card overflow-hidden`}>
        <div className={`flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between ${c.bg}`}>
          <div className="flex items-start gap-4">
            <div className={`rounded-xl bg-white p-3 shadow-card ring-1 ${c.ring}`}>
              <Building2 className={`h-6 w-6 ${c.text}`} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900">{dept.name}</h1>
                <Badge color={dept.color}>{dept.prefix} · {dept.positions} positions</Badge>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                Led by <span className="font-semibold">{dept.lead}</span> — {dept.leadRole}
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            {[
              { v: dept.positions, l: 'Positions' },
              { v: positions.filter((p) => p.status === 'active').length, l: 'Active' },
              { v: positions.filter((p) => p.status === 'needs_review').length, l: 'In review' }
            ].map((s) => (
              <div key={s.l} className="text-center">
                <p className="text-xl font-bold text-slate-900">{s.v}</p>
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 p-6 lg:grid-cols-2">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500"><Target className="h-3.5 w-3.5" /> Mandate</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{dept.mandate}</p>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500"><ShieldAlert className="h-3.5 w-3.5" /> Boundary</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{dept.boundary}</p>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500"><GitBranch className="h-3.5 w-3.5" /> Authority distribution</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {Object.entries(authCounts).map(([cls, n]) => {
                const ac = authorityClasses.find((a) => a.id === cls)
                return <Badge key={cls} color={ac?.color || 'slate'}>{cls} · {ac?.name} — {n}</Badge>
              })}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Department KPIs</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {dept.kpis.map((k) => (
                <span key={k} className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">{k}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Card title={`Positions in ${dept.short}`} subtitle={`${positions.length} logical positions — click any to inspect its full contract`} bodyClass="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead className="border-b border-slate-100 bg-slate-50/60">
              <tr>
                <th className="th">Position ID</th>
                <th className="th">Canonical ID</th>
                <th className="th">Title</th>
                <th className="th">Authority</th>
                <th className="th">Status</th>
                <th className="th">Version</th>
                <th className="th"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {positions.map((p) => (
                <tr key={p.positionId} onClick={() => navigate(`/positions/${p.positionId}`)} className="cursor-pointer transition hover:bg-indigo-50/40">
                  <td className="td font-mono text-xs font-semibold text-indigo-600">{p.positionId}</td>
                  <td className="td font-mono text-xs text-slate-500">{p.samAgId}</td>
                  <td className="td">
                    <span className="font-medium text-slate-800">{p.title}</span>
                    {p.person && <span className="ml-2 text-xs text-slate-400">({p.person})</span>}
                    {p.isLead && <Badge color={dept.color} className="ml-2">Lead</Badge>}
                  </td>
                  <td className="td"><Badge color={authorityClasses.find((a) => a.id === p.authority)?.color || 'slate'}>{p.authority} · {p.authorityLabel}</Badge></td>
                  <td className="td"><StatusBadge status={p.status} /></td>
                  <td className="td text-slate-500">v{p.version}</td>
                  <td className="td text-slate-300"><ChevronRight className="h-4 w-4" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default function Departments() {
  const { id } = useParams()
  if (id) return <DepartmentDetail deptId={id} />

  return (
    <div>
      <PageHeader
        title="Departments"
        description={`11 departments · ${totalPositions} logical positions. The 194 entries are logical roles in the operating model — shared runtime services may execute multiple roles while identity, instructions, permissions and audit history remain distinct.`}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {departments.map((d) => {
          const c = deptColorMap[d.color]
          const positions = positionsByDept(d.id)
          const active = positions.filter((p) => p.status === 'active').length
          return (
            <Link key={d.id} to={`/departments/${d.id}`} className="card card-hover group flex flex-col p-5">
              <div className="flex items-start justify-between">
                <div className={`rounded-xl p-2.5 ring-1 ${c.bg} ${c.ring}`}>
                  <Building2 className={`h-5 w-5 ${c.text}`} />
                </div>
                <Badge color={d.color}>{d.prefix}</Badge>
              </div>
              <h3 className="mt-3 text-sm font-bold text-slate-900 group-hover:text-indigo-700">{d.name}</h3>
              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">{d.mandate}</p>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Users className="h-3.5 w-3.5" />
                  <span className="font-semibold text-slate-700">{d.positions}</span> positions
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                  {active} active
                </div>
                <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500" />
              </div>
              <div className="mt-2">
                <ProgressBar value={(active / d.positions) * 100} color={c.bar} className="h-1.5" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}