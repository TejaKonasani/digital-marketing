// Centralized Overview Dashboard data (PRD Sections 3, 5, 9, 14, 15)
// Reference simulation date: Thursday, 29 October 2026

export const SIMULATION_TODAY = '2026-10-29'

export const overviewKpis = {
  activeClients: {
    label: 'ACTIVE CLIENTS',
    value: 12,
    delta: '+20%',
    deltaLabel: 'vs last month',
    trend: 'up',
    color: '#6366f1',
    link: '/clients?status=active'
  },
  activeProjects: {
    label: 'ACTIVE PROJECTS',
    value: 28,
    delta: '+12%',
    deltaLabel: 'vs last month',
    trend: 'up',
    color: '#0ea5e9',
    link: '/workflows?status=active'
  },
  completedProjects: {
    label: 'COMPLETED PROJECTS',
    value: 56,
    delta: '+18%',
    deltaLabel: 'vs last month',
    trend: 'up',
    color: '#10b981',
    link: '/workflows?status=completed'
  },
  overallProjects: {
    label: 'OVERALL PROJECTS',
    value: 112,
    delta: '+16%',
    deltaLabel: 'vs last month',
    trend: 'up',
    color: '#8b5cf6',
    link: '/workflows'
  }
}

// Section B — Project Health Data (Total: 112)
export const projectHealth = {
  total: 112,
  items: [
    {
      id: 'on_track',
      label: 'On Track',
      count: 72,
      pct: '64%',
      value: 72,
      color: '#10b981',
      dotClass: 'bg-emerald-500',
      link: '/workflows?status=on_track'
    },
    {
      id: 'at_risk',
      label: 'At Risk',
      count: 18,
      pct: '16%',
      value: 18,
      color: '#f59e0b',
      dotClass: 'bg-amber-500',
      link: '/workflows?status=at_risk'
    },
    {
      id: 'overdue',
      label: 'Overdue',
      count: 12,
      pct: '11%',
      value: 12,
      color: '#ef4444',
      dotClass: 'bg-rose-500',
      link: '/workflows?status=overdue'
    },
    {
      id: 'blocked',
      label: 'Blocked',
      count: 10,
      pct: '9%',
      value: 10,
      color: '#94a3b8',
      dotClass: 'bg-slate-400',
      link: '/workflows?status=blocked'
    }
  ]
}

// Section B — Agent Status Summary (Total: 194)
export const agentStatusSummary = {
  total: 194,
  items: [
    {
      id: 'healthy',
      label: 'Healthy',
      count: 156,
      pct: '80%',
      value: 156,
      color: '#10b981',
      dotClass: 'bg-emerald-500',
      link: '/agents?status=healthy'
    },
    {
      id: 'needs_attention',
      label: 'Needs Attention',
      count: 24,
      pct: '12%',
      value: 24,
      color: '#f59e0b',
      dotClass: 'bg-amber-500',
      link: '/agents?status=needs_attention'
    },
    {
      id: 'error',
      label: 'Error',
      count: 8,
      pct: '4%',
      value: 8,
      color: '#ef4444',
      dotClass: 'bg-rose-500',
      link: '/agents?status=error'
    },
    {
      id: 'idle',
      label: 'Idle',
      count: 6,
      pct: '4%',
      value: 6,
      color: '#64748b',
      dotClass: 'bg-slate-500',
      link: '/agents?status=idle'
    }
  ]
}

// Section B — Pending Approvals (Total: 21)
export const pendingApprovals = {
  total: 21,
  items: [
    {
      id: 'client_approvals',
      label: 'Client approvals',
      count: 6,
      link: '/tasks?type=client_approval'
    },
    {
      id: 'content_reviews',
      label: 'Content reviews',
      count: 8,
      link: '/tasks?type=content_review'
    },
    {
      id: 'budget_approvals',
      label: 'Budget approvals',
      count: 3,
      link: '/tasks?type=budget_approval'
    },
    {
      id: 'other_requests',
      label: 'Other requests',
      count: 4,
      link: '/tasks?type=other'
    }
  ]
}

