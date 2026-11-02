// Centralized Department & Position Workflow Data (PRD Sections 2.1, 5, 6, 9)
import { departments } from './departments'
import { positions } from './positions'

// Authority level display mapping (Requirement 4)
export const authorityLevelMap = {
  A: {
    level: 'Level 1',
    label: 'Level 1 — Read / Analyse',
    short: 'Read / Analyse',
    desc: 'Can inspect assigned information and produce analysis. Cannot directly make changes to external systems.',
    color: 'sky'
  },
  B: {
    level: 'Level 2',
    label: 'Level 2 — Draft / Recommend',
    short: 'Draft / Recommend',
    desc: 'Can prepare drafts, proposals, and recommendations for review. Cannot independently execute restricted external actions. Requires approval before external execution.',
    color: 'indigo'
  },
  C: {
    level: 'Level 3',
    label: 'Level 3 — Internal Action',
    short: 'Internal Action',
    desc: 'Can perform permitted internal tasks and update authorized internal workflow records within its assigned permissions.',
    color: 'teal'
  },
  D: {
    level: 'Level 4',
    label: 'Level 4 — External Side Effect',
    short: 'External Side Effect',
    desc: 'Can initiate or perform actions that affect external systems or people, only when the required permissions, approvals, and policy checks are satisfied.',
    color: 'amber'
  },
  E: {
    level: 'Level 5',
    label: 'Level 5 — Reserved Human Decision',
    short: 'Reserved Human Decision',
    desc: 'Legal signature, clinical sign-off, major commercial commitment or actual payment. AI agents can only prepare recommendations.',
    color: 'rose'
  }
}

export function getAuthorityDisplay(authCode) {
  return authorityLevelMap[authCode] || {
    level: 'Level 1',
    label: 'Level 1 — Read / Analyse',
    short: 'Read / Analyse',
    desc: 'Can inspect assigned information and produce analysis.',
    color: 'slate'
  }
}

