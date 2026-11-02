// ==============================================================================
// SAMRUDHI AGENTIC AI — MARKETING & CONTENT DATASET
// Canonical source for MKT, CRT, and PMG content production and campaigns
// ==============================================================================

export const initialContentItems = [
  {
    id: 'CNT-001',
    title: 'Cardiac Health Awareness - Social Post',
    client: 'City Care Hospital',
    clientId: 'CLIENT-001',
    project: 'Social Media Campaign (PROJ-001)',
    projectId: 'PRJ-2026-001',
    type: 'Social Media',
    contentTypeBadge: 'Social Media',
    version: 'v2',
    progress: 85,
    status: 'In Review',
    statusColor: 'amber',
    stage: 'Creative & QA Review',
    due: '30 Oct 2026',
    owner: 'K. Sharma',
    ownerInitials: 'KS',
    ownerDept: 'Creative & Content (CRT)',
    assignedPosition: 'CRT-004 (Caption & Copy Specialist)',
    qaStatus: 'In Review (85% passed)',
    clientApprovalStatus: 'Pending client review',
    publishingStatus: 'Not authorised — awaiting client approval and connector verification',
    brief: {
      objective: 'Increase awareness about preventive cardiac health checkups and silent cardiovascular symptoms.',
      targetAudience: 'Adults aged 30–60, urban families, caregivers in Hyderabad and Telangana.',
      keyMessage: 'Regular preventive checkups prevent acute heart disease. Nab-certified cardiac screening.',
      format: 'Instagram & LinkedIn carousel post (5 slides, 1080x1080 PNG + bilingual caption).',
      brandGuidelines: 'City Care Brand Guidelines v2.1 (Emerald #059669 / Ruby #E11D48 / Inter font).',
      createdDate: '20 Oct 2026 by MKT-Creative',
      acceptanceCriteria: 'Medical claim citations (ICMR 2025 guidelines), ASCI ethical disclaimer, NABH accreditation logo.'
    },
    currentVersion: {
      version: 'v2',
      label: 'v2 - For client review',
      createdDate: '28 Oct 2026 by Creative Team',
      headline: 'Your Heart Deserves Regular Care',
      bodyText: 'Did you know that 40% of cardiovascular complications can be detected early with routine screening? Our comprehensive cardiac wellness package at City Care includes 2D Echo, TMT, and cardiologist consultation.',
      assetName: 'cardiac_carousel_slide1_v2.png',
      assetSize: '1.4 MB',
      assetUrl: '/assets/sample-cardiac.png',
      hashtags: '#HeartHealth #CityCare #PreventiveCardiology #HyderabadHealth'
    },
    versionHistory: [
      { version: 'v2', date: '28 Oct 2026', author: 'CRT-004 (Riya Mehta)', note: 'Updated clinical disclaimer as per GOV-008 guidance.' },
      { version: 'v1', date: '22 Oct 2026', author: 'CRT-004 (Riya Mehta)', note: 'Initial draft copy and visual layouts.' }
    ],
    reviewStatus: [
      { name: 'Draft created', date: '20 Oct 2026', status: 'approved', reviewer: 'CRT-004 (Riya)' },
      { name: 'Creative review', date: '22 Oct 2026', status: 'approved', reviewer: 'CRT-001 (Creative Lead)' },
      { name: 'Brand review', date: '24 Oct 2026', status: 'approved', reviewer: 'MKT-002 (Brand Specialist)' },
      { name: 'QA review', date: '28 Oct 2026', status: 'in_review', progress: 85, reviewer: 'GOV-002 (Content QA)' },
      { name: 'Client approval', date: 'Pending', status: 'pending', reviewer: 'Dr. Anitha Reddy (Client Admin)' },
      { name: 'Publishing', date: 'Pending', status: 'pending', reviewer: 'CRT-013 (Channel Publisher)' }
    ],
    internalFeedback: [
      {
        author: 'S. Mehta · Brand Team',
        date: '24 Oct 2026',
        text: 'Looks good. Please ensure font size is readable on mobile devices and brand red accent matches v2.1.'
      },
      {
        author: 'GOV-008 · Clinical Assurance',
        date: '28 Oct 2026',
        text: 'ICMR citation verified. Medical disclaimer on slide 5 confirmed compliant.'
      }
    ],
    clientFeedback: [],
    publishingRecord: null,
    activityLog: [
      { date: '28 Oct 2026, 10:12', actor: 'CRT-004', text: 'Submitted version v2 to QA and Client Approval gate.' },
      { date: '24 Oct 2026, 15:30', actor: 'MKT-002', text: 'Brand review approved with typography note.' },
      { date: '22 Oct 2026, 11:00', actor: 'CRT-001', text: 'Creative review approved for visual and copy balance.' }
    ]
  },
  {
    id: 'CNT-002',
    title: 'Diabetes Care - Blog Article',
    client: 'City Care Hospital',
    clientId: 'CLIENT-001',
    project: 'Patient Education Blog Series (PROJ-002)',
    projectId: 'PRJ-2026-002',
    type: 'Blog / SEO',
    contentTypeBadge: 'Blog',
    version: 'v1',
    progress: 80,
    status: 'Client Review',
    statusColor: 'amber',
    stage: 'Client Review Gate',
    due: '02 Nov 2026',
    owner: 'S. Mehta',
    ownerInitials: 'SM',
    ownerDept: 'Creative & Content (CRT)',
    assignedPosition: 'CRT-005 (Healthcare Article Writer)',
    qaStatus: 'Passed',
    clientApprovalStatus: 'Waiting for client review',
    publishingStatus: 'Not authorised',
    brief: {
      objective: 'Rank for diabetes care keywords and educate pre-diabetic patients on dietary management.',
      targetAudience: 'Pre-diabetic adults aged 35–65 in South India.',
      keyMessage: 'Dietary glycemic control combined with annual HbA1c tests prevents organ damage.',
      format: '1,800-word clinical blog post with infoboxes and ICMR dietary guidelines.',
      brandGuidelines: 'City Care Brand Guidelines v2.1',
      createdDate: '18 Oct 2026 by CRT'
    },
    currentVersion: {
      version: 'v1.1',
      label: 'v1.1 - Clinical Review Copy',
      headline: 'Understanding Silent Diabetes: Prevention, Screening, and Everyday Nutrition',
      bodyText: 'Diabetes often progresses silently over 5 to 7 years before clinical symptoms appear. Understanding your fasting blood sugar and HbA1c metrics is the most reliable defense...',
      assetName: 'diabetes_care_article_v1.docx',
      assetSize: '620 KB'
    },
    versionHistory: [],
    reviewStatus: [
      { name: 'Draft created', date: '21 Oct 2026', status: 'approved' },
      { name: 'Creative review', date: '25 Oct 2026', status: 'approved' },
      { name: 'QA review', date: '27 Oct 2026', status: 'approved' },
      { name: 'Client approval', date: 'Pending', status: 'current' }
    ],
    internalFeedback: [],
    clientFeedback: [],
    activityLog: []
  },
  {
    id: 'CNT-003',
    title: 'Patient Education Video - Ep.2',
    client: 'Nirvaan Wellness',
    clientId: 'CLIENT-002',
    project: 'Physiotherapy Video Series',
    projectId: 'PRJ-2026-004',
    type: 'Video',
    contentTypeBadge: 'Video',
    version: 'v1',
    progress: 45,
    status: 'In Production',
    statusColor: 'blue',
    stage: 'Video Assembly & Subtitling',
    due: '05 Nov 2026',
    owner: 'R. Kumar',
    ownerInitials: 'RK',
    ownerDept: 'Creative & Content (CRT)',
    assignedPosition: 'CRT-008 (Video Producer)',
    qaStatus: 'In progress',
    clientApprovalStatus: 'Not started',
    publishingStatus: 'Draft only',
    brief: {
      objective: 'Demonstrate home posture correction exercises for chronic lower back stiffness.',
      targetAudience: 'Desk workers aged 25–45 in Bengaluru IT corridors.',
      keyMessage: 'Simple 3-minute ergonomic stretches relieve spine pressure.',
      format: '9:16 vertical video (60s) with burned-in subtitles and exercise callouts.',
      brandGuidelines: 'Nirvaan Calm Wellness palette (Indigo/Slate).',
      createdDate: '24 Oct 2026'
    },
    currentVersion: {
      version: 'v1',
      label: 'v1 Rough Cut',
      headline: '3 Stretches for Desk Workers Suffering from Back Stiffness',
      assetName: 'nirvaan_ep2_rough_cut.mp4',
      assetSize: '48 MB'
    },
    versionHistory: [],
    reviewStatus: [],
    internalFeedback: [],
    clientFeedback: [],
    activityLog: []
  },
  {
    id: 'CNT-004',
    title: 'Diwali Health Tips - Content Pack',
    client: 'City Care Hospital',
    clientId: 'CLIENT-001',
    project: 'Social Media Campaign (PROJ-001)',
    projectId: 'PRJ-2026-001',
    type: 'Content Pack',
    contentTypeBadge: 'Content Pack',
    version: 'v1',
    progress: 20,
    status: 'Blocked',
    statusColor: 'rose',
    stage: 'Blocked on Medical QA',
    due: '31 Oct 2026',
    owner: 'M. Gupta',
    ownerInitials: 'MG',
    ownerDept: 'Creative & Content (CRT)',
    assignedPosition: 'CRT-004 (Caption Specialist)',
    qaStatus: 'Blocked (2 clinical claims failed source check)',
    clientApprovalStatus: 'Halted',
    publishingStatus: 'Strictly blocked',
    brief: {
      objective: 'Festive season tips for managing sugar levels and respiratory safety during Diwali.',
      targetAudience: 'Diabetic and asthmatic patients in Hyderabad.',
      keyMessage: 'Celebrate safely with low-glycemic festive treats and air pollution precautions.',
      format: 'Carousel slides and downloadable PDF recipe card.',
      brandGuidelines: 'City Care Guidelines v2.1',
      createdDate: '26 Oct 2026'
    },
    currentVersion: {
      version: 'v1',
      label: 'v1 Under Hold',
      headline: 'Safe Sweets & Healthy Celebrations This Festive Season',
      assetName: 'diwali_health_pack_v1.zip',
      assetSize: '8.2 MB'
    },
    versionHistory: [],
    reviewStatus: [],
    internalFeedback: [
      {
        author: 'GOV-008 · Clinical Lead',
        date: '27 Oct 2026',
        text: 'Claim #2 regarding natural herbal sweeteners requires ICMR citation or must be removed.'
      }
    ],
    clientFeedback: [],
    activityLog: []
  },
  {
    id: 'CNT-005',
    title: 'Physiotherapy Booking - Ad Set',
    client: 'Nirvaan Wellness',
    clientId: 'CLIENT-002',
    project: 'Paid Funnel Growth (PROJ-005)',
    projectId: 'PRJ-2026-005',
    type: 'Paid Ads',
    contentTypeBadge: 'Paid Ads',
    version: 'v3',
    progress: 90,
    status: 'Ready for Approval',
    statusColor: 'emerald',
    stage: 'Awaiting Commercial Approval',
    due: '29 Oct 2026',
    owner: 'K. Sharma',
    ownerInitials: 'KS',
    ownerDept: 'Paid Media Group (PMG)',
    assignedPosition: 'PMG-003 (Ad Creative Specialist)',
    qaStatus: 'Passed',
    clientApprovalStatus: 'Ready for client decision',
    publishingStatus: 'Not authorised — budget signoff pending',
    brief: {
      objective: 'Drive consultation bookings for specialized sports physiotherapy in Indiranagar.',
      targetAudience: 'Amateur runners and badminton players in Bengaluru.',
      keyMessage: 'Certified physiotherapists. Faster recovery from acute sports strain.',
      format: 'Google RSA Ads + Meta Carousel Banner Set (1:1 & 4:5).',
      brandGuidelines: 'Nirvaan Wellness Kit v1.2',
      createdDate: '15 Oct 2026'
    },
    currentVersion: {
      version: 'v3',
      label: 'v3 Final Approved Creative',
      headline: 'Overcome Sports Injuries with Targeted Physiotherapy in Indiranagar',
      assetName: 'nirvaan_adset_v3.zip',
      assetSize: '12.4 MB'
    },
    versionHistory: [],
    reviewStatus: [],
    internalFeedback: [],
    clientFeedback: [],
    activityLog: []
  },
  {
    id: 'CNT-006',
    title: 'Preventive Dental Health Guide - Infographic',
    client: 'Sunrise Dental Studio',
    clientId: 'CLIENT-003',
    project: 'Dental Hygiene Education',
    projectId: 'PRJ-2026-006',
    type: 'Infographic',
    contentTypeBadge: 'Infographic',
    version: 'v1',
    progress: 65,
    status: 'In Production',
    statusColor: 'blue',
    stage: 'Visual Vector Production',
    due: '10 Nov 2026',
    owner: 'P. Lal',
    ownerInitials: 'PL',
    ownerDept: 'Creative & Content (CRT)',
    assignedPosition: 'CRT-007 (Visual Designer)',
    qaStatus: 'In progress',
    clientApprovalStatus: 'Not submitted',
    publishingStatus: 'Draft only',
    brief: {
      objective: 'Visual infographic detailing steps for pediatric oral hygiene.',
      targetAudience: 'Parents of children aged 4–12 in Pune.',
      keyMessage: 'Fluoride brushing habits build lifelong dental enamel strength.',
      format: 'Vector infographic (1200x2400) for clinic print flyers and Instagram story.',
      brandGuidelines: 'Sunrise Dental Studio Brand Kit',
      createdDate: '26 Oct 2026'
    },
    currentVersion: {
      version: 'v1',
      label: 'v1 Vector Draft',
      headline: 'The 5-Step Guide to Healthy Smiles for Kids',
      assetName: 'sunrise_kids_dental_v1.pdf',
      assetSize: '3.1 MB'
    },
    versionHistory: [],
    reviewStatus: [],
    internalFeedback: [],
    clientFeedback: [],
    activityLog: []
  },
  {
    id: 'CNT-007',
    title: 'Orthopedic Care Patient Journey - Whitepaper',
    client: 'Sterling Ortho Clinic',
    clientId: 'CLIENT-017',
    project: 'Patient Pathway Guide',
    projectId: 'PRJ-2026-007',
    type: 'Long-form Guide',
    contentTypeBadge: 'Long-form Guide',
    version: 'v2',
    progress: 100,
    status: 'Approved',
    statusColor: 'emerald',
    stage: 'Approved Deliverable',
    due: '28 Oct 2026',
    owner: 'D. Reddy',
    ownerInitials: 'DR',
    ownerDept: 'Creative & Content (CRT)',
    assignedPosition: 'CRT-005 (Healthcare Writer)',
    qaStatus: 'Passed',
    clientApprovalStatus: 'Approved by Dr. Vivek Murthy',
    publishingStatus: 'Approved for digital distribution',
    brief: {
      objective: 'Comprehensive pre-operative and post-operative joint rehabilitation guide for knee replacement patients.',
      targetAudience: 'Patients scheduled for arthroplasty surgery.',
      keyMessage: 'Step-by-step recovery milestones with physio protocols.',
      format: '16-page patient handbook PDF with clinical diagrams.',
      brandGuidelines: 'Sterling Ortho Clinical Guidelines v1.0',
      createdDate: '10 Oct 2026'
    },
    currentVersion: {
      version: 'v2.0',
      label: 'v2.0 Final Published PDF',
      headline: 'Your Guide to a Rapid Recovery After Joint Replacement',
      assetName: 'sterling_joint_guide_v2.pdf',
      assetSize: '9.4 MB'
    },
    versionHistory: [],
    reviewStatus: [],
    internalFeedback: [],
    clientFeedback: [],
    activityLog: []
  },
  {
    id: 'CNT-008',
    title: 'Local Clinic Google Business Map Listing Kit',
    client: 'Sunrise Dental Studio',
    clientId: 'CLIENT-003',
    project: 'Local Search Optimization',
    projectId: 'PRJ-2026-008',
    type: 'Local SEO Assets',
    contentTypeBadge: 'Local SEO Assets',
    version: 'v1',
    progress: 100,
    status: 'Approved',
    statusColor: 'emerald',
    stage: 'Approved Deliverable',
    due: '25 Oct 2026',
    owner: 'A. Lal',
    ownerInitials: 'AL',
    ownerDept: 'Paid Media & SEO (PMG)',
    assignedPosition: 'PMG-006 (Local Search Specialist)',
    qaStatus: 'Passed',
    clientApprovalStatus: 'Approved',
    publishingStatus: 'Live on Google Maps',
    brief: {
      objective: 'Optimise NAP (Name, Address, Phone) consistency across Google Business Profiles for 3 clinic branches.',
      targetAudience: 'Local dental patients in Baner, Viman Nagar, and Kothrud.',
      keyMessage: 'NABH-accredited dental clinic with convenient weekend appointments.',
      format: 'Complete Google Business Profile metadata, clinic photos, service catalog, and FAQ pack.',
      brandGuidelines: 'Sunrise Brand Kit',
      createdDate: '12 Oct 2026'
    },
    currentVersion: {
      version: 'v1.0',
      label: 'v1.0 Production Bundle',
      headline: 'Optimized Google Business Profiles for Pune Branches',
      assetName: 'sunrise_gmb_assets.zip',
      assetSize: '18.2 MB'
    },
    versionHistory: [],
    reviewStatus: [],
    internalFeedback: [],
    clientFeedback: [],
    activityLog: []
  }
]

