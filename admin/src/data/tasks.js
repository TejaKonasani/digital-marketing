// Tasks, approvals and pending decisions (PRD Sections 9, 15)
export const tasks = [
  { id: 'TASK-0006', name: 'QA: claims, brand, technical & policy', client: 'City Care Multispeciality Hospital', owner: 'GOV-002', dept: 'GOV', status: 'in_progress', priority: 'high', due: '2026-10-30', workflow: 'WF-CLIENT-CONTENT-0001', stage: 9 },
  { id: 'TASK-0007', name: 'Client review & approval', client: 'City Care Multispeciality Hospital', owner: 'Client', dept: 'CEX', status: 'blocked', priority: 'high', due: '2026-10-31', workflow: 'WF-CLIENT-CONTENT-0001', stage: 10, note: 'Blocked on QA pass' },
  { id: 'TASK-0101', name: 'Diabetes landing page — technical SEO audit', client: 'City Care Multispeciality Hospital', owner: 'PMG-005', dept: 'PMG', status: 'in_progress', priority: 'medium', due: '2026-10-31', workflow: 'WF-CLIENT-CONTENT-0002', stage: 7 },
  { id: 'TASK-0102', name: 'Maternity campaign — budget cap approval', client: 'City Care Multispeciality Hospital', owner: 'Human (Founder)', dept: 'PMG', status: 'pending_approval', priority: 'high', due: '2026-10-30', workflow: 'WF-PAID-CAMPAIGN-0003', stage: 10, note: 'Major ad-spend change — human approval required' },
  { id: 'TASK-0103', name: 'Video Ep.2 — script draft', client: 'Nirvaan Wellness Clinic', owner: 'CRT-006', dept: 'CRT', status: 'in_progress', priority: 'medium', due: '2026-10-31', workflow: 'WF-CLIENT-CONTENT-0004', stage: 8 },
  { id: 'TASK-0104', name: 'Diwali pack — clinical claims review', client: 'City Care Multispeciality Hospital', owner: 'GOV-008', dept: 'GOV', status: 'escalated', priority: 'critical', due: '2026-10-29', workflow: 'WF-CLIENT-CONTENT-0007', stage: 9, note: '2 claims escalated for independent review' },
  { id: 'TASK-0105', name: 'Sunrise Dental — brand asset collection', client: 'Sunrise Dental Studio', owner: 'CEX-002', dept: 'CEX', status: 'needs_information', priority: 'medium', due: '2026-11-02', workflow: 'WF-ONBOARD-0006', stage: 4, note: 'NEEDS_INFORMATION: logo, colours, fonts' },
  { id: 'TASK-0106', name: 'Meta Ads — post-publish verification', client: 'Nirvaan Wellness Clinic', owner: 'CRT-013', dept: 'CRT', status: 'in_progress', priority: 'medium', due: '2026-10-29', workflow: 'WF-PAID-CAMPAIGN-0008', stage: 11 },
  { id: 'TASK-0107', name: 'QBR — data reconciliation', client: 'City Care Multispeciality Hospital', owner: 'DAT-004', dept: 'DAT', status: 'in_progress', priority: 'medium', due: '2026-10-30', workflow: 'WF-REPORT-0009', stage: 12 },
  { id: 'TASK-0108', name: 'MediScan — renewal risk review', client: 'MediScan Diagnostics', owner: 'CEX-010', dept: 'CEX', status: 'in_progress', priority: 'high', due: '2026-10-31', workflow: '—', stage: null, note: 'Health score 58 — 2 approval delays' },
  { id: 'TASK-0109', name: 'Ayurveda pack — brief clarification', client: 'Arogya Ayurveda Centre', owner: 'CRT-002', dept: 'CRT', status: 'needs_information', priority: 'low', due: '2026-11-01', workflow: '—', stage: 5, note: 'NEEDS_INFORMATION: audience, CTA, sources' },
  { id: 'TASK-0110', name: 'Invoice draft — September services', client: 'City Care Multispeciality Hospital', owner: 'FIN-002', dept: 'FIN', status: 'pending_approval', priority: 'medium', due: '2026-11-01', workflow: '—', stage: 13, note: 'Payment remains human-authorised' }
]

