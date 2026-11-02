// ==============================================================================
// SAMRUDHI AGENTIC AI — SHARED ANALYTICS, AGENTOPS & ASSURANCE DATA ARCHITECTURE
// Single source of truth for execution telemetry, system health, and governance
// ==============================================================================

// ------------------------------------------------------------------------------
// 1. SYSTEM HEALTH & LOCAL INFRASTRUCTURE
// ------------------------------------------------------------------------------
export const systemServices = [
  {
    id: 'backend',
    name: 'Backend API',
    type: 'Node.js / Express',
    status: 'Healthy',
    statusTone: 'emerald',
    latency: '12 ms',
    responseTimeNum: 12,
    port: '3001',
    lastCheck: '2 mins ago',
    endpoint: 'http://localhost:3001/api/health',
    details: 'REST API, WebSocket Gateway, Session store active'
  },
  {
    id: 'database',
    name: 'Database (PostgreSQL)',
    type: 'PostgreSQL 16.2',
    status: 'Healthy',
    statusTone: 'emerald',
    latency: '8 ms',
    responseTimeNum: 8,
    port: '5432',
    lastCheck: '1 min ago',
    endpoint: 'localhost:5432/samrudhi_ai',
    details: 'Connection pool: 18/25 active, read replicas synchronized'
  },
  {
    id: 'ollama',
    name: 'Ollama Runtime',
    type: 'Local LLM Inference',
    status: 'Healthy',
    statusTone: 'emerald',
    latency: '15 ms',
    responseTimeNum: 15,
    port: '11434',
    lastCheck: '1 min ago',
    endpoint: 'http://localhost:11434',
    details: 'Local inference active, GPU acceleration (CUDA) enabled, 3 models available'
  },
  {
    id: 'storage',
    name: 'Storage',
    type: 'Local Disk Store',
    status: 'Healthy',
    statusTone: 'emerald',
    latency: '22 ms',
    responseTimeNum: 22,
    port: '—',
    lastCheck: '5 mins ago',
    endpoint: './data/storage',
    details: 'Cryptographic hash store, audit artifacts retention active'
  },
  {
    id: 'email',
    name: 'Email Service',
    type: 'SMTP Relay Adapter',
    status: 'Healthy',
    statusTone: 'emerald',
    latency: '45 ms',
    responseTimeNum: 45,
    port: '587',
    lastCheck: '10 mins ago',
    endpoint: 'smtp.internal.local',
    details: 'Outbound queue operating with strict human-approval gate'
  }
]

export const localResources = {
  cpu: { percent: 32, label: '32%', cores: '8 Cores (AMD Ryzen)' },
  memory: { percent: 48, label: '48%', used: '7.6 GB', total: '16 GB' },
  disk: { percent: 62, label: '62%', used: '124 GB', total: '200 GB' }
}

// ------------------------------------------------------------------------------
// 2. LOCAL AI RUNTIME & MODEL REGISTRY
// ------------------------------------------------------------------------------
export const ollamaRuntime = {
  status: 'Connected',
  host: 'http://localhost:11434',
  version: '0.4.1',
  lastSuccessfulConnection: '29 Oct 2026, 11:15 AM',
  lastError: 'None recorded',
  p50Latency: '840 ms',
  totalLoadedModels: 3,
  models: [
    {
      id: 'llama3.1:8b',
      name: 'llama3.1:8b',
      tag: '8b-instruct-q4_K_M',
      parameters: '8.03 Billion',
      quantization: 'Q4_K_M',
      size: '4.7 GB',
      installed: true,
      available: true,
      loadedInMemory: true,
      contextWindow: '128k tokens',
      lastUsed: '2 mins ago',
      executionsCount: 1240,
      assignedRoles: 'Drafting, summarization, general content and research positions'
    },
    {
      id: 'mistral:7b',
      name: 'mistral:7b',
      tag: '7b-instruct-v0.3-q4_0',
      parameters: '7.24 Billion',
      quantization: 'Q4_0',
      size: '4.1 GB',
      installed: true,
      available: true,
      loadedInMemory: true,
      contextWindow: '32k tokens',
      lastUsed: '15 mins ago',
      executionsCount: 486,
      assignedRoles: 'Clinical fact checks, QA screening rubrics, regulatory parsing'
    },
    {
      id: 'nomic-embed-text:latest',
      name: 'nomic-embed-text:latest',
      tag: 'latest-v1.5',
      parameters: '137 Million',
      quantization: 'F16',
      size: '274 MB',
      installed: true,
      available: true,
      loadedInMemory: true,
      contextWindow: '8k tokens',
      lastUsed: '5 mins ago',
      executionsCount: 188,
      assignedRoles: 'Vector embedding, semantic retrieval, client brief search'
    }
  ]
}

