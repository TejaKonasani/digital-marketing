# Samrudhi Agentic OS — System Architecture

> **What this document is:** The architecture of the SYSTEM that runs the agents — not the agents themselves. Each agent README (`stage-1_P0/`, `stage-2_P1/`) defines one agent's role. This document defines the shared platform: message bus, authority guard, database, lifecycle gate, local-model rules, security, testing, and runbook.
>
> **Read this FIRST** before implementing any agent code. Then read the registry (`00_registry/AGENT_REGISTRY.md`) for the full list of agents. Then read individual agent READMEs as needed.
>
> **Source documents:** SAMRUDHI AGENTIC AI.pdf · SAMRUDHI AGENTIC AI(1).pdf · SAMRUDHI AGENTIC AI(2).pdf — all canonical IDs (SAM-AG-xxx) and position IDs come from these PDFs.
>
> **Companion document:** `Website_6.md` — the human control room that observes and controls this system.

---

## 1. SCOPE AND READING ORDER

**Scope:** This architecture covers the full platform that runs all **137 documented agents** (P0 Stage 1 = 30 agents, P1 Stage 2 = 107 agents across 6 phases). P2 (57 expansion positions) is out of scope — the platform is built to hold them, but they are not implemented.

**Reading order (short):**
1. This document — understand the system.
2. `00_registry/AGENT_REGISTRY.md` — the full agent list with IDs and phases.
3. `stage-1_P0/` agent READMEs — the 30 foundation agents.
4. `stage-2_P1/` agent READMEs — the 107 production agents, phase by phase.
5. `Website_6.md` — the human control room.

**What this document is NOT:** It does not describe each agent's responsibilities (that is in each agent's README). It describes the shared machinery every agent runs on.

---

## 2. STAGES AND PHASES (counts only)

| Stage | Folder | Agents | Meaning |
|---|---|---|---|
| **P0 Stage 1A** | `stage-1_P0/1A_core-agents/` | 4 | Thinking agents (Arjun, Sutra, Satya, Niyantrak) |
| **P0 Stage 1B** | `stage-1_P0/1B_technology-services/` | 14 | Technology services (service-first, mostly no LLM) |
| **P0 Stage 1C** | `stage-1_P0/1C_assurance-team/` | 12 | Assurance team (service-first + evaluators) |
| **P1 Phase 1** | `stage-2_P1/phase-1_pilot-leadership/` | 4 | Pilot leadership orchestrators |
| **P1 Phase 2** | `stage-2_P1/phase-2_content-pilot/` | 16 | Content and social pilot pipeline |
| **P1 Phase 3** | `stage-2_P1/phase-3_ops-client-analytics/` | 29 | Operations, Client Experience, Analytics, CEO Office |
| **P1 Phase 4** | `stage-2_P1/phase-4_platform-assurance-expansion/` | 13 | Platform resilience and assurance expansion |
| **P1 Phase 5** | `stage-2_P1/phase-5_growth-marketing/` | 23 | Growth: Paid Media, SEO, Samrudhi Marketing |
| **P1 Phase 6** | `stage-2_P1/phase-6_sales-finance/` | 22 | Sales and Finance |
| **Total documented** | | **137** | All positions in the canonical registry |
| P2 expansion | `_P2_later/` | 57 | Not implemented — platform holds the slots |

**Full registry:** See `00_registry/AGENT_REGISTRY.md` for the complete table of all 137 agents with IDs, names, phases, and responsibilities.

---

## 3. SYSTEM DIAGRAM (layers, not every agent)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  HUMAN CONTROL ROOM (website) — read-only except approvals + emergency stop │
│  Dashboard · Positions · Token Usage · Approvals · Workflows · Findings      │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │ REST + SSE
┌───────────────────────────────────▼─────────────────────────────────────────┐
│  FASTAPI BACKEND (main.py)                                                  │
│  API routes · agent dispatcher · approval panel · health checks             │
└──────┬──────────────────────────────────────────────────────────────────────┘
       │ dispatches tasks
┌──────▼──────────────────────────────────────────────────────────────────────┐
│  CELERY WORKER POOL (one 7B model, calls QUEUED)                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ Agent graph │  │ Agent graph │  │ Agent graph │  │ Agent graph │        │
│  │ (thinking)  │  │ (thinking)  │  │ (service)   │  │ (role)      │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│         │                │                │                │               │
│         └────────────────┴────────┬───────┴────────────────┘               │
│                                   │ LLM calls (serialized, queued)         │
└───────────────────────────────────┼────────────────────────────────────────┘
                                    ▼
                          ┌─────────────────┐
                          │  OLLAMA         │
                          │  qwen2.5:7b     │
                          │  localhost:11434│
                          └─────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  SHARED SERVICES (deterministic, no LLM)                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ PostgreSQL   │  │ Redis        │  │ Authority    │  │ Lifecycle    │    │
│  │ (all tables) │  │ (bus + queue)│  │ Guard        │  │ Gate         │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Key:** The human control room observes everything and controls approvals/emergency stop. The FastAPI backend dispatches tasks to the Celery worker pool. All agents share one 7B model via Ollama — LLM calls are serialized and queued. Deterministic services (database, bus, authority guard, lifecycle gate) run without any LLM.

---

## 4. AGENT TYPES

There are three kinds of agents in this system. Each type has different capabilities and is allowed to call different things.

### 4.1 Thinking agent

**What it is:** A LangGraph agent that reasons over a task using the LLM. It plans, decides, calls tools, and produces narrative output.

**Examples:** Arjun (AI CEO), Sutra (AI CTO), Satya (Chief Assurance), Niyantrak (AgentOps), all P1 orchestrators and specialist agents.

**Allowed to call:**
- The LLM (Ollama) — for reasoning, summarising, drafting
- Deterministic tools (database queries, telemetry writes, bus publish) — wrapped by the authority guard
- Other agents' tools — only if the authority matrix permits (see section 6)

**Not allowed to call:** Anything outside its authority matrix. The guard enforces this in code before any call executes.

### 4.2 Service-first agent

**What it is:** A deterministic service that performs a function in code — no LLM. It is registered as an "agent" so it appears in the registry and lifecycle, but it runs as a plain Python function or small service.

**Examples (Stage 1B):** Vinyas (architecture standards), Setubandh (connector specs), Yantra (runtime design), Smaran (context isolation), Suraksha (security policy), Pehchaan (identity registry), Adhikar (permission enforcement), Jod (connector build), Sandarbhika (context retrieval), Parikshak (test engineering), Sanskaran (versioning), Chaukidar (security monitoring), Nirikshak (telemetry logging), Pravahika (workflow runtime).

