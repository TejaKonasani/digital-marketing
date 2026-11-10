# P1 Phase 4 — Finance Pod (14 agents)

Agents **#34–47** — the finance & administration team.

> **Build order:** #34–47 — Build after Phase 3 (sales) so finance can handle the revenue and billing from signed clients. Niti (AI CFO) is the first agent in this phase.
> **Source documents:** SAMRUDHI AGENTIC AI.pdf · SAMRUDHI AGENTIC AI(1).pdf · SAMRUDHI AGENTIC AI(2).pdf — Finance & Administration domain (PDF1 p.4 process inventory: 5 processes), Canonical Registry Reconciliation (PDF2).
> **Department:** 09 — Finance & Administration · Reports to: Arjun (AI CEO) · Coordinates: Daksh (COO), Aarya (CCO), Medha (Analytics), Mitra (CXO)
> **Governance:** Rule 07 — Agents cannot independently authorise or execute financial transfers. Human approval required for capital allocation, client pricing, contracts, major budget decisions.

## Agent Roster

| # | Agent | Canonical ID | Position | Role | Responsibilities |
|---|-------|--------------|----------|------|------------------|
| 34 | Niti | SAM-AG-034 | FIN-001 | AI CFO — Chief Financial Officer | Revenue, costs, contribution, cash flow, financial risk oversight. Reports to Arjun. |
| 35 | Ayaan | SAM-AG-035 | FIN-002 | Billing & Invoicing Lead | Generate invoices, billing cycle management, revenue recognition. Reports to Niti. |
| 36 | Samanya | SAM-AG-036 | FIN-003 | Collections & Accounts Receivable | Payment tracking, dunning workflows, reconciliation. Reports to Niti. |
| 37 | Kharcha | SAM-AG-037 | FIN-004 | Expense Management | Expense tracking, approval workflows, reimbursement processing. Reports to Niti. |
| 38 | Vyanjan | SAM-AG-038 | FIN-005 | Vendor & Procurement | Vendor management, purchase orders, supplier coordination. Reports to Niti. |
| 39 | Hisab | SAM-AG-039 | FIN-006 | Accounting & Bookkeeping | General ledger, journal entries, financial statements. Reports to Niti. |
| 40 | Budgeet | SAM-AG-040 | FIN-007 | Budgeting & Forecasting | Budget planning, variance analysis, financial forecasting. Reports to Niti. |
| 41 | Labh | SAM-AG-041 | FIN-008 | Profitability & Cost Analysis | Cost-per-deliverable, client profitability, margin analysis. Reports to Niti. |
| 42 | Kar | SAM-AG-042 | FIN-009 | Tax & Compliance | Tax filing, regulatory compliance, statutory reporting. Reports to Niti. |
| 43 | Nivesh | SAM-AG-043 | FIN-010 | Cash Flow & Treasury | Cash management, liquidity planning, bank reconciliation. Reports to Niti. |
| 44 | Auditable | SAM-AG-044 | FIN-011 | Financial Audit & Controls | Internal controls, audit trail, financial governance. Reports to Niti + Satya. |
| 45 | Vitta | SAM-AG-045 | FIN-012 | Financial Reporting & Analytics | Financial dashboards, management reports, KPI tracking. Reports to Niti + Medha. |
| 46 | Sahay | SAM-AG-046 | FIN-013 | Client Billing Coordination | Client invoice coordination, payment queries, billing disputes. Reports to Mitra + Niti. |
| 47 | Avartan | SAM-AG-047 | FIN-016 | Renewal & Contract Finance | Contract renewal finance, subscription management, revenue recurrence. Reports to Niti. |

## Finance Workflow Architecture

```
01 · Revenue Recognition     → Ayaan (invoice generation from signed deals)
02 · Billing & Invoicing     → Ayaan + Sahay (client invoices, queries, disputes)
03 · Collections             → Samanya (payment tracking, dunning, reconciliation)
04 · Expense Processing      → Kharcha (expense tracking, approvals, reimbursement)
05 · Vendor Management       → Vyanjan (POs, supplier coordination, payments)
06 · Accounting              → Hisab (GL, journal entries, financial statements)
07 · Budgeting               → Budgeet (budget planning, variance analysis, forecasting)
08 · Profitability Analysis  → Labh (cost-per-deliverable, client margins)
09 · Tax & Compliance        → Kar (tax filing, regulatory reporting)
10 · Cash Flow Management    → Nivesh (liquidity, bank reconciliation)
11 · Audit & Controls        → Auditable (internal controls, audit trail)
12 · Financial Reporting     → Vitta (dashboards, management reports)
13 · Renewal Finance         → Avartan (contract renewals, revenue recurrence)
```

## Finance Process Master (5 core processes — PDF1 p.4)

| Process | Primary Agent | Description |
|---------|---------------|-------------|
| FIN-P01 | Ayaan | Invoicing — generate and issue client invoices |
| FIN-P02 | Samanya | Collections — track payments, manage dunning, reconcile |
| FIN-P03 | Kharcha | Expenses — track, approve, and process expenses |
| FIN-P04 | Vyanjan | Vendor coordination — manage suppliers, POs, payments |
| FIN-P05 | Labh | Profitability reporting — cost analysis, margin reporting |

## Governance & Authority Boundaries

| Activity | Agent Authority | Human Approval |
|----------|-----------------|----------------|
| Generate invoice | ✅ Permitted (from approved deal) | No |
| Process expense claim | ✅ Within policy limits | Over limit: Yes |
| Vendor payment drafting | ✅ Draft only | **Required** |
| Transfer funds | ❌ Prohibited | **Required** |
| Approve budget | ❌ Not permitted | **Required** |
| Set client pricing | ❌ Not permitted | **Required** (via Prastav/Vikram) |
| Sign contracts | ❌ Prohibited | **Required** |
| Financial statement prep | ✅ Autonomous drafting | External reporting approval |
| Tax filing preparation | ✅ Draft only | **Required** before submission |
| Client data access | ⚠️ Tenant-scoped only | New scope: Yes |

## KPIs — Department Scorecard

| KRA | KPI | Target |
|-----|-----|--------|
| Revenue accuracy | Invoices issued without error | ≥99% |
| Collections | Days sales outstanding (DSO) | Baseline, then improve |
| Expense control | Expenses within approved budget | ≥98% |
| Cash flow | Liquidity ratio maintained | ≥1.2 |
| Profitability | Cost-per-deliverable tracked | 100% of deliverables |
| Compliance | Tax filings prepared on time | 100% |
| Audit | Zero unattributed financial transactions | 0 |
| Reporting | Management reports delivered within SLA | ≥98% |

## Agent Files

Each agent has a detailed specification file with 15 sections (Identity Card, What It Does, Platform, Behaviour Rules, KRAs, KPIs, Dashboard, Workflows, I/O Contract, System Prompt, Tools, Authority Matrix, Test Scenarios, Build Checklist, Source Map):

- `Niti_AI_Chief_Financial_Officer_34.md`
- `Ayaan_Billing_Invoicing_35.md`
- `Samanya_Collections_36.md`
- `Kharcha_Expense_Management_37.md`
- `Vyanjan_Vendor_Procurement_38.md`
- `Hisab_Accounting_39.md`
- `Budgeet_Budgeting_Forecasting_40.md`
- `Labh_Profitability_Analysis_41.md`
- `Kar_Tax_Compliance_42.md`
- `Nivesh_Cash_Flow_43.md`
- `Auditable_Financial_Audit_44.md`
- `Vitta_Financial_Reporting_45.md`
- `Sahay_Client_Billing_46.md`
- `Avartan_Renewal_Contract_Finance_47.md`