// ------------------------------------------------------------------------------
// 3. AGENT EXECUTION MONITOR & TELEMETRY RECORDS
// ------------------------------------------------------------------------------
export const activeExecutions = [
  {
    id: 'EXEC-2026-001248',
    positionId: 'POS-023',
    positionName: 'Content Writer',
    department: 'Marketing & Content',
    project: 'City Care Campaign',
    projectId: 'PROJ-001',
    client: 'City Care Hospital',
    started: '10:24 AM',
    duration: '2m 12s',
    status: 'Running',
    model: 'llama3.1:8b'
  },
  {
    id: 'EXEC-2026-001247',
    positionId: 'POS-084',
    positionName: 'Data Researcher',
    department: 'Research & Analysis',
    project: 'Market Analysis',
    projectId: 'PROJ-004',
    client: 'Nirvaan Wellness',
    started: '10:22 AM',
    duration: '1m 45s',
    status: 'Running',
    model: 'mistral:7b'
  },
  {
    id: 'EXEC-2026-001246',
    positionId: 'POS-051',
    positionName: 'Design Creator',
    department: 'Design & Creative',
    project: 'Brand Assets',
    projectId: 'PROJ-001',
    client: 'City Care Hospital',
    started: '10:21 AM',
    duration: '3m 10s',
    status: 'Running',
    model: 'llama3.1:8b'
  },
  {
    id: 'EXEC-2026-001245',
    positionId: 'POS-092',
    positionName: 'Report Generator',
    department: 'Analytics & Reporting',
    project: 'Weekly Report',
    projectId: 'PROJ-002',
    client: 'MediScan Diagnostics',
    started: '10:18 AM',
    duration: '4m 22s',
    status: 'Running',
    model: 'llama3.1:8b'
  }
]

