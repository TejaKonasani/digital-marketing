import { useState } from 'react'
import { Megaphone, PenTool, Image, Search as SearchIcon, MousePointerClick, CalendarDays, Eye, ThumbsUp, MessageSquare } from 'lucide-react'
import { Card, PageHeader, Badge, StatusBadge, KpiCard, Tabs, ProgressBar, SimulationBanner } from '../components/ui'
import { analytics } from '../data/finance'

const contentItems = [
  { id: 'CR-001', title: 'Cardiac Awareness Week — social post', client: 'City Care', type: 'Social', channel: 'Instagram / Facebook', version: 'v2', status: 'qa', owner: 'Lekha / Chitra', due: '2026-10-30', progress: 85 },
  { id: 'CR-002', title: 'Diabetes care — SEO landing page', client: 'City Care', type: 'Web / SEO', channel: 'Website', version: 'v2', status: 'in_production', owner: 'SEO Writer / PMG', due: '2026-11-04', progress: 45 },
  { id: 'CR-003', title: 'Patient Education Video — Ep.2', client: 'Nirvaan', type: 'Video', channel: 'YouTube', version: 'v1', status: 'in_production', owner: 'Video Producer', due: '2026-11-08', progress: 50 },
  { id: 'CR-004', title: 'Diwali Health Tips — content pack', client: 'City Care', type: 'Social pack', channel: 'Multi', version: 'v1', status: 'blocked', owner: 'CRT / GOV', due: '2026-10-31', progress: 58, flag: '2 clinical claims in GOV review' },
  { id: 'CR-005', title: 'Physiotherapy booking — ad set', client: 'Nirvaan', type: 'Paid ads', channel: 'Meta / Google', version: 'v3', status: 'approved', owner: 'Ad Copy / PMG', due: '2026-10-29', progress: 100 },
  { id: 'CR-006', title: 'Panchakarma season — content pack', client: 'Arogya', type: 'Content', channel: 'Blog / Social', version: 'v1', status: 'draft', owner: 'Lekha', due: '2026-11-10', progress: 20 }
]

const campaigns = [
  { id: 'CP-0031', name: 'Maternity Services Launch', client: 'City Care', channel: 'Google Ads', status: 'approval', budget: 120000, spend: 0, cpc: 0, cpa: 0, note: 'Awaiting budget cap approval (Class E)' },
  { id: 'CP-0028', name: 'Physiotherapy Bookings', client: 'Nirvaan', channel: 'Meta Ads', status: 'active', budget: 80000, spend: 54200, cpc: 0.36, cpa: 42, note: 'Live — simulation mode for spend' },
  { id: 'CP-0025', name: 'Corporate Health Check', client: 'MediScan', channel: 'Google Ads', status: 'paused', budget: 60000, spend: 60000, cpc: 1.18, cpa: 88, note: 'Paused — budget exhausted' },
  { id: 'CP-0022', name: 'Local SEO — Map Listings', client: 'Sunrise', channel: 'Local SEO', status: 'active', budget: 25000, spend: 9800, cpc: 0, cpa: 0, note: 'Optimising Google Business Profile' }
]

const seoItems = [
  { page: '/diabetes-care', client: 'City Care', kw: 'diabetes care hyderabad', pos: 4, prev: 7, traffic: 4200, status: 'improving' },
  { page: '/cardiac-awareness', client: 'City Care', kw: 'heart health awareness', pos: 9, prev: 12, traffic: 2800, status: 'improving' },
  { page: '/physiotherapy', client: 'Nirvaan', kw: 'physiotherapy near me', pos: 3, prev: 3, traffic: 5100, status: 'stable' },
  { page: '/panchakarma', client: 'Arogya', kw: 'panchakarma chennai', pos: 14, prev: 11, traffic: 900, status: 'declining' },
  { page: '/dental-implants', client: 'Sunrise', kw: 'dental implants pune', pos: 22, prev: 25, traffic: 400, status: 'improving' }
]