// 11 Departments enriched metrics (Requirement 1 & 2)
// Exactly 8 departments have active projects, 3 are Idle/Governance/Platform.
// 8 / 11 = 72.7% Department Activity.
export const departmentMetrics = {
  CEO: {
    activeProjects: 3,
    activeAgents: 5,
    waitingReview: 1,
    status: 'Active',
    activePositions: 4,
    waitingReviewPositions: 1,
    inactivePositions: 1,
    description: 'Strategy, governance, KPI oversight and enterprise decisions.',
    responsibilities: [
      'Enterprise KPI oversight and executive scorecards',
      'Strategic roadmap and milestone coordination',
      'Decision and operational risk register management',
      'Board readiness and stakeholder reporting'
    ],
    authorityScope: 'The CEO Office coordinates execution of human-approved enterprise strategy. Material decisions remain reserved for human leadership.',
    projects: [
      {
        id: 'PRJ-CEO-001',
        name: 'Enterprise Q4 OKR Alignment',
        client: 'Internal Enterprise',
        deadline: '2026-11-15',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'High',
        departmentRole: 'Strategic alignment & KPI scoring',
        description: 'Tracking quarterly milestone attainment across delivery and growth units.',
        currentStage: 'Stage 6 · Planning',
        nextAction: 'Executive committee briefing'
      },
      {
        id: 'PRJ-CEO-002',
        name: 'Healthcare Compliance Risk Audit',
        client: 'City Care Hospital',
        deadline: '2026-11-20',
        status: 'In Review',
        statusTone: 'amber',
        priority: 'Medium',
        departmentRole: 'Risk register oversight',
        description: 'Periodic review of cross-tenant clinical claims escalation log.',
        currentStage: 'Stage 9 · QA / assurance',
        nextAction: 'Governance sign-off'
      },
      {
        id: 'PRJ-CEO-003',
        name: 'Growth & Expansion Roadmap',
        client: 'Samrudhi Platform',
        deadline: '2026-12-05',
        status: 'Planning',
        statusTone: 'slate',
        priority: 'Low',
        departmentRole: 'Capacity planning',
        description: 'Digital workforce scaling projections for 2027.',
        currentStage: 'Stage 6 · Planning',
        nextAction: 'Resource model draft'
      }
    ]
  },
  SAL: {
    activeProjects: 5,
    activeAgents: 9,
    waitingReview: 2,
    status: 'Active',
    activePositions: 11,
    waitingReviewPositions: 1,
    inactivePositions: 1,
    description: 'Research, outreach, proposals and commercial growth.',
    responsibilities: [
      'Prospect research and lead qualification',
      'Outreach coordination and commercial discovery',
      'Proposal, scope and contract preparation',
      'Approved scope handover to delivery'
    ],
    authorityScope: 'SBD prepares commercial records. Contracts and pricing commitments remain strictly human-authorised.',
    projects: [
      {
        id: 'PRJ-SAL-001',
        name: 'Lotus Eye Hospital Partnership Scope',
        client: 'Lotus Eye & Ear Hospital',
        deadline: '2026-11-04',
        status: 'In Review',
        statusTone: 'amber',
        priority: 'High',
        departmentRole: 'Proposal & scope negotiation',
        description: 'Commercial proposal for multi-channel digital presence and local patient acquisition.',
        currentStage: 'Stage 3 · Proposal / contract',
        nextAction: 'Commercial review call'
      },
      {
        id: 'PRJ-SAL-002',
        name: 'GreenLeaf Pharmacy Expansion Scope',
        client: 'GreenLeaf Pharmacy Chain',
        deadline: '2026-11-12',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'Medium',
        departmentRole: 'Discovery & pricing',
        description: 'Outbound engagement to onboard 18 retail pharmacy branches.',
        currentStage: 'Stage 2 · Sales discovery',
        nextAction: 'Finalize pricing sheet'
      },
      {
        id: 'PRJ-SAL-003',
        name: 'Bhagya Fertility Growth Proposal',
        client: 'Bhagya Fertility Clinic',
        deadline: '2026-11-18',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'Medium',
        departmentRole: 'Scope definition',
        description: 'Tailored lead qualification and IVF awareness scope.',
        currentStage: 'Stage 3 · Proposal / contract',
        nextAction: 'Send revised contract checklist'
      },
      {
        id: 'PRJ-SAL-004',
        name: 'Vitalis Heart Centre Commercial Pitch',
        client: 'Vitalis Cardiac Centre',
        deadline: '2026-11-25',
        status: 'Planning',
        statusTone: 'slate',
        priority: 'Low',
        departmentRole: 'Proposal preparation',
        description: 'Executive pitch deck for state-wide cardiology outreach.',
        currentStage: 'Stage 2 · Sales discovery',
        nextAction: 'Discovery call scheduling'
      },
      {
        id: 'PRJ-SAL-005',
        name: 'CarePoint Home Nursing RFP',
        client: 'CarePoint Home Nursing',
        deadline: '2026-12-02',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'Medium',
        departmentRole: 'RFP submission',
        description: 'Tender response for municipal home care awareness campaign.',
        currentStage: 'Stage 3 · Proposal',
        nextAction: 'Submit RFP package'
      }
    ]
  },
  SBD: {
    activeProjects: 5,
    activeAgents: 9,
    waitingReview: 2,
    status: 'Active',
    activePositions: 11,
    waitingReviewPositions: 1,
    inactivePositions: 1,
    description: 'Research, outreach, proposals and commercial growth.',
    responsibilities: [
      'Prospect research and lead qualification',
      'Outreach coordination and commercial discovery',
      'Proposal, scope and contract preparation',
      'Approved scope handover to delivery'
    ],
    authorityScope: 'SBD prepares commercial records. Contracts and pricing commitments remain strictly human-authorised.',
    projects: [
      {
        id: 'PRJ-SBD-001',
        name: 'Lotus Eye Hospital Partnership Scope',
        client: 'Lotus Eye & Ear Hospital',
        deadline: '2026-11-04',
        status: 'In Review',
        statusTone: 'amber',
        priority: 'High',
        departmentRole: 'Proposal & scope negotiation',
        description: 'Commercial proposal for multi-channel digital presence and local patient acquisition.',
        currentStage: 'Stage 3 · Proposal / contract',
        nextAction: 'Commercial review call'
      },
      {
        id: 'PRJ-SBD-002',
        name: 'GreenLeaf Pharmacy Expansion Scope',
        client: 'GreenLeaf Pharmacy Chain',
        deadline: '2026-11-12',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'Medium',
        departmentRole: 'Discovery & pricing',
        description: 'Outbound engagement to onboard 18 retail pharmacy branches.',
        currentStage: 'Stage 2 · Sales discovery',
        nextAction: 'Finalize pricing sheet'
      },
      {
        id: 'PRJ-SBD-003',
        name: 'Bhagya Fertility Growth Proposal',
        client: 'Bhagya Fertility Clinic',
        deadline: '2026-11-18',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'Medium',
        departmentRole: 'Scope definition',
        description: 'Tailored lead qualification and IVF awareness scope.',
        currentStage: 'Stage 3 · Proposal / contract',
        nextAction: 'Send revised contract checklist'
      },
      {
        id: 'PRJ-SBD-004',
        name: 'Vitalis Heart Centre Commercial Pitch',
        client: 'Vitalis Cardiac Centre',
        deadline: '2026-11-25',
        status: 'Planning',
        statusTone: 'slate',
        priority: 'Low',
        departmentRole: 'Proposal preparation',
        description: 'Executive pitch deck for state-wide cardiology outreach.',
        currentStage: 'Stage 2 · Sales discovery',
        nextAction: 'Discovery call scheduling'
      },
      {
        id: 'PRJ-SBD-005',
        name: 'CarePoint Home Nursing RFP',
        client: 'CarePoint Home Nursing',
        deadline: '2026-12-02',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'Medium',
        departmentRole: 'RFP submission',
        description: 'Tender response for municipal home care awareness campaign.',
        currentStage: 'Stage 3 · Proposal',
        nextAction: 'Submit RFP package'
      }
    ]
  },
  MKT: {
    activeProjects: 4,
    activeAgents: 12,
    waitingReview: 3,
    status: 'Active',
    activePositions: 13,
    waitingReviewPositions: 2,
    inactivePositions: 1,
    description: 'Brand positioning, content, website, campaigns and partnerships.',
    responsibilities: [
      'Brand positioning and messaging',
      'Campaign planning and execution',
      'Content creation across channels',
      'Website and SEO management',
      'Partnerships and community engagement'
    ],
    authorityScope: 'This department coordinates brand and marketing activities. Execution is carried out through defined positions with appropriate authority levels.',
    projects: [
      {
        id: 'PRJ-2026-001',
        name: 'Cardiac Awareness Campaign',
        client: 'City Care Hospital',
        deadline: '2026-10-30',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'High',
        departmentRole: 'Campaign content & social media',
        description: 'Multi-post educational carousel on early hypertension detection and cardiac emergency protocols.',
        currentStage: 'Stage 10 · Client review',
        nextAction: 'Client sign-off'
      },
      {
        id: 'PRJ-2026-002',
        name: 'Maternity Service Promotion',
        client: 'Nirvaan Wellness',
        deadline: '2026-11-02',
        status: 'In Review',
        statusTone: 'amber',
        priority: 'Medium',
        departmentRole: 'Creative assets & content',
        description: 'Targeted Meta and Google ad variants focusing on personalized prenatal care packages.',
        currentStage: 'Stage 10 · Client review',
        nextAction: 'Creative revision pass'
      },
      {
        id: 'PRJ-2026-005',
        name: 'Dental Care Awareness',
        client: 'Sunrise Dental Studio',
        deadline: '2026-11-10',
        status: 'Research',
        statusTone: 'slate',
        priority: 'Medium',
        departmentRole: 'Content planning & design',
        description: 'Short-form reel scripts and educational infographic on modern orthodontic aligners.',
        currentStage: 'Stage 7 · Research / strategy',
        nextAction: 'Script draft review'
      },
      {
        id: 'PRJ-2026-007',
        name: 'Ayurveda Brand Relaunch',
        client: 'Arogya Centre',
        deadline: '2026-11-18',
        status: 'Planning',
        statusTone: 'purple',
        priority: 'Low',
        departmentRole: 'Brand strategy & content',
        description: 'Herbal immunity winter regimen campaign with email newsletters and doctor Q&A reels.',
        currentStage: 'Stage 6 · Planning',
        nextAction: 'Editorial calendar draft'
      }
    ]
  },
  CEX: {
    activeProjects: 6,
    activeAgents: 11,
    waitingReview: 2,
    status: 'Active',
    activePositions: 13,
    waitingReviewPositions: 2,
    inactivePositions: 1,
    description: 'Client onboarding, approvals, support, renewal and expansion.',
    responsibilities: [
      'Client workspace onboarding and isolation',
      'Client communication and approval routing',
      'Health score monitoring and risk intervention',
      'Review gates and contract renewals'
    ],
    authorityScope: 'CEX coordinates client communication and approvals. A status update from CEX is never approval to publish or modify approved scope.',
    projects: [
      {
        id: 'PRJ-CEX-001',
        name: 'Sunrise Dental Onboarding',
        client: 'Sunrise Dental Studio',
        deadline: '2026-11-05',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'High',
        departmentRole: 'Workspace & asset intake',
        description: 'Collecting brand assets, doctor profiles and approved healthcare claims.',
        currentStage: 'Stage 4 · Onboarding',
        nextAction: 'Intake checklist validation'
      },
      {
        id: 'PRJ-CEX-002',
        name: 'MediScan Renewal Health Plan',
        client: 'MediScan Diagnostics',
        deadline: '2026-11-08',
        status: 'In Review',
        statusTone: 'amber',
        priority: 'High',
        departmentRole: 'Account recovery',
        description: 'Intervention plan following two consecutive approval delays.',
        currentStage: 'Stage 10 · Client review',
        nextAction: 'Stakeholder sync'
      },
      {
        id: 'PRJ-CEX-003',
        name: 'City Care Monthly Review Gate',
        client: 'City Care Hospital',
        deadline: '2026-11-12',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'Medium',
        departmentRole: 'Approval gate coordination',
        description: 'Routing November publishing calendar for medical superintendent sign-off.',
        currentStage: 'Stage 10 · Client review',
        nextAction: 'Publish gate clearance'
      },
      {
        id: 'PRJ-CEX-004',
        name: 'Nirvaan Wellness CSAT Review',
        client: 'Nirvaan Wellness Clinic',
        deadline: '2026-11-20',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'Medium',
        departmentRole: 'Account governance',
        description: 'Quarterly review of client satisfaction and feedback intake.',
        currentStage: 'Stage 12 · Reporting',
        nextAction: 'Compile CSAT deck'
      },
      {
        id: 'PRJ-CEX-005',
        name: 'Apex Children Hospital Onboarding',
        client: 'Apex Children Hospital',
        deadline: '2026-11-28',
        status: 'Planning',
        statusTone: 'slate',
        priority: 'Low',
        departmentRole: 'Workspace provisioning',
        description: 'Initial tenant workspace setup and user credentials provisioning.',
        currentStage: 'Stage 4 · Onboarding',
        nextAction: 'Send welcome brief'
      },
      {
        id: 'PRJ-CEX-006',
        name: 'Prana Yoga Expansion Intake',
        client: 'Prana Yoga & Rehab',
        deadline: '2026-12-05',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'Low',
        departmentRole: 'Scope addendum intake',
        description: 'Adding specialized physiotherapy reels to client service bundle.',
        currentStage: 'Stage 5 · Brief',
        nextAction: 'Brief structuring'
      }
    ]
  },
  OPS: {
    activeProjects: 8,
    activeAgents: 12,
    waitingReview: 4,
    status: 'Active',
    activePositions: 14,
    waitingReviewPositions: 3,
    inactivePositions: 1,
    description: 'Delivery planning, task orchestration and quality control.',
    responsibilities: [
      'Delivery planning and task graph creation',
      'Capacity allocation and workload balance',
      'Dependency tracking and blocker resolution',
      'Operating stage handoffs and acceptance checks'
    ],
    authorityScope: 'OPS coordinates workflow execution across the 14-stage operating model. TEC manages runtime infrastructure; CRT/PMG produce deliverables.',
    projects: [
      {
        id: 'PRJ-2026-001',
        name: 'Cardiac Awareness Campaign',
        client: 'City Care Hospital',
        deadline: '2026-10-30',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'High',
        departmentRole: 'Task graph orchestration',
        description: 'Delivery tracking from research through copy, visual, QA to publish gate.',
        currentStage: 'Stage 10 · Client review',
        nextAction: 'Coordinate review handoff'
      },
      {
        id: 'PRJ-2026-002',
        name: 'Maternity Service Promotion',
        client: 'Nirvaan Wellness',
        deadline: '2026-11-02',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'Medium',
        departmentRole: 'Timeline & gate management',
        description: 'Synchronizing ad copy and creative assets with budget authorization gate.',
        currentStage: 'Stage 9 · QA / assurance',
        nextAction: 'QA clearance check'
      },
      {
        id: 'PRJ-2026-003',
        name: 'Diabetes Education Series',
        client: 'MediScan Diagnostics',
        deadline: '2026-11-03',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'Medium',
        departmentRole: 'Production schedule control',
        description: 'Managing handoff between medical writer and visual infographic artist.',
        currentStage: 'Stage 8 · Production',
        nextAction: 'Infographic delivery check'
      },
      {
        id: 'PRJ-2026-004',
        name: 'Festival Health Package Ads',
        client: 'Arogya Ayurveda Centre',
        deadline: '2026-11-07',
        status: 'Planning',
        statusTone: 'slate',
        priority: 'Low',
        departmentRole: 'Task graph initialization',
        description: 'Breaking down campaign brief into 14 parallel and sequential tasks.',
        currentStage: 'Stage 6 · Planning',
        nextAction: 'Publish task schedule'
      },
      {
        id: 'PRJ-2026-005',
        name: 'Dental Care Awareness',
        client: 'Sunrise Dental Studio',
        deadline: '2026-11-10',
        status: 'Research',
        statusTone: 'slate',
        priority: 'Low',
        departmentRole: 'Milestone tracking',
        description: 'Ensuring orthodontic research sources meet clinic guidelines.',
        currentStage: 'Stage 7 · Research',
        nextAction: 'Approve research handoff'
      },
      {
        id: 'PRJ-OPS-006',
        name: 'Meta Ads Post-Publish Monitor',
        client: 'Nirvaan Wellness',
        deadline: '2026-11-14',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'Medium',
        departmentRole: 'Stage 11 activation audit',
        description: 'Post-publish delivery verification across Meta Graph API endpoints.',
        currentStage: 'Stage 11 · Publish / activate',
        nextAction: 'Verify pixel firing'
      },
      {
        id: 'PRJ-OPS-007',
        name: 'Diwali Health Tips Content Pack',
        client: 'City Care Hospital',
        deadline: '2026-11-16',
        status: 'Blocked',
        statusTone: 'rose',
        priority: 'High',
        departmentRole: 'Blocker escalation',
        description: 'QA escalation resolution for 2 clinical claims needing independent review.',
        currentStage: 'Stage 9 · QA / assurance',
        nextAction: 'Await GOV-008 ruling'
      },
      {
        id: 'PRJ-OPS-008',
        name: 'Quarterly Business Review Q3',
        client: 'City Care Hospital',
        deadline: '2026-11-22',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'Medium',
        departmentRole: 'Deliverable collation',
        description: 'Collation of Q3 analytics, patient acquisition and ROAS records.',
        currentStage: 'Stage 12 · Reporting',
        nextAction: 'Finalize draft deck'
      }
    ]
  },
  CRT: {
    activeProjects: 7,
    activeAgents: 15,
    waitingReview: 3,
    status: 'Active',
    activePositions: 14,
    waitingReviewPositions: 5,
    inactivePositions: 3,
    description: 'Content, design, video production and social media execution.',
    responsibilities: [
      'Healthcare copy and medical claims drafting',
      'Visual asset creation, typography and brand alignment',
      'Short-form and educational video production',
      'Social media packaging and localized language variants'
    ],
    authorityScope: 'CRT creates content and design assets. GOV independently screens claims for compliance. Publishing requires Level 4 authorization.',
    projects: [
      {
        id: 'PRJ-2026-001',
        name: 'Cardiac Awareness Campaign',
        client: 'City Care Hospital',
        deadline: '2026-10-30',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'High',
        departmentRole: 'Copywriting & creative assets',
        description: 'Instagram carousel and educational infographics on heart disease risk factors.',
        currentStage: 'Stage 10 · Client review',
        nextAction: 'Client sign-off'
      },
      {
        id: 'PRJ-2026-002',
        name: 'Maternity Service Promotion',
        client: 'Nirvaan Wellness',
        deadline: '2026-11-02',
        status: 'In Review',
        statusTone: 'amber',
        priority: 'Medium',
        departmentRole: 'Creative revision',
        description: 'Ad variants redesign following client feedback on background warmth.',
        currentStage: 'Stage 10 · Client review',
        nextAction: 'Deliver revision'
      },
      {
        id: 'PRJ-2026-003',
        name: 'Diabetes Education Series',
        client: 'MediScan Diagnostics',
        deadline: '2026-11-03',
        status: 'In Production',
        statusTone: 'purple',
        priority: 'Medium',
        departmentRole: 'Blog & visual design',
        description: 'Long-form patient guide on diabetes management and blood glucose monitoring.',
        currentStage: 'Stage 8 · Production',
        nextAction: 'Finalize infographic #2'
      },
      {
        id: 'PRJ-CRT-004',
        name: 'Physiotherapy Video Series (Ep 1-3)',
        client: 'Nirvaan Wellness',
        deadline: '2026-11-08',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'Medium',
        departmentRole: 'Video scripting & motion graphics',
        description: 'Three 60-second animated reels illustrating lower back pain exercises.',
        currentStage: 'Stage 8 · Production',
        nextAction: 'Audio track sync'
      },
      {
        id: 'PRJ-2026-005',
        name: 'Dental Care Awareness',
        client: 'Sunrise Dental Studio',
        deadline: '2026-11-10',
        status: 'Research',
        statusTone: 'slate',
        priority: 'Low',
        departmentRole: 'Script drafting',
        description: 'Introductory reel concepts on invisible aligners and pediatric dental care.',
        currentStage: 'Stage 7 · Research',
        nextAction: 'Initial draft delivery'
      },
      {
        id: 'PRJ-2026-007',
        name: 'Ayurveda Winter Wellness Drive',
        client: 'Arogya Centre',
        deadline: '2026-11-25',
        status: 'In Production',
        statusTone: 'purple',
        priority: 'Medium',
        departmentRole: 'Visual branding',
        description: 'Seasonal herb illustration set and warm herbal tea recipe carousel.',
        currentStage: 'Stage 8 · Production',
        nextAction: 'Review vector assets'
      },
      {
        id: 'PRJ-CRT-007',
        name: 'Pediatric Care Awareness',
        client: 'Apex Children Hospital',
        deadline: '2026-12-01',
        status: 'Planning',
        statusTone: 'slate',
        priority: 'Low',
        departmentRole: 'Content roadmap',
        description: 'Childhood vaccination calendar and nutrition guidelines infographic.',
        currentStage: 'Stage 6 · Planning',
        nextAction: 'Draft outline'
      }
    ]
  },
  PMG: {
    activeProjects: 6,
    activeAgents: 13,
    waitingReview: 2,
    status: 'Active',
    activePositions: 15,
    waitingReviewPositions: 3,
    inactivePositions: 2,
    description: 'Deliver client paid media, SEO, conversion optimisation and ad spend monitoring.',
    responsibilities: [
      'Meta and Google ad campaigns setup and bid management',
      'Healthcare advertising policy compliance',
      'Local SEO and Google Business profile optimization',
      'Conversion rate optimization and landing page audits'
    ],
    authorityScope: 'Budget cap changes beyond pre-approved client thresholds require Class E human sign-off. Daily spend monitoring is continuous.',
    projects: [
      {
        id: 'PRJ-PMG-001',
        name: 'Maternity Ad Spend Campaign',
        client: 'City Care Hospital',
        deadline: '2026-10-31',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'High',
        departmentRole: 'Paid media management',
        description: 'Optimizing Meta Ads delivery across Hyderabad metropolitan radius.',
        currentStage: 'Stage 11 · Publish / activate',
        nextAction: 'Bid optimization'
      },
      {
        id: 'PRJ-PMG-002',
        name: 'Physiotherapy Booking Meta Ads',
        client: 'Nirvaan Wellness',
        deadline: '2026-11-04',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'Medium',
        departmentRole: 'Performance marketing',
        description: 'Targeted lead generation ads driving direct WhatsApp consult bookings.',
        currentStage: 'Stage 11 · Publish / activate',
        nextAction: 'Weekly CPA audit'
      },
      {
        id: 'PRJ-PMG-003',
        name: 'Diabetes Care Technical SEO Audit',
        client: 'City Care Hospital',
        deadline: '2026-11-06',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'Medium',
        departmentRole: 'SEO & landing page',
        description: 'Core Web Vitals and schema markup implementation on diabetes service page.',
        currentStage: 'Stage 8 · Production',
        nextAction: 'Schema validation'
      },
      {
        id: 'PRJ-PMG-004',
        name: 'Sunrise Dental Local SEO Setup',
        client: 'Sunrise Dental Studio',
        deadline: '2026-11-12',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'Medium',
        departmentRole: 'Local maps & search',
        description: 'Google Maps citation building and local healthcare directory sync.',
        currentStage: 'Stage 8 · Production',
        nextAction: 'NAP consistency check'
      },
      {
        id: 'PRJ-PMG-005',
        name: 'Ayurveda Seasonal Search Ads',
        client: 'Arogya Centre',
        deadline: '2026-11-20',
        status: 'Planning',
        statusTone: 'slate',
        priority: 'Low',
        departmentRole: 'Keyword planning',
        description: 'High-intent search keyword bidding on Panchakarma treatments.',
        currentStage: 'Stage 7 · Research',
        nextAction: 'Negative keyword review'
      },
      {
        id: 'PRJ-PMG-006',
        name: 'Telemedicine App Install Ads',
        client: 'Nirvaan Wellness',
        deadline: '2026-12-10',
        status: 'Planning',
        statusTone: 'slate',
        priority: 'Low',
        departmentRole: 'App campaign setup',
        description: 'Google App Campaign configuration targeting urban healthcare seekers.',
        currentStage: 'Stage 6 · Planning',
        nextAction: 'Deep link verification'
      }
    ]
  },
  DAT: {
    activeProjects: 5,
    activeAgents: 10,
    waitingReview: 2,
    status: 'Active',
    activePositions: 13,
    waitingReviewPositions: 4,
    inactivePositions: 2,
    description: 'Integrate, validate and reconcile data; govern KPIs; produce dashboards.',
    responsibilities: [
      'Multi-source data ingestion and reconciliation',
      'KPI governance and metric lineage documentation',
      'Client monthly performance dashboards and reports',
      'Conversion attribution modeling and anomaly detection'
    ],
    authorityScope: 'DAT owns shared data pipelines and KPI governance. Other departments cannot independently redefine governed metric formulas.',
    projects: [
      {
        id: 'PRJ-DAT-001',
        name: 'City Care Monthly Report — October',
        client: 'City Care Hospital',
        deadline: '2026-11-03',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'High',
        departmentRole: 'Analytics & reporting',
        description: 'Multi-channel patient acquisition report reconciling Meta Ads and hospital OPD registrations.',
        currentStage: 'Stage 12 · Reporting',
        nextAction: 'Data reconciliation'
      },
      {
        id: 'PRJ-DAT-002',
        name: 'Nirvaan Wellness ROAS Attribution Model',
        client: 'Nirvaan Wellness',
        deadline: '2026-11-06',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'Medium',
        departmentRole: 'Attribution modeling',
        description: 'Multi-touch attribution analyzing first-touch reel views through consultation bookings.',
        currentStage: 'Stage 12 · Reporting',
        nextAction: 'Run attribution script'
      },
      {
        id: 'PRJ-DAT-003',
        name: 'MediScan Diagnostic Drop-off Anomaly Signal',
        client: 'MediScan Diagnostics',
        deadline: '2026-11-09',
        status: 'In Review',
        statusTone: 'amber',
        priority: 'High',
        departmentRole: 'Anomaly detection',
        description: 'Investigating 34% drop-off between landing page views and test booking submissions.',
        currentStage: 'Stage 12 · Reporting',
        nextAction: 'Publish finding report'
      },
      {
        id: 'PRJ-DAT-004',
        name: 'Arogya Ayurveda Web Traffic Analytics',
        client: 'Arogya Centre',
        deadline: '2026-11-15',
        status: 'In Progress',
        statusTone: 'blue',
        priority: 'Low',
        departmentRole: 'Traffic audit',
        description: 'Organic blog traffic analysis and referral source segmentation.',
        currentStage: 'Stage 12 · Reporting',
        nextAction: 'Export GA4 summary'
      },
      {
        id: 'PRJ-DAT-005',
        name: 'Enterprise Platform Metric Lineage',
        client: 'Samrudhi Platform',
        deadline: '2026-11-28',
        status: 'Planning',
        statusTone: 'slate',
        priority: 'Low',
        departmentRole: 'KPI governance',
        description: 'Updating data dictionary for cross-tenant cost-per-acquisition definitions.',
        currentStage: 'Stage 14 · Improve',
        nextAction: 'Draft schema update'
      }
    ]
  },
  FIN: {
    activeProjects: 0,
    activeAgents: 0,
    waitingReview: 0,
    status: 'Idle',
    activePositions: 15,
    waitingReviewPositions: 3,
    inactivePositions: 2,
    description: 'Maintain financial control, billing, receivables, reconciliation and budgeting.',
    responsibilities: [
      'Invoice generation from accepted delivery scope',
      'Accounts receivable tracking and reconciliation',
      'Department budget allocation and variance analysis',
      'Client payment authorization records'
    ],
    authorityScope: 'Finance agents prepare, reconcile and verify financial records. Actual fund disbursements and payment execution remain strictly human-authorised.',
    projects: []
  },
  TEC: {
    activeProjects: 0,
    activeAgents: 0,
    waitingReview: 0,
    status: 'Idle',
    activePositions: 18,
    waitingReviewPositions: 4,
    inactivePositions: 2,
    description: 'Operate architecture, agent runtime, MCP/connectors, identity and observability.',
    responsibilities: [
      'AgentOps runtime stability and memory orchestration',
      'MCP connector security, rate limits and OAuth maintenance',
      'Cross-tenant isolation enforcement and negative testing',
      'System recovery, retry backoff policies and telemetry'
    ],
    authorityScope: 'TEC owns runtime infrastructure, connectors and developer APIs. TEC does not make commercial or marketing content decisions.',
    projects: []
  },
  GOV: {
    activeProjects: 0,
    activeAgents: 0,
    waitingReview: 0,
    status: 'Idle',
    activePositions: 16,
    waitingReviewPositions: 3,
    inactivePositions: 1,
    description: 'Independently evaluate outputs, competency, compliance, privacy and audit evidence.',
    responsibilities: [
      'Independent output evaluation against versioned rubrics',
      'Healthcare advertising regulatory compliance checks',
      'Cross-tenant privacy assurance and audit logging',
      'Agent competency evaluation, drift detection and CAPA'
    ],
    authorityScope: 'GOV operates as an independent assurance authority. A producing role cannot evaluate its own deliverables.',
    projects: []
  }
}