export const initialExecutionHistory = [
  {
    id: 'EXEC-2026-001245',
    executionId: 'EXEC-2026-001245',
    title: 'Content Generation — Blog Article',
    status: 'Completed',
    statusTone: 'emerald',
    positionId: 'POS-023',
    positionName: 'Content Writer (POS-023)',
    department: 'Marketing & Content',
    project: 'City Care Campaign',
    projectId: 'PROJ-001',
    client: 'City Care Hospital',
    workflow: 'Content Marketing Lifecycle v2.1',
    task: 'TASK-008: Draft preventive cardiac education article',
    model: 'llama3.1:8b',
    started: '29 Oct 2026, 10:12',
    completed: '29 Oct 2026, 10:14',
    duration: '2m 18s',
    durationSeconds: 138,
    retryCount: 0,
    tokens: { prompt: 1420, completion: 864, total: 2284 },
    input: {
      topic: 'preventive heart care',
      target_audience: 'general public',
      tone: 'educational',
      language: 'English',
      length: '800 words',
      keywords: ['heart health', 'preventive care', 'cardiac wellness', 'early screening']
    },
    output: `# Preventive Heart Care: Simple Steps for a Healthier Tomorrow

Heart disease is one of the leading health concerns today, but the good news is that many heart problems can be prevented with early detection and routine lifestyle modifications.

## 1. Understand Your Risk Factors
Routine checkups allow doctors to catch early signs of hypertension and cholesterol imbalances before they escalate into acute conditions.

- **Blood Pressure Screening**: Recommended annually for adults above 30.
- **Lipid Panel**: Evaluates HDL, LDL and triglyceride levels.
- **Blood Sugar Monitoring**: Pre-diabetes screening helps safeguard vascular health.

## 2. Incorporate Heart-Healthy Habits
Small daily decisions produce compounding benefits for cardiac longevity:
- 30 minutes of moderate aerobic activity 5 days a week.
- Diets rich in fiber, legumes, green leafy vegetables and omega-3 fatty acids.
- Limiting ultra-processed sodium and trans fats.

## 3. When to Consult a Specialist
Never ignore subtle warning signs such as unusual shortness of breath, sudden palpitations or persistent chest discomfort during mild exertion. Consult City Care's comprehensive preventive cardiology suite today.`,
    toolCalls: [
      { name: 'document_read', target: 'City Care Brand Guidelines v2.1.pdf', status: 'Success' },
      { name: 'web_search', target: 'ICMR preventive cardiology guideline 2025', status: 'Success' }
    ],
    evaluation: {
      evaluatorId: 'QA-Content-01',
      positionId: 'GOV-002',
      result: 'Passed',
      notes: 'Good quality and correct references. Follows medical disclaimer rules.',
      score: '96/100'
    },
    handoff: {
      nextOwner: 'CRT-001 (Creative Lead)',
      status: 'Handoff verified'
    }
  },
  {
    id: 'EXEC-2026-001244',
    executionId: 'EXEC-2026-001244',
    title: 'Market Competitor Analysis — Dental Clinics',
    status: 'Completed',
    statusTone: 'emerald',
    positionId: 'POS-084',
    positionName: 'Data Researcher (POS-084)',
    department: 'Research & Analysis',
    project: 'SBD Discovery — Sunrise Dental',
    projectId: 'PROJ-008',
    client: 'Sunrise Dental Studio',
    workflow: 'Commercial Lead Discovery v1.0',
    task: 'TASK-003: Public market research and pricing matrix',
    model: 'mistral:7b',
    started: '29 Oct 2026, 09:45',
    completed: '29 Oct 2026, 09:47',
    duration: '1m 52s',
    durationSeconds: 112,
    retryCount: 0,
    tokens: { prompt: 1150, completion: 620, total: 1770 },
    input: {
      target_entity: 'Sunrise Dental Studio',
      location: 'Pune, Maharashtra',
      competitor_radius: '5 km',
      service_focus: ['clear aligners', 'implant dentistry', 'pediatric dentistry']
    },
    output: `### Sunrise Dental Studio — Competitor Landscape Analysis
- Identified 8 active dental practices in a 5km radius of Kothrud, Pune.
- Sunrise leads in patient satisfaction (4.8/5.0 across 420 reviews).
- High organic demand observed for "clear aligners cost Pune" with 1.4k monthly searches.`,
    toolCalls: [
      { name: 'web_search', target: 'Kothrud Pune dental clinic directories', status: 'Success' }
    ],
    evaluation: {
      evaluatorId: 'QA-Research-01',
      positionId: 'GOV-004',
      result: 'Passed',
      notes: 'Verified against authoritative public directories.',
      score: '94/100'
    },
    handoff: {
      nextOwner: 'SBD-006 (Proposal Lead)',
      status: 'Handoff verified'
    }
  },
  {
    id: 'EXEC-2026-001243',
    executionId: 'EXEC-2026-001243',
    title: 'Ad Copy Generation — Physiotherapy Campaign',
    status: 'Completed',
    statusTone: 'emerald',
    positionId: 'POS-051',
    positionName: 'Ad Copywriter (POS-051)',
    department: 'Paid Media, SEO & Growth',
    project: 'Physiotherapy Booking Ad Set',
    projectId: 'PROJ-002',
    client: 'Nirvaan Wellness',
    workflow: 'Paid Media Creative Pipeline v1.2',
    task: 'TASK-012: Meta carousel copy draft',
    model: 'llama3.1:8b',
    started: '29 Oct 2026, 09:10',
    completed: '29 Oct 2026, 09:12',
    duration: '2m 04s',
    durationSeconds: 124,
    retryCount: 0,
    tokens: { prompt: 980, completion: 410, total: 1390 },
    input: {
      treatment: 'Sports Injury & Spine Rehabilitation',
      offer: 'Free ergonomic consultation on first session',
      platforms: ['Meta Ads', 'Google Performance Max']
    },
    output: `Headline: Move Without Pain — Tailored Physiotherapy in Indiranagar
Copy: Chronic back stiffness or sports injury? Regain full mobility with personalized physiotherapy care from certified rehabilitation specialists. Book your first ergonomic assessment today.`,
    toolCalls: [],
    evaluation: {
      evaluatorId: 'QA-Media-01',
      positionId: 'GOV-002',
      result: 'Passed',
      notes: 'No exaggerated medical claims. Compliant with ASCI advertising code.',
      score: '98/100'
    },
    handoff: {
      nextOwner: 'PMG-001 (Paid Media Lead)',
      status: 'Handoff verified'
    }
  },
  {
    id: 'EXEC-2026-001242',
    executionId: 'EXEC-2026-001242',
    title: 'Automated Social Media Post Publication',
    status: 'Failed',
    statusTone: 'rose',
    positionId: 'POS-028',
    positionName: 'Content Publisher (POS-028)',
    department: 'Creative & Content',
    project: 'Diwali Health Tips Campaign',
    projectId: 'PROJ-001',
    client: 'City Care Hospital',
    workflow: 'Content Marketing Lifecycle v2.1',
    task: 'TASK-019: Direct Instagram publish API call',
    model: 'llama3.1:8b',
    started: '29 Oct 2026, 08:30',
    completed: '29 Oct 2026, 08:31',
    duration: '42s',
    durationSeconds: 42,
    retryCount: 2,
    tokens: { prompt: 450, completion: 0, total: 450 },
    input: {
      action: 'publish_post',
      content_id: 'CNT-004',
      channel: 'Instagram Graph API'
    },
    output: '',
    errorDetails: {
      code: 'ERR_PERMISSION_VIOLATION',
      message: 'Unauthorised external publishing attempt: Missing human approval gate sign-off for external side effect. Action blocked by security runtime (Class D policy).',
      category: 'Governance & Security Rule',
      retryAllowed: false
    },
    toolCalls: [
      { name: 'social_publish', target: 'Instagram Graph API endpoint', status: 'Blocked (Permission Denied)' }
    ],
    evaluation: {
      evaluatorId: 'QA-Governance-01',
      positionId: 'GOV-001',
      result: 'Failed',
      notes: 'Policy Violation logged (ISS-2026-001). Human sign-off was not present.',
      score: '0/100'
    },
    handoff: {
      nextOwner: 'GOV-001 (Governance Desk)',
      status: 'Escalated to human supervisor'
    }
  }
]