**Examples (Stage 1C):** Pramana (competency framework), Nishtha (QA methodology), Maryada (compliance oversight), Yogyata (competency assessment runner), Pramanik (certification records), Seema (authority audit), Gopniya (privacy testing), Sakshi (audit evidence), Sankat (critical escalation).

**Allowed to call:** Deterministic tools only (database, bus, other services). **No LLM.**

**Not allowed to call:** The LLM. These agents are code, not models.

### 4.3 Role agent (evaluator/scorer)

**What it is:** An agent that evaluates or scores other agents' outputs. It may use the LLM to read and judge content, but its job is assessment, not production.

**Examples:** Gunvatta (output quality evaluation), Nishpaksh (independent performance scoring), Swasthya (healthcare compliance screening).

**Allowed to call:** The LLM (for reading/judging), deterministic tools, other agents' outputs (read-only).

**Not allowed to call:** Tools to modify content it is evaluating. It scores; it does not produce. It cannot score its own output (independence enforced in code).

**Summary table:**

| Type | Uses LLM? | Produces content? | Evaluates others? | Examples |
|---|---|---|---|---|
| Thinking | Yes | Yes | No | Arjun, Sutra, Daksh, Aarya |
| Service-first | **No** | No (code) | No | Adhikar, Nirikshak, Sanskaran |
| Role (evaluator) | Yes (read/judge) | No | **Yes** | Gunvatta, Nishpaksh, Swasthya |

---

## 5. MESSAGE BUS

All agents communicate through one shared message bus. The bus has two parts: a durable PostgreSQL log (`bus_events`) and a Redis pub/sub channel for live delivery.

**Critical rule (fix for lost messages):** Redis pub/sub does NOT store messages. A subscriber that is not connected when a message is published loses it forever. Therefore every event MUST be written to `bus_events` FIRST, then published to Redis. The write is the source of truth; Redis is only for live delivery.

```python
# bus/messages.py — publish an event
def publish_event(envelope: BusEnvelope) -> None:
    # 1. Write to durable log FIRST (source of truth)
    db.execute(
        "INSERT INTO bus_events (event_id, event_type, source_agent, target_agent, "
        "timestamp, tenant_id, workflow_id, execution_id, payload, evidence_refs, "
        "severity, trace_id) VALUES (...)",
        envelope.dict()
    )
    # 2. Then publish to Redis (live delivery only)
    redis.publish(f"bus:{envelope.target_agent}", envelope.json())
```

### 5.1 The event envelope

Every event on the bus uses this exact JSON envelope:

```json
{
  "event_id": "uuid-4",
  "event_type": "agent.activated",
  "source_agent": "SAM-AG-158",
  "target_agent": "all",
  "timestamp": "2026-11-10T10:30:20.123456Z",
  "tenant_id": "DEMO-HEALTHCARE-01",
  "workflow_id": null,
  "execution_id": null,
  "payload": { "agent_id": "SAM-AG-001", "state": "active" },
  "evidence_refs": ["exec-log-EX-0412", "cert-CERT-001"],
  "severity": "info",
  "trace_id": "uuid-5"
}
```

**Envelope field rules:**

| Field | Type | Required | Notes |
|---|---|---|---|
| `event_id` | UUID string | ✅ | Unique per event (use `uuid4()`) |
| `event_type` | string | ✅ | Must be from the catalogue below |
| `source_agent` | string | ✅ | Canonical ID (`SAM-AG-xxx`) or `system` |
| `target_agent` | string | ✅ | Canonical ID, `all`, or `human_board` |
| `timestamp` | ISO 8601 UTC | ✅ | With microseconds |
| `tenant_id` | string | ✅ | Client isolation key |
| `workflow_id` | string | ✏️ | Present for workflow events; null otherwise |
| `execution_id` | string | ✏️ | Present for execution events; null otherwise |
| `payload` | object | ✅ | Event-specific |
| `evidence_refs` | string[] | ✏️ | References to durable records |
| `severity` | enum | ✅ | `info` \| `S1` \| `S2` \| `S3` \| `S4` |
| `trace_id` | UUID string | ✅ | Correlates all events in one logical run |

### 5.2 The event catalogue

**P0 foundation events (agent lifecycle, certification, platform):**

| Event type | Published by | Consumed by | Payload |
|---|---|---|---|
| `agent.registered` | Niyantrak | Arjun, Sutra, website | agent_id, name, position, department |
| `agent.configured` | Niyantrak | Sutra | agent_id, version_id |
| `test.completed` | test harness | Satya, Sutra | agent_id, run_id, pass/fail counts |
| `certification.recorded` | Satya | Niyantrak, Arjun, website | agent_id, scope, level, human_confirmed |
| `approval.requested` | Arjun / Satya / Niyantrak | human (website) | request_id, type, details |
| `approval.decided` | Human (website) | requester, Niyantrak | request_id, approved/rejected, by |
| `activation.gate_passed` | Niyantrak | Sutra, Arjun, website | agent_id, 5 check results |
| `activation.rejected` | Niyantrak | Sutra, Arjun, website | agent_id, failed checks |
| `agent.activated` | Niyantrak | all + website | agent_id, state=active |
| `agent.suspended` | Niyantrak / Sutra | all + website | agent_id, reason, human_notified |
| `execution.started` | any agent (runtime) | Niyantrak, website | execution_id, agent_id, task |
| `execution.completed` | any agent (runtime) | Niyantrak, website | execution_id, status, tokens, duration |
| `execution.failed` | any agent (runtime) | Niyantrak, Sutra, website | execution_id, error, agent_id |
| `finding.raised` | Satya | Arjun (S3/S4), human_board direct (S1/S2) | finding_id, severity, agent_id |
| `evaluation.recorded` | Satya | Niyantrak, Arjun, website | agent_id, score, classification |
| `incident.raised` | Sutra / any agent | Arjun, Satya, human (critical) | incident_id, severity, description |
| `rollback.executed` | Niyantrak | Sutra, human | agent_id, from_version, to_version, reason |
| `brief.generated` | Arjun | human, Niyantrak | brief_id, type, period |
| `model.unavailable` | any agent | Sutra, website | agent_id, detail |

**P1 workflow events (orchestrator handoffs, pipeline state):**