// Project-specific Inputs & Outputs for positions (Requirement 8)
// Demonstrates rich, real project linking with fallback generator for all 194 positions
export const positionSpecificProjectData = {
  'MKT-007': {
    projects: [
      {
        id: 'PRJ-2026-001',
        name: 'Cardiac Awareness Campaign',
        client: 'City Care Multispeciality Hospital',
        objective: 'Increase awareness about cardiac health and drive OPD bookings.',
        currentStage: 'Content Production',
        stageNumber: 8,
        deadline: '30 Oct 2026 (1 day left)',
        roleInProject: 'Social content strategy',
        status: 'In Progress',
        inputs: [
          {
            id: 'INP-001',
            item: 'Campaign brief & objectives',
            source: 'Marketing Planner (MKT-001)',
            receivedOn: '20 Oct 2026',
            status: 'Approved',
            statusTone: 'green',
            details: 'Approved brief targeting adults 35-65 in Hyderabad with key emphasis on early hypertension signs.'
          },
          {
            id: 'INP-002',
            item: 'Brand guidelines & tone of voice',
            source: 'Brand Manager (MKT-002)',
            receivedOn: '20 Oct 2026',
            status: 'Approved',
            statusTone: 'green',
            details: 'Color palette: Navy (#0f172a) & Medical Red (#dc2626). Empathetic, scientifically backed, non-alarmist tone.'
          },
          {
            id: 'INP-003',
            item: 'Design assets (logo, templates)',
            source: 'Content Designer (MKT-015)',
            receivedOn: '21 Oct 2026',
            status: 'Completed',
            statusTone: 'green',
            details: 'Square 1080x1080 and 9:16 story Figma frames with verified WCAG 2.1 contrast ratio.'
          },
          {
            id: 'INP-004',
            item: 'Target audience research',
            source: 'Research Analyst (MKT-005)',
            receivedOn: '21 Oct 2026',
            status: 'Completed',
            statusTone: 'green',
            details: 'PubMed review of cardiovascular risk awareness statistics among urban tech workers.'
          }
        ],
        workPerformed: {
          steps: [
            'Analysed brief and created platform-wise strategy',
            'Prepared content calendar for 4 weeks',
            'Developed captions and hashtags',
            'Coordinated with designer for visual assets',
            'Reviewed content for brand alignment'
          ],
          status: 'Completed',
          completedOn: '22 Oct 2026, 3:15 PM',
          nextStep: 'Send for client review (Approval)'
        },
        outputs: [
          {
            id: 'OUT-001',
            item: 'Social media content calendar',
            type: 'Document',
            createdOn: '22 Oct 2026',
            status: 'Completed',
            nextRecipient: 'Client (City Care)',
            approval: 'Yes',
            details: 'Structured 4-week publishing calendar with 16 post dates, copy hooks, format specs and designated CTAs.'
          },
          {
            id: 'OUT-002',
            item: 'Post drafts (Facebook/Instagram)',
            type: 'Content',
            createdOn: '22 Oct 2026',
            status: 'Completed',
            nextRecipient: 'Content Designer',
            approval: 'Yes',
            details: '5 finalized educational carousel captions and story poll prompts.'
          },
          {
            id: 'OUT-003',
            item: 'Hashtag & caption recommendations',
            type: 'Content',
            createdOn: '22 Oct 2026',
            status: 'Completed',
            nextRecipient: 'Marketing Manager',
            approval: 'No',
            details: 'Curated 15 high-engagement hashtags (#HyderabadHealth, #CardiacCare, #HeartHealthTips).'
          },
          {
            id: 'OUT-004',
            item: 'Performance tracking plan',
            type: 'Document',
            createdOn: '22 Oct 2026',
            status: 'Completed',
            nextRecipient: 'Analytics Team',
            approval: 'No',
            details: 'UTM tagging taxonomy and benchmark CTR goal of 3.2%.'
          }
        ],
        handoffs: [
          { stage: 'Briefing', from: 'MKT-001 (Planner)', to: 'MKT-007 (Strategist)', time: '20 Oct 2026, 10:00 AM', status: 'Completed' },
          { stage: 'Strategy & Draft', from: 'MKT-007 (Strategist)', to: 'MKT-015 (Designer)', time: '22 Oct 2026, 3:15 PM', status: 'Completed' },
          { stage: 'QA Screening', from: 'MKT-015 (Designer)', to: 'GOV-002 (Assurance)', time: '23 Oct 2026, 11:30 AM', status: 'Completed' },
          { stage: 'Client Review Gate', from: 'GOV-002 (Assurance)', to: 'Client Admin (City Care)', time: '29 Oct 2026, 10:12 AM', status: 'In Review' }
        ]
      },
      {
        id: 'PRJ-2026-002',
        name: 'Maternity Service Promotion',
        client: 'Nirvaan Wellness Clinic',
        objective: 'Promote specialized prenatal physiotherapy and pain-relief consults.',
        currentStage: 'Client Review',
        stageNumber: 10,
        deadline: '02 Nov 2026 (4 days left)',
        roleInProject: 'Campaign content & posts',
        status: 'In Review',
        inputs: [
          {
            id: 'INP-101',
            item: 'Maternity campaign goals brief',
            source: 'CEX Account Manager (CEX-004)',
            receivedOn: '18 Oct 2026',
            status: 'Approved',
            statusTone: 'green',
            details: 'Focus on prenatal posture correction and pelvic floor strengthening classes.'
          },
          {
            id: 'INP-102',
            item: 'Clinical disclaimer guidelines',
            source: 'Governance Lead (GOV-008)',
            receivedOn: '19 Oct 2026',
            status: 'Approved',
            statusTone: 'green',
            details: 'Requirement for certified physiotherapist supervision disclaimer.'
          }
        ],
        workPerformed: {
          steps: [
            'Drafted 3 carousel concepts highlighting expert therapist bios',
            'Integrated client feedback on softer color palette',
            'Compiled engagement metrics from previous prenatal campaign'
          ],
          status: 'In Review',
          completedOn: '25 Oct 2026, 5:40 PM',
          nextStep: 'Awaiting client ad creative sign-off'
        },
        outputs: [
          {
            id: 'OUT-101',
            item: 'Maternity awareness ad copy variants',
            type: 'Content',
            createdOn: '25 Oct 2026',
            status: 'In Review',
            nextRecipient: 'Client (Nirvaan)',
            approval: 'Yes',
            details: 'A/B copy test variations emphasizing personalized patient comfort.'
          }
        ],
        handoffs: [
          { stage: 'Briefing', from: 'CEX-004', to: 'MKT-007', time: '18 Oct 2026', status: 'Completed' },
          { stage: 'Drafting', from: 'MKT-007', to: 'GOV-008', time: '25 Oct 2026', status: 'Completed' },
          { stage: 'Client Review', from: 'MKT-007', to: 'Nirvaan Client Gate', time: '29 Oct 2026', status: 'In Review' }
        ]
      },
      {
        id: 'PRJ-2026-007',
        name: 'Ayurveda Brand Relaunch',
        client: 'Arogya Ayurveda Centre',
        objective: 'Establish digital authority in traditional holistic rejuvenation treatments.',
        currentStage: 'Planning & Strategy',
        stageNumber: 6,
        deadline: '18 Nov 2026',
        roleInProject: 'Social media content strategy',
        status: 'Planning',
        inputs: [
          {
            id: 'INP-201',
            item: 'Brand questionnaire & history',
            source: 'Client (Arogya Centre)',
            receivedOn: '27 Oct 2026',
            status: 'Completed',
            statusTone: 'green',
            details: '30-year legacy in classical Kerala Panchakarma therapies.'
          }
        ],
        workPerformed: {
          steps: [
            'Mapped 4 weekly themes: Detoxification, Immunity, Mind-Body Balance, Daily Dinacharya',
            'Drafted doctor video interview prompts'
          ],
          status: 'In Progress',
          completedOn: 'In Progress',
          nextStep: 'Schedule editorial review meeting'
        },
        outputs: [
          {
            id: 'OUT-201',
            item: 'Content pillars presentation deck',
            type: 'Document',
            createdOn: '28 Oct 2026',
            status: 'Draft',
            nextRecipient: 'Marketing Lead (MKT-001)',
            approval: 'No',
            details: 'Strategic deck framing authentic Ayurvedic wisdom for modern urban lifestyle.'
          }
        ],
        handoffs: [
          { stage: 'Intake', from: 'Client Portal', to: 'MKT-007', time: '27 Oct 2026', status: 'Completed' },
          { stage: 'Pillars Draft', from: 'MKT-007', to: 'MKT-001', time: '28 Oct 2026', status: 'In Progress' }
        ]
      }
    ]
  }
}

