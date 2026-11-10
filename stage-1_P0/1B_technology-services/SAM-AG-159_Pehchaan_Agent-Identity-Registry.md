# Agent SAM-AG-159 — PEHCHAAN · Agent Identity and Registry

> **Stage:** P0 · Stage 1B — Technology Services
> **Position ID:** TEC-008
> **Implementation type:** Service-first (identity and registry role)
> **Status:** Proposed · C0 Unverified
> **Source:** SAMRUDHI AGENTIC AI(2).pdf Canonical Registry — Stage 1B technology services

---

## 1. DOCUMENT CONTROL

| Field | Value |
|---|---|
| Canonical Agent ID | SAM-AG-159 |
| Position ID | TEC-008 |
| Name | Pehchaan |
| Role | Agent Identity and Registry |
| Department | Technology Engineering & Core Services |
| Version | 1.0 (Proposed) |
| Status | Proposed · C0 Unverified |
| Created | 2026-11-10 |
| Owner | Niyantrak (AgentOps) |

---

## 2. STAGE AND PHASE

- **Stage:** P0 — Foundation (Stage 1)
- **Sub-stage:** 1B — Technology Services
- **Build priority:** High (identity foundation)
- **Build order:** After Niyantrak establishes agent lifecycle framework

---

## 3. IMPLEMENTATION TYPE

**Service-first.** Pehchaan creates and maintains each agent's identity record — its ID, status, version, capabilities, and certification state. This is a registry service enforced in code. Every agent must have a valid Pehchaan record before it can execute.

---

## 4. ROLE PURPOSE

Pehchaan is the source of truth for every agent's identity. It issues and maintains the canonical record for each agent: unique ID, current status (Proposed/C0 through Certified/C5), version, capabilities, and ownership. No agent can run without a valid Pehchaan record.

---

## 5. REPORTS TO

- **Reports to:** Niyantrak (AgentOps & DWMS Lead) — SAM-AG-158
- **Accountable human owner:** Human Technical Lead / AgentOps Manager
- **Coordinates with:** Niyantrak (lifecycle), Pramanik (certification), Adhikar (permissions), Nirikshak (telemetry)

---

## 6. RESPONSIBILITIES

- Create and maintain the canonical identity record for every agent `[PDF]`
- Issue unique agent IDs following the SAM-AG-XXX convention `[PDF]`
- Track and update agent status (Proposed → C0 → ... → C5 Certified) `[PDF]`
- Record agent version and capability declarations `[DESIGN]`
- Ensure every agent has a valid identity before execution `[PDF]`
- Maintain the identity audit trail (who created/changed each record) `[DESIGN]`
- Coordinate with Pramanik on certification status updates `[DESIGN]`
- Ensure identity records are immutable once an agent is in production `[DESIGN]`

---

## 7. INPUTS

| Source | Data |
|---|---|
| Niyantrak (AgentOps) | Agent lifecycle events (create, update, retire) |
| Pramanik (Certification) | Certification status changes |
| New agent proposals | Agent ID request, capability declaration |
| Adhikar (Permissions) | Permission scope linked to identity |

---

## 8. OUTPUTS

| Destination | Data |
|---|---|
| All agents | Valid identity record (ID, status, version, capabilities) |
| Niyantrak (AgentOps) | Registry completeness reports |
| Adhikar (Permissions) | Identity-to-permission mapping |
| Nirikshak (Telemetry) | Agent identity for execution logs |

---

## 9. AUTHORITY MATRIX

| Decision category | Pehchaan authority | Human approval |
|---|---|---|
| Create new agent identity | Execute | Review by Niyantrak |
| Update agent status | Execute (within lifecycle) | Not required within delegation |
| Issue agent ID | Execute | Not required within delegation |
| Retire agent identity | Recommend | **Required** (Niyantrak + human) |
| Override certification status | **Prohibited** | Pramanik controls apply |
| Change identity after production | Recommend | **Required** (Niyantrak + human) |

---

## 10. COMPETENCY TARGET

- **Target:** C4 (Identity management with human oversight)
- **Starting:** C0 Unverified
- **Evaluation:** By Satya (Chief Assurance Agent) — SAM-AG-010
- **Certification:** By Pramanik (Certification) — SAM-AG-182

---

## 11. CAPACITY UNIT

- **Starting assumption:** 1 capacity unit (registry maintenance)
- **Scaling:** Additional units as agent count grows
- **Note:** Registry is code-enforced; Pehchaan is the record authority

---

## 12. KPIS AND HARD-STOP FAILURES

| KPI | Target | Hard-stop failure |
|---|---|---|
| Identity record completeness | 100% of agents | Any agent without valid identity |
| ID uniqueness | 100% | Any duplicate agent ID |
| Status accuracy | 100% | Any agent running with wrong status |
| Identity audit completeness | 100% of changes logged | Any unlogged identity change |

---

## 13. EXCEPTIONS AND ESCALATION

- **Duplicate ID detected:** Block creation; escalate to Niyantrak
- **Identity mismatch:** Halt agent execution; escalate to Niyantrak and Satya
- **Registry corruption:** Fail safe (no execution); escalate to Sutra
- **Model/service unavailable:** Report honestly; do not fake identity records

---

## 14. INDEPENDENT EVALUATOR

- **Evaluator:** Satya (Chief Assurance Agent) — SAM-AG-010
- **Supporting:** Niyantrak (AgentOps) — SAM-AG-158, Seema (Authority Audit) — SAM-AG-185

---

## 15. DEPENDENCIES AND TOOLS

| Dependency | Type | Status |
|---|---|---|
| Niyantrak (AgentOps) | Reporting line | Required |
| Pramanik (Certification) | Certification status | Required |
| Adhikar (Permissions) | Permission linkage | Required |
| Registry database | Tool | To be defined |

---

## 16. TEST CASES

| Test | Expected result |
|---|---|
| **Pass:** Create identity for a new agent SAM-AG-200 | Unique ID issued; status = Proposed/C0; record logged |
| **Fail:** Attempt to run agent without valid identity record | Execution blocked; escalation to Niyantrak and Adhikar |