// Section C — Upcoming Deadlines (Matching screenshot table exactly)
export const upcomingDeadlines = [
  {
    id: 'PRJ-2026-001',
    name: 'Cardiac Awareness Campaign',
    deliverable: 'Social media content series',
    client: 'City Care Hospital',
    fullClient: 'City Care Multispeciality Hospital',
    deadline: '2026-10-30',
    deadlineFormatted: '30 Oct 2026',
    daysLeft: 1,
    daysLeftLabel: '1 day',
    status: 'In Review',
    priority: 'High',
    iconType: 'sparkles',
    iconBg: 'bg-purple-50 text-purple-600',
    workflowId: 'WF-CLIENT-CONTENT-0001',
    stage: 'Stage 10 · Client review',
    owner: 'Prakash (CRT-013)',
    description: 'Multi-post educational carousel on early hypertension detection and cardiac emergency protocols.'
  },
  {
    id: 'PRJ-2026-002',
    name: 'Maternity Service Promotion',
    deliverable: 'Campaign creatives + ads',
    client: 'Nirvaan Wellness',
    fullClient: 'Nirvaan Wellness Clinic',
    deadline: '2026-11-02',
    deadlineFormatted: '02 Nov 2026',
    daysLeft: 4,
    daysLeftLabel: '4 days',
    status: 'Client Approval',
    priority: 'Medium',
    iconType: 'chart',
    iconBg: 'bg-sky-50 text-sky-600',
    workflowId: 'WF-PAID-CAMPAIGN-0003',
    stage: 'Stage 10 · Client review',
    owner: 'Sandeep (PMG-001)',
    description: 'Targeted Meta and Google ad variants focusing on personalized prenatal care packages.'
  },
  {
    id: 'PRJ-2026-003',
    name: 'Diabetes Education Series',
    deliverable: 'Blog + infographic set',
    client: 'MediScan Diagnostics',
    fullClient: 'MediScan Diagnostics',
    deadline: '2026-11-03',
    deadlineFormatted: '03 Nov 2026',
    daysLeft: 5,
    daysLeftLabel: '5 days',
    status: 'In Production',
    priority: 'Medium',
    iconType: 'activity',
    iconBg: 'bg-purple-50 text-purple-600',
    workflowId: 'WF-CLIENT-CONTENT-0002',
    stage: 'Stage 8 · Production',
    owner: 'Lekha (CRT-004)',
    description: 'Long-form editorial guide detailing HbA1c screening intervals with clinical infocards.'
  },
  {
    id: 'PRJ-2026-004',
    name: 'Oral Hygiene Tips Campaign',
    deliverable: 'Video + social posts',
    client: 'Sunrise Dental',
    fullClient: 'Sunrise Dental Studio',
    deadline: '2026-11-04',
    deadlineFormatted: '04 Nov 2026',
    daysLeft: 6,
    daysLeftLabel: '6 days',
    status: 'Planning',
    priority: 'Low',
    iconType: 'message',
    iconBg: 'bg-cyan-50 text-cyan-600',
    workflowId: 'WF-ONBOARD-0006',
    stage: 'Stage 6 · Planning',
    owner: 'Anvesh (RES-004)',
    description: 'Short-form reel scripts and educational infographic on modern orthodontic aligners.'
  },
  {
    id: 'PRJ-2026-005',
    name: 'Ayurveda Awareness Week',
    deliverable: 'Ad creatives + landing page',
    client: 'Arogya Ayurveda',
    fullClient: 'Arogya Ayurveda Centre',
    deadline: '2026-11-05',
    deadlineFormatted: '05 Nov 2026',
    daysLeft: 7,
    daysLeftLabel: '7 days',
    status: 'Content Review',
    priority: 'Medium',
    iconType: 'target',
    iconBg: 'bg-orange-50 text-orange-600',
    workflowId: 'WF-CLIENT-CONTENT-0007',
    stage: 'Stage 9 · QA Review',
    owner: 'Yojana (OPS-003)',
    description: 'Diwali wellness and Panchakarma seasonal packages landing page and search ad set.'
  },
  // Additional projects for extended filters (Weeks & Months)
  {
    id: 'PRJ-2026-006',
    name: 'Orthodontics Smile Launch',
    deliverable: 'Brand kit + reel series',
    client: 'SmileWorks Ortho',
    fullClient: 'SmileWorks Orthodontics',
    deadline: '2026-11-18',
    deadlineFormatted: '18 Nov 2026',
    daysLeft: 20,
    daysLeftLabel: '20 days',
    status: 'Planning',
    priority: 'Low',
    iconType: 'sparkles',
    iconBg: 'bg-teal-50 text-teal-600',
    workflowId: 'WF-CLIENT-CONTENT-0010',
    stage: 'Stage 6 · Planning',
    owner: 'Chitra (CRT-007)',
    description: 'New clinic launch visual package with patient testimonial video templates.'
  },
  {
    id: 'PRJ-2026-007',
    name: 'Winter Wellness Regimen',
    deliverable: 'Multi-channel promotional pack',
    client: 'Arogya Ayurveda',
    fullClient: 'Arogya Ayurveda Centre',
    deadline: '2026-11-25',
    deadlineFormatted: '25 Nov 2026',
    daysLeft: 27,
    daysLeftLabel: '27 days',
    status: 'In Production',
    priority: 'Medium',
    iconType: 'target',
    iconBg: 'bg-emerald-50 text-emerald-600',
    workflowId: 'WF-CLIENT-CONTENT-0011',
    stage: 'Stage 8 · Production',
    owner: 'Shruti (CRT-002)',
    description: 'Herbal immunity winter regimen campaign with email newsletters and doctor Q&A reels.'
  },
  {
    id: 'PRJ-2026-008',
    name: 'Annual Preventive Health Report',
    deliverable: 'Infographic whitepaper + PR',
    client: 'City Care Hospital',
    fullClient: 'City Care Multispeciality Hospital',
    deadline: '2026-12-08',
    deadlineFormatted: '08 Dec 2026',
    daysLeft: 40,
    daysLeftLabel: '40 days',
    status: 'Research',
    priority: 'Low',
    iconType: 'sparkles',
    iconBg: 'bg-sky-50 text-sky-600',
    workflowId: 'WF-REPORT-0012',
    stage: 'Stage 7 · Research / strategy',
    owner: 'Drishti (DAT-002)',
    description: 'Annual healthcare survey analyzing 15,000 preventive screening outcomes across Telangana.'
  }
]

