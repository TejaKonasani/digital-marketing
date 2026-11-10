# Website Design — Samrudhi Control Room

> **What this document is:** The complete design specification for the website — the human control room that observes and controls the Samrudhi Agentic OS. Six screens plus one detail page. Every screen: layout, every number's source (table or endpoint), empty state, loading state, error state.
>
> **Read after:** `P0_Architecture_5.md` (the system this website observes and controls).
>
> **The website is the Human Board's control room** — the top layer of the system. It is **read-only except for approvals and the emergency stop**. No agent has a website login.

---

## 1. PURPOSE AND GENERAL SPEC

### 1.1 Purpose

The website is the **human control room**. Its two jobs:

1. **Show the truth** (read): what agents exist, what state they are in, what they are doing right now, what they consumed.
2. **Give the human their gates** (write): approvals (the only write surface) and the emergency stop.

Every number on every screen must equal the database exactly. The screen is a query view, never an estimate.

### 1.2 Screens and routes

| Screen | URL | Purpose |
|---|---|---|
| **Dashboard** | `/` | At-a-glance: workforce size, who is working now, live activity flow, department overview |
| **Positions** | `/positions` | Full workforce register — every agent, its state, filters, search |
| **Token Usage** | `/tokens` | AI execution capacity — tokens per agent per day, trends, outliers |
| **Approvals** | `/approvals` | The human's gates — pending approvals, decision history, emergency stop |
| **Workflows** | `/workflows` | Active client workflows across all phases — pipeline status, detail view |
| **Findings & Incidents** | `/findings` | Assurance findings (S1–S4) and incidents — severity, status, evidence |
| **Agent Detail** | `/positions/{agent_id}` | Deep-dive on one agent — spec + live data + work log |

### 1.3 Definitions (state them once — three different things)

| Term | Meaning | Source |
|---|---|---|
| **Registered** | The agent has a registry record (`agents` row exists). Lifecycle state is `registered`, `configured`, `evaluated`, or `proposed`. | `agents.status IN ('proposed','registered','configured','evaluated')` |
| **Active (authorised)** | The agent has passed the activation gate and is authorised to work. Lifecycle state is `active` or `monitored`. | `agents.status IN ('active','monitored')` |
| **Working now** | The agent has an `execution_log` row that started in the last 60 seconds with no end time — it is running right now. | `execution_log` where `started_at > now() - 60s AND ended_at IS NULL` |

**These are three different things.** An agent can be Active but not Working now (authorised, idle). An agent can be Registered but not Active (not yet passed the gate). The website labels each clearly.

### 1.4 Scale rules (137 agents)

With 137 documented agents, the website cannot draw 137 individual nodes or list them all on one screen without pagination.

- **Live diagram:** One node per **department** (11 departments), not per agent. Click a department node to expand and see its agents. Active departments pulse; active agents within show as dots.
- **Positions table:** Paginated (25 per page). Filters by stage (`P0-1A`, `P0-1B`, `P0-1C`, `P1-P1`…`P1-P6`), by phase, by department, by state. Search by name / canonical ID / position ID.
- **Token Usage:** Paginated per-agent table. Trend charts aggregate by day.
- **Dashboard stats:** Counts are aggregates (`COUNT(*)` grouped by stage/department), not individual rows.

### 1.5 Offline rule

The website runs locally with **zero internet dependency**.

- **Chart.js:** vendored locally in `static/vendor/chart.js` (not CDN).
- **CSS:** a single local `static/assets/style.css` file (not Tailwind CDN).
- **Font:** system font stack (Inter fallback), no web font download.
- **No CDN calls.** If the machine is offline, the website works fully.

### 1.6 Accuracy rule

Every number on every screen must equal the database exactly. If the database query returns null or errors, the screen shows "unavailable" — never an estimate, never a cached stale number.

### 1.7 ID format

Use the **full canonical ID** everywhere: `SAM-AG-007`, never `SAM-007`. The monospace display is `SAM-AG-007`.

### 1.8 Visual identity

| Element | Value |
|---|---|
| Background | Dark theme: `#0B1120` (slate-950) |
| Cards | `#111A2E` with 1px border `#1E293B`, rounded-xl |
| Primary accent | `#38BDF8` (sky-400) — Samrudhi blue |
| Active / success | `#34D399` (emerald-400) |
| Inactive / pending | `#64748B` (slate-500) |
| Warning | `#FBBF24` (amber-400) |
| Critical / S1 | `#F87171` (red-400) |
| Font | System stack (Inter fallback), monospace for IDs |
| Layout | Left sidebar (nav) + main content area, max-width 1400px |

### 1.9 Sidebar (all screens)

