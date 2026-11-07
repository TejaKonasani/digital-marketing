# Website Design — Samrudhi P0 Control Centre (build order #6)

> **What this document is:** The complete design specification for the P0 website — 3 screens (Dashboard, Positions, Token Usage) + 1 detail page (Agent Detail). Every screen: layout, exact elements, data source (which API endpoint / which table), and behaviour.
> **Read after:** `P0_Architecture_5.md` (the system this website observes and controls).
> **The website is the Human Board's command centre** — the top layer of the 5-layer architecture (PDF1 p.9). It shows the truth and gives the human their approval gates.

---

## 1. GENERAL SPEC (applies to all screens)

### 1.1 Tech (fixed — no build step, runs locally)

| Layer | Choice | Why |
|---|---|---|
| Frontend | Static HTML + vanilla JavaScript + Tailwind CSS (via CDN) | Zero build tooling; opens instantly; the user asked for a simple local run |
| Serving | FastAPI `StaticFiles` (same backend as the agents) | One process to run: `python main.py` → `http://localhost:8000` |
| Data | REST endpoints (JSON) + Server-Sent Events (SSE) for the live feed | SSE = simple one-way live updates, no WebSocket complexity |
| Charts | Chart.js (via CDN) | Token trends, activity sparklines |
| Live updates | Poll every 5s for counts/tables; SSE stream for the activity feed | Simple + reliable locally |

### 1.2 Visual identity (Samrudhi)

| Element | Value |
|---|---|
| Background | Dark theme: `#0B1120` (slate-950) |
| Cards | `#111A2E` with 1px border `#1E293B`, rounded-xl |
| Primary accent | `#38BDF8` (sky-400) — Samrudhi blue |
| Active / success | `#34D399` (emerald-400) |
| Inactive / pending | `#64748B` (slate-500) |
| Warning | `#FBBF24` (amber-400) |
| Critical / S1 | `#F87171` (red-400) |
| Font | Inter (system fallback), monospace for IDs (`SAM-AG-001`) |
| Layout | Left sidebar (nav) + main content area, max-width 1400px |

### 1.3 Sidebar (all screens)

```
┌──────────────────────────┐
│  ◆ SAMRUDHI              │
│    Agentic OS · P0       │
├──────────────────────────┤
│  ▣ Dashboard             │
│  ▤ Positions             │
│  ◔ Token Usage           │
├──────────────────────────┤
│  ⚠ Approvals (badge: n)  │  ← pending human approvals
│  ─ System                │
│    ● Ollama: connected   │  ← live health indicators
│    ● Database: connected │
│    ● Bus: connected      │
└──────────────────────────┘
```

The system health row calls `GET /api/health` every 10s. If Ollama is down, the dot turns red and says "Ollama: unavailable" — the rest of the site keeps working (deterministic data).

### 1.4 Top bar (all screens)

```
┌────────────────────────────────────────────────────────────────┐
│  [screen title]                    [search agent…]  [clock]   │
└────────────────────────────────────────────────────────────────┘
```