export const initialCampaigns = [
  {
    id: 'CP-0031',
    name: 'Maternity Services Launch',
    client: 'City Care Hospital',
    channel: 'Google Ads (Search & Performance Max)',
    status: 'Awaiting Approval',
    statusTone: 'amber',
    budgetMonthly: 120000,
    spendCurrent: 0,
    impressions: 0,
    clicks: 0,
    cpc: '—',
    conversions: 0,
    cpa: '—',
    approvalRequirement: 'Major budget commitment — Class E reserved human decision required',
    platformConnection: 'Connected (OAuth active)',
    optimisationNotes: 'Target high-intent keywords: "maternity hospital hyderabad", "normal delivery package", "best gynecologist banjara hills".'
  },
  {
    id: 'CP-0028',
    name: 'Physiotherapy Bookings',
    client: 'Nirvaan Wellness',
    channel: 'Meta Ads (Instagram / Facebook)',
    status: 'Active',
    statusTone: 'emerald',
    budgetMonthly: 80000,
    spendCurrent: 54200,
    impressions: 142800,
    clicks: 3420,
    cpc: '₹15.8',
    conversions: 84,
    cpa: '₹645',
    approvalRequirement: 'Budget within authorised allocation',
    platformConnection: 'Connected (Meta Marketing API live)',
    optimisationNotes: 'Carousel creative outperforming single image by 2.4x. Recommend scaling budget towards Indiranagar radius.'
  },
  {
    id: 'CP-0025',
    name: 'Corporate Health Check',
    client: 'MediScan Diagnostics',
    channel: 'Google Search Ads',
    status: 'Paused',
    statusTone: 'slate',
    budgetMonthly: 60000,
    spendCurrent: 60000,
    impressions: 89400,
    clicks: 1840,
    cpc: '₹32.6',
    conversions: 42,
    cpa: '₹1,428',
    approvalRequirement: 'Monthly budget cap reached',
    platformConnection: 'Connected',
    optimisationNotes: 'Paused automatically upon reaching exact monthly budget ceiling. Re-allocation requires human approval.'
  },
  {
    id: 'CP-0022',
    name: 'Local SEO — Map Listings',
    client: 'Sunrise Dental Studio',
    channel: 'Local Search & Google Business',
    status: 'Active',
    statusTone: 'emerald',
    budgetMonthly: 25000,
    spendCurrent: 9800,
    impressions: 34100,
    clicks: 1240,
    cpc: '₹7.9',
    conversions: 62,
    cpa: '₹158',
    approvalRequirement: 'Active retainer',
    platformConnection: 'Connected (Google Business API)',
    optimisationNotes: 'Ranking #1 in local 3-pack for "dentist kothrud". Telemetry syncing hourly.'
  }
]

