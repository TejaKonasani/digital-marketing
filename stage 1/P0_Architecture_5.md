# P0 + P1 Architecture — The Foundation Agents + Pilot Orchestrators + Website

> **What this document is:** The end-to-end architecture for the P0 stage (4 foundation agents: Sutra, Arjun, Satya, Niyantrak) **and** P1 Phase 1 (4 pilot orchestrators: Daksh, Aarya, Mitra, Medha) — how all 8 agents connect to each other, and how the website (dashboard / positions / token usage) combines with them.
> **Read this FIRST** before implementing. The 8 agent READMEs define each agent; this document defines the SYSTEM they form together.
> **Source documents:** SAMRUDHI AGENTIC AI.pdf (125p) · SAMRUDHI AGENTIC AI(1).pdf (144p) · SAMRUDHI AGENTIC AI(2).pdf (112p)
> **Companion document:** `Website_6.md` — the full website design spec (screens, layouts, data sources).
> **P1 Phase 1 agent READMEs:** `stage 2/phase 1/` — Daksh (#5), Aarya (#6), Mitra (#7), Medha (#8).

---

## 1. WHAT P0 IS (and is not) — AND WHAT P1 PHASE 1 ADDS

**P0 = the basement of the entire project.** It is the minimum secure agentic platform that makes all 194 positions possible later.

| P0 IS | P0 IS NOT |
|---|---|
| 4 thinking agents (Sutra, Arjun, Satya, Niyantrak) | 194 running models |
| The DWMS (registry, lifecycle, telemetry, versioning) | A content-production pipeline (that's P1) |
| The website (Dashboard, Positions, Token Usage) | A client-facing portal (that's P1) |
| The message bus wiring the 4 agents together | Sales, marketing, finance agents (P1/P2) |
| The activation gate (certification + human approval) | Real client data (P0 uses a demo client) |

**P1 Phase 1 = the first 4 operational orchestrators built ON the P0 platform.** They consume the DWMS, message bus, activation gate, and Satya certification exactly as P0 agents do — they are not a separate system, they are the first real workloads the platform was built to run.

| P1 Phase 1 IS | P1 Phase 1 IS NOT |
|---|---|
| 4 delivery orchestrators (Daksh OPS, Aarya CRT, Mitra CEX, Medha DAT) | The full 194-position workforce |
| Real client workflows (delivery, creative, client experience, analytics) | Real client production data (still demo/sandbox) |
| Pipeline connections between orchestrators (handoffs) | Cross-department sales/marketing agents (P1 Phase 2+) |
| New bus events for workflow handoffs + workflow state store | A separate platform — same bus, same gate, same registry |

**Build order:** P0 foundation (#1–4) → P1 Phase 1 orchestrators (#5–8: Daksh, Aarya, Mitra, Medha). Every P1 agent passes through the identical activation gate as P0 agents (section 4.3).

**The PDF rule that shapes P0 (PDF2 p.77):** *"The P0 capabilities must exist, but they do not require sixteen independent autonomous agents. A small engineering team can initially implement them using existing infrastructure, deterministic services and a limited number of AI assistants."*

→ **4 LLM-powered agents + deterministic services (database, gate, telemetry, bus) = P0.**

---

## 2. THE FULL SYSTEM (P0 + P1 Phase 1) — ONE DIAGRAM

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        HUMAN BOARD / FOUNDER                                │
│   (approvals · strategy · certification confirmations · S1 closure)         │
└──────────────┬──────────────────────────────┬───────────────────────────────┘
               │                              │ DIRECT escalation path
               │                              │ (bypasses Arjun — S1/S2 only)
               ▼                              ▼
┌──────────────────────────┐     ┌──────────────────────────┐
│  ARJUN — AI CEO          │     │  SATYA — Chief Assurance │
│  SAM-AG-001 · CEO-001    │     │  SAM-AG-010 · GOV-001    │
│  ─────────────────────── │     │  ─────────────────────── │
│  · 5 registers           │     │  · C0–C5 certification   │
│  · 4 workflows (W01–W04) │     │  · S1–S4 findings        │
│  · daily/weekly briefs   │     │  · 5-dim evaluations     │
│  · escalations           │     │  · CAPA verification     │
└──────┬───────────────┬───┘     └───┬──────────────────────┘
       │               │             │
       │ decisions,    │ findings    │ certification records,
       │ priorities    │ (read-only) │ restriction decisions,
       │               │             │ telemetry (evidence)
       ▼               │             ▼
┌──────────────────────────────────────────────────────────────────────────┐
│  NIYANTRAK — AgentOps & DWMS  (SAM-AG-158 · TEC-007)                     │
│  ┌────────────┐ ┌──────────────────┐ ┌────────────┐ ┌────────────────┐  │
│  │ Registry   │ │ Lifecycle Engine │ │ Telemetry  │ │ Versioning     │  │
│  │ (18 fields)│ │ (8 states,       │ │ (every run,│ │ (versions,     │  │
│  │            │ │  5-check gate)   │ │  append-   │ │  rollback)     │  │
│  └────────────┘ └──────────────────┘ └────────────┘ └────────────────┘  │
└──────┬───────────────────────────────────────────────────────────────────┘
       │ platform, tools, runtime, test harness, incident log
       ▼
┌──────────────────────────┐     ┌─────────────────────────────────────────┐
│  SUTRA — AI CTO          │     │  MESSAGE BUS (shared event channel)     │
│  SAM-AG-007 · TEC-001    │     │  agent.activated · activation.rejected  │
│  ─────────────────────── │     │  execution.completed/failed             │
│  · platform + MCP gateway│     │  finding.raised (S1→board direct)       │
│  · security + permissions│     │  incident.raised · rollback.executed    │
│  · deployment gate (W03) │     │  brief.generated · approval.requested   │
│  · incident response     │     │  workflow.* (P1 handoffs)               │
└──────────────────────────┘     └─────────────────────────────────────────┘
       ▲                                   ▲                    ▲
       │ shared platform                   │ workflow handoffs  │ client feedback
       │                                   │                    │
┌──────┴───────────────────────────────────┴────────────────────┴──────────────┐
│  P1 PHASE 1 — OPERATIONAL ORCHESTRATORS (built ON the P0 platform)           │
│  ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐       │
│  │  DAKSH — AI COO    │ │  AARYA — AI CCO    │ │  MITRA — AI CEXO   │       │
│  │  SAM-AG-002 · OPS  │ │  SAM-AG-003 · CRT  │ │  SAM-AG-004 · CEX  │       │
│  │  delivery pipeline │ │  creative pipeline │ │  client experience │       │
│  │  workflow_instances│ │  content_assets    │ │  client_feedback   │       │
│  └─────────┬──────────┘ └─────────┬──────────┘ └─────────┬──────────┘       │
│            │  deliverables         │  content             │  feedback        │
│            ▼                       ▼                      ▼                  │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  MEDHA — AI Chief Data & Intelligence  (SAM-AG-009 · DAT-001)        │  │
│  │  analytics backbone — ingests all pipeline outputs + client data     │  │
│  │  data_quality_logs · analytics_snapshots · intelligence_reports      │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
       ▲
       │ reads (REST + live feed)
┌──────┴───────────────────────────────────────────────────────────────────┐
│  WEBSITE (3 screens — see Website_6.md)                                  │
│  ① DASHBOARD: totals · live agent activity flow · departments ·         │
│     priority-wise agents · workflow status (P1)                          │
│  ② POSITIONS: counts · 8-agent table · agent detail page (specs + logs)  │
│  ③ TOKEN USAGE: per-agent/day tokens, trends, outliers                   │
└──────────────────────────────────────────────────────────────────────────┘
       ▲
       │ shared foundation (local, zero cost)
┌──────┴───────────────────────────────────────────────────────────────────┐
│  SHARED FOUNDATION (local, zero cost)                                     │
│  PostgreSQL (all tables incl. workflow/content/analytics) · Redis · Ollama│
│  FastAPI backend · Celery workers · structured JSON logs                  │
└──────────────────────────────────────────────────────────────────────────┘
```

**Key P1 topology:** All 4 orchestrators register/certify/activate through the SAME DWMS + gate as P0 agents. Daksh (delivery) → Aarya (creative) → Mitra (client experience) → Medha (analytics) form a client-service pipeline connected by workflow handoff events on the shared bus. Medha ingests outputs from all three for analytics. No orchestrator bypasses Satya certification or the activation gate.

---

## 3. THE 8 AGENTS — RESPONSIBILITIES & BUILD ORDER

### P0 Foundation Agents (#1–4)

| Build # | Agent | Canonical ID | One-line job | Why this order |
|---|---|---|---|---|
| 1 | **Sutra** | SAM-AG-007 | Builds & runs the platform: registry tables, MCP gateway, security, deployment gate, incident response | Nothing runs without the platform |
| 2 | **Arjun** | SAM-AG-001 | Coordinates the enterprise: registers, briefs, escalations, decision routing | The coordination hub the other agents connect through |
| 3 | **Satya** | SAM-AG-010 | Certifies & evaluates independently: C0–C5, S1–S4, 5-dimension scorecards | No agent goes Active without his gate — must exist before activations |
| 4 | **Niyantrak** | SAM-AG-158 | Runs the DWMS: registry records, lifecycle engine, telemetry, versioning | His dashboards are most useful once 1–3 generate data |

### P1 Phase 1 Operational Orchestrators (#5–8)

| Build # | Agent | Canonical ID | One-line job | Why this order |
|---|---|---|---|---|
| 5 | **Daksh** | SAM-AG-002 | Delivery orchestrator: runs client project pipelines, work packages, allocations | First real workload; delivery drives the client service loop |
| 6 | **Aarya** | SAM-AG-003 | Creative orchestrator: healthcare content production pipeline with clinical screening | Creative feeds delivery; needs Daksh's workflow framework |
| 7 | **Mitra** | SAM-AG-004 | Client experience orchestrator: feedback, satisfaction, escalation handling | Needs deliverables (Daksh) + content (Aarya) to manage experience |
| 8 | **Medha** | SAM-AG-009 | Data & intelligence: analytics backbone ingesting all pipeline outputs | Last — needs data from all three pipelines to analyze |

**Each agent = one LangGraph agent (Ollama LLM) + deterministic services + a YAML config + a system prompt.** Details: `stage 1/Sutra_AI Chief Technology Officer_1.md`, `stage 1/Arjun_AI Chief Executive Officer_2.md`, `stage 1/Satya_AI Chief Assurance Agent_3.md`, `stage 1/Niyantrak_AgentOps & Digital Workforce Systems_4.md`, `stage 2/phase 1/Daksh_AI Chief Operating Officer_5.md`, `stage 2/phase 1/Aarya_AI Chief Creative Officer_6.md`, `stage 2/phase 1/Mitra_AI Chief Experience Officer_7.md`, `stage 2/phase 1/Medha_AI Chief Data & Intelligence Officer_8.md`.

### The separation-of-duties matrix (who can do what)

| Capability | Sutra | Arjun | Satya | Niyantrak | Daksh/Aarya/Mitra/Medha | Human |
|---|---|---|---|---|---|---|
| Build/modify platform | ✅ | ❌ | ❌ | ❌ | ❌ | approves |
| Change agent permissions | ✅ (within policy) | requests only | ❌ | ❌ | ❌ | approves material |
| Decide business priorities | ❌ | ✅ (within authority) | ❌ | ❌ | ❌ | approves material |
| Certify an agent | ❌ | ❌ | ✅ recommends | ❌ | ❌ | **confirms** |
| Enforce activation gate | reads | ❌ | provides cert | ✅ **enforces in code** | ❌ | approves |
| Evaluate an agent | ❌ | ❌ | ✅ | ❌ | ❌ | reviews |
| Alter evaluation records | ❌ | ❌ | ❌ (append-only) | ❌ | ❌ | ❌ |
| Delete historical data | ❌ | ❌ | ❌ | ❌ | ❌ | **only** |
| Escalate S1 to Board | ✅ (tech) | ✅ (business) | ✅ **direct path** | ✅ (platform) | ✅ (via Arjun/Satya) | receives |
| Run client delivery pipeline | ❌ | ❌ | ❌ | ❌ | ✅ **Daksh only** | approves material |
| Produce healthcare content | ❌ | ❌ | ❌ | ❌ | ✅ **Aarya only** | approves clinical |
| Manage client relationships | ❌ | ❌ | ❌ | ❌ | ✅ **Mitra only** | approves contracts |
| Generate analytics reports | ❌ | ❌ | ❌ | ❌ | ✅ **Medha only** | reviews |

**Key rule:** every powerful action has exactly ONE owner and at least one independent check. That is the entire P0 security model — extended to P1 with each orchestrator owning exactly one operational domain and no cross-authority.

---

## 4. AGENT-TO-AGENT CONNECTIONS (the wiring)

### 4.1 The message bus (how agents talk)

All 4 agents communicate through ONE shared message bus. In P0 the bus is **Redis pub/sub** (already in the stack for Celery) with a PostgreSQL `bus_events` table as the durable log (append-only — this is the audit trail the website's live feed reads).

**Message protocol (every message has this envelope):**

```json
{
  "event_id": "uuid",
  "event_type": "agent.activated",
  "source_agent": "SAM-AG-158",
  "target_agent": "all" | "SAM-AG-001" | "human_board",
  "timestamp": "2026-11-08T09:00:00Z",
  "payload": { ... event-specific ... },
  "evidence_refs": ["exec-log-123", "cert-011"],
  "severity": "info" | "S1" | "S2" | "S3" | "S4"
}
```

**The event catalogue (complete list — P0 foundation events + P1 Phase 1 workflow events):**

### P0 foundation events (agent lifecycle, certification, platform)

| Event type | Published by | Consumed by | Payload |
|---|---|---|---|
| `agent.registered` | Niyantrak | Arjun, Sutra, website | agent_id, name, position, department |
| `agent.configured` | Niyantrak | Sutra | agent_id, version_id |
| `test.completed` | Niyantrak (harness) | Satya, Sutra | agent_id, run_id, pass/fail counts |
| `certification.recorded` | Satya | Niyantrak, Arjun, website | agent_id, scope, level, human_confirmed |
| `approval.requested` | Arjun / Satya / Niyantrak | human (website approval panel) | request_id, type, details |
| `approval.decided` | Human (website) | requester, Niyantrak | request_id, approved/rejected, by |
| `activation.gate_passed` | Niyantrak | Sutra, Arjun, website | agent_id, 5 check results |
| `activation.rejected` | Niyantrak | Sutra, Arjun, website | agent_id, failed checks |
| `agent.activated` | Niyantrak | all + website | agent_id, state=active |
| `agent.suspended` | Niyantrak / Sutra | all + website | agent_id, reason, human_notified |
| `execution.started` | any agent (runtime) | Niyantrak (telemetry), website | execution_id, agent_id, task |
| `execution.completed` | any agent (runtime) | Niyantrak, website | execution_id, status, tokens, duration |
| `execution.failed` | any agent (runtime) | Niyantrak, Sutra, website | execution_id, error, agent_id |
| `finding.raised` | Satya | Arjun (if S3/S4), **human_board direct (if S1/S2)** | finding_id, severity, agent_id |
| `evaluation.recorded` | Satya | Niyantrak, Arjun, website | agent_id, score, classification |
| `incident.raised` | Sutra / any agent | Arjun, Satya, human (if critical) | incident_id, severity, description |
| `rollback.executed` | Niyantrak | Sutra, human | agent_id, from_version, to_version, reason |
| `brief.generated` | Arjun | human (website), Niyantrak (stats) | brief_id, type, period |
| `model.unavailable` | any agent | Sutra, website | agent_id, detail |

### P1 Phase 1 workflow events (orchestrator handoffs, pipeline state)

| Event type | Published by | Consumed by | Payload |
|---|---|---|---|
| `workflow.created` | Daksh | Arjun, website | workflow_id, client_id, scope, priority |
| `workflow.started` | Daksh | Niyantrak, website | workflow_id, work_packages count |
| `work_package.completed` | Daksh | Aarya (if creative), Mitra, website | package_id, deliverable_refs, status |
| `workflow.handoff` | Daksh → Aarya | Aarya | workflow_id, package_id, deliverable_refs, deadline |
| `content.submitted` | Aarya | Daksh, Mitra, Satya (clinical screen) | asset_id, content_type, clinical_review_status |
| `content.approved` | Aarya / Satya | Mitra, website | asset_id, approved_by, timestamp |
| `content.rejected` | Aarya / Satya | Arjun, website | asset_id, reason, severity |
| `client.feedback.received` | Mitra | Medha, Daksh, Arjun | feedback_id, client_id, sentiment, category |
| `client.satisfaction.reported` | Mitra | Medha, Arjun, website | client_id, score, period |
| `analytics.snapshot.generated` | Medha | Arjun, website | snapshot_id, period, metrics |
| `intelligence.report.generated` | Medha | Arjun, human_board | report_id, findings, recommendations |
| `data_quality.alert` | Medha | Satya, Sutra | alert_id, source, severity, detail |

### 4.2 The connection pairs (summary — full tables in each agent README section 14)

**P0 foundation pairs:**

| Pair | What flows | Guardrail |
|---|---|---|
| **Arjun ↔ Sutra** | priorities ↔ platform health, incidents | Arjun never touches platform internals; Sutra never makes business decisions |
| **Arjun ↔ Satya** | findings (read-only) ↔ evidence requests | Arjun CANNOT alter findings (read-only view in code); Satya's S1 path bypasses Arjun entirely |
| **Arjun ↔ Niyantrak** | agent requests, authorised actions ↔ workforce status, gate rejections | No activation without recorded human approval (gate check 4) |
| **Satya ↔ Sutra** | test results, version history ↔ certification decisions | Sutra operates infrastructure; Satya owns criteria & decisions |
| **Satya ↔ Niyantrak** | telemetry, registry (evidence) ↔ certifications, restrictions | Append-only both ways; Niyantrak enforces, Satya decides |
| **Sutra ↔ Niyantrak** | platform policy, provisioning ↔ registry, telemetry, versions | One deployment gate, two readers (Sutra W03 = Niyantrak W03) |

**P1 Phase 1 orchestrator pairs (all run on the P0 platform):**

| Pair | What flows | Guardrail |
|---|---|---|
| **Arjun ↔ Daksh** | client priorities ↔ delivery status, blockers | Daksh never sets priorities; Arjun never edits work packages |
| **Daksh → Aarya** | completed deliverables → creative production | Aarya only acts on explicit handoff events; clinical screening mandatory |
| **Aarya → Mitra** | approved content → client experience delivery | Mitra only shows Satya-approved content; no unpublished material |
| **Mitra → Medha** | client feedback/satisfaction → analytics ingestion | Medha read-only on feedback; cannot alter client records |
| **Medha → Arjun** | analytics snapshots, intelligence reports ↔ strategy | Medha recommends; Arjun decides; no auto-action from reports |
| **Satya ↔ all orchestrators** | clinical screening, safety checks ↔ content/deliverables | Satya has veto on clinical content; append-only findings |
| **Niyantrak ↔ all orchestrators** | registry, telemetry, versioning ↔ execution logs | Every orchestrator execution logged; same activation gate |

### 4.3 The P0 end-to-end lifecycle (one agent, start to finish)

This is the single most important flow to get right. It is how ANY future agent (P1/P2) will be onboarded too:

```
 1. ARJUN receives a need (e.g. "we need a KPI agent")
    → creates a role request, routes for human approval
 2. HUMAN approves the role
 3. NIYANTRAK registers the agent (NYA-W01)
    → registry record, state: Registered
    → event: agent.registered
 4. SUTRA provisions the platform for it
    → model, tools, permissions (least privilege)
    → NIYANTRAK records config as v1.0 (NYA-W02)
    → state: Configured
 5. TEST HARNESS runs the role's scenario suite
    → results to Satya
    → state: Evaluated
 6. SATYA certifies (SAT-W01)
    → verifies evidence, runs safety/authority/isolation checks
    → records certification RECOMMENDATION
    → routes to HUMAN (P0: founder)
 7. HUMAN confirms the certification
 8. ARJUN routes activation → HUMAN approves
 9. NIYANTRAK runs the 5-check gate (NYA-W03)
    → all pass → state: Active → event: agent.activated
    → website Dashboard shows the agent flip to "active" LIVE
10. Agent runs work → every execution logged (NYA-W04)
    → Dashboard live feed + Token Usage screen update
11. SATYA samples executions (SAT-W02) + monthly score (SAT-W03)
    → findings/evaluations recorded (append-only)
12. Any version change → NIYANTRAK versions it (NYA-W05)
    → regression tests → Satya reassessment → controlled deploy
    → rollback always ready
```

**Every step leaves a durable record.** If a company asks "what did agent X do at time T?", the answer is: `execution_log` (what ran) + `lifecycle_events` (state changes) + `bus_events` (what was communicated) + `certifications`/`evaluations`/`findings` (what was judged). That is the audit trail the agent detail page displays (see `Website_6.md` section 5).

---

## 5. THE SHARED BACKEND (what Sutra builds, everyone uses)

### 5.1 Monorepo structure (the whole P0 codebase)

```
samrudhi-p0/
├── main.py                     # FastAPI entry — serves API + website data
├── requirements.txt
├── config/
│   ├── platform.yaml           # Ollama URL, DB URL, Redis URL, thresholds
│   └── agents/
│       ├── sutra.yaml          # model, tools, limits, authority matrix
│       ├── arjun.yaml
│       ├── satya.yaml
│       ├── niyantrak.yaml
│       ├── daksh.yaml          # P1 Phase 1 — OPS-001
│       ├── aarya.yaml          # P1 Phase 1 — CRT-001
│       ├── mitra.yaml          # P1 Phase 1 — CEX-001
│       └── medha.yaml          # P1 Phase 1 — DAT-001
├── agents/
│   ├── sutra.py                # LangGraph agent (P0)
│   ├── arjun.py
│   ├── satya.py
│   ├── niyantrak.py
│   ├── daksh.py                # P1 Phase 1 delivery orchestrator
│   ├── aarya.py                # P1 Phase 1 creative orchestrator
│   ├── mitra.py                # P1 Phase 1 client experience orchestrator
│   └── medha.py                # P1 Phase 1 data & intelligence orchestrator
├── dwms/                       # Niyantrak's deterministic services
│   ├── registry.py
│   ├── lifecycle.py            # 8-state engine + 5-check gate
│   ├── telemetry.py
│   ├── versioning.py
│   └── capacity.py
├── tools/                      # each agent's function calls
│   ├── sutra_tools.py
│   ├── arjun_tools.py
│   ├── satya_tools.py
│   ├── niyantrak_tools.py
│   ├── daksh_tools.py          # work package, allocation tools
│   ├── aarya_tools.py          # content generation, clinical screening tools
│   ├── mitra_tools.py          # feedback, satisfaction tools
│   └── medha_tools.py          # analytics, snapshot tools
├── frameworks/                 # Satya's deterministic frameworks
│   ├── competency.py           # C0–C5
│   ├── severity.py             # S1–S4
│   ├── scorecard.py            # 5-dimension + hard stops
│   └── clinical_screening.py   # healthcare content rules (P1)
├── pipeline/                   # P1 Phase 1 workflow orchestration
│   ├── workflow_state.py       # workflow_instances, work_packages state machine
│   ├── handoffs.py             # Daksh→Aarya→Mitra→Medha handoff logic
│   └── content_pipeline.py     # Aarya creative pipeline with clinical gate
├── models/                     # SQLAlchemy models (all shared tables)
│   ├── agent_registry.py
│   ├── agent_version.py
│   ├── lifecycle_event.py
│   ├── execution_log.py
│   ├── capacity_metric.py
│   ├── test_run.py
│   ├── certification.py
│   ├── evaluation.py
│   ├── finding.py
│   ├── escalation.py
│   ├── incident.py
│   ├── initiative.py
│   ├── decision.py
│   ├── risk.py
│   ├── action.py
│   ├── brief.py
│   ├── approval.py
│   ├── bus_event.py
│   ├── workflow_instance.py    # P1 — client workflows
│   ├── work_package.py         # P1 — deliverable packages
│   ├── allocation.py           # P1 — resource allocations
│   ├── content_asset.py        # P1 — content production records
│   ├── clinical_review_flag.py # P1 — clinical screening results
│   ├── publishing_record.py    # P1 — content publish history
│   ├── client_feedback.py      # P1 — client experience feedback
│   ├── client_satisfaction.py  # P1 — satisfaction scores
│   ├── data_quality_log.py     # P1 — Medha data quality alerts
│   ├── analytics_snapshot.py   # P1 — analytics snapshots
│   └── intelligence_report.py  # P1 — intelligence reports
├── workflows/                  # the named workflows
│   ├── sutra_w01_review.py ... sutra_w04_incident.py
│   ├── arj_w01_objective.py ... arj_w04_escalation.py
│   ├── sat_w01_certification.py ... sat_w04_incident.py
│   ├── nya_w01_register.py ... nya_w05_versioning.py
│   ├── dks_w01_workflow.py ... dks_w03_allocation.py   # P1 Daksh
│   ├── aar_w01_content.py ... aar_w03_screening.py     # P1 Aarya
│   ├── mit_w01_feedback.py ... mit_w03_satisfaction.py # P1 Mitra
│   └── mdh_w01_snapshot.py ... mdh_w03_intelligence.py # P1 Medha
├── bus/
│   └── messages.py             # event catalogue + publish/subscribe
├── api/
│   ├── routes_dashboard.py     # feeds the Dashboard screen
│   ├── routes_positions.py     # feeds the Positions screen + agent detail
│   ├── routes_tokens.py        # feeds the Token Usage screen
│   ├── routes_approvals.py     # human approval panel
│   └── routes_workflows.py     # P1 workflow status + pipeline state
├── static/                     # the website (see Website_6.md)
│   ├── index.html              # Dashboard
│   ├── positions.html
│   ├── agent_detail.html
│   ├── tokens.html
│   └── assets/
└── tests/
    ├── test_sutra.py           # 9 scenarios (Sutra README 13.3)
    ├── test_arjun.py           # 9 scenarios (Arjun README 13.3)
    ├── test_satya.py           # 9 scenarios + known-failure sample
    ├── test_niyantrak.py       # 9 scenarios + gate unit tests
    ├── test_daksh.py           # P1 delivery pipeline scenarios
    ├── test_aarya.py           # P1 creative pipeline + clinical screening
    ├── test_mitra.py           # P1 client experience scenarios
    ├── test_medha.py           # P1 analytics scenarios
    ├── test_bus.py             # event flow integration
    ├── test_website_api.py     # every screen's data endpoint
    └── test_e2e_lifecycle.py   # the 12-step lifecycle (section 4.3)
```

### 5.2 Database — the complete table list (P0 + P1 Phase 1)

**P0 foundation tables:**

| Table | Owner | Purpose | Mutability |
|---|---|---|---|
| `agents` | Niyantrak | 18-field Digital Agent Master Record | updates allowed (non-lifecycle), no delete |
| `agent_versions` | Niyantrak | prompt/model/tool/workflow versions | append-only |
| `lifecycle_events` | Niyantrak | every state transition + gate results | append-only |
| `execution_log` | Niyantrak (all agents write) | every agent run, full structured record | append-only |
| `capacity_metrics` | Niyantrak | tokens/runs/failures per agent per day | append-only (daily rows) |
| `test_runs` | Niyantrak (harness) | test suite results per agent per version | append-only |
| `certifications` | Satya | certification records (task-specific, human-confirmed) | append-only |
| `evaluations` | Satya | 5-dimension performance evaluations | append-only |
| `findings` | Satya | S1–S4 findings with mandatory evidence | append-only |
| `escalations` | Satya / Sutra / Arjun | escalation records (channel proves Board-direct path) | append-only |
| `incidents` | Sutra | incident timeline, root cause, fix | append-only + status field |
| `initiatives` | Arjun | enterprise initiative register | updates allowed |
| `decisions` | Arjun | decision register (options, assumptions, approver) | updates allowed (decision field once) |
| `risks` | Arjun | risk & escalation register | updates allowed (status) |
| `actions` | Arjun | cross-department action tracker | updates allowed (status) |
| `briefs` | Arjun | daily/weekly/monthly briefs | append-only |
| `approvals` | Human (via website) | every human approval/decision | append-only |
| `bus_events` | bus | durable log of every bus event | append-only |

**P1 Phase 1 workflow state store tables:**

| Table | Owner | Purpose | Mutability |
|---|---|---|---|
| `workflow_instances` | Daksh | client workflow records (id, client, scope, status, priority) | updates allowed (status) |
| `work_packages` | Daksh | deliverable packages within a workflow | updates allowed (status) |
| `allocations` | Daksh | resource/time allocations per package | updates allowed (status) |
| `content_assets` | Aarya | content production records (id, type, status, version) | updates allowed (status) |
| `clinical_review_flags` | Aarya / Satya | healthcare content clinical screening results | append-only |
| `publishing_records` | Aarya / Mitra | content publish history (what, when, where) | append-only |
| `client_feedback` | Mitra | client feedback records (sentiment, category, detail) | append-only |
| `client_satisfaction` | Mitra | periodic satisfaction scores per client | append-only (periodic rows) |
| `data_quality_logs` | Medha | data quality alerts and validation results | append-only |
| `analytics_snapshots` | Medha | periodic analytics snapshots (metrics, period) | append-only |
| `intelligence_reports` | Medha | intelligence reports with findings/recommendations | append-only |

**Append-only enforcement:** for append-only tables, the application role has INSERT + SELECT grants only. No UPDATE/DELETE. (Tables with status fields are the exception, documented above.)

**Workflow state store (P1):** the `workflow_instances` + `work_packages` + `allocations` tables form the deterministic workflow state store. Every workflow has a state machine (created → started → in_progress → handoff → completed / blocked) enforced in code (`pipeline/workflow_state.py`). Orchestrator handoffs (`workflow.handoff`, `content.submitted`, `client.feedback.received` events) update state atomically and log to `bus_events` + `execution_log`.

### 5.3 Tech stack (fixed — local, zero cost)

| Layer | Use | Notes |
|---|---|---|
| Language | Python 3.11+ | |
| Agent framework | LangGraph | stateful multi-step agents |
| LLM | **Ollama + Qwen (`qwen2.5:7b`)** | `http://localhost:11434` — model name configurable per agent YAML; any local Ollama model works |
| Database | PostgreSQL (local) | all tables in section 5.2 |
| ORM | SQLAlchemy | |
| Queue + bus | Redis + Celery | bus = Redis pub/sub + `bus_events` table |
| API | FastAPI | serves both the agent tools and the website data |
| Website | Static HTML + vanilla JS + Tailwind (CDN) | no build step, no framework (see Website_6.md) |
| Logging | Structured JSON → PostgreSQL | every agent run + every tool call |

**Hard rules:**
- No cloud services. No paid model calls. Every LLM request goes to Ollama on localhost.
- `tokens_used` is tracked per execution (Ollama returns prompt/completion token counts) — for capacity and the Token Usage screen, not billing.
- If Ollama is down: deterministic services (registry, gate, telemetry queries, dashboard counts) KEEP WORKING; LLM-narrated parts report "model unavailable" — no crash, no fake output.
- The website is read-only EXCEPT the approval panel (humans approve/reject). No agent has a website login.

---

## 6. WEBSITE × AGENTS — HOW THE COMBINATION WORKS

The website is NOT a fourth agent. It is the **human Board's command centre** — the top layer of the 5-layer architecture (PDF1 p.9). It has two jobs:

1. **Show the truth** (read): what agents exist, what state they're in, what they're doing right now, what they consumed.
2. **Give the human their gates** (write): approvals, certification confirmations, S1 closure decisions.

### 6.1 Data flow: agents → website

```
Agent runs work
   → execution.started/completed events → bus
   → Niyantrak telemetry pipeline → execution_log + capacity_metrics
   → bus_events table (durable)
        │
        ▼
FastAPI endpoints (api/routes_*.py)
   GET /api/dashboard/summary      → totals (depts, agents, active, inactive)
   GET /api/dashboard/activity     → live feed (last N bus events, SSE stream)
   GET /api/dashboard/departments  → dept name + agent counts
   GET /api/dashboard/priority     → priority-wise agent list
   GET /api/positions              → agent table (s.no, name, position, dept, state)
   GET /api/positions/{agent_id}   → full agent detail (specs + I/O + logs)
   GET /api/positions/{agent_id}/executions?from=&to=  → work log for a period
   GET /api/tokens/summary         → total tokens, per-agent, per-day
   GET /api/tokens/by-agent        → per-agent token table + trends
   GET /api/approvals/pending      → human approval queue
   POST /api/approvals/{id}/decide → human decision (the ONLY write)
        │
        ▼
Website (3 screens + agent detail page) — polls every 5s or SSE for live feed
```

### 6.2 The "Pokee-like" live experience (what the user asked for)

> *"If I tell the agent to start, it should show in the dashboard what it was doing, like Pokee AI working."*

Implementation:
1. Human types a task on the Dashboard (e.g. "Arjun, run the daily executive review").
2. The task is dispatched to the agent via the API → agent's LangGraph graph starts.
3. **Every node the agent visits emits a bus event** (`execution.started`, tool-call events, `execution.completed`).
4. The Dashboard's **Agent Activity Flow** panel subscribes (SSE) and shows, in real time:
   - which agent is working (Arjun — highlighted)
   - which workflow it's running (ARJ-W02 — Daily Executive Review)
   - the current step ("Step 3/7: Identifying overdue actions…")
   - which agents it's talking to (→ Niyantrak: get_workforce_status ✓)
   - the result when done (brief generated, linked)
5. The 4 agents are drawn as connected nodes (the P0 topology from section 2); the active one pulses, and the connection lines light up as messages flow between them.

**This is the single most important UX requirement of P0** — it proves the system is alive and observable. Spec: `Website_6.md` section 3.2.

### 6.3 The human approval loop (website → agents)

```
Agent needs a human decision (certification confirm, activation, S1 closure)
   → approval.requested event → approvals table (status: pending)
   → Dashboard shows a badge: "2 pending approvals"
Human opens the approval panel → sees: what, why, evidence links, options
   → clicks Approve / Reject (with a note)
   → POST /api/approvals/{id}/decide → approvals table (status: decided)
   → approval.decided event → the requesting agent continues
   → if it was an activation: Niyantrak's gate runs check 4 with this record
```

**Every human decision is a durable, append-only record** — this is what makes the whole system auditable ("who approved what, when, with what evidence").

---

## 7. SECURITY MODEL (P0)

From the PDFs' core rule (PDF1 p.11): *"The OS should use a tool gateway to enforce permissions BEFORE any action executes. Model instructions alone are not a security boundary."*

| # | Control | Where enforced |
|---|---|---|
| 1 | Least-privilege tools per agent | Each agent YAML lists allowed tools; the tool dispatcher refuses anything else (code, not prompt) |
| 2 | Activation gate (5 checks) | `dwms/lifecycle.py` — deterministic, the ONLY path to Active |
| 3 | Append-only history | Database grants: INSERT+SELECT only on history tables |
| 4 | Independence | Satya's S1 escalation uses a separate bus channel to the Board; Arjun's tools expose findings read-only |
| 5 | No self-approval | `approval.decide` requires a human session; no agent tool can write to `approvals` |
| 6 | Tenant isolation | Every registry/telemetry query carries a tenant scope; cross-tenant = refused (P0: one demo tenant, but the check exists) |
| 7 | Human gates | Certification confirm, activation, suspension (material), data deletion, S1 closure — all require `approvals` records |
| 8 | Audit trail | `bus_events` + `execution_log` + `lifecycle_events` = complete reconstruction of any moment |
| 9 | Model honesty | Every agent's system prompt: missing data = "unavailable", model down = "model unavailable" — never fabricate |
| 10 | Emergency stop | Human can suspend any agent from the website (one click) → `agent.suspended` → agent's runtime refuses new work |

---

## 8. TESTING — PROOF THAT P0 WORKS END TO END

P0 is the basement: if it's wrong, everything built on it is wrong. Testing is not optional — it is part of the build.

### 8.1 Test pyramid for P0

| Layer | What | Where | Must pass before |
|---|---|---|---|
| Unit | Each deterministic service (gate, lifecycle, telemetry, scorecard) | `tests/test_*.py` | Integration tests |
| Agent | The 9 scenarios per agent (each agent README section 13.3) | `tests/test_{agent}.py` | E2E |
| Bus | Every event type published + consumed correctly; envelope valid | `tests/test_bus.py` | E2E |
| Website API | Every endpoint returns correct shape + correct data from seeded DB | `tests/test_website_api.py` | E2E |
| **E2E** | **The 12-step lifecycle (section 4.3) run start-to-finish** | `tests/test_e2e_lifecycle.py` | **Go-live** |

### 8.2 The E2E lifecycle test (the single most important test)

Seeded with a fresh database and a fake 5th agent ("TestAgent"), the test must verify:

| Step | Assertion |
|---|---|
| 1. Role request created | `initiatives` row exists, status pending |
| 2. Human approves role | `approvals` row (role approval) |
| 3. Registration | `agents` row, state=registered; `agent.registered` in `bus_events` |
| 4. Configuration | `agent_versions` v1.0; state=configured |
| 5. Tests run | `test_runs` row, 9/9 pass |
| 6. Certification | `certifications` row (human_confirmed_by set); `certification.recorded` event |
| 7. Human confirms | `approvals` row (certification) |
| 8. Activation approval | `approvals` row (activation) |
| 9. Gate | `lifecycle_events` row with 5 checks all pass; state=active; `agent.activated` event |
| 10. Execution | TestAgent runs a task → `execution_log` row with tokens; `execution.completed` event |
| 11. Evaluation | Satya samples it → `evaluations` row |
| 12. Version change | New version tested → deployed → old version archived (rollback ready) |

**Negative E2E tests (must all be REJECTED):**
- Activation without certification → gate check 3 fails, event `activation.rejected`
- Activation without human approval → gate check 4 fails
- Arjun attempts to alter a finding → refused (read-only), attempt logged
- Satya attempts to certify itself → refused
- Niyantrak attempts to delete an execution log → refused (no DELETE grant)
- Agent attempts to write to `approvals` → refused (no such tool)
- Ollama stopped mid-test → agents report "model unavailable"; deterministic services still serve the dashboard

### 8.3 Website verification (manual, 10-minute checklist)

Run locally, then verify by eye:
- [ ] Dashboard: 4 departments shown (CEO Office, Technology, Assurance + "P1 pending" note), 4 agents registered, active/inactive counts correct
- [ ] Dashboard: dispatch a task to Arjun → live feed shows the workflow steps in real time → brief appears when done
- [ ] Dashboard: the 4 agent nodes are drawn connected; active agent pulses; lines light up on message flow
- [ ] Positions: table shows all 4 agents with correct position/dept/state; View opens the detail page
- [ ] Agent detail: identity card, I/O contract, workflows, KPIs, and the execution log (what it did, when, tokens, status) all render
- [ ] Agent detail: pick a time range → only executions in that range show
- [ ] Token Usage: per-agent/day table matches `capacity_metrics` exactly; trend chart renders
- [ ] Approval panel: a pending certification shows up; approving it continues the flow; the decision is recorded
- [ ] Stop Ollama → dashboard still shows counts (deterministic); LLM panels show "model unavailable"
- [ ] Restart Ollama → system resumes, no data loss

### 8.4 Go-live criteria for P0 (all must be true)

1. All unit + agent + bus + website-API tests pass
2. E2E lifecycle test passes (positive + all 7 negative cases)
3. All 4 agents certified by Satya (human-confirmed) and activated through the gate
4. Website 10-minute checklist complete
5. Emergency stop tested (suspend Arjun from website → his runtime refuses work)
6. Full audit-trail reconstruction demo: pick a random execution, show its complete chain (task → steps → tools → tokens → events → evaluation)
7. Human Board signs off (recorded in `approvals`)

---

## 9. LOCAL RUNBOOK (how the user runs P0 on their machine)

### 9.1 Prerequisites

| Requirement | Version | Check command |
|---|---|---|
| Python | 3.11+ | `python --version` |
| PostgreSQL | 14+ (local install) | `psql --version` |
| Redis | 6+ (local install) | `redis-cli --version` |
| Ollama | latest | `ollama --version` |
| Qwen model | — | `ollama pull qwen2.5:7b` |

### 9.2 Start sequence (in order)

```bash
# 1. Start infrastructure
pg_ctl start                          # or: service postgresql start
redis-server --daemonize yes
ollama serve &                        # if not already running
ollama pull qwen2.5:7b                # one-time

# 2. Create the database + schema
createdb samrudhi_p0
cd samrudhi-p0
python init_db.py                     # creates all 18 tables + grants (append-only rules)

# 3. Seed the P0 registry (the 4 agents, states: proposed)
python seed_p0.py

# 4. Start the backend (API + website + bus)
python main.py                        # serves http://localhost:8000

# 5. Start the Celery worker (background agent executions)
celery -A tasks worker --loglevel=info
```

### 9.3 Verify it's alive

```bash
curl http://localhost:11434/api/tags          # Ollama: qwen2.5:7b present
curl http://localhost:8000/api/health         # backend: db, redis, ollama all ok
open http://localhost:8000                    # Dashboard
```

### 9.4 Run the test suite

```bash
pytest tests/ -v                # full suite
pytest tests/test_e2e_lifecycle.py -v   # the critical one
```

### 9.5 Daily operation

- Open `http://localhost:8000` → Dashboard
- Dispatch tasks to agents (the "start" box) → watch the live flow
- Handle pending approvals in the approval panel
- Check Positions for agent detail/logs; Token Usage for consumption
- Stop everything: `celery stop` → kill `main.py` → `ollama stop` (DB/Redis persist)

---

## 10. WHAT COMES AFTER P0 (so the basement is shaped right)

P0 must be shaped so P1 drops in without rework:

| P1 addition | What P0 already provides for it |
|---|---|
| 24-role pilot workforce (content pipeline) | Registry + gate + telemetry: each new agent follows the 12-step lifecycle (section 4.3) |
| Client-facing portal | Same FastAPI backend; new routes; tenant isolation already enforced |
| Sales/Finance pods | `agents` table already holds 194-position structure (department, priority fields) |
| Real client data | Tenant scope already in every query; knowledge store is Sutra's P1 build |
| More screens (approvals history, incidents, scorecards) | All the tables already exist — screens are just new queries |

**The 194-position registry:** P0 seeds only the 4 P0 agents as *active records*, but the `agents` table schema holds all 194 positions (canonical ID, position ID, department, priority) as *proposed* rows from day one — so the Positions screen can show the full workforce plan with P0 agents live and the rest "proposed".

---

## 11. SOURCE MAP

| Section of this document | PDF file | Pages |
|---|---|---|
| 5-layer system architecture (human board at top) | SAMRUDHI AGENTIC AI.pdf | 9 |
| "Tool gateway enforces permissions before action" rule | SAMRUDHI AGENTIC AI.pdf | 11 |
| 5-dimension evaluation model | SAMRUDHI AGENTIC AI.pdf | 13 |
| 90-day roadmap + go-live criteria | SAMRUDHI AGENTIC AI.pdf | 20–21 |
| DWMS master record, 8-state lifecycle | SAMRUDHI AGENTIC AI(1).pdf | 66 |
| Release 0 scope + "need not be 16 agents" | SAMRUDHI AGENTIC AI(1).pdf | 77 |
| Authority & security controls | SAMRUDHI AGENTIC AI(1).pdf | 73–74 |
| Satya's independence (direct Board path) | SAMRUDHI AGENTIC AI(1).pdf | 57 |
| Agent specs (4 agents) | All three PDFs | see each agent README |
| Message protocol + website combination | Built for this implementation (not in PDFs) | — |
| Model choice (Ollama + Qwen) | Implementation decision (local, zero cost) | — |