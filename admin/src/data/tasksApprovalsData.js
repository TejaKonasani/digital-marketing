// ==============================================================================
// SAMRUDHI AGENTIC AI — TASKS & APPROVALS DATASET
// Canonical source for human decision gates, blocked exceptions, and audit history
// ==============================================================================

export const initialPendingApprovals = [
  {
    id: 'APR-001',
    title: 'Approve cardiac awareness social post',
    type: 'Client approval',
    typeBadge: 'Client approval',
    priority: 'High priority',
    priorityTone: 'rose',
    riskLevel: 'Low',
    client: 'City Care Hospital',
    clientId: 'CLIENT-001',
    project: 'Social Media Campaign (PROJ-001)',
    projectId: 'PRJ-2026-001',
    department: 'Content publishing',
    subtext: 'City Care Hospital · Content publishing',
    description: 'External side effect content requires client approval (v2)',
    reason: 'External content publication in client channels. Contains general health information. Requires client review and sign-off as per policy.',
    requestingEntity: 'Creative Team',
    requestingPosition: 'CRT-004 (Caption Specialist)',
    submittedBy: 'K. Sharma (Creative Team)',
    submittedDate: '28 Oct 2026, 10:12',
    requiredApprover: 'R. Iyer (Client Admin)',
    dueDate: '30 Oct 2026 (2 days left)',
    status: 'Pending',
    relatedItems: {
      contentId: 'CNT-001',
      project: 'Social Media Campaign (PROJ-001)',
      client: 'City Care Hospital',
      contentType: 'Social Media Post',
      version: 'v2'
    },
    whatIsRequested: 'Approval to publish the cardiac health awareness social media post (v2) on client channels.',
    whyRequired: [
      'External content publication in client channels',
      'Contains general health information',
      'Requires client review and sign-off as per policy'
    ],
    proposedContent: {
      headline: 'Your Heart Deserves Regular Care',
      copy: 'Did you know that 40% of cardiovascular complications can be detected early with routine screening? Our comprehensive cardiac wellness package at City Care includes 2D Echo, TMT, and cardiologist consultation.',
      assetRef: 'cardiac_carousel_v2.png (1080x1080)',
      targetChannels: ['Instagram', 'LinkedIn', 'Facebook']
    },
    supportingDocuments: [
      { name: 'Creative Carousel Asset v2.0', size: '1.4 MB', date: '28 Oct 2026' },
      { name: 'ICMR Cardiovascular Screening Citation S4', size: '420 KB', date: '27 Oct 2026' },
      { name: 'City Care Brand Guidelines Sign-off', size: '890 KB', date: '24 Oct 2026' }
    ],
    aiAssessment: {
      recommendation: 'Recommended for approval',
      summary: 'Content aligns with client brief, brand guidelines and approved messaging.',
      risk: 'Low',
      checklist: [
        { label: 'Brand guidelines followed', passed: true },
        { label: 'No unverified medical claims', passed: true },
        { label: 'Accessible and clear language', passed: true },
        { label: 'Compliant with content policy', passed: true }
      ]
    }
  },
  {
    id: 'APR-002',
    title: 'Maternity campaign budget ₹1.2L/month',
    type: 'Commercial approval',
    typeBadge: 'Commercial approval',
    priority: 'Critical',
    priorityTone: 'rose',
    riskLevel: 'High',
    client: 'City Care Hospital',
    clientId: 'CLIENT-001',
    project: 'Maternity Services Launch (PROJ-003)',
    projectId: 'PRJ-2026-003',
    department: 'Paid Media',
    subtext: 'City Care Hospital · Paid Media',
    description: 'Paid media campaign budget requires human approval before activation',
    reason: 'Ad spend commitment of ₹1,20,000/month exceeds automated Class D threshold. Reserved human decision (Class E).',
    requestingEntity: 'Paid Media Team',
    requestingPosition: 'PMG-001 (Paid Media Lead)',
    submittedBy: 'Sandeep (Paid Media Team)',
    submittedDate: '27 Oct 2026, 16:40',
    requiredApprover: 'Founder / SBD Commercial Lead',
    dueDate: '29 Oct 2026',
    status: 'Pending',
    relatedItems: {
      campaignId: 'CP-0031',
      project: 'Maternity Services Launch (PROJ-003)',
      client: 'City Care Hospital',
      channel: 'Google Ads & Meta Ads',
      budget: '₹1,20,000 / month'
    },
    whatIsRequested: 'Formal commercial authorization to allocate and activate ₹1.2L monthly paid search and social budget.',
    whyRequired: [
      'Financial commitment creates direct contractual billing impact',
      'Requires verified payment method and commercial scope match'
    ],
    aiAssessment: {
      recommendation: 'Recommended with budget cap condition',
      summary: 'Projected CAC is ₹650 per maternity booking enquiry with 3.8x modeled institutional ROI.',
      risk: 'Medium',
      checklist: [
        { label: 'Within overall MSA commercial cap', passed: true },
        { label: 'Conversion tracking verified', passed: true },
        { label: 'Negative keyword filters active', passed: true }
      ]
    }
  },
  {
    id: 'APR-003',
    title: 'Approach Sunrise Dental Studio',
    type: 'External outreach',
    typeBadge: 'External outreach',
    priority: 'Medium',
    priorityTone: 'amber',
    riskLevel: 'Low',
    client: 'Sunrise Dental Studio',
    clientId: 'CLIENT-003',
    project: 'SBD Discovery (OPP-001)',
    projectId: 'OPP-001',
    department: 'Sales outreach',
    subtext: 'Sunrise Dental Studio · Sales outreach',
    description: 'Approval to contact prospect with discovery summary and clinic audit',
    reason: 'First external touchpoint requires human authorization under SBD-002 policy. AI research summary attached.',
    requestingEntity: 'Sales Team',
    requestingPosition: 'SBD-004 (Prospect Researcher)',
    submittedBy: 'Kavita (Sales Team)',
    submittedDate: '28 Oct 2026, 09:15',
    requiredApprover: 'Head of SBD',
    dueDate: '31 Oct 2026',
    status: 'Pending',
    relatedItems: {
      opportunityId: 'OPP-001',
      targetContact: 'Dr. Rohit Mehta (Managing Partner)',
      channel: 'Personalized Email & Phone Brief',
      qualificationScore: '72/100'
    },
    whatIsRequested: 'Authorization to send personalized discovery assessment to Dr. Rohit Mehta.',
    whyRequired: [
      'External prospect outreach creates institutional brand representation',
      'Validates accuracy of clinic audit and contact identity'
    ],
    aiAssessment: {
      recommendation: 'Recommended for outreach',
      summary: 'High prospect match with zero competitive conflicts in Pune region.',
      risk: 'Low',
      checklist: [
        { label: 'Decision maker verified on medical registry', passed: true },
        { label: 'Email deliverability score 99%', passed: true }
      ]
    }
  },
  {
    id: 'APR-004',
    title: 'Publish diabetes landing page copy',
    type: 'Publishing approval',
    typeBadge: 'Publishing approval',
    priority: 'Medium',
    priorityTone: 'amber',
    riskLevel: 'Low',
    client: 'City Care Hospital',
    clientId: 'CLIENT-001',
    project: 'Patient Education Blog Series (PROJ-002)',
    projectId: 'PRJ-2026-002',
    department: 'Website content',
    subtext: 'City Care Hospital · Website content',
    description: 'Final approval required before publishing to live staging site',
    reason: 'CMS live publication requires verified reviewer sign-off following QA pass.',
    requestingEntity: 'Creative Team',
    requestingPosition: 'CRT-005 (Healthcare Writer)',
    submittedBy: 'Creative Team',
    submittedDate: '27 Oct 2026, 14:00',
    requiredApprover: 'Creative Lead / Client Admin',
    dueDate: '01 Nov 2026',
    status: 'Pending',
    relatedItems: {
      contentId: 'CNT-002',
      destination: 'citycarehospitals.in/diabetes-care',
      qaChecklist: '100% Passed'
    },
    whatIsRequested: 'Publishing authorization to push copy and schema markup to production website CMS.',
    whyRequired: ['Public website modification creates patient-facing clinical responsibility.'],
    aiAssessment: {
      recommendation: 'Recommended for approval',
      summary: 'Copy passed all technical SEO and readability benchmarks.',
      risk: 'Low',
      checklist: [
        { label: 'Technical SEO schema valid', passed: true },
        { label: 'Mobile readability 72 Flesch score', passed: true }
      ]
    }
  },
  {
    id: 'APR-005',
    title: 'Approve commercial scope',
    type: 'Commercial approval',
    typeBadge: 'Commercial approval',
    priority: 'High',
    priorityTone: 'rose',
    riskLevel: 'Medium',
    client: 'CarePoint Home Nursing',
    clientId: 'CLIENT-010',
    project: 'SBD Opportunity (OPP-003)',
    projectId: 'OPP-003',
    department: 'Sales',
    subtext: 'CarePoint Home Nursing · Sales',
    description: 'Commercial scope requires approval prior to contract issuance',
    reason: 'Scope definition and SLA commitments require commercial review by SBD-007 before contract signature.',
    requestingEntity: 'Sales Team',
    requestingPosition: 'SBD-006 (Solution Lead)',
    submittedBy: 'D. Gupta (Sales Team)',
    submittedDate: '28 Oct 2026, 11:20',
    requiredApprover: 'Nitin (SBD-007 Commercial Specialist)',
    dueDate: '02 Nov 2026',
    status: 'Pending',
    relatedItems: {
      opportunityId: 'OPP-003',
      contractValue: '₹1.2Cr annual contract',
      services: 'Lead Gen & Automated Booking'
    },
    whatIsRequested: 'Commercial and legal scope approval for CarePoint Home Nursing contract issuance.',
    whyRequired: ['Contractual SLA boundaries and multi-month retainer commitment.'],
    aiAssessment: {
      recommendation: 'Recommended with scope boundary clause',
      summary: 'Commercial margin is 68% with clear monthly deliverable boundaries.',
      risk: 'Medium',
      checklist: [
        { label: 'Deliverable boundaries specified', passed: true },
        { label: 'Payment terms adhere to standard net-30', passed: true }
      ]
    }
  },
  {
    id: 'APR-006',
    title: 'Clinical claim disclaimer review - Diwali Tips',
    type: 'Clinical sign-off',
    typeBadge: 'Clinical sign-off',
    priority: 'High',
    priorityTone: 'rose',
    riskLevel: 'Medium',
    client: 'City Care Hospital',
    clientId: 'CLIENT-001',
    project: 'Social Media Campaign (PROJ-001)',
    projectId: 'PRJ-2026-001',
    department: 'Regulatory QA',
    subtext: 'City Care Hospital · Regulatory QA',
    description: 'NABH compliance review on herbal dietary claims in festive social pack',
    reason: 'Two herbal statements escalated by automated QA for independent medical assurance verification.',
    requestingEntity: 'GOV Team',
    requestingPosition: 'GOV-002 (Content QA)',
    submittedBy: 'GOV-002',
    submittedDate: '29 Oct 2026, 09:30',
    requiredApprover: 'GOV-008 (Medical Assurance Lead)',
    dueDate: '30 Oct 2026',
    status: 'Pending',
    relatedItems: {
      contentId: 'CNT-004',
      claimsUnderReview: ['Claim #2 (Herbal sugar control)', 'Claim #3 (Pollution detox)']
    },
    whatIsRequested: 'Independent medical officer sign-off or redline of two specific claims in Diwali post.',
    whyRequired: ['ASCI healthcare compliance prohibits unsubstantiated herbal therapeutic guarantees.'],
    aiAssessment: {
      recommendation: 'Revision required before approval',
      summary: 'Claim #2 lacks peer-reviewed ICMR randomized trial citation. Recommend softening wording to supportive lifestyle tip.',
      risk: 'High',
      checklist: [
        { label: 'Clinical citation verified', passed: false },
        { label: 'NABH claim restriction checked', passed: true }
      ]
    }
  }
]