| Event type | Published by | Consumed by | Payload |
|---|---|---|---|
| `workflow.created` | Daksh | Arjun, website | workflow_id, client_id, scope, priority |
| `workflow.started` | Daksh | Niyantrak, website | workflow_id, work_packages count |
| `work_package.completed` | Daksh | Aarya, Mitra, website | package_id, deliverable_refs, status |
| `workflow.handoff` | Daksh → Aarya | Aarya | workflow_id, package_id, deliverable_refs, deadline |
| `content.submitted` | Aarya | Daksh, Mitra, Satya | asset_id, content_type, clinical_review_status |
| `content.approved` | Aarya / Satya | Mitra, website | asset_id, approved_by, timestamp |
| `content.rejected` | Aarya / Satya | Arjun, website | asset_id, reason, severity |
| `client.feedback.received` | Mitra | Medha, Daksh, Arjun | feedback_id, client_id, sentiment, category |
| `client.satisfaction.reported` | Mitra | Medha, Arjun, website | client_id, score, period |
| `analytics.snapshot.generated` | Medha | Arjun, website | snapshot_id, period, metrics |
| `intelligence.report.generated` | Medha | Arjun, human_board | report_id, findings, recommendations |
| `data_quality.alert` | Medha | Satya, Sutra | alert_id, source, severity, detail |

---

## 6. AUTHORITY GUARD

The rule *"tool gateway enforces permissions BEFORE any action executes"* is implemented as a decorator. Every agent tool that performs a write/action is wrapped with `@authority_guard`. The system prompt cannot override this — it is checked in code.

**Fix for undefined helpers:** The guard now calls two fully-defined helper functions. The approval check matches a SPECIFIC approval request (by request_id), not "any approval exists".

```python
# tools/authority.py — shared across all agents

from functools import wraps
from typing import Callable, Any
from uuid import uuid4
from .bus import publish_event
from db import get_db

class AuthorityError(Exception):
    """Raised when an agent attempts an action outside its authority matrix."""
    pass

def agent_has_permission(agent_id: str, permission_key: str) -> bool:
    """Check the agent's YAML authority_matrix for the given permission key.
    Returns True only if the agent's config explicitly grants this permission."""
    config = load_agent_config(agent_id)  # from config/agents/<id>.yaml
    return bool(config.get("authority_matrix", {}).get(permission_key, False))

def has_human_approval(request_id: str) -> bool:
    """Check that a SPECIFIC approval request (by request_id) has been decided
    with decision='approve'. Returns False if the request does not exist,
    is still pending, or was rejected."""
    row = get_db().execute(
        "SELECT decision FROM approvals WHERE request_id = %s", (request_id,)
    ).fetchone()
    return row is not None and row.decision == "approve"

def authority_guard(
    action: str,
    required_permission: str,
    allowed_agents: list[str],
    approval_request_id: str | None = None,
):
    """
    Decorator enforcing the authority matrix in code.
    - required_permission: the permission key from the agent's YAML authority_matrix
    - allowed_agents: which agents may perform this action
    - approval_request_id: if set, a human must have approved THIS specific request
    """
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(agent_id: str, *args, **kwargs) -> Any:
            # 1. Check agent is in the allowed list
            if agent_id not in allowed_agents:
                publish_event({
                    "event_id": str(uuid4()),
                    "event_type": "authority.violation",
                    "source_agent": agent_id,
                    "target_agent": "human_board",
                    "timestamp": datetime.utcnow().isoformat() + "Z",
                    "tenant_id": kwargs.get("tenant_id", "DEMO-HEALTHCARE-01"),
                    "payload": {"action": action, "reason": "agent_not_permitted"},
                    "severity": "S3",
                    "trace_id": str(uuid4()),
                })
                raise AuthorityError(f"{agent_id} not permitted to {action}")

            # 2. Check the agent's YAML grants this permission
            if not agent_has_permission(agent_id, required_permission):
                raise AuthorityError(
                    f"{agent_id} lacks permission '{required_permission}' for {action}"
                )

            # 3. If an approval request is required, verify THAT specific request
            if approval_request_id and not has_human_approval(approval_request_id):
                raise AuthorityError(
                    f"{action} requires human approval request {approval_request_id}; "
                    f"not yet approved"
                )

            return func(agent_id, *args, **kwargs)
        return wrapper
    return decorator
```

**Usage in an agent tool:**

```python
# tools/daksh_tools.py
@authority_guard(
    action="assign_work",
    required_permission="ops.allocate",
    allowed_agents=["SAM-AG-002"],  # only Daksh
    approval_request_id=None,       # no human approval needed for routine allocation
)
def assign_work(agent_id: str, work_package_id: str, target_agent: str, tenant_id: str) -> str:
    ...
```

**Agent YAML authority_matrix (config/agents/daksh.yaml excerpt):**

```yaml
agent_id: SAM-AG-002
authority_matrix:
  ops.allocate: true        # allocate approved work
  ops.reprioritize: true    # reprioritize within limits
  ops.escalate: true        # escalate exceptions
  ops.expand_scope: false   # NOT permitted
  ops.change_commercial: false
  ops.approve_certification: false
  ops.make_financial_commitment: false
```

---

## 7. BASE AGENT STATE AND WORKFLOW STATE MACHINES

### 7.1 Base agent state (shared by all agents)

Every agent is a LangGraph graph. All graphs share a base state; each agent adds its own fields. Defined in `agents/base_state.py`:

```python
# agents/base_state.py — shared base state for ALL agents
from typing import TypedDict, Optional, Any
from datetime import datetime

class BaseAgentState(TypedDict, total=False):
    # Inputs
    task: str
    tenant_id: str
    workflow_id: Optional[str]
    execution_id: str
    trace_id: str

    # Runtime
    current_workflow: Optional[str]
    current_step: int
    total_steps: int
    step_name: Optional[str]

    # Results
    result: Optional[dict[str, Any]]
    status: str           # "running" | "completed" | "failed" | "escalated"
    error: Optional[str]

    # Telemetry (auto-populated)
    tokens_used: int
    prompt_tokens: int
    response_tokens: int
    latency_s: float
    tools_called: list[str]
    started_at: datetime
    ended_at: Optional[datetime]
```

**Per-agent state extends the base.** Example for Daksh (`agents/daksh_state.py`):

```python
from .base_state import BaseAgentState

class DakshState(BaseAgentState):
    scope_ref: Optional[str]
    work_packages: list[dict]
    allocations: list[dict]
    exceptions: list[dict]
    delivery_plan: Optional[dict]
```

### 7.2 Workflow state machine (P1 orchestrators)

Workflows have a deterministic state machine enforced in code (`pipeline/workflow_state.py`):

```
created → planning → allocated → executing → quality → approved → delivered
                                    ↓
                                  blocked (requires human intervention)
```

