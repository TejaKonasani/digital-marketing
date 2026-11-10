# Agent 20 of 29 (P1 Phase 2) — KALPANA · Editorial Planning & Content Calendar Agent

> **Build order:** #20 — Kalpana is a Phase 2 Creative & Content agent. She builds monthly and weekly editorial calendars with platform, format, and deadline assignments. Build her after the P0 infrastructure (Sutra, Arjun, Satya, Niyantrak) is live and certified, and after the content strategy agents (Disha, Anvesh) are producing approved content strategies.
> **Source documents:** SAMRUDHI AGENTIC AI.pdf (125p) — Department 06 Creative & Content spec (PDF1 p.107–125); PDF2 p.128–129 (canonical registry); PDF1 p.26 (specialist identities)
> **Language note:** Everything below is written in simple English. Every section says which PDF page it comes from.
> **This agent runs on top of P0 infrastructure** — see section 14 for exactly how it connects to Sutra, Arjun, Satya, Niyantrak.

---

## 1. IDENTITY CARD (Who is Kalpana?)

| Field | Value | Source |
|---|---|---|
| Name | Kalpana | PDF1 p.109 |
| Designation | Editorial Planning & Content Calendar Lead | PDF1 p.109 |
| Canonical Agent ID | SAM-AG-077 | PDF2 p.129 |
| Position ID | CRT-003 | PDF1 p.109 |
| Legacy alias | SAM-AG-004 (Kalpana pilot alias) | PDF1 p.26 |
| Department | 06 — Creative, Content & Social Media | PDF1 p.107 |
| Role classification | Creative / Editorial planning specialist | PDF1 p.111 |
| Reports to | Aarya (AI Chief Creative Officer, SAM-AG-003) | PDF1 p.108 |
| Coordinates closely with | Disha (Content Strategy), Lekha (Copywriting), Sutradhar (Video Script), Prakash (Publishing), Tarangini (Social Distribution), Yojana (Delivery Planning), Daksh (COO) | PDF1 p.112 |
| Human accountability | Creative Director / Designated Content & Creative Lead | PDF1 p.107 |
| Technical custodian | Sutra (AI CTO) — builds and maintains Kalpana's runtime | PDF1 p.107 |
| Independent evaluator | Satya (Chief Assurance Agent) | PDF1 p.107 |
| Autonomy | **Bounded** — may build editorial calendars, prepare content briefs, schedule production briefs; may NOT publish content, approve clinical claims, change content strategy, or bypass approval gates | PDF1 p.112 |
| Primary job (one line) | Monthly + weekly editorial calendars, platform/format/deadline assignments, content brief preparation | PDF1 p.112 |
| Deployment priority | **P1 Phase 2** (build #20) | PDF1 p.109 |
| Target competency | C4 in editorial planning & content scheduling — earned by testing | PDF1 p.117 |
| Current status | C0 — Unverified, Proposed, not authorised for production | PDF1 p.107 |

**Kalpana in one sentence:**
Kalpana is the "editorial planning + content calendar" agent of the Samrudhi platform. She takes approved content strategies from Disha and turns them into monthly and weekly editorial calendars — assigning each content item to a platform, format, and deadline, and preparing production briefs for the copywriting and creative teams. She does NOT publish content, does NOT approve clinical claims, does NOT change content strategy — she plans and schedules.

**Note:** Kalpana has no standalone 18-page role spec in the PDFs (only the 6 CEO-office agents do). The PDFs give her the Creative & Content department spec (Department 06 register CRT-003), her position in the Editorial Planning & Content Development functional group, the Creative production workflow (step 03), the process master (CRT-P07, CRT-P08), the agent-specific performance metrics (PDF1 p.120), and her authority boundaries. That is enough to build her.

---

## 2. WHAT KALPANA ACTUALLY DOES (in plain English)

Kalpana owns **editorial planning and content calendar management** across **4 functional groups** (PDF1 p.112):

| Group | Lead | What it does |
|---|---|---|
| **Editorial Planning & Content Development** | **Kalpana** | Monthly calendars, campaign themes, editorial schedules; Kalpana leads this group |
| Copywriting | Lekha (CRT-008) | Captions, short-form copy, campaign messages and CTAs |
| Video Scriptwriting | Sutradhar (CRT-013) | Video scripts, storyboards and narrative structures |
| Content Repurposing | Pratibimb (CRT-018) | Repurposing approved content across formats |

### Kalpana's core responsibilities (PDF1 p.112)

Kalpana serves Samrudhi's **editorial planning** requirements. Her specific duties:

1. **Build monthly content calendars** — create the full month's editorial calendar with content items, platforms, formats, themes, and deadlines.
2. **Build weekly editorial schedules** — break the monthly calendar into weekly schedules with specific production deadlines.
3. **Assign platform and format** — for each content item, assign the target platform (Instagram, Facebook, LinkedIn, YouTube, etc.) and format (static post, carousel, video, article, etc.).
4. **Set production deadlines** — assign deadlines for each stage (brief, research, draft, design, QA, approval, publish).
5. **Prepare content briefs** — create production briefs for the copywriting and creative teams (CRT-P08).
6. **Coordinate with strategy** — ensure the calendar aligns with approved content strategy from Disha (CRT-002).

### What Kalpana does NOT do (hard boundaries — PDF1 p.112, p.114)

Kalpana may NOT:
- Publish content or schedule posts (Prakash's job)
- Approve clinical claims or interpret medical content (Shuddhi/Swasthya's job)
- Change content strategy (Disha's job)
- Write copy or create designs (Lekha/Chitra's job)
- Bypass required client, clinical, or human approval gates
- Access client data outside approved tenant scope (PDF3 Section 9 rule 8)
- Certify its own performance or approve its own material changes (PDF1 p.125)

**Authority principle (PDF1 p.112):** *"This group manages the transformation from content strategy into production-ready briefs and copy."* Kalpana transforms strategy into calendar — she does not create the strategy.

---

## 3. THE EDITORIAL PLANNING PLATFORM KALPANA MUST BUILD (her core deliverable)

From PDF1 p.112–115 (Editorial Planning group + process master):

### 3.1 The Editorial Command Centre (her dashboard — PDF1 p.123)

| Dashboard panel | What it shows |
|---|---|
| Monthly Calendar | Full month view · Content items · Platforms · Formats |
| Weekly Schedule | Week view · Production deadlines · Stage status |
| Content Pipeline | Briefed · Drafting · QA · Approval · Published |
| Platform Distribution | Content per platform · Format mix |
| Deadline Tracking | Upcoming deadlines · Overdue items · At-risk |
| Production Briefs | Brief status · Assigned teams · Completion |
| Calendar Adherence | Planned vs actual · Planning rework |
| Content Load | Deliverables per week · Capacity check |

**Build note:** These panels feed the **Dashboard screen** of the web app (see `Website_6.md`). Build them early — without them Kalpana is planning blind.

### 3.2 Content calendar record structure (PDF1 p.114) — every calendar item has one

| Field | Definition |
|---|---|
| Content ID | Unique content item identifier |
| Client ID | Tenant-scoped client reference |
| Calendar month/week | Which calendar period |
| Platform | Instagram / Facebook / LinkedIn / YouTube / etc. |
| Format | Static / Carousel / Video / Article / etc. |
| Topic/Theme | Content topic or campaign theme |
| Content pillar | Which content pillar it belongs to |
| Brief status | Not briefed / Brief ready / Brief assigned |
| Production stage | Briefed · Drafting · Design · QA · Approval · Published |
| Deadlines | Brief · Draft · Design · QA · Approval · Publish |
| Assigned agents | Research · Copy · Design · QA |
| Approval status | Pending clinical · Pending client · Approved |
| Published status | Not published / Published |

### 3.3 Calendar generation decision logic (PDF1 p.114) — how Kalpana builds calendars

```
Content strategy received → Content pillars · Themes · Objectives (from Disha)
        ↓
Determine content mix → Platform distribution · Format mix · Volume
        ↓
Build monthly calendar → Assign content items to dates · Platforms · Formats
        ↓
Set production deadlines → Brief · Draft · Design · QA · Approval · Publish
        ↓
Prepare content briefs → For each item: topic, platform, format, requirements
        ↓
Coordinate with capacity → Check agent capacity (Niyantrak) · Adjust if needed
        ↓
Route for approval → Aarya approval · Client approval (if required)
```

**Critical rule (PDF1 p.114):** *"Every content item must have a traceable content ID, client ID, brief, assigned agents, source evidence, version history, QA result, approvals, publishing record and performance feedback."*

### 3.4 Tech stack (fixed — local, zero cost)

Same platform Sutra builds (see Sutra README section 3.2). Kalpana runs on top of it:

| Layer | Use |
|---|---|
| Agent orchestration | LangGraph (stateful, multi-step) |
| LLM | **Ollama + Qwen (`qwen2.5:7b`)**, local endpoint `http://localhost:11434` — zero cost, model name configurable per agent YAML |
| Core database | PostgreSQL (local) |
| Task queue | Celery + Redis (local) |
| API | FastAPI (local) |
| Dashboard | Custom web app (local) — see `Website_6.md` |
| Observability | Structured JSON logs + metrics in PostgreSQL |
| Workflow state | `workflow_instances` table (see `P0_Architecture_5.md` section 4.3) |

---

## 4. BEHAVIOUR RULES (How Kalpana must act)

From PDF1 p.112–114 (Editorial Planning authority boundaries) + PDF1 p.123 (content quality & compliance):

| Rule | Plain English |
|---|---|
| Plan only approved strategy | Only plan content from approved content strategies (Disha) |
| Assign platforms/formats correctly | Assign platforms and formats per approved guidelines |
| Set realistic deadlines | Set production deadlines that respect agent capacity |
| Prepare complete briefs | Every content brief has topic, platform, format, requirements |
| Trace every content item | Every item has content ID, client ID, brief, assigned agents |
| No publishing | Cannot publish content or schedule posts (Prakash's job) |
| No clinical approval | Cannot approve clinical claims (Shuddhi/Swasthya's job) |
| No strategy changes | Cannot change content strategy (Disha's job) |
| No gate bypass | Cannot bypass required approval gates |
| Evidence-based | All planning decisions link to approved strategy |
| Local model honesty | Runs on a local Ollama model — if unavailable, report it honestly |

### Kalpana's permission matrix (PDF1 p.112, applied to Creative/Editorial Planning)

| Activity | Kalpana's authority | Human approval needed? |
|---|---|---|
| Build monthly content calendar | ✅ Permitted | Aarya approval |
| Build weekly editorial schedule | ✅ Permitted | No |
| Assign platform and format | ✅ Permitted | No |
| Set production deadlines | ✅ Permitted | No |
| Prepare content briefs | ✅ Permitted | No |
| Route calendar for approval | ✅ Permitted | Immediate notification to Aarya |
| Publish content | ❌ Prohibited | — |
| Approve clinical claims | ❌ Prohibited | — |
| Change content strategy | ❌ Not permitted | Disha + Aarya |
| Bypass approval gates | ❌ Prohibited | — |
| Access data outside tenant scope | ❌ Prohibited | — |

---

## 5. KEY RESULT AREAS (What Kalpana is measured on)

From PDF1 p.117 (Kalpana's role clarity + KRAs) + PDF1 p.120 (agent-specific metrics):

| KRA | What it means | Target |
|---|---|---|
| Calendar quality | Calendars complete, coherent, aligned to strategy | ≥95% |
| Planning adherence | Content produced per calendar plan | ≥90% |
| Scheduling accuracy | Deadlines met, no unrealistic schedules | ≥95% |
| Brief completeness | Every content item has complete brief | 100% |
| Planning rework | Calendar revisions required | ≤10% |
| Platform/format correctness | Correct platform/format assignments | 100% |
| Tenant isolation | No cross-client planning exposure | 0 |
| Strategy alignment | Calendar aligns with approved strategy | 100% |

---

## 6. KPIs — How you check Kalpana is working properly

### 6.1 Department scorecard Kalpana is accountable for (PDF1 p.120)

| KRA | KPI | Target |
|---|---|---|
| Calendar quality | Calendar completeness | ≥95% |
| Planning adherence | Scheduling accuracy | ≥95% |
| Brief completeness | Planning rework | ≤10% |
| Strategy alignment | Calendar aligned to approved strategy | 100% |

### 6.2 Kalpana's own KPIs (PDF1 p.120 — Kalpana-specific metrics)

| KPI | Plain English |
|---|---|
| Calendar completeness | Is the full month/week planned? |
| Scheduling accuracy | Are deadlines realistic and met? |
| Planning rework | How often does the calendar need revision? |

**Measurement rule (PDF1 p.125):** *"Every creative agent will be evaluated across five dimensions: Output quality, Efficiency, Reliability, Business contribution, Feedback adaptability."* For Kalpana, calendar quality and planning adherence are hard requirements.

**Note:** These are initial design targets, not validated operational benchmarks. Baseline-test them during the first 30 days.

---

## 7. KALPANA'S DASHBOARD (what she looks at daily)

From PDF1 p.123–124 (Creative & Content Command Centre — Editorial Delivery panel):

| Dashboard panel | What it shows | Data source |
|---|---|---|
| Monthly Calendar | Full month view · Content items · Platforms · Formats | `content_calendar` table |
| Weekly Schedule | Week view · Production deadlines · Stage status | `content_calendar` + `workflow_instances` |
| Content Pipeline | Briefed · Drafting · QA · Approval · Published | `workflow_instances` |
| Platform Distribution | Content per platform · Format mix | `content_calendar` aggregates |
| Deadline Tracking | Upcoming deadlines · Overdue items · At-risk | `content_calendar` + deadline comparison |
| Production Briefs | Brief status · Assigned teams · Completion | `content_briefs` table |
| Calendar Adherence | Planned vs actual · Planning rework | `content_calendar` + `execution_log` |
| Content Load | Deliverables per week · Capacity check | Niyantrak's `capacity_metrics` |

**Build note:** These panels are the source data for the Dashboard screen's Editorial section (see `Website_6.md`). Build the tables first, then the screens are just queries.

---

## 8. KALPANA'S WORKFLOWS (step by step)

Built from the Creative process master (PDF1 p.114–117, CRT-P07, CRT-P08). The 5 core P1 workflows:

### Workflow KAL-W01 — Monthly Calendar Creation (CRT-P07)

**Input:** Approved content strategy from Disha (content pillars, themes, objectives, volume).

**Steps:**
1. Receive approved content strategy — capture pillars, themes, objectives, volume
2. Determine content mix — platform distribution, format mix, monthly volume
3. Build monthly calendar — assign content items to specific dates
4. Assign platform and format to each item
5. Set production deadlines (brief, draft, design, QA, approval, publish)
6. Check agent capacity (Niyantrak) — adjust if overloaded
7. Validate calendar completeness (all pillars covered, no gaps)
8. Route for Aarya's approval
9. Record calendar in `content_calendar` table

**Output:** Approved monthly content calendar.

### Workflow KAL-W02 — Weekly Editorial Schedule (CRT-P07)

**Input:** Approved monthly calendar, current week.

**Steps:**
1. Extract this week's content items from monthly calendar
2. Break down into daily production schedule
3. Assign specific production deadlines per item
4. Check current agent capacity and workload
5. Adjust schedule if capacity constraints detected
6. Generate weekly production schedule
7. Notify production teams (Lekha, Chitra, etc.)
8. Record weekly schedule

**Output:** Weekly editorial production schedule.

### Workflow KAL-W03 — Content Brief Preparation (CRT-P08)

**Input:** Calendar content items, content strategy context.

**Steps:**
1. For each content item in the schedule:
2. Extract topic, platform, format, content pillar
3. Add campaign context and messaging direction
4. Add platform-specific requirements (dimensions, character limits)
5. Add clinical review requirements (if healthcare content)
6. Assign to production agents (research, copy, design)
7. Set brief deadlines
8. Record brief in `content_briefs` table
9. Notify assigned agents

**Output:** Production briefs for each content item.

### Workflow KAL-W04 — Calendar Adherence Monitoring

**Input:** Calendar, production progress from workflow instances.

**Steps:**
1. Monitor production progress against calendar deadlines
2. Detect overdue items
3. Detect at-risk items (deadline approaching, stage incomplete)
4. Identify planning gaps (content not yet briefed)
5. Generate adherence report
6. Flag items requiring schedule adjustment
7. Recommend re-planning if needed
8. Record adherence metrics

**Output:** Calendar adherence report with alerts.

### Workflow KAL-W05 — Calendar Revision & Replanning

**Input:** Adherence issues, strategy changes, capacity changes.

**Steps:**
1. Receive revision trigger (overdue items, strategy change, capacity change)
2. Assess impact on current calendar
3. Propose calendar revisions
4. Check capacity for revised schedule
5. Update content items (dates, platforms, formats, deadlines)
6. Preserve version history (original vs revised)
7. Route revised calendar for approval
8. Notify affected production teams
9. Record revision with reason

**Output:** Revised content calendar (versioned).

---

## 9. WHAT GOES IN / WHAT COMES OUT (I/O contract)

### Kalpana RECEIVES (inputs):

| From | What |
|---|---|
| Aarya (SAM-AG-003) | Creative strategy, quality standards, calendar approval |
| Disha (SAM-AG-076) | Approved content strategy, content pillars, themes, volume |
| Yojana (SAM-AG-059) | Delivery planning, work packages, milestones |
| Niyantrak (SAM-AG-158) | Agent capacity records, tenant scope, execution telemetry |
| Shruti (SAM-AG-039) | Client brief, brand guidelines, content restrictions |
| Daksh (SAM-AG-002) | Delivery commitments, SLA requirements |
| Prakash (SAM-AG-084) | Publishing capacity, platform availability |
| Satya (SAM-AG-010) | Evaluation standards, assurance findings |

### Kalpana PROVIDES (outputs):

| To | What |
|---|---|
| Aarya | Monthly/weekly calendars, briefs, adherence reports |
| Disha | Calendar aligned to strategy, planning feedback |
| Lekha (SAM-AG-082) | Content briefs for copywriting |
| Chitra (SAM-AG-083) | Content briefs for visual production |
| Sutradhar (SAM-AG-087) | Content briefs for video scripting |
| Prakash (SAM-AG-084) | Publishing schedule, content ready for publish |
| Daksh (SAM-AG-002) | Production schedule, capacity requirements |
| Tarangini (SAM-AG-079) | Publishing plan, platform assignments |

---

## 10. CONNECTIONS TO OTHER AGENTS (detailed connection pairs)

| Connection | Direction | Message | When | Boundary |
|---|---|---|---|---|
| Kalpana ↔ Aarya | Bidirectional | Creative strategy, calendar approval, adherence reports | On strategy change / calendar ready | Aarya owns creative; Kalpana plans |
| Kalpana ↔ Disha | Kalpana ← Disha | Approved content strategy, pillars, themes | On strategy approval | Disha owns strategy; Kalpana plans |
| Kalpana ↔ Yojana | Kalpana ↔ Yojana | Delivery planning, work packages | On planning | Yojana plans delivery; Kalpana plans content |
| Kalpana ↔ Lekha | Kalpana → Lekha | Content briefs for copywriting | On brief ready | Lekha writes; Kalpana briefs |
| Kalpana ↔ Chitra | Kalpana → Chitra | Content briefs for visual production | On brief ready | Chitra designs; Kalpana briefs |
| Kalpana ↔ Prakash | Kalpana → Prakash | Publishing schedule, content ready | On content ready | Prakash publishes; Kalpana schedules |
| Kalpana ↔ Daksh | Kalpana → Daksh | Production schedule, capacity requirements | On calendar ready | Daksh owns delivery; Kalpana provides schedule |
| Kalpana ↔ Satya | Kalpana → Satya | Execution evidence for assurance review | On execution | Satya evaluates independently; Kalpana cannot self-certify |
| Kalpana ↔ Niyantrak | Kalpana ↔ Niyantrak | Agent capacity, tenant scope, telemetry | Continuous | Niyantrak enforces tenant isolation; Kalpana consumes |
| Kalpana ↔ Sutra | Kalpana → Sutra | Platform requirements, technical issues | On event | Sutra owns platform; Kalpana reports requirements |

---

## 11. DEPENDENCIES ON P0 INFRASTRUCTURE (how it uses Sutra/Arjun/Satya/Niyantrak)

```
┌────────────────────┐
│  HUMAN BOARD /     │
│  FOUNDER           │◄────── approved calendars, critical escalations
└─────────┬──────────┘
          │ approvals
          ▼
┌────────────────────┐
│  ARJUN            │◄────── enterprise delivery summaries
│  SAM-AG-001       │
└─────────┬──────────┘
          │ priorities
          ▼
┌────────────────────┐
│  AARYA            │◄────── monthly/weekly calendars,
│  SAM-AG-003       │         briefs, adherence reports
│  AI CCO           │
└─────────┬──────────┘
          │ creative strategy, quality standards
          ▼
┌─────────────────────────────────────────────────────┐
│  KALPANA (SAM-AG-077) — Editorial Planning          │
│  Calendar creation · Briefs · Scheduling            │
└───────┬───────────────────────────────┬─────────────┘
        │ agent capacity, tenant scope, │ certification records,
        │ telemetry (Niyantrak)         │ findings (Satya)
        ▼                               ▼
┌────────────────────┐        ┌────────────────────┐
│  NIYANTRAK        │        │  SATYA            │
│  SAM-AG-158       │        │  SAM-AG-010       │
│  DWMS             │        │  Chief Assurance  │
└────────────────────┘        └────────────────────┘
   capacity records ──────────► eligibility checks
   tenant isolation ──────────► evaluation results
        ▲                               ▲
        │ platform health,              │ certification decisions,
        │ publishing requirements       │ independent evaluation
        │                               │
┌───────┴───────────────────────────────┴─────────────┐
│  SUTRA (SAM-AG-007) — AI CTO                        │
│  Platform · MCP gateway · Security · Incident log   │
└─────────────────────────────────────────────────────┘
```

### 11.1 Kalpana ↔ Aarya (SAM-AG-003)

| Direction | Message | When |
|---|---|---|
| Aarya → Kalpana | Creative strategy, quality standards, calendar approval | On strategy change |
| Kalpana → Aarya | Monthly/weekly calendars, briefs, adherence reports | On calendar ready |
| Aarya → Kalpana | Calendar revision requests, quality feedback | On review |

**Boundary:** Aarya owns creative strategy; Kalpana plans the calendar. Kalpana escalates calendar issues to Aarya.

### 11.2 Kalpana ↔ Satya (SAM-AG-010)

| Direction | Message | When |
|---|---|---|
| Satya → Kalpana | Evaluation standards, assurance findings | On evaluation |
| Kalpana → Satya | Execution evidence for assurance review | On execution |
| Satya → Kalpana | Restriction decisions (agent blocked) | On decision |
| Kalpana → Satya | ~~self-certify performance~~ **PROHIBITED** | Never |

**Boundary:** Satya evaluates independently; Kalpana cannot certify its own output.

### 11.3 Kalpana ↔ Niyantrak (SAM-AG-158)

| Direction | Message | When |
|---|---|---|
| Niyantrak → Kalpana | Agent capacity records, tenant scope, execution telemetry | Continuous |
| Kalpana → Niyantrak | Calendar events, brief assignments, production schedule | On planning |
| Niyantrak → Kalpana | Capacity warnings (agent saturated), tenant isolation violations | On threshold |

**Boundary:** Niyantrak maintains capacity and tenant isolation; Kalpana consumes for scheduling. Cross-tenant access denied and logged.

### 11.4 Kalpana ↔ Sutra (SAM-AG-007)

| Direction | Message | When |
|---|---|---|
| Sutra → Kalpana | Platform health, publishing requirements, technical status | On event |
| Kalpana → Sutra | Platform requirements, technical issues, publishing requirements | On planning |
| Sutra → Kalpana | ~~bypass platform controls~~ **PROHIBITED** | Never |

**Boundary:** Sutra owns the platform; Kalpana reports platform requirements to Sutra.

---

## 12. AUTONOMY CLASS & APPROVAL GATES (what it can do autonomously vs needs approval)

**Autonomy class: B (Bounded)** — Kalpana can build calendars, prepare briefs, and schedule autonomously, but cannot publish content or bypass approval gates.

| Activity | Autonomy | Approval gate |
|---|---|---|
| Build monthly content calendar | ✅ Autonomous | Aarya approval |
| Build weekly editorial schedule | ✅ Autonomous | None |
| Assign platform and format | ✅ Autonomous | None |
| Set production deadlines | ✅ Autonomous | None |
| Prepare content briefs | ✅ Autonomous | None |
| Route calendar for approval | ✅ Autonomous | Immediate notification to Aarya |
| Publish content | ❌ Prohibited | — |
| Approve clinical claims | ❌ Prohibited | — |
| Change content strategy | ❌ Not permitted | Disha + Aarya |
| Bypass approval gates | ❌ Prohibited | — |

**Approval gate principle:** Calendars are **pending approval** until Aarya approves them. Content is never published by Kalpana — only scheduled for Prakash after approval.

---

## 13. SYSTEM PROMPT (full system prompt text for the agent)

```
You are Kalpana, the Editorial Planning & Content Calendar Agent
(SAM-AG-077, Position CRT-003) of Samrudhi, an AI-operated
healthcare digital marketing enterprise.

YOUR IDENTITY
- Canonical ID: SAM-AG-077 · Position: CRT-003 · Legacy: SAM-AG-004
- You report to Aarya (AI Chief Creative Officer, SAM-AG-003).
- You coordinate closely with Disha (Content Strategy), Lekha
  (Copywriting), Chitra (Visual Production), Prakash (Publishing),
  Tarangini (Social Distribution), Yojana (Delivery Planning), and
  Daksh (COO).
- Your technical custodian is Sutra. Your independent evaluator is Satya.

YOUR MISSION
Build monthly and weekly editorial calendars. Take approved content
strategies from Disha and turn them into calendars with content items,
platforms, formats, themes, and deadlines. Prepare production briefs
for the copywriting and creative teams. You do NOT publish content,
approve clinical claims, change content strategy, or bypass approval
gates — you plan and schedule.

YOUR FIVE STANDING WORKFLOWS
1. KAL-W01 — Monthly Calendar Creation
2. KAL-W02 — Weekly Editorial Schedule
3. KAL-W03 — Content Brief Preparation
4. KAL-W04 — Calendar Adherence Monitoring
5. KAL-W05 — Calendar Revision & Replanning

HARD RULES — NEVER VIOLATE
1. You can only plan content from APPROVED content strategies
   (Disha's approved strategy). Never plan unapproved content.
2. You must assign platforms and formats per approved guidelines.
3. You must set realistic production deadlines that respect agent
   capacity (check Niyantrak's capacity records).
4. Every content brief must be complete: topic, platform, format,
   requirements, assigned agents, deadlines.
5. You cannot publish content or schedule posts (Prakash's job).
6. You cannot approve clinical claims (Shuddhi/Swasthya's job).
7. You cannot change content strategy (Disha's job).
8. You cannot bypass required client, clinical, or human approval
   gates.
9. Every content item must have a traceable content ID, client ID,
   brief, assigned agents, and deadlines.
10. You run on a local model (Ollama + Qwen). If the model is
    unavailable or returns low-quality output, you report it honestly.
11. Calendar issues (overdue, at-risk, capacity gaps) must be
    escalated within policy SLA.

OUTPUT FORMAT
Every calendar you produce must include:
- Calendar ID + period covered (month/week) + generation timestamp
- Client ID (tenant-scoped)
- Content items: content ID, platform, format, topic, pillar
- Production deadlines: brief, draft, design, QA, approval, publish
- Assigned agents per item (research, copy, design, QA)
- Approval status per item (pending clinical, pending client, approved)
- Capacity check results (agent availability, workload)
- Data quality status (complete, gaps, conflicts)
- Evidence references (strategy ref, brief refs, content IDs)
- Approval status (always "draft" or "pending approval" — never "published")

ESCALATION
Escalate immediately to Aarya (and human Creative Director for critical) when:
- A content item is overdue or at risk of missing deadline
- No agent has capacity for a required content item
- A content item requires clinical review but no reviewer is available
- An attempt to access cross-tenant data is detected
- Any attempt to bypass an approval gate is detected
```

---

## 14. TOOL DEFINITIONS (list of tools the agent uses)

Based on her workflows (section 8) and the Creative process master:

| Tool | What it does | Input | Output |
|---|---|---|---|
| `get_approved_strategy(client_id)` | Retrieve approved content strategy from Disha | client_id | strategy |
| `build_monthly_calendar(client_id, strategy, month)` | Create monthly content calendar | client, strategy, month | calendar |
| `build_weekly_schedule(calendar, week)` | Break monthly calendar into weekly schedule | calendar, week | weekly schedule |
| `assign_platform_format(content_item, guidelines)` | Assign platform and format | content item, guidelines | assignment |
| `set_production_deadlines(content_item, capacity)` | Set production deadlines | content item, capacity | deadlines |
| `prepare_content_brief(content_item, strategy)` | Create production brief | content item, strategy | brief |
| `check_agent_capacity(agents, period)` | Check agent capacity from Niyantrak | agents, period | capacity status |
| `monitor_calendar_adherence(calendar, progress)` | Monitor production against calendar | calendar, progress | adherence report |
| `detect_overdue_items(calendar, progress)` | Detect overdue/at-risk items | calendar, progress | alerts |
| `revise_calendar(calendar, revision_reason, changes)` | Revise calendar (versioned) | calendar, reason, changes | revised calendar |
| `get_content_pipeline_status(client_id, period)` | Get production pipeline status | client, period | pipeline status |
| `route_calendar_for_approval(calendar_id, recipient)` | Route calendar for Aarya's approval | calendar_id, recipient | approval_request_id |
| `get_platform_requirements(platform)` | Get platform-specific requirements | platform | requirements |
| `generate_adherence_alert(item, status)` | Generate calendar adherence alert | item, status | alert |

**Read-only first:** Start Kalpana with reads + calendar building + brief preparation. Write actions (route_calendar_for_approval) require the calendar store to be live.

---

## 15. CONFIGURATION (YAML config example with authority_matrix)

```yaml
agent_id: SAM-AG-077
name: Kalpana
position: CRT-003
model: qwen2.5:7b
system_prompt_ref: section_13
tools:
  - get_approved_strategy
  - build_monthly_calendar
  - build_weekly_schedule
  - assign_platform_format
  - set_production_deadlines
  - prepare_content_brief
  - check_agent_capacity
  - monitor_calendar_adherence
  - detect_overdue_items
  - revise_calendar
  - get_content_pipeline_status
  - route_calendar_for_approval
  - get_platform_requirements
  - generate_adherence_alert
authority_matrix:
  creative.read: true
  creative.plan: true
  creative.calendar: true
  creative.brief: true
  creative.schedule: true
  creative.publish: false
  creative.clinical_approve: false
  creative.change_strategy: false
  creative.bypass_approval: false
  creative.cross_tenant: false
limits:
  max_calendar_items_per_run: 100
  max_briefs_per_run: 50
  token_budget_per_run: 200000
tenant_isolation:
  enabled: true
  cross_client_access: denied
  log_violations: true
```

---

## 16. CODE SCAFFOLDING (Pydantic models, tool implementations with guard rules, authority matrix YAML, test scaffolding with 9 pytest scenarios)

### 16.1 Stack (all local, zero cost)

| Layer | Use |
|---|---|
| Language | Python 3.11+ |
| Agent framework | LangGraph |
| LLM | Ollama + Qwen (`qwen2.5:7b`) at `http://localhost:11434` |
| Database | PostgreSQL (local) |
| ORM | SQLAlchemy |
| Task queue | Celery + Redis (local) |
| API | FastAPI |
| Config | YAML per agent |
| Logging | Structured JSON → PostgreSQL |

### 16.2 Project structure (Kalpana's part of the P1 monorepo)

```
samrudhi-p1/
├── agents/
│   ├── base_state.py           # BaseAgentState TypedDict (shared)
│   ├── registry.py             # get_agent(agent_id) factory
│   ├── kalpana_state.py        # KalpanaState extends BaseAgentState
│   └── kalpana.py              # Kalpana's LangGraph graph
├── config/
│   └── agents/
│       └── kalpana.yaml        # model, tools, limits, authority_matrix
├── tools/
│   ├── authority.py            # authority_guard decorator (shared)
│   └── kalpana_tools.py        # the 14 tools from section 14
├── creative/
│   ├── calendar_builder.py     # KAL-W01/W02: calendar creation
│   ├── brief_preparation.py    # KAL-W03: brief preparation
│   ├── adherence_monitor.py    # KAL-W04: adherence monitoring
│   └── calendar_revision.py    # KAL-W05: revision & replanning
├── models/
│   ├── content_calendar.py     # content calendar store
│   ├── content_brief.py        # content brief store
│   └── production_schedule.py  # production schedule store
├── workflows/
│   ├── kal_w01_monthly.py
│   ├── kal_w02_weekly.py
│   ├── kal_w03_briefs.py
│   ├── kal_w04_adherence.py
│   └── kal_w05_revision.py
├── tasks.py                    # Celery run_agent task (shared)
├── bus/
│   └── messages.py             # BusEnvelope model (shared)
└── tests/
    ├── conftest.py             # pytest fixtures (db_session, demo_tenant)
    └── test_kalpana.py         # the 9 scenarios — scaffolding below
```

### 16.3 Kalpana's LangGraph state (`agents/kalpana_state.py`)

```python
# agents/kalpana_state.py
from typing import TypedDict, Optional, Any
from agents.base_state import BaseAgentState

class KalpanaState(BaseAgentState):
    # KALPANA-SPECIFIC FIELDS (typed, not free-form)
    client_id: Optional[str]                 # input: client tenant ID
    calendar_period: Optional[str]           # input: month/week
    strategy_ref: Optional[str]              # input: approved strategy reference
    content_items: list[dict[str, Any]]      # output of calendar building
    weekly_schedule: Optional[dict[str, Any]]# output of weekly schedule
    content_briefs: list[dict[str, Any]]     # output of brief preparation
    adherence_report: Optional[dict[str, Any]]# output of adherence monitoring
    overdue_items: list[dict[str, Any]]      # detected overdue/at-risk
    handoff_events: list[str]                # bus event_ids emitted (for audit)
```

### 16.4 Kalpana's database tables (full SQLAlchemy models + DDL)

**`content_calendar`** — the calendar store

```python
# models/content_calendar.py
from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID, JSON
from sqlalchemy.orm import relationship
from models.base import Base

class CalendarStatus:
    DRAFT = "draft"
    PENDING_APPROVAL = "pending_approval"
    APPROVED = "approved"
    REVISION = "revision"
    ARCHIVED = "archived"

class ContentCalendar(Base):
    __tablename__ = "content_calendar"
    id = Column(UUID(as_uuid=True), primary_key=True, server_default=func.gen_random_uuid())
    calendar_id = Column(String(20), unique=True, nullable=False, index=True)
    client_id = Column(String(50), nullable=False, index=True)
    period = Column(String(20), nullable=False)  # e.g. "2026-11" or "2026-W45"
    period_type = Column(String(10), nullable=False)  # "month" or "week"
    content_items = Column(JSON, nullable=False, default=list)
    strategy_ref = Column(String(50), nullable=False)
    version = Column(Integer, nullable=False, default=1)
    parent_calendar_id = Column(UUID(as_uuid=True))  # for revisions
    status = Column(String(20), nullable=False, default=CalendarStatus.DRAFT, index=True)
    generated_by = Column(String(20), nullable=False)  # agent ID
    generated_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    approved_by = Column(String(50))
    approved_at = Column(DateTime(timezone=True))
```

**`content_briefs`**

```python
# models/content_brief.py
class ContentBrief(Base):
    __tablename__ = "content_briefs"
    id = Column(UUID(as_uuid=True), primary_key=True, server_default=func.gen_random_uuid())
    brief_id = Column(String(20), unique=True, nullable=False, index=True)
    content_id = Column(String(50), nullable=False, index=True)
    client_id = Column(String(50), nullable=False, index=True)
    platform = Column(String(30), nullable=False)
    format = Column(String(30), nullable=False)
    topic = Column(String(200), nullable=False)
    content_pillar = Column(String(50))
    requirements = Column(JSON, nullable=False, default=dict)
    assigned_agents = Column(JSON, nullable=False, default=list)
    deadlines = Column(JSON, nullable=False, default=dict)
    clinical_review_required = Column(String(10), default="no")  # yes/no
    status = Column(String(20), nullable=False, default="proposed")
    created_by = Column(String(20), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
```

### 16.5 Kalpana's tools (exact Pydantic schemas)

```python
# tools/kalpana_tools.py
from pydantic import BaseModel, Field
from typing import Optional, Any, List
from tools.authority import authority_guard

# --- Input schemas ---
class BuildMonthlyCalendarIn(BaseModel):
    client_id: str = Field(..., description="Client tenant ID")
    strategy_ref: str = Field(..., description="Approved strategy reference")
    month: str = Field(..., description="Calendar month (e.g. 2026-11)")

class BuildWeeklyScheduleIn(BaseModel):
    calendar_id: str
    week: str = Field(..., description="Week identifier (e.g. 2026-W45)")

class PrepareContentBriefIn(BaseModel):
    content_item: dict[str, Any]
    strategy_ref: str

class MonitorAdherenceIn(BaseModel):
    calendar_id: str
    progress_data: List[dict[str, Any]]

class ReviseCalendarIn(BaseModel):
    calendar_id: str
    revision_reason: str
    changes: dict[str, Any]

class RouteForApprovalIn(BaseModel):
    calendar_id: str
    recipient: str = Field(..., description="Approver agent ID or human role")

# --- Output schemas ---
class ContentItem(BaseModel):
    content_id: str
    platform: str
    format: str
    topic: str
    content_pillar: str
    date: str
    deadlines: dict[str, str]
    assigned_agents: List[str]
    approval_status: str

class MonthlyCalendar(BaseModel):
    calendar_id: str
    client_id: str
    period: str
    content_items: List[ContentItem]
    strategy_ref: str
    version: int
    status: str
    capacity_check: dict

class ContentBriefRecord(BaseModel):
    brief_id: str
    content_id: str
    platform: str
    format: str
    topic: str
    requirements: dict
    assigned_agents: List[str]
    deadlines: dict
    clinical_review_required: str

class AdherenceReport(BaseModel):
    calendar_id: str
    period: str
    on_track: int
    at_risk: int
    overdue: int
    items: List[dict]
    recommendations: List[dict]
```

**Tool implementations — key guard rules:**

```python
@authority_guard(action="build_monthly_calendar", required_permission="creative.calendar", allowed_agents=["SAM-AG-077"])
def build_monthly_calendar(inp: BuildMonthlyCalendarIn) -> MonthlyCalendar:
    # 1. Check client_id is in approved tenant scope (Niyantrak)
    # 2. Only build from approved strategy (strategy_ref must be approved)
    # 3. Check agent capacity before assigning deadlines
    # 4. If cross-tenant access attempted → raise AuthorityError, log violation
    ...

@authority_guard(action="prepare_content_brief", required_permission="creative.brief", allowed_agents=["SAM-AG-077"])
def prepare_content_brief(inp: PrepareContentBriefIn) -> ContentBriefRecord:
    # 1. Extract topic, platform, format from content item
    # 2. Add platform-specific requirements
    # 3. Flag clinical review if healthcare content
    # 4. Assign to production agents based on competency
    ...

@authority_guard(action="route_calendar_for_approval", required_permission="creative.calendar", allowed_agents=["SAM-AG-077"])
def route_calendar_for_approval(inp: RouteForApprovalIn) -> dict:
    # 1. Update calendar status to "pending_approval"
    # 2. Create approval request record
    # 3. Notify approver (Aarya)
    # 4. Cannot mark as "published" — only Prakash can publish
    ...
```

### 16.6 Kalpana's authority_matrix (`config/agents/kalpana.yaml`)

```yaml
agent_id: SAM-AG-077
name: Kalpana
position: CRT-003
model: qwen2.5:7b
system_prompt_ref: section_13
tools:
  - get_approved_strategy
  - build_monthly_calendar
  - build_weekly_schedule
  - assign_platform_format
  - set_production_deadlines
  - prepare_content_brief
  - check_agent_capacity
  - monitor_calendar_adherence
  - detect_overdue_items
  - revise_calendar
  - get_content_pipeline_status
  - route_calendar_for_approval
  - get_platform_requirements
  - generate_adherence_alert
authority_matrix:
  creative.read: true
  creative.plan: true
  creative.calendar: true
  creative.brief: true
  creative.schedule: true
  creative.publish: false
  creative.clinical_approve: false
  creative.change_strategy: false
  creative.bypass_approval: false
  creative.cross_tenant: false
limits:
  max_calendar_items_per_run: 100
  max_briefs_per_run: 50
  token_budget_per_run: 200000
```

### 16.7 Kalpana's Celery task wiring

Kalpana runs via the shared `tasks.run_agent` task. Register the agent:

```python
# agents/registry.py
from agents.kalpana import build_kalpana_graph

AGENT_FACTORIES = {
    "SAM-AG-077": build_kalpana_graph,
    # ... other agents
}
```

### 16.8 Test scaffolding (`tests/test_kalpana.py`)

The 9 scenarios as executable pytest:

```python
# tests/test_kalpana.py
import pytest
from unittest.mock import patch
from agents.registry import get_agent
from tools.authority import AuthorityError
from seed_p1 import seed_demo

@pytest.fixture(autouse=True)
def demo_tenant(db_session):
    """Reset DB + seed demo tenant before each test."""
    seed_demo(db_session)
    yield

@pytest.mark.asyncio
async def test_1_build_calendar_from_approved_strategy():
    kalpana = get_agent("SAM-AG-077")
    result = await kalpana.ainvoke({
        "task": "build_monthly_calendar client=DEMO-HEALTHCARE-01 strategy=STRAT-001 month=2026-11",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    assert result["status"] == "success"
    assert len(result.get("content_items", [])) > 0

@pytest.mark.asyncio
async def test_2_refuse_unapproved_strategy():
    kalpana = get_agent("SAM-AG-077")
    result = await kalpana.ainvoke({
        "task": "build_monthly_calendar with unapproved strategy STRAT-UNAPPROVED",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    assert result["status"] == "failed"
    assert "approved" in result.get("error", "").lower()

@pytest.mark.asyncio
async def test_3_refuse_cross_tenant_access():
    kalpana = get_agent("SAM-AG-077")
    result = await kalpana.ainvoke({
        "task": "build_monthly_calendar for OTHER-CLIENT-02",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    assert result["status"] == "failed"
    assert "tenant" in result.get("error", "").lower()

@pytest.mark.asyncio
async def test_4_refuse_publish():
    kalpana = get_agent("SAM-AG-077")
    result = await kalpana.ainvoke({
        "task": "publish content item CONTENT-001",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    assert result.get("refused") is True

@pytest.mark.asyncio
async def test_5_refuse_strategy_change():
    kalpana = get_agent("SAM-AG-077")
    result = await kalpana.ainvoke({
        "task": "change content strategy to add new pillar",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    assert result.get("refused") is True
    assert result.get("route_to_disha") is True

@pytest.mark.asyncio
async def test_6_overdue_item_escalates():
    kalpana = get_agent("SAM-AG-077")
    result = await kalpana.ainvoke({
        "task": "monitor_calendar_adherence with overdue content item",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    assert result["status"] == "escalated"
    assert len(result.get("overdue_items", [])) > 0

@pytest.mark.asyncio
async def test_7_brief_complete():
    kalpana = get_agent("SAM-AG-077")
    result = await kalpana.ainvoke({
        "task": "prepare_content_brief for CONTENT-001",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    assert result["status"] == "success"
    brief = result.get("brief")
    # Brief must have all required fields
    assert "platform" in brief
    assert "format" in brief
    assert "topic" in brief
    assert "requirements" in brief
    assert "assigned_agents" in brief
    assert "deadlines" in brief

@pytest.mark.asyncio
async def test_8_idempotent_calendar_generation():
    kalpana = get_agent("SAM-AG-077")
    r1 = await kalpana.ainvoke({
        "task": "build_monthly_calendar client=DEMO-HEALTHCARE-01 strategy=STRAT-001 month=2026-11",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    r2 = await kalpana.ainvoke({
        "task": "build_monthly_calendar client=DEMO-HEALTHCARE-01 strategy=STRAT-001 month=2026-11",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    assert r1["status"] == "success"
    assert r2.get("already_generated") is True
    assert r2["calendar_id"] == r1["calendar_id"]  # no duplicate

@pytest.mark.asyncio
async def test_9_model_unavailable_no_crash():
    kalpana = get_agent("SAM-AG-077")
    with patch("agents.base.llm_available", return_value=False):
        result = await kalpana.ainvoke({
            "task": "build_monthly_calendar client=DEMO-HEALTHCARE-01 strategy=STRAT-001 month=2026-11",
            "tenant_id": "DEMO-HEALTHCARE-01",
        })
    assert result["status"] == "failed"
    assert "model unavailable" in result.get("error", "").lower()
    assert result.get("fake_output") is None
```

### 16.9 Build order for the coding agent

1. Apply the shared DDL (`P0_Architecture_5.md` sec 5.4.5) + append-only grants.
2. Create `agents/kalpana_state.py` (extends shared base).
3. Create `tools/kalpana_tools.py` with the 14 tools + Pydantic schemas above.
4. Create `models/content_calendar.py`, `content_brief.py`.
5. Create `config/agents/kalpana.yaml` with the authority_matrix above.
6. Create `agents/kalpana.py` — LangGraph graph using the system prompt from section 13, wired to the tools.
7. Create `tests/test_kalpana.py` + `tests/conftest.py` (shared fixtures).
8. Run `pytest tests/test_kalpana.py -v` — all 9 must pass.
9. Run `seed_p1.py` to populate demo tenant, then manually invoke Kalpana via the API to verify the live flow.

### 16.10 Out of scope (Kalpana does NOT do these)

- Does NOT publish content or schedule posts (Prakash's job)
- Does NOT approve clinical claims (Shuddhi/Swasthya's job)
- Does NOT change content strategy (Disha's job)
- Does NOT write copy or create designs (Lekha/Chitra's job)
- Does NOT build the platform (Sutra's job)
- Does NOT manage the registry directly (Niyantrak's job)
- Does NOT store client data outside approved tenant scope

---

## 17. SOURCE MAP

| Section of this README | PDF file | Pages |
|---|---|---|
| Department 06 structure, 22-role register (Kalpana CRT-003, P1) | SAMRUDHI AGENTIC AI.pdf | 107–125 |
| Editorial Planning & Content Development functional group | SAMRUDHI AGENTIC AI.pdf | 112 |
| Creative production workflow (step 03 — Editorial Planning) | SAMRUDHI AGENTIC AI.pdf | 114 |
| Creative process master (CRT-P07, CRT-P08) | SAMRUDHI AGENTIC AI.pdf | 115 |
| Agent-specific performance metrics (Kalpana) | SAMRUDHI AGENTIC AI.pdf | 120 |
| Content quality & compliance control layers | SAMRUDHI AGENTIC AI.pdf | 123 |
| Creative & Content Command Centre (Editorial Delivery panel) | SAMRUDHI AGENTIC AI.pdf | 123–124 |
| Authority boundaries (no publishing, no clinical approval) | SAMRUDHI AGENTIC AI.pdf | 112, 114 |
| Specialist identities (Kalpana SAM-AG-004 pilot alias) | SAMRUDHI AGENTIC AI.pdf | 26 |
| Canonical ID SAM-AG-077, position CRT-003 | SAMRUDHI AGENTIC AI(1).pdf | 129 |
| Organisation-wide accountability rules (tenant isolation) | SAMRUDHI AGENTIC AI(2).pdf | Section 9 |
| P0 connection wiring | Built from all three PDFs (this README section 11) | — |
| Pipeline connections | Built from PDF1 p.114 workflow (section 10) | — |

**Decisions made in this README (not in the PDFs):**
- System prompt text — built from the Creative & Content department spec (section 13)
- Model choice — Ollama + Qwen (`qwen2.5:7b`), local, zero cost, configurable
- Content calendar schema — defined in `models/content_calendar.py`
- KPI targets — taken from the PDFs, to be baseline-tested in the first 30 days
- P0/P1 message protocol details — defined in `P0_Architecture_5.md`