// Fallback project-specific generator for all other positions
export function getPositionProjectWorkflow(position) {
  if (positionSpecificProjectData[position.positionId]) {
    return positionSpecificProjectData[position.positionId]
  }

  const deptMetrics = departmentMetrics[position.deptId] || departmentMetrics.MKT
  const deptProjects = deptMetrics.projects || []

  if (deptProjects.length === 0) {
    return {
      projects: []
    }
  }

  // Derive 1 to 3 projects from the department projects
  const count = Math.min(deptProjects.length, 1 + (position.positionId.charCodeAt(position.positionId.length - 1) % 3))
  const assignedProjects = deptProjects.slice(0, count).map((dp, i) => {
    return {
      id: dp.id,
      name: dp.name,
      client: dp.client,
      objective: dp.description,
      currentStage: dp.currentStage,
      stageNumber: 7 + i,
      deadline: dp.deadline,
      roleInProject: `${position.title} execution`,
      status: dp.status,
      inputs: [
        {
          id: `INP-${position.positionId}-1`,
          item: `${dp.name} specifications & brief`,
          source: `${position.deptId} Coordinator`,
          receivedOn: '24 Oct 2026',
          status: 'Approved',
          statusTone: 'green',
          details: `Scope package for ${dp.client} detailing requirements for ${position.title}.`
        },
        {
          id: `INP-${position.positionId}-2`,
          item: 'Policy guidelines and acceptance criteria',
          source: 'Assurance Lead (GOV-002)',
          receivedOn: '25 Oct 2026',
          status: 'Approved',
          statusTone: 'green',
          details: 'Mandatory clinical claims verification standards and tenant isolation verification.'
        }
      ],
      workPerformed: {
        steps: [
          `Analyzed assigned task inputs against ${position.title} contract`,
          'Generated structured draft according to versioned schema',
          'Verified compliance with department authority boundaries',
          'Prepared deliverable package for peer evaluation'
        ],
        status: dp.status === 'In Progress' ? 'Completed' : dp.status,
        completedOn: '26 Oct 2026, 4:20 PM',
        nextStep: 'Handoff to downstream verification'
      },
      outputs: [
        {
          id: `OUT-${position.positionId}-1`,
          item: `${position.title} Deliverable Package`,
          type: 'Structured Record',
          createdOn: '26 Oct 2026',
          status: 'Completed',
          nextRecipient: 'GOV Assurance Evaluator',
          approval: position.authority === 'D' || position.authority === 'E' ? 'Yes' : 'No',
          details: `Structured output package produced by ${position.positionId} (${position.title}).`
        }
      ],
      handoffs: [
        { stage: 'Briefing', from: `${position.deptId}-001`, to: position.positionId, time: '24 Oct 2026', status: 'Completed' },
        { stage: 'Execution', from: position.positionId, to: 'GOV-002', time: '26 Oct 2026', status: 'Completed' },
        { stage: 'Review Gate', from: 'GOV-002', to: 'Downstream Consumer', time: '29 Oct 2026', status: 'In Review' }
      ]
    }
  })

  return {
    projects: assignedProjects
  }
}