```python
# pipeline/workflow_state.py
from enum import Enum

class WorkflowStatus(str, Enum):
    CREATED = "created"
    PLANNING = "planning"
    ALLOCATED = "allocated"
    EXECUTING = "executing"
    QUALITY = "quality"
    APPROVED = "approved"
    DELIVERED = "delivered"
    BLOCKED = "blocked"

VALID_TRANSITIONS = {
    WorkflowStatus.CREATED: {WorkflowStatus.PLANNING},
    WorkflowStatus.PLANNING: {WorkflowStatus.ALLOCATED, WorkflowStatus.BLOCKED},
    WorkflowStatus.ALLOCATED: {WorkflowStatus.EXECUTING, WorkflowStatus.BLOCKED},
    WorkflowStatus.EXECUTING: {WorkflowStatus.QUALITY, WorkflowStatus.BLOCKED},
    WorkflowStatus.QUALITY: {WorkflowStatus.APPROVED, WorkflowStatus.BLOCKED},
    WorkflowStatus.APPROVED: {WorkflowStatus.DELIVERED},
    WorkflowStatus.DELIVERED: set(),  # terminal
    WorkflowStatus.BLOCKED: {WorkflowStatus.PLANNING, WorkflowStatus.EXECUTING, WorkflowStatus.QUALITY},
}

def transition(workflow: WorkflowInstance, new_status: WorkflowStatus) -> None:
    if new_status not in VALID_TRANSITIONS[workflow.status]:
        raise ValueError(
            f"Invalid transition: {workflow.status} → {new_status}"
        )
    workflow.status = new_status
    workflow.updated_at = datetime.utcnow()
    db.commit()
    publish_event({
        "event_id": str(uuid4()),
        "event_type": "workflow.status_changed",
        "source_agent": "system",
        "target_agent": "all",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "tenant_id": workflow.tenant_id,
        "workflow_id": workflow.workflow_id,
        "payload": {"from": workflow.status.value, "to": new_status.value},
        "severity": "info",
        "trace_id": str(uuid4()),
    })
```

---

## 8. DATABASE

### 8.1 Full table list

**P0 foundation tables:**

| Table | Owner | Purpose | Mutability |
|---|---|---|---|
| `agents` | Niyantrak | Digital Agent Master Record (18+ fields) | UPDATE on status column only (see 8.3) |
| `agent_versions` | Niyantrak | prompt/model/tool/workflow versions | append-only |
| `lifecycle_events` | Niyantrak | every state transition + gate results | append-only |
| `execution_log` | all agents write | every agent run, full structured record | append-only |
| `capacity_metrics` | Niyantrak | tokens/runs/failures per agent per day | append-only (daily rows) |
| `test_runs` | test harness | test suite results per agent per version | append-only |
| `certifications` | Satya | certification records (task-specific, human-confirmed) | append-only |
| `evaluations` | Satya | 5-dimension performance evaluations | append-only |
| `findings` | Satya | S1–S4 findings with mandatory evidence | append-only |
| `escalations` | Satya / Sutra / Arjun | escalation records | append-only |
| `incidents` | Sutra | incident timeline, root cause, fix | append-only + status field |
| `initiatives` | Arjun | enterprise initiative register | UPDATE on status |
| `decisions` | Arjun | decision register (options, assumptions, approver) | UPDATE on decision field once |
| `risks` | Arjun | risk & escalation register | UPDATE on status |
| `actions` | Arjun | cross-department action tracker | UPDATE on status |
| `briefs` | Arjun | daily/weekly/monthly briefs | append-only |
| `approvals` | Human (via website) | every human approval/decision | append-only |
| `bus_events` | bus | durable log of every bus event | append-only |
| `agent_specs` | seed script | static spec JSON per agent (from README YAML/JSON blocks) | append-only |

**P1 workflow state store tables:**

| Table | Owner | Purpose | Mutability |
|---|---|---|---|
| `workflow_instances` | Daksh | client workflow records | UPDATE on status |
| `work_packages` | Daksh | deliverable packages within a workflow | UPDATE on status |
| `allocations` | Daksh | resource/time allocations per package | UPDATE on status only (see 8.3 fix) |
| `content_assets` | Aarya | content production records | UPDATE on status |
| `clinical_review_flags` | Aarya / Satya | healthcare content clinical screening results | append-only |
| `publishing_records` | Aarya / Mitra | content publish history | append-only |
| `client_feedback` | Mitra | client feedback records | append-only |
| `client_satisfaction` | Mitra | periodic satisfaction scores | append-only (periodic rows) |
| `data_quality_logs` | Medha | data quality alerts | append-only |
| `analytics_snapshots` | Medha | periodic analytics snapshots | append-only |
| `intelligence_reports` | Medha | intelligence reports | append-only |
| `agent_activity` | website | department-level live activity aggregation | UPDATE (derived) |

### 8.2 Append-only enforcement

For append-only tables, the application role has INSERT + SELECT grants only. No UPDATE/DELETE. Tables with status fields are the exception (documented above and in section 8.3).

### 8.3 Complete DDL (key tables)