```
┌──────────────────────────┐
│  ◆ SAMRUDHI              │
│    Agentic OS            │
├──────────────────────────┤
│  ▣ Dashboard             │
│  ▤ Positions             │
│  ◔ Token Usage           │
│  ✓ Approvals (badge: n)  │  ← pending human approvals
│  ⟲ Workflows             │
│  ⚠ Findings & Incidents  │
├──────────────────────────┤
│  ─ System                │
│    ● Ollama: connected   │  ← live health indicators
│    ● Database: connected │
│    ● Bus: connected      │
└──────────────────────────┘
```

The system health row calls `GET /api/health` every 10s. If Ollama is down, the dot turns red and says "Ollama: unavailable" — the rest of the site keeps working (deterministic data).

### 1.10 Top bar (all screens)

```
┌────────────────────────────────────────────────────────────────┐
│  [screen title]                    [search agent…]  [clock]   │
└────────────────────────────────────────────────────────────────┘
```

Clock shows local time (Asia/Calcutta). Search filters the Positions table (client-side after load).

---

## 2. SCREEN 1 — DASHBOARD

**URL:** `http://localhost:8000/` (index.html)

**Purpose:** The command view — at a glance: how big is the workforce, who is working right now, what is happening between the agents, and who is who.

### 2.1 Layout (top to bottom)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ROW 1 — FIVE STAT CARDS                                                 │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │
│ │ Total        │ │ Registered   │ │ Active       │ │ Working      │    │
│ │ Departments  │ │ Agents       │ │ (authorised) │ │ Now          │    │
│ │      11      │ │     137      │ │      4       │ │      1       │    │
│ │ (4 live in   │ │ (30 P0 +     │ │  ● Arjun     │ │  ● Arjun     │    │
│ │  P0)         │ │  107 P1)     │ │  ● Sutra     │ │              │    │
│ │              │ │              │ │  ● Satya     │ │              │    │
│ │              │ │              │ │  ● Niyantrak │ │              │    │
│ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘    │
│ ┌──────────────┐                                                        │
│ │ Active       │                                                        │
│ │ Workflows    │                                                        │
│ │      3       │                                                        │
│ │  ● delivery  │                                                        │
│ │  ○ creative  │                                                        │
│ │  ○ analytics │                                                        │
│ └──────────────┘                                                        │
├─────────────────────────────────────────────────────────────────────────┤
│ ROW 2 — DEPARTMENT LIVE DIAGRAM  (one node per department, expandable)  │
│ ┌─────────────────────────────────────────────────────────────────┐    │
│ │  [CEO Office]──►[Technology]──►[Assurance]                      │    │
│ │      ● Arjun      ● Sutra         ● Satya                       │    │
│ │      ● (working)  ● Niyantrak     ○ idle                        │    │
│ │         │              │                                          │    │
│ │         ▼              ▼                                          │    │
│ │  [Operations]    [Creative]    [Client Exp]   [Analytics]        │    │
│ │      ○             ○              ○              ○                │    │
│ │  (click to expand department → see its agents)                   │    │
│ │  ┌────▼─────────────────────────────────────────────────────┐   │    │
│ │  │ 14:02:11  Arjun started ARJ-W02 Daily Executive Review   │   │    │
│ │  │ 14:02:13  Arjun → Niyantrak: get_workforce_status ✓ (0.4s)│   │    │
│ │  │ 14:02:15  Arjun → Sutra: get_system_health ✓ (0.3s)       │   │    │
│ │  │ 14:02:18  Arjun: Step 3/7 — identifying overdue actions   │   │    │
│ │  │ 14:02:31  Arjun ✓ completed — brief B-014 (12.1s, 4.2k tok)│   │    │
│ │  └───────────────────────────────────────────────────────────┘   │    │
│ │  [ Start an agent ▾ ]  [ task input field………………]  [ RUN ]      │    │
│ └─────────────────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────────────────┤
│ ROW 3 — STAGE SUMMARY (counts by stage/phase)                           │
│ ┌──────────────────────────────────┐ ┌────────────────────────────────┐│
│ │ Stage 1 (P0) — 30 agents         │ │ Stage 2 (P1) — 107 agents      ││
│ │  1A Core: 4  [●●●●]              │ │  Phase 1: 4   [●●●●]           ││
│ │  1B Tech: 14 [●●●●●●●●●●●●●●]   │ │  Phase 2: 16  [●●●●●●●●●●●●●●●●]││
│ │  1C Assurance: 12 [●●●●●●●●●●●●]│ │  Phase 3: 29  [●●●●●●●●●●●●●●●●●]││
│ │                                  │ │  Phase 4: 13  [●●●●●●●●●●●●●]  ││
│ │                                  │ │  Phase 5: 23  [●●●●●●●●●●●●●●●●●]││
│ │                                  │ │  Phase 6: 22  [●●●●●●●●●●●●●●●●●]││
│ └──────────────────────────────────┘ └────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 ROW 1 — Stat cards (exact data)