// Section D — Recent Client Activities (Matching screenshot exactly)
export const recentClientActivities = [
  {
    id: 'ACT-001',
    title: 'Marketing plan sent to client for approval',
    subtitle: 'City Care Hospital · Cardiac Awareness Campaign',
    client: 'City Care Multispeciality Hospital',
    project: 'Cardiac Awareness Campaign',
    time: '12 minutes ago',
    timestamp: '2026-10-29 17:27',
    status: 'Awaiting Approval',
    statusTone: 'amber',
    icon: 'send',
    iconBg: 'bg-emerald-50 text-emerald-600',
    agent: 'Divya (CEX-001) / Sankalan (OPS-001)',
    description: 'Agent Sankalan generated the comprehensive Q4 cardiac awareness roadmap and Divya routed it to client administrator Dr. R. Iyer for formal approval before production kickoff.',
    actionText: 'Review Request',
    link: '/tasks'
  },
  {
    id: 'ACT-002',
    title: 'Client requested revision for content draft',
    subtitle: 'Nirvaan Wellness · Maternity Service Promotion',
    client: 'Nirvaan Wellness Clinic',
    project: 'Maternity Service Promotion',
    time: '48 minutes ago',
    timestamp: '2026-10-29 16:51',
    status: 'Revision Requested',
    statusTone: 'blue',
    icon: 'edit',
    iconBg: 'bg-amber-50 text-amber-600',
    agent: 'S. Menon (Client Reviewer) → Chitra (CRT-007)',
    description: 'Client requested revision on ad creative variant B: "Please adjust background warmth and make the consultation disclaimer text 12pt minimum."',
    actionText: 'View Details',
    link: '/tasks'
  },
  {
    id: 'ACT-003',
    title: 'Client approved social media post',
    subtitle: 'Sunrise Dental · Oral Hygiene Tips',
    client: 'Sunrise Dental Studio',
    project: 'Oral Hygiene Tips Campaign',
    time: '2 hours ago',
    timestamp: '2026-10-29 15:39',
    status: 'Approved',
    statusTone: 'green',
    icon: 'check',
    iconBg: 'bg-emerald-50 text-emerald-600',
    agent: 'Dr. Joshi (Client Admin) → Prakash (CRT-013)',
    description: 'Carousel post #3 "5 Habits for Healthier Gums" approved without changes. Staged for automated scheduling window.',
    actionText: 'Open Project',
    link: '/workflows'
  },
  {
    id: 'ACT-004',
    title: 'Content draft submitted for review',
    subtitle: 'MediScan Diagnostics · Diabetes Education Series',
    client: 'MediScan Diagnostics',
    project: 'Diabetes Education Series',
    time: '3 hours ago',
    timestamp: '2026-10-29 14:39',
    status: 'In Review',
    statusTone: 'blue',
    icon: 'file',
    iconBg: 'bg-sky-50 text-sky-600',
    agent: 'Lekha (CRT-004) → Client Review Gate',
    description: '1,200-word blog and infographic asset package completed internal QA checks and was pushed to MediScan client portal review queue.',
    actionText: 'View Details',
    link: '/tasks'
  },
  {
    id: 'ACT-005',
    title: 'New project request received from client',
    subtitle: 'Arogya Ayurveda · Ayurveda Awareness',
    client: 'Arogya Ayurveda Centre',
    project: 'Ayurveda Awareness Week',
    time: '5 hours ago',
    timestamp: '2026-10-29 12:39',
    status: 'New Request',
    statusTone: 'purple',
    icon: 'plus',
    iconBg: 'bg-cyan-50 text-cyan-600',
    agent: 'K. Subramaniam (Client Owner) → Shruti (CRT-002)',
    description: 'Client submitted a new project brief for Winter Immunity Panchakarma campaign. Intake parsing in progress.',
    actionText: 'Review Request',
    link: '/clients'
  }
]