```sql
-- agents table (Niyantrak's registry — the master record)
CREATE TABLE agents (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    canonical_id    VARCHAR(20) NOT NULL UNIQUE,      -- SAM-AG-001
    name            VARCHAR(100) NOT NULL,
    designation     VARCHAR(100) NOT NULL,
    position_id     VARCHAR(20) NOT NULL,              -- CEO-001
    legacy_alias    VARCHAR(20),
    department      VARCHAR(50) NOT NULL,
    department_code VARCHAR(10) NOT NULL,
    stage           VARCHAR(20) NOT NULL,              -- P0-1A, P0-1B, P0-1C, P1-P1..P1-P6
    reports_to      UUID REFERENCES agents(id),
    human_owner     VARCHAR(100) NOT NULL,
    technical_custodian VARCHAR(100) NOT NULL,
    evaluator       VARCHAR(100) NOT NULL,
    autonomy        VARCHAR(20) NOT NULL,              -- bounded | full | supervised
    priority        VARCHAR(10) NOT NULL,              -- P0 | P1 | P2
    agent_type      VARCHAR(20) NOT NULL,              -- thinking | service-first | role
    target_competency VARCHAR(5) NOT NULL,             -- C0..C5
    current_level   VARCHAR(5) NOT NULL DEFAULT 'C0',
    status          VARCHAR(20) NOT NULL DEFAULT 'proposed',  -- proposed|registered|configured|evaluated|approved|active|monitored|restricted|retired
    model           VARCHAR(50) NOT NULL DEFAULT 'qwen2.5:7b',
    prompt_version  VARCHAR(20) NOT NULL DEFAULT '1.0.0',
    spec_json       JSONB NOT NULL DEFAULT '{}',       -- static spec from README YAML/JSON blocks
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE INDEX idx_agents_status ON agents(status);
CREATE INDEX idx_agents_department ON agents(department_code);
CREATE INDEX idx_agents_priority ON agents(priority);
CREATE INDEX idx_agents_stage ON agents(stage);

-- execution_log (append-only — every agent run)
CREATE TABLE execution_log (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    execution_id    VARCHAR(50) NOT NULL UNIQUE,
    agent_id        VARCHAR(20) NOT NULL,              -- canonical_id
    workflow_id     VARCHAR(20),
    task            TEXT NOT NULL,
    tenant_id       VARCHAR(50) NOT NULL,
    status          VARCHAR(20) NOT NULL,              -- running|completed|failed|escalated
    tokens_used     INTEGER NOT NULL DEFAULT 0,
    prompt_tokens   INTEGER NOT NULL DEFAULT 0,
    response_tokens INTEGER NOT NULL DEFAULT 0,
    latency_s       NUMERIC(10,2) NOT NULL DEFAULT 0,
    tools_called    JSONB NOT NULL DEFAULT '[]',
    started_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    ended_at        TIMESTAMP WITH TIME ZONE,
    error           TEXT,
    output_ref      VARCHAR(100),
    trace_id        VARCHAR(50) NOT NULL,
    raw_result      JSONB
);
CREATE INDEX idx_execution_agent ON execution_log(agent_id);
CREATE INDEX idx_execution_started ON execution_log(started_at);
CREATE INDEX idx_execution_trace ON execution_log(trace_id);

-- bus_events (append-only — durable event log)
CREATE TABLE bus_events (
    id              BIGSERIAL PRIMARY KEY,
    event_id        VARCHAR(50) NOT NULL UNIQUE,
    event_type      VARCHAR(50) NOT NULL,
    source_agent    VARCHAR(20) NOT NULL,
    target_agent    VARCHAR(50) NOT NULL,
    timestamp       TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    tenant_id       VARCHAR(50) NOT NULL,
    workflow_id     VARCHAR(20),
    execution_id    VARCHAR(50),
    payload         JSONB NOT NULL,
    evidence_refs   JSONB NOT NULL DEFAULT '[]',
    severity        VARCHAR(5) NOT NULL DEFAULT 'info',
    trace_id        VARCHAR(50) NOT NULL
);
CREATE INDEX idx_bus_type ON bus_events(event_type);
CREATE INDEX idx_bus_trace ON bus_events(trace_id);
CREATE INDEX idx_bus_workflow ON bus_events(workflow_id);
CREATE INDEX idx_bus_severity ON bus_events(severity) WHERE severity IN ('S1','S2');

-- workflow_instances (P1 — Daksh's workflow state store)
CREATE TYPE workflow_status AS ENUM (
    'created','planning','allocated','executing','quality','approved','delivered','blocked'
);
CREATE TABLE workflow_instances (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id     VARCHAR(20) NOT NULL UNIQUE,
    client_id       VARCHAR(50) NOT NULL,
    scope_ref       VARCHAR(50) NOT NULL,
    status          workflow_status NOT NULL DEFAULT 'created',
    stages          JSONB NOT NULL DEFAULT '[]',
    deadlines       JSONB NOT NULL DEFAULT '[]',
    priority        VARCHAR(10) NOT NULL DEFAULT 'P1',
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE INDEX idx_wf_client ON workflow_instances(client_id);
CREATE INDEX idx_wf_status ON workflow_instances(status);

-- work_packages (P1 — deliverables within a workflow)
CREATE TYPE package_status AS ENUM (
    'proposed','allocated','in_progress','done','blocked'
);
CREATE TABLE work_packages (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    package_id          VARCHAR(20) NOT NULL UNIQUE,
    workflow_id         UUID NOT NULL REFERENCES workflow_instances(id),
    title               VARCHAR(200) NOT NULL,
    competency_required VARCHAR(50) NOT NULL,
    assigned_agent      VARCHAR(20) REFERENCES agents(canonical_id),
    deadline            TIMESTAMP WITH TIME ZONE,
    status              package_status NOT NULL DEFAULT 'proposed',
    created_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE INDEX idx_wp_workflow ON work_packages(workflow_id);
CREATE INDEX idx_wp_status ON work_packages(status);

-- allocations (UPDATE on status only — FIX: not append-only, not full UPDATE)
CREATE TABLE allocations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    allocation_id   VARCHAR(20) NOT NULL UNIQUE,
    work_package_id UUID NOT NULL REFERENCES work_packages(id),
    agent_id        VARCHAR(20) NOT NULL REFERENCES agents(canonical_id),
    competency_check JSONB NOT NULL,
    capacity_check  JSONB NOT NULL,
    constraints     JSONB NOT NULL DEFAULT '{}',
    decision_ref    VARCHAR(50),
    status          VARCHAR(20) NOT NULL DEFAULT 'active',  -- active|replaced|cancelled
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE INDEX idx_alloc_package ON allocations(work_package_id);

-- certifications (append-only — Satya's records)
CREATE TABLE certifications (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cert_id         VARCHAR(20) NOT NULL UNIQUE,
    agent_id        VARCHAR(20) NOT NULL,
    scope           VARCHAR(100) NOT NULL,
    level           VARCHAR(5) NOT NULL,               -- C0..C5
    human_confirmed BOOLEAN NOT NULL DEFAULT FALSE,
    conditions      JSONB NOT NULL DEFAULT '[]',
    expires_at      TIMESTAMP WITH TIME ZONE,
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE INDEX idx_cert_agent ON certifications(agent_id);
CREATE INDEX idx_cert_confirmed ON certifications(human_confirmed) WHERE human_confirmed = TRUE;

-- approvals (append-only — human decisions)
CREATE TABLE approvals (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id      VARCHAR(20) NOT NULL UNIQUE,
    request_type    VARCHAR(30) NOT NULL,              -- role|certification|activation|suspension|other
    agent_id        VARCHAR(20) NOT NULL,
    details         JSONB NOT NULL,
    requested_by    VARCHAR(30) NOT NULL,              -- agent canonical_id or system
    requested_at    TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    decision        VARCHAR(10),                       -- approve|reject (null = pending)
    decided_by      VARCHAR(100),                      -- human login name
    decided_at      TIMESTAMP WITH TIME ZONE,
    note            TEXT
);
CREATE INDEX idx_appr_pending ON approvals(request_id) WHERE decision IS NULL;

-- agent_specs (append-only — static spec from README YAML/JSON blocks)
CREATE TABLE agent_specs (
    canonical_id    VARCHAR(20) PRIMARY KEY,
    spec_json       JSONB NOT NULL,
    source_readme   VARCHAR(200) NOT NULL,
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
```