export const initialBlockedItems = [
  {
    id: 'BLK-001',
    title: 'Diwali Health Tips - 2 unverified clinical assertions',
    affectedEntity: 'CNT-004 (Content Pack)',
    client: 'City Care Hospital',
    project: 'Social Media Campaign (PROJ-001)',
    position: 'CRT-004 (Caption Specialist)',
    whatFailed: 'Factual verification gate failed on slide 3 & 4 herbal claims.',
    whyFailed: 'Medical claims must be supported by recognized ICMR citations. Statements contained therapeutic claims without clinical backing.',
    attempts: 'Automated citation check executed 2 times. GOV-002 rejected automated pass.',
    resolutionRequired: 'GOV-008 clinical review or removal of unsupported assertions by copywriter.',
    owner: 'GOV-008 (Medical Assurance Lead)',
    severity: 'High',
    dateLogged: '27 Oct 2026'
  },
  {
    id: 'BLK-002',
    title: 'Maternity Campaign Meta Ad Account connector token expired',
    affectedEntity: 'CP-0031 (Ad Campaign)',
    client: 'City Care Hospital',
    project: 'Maternity Services Launch (PROJ-003)',
    position: 'PMG-002 (Campaign Operations)',
    whatFailed: 'Meta Marketing API authentication failure during campaign draft push.',
    whyFailed: 'Long-lived OAuth token reached 60-day expiry threshold.',
    attempts: 'Automated token refresh failed due to required 2-factor authentication.',
    resolutionRequired: 'Workspace administrator must re-authenticate Meta Business Manager in Technology & AgentOps.',
    owner: 'TEC-004 (Integration Specialist)',
    severity: 'Critical',
    dateLogged: '28 Oct 2026'
  },
  {
    id: 'BLK-003',
    title: 'High-resolution brand logo vector asset missing',
    affectedEntity: 'CNT-006 (Infographic)',
    client: 'Sunrise Dental Studio',
    project: 'Dental Hygiene Education',
    position: 'CRT-007 (Visual Designer)',
    whatFailed: 'Asset ingestion gate blocked vector flyer compilation.',
    whyFailed: 'Client uploaded a 72dpi JPG thumbnail unsuitable for print output.',
    attempts: 'Asset enhancement bot flagged raster artifact distortion above 300dpi requirement.',
    resolutionRequired: 'Request original vector SVG or EPS master file from Dr. Rohit Mehta.',
    owner: 'CEX-002 (Onboarding Specialist)',
    severity: 'Medium',
    dateLogged: '26 Oct 2026'
  },
  {
    id: 'BLK-004',
    title: 'Physiotherapy Landing Page staging webhook latency timeout',
    affectedEntity: 'PRJ-2026-002 (Landing Page)',
    client: 'Nirvaan Wellness',
    project: 'Physiotherapy Booking Funnel',
    position: 'TEC-003 (Connector Specialist)',
    whatFailed: 'Staging deployment webhook timed out after 30 seconds.',
    whyFailed: 'Remote reverse-proxy server experienced packet loss during bundle sync.',
    attempts: 'Retried 3 times with exponential backoff. Latency remained >35s.',
    resolutionRequired: 'DevOps engineer must inspect staging container network route and flush reverse proxy cache.',
    owner: 'TEC-003 (Connector Specialist)',
    severity: 'Medium',
    dateLogged: '28 Oct 2026'
  },
  {
    id: 'BLK-005',
    title: 'Commercial pricing tier conflict',
    affectedEntity: 'OPP-083 (Commercial Scope)',
    client: 'SmileWorks Orthodontics',
    project: 'SBD Proposal Formulation',
    position: 'SBD-007 (Contract Specialist)',
    whatFailed: 'Automated Class B pricing calculation halted.',
    whyFailed: 'Custom 3-clinic bundle discount requested by client exceeds standard automated pricing matrix threshold by 4%.',
    attempts: 'System flagged pricing exception and paused proposal generation.',
    resolutionRequired: 'Human commercial sign-off and pricing override by Head of SBD.',
    owner: 'SBD-001 (Head of SBD)',
    severity: 'High',
    dateLogged: '29 Oct 2026'
  }
]