// Section E — Agent Alerts & Issues (Matching screenshot exactly)
export const agentAlertsAndIssues = [
  {
    id: 'ALT-001',
    title: 'Content generation failed',
    subtitle: 'Lekha (COPY-003) · Diabetes Education Series',
    agent: 'Lekha (COPY-003)',
    project: 'Diabetes Education Series',
    client: 'MediScan Diagnostics',
    time: '18 minutes ago',
    timestamp: '2026-10-29 17:21',
    severity: 'Critical',
    severityTone: 'red',
    status: 'Open',
    icon: 'alert-circle',
    iconBg: 'bg-rose-50 text-rose-600',
    explanation: 'Agent Lekha exceeded token limit (8,192 tokens) while compiling diabetic diet guide. Model inference gateway responded with HTTP 504 Gateway Timeout.',
    actionText: 'View',
    link: '/technology'
  },
  {
    id: 'ALT-002',
    title: 'Workflow blocked',
    subtitle: 'Waiting for client brand guidelines · Drishti (ANAL-004)',
    agent: 'Drishti (ANAL-004)',
    project: 'Maternity Service Promotion',
    client: 'Nirvaan Wellness Clinic',
    issue: 'Waiting for client brand guidelines',
    time: '42 minutes ago',
    timestamp: '2026-10-29 16:57',
    severity: 'High',
    severityTone: 'orange',
    status: 'Waiting for Approval',
    icon: 'pause-circle',
    iconBg: 'bg-orange-50 text-orange-600',
    explanation: 'Design pipeline paused at Stage 5. Required vector brand assets and typography specifications are missing from workspace profile.',
    actionText: 'View',
    link: '/workflows'
  },
  {
    id: 'ALT-003',
    title: 'QA check failed',
    subtitle: 'Image quality below standard · Pariksha (QA-001)',
    agent: 'Pariksha (QA-001)',
    project: 'Cardiac Awareness Campaign',
    client: 'City Care Multispeciality Hospital',
    issue: 'Image quality below standard',
    time: '1 hour ago',
    timestamp: '2026-10-29 16:39',
    severity: 'High',
    severityTone: 'orange',
    status: 'Investigating',
    icon: 'minus-circle',
    iconBg: 'bg-orange-50 text-orange-600',
    explanation: 'Visual asset ASSET-0021 failed contrast ratio check (2.8:1, requires 4.5:1 for WCAG compliance) and compression artifacts detected.',
    actionText: 'View',
    link: '/assurance'
  },
  {
    id: 'ALT-004',
    title: 'Integration disconnected',
    subtitle: 'Meta Ads API connection lost · Sutra (TECH-005)',
    agent: 'Sutra (TECH-005)',
    project: 'Paid Media Campaign',
    client: 'Nirvaan Wellness Clinic',
    issue: 'Meta Ads API connection lost',
    time: '2 hours ago',
    timestamp: '2026-10-29 15:39',
    severity: 'Medium',
    severityTone: 'amber',
    status: 'Open',
    icon: 'unplug',
    iconBg: 'bg-amber-50 text-amber-600',
    explanation: 'OAuth token expired for client Meta Business account. Automated token refresh returned response error code 190 (Invalid OAuth Access Token).',
    actionText: 'View',
    link: '/technology'
  },
  {
    id: 'ALT-005',
    title: 'Agent running in retry loop',
    subtitle: 'PubMed query rate limit exceeded · Anvesh (RESE-002)',
    agent: 'Anvesh (RESE-002)',
    project: 'Keyword Research',
    client: 'City Care Multispeciality Hospital',
    issue: 'PubMed query rate limit exceeded',
    time: '3 hours ago',
    timestamp: '2026-10-29 14:39',
    severity: 'Medium',
    severityTone: 'amber',
    status: 'Investigating',
    icon: 'rotate-ccw',
    iconBg: 'bg-blue-50 text-blue-600',
    explanation: 'PubMed rate limit encountered (HTTP 429 Too Many Requests). Current retry iteration 4/5. Exponential backoff delay active.',
    actionText: 'View',
    link: '/technology'
  }
]