| Card | Value | Data source | Empty state | Loading | Error |
|---|---|---|---|---|---|
| **Total Departments** | 11 | Static constant (the 11 departments). Also shows "N live" = count of departments with ≥1 active agent | "—" | spinner | "unavailable" |
| **Registered Agents** | 137 | `GET /api/dashboard/summary` → `{registered: 137}` | "—" | spinner | "unavailable" |
| **Active (authorised)** | count + names | `agents` where `status IN ('active','monitored')` | "0 active" | spinner | "unavailable" |
| **Working now** | count + names | `execution_log` started < 60s ago, no end | "0 working" | spinner | "unavailable" |
| **Active Workflows** | count + status | `workflow_instances` where `status IN ('executing','quality','approved')` | "0 workflows" | spinner | "unavailable" |

**FIX — Start an agent box:** The dropdown lists **only Active agents** (status `active` or `monitored`). Inactive/proposed agents are not shown. When a task is started, the system logs **who started it** (the human login name from the session).

```
[ Start an agent ▾ ]  ← dropdown: only active agents (Arjun, Sutra, Satya, Niyantrak, …)
[ task input field ]  ← free text
[ RUN ]               ← POST /api/agents/{agent_id}/execute {task, started_by: human}
```

The `started_by` field is recorded in the `execution_log` (via the bus event payload) so the work log shows who initiated each task.

### 2.3 ROW 2 — Department live diagram

**FIX — one node per department, not 8 agents.** The diagram shows 11 department nodes. Each node displays:
- Department name
- Count of active agents (small dots)
- Which agents are working now (pulsing)

Click a department node to expand and see its individual agents. This scales to 137 agents without drawing 137 nodes.

**Live activity feed (below the diagram):** SSE stream of the last 50 bus events. Shows step-by-step work while an agent runs.

### 2.4 ROW 3 — Stage summary

**FIX — new stage and phase counts (not the old "P1 pilot 24-role roster" or "194/8").**

| Stage | Count | Breakdown |
|---|---|---|
| Stage 1 (P0) | 30 | 1A Core: 4, 1B Tech: 14, 1C Assurance: 12 |
| Stage 2 (P1) | 107 | Phase 1: 4, Phase 2: 16, Phase 3: 29, Phase 4: 13, Phase 5: 23, Phase 6: 22 |

Data: `GET /api/dashboard/summary` → `{by_stage: {P0: 30, P1: 107}, by_phase: {P1-P1: 4, P1-P2: 16, …}}`.

### 2.5 Dashboard API endpoints

| Endpoint | Returns |
|---|---|
| `GET /api/dashboard/summary` | `{total_departments, live_departments, registered, active: [names], working_now: [names], active_workflows: {count, by_stage}, by_stage: {P0, P1}, by_phase: {…}}` |
| `GET /api/dashboard/activity?limit=50` | last 50 bus events (or SSE: `GET /api/dashboard/activity/stream`) |
| `GET /api/dashboard/departments` | 11 departments with agent counts + live agents |
| `GET /api/health` | `{ollama: bool, database: bool, redis: bool}` |
| `POST /api/agents/{agent_id}/execute` | `{task, started_by}` → `{execution_id}` (starts the live flow) |

---

## 3. SCREEN 2 — POSITIONS

**URL:** `http://localhost:8000/positions` (positions.html)

**Purpose:** The full workforce register — every agent, its state, and a deep-dive page per agent.

### 3.1 Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ROW 1 — THREE STAT BOXES                                                │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                     │
│ │ Registered   │ │ Active       │ │ Working Now  │                     │
│ │     137      │ │      4       │ │      1       │                     │
│ │ (30 P0 +     │ │ (authorised) │ │ (running)    │                     │
│ │  107 P1)     │ │              │ │              │                     │
│ └──────────────┘ └──────────────┘ └──────────────┘                     │
├─────────────────────────────────────────────────────────────────────────┤
│ ROW 2 — AGENT TABLE (paginated, 25 per page)                            │
│ ┌────┬──────────┬─────────────────────┬──────────────┬────────┬───────┐│
│ │S.No│ Name     │ Position            │ Stage/Phase  │ State  │       ││
│ ├────┼──────────┼─────────────────────┼──────────────┼────────┼───────┤│
│ │ 1  │ Sutra    │ AI CTO (TEC-001)    │ P0-1A        │ ●Active│ [View]││
│ │    │ ·SAM-AG-007│                   │              │        │       ││
│ │ 2  │ Arjun    │ AI CEO (CEO-001)    │ P0-1A        │ ●Active│ [View]││
│ │    │ ·SAM-AG-001│                   │              │        │       ││
│ │ 5  │ Daksh    │ AI COO (OPS-001)    │ P1-P1        │ ○Regis-│ [View]││
│ │    │ ·SAM-AG-002│                   │              │ tered  │       ││
│ │ …  │ …        │ …                   │ …            │ …      │ …     ││
│ └────┴──────────┴─────────────────────┴──────────────┴────────┴───────┘│
│  [filter: All ▾][Stage ▾][Phase ▾][Dept ▾][State ▾] [search…]         │
│  Page 1 of 6  [◄] [1] [2] [3] [4] [5] [6] [►]                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.2 The table (exact columns)

