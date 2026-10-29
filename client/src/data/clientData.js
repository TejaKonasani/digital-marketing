// Client portal mock data — plain-language, no internal agent codes or technical jargon.
// The demo client is City Care Multispeciality Hospital (CLIENT-DEMO-001).

export const clientProfile = {
  name: 'City Care Multispeciality Hospital',
  type: 'Hospital',
  location: 'Hyderabad, IN',
  contact: 'R. Iyer',
  role: 'Client Admin',
  email: 'riyer@citycare.in',
  services: ['Social media', 'Paid media', 'SEO', 'Content', 'Reporting'],
  since: 'June 2026'
}

// Onboarding checklist (stage 4 of the operating model)
export const onboarding = {
  progress: 70,
  steps: [
    { id: 'profile', label: 'Business profile', desc: 'Tell us about your hospital, services and location', status: 'done' },
    { id: 'goals', label: 'Goals & audience', desc: 'What you want to achieve and who you want to reach', status: 'done' },
    { id: 'brand', label: 'Brand files', desc: 'Logo, colours, fonts and tone of voice', status: 'in_progress' },
    { id: 'assets', label: 'Existing assets', desc: 'Photos, videos and content you already have', status: 'pending' },
    { id: 'restrictions', label: 'Preferences & restrictions', desc: 'Anything we must avoid or follow', status: 'pending' }
  ],
  brandFiles: [
    { name: 'logo-primary.png', size: '240 KB', status: 'received' },
    { name: 'colour-palette.pdf', size: '88 KB', status: 'received' },
    { name: 'fonts.zip', size: '1.2 MB', status: 'missing' },
    { name: 'tone-of-voice.docx', size: '—', status: 'missing' }
  ]
}

// Projects = workflows in plain language
export const projects = [
  {
    id: 'P-001',
    name: 'Cardiac Awareness Week',
    type: 'Social media post',
    status: 'in_review',
    statusLabel: 'Awaiting your approval',
    progress: 85,
    started: '26 Oct 2026',
    due: '30 Oct 2026',
    summary: 'A social post for Cardiac Awareness Week. We have drafted the caption and designed the image. It is ready for you to review and approve.',
    nextAction: 'Review and approve the post',
    needsYou: true
  },
  {
    id: 'P-002',
    name: 'Diabetes Care landing page',
    type: 'Website page (SEO)',
    status: 'in_progress',
    statusLabel: 'In progress',
    progress: 45,
    started: '27 Oct 2026',
    due: '4 Nov 2026',
    summary: 'We are writing and optimising a webpage about diabetes care to help people find your hospital online.',
    nextAction: 'Nothing needed from you right now',
    needsYou: false
  },
  {
    id: 'P-003',
    name: 'Maternity Services campaign',
    type: 'Paid advertising',
    status: 'approval',
    statusLabel: 'Needs your budget approval',
    progress: 70,
    started: '22 Oct 2026',
    due: '30 Oct 2026',
    summary: 'We have planned a paid ad campaign for your maternity services. We need your approval of the plan and the monthly budget before we can start.',
    nextAction: 'Approve the campaign plan and budget',
    needsYou: true
  },
  {
    id: 'P-004',
    name: 'September performance report',
    type: 'Report',
    status: 'completed',
    statusLabel: 'Delivered',
    progress: 100,
    started: '2 Oct 2026',
    due: '12 Oct 2026',
    summary: 'Your September report is ready. It shows how your social, ads and website performed, with clear explanations.',
    nextAction: 'Read the report',
    needsYou: false,
    delivered: '12 Oct 2026'
  }
]

// Review / approval items
export const reviews = [
  {
    id: 'R-001',
    project: 'Cardiac Awareness Week',
    type: 'Social post',
    channel: 'Instagram & Facebook',
    version: 'Version 2',
    submitted: '29 Oct 2026',
    due: '30 Oct 2026',
    status: 'pending',
    caption:
      'This Cardiac Awareness Week, let’s talk heart health. 💙\n\nSimple habits can make a big difference:\n• Check your blood pressure regularly\n• Move for 30 minutes a day\n• Eat more fruits & vegetables\n• Manage stress\n\nEarly detection saves lives. Book a heart check-up with our cardiologists today.\n\n#CardiacAwarenessWeek #HeartHealth #CityCare',
    notes: 'We kept the language simple and added a clear call to action. One health claim has been reviewed by our quality team.',
    imageLabel: '1080×1080 image — heart health theme, your brand colours'
  },
  {
    id: 'R-002',
    project: 'Maternity Services campaign',
    type: 'Campaign plan + budget',
    channel: 'Google & Meta ads',
    version: 'Version 1',
    submitted: '28 Oct 2026',
    due: '30 Oct 2026',
    status: 'pending',
    plan: [
      { label: 'Objective', value: 'Bookings for maternity consultations' },
      { label: 'Audience', value: 'Expecting parents, ages 24–40, within 15 km' },
      { label: 'Channels', value: 'Google Search + Meta (Facebook/Instagram)' },
      { label: 'Monthly budget', value: '₹1,20,000' },
      { label: 'Duration', value: '4 weeks (30 Oct – 27 Nov)' },
      { label: 'Expected result', value: '40–60 consultation bookings (estimate)' }
    ],
    notes: 'This budget is above your usual monthly cap, so we need your explicit approval before any spend begins. No ads will run until you approve.'
  }
]