// Section F — Samrudhi AI Assistant Knowledge Base & Prompts
export const assistantPrompts = [
  {
    id: 'p1',
    text: "Summarize today's project status",
    icon: 'sparkles',
    color: 'text-purple-600 bg-purple-50 hover:bg-purple-100 border-purple-200'
  },
  {
    id: 'p2',
    text: 'Which deadlines are approaching?',
    icon: 'calendar',
    color: 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border-emerald-200'
  },
  {
    id: 'p3',
    text: 'Show overdue or blocked projects',
    icon: 'alert-triangle',
    color: 'text-amber-600 bg-amber-50 hover:bg-amber-100 border-amber-200'
  },
  {
    id: 'p4',
    text: 'What client approvals are pending?',
    icon: 'check-square',
    color: 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border-indigo-200'
  },
  {
    id: 'p5',
    text: 'Are any agents reporting critical issues?',
    icon: 'bot',
    color: 'text-rose-600 bg-rose-50 hover:bg-rose-100 border-rose-200'
  },
  {
    id: 'p6',
    text: 'What needs my attention first?',
    icon: 'shield-alert',
    color: 'text-sky-600 bg-sky-50 hover:bg-sky-100 border-sky-200'
  }
]

export const assistantAnswers = {
  p1: {
    title: "Today's Project Status Summary",
    text: `Across Samrudhi's operating system today (**Thursday, 29 Oct 2026**), there are **112 total projects**:

• 🟢 **72 On Track (64%)**: Progressing smoothly through operating stages.
• 🟡 **18 At Risk (16%)**: Approaching deadline thresholds or awaiting minor assets.
• 🔴 **12 Overdue (11%)**: Milestone dates passed; require human review.
• ⚪ **10 Blocked (9%)**: Paused waiting on client guidelines or QA sign-off.

Currently **28 projects** are actively in production, and **56** have been delivered successfully this monthly cycle (+18% vs last month).`,
    actions: [
      { label: 'View 12 Overdue Projects', link: '/workflows?status=overdue' },
      { label: 'View 10 Blocked Projects', link: '/workflows?status=blocked' }
    ]
  },
  p2: {
    title: 'Approaching Project Deadlines (Next 7 Days)',
    text: `Here are the **5 nearest deadlines** scheduled across all active accounts:

1. **Cardiac Awareness Campaign** (City Care Hospital)
   📅 **Due in 1 day** (30 Oct 2026) · High Priority · *Status: In Review*
2. **Maternity Service Promotion** (Nirvaan Wellness)
   📅 **Due in 4 days** (02 Nov 2026) · Medium Priority · *Status: Client Approval*
3. **Diabetes Education Series** (MediScan Diagnostics)
   📅 **Due in 5 days** (03 Nov 2026) · Medium Priority · *Status: In Production*
4. **Oral Hygiene Tips Campaign** (Sunrise Dental)
   📅 **Due in 6 days** (04 Nov 2026) · Low Priority · *Status: Planning*
5. **Ayurveda Awareness Week** (Arogya Ayurveda)
   📅 **Due in 7 days** (05 Nov 2026) · Medium Priority · *Status: Content Review*`,
    actions: [
      { label: 'Open Cardiac Campaign', link: '/workflows/WF-CLIENT-CONTENT-0001' },
      { label: 'Inspect All Deadlines', link: '/workflows' }
    ]
  },
  p3: {
    title: 'Overdue & Blocked Projects Analysis',
    text: `**Attention required on 12 Overdue and 10 Blocked projects:**

• **Highest Impact Blocker**: *Maternity Service Promotion* (Nirvaan Wellness)
  Blocked at Stage 5 — waiting for vector logo & brand typography from client. Agent \`Drishti (ANAL-004)\` alerted.
• **Top Overdue Deliverable**: *Diwali Clinical Claims Review* (City Care)
  Passed scheduled QA sign-off deadline. Escalated to \`GOV-008\` for medical source validation.
• **Secondary Blocker**: *Sunrise Dental Onboarding*
  Brand assets (colours, fonts, clinic imagery) still pending client upload.`,
    actions: [
      { label: 'Filter Overdue Projects', link: '/workflows?status=overdue' },
      { label: 'Review Blockers in Tasks', link: '/tasks' }
    ]
  },
  p4: {
    title: 'Pending Approvals Overview (21 Items)',
    text: `There are currently **21 items requiring decisions** across the queue:

• 👥 **6 Client Approvals**: Including *Cardiac Awareness Social Post* (City Care) and *Maternity Ad Creatives* (Nirvaan).
• 📝 **8 Content Reviews**: Clinical claim verifications and editorial drafts waiting on QA gate clearance.
• 💰 **3 Budget Approvals**: High-impact ad spend changes requiring Founder Class E authorization.
• 📋 **4 Other Requests**: Technical integrations and intake brief sign-offs.`,
    actions: [
      { label: 'Go to Tasks & Approvals', link: '/tasks' },
      { label: 'Inspect Client Approvals (6)', link: '/tasks?type=client_approval' }
    ]
  },
  p5: {
    title: 'Agent Health & Technical Diagnostics',
    text: `Overall, **156 of 194 agents (80%)** are running with healthy heartbeats. However, **3 alerts** need intervention:

• 🚨 **CRITICAL**: \`Lekha (COPY-003)\` — *Content generation failed* on Diabetes Education Series (Token limit exceeded, HTTP 504 timeout).
• ⚠️ **HIGH**: \`Drishti (ANAL-004)\` — *Workflow blocked* on Maternity Campaign (missing client brand assets).
• ⚠️ **HIGH**: \`Pariksha (QA-001)\` — *QA check failed* on City Care social creative (contrast ratio 2.8:1 below WCAG standard).
• 🟡 **MEDIUM**: \`Sutra (TECH-005)\` — *Meta Ads API token disconnected*.`,
    actions: [
      { label: 'Investigate Lekha (COPY-003)', link: '/agents' },
      { label: 'Technology Diagnostics', link: '/technology' }
    ]
  },
  p6: {
    title: 'Executive Action Checklist for Today',
    text: `Here is your **recommended priority sequence** for today (29 Oct 2026):

1. **Urgent Deadline (Due Tomorrow)**: Expedite client sign-off for *Cardiac Awareness Campaign* (City Care Hospital).
2. **Critical Agent Failure**: Trigger automatic retry or adjust prompt context for \`Lekha (COPY-003)\` in Technology.
3. **Founder Reserved Decision**: Review the ₹1.2L/month budget cap approval for *Maternity Campaign* (Class E human-in-the-loop gate).
4. **Client Revision**: Address Nirvaan Wellness request regarding consultation disclaimer font size.`,
    actions: [
      { label: 'Review Urgent Tasks', link: '/tasks' },
      { label: 'Agent Directory', link: '/agents?status=error' }
    ]
  }
}