| Column | Content | Source |
|---|---|---|
| **S.No** | Build order within stage/phase | registry order |
| **Name** | Agent name + full canonical ID `SAM-AG-xxx` in monospace small text | `agents.name`, `agents.canonical_id` |
| **Position** | Designation + position ID (e.g. "AI CTO · TEC-001") | `agents.designation`, `agents.position_id` |
| **Stage/Phase** | `P0-1A`, `P0-1B`, `P0-1C`, `P1-P1`…`P1-P6` | `agents.stage` |
| **Active / Inactive** | State chip: ● Active (green) / ○ Registered (grey) / ○ Proposed (dim) with lifecycle state in small text | `agents.status` |
| **View** | Button → opens the Agent Detail page (`/positions/{agent_id}`) | — |

**FIX — filters:** dropdowns by Stage (P0-1A, P0-1B, P0-1C, P1-P1…P1-P6), Phase, Department, State (All / Registered / Active / Working now). Search matches name / canonical ID / position ID. Pagination 25 per page.

### 3.3 Positions API endpoints

| Endpoint | Returns |
|---|---|
| `GET /api/positions?page=1&stage=&phase=&dept=&state=&q=` | `{total, page, per_page, total_pages, agents: [{s_no, name, canonical_id, designation, position_id, stage, status, is_active, is_working_now}]}` |
| `GET /api/positions/{agent_id}` | full agent detail (section 5 below) |
| `GET /api/positions/{agent_id}/executions?from=&to=&limit=` | work log for a period |
| `GET /api/positions/{agent_id}/workflows?from=&to=` | workflows owned by this orchestrator (P1) |

---

## 4. SCREEN 3 — TOKEN USAGE

**URL:** `http://localhost:8000/tokens` (tokens.html)

**Purpose:** AI execution capacity tracking — every token is attributable to an agent and a task. In P0 tokens = capacity (no money, local model), but the structure is identical to cost tracking.