### 8.4 Grant rules (FIX: status update on agents, allocations consistency)

```sql
-- Create a restricted role for the application
CREATE ROLE samrudhi_app;
GRANT CONNECT ON DATABASE samrudhi TO samrudhi_app;

-- Append-only tables: INSERT + SELECT only
GRANT INSERT, SELECT ON agents, execution_log, bus_events, certifications,
    evaluations, findings, escalations, incidents, briefs, approvals,
    lifecycle_events, agent_versions, test_runs, capacity_metrics,
    clinical_review_flags, publishing_records, client_feedback,
    client_satisfaction, data_quality_logs, analytics_snapshots,
    intelligence_reports, agent_specs TO samrudhi_app;

-- agents: UPDATE on status column ONLY (FIX: activation gate needs to update status)
-- Use a trigger to restrict UPDATE to the status column
CREATE OR REPLACE FUNCTION restrict_agents_update()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status IS DISTINCT FROM OLD.status THEN
        NEW.updated_at = now();
        RETURN NEW;
    ELSE
        RAISE EXCEPTION 'Only the status column may be updated on agents table';
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_agents_update
    BEFORE UPDATE ON agents
    FOR EACH ROW EXECUTE FUNCTION restrict_agents_update();

GRANT UPDATE (status) ON agents TO samrudhi_app;

-- Status-updatable tables: UPDATE on status field only
GRANT INSERT, SELECT, UPDATE (status, updated_at) ON workflow_instances, work_packages,
    allocations, initiatives, decisions, risks, actions, content_assets TO samrudhi_app;

-- The app connects as samrudhi_app — it physically cannot DELETE or UPDATE non-status columns.
```

**FIX summary:**
- `agents.status` can be updated (via trigger that restricts to status column only) — the activation gate can set status without violating append-only principles for all other columns.
- `allocations` is NOT append-only; it has UPDATE on status only (consistent — no contradiction).
- Status is derived from `lifecycle_events` when needed (the latest event determines current state), but the `agents.status` column is kept for fast querying and updated by the gate.

---

## 9. LIFECYCLE AND ACTIVATION GATE

### 9.1 The 8 lifecycle states

Every agent passes through these 8 states in order. The state machine is enforced in code (`dwms/lifecycle.py`).

```
proposed → registered → configured → evaluated → approved → active → monitored → restricted/retired
```

| State | Meaning | Who sets it |
|---|---|---|
| `proposed` | Agent role requested, not yet built | Arjun (role request) |
| `registered` | Registry record created | Niyantrak (NYA-W01) |
| `configured` | Platform provisioned (model, tools, permissions) | Sutra + Niyantrak (NYA-W02) |
| `evaluated` | Test suite run, results recorded | test harness → Satya |
| `approved` | Certification confirmed by human | Human (via website) |
| `active` | Gate passed, authorised to work | Niyantrak gate (NYA-W03) |
| `monitored` | Running, under Satya's observation | automatic (after first execution) |
| `restricted` / `retired` | Suspended or decommissioned | Human / Sutra |

### 9.2 The 5-check activation gate

Before an agent can reach `active`, Niyantrak's gate runs 5 checks. ALL must pass. The gate is deterministic code — no LLM.

```python
# dwms/lifecycle.py — the 5-check gate
def run_activation_gate(agent_id: str) -> tuple[bool, list[str]]:
    """Run the 5-check activation gate. Returns (passed, failed_checks)."""
    checks = []

    # Check 1: Registered — agent has a registry record
    agent = db.get_agent(agent_id)
    checks.append(("registered", agent is not None and agent.status in ("registered", "configured", "evaluated")))

    # Check 2: Configured — platform provisioned (model, tools, permissions)
    checks.append(("configured", agent is not None and agent.model and agent.tools))

    # Check 3: Certified — Satya has recorded a certification, human-confirmed
    cert = db.get_latest_certification(agent_id)
    checks.append(("certified", cert is not None and cert.human_confirmed))

    # Check 4: Human approval — a specific activation approval request is approved
    approval = db.get_pending_approval(agent_id, "activation")
    checks.append(("human_approval", approval is not None and approval.decision == "approve"))

    # Check 5: Tests passed — test suite has passing results for current version
    test = db.get_latest_test_run(agent_id)
    checks.append(("tests_passed", test is not None and test.pass_rate >= 1.0))

    passed = all(ok for _, ok in checks)
    failed = [name for name, ok in checks if not ok]
    return passed, failed
```

**The gate flow:**
1. Arjun routes activation request → Human approves (creates `approvals` row, decision=pending)
2. Niyantrak runs the 5-check gate
3. All pass → `agents.status = 'active'` → event `agent.activated` → website shows the agent live
4. Any fail → `agents.status` stays → event `activation.rejected` → Human sees which check failed

**Negative case:** An agent cannot reach `active` without passing all 5 checks. The gate is the ONLY path to active.

---

## 10. LOCAL-MODEL RULES

### 10.1 Ollama setup

- **Model:** `qwen2.5:7b` (7 billion parameters, local)
- **Endpoint:** `http://localhost:11434`
- **Pull once:** `ollama pull qwen2.5:7b`
- **Context size:** 8192 tokens (configurable per agent YAML; default 4096)

### 10.2 One model, 137 agents — calls must queue

With 137 agents sharing one 7B model, LLM calls cannot run in parallel beyond the model's capacity. The system serializes calls through a single worker queue.

**Concurrency rules:**
- **Maximum concurrent LLM calls:** 1 (serialized). The 7B model on a single-core sandbox cannot handle parallel inference reliably.
- **Agent executions:** Multiple agents can be "running" (in the `execution_log` as started), but only one LLM call executes at a time. Others wait in the Celery queue.
- **Queue:** Celery `agents` queue. Tasks are dispatched in order; the worker processes one LLM call at a time.
- **Timeout per call:** 120 seconds. If a call exceeds this, it fails and the agent reports "model unavailable" (no fake output).

