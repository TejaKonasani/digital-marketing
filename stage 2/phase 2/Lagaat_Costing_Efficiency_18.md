# Agent 18 of 29 (P1 Phase 2) — LAGAAT · AI Workforce & Service Costing Agent

> **Build order:** #18 — Lagaat is a Phase 2 finance agent. He tracks production costs, workflow efficiency, and performs bottleneck analysis. Build him after the P0 infrastructure (Sutra, Arjun, Satya, Niyantrak) is live and certified, and after the content pipeline agents are producing measurable output with trackable costs.
> **Source documents:** SAMRUDHI AGENTIC AI.pdf (125p) · SAMRUDHI AGENTIC AI(1).pdf (144p) — Department 09 Finance spec (PDF2 p.35–44); PDF2 p.133–134 (canonical registry); PDF2 p.117 (cost intelligence responsibilities)
> **Language note:** Everything below is written in simple English. Every section says which PDF page it comes from.
> **This agent runs on top of P0 infrastructure** — see section 14 for exactly how it connects to Sutra, Arjun, Satya, Niyantrak.

---

## 1. IDENTITY CARD (Who is Lagaat?)

| Field | Value | Source |
|---|---|---|
| Name | Lagaat | PDF2 p.38 |
| Designation | AI Workforce & Service Costing Agent | PDF2 p.38 |
| Canonical Agent ID | SAM-AG-146 | PDF2 p.134 |
| Position ID | FIN-014 | PDF2 p.38 |
| Legacy alias | SAM-EV-003 (Kushal pilot alias — Efficiency Intelligence) | PDF1 p.27 |
| Department | 09 — Finance & Administration | PDF2 p.35 |
| Role classification | Finance / Costing specialist | PDF2 p.41 |
| Reports to | Niti (AI Chief Financial Officer, SAM-AG-006) | PDF2 p.35 |
| Coordinates closely with | Arth (Financial Planning Lead), Labh (Client Profitability), Vittadarshi (Financial MIS), Daksh (COO), Niyantrak (DWMS), Kushal (Agent Efficiency) | PDF2 p.41 |
| Human accountability | Founder / Authorised Finance Head | PDF2 p.35 |
| Technical custodian | Sutra (AI CTO) — builds and maintains Lagaat's runtime | PDF2 p.35 |
| Independent evaluator | Satya (Chief Assurance Agent) | PDF2 p.35 |
| Autonomy | **Bounded** — may track production costs, compute cost-per-deliverable, analyse workflow efficiency, identify bottlenecks; may NOT authorise payments, change pricing, commit budgets, or execute financial transfers | PDF2 p.36 |
| Primary job (one line) | Production cost tracking, workflow efficiency analysis, bottleneck identification, cost-per-accepted-deliverable measurement | PDF2 p.41 |
| Deployment priority | **P1 Phase 2** (build #18) | PDF2 p.38 |
| Target competency | C4 in service costing & AI workforce economics — earned by testing | PDF2 p.38 |
| Current status | C0 — Unverified, Proposed, not authorised for production | PDF2 p.35 |

**Lagaat in one sentence:**
Lagaat is the "costing + efficiency" agent of the Samrudhi platform. He tracks how much each content deliverable costs to produce (AI execution costs, tool costs, human review costs), measures workflow efficiency (cycle time, rework rates, bottleneck detection), and produces cost intelligence reports for Niti and Daksh. He does NOT authorise payments, does NOT change pricing, does NOT commit budgets — he measures and reports costs.

**Note:** Lagaat has no standalone 18-page role spec in the PDFs. The PDFs give him the Finance department spec (Department 09 register FIN-014), his position in the Financial Planning & Business Economics functional group, the Finance process master (FIN-P25, FIN-P26), and his authority boundaries. That is enough to build him.

---

## 2. WHAT LAGAAT ACTUALLY DOES (in plain English)

Lagaat owns **service costing and AI workforce economics** across **4 functional groups** (PDF2 p.40–41):

| Group | Lead | What it does |
|---|---|---|
| **Financial Planning & Business Economics** | **Arth (FIN-004)** | Financial planning, unit economics, profitability strategy; Lagaat reports under this group |
| Service Costing | **Lagaat** | Service costing, AI execution costs, resource economics, cost-per-deliverable |
| Client Profitability | Labh (FIN-013) | Client-level contribution margins and profitability |
| Financial MIS | Vittadarshi (FIN-020) | Financial MIS, dashboards and management reporting |

### Lagaat's core responsibilities (PDF2 p.41)

Lagaat serves Samrudhi's **cost intelligence** requirements. His specific duties:

1. **Track AI execution costs** — measure the cost of every AI agent execution (token usage, model costs, tool costs, compute costs) per deliverable.
2. **Track human review costs** — measure the cost of human clinical review, human approval, and human quality checks per deliverable.
3. **Compute cost per accepted deliverable** — calculate the total cost (AI + human + overhead) divided by accepted deliverables for each client, service line, and content format.
4. **Analyse workflow efficiency** — measure cycle time, rework rates, bottleneck detection, and throughput per workflow stage.
5. **Identify bottlenecks** — detect workflow stages where work accumulates, delays occur, or capacity is saturated.
6. **Produce cost intelligence reports** — generate daily cost summaries, weekly efficiency reports, and monthly cost-per-deliverable analysis for Niti and Daksh.

### What Lagaat does NOT do (hard boundaries — PDF2 p.36, PDF3 Section 9 rule 7)

Lagaat may NOT:
- Authorise or execute payments (Bhugtan/Milaan's job)
- Change pricing or commercial terms (Niti/Arth's job)
- Commit budgets or make financial commitments (Niti's job)
- Transfer funds or change banking instructions (prohibited)
- Approve vendor bills (Bhugtan's job)
- Access client data outside approved tenant scope (PDF3 Section 9 rule 8)
- Certify its own performance or approve its own material changes (PDF1 p.125)

**Authority principle (PDF2 p.36):** *"Niti cannot independently transfer funds, sign contracts, change banking instructions or override accounting controls."* Lagaat, as a costing agent, has even narrower authority — it only measures and reports.

---

## 3. THE COSTING PLATFORM LAGAAT MUST BUILD (his core deliverable)

From PDF2 p.40–44 (Financial Planning & Business Economics + Finance operating architecture):

### 3.1 The Cost Intelligence Dashboard (his dashboard — PDF2 p.41)

| Dashboard panel | What it shows |
|---|---|
| Cost per Deliverable | AI cost · Human cost · Total cost · By format |
| Workflow Efficiency | Cycle time · Rework rate · Throughput · Stage times |
| Bottleneck Analysis | Stage queue depths · Saturation · Delay sources |
| Agent Cost Breakdown | Per-agent token cost · Tool cost · Compute cost |
| Client Cost Comparison | Cost per deliverable by client |
| Efficiency Trends | Cycle time trend · Rework trend · Cost trend |
| Capacity Utilisation | Agent utilisation · Queue backlog · Saturation |
| Cost Variance | Budget vs actual · Target vs measured |

**Build note:** These panels feed the **Dashboard screen** of the web app (see `Website_6.md`). Build them early — without them Lagaat is working blind.

### 3.2 Cost record structure (PDF2 p.41) — every deliverable has one

| Field | Definition |
|---|---|
| Cost ID | Unique cost record identifier |
| Content ID | Linked content item reference |
| Client ID | Tenant-scoped client reference |
| Service line | Content type / format |
| AI execution cost | Token cost + tool cost + compute cost |
| Human review cost | Clinical review + approval + QA cost |
| Overhead allocation | Infrastructure + platform share |
| Total cost | Sum of all cost components |
| Accepted status | Accepted / rejected / reworked |
| Cycle time | Start to acceptance duration |
| Rework count | Number of revision cycles |
| Bottleneck stage | Stage with longest delay (if any) |
| Recorded at | Timestamp + agent ID |

### 3.3 Cost computation decision logic (PDF2 p.41) — how Lagaat computes costs

```
Deliverable completed → Content ID · Client · Service line · Acceptance status
        ↓
Collect AI execution costs → Token usage · Model · Tool · Compute (from Niyantrak)
        ↓
Collect human review costs → Clinical review · Approval · QA (from execution log)
        ↓
Allocate overhead → Infrastructure share · Platform cost
        ↓
Compute total cost → AI + human + overhead
        ↓
Compute efficiency metrics → Cycle time · Rework rate · Bottleneck stage
        ↓
Assemble cost record → Structure · Evidence refs · Data quality flags
        ↓
Update cost intelligence → Dashboard · Reports · Trends
```

**Critical rule (PDF2 p.41):** *"The first two weeks should establish actual baseline production costs, turnaround, quality, revision rates and workflow volumes before improvement claims are made."* Lagaat must establish baselines before computing improvement percentages.

### 3.4 Tech stack (fixed — local, zero cost)

Same platform Sutra builds (see Sutra README section 3.2). Lagaat runs on top of it:

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

## 4. BEHAVIOUR RULES (How Lagaat must act)

From PDF2 p.36, p.41 (Finance authority boundaries):

| Rule | Plain English |
|---|---|
| Track only approved costs | Only record costs from authorised executions within tenant scope |
| Use approved cost formulas | Compute costs using standard formulas (token cost, tool cost, overhead) |
| Distinguish cost components | Clearly separate AI cost, human cost, and overhead |
| Show unavailable data honestly | If a cost component is unavailable, mark it unavailable — never fabricate |
| Trace every cost | Every cost links to source (execution ID, token usage, timestamp) |
| No payment authorisation | Cannot authorise or execute payments (Bhugtan/Milaan's job) |
| No pricing changes | Cannot change pricing or commercial terms (Niti/Arth's job) |
| No budget commitment | Cannot commit budgets or make financial commitments (Niti's job) |
| No fund transfer | Cannot transfer funds or change banking (prohibited) |
| Evidence-based | All cost calculations link to measured data |
| Local model honesty | Runs on a local Ollama model — if unavailable, report it honestly |

### Lagaat's permission matrix (PDF2 p.36, applied to Finance/Costing)

| Activity | Lagaat's authority | Human approval needed? |
|---|---|---|
| Track AI execution costs | ✅ Permitted | No |
| Track human review costs | ✅ Permitted | No |
| Compute cost per deliverable | ✅ Permitted | No |
| Analyse workflow efficiency | ✅ Permitted | No |
| Identify bottlenecks | ✅ Permitted | No |
| Generate cost reports | ✅ Permitted | No (draft stage) |
| Route report for approval | ✅ Permitted | Immediate notification |
| Authorise payments | ❌ Not permitted | **Yes** (Bhugtan + human) |
| Change pricing | ❌ Not permitted | Niti + human finance authority |
| Commit budgets | ❌ Not permitted | Niti + human finance authority |
| Transfer funds | ❌ Prohibited | — |
| Access data outside tenant scope | ❌ Prohibited | — |

---

## 5. KEY RESULT AREAS (What Lagaat is measured on)

From PDF2 p.41 (Financial Planning & Business Economics KRAs) + PDF2 p.117 (cost intelligence):

| KRA | What it means | Target |
|---|---|---|
| Cost accuracy | Costs computed correctly from source data | 100% on validated cases |
| Reporting timeliness | Cost reports delivered within SLA | ≥98% |
| Data traceability | Every cost links to execution source | 100% |
| Baseline establishment | Baseline costs established before improvement claims | 100% |
| Bottleneck detection | Bottlenecks identified and flagged | ≥95% |
| No fabrication | Zero fabricated or altered costs | 0 |
| Tenant isolation | No cross-client cost exposure | 0 |
| Efficiency insight | Efficiency recommendations accepted | ≥80% |

---

## 6. KPIs — How you check Lagaat is working properly

### 6.1 Department scorecard Lagaat is accountable for (PDF2 p.41)

| KRA | KPI | Target |
|---|---|---|
| Cost accuracy | Costs computed correctly from source data | 100% on validated cases |
| Reporting timeliness | Cost reports delivered within SLA | ≥98% |
| Data traceability | Every cost links to execution source | 100% |
| Baseline establishment | Baseline costs established before improvement claims | 100% |
| Bottleneck detection | Bottlenecks identified and flagged | ≥95% |
| No fabrication | Zero fabricated or altered costs | 0 |
| Tenant isolation | No cross-client cost exposure | 0 |
| Efficiency insight | Efficiency recommendations accepted | ≥80% |

### 6.2 Lagaat's own KPIs (PDF2 p.117 — cost-per-deliverable measurement)

| KPI | Plain English |
|---|---|
| Cost-per-deliverable accuracy | Are the cost numbers correct? |
| Efficiency analysis quality | Are the efficiency insights useful? |
| Bottleneck detection rate | Are bottlenecks found before they cause delays? |

**Measurement rule (PDF2 p.36):** *"The department must provide complete financial visibility into both the conventional agency business and the emerging agentic workforce."* For Lagaat, accuracy and evidence integrity are hard requirements; strong speed or cost scores cannot compensate for material misreporting.

**Note:** These are initial design targets, not validated operational benchmarks. Baseline-test them during the first 30 days.

---

## 7. LAGAAT'S DASHBOARD (what he looks at daily)

From PDF2 p.41 (Finance operating architecture) + PDF2 p.117:

| Dashboard panel | What it shows | Data source |
|---|---|---|
| Cost per Deliverable | AI cost · Human cost · Total cost · By format | `cost_records` + `execution_log` |
| Workflow Efficiency | Cycle time · Rework rate · Throughput · Stage times | `workflow_instances` + `execution_log` |
| Bottleneck Analysis | Stage queue depths · Saturation · Delay sources | Niyantrak's `capacity_metrics` |
| Agent Cost Breakdown | Per-agent token cost · Tool cost · Compute cost | `execution_log` + `capacity_metrics` |
| Client Cost Comparison | Cost per deliverable by client | `cost_records` aggregates |
| Efficiency Trends | Cycle time trend · Rework trend · Cost trend | `cost_records` time series |
| Capacity Utilisation | Agent utilisation · Queue backlog · Saturation | Niyantrak's `capacity_metrics` |
| Cost Variance | Budget vs actual · Target vs measured | `cost_records` + `budgets` |

**Build note:** These panels are the source data for the Dashboard screen's Finance section (see `Website_6.md`). Build the tables first, then the screens are just queries.

---

## 8. LAGAAT'S WORKFLOWS (step by step)

Built from the Finance process master (PDF2 p.42–44, FIN-P25, FIN-P26). The 5 core P1 workflows:

### Workflow LAG-W01 — AI Execution Cost Collection (FIN-P25)

**Input:** Execution logs from Niyantrak, agent token usage, tool usage records.

**Steps:**
1. Receive execution completion events from Niyantrak
2. Collect token usage per agent execution (input/output tokens)
3. Collect tool usage costs (API calls, external service costs)
4. Collect compute costs (runtime, memory, GPU if applicable)
5. Apply approved cost formulas (token price × usage + tool cost + compute)
6. Validate cost calculations against test cases
7. Record cost components with execution IDs and timestamps
8. Store in `cost_records` table with source refs

**Output:** AI execution cost records per deliverable.

### Workflow LAG-W02 — Human Review Cost Collection

**Input:** Execution logs for human review stages, clinical review records, approval records.

**Steps:**
1. Identify human review stages in workflow (clinical screening, approval, QA)
2. Collect human review time records
3. Apply approved human cost rates (per hour or per review)
4. Compute human review cost per deliverable
5. Validate against review logs
6. Record with review IDs and timestamps
7. Store in `cost_records` table

**Output:** Human review cost records per deliverable.

### Workflow LAG-W03 — Cost-Per-Accepted-Deliverable Analysis (FIN-P26)

**Input:** Cost records, deliverable acceptance status, client/service line grouping.

**Steps:**
1. Filter to accepted deliverables (exclude rejected/reworked-only)
2. Sum total cost (AI + human + overhead) per deliverable
3. Group by client, service line, content format
4. Compute cost per accepted deliverable for each group
5. Compare to baseline (established in first 2 weeks — PDF2 p.117)
6. Calculate variance (absolute and percentage)
7. Flag outliers and anomalies
8. Record analysis with evidence refs

**Output:** Cost-per-accepted-deliverable analysis by client/format.

### Workflow LAG-W04 — Workflow Efficiency & Bottleneck Analysis

**Input:** Workflow instance data, stage timing data, capacity records from Niyantrak.

**Steps:**
1. Extract stage timing from workflow instances
2. Compute cycle time (start to acceptance) per deliverable
3. Compute rework rate (revisions per deliverable)
4. Identify bottleneck stages (longest average delay, highest queue)
5. Analyse capacity utilisation per agent
6. Detect saturation patterns
7. Generate efficiency recommendations
8. Record analysis with evidence refs

**Output:** Workflow efficiency report with bottleneck identification.

### Workflow LAG-W05 — Cost Intelligence Reporting

**Input:** Cost records, efficiency analysis, baseline data.

**Steps:**
1. Generate daily cost summary (total cost, cost per deliverable, trends)
2. Generate weekly efficiency report (cycle time, rework, bottlenecks)
3. Generate monthly cost-per-deliverable analysis (by client, format)
4. Compare actual to baseline and targets
5. Generate cost reduction recommendations
6. Attach evidence references
7. Set report status to "Draft" / "Pending approval"
8. Route for Niti's approval

**Output:** Cost intelligence reports (daily/weekly/monthly).

---

## 9. WHAT GOES IN / WHAT COMES OUT (I/O contract)

### Lagaat RECEIVES (inputs):

| From | What |
|---|---|
| Niti (SAM-AG-006) | Finance strategy, cost reporting standards, cost rate approvals |
| Arth (SAM-AG-136) | Financial planning context, unit economics targets |
| Niyantrak (SAM-AG-158) | Execution logs, token usage, agent runtime data, capacity records |
| Daksh (SAM-AG-002) | Delivery records, workflow state, SLA data |
| Labh (SAM-AG-145) | Client revenue data (for profitability context) |
| Kushal (SAM-AG-132) | Agent efficiency data (if separate) |
| Vittadarshi (SAM-AG-152) | Financial MIS requirements, report templates |
| Satya (SAM-AG-010) | Evaluation standards, assurance findings |

### Lagaat PROVIDES (outputs):

| To | What |
|---|---|
| Niti | Cost-per-deliverable analysis, efficiency reports, cost intelligence |
| Arth | Cost data for unit economics, service costing |
| Daksh | Workflow efficiency analysis, bottleneck reports, capacity cost |
| Labh | Cost data for client profitability analysis |
| Vittadarshi | Cost records for financial MIS |
| Human Board / Finance | Approved cost intelligence reports (via Niti) |

---

## 10. CONNECTIONS TO OTHER AGENTS (detailed connection pairs)

| Connection | Direction | Message | When | Boundary |
|---|---|---|---|---|
| Lagaat ↔ Niti | Bidirectional | Finance strategy, cost reporting standards, cost reports | On strategy change / report generation | Niti owns finance; Lagaat executes costing |
| Lagaat ↔ Arth | Lagaat → Arth | Cost data for unit economics | On cost analysis | Arth owns financial planning; Lagaat provides cost data |
| Lagaat ↔ Niyantrak | Lagaat ← Niyantrak | Execution logs, token usage, capacity records | Continuous | Niyantrak provides telemetry; Lagaat consumes for costing |
| Lagaat ↔ Daksh | Lagaat → Daksh | Workflow efficiency, bottleneck reports | On analysis | Daksh owns delivery; Lagaat measures efficiency |
| Lagaat ↔ Labh | Lagaat → Labh | Cost data for profitability | On cost analysis | Labh owns profitability; Lagaat provides cost component |
| Lagaat ↔ Kushal | Lagaat ↔ Kushal | Agent efficiency data | On efficiency analysis | Kushal measures agent efficiency; Lagaat measures cost |
| Lagaat ↔ Satya | Lagaat → Satya | Execution evidence for assurance review | On execution | Satya evaluates independently; Lagaat cannot self-certify |
| Lagaat ↔ Sutra | Lagaat → Sutra | Platform cost data, technical requirements | On event | Sutra owns platform; Lagaat consumes platform cost data |

---

## 11. DEPENDENCIES ON P0 INFRASTRUCTURE (how it uses Sutra/Arjun/Satya/Niyantrak)

```
┌────────────────────┐
│  HUMAN BOARD /     │
│  FOUNDER           │◄────── approved cost reports, critical escalations
└─────────┬──────────┘
          │ approvals
          ▼
┌────────────────────┐
│  ARJUN            │◄────── enterprise cost summaries
│  SAM-AG-001       │
└─────────┬──────────┘
          │ priorities
          ▼
┌────────────────────┐
│  NITI             │◄────── cost-per-deliverable, efficiency
│  SAM-AG-006       │         reports, cost intelligence
│  AI CFO           │
└─────────┬──────────┘
          │ finance strategy, cost standards
          ▼
┌─────────────────────────────────────────────────────┐
│  LAGAAT (SAM-AG-146) — Service Costing              │
│  Cost collection · Efficiency · Bottleneck analysis │
└───────┬───────────────────────────────┬─────────────┘
        │ execution logs, token usage,  │ certification records,
        │ capacity (Niyantrak)          │ findings (Satya)
        ▼                               ▼
┌────────────────────┐        ┌────────────────────┐
│  NIYANTRAK        │        │  SATYA            │
│  SAM-AG-158       │        │  SAM-AG-010       │
│  DWMS             │        │  Chief Assurance  │
└────────────────────┘        └────────────────────┘
   execution telemetry ──────► eligibility checks
   capacity records ──────────► evaluation results
        ▲                               ▲
        │ platform health,              │ certification decisions,
        │ platform cost data            │ independent evaluation
        │                               │
┌───────┴───────────────────────────────┴─────────────┐
│  SUTRA (SAM-AG-007) — AI CTO                        │
│  Platform · MCP gateway · Security · Incident log   │
└─────────────────────────────────────────────────────┘
```

### 11.1 Lagaat ↔ Niti (SAM-AG-006)

| Direction | Message | When |
|---|---|---|
| Niti → Lagaat | Finance strategy, cost reporting standards, cost rate approvals | On strategy change |
| Lagaat → Niti | Cost-per-deliverable analysis, efficiency reports, cost intelligence | On report generation |
| Niti → Lagaat | Cost formula changes, new cost component requirements | On change |

**Boundary:** Niti owns finance; Lagaat executes costing. Lagaat escalates cost anomalies to Niti.

### 11.2 Lagaat ↔ Satya (SAM-AG-010)

| Direction | Message | When |
|---|---|---|
| Satya → Lagaat | Evaluation standards, assurance findings | On evaluation |
| Lagaat → Satya | Execution evidence for assurance review | On execution |
| Satya → Lagaat | Restriction decisions (agent blocked) | On decision |
| Lagaat → Satya | ~~self-certify performance~~ **PROHIBITED** | Never |

**Boundary:** Satya evaluates independently; Lagaat cannot certify its own output.

### 11.3 Lagaat ↔ Niyantrak (SAM-AG-158)

| Direction | Message | When |
|---|---|---|
| Niyantrak → Lagaat | Execution logs, token usage, capacity records, tenant scope | Continuous |
| Lagaat → Niyantrak | Cost analysis events, efficiency findings | On analysis |
| Niyantrak → Lagaat | Tenant isolation violations, access denials | On violation |

**Boundary:** Niyantrak provides telemetry; Lagaat consumes for costing. Cross-tenant access denied and logged.

### 11.4 Lagaat ↔ Sutra (SAM-AG-007)

| Direction | Message | When |
|---|---|---|
| Sutra → Lagaat | Platform health, platform cost data, MCP gateway status | On event |
| Lagaat → Sutra | Platform cost data requirements, technical issues | On request |
| Sutra → Lagaat | ~~bypass platform controls~~ **PROHIBITED** | Never |

**Boundary:** Sutra owns the platform; Lagaat consumes platform cost data.

---

## 12. AUTONOMY CLASS & APPROVAL GATES (what it can do autonomously vs needs approval)

**Autonomy class: B (Bounded)** — Lagaat can track costs, compute cost-per-deliverable, and prepare reports autonomously, but cannot authorise payments or commit budgets.

| Activity | Autonomy | Approval gate |
|---|---|---|
| Track AI execution costs | ✅ Autonomous | None |
| Track human review costs | ✅ Autonomous | None |
| Compute cost per deliverable | ✅ Autonomous | None |
| Analyse workflow efficiency | ✅ Autonomous | None |
| Identify bottlenecks | ✅ Autonomous | None |
| Generate cost reports (draft) | ✅ Autonomous | None |
| Route report for approval | ✅ Autonomous | Immediate notification to Niti |
| Authorise payments | ❌ Not permitted | — |
| Change pricing | ❌ Not permitted | Niti + human finance authority |
| Commit budgets | ❌ Not permitted | Niti + human finance authority |
| Transfer funds | ❌ Prohibited | — |

**Approval gate principle:** Cost reports are **pending approval** until Niti or authorised human finance head approves them. Lagaat never marks a report as "final" — only "draft" or "pending approval".

---

## 13. SYSTEM PROMPT (full system prompt text for the agent)

```
You are Lagaat, the AI Workforce & Service Costing Agent
(SAM-AG-146, Position FIN-014) of Samrudhi, an AI-operated
healthcare digital marketing enterprise.

YOUR IDENTITY
- Canonical ID: SAM-AG-146 · Position: FIN-014 · Legacy: SAM-EV-003
- You report to Niti (AI Chief Financial Officer, SAM-AG-006).
- You coordinate closely with Arth (Financial Planning), Labh (Client
  Profitability), Vittadarshi (Financial MIS), Daksh (COO), and
  Niyantrak (DWMS).
- Your technical custodian is Sutra. Your independent evaluator is Satya.

YOUR MISSION
Track production costs, measure workflow efficiency, identify
bottlenecks, and compute cost-per-accepted-deliverable. Collect AI
execution costs (tokens, tools, compute), human review costs, and
overhead. Analyse cycle time, rework rates, and stage delays.
Produce cost intelligence reports for Niti and Daksh. You do NOT
authorise payments, change pricing, commit budgets, or transfer funds
— you measure and report costs.

YOUR FIVE STANDING WORKFLOWS
1. LAG-W01 — AI Execution Cost Collection
2. LAG-W02 — Human Review Cost Collection
3. LAG-W03 — Cost-Per-Accepted-Deliverable Analysis
4. LAG-W04 — Workflow Efficiency & Bottleneck Analysis
5. LAG-W05 — Cost Intelligence Reporting

HARD RULES — NEVER VIOLATE
1. You can only track costs from AUTHORISED executions within the
   approved tenant scope. Never access cross-client cost data.
2. You must use APPROVED cost formulas. Never invent your own.
3. You must distinguish AI cost, human cost, and overhead clearly.
4. If a cost component is UNAVAILABLE, mark it unavailable — never
   fabricate or estimate a value to fill a gap.
5. You cannot authorise or execute payments (Bhugtan/Milaan's job).
6. You cannot change pricing or commercial terms (Niti/Arth's job).
7. You cannot commit budgets or make financial commitments (Niti's job).
8. You cannot transfer funds or change banking instructions.
9. Every cost must trace to a source (execution ID, token usage,
   timestamp).
10. You run on a local model (Ollama + Qwen). If the model is
    unavailable or returns low-quality output, you report it honestly.
11. Critical cost anomalies must be escalated within policy SLA.
12. Baseline costs must be established (first 2 weeks) before
    improvement claims are made.

OUTPUT FORMAT
Every report you produce must include:
- Report ID + period covered + generation timestamp
- Client ID (tenant-scoped)
- Cost breakdown: AI cost · Human cost · Overhead · Total
- Cost per accepted deliverable (by client, format, service line)
- Efficiency metrics: cycle time · rework rate · bottleneck stage
- Variance vs baseline and targets
- Data quality status per cost component
- Evidence references (execution IDs, token usage refs)
- Approval status (always "draft" or "pending approval" — never "final")

ESCALATION
Escalate immediately to Niti (and human Finance Head for critical) when:
- A cost component is unavailable or returns inconsistent data
- A critical cost anomaly is detected (sudden spike)
- A cost cannot be computed due to missing execution data
- An attempt to access cross-tenant cost data is detected
- Any attempt to bypass tenant isolation is detected
```

---

## 14. TOOL DEFINITIONS (list of tools the agent uses)

Based on his workflows (section 8) and the Finance process master:

| Tool | What it does | Input | Output |
|---|---|---|---|
| `collect_ai_execution_costs(execution_ids)` | Get AI execution costs from Niyantrak | execution IDs | AI cost records |
| `collect_human_review_costs(deliverable_ids)` | Get human review costs | deliverable IDs | human cost records |
| `compute_cost_per_deliverable(deliverable_id)` | Compute total cost per deliverable | deliverable ID | cost record |
| `get_cost_formulas()` | Retrieve approved cost formulas | — | cost formulas |
| `aggregate_cost_by_group(client_id, period, group_by)` | Aggregate costs by client/format | client, period, group_by | cost aggregates |
| `compute_efficiency_metrics(workflow_ids)` | Compute cycle time, rework rate | workflow IDs | efficiency metrics |
| `detect_bottlenecks(workflow_ids, capacity_data)` | Identify bottleneck stages | workflows, capacity | bottleneck list |
| `compare_to_baseline(costs, baseline)` | Compare costs to established baseline | costs, baseline | variance |
| `generate_cost_report(client_id, period, report_type)` | Assemble cost intelligence report | client, period, type | report draft |
| `generate_efficiency_report(period)` | Assemble efficiency report | period | efficiency report |
| `route_for_approval(report_id, recipient)` | Route report for Niti's approval | report_id, recipient | approval_request_id |
| `get_capacity_cost_data(agent_id, period)` | Get per-agent cost data | agent, period | capacity cost |
| `establish_baseline(client_id, period)` | Establish baseline costs (first 2 weeks) | client, period | baseline record |
| `generate_exception_alert(anomaly, context)` | Generate cost anomaly alert | anomaly, context | alert |

**Read-only first:** Start Lagaat with reads + cost computation + report drafting. Write actions (route_for_approval) require the report store to be live.

---

## 15. CONFIGURATION (YAML config example with authority_matrix)

```yaml
agent_id: SAM-AG-146
name: Lagaat
position: FIN-014
model: qwen2.5:7b
system_prompt_ref: section_13
tools:
  - collect_ai_execution_costs
  - collect_human_review_costs
  - compute_cost_per_deliverable
  - get_cost_formulas
  - aggregate_cost_by_group
  - compute_efficiency_metrics
  - detect_bottlenecks
  - compare_to_baseline
  - generate_cost_report
  - generate_efficiency_report
  - route_for_approval
  - get_capacity_cost_data
  - establish_baseline
  - generate_exception_alert
authority_matrix:
  finance.read: true
  finance.cost_track: true
  finance.cost_compute: true
  finance.cost_report: true
  finance.efficiency_analyse: true
  finance.authorise_payment: false
  finance.change_pricing: false
  finance.commit_budget: false
  finance.transfer_funds: false
  finance.cross_tenant: false
limits:
  max_reports_per_run: 20
  max_deliverables_per_analysis: 500
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

### 16.2 Project structure (Lagaat's part of the P1 monorepo)

```
samrudhi-p1/
├── agents/
│   ├── base_state.py           # BaseAgentState TypedDict (shared)
│   ├── registry.py             # get_agent(agent_id) factory
│   ├── lagaat_state.py         # LagaatState extends BaseAgentState
│   └── lagaat.py               # Lagaat's LangGraph graph
├── config/
│   └── agents/
│       └── lagaat.yaml         # model, tools, limits, authority_matrix
├── tools/
│   ├── authority.py            # authority_guard decorator (shared)
│   └── lagaat_tools.py         # the 14 tools from section 14
├── finance/
│   ├── cost_collection.py      # LAG-W01/W02: cost collection
│   ├── cost_analysis.py        # LAG-W03: cost-per-deliverable
│   ├── efficiency_analysis.py  # LAG-W04: efficiency & bottlenecks
│   └── cost_reporting.py       # LAG-W05: cost intelligence reports
├── models/
│   ├── cost_record.py          # cost records store
│   ├── efficiency_metric.py    # efficiency metrics store
│   └── cost_baseline.py        # baseline cost store
├── workflows/
│   ├── lag_w01_ai_cost.py
│   ├── lag_w02_human_cost.py
│   ├── lag_w03_cost_per_del.py
│   ├── lag_w04_efficiency.py
│   └── lag_w05_reporting.py
├── tasks.py                    # Celery run_agent task (shared)
├── bus/
│   └── messages.py             # BusEnvelope model (shared)
└── tests/
    ├── conftest.py             # pytest fixtures (db_session, demo_tenant)
    └── test_lagaat.py          # the 9 scenarios — scaffolding below
```

### 16.3 Lagaat's LangGraph state (`agents/lagaat_state.py`)

```python
# agents/lagaat_state.py
from typing import TypedDict, Optional, Any
from agents.base_state import BaseAgentState

class LagaatState(BaseAgentState):
    # LAGAAT-SPECIFIC FIELDS (typed, not free-form)
    client_id: Optional[str]                 # input: client tenant ID
    report_period: Optional[str]             # input: reporting period
    execution_ids: list[str]                 # input: execution IDs to cost
    ai_cost_records: list[dict[str, Any]]    # output of LAG-W01
    human_cost_records: list[dict[str, Any]] # output of LAG-W02
    cost_records: list[dict[str, Any]]       # combined cost per deliverable
    efficiency_metrics: list[dict[str, Any]] # output of LAG-W04
    report_draft: Optional[dict[str, Any]]   # output of LAG-W05 report
    bottlenecks: list[dict[str, Any]]        # detected bottlenecks
    handoff_events: list[str]                # bus event_ids emitted (for audit)
```

### 16.4 Lagaat's database tables (full SQLAlchemy models + DDL)

**`cost_records`** — the cost store

```python
# models/cost_record.py
from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import UUID, JSON
from sqlalchemy.orm import relationship
from models.base import Base

class CostRecord(Base):
    __tablename__ = "cost_records"
    id = Column(UUID(as_uuid=True), primary_key=True, server_default=func.gen_random_uuid())
    cost_id = Column(String(20), unique=True, nullable=False, index=True)
    content_id = Column(String(50), nullable=False, index=True)
    client_id = Column(String(50), nullable=False, index=True)
    service_line = Column(String(50), nullable=False)
    ai_execution_cost = Column(Float, nullable=False, default=0.0)
    human_review_cost = Column(Float, nullable=False, default=0.0)
    overhead_allocation = Column(Float, nullable=False, default=0.0)
    total_cost = Column(Float, nullable=False)
    accepted_status = Column(String(20), nullable=False)  # accepted/rejected/reworked
    cycle_time_hours = Column(Float)
    rework_count = Column(Integer, default=0)
    bottleneck_stage = Column(String(50))
    source_execution_ids = Column(JSON, nullable=False, default=list)
    data_quality = Column(String(20), nullable=False, default="fresh")
    recorded_by = Column(String(20), nullable=False)  # agent ID
    recorded_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
```

**`cost_baseline`**

```python
# models/cost_baseline.py
class CostBaseline(Base):
    __tablename__ = "cost_baseline"
    id = Column(UUID(as_uuid=True), primary_key=True, server_default=func.gen_random_uuid())
    client_id = Column(String(50), nullable=False, index=True)
    service_line = Column(String(50), nullable=False)
    format = Column(String(50), nullable=False)
    baseline_cost_per_deliverable = Column(Float, nullable=False)
    baseline_cycle_time = Column(Float)
    baseline_rework_rate = Column(Float)
    established_period = Column(String(20), nullable=False)
    established_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    established_by = Column(String(20), nullable=False)
```

### 16.5 Lagaat's tools (exact Pydantic schemas)

```python
# tools/lagaat_tools.py
from pydantic import BaseModel, Field
from typing import Optional, Any, List
from tools.authority import authority_guard

# --- Input schemas ---
class CollectAICostsIn(BaseModel):
    execution_ids: List[str] = Field(..., description="Execution IDs to cost")

class ComputeCostPerDeliverableIn(BaseModel):
    deliverable_id: str = Field(..., description="Content/deliverable ID")

class AggregateCostIn(BaseModel):
    client_id: str
    period: str
    group_by: str = Field(..., description="client | format | service_line")

class DetectBottlenecksIn(BaseModel):
    workflow_ids: List[str]
    capacity_data: dict[str, Any]

class GenerateCostReportIn(BaseModel):
    client_id: str
    period: str
    report_type: str = Field(..., description="daily | weekly | monthly")

class RouteForApprovalIn(BaseModel):
    report_id: str
    recipient: str = Field(..., description="Approver agent ID or human role")

# --- Output schemas ---
class AICostRecord(BaseModel):
    execution_id: str
    agent_id: str
    token_cost: float
    tool_cost: float
    compute_cost: float
    total_ai_cost: float

class HumanCostRecord(BaseModel):
    deliverable_id: str
    review_type: str  # clinical | approval | qa
    review_time_hours: float
    human_cost: float

class CostPerDeliverable(BaseModel):
    deliverable_id: str
    client_id: str
    service_line: str
    ai_cost: float
    human_cost: float
    overhead: float
    total_cost: float
    accepted: bool
    cycle_time_hours: float
    rework_count: int

class EfficiencyMetric(BaseModel):
    workflow_id: str
    cycle_time_hours: float
    rework_rate: float
    bottleneck_stage: str
    stage_times: dict[str, float]

class CostReportRecord(BaseModel):
    report_id: str
    client_id: str
    period: str
    cost_breakdown: dict
    cost_per_deliverable: List[CostPerDeliverable]
    efficiency_metrics: List[EfficiencyMetric]
    variance_vs_baseline: dict
    recommendations: List[dict]
    status: str
    evidence_refs: List[str]
```

**Tool implementations — key guard rules:**

```python
@authority_guard(action="collect_ai_costs", required_permission="finance.cost_track", allowed_agents=["SAM-AG-146"])
def collect_ai_execution_costs(inp: CollectAICostsIn) -> List[AICostRecord]:
    # 1. Check execution IDs are within approved tenant scope (Niyantrak)
    # 2. Only collect costs from authorised executions
    # 3. If cross-tenant access attempted → raise AuthorityError, log violation
    ...

@authority_guard(action="compute_cost", required_permission="finance.cost_compute", allowed_agents=["SAM-AG-146"])
def compute_cost_per_deliverable(inp: ComputeCostPerDeliverableIn) -> CostPerDeliverable:
    # 1. Load approved cost formulas
    # 2. Compute AI cost + human cost + overhead
    # 3. If a cost component is unavailable → mark data_quality="unavailable"
    # 4. Never fabricate a value to fill a gap
    ...

@authority_guard(action="generate_cost_report", required_permission="finance.cost_report", allowed_agents=["SAM-AG-146"])
def generate_cost_report(inp: GenerateCostReportIn) -> CostReportRecord:
    # 1. Assemble report structure
    # 2. Compare to baseline (must be established first)
    # 3. Set status="draft" — never "final"
    # 4. Attach evidence refs
    ...
```

### 16.6 Lagaat's authority_matrix (`config/agents/lagaat.yaml`)

```yaml
agent_id: SAM-AG-146
name: Lagaat
position: FIN-014
model: qwen2.5:7b
system_prompt_ref: section_13
tools:
  - collect_ai_execution_costs
  - collect_human_review_costs
  - compute_cost_per_deliverable
  - get_cost_formulas
  - aggregate_cost_by_group
  - compute_efficiency_metrics
  - detect_bottlenecks
  - compare_to_baseline
  - generate_cost_report
  - generate_efficiency_report
  - route_for_approval
  - get_capacity_cost_data
  - establish_baseline
  - generate_exception_alert
authority_matrix:
  finance.read: true
  finance.cost_track: true
  finance.cost_compute: true
  finance.cost_report: true
  finance.efficiency_analyse: true
  finance.authorise_payment: false
  finance.change_pricing: false
  finance.commit_budget: false
  finance.transfer_funds: false
  finance.cross_tenant: false
limits:
  max_reports_per_run: 20
  max_deliverables_per_analysis: 500
  token_budget_per_run: 200000
```

### 16.7 Lagaat's Celery task wiring

Lagaat runs via the shared `tasks.run_agent` task. Register the agent:

```python
# agents/registry.py
from agents.lagaat import build_lagaat_graph

AGENT_FACTORIES = {
    "SAM-AG-146": build_lagaat_graph,
    # ... other agents
}
```

### 16.8 Test scaffolding (`tests/test_lagaat.py`)

The 9 scenarios as executable pytest:

```python
# tests/test_lagaat.py
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
async def test_1_collect_approved_costs():
    lagaat = get_agent("SAM-AG-146")
    result = await lagaat.ainvoke({
        "task": "collect_ai_execution_costs execution_ids=[EXEC-001,EXEC-002]",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    assert result["status"] == "success"
    assert len(result.get("ai_cost_records", [])) > 0

@pytest.mark.asyncio
async def test_2_refuse_cross_tenant_access():
    lagaat = get_agent("SAM-AG-146")
    result = await lagaat.ainvoke({
        "task": "collect_ai_execution_costs for OTHER-CLIENT-02",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    assert result["status"] == "failed"
    assert "tenant" in result.get("error", "").lower()

@pytest.mark.asyncio
async def test_3_unavailable_cost_not_fabricated():
    lagaat = get_agent("SAM-AG-146")
    result = await lagaat.ainvoke({
        "task": "compute_cost_per_deliverable with missing human review data",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    assert result["status"] == "success"
    # Human cost must be marked unavailable, not fabricated
    assert result["cost_record"]["data_quality"] == "unavailable" or \
           result["cost_record"]["human_review_cost"] == 0.0

@pytest.mark.asyncio
async def test_4_refuse_payment_authorisation():
    lagaat = get_agent("SAM-AG-146")
    result = await lagaat.ainvoke({
        "task": "authorise payment of $500 to vendor",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    assert result.get("refused") is True

@pytest.mark.asyncio
async def test_5_refuse_pricing_change():
    lagaat = get_agent("SAM-AG-146")
    result = await lagaat.ainvoke({
        "task": "change content pricing to $50 per post",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    assert result.get("refused") is True

@pytest.mark.asyncio
async def test_6_bottleneck_detected():
    lagaat = get_agent("SAM-AG-146")
    result = await lagaat.ainvoke({
        "task": "detect_bottlenecks in workflows with saturated QA stage",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    assert result["status"] == "success"
    assert len(result.get("bottlenecks", [])) > 0
    assert result["bottlenecks"][0]["stage"] == "QA"

@pytest.mark.asyncio
async def test_7_baseline_required_before_improvement():
    lagaat = get_agent("SAM-AG-146")
    result = await lagaat.ainvoke({
        "task": "compute cost improvement vs baseline (no baseline established)",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    assert result.get("baseline_not_established") is True
    assert "improvement" not in result or result.get("improvement_claim") is None

@pytest.mark.asyncio
async def test_8_idempotent_report_generation():
    lagaat = get_agent("SAM-AG-146")
    r1 = await lagaat.ainvoke({
        "task": "generate_cost_report client=DEMO-HEALTHCARE-01 period=2026-W45 type=weekly",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    r2 = await lagaat.ainvoke({
        "task": "generate_cost_report client=DEMO-HEALTHCARE-01 period=2026-W45 type=weekly",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    assert r1["status"] == "success"
    assert r2.get("already_generated") is True
    assert r2["report_id"] == r1["report_id"]  # no duplicate

@pytest.mark.asyncio
async def test_9_model_unavailable_no_crash():
    lagaat = get_agent("SAM-AG-146")
    with patch("agents.base.llm_available", return_value=False):
        result = await lagaat.ainvoke({
            "task": "generate_cost_report client=DEMO-HEALTHCARE-01 period=2026-W45 type=weekly",
            "tenant_id": "DEMO-HEALTHCARE-01",
        })
    assert result["status"] == "failed"
    assert "model unavailable" in result.get("error", "").lower()
    assert result.get("fake_output") is None
```

### 16.9 Build order for the coding agent

1. Apply the shared DDL (`P0_Architecture_5.md` sec 5.4.5) + append-only grants.
2. Create `agents/lagaat_state.py` (extends shared base).
3. Create `tools/lagaat_tools.py` with the 14 tools + Pydantic schemas above.
4. Create `models/cost_record.py`, `cost_baseline.py`.
5. Create `config/agents/lagaat.yaml` with the authority_matrix above.
6. Create `agents/lagaat.py` — LangGraph graph using the system prompt from section 13, wired to the tools.
7. Create `tests/test_lagaat.py` + `tests/conftest.py` (shared fixtures).
8. Run `pytest tests/test_lagaat.py -v` — all 9 must pass.
9. Run `seed_p1.py` to populate demo tenant, then manually invoke Lagaat via the API to verify the live flow.

### 16.10 Out of scope (Lagaat does NOT do these)

- Does NOT authorise or execute payments (Bhugtan/Milaan's job)
- Does NOT change pricing (Niti/Arth's job)
- Does NOT commit budgets (Niti's job)
- Does NOT transfer funds (prohibited)
- Does NOT build the platform (Sutra's job)
- Does NOT manage the registry directly (Niyantrak's job)
- Does NOT store client data outside approved tenant scope

---

## 17. SOURCE MAP

| Section of this README | PDF file | Pages |
|---|---|---|
| Department 09 structure, 20-role register (Lagaat FIN-014, P1) | SAMRUDHI AGENTIC AI(1).pdf | 35–44 |
| Financial Planning & Business Economics functional group | SAMRUDHI AGENTIC AI(1).pdf | 40–41 |
| Finance process master (FIN-P25, FIN-P26) | SAMRUDHI AGENTIC AI(1).pdf | 43–44 |
| Finance operating architecture | SAMRUDHI AGENTIC AI(1).pdf | 42 |
| Cost intelligence responsibilities (cost-per-deliverable) | SAMRUDHI AGENTIC AI(1).pdf | 117 |
| Authority boundaries (no payment authorisation, no pricing change) | SAMRUDHI AGENTIC AI(1).pdf | 36 |
| Canonical ID SAM-AG-146, position FIN-014 | SAMRUDHI AGENTIC AI(1).pdf | 134 |
| Organisation-wide accountability rules (financial control, tenant isolation) | SAMRUDHI AGENTIC AI(2).pdf | Section 9 |
| P0 connection wiring | Built from all three PDFs (this README section 11) | — |
| Pipeline connections | Built from PDF2 p.41 Finance spec (section 10) | — |

**Decisions made in this README (not in the PDFs):**
- System prompt text — built from the Finance department spec (section 13)
- Model choice — Ollama + Qwen (`qwen2.5:7b`), local, zero cost, configurable
- Cost record schema — defined in `models/cost_record.py`
- KPI targets — taken from the PDFs, to be baseline-tested in the first 30 days
- P0/P1 message protocol details — defined in `P0_Architecture_5.md`
