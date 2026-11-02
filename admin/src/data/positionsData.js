// Centralized 194 Positions Detailed Workflow Data
import { positions, positionById } from './positions'
import { departments, deptById } from './departments'
import { departmentMetrics } from './departmentData'

// Standardized 5-Level Authority System (Requirement 2)
export const authorityLevelMap = {
  A: {
    level: 'Level 1',
    label: 'Level 1 — Read / Analyse',
    short: 'Read / Analyse',
    desc: 'Can inspect assigned information, analyze structured signals, and detect trends. Cannot make changes to external systems.',
    canDo: 'Read authorized datasets, query analytics feeds, summarize campaign metrics, verify schema syntax, and compile analytical findings.',
    cannotDo: 'Cannot write to client production databases, cannot alter contracts or budgets, and cannot communicate with external parties directly.',
    approvalReq: 'Access to cross-tenant healthcare records or external scraping outside permitted whitelist.',
    externalEffects: 'None. Purely analytical / read-only.',
    color: 'sky',
    badgeClass: 'bg-sky-50 text-sky-700 ring-sky-200'
  },
  B: {
    level: 'Level 2',
    label: 'Level 2 — Draft / Recommend',
    short: 'Draft / Recommend',
    desc: 'Can prepare drafts, proposals, creative assets, and recommendations for review. Requires approval before external execution.',
    canDo: 'Draft post copies, create visual asset briefs, generate email sequences, formulate campaign plans, and recommend budget reallocations.',
    cannotDo: 'Cannot publish live campaigns, cannot execute financial transactions, and cannot sign customer agreements independently.',
    approvalReq: 'All generated drafts must pass QA evaluator gate (GOV) and department lead review before publishing.',
    externalEffects: 'No direct external side effects until human or lead approval gate passes.',
    color: 'indigo',
    badgeClass: 'bg-indigo-50 text-indigo-700 ring-indigo-200'
  },
  C: {
    level: 'Level 3',
    label: 'Level 3 — Internal Action',
    short: 'Internal Action',
    desc: 'Can perform permitted internal tasks and update authorized internal workflow records within assigned boundaries.',
    canDo: 'Assign internal workflow tasks, transition project stages, update telemetry records, and route deliverables between team roles.',
    cannotDo: 'Cannot modify client billing rates, cannot delete database clusters, and cannot bypass mandatory QA gates.',
    approvalReq: 'Workflow exception overrides, priority escalations, or inter-department handoff rejections.',
    externalEffects: 'None. Confined strictly to internal database state machines and orchestration pipelines.',
    color: 'teal',
    badgeClass: 'bg-teal-50 text-teal-700 ring-teal-200'
  },
  D: {
    level: 'Level 4',
    label: 'Level 4 — External Side Effect',
    short: 'External Side Effect',
    desc: 'Can initiate or perform actions that affect external systems or people, subject to budget caps and connector checks.',
    canDo: 'Publish pre-approved social media content, schedule email broadcasts, and adjust live ad spend bids within pre-approved ±10% caps.',
    cannotDo: 'Cannot exceed hard spend limits, cannot modify client contract terms, and cannot delete external ad accounts.',
    approvalReq: 'Connecting new external integrations, modifying pre-approved campaign assets, or budget escalations exceeding $500.',
    externalEffects: 'Direct API mutations on live external platforms (Meta Ads, Google Ads, LinkedIn Campaign Manager).',
    color: 'amber',
    badgeClass: 'bg-amber-50 text-amber-700 ring-amber-200'
  },
  E: {
    level: 'Level 5',
    label: 'Level 5 — Reserved Human Decision',
    short: 'Reserved Human Decision',
    desc: 'Legal signature, clinical sign-off, major commercial commitment or actual payment. AI agents can only prepare recommendations.',
    canDo: 'Prepare structured decision briefs, compile compliance checklists, and surface risk summaries for executive human sign-off.',
    cannotDo: 'Autonomous execution strictly prohibited by system governance policies.',
    approvalReq: 'Mandatory human leadership physical or digital signature with multi-factor authentication.',
    externalEffects: 'High-impact contractual, legal, medical, or financial consequence.',
    color: 'rose',
    badgeClass: 'bg-rose-50 text-rose-700 ring-rose-200'
  }
}

export function getAuthorityDisplay(authCode) {
  return authorityLevelMap[authCode] || authorityLevelMap.A
}