export const approvals = [
  {
    id: 'APR-001',
    title: 'Publish cardiac awareness social post',
    type: 'Publishing',
    client: 'City Care Multispeciality Hospital',
    requestedBy: 'Prakash (CRT-013)',
    approver: 'R. Iyer (Client Admin) + Founder (policy)',
    status: 'pending',
    risk: 'high',
    reason: 'External side effect (Class D) — requires client approval of exact version + authorised connector',
    submitted: '2026-10-29 10:12',
    due: '2026-10-30',
    artefacts: ['COPY-0007 v2', 'ASSET-0021 v1']
  },
  {
    id: 'APR-002',
    title: 'Maternity campaign budget cap ₹1.2L/month',
    type: 'Ad spend',
    client: 'City Care Multispeciality Hospital',
    requestedBy: 'Sandeep (PMG-001)',
    approver: 'Founder (reserved decision)',
    status: 'pending',
    risk: 'critical',
    reason: 'Major ad-spend change beyond approved cap — reserved human decision (Class E)',
    submitted: '2026-10-28 16:40',
    due: '2026-10-30',
    artefacts: ['Campaign plan CP-0031', 'Budget worksheet']
  },
  {
    id: 'APR-003',
    title: 'Clinical claim — "reduces cardiac risk by 40%"',
    type: 'Clinical sign-off',
    client: 'City Care Multispeciality Hospital',
    requestedBy: 'Lekha (CRT-004)',
    approver: 'GOV-008 + Client medical advisor',
    status: 'in_review',
    risk: 'high',
    reason: 'Healthcare claim requires independent review and client medical sign-off',
    submitted: '2026-10-28 09:05',
    due: '2026-10-29',
    artefacts: ['COPY-0007 v2 (claim #2)', 'RESEARCH-0003 (source S4)']
  },
  {
    id: 'APR-004',
    title: 'Invoice INV-2026-0912 — September services',
    type: 'Commercial',
    client: 'City Care Multispeciality Hospital',
    requestedBy: 'Lakshmi (FIN-001)',
    approver: 'Founder (payment authorisation)',
    status: 'pending',
    risk: 'medium',
    reason: 'Invoice prepared from accepted work; payment remains human-authorised (Class E)',
    submitted: '2026-10-29 08:30',
    due: '2026-11-01',
    artefacts: ['INV-2026-0912 draft', 'Acceptance record AC-0044']
  },
  {
    id: 'APR-005',
    title: 'Diwali pack — 2 clinical claims',
    type: 'Clinical sign-off',
    client: 'City Care Multispeciality Hospital',
    requestedBy: 'GOV-002',
    approver: 'GOV-008 + Client medical advisor',
    status: 'escalated',
    risk: 'critical',
    reason: 'QA escalation — claims lack sufficient source backing',
    submitted: '2026-10-27 14:22',
    due: '2026-10-29',
    artefacts: ['Diwali pack v1 (claims #1, #3)']
  },
  {
    id: 'APR-006',
    title: 'Approve diabetes landing page copy',
    type: 'Client approval',
    client: 'City Care Multispeciality Hospital',
    requestedBy: 'System (auto-routed after QA)',
    approver: 'R. Iyer (Client Admin)',
    status: 'pending',
    risk: 'medium',
    reason: 'Version-specific client decision required before publishing',
    submitted: '2026-10-29 07:50',
    due: '2026-10-31',
    artefacts: ['PAGE-0014 v2', 'SEO brief BRIEF-0003 v2']
  }
]

export const notifications = [
  { id: 'N-001', type: 'approval', title: 'Budget cap approval needed', body: 'Maternity campaign ₹1.2L/month exceeds approved cap. Founder decision required.', time: '12m ago', read: false, link: '/approvals' },
  { id: 'N-002', type: 'escalation', title: 'Clinical claims escalated', body: 'Diwali pack: 2 claims escalated to GOV-008 for independent review.', time: '1h ago', read: false, link: '/assurance' },
  { id: 'N-003', type: 'blocked', title: 'Workflow blocked', body: 'WF-CLIENT-CONTENT-0007 blocked on QA escalation (2 clinical claims).', time: '2h ago', read: false, link: '/workflows' },
  { id: 'N-004', type: 'connector', title: 'Meta connector degraded', body: 'Meta Ads connector latency above threshold. Simulation mode active for publish tests.', time: '3h ago', read: true, link: '/technology' },
  { id: 'N-005', type: 'client', title: 'Client approval pending', body: 'City Care: cardiac social post awaiting client review (QA pass expected today).', time: '4h ago', read: true, link: '/clients' },
  { id: 'N-006', type: 'finance', title: 'Invoice ready for authorisation', body: 'INV-2026-0912 prepared from accepted work. Payment authorisation pending.', time: '5h ago', read: true, link: '/finance' },
  { id: 'N-007', type: 'onboarding', title: 'Onboarding needs client input', body: 'Sunrise Dental: brand assets (logo, colours, fonts) still missing.', time: '6h ago', read: true, link: '/clients' },
  { id: 'N-008', type: 'system', title: 'Agent run failed (retried)', body: 'SAM-AG-156 (Data pipeline) timed out; auto-retry succeeded. No side effects duplicated.', time: '8h ago', read: true, link: '/agentops' }
]