// ------------------------------------------------------------------------------
// 4. ASSURANCE & AUDIT RECORDS (Panel 3 & 6)
// ------------------------------------------------------------------------------
export const assuranceMetrics = {
  totalAuditedExecutions: 1756,
  passedEvaluations: 1682,
  passedRate: 96,
  failedEvaluations: 58,
  failedRate: 4,
  policyViolations: 12,
  pendingReviews: 18,
  escalatedIssues: 5
}

export const evaluationResultsOverTime = [
  { date: 'Oct 1', passed: 310, failed: 12 },
  { date: 'Oct 8', passed: 345, failed: 14 },
  { date: 'Oct 15', passed: 362, failed: 10 },
  { date: 'Oct 22', passed: 320, failed: 11 },
  { date: 'Oct 29', passed: 345, failed: 11 }
]

export const issuesByCategory = [
  { name: 'Permission', value: 12, color: '#f43f5e' },
  { name: 'Missing Evidence', value: 8, color: '#f59e0b' },
  { name: 'Incorrect Handoff', value: 6, color: '#8b5cf6' },
  { name: 'Quality Failure', value: 5, color: '#ec4899' },
  { name: 'Other', value: 4, color: '#64748b' }
]

export const recentViolations = [
  {
    id: 'ISS-2026-001',
    position: 'Content Publisher',
    positionId: 'POS-028',
    department: 'Marketing & Content',
    type: 'Permission',
    severity: 'High',
    severityTone: 'rose',
    status: 'Open',
    statusTone: 'amber',
    detected: '2 hours ago',
    detectedTimestamp: '29 Oct 2026, 09:15',
    project: 'City Care Hospital',
    evidence: 'EXEC-2026-001242 audit payload',
    description: 'Attempted external social media channel publish without required human approval sign-off.'
  },
  {
    id: 'ISS-2026-002',
    position: 'Data Researcher',
    positionId: 'POS-084',
    department: 'Research & Analysis',
    type: 'Missing evidence',
    severity: 'Medium',
    severityTone: 'amber',
    status: 'In Review',
    statusTone: 'blue',
    detected: '5 hours ago',
    detectedTimestamp: '29 Oct 2026, 06:20',
    project: 'Market Analysis',
    evidence: 'EXEC-2026-001211',
    description: 'Submitted competitive pricing summary without linking source URL citation.'
  },
  {
    id: 'ISS-2026-003',
    position: 'Sales Outreach',
    positionId: 'POS-012',
    department: 'Sales & BD',
    type: 'Incorrect handoff',
    severity: 'Medium',
    severityTone: 'amber',
    status: 'Open',
    statusTone: 'amber',
    detected: '1 day ago',
    detectedTimestamp: '28 Oct 2026, 14:10',
    project: 'Sunrise Dental Studio',
    evidence: 'DISC-RECORD-008',
    description: 'Bypassed SBD-006 Solution Lead step and routed proposal directly to client portal queue.'
  },
  {
    id: 'ISS-2026-004',
    position: 'Report Generator',
    positionId: 'POS-092',
    department: 'Analytics & Reporting',
    type: 'Policy violation',
    severity: 'Medium',
    severityTone: 'amber',
    status: 'Resolved',
    statusTone: 'emerald',
    detected: '1 day ago',
    detectedTimestamp: '28 Oct 2026, 11:00',
    project: 'MediScan Diagnostics',
    evidence: 'REP-OCT-004',
    description: 'Used unapproved custom metric formula instead of governed DAT-001 definition.'
  },
  {
    id: 'ISS-2026-005',
    position: 'Ad Copywriter',
    positionId: 'POS-051',
    department: 'Paid Media, SEO & Growth',
    type: 'Quality failure',
    severity: 'High',
    severityTone: 'rose',
    status: 'In Review',
    statusTone: 'blue',
    detected: '2 days ago',
    detectedTimestamp: '27 Oct 2026, 16:30',
    project: 'Nirvaan Wellness',
    evidence: 'AD-SPEC-091',
    description: 'Unverified medical claim on therapeutic recovery rate detected by QA screening rubric.'
  }
]

