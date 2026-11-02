// Re-export canonical client datasets from clientsData.js
// Preserves backward compatibility for all existing imports

import {
  initialClients,
  opportunitiesList as opps,
  getClientsSummaryMetrics as getMetrics,
  getClientById as getById
} from './clientsData'

export const clients = initialClients
export const opportunitiesList = opps
export const getClientsSummaryMetrics = getMetrics
export const getClientById = getById

// Legacy pipeline export
export const pipeline = [
  { id: 'OPP-081', name: 'City Care Multispeciality Hospital', stage: 'Approved scope', value: 320000, owner: 'R. Iyer', probability: 100, lastTouch: '2026-10-28', source: 'Inbound enquiry', next: 'Workspace provisioned' },
  { id: 'OPP-082', name: 'Nirvaan Wellness Clinic', stage: 'Approved scope', value: 150000, owner: 'S. Mehta', probability: 100, lastTouch: '2026-10-27', source: 'Referral', next: 'Brand assets ingest' },
  { id: 'OPP-083', name: 'SmileWorks Orthodontics', stage: 'Proposal', value: 90000, owner: 'K. Sharma', probability: 60, lastTouch: '2026-10-25', source: 'Outbound', next: 'Commercial review with SBD-007' },
  { id: 'OPP-084', name: 'CarePoint Home Nursing', stage: 'Qualified', value: 120000, owner: 'D. Gupta', probability: 50, lastTouch: '2026-10-24', source: 'Webinar', next: 'Schedule discovery' },
  { id: 'OPP-085', name: 'Zenith Diagnostic Centers', stage: 'Approved scope', value: 210000, owner: 'A. Khan', probability: 100, lastTouch: '2026-10-28', source: 'Partner intro', next: 'Ready for workspace' }
]

export const pipelineStages = ['Lead', 'Qualified', 'Discovery', 'Proposal', 'Approved scope']

export const onboardingQueue = [
  { client: 'Sunrise Dental Studio', started: '2026-10-28', progress: 35, missing: ['Brand assets (logo, colours, fonts)', 'Tone-of-voice examples', 'Approved claims list'], next: 'Asset request sent to client 2026-10-29', owner: 'CEX-002' },
  { client: 'Lotus Eye & Ear Hospital', started: '—', progress: 0, missing: ['Not started — pending contract signature'], next: 'Awaiting approved scope handoff from SBD', owner: 'CEX-002' }
]

export const briefs = [
  { id: 'BRIEF-0001', client: 'City Care Multispeciality Hospital', title: 'Cardiac Awareness Week — social post', version: 'v3', status: 'approved', submitted: '2026-10-25', by: 'Dr. Anitha Reddy (Client Admin)', fields: 11, missing: 0 },
  { id: 'BRIEF-0002', client: 'Nirvaan Wellness Clinic', title: 'Physiotherapy booking campaign', version: 'v2', status: 'approved', submitted: '2026-10-14', by: 'Dr. Suresh Menon (Client Owner)', fields: 11, missing: 0 },
  { id: 'BRIEF-0003', client: 'City Care Multispeciality Hospital', title: 'Diabetes care SEO landing page', version: 'v2', status: 'in_review', submitted: '2026-10-27', by: 'Dr. Anitha Reddy (Client Admin)', fields: 9, missing: 2 },
  { id: 'BRIEF-0004', client: 'Arogya Ayurveda Centre', title: 'Panchakarma season content pack', version: 'v1', status: 'draft', submitted: '2026-10-29', by: 'Dr. K. Subramaniam (Client Owner)', fields: 6, missing: 5 },
  { id: 'BRIEF-0005', client: 'MediScan Diagnostics', title: 'Corporate health check awareness', version: 'v4', status: 'revision', submitted: '2026-10-21', by: 'A. Kulkarni (Client Reviewer)', fields: 11, missing: 0 }
]