// Content previews (creative)
export const contentPreviews = [
  {
    id: 'C-001',
    title: 'Cardiac Awareness Week — post',
    project: 'Cardiac Awareness Week',
    version: 'v2',
    status: 'awaiting_approval',
    updated: '29 Oct 2026'
  },
  {
    id: 'C-002',
    title: 'Diabetes Care — landing page draft',
    project: 'Diabetes Care landing page',
    version: 'v1',
    status: 'in_progress',
    updated: '28 Oct 2026'
  },
  {
    id: 'C-003',
    title: 'Maternity campaign — ad set',
    project: 'Maternity Services campaign',
    version: 'v1',
    status: 'awaiting_approval',
    updated: '28 Oct 2026'
  },
  {
    id: 'C-004',
    title: 'Patient Education — video script (Ep.1)',
    project: 'Patient Education series',
    version: 'v2',
    status: 'approved',
    updated: '20 Oct 2026'
  }
]

// Campaign status
export const campaigns = [
  {
    id: 'CMP-001',
    name: 'Physiotherapy Bookings',
    channel: 'Meta ads',
    status: 'active',
    statusLabel: 'Running',
    budget: 80000,
    spend: 54200,
    clicks: 150600,
    leads: 1290,
    note: 'Live and performing well. We are monitoring daily.'
  },
  {
    id: 'CMP-002',
    name: 'Maternity Services',
    channel: 'Google + Meta',
    status: 'pending',
    statusLabel: 'Waiting for your approval',
    budget: 120000,
    spend: 0,
    clicks: 0,
    leads: 0,
    note: 'No spend has happened yet. It starts only after you approve the plan and budget.'
  }
]

// Reports
export const reports = [
  {
    id: 'REP-001',
    title: 'September 2026 performance report',
    period: '1–30 Sep 2026',
    delivered: '12 Oct 2026',
    status: 'available',
    highlights: [
      { label: 'Total reach', value: '2.1M', change: '+8% vs Aug' },
      { label: 'Website visits', value: '48,200', change: '+12% vs Aug' },
      { label: 'Ad clicks', value: '71,000', change: '+5% vs Aug' },
      { label: 'New enquiries', value: '312', change: '+18% vs Aug' }
    ],
    summary:
      'September was a strong month. Your social content reached 2.1M people and website visits grew 12%. The physiotherapy ad campaign generated 1,290 leads. We recommend continuing the current strategy and testing two new ad angles in October.'
  },
  {
    id: 'REP-002',
    title: 'Q3 2026 business review',
    period: '1 Jul – 30 Sep 2026',
    delivered: 'In progress',
    status: 'in_progress',
    highlights: [],
    summary: 'We are preparing your quarterly review. It will be ready by 31 October.'
  }
]

// Messages
export const conversations = [
  {
    id: 'MSG-001',
    with: 'Your Samrudhi team',
    unread: 2,
    messages: [
      { from: 'them', text: 'Hi R., your Cardiac Awareness Week post is ready for review. You can approve it from the “Approvals” page.', time: '10:12 AM' },
      { from: 'them', text: 'We also need your approval on the Maternity campaign budget — it’s a higher amount than usual, so we wanted your explicit sign-off.', time: '10:14 AM' },
      { from: 'me', text: 'Thanks! I’ll review both today.', time: '11:02 AM' }
    ]
  },
  {
    id: 'MSG-002',
    with: 'Support',
    unread: 0,
    messages: [
      { from: 'them', text: 'Your September report has been delivered. You can find it under Reports.', time: '12 Oct, 4:30 PM' }
    ]
  }
]

// Notifications (plain language)
export const clientNotifications = [
  { id: 'CN-1', title: 'Your approval is needed', body: 'The Cardiac Awareness Week post is ready for you to review and approve.', time: '1h ago', read: false, link: '/approvals' },
  { id: 'CN-2', title: 'Budget approval needed', body: 'The Maternity campaign needs your approval of the plan and monthly budget.', time: '3h ago', read: false, link: '/approvals' },
  { id: 'CN-3', title: 'Project update', body: 'The Diabetes Care landing page is in progress. Nothing is needed from you right now.', time: '1d ago', read: true, link: '/projects' },
  { id: 'CN-4', title: 'Report ready', body: 'Your September performance report is available to read.', time: '2d ago', read: true, link: '/reports' }
]

// Demo accounts for the client portal
export const clientDemoAccounts = [
  { name: 'R. Iyer', role: 'Client Admin', email: 'riyer@citycare.in', password: 'demo1234' },
  { name: 'S. Menon', role: 'Client Owner', email: 'smeon@nirvaan.in', password: 'demo1234' },
  { name: 'Demo Viewer', role: 'Read-only viewer', email: 'viewer@demo.in', password: 'demo1234' }
]