### 4.1 Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ROW 1 — FOUR STAT CARDS (period picker: today / 7d / 30d / custom)      │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │
│ │ Total Tokens │ │ Executions   │ │ Avg Tokens/  │ │ Top Consumer │    │
│ │   118,402    │ │      47      │ │ Execution    │ │              │    │
│ │  (period)    │ │  (45 ✓ 2 ✗)  │ │    2,519     │ │  Arjun       │    │
│ │              │ │              │ │              │ │  52,110 (44%)│    │
│ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘    │
├─────────────────────────────────────────────────────────────────────────┤
│ ROW 2 — TOKENS PER AGENT PER DAY (table + trend chart)                  │
│ ┌─────────────────────────────────────────────────────────────────┐    │
│ │  Agent      │ Today │ Yesterday │ 7-day │ 30-day │ Latency │ Trend│   │
│ │  Arjun      │ 12,402│  8,113   │ 52,110│ 52,110 │  9.4s   │ ▁▃▅▇ │   │
│ │  Sutra      │  4,210│  3,980   │ 19,882│ 19,882 │  5.1s   │ ▂▃▃▄ │   │
│ │  Satya      │  2,914│  1,204   │  8,441│  8,441 |  3.2s   | ▁▁▂▃ │   │
│ │  Niyantrak  |  1,108|    990   |  4,112|  4,112 |  1.8s   | ▁▁▁▁ |   │
│ │  ─────────────────────────────────────────────────────────────  |   │
│ │  Total      | 20,634| 14,287   | 84,545| 84,545 |           |      │   │
│ └─────────────────────────────────────────────────────────────────┘    │
│  [line chart: daily tokens per agent, 30-day window, coloured lines]    │
├─────────────────────────────────────────────────────────────────────────┤
│ ROW 3 — PER-EXECUTION DETAIL (drill-down)                               │
│ ┌─────────────────────────────────────────────────────────────────┐    │
│ │  Time           │ Agent     │ Workflow │ Task          │ Tokens │    │
│ │  08 Nov 09:00   │ Arjun     │ ARJ-W02  │ daily review  │ 4,210  │    │
│ │  08 Nov 08:58   │ Sutra     │ SUT-W01  │ health check  │ 1,876  │    │
│ │  08 Nov 08:41   │ Arjun     │ ARJ-W04  │ escalation    │ 2,914  │    │
│ │  … (click a row → full execution trace, same as agent detail)   │    │
│ └─────────────────────────────────────────────────────────────────┘    │
│  outlier flag: any execution > 3× the agent's 7-day average is marked   │
│  ⚠ (feeds Sutra's anomaly alerts)                                      │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.2 FIX — Token Usage adds latency and prompt/response token counts

Ollama returns both prompt and completion token counts, and latency. With a local model, tokens are **capacity**, not money. The screen shows:

| Field | Source |
|---|---|
| **Tokens** | `execution_log.tokens_used` (= `prompt_tokens + response_tokens`) |
| **Prompt tokens** | `execution_log.prompt_tokens` |
| **Response tokens** | `execution_log.response_tokens` |
| **Latency** | `execution_log.latency_s` |

The per-agent table shows total tokens and average latency. The per-execution table shows prompt/response split and latency per run.

### 4.3 Data sources

| Element | Source |
|---|---|
| Stat cards | `GET /api/tokens/summary?period=7d` → `{total_tokens, executions, success, failed, avg_tokens_per_exec, avg_latency_s, top_consumer: {agent, tokens, pct}}` |
| Per-agent/day table | `GET /api/tokens/by-agent?period=30d` → rows from `capacity_metrics` (agent, day, runs, tokens_used, prompt_tokens, response_tokens, failures, avg_latency) pivoted |
| Trend chart | same endpoint, daily series per agent |
| Per-execution table | `GET /api/tokens/executions?period=7d` → `execution_log` rows (time, agent, workflow, task, prompt_tokens, response_tokens, latency_s) |
| Outlier flag | computed: tokens > 3 × agent's 7-day average per execution |

**Accuracy rule:** the numbers on this screen must equal the database exactly.

---

## 5. AGENT DETAIL PAGE (opens from View)

**URL:** `http://localhost:8000/positions/{agent_id}` (agent_detail.html)

**Purpose:** All about that agent only — specifications, names, input, output, everything. And the work log: what work it did for a particular project at a particular time.

**FIX — spec generated from YAML/JSON blocks, not README text parsing.** Each agent README contains structured YAML and JSON blocks (identity card, authority matrix, I/O contract, workflows, KPIs). At seed time, these blocks are extracted and stored as JSON in the `agent_specs` table. The detail page renders from this structured data — not by parsing free-form README text (which is fragile).

### 5.1 Layout (single scrolling page, sticky sub-nav)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ← Back to Positions        ARJUN — AI Chief Executive Officer           │
│ SAM-AG-001 · CEO-001 · P0-1A             [● Active]  [C2 certified]     │
├─────────────────────────────────────────────────────────────────────────┤
│ [Identity] [Specs] [I/O Contract] [Workflows] [KPIs] [Connections] [Logs]│
├─────────────────────────────────────────────────────────────────────────┤
│ 1. IDENTITY CARD (table — from agent_specs JSON)                        │
│    name, designation, canonical ID, position, department, stage,        │
│    reports to, human owner, evaluator, autonomy, priority, agent_type,  │
│    target competency, current certified level, lifecycle state, model   │
├─────────────────────────────────────────────────────────────────────────┤
│ 2. SPECIFICATIONS (from agent_specs JSON)                               │
│    • Mission (one paragraph)                                            │
│    • Key Result Areas (table)                                           │
│    • Hard rules / behaviour rules (list)                                │
│    • Permission matrix (table: activity / authority / human approval?)  │
├─────────────────────────────────────────────────────────────────────────┤
│ 3. I/O CONTRACT (from agent_specs JSON)                                 │
│    RECEIVES (table: From | What)        PROVIDES (table: To | What)     │
├─────────────────────────────────────────────────────────────────────────┤
│ 4. WORKFLOWS (collapsible cards per workflow)                           │
│    ARJ-W01 Strategic Objective Deployment — steps 1–7, input, output    │
│    ARJ-W02 Daily Executive Review — …                                   │
├─────────────────────────────────────────────────────────────────────────┤
│ 5. KPIs & PERFORMANCE (from agent_specs JSON + live evaluations)        │
│    • KPI table (id, metric, target)                                     │
│    • Latest evaluation (Satya): 5-dimension scores + weighted + class   │
│    • Open findings (Satya): severity + status                           │
├─────────────────────────────────────────────────────────────────────────┤
│ 6. CONNECTIONS (mini topology)                                          │
│    This agent's links to the other agents + what flows each way         │
├─────────────────────────────────────────────────────────────────────────┤
│ 7. WORK LOG — "what did this agent do, and when"  ◄── the audit part    │
│    [date range picker: from / to]  [filter: all/success/failed] [search]│
│    ┌─────────────────────────────────────────────────────────────────┐ │
│    │ 2026-11-10 10:30:02  ARJ-W02 Daily Executive Review             │ │
│    │   status ✓ success · 12.1s · 4,210 tok (3,100 in / 1,110 out)   │ │
│    │   task: "daily review" · output: brief B-014 · model qwen2.5:7b  │ │
│    │   started_by: admin                                             │ │
│    │   [expand → full step-by-step trace]                             │ │
│    │ 2026-11-10 10:00:14  tool: get_workforce_status → Niyantrak      │ │
│    │   ✓ 0.4s · input: {period: today} · output-ref: WRK-0091        │ │
│    │ …                                                               │ │
│    └─────────────────────────────────────────────────────────────────┘ │
│    summary strip: [period] runs: 47 · success: 45 · failed: 2 ·        │
│    total tokens: 118,402 · avg latency: 9.4s                            │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Where each section's data comes from

| Section | Static (from `agent_specs` JSON) | Live (from DWMS) |
|---|---|---|
| Identity card | name, designation, IDs, reports-to, evaluator, autonomy, priority, agent_type, target competency | current state, certified level, model |
| Specifications | mission, KRAs, hard rules, permission matrix | — |
| I/O contract | receives/provides tables | — |
| Workflows | workflow definitions (steps, input, output) | last-run timestamp per workflow |
| KPIs & performance | KPI table (targets) | latest `evaluations` row, open `findings` rows |
| Connections | connection table | recent message counts per link (from `bus_events`) |
| **Work log** | — | **`execution_log` + tool-call events, filtered by date range** |

### 5.3 API endpoints

| Endpoint | Returns |
|---|---|
| `GET /api/positions/{agent_id}` | `{spec: {…static from agent_specs…}, live: {state, certified_level, model, latest_evaluation, open_findings, connection_stats}}` |
| `GET /api/positions/{agent_id}/executions?from=&to=&project=&status=&limit=` | `{runs: [{exec_id, workflow, task, project_ref, status, started_at, ended_at, duration_s, prompt_tokens, response_tokens, tokens, latency_s, model, output_ref, started_by, steps: […]}], summary: {runs, success, failed, total_tokens, avg_latency_s}}` |
| `GET /api/positions/{agent_id}/executions/{exec_id}` | full trace of one execution (all steps + tool calls) |
| `GET /api/positions/{agent_id}/executions/export.csv?from=&to=` | CSV download |

---

## 6. SCREEN 4 — APPROVALS

**URL:** `http://localhost:8000/approvals` (approvals.html)

**Purpose:** The human's gates. This is the **ONLY write surface** of the website. It is where the human Board exercises the gates that make the system safe.

### 6.1 Who the human is

A simple local login. One human approver account (configurable).

- **Login:** `POST /api/auth/login {username, password}` → session cookie
- **Default:** `admin` / password in `config/platform.yaml`
- **What is recorded:** Every decision records `decided_by` (login name), `decided_at`, and `note`. The `approvals` table is append-only.

### 6.2 Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│ PENDING APPROVALS (2)                                                   │
│ ┌─────────────────────────────────────────────────────────────────┐    │
│ │ #REQ-007 · CERTIFICATION CONFIRMATION · requested 14:02 by Satya│    │
│ │ Agent: Lakshya (SAM-AG-066) · Scope: KPI monitoring · Level: C2 │    │
│ │ Evidence: test-run-2026-11-07-lakshya (all pass) · CERT-011     │    │
│ │ Conditions: reassess after 30 days; expires on material change  │    │
│ │ [View evidence]   [ Approve ✓ ]   [ Reject ✗ (note…) ]         │    │
│ ├─────────────────────────────────────────────────────────────────┤    │
│ │ #REQ-008 · ACTIVATION · requested 14:05 by Arjun                │    │
│ │ Agent: Lakshya → Active · Gate pre-checks: cert ✓ approval ⏳   │    │
│ │ [View gate status]  [ Approve ✓ ]  [ Reject ✗ (note…) ]        │    │
│ └─────────────────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────────────────┤
│ EMERGENCY STOP (per active agent)                                       │
│ ┌─────────────────────────────────────────────────────────────────┐    │
│ │ SAM-AG-001 Arjun  [● Active]  [SUSPEND ⏹]                       │    │
│ │ SAM-AG-007 Sutra  [● Active]  [SUSPEND ⏹]                       │    │
│ │ SAM-AG-010 Satya  [● Active]  [SUSPEND ⏹]                       │    │
│ │ SAM-AG-158 Niyantrak [● Active]  [SUSPEND ⏹]                    │    │
│ └─────────────────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────────────────┤
│ DECISION HISTORY (append-only list — who approved what, when, note)     │
│ ┌─────────────────────────────────────────────────────────────────┐    │
│ │ 14:00  REQ-006 APPROVED  by admin  "cert evidence complete"     │    │
│ │ 13:45  REQ-005 REJECTED  by admin  "insufficient test coverage" │    │
│ │ …                                                               │    │
│ └─────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.3 Endpoints

| Endpoint | Purpose |
|---|---|
| `GET /api/approvals/pending` | pending queue |
| `GET /api/approvals/{id}` | full detail + evidence links |
| `POST /api/approvals/{id}/decide` | `{decision: approve\|reject, note}` → writes `approvals` row (append-only) → publishes `approval.decided` |
| `GET /api/approvals/history` | decision history |
| `POST /api/agents/{id}/suspend` | `{reason}` → `agent.suspended` event → agent runtime refuses new work |

---

## 7. SCREEN 5 — WORKFLOWS

**URL:** `http://localhost:8000/workflows` (workflows.html)

**Purpose:** Active client workflows across all phases — pipeline status, detail view. This screen was referenced in the architecture but had no spec before.

### 7.1 Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ROW 1 — THREE STAT BOXES                                                │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                     │
│ │ Active       │ │ Blocked      │ │ Completed      │                     │
│ │     3        │ │      0       │ │     12         │                     │
│ └──────────────┘ └──────────────┘ └──────────────┘                     │
├─────────────────────────────────────────────────────────────────────────┤
│ ROW 2 — WORKFLOW TABLE (paginated)                                      │
│ ┌────┬──────────┬──────────────┬──────────────┬──────────┬────────────┐ │
│ │ WF │ Client   │ Scope        │ Status       │ Packages │ Updated    │ │
│ ├────┼──────────┼──────────────┼──────────────┼──────────┼────────────┤ │
│ │042 │ DEMO-HC  │ content pkg  │ executing    │ 3/5 done │ 2m ago     │ │
│ │041 │ DEMO-HC  │ content pkg  │ delivered    │ 5/5 done │ 1h ago     │ │
│ │040 │ DEMO-HC  │ analytics    │ quality      │ 2/2 done │ 3h ago     │ │
│ └────┴──────────┴──────────────┴──────────────┴──────────┴────────────┘ │
│  [filter: All ▾][Status ▾][Client ▾] [search…]  Page 1 of 1            │
├─────────────────────────────────────────────────────────────────────────┤
│ ROW 3 — WORKFLOW DETAIL (click a row)                                   │
│ ┌─────────────────────────────────────────────────────────────────┐    │
│ │ WF-042 · DEMO-HEALTHCARE-01 · content package                   │    │
│ │ Status: executing  ·  Priority: P1  ·  Created: 08 Nov 10:00    │    │
│ │ ┌─────────────────────────────────────────────────────────────┐ │    │
│ │ │ Package 1: 20 social posts    [in_progress]  ● Shruti        │ │    │
│ │ │ Package 2: 4 articles         [allocated]    ○ Lekha         │ │    │
│ │ │ Package 3: 2 videos           [proposed]     —               │ │    │
│ │ └─────────────────────────────────────────────────────────────┘ │    │
│ │ Timeline: created → planning → allocated → executing (now)      │    │
│ │ [View bus events for this workflow →]                           │    │
│ └─────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
```

### 7.2 Endpoints

| Endpoint | Returns |
|---|---|
| `GET /api/workflows?status=&client=&page=` | `{total, page, workflows: [{workflow_id, client_id, scope_ref, status, packages_total, packages_done, priority, created_at, updated_at}]}` |
| `GET /api/workflows/{workflow_id}` | full detail: workflow + packages + timeline + recent bus events |
| `GET /api/workflows/{workflow_id}/events` | bus events for this workflow (filterable by type) |

---

## 8. SCREEN 6 — FINDINGS & INCIDENTS

**URL:** `http://localhost:8000/findings` (findings.html)

**Purpose:** Assurance findings (S1–S4) from Satya and incidents from Sutra. Severity, status, evidence. This screen was referenced but had no spec before.

### 8.1 Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ROW 1 — FOUR STAT BOXES (by severity)                                   │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │
│ │ S1 Critical  │ │ S2 High      │ │ S3 Medium    │ │ S4 Low       │    │
│ │     0        │ │      1       │ │      3       │ │      8       │    │
│ │  [OPEN: 0]   │ │  [OPEN: 1]   │ │  [OPEN: 2]   │ │  [OPEN: 5]   │    │
│ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘    │
├─────────────────────────────────────────────────────────────────────────┤
│ ROW 2 — FINDINGS TABLE (append-only, paginated)                         │
│ ┌────┬──────┬──────────┬──────────────┬──────────┬────────┬───────────┐│
│ │ #  │ Sev  │ Agent    │ Finding      │ Status   │ Evidence│ Reported ││
│ ├────┼──────┼──────────┼──────────────┼──────────┼────────┼───────────┤│
│ │F-12│ S2   │ SAM-049  │ Copy lacks   │ open     │ [view] │ 09 Nov    ││
│ │    │      │ Lekha    │ source ref   │          │        │           ││
│ │F-11│ S3   │ SAM-083  │ Image alt    │ open     │ [view] │ 08 Nov    ││
│ │    │      │ Chitra   │ text missing │          │        │           ││
│ │ …  │ …    │ …        │ …            │ …        │ …      │ …         ││
│ └────┴──────┴──────────┴──────────────┴──────────┴────────┴───────────┘│
│  [filter: All ▾][Severity ▾][Status ▾][Agent ▾] [search…]             │
├─────────────────────────────────────────────────────────────────────────┤
│ ROW 3 — INCIDENTS (separate table, Sutra's incidents)                   │
│ ┌────┬──────┬──────────────────────┬──────────┬────────┬──────────────┐│
│ │ #  │ Sev  │ Description          │ Status   │ Root   │ Reported     ││
│ ├────┼──────┼──────────────────────┼──────────┼────────┼──────────────┤│
│ │I-03│ S3   │ Ollama timeout       │ resolved │ model  │ 07 Nov 18:22 ││
│ │    │      │ on SAM-002           │          │ slow   │              ││
│ │ …  │ …    │ …                    │ …        │ …      │ …            ││
│ └────┴──────┴──────────────────────┴──────────┴────────┴──────────────┘│
└─────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Endpoints

| Endpoint | Returns |
|---|---|
| `GET /api/findings?severity=&status=&agent=&page=` | `{total, page, findings: [{finding_id, severity, agent_id, summary, status, evidence_refs, reported_at, reported_by}]}` |
| `GET /api/findings/{finding_id}` | full detail + evidence |
| `GET /api/incidents?severity=&status=&page=` | `{total, page, incidents: [{incident_id, severity, description, status, root_cause, reported_at}]}` |
| `GET /api/incidents/{incident_id}` | full detail + timeline |

---

## 9. WEBSITE BUILD CHECKLIST (tick as you go)

- [ ] `static/` served by FastAPI at `http://localhost:8000`
- [ ] **Offline rule:** Chart.js vendored in `static/vendor/`, CSS in `static/assets/style.css` — no CDN calls
- [ ] **ID format:** full `SAM-AG-007` everywhere (not `SAM-007`)
- [ ] **Sidebar** with 6 nav items + Approvals badge + system health row (Ollama/DB/Bus dots)
- [ ] **Dashboard** — 5 stat cards (depts, registered, active, working now, workflows) with correct numbers from `/api/dashboard/summary`
- [ ] **Dashboard** — department-level live diagram (11 nodes, expandable), not 137 agent nodes; active dept pulses
- [ ] **Dashboard** — live activity feed (SSE) showing step-by-step work while an agent runs
- [ ] **Dashboard** — "Start an agent" control lists **only Active agents**; logs `started_by` (human login)
- [ ] **Dashboard** — stage summary shows new counts (P0: 30, P1: 107 with phase breakdown)
- [ ] **Positions** — 3 stat boxes (registered/active/working now) reflecting 137 agents
- [ ] **Positions** — table paginated (25/page), filters by stage/phase/dept/state, search by name/ID
- [ ] **Positions** — full canonical ID `SAM-AG-xxx` in table
- [ ] **Token Usage** — 4 stat cards with period picker; adds **latency** and **prompt/response token split**
- [ ] **Token Usage** — per-agent/day table + 30-day trend chart (local Chart.js)
- [ ] **Token Usage** — per-execution drill-down table + outlier flags
- [ ] **Approvals** — pending queue with evidence links, approve/reject with note, decision history
- [ ] **Approvals** — emergency SUSPEND button per active agent
- [ ] **Approvals** — simple local human login (one approver account)
- [ ] **Workflows** — active workflows table + detail view (pipeline status, packages, timeline)
- [ ] **Findings & Incidents** — findings table (by severity) + incidents table (Sutra's)
- [ ] **Agent Detail** — spec generated from `agent_specs` JSON (YAML/JSON blocks), not README text parsing
- [ ] **Agent Detail** — work log shows `started_by`, prompt/response token split, latency
- [ ] Ollama-down behaviour: health dot red, LLM panels show "unavailable", deterministic data still renders
- [ ] **Accuracy rule:** all numbers on all screens match the database exactly (verified against `capacity_metrics` / `execution_log` / `agents` / `workflow_instances` / `findings` / `incidents`)
- [ ] Website API tests pass (`tests/test_website_api.py`)

---

## 10. SOURCE MAP

| Part of this website | Source |
|---|---|
| "Human Board Control Room" as the top layer | SAMRUDHI AGENTIC AI.pdf p.9 (5-layer architecture) |
| Dashboard panels (Digital Workforce, Workflow Execution, AI Execution Economics) | SAMRUDHI AGENTIC AI(1).pdf p.74–75 (Sutra's dashboard) |
| Positions data (master record, lifecycle states) | SAMRUDHI AGENTIC AI(1).pdf p.66 (DWMS) |
| Token/cost attribution ("0 unattributed AI spend") | SAMRUDHI AGENTIC AI(1).pdf p.70 (cost governance KPI) |
| Agent specs shown on the detail page | The agent READMEs — extracted from YAML/JSON blocks into `agent_specs` |
| Work log fields (execution record) | Each agent README section 16 + SAMRUDHI AGENTIC AI(1).pdf p.72–73 |
| Approval gates (certification confirm, activation, S1 closure) | SAMRUDHI AGENTIC AI(1).pdf p.57, 64, 73–74 |
| 11 departments + 137 positions + P0/P1 priorities | SAMRUDHI AGENTIC AI(1).pdf p.140–144 (canonical registry) |
| Live activity flow | Implementation requirement (user request) — built on the bus event catalogue in `P0_Architecture_5.md` section 5 |
| Tech choices (vanilla JS, local CSS, local Chart.js, SSE) | Implementation decision — zero build step, local run, offline rule |