export const initialSeoItems = [
  { page: '/diabetes-care', client: 'City Care Hospital', kw: 'diabetes care hyderabad', pos: 4, prev: 7, traffic: 4200, status: 'Improving', statusColor: 'emerald' },
  { page: '/cardiac-awareness', client: 'City Care Hospital', kw: 'heart health awareness hyderabad', pos: 9, prev: 12, traffic: 2800, status: 'Improving', statusColor: 'emerald' },
  { page: '/physiotherapy', client: 'Nirvaan Wellness', kw: 'physiotherapy near me indiranagar', pos: 3, prev: 3, traffic: 5100, status: 'Stable', statusColor: 'blue' },
  { page: '/panchakarma', client: 'Arogya Ayurveda', kw: 'panchakarma chennai treatment', pos: 14, prev: 11, traffic: 900, status: 'Declining', statusColor: 'rose' },
  { page: '/dental-implants', client: 'Sunrise Dental', kw: 'dental implants pune cost', pos: 8, prev: 15, traffic: 1400, status: 'Improving', statusColor: 'emerald' }
]

export function getContentItemById(id, list = initialContentItems) {
  if (!id) return null
  const clean = String(id).trim().toLowerCase()
  return (
    list.find(
      (c) =>
        c.id.toLowerCase() === clean ||
        c.title.toLowerCase() === clean ||
        c.id.replace('CNT-', '').toLowerCase() === clean.replace('cnt-', '')
    ) || list[0]
  )
}