// ----------------------------------------------------
// DEDICATED SEED DATA FOR MKT-009 (Social (Brand) Media Manager)
// (Matches UI reference image panels 1, 2, 3, 4)
// ----------------------------------------------------
export const MKT_009_DATA = {
  positionId: 'MKT-009',
  samAgId: 'SAM-AG-028',
  title: 'Social (Brand) Media Manager',
  deptId: 'MKT',
  authority: 'A',
  status: 'active',
  version: '1.0',
  model: 'Gemini 1.5 Pro',
  temperature: 0.3,
  evaluator: 'GOV-002 (Output Quality & Competency Evaluator)',
  workload: {
    activeProjects: 3,
    completedProjects: 12,
    assignedTasks: 8,
    waitingReview: 2,
    blockedTasks: 0,
    totalCompletedTasks: 47
  },
  responsibilities: [
    'Architect and schedule multi-platform organic and paid social content calendars across Instagram, LinkedIn, and YouTube Shorts.',
    'Synthesize healthcare clinical briefs and research findings into engaging, audience-tailored post concepts, hooks, and carousels.',
    'Enforce healthcare claims compliance by verifying all medical assertions against authorized clinical source materials.',
    'Coordinate asset handoffs with CRT-004 (Visual Asset Designer) and track deliverable production velocity.',
    'Submit completed draft packages to GOV-002 (Quality & Competency Evaluator) and address review rubrics promptly.'
  ],
  inputOverview: 'Clinical briefs, brand design kits, audience demographic reports, approved campaign strategy decks.',
  outputOverview: 'Bilingual social calendars, post copies with hooks/CTAs, visual briefs, clinical citation logs.',
  tools: ['task.read', 'output.write', 'draft.write', 'evidence.attach', 'data.read'],
  
  // 3 ACTIVE PROJECTS
  activeProjects: [
    {
      id: 'PRJ-2026-001',
      name: 'Cardiac Awareness Campaign',
      client: 'City Care Hospital',
      roleInProject: 'Social Campaign & Channel Lead',
      status: 'In Progress',
      currentStage: 'Stage 4 · Creative Asset Production',
      stageNumber: 4,
      startDate: '2026-10-18',
      deadline: '2026-11-04',
      deadlineDays: '6 days remaining',
      progress: 68,
      objective: 'Drive multi-channel cardiac preventive care awareness across metro demographics with high-engagement educational content.',
      milestones: [
        { name: 'Stage 1 · Clinical Discovery & Briefing', status: 'completed' },
        { name: 'Stage 2 · Audience Segmentation & Strategy', status: 'completed' },
        { name: 'Stage 3 · Content Calendar & Copy Architecture', status: 'completed' },
        { name: 'Stage 4 · Creative Asset & Video Production', status: 'current' },
        { name: 'Stage 5 · QA & Medical Claims Verification', status: 'pending' },
        { name: 'Stage 6 · Multi-Channel Publishing & Staging', status: 'pending' }
      ],
      inputs: [
        {
          id: 'INP-009-1',
          item: 'Clinical Brief — Cardiac Symptoms Guide v2',
          source: 'CEX-005 (Requirements & Brief Intake Specialist)',
          receivedOn: '2026-10-20',
          status: 'Verified',
          schema: 'schema.v2.clinical_brief',
          details: 'Comprehensive clinical protocol outlining early warning signs of acute coronary syndrome, target demographics (35-55 age bracket), and required hospital emergency helpline CTAs.'
        },
        {
          id: 'INP-009-2',
          item: 'Brand Design Kit & Typography Rules',
          source: 'CRT-001 (Creative Lead)',
          receivedOn: '2026-10-21',
          status: 'Verified',
          schema: 'schema.v1.brand_token',
          details: 'Official hospital color tokens (#0F766E Teal, #DC2626 Crimson), approved font pairing (Inter + Merriweather), emergency hotline badge specifications, and 4:5 Instagram carousel layout grids.'
        },
        {
          id: 'INP-009-3',
          item: 'Target Audience Demographic Insights',
          source: 'DAT-004 (Analytics Specialist)',
          receivedOn: '2026-10-22',
          status: 'Verified',
          schema: 'schema.v3.analytics_feed',
          details: 'Engagement analysis indicating highest response to relatable real-patient symptom checklists between 7:00 PM and 9:30 PM on Instagram, with 42% higher retention on bite-sized educational graphics.'
        }
      ],
      workPerformed: {
        steps: [
          'Synthesized clinical cardiac risk factors into 12 carousel themes focusing on preventive lifestyle checks.',
          'Formulated 4-week multi-platform social calendar (Instagram, LinkedIn, YouTube Shorts) aligned with client target KPIs.',
          'Generated 24 bilingual copy variants with clear symptom call-outs and hospital triage contact points.',
          'Attached medical source citations (AHA & Indian Heart Association guidelines) to every clinical statement.',
          'Ran automated claims compliance check against clinical banned terminology list with 100% pass rate.'
        ],
        status: 'Completed',
        completedOn: '2026-10-24 16:30',
        nextStep: 'GOV-002 Output Quality Evaluator Review'
      },
      outputs: [
        {
          id: 'OUT-009-1',
          item: 'Cardiac Awareness 4-Week Social Calendar',
          type: 'Content Schedule',
          createdOn: '2026-10-24',
          status: 'Draft Ready',
          nextRecipient: 'GOV-002 Evaluator',
          approval: 'Yes',
          details: 'Complete 28-day calendar specifying publish times, platform variants, caption copy, hashtag clusters (#HeartHealth #CardiologyCare), and linked visual asset placeholders.'
        },
        {
          id: 'OUT-009-2',
          item: '12 Carousel Copy Drafts + Visual Hooks',
          type: 'Copy & Visual Brief',
          createdOn: '2026-10-24',
          status: 'Draft Ready',
          nextRecipient: 'CRT-004 Visual Designer',
          approval: 'No',
          details: 'Structured multi-slide copy drafts with hook headlines, symptom diagnostic checklists, lifestyle recommendations, and clear emergency consultation prompts.'
        },
        {
          id: 'OUT-009-3',
          item: 'Hashtag Strategy & Clinical Citations Log',
          type: 'Citation Audit Log',
          createdOn: '2026-10-24',
          status: 'Verified',
          nextRecipient: 'MKT-016 Style Guardian',
          approval: 'No',
          details: 'Traceability matrix mapping every public healthcare recommendation to peer-reviewed cardiology literature with permanent DOI links and validation checksums.'
        }
      ],
      feedback: {
        evaluator: 'GOV-002 (Output Quality & Competency Evaluator)',
        rubric: 'RUBRIC-MKT-V2.4 (Healthcare Brand & Engagement)',
        score: '9.4 / 10',
        status: 'Approved for Creative Staging',
        reviewDate: '2026-10-25 11:20',
        comments: 'High engagement hooks with verified healthcare claims. Clinical terminology accurate to AHA standards. Approved to hand off to CRT-004 for final asset production.'
      },
      handoffs: [
        { stage: 'Intake & Briefing', from: 'CEX-005 (Intake Specialist)', to: 'MKT-001 (Brand Lead)', time: '2026-10-20 09:30', status: 'Completed' },
        { stage: 'Campaign Orchestration', from: 'MKT-001 (Brand Lead)', to: 'MKT-009 (Social Media Manager)', time: '2026-10-22 14:00', status: 'Completed' },
        { stage: 'Creative Production', from: 'MKT-009 (Social Media Manager)', to: 'CRT-004 (Visual Designer)', time: '2026-10-24 17:00', status: 'Completed' },
        { stage: 'QA / Assurance Review', from: 'MKT-009 (Social Media Manager)', to: 'GOV-002 (Output Evaluator)', time: '2026-10-25 09:00', status: 'In Review' },
        { stage: 'Client Approval Gate', from: 'GOV-002 (Output Evaluator)', to: 'CEX-002 (Account Coordinator)', time: 'Scheduled (2026-10-31)', status: 'Pending' }
      ]
    },
    {
      id: 'PRJ-2026-002',
      name: 'Maternity Service Promotion',
      client: 'Nirvaan Wellness',
      roleInProject: 'Multi-Platform Distribution Specialist',
      status: 'In Progress',
      currentStage: 'Stage 3 · Strategy Approval',
      stageNumber: 3,
      startDate: '2026-10-22',
      deadline: '2026-11-12',
      deadlineDays: '14 days remaining',
      progress: 45,
      objective: 'Drive prospective parent engagement for premium maternity suites and prenatal wellness workshops.',
      milestones: [
        { name: 'Stage 1 · Client Intake & Package Scope', status: 'completed' },
        { name: 'Stage 2 · Tone Matrix & Demographic Target', status: 'completed' },
        { name: 'Stage 3 · Creative Concept & Hook Development', status: 'current' },
        { name: 'Stage 4 · Video Storyboard & Ad Copy Staging', status: 'pending' },
        { name: 'Stage 5 · Client Executive Sign-off Gate', status: 'pending' }
      ],
      inputs: [
        {
          id: 'INP-009-4',
          item: 'Maternity Package Offer Specs & Brochure',
          source: 'CEX-002 (Account Manager)',
          receivedOn: '2026-10-22',
          status: 'Verified',
          schema: 'schema.v1.product_spec',
          details: 'Details on prenatal physiotherapy, private birthing suites, lactation counseling, and pediatric care packages.'
        },
        {
          id: 'INP-009-5',
          item: 'Patient Testimonial Excerpts (Consented)',
          source: 'CEX-006 (Client Communications)',
          receivedOn: '2026-10-23',
          status: 'Verified',
          schema: 'schema.v1.consent_record',
          details: 'Four written quotes and video snippets from recent mothers highlighting nurse empathy and luxury room amenities.'
        }
      ],
      workPerformed: {
        steps: [
          'Analyzed postpartum wellness search trends and parent concerns in urban metro centers.',
          'Drafted 6 Instagram Reel concepts with relatable expectant-mother narrative hooks.',
          'Created comparison infographics contrasting standard hospital delivery vs comprehensive maternity suites.',
          'Submitted drafts to CEX-002 for client portal staging.'
        ],
        status: 'In Progress',
        completedOn: 'In Progress',
        nextStep: 'Complete Reel Script Storyboards'
      },
      outputs: [
        {
          id: 'OUT-009-4',
          item: 'Prenatal Care Instagram Reels Concepts (6x)',
          type: 'Video Script Package',
          createdOn: '2026-10-26',
          status: 'Draft Ready',
          nextRecipient: 'CRT-008 (Video Producer)',
          approval: 'Yes',
          details: 'Scripts featuring expectant mother Q&As, obstetrician voiceovers, and gentle calming visual background cues.'
        }
      ],
      feedback: {
        evaluator: 'GOV-002 (Output Quality & Competency Evaluator)',
        rubric: 'RUBRIC-MKT-V2.4 (Healthcare Brand & Engagement)',
        score: '9.1 / 10',
        status: 'Revisions Suggested',
        reviewDate: '2026-10-27 15:40',
        comments: 'Strong emotional resonance. Recommend adding accredited obstetrician certification badge on slide 3.'
      },
      handoffs: [
        { stage: 'Briefing', from: 'CEX-002', to: 'MKT-009', time: '2026-10-22 10:00', status: 'Completed' },
        { stage: 'Scripting', from: 'MKT-009', to: 'CRT-008', time: '2026-10-26 14:30', status: 'In Progress' }
      ]
    },
    {
      id: 'PRJ-2026-007',
      name: 'Arogya Brand Relaunch',
      client: 'Arogya Centre',
      roleInProject: 'Social Launch Manager',
      status: 'In Progress',
      currentStage: 'Stage 6 · Launch Staging',
      stageNumber: 6,
      startDate: '2026-10-15',
      deadline: '2026-11-20',
      deadlineDays: '22 days remaining',
      progress: 80,
      objective: 'Holistic brand repositioning across digital channels highlighting ayurvedic wellness and modern diagnostics.',
      milestones: [
        { name: 'Stage 1 · Brand Legacy & Archetype Definition', status: 'completed' },
        { name: 'Stage 2 · Visual Identity & Logo Guidelines', status: 'completed' },
        { name: 'Stage 3 · Editorial Pillars & Doctor Video Prompts', status: 'completed' },
        { name: 'Stage 4 · 14-Day Launch Blitz Schedule', status: 'completed' },
        { name: 'Stage 5 · Community & Influencer Seeding', status: 'current' },
        { name: 'Stage 6 · Nationwide Digital Launch Blitz', status: 'pending' }
      ],
      inputs: [
        {
          id: 'INP-009-6',
          item: 'Brand Relaunch Guidelines & Tone Matrix',
          source: 'MKT-001 (Brand Lead)',
          receivedOn: '2026-10-15',
          status: 'Verified',
          schema: 'schema.v2.brand_matrix',
          details: 'Tone guidelines: grounded, authentic, science-backed ayurveda. Banned: pseudoscientific miracle claims.'
        }
      ],
      workPerformed: {
        steps: [
          'Structured 14-day countdown teaser campaign for Instagram and YouTube.',
          'Assembled doctor interview soundbites highlighting botanical purity testing standards.',
          'Finalized launch day live-stream run of show with guest integrative medicine practitioners.'
        ],
        status: 'Completed',
        completedOn: '2026-10-21 17:00',
        nextStep: 'Final Staging & Channel Authorization'
      },
      outputs: [
        {
          id: 'OUT-009-5',
          item: 'Launch Countdown Social Blitz Plan (14 Days)',
          type: 'Campaign Roadmap',
          createdOn: '2026-10-21',
          status: 'Approved',
          nextRecipient: 'MKT-003 (Demand Gen Campaign Manager)',
          approval: 'Yes',
          details: 'Daily post sequence with high-resolution imagery of herbal extraction, doctor profiles, and early bird consultation discounts.'
        }
      ],
      feedback: {
        evaluator: 'GOV-002 (Output Quality & Competency Evaluator)',
        rubric: 'RUBRIC-MKT-V2.4 (Healthcare Brand & Engagement)',
        score: '9.6 / 10',
        status: 'Approved',
        reviewDate: '2026-10-23 09:15',
        comments: 'Superb brand positioning. Authentic Ayurvedic heritage coupled with clinical credibility.'
      },
      handoffs: [
        { stage: 'Strategy', from: 'MKT-001', to: 'MKT-009', time: '2026-10-15 11:00', status: 'Completed' },
        { stage: 'Execution', from: 'MKT-009', to: 'MKT-003', time: '2026-10-21 17:30', status: 'Completed' }
      ]
    }
  ],

  // 12 COMPLETED PROJECTS
  completedProjects: [
    {
      id: 'PRJ-CMP-001',
      name: 'Dental Care Awareness Campaign',
      client: 'Apex Dental Clinic',
      startDate: '2026-09-15',
      completedDate: '2026-10-10',
      finalOutput: '16 Social Carousels + Lead Magnet Copy on invisible aligners and pediatric caries prevention.',
      feedbackScore: '9.6 / 10',
      evaluator: 'GOV-002',
      status: 'Completed'
    },
    {
      id: 'PRJ-CMP-002',
      name: 'Diabetes Education Series',
      client: 'City Care Hospital',
      startDate: '2026-09-01',
      completedDate: '2026-09-28',
      finalOutput: '8 Infographic Post Sets explaining HbA1c target levels and glycemic index meal preparation.',
      feedbackScore: '9.2 / 10',
      evaluator: 'GOV-002',
      status: 'Completed'
    },
    {
      id: 'PRJ-CMP-003',
      name: 'Festival Health Package Ads',
      client: 'Nirvaan Wellness',
      startDate: '2026-08-20',
      completedDate: '2026-09-15',
      finalOutput: 'Diwali Wellness Campaign copy and Meta carousel ads with bundled executive checkup coupons.',
      feedbackScore: '9.5 / 10',
      evaluator: 'GOV-002',
      status: 'Completed'
    },
    {
      id: 'PRJ-CMP-004',
      name: 'Orthopedic Joint Health Webinar Promo',
      client: 'Apollo Reach',
      startDate: '2026-08-05',
      completedDate: '2026-08-30',
      finalOutput: 'Multi-platform live webinar registration drive with video teasers and email reminder sequences.',
      feedbackScore: '9.1 / 10',
      evaluator: 'GOV-002',
      status: 'Completed'
    },
    {
      id: 'PRJ-CMP-005',
      name: 'Pediatric Nutrition Q&A Carousel Series',
      client: 'Fortis Child Care',
      startDate: '2026-07-22',
      completedDate: '2026-08-14',
      finalOutput: '10 Q&A Cards with pediatrician endorsements answering common infant weanling nutrition queries.',
      feedbackScore: '9.8 / 10',
      evaluator: 'GOV-002',
      status: 'Completed'
    },
    {
      id: 'PRJ-CMP-006',
      name: 'Senior Citizen Health Checkup Blitz',
      client: 'Max Healthcare',
      startDate: '2026-07-01',
      completedDate: '2026-07-29',
      finalOutput: 'Facebook and WhatsApp community outreach copy for subsidized geriatric screening camps.',
      feedbackScore: '9.3 / 10',
      evaluator: 'GOV-002',
      status: 'Completed'
    },
    {
      id: 'PRJ-CMP-007',
      name: 'Eye Wellness World Sight Day Posts',
      client: 'Narayana Nethra',
      startDate: '2026-06-18',
      completedDate: '2026-07-12',
      finalOutput: 'Visual Hook scripts and infographics on computer vision syndrome and 20-20-20 rule.',
      feedbackScore: '9.0 / 10',
      evaluator: 'GOV-002',
      status: 'Completed'
    },
    {
      id: 'PRJ-CMP-008',
      name: 'Mental Wellbeing Mindful Hours Campaign',
      client: 'Vimhans Care',
      startDate: '2026-06-01',
      completedDate: '2026-06-25',
      finalOutput: 'Audio-visual storyboards, guided breathing graphics, and therapist booking links.',
      feedbackScore: '9.7 / 10',
      evaluator: 'GOV-002',
      status: 'Completed'
    },
    {
      id: 'PRJ-CMP-009',
      name: 'Cardio Screening Camp Social Drive',
      client: 'Manipal Hospitals',
      startDate: '2026-05-15',
      completedDate: '2026-06-08',
      finalOutput: 'Regional language social posts (Kannada, Hindi, English) with clinic location maps.',
      feedbackScore: '9.4 / 10',
      evaluator: 'GOV-002',
      status: 'Completed'
    },
    {
      id: 'PRJ-CMP-010',
      name: 'Sports Injury Clinic Launch',
      client: 'Kims Health',
      startDate: '2026-04-28',
      completedDate: '2026-05-20',
      finalOutput: 'Athlete feature reels and sports physiotherapy package promotion series.',
      feedbackScore: '9.5 / 10',
      evaluator: 'GOV-002',
      status: 'Completed'
    },
    {
      id: 'PRJ-CMP-011',
      name: "Women's Health Checkup Promotion",
      client: 'Cloudnine Care',
      startDate: '2026-04-10',
      completedDate: '2026-05-02',
      finalOutput: 'Breast cancer awareness self-exam guide and mammogram screening discount carousels.',
      feedbackScore: '9.6 / 10',
      evaluator: 'GOV-002',
      status: 'Completed'
    },
    {
      id: 'PRJ-CMP-012',
      name: 'Skin Care Dermatology Outreach',
      client: 'Kaya Skin Clinic',
      startDate: '2026-03-25',
      completedDate: '2026-04-18',
      finalOutput: 'Monsoon skin care routine carousel and doctor Q&A stories on acne scar revision treatments.',
      feedbackScore: '9.2 / 10',
      evaluator: 'GOV-002',
      status: 'Completed'
    }
  ],

  // 8 ASSIGNED TASKS IN QUEUE
  tasks: [
    {
      id: 'TSK-MKT-0841',
      project: 'Cardiac Awareness Campaign',
      title: 'Draft 4-Week Social Calendar for Cardiac Awareness',
      priority: 'High',
      startDate: '2026-10-22',
      dueDate: '2026-10-25',
      status: 'In Review',
      nextRole: 'GOV-002 (Output Evaluator)',
      description: 'Develop structured 28-day posting cadence with symptom hooks, emergency CTAs, and verified clinical citations for City Care Hospital.',
      inputArtifacts: ['Clinical Brief v2', 'Hospital Brand Kit'],
      logs: 'Completed 28 drafts; schema validation score 100%; forwarded to GOV-002 for rubric evaluation.'
    },
    {
      id: 'TSK-MKT-0842',
      project: 'Cardiac Awareness Campaign',
      title: 'Clinical Citation Compliance Check on Post Copy',
      priority: 'High',
      startDate: '2026-10-23',
      dueDate: '2026-10-25',
      status: 'Completed',
      nextRole: 'CRT-004 (Visual Designer)',
      description: 'Cross-reference every cardiac claim against AHA guideline DOIs and produce verified citation audit log.',
      inputArtifacts: ['Draft Social Calendar', 'AHA Guidelines 2026'],
      logs: 'Verified 14 unique medical statements. Zero unsupported claims detected. Passed compliance audit.'
    },
    {
      id: 'TSK-MKT-0843',
      project: 'Cardiac Awareness Campaign',
      title: 'Coordinate Visual Layout with Creative Studio',
      priority: 'Medium',
      startDate: '2026-10-25',
      dueDate: '2026-10-28',
      status: 'In Progress',
      nextRole: 'CRT-004 (Visual Designer)',
      description: 'Handoff visual hook specifications, copy lengths, and emergency icon placement rules to CRT-004 designer.',
      inputArtifacts: ['Approved Copy Drafts', 'Design Token Specifications'],
      logs: 'Sent Figma layout brief to CRT-004. First 4 carousel drafts in production.'
    },
    {
      id: 'TSK-MKT-0844',
      project: 'Maternity Service Promotion',
      title: 'Reel Concept Scripting for Maternity Suite Tour',
      priority: 'Medium',
      startDate: '2026-10-26',
      dueDate: '2026-10-30',
      status: 'In Progress',
      nextRole: 'CRT-008 (Video Producer)',
      description: 'Script 3 short-form video tours highlighting prenatal suites, nursing care, and calm delivery rooms.',
      inputArtifacts: ['Maternity Suite Specs', 'Consented Testimonials'],
      logs: 'Script 1 & 2 drafted. Awaiting feedback from CEX-002 on obstetrician availability.'
    },
    {
      id: 'TSK-MKT-0845',
      project: 'Maternity Service Promotion',
      title: 'Channel Audience Distribution Mapping',
      priority: 'Normal',
      startDate: '2026-10-27',
      dueDate: '2026-11-02',
      status: 'In Progress',
      nextRole: 'DAT-004 (Analytics Specialist)',
      description: 'Align maternity target demographics with Meta Ads pixel cohorts for expectant mothers in high-income postal codes.',
      inputArtifacts: ['Audience Persona Brief', 'Historical Campaign CTRs'],
      logs: 'Demographic clusters mapped with 92% confidence score.'
    },
    {
      id: 'TSK-MKT-0846',
      project: 'Arogya Brand Relaunch',
      title: 'Social Teaser Copy for Arogya Rebranding Blitz',
      priority: 'High',
      startDate: '2026-10-24',
      dueDate: '2026-11-05',
      status: 'In Progress',
      nextRole: 'MKT-003 (Demand Gen Campaign Manager)',
      description: 'Draft 7-day teaser sequence teasing modern Ayurvedic diagnostics and ancient botanical formulation purity.',
      inputArtifacts: ['Brand Tone Matrix', 'Historical Archive Photos'],
      logs: 'Teaser copy variants 1-4 ready for lead review.'
    },
    {
      id: 'TSK-MKT-0847',
      project: 'Arogya Brand Relaunch',
      title: 'Community Engagement Q&A Repository Assembly',
      priority: 'Normal',
      startDate: '2026-10-28',
      dueDate: '2026-11-08',
      status: 'In Progress',
      nextRole: 'MKT-015 (Community Manager)',
      description: 'Prepare pre-approved FAQ responses for common questions regarding Panchakarma duration, dietary guidelines, and consultation pricing.',
      inputArtifacts: ['Doctor Consultation Handbook'],
      logs: '32 standard questions cataloged with doctor-verified answers.'
    },
    {
      id: 'TSK-MKT-0848',
      project: 'Arogya Brand Relaunch',
      title: 'Post-Launch Performance KPI Dashboard Setup',
      priority: 'Normal',
      startDate: '2026-11-01',
      dueDate: '2026-11-12',
      status: 'In Progress',
      nextRole: 'MKT-011 (Analytics Specialist)',
      description: 'Define tracking parameters, UTM taxonomy, and daily conversion targets for relaunch campaign.',
      inputArtifacts: ['Campaign Measurement Framework'],
      logs: 'UTM taxonomy validated with Google Analytics 4 integration.'
    }
  ],

  // ACTIVITY HISTORY AUDIT LOG
  activityHistory: [
    {
      id: 'EVT-001',
      act: 'OUTPUT_EVALUATED',
      type: 'Evaluation',
      project: 'Cardiac Awareness Campaign',
      detail: 'Evaluator GOV-002 scored deliverable "Cardiac Social Calendar" 9.4/10 on versioned rubric. Approved for creative staging.',
      time: 'Today 14:10',
      actor: 'GOV-002',
      tone: 'emerald'
    },
    {
      id: 'EVT-002',
      act: 'HANDOFF_DISPATCHED',
      type: 'Handoff',
      project: 'Cardiac Awareness Campaign',
      detail: 'Transferred 12 visual hook briefs and carousel copy packages to CRT-004 (Visual Asset Designer).',
      time: 'Today 11:30',
      actor: 'MKT-009',
      tone: 'indigo'
    },
    {
      id: 'EVT-003',
      act: 'DRAFT_GENERATED',
      type: 'Execution',
      project: 'Cardiac Awareness Campaign',
      detail: 'Completed 4-week bilingual content calendar schema validation with zero compliance errors.',
      time: 'Yesterday 16:45',
      actor: 'MKT-009',
      tone: 'sky'
    },
    {
      id: 'EVT-004',
      act: 'TASK_ASSIGNED',
      type: 'Task',
      project: 'Maternity Service Promotion',
      detail: 'Assigned task TSK-MKT-0844: Reel Concept Scripting for Maternity Suite Tour.',
      time: '26 Oct 2026 10:15',
      actor: 'MKT-001',
      tone: 'purple'
    },
    {
      id: 'EVT-005',
      act: 'BRIEF_INGESTED',
      type: 'Intake',
      project: 'Cardiac Awareness Campaign',
      detail: 'Received upstream strategy brief package from MKT-001 (Brand & Demand Lead) for Cardiac Awareness Campaign.',
      time: '22 Oct 2026 14:00',
      actor: 'MKT-001',
      tone: 'slate'
    },
    {
      id: 'EVT-006',
      act: 'EVALUATION_PASSED',
      type: 'Evaluation',
      project: 'Dental Care Awareness Campaign',
      detail: 'Completed project milestone sign-off for Apex Dental Clinic. Overall client satisfaction rating 9.6/10.',
      time: '10 Oct 2026 18:20',
      actor: 'GOV-002',
      tone: 'emerald'
    },
    {
      id: 'EVT-007',
      act: 'ROLE_DEPLOYED',
      type: 'System',
      project: 'Samrudhi Platform',
      detail: 'Role configuration v1.0 initialized in production runtime workspace with Gemini 1.5 Pro.',
      time: '15 Oct 2026 09:00',
      actor: 'TEC-001',
      tone: 'indigo'
    }
  ],

  // DEPENDENCIES (Requirement 9 & 11)
  dependencies: {
    upstream: [
      {
        positionId: 'MKT-001',
        title: 'Brand & Demand Lead',
        deptId: 'MKT',
        authority: 'C',
        relationship: 'Provides Approved Strategy & Campaign Scope',
        artifact: 'Campaign Brief & Target Demographics'
      },
      {
        positionId: 'MKT-013',
        title: 'Content Calendar & Editorial Planner',
        deptId: 'MKT',
        authority: 'B',
        relationship: 'Provides Channel Cadence & Publishing Slots',
        artifact: 'Editorial Schedule & Theme Pillars'
      },
      {
        positionId: 'CEX-005',
        title: 'Requirements & Brief Intake Specialist',
        deptId: 'CEX',
        authority: 'B',
        relationship: 'Supplies Verified Client Clinical Materials',
        artifact: 'Clinical Symptom Protocol & Brand Kit'
      }
    ],
    current: {
      positionId: 'MKT-009',
      title: 'Social (Brand) Media Manager',
      deptId: 'MKT',
      authority: 'A',
      coreTransform: 'Synthesizes clinical specs into compliant, high-retention multi-platform social calendar drafts and visual hooks.'
    },
    downstream: [
      {
        positionId: 'CRT-004',
        title: 'Visual Asset Designer',
        deptId: 'CRT',
        authority: 'B',
        relationship: 'Receives Copy Drafts & Visual Hooks',
        artifact: 'Carousel Grids & Emergency Hotline Badges'
      },
      {
        positionId: 'GOV-002',
        title: 'Output Quality & Competency Evaluator',
        deptId: 'GOV',
        authority: 'A',
        relationship: 'Evaluates Healthcare Claims & Citation Integrity',
        artifact: 'Quality Rubric Scoring & Sign-off'
      },
      {
        positionId: 'MKT-016',
        title: 'Brand Compliance & Style Guardian',
        deptId: 'MKT',
        authority: 'B',
        relationship: 'Verifies Logo Usage & Tone Compliance',
        artifact: 'Brand Guideline Audit Clearance'
      }
    ]
  },

  // SETTINGS & AUTONOMOUS POLICIES
  settings: {
    model: 'Gemini 1.5 Pro (Recommended)',
    temperature: 0.3,
    maxTokens: 4096,
    timeout: 180,
    retries: 3,
    evaluatorRubric: 'RUBRIC-MKT-V2.4 (Healthcare Brand & Engagement)',
    toolPermissions: [
      { name: 'task.read', enabled: true, core: true, desc: 'Read assigned task instructions and context' },
      { name: 'output.write', enabled: true, core: true, desc: 'Write output records to project workspace' },
      { name: 'draft.write', enabled: true, core: false, desc: 'Generate draft social media copies and calendars' },
      { name: 'evidence.attach', enabled: true, core: false, desc: 'Attach citation DOIs and source clinical documents' },
      { name: 'data.read', enabled: true, core: false, desc: 'Query authorized audience analytics data feeds' },
      { name: 'connector.publish', enabled: false, core: false, desc: 'Direct live publishing (Restricted by Level 1)' },
      { name: 'spend.adjust', enabled: false, core: false, desc: 'Adjust ad budget spend (Restricted by Level 1)' }
    ]
  }
}

