import json

with open('admin/src/data/positionTitles.js', 'r', encoding='utf-8') as f:
    pt_content = f.read()

# Add SAL to deptTitles
if 'SAL:' not in pt_content:
    pt_content = pt_content.replace("  SBD: [", "  SAL: [\n    { t: 'Head of Business Development', n: 'Vikram' },\n    { t: 'Sales Strategy & Commercial Pipeline Analyst' },\n    { t: 'Revenue Operations & Pipeline Analyst' },\n    { t: 'Healthcare Market Scanning & Prospect Analyst', n: 'Khoj' },\n    { t: 'Lead Enrichment, Verification & Qualification Specialist', n: 'Lakshit' },\n    { t: 'Outbound Campaign Orchestration Specialist', n: 'Sampark' },\n    { t: 'Meeting Scheduling & Calendar Coordinator', n: 'Amantran' },\n    { t: 'Sales Discovery & Client Requirements Specialist', n: 'Samvaad' },\n    { t: 'Commercial Proposal & Scope Preparation Specialist', n: 'Prastav' },\n    { t: 'Commercial Terms, Pricing & Contracting Specialist', n: 'Anubandh' },\n    { t: 'Sales Follow-up & Opportunity Nurturing Specialist', n: 'Anugrah' },\n    { t: 'Account Expansion & Cross-Selling Specialist', n: 'Vistaar' },\n    { t: 'Sales-to-Onboarding Commercial Handover Coordinator', n: 'Setu' }\n  ],\n  SBD: [")

with open('admin/src/data/positionTitles.js', 'w', encoding='utf-8') as f:
    f.write(pt_content)
print('Updated positionTitles.js with SAL!')

# Now update positions.js
with open('admin/src/data/positions.js', 'r', encoding='utf-8') as f:
    pos_content = f.read()

# Ensure SAL in authorityByDept
if 'SAL:' not in pos_content:
    pos_content = pos_content.replace("  SBD: { A: 4, B: 6, C: 2, D: 1 },", "  SAL: { A: 4, B: 6, C: 2, D: 1 },\n  SBD: { A: 4, B: 6, C: 2, D: 1 },")

# Ensure SAL in IDLE_POSITIONS, ERROR_POSITIONS, NEEDS_REVIEW_POSITIONS
pos_content = pos_content.replace("'SBD-009'", "'SAL-009', 'SBD-009'")
pos_content = pos_content.replace("'SBD-007'", "'SAL-007', 'SBD-007'")

# Add separate fields in buildPositions
target_block = """      positions.push({
        samAgId,
        positionId,
        deptId: dept.id,
        title: title.t,"""

replacement_block = """      // Pilot roles specification
      const PILOT_SAM_AG_IDS = new Set([
        'SAM-AG-001', 'SAM-AG-002', 'SAM-AG-003', 'SAM-AG-004', 'SAM-AG-007', 'SAM-AG-009', 'SAM-AG-010',
        'SAM-AG-050', 'SAM-AG-059', 'SAM-AG-076', 'SAM-AG-077', 'SAM-AG-080', 'SAM-AG-081', 'SAM-AG-082',
        'SAM-AG-083', 'SAM-AG-084', 'SAM-AG-094', 'SAM-AG-125', 'SAM-AG-146', 'SAM-AG-158', 'SAM-AG-162',
        'SAM-AG-166', 'SAM-AG-183', 'SAM-AG-186'
      ])
      const isPilotRole = PILOT_SAM_AG_IDS.has(samAgId)

      positions.push({
        samAgId,
        positionId,
        deptId: dept.id,
        title: title.t,
        isActive: isPilotRole || isLead,
        assignedAgentId: samAgId,
        fulfillmentType: isPilotRole ? 'AGENT' : (isLead ? 'AGENT' : 'UNASSIGNED'),
        runtimeStatus: isPilotRole ? 'AVAILABLE' : (isLead ? 'AVAILABLE' : 'DISABLED'),"""

if "isActive: isPilotRole" not in pos_content:
    pos_content = pos_content.replace(target_block, replacement_block)

with open('admin/src/data/positions.js', 'w', encoding='utf-8') as f:
    f.write(pos_content)
print('Updated positions.js with distinct activation, fulfillment, and runtime fields!')