export const initialDecisionHistory = [
  {
    id: 'DEC-094',
    decisionId: 'DEC-094',
    title: 'Approved scope and pricing — Sterling Ortho Clinic',
    type: 'Commercial Scope Sign-off',
    client: 'Sterling Ortho Clinic',
    project: 'Orthopedic Patient Pathway',
    requester: 'Nitin (SBD-007)',
    approver: 'Vikram (CEO Office / Super Admin)',
    decision: 'Approved',
    decisionTone: 'emerald',
    timestamp: '28 Oct 2026, 17:15',
    comments: 'Full commercial scope verified. Retainer terms approved at ₹12L/year.',
    evidence: 'MSA CTR-2026-092 v1.0, SBD Commercial Matrix v2',
    resultingAction: 'Generated CEX-001 Handoff packet and provisioned workspace tenant.'
  },
  {
    id: 'DEC-093',
    decisionId: 'DEC-093',
    title: 'Revision requested — Diwali Health Tips Herbal Claims',
    type: 'Clinical QA Gate',
    client: 'City Care Hospital',
    project: 'Social Media Campaign (PROJ-001)',
    requester: 'GOV-002',
    approver: 'Satya (GOV-001 Head of Assurance)',
    decision: 'Revision requested',
    decisionTone: 'rose',
    timestamp: '27 Oct 2026, 15:40',
    comments: 'Clinical assertion on herbal detoxification must be redlined to avoid ASCI violation.',
    evidence: 'Diwali Pack v1, ICMR 2025 Therapeutic Guidelines',
    resultingAction: 'Task rerouted to CRT-004 for copy revision.'
  },
  {
    id: 'DEC-092',
    decisionId: 'DEC-092',
    title: 'Approved — Cardiac Awareness Campaign Creative v1',
    type: 'Client Deliverable Approval',
    client: 'City Care Hospital',
    project: 'Social Media Campaign (PROJ-001)',
    requester: 'Creative Team',
    approver: 'Dr. Anitha Reddy (Client Admin)',
    decision: 'Approved',
    decisionTone: 'emerald',
    timestamp: '25 Oct 2026, 11:30',
    comments: 'Slides 1 through 5 approved. Accurate representation of NABH checkup suite.',
    evidence: 'DELV-003 Creative Banners v2.0',
    resultingAction: 'Deliverable marked as Approved in Assets Library.'
  },
  {
    id: 'DEC-091',
    decisionId: 'DEC-091',
    title: 'Approved — Discovery Outreach to Nirvaan Wellness',
    type: 'External Outreach Sign-off',
    client: 'Nirvaan Wellness Clinic',
    project: 'SBD Discovery (OPP-082)',
    requester: 'Kavita (SBD-002)',
    approver: 'Karthik (Head of SBD)',
    decision: 'Approved',
    decisionTone: 'emerald',
    timestamp: '14 Oct 2026, 10:00',
    comments: 'Outreach packet verified. Authorized personalized proposal delivery.',
    evidence: 'DISC-RECORD-002 v1.1',
    resultingAction: 'SBD-006 initiated commercial discovery sequence.'
  }
]

export function getApprovalById(id, list = initialPendingApprovals) {
  if (!id) return null
  const clean = String(id).trim().toLowerCase()
  return (
    list.find(
      (a) =>
        a.id.toLowerCase() === clean ||
        a.title.toLowerCase() === clean ||
        a.id.replace('APR-', '').toLowerCase() === clean.replace('apr-', '')
    ) || list[0]
  )
}