// ----------------------------------------------------
// DYNAMIC GENERATOR FOR ALL 194 POSITIONS
// (Guarantees every single position has complete, realistic data)
// ----------------------------------------------------
export function getPositionDetail(positionId) {
  if (!positionId) return null
  const clean = String(positionId).toUpperCase().trim()
  if (clean === 'MKT-009' || clean === 'SAM-AG-028') {
    return MKT_009_DATA
  }

  const pos = positionById(clean)
  if (!pos) return null

  const dept = deptById(pos.deptId)
  const deptMetric = departmentMetrics[pos.deptId] || departmentMetrics.MKT
  const deptProjects = deptMetric.projects || []

  // Assigned active projects
  const isAct = pos.status === 'active'
  const isRev = pos.status === 'needs_review'
  const projCount = isAct ? Math.min(deptProjects.length, pos.isLead ? 3 : ((pos.positionId.charCodeAt(pos.positionId.length - 1) % 2) + 1)) : isRev ? 1 : 0

  const activeProjects = deptProjects.slice(0, projCount).map((p, i) => {
    return {
      id: p.id,
      name: p.name,
      client: p.client,
      roleInProject: `${pos.title} Lead`,
      status: isRev ? 'In Review' : p.status,
      currentStage: p.currentStage || 'Stage 4 · Asset Production',
      stageNumber: 4 + i,
      startDate: '2026-10-15',
      deadline: p.deadline,
      deadlineDays: `${5 + i * 4} days remaining`,
      progress: 50 + (i * 15),
      objective: p.description || `Execute ${pos.title} responsibilities for ${p.client}.`,
      milestones: [
        { name: 'Stage 1 · Discovery & Strategy Briefing', status: 'completed' },
        { name: 'Stage 2 · Scope Definition & Architecture', status: 'completed' },
        { name: 'Stage 3 · Draft Preparation & Tool Execution', status: isRev ? 'completed' : 'current' },
        { name: 'Stage 4 · QA Gate & Independent Evaluation', status: isRev ? 'current' : 'pending' },
        { name: 'Stage 5 · Final Sign-off & Delivery', status: 'pending' }
      ],
      inputs: [
        {
          id: `INP-${pos.positionId}-1`,
          item: `${p.name} Requirement Brief v1`,
          source: `${dept?.short || 'Dept'} Coordinator`,
          receivedOn: '2026-10-20',
          status: 'Verified',
          schema: 'schema.v2.brief',
          details: `Scope specification detailing inputs and acceptance criteria for ${pos.title}.`
        },
        {
          id: `INP-${pos.positionId}-2`,
          item: 'Quality & Governance Guidelines',
          source: 'GOV-002 Evaluator',
          receivedOn: '2026-10-21',
          status: 'Verified',
          schema: 'schema.v1.compliance',
          details: 'Mandatory clinical claims verification standards and tenant boundary rules.'
        }
      ],
      workPerformed: {
        steps: [
          `Analyzed assigned task inputs against ${pos.title} operational contract.`,
          'Generated structured draft according to versioned schema.',
          'Verified compliance with department authority boundaries.',
          'Prepared deliverable package for independent evaluation.'
        ],
        status: isRev ? 'In Review' : 'Completed',
        completedOn: '2026-10-25 15:30',
        nextStep: isRev ? 'Awaiting Evaluator Rubric Score' : 'Next Workflow Stage Handoff'
      },
      outputs: [
        {
          id: `OUT-${pos.positionId}-1`,
          item: `${pos.title} Deliverable Package`,
          type: 'Structured Record',
          createdOn: '2026-10-25',
          status: isRev ? 'In Review' : 'Draft Ready',
          nextRecipient: pos.evaluator,
          approval: pos.authority === 'D' || pos.authority === 'E' ? 'Yes' : 'No',
          details: `Structured output package produced by ${pos.positionId} (${pos.title}).`
        }
      ],
      feedback: {
        evaluator: pos.evaluator,
        rubric: `RUBRIC-${pos.deptId}-V1.0`,
        score: '9.3 / 10',
        status: isRev ? 'Under Review' : 'Approved',
        reviewDate: '2026-10-26 12:00',
        comments: `Deliverable satisfies schema specifications for ${pos.title}. High factual consistency.`
      },
      handoffs: [
        { stage: 'Briefing', from: `${pos.deptId}-001`, to: pos.positionId, time: '2026-10-20 09:00', status: 'Completed' },
        { stage: 'Execution', from: pos.positionId, to: pos.evaluator, time: '2026-10-25 16:00', status: 'Completed' },
        { stage: 'Quality Review', from: pos.evaluator, to: 'Downstream Consumer', time: '2026-10-26 12:30', status: isRev ? 'In Review' : 'Completed' }
      ]
    }
  })

  // Completed projects (4 to 8 projects)
  const completedProjects = [
    {
      id: `CMP-${pos.positionId}-1`,
      name: 'Q3 Enterprise Performance Optimization',
      client: 'Apex Health Systems',
      startDate: '2026-08-10',
      completedDate: '2026-09-18',
      finalOutput: `Structured deliverable package produced for ${pos.title} mandate.`,
      feedbackScore: '9.5 / 10',
      evaluator: pos.evaluator,
      status: 'Completed'
    },
    {
      id: `CMP-${pos.positionId}-2`,
      name: 'Omnichannel Engagement Sprint',
      client: 'Nirvaan Wellness',
      startDate: '2026-07-15',
      completedDate: '2026-08-05',
      finalOutput: 'Validated campaign specifications and compliance audit trails.',
      feedbackScore: '9.2 / 10',
      evaluator: pos.evaluator,
      status: 'Completed'
    },
    {
      id: `CMP-${pos.positionId}-3`,
      name: 'Digital Transformation Protocol v2',
      client: 'City Care Hospital',
      startDate: '2026-06-01',
      completedDate: '2026-07-01',
      finalOutput: 'Operational telemetry and structured execution schema.',
      feedbackScore: '9.7 / 10',
      evaluator: pos.evaluator,
      status: 'Completed'
    }
  ]

  // Workload metrics
  const workload = {
    activeProjects: activeProjects.length,
    completedProjects: isAct ? 12 : isRev ? 8 : 4,
    assignedTasks: isAct ? 6 + (pos.positionId.charCodeAt(pos.positionId.length - 1) % 4) : isRev ? 2 : 0,
    waitingReview: isRev ? 3 : isAct ? 1 : 0,
    blockedTasks: pos.status === 'error' ? 2 : 0,
    totalCompletedTasks: isAct ? 34 + (pos.positionId.charCodeAt(pos.positionId.length - 1) % 15) : 12
  }

  // Tasks in queue
  const tasks = activeProjects.map((p, idx) => ({
    id: `TSK-${pos.positionId}-0${idx + 1}`,
    project: p.name,
    title: `Execute ${pos.title} Mandate for ${p.client}`,
    priority: idx === 0 ? 'High' : 'Medium',
    startDate: '2026-10-22',
    dueDate: p.deadline,
    status: isRev ? 'In Review' : 'In Progress',
    nextRole: pos.evaluator,
    description: `Perform core responsibilities: ${pos.purpose}`,
    inputArtifacts: [`${p.name} Scope Brief`],
    logs: 'Execution initialized. Schema validation passed.'
  }))

  // Activity History
  const activityHistory = [
    {
      id: `EVT-${pos.positionId}-1`,
      act: isRev ? 'REVIEW_PENDING' : 'OUTPUT_EVALUATED',
      type: 'Evaluation',
      project: activeProjects[0]?.name || 'Platform Operations',
      detail: isRev ? `Deliverable submitted to ${pos.evaluator} for quality audit.` : `Evaluator ${pos.evaluator} scored output 9.3/10. Approved.`,
      time: 'Today 12:45',
      actor: pos.evaluator,
      tone: isRev ? 'amber' : 'emerald'
    },
    {
      id: `EVT-${pos.positionId}-2`,
      act: 'TASK_COMPLETED',
      type: 'Execution',
      project: activeProjects[0]?.name || 'Platform Operations',
      detail: `Completed schema generation according to ${pos.samAgId} role contract.`,
      time: 'Yesterday 17:30',
      actor: pos.positionId,
      tone: 'sky'
    },
    {
      id: `EVT-${pos.positionId}-3`,
      act: 'ROLE_DEPLOYED',
      type: 'System',
      project: 'Samrudhi Runtime',
      detail: `Role configuration v${pos.version} active with model Gemini 1.5 Pro.`,
      time: '15 Oct 2026 09:00',
      actor: 'System Admin',
      tone: 'indigo'
    }
  ]

  // Dependencies
  const upstreamId = `${pos.deptId}-001`
  const downstreamId = pos.deptId === 'GOV' ? 'CEO-001' : 'GOV-002'

  return {
    positionId: pos.positionId,
    samAgId: pos.samAgId,
    title: pos.title,
    person: pos.person,
    isLead: pos.isLead,
    deptId: pos.deptId,
    authority: pos.authority,
    status: pos.status,
    version: pos.version,
    model: 'Gemini 1.5 Pro',
    temperature: 0.3,
    evaluator: pos.evaluator,
    workload,
    responsibilities: [
      pos.purpose,
      `Validate all produced artifacts against ${pos.samAgId} schema specifications.`,
      `Coordinate handoffs with upstream briefing and downstream QA gates.`,
      `Incorporate review feedback from ${pos.evaluator}.`
    ],
    inputOverview: pos.input,
    outputOverview: pos.output,
    tools: pos.tools,
    activeProjects,
    completedProjects,
    tasks,
    activityHistory,
    dependencies: {
      upstream: [
        {
          positionId: upstreamId,
          title: `${dept?.name || pos.deptId} Lead`,
          deptId: pos.deptId,
          authority: 'C',
          relationship: 'Provides Upstream Task Context & Scope',
          artifact: 'Work Package Brief'
        }
      ],
      current: {
        positionId: pos.positionId,
        title: pos.title,
        deptId: pos.deptId,
        authority: pos.authority,
        coreTransform: pos.purpose
      },
      downstream: [
        {
          positionId: downstreamId,
          title: pos.evaluator,
          deptId: 'GOV',
          authority: 'A',
          relationship: 'Performs Independent Quality & Competency Evaluation',
          artifact: 'Evaluation Rubric Scorecard'
        }
      ]
    },
    settings: {
      model: 'Gemini 1.5 Pro (Recommended)',
      temperature: 0.3,
      maxTokens: 4096,
      timeout: 180,
      retries: 3,
      evaluatorRubric: `RUBRIC-${pos.deptId}-V1.0`,
      toolPermissions: pos.tools.map((t) => ({
        name: t,
        enabled: true,
        core: t.includes('read') || t.includes('write'),
        desc: `Permitted tool for ${pos.title}`
      }))
    }
  }
}
