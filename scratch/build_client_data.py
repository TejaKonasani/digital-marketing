# Build clientData.js with rich roadmaps matching the uploaded reference image
client_data_content = """// Client portal mock data — plain-language, healthcare-focused.
// Authenticated client: City Care Multispeciality Hospital (CLIENT-DEMO-001).

export const clientProfile = {
  name: 'City Care Multispeciality Hospital',
  brandName: 'City Care Hospital',
  type: 'Multi-speciality Hospital',
  industry: 'Healthcare & Tertiary Hospital Services',
  website: 'https://citycarehospital.com',
  address: 'Road No. 12, Banjara Hills, Hyderabad, Telangana 500034',
  primaryContact: 'Dr. R. Iyer, Medical Director',
  contactName: 'R. Iyer',
  role: 'Administrator',
  designation: 'Medical Director / Administrator',
  email: 'riyer@citycarehospital.com',
  phone: '+91 98765 43210',
  description: 'A premier 250-bed multi-speciality tertiary hospital in Hyderabad, providing advanced clinical care in Cardiology, Endocrinology, Obstetrics, and Orthopedics.',
  services: ['Social media', 'Paid media', 'SEO', 'Content', 'Reporting'],
  since: 'June 2026'
}

// Exactly 5 client projects (3 ongoing, 2 completed, 2 waiting for approval)
export const initialProjects = [
  {
    id: 'PRJ-003',
    code: 'PRJ-003',
    name: 'Maternity Services Campaign',
    category: 'Paid Media, SEO & Growth',
    type: 'Paid Media Campaign',
    shortDesc: 'Google and Meta ads campaign for maternity services to reach expecting families and increase consultation bookings across the city.',
    description: 'Google and Meta ads campaign for maternity services to reach expecting families and increase consultation bookings across the city.',
    status: 'In Progress',
    statusKey: 'in_progress',
    progress: 70,
    startDate: '10 Sep 2026',
    dueDate: '28 Oct 2026',
    completedDate: null,
    nextMilestone: 'Approve final budget plan',
    nextMilestoneDate: '28 Oct 2026',
    waitingApproval: true,
    approvalNote: 'Ad creatives and monthly ₹1,20,000 ad budget awaiting client authorization.',
    projectManager: 'Vikram',
    projectManagerRole: 'Growth & Acquisition',
    projectManagerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    lastUpdated: '28 Oct 2026',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=400&q=80',
    objectives: [
      'Reach expecting parents within a 15km radius of Banjara Hills.',
      'Promote comprehensive maternity care packages and private birthing suites.',
      'Generate 40-60 verified antenatal consultation appointments monthly.'
    ],
    deliverablesList: [
      'Campaign budget & ROI projection document',
      'Meta Carousel, Stories & Reel ad visual creatives',
      'Google Search responsive search ad copy',
      'Dedicated lead-capture landing page optimization'
    ],
    // 12 Connected Agent Chain (Matching Screenshot 100%)
    roadmap: [
      {
        id: '01',
        number: '01',
        name: 'Arjun',
        agentId: 'CEO-001',
        role: 'CEO Agent',
        department: 'CEO Office & Enterprise Strategy',
        title: 'Project Initiation & Strategic Direction',
        description: 'Defined campaign objectives, approved budget and aligned departments.',
        status: 'Completed',
        statusKey: 'completed',
        date: '10 Sep 2026',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: false,
        roleInProject: 'Overall campaign alignment and enterprise resource provisioning.',
        aboutDesc: 'Translates hospital expansion objectives into coordinated agent assignments and milestones.',
        workSummary: [
          { label: 'Received client maternity initiative brief', date: '08 Sep 2026', status: 'completed' },
          { label: 'Validated commercial scope and milestone schedule', date: '09 Sep 2026', status: 'completed' },
          { label: 'Provisioned enterprise budget envelope and authorized kickoff', date: '10 Sep 2026', status: 'completed' }
        ],
        deliverables: [
          { name: 'Maternity Campaign Charter.pdf', size: '1.4 MB', type: 'PDF', desc: 'Strategic project scope and milestone breakdown' }
        ],
        inputs: 'Client intake brief, 2026 healthcare marketing objectives',
        outputs: 'Project charter, department allocation parameters',
        handoff: {
          from: 'Client Onboarding Intake',
          to: 'Vikram (SAL-001 · Sales & Growth Agent)',
          notes: 'Strategic charter transferred for local market analysis.'
        }
      },
      {
        id: '02',
        number: '02',
        name: 'Vikram',
        agentId: 'SAL-001',
        role: 'Sales & Growth Agent',
        department: 'Sales & Business Development',
        title: 'Market Analysis & Growth Strategy',
        description: 'Analyzed local market, defined target segments and growth strategy.',
        status: 'Completed',
        statusKey: 'completed',
        date: '12 Sep 2026',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: false,
        roleInProject: 'Market sizing, local healthcare competitor analysis, and audience segmentation.',
        aboutDesc: 'Analyzes Hyderabad urban demographics and identifies high-intent expecting family clusters.',
        workSummary: [
          { label: 'Evaluated competitor maternity packages in Hyderabad', date: '11 Sep 2026', status: 'completed' },
          { label: 'Profiled prime target audience within 15km of Banjara Hills', date: '12 Sep 2026', status: 'completed' },
          { label: 'Established cost-per-consultation targets (< ₹850)', date: '12 Sep 2026', status: 'completed' }
        ],
        deliverables: [
          { name: 'Market Analysis & Audience Profile.pdf', size: '2.8 MB', type: 'PDF', desc: 'Demographic clusters and competitive package matrix' }
        ],
        inputs: 'Project Charter from Arjun (CEO-001)',
        outputs: 'Audience segment definition and commercial targets',
        handoff: {
          from: 'Arjun (CEO-001)',
          to: 'Tejas (PMG-001 · Marketing Strategy Agent)',
          notes: 'Target audience specifications passed for media channel planning.'
        }
      },
      {
        id: '03',
        number: '03',
        name: 'Tejas',
        agentId: 'PMG-001',
        role: 'Marketing Strategy Agent',
        department: 'Paid Media, SEO & Growth',
        title: 'Media Strategy & Channel Planning',
        description: 'Prepared Google and Meta ads strategy with keyword and audience plan.',
        status: 'Completed',
        statusKey: 'completed',
        date: '16 Sep 2026',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: false,
        roleInProject: 'Media channel selection, keyword bidding models, and budget split configuration.',
        aboutDesc: 'Architects paid acquisition campaigns across Meta (Instagram/Facebook) and Google Search.',
        workSummary: [
          { label: 'Modeled Google Search keyword volumes for maternity delivery', date: '14 Sep 2026', status: 'completed' },
          { label: 'Designed Meta carousel funnel architecture', date: '15 Sep 2026', status: 'completed' },
          { label: 'Delivered channel split recommendation (60% Meta / 40% Google)', date: '16 Sep 2026', status: 'completed' }
        ],
        deliverables: [
          { name: 'Media Channel Blueprint.xlsx', size: '1.2 MB', type: 'Spreadsheet', desc: 'Channel allocations and keyword intent tiers' }
        ],
        inputs: 'Market Analysis from Vikram (SAL-001)',
        outputs: 'Paid media allocation plan and creative briefs',
        handoff: {
          from: 'Vikram (SAL-001)',
          to: 'Aarya (CRT-001 · Creative Agent)',
          notes: 'Creative briefs and asset specs handed off for visual production.'
        }
      },
      {
        id: '04',
        number: '04',
        name: 'Aarya',
        agentId: 'CRT-001',
        role: 'Creative Agent',
        department: 'Creative, Content & Social',
        title: 'Creative Concepts & Content Production',
        description: 'Designed ad creatives, social media content and video scripts.',
        status: 'Completed',
        statusKey: 'completed',
        date: '22 Sep 2026',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: false,
        roleInProject: 'Visual art direction, suite photography selection, and design rendering.',
        aboutDesc: 'Leads visual design and branding compliance for clinical campaigns.',
        workSummary: [
          { label: 'Developed 3 visual concept directions for birthing suites', date: '19 Sep 2026', status: 'completed' },
          { label: 'Rendered 6 high-res carousel slides and 2 Story formats', date: '21 Sep 2026', status: 'completed' },
          { label: 'Conducted brand color consistency and typography verification', date: '22 Sep 2026', status: 'completed' }
        ],
        deliverables: [
          { name: 'Meta Ad Creatives Set.zip', size: '8.4 MB', type: 'Archive', desc: 'Pack of 6 graphic banners and 2 video reel covers' }
        ],
        inputs: 'Media Strategy Blueprint from Tejas (PMG-001)',
        outputs: 'High-res visual banners and video cover assets',
        handoff: {
          from: 'Tejas (PMG-001)',
          to: 'Lakshman (MKT-002 · Content Specialist Agent)',
          notes: 'Visual assets handed over for empathetic copy pairing.'
        }
      },
      {
        id: '05',
        number: '05',
        name: 'Lakshman',
        agentId: 'MKT-002',
        role: 'Content Specialist Agent',
        department: 'Samrudhi Brand & Marketing',
        title: 'Ad Copy & Storyboarding',
        description: 'Wrote ad copy, headlines and prepared storyboards for A/B testing.',
        status: 'Completed',
        statusKey: 'completed',
        date: '25 Sep 2026',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: false,
        roleInProject: 'Ad copywriting, clinical disclaimers, and A/B test variations.',
        aboutDesc: 'Crafts reassuring, clinical-grade messaging for prospective mothers and families.',
        workSummary: [
          { label: 'Authored 8 empathetic headline variations for Google Ads', date: '23 Sep 2026', status: 'completed' },
          { label: 'Drafted Meta primary texts emphasizing 24/7 NICU safety', date: '24 Sep 2026', status: 'completed' },
          { label: 'Structured complete A/B copy matrix', date: '25 Sep 2026', status: 'completed' }
        ],
        deliverables: [
          { name: 'Ad Copy Variations Matrix.docx', size: '850 KB', type: 'Document', desc: 'Approved headline and body copy variations' }
        ],
        inputs: 'Visual banners from Aarya (CRT-001)',
        outputs: 'Validated copy and call-to-action treatments',
        handoff: {
          from: 'Aarya (CRT-001)',
          to: 'Mitra (CEX-001 · Client Experience Agent)',
          notes: 'Paired assets submitted for live campaign setup.'
        }
      },
      {
        id: '06',
        number: '06',
        name: 'Mitra',
        agentId: 'CEX-001',
        role: 'Client Experience Agent',
        department: 'Client Experience & Account Management',
        title: 'Campaign Setup & Ad Configuration',
        description: 'Setting up campaigns, audiences and tracking. Initial testing in progress.',
        status: 'In Progress',
        statusKey: 'in_progress',
        date: '26 Oct 2026',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: false,
        roleInProject: 'Staging ad sets, tracking pixels, and conversion test verification.',
        aboutDesc: 'Manages end-to-end client communications, technical staging, and delivery coordination.',
        workSummary: [
          { label: 'Configured draft campaigns in Meta Ads Manager', date: '26 Oct 2026', status: 'completed' },
          { label: 'Verified Google Tag Manager conversion events and lead forms', date: '26 Oct 2026', status: 'completed' },
          { label: 'Initial sandbox tracking verification in progress', date: '27 Oct 2026', status: 'in_progress' }
        ],
        deliverables: [
          { name: 'Campaign Setup Verification Spec.pdf', size: '1.6 MB', type: 'PDF', desc: 'Pixel tracking and conversion webhook configuration' }
        ],
        inputs: 'Copy matrix and banners from Lakshman (MKT-002)',
        outputs: 'Staged advertising campaigns awaiting financial release',
        handoff: {
          from: 'Lakshman (MKT-002)',
          to: 'Niti (FIN-001 · Finance Agent)',
          notes: 'Staged campaign submitted for budget utilization review.'
        }
      },
      {
        id: '07',
        number: '07',
        name: 'Niti',
        agentId: 'FIN-001',
        role: 'Finance Agent',
        department: 'Finance & Administration',
        title: 'Budget Utilisation Review',
        description: 'Reviews campaign budget and spend plan for your approval.',
        status: 'Waiting for Approval',
        statusKey: 'approval',
        date: '28 Oct 2026',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: true,
        roleInProject: 'Review campaign budget and spend plan',
        assignedDate: '26 Oct 2026',
        currentStatus: 'Waiting for your approval',
        aboutDesc: 'Reviews the proposed campaign budget, validates allocation across channels and ensures cost efficiency.',
        workSummary: [
          { label: 'Received campaign plan from Marketing Agent', date: '26 Oct 2026', status: 'completed' },
          { label: 'Analysed budget allocation and channel spend', date: '27 Oct 2026', status: 'completed' },
          { label: 'Prepared final budget plan for approval', date: '28 Oct 2026', status: 'completed' },
          { label: 'Waiting for your review and approval', date: 'Pending', status: 'pending' }
        ],
        deliverables: [
          { name: 'Campaign Budget Plan.pdf', size: '2.1 MB', type: 'PDF', desc: 'Budget breakdown and channel allocation' }
        ],
        actionRequired: {
          title: 'Your approval is needed to proceed to the next stage.',
          message: 'Please review the budget plan and approve so we can continue with campaign launch.',
          deliverableName: 'Campaign Budget Plan.pdf',
          deliverableSize: '2.1 MB',
          docId: 'DOC-301'
        },
        inputs: 'Staged campaign telemetry from Mitra (CEX-001)',
        outputs: 'Campaign Budget Plan.pdf (₹1,20,000 monthly spend plan)',
        handoff: {
          from: 'Mitra (CEX-001)',
          to: 'Medha (DAT-001 · Analytics Agent)',
          notes: 'Requires client budget sign-off before releasing ad deployment.'
        }
      },
      {
        id: '08',
        number: '08',
        name: 'Medha',
        agentId: 'DAT-001',
        role: 'Analytics Agent',
        department: 'Analytics, Intelligence & Reporting',
        title: 'Performance Tracking & Reporting',
        description: 'Will monitor campaign performance and prepare detailed reports.',
        status: 'Not Started',
        statusKey: 'not_started',
        date: '--',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: false,
        roleInProject: 'Real-time telemetry, lead volume auditing, and CAC monitoring.',
        aboutDesc: 'Analyzes cross-platform patient acquisition data with zero data drift.',
        workSummary: [
          { label: 'Configure real-time dashboard telemetry', date: 'Scheduled', status: 'not_started' },
          { label: 'Set up daily inquiry volume and CAC alerts', date: 'Scheduled', status: 'not_started' }
        ],
        deliverables: [
          { name: 'Maternity Analytics Dashboard', size: 'Live Portal', type: 'Dashboard', desc: 'Real-time patient booking metrics' }
        ],
        inputs: 'Authorized budget release from Niti (FIN-001)',
        outputs: 'Attribution data pipeline and weekly executive digest',
        handoff: {
          from: 'Niti (FIN-001)',
          to: 'Satya (GOV-001 · Quality Review Agent)',
          notes: 'Data streams mapped for governance compliance audit.'
        }
      },
      {
        id: '09',
        number: '09',
        name: 'Satya',
        agentId: 'GOV-001',
        role: 'Quality Review Agent',
        department: 'Independent Assurance, Compliance & Governance',
        title: 'Final Quality Review & Compliance',
        description: 'Will verify all assets, reports and compliance before completion.',
        status: 'Not Started',
        statusKey: 'not_started',
        date: '--',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: false,
        roleInProject: 'Independent clinical QA, ethical advertising audit, and patient privacy verification.',
        aboutDesc: 'Conducts rigorous independent audits against NABH, medical disclaimers and healthcare standards.',
        workSummary: [
          { label: 'Audit medical claims against hospital clinical scope', date: 'Scheduled', status: 'not_started' },
          { label: 'Issue formal assurance sign-off certificate', date: 'Scheduled', status: 'not_started' }
        ],
        deliverables: [
          { name: 'Compliance Sign-off Certificate.pdf', size: '1.1 MB', type: 'PDF', desc: 'Verified clinical compliance registry' }
        ],
        inputs: 'Live campaign configuration and analytics tracking',
        outputs: 'Independent compliance sign-off certificate',
        handoff: {
          from: 'Medha (DAT-001)',
          to: 'Automated Deployment Agent (TEC-001)',
          notes: 'Compliance clearance authorizes automated ad activation.'
        }
      },
      {
        id: '10',
        number: '10',
        name: 'Automated',
        agentId: 'TEC-001',
        role: 'Deployment Agent',
        department: 'Technology, MCP & AgentOps',
        title: 'Campaign Launch & Optimization',
        description: 'Launch final campaigns and optimize based on real-time performance.',
        status: 'Not Started',
        statusKey: 'not_started',
        date: '--',
        avatar: null,
        isAutomated: true,
        hasApproval: false,
        roleInProject: 'Automated API publication and programmatic bid adjustments.',
        aboutDesc: 'Runtime worker executing scheduled ad launches and budget pacing.',
        workSummary: [
          { label: 'Trigger Meta Ads API live ad activation', date: 'Scheduled', status: 'not_started' },
          { label: 'Enable automated bid adjustments for off-peak hours', date: 'Scheduled', status: 'not_started' }
        ],
        deliverables: [
          { name: 'Ad Deployment Receipt.json', size: '48 KB', type: 'JSON', desc: 'API publication confirmation log' }
        ],
        inputs: 'Compliance certificate from Satya (GOV-001)',
        outputs: 'Active ad sets running on Meta and Google Ads',
        handoff: {
          from: 'Satya (GOV-001)',
          to: 'Automated Continuous Monitoring (TEC-002)',
          notes: 'Live status handed off for 24/7 telemetry monitoring.'
        }
      },
      {
        id: '11',
        number: '11',
        name: 'Automated',
        agentId: 'TEC-002',
        role: 'Continuous Monitoring Agent',
        department: 'Technology, MCP & AgentOps',
        title: 'Ongoing Monitoring & Adjustments',
        description: 'Monitor performance, make adjustments and manage ongoing operations.',
        status: 'Not Started',
        statusKey: 'not_started',
        date: '--',
        avatar: null,
        isAutomated: true,
        hasApproval: false,
        roleInProject: 'Continuous anomaly detection, lead form validation, and spend pacing.',
        aboutDesc: 'Autonomous sentinel monitoring server uptime and ad engagement health.',
        workSummary: [
          { label: 'Daily tracking pixel telemetry checks', date: 'Scheduled', status: 'not_started' },
          { label: 'Anomaly alerts for sudden conversion drops', date: 'Scheduled', status: 'not_started' }
        ],
        deliverables: [
          { name: 'Daily Pacing Ledger', size: 'Telemetry', type: 'Data', desc: 'Real-time spend pacing stream' }
        ],
        inputs: 'Live ad auction telemetry',
        outputs: 'Health status reports and pacing optimizations',
        handoff: {
          from: 'Automated Deployment (TEC-001)',
          to: 'Automated Project Completion (OPS-001)',
          notes: 'Ongoing telemetry accumulated for final project closure.'
        }
      },
      {
        id: '12',
        number: '12',
        name: 'Automated',
        agentId: 'OPS-001',
        role: 'Project Completion',
        department: 'Operations & Delivery Management',
        title: 'Project Completion',
        description: 'Final report, learnings and handover.',
        status: 'Not Started',
        statusKey: 'not_started',
        date: '--',
        avatar: null,
        isAutomated: true,
        hasApproval: false,
        roleInProject: 'End-of-campaign synthesis, patient acquisition audit, and contract review.',
        aboutDesc: 'Finalizes delivery milestones and packages comprehensive retrospective reports.',
        workSummary: [
          { label: 'Consolidate final campaign retrospective', date: 'Scheduled', status: 'not_started' },
          { label: 'Archive creative assets and performance ledger', date: 'Scheduled', status: 'not_started' }
        ],
        deliverables: [
          { name: 'Final Campaign Retrospective.pdf', size: '4.8 MB', type: 'PDF', desc: 'Complete 30-day inquiry and ROI synthesis' }
        ],
        inputs: 'Continuous monitoring records from TEC-002',
        outputs: 'Final project report and archival package',
        handoff: {
          from: 'Automated Continuous Monitoring (TEC-002)',
          to: 'Client Workspace Archive',
          notes: 'Full campaign assets archived in client portal.'
        }
      }
    ],
    documents: [
      {
        id: 'DOC-301',
        name: 'Campaign Budget Plan.pdf',
        type: 'PDF',
        fileExt: 'pdf',
        category: 'Ad budget breakdown',
        size: '2.1 MB',
        uploadedDate: '28 Oct 2026',
        taskRef: 'Budget Utilisation Review',
        previewText: 'Detailed 4-week ad expenditure schedule allocating ₹70,000 to Meta and ₹50,000 to Google Search.'
      },
      {
        id: 'DOC-302',
        name: 'Meta Ad Creatives Set.zip',
        type: 'Archive',
        fileExt: 'zip',
        category: 'Graphic banners',
        size: '8.4 MB',
        uploadedDate: '22 Sep 2026',
        taskRef: 'Creative Concepts & Content Production',
        previewText: 'High-res creative pack containing 6 carousel cards, 2 Instagram Story frames, and banner assets.'
      },
      {
        id: 'DOC-303',
        name: 'Ad Copy Variations Matrix.docx',
        type: 'Document',
        fileExt: 'docx',
        category: 'Copy options',
        size: '850 KB',
        uploadedDate: '25 Sep 2026',
        taskRef: 'Ad Copy & Storyboarding',
        previewText: 'Approved copy alternatives emphasizing 24/7 neonatal intensive care and private suite amenities.'
      },
      {
        id: 'DOC-304',
        name: 'Market Analysis & Audience Profile.pdf',
        type: 'PDF',
        fileExt: 'pdf',
        category: 'Research report',
        size: '2.8 MB',
        uploadedDate: '12 Sep 2026',
        taskRef: 'Market Analysis & Growth Strategy',
        previewText: 'Demographic clusters of expecting parents in Banjara Hills, Jubilee Hills, and Gachibowli.'
      },
      {
        id: 'DOC-305',
        name: 'Media Channel Blueprint.xlsx',
        type: 'Spreadsheet',
        fileExt: 'xlsx',
        category: 'Media planning',
        size: '1.2 MB',
        uploadedDate: '16 Sep 2026',
        taskRef: 'Media Strategy & Channel Planning',
        previewText: 'Target keyword CPCs, impression shares, and weekly budget pacing models.'
      },
      {
        id: 'DOC-306',
        name: 'Campaign Setup Verification Spec.pdf',
        type: 'PDF',
        fileExt: 'pdf',
        category: 'Technical spec',
        size: '1.6 MB',
        uploadedDate: '26 Oct 2026',
        taskRef: 'Campaign Setup & Ad Configuration',
        previewText: 'Meta Pixel integration verification and Google Ads conversion action tracking.'
      },
      {
        id: 'DOC-307',
        name: 'Maternity Campaign Charter.pdf',
        type: 'PDF',
        fileExt: 'pdf',
        category: 'Strategy document',
        size: '1.4 MB',
        uploadedDate: '10 Sep 2026',
        taskRef: 'Project Initiation & Strategic Direction',
        previewText: 'High-level project charter with patient acquisition targets and department roles.'
      },
      {
        id: 'DOC-308',
        name: 'Doctor Q&A Video Script.docx',
        type: 'Document',
        fileExt: 'docx',
        category: 'Content script',
        size: '420 KB',
        uploadedDate: '24 Sep 2026',
        taskRef: 'Ad Copy & Storyboarding',
        previewText: 'Video interview script for Chief Obstetrician addressing safe painless delivery options.'
      }
    ]
  },
  {
    id: 'PRJ-001',
    code: 'PRJ-001',
    name: 'Cardiac Awareness Campaign',
    category: 'Social Media',
    type: 'Social Media Campaign',
    shortDesc: 'A multi-channel campaign to create awareness about heart health, promote preventive care and increase hospital visibility.',
    description: 'A multi-channel campaign to create awareness about heart health, promote preventive care and increase hospital visibility.',
    status: 'In Progress',
    statusKey: 'in_progress',
    progress: 70,
    startDate: '01 Sep 2026',
    dueDate: '30 Oct 2026',
    completedDate: null,
    nextMilestone: 'Approve final content plan',
    nextMilestoneDate: '30 Oct 2026',
    waitingApproval: true,
    approvalNote: 'Content calendar and visual creatives awaiting final client approval.',
    projectManager: 'Aarya',
    projectManagerRole: 'Creative Lead',
    projectManagerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    lastUpdated: '28 Oct 2026',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80',
    objectives: [
      'Create awareness about heart health and preventive cardiology.',
      'Increase hospital visibility and cardiology department reach.',
      'Generate patient inquiries for preventive cardiac screening.'
    ],
    deliverablesList: [
      'Social media content plan & calendar',
      'Educational infographics (1080x1080)',
      'Patient awareness short-form videos',
      'Performance & engagement analytics report'
    ],
    roadmap: [
      {
        id: '01',
        number: '01',
        name: 'Arjun',
        agentId: 'CEO-001',
        role: 'CEO Agent',
        department: 'CEO Office & Enterprise Strategy',
        title: 'Project Initiation & Mandate',
        description: 'Defined preventive cardiology campaign objectives and milestone timelines.',
        status: 'Completed',
        statusKey: 'completed',
        date: '01 Sep 2026',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: false,
        workSummary: [
          { label: 'Authorized World Heart Day awareness campaign scope', date: '01 Sep 2026', status: 'completed' },
          { label: 'Assigned Creative and Growth agent squads', date: '02 Sep 2026', status: 'completed' }
        ],
        deliverables: [{ name: 'Cardiac Campaign Scope.pdf', size: '1.2 MB', type: 'PDF', desc: 'Campaign mandate' }],
        inputs: 'Hospital cardiac department focus areas',
        outputs: 'Approved campaign charter',
        handoff: { from: 'Initiation', to: 'Tejas (PMG-001)', notes: 'Scope handed off for audience research.' }
      },
      {
        id: '02',
        number: '02',
        name: 'Tejas',
        agentId: 'PMG-001',
        role: 'Marketing Strategy Agent',
        department: 'Paid Media, SEO & Growth',
        title: 'Audience Research & Channel Mix',
        description: 'Identified key patient demographic targets and content channel distribution.',
        status: 'Completed',
        statusKey: 'completed',
        date: '10 Sep 2026',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: false,
        workSummary: [
          { label: 'Analyzed heart screening interest among age 35-65', date: '06 Sep 2026', status: 'completed' },
          { label: 'Selected Instagram, Facebook, and hospital blog channels', date: '10 Sep 2026', status: 'completed' }
        ],
        deliverables: [{ name: 'Campaign Strategy.pdf', size: '2.4 MB', type: 'PDF', desc: 'Audience insights and channel plan' }],
        inputs: 'Scope from Arjun (CEO-001)',
        outputs: 'Target audience criteria',
        handoff: { from: 'Arjun (CEO-001)', to: 'Aarya (CRT-001)', notes: 'Content themes assigned to Creative Studio.' }
      },
      {
        id: '03',
        number: '03',
        name: 'Aarya',
        agentId: 'CRT-001',
        role: 'Creative Agent',
        department: 'Creative, Content & Social',
        title: 'Visual Identity & Content Creation',
        description: 'Drafted 30-day educational content calendar and clinical infographics.',
        status: 'Completed',
        statusKey: 'completed',
        date: '25 Oct 2026',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: false,
        workSummary: [
          { label: 'Designed heart anatomy and lifestyle infographics', date: '18 Oct 2026', status: 'completed' },
          { label: 'Structured complete 30-day publishing calendar', date: '25 Oct 2026', status: 'completed' }
        ],
        deliverables: [{ name: 'Social Media Calendar.xlsx', size: '1.1 MB', type: 'Spreadsheet', desc: 'Content calendar' }],
        inputs: 'Strategy plan from Tejas (PMG-001)',
        outputs: 'Full creative post drafts and visual assets',
        handoff: { from: 'Tejas (PMG-001)', to: 'Lakshman (MKT-002)', notes: 'Content submitted for medical copywriting review.' }
      },
      {
        id: '04',
        number: '04',
        name: 'Lakshman',
        agentId: 'MKT-002',
        role: 'Content Specialist Agent',
        department: 'Samrudhi Brand & Marketing',
        title: 'Ad Creative Design & Copywriting',
        description: 'Finalized heart health creative graphics and emergency contact cards.',
        status: 'In Progress',
        statusKey: 'in_progress',
        date: '28 Oct 2026',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: false,
        workSummary: [
          { label: 'Finalized infographic "5 Simple Habits for a Healthy Heart"', date: '24 Oct 2026', status: 'completed' },
          { label: 'Video reel script "When to see a cardiologist"', date: '26 Oct 2026', status: 'completed' },
          { label: 'Packaging deliverables for client review', date: '28 Oct 2026', status: 'in_progress' }
        ],
        deliverables: [{ name: 'Infographic - Heart Health.png', size: '3.2 MB', type: 'Image', desc: 'Heart health infographic' }],
        inputs: 'Draft calendar from Aarya (CRT-001)',
        outputs: 'Clinical-grade graphics and copy',
        handoff: { from: 'Aarya (CRT-001)', to: 'Mitra (CEX-001)', notes: 'Submitted for client plan approval.' }
      },
      {
        id: '05',
        number: '05',
        name: 'Mitra',
        agentId: 'CEX-001',
        role: 'Client Review & Approval',
        department: 'Client Experience & Account Management',
        title: 'Content Plan Client Review',
        description: 'Reviews social content calendar and visual creatives for your sign-off.',
        status: 'Waiting for Approval',
        statusKey: 'approval',
        date: '30 Oct 2026',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: true,
        actionRequired: {
          title: 'Your approval is needed for the Cardiac Content Plan.',
          message: 'Please review the 30-day social calendar and heart health infographic creatives.',
          deliverableName: 'Social Media Calendar.xlsx',
          deliverableSize: '1.1 MB',
          docId: 'DOC-102'
        },
        workSummary: [
          { label: 'Assembled social media drafts and infographics', date: '28 Oct 2026', status: 'completed' },
          { label: 'Awaiting Dr. Iyer approval on publishing schedule', date: 'Pending', status: 'pending' }
        ],
        deliverables: [{ name: 'Social Media Calendar.xlsx', size: '1.1 MB', type: 'Spreadsheet', desc: 'Calendar awaiting sign-off' }],
        inputs: 'Final graphics and copy matrix',
        outputs: 'Client approved content queue',
        handoff: { from: 'Lakshman (MKT-002)', to: 'Automated Publishing (TEC-001)', notes: 'Awaiting client approval.' }
      },
      {
        id: '06',
        number: '06',
        name: 'Satya',
        agentId: 'GOV-001',
        role: 'Quality Review Agent',
        department: 'Independent Assurance, Compliance & Governance',
        title: 'Clinical Compliance & Medical Sign-Off',
        description: 'Will verify all medical health claims comply with national healthcare advertising guidelines.',
        status: 'Not Started',
        statusKey: 'not_started',
        date: '--',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: false,
        workSummary: [{ label: 'Verify clinical validity of heart symptom checklists', date: 'Scheduled', status: 'not_started' }],
        deliverables: [{ name: 'Clinical Sign-off Report', size: 'Document', type: 'PDF', desc: 'Compliance audit' }],
        inputs: 'Approved content plan',
        outputs: 'Certified publishing ledger',
        handoff: { from: 'Mitra (CEX-001)', to: 'Automated Deployment (TEC-001)', notes: 'Pending client approval.' }
      },
      {
        id: '07',
        number: '07',
        name: 'Automated',
        agentId: 'TEC-001',
        role: 'Deployment Agent',
        department: 'Technology, MCP & AgentOps',
        title: 'Scheduled Publishing & Engagement Engine',
        description: 'Automated scheduling and distribution across Instagram, Facebook and LinkedIn.',
        status: 'Not Started',
        statusKey: 'not_started',
        date: '--',
        avatar: null,
        isAutomated: true,
        hasApproval: false,
        workSummary: [{ label: 'Queue posts into Instagram & Facebook APIs', date: 'Scheduled', status: 'not_started' }],
        deliverables: [],
        inputs: 'Certified creative posts',
        outputs: 'Published social content',
        handoff: { from: 'Satya (GOV-001)', to: 'Medha (DAT-001)', notes: 'Execution monitoring.' }
      },
      {
        id: '08',
        number: '08',
        name: 'Medha',
        agentId: 'DAT-001',
        role: 'Analytics Agent',
        department: 'Analytics, Intelligence & Reporting',
        title: 'Engagement & Patient Inquiry Tracking',
        description: 'Monitors community reach, comments, and cardiac consultation bookings.',
        status: 'Not Started',
        statusKey: 'not_started',
        date: '--',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: false,
        workSummary: [{ label: 'Generate engagement and appointment conversion report', date: 'Scheduled', status: 'not_started' }],
        deliverables: [{ name: 'Cardiac Campaign Analytics Deck', size: 'PDF', type: 'PDF', desc: 'Reach report' }],
        inputs: 'Social API engagement logs',
        outputs: 'Comprehensive engagement report',
        handoff: { from: 'Automated Deployment', to: 'Project Archive', notes: 'Final project milestone.' }
      }
    ],
    documents: [
      {
        id: 'DOC-101',
        name: 'Campaign Strategy.pdf',
        type: 'PDF',
        fileExt: 'pdf',
        category: 'Strategy document',
        size: '2.4 MB',
        uploadedDate: '10 Oct 2026',
        taskRef: 'Research & Strategy',
        previewText: 'Comprehensive cardiac health outreach strategy focusing on preventive check-ups, doctor Q&A series, and emergency helpline awareness.'
      },
      {
        id: 'DOC-102',
        name: 'Social Media Calendar.xlsx',
        type: 'Spreadsheet',
        fileExt: 'xlsx',
        category: 'Content calendar',
        size: '1.1 MB',
        uploadedDate: '18 Oct 2026',
        taskRef: 'Content Creation',
        previewText: '30-day post calendar with Instagram carousels, Facebook articles, LinkedIn clinical spotlights, and timing matrix.'
      },
      {
        id: 'DOC-103',
        name: 'Infographic - Heart Health.png',
        type: 'Image',
        fileExt: 'png',
        category: 'Infographic design',
        size: '3.2 MB',
        uploadedDate: '24 Oct 2026',
        taskRef: 'Ad Creative Design',
        previewText: 'High-res 1080x1350 infographic detailing signs of early heart distress vs everyday fatigue with hospital helpline.'
      },
      {
        id: 'DOC-104',
        name: 'Awareness Video.mp4',
        type: 'Video',
        fileExt: 'mp4',
        category: 'Campaign video',
        size: '12.8 MB',
        uploadedDate: '26 Oct 2026',
        taskRef: 'Video Production',
        previewText: '60-second video featuring Dr. Ramachandran explaining non-invasive cardiac evaluation at City Care.'
      },
      {
        id: 'DOC-105',
        name: 'Audience Research Report.pdf',
        type: 'PDF',
        fileExt: 'pdf',
        category: 'Research report',
        size: '4.1 MB',
        uploadedDate: '12 Oct 2026',
        taskRef: 'Research & Strategy',
        previewText: 'Demographic breakdown of Hyderabad urban areas with highest interest in proactive cardiovascular screening.'
      }
    ]
  },
  {
    id: 'PRJ-002',
    code: 'PRJ-002',
    name: 'Diabetes Care Website',
    category: 'Website (SEO)',
    type: 'Website & SEO Portal',
    shortDesc: 'Design and develop an SEO friendly website for diabetes care to help patients find care and book specialist consultations.',
    description: 'Design and develop an SEO friendly website for diabetes care to help patients find care and book specialist consultations.',
    status: 'In Progress',
    statusKey: 'in_progress',
    progress: 45,
    startDate: '15 Sep 2026',
    dueDate: '04 Nov 2026',
    completedDate: null,
    nextMilestone: 'Review homepage design',
    nextMilestoneDate: '04 Nov 2026',
    waitingApproval: false,
    approvalNote: null,
    projectManager: 'Tejas',
    projectManagerRole: 'SEO & Growth Lead',
    projectManagerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    lastUpdated: '27 Oct 2026',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80',
    objectives: [
      'Design modern, mobile-responsive diabetes care digital hub.',
      'Rank in top 3 Google local results for diabetes care in Hyderabad.',
      'Provide instant online appointment booking with diabetologists.'
    ],
    deliverablesList: [
      'SEO Architecture & Keyword Map',
      'High-fidelity Figma Homepage Wireframes',
      'Clinical copy for endocrinology and dietetics services',
      'Performance and PageSpeed optimization report'
    ],
    roadmap: [
      {
        id: '01',
        number: '01',
        name: 'Arjun',
        agentId: 'CEO-001',
        role: 'CEO Agent',
        department: 'CEO Office & Enterprise Strategy',
        title: 'Project Initiation & Scope',
        description: 'Established patient booking funnel requirements and hospital website expansion.',
        status: 'Completed',
        statusKey: 'completed',
        date: '15 Sep 2026',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: false,
        workSummary: [{ label: 'Approved digital portal specifications', date: '15 Sep 2026', status: 'completed' }],
        deliverables: [{ name: 'Diabetes Web Charter.pdf', size: '1.2 MB', type: 'PDF', desc: 'Technical mandate' }],
        inputs: 'Hospital expansion roadmap',
        outputs: 'Charter',
        handoff: { from: 'Initiation', to: 'Medha (DAT-001)', notes: 'Handed off for keyword analytics.' }
      },
      {
        id: '02',
        number: '02',
        name: 'Medha',
        agentId: 'DAT-001',
        role: 'Analytics Agent',
        department: 'Analytics, Intelligence & Reporting',
        title: 'Keyword & Competitor Analysis',
        description: 'Mapped 142 search queries with high conversion intent for endocrinology.',
        status: 'Completed',
        statusKey: 'completed',
        date: '22 Sep 2026',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: false,
        workSummary: [{ label: 'Evaluated search intent and keyword competition', date: '22 Sep 2026', status: 'completed' }],
        deliverables: [{ name: 'Keyword Research & Gap Analysis.xlsx', size: '1.4 MB', type: 'Spreadsheet', desc: '142 search keywords' }],
        inputs: 'Charter',
        outputs: 'Keyword taxonomy',
        handoff: { from: 'Arjun (CEO-001)', to: 'Aarya (CRT-001)', notes: 'Taxonomy handed off for wireframing.' }
      },
      {
        id: '03',
        number: '03',
        name: 'Aarya',
        agentId: 'CRT-001',
        role: 'Creative Agent',
        department: 'Creative, Content & Social',
        title: 'Information Architecture & Wireframes',
        description: 'Designed UX sitemap, page hierarchy and mobile booking user journeys.',
        status: 'Completed',
        statusKey: 'completed',
        date: '08 Oct 2026',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: false,
        workSummary: [{ label: 'Designed 6 core page wireframes', date: '08 Oct 2026', status: 'completed' }],
        deliverables: [{ name: 'Website IA Blueprint.pdf', size: '3.8 MB', type: 'PDF', desc: 'Information architecture blueprint' }],
        inputs: 'Keywords from Medha (DAT-001)',
        outputs: 'Figma wireframes',
        handoff: { from: 'Medha (DAT-001)', to: 'Sutra (TEC-001)', notes: 'Figma designs handed over for frontend coding.' }
      },
      {
        id: '04',
        number: '04',
        name: 'Sutra',
        agentId: 'TEC-001',
        role: 'Technology Lead',
        department: 'Technology, MCP & AgentOps',
        title: 'Homepage UI Development',
        description: 'Coding responsive homepage prototype, appointment widget and doctor profiles.',
        status: 'In Progress',
        statusKey: 'in_progress',
        date: '27 Oct 2026',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: false,
        workSummary: [
          { label: 'Built interactive doctor schedule selector', date: '24 Oct 2026', status: 'completed' },
          { label: 'Responsive mobile breakpoint testing', date: '27 Oct 2026', status: 'in_progress' }
        ],
        deliverables: [{ name: 'Homepage Mockup v2.png', size: '4.5 MB', type: 'Image', desc: 'Visual UI mockup' }],
        inputs: 'Wireframes from Aarya (CRT-001)',
        outputs: 'Coded prototype',
        handoff: { from: 'Aarya (CRT-001)', to: 'Daksh (OPS-001)', notes: 'Pending prototype completion.' }
      },
      {
        id: '05',
        number: '05',
        name: 'Daksh',
        agentId: 'OPS-001',
        role: 'Operations Agent',
        department: 'Operations & Delivery Management',
        title: 'On-page SEO & Schema Markup',
        description: 'Will configure medical clinic schema.org JSON-LD structured data and meta tags.',
        status: 'Not Started',
        statusKey: 'not_started',
        date: '--',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: false,
        workSummary: [{ label: 'Implement structured schema for local clinic search', date: 'Scheduled', status: 'not_started' }],
        deliverables: [],
        inputs: 'Coded website files',
        outputs: 'Validated SEO schema',
        handoff: { from: 'Sutra (TEC-001)', to: 'Satya (GOV-001)', notes: 'Pending coding.' }
      },
      {
        id: '06',
        number: '06',
        name: 'Satya',
        agentId: 'GOV-001',
        role: 'Quality Review Agent',
        department: 'Independent Assurance, Compliance & Governance',
        title: 'Accessibility & Security Audit',
        description: 'Will audit WCAG 2.1 AA accessibility and patient data encryption compliance.',
        status: 'Not Started',
        statusKey: 'not_started',
        date: '--',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: false,
        workSummary: [{ label: 'Verify accessibility standards and form security', date: 'Scheduled', status: 'not_started' }],
        deliverables: [],
        inputs: 'Staging website',
        outputs: 'Security and accessibility certificate',
        handoff: { from: 'Daksh (OPS-001)', to: 'Deployment', notes: 'Final gate.' }
      }
    ],
    documents: [
      {
        id: 'DOC-201',
        name: 'Website IA Blueprint.pdf',
        type: 'PDF',
        fileExt: 'pdf',
        category: 'Architecture guide',
        size: '3.8 MB',
        uploadedDate: '08 Oct 2026',
        taskRef: 'Information Architecture',
        previewText: 'Full sitemap, navigation taxonomy and patient user journeys for Diabetes Care portal.'
      },
      {
        id: 'DOC-202',
        name: 'Keyword Research & Gap Analysis.xlsx',
        type: 'Spreadsheet',
        fileExt: 'xlsx',
        category: 'SEO targets',
        size: '1.4 MB',
        uploadedDate: '22 Sep 2026',
        taskRef: 'Keyword & Competitor Analysis',
        previewText: '142 targeted healthcare keywords with CPC, search volume, and competitor positioning.'
      },
      {
        id: 'DOC-203',
        name: 'Homepage Mockup v2.png',
        type: 'Image',
        fileExt: 'png',
        category: 'Design preview',
        size: '4.5 MB',
        uploadedDate: '20 Oct 2026',
        taskRef: 'Homepage UI Development',
        previewText: 'High-res desktop and mobile layout preview featuring patient appointment widget.'
      }
    ]
  },
  {
    id: 'PRJ-004',
    code: 'PRJ-004',
    name: 'Monthly Performance Report',
    category: 'Analytics',
    type: 'Marketing Analytics & KPI Review',
    shortDesc: 'Monthly report on social, ads and website performance with plain-language metrics and ROI analysis.',
    description: 'Monthly report on social, ads and website performance with plain-language metrics and ROI analysis.',
    status: 'Completed',
    statusKey: 'completed',
    progress: 100,
    startDate: '01 Aug 2026',
    dueDate: '12 Oct 2026',
    completedDate: '12 Oct 2026',
    nextMilestone: 'Review completed findings',
    nextMilestoneDate: '12 Oct 2026',
    waitingApproval: false,
    approvalNote: null,
    projectManager: 'Medha',
    projectManagerRole: 'Analytics Lead',
    projectManagerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    lastUpdated: '12 Oct 2026',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
    objectives: [
      'Consolidate digital touchpoints and patient inquiry volumes.',
      'Analyze month-on-month growth across paid channels and organic reach.',
      'Identify cost-per-lead optimizations for ongoing campaigns.'
    ],
    deliverablesList: [
      'Executive monthly report presentation',
      'Channel attribution and conversion spreadsheet',
      'Doctor appointment referral audit'
    ],
    roadmap: [
      {
        id: '01',
        number: '01',
        name: 'Medha',
        agentId: 'DAT-001',
        role: 'Analytics Agent',
        department: 'Analytics, Intelligence & Reporting',
        title: 'Data Ingestion & Verification',
        description: 'Reconcile website traffic, Meta ads, and hospital call tracking.',
        status: 'Completed',
        statusKey: 'completed',
        date: '05 Oct 2026',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: false,
        workSummary: [{ label: 'Ingested 48,200 web visits and 1,290 ad leads', date: '05 Oct 2026', status: 'completed' }],
        deliverables: [{ name: 'Channel Attribution Breakdown.xlsx', size: '2.6 MB', type: 'Spreadsheet', desc: 'Attribution data' }],
        inputs: 'Raw channel telemetry',
        outputs: 'Verified data ledger',
        handoff: { from: 'Data Ingestion', to: 'Vikram (SAL-001)', notes: 'Clean data passed for executive deck.' }
      },
      {
        id: '02',
        number: '02',
        name: 'Vikram',
        agentId: 'SAL-001',
        role: 'Sales & Growth Agent',
        department: 'Sales & Business Development',
        title: 'Executive Reporting & Insights',
        description: 'Draft executive summary with strategic ROI recommendations.',
        status: 'Completed',
        statusKey: 'completed',
        date: '12 Oct 2026',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: false,
        workSummary: [{ label: 'Delivered September report presentation deck', date: '12 Oct 2026', status: 'completed' }],
        deliverables: [{ name: 'September 2026 Performance Report.pdf', size: '5.2 MB', type: 'PDF', desc: 'Executive report deck' }],
        inputs: 'Verified data from Medha (DAT-001)',
        outputs: 'Executive summary deck',
        handoff: { from: 'Medha (DAT-001)', to: 'Client Presentation', notes: 'Presented to Dr. Iyer.' }
      }
    ],
    documents: [
      {
        id: 'DOC-401',
        name: 'September 2026 Performance Report.pdf',
        type: 'PDF',
        fileExt: 'pdf',
        category: 'Monthly report',
        size: '5.2 MB',
        uploadedDate: '12 Oct 2026',
        taskRef: 'Executive Reporting & Insights',
        previewText: 'Summary: 2.1M total reach (+8%), 48.2k website visits (+12%), and 312 direct appointment inquiries.'
      },
      {
        id: 'DOC-402',
        name: 'Channel Attribution Breakdown.xlsx',
        type: 'Spreadsheet',
        fileExt: 'xlsx',
        category: 'Attribution data',
        size: '2.6 MB',
        uploadedDate: '12 Oct 2026',
        taskRef: 'Data Ingestion & Verification',
        previewText: 'Source-by-source breakdown of patient inquiries across Meta, Google Ads, and Organic Search.'
      }
    ]
  },
  {
    id: 'PRJ-005',
    code: 'PRJ-005',
    name: 'Orthopedic Care Brand Awareness',
    category: 'Brand & PR',
    type: 'Specialist Reputation & PR',
    shortDesc: 'Public awareness campaign highlighting advanced robotic joint replacement surgery and rehabilitation.',
    description: 'Public awareness campaign highlighting advanced robotic joint replacement surgery and rehabilitation.',
    status: 'Completed',
    statusKey: 'completed',
    progress: 100,
    startDate: '15 Jul 2026',
    dueDate: '15 Sep 2026',
    completedDate: '15 Sep 2026',
    nextMilestone: 'Project archived',
    nextMilestoneDate: '15 Sep 2026',
    waitingApproval: false,
    approvalNote: null,
    projectManager: 'Prerna',
    projectManagerRole: 'Brand Strategy Lead',
    projectManagerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    lastUpdated: '15 Sep 2026',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80',
    objectives: [
      'Position City Care as the premier center for robotic joint replacement.',
      'Showcase patient recovery stories and clinical safety standards.',
      'Distribute PR coverage across Hyderabad regional media.'
    ],
    deliverablesList: [
      'Surgeon spotlight video interview series',
      'Robotic surgery FAQ brochure',
      'Press release coverage report'
    ],
    roadmap: [
      {
        id: '01',
        number: '01',
        name: 'Prerna',
        agentId: 'MKT-001',
        role: 'Brand Strategy Agent',
        department: 'Samrudhi Brand & Marketing',
        title: 'PR & Media Strategy',
        description: 'Coordinated medical press release and surgeon interview placements.',
        status: 'Completed',
        statusKey: 'completed',
        date: '01 Sep 2026',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        isAutomated: false,
        hasApproval: false,
        workSummary: [{ label: 'Published 4 regional newspaper medical spotlights', date: '01 Sep 2026', status: 'completed' }],
        deliverables: [{ name: 'Orthopedic Campaign Case Study.pdf', size: '3.4 MB', type: 'PDF', desc: 'PR clippings report' }],
        inputs: 'Robotic surgical unit launch notes',
        outputs: 'Published press releases',
        handoff: { from: 'Campaign Launch', to: 'Completed Archive', notes: 'Delivered successfully.' }
      }
    ],
    documents: [
      {
        id: 'DOC-501',
        name: 'Orthopedic Campaign Case Study.pdf',
        type: 'PDF',
        fileExt: 'pdf',
        category: 'Case study',
        size: '3.4 MB',
        uploadedDate: '15 Sep 2026',
        taskRef: 'PR & Media Strategy',
        previewText: 'Campaign retrospective showing 340,000 views on surgeon spotlight videos and 85 joint consultation bookings.'
      }
    ]
  }
]

// Scheduled meetings with project associations
export const initialMeetings = [
  {
    id: 'MEET-001',
    title: 'Project Review Meeting',
    date: '30 Oct 2026',
    time: '3:00 PM - 4:00 PM',
    timeShort: '3:00 PM',
    day: 30,
    month: 9, // 0-indexed: October is 9
    year: 2026,
    isToday: true,
    projectId: 'PRJ-001',
    projectName: 'Cardiac Awareness Campaign',
    organizer: 'Aarya (Creative Lead)',
    description: 'Review final social media content plan, discuss clinical compliance feedback, and approve the November publishing schedule.',
    meetingLink: 'https://meet.google.com/sam-prj-review',
    attendees: ['Dr. R. Iyer (Medical Director)', 'Aarya (Creative Lead)', 'Tejas (Growth Strategist)']
  },
  {
    id: 'MEET-002',
    title: 'Campaign Planning Call',
    date: '02 Nov 2026',
    time: '11:00 AM - 11:45 AM',
    timeShort: '11:00 AM',
    day: 2,
    month: 10, // November
    year: 2026,
    isToday: false,
    projectId: 'PRJ-003',
    projectName: 'Maternity Services Campaign',
    organizer: 'Vikram (Growth Lead)',
    description: 'Walkthrough of ad spend allocation (₹1,20,000), audience radius targeting, and Google Search keyword bidding strategy.',
    meetingLink: 'https://meet.google.com/sam-mat-plan',
    attendees: ['Dr. R. Iyer', 'Vikram (Growth Lead)', 'Ananya Verma (Marketing)']
  },
  {
    id: 'MEET-003',
    title: 'Website Architecture Review',
    date: '05 Nov 2026',
    time: '4:00 PM - 4:45 PM',
    timeShort: '4:00 PM',
    day: 5,
    month: 10,
    year: 2026,
    isToday: false,
    projectId: 'PRJ-002',
    projectName: 'Diabetes Care Website',
    organizer: 'Tejas (SEO Lead)',
    description: 'Walkthrough of the staging homepage mockup and mobile appointment booking flow before final code release.',
    meetingLink: 'https://meet.google.com/sam-web-demo',
    attendees: ['Dr. R. Iyer', 'Tejas (SEO Lead)', 'Sutra (Tech Lead)']
  }
]

// Centralized notifications list
export const initialNotifications = [
  {
    id: 'NOTIF-001',
    title: 'New deliverable for review',
    body: 'Social media content draft is ready for your review.',
    timeAgo: '2 hours ago',
    timestamp: '2026-10-30T11:00:00Z',
    category: 'deliverable',
    categoryLabel: 'Deliverable',
    read: false,
    projectId: 'PRJ-001',
    projectName: 'Cardiac Awareness Campaign',
    actionText: 'Review Deliverable',
    actionLink: '/projects/PRJ-001'
  },
  {
    id: 'NOTIF-002',
    title: 'Project review meeting',
    body: 'Your project review meeting is scheduled for today at 3:00 PM.',
    timeAgo: '3 hours ago',
    timestamp: '2026-10-30T10:00:00Z',
    category: 'meeting',
    categoryLabel: 'Meeting',
    read: false,
    projectId: 'PRJ-001',
    projectName: 'Cardiac Awareness Campaign',
    actionText: 'Join Meeting',
    meetingLink: 'https://meet.google.com/sam-prj-review'
  },
  {
    id: 'NOTIF-003',
    title: 'Approval required',
    body: 'Ad creatives and monthly budget are ready for your approval.',
    timeAgo: '1 day ago',
    timestamp: '2026-10-29T14:30:00Z',
    category: 'approval',
    categoryLabel: 'Approval',
    read: false,
    projectId: 'PRJ-003',
    projectName: 'Maternity Services Campaign',
    actionText: 'Review & Approve',
    actionLink: '/projects/PRJ-003'
  },
  {
    id: 'NOTIF-004',
    title: 'Project milestone completed',
    body: 'Research and strategy document has been completed.',
    timeAgo: '2 days ago',
    timestamp: '2026-10-28T16:00:00Z',
    category: 'update',
    categoryLabel: 'Update',
    read: true,
    projectId: 'PRJ-001',
    projectName: 'Cardiac Awareness Campaign',
    actionText: 'View Milestone',
    actionLink: '/projects/PRJ-001'
  },
  {
    id: 'NOTIF-005',
    title: 'New message from team',
    body: 'Aarya has sent you a new message regarding homepage copy.',
    timeAgo: '2 days ago',
    timestamp: '2026-10-28T12:00:00Z',
    category: 'message',
    categoryLabel: 'Message',
    read: true,
    projectId: 'PRJ-002',
    projectName: 'Diabetes Care Website',
    actionText: 'Open Project',
    actionLink: '/projects/PRJ-002'
  },
  {
    id: 'NOTIF-006',
    title: 'Meeting reminder',
    body: 'Campaign planning call scheduled for 02 Nov at 11:00 AM.',
    timeAgo: '3 days ago',
    timestamp: '2026-10-27T11:00:00Z',
    category: 'meeting',
    categoryLabel: 'Meeting',
    read: true,
    projectId: 'PRJ-003',
    projectName: 'Maternity Services Campaign',
    actionText: 'Meeting Details',
    meetingLink: 'https://meet.google.com/sam-mat-plan'
  },
  {
    id: 'NOTIF-007',
    title: 'New performance report ready',
    body: 'September 2026 Monthly Performance Report is available for download.',
    timeAgo: '4 days ago',
    timestamp: '2026-10-26T09:30:00Z',
    category: 'deliverable',
    categoryLabel: 'Report',
    read: true,
    projectId: 'PRJ-004',
    projectName: 'Monthly Performance Report',
    actionText: 'View Report',
    actionLink: '/projects/PRJ-004'
  },
  {
    id: 'NOTIF-008',
    title: 'SEO architecture blueprint ready',
    body: 'Keyword and site map documents uploaded for review.',
    timeAgo: '5 days ago',
    timestamp: '2026-10-25T15:20:00Z',
    category: 'deliverable',
    categoryLabel: 'Deliverable',
    read: true,
    projectId: 'PRJ-002',
    projectName: 'Diabetes Care Website',
    actionText: 'Inspect Deliverables',
    actionLink: '/projects/PRJ-002'
  },
  {
    id: 'NOTIF-009',
    title: 'Project started',
    body: 'Diabetes Care landing page initiative officially kicked off.',
    timeAgo: '1 week ago',
    timestamp: '2026-10-23T10:00:00Z',
    category: 'update',
    categoryLabel: 'Update',
    read: true,
    projectId: 'PRJ-002',
    projectName: 'Diabetes Care Website',
    actionText: 'View Project',
    actionLink: '/projects/PRJ-002'
  },
  {
    id: 'NOTIF-010',
    title: 'Ad creative draft prepared',
    body: 'Meta ad creatives uploaded for internal clinical QA gate.',
    timeAgo: '1 week ago',
    timestamp: '2026-10-22T14:00:00Z',
    category: 'update',
    categoryLabel: 'Update',
    read: true,
    projectId: 'PRJ-003',
    projectName: 'Maternity Services Campaign',
    actionText: 'View Project',
    actionLink: '/projects/PRJ-003'
  },
  {
    id: 'NOTIF-011',
    title: 'Orthopedic campaign completed',
    body: 'Case study report delivered and archived successfully.',
    timeAgo: '2 weeks ago',
    timestamp: '2026-10-15T16:00:00Z',
    category: 'update',
    categoryLabel: 'Completed',
    read: true,
    projectId: 'PRJ-005',
    projectName: 'Orthopedic Care Brand Awareness',
    actionText: 'View Archive',
    actionLink: '/projects/PRJ-005'
  },
  {
    id: 'NOTIF-012',
    title: 'Account onboarding updated',
    body: 'Hospital brand assets, logo pack and tone guidelines validated.',
    timeAgo: '3 weeks ago',
    timestamp: '2026-10-08T11:00:00Z',
    category: 'account',
    categoryLabel: 'Account',
    read: true,
    projectId: null,
    projectName: 'Workspace Account',
    actionText: 'View Settings',
    actionLink: '/settings'
  }
]

// AI Assistant Question Responses (Home Page - Client-Wide)
export function getHomeAiResponse(question, projects = initialProjects, meetings = initialMeetings) {
  const q = question.toLowerCase()

  if (q.includes('status') || q.includes('campaign') || q.includes('ongoing')) {
    const ongoing = projects.filter((p) => p.statusKey === 'in_progress' || p.statusKey === 'approval')
    return {
      text: `You currently have ${ongoing.length} ongoing projects for City Care Hospital:`,
      bullets: ongoing.map((p) => `• ${p.name} is ${p.progress}% complete${p.waitingApproval ? ' and awaiting your approval' : ''}. Next step: ${p.nextMilestone}.`),
      footer: 'Would you like to review pending approvals or inspect a specific project?'
    }
  }

  if (q.includes('deadline') || q.includes('due') || q.includes('approaching')) {
    return {
      text: 'Here are the upcoming deadlines across your active projects:',
      bullets: [
        '• Cardiac Awareness Campaign: Content plan review due today, 30 Oct 2026.',
        '• Maternity Services Campaign: Ad creative approval due 28 Oct 2026 (awaiting your sign-off).',
        '• Diabetes Care Website: Homepage design review milestone scheduled for 04 Nov 2026.'
      ],
      footer: 'None of your projects have missed critical delivery milestones.'
    }
  }

  if (q.includes('approval') || q.includes('need') || q.includes('waiting') || q.includes('action')) {
    const pending = projects.filter((p) => p.waitingApproval)
    return {
      text: `You currently have ${pending.length} items awaiting your action:`,
      bullets: [
        '• Cardiac Awareness Campaign: Final content calendar and infographic creative need your sign-off.',
        '• Maternity Services Campaign: Monthly budget authorization (₹1,20,000) and ad creative approval.'
      ],
      footer: 'You can approve these directly from the respective project pages.'
    }
  }

  if (q.includes('meeting') || q.includes('call') || q.includes('schedule')) {
    return {
      text: `You have ${meetings.length} scheduled meetings with your Samrudhi team:`,
      bullets: meetings.map((m) => `• ${m.title} on ${m.date} at ${m.time} regarding ${m.projectName}.`),
      footer: 'Direct Google Meet join links are ready in your calendar widget.'
    }
  }

  if (q.includes('completed') || q.includes('this week') || q.includes('work completed')) {
    return {
      text: 'Summary of work delivered this week for City Care Hospital:',
      bullets: [
        '• Completed audience analysis and strategy document for Cardiac Awareness Campaign.',
        '• Finalized 142-keyword SEO map and page architecture for Diabetes Care Website.',
        '• Produced ad creative set and copy options for Maternity Services Campaign.',
        '• Reconciled all patient inquiries and traffic metrics for September Performance Report.'
      ],
      footer: 'All deliverables are archived in their respective project documents folders.'
    }
  }

  if (q.includes('deliverable') || q.includes('download') || q.includes('file')) {
    return {
      text: 'Your workspace has 13 active documents and deliverables across your projects:',
      bullets: [
        '• Campaign Strategy.pdf (Cardiac Awareness)',
        '• Social Media Calendar.xlsx (Cardiac Awareness)',
        '• Website IA Blueprint.pdf (Diabetes Care)',
        '• Maternity Campaign Plan & Budget.pdf (Maternity Services)',
        '• September 2026 Performance Report.pdf (Analytics)'
      ],
      footer: 'Open any project to download or preview the files.'
    }
  }

  // Default answer
  return {
    text: `City Care Hospital has ${projects.length} registered projects in the Samrudhi workspace.`,
    bullets: [
      `• ${projects.filter((p) => p.statusKey === 'in_progress' || p.statusKey === 'approval').length} ongoing initiatives`,
      `• ${projects.filter((p) => p.waitingApproval).length} decisions waiting for your review`,
      `• ${meetings.length} upcoming sync meetings scheduled`,
      '• 100% data isolation active — all operations strictly scoped to your hospital'
    ],
    footer: 'Feel free to ask about project progress, upcoming meetings, or specific deliverables!'
  }
}

// AI Assistant Question Responses (Project-Specific Isolated Assistant)
export function getProjectAiResponse(projectId, question, project) {
  const q = question.toLowerCase()

  if (projectId === 'PRJ-003') {
    if (q.includes('completed') || q.includes('so far') || q.includes('progress')) {
      return 'So far, Arjun (CEO) initiated the strategic brief, Vikram (Sales) completed market analysis, Tejas (Marketing Strategy) defined media channels, Aarya (Creative) produced 6 ad banner sets, and Lakshman (Content) completed ad copy storyboarding. Mitra staged the ad sets in Meta Ads Manager. The project is at 70% progress, awaiting your approval for Niti\\'s budget plan.'
    }
    if (q.includes('sales') || q.includes('vikram')) {
      return 'Vikram (SAL-001, Sales & Growth Agent) analyzed the Hyderabad regional healthcare market and defined high-intent expecting parent clusters within a 15km radius of Banjara Hills. Output produced: Market Analysis & Audience Profile.pdf.'
    }
    if (q.includes('creative') || q.includes('aarya')) {
      return 'Aarya (CRT-001, Creative Agent) designed 6 high-resolution carousel ad slides and 2 Instagram Story video covers showcasing City Care\\'s private maternity birthing suites. Output delivered: Meta Ad Creatives Set.zip (8.4 MB).'
    }
    if (q.includes('approval') || q.includes('budget') || q.includes('niti')) {
      return 'Node 07 (Niti · Finance Agent) is waiting for your authorization on the proposed monthly spend of ₹1,20,000 (₹70,000 Meta / ₹50,000 Google Search). Once you approve, the workflow unblocks Medha and Automated Deployment.'
    }
    if (q.includes('next') || q.includes('workflow')) {
      return 'The next agent in line is Medha (DAT-001 · Analytics Agent) for live tracking setup, followed by Satya (GOV-001) for compliance verification and Automated Campaign Launch.'
    }
    if (q.includes('deliverable') || q.includes('file')) {
      return 'Key deliverables in Maternity Services: Campaign Budget Plan.pdf (2.1 MB), Meta Ad Creatives Set.zip (8.4 MB), Ad Copy Variations Matrix.docx (850 KB), and Market Analysis & Audience Profile.pdf (2.8 MB).'
    }
    return 'In Maternity Services Campaign, 5 agent stages are completed, Mitra is staging campaigns in Meta, and Niti is awaiting your budget review approval. You can approve directly from the Project Tracker roadmap.'
  }

  if (projectId === 'PRJ-001') {
    if (q.includes('completed') || q.includes('so far') || q.includes('progress')) {
      return 'So far, the research and strategy phase is complete, and content creation is in progress. Social media posts and infographics are being prepared. The next step is to review the ad creatives, which will be ready by 30 Oct 2026.'
    }
    if (q.includes('status')) {
      return 'Cardiac Awareness Campaign is at 70% progress. The strategy document and content calendar are finished. We are currently waiting for your review on the final content plan so we can begin campaign setup.'
    }
    if (q.includes('deliverable') || q.includes('file') || q.includes('document')) {
      return 'Documents available for this project include: Campaign Strategy.pdf (2.4 MB), Social Media Calendar.xlsx (1.1 MB), Infographic - Heart Health.png (3.2 MB), Awareness Video.mp4 (12.8 MB), and Audience Research Report.pdf (4.1 MB).'
    }
    if (q.includes('next') || q.includes('milestone')) {
      return 'The next milestone is "Approve final content plan" scheduled for 30 Oct 2026. Following your approval, Tejas will begin campaign targeting and scheduling in Meta Ads Manager.'
    }
    if (q.includes('meeting')) {
      return 'You have a Project Review Meeting scheduled for today at 3:00 PM with Aarya and Tejas to review the final content plan.'
    }
    return `In Cardiac Awareness Campaign, Tejas has completed research, Aarya is finalizing creative posts, and Lakshman has drafted the heart health infographics. Overall completion is 70%.`
  }

  if (projectId === 'PRJ-002') {
    if (q.includes('completed') || q.includes('so far') || q.includes('progress')) {
      return 'For the Diabetes Care Website, keyword research and competitor gap analysis are 100% complete. Wireframes and information architecture are approved. Sutra is currently coding the responsive homepage prototype.'
    }
    if (q.includes('status')) {
      return 'Diabetes Care Website is 45% complete and proceeding on schedule. The homepage preview will be ready for your review on 04 Nov 2026.'
    }
    if (q.includes('deliverable') || q.includes('file')) {
      return 'Available files for this project: Website IA Blueprint.pdf (3.8 MB), Keyword Research & Gap Analysis.xlsx (1.4 MB), and Homepage Mockup v2.png (4.5 MB).'
    }
    return 'The Diabetes Care Website is focusing on local SEO for Hyderabad patient queries and mobile appointment booking. Current progress is 45%.'
  }

  if (projectId === 'PRJ-004') {
    return 'Monthly Performance Report for September 2026 is 100% completed and delivered. Key highlights: 2.1M total reach (+8%), 48,200 website visits (+12%), and 312 new patient consultation inquiries.'
  }

  if (projectId === 'PRJ-005') {
    return 'Orthopedic Care Brand Awareness campaign is 100% completed. The surgeon spotlight interviews and press release coverage resulted in 340,000 views and 85 joint consultation inquiries.'
  }

  return `This AI assistant is specifically dedicated to ${project?.name || 'this project'}. Work is monitored by your Samrudhi delivery team.`
}

// Demo accounts for Client Portal
export const clientDemoAccounts = [
  { name: 'R. Iyer', role: 'Medical Director / Administrator', email: 'riyer@citycarehospital.com', password: 'demo1234' },
  { name: 'Dr. Ramesh Iyer', role: 'Medical Director', email: 'riyer@citycare.in', password: 'demo1234' },
  { name: 'Ananya Verma', role: 'Marketing Lead', email: 'averma@citycare.in', password: 'demo1234' }
]

// Backwards-compatible aliases
export const projects = initialProjects
export const meetings = initialMeetings
export const clientNotifications = initialNotifications
"""

with open('client/src/data/clientData.js', 'w', encoding='utf-8') as f:
    f.write(client_data_content)
print("Updated clientData.js with rich roadmaps successfully.")