export default function Marketing() {
  const [tab, setTab] = useState('content')
  return (
    <div>
      <PageHeader
        title="Marketing & Content"
        description="MKT builds Samrudhi itself; PMG delivers paid media, SEO and growth for clients. CRT produces healthcare content, copy, visuals and video, then coordinates quality and publishing."
      />
      <SimulationBanner />

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Content in pipeline" value={contentItems.length} icon={PenTool} tone="rose" hint="Across 5 clients" />
        <KpiCard label="Active campaigns" value={campaigns.filter((c) => c.status === 'active').length} icon={Megaphone} tone="orange" hint={`${campaigns.filter((c) => c.status === 'approval').length} awaiting approval`} />
        {(() => {
          const ch = analytics.channelPerformance
          return <KpiCard label="Total impressions (30d)" value={`${Math.round(ch.reduce((s, c) => s + c.impressions, 0) / 1000000 * 10) / 10}M`} icon={Eye} tone="violet" hint="Authorised data only" />
        })()}
        <KpiCard label="Organic clicks (30d)" value="18.9k" icon={SearchIcon} tone="teal" delta={9.4} deltaLabel="MoM" hint="SEO / local" />
      </div>

      <div className="mb-4">
        <Tabs
          active={tab}
          onChange={setTab}
          tabs={[
            { id: 'content', label: 'Content production' },
            { id: 'creative', label: 'Creative review' },
            { id: 'campaigns', label: 'Paid campaigns' },
            { id: 'seo', label: 'SEO & growth' }
          ]}
        />
      </div>

      {tab === 'content' && (
        <Card title="Content production board" subtitle="Versioned drafts and assets with metadata" bodyClass="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px]">
              <thead className="border-b border-slate-100 bg-slate-50/60">
                <tr>
                  <th className="th">Item</th>
                  <th className="th">Client</th>
                  <th className="th">Type</th>
                  <th className="th">Version</th>
                  <th className="th">Progress</th>
                  <th className="th">Status</th>
                  <th className="th">Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {contentItems.map((c) => (
                  <tr key={c.id} className="transition hover:bg-slate-50/60">
                    <td className="td">
                      <p className="font-medium text-slate-800">{c.title}</p>
                      {c.flag && <p className="mt-0.5 text-xs text-amber-600">{c.flag}</p>}
                    </td>
                    <td className="td text-slate-600">{c.client}</td>
                    <td className="td"><Badge color="slate">{c.type}</Badge></td>
                    <td className="td font-mono text-xs text-slate-500">{c.version}</td>
                    <td className="td w-32">
                      <div className="flex items-center gap-2">
                        <ProgressBar value={c.progress} className="h-1.5 flex-1" color={c.status === 'blocked' ? 'bg-rose-500' : c.status === 'approved' ? 'bg-emerald-500' : 'bg-indigo-500'} />
                        <span className="text-xs text-slate-500">{c.progress}%</span>
                      </div>
                    </td>
                    <td className="td"><StatusBadge status={c.status} /></td>
                    <td className="td text-slate-500">{c.due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {tab === 'creative' && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {contentItems.filter((c) => ['qa', 'blocked', 'approved'].includes(c.status)).map((c) => (
            <Card key={c.id} title={c.title} subtitle={`${c.client} · ${c.version} · ${c.channel}`}
              actions={<StatusBadge status={c.status} />}>
              <div className="flex gap-4">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-teal-100 ring-1 ring-slate-200">
                  <Image className="h-8 w-8 text-indigo-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Review notes</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">
                    {c.status === 'qa' && 'QA screening clinical claims, brand consistency, alt text and platform dimensions. Technical checks passed; claims screen in progress.'}
                    {c.status === 'blocked' && 'Blocked: 2 clinical claims escalated to GOV for independent review. Publishing is gated until sign-off.'}
                    {c.status === 'approved' && 'Client approved this exact version. Ready for authorised publishing (simulation mode).'}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button className="btn-secondary !py-1.5 !text-xs"><ThumbsUp className="h-3.5 w-3.5" /> Approve</button>
                    <button className="btn-secondary !py-1.5 !text-xs"><MessageSquare className="h-3.5 w-3.5" /> Request changes</button>
                    <button className="btn-ghost !py-1.5 !text-xs"><Eye className="h-3.5 w-3.5" /> View full preview</button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'campaigns' && (
        <Card title="Paid media campaigns" subtitle="Spend monitoring is continuous; budget changes beyond approved caps require human approval" bodyClass="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px]">
              <thead className="border-b border-slate-100 bg-slate-50/60">
                <tr>
                  <th className="th">Campaign</th>
                  <th className="th">Channel</th>
                  <th className="th">Budget</th>
                  <th className="th">Spend</th>
                  <th className="th">CPC</th>
                  <th className="th">CPA</th>
                  <th className="th">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {campaigns.map((c) => (
                  <tr key={c.id} className="transition hover:bg-slate-50/60">
                    <td className="td">
                      <p className="font-medium text-slate-800">{c.name}</p>
                      <p className="mt-0.5 text-xs text-slate-500">{c.note}</p>
                    </td>
                    <td className="td"><Badge color="slate">{c.channel}</Badge></td>
                    <td className="td text-slate-600">₹{(c.budget / 1000).toFixed(0)}k</td>
                    <td className="td">
                      <div className="flex items-center gap-2">
                        <ProgressBar value={(c.spend / c.budget) * 100} className="h-1.5 w-20" color={c.spend / c.budget > 0.9 ? 'bg-rose-500' : 'bg-indigo-500'} />
                        <span className="text-xs text-slate-500">₹{(c.spend / 1000).toFixed(0)}k</span>
                      </div>
                    </td>
                    <td className="td text-slate-600">{c.cpc ? `₹${c.cpc}` : '—'}</td>
                    <td className="td text-slate-600">{c.cpa ? `₹${c.cpa}` : '—'}</td>
                    <td className="td"><StatusBadge status={c.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mx-5 mb-5 mt-4 flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2.5 text-xs text-amber-800 ring-1 ring-amber-200">
            <MousePointerClick className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>Major ad-spend changes are reserved human decisions (Class E). The Maternity Launch campaign is held at the approval gate until the Founder authorises the ₹1.2L/month cap.</span>
          </div>
        </Card>
      )}

      {tab === 'seo' && (
        <Card title="SEO & growth — keyword performance" subtitle="Organic rankings and traffic from authorised Search Console data" bodyClass="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead className="border-b border-slate-100 bg-slate-50/60">
                <tr>
                  <th className="th">Page</th>
                  <th className="th">Target keyword</th>
                  <th className="th">Position</th>
                  <th className="th">Change</th>
                  <th className="th">Traffic (30d)</th>
                  <th className="th">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {seoItems.map((s) => (
                  <tr key={s.page} className="transition hover:bg-slate-50/60">
                    <td className="td font-mono text-xs text-slate-600">{s.page}</td>
                    <td className="td text-slate-700">{s.kw}</td>
                    <td className="td font-semibold text-slate-800">#{s.pos}</td>
                    <td className="td">
                      <span className={s.prev > s.pos ? 'text-emerald-600' : s.prev < s.pos ? 'text-rose-600' : 'text-slate-400'}>
                        {s.prev > s.pos ? `▲ ${s.prev - s.pos}` : s.prev < s.pos ? `▼ ${s.pos - s.prev}` : '—'}
                      </span>
                    </td>
                    <td className="td text-slate-600">{s.traffic.toLocaleString()}</td>
                    <td className="td"><Badge color={s.status === 'improving' ? 'green' : s.status === 'declining' ? 'red' : 'slate'}>{s.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}