export const users = [
  { id: 'U-001', name: 'Vikram', email: 'vikram@samrudhi.ai', role: 'Founder / Super Admin', portal: 'Company console', status: 'active', lastActive: 'Now', mfa: true },
  { id: 'U-002', name: 'Divya', email: 'divya@samrudhi.ai', role: 'Client Experience Lead', portal: 'Company console', status: 'active', lastActive: '5m ago', mfa: true },
  { id: 'U-003', name: 'Karthik', email: 'karthik@samrudhi.ai', role: 'Head of Business Development', portal: 'Company console', status: 'active', lastActive: '18m ago', mfa: true },
  { id: 'U-004', name: 'Arjun', email: 'arjun@samrudhi.ai', role: 'Technology & AgentOps Lead', portal: 'Company console', status: 'active', lastActive: '1h ago', mfa: true },
  { id: 'U-005', name: 'Satya', email: 'satya@samrudhi.ai', role: 'Independent Assurance Lead', portal: 'Company console', status: 'active', lastActive: '22m ago', mfa: true },
  { id: 'U-006', name: 'Lakshmi', email: 'lakshmi@samrudhi.ai', role: 'Finance & Administration Lead', portal: 'Company console', status: 'active', lastActive: '3h ago', mfa: true },
  { id: 'U-007', name: 'R. Iyer', email: 'riyer@citycare.in', role: 'Client Admin', portal: 'Client portal', status: 'active', lastActive: '1h ago', mfa: false, client: 'City Care Multispeciality Hospital' },
  { id: 'U-008', name: 'S. Menon', email: 'smeon@nirvaan.in', role: 'Client Owner', portal: 'Client portal', status: 'active', lastActive: '2d ago', mfa: false, client: 'Nirvaan Wellness Clinic' },
  { id: 'U-009', name: 'A. Kulkarni', email: 'ak@mediscan.in', role: 'Client Reviewer', portal: 'Client portal', status: 'active', lastActive: '6h ago', mfa: false, client: 'MediScan Diagnostics' },
  { id: 'U-010', name: 'Demo User', email: 'demo@samrudhi.ai', role: 'Demo user', portal: 'Both (demo workspace)', status: 'active', lastActive: '—', mfa: false, client: 'Demo workspace' }
]

export const accessRoles = [
  { role: 'Founder / Super Admin', scope: 'Company console; sensitive actions still require confirmation', permissions: 'Policy, platform configuration, critical risks, reserved decisions' },
  { role: 'Company Admin', scope: 'Company console within granted permissions', permissions: 'Clients, tasks, workflows, content, approvals, integrations, reports' },
  { role: 'Department Lead', scope: 'Department queue and necessary assigned client context', permissions: 'Owned work, quality, capacity, blockers, outcomes' },
  { role: 'Agent runtime', scope: 'Assigned input and allow-listed tools only', permissions: 'Bounded execution using role-specific tools' },
  { role: 'Independent Assurance', scope: 'Read relevant evidence; cannot alter original artefact or suppress findings', permissions: 'Evaluate output, evidence, permissions and incidents' },
  { role: 'Client Owner/Admin', scope: 'Own client workspace only', permissions: 'Own client profile, users, files, briefs, deliverables, approvals' },
  { role: 'Client Reviewer', scope: 'Assigned items and review actions only', permissions: 'Review assigned work and make authorised decisions' },
  { role: 'Client Viewer', scope: 'Read-only subset of own workspace', permissions: 'See shared project status and reports' },
  { role: 'Demo user', scope: 'Demo workspace; external writes disabled', permissions: 'Explore seeded scenario' }
]