// Fallback response generator for custom user queries
export function generateAssistantReply(query) {
  const q = query.toLowerCase().trim()
  if (q.includes('status') || q.includes('project') || q.includes('summary') || q.includes('overview') || q.includes('progress')) {
    return assistantAnswers.p1
  }
  if (q.includes('deadline') || q.includes('due') || q.includes('upcoming') || q.includes('when')) {
    return assistantAnswers.p2
  }
  if (q.includes('overdue') || q.includes('block') || q.includes('stuck') || q.includes('risk')) {
    return assistantAnswers.p3
  }
  if (q.includes('approval') || q.includes('approve') || q.includes('pending') || q.includes('review') || q.includes('decision')) {
    return assistantAnswers.p4
  }
  if (q.includes('agent') || q.includes('error') || q.includes('fail') || q.includes('issue') || q.includes('alert') || q.includes('critical')) {
    return assistantAnswers.p5
  }
  if (q.includes('attention') || q.includes('first') || q.includes('priority') || q.includes('today') || q.includes('action')) {
    return assistantAnswers.p6
  }
  if (q.includes('client') || q.includes('customer') || q.includes('account')) {
    return {
      title: 'Active Clients Overview',
      text: `Samrudhi is currently managing **12 active client workspaces** (out of 15 total enrolled accounts).

• **Top Clients by Activity**:
  1. *City Care Multispeciality Hospital* (Health Score: 92 · 8 Active Projects)
  2. *Nirvaan Wellness Clinic* (Health Score: 84 · 6 Active Projects)
  3. *MediScan Diagnostics* (Health Score: 78 · 5 Active Projects)
  4. *Sunrise Dental Studio* (Health Score: 88 · 4 Active Projects)
  5. *Arogya Ayurveda Centre* (Health Score: 86 · 5 Active Projects)`,
      actions: [
        { label: 'View All Clients', link: '/clients' },
        { label: 'Inspect Workflows', link: '/workflows' }
      ]
    }
  }

  // Default contextual response
  return {
    title: 'Workspace Intelligence Answer',
    text: `Based on current workspace telemetry:
• **Total Projects**: 112 (72 On Track, 18 At Risk, 12 Overdue, 10 Blocked)
• **Active Agents**: 194 positions (156 Healthy, 24 Needs Attention, 8 Error)
• **Pending Decisions**: 21 approvals awaiting review
• **Next Deadline**: *Cardiac Awareness Campaign* (City Care) due in 1 day.

You can click any suggested prompt above or explore specific modules directly via the links below:`,
    actions: [
      { label: 'Open Workflows', link: '/workflows' },
      { label: 'Review Approvals', link: '/tasks' },
      { label: 'Agent Directory', link: '/agents' }
    ]
  }
}