Clock shows local time (the user's timezone). Search filters the Positions table (client-side).

---

## 2. SCREEN 1 — DASHBOARD

**URL:** `http://localhost:8000/` (index.html)

**Purpose:** The "Pokee-like" command view — at a glance: how big is the workforce, who's working right now, what's happening between the agents, and who is who.

### 2.1 Layout (top to bottom)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ROW 1 — FOUR STAT CARDS                                                 │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │
│ │ Total        │ │ Total Agents │ │  Active      │ │  Inactive    │    │
│ │ Departments  │ │              │ │  (working)   │ │  (not working)│   │
│ │      11      │ │      194     │ │      2       │ │     192      │    │
│ │ (4 live in   │ │ (4 registered│ │  ● Arjun     │ │  rest        │    │
│ │  P0)         │ │  in P0)      │ │  ● Sutra     │ │  proposed    │    │
│ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘    │
├─────────────────────────────────────────────────────────────────────────┤
│ ROW 2 — AGENT ACTIVITY FLOW  (the "Pokee working" panel)                │
│ ┌─────────────────────────────────────────────────────────────────┐    │
│ │  AGENT ACTIVITY — LIVE                                          │    │
│ │                                                                 │    │
│ │   ┌────────┐    ┌────────┐    ┌────────┐    ┌────────┐         │    │
│ │   │ ARJUN  │◄──►│ SUTRA  │    │ NIYAN- │    │ SATYA  │         │    │
│ │   │ ●work  │    │ ○idle  │    │ TRAK   │    │ ○idle  │         │    │
│ │   └───┬────┘    └────────┘    │ ○idle  │    └────────┘         │    │
│ │       │                        └────────┘                        │    │
│ │  ┌────▼─────────────────────────────────────────────────────┐   │    │
│ │  │ 14:02:11  Arjun started ARJ-W02 Daily Executive Review   │   │    │
│ │  │ 14:02:13  Arjun → Niyantrak: get_workforce_status ✓ (0.4s)│   │    │
│ │  │ 14:02:15  Arjun → Sutra: get_system_health ✓ (0.3s)       │   │    │
│ │  │ 14:02:18  Arjun: Step 3/7 — identifying overdue actions   │   │    │
│ │  │ 14:02:24  Arjun: generating executive brief…              │   │    │
│ │  │ 14:02:31  Arjun ✓ completed — brief B-014 (12.1s, 4.2k tok)│   │    │
│ │  └───────────────────────────────────────────────────────────┘   │    │
│ │  [ Start an agent ▾ ]  [ task input field………………]  [ RUN ]      │    │
│ └─────────────────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────────────────┤
│ ROW 3 — TWO PANELS SIDE BY SIDE                                         │
│ ┌──────────────────────────────────┐ ┌────────────────────────────────┐│
│ │ DEPARTMENTS (left)               │ │ PRIORITY-WISE AGENTS (right)   ││
│ │                                  │ │                                ││
│ │ 01 CEO Office & Strategy   6     │ │ P0 — Foundation (live)         ││
│ │    ● Arjun (CEO) — active        │ │  1 Sutra     AI CTO        ●  ││
│ │ 10 Technology, MCP & AgentOps 24 │ │  2 Arjun     AI CEO        ●  ││
│ │    ● Sutra (CTO) — active        │ │  3 Satya     Chief Assurance ○││
│ │    ● Niyantrak (AgentOps) — active│ │  4 Niyantrak AgentOps/DWMS  ○ ││
│ │ 11 Independent Assurance     20  │ │                                ││
│ │    ● Satya (Assurance) — active  │ │ P1 — Pilot (next)              ││
│ │                                  │ │  5 Daksh     AI COO         —  ││
│ │ 02 Sales & Growth            13  │ │  6 Aarya     Creative Lead    — ││
│ │ 03 Brand & Marketing         16  │ │  7 Mitra     Client Exp.      — ││
│ │ 04 Client Experience         16  │ │  8 Medha     Analytics        — ││
│ │ 05 Operations                18  │ │  … (24-role pilot roster)      ││
│ │ 06 Creative & Content        22  │ │                                ││
│ │ 07 Paid Media & SEO          20  │ │ P2 — Expansion (later)         ││
│ │ 08 Analytics & Intelligence  19  │ │  remaining 170 positions       ││
│ │ 09 Finance & Admin           20  │ │                                ││
│ └──────────────────────────────────┘ └────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 ROW 1 — Stat cards (exact data)

| Card | Value | Data source |
|---|---|---|
| **Total Departments** | 11 | Static constant (the 11 departments from the master register) — but the card also shows "N live in P0" = count of departments with ≥1 active agent |
| **Total Agents** | 194 (plan) / 4 (registered) | `GET /api/dashboard/summary` → `{total_positions: 194, registered: 4, active: 2, inactive: 2}`. Card shows both: big number = registered in P0, small text = "of 194 planned positions" |
| **Active Agents** | count + names | `agents` table where `status IN (active, monitored)` — "active" = **currently doing work or ready to work** (lifecycle state Active/Monitored). Card lists the names with green dots |
| **Inactive Agents** | count | registered but not active (proposed/registered/configured/evaluated/approved/restricted/retired) + the unregistered planned positions shown as small text |

**Definition the user asked for — "active means those agents which are doing work":**
- **Active (green)** = lifecycle state `active` or `monitored` (passed the gate, authorised to work). If the agent has an `execution_log` row started in the last 60s with no end, the dot **pulses** (currently working).
- **Inactive (grey)** = any other state (not yet authorised, or restricted/retired).

### 2.3 ROW 2 — Agent Activity Flow (the core "Pokee-like" panel)

**The topology (static, drawn once):** 4 nodes (Arjun, Sutra, Satya, Niyantrak) connected by lines per the P0 connection map (section 4.2 of `P0_Architecture_5.md`): Arjun↔Sutra, Arjun↔Satya, Arjun↔Niyantrak, Satya↔Sutra, Satya↔Niyantrak, Sutra↔Niyantrak. Niyantrak sits at the bottom-centre (the DWMS hub everything touches).

**Node states:**
- grey outline = idle
- **pulsing accent ring = currently executing** (an open execution)
- small badge on the node = current workflow (e.g. "ARJ-W02")

**Connection lines:** light up (animated dash) for ~2s whenever a bus event shows a message between two agents (e.g. `Arjun → Niyantrak: get_workforce_status`).

**The feed (below the topology):** live list of events, newest first, auto-scrolling, from `GET /api/dashboard/activity` (SSE stream). Each line:

```
HH:MM:SS   [Agent]   [what happened]   [duration/tokens if done]
```

Event types shown (mapped from the bus catalogue):
| Bus event | Feed line example |
|---|---|
| `execution.started` | `Arjun started ARJ-W02 Daily Executive Review` |
| tool call (agent→agent) | `Arjun → Niyantrak: get_workforce_status ✓ (0.4s)` |
| workflow step | `Arjun: Step 3/7 — identifying overdue actions` |
| `execution.completed` | `Arjun ✓ completed — brief B-014 (12.1s, 4.2k tokens)` |
| `execution.failed` | `Satya ✗ failed SAT-W02 — model unavailable (red)` |
| `agent.activated` | `Niyantrak: Lakshya activated (gate 5/5 passed)` |
| `activation.rejected` | `Niyantrak: activation rejected for X — checks 1,3 failed (amber)` |
| `finding.raised` | `Satya raised S3 finding F-014 on Arjun (amber)` |
| `brief.generated` | `Arjun: Daily Executive Brief B-014 ready (link)` |
| `approval.requested` | `Approval needed: certify Lakshya (badge on Approvals)` |
| `model.unavailable` | `Sutra: model unavailable — reporting honestly (red)` |

**The "Start an agent" control (the user's key request):**
- Dropdown: pick an agent (Arjun / Sutra / Satya / Niyantrak)
- Input: type the task in plain language (e.g. "run the daily executive review", "check system health", "evaluate Arjun's last brief", "show registry health")
- **RUN** button → `POST /api/agents/{agent_id}/execute {task}` → Celery job → the agent's LangGraph graph runs → every step streams into the feed above
- The node starts pulsing, connection lines animate as it calls other agents' tools, and the result appears in the feed + (for Arjun) as a linkable brief

**This is exactly how "Pokee AI working" feels: you tell it to start, and you watch it work, step by step, live.**

### 2.4 ROW 3 — Departments (left) + Priority-wise agents (right)

**Left panel — Departments:** one row per department (all 11), name + total planned positions. Departments with live P0 agents show them as sub-rows with status dots (● active / ○ inactive). Data: `GET /api/dashboard/departments` → `[{code: "01", name: "CEO Office & Enterprise Strategy", positions: 6, agents: [{name, canonical_id, state}]}]`.

**Right panel — Priority-wise agents:** grouped by priority:
- **P0 — Foundation:** the 4 agents, in build order (1 Sutra, 2 Arjun, 3 Satya, 4 Niyantrak), each with designation + live state dot
- **P1 — Pilot:** the 24-role pilot roster (from Doc 01C §7) — names + designations, state = "— (not yet built)"
- **P2 — Expansion:** collapsed summary "170 positions — see Positions screen"

Data: `GET /api/dashboard/priority` → `[{priority: "P0", agents: [{name, designation, canonical_id, state}]}, …]`.

### 2.5 Dashboard API endpoints (complete)

| Endpoint | Returns |
|---|---|
| `GET /api/dashboard/summary` | `{total_departments, live_departments, total_positions, registered, active: [names], inactive_count}` |
| `GET /api/dashboard/activity?limit=50` | last 50 bus events (or SSE: `GET /api/dashboard/activity/stream`) |
| `GET /api/dashboard/departments` | 11 departments with positions + live agents |
| `GET /api/dashboard/priority` | P0/P1/P2 agent groups |
| `POST /api/agents/{agent_id}/execute` | `{task}` → `{execution_id}` (starts the live flow) |
| `GET /api/health` | `{ollama: bool, database: bool, redis: bool, agents: {id: state}}` |

---

## 3. SCREEN 2 — POSITIONS

**URL:** `http://localhost:8000/positions` (positions.html)

**Purpose:** The full workforce register — every agent, its state, and a deep-dive page per agent.

### 3.1 Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ROW 1 — THREE STAT BOXES                                                │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                     │
│ │ Total Agents │ │ Active       │ │ Inactive     │                     │
│ │      4       │ │      2       │ │      2       │                     │
│ │ registered   │ │  (working /  │ │  (not yet    │                     │
│ │ (194 planned)│ │   authorised)│ │   authorised)│                     │
│ └──────────────┘ └──────────────┘ └──────────────┘                     │
├─────────────────────────────────────────────────────────────────────────┤
│ ROW 2 — AGENT TABLE                                                     │
│ ┌────┬──────────┬─────────────────────┬──────────────┬────────┬───────┐│
│ │S.No│ Name     │ Position            │ Department   │ State  │       ││
│ ├────┼──────────┼─────────────────────┼──────────────┼────────┼───────┤│
│ │ 1  │ Sutra    │ AI CTO (TEC-001)    │ Technology   │ ●Active│ [View]││
│ │ 2  │ Arjun    │ AI CEO (CEO-001)    │ CEO Office   │ ●Active│ [View]││
│ │ 3  │ Satya    │ Chief Assurance     │ Independent  │ ○Eval- │ [View]││
│ │    │          │ (GOV-001)           │ Assurance    │ uated  │       ││
│ │ 4  │ Niyantrak│ AgentOps & DWMS     │ Technology   │ ○Conf- │ [View]││
│ │    │          │ (TEC-007)           │              │ igured │       ││
│ └────┴──────────┴─────────────────────┴──────────────┴────────┴───────┘│
│  [filter: All ▾] [search…]        (P0 shows registered agents;          │
│                                    planned positions shown on expand)   │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.2 The table (exact columns)

| Column | Content | Source |
|---|---|---|
| **S.No** | 1, 2, 3, … (build order for P0) | registry order |
| **Name** | Agent name + canonical ID in monospace small text (e.g. "Sutra · SAM-AG-007") | `agents.name`, `agents.canonical_id` |
| **Position** | Designation + position ID (e.g. "AI CTO · TEC-001") | `agents.role`, `agents.position_id` |
| **Department** | Department name | `agents.department` |
| **Active / Inactive** | State chip: ● Active (green) / ○ Inactive (grey) with the lifecycle state in small text (proposed, registered, configured, evaluated, approved, restricted, retired) | `agents.status` |
| **View** | Button → opens the Agent Detail page (`/positions/{agent_id}`) | — |

**Filtering:** dropdown by state (All / Active / Inactive), by department, by priority. Search box matches name/ID/position.

**Planned positions (expandable):** a collapsed section "190 planned positions (P1/P2)" — expandable list of the remaining registry rows (name, position, department, priority, state=proposed) so the full 194-position plan is visible without cluttering the P0 table.

### 3.3 Positions API endpoints

| Endpoint | Returns |
|---|---|
| `GET /api/positions` | `{total, active: [agents], inactive: [agents], planned: [agents]}` |
| `GET /api/positions/{agent_id}` | full agent detail (section 4 below) |
| `GET /api/positions/{agent_id}/executions?from=&to=&limit=` | work log for a period (section 4.5) |

---

## 4. AGENT DETAIL PAGE (opens from View)

**URL:** `http://localhost:8000/positions/{agent_id}` (agent_detail.html)

**Purpose:** *"All about that agent only — specifications, names, input, output, everything. And if a company wants to check what work was done for a particular project, the logs of the agent (what work it did at that particular time) — everything related."*

This is the **audit page**. It is built from the agent's README (static spec) + the DWMS (live data).

### 4.1 Layout (single scrolling page, sticky sub-nav)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ← Back to Positions        ARJUN — AI Chief Executive Officer           │
│ SAM-AG-001 · CEO-001 · CEO Office          [● Active]  [C2 certified]   │
├─────────────────────────────────────────────────────────────────────────┤
│ [Identity] [Specs] [I/O Contract] [Workflows] [KPIs] [Connections] [Logs]│
├─────────────────────────────────────────────────────────────────────────┤
│ 1. IDENTITY CARD (table — from the agent README section 1)              │
│    name, designation, canonical ID, position, department, reports to,   │
│    human owner, evaluator, autonomy, priority, target competency,       │
│    current certified level, lifecycle state, model, prompt version      │
├─────────────────────────────────────────────────────────────────────────┤
│ 2. SPECIFICATIONS (from the agent README)                               │
│    • Mission (one paragraph)                                            │
│    • Key Result Areas (table)                                           │
│    • Hard rules / behaviour rules (list)                                │
│    • Permission matrix (table: activity / authority / human approval?)  │
├─────────────────────────────────────────────────────────────────────────┤
│ 3. I/O CONTRACT                                                         │
│    RECEIVES (table: From | What)        PROVIDES (table: To | What)     │
├─────────────────────────────────────────────────────────────────────────┤
│ 4. WORKFLOWS (collapsible cards per workflow)                           │
│    ARJ-W01 Strategic Objective Deployment — steps 1–7, input, output    │
│    ARJ-W02 Daily Executive Review — …                                   │
├─────────────────────────────────────────────────────────────────────────┤
│ 5. KPIs & PERFORMANCE                                                   │
│    • KPI table (id, metric, target)                                     │
│    • Latest evaluation (Satya): 5-dimension scores + weighted + class   │
│    • Open findings (Satya): severity + status                           │
├─────────────────────────────────────────────────────────────────────────┤
│ 6. CONNECTIONS (mini topology)                                          │
│    This agent's links to the other P0 agents + what flows each way      │
├─────────────────────────────────────────────────────────────────────────┤
│ 7. WORK LOG — "what did this agent do, and when"  ◄── the audit part    │
│    [date range picker: from / to]  [filter: all/success/failed] [search]│
│    ┌─────────────────────────────────────────────────────────────────┐ │
│    │ 2026-11-08 09:00:02  ARJ-W02 Daily Executive Review             │ │
│    │   status ✓ success · 12.1s · 4,210 tokens · exec-id EX-0412     │ │
│    │   task: "daily review" · output: brief B-014 · model qwen2.5:7b  │ │
│    │   [expand → full step-by-step trace]                             │ │
│    │ 2026-11-08 09:00:14  tool: get_workforce_status → Niyantrak      │ │
│    │   ✓ 0.4s · input: {period: today} · output-ref: WRK-0091        │ │
│    │ 2026-11-07 18:22:41  ARJ-W04 Critical Issue Escalation           │ │
│    │   status ✓ success · 8.3s · 2,914 tokens · exec-id EX-0398      │ │
│    │   …                                                              │ │
│    └─────────────────────────────────────────────────────────────────┘ │
│    summary strip: [period] runs: 47 · success: 45 · failed: 2 ·        │
│    total tokens: 118,402 · avg duration: 9.4s                           │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Where each section's data comes from

| Section | Static (from agent README, stored in `agent_specs` JSON at seed time) | Live (from DWMS) |
|---|---|---|
| Identity card | name, designation, IDs, reports-to, evaluator, autonomy, priority, target competency | current state, certified level, model, prompt version |
| Specifications | mission, KRAs, hard rules, permission matrix | — |
| I/O contract | receives/provides tables | — |
| Workflows | workflow definitions (steps, input, output) | last-run timestamp per workflow |
| KPIs & performance | KPI table (targets) | latest `evaluations` row, open `findings` rows |
| Connections | connection table (from README section 14) | recent message counts per link (from `bus_events`) |
| **Work log** | — | **`execution_log` + tool-call events, filtered by date range** |

**Spec storage:** at seed time (`seed_p0.py`), each agent's README-derived spec (identity, KRAs, rules, I/O, workflows, KPIs, connections) is stored as a JSON document in an `agent_specs` table keyed by canonical ID. The detail page renders spec + live data together. This keeps the READMEs as the single source of truth for the spec, and the DWMS as the single source of truth for the live data.

### 4.3 The "what work was done for that project / at that time" requirement

The user's exact need: *a company checks what work a particular agent did for a particular project at a particular time.*

Implementation:
1. **Date range picker** (from/to) on the Work Log section → `GET /api/positions/{agent_id}/executions?from=2026-11-01&to=2026-11-08`
2. **Project/task filter:** every execution record carries `task` (what it was asked to do) and `client_id`/`project_ref` (which client/project — P0: the demo client "DEMO-HEALTHCARE-01"). Filter dropdown lists distinct projects.
3. **Expandable trace:** clicking a run expands the full step-by-step trace — every workflow step, every tool call (which agent it called, input hash, output ref, duration), tokens per step, and the final output reference. This comes from the structured execution record (the 11 fields every agent must log — each agent README section 13.1).
4. **Export:** a "Download CSV" button on the Work Log (server-side CSV of the filtered rows) — for the company's records.

**What the company can answer from this page:** "On 8 Nov between 9:00 and 9:05, Arjun ran the daily review, called Niyantrak for workforce status and Sutra for system health, produced brief B-014, consumed 4,210 tokens, and it succeeded." — with every claim traceable to a record ID.

### 4.4 Agent detail API endpoints

| Endpoint | Returns |
|---|---|
| `GET /api/positions/{agent_id}` | `{spec: {…static…}, live: {state, certified_level, model, prompt_version, latest_evaluation, open_findings, connection_stats}}` |
| `GET /api/positions/{agent_id}/executions?from=&to=&project=&status=&limit=` | `{runs: [{exec_id, workflow, task, project_ref, status, started_at, ended_at, duration_s, tokens, model, output_ref, steps: […]}], summary: {runs, success, failed, total_tokens, avg_duration_s}}` |
| `GET /api/positions/{agent_id}/executions/{exec_id}` | full trace of one execution (all steps + tool calls) |
| `GET /api/positions/{agent_id}/executions/export.csv?from=&to=` | CSV download |

---

## 5. SCREEN 3 — TOKEN USAGE

**URL:** `http://localhost:8000/tokens` (tokens.html)

**Purpose:** AI execution economics — every token is attributable to an agent and a task (Sutra's KPI: "0 unattributed AI spend", PDF2 p.70). In P0 tokens = capacity tracking (no money, local model), but the structure is identical to cost tracking.

### 5.1 Layout

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
│ │  Agent      │ Today │ Yesterday │ 7-day │ 30-day │ Trend       │    │
│ │  Arjun      │ 12,402│  8,113   │ 52,110│ 52,110 │  ▁▃▅▇ (chart)│    │
│ │  Sutra      │  4,210│  3,980   │ 19,882│ 19,882 │  ▂▃▃▄        │    │
│ │  Satya      │  2,914│  1,204   │  8,441│  8,441 │  ▁▁▂▃        │    │
│ │  Niyantrak  │  1,108│    990   │  4,112│  4,112 │  ▁▁▁▁        │    │
│ │  ─────────────────────────────────────────────────────────────  │    │
│ │  Total      │ 20,634│ 14,287   │ 84,545│ 84,545 │              │    │
│ └─────────────────────────────────────────────────────────────────┘    │
│  [line chart: daily tokens per agent, 30-day window, 4 coloured lines]  │
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

### 5.2 Data sources

| Element | Source |
|---|---|
| Stat cards | `GET /api/tokens/summary?period=7d` → `{total_tokens, executions, success, failed, avg_tokens_per_exec, top_consumer: {agent, tokens, pct}}` |
| Per-agent/day table | `GET /api/tokens/by-agent?period=30d` → rows from `capacity_metrics` (agent, day, runs, tokens_used, failures) pivoted |
| Trend chart | same endpoint, daily series per agent |
| Per-execution table | `GET /api/tokens/executions?period=7d` → `execution_log` rows (time, agent, workflow, task, tokens) |
| Outlier flag | computed: tokens > 3 × agent's 7-day average per execution |

**Rule:** the numbers on this screen must equal the database exactly — the screen is a query view, never an estimate. (Same honesty rule as every agent: missing data shows "unavailable".)

---

## 6. THE APPROVAL PANEL (shared component — the human's gates)

**Access:** sidebar "Approvals" (badge = pending count) → `/approvals`

This is the ONLY write surface of the website. It is where the human Board exercises the gates that make P0 safe.

```
┌─────────────────────────────────────────────────────────────────────────┐
│ PENDING APPROVALS (2)                                                   │
│ ┌─────────────────────────────────────────────────────────────────┐    │
│ │ #REQ-007 · CERTIFICATION CONFIRMATION · requested 14:02 by Satya│    │
│ │ Agent: Lakshya (SAM-AG-012) · Scope: KPI monitoring · Level: C2 │    │
│ │ Evidence: test-run-2026-11-07-lakshya (9/9) · CERT-011          │    │
│ │ Conditions: reassess after 30 days; expires on material change  │    │
│ │ [View evidence]   [ Approve ✓ ]   [ Reject ✗ (note…) ]         │    │
│ ├─────────────────────────────────────────────────────────────────┤    │
│ │ #REQ-008 · ACTIVATION · requested 14:05 by Arjun                │    │
│ │ Agent: Lakshya → Active · Gate pre-checks: cert ✓ approval ⏳   │    │
│ │ [View gate status]  [ Approve ✓ ]  [ Reject ✗ (note…) ]        │    │
│ └─────────────────────────────────────────────────────────────────┘    │
│ DECISION HISTORY (append-only list — who approved what, when, note)     │
└─────────────────────────────────────────────────────────────────────────┘
```

| Endpoint | Purpose |
|---|---|
| `GET /api/approvals/pending` | pending queue |
| `GET /api/approvals/{id}` | full detail + evidence links |
| `POST /api/approvals/{id}/decide` | `{decision: approve|reject, note}` → writes `approvals` row (append-only) → publishes `approval.decided` |
| `GET /api/approvals/history` | decision history |

**Emergency stop (also here):** a red button per active agent: "SUSPEND" → `POST /api/agents/{id}/suspend {reason}` → `agent.suspended` event → the agent's runtime refuses new work → human notified in the feed. (This is the Sutra README test #4 / architecture security control #10.)

---

## 7. WEBSITE BUILD CHECKLIST (tick as you go)

- [ ] `static/` served by FastAPI at `http://localhost:8000`
- [ ] Sidebar with 3 nav items + Approvals badge + system health row (Ollama/DB/Bus dots)
- [ ] **Dashboard** — 4 stat cards (depts, agents, active, inactive) with correct numbers from `/api/dashboard/summary`
- [ ] **Dashboard** — topology of 4 connected agent nodes; active node pulses; connection lines animate on agent→agent messages
- [ ] **Dashboard** — live activity feed (SSE) showing step-by-step work while an agent runs
- [ ] **Dashboard** — "Start an agent" control (dropdown + task input + RUN) → dispatches execution → live flow visible
- [ ] **Dashboard** — left panel: 11 departments with position counts + live agent sub-rows
- [ ] **Dashboard** — right panel: P0 (4, live states) / P1 (24 roster) / P2 (summary) groups
- [ ] **Positions** — 3 stat boxes (total/active/inactive)
- [ ] **Positions** — table: S.No, Name (+canonical ID), Position (+position ID), Department, Active/Inactive chip, View button
- [ ] **Positions** — filter (state/department/priority) + search
- [ ] **Positions** — expandable "190 planned positions" section
- [ ] **Agent Detail** — Identity card (static spec + live state/certification)
- [ ] **Agent Detail** — Specifications (mission, KRAs, hard rules, permission matrix)
- [ ] **Agent Detail** — I/O contract (receives/provides tables)
- [ ] **Agent Detail** — Workflows (collapsible, with last-run timestamps)
- [ ] **Agent Detail** — KPIs + latest evaluation (5-dimension scores) + open findings
- [ ] **Agent Detail** — Connections mini-topology
- [ ] **Agent Detail** — Work Log: date-range picker, project filter, status filter, expandable per-run trace, summary strip, CSV export
- [ ] **Token Usage** — 4 stat cards with period picker
- [ ] **Token Usage** — per-agent/day table + 30-day trend chart (Chart.js)
- [ ] **Token Usage** — per-execution drill-down table + outlier flags
- [ ] **Approvals** — pending queue with evidence links, approve/reject with note, decision history
- [ ] **Approvals** — emergency SUSPEND button per active agent
- [ ] Ollama-down behaviour: health dot red, LLM panels show "model unavailable", deterministic data still renders
- [ ] All numbers on all screens match the database exactly (verified against `capacity_metrics` / `execution_log` / `agents`)
- [ ] Website API tests pass (`tests/test_website_api.py`)

---

## 8. SOURCE MAP

| Part of this website | Source |
|---|---|
| "Human Board Command Centre" as the top layer | SAMRUDHI AGENTIC AI.pdf p.9 (5-layer architecture) |
| Dashboard panels (Digital Workforce, Workflow Execution, AI Execution Economics) | SAMRUDHI AGENTIC AI(1).pdf p.74–75 (Sutra's dashboard) |
| Positions data (18-field master record, lifecycle states) | SAMRUDHI AGENTIC AI(1).pdf p.66 (DWMS) |
| Token/cost attribution ("0 unattributed AI spend") | SAMRUDHI AGENTIC AI(1).pdf p.70 (cost governance KPI) |
| Agent specs shown on the detail page | The 4 agent READMEs in this folder (each agent's sections 1–14) |
| Work log fields (11-field execution record) | Each agent README section 13.1 + SAMRUDHI AGENTIC AI(1).pdf p.72–73 |
| Approval gates (certification confirm, activation, S1 closure) | SAMRUDHI AGENTIC AI(1).pdf p.57, 64, 73–74 |
| 11 departments + 194 positions + P0/P1/P2 priorities | SAMRUDHI AGENTIC AI(1).pdf p.140–144 (canonical registry) |
| Live "Pokee-like" activity flow | Implementation requirement (user request) — built on the bus event catalogue in `P0_Architecture_5.md` section 4.1 |
| Tech choices (vanilla JS, Tailwind CDN, Chart.js, SSE) | Implementation decision — zero build step, local run |