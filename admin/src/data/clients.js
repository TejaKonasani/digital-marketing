// Clients, accounts, sales pipeline and onboarding (PRD Sections 3, 5, 12)
export const clients = [
  {
    id: 'CLIENT-DEMO-001',
    name: 'City Care Multispeciality Hospital',
    type: 'Hospital',
    sector: 'Healthcare',
    location: 'Hyderabad, IN',
    owner: 'Divya (CEX-003)',
    status: 'active',
    health: 86,
    since: '2026-06-12',
    services: ['Social media', 'Paid media', 'SEO', 'Content', 'Reporting'],
    mrr: 240000,
    projects: 4,
    openApprovals: 2,
    nextReview: '2026-11-05'
  },
  {
    id: 'CLIENT-DEMO-002',
    name: 'Nirvaan Wellness Clinic',
    type: 'Clinic',
    sector: 'Wellness',
    location: 'Bengaluru, IN',
    owner: 'Divya (CEX-004)',
    status: 'active',
    health: 91,
    since: '2026-04-03',
    services: ['Social media', 'Video', 'Paid media', 'Reporting'],
    mrr: 150000,
    projects: 3,
    openApprovals: 1,
    nextReview: '2026-11-12'
  },
  {
    id: 'CLIENT-DEMO-003',
    name: 'Sunrise Dental Studio',
    type: 'Dental clinic',
    sector: 'Dental',
    location: 'Pune, IN',
    owner: 'Divya (CEX-003)',
    status: 'onboarding',
    health: 74,
    since: '2026-10-28',
    services: ['Social media', 'Local SEO', 'Content'],
    mrr: 90000,
    projects: 1,
    openApprovals: 0,
    nextReview: '2026-11-15'
  },
  {
    id: 'CLIENT-DEMO-004',
    name: 'Arogya Ayurveda Centre',
    type: 'Ayurveda centre',
    sector: 'Alternative medicine',
    location: 'Chennai, IN',
    owner: 'Divya (CEX-004)',
    status: 'active',
    health: 79,
    since: '2026-07-20',
    services: ['Content', 'SEO', 'Social media'],
    mrr: 110000,
    projects: 2,
    openApprovals: 0,
    nextReview: '2026-11-20'
  },
  {
    id: 'CLIENT-DEMO-005',
    name: 'MediScan Diagnostics',
    type: 'Diagnostics lab',
    sector: 'Diagnostics',
    location: 'Mumbai, IN',
    owner: 'Divya (CEX-003)',
    status: 'at_risk',
    health: 58,
    since: '2026-02-18',
    services: ['Paid media', 'Reporting'],
    mrr: 180000,
    projects: 2,
    openApprovals: 1,
    nextReview: '2026-10-31',
    flag: '2 consecutive approval delays; renewal risk flagged by CEX'
  }
]

export const pipeline = [
  { id: 'OPP-001', name: 'Lotus Eye & Ear Hospital', stage: 'Qualified', value: 320000, owner: 'Karthik', probability: 65, lastTouch: '2026-10-28', source: 'Inbound enquiry', next: 'Discovery call 2026-10-30' },
  { id: 'OPP-002', name: 'Prana Yoga & Rehab', stage: 'Discovery', value: 140000, owner: 'Karthik', probability: 45, lastTouch: '2026-10-27', source: 'Referral', next: 'Needs-capture summary due' },
  { id: 'OPP-003', name: 'GreenLeaf Pharmacy Chain', stage: 'Proposal', value: 480000, owner: 'Karthik', probability: 55, lastTouch: '2026-10-25', source: 'Outbound', next: 'Proposal sent — follow-up 2026-10-31' },
  { id: 'OPP-004', name: 'Bhagya Fertility Clinic', stage: 'Qualified', value: 260000, owner: 'Karthik', probability: 60, lastTouch: '2026-10-24', source: 'Webinar', next: 'Schedule discovery' },
  { id: 'OPP-005', name: 'CarePoint Home Nursing', stage: 'Lead', value: 90000, owner: 'Karthik', probability: 25, lastTouch: '2026-10-28', source: 'Website form', next: 'Qualification research in progress' },
  { id: 'OPP-006', name: 'Vitalis Cardiac Centre', stage: 'Proposal', value: 520000, owner: 'Karthik', probability: 70, lastTouch: '2026-10-26', source: 'Partner intro', next: 'Commercial review with founder' },
  { id: 'OPP-007', name: 'SmileWorks Orthodontics', stage: 'Lead', value: 75000, owner: 'Karthik', probability: 20, lastTouch: '2026-10-29', source: 'Cold outreach', next: 'First touch scheduled' },
  { id: 'OPP-008', name: 'Nethra Vision Institute', stage: 'Discovery', value: 210000, owner: 'Karthik', probability: 50, lastTouch: '2026-10-23', source: 'Referral', next: 'Stakeholder mapping' }
]

export const pipelineStages = ['Lead', 'Qualified', 'Discovery', 'Proposal', 'Approved scope']

export const onboardingQueue = [
  { client: 'Sunrise Dental Studio', started: '2026-10-28', progress: 35, missing: ['Brand assets (logo, colours, fonts)', 'Tone-of-voice examples', 'Approved claims list'], next: 'Asset request sent to client 2026-10-29', owner: 'CEX-002' },
  { client: 'Lotus Eye & Ear Hospital', started: '—', progress: 0, missing: ['Not started — pending contract signature'], next: 'Awaiting approved scope handoff from SBD', owner: 'CEX-002' }
]

export const briefs = [
  { id: 'BRIEF-0001', client: 'City Care Multispeciality Hospital', title: 'Cardiac Awareness Week — social post', version: 'v3', status: 'approved', submitted: '2026-10-25', by: 'R. Iyer (Client Admin)', fields: 11, missing: 0 },
  { id: 'BRIEF-0002', client: 'Nirvaan Wellness Clinic', title: 'Physiotherapy booking campaign', version: 'v2', status: 'approved', submitted: '2026-10-14', by: 'S. Menon (Client Owner)', fields: 11, missing: 0 },
  { id: 'BRIEF-0003', client: 'City Care Multispeciality Hospital', title: 'Diabetes care SEO landing page', version: 'v2', status: 'in_review', submitted: '2026-10-27', by: 'R. Iyer (Client Admin)', fields: 9, missing: 2 },
  { id: 'BRIEF-0004', client: 'Arogya Ayurveda Centre', title: 'Panchakarma season content pack', version: 'v1', status: 'draft', submitted: '2026-10-29', by: 'K. Subramaniam (Client Owner)', fields: 6, missing: 5 },
  { id: 'BRIEF-0005', client: 'MediScan Diagnostics', title: 'Corporate health check awareness', version: 'v4', status: 'revision', submitted: '2026-10-21', by: 'A. Kulkarni (Client Reviewer)', fields: 11, missing: 0 }
]