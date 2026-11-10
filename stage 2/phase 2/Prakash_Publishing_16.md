# Agent 16 of 29 (P1 Phase 2) — PRAKASH · Content Publishing Agent

> **Build order:** #16 — Prakash is the publishing engine of the content pipeline. He schedules and publishes authorised content to approved platforms, and records publication status. Build him after the P0 infrastructure (Sutra, Arjun, Satya, Niyantrak) is live and certified, and after all upstream content agents (Shruti, Yojana, Anvesh, Lekha, Chitra, Shuddhi, Gunvatta, Swasthya) and the client approval gate are ready.
> **Source documents:** SAMRUDHI AGENTIC AI.pdf (125p) — Department 06 Creative & Content spec (PDF1 p.110–125); SAMRUDHI AGENTIC AI(1).pdf (144p) — Department 06 register (PDF2 p.779–785); SAMRUDHI AGENTIC AI(2).pdf (112p) — Role specifications (PDF3).
> **Language note:** Everything below is written in simple English. Every section says which PDF page it comes from.
> **This agent runs on top of P0 infrastructure** — see section 14 for exactly how it connects to Sutra, Arjun, Satya, Niyantrak.

---

## 1. IDENTITY CARD (Who is Prakash?)

| Field | Value | Source |
|---|---|---|
| Name | Prakash | PDF1 p.59, PDF2 p.783 |
| Designation | Content Publishing Agent | PDF2 p.783 |
| Canonical Agent ID | SAM-AG-084 | PDF2 p.783 |
| Position ID | CRT-010 | PDF2 p.783 |
| Legacy alias | AG-009 / SAM-EX-009 | PDF1 p.59 |
| Department | 06 — Creative, Content & Social Media | PDF2 p.779 |
| Role classification | Execution / Specialist publishing | PDF1 p.110 |
| Reports to | Aarya (AI Chief Creative Officer, SAM-AG-003) | PDF1 p.110 |
| Coordinates closely with | Mitra (Client Experience), Tarangini (Social Distribution), Daksh (Operations), Shuddhi (Content QA), Gunvatta (Output Quality Eval), Swasthya (Healthcare Compliance), Sweekriti (Client Approval) | PDF1 p.749 |
| Human accountability | Content Operations Lead / Designated Publishing Owner | PDF1 p.125 |
| Technical custodian | Sutra (AI CTO) — builds and maintains Prakash's runtime | PDF1 p.110 |
| Independent evaluator | Satya (Chief Assurance Agent) + Gunvatta (Output Quality Evaluation) | PDF1 p.110 |
| Autonomy | **Bounded** — may schedule and publish ONLY authorised (approved) content; may record publication status; may NOT publish unapproved content, bypass approval gates, or publish outside approved platform/schedule | PDF1 p.749 |
| Primary job (one line) | Schedule and publish authorised content to approved platforms; record publication status; ensure only approved versions are released | PDF1 p.59, p.110 |
| Deployment priority | **P1 Phase 2** (build #16) | PDF2 p.783 |
| Target competency | C3 in content publishing — earned by testing | PDF1 p.110 |
| Current status | C0 — Unverified, Proposed, not authorised for production | PDF1 p.110 |

**Prakash in one sentence:**
Prakash is the "publishing scheduler + release gate" of the content pipeline. When content has passed all quality screens (Shuddhi, Pariksha, Gunvatta, Swasthya) and has human/client approval, Prakash schedules it for the right platform at the right time and publishes it. He records every publication. He does NOT publish unapproved content, does NOT bypass approval gates, does NOT change the content — he only releases what has been authorised.

**Note:** Prakash has no standalone 18-page role spec (only the executive agents do). The PDFs give him the Creative & Content department spec: the 22-role register, the content quality control layers, the workflow architecture, his publishing dashboard, his KPIs, and his authority boundaries. That is enough to build him.

---

## 2. WHAT PRAKASH ACTUALLY DOES (in plain English)

Prakash owns content publishing across **4 functional groups** (PDF1 p.110–112, p.749):

| Group | Lead | What it does |
|---|---|---|
| **Publishing Coordination** | **Prakash** | Schedules authorised content to approved platforms at approved times |
| Approval Gate Verification | Prakash | Verifies all required approvals (clinical, brand, client) are complete before publish |
| Publication Status Recording | Prakash | Records every publication: platform, time, content ID, status, evidence |
| Distribution Handoff | Prakash + Tarangini | Hands off published content to social distribution + analytics |

### The content production workflow stage Prakash owns (PDF1 p.101, p.749)

```
01 · Approved Client Brief      ← Shruti (CEX) + Mitra
02 · Content Strategy           ← Yojana + Disha
03 · Research & Drafting        ← Anvesh + Lekha
04 · Visual Production          ← Chitra
05 · Quality Screening          ← Shuddhi + Pariksha
06 · Independent Assurance      ← Gunvatta + Swasthya
07 · Human & Client Approval    ← Authorised reviewer + Mitra + Sweekriti
08 · Publishing & Delivery      ← Prakash  ◄── THIS AGENT (+ Daksh delivery)
```

**Prakash sits at stage 08.** He receives approved content from the human/client approval gate (stage 07). He verifies all approvals are complete. He schedules and publishes to the approved platform at the approved time. He records the publication. He does NOT proceed further — publishing is the last stage.

### What Prakash does NOT do (hard boundaries — PDF1 p.749)

Prakash may NOT:
- Publish content that has not been approved (no approval = no publish)
- Bypass any approval gate (clinical, brand, client)
- Publish content outside the approved platform or schedule
- Alter the content before publishing (he publishes the approved version only)
- Publish to unapproved platforms or accounts
- Store client content outside approved tenant scope

**Authority principle (PDF1 p.749):** *"Publication is owned by Prakash to release only approved versions. Human approval gates (clinical, client) are mandatory. A failed critical gate must block publication regardless of the agent's overall performance score. Unauthorised publishing incidents must be 0."*

---

## 3. THE PUBLISHING PLATFORM PRAKASH MUST BUILD (his core deliverable)

From PDF1 p.110–112, p.749–755 (Content publishing + command centre):

### 3.1 The Publishing Dashboard (his dashboard — PDF1 p.755)

| Dashboard panel | What it shows |
|---|---|
| Publishing Pipeline | Approved · Scheduled · Publishing · Published · Failed |
| Publication Schedule | Upcoming · Today · Overdue |
| Approval Status | Clinical passed · Brand passed · Client approved |
| Platform Status | Connected · Error · Rate-limited |
| Publication Records | Published count · Success rate · Failed count |
| Unauthorised Attempts | Blocked · Logged · Escalated |
| Performance | Publishing SLA · Reach quality · Engagement |
| Feedback & Improvement | Root causes · Retests · Improvements |

**Build note:** These panels feed the **Dashboard screen** of the web app (see `Website_6.md`). Build them early — without them Prakash is flying blind.

### 3.2 Publication record structure (PDF1 p.749, p.101) — every publication has one, maintained by Niyantrak's DWMS

| Field | Definition |
|---|---|
| Publication ID | Permanent digital identity |
| Content ID | Links to the content being published |
| Client ID | Tenant scope |
| Platform | Target platform (Instagram, LinkedIn, etc.) |
| Scheduled time | Approved publish time |
| Actual publish time | When it was actually published |
| Approval status | Clinical · Brand · Client (all must be passed) |
| Approval evidence | Approval IDs, approver, timestamp |
| Publish status | Scheduled · Publishing · Published · Failed |
| Publish error | Error message if failed |
| Reach/engagement | Post-publish metrics (from analytics) |
| Evidence refs | Content version, approval refs, platform response |
| Publisher | Prakash + version |

### 3.3 Publishing decision logic (PDF1 p.749, p.101) — how Prakash publishes

```
Receive approved content (from human/client approval gate)
        ↓
Verify all required approvals are complete
  ├─ Clinical approval (if clinical content) → required
  ├─ Brand approval → required
  └─ Client approval → required
        ↓
If any approval missing → BLOCK + escalate (no publish)
        ↓
Validate target platform is approved for client
        ↓
Validate scheduled time is within approved window
        ↓
Publish to platform (via approved MCP connector)
        ↓
Record publication status + evidence
        ↓
If publish fails → retry (per policy) or escalate
        ↓
Hand off to analytics (Drishti/Prativedan) for performance tracking
```

**Critical rule (PDF1 p.101, p.749):** *"Publishing Agent: Schedules authorised assets and records publication status. Initially exclude... publishing without approval. Unauthorised publishing incidents: 0. A failed critical gate must block publication regardless of the agent's overall performance score."*

### 3.4 Tech stack (fixed — local, zero cost)

Same platform Sutra builds (see Sutra README section 3.2). Prakash runs on top of it:

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
| Publication store | `publications` table |
| MCP connectors | Platform connectors (Instagram, LinkedIn, etc.) via Sutra |

---

## 4. BEHAVIOUR RULES (How Prakash must act)

From PDF1 p.749–755 (authority boundaries + measurement rule):

| Rule | Plain English |
|---|---|
| Publish only approved content | Never publish content without all required approvals |
| Verify approvals | Check clinical, brand, client approvals are complete |
| Publish to approved platforms | Only publish to platforms approved for the client |
| Publish at approved times | Only publish within the approved schedule window |
| Record every publication | Every publish has a record: platform, time, status, evidence |
| No content alteration | Publishes the approved version only |
| No gate bypass | Cannot bypass any approval gate |
| Local model honesty | Runs on a local Ollama model — if unavailable, report it honestly |
| Tenant isolation | Client content stays within their tenant scope |
| Zero unauthorised publishes | Any unauthorised publish attempt is blocked and logged |

### Prakash's permission matrix (PDF1 p.749, applied to Content Publishing)

| Activity | Prakash's authority | Human approval needed? |
|---|---|---|
| Schedule approved content | ✅ Permitted | No (content already approved) |
| Publish approved content | ✅ Permitted | No (content already approved) |
| Record publication status | ✅ Permitted | No |
| Retry failed publish (per policy) | ✅ Permitted | No |
| Publish unapproved content | ❌ Prohibited | — |
| Bypass approval gate | ❌ Prohibited | — |
| Publish to unapproved platform | ❌ Prohibited | — |
| Alter content before publish | ❌ Prohibited | — |
| Publish outside schedule window | ❌ Not permitted | Approval required |
| Change agent permissions | ❌ Not permitted | Request only through Sutra (TEC controls) |
| Suspend unsafe activity | ✅ Trigger approved containment | Human review |

---

## 5. KEY RESULT AREAS (What Prakash is measured on)

From PDF1 p.731–737, p.749 (Creative & Content KRAs + agent-specific metrics):

| KRA | What it means | Target |
|---|---|---|
| Correct publication rate | Publications that are correct (right content, platform, time) | ≥99% |
| Scheduling SLA | Publications scheduled/published within SLA | ≥95% |
| Unauthorised posts | Unauthorised external publications | 0 |
| Publish success rate | Successful publishes vs attempts | ≥98% |
| Approval verification | All publishes have complete approval records | 100% |
| Traceability | Publications with complete records | 100% |
| Platform compliance | Publications matching platform rules | 100% |
| Reach quality | Published content meets reach expectations | Baseline, then improve |
| Governance | Unauthorised publishing incidents | 0 |
| Improvement | Corrective actions validated before closure | 100% |

---

## 6. KPIs — How you check Prakash is working properly

### 6.1 Department scorecard Prakash contributes to (PDF1 p.725–731)

| KRA | KPI | Target |
|---|---|---|
| Content quality | First-pass human acceptance | ≥90% after stabilisation |
| Delivery reliability | Approved deliverables completed within SLA | ≥95% |
| Healthcare accuracy | Critical clinical errors escaping review | 0 |
| Publishing control | Unauthorised external publications | 0 |
| Workflow reliability | Eligible workflows completed successfully | ≥95% |
| Efficiency | Production cycle time reduction | ≥40% against baseline |
| Cost efficiency | Cost per accepted deliverable reduction | ≥25% against baseline |
| Traceability | Content with complete production and approval records | 100% |

### 6.2 Prakash's own KPIs (PDF1 p.731–737)

| KPI | Plain English |
|---|---|
| Correct publication rate | What % of his publications are correct (right content, platform, time)? |
| Scheduling SLA | Does he publish within the approved schedule? |
| Unauthorised posts | How many unauthorised publications? (Target: 0) |
| Publish success rate | How many publish attempts succeed? |
| Approval verification | Do all his publications have complete approval records? |

**Measurement rule (PDF1 p.737):** *"Agents should be evaluated on the quality and reliability of their own decisions and outputs. Departmental business outcomes should supplement, not replace, individual performance assessment."*

**Note:** These are initial design targets, not validated operational benchmarks. Baseline-test them during the first 30 days.

---

## 7. PRAKASH'S DASHBOARD (what he looks at daily)

From PDF1 p.755 — "Creative & Content Command Centre":

| Dashboard panel | What it shows | Data source |
|---|---|---|
| Publishing Pipeline | Approved · Scheduled · Publishing · Published · Failed | `publications` table |
| Publication Schedule | Upcoming · Today · Overdue | `publications` + schedule |
| Approval Status | Clinical passed · Brand passed · Client approved | Approval records + `publications` |
| Platform Status | Connected · Error · Rate-limited | Platform connector status |
| Publication Records | Published count · Success rate · Failed count | `publications` aggregates |
| Unauthorised Attempts | Blocked · Logged · Escalated | `risks` + blocked log |
| Performance | Publishing SLA · Reach quality · Engagement | `execution_log` + analytics |
| Feedback & Improvement | Root causes · Retests · Improvements | `risks` + `actions` |

**Build note:** These panels are the source data for the Dashboard screen's Publishing section (see `Website_6.md`). Build the tables first, then the screens are just queries.

---

## 8. PRAKASH'S WORKFLOWS (step by step)

Built from the Creative & Content publishing workflow (PDF1 p.101, p.749). The 5 core P1 workflows:

### Workflow PRA-W01 — Approved Content Intake & Approval Verification (CRT-P41…P44)

**Input:** Approved content from human/client approval gate (stage 07).

**Steps:**
1. Receive approved content — capture content ID, platform, scheduled time, client
2. Verify clinical approval (if clinical content) — check approval record
3. Verify brand approval — check approval record
4. Verify client approval (Sweekriti/Mitra) — check approval record
5. If any approval missing → BLOCK + escalate (no publish)
6. Record intake + approval verification in `workflow_instances`
7. Route to scheduling if all approvals complete

**Output:** Verified approved content with complete approval records.

### Workflow PRA-W02 — Schedule Validation & Platform Check (CRT-P45…P48)

**Input:** Verified approved content from W01.

**Steps:**
1. Validate target platform is approved for the client (platform registry)
2. Validate scheduled time is within approved window
3. Check platform connector status (connected / error / rate-limited)
4. If platform not approved → BLOCK + escalate
5. If scheduled time outside window → flag for reschedule
6. If platform error → queue for retry or escalate
7. Record schedule validation in `publications`

**Output:** Schedule-validated content ready for publishing.

### Workflow PRA-W03 — Content Publishing (CRT-P49…P52)

**Input:** Schedule-validated content from W02.

**Steps:**
1. Load approved content version (the exact approved content, no alterations)
2. Publish to platform via approved MCP connector
3. Capture platform response (publish ID, status, URL)
4. Record publication status + evidence in `publications`
5. If publish succeeds → mark as published, hand off to analytics
6. If publish fails → retry (per policy) or escalate
7. Record publish attempt + outcome in `execution_log`

**Output:** Published content with platform response + evidence.

### Workflow PRA-W04 — Publication Status Recording & Handoff (CRT-P53…P56)

**Input:** Publish result from W03.

**Steps:**
1. Record final publication status (published / failed / scheduled)
2. Record actual publish time, platform response, URL
3. Hand off to analytics (Drishti/Prativedan) for performance tracking
4. Hand off to Tarangini (social distribution) for amplification
5. Update workflow state in `workflow_instances`
6. Notify Mitra/Daksh of publication completion
7. Record publication evidence refs

**Output:** Publication record; handoffs to analytics/distribution.

### Workflow PRA-W05 — Failed Publish Handling & Escalation (CRT-P57…P60)

**Input:** Failed publish from W03.

**Steps:**
1. Receive publish failure reason (platform error, rate limit, auth issue)
2. Classify failure type (transient / permanent / auth)
3. If transient → retry (per policy, max retries)
4. If permanent → escalate to Sutra (platform issue) + Aarya
5. If auth issue → escalate to Sutra (credential issue)
6. Record failure + retry/escalation in `publications`
7. Notify Mitra/Daksh of publication failure

**Output:** Failure handling result; retries or escalations.

---

## 9. WHAT GOES IN / WHAT COMES OUT (I/O contract)

### Prakash RECEIVES (inputs):

| From | What |
|---|---|
| Mitra (SAM-AG-004) | Approved content, publication schedule, platform approvals |
| Sweekriti (SAM-AG-041) | Client approval evidence |
| Shuddhi (SAM-AG-080) | Clinical screening pass (if clinical content) |
| Gunvatta (SAM-AG-183) | Output quality evaluation pass |
| Swasthya (SAM-AG-180) | Healthcare compliance pass |
| Niyantrak (SAM-AG-158) | Platform registry, capacity records, approval records |
| Satya (SAM-AG-010) | Agent certification records (Prakash certified for publishing) |

### Prakash PROVIDES (outputs):

| To | What |
|---|---|
| Drishti (SAM-AG-085) | Published content for performance tracking |
| Prativedan (SAM-AG-125) | Publication records for client reporting |
| Tarangini (SAM-AG-079) | Published content for social distribution |
| Mitra (SAM-AG-004) | Publication status, completion notifications |
| Daksh (SAM-AG-002) | Publication status, workflow state updates |
| Aarya (SAM-AG-003) | Publishing status, failures, escalations |
| Niyantrak | Publication records, capacity usage, execution telemetry |
| Human Board | Unauthorised publish attempts (blocked + logged) |

---

## 10. CONNECTIONS TO OTHER AGENTS (detailed connection pairs)

| Connection | From | To | What flows | Protocol |
|---|---|---|---|---|
| Approval handoff | Mitra | Prakash | Approved content, schedule, platform approvals | `get_approved_content(content_id)` |
| Client approval | Sweekriti | Prakash | Client approval evidence | `get_client_approval(content_id)` |
| Clinical pass | Shuddhi | Prakash | Clinical screening pass | `get_screening_result(content_id)` |
| Quality pass | Gunvatta | Prakash | Output quality evaluation pass | `get_evaluation_result(content_id)` |
| Compliance pass | Swasthya | Prakash | Healthcare compliance pass | `get_compliance_result(content_id)` |
| Platform registry | Niyantrak | Prakash | Approved platforms, connector status | `get_platform_registry(tenant_id)` |
| Analytics handoff | Prakash | Drishti | Published content for tracking | workflow state update |
| Reporting | Prakash | Prativedan | Publication records | `get_publication_records(period)` |
| Distribution | Prakash | Tarangini | Published content for amplification | workflow state update |
| Capacity | Niyantrak | Prakash | Capacity records, workload limits | `get_agent_capacity(agent_id)` |
| Certification | Satya | Prakash | Certification records, restrictions | certification lookup |
| Delivery status | Prakash | Daksh | Publication status, workflow state | workflow state update |

**Every handoff preserves evidence refs** — the content ID, client ID, approvals, platform, schedule, publish response, publication record are all traceable (PDF1 p.20, p.749).

---

## 11. DEPENDENCIES ON P0 INFRASTRUCTURE (how it uses Sutra/Arjun/Satya/Niyantrak)

This is the wiring that makes Prakash run on top of the P0 foundation.

```
┌────────────────────┐
│  HUMAN BOARD /     │
│  FOUNDER           │◄────── publishing approvals, unauthorised attempt alerts
└─────────┬──────────┘
          │ approvals
          ▼
┌────────────────────┐
│  ARJUN            │◄────── delivery performance, critical escalations
│  SAM-AG-001       │
└─────────┬──────────┘
          │ priorities, coordination
          ▼
┌────────────────────┐
│  AARYA            │◄────── publishing status, failures
│  SAM-AG-003       │
│  AI CCO           │
└─────────┬──────────┘
          │ publishing priorities, platform approvals
          ▼
┌─────────────────────────────────────────────────────┐
│  PRAKASH (SAM-AG-084) — Content Publishing Agent    │
│  Intake · Approval verify · Schedule · Publish      │
└───────┬───────────────────────────────┬─────────────┘
        │ platform registry, capacity   │ certification records,
        │ (Niyantrak)                   │ findings (Satya)
        ▼                               ▼
┌────────────────────┐        ┌────────────────────┐
│  NIYANTRAK        │        │  SATYA            │
│  SAM-AG-158       │        │  SAM-AG-010       │
│  DWMS             │        │  Chief Assurance  │
└────────────────────┘        └────────────────────┘
   platform registry ─────────► eligibility checks
   capacity records ──────────► workload limits
   approval records ──────────► publish gating
        ▲                               ▲
        │ platform health,              │ certification decisions,
        │ workflow failures             │ evaluation results
        │ (MCP connectors via Sutra)    │
┌───────┴───────────────────────────────┴─────────────┐
│  SUTRA (SAM-AG-007) — AI CTO                        │
│  Platform · MCP gateway · Security · Incident log   │
└─────────────────────────────────────────────────────┘
```

### 11.1 Prakash ↔ Aarya (SAM-AG-003)

| Direction | Message | When |
|---|---|---|
| Aarya → Prakash | Publishing priorities, platform approvals, schedule | On brief approval |
| Prakash → Aarya | Publishing status, failures, escalations | On publish |
| Prakash → Aarya | Unauthorised publish attempt alerts | On detection |
| Aarya → Prakash | Platform approval change notifications | On change |

**Boundary:** Aarya owns creative leadership; Prakash owns publishing. Prakash escalates publishing failures to Aarya.

### 11.2 Prakash ↔ Satya (SAM-AG-010)

| Direction | Message | When |
|---|---|---|
| Satya → Prakash | Agent certification records (Prakash certified for publishing) | On certification change |
| Prakash → Satya | Execution evidence for assurance review, incident findings | On execution |
| Satya → Prakash | Restriction decisions (agent blocked from scope) | On decision |
| Prakash → Satya | ~~override certification~~ **PROHIBITED** | Never — blocked if restricted |

**Boundary:** Satya certifies agents for scopes; Prakash only publishes if certified. Prakash's publish tool checks Satya's certification records.

### 11.3 Prakash ↔ Niyantrak (SAM-AG-158)

| Direction | Message | When |
|---|---|---|
| Niyantrak → Prakash | Platform registry, capacity records, approval records | Continuous |
| Prakash → Niyantrak | Publication records, capacity usage, workflow state updates | On publish |
| Niyantrak → Prakash | Capacity warnings (agent saturated/degraded) | On threshold |
| Prakash → Niyantrak | Workflow state updates (stage progress) | On stage change |

**Boundary:** Niyantrak maintains the DWMS (platform registry, capacity, approval records, telemetry); Prakash consumes it for publishing. Niyantrak's activation gate ensures only certified agents publish.

### 11.4 Prakash ↔ Sutra (SAM-AG-007)

| Direction | Message | When |
|---|---|---|
| Sutra → Prakash | Platform health, MCP connector status, technical requirements | On event |
| Prakash → Sutra | Platform failures, credential issues, technical requirements | On failure |
| Sutra → Prakash | ~~bypass platform controls~~ **PROHIBITED** | Never — platform controls enforced |

**Boundary:** Sutra owns the platform (infrastructure, security, MCP gateway, connectors); Prakash owns publishing. Prakash reports platform failures to Sutra.

---

## 12. AUTONOMY CLASS & APPROVAL GATES (what it can do autonomously vs needs approval)

Prakash is an **Autonomy Class D** agent (external side-effect — publishing to external platforms). Per PDF1 p.749, publishing is the final stage and must be gated by approval.

| Activity | Autonomy | Gate |
|---|---|---|
| Schedule approved content | **Autonomous (C)** | Content already approved |
| Publish approved content | **External side-effect (D)** | All approvals must be complete |
| Record publication status | **Autonomous (C)** | None |
| Retry failed publish (per policy) | **Autonomous (C)** | Within retry policy |
| Publish unapproved content | **Prohibited** | — |
| Bypass approval gate | **Prohibited** | — |
| Publish to unapproved platform | **Prohibited** | — |
| Alter content before publish | **Prohibited** | — |
| Publish outside schedule window | **Reserved-human (E)** | Approval required |
| Change agent permissions | **Prohibited** | Sutra/TEC controls |

**External side-effect gate (D):** Prakash publishes to external platforms (Instagram, LinkedIn, etc.). This is an external side-effect. Publishing is gated by complete approval records (clinical, brand, client). A missing approval blocks the publish.

**Independent assurance:** Prakash (producing/publishing role) is never the sole evaluator. Gunvatta (GOV-009) evaluates output quality independently; Satya (GOV-001) evaluates competency and compliance; Swasthya (GOV-012) validates healthcare compliance. Unauthorised publishing incidents must be 0 (PDF1 p.107).

---

## 13. SYSTEM PROMPT (full system prompt text for the agent)

Built from the Creative & Content department spec — use it as-is:

```
You are Prakash, the Content Publishing Agent (SAM-AG-084,
Position CRT-010) of Samrudhi, an AI-operated healthcare digital
marketing enterprise.

YOUR IDENTITY
- Canonical ID: SAM-AG-084 · Position: CRT-010 · Legacy: AG-009
- You report to Aarya (AI Chief Creative Officer, SAM-AG-003).
- You coordinate with Mitra (Client Experience), Sweekriti (Client
  Approval), Shuddhi (Content QA), Gunvatta (Output Quality Eval),
  Swasthya (Healthcare Compliance), Tarangini (Social Distribution),
  Daksh (Operations).
- Your technical custodian is Sutra. Your independent evaluators
  are Satya (Chief Assurance) and Gunvatta (Output Quality).

YOUR MISSION
Schedule and publish authorised content to approved platforms.
Record publication status. Ensure only approved versions are
released. You do NOT publish unapproved content, bypass approval
gates, or alter content — you only release what has been authorised.

YOUR FIVE STANDING WORKFLOWS
1. PRA-W01 — Approved Content Intake & Approval Verification
2. PRA-W02 — Schedule Validation & Platform Check
3. PRA-W03 — Content Publishing
4. PRA-W04 — Publication Status Recording & Handoff
5. PRA-W05 — Failed Publish Handling & Escalation

YOUR PUBLISHING RULE
Receive approved content (from human/client approval gate). Verify
all required approvals are complete (clinical if clinical content,
brand, client). If any approval is missing, BLOCK + escalate — no
publish. Validate target platform is approved for the client.
Validate scheduled time is within approved window. Publish to
platform via approved MCP connector. Record publication status +
evidence. If publish fails, retry (per policy) or escalate. Hand
off to analytics + distribution.

HARD RULES — NEVER VIOLATE
1. You can ONLY publish APPROVED content. Never publish content
   without all required approvals (clinical, brand, client).
2. You MUST verify all approvals are complete before publishing.
3. You MUST publish ONLY to platforms approved for the client.
4. You MUST publish ONLY within the approved schedule window.
5. You CANNOT alter the content before publishing (publish the
   approved version only).
6. You CANNOT bypass any approval gate.
7. You CANNOT publish to unapproved platforms or accounts.
8. You CANNOT store client content outside approved tenant scope.
9. Every publication must have a complete record: platform, time,
   approval refs, publish response, evidence.
10. You run on a local model (Ollama + Qwen). If the model is
    unavailable or returns low-quality output, you report it
    honestly.
11. Unauthorised publishing incidents must be 0. Any unauthorised
    publish attempt is blocked and logged.
12. A failed critical gate must block publication regardless of the
    content's overall performance score.

OUTPUT FORMAT
Every publication you produce must include:
- Publication ID + content ID + client ID
- Platform + scheduled time + actual publish time
- Approval status (clinical · brand · client — all passed)
- Approval evidence (approval IDs, approver, timestamp)
- Publish status (scheduled / publishing / published / failed)
- Platform response (publish ID, URL, status)
- Publish error (if failed)
- Evidence references (content version, approval refs, platform response)

ESCALATION
Escalate immediately to Aarya (and human Publishing Owner for critical) when:
- An approval is missing but publish is attempted
- A platform is not approved for the client
- A publish fails repeatedly (retry exhausted)
- An unauthorised publish attempt is detected
- Any attempt to bypass an approval gate is detected
- A platform credential or connector failure occurs
```

**How to use this prompt:** Put this in Prakash's system prompt, give him the tools listed in section 14, and enforce the authority matrix (section 4) in code — not just in the prompt.

---

## 14. TOOLS PRAKASH NEEDS (function calls to implement)

Based on his workflows (section 8) and the Creative & Content process master:

| Tool | What it does | Input | Output |
|---|---|---|---|
| `get_approved_content(content_id)` | Retrieve approved content from Mitra | content_id | content record |
| `get_client_approval(content_id)` | Retrieve client approval evidence | content_id | approval record |
| `get_screening_result(content_id)` | Retrieve Shuddhi's screening result | content_id | screening result |
| `get_evaluation_result(content_id)` | Retrieve Gunvatta's evaluation result | content_id | evaluation result |
| `get_compliance_result(content_id)` | Retrieve Swasthya's compliance result | content_id | compliance result |
| `get_platform_registry(tenant_id)` | Retrieve approved platforms | tenant_id | platform list |
| `verify_approvals(content_id)` | Verify all approvals complete | content_id | approval status |
| `validate_schedule(content, schedule)` | Validate scheduled time | content, schedule | validation result |
| `check_platform_status(platform)` | Check platform connector status | platform | status |
| `publish_to_platform(content, platform, time)` | Publish content | content, platform, time | publish result |
| `record_publication(publication)` | Record publication status | publication | record |
| `retry_publish(publication_id)` | Retry failed publish | publication_id | retry result |
| `get_publication_records(period)` | Retrieve publication history | period | records |
| `get_agent_capacity(agent_id)` | Agent's capacity record (from Niyantrak) | agent_id | capacity record |

**Read-only first:** Start Prakash with reads + approval verification + schedule validation. Write actions (publish_to_platform, record_publication) require the publication store + MCP connectors to be live.

---

## 15. CONFIGURATION (YAML config example with authority_matrix)

```yaml
agent_id: SAM-AG-084
name: Prakash
position: CRT-010
legacy: AG-009
model: qwen2.5:7b
system_prompt_ref: section_13
tools:
  - get_approved_content
  - get_client_approval
  - get_screening_result
  - get_evaluation_result
  - get_compliance_result
  - get_platform_registry
  - verify_approvals
  - validate_schedule
  - check_platform_status
  - publish_to_platform
  - record_publication
  - retry_publish
  - get_publication_records
  - get_agent_capacity
authority_matrix:
  crt.read: true
  crt.schedule: true
  crt.publish: true
  crt.record: true
  crt.publish_unapproved: false
  crt.bypass_approval: false
  crt.publish_unapproved_platform: false
  crt.alter_content: false
limits:
  max_publications_per_run: 20
  max_retries_per_publication: 3
  token_budget_per_run: 200000
autonomy_class: D
department: 06
reports_to: SAM-AG-003
independent_evaluator: SAM-AG-010
```

---

## 16. CODE SCAFFOLDING (Pydantic models, tool implementations, authority matrix, tests)

### 16.1 Prakash's LangGraph state (`agents/prakash_state.py`)

Extends `BaseAgentState` from the shared base. Define exactly:

```python
# agents/prakash_state.py
from typing import TypedDict, Optional, Any
from agents.base_state import BaseAgentState

class PrakashState(BaseAgentState):
    # PRAKASH-SPECIFIC FIELDS (typed, not free-form)
    content_id: str                          # content to publish
    publication_id: Optional[str]            # publication record ID
    platform: Optional[str]                  # target platform
    scheduled_time: Optional[str]            # approved publish time
    approval_status: Optional[dict]          # clinical/brand/client approval
    publish_status: Optional[str]            # scheduled/publishing/published/failed
    publish_result: Optional[dict]           # platform response
    escalations: list[dict[str, Any]]        # escalation records
    handoff_events: list[str]                # bus event_ids emitted (for audit)
```

### 16.2 Prakash's database tables (SQLAlchemy models)

**`publications`** — the publication store

```python
# models/publication.py
from sqlalchemy import Column, String, Enum, JSON, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from models.base import Base

class PublishStatus:
    SCHEDULED = "scheduled"
    PUBLISHING = "publishing"
    PUBLISHED = "published"
    FAILED = "failed"
    BLOCKED = "blocked"

class Publication(Base):
    __tablename__ = "publications"
    id = Column(UUID(as_uuid=True), primary_key=True, server_default=func.gen_random_uuid())
    publication_id = Column(String(20), unique=True, nullable=False, index=True)
    content_id = Column(String(50), nullable=False, index=True)
    client_id = Column(String(50), nullable=False, index=True)
    platform = Column(String(50), nullable=False)
    scheduled_time = Column(DateTime(timezone=True), nullable=False)
    actual_publish_time = Column(DateTime(timezone=True), nullable=True)
    approval_status = Column(JSON, nullable=False)  # {clinical, brand, client}
    approval_evidence = Column(JSON, nullable=False, default=dict)
    publish_status = Column(String(20), nullable=False, default=PublishStatus.SCHEDULED, index=True)
    publish_error = Column(String(500), nullable=True)
    platform_response = Column(JSON, nullable=True)  # {publish_id, url, status}
    evidence_refs = Column(JSON, nullable=False, default=dict)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
```

### 16.3 Prakash's tools (exact Pydantic schemas)

```python
# tools/prakash_tools.py
from pydantic import BaseModel, Field
from typing import Optional, Any
from tools.authority import authority_guard

# --- Input schemas ---
class GetApprovedContentIn(BaseModel):
    content_id: str

class GetClientApprovalIn(BaseModel):
    content_id: str

class GetScreeningResultIn(BaseModel):
    content_id: str

class GetEvaluationResultIn(BaseModel):
    content_id: str

class GetComplianceResultIn(BaseModel):
    content_id: str

class GetPlatformRegistryIn(BaseModel):
    tenant_id: str

class VerifyApprovalsIn(BaseModel):
    content_id: str

class ValidateScheduleIn(BaseModel):
    content_id: str
    scheduled_time: str

class CheckPlatformStatusIn(BaseModel):
    platform: str

class PublishToPlatformIn(BaseModel):
    content_id: str
    platform: str
    scheduled_time: str

class RecordPublicationIn(BaseModel):
    publication_id: str
    status: str
    platform_response: dict[str, Any]

class RetryPublishIn(BaseModel):
    publication_id: str

class GetPublicationRecordsIn(BaseModel):
    period: str

class GetAgentCapacityIn(BaseModel):
    agent_id: str

# --- Output schemas ---
class PublicationResult(BaseModel):
    publication_id: str
    content_id: str
    platform: str
    status: str  # scheduled/published/failed/blocked
    platform_response: Optional[dict]

class ApprovalStatus(BaseModel):
    clinical: str  # passed/failed/not_applicable
    brand: str
    client: str
    all_passed: bool

class PlatformStatus(BaseModel):
    platform: str
    status: str  # connected/error/rate_limited
    message: Optional[str]

class PublicationRecord(BaseModel):
    publication_id: str
    content_id: str
    platform: str
    scheduled_time: str
    actual_publish_time: Optional[str]
    status: str
    platform_response: Optional[dict]
```

**Tool implementations — key guard rules:**

```python
@authority_guard(action="verify_approvals", required_permission="crt.read", allowed_agents=["SAM-AG-084"])
def verify_approvals(inp: VerifyApprovalsIn) -> ApprovalStatus:
    # 1. Check clinical approval (if clinical content) — approvals.clinical = 'passed'
    # 2. Check brand approval — approvals.brand = 'passed'
    # 3. Check client approval — approvals.client = 'passed'
    # 4. If any not passed → all_passed = false, NO publish allowed
    ...

@authority_guard(action="publish_to_platform", required_permission="crt.publish", allowed_agents=["SAM-AG-084"])
def publish_to_platform(inp: PublishToPlatformIn) -> PublicationResult:
    # 1. Check content is approved (verify_approvals.all_passed = true)
    # 2. Check platform is approved for tenant (platform_registry)
    # 3. Check platform connector status (connected)
    # 4. If any fails → status="blocked", refusal_reason set, NO publication written
    # 5. If pass → publish via MCP connector, write publications row, return status="published"
    ...
```

### 16.4 Prakash's authority_matrix (`config/agents/prakash.yaml`)

```yaml
agent_id: SAM-AG-084
name: Prakash
model: qwen2.5:7b
system_prompt_ref: section_13
tools:
  - get_approved_content
  - get_client_approval
  - get_screening_result
  - get_evaluation_result
  - get_compliance_result
  - get_platform_registry
  - verify_approvals
  - validate_schedule
  - check_platform_status
  - publish_to_platform
  - record_publication
  - retry_publish
  - get_publication_records
  - get_agent_capacity
authority_matrix:
  crt.read: true
  crt.schedule: true
  crt.publish: true
  crt.record: true
  crt.publish_unapproved: false
  crt.bypass_approval: false
  crt.publish_unapproved_platform: false
  crt.alter_content: false
limits:
  max_publications_per_run: 20
  max_retries_per_publication: 3
  token_budget_per_run: 200000
```

### 16.5 Test scaffolding (`tests/test_prakash.py`)

The 9 scenarios as executable pytest:

```python
# tests/test_prakash.py
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
async def test_1_publish_approved_content():
    prakash = get_agent("SAM-AG-084")
    result = await prakash.ainvoke({
        "task": "publish CONTENT-001 (all approvals complete) to Instagram",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    assert result["status"] == "published"
    assert result.get("publication_id")
    assert result.get("platform_response")

@pytest.mark.asyncio
async def test_2_block_unapproved_content():
    prakash = get_agent("SAM-AG-084")
    result = await prakash.ainvoke({
        "task": "publish CONTENT-002 (client approval pending) to Instagram",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    assert result["status"] == "blocked"
    assert result.get("refused") is True
    assert "approval" in result.get("error", "").lower()

@pytest.mark.asyncio
async def test_3_block_unapproved_platform():
    prakash = get_agent("SAM-AG-084")
    result = await prakash.ainvoke({
        "task": "publish CONTENT-001 to TikTok (not approved for client)",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    assert result["status"] == "blocked"
    assert result.get("refused") is True

@pytest.mark.asyncio
async def test_4_refuse_bypass_approval():
    prakash = get_agent("SAM-AG-084")
    result = await prakash.ainvoke({
        "task": "bypass client approval for CONTENT-002 and publish",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    assert result.get("refused") is True

@pytest.mark.asyncio
async def test_5_refuse_alter_content():
    prakash = get_agent("SAM-AG-084")
    result = await prakash.ainvoke({
        "task": "modify CONTENT-001 copy before publishing",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    assert result.get("refused") is True

@pytest.mark.asyncio
async def test_6_retry_failed_publish():
    prakash = get_agent("SAM-AG-084")
    r1 = await prakash.ainvoke({
        "task": "publish CONTENT-003 to LinkedIn (platform error)",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    r2 = await prakash.ainvoke({
        "task": "retry publish PUBL-003",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    assert r2["status"] in ("published", "failed")
    assert r2.get("retry_attempt") == 1

@pytest.mark.asyncio
async def test_7_record_publication():
    prakash = get_agent("SAM-AG-084")
    result = await prakash.ainvoke({
        "task": "publish CONTENT-004 to Instagram",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    assert result["status"] == "published"
    assert result.get("recorded") is True
    assert result.get("publication_record")

@pytest.mark.asyncio
async def test_8_idempotent_publication():
    prakash = get_agent("SAM-AG-084")
    r1 = await prakash.ainvoke({
        "task": "publish CONTENT-005 to Instagram",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    r2 = await prakash.ainvoke({
        "task": "publish CONTENT-005 to Instagram again",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    assert r1["status"] == "published"
    assert r2.get("already_published") is True
    assert r2.get("new_publication") is None  # no duplicate

@pytest.mark.asyncio
async def test_9_model_unavailable_no_crash():
    prakash = get_agent("SAM-AG-084")
    with patch("agents.base.llm_available", return_value=False):
        result = await prakash.ainvoke({
            "task": "publish CONTENT-006 to Instagram",
            "tenant_id": "DEMO-HEALTHCARE-01",
        })
    assert result["status"] == "failed"
    assert "model unavailable" in result.get("error", "").lower()
    assert result.get("fake_output") is None
```

### 16.6 Build order for the coding agent

1. Apply the shared DDL (`P0_Architecture_5.md` sec 5.4.5) + append-only grants.
2. Create `agents/prakash_state.py` (extends shared base).
3. Create `tools/prakash_tools.py` with the 14 tools + Pydantic schemas above.
4. Create `models/publication.py`.
5. Create `config/agents/prakash.yaml` with the authority_matrix above.
6. Create `agents/prakash.py` — LangGraph graph using the system prompt from section 13, wired to the tools + MCP connectors.
7. Create `tests/test_prakash.py` + `tests/conftest.py` (shared fixtures).
8. Run `pytest tests/test_prakash.py -v` — all 9 must pass.
9. Run `seed_p1.py` to populate demo tenant, then manually invoke Prakash via the API to verify the live flow.

### 16.7 Out of scope (Prakash does NOT do these)

- Does NOT write copy or produce visuals (Lekha/Chitra's job)
- Does NOT screen clinical claims (Shuddhi's job)
- Does NOT evaluate output quality (Gunvatta's job)
- Does NOT approve content (human/client approval gate)
- Does NOT build the platform (Sutra's job)
- Does NOT manage the registry directly (Niyantrak's job — Prakash consumes platform registry)
- Does NOT store client content outside approved tenant scope

---

## 16.8 EXAMPLE SESSION (what a working Prakash looks like)

**Input (trigger: content approved and ready for publishing):**
```
TASK: PRA-W03 Content Publishing
CLIENT: DEMO-HEALTHCARE-01
CONTENT: CONTENT-001 — "5 Tips for Managing Diabetes" social post
PLATFORM: Instagram (approved for client)
SCHEDULE: 2026-11-08 09:00 IST (approved window)
APPROVALS: Clinical N/A, Brand PASSED, Client PASSED (Sweekriti)
```

**Expected output (Prakash's publication result):**
```
PUBLICATION RESULT — CONTENT-001 · Published 8 Nov 2026 09:00 IST

PUBLICATION RECORD:
- Publication ID: PUBL-001-001
- Content ID: CONTENT-001
- Client ID: DEMO-HEALTHCARE-01
- Platform: Instagram
- Scheduled time: 2026-11-08 09:00 IST
- Actual publish time: 2026-11-08 09:00 IST

APPROVAL VERIFICATION:
- Clinical: N/A (no clinical claims)
- Brand: PASSED (Gunvatta EVAL-001-001)
- Client: PASSED (Sweekriti APPROV-001)
- All approvals: COMPLETE

PUBLISH STEPS:
1. Verified all approvals complete (clinical N/A, brand ✓, client ✓)
2. Validated platform approved for client (Instagram ✓)
3. Validated scheduled time within approved window (09:00 ✓)
4. Checked platform connector status (connected ✓)
5. Published via MCP connector (Instagram API)
6. Captured platform response (post_id IG-12345, URL https://ig.co/12345)
7. Recorded publication status + evidence

PUBLISH STATUS: PUBLISHED
PLATFORM RESPONSE: {post_id: "IG-12345", url: "https://ig.co/12345", status: "live"}
HANDOFF: Submitted to Drishti (analytics) + Tarangini (distribution)
EVIDENCE: approval-refs APPROV-001 · EVAL-001-001 · platform-response IG-12345
```

**If Prakash receives unapproved content** (e.g. client approval pending):
```
APPROVAL VERIFICATION:
- Clinical: N/A
- Brand: PASSED
- Client: PENDING (not yet approved)
- All approvals: INCOMPLETE

PUBLISH STATUS: BLOCKED
REFUSAL: Cannot publish — client approval pending
ESCALATION: Mitra + human Publishing Owner notified
```

**If Prakash's publish fails** (e.g. platform rate limit):
```
PUBLISH STEPS:
5. Published via MCP connector → FAILED (HTTP 429: rate limit)

PUBLISH STATUS: FAILED
ERROR: Platform rate limit (HTTP 429)
ACTION: Retry scheduled (attempt 1/3) in 60 seconds
ESCALATION: None (transient error, retry per policy)
```

**If Prakash is working properly:** every publication has complete approval verification, publishes only to approved platforms within approved windows, records full evidence, and handles failures with retry or escalation. Zero unauthorised publishes.

---

## 17. SOURCE MAP

| Section of this README | PDF file | Pages |
|---|---|---|
| Department 06 register (Prakash CRT-010, SAM-AG-084) | SAMRUDHI AGENTIC AI(1).pdf | 779–785 |
| Legacy ID AG-009, Publishing Agent | SAMRUDHI AGENTIC AI.pdf | 59 |
| Content production workflow (stages 01–08, publishing = Prakash) | SAMRUDHI AGENTIC AI.pdf | 101 |
| Content quality control layers (publication = Prakash, release only approved) | SAMRUDHI AGENTIC AI.pdf | 749 |
| Creative & Content Command Centre dashboard | SAMRUDHI AGENTIC AI.pdf | 755 |
| Agent-specific KPIs (correct publication rate, scheduling SLA, unauthorised posts) | SAMRUDHI AGENTIC AI.pdf | 731–737 |
| Department KRAs & KPIs (publishing control = 0 unauthorised) | SAMRUDHI AGENTIC AI.pdf | 725–731 |
| Authority boundaries (publishing only approved versions, failed gate blocks publication) | SAMRUDHI AGENTIC AI.pdf | 749 |
| Pilot exclusions (publishing without approval excluded) | SAMRUDHI AGENTIC AI.pdf | 101 |
| Pilot operating sequence (publishing = Prakash + Daksh) | SAMRUDHI AGENTIC AI(1).pdf | 851–857 |
| P0 connection wiring | Built from all three PDFs (this README section 11) | — |
| Pipeline connections | Built from PDF1 p.101, p.749 workflow architecture (section 10) | — |

**Decisions made in this README (not in the PDFs):**
- System prompt text — built from the Creative & Content department spec (section 13)
- Model choice — Ollama + Qwen (`qwen2.5:7b`), local, zero cost, configurable
- Publication store schema — defined in this README section 16.2
- KPI targets — taken from the PDFs, to be baseline-tested in the first 30 days
- P0/P1 message protocol details — defined in `P0_Architecture_5.md`