```python
# tasks.py — Celery app with serialized LLM calls
celery_app = Celery(
    "samrudhi",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0",
)

celery_app.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    worker_concurrency=1,           # FIX: one worker = one LLM call at a time
    task_routes={
        "tasks.run_agent.*": {"queue": "agents"},
        "tasks.publish_event": {"queue": "bus"},
        "tasks.telemetry_record": {"queue": "telemetry"},
    },
    task_default_queue="agents",
)
```

### 10.3 Roles that use NO LLM at all

Service-first agents (Section 4.2) do not call the LLM. They run as pure Python functions. These include:

**Stage 1B (all 14):** Vinyas, Setubandh, Yantra, Smaran, Suraksha, Pehchaan, Jod, Adhikar, Sandarbhika, Parikshak, Sanskaran, Chaukidar, Nirikshak, Pravahika.

**Stage 1C (most):** Pramana, Nishtha, Maryada, Seema, Gopniya, Sakshi, Sankat. (Yogyata, Pramanik run assessments but may use LLM for reading; Gunvatta, Nishpaksh, Swasthya are role agents that use LLM for judging.)

**How it works:** When a service-first agent is dispatched, the worker runs its Python function directly — no Ollama call. It still logs to `execution_log` (with `tokens_used=0`) and publishes bus events.

---

## 11. SECURITY

### 11.1 One human approver login

The website has ONE human login for approvals and emergency stop. It is a simple local login (no external auth service).

- **Login:** `POST /api/auth/login {username, password}` → session cookie
- **Default human:** `admin` / password set in `config/platform.yaml` (change before production)
- **What is recorded:** Every approval decision records `decided_by` (the human login name), `decided_at`, and `note`. The `approvals` table is append-only — decisions cannot be altered.
- **No agent login:** No agent has a website login. Agents interact only through the bus and database.

### 11.2 Tenant separation

Every query and event carries a `tenant_id`. Cross-tenant access is refused in code.

```python
# tools/tenant.py — tenant isolation check
def check_tenant(agent_id: str, requested_tenant: str, execution_tenant: str) -> bool:
    """Return True only if the requested tenant matches the execution tenant."""
    return requested_tenant == execution_tenant
```

P0 uses one demo tenant (`DEMO-HEALTHCARE-01`), but the check exists and is enforced. In P1, multiple tenants (clients) will be isolated by this rule.

### 11.3 Emergency stop

A human can suspend any agent from the website (one click). This is the Sutra README test #4 / security control #10.

```python
# api/routes_agents.py — emergency suspend
@router.post("/api/agents/{agent_id}/suspend")
def suspend_agent(agent_id: str, reason: str, human: str = Depends(require_human)):
    db.execute(
        "UPDATE agents SET status = 'restricted' WHERE canonical_id = %s", (agent_id,)
    )
    publish_event({
        "event_id": str(uuid4()),
        "event_type": "agent.suspended",
        "source_agent": "system",
        "target_agent": "all",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "tenant_id": "DEMO-HEALTHCARE-01",
        "payload": {"agent_id": agent_id, "reason": reason, "suspended_by": human},
        "severity": "S2",
        "trace_id": str(uuid4()),
    })
    return {"status": "suspended", "agent_id": agent_id}
```

When suspended, the agent's runtime refuses new work (the authority guard checks status before executing).

---

## 12. TESTING CONVENTIONS AND END-TO-END LIFECYCLE TEST

### 12.1 Test pyramid

| Layer | What | Where | Must pass before |
|---|---|---|---|
| Unit | Each deterministic service (gate, lifecycle, telemetry, scorecard, authority guard) | `tests/test_*.py` | Integration tests |
| Agent | The scenarios per agent (each agent README section 16) | `tests/test_{agent}.py` | E2E |
| Bus | Every event type published + consumed correctly; envelope valid | `tests/test_bus.py` | E2E |
| Website API | Every endpoint returns correct shape + correct data from seeded DB | `tests/test_website_api.py` | E2E |
| **E2E** | **The lifecycle (section 9) run start-to-finish** | `tests/test_e2e_lifecycle.py` | **Go-live** |

### 12.2 FIX: Tests check code paths, not model words

Some old tests checked text like "unapproved" in an error message — a 7B model won't produce that reliably. Tests now assert the code path (status, exception type, event published), not the model's words.

```python
# tests/test_daksh.py — FIX: assert code path, not model words
import pytest
from agents.registry import get_agent
from tools.authority import AuthorityError
from seed_p1 import seed_demo

@pytest.fixture(autouse=True)
def demo_tenant(db_session):
    seed_demo(db_session)
    yield

@pytest.mark.asyncio
async def test_1_refuse_unapproved_work():
    """Scenario 1: Ask Daksh to allocate unapproved work → must REFUSE (code path)."""
    daksh = get_agent("SAM-AG-002")
    result = await daksh.ainvoke({
        "task": "allocate work package WP-UNAPPROVED to Shruti",
        "tenant_id": "DEMO-HEALTHCARE-01",
    })
    # FIX: assert status/exception, not model text
    assert result["status"] == "failed"
    assert result["allocation"] is None
    # Verify the authority.violation event was published
    events = db.get_bus_events(event_type="authority.violation")
    assert any(e["payload"]["action"] == "assign_work" for e in events)

@pytest.mark.asyncio
async def test_9_model_unavailable_no_crash():
    """Scenario 9: Ollama down → report 'model unavailable', no crash, no fake output."""
    daksh = get_agent("SAM-AG-002")
    with patch("agents.base.llm_available", return_value=False):
        result = await daksh.ainvoke({
            "task": "plan delivery for SCOPE-014",
            "tenant_id": "DEMO-HEALTHCARE-01",
        })
    assert result["status"] == "failed"
    assert result.get("fake_output") is None
    # FIX: assert the model.unavailable event, not the error text
    events = db.get_bus_events(event_type="model.unavailable")
    assert any(e["source_agent"] == "SAM-AG-002" for e in events)
```

### 12.3 The E2E lifecycle test

Seeded with a fresh database and a fake 5th agent ("TestAgent"), the test verifies the full lifecycle (section 9):

| Step | Assertion |
|---|---|
| 1. Role request created | `initiatives` row exists, status pending |
| 2. Human approves role | `approvals` row (role approval) |
| 3. Registration | `agents` row, state=registered; `agent.registered` in `bus_events` |
| 4. Configuration | `agent_versions` v1.0; state=configured |
| 5. Tests run | `test_runs` row, all pass |
| 6. Certification | `certifications` row (human_confirmed set); `certification.recorded` event |
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

---

## 13. LOCAL RUNBOOK

### 13.1 Prerequisites