// Position Compliance Profile matching Panel 6
export const positionComplianceProfiles = {
  'POS-023': {
    id: 'POS-023',
    positionId: 'POS-023',
    title: 'Content Writer',
    department: 'Marketing & Content',
    authorityLevel: 'Standard',
    independentEvaluator: 'QA-Content-01',
    roleConfigVersion: 'v2.3',
    model: 'llama3.1:8b',
    status: 'Compliant',
    purpose: 'Create high-quality content for blogs, social media and client communications.',
    toolPermissions: ['Content generation', 'Web search', 'Document read', 'Image generation'],
    complianceStatus: 'Compliant',
    lastEvaluation: '29 Oct 2026, 09:30',
    nextReview: '05 Nov 2026',
    openViolations: 0,
    recentEvaluations: [
      { date: '29 Oct 2026', status: 'Passed', notes: 'Good quality and correct references.' },
      { date: '28 Oct 2026', status: 'Passed', notes: 'Followed guidelines.' },
      { date: '26 Oct 2026', status: 'Failed', notes: 'Missing image attribution.' },
      { date: '24 Oct 2026', status: 'Passed', notes: 'Correct tone and structure.' }
    ]
  }
}

// ------------------------------------------------------------------------------
// 5. ANALYTICS & PERFORMANCE AGGREGATES (Panel 1 & 4)
// ------------------------------------------------------------------------------
export const analyticsOverviewMetrics = {
  totalProjects: 24,
  totalProjectsDelta: '+12%',
  activeProjects: 16,
  activeProjectsDelta: '+6%',
  completedProjects: 5,
  completedProjectsDelta: '+25%',
  pendingDecisions: 8,
  pendingDecisionsDelta: '-5%',
  successfulExecutions: '1,842',
  successfulExecutionsRate: '96%',
  failedExecutions: 72,
  failedExecutionsRate: '4%'
}

export const projectProgressWeeks = [
  { week: 'W1', started: 10, completed: 4 },
  { week: 'W2', started: 14, completed: 6 },
  { week: 'W3', started: 18, completed: 12 },
  { week: 'W4', started: 22, completed: 15 }
]

export const executionOutcomesSummary = {
  totalRuns: 1914,
  successful: 1842,
  successfulRate: 96,
  failed: 72,
  failedRate: 4,
  retried: 36
}

