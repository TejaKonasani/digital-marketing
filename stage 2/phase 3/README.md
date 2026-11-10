# P1 Phase 3 — Sales Pod Release 1 (9 agents)

Agents **#25–33** — the sales & business development team.

> **Build order:** #25–33 — Build after Phase 2 (content pipeline) so the sales team can sell a proven delivery capability. Vikram (AI CGO) is the first agent in this phase.
> **Source documents:** SAMRUDHI AGENTIC AI.pdf · SAMRUDHI AGENTIC AI(1).pdf · SAMRUDHI AGENTIC AI(2).pdf — Sales & Growth domain (PDF1 p.4 process inventory: 8 processes), Canonical Registry Reconciliation (PDF2).
> **Department:** 02 — Sales & Business Development · Reports to: Arjun (AI CEO) · Coordinates: Mitra (CXO), Daksh (COO), Aarya (CCO), Medha (Analytics)
> **Governance:** Subject to human-controlled commercial approvals. Agents cannot sign contracts, set pricing, or commit expenditure independently (Rule 07).

## Agent Roster

| # | Agent | Canonical ID | Position | Role | Responsibilities |
|---|-------|--------------|----------|------|------------------|
| 25 | Vikram | SAM-AG-005 | SAL-001 | AI CGO — Chief Growth Officer | Revenue strategy, sales targets, pipeline management, executive coordination, growth planning. Reports to Arjun. |
| 26 | Aarav | SAM-AG-006 | SAL-002 | Sales Operations & Pipeline Lead | CRM hygiene, task assignment, process compliance, SLA tracking, pipeline visibility. Reports to Vikram. |
| 27 | Khoj | SAM-AG-027 | SAL-004 | Prospect Research & Market Intelligence | Identify healthcare orgs + decision-makers, market segmentation, competitor intelligence. Reports to Aarav. |
| 28 | Lakshit | SAM-AG-028 | SAL-005 | Lead Qualification & Scoring | Evaluate lead fit, intent, urgency, buying readiness (ICP scoring), lead routing. Reports to Aarav. |
| 29 | Sampark | SAM-AG-029 | SAL-006 | Outbound Prospecting & Outreach | Personalised outbound campaigns, B2B messaging, multi-channel outreach sequences. Reports to Aarav. |
| 30 | Amantran | SAM-AG-030 | SAL-007 | Meeting & Appointment Coordination | Scheduling, calendar integration, availability management, meeting prep packets. Reports to Aarav. |
| 31 | Prastav | SAM-AG-031 | SAL-009 | Solution Design & Proposal | Service recommendations, commercial proposals, pricing logic (draft only), solution scoping. Reports to Vikram. |
| 32 | Anugrah | SAM-AG-032 | SAL-011 | Sales Follow-up & Nurturing | Track follow-ups, nurturing sequences, CRM sequencing, deal-stage progression. Reports to Aarav. |
| 33 | Setu | SAM-AG-033 | SAL-013 | Sales-to-Client Onboarding Handover | Transfer signed-client info into onboarding, brief handoff to Mitra/CEX, kickoff coordination. Reports to Mitra (matrix). |

## Sales Workflow Architecture

```
01 · Client Goals & Scope    → Vikram + Mitra (service scope, revenue targets, budget)
02 · Prospect Intelligence   → Khoj (identify healthcare orgs, decision-makers, segmentation)
03 · Lead Qualification      → Lakshit (ICP scoring, intent, urgency, buying readiness)
04 · Outbound Outreach       → Sampark (personalised campaigns, multi-channel sequences)
05 · Meeting Coordination    → Amantran (scheduling, calendar integration, prep packets)
06 · Solution Design         → Prastav (service recommendations, proposal drafting)
07 · Follow-up & Nurturing   → Anugrah (CRM sequencing, deal-stage progression)
08 · Onboarding Handover     → Setu (signed-client transfer to CEX/Mitra)
```

## Sales Process Master (8 processes — PDF1 p.4)

| Process | Primary Agent | Description |
|---------|---------------|-------------|
| SAL-P01 | Khoj | Prospect research — identify healthcare organisations and decision-makers |
| SAL-P02 | Lakshit | Lead qualification — evaluate fit, intent, urgency, buying readiness |
| SAL-P03 | Sampark | Outbound outreach — personalised multi-channel campaigns |
| SAL-P04 | Anugrah | Follow-up — track and nurture leads through sequences |
| SAL-P05 | Khoj | Discovery — gather client needs, pain points, objectives |
| SAL-P06 | Prastav | Proposals — service recommendations and solution design |
| SAL-P07 | Prastav | Pricing — draft pricing logic (human approval required) |
| SAL-P08 | Setu | Contract coordination — handover to onboarding after signature |

## Governance & Authority Boundaries

| Activity | Agent Authority | Human Approval |
|----------|-----------------|----------------|
| Prospect research | ✅ Autonomous | Periodic review |
| Lead qualification/scoring | ✅ Autonomous | No |
| Outbound messaging drafting | ✅ Autonomous drafting | External send approval |
| Proposal drafting | ✅ Autonomous drafting | Proposal approval required |
| Pricing recommendations | ✅ Draft only | **Required** |
| Contract signing | ❌ Not permitted | **Required** |
| Commit expenditure | ❌ Prohibited | **Required** |
| Client data access | ⚠️ Tenant-scoped only | New scope: Yes |

## KPIs — Department Scorecard

| KRA | KPI | Target |
|-----|-----|--------|
| Pipeline health | Qualified opportunities in pipeline | Baseline, then grow |
| Conversion | Lead-to-opportunity conversion rate | Baseline, then improve |
| Revenue | Qualified pipeline value | Baseline, then grow |
| Efficiency | Sales cycle time reduction | ≥20% against baseline |
| Data quality | CRM records with complete fields | ≥95% |
| Compliance | Unauthorised external communications | 0 |
| Handover quality | Onboarding handovers with complete brief | 100% |

## Agent Files

Each agent has a detailed specification file with 15 sections (Identity Card, What It Does, Platform, Behaviour Rules, KRAs, KPIs, Dashboard, Workflows, I/O Contract, System Prompt, Tools, Authority Matrix, Test Scenarios, Build Checklist, Source Map):

- `Vikram_AI_Chief_Growth_Officer_25.md`
- `Aarav_AI_Sales_Operations_26.md`
- `Khoj_Prospect_Research_27.md`
- `Lakshit_Lead_Qualification_28.md`
- `Sampark_Outbound_Prospecting_29.md`
- `Amantran_Meeting_Coordination_30.md`
- `Prastav_Solution_Design_31.md`
- `Anugrah_Sales_Followup_32.md`
- `Setu_Onboarding_Handover_33.md`