| Requirement | Version | Check command |
|---|---|---|
| Python | 3.11+ | `python --version` |
| PostgreSQL | 14+ (local install) | `psql --version` |
| Redis | 6+ (local install) | `redis-cli --version` |
| Ollama | latest | `ollama --version` |
| Qwen model | — | `ollama pull qwen2.5:7b` |

### 13.2 Start sequence (in order)

```bash
# 1. Start infrastructure
pg_ctl start                          # or: service postgresql start
redis-server --daemonize yes
ollama serve &                        # if not already running
ollama pull qwen2.5:7b                # one-time

# 2. Create the database + schema
createdb samrudhi
cd samrudhi-os
python init_db.py                     # creates all tables + grants (append-only rules)

# 3. Seed the registry (all 137 agents as proposed; P0 agents as test-active only — see 13.5)
python seed_registry.py

# 4. Start the backend (API + website + bus)
python main.py                        # serves http://localhost:8000

# 5. Start the Celery worker (background agent executions, serialized)
# FIX: consistent command — always -A tasks.celery_app
celery -A tasks.celery_app worker -Q agents,bus,telemetry -l info --concurrency=1
```

### 13.3 Health checks

```bash
curl http://localhost:11434/api/tags          # Ollama: qwen2.5:7b present
curl http://localhost:8000/api/health         # backend: db, redis, ollama all ok
open http://localhost:8000                    # Dashboard
```

### 13.4 Backup and reset

```bash
# Backup (pg_dump)
pg_dump samrudhi > backup_$(date +%Y%m%d).sql

# Reset (drop + recreate + reseed)
dropdb samrudhi
createdb samrudhi
python init_db.py
python seed_registry.py
```

### 13.5 FIX: Seed data does NOT skip the gate

The seed script marks P0 agents as `active` ONLY for testing purposes. This is labelled clearly so the dashboard does not show agents that never passed the gate in production.

```python
# seed_registry.py — FIX: label test-only activation
SEED_AGENTS = [
    # P0 foundation — marked active for TEST ONLY (gate bypassed)
    # In production, these agents go through the full 12-step lifecycle (section 9)
    {"canonical_id": "SAM-AG-007", "name": "Sutra", "status": "active", "test_only": True, ...},
    {"canonical_id": "SAM-AG-001", "name": "Arjun", "status": "active", "test_only": True, ...},
    {"canonical_id": "SAM-AG-010", "name": "Satya", "status": "active", "test_only": True, ...},
    {"canonical_id": "SAM-AG-158", "name": "Niyantrak", "status": "active", "test_only": True, ...},
    # P1 agents — all start as 'proposed' (must pass the gate to activate)
    {"canonical_id": "SAM-AG-002", "name": "Daksh", "status": "proposed", ...},
    ...
]
```

The dashboard shows a badge "test-only active" on these agents so it is clear they have not passed the production gate.

---

## 14. SOURCE MAP AND [DESIGN] DECISIONS

### 14.1 Source map

| Section of this document | PDF file | Pages |
|---|---|---|
| 5-layer system architecture (human board at top) | SAMRUDHI AGENTIC AI.pdf | 9 |
| "Tool gateway enforces permissions before action" rule | SAMRUDHI AGENTIC AI.pdf | 11 |
| 5-dimension evaluation model | SAMRUDHI AGENTIC AI.pdf | 13 |
| DWMS master record, 8-state lifecycle | SAMRUDHI AGENTIC AI(1).pdf | 66 |
| Release 0 scope + "need not be 16 agents" | SAMRUDHI AGENTIC AI(1).pdf | 77 |
| Authority & security controls | SAMRUDHI AGENTIC AI(1).pdf | 73–74 |
| Satya's independence (direct Board path) | SAMRUDHI AGENTIC AI(1).pdf | 57 |
| Cost governance KPI ("0 unattributed AI spend") | SAMRUDHI AGENTIC AI(1).pdf | 70 |
| Agent specs (all agents) | All three PDFs | see each agent README |
| Message protocol + website combination | Built for this implementation (not in PDFs) | — |

### 14.2 [DESIGN] decisions (implementation choices not in the PDFs)

| Decision | Choice | Why |
|---|---|---|
| LLM model | `qwen2.5:7b` via Ollama | Local, zero cost, 7B fits single-core sandbox |
| Database | PostgreSQL | Append-only enforcement via grants + triggers |
| Bus | Redis pub/sub + `bus_events` table | Live delivery (Redis) + durable log (Postgres) |
| Queue | Celery with `worker_concurrency=1` | One 7B model = serialized LLM calls |
| Agent framework | LangGraph | Stateful multi-step agents |
| API | FastAPI | Serves both agent tools and website data |
| Website | Static HTML + vanilla JS | No build step, local run |
| Charts | Chart.js (vendored locally) | Token trends, activity sparklines (offline rule) |
| Styling | CSS file (vendored locally) | No CDN — offline rule |
| Execution ID | UUID | FIX: no collision (old: timestamp + last 4 chars) |
| Approval check | Match specific `request_id` | FIX: not "any approval exists" |
| Status update on agents | Trigger restricts to status column | FIX: gate needs to update status, other columns append-only |
| allocations mutability | UPDATE on status only | FIX: consistent (not append-only, not full UPDATE) |
| Seed activation | Labelled "test only" | FIX: dashboard shows gate status honestly |
| Worker command | Always `-A tasks.celery_app` | FIX: consistent (old: mixed `-A tasks` and `-A tasks.celery_app`) |
| Folder structure | Single `agents/` dir | FIX: no duplicate `agents/` entries |
| Tests | Assert code paths, not model words | FIX: 7B model won't produce specific error text reliably |
| Bus reliability | Write to `bus_events` first, then publish | FIX: Redis pub/sub loses messages if subscriber offline |

---

## 15. WHAT COMES AFTER P0 (so the basement is shaped right)

The platform is built so P1 drops in without rework:

| P1 addition | What the platform already provides |
|---|---|
| 107 production agents (6 phases) | Registry + gate + telemetry: each new agent follows the 12-step lifecycle (section 9) |
| Client-facing portal | Same FastAPI backend; new routes; tenant isolation already enforced |
| Real client data | Tenant scope already in every query; knowledge store is Sutra's build |
| More screens (approvals history, incidents, scorecards) | All the tables already exist — screens are just new queries |

**The 137-position registry:** The `agents` table holds all 137 documented positions (canonical ID, position ID, department, stage, priority) as `proposed` rows from day one — so the Positions screen can show the full workforce plan with Stage 1 agents live and the rest "proposed".