export const departmentPerformance = [
  { department: 'Marketing & Content', positions: 22, executed: 20, success: 480, failed: 18, pending: 12, workload: 85 },
  { department: 'Sales', positions: 18, executed: 16, success: 382, failed: 12, pending: 8, workload: 76 },
  { department: 'Client Operations', positions: 20, executed: 18, success: 365, failed: 14, pending: 6, workload: 72 },
  { department: 'Research & Analysis', positions: 16, executed: 14, success: 280, failed: 11, pending: 10, workload: 68 },
  { department: 'Design & Creative', positions: 14, executed: 12, success: 245, failed: 8, pending: 6, workload: 64 },
  { department: 'Technology & AgentOps', positions: 24, executed: 22, success: 210, failed: 5, pending: 4, workload: 58 },
  { department: 'Operations & Delivery', positions: 18, executed: 16, success: 195, failed: 4, pending: 3, workload: 52 },
  { department: 'Analytics & Intelligence', positions: 19, executed: 17, success: 180, failed: 3, pending: 2, workload: 48 },
  { department: 'Independent Assurance', positions: 20, executed: 18, success: 165, failed: 2, pending: 2, workload: 44 },
  { department: 'CEO Office & Strategy', positions: 6, executed: 5, success: 85, failed: 1, pending: 1, workload: 35 },
  { department: 'Finance & Administration', positions: 20, executed: 16, success: 145, failed: 2, pending: 2, workload: 40 }
]

// Project Report Detail matching Panel 4
export const projectReportDetails = {
  'PROJ-001': {
    id: 'PROJ-001',
    name: 'City Care Multispeciality Hospital',
    client: 'City Care Hospital',
    industry: 'Healthcare',
    location: 'Hyderabad, IN',
    clientSince: '20 Oct 2026',
    startDate: '01 Oct 2026',
    targetDate: '30 Dec 2026',
    status: 'Active',
    description: 'Multi-speciality hospital with focus on preventive care, maternal health and community outreach in Telangana and Andhra Pradesh.',
    owner: 'R. Iyer',
    progress: 68,
    tasksCompleted: 12,
    tasksTotal: 18,
    positionsActive: 8,
    pendingApprovals: 4,
    deliverablesCount: 6,
    executionsCount: 156,
    departmentCompletion: [
      { department: 'Marketing & Content', completed: 8, total: 10, percent: 80 },
      { department: 'Design & Creative', completed: 6, total: 8, percent: 75 },
      { department: 'Client Operations', completed: 5, total: 8, percent: 62 },
      { department: 'Sales', completed: 3, total: 6, percent: 50 },
      { department: 'Research & Analysis', completed: 4, total: 7, percent: 57 }
    ]
  }
}

// ------------------------------------------------------------------------------
// HELPER LOOKUP FUNCTIONS
// ------------------------------------------------------------------------------
export function getExecutionById(id, list = initialExecutionHistory) {
  if (!id) return null
  const clean = String(id).trim().toLowerCase()
  return (
    list.find(
      (e) =>
        e.id.toLowerCase() === clean ||
        e.executionId?.toLowerCase() === clean ||
        e.id.replace('EXEC-', '').toLowerCase() === clean.replace('exec-', '')
    ) || list[0]
  )
}

export function getPositionComplianceById(id, map = positionComplianceProfiles) {
  if (!id) return map['POS-023']
  const clean = String(id).trim().toUpperCase()
  return map[clean] || {
    id: clean,
    positionId: clean,
    title: clean.startsWith('POS-') ? `Logical Position (${clean})` : clean,
    department: 'Operations',
    authorityLevel: 'Standard',
    independentEvaluator: 'QA-Audit-01',
    roleConfigVersion: 'v2.1',
    model: 'llama3.1:8b',
    status: 'Compliant',
    purpose: 'Execute assigned workflow responsibilities under governed authority controls.',
    toolPermissions: ['Document read', 'Internal data query'],
    complianceStatus: 'Compliant',
    lastEvaluation: '29 Oct 2026, 10:00',
    nextReview: '05 Nov 2026',
    openViolations: 0,
    recentEvaluations: [
      { date: '29 Oct 2026', status: 'Passed', notes: 'Evaluation confirmed adherence to role specification.' }
    ]
  }
}

export function getProjectReportById(id, map = projectReportDetails) {
  if (!id) return map['PROJ-001']
  const clean = String(id).trim().toUpperCase()
  return map[clean] || map['PROJ-001']
}