// Global Search Index
export const globalSearchIndex = [
  // Clients
  { id: 'c1', title: 'City Care Multispeciality Hospital', category: 'Client', subtitle: '12 active projects · Healthcare', link: '/clients' },
  { id: 'c2', title: 'Nirvaan Wellness Clinic', category: 'Client', subtitle: '6 active projects · Obstetrics & Wellness', link: '/clients' },
  { id: 'c3', title: 'MediScan Diagnostics', category: 'Client', subtitle: '5 active projects · Pathology & Imaging', link: '/clients' },
  { id: 'c4', title: 'Sunrise Dental Studio', category: 'Client', subtitle: '4 active projects · Dentistry', link: '/clients' },
  { id: 'c5', title: 'Arogya Ayurveda Centre', category: 'Client', subtitle: '5 active projects · Holistic Medicine', link: '/clients' },

  // Projects
  { id: 'pr1', title: 'Cardiac Awareness Campaign', category: 'Project', subtitle: 'City Care Hospital · Due in 1 day', link: '/workflows/WF-CLIENT-CONTENT-0001' },
  { id: 'pr2', title: 'Maternity Service Promotion', category: 'Project', subtitle: 'Nirvaan Wellness · Due in 4 days', link: '/workflows/WF-PAID-CAMPAIGN-0003' },
  { id: 'pr3', title: 'Diabetes Education Series', category: 'Project', subtitle: 'MediScan Diagnostics · Due in 5 days', link: '/workflows/WF-CLIENT-CONTENT-0002' },
  { id: 'pr4', title: 'Oral Hygiene Tips Campaign', category: 'Project', subtitle: 'Sunrise Dental · Due in 6 days', link: '/workflows/WF-ONBOARD-0006' },
  { id: 'pr5', title: 'Ayurveda Awareness Week', category: 'Project', subtitle: 'Arogya Ayurveda · Due in 7 days', link: '/workflows/WF-CLIENT-CONTENT-0007' },

  // Agents
  { id: 'ag1', title: 'Lekha (CRT-004)', category: 'Agent', subtitle: 'Creative & Content · High Volume Copywriter', link: '/agents' },
  { id: 'ag2', title: 'Drishti (DAT-002)', category: 'Agent', subtitle: 'Data, Analytics & Reporting Lead', link: '/agents' },
  { id: 'ag3', title: 'Pariksha (QA-001)', category: 'Agent', subtitle: 'Assurance & Governance Inspector', link: '/agents' },
  { id: 'ag4', title: 'Sutra (TECH-005)', category: 'Agent', subtitle: 'Technology & Integrations Gateway', link: '/agents' },
  { id: 'ag5', title: 'Anvesh (RES-004)', category: 'Agent', subtitle: 'Clinical Research & Source Verifier', link: '/agents' },

  // Positions
  { id: 'pos1', title: 'CEX-001 Lead Client Partner', category: 'Position', subtitle: 'Client Experience · Level D Authority', link: '/positions' },
  { id: 'pos2', title: 'CRT-004 Senior Clinical Copywriter', category: 'Position', subtitle: 'Creative & Content · Level B Authority', link: '/positions' },
  { id: 'pos3', title: 'QA-001 Lead Brand & Policy Verifier', category: 'Position', subtitle: 'Independent Assurance · Level C Authority', link: '/positions' },
  { id: 'pos4', title: 'TECH-005 Integration Gateway Specialist', category: 'Position', subtitle: 'Technology & Ops · Level B Authority', link: '/positions' },

  // Tasks
  { id: 'tk1', title: 'QA: Claims, brand, technical & policy', category: 'Task', subtitle: 'Task TASK-0006 · City Care Hospital', link: '/tasks' },
  { id: 'tk2', title: 'Client review & approval', category: 'Task', subtitle: 'Task TASK-0007 · Blocked on QA pass', link: '/tasks' },
  { id: 'tk3', title: 'Maternity campaign budget cap approval', category: 'Task', subtitle: 'Task TASK-0102 · Class E Human Decision', link: '/tasks' }
]

export function searchWorkspace(query) {
  if (!query || !query.trim()) return []
  const q = query.toLowerCase().trim()
  return globalSearchIndex.filter((item) =>
    item.title.toLowerCase().includes(q) ||
    item.subtitle.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q)
  ).slice(0, 8)
}

export function calculateDaysRemaining(deadlineStr, referenceDateStr = SIMULATION_TODAY) {
  const d1 = new Date(referenceDateStr + 'T00:00:00')
  const d2 = new Date(deadlineStr + 'T00:00:00')
  const diffTime = d2.getTime() - d1.getTime()
  return Math.round(diffTime / (1000 * 60 * 60 * 24))
}

export function formatDeadlineDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}
