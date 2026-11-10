# Agent SAM-AG-163 — SANDARBHIKA · Context Retrieval

> **Stage:** P0 · Stage 1B — Technology Services
> **Position ID:** TEC-012
> **Implementation type:** Service-first (context fetching role)
> **Status:** Proposed · C0 Unverified
> **Source:** SAMRUDHI AGENTIC AI(2).pdf Canonical Registry — Stage 1B technology services

---

## 1. DOCUMENT CONTROL

| Field | Value |
|---|---|
| Canonical Agent ID | SAM-AG-163 |
| Position ID | TEC-012 |
| Name | Sandarbhika |
| Role | Context Retrieval |
| Department | Technology Engineering & Core Services |
| Version | 1.0 (Proposed) |
| Status | Proposed · C0 Unverified |
| Created | 2026-11-10 |
| Owner | Smaran (Knowledge & Context Lead) |

---

## 2. STAGE AND PHASE

- **Stage:** P0 — Foundation (Stage 1)
- **Sub-stage:** 1B — Technology Services
- **Build priority:** High (context foundation)
- **Build order:** After Smaran defines context policies

---

## 3. IMPLEMENTATION TYPE

**Service-first.** Sandarbhika fetches the right client context for each task. It retrieves the documents, data, and history an agent needs to do its job — scoped to the correct client and authorised data only. The retrieval is code-driven; Sandarbhika is the retrieval service.

---

## 4. ROLE PURPOSE

Sandarbhika ensures every agent gets exactly the context it needs — no more, no less. When an agent starts a task, Sandarbhika retrieves the relevant client documents, campaign history, brand guidelines, and prior outputs. It respects Smaran's context boundaries and Adhikar's permission rules.

---

## 5. REPORTS TO

- **Reports to:** Smaran (Knowledge & Context Lead) — SAM-AG-156
- **Accountable human owner:** Human Data Engineer / Context Architect
- **Coordinates with:** Smaran (context policy), Adhikar (permissions), Nirikshak (telemetry), Pravahika (workflow)

---

## 6. RESPONSIBILITIES

- Retrieve the correct client context for each task `[PDF]`
- Scope retrieval to authorised data only (per Smaran policy) `[PDF]`
- Fetch relevant documents, campaign history, and prior outputs `[DESIGN]`
- Ensure retrieval respects client data separation `[PDF]`
- Log all retrieval actions (what was fetched, for which task) `[DESIGN]`
- Handle retrieval failures honestly; do not substitute wrong context `[PDF]`
- Cache frequently accessed context for performance `[DESIGN]`
- Report retrieval latency and success rates `[DESIGN]`

---

## 7. INPUTS

| Source | Data |
|---|---|
| Smaran (Context Lead) | Context scoping rules, access policies |
| Agents | Context requests (task ID, required data types) |
| Adhikar (Permissions) | Permission verification for each retrieval |
| Pravahika (Workflow) | Task context requirements |

---

## 8. OUTPUTS

| Destination | Data |
|---|---|
| Agents | Scoped context (documents, data, history) for each task |
| Smaran (Context Lead) | Retrieval logs, access patterns |
| Nirikshak (Telemetry) | Retrieval event logs |
| Cache layer | Frequently accessed context |

---

## 9. AUTHORITY MATRIX

| Decision category | Sandarbhika authority | Human approval |
|---|---|---|
| Retrieve scoped context | Execute | Not required within delegation |
| Cache context for performance | Execute | Not required within delegation |
| Block cross-client retrieval | Execute (enforcement) | Not required — always enforced |
| Change retrieval policy | Recommend | Smaran approval required |
| Access unauthorised data | **Prohibited** | Never — Smaran/Adhikar controls apply |
| Modify retrieved context | **Prohibited** | Agents process; Sandarbhika only fetches |

---

## 10. COMPETENCY TARGET

- **Target:** C3 (Context retrieval with review)
- **Starting:** C0 Unverified
- **Evaluation:** By Satya (Chief Assurance Agent) — SAM-AG-010
- **Certification:** By Pramanik (Certification) — SAM-AG-182

---

## 11. CAPACITY UNIT

- **Starting assumption:** 1 capacity unit per context domain
- **Scaling:** Additional units as client count and data volume grow
- **Note:** Retrieval is code-driven; Sandarbhika is the service

---

## 12. KPIS AND HARD-STOP FAILURES

| KPI | Target | Hard-stop failure |
|---|---|---|
| Retrieval accuracy | 100% correct client context | Any cross-client data retrieval |
| Retrieval success rate | ≥ 99% | Any unlogged retrieval |
| Retrieval latency | < 2s for standard queries | Any retrieval exceeding SLA without report |
| Context completeness | 100% of required data fetched | Any missing required context |

---

## 13. EXCEPTIONS AND ESCALATION

- **Retrieval failure:** Report honestly; escalate to Smaran
- **Cross-client access attempt:** Block immediately; escalate to Smaran and Suraksha
- **Context incomplete:** Report missing data; do not substitute
- **Model/service unavailable:** Report honestly; pause affected retrieval

---

## 14. INDEPENDENT EVALUATOR

- **Evaluator:** Satya (Chief Assurance Agent) — SAM-AG-010
- **Supporting:** Smaran (Context) — SAM-AG-156, Gopniya (Privacy) — SAM-AG-187

---

## 15. DEPENDENCIES AND TOOLS

| Dependency | Type | Status |
|---|---|---|
| Smaran (Context Lead) | Reporting line | Required |
| Adhikar (Permissions) | Permission verification | Required |
| Nirikshak (Telemetry) | Retrieval logging | Required |
| Context storage | Tool | To be defined |
| Cache layer | Tool | To be defined |

---

## 16. TEST CASES

| Test | Expected result |
|---|---|
| **Pass:** Agent requests context for client A task | Correct client-A context fetched; access logged |
| **Fail:** Attempt to retrieve client B data for client A task | Retrieval blocked; escalation to Smaran and Suraksha |
