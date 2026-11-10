# Samrudhi Agentic OS — Registry and Build Plan

> **Source of truth:** The three Samrudhi PDFs — Blueprint (`SAMRUDHI AGENTIC AI.pdf`), Department Registers (`SAMRUDHI AGENTIC AI(1).pdf`), Canonical Registry (`SAMRUDHI AGENTIC AI(2).pdf`), and SAM-ROLE-001 to 006.
>
> **Honest status:** This repository currently contains **specification documents only** (Markdown READMEs for each agent). **There is no working code** — no Python, no database, no running agents. Everything described here is a plan for what to build.

---

## Priority Counts (from the documents)

| Priority | Folder | Positions | Meaning |
|----------|--------|-----------|---------|
| **P0** | `stage-1_P0/` | **30** | Foundation: platform + independent safety team. Build first. |
| **P1** | `stage-2_P1/` | **107** | First production workforce (6 phases). |
| **P2** | `_P2_later/` | 57 | Expansion. **Ignore for now.** |
| **Total** | | **194** | All positions in the canonical registry (01C). |

### P0 breakdown (30)
- **Stage 1A — Core thinking agents (4):** Arjun, Sutra, Satya, Niyantrak
- **Stage 1B — Technology services (14):** Vinyas, Setubandh, Yantra, Smaran, Suraksha, Pehchaan, Jod, Adhikar, Pravahika, Sandarbhika, Nirikshak, Parikshak, Sanskaran, Chaukidar
- **Stage 1C — Assurance team (12):** Pramana, Nishtha, Maryada, Yogyata, Pramanik, Gunvatta, Nishpaksh, Seema, Swasthya, Gopniya, Sakshi, Sankat

> The documents say these 30 positions **do not need 30 separate AI agents**. Stage 1A are thinking agents; Stage 1B are built as **services/modules** first (e.g. Nirikshak is logging code, not a separate LLM).

### P1 breakdown (107) — 6 phases ordered by document rollout

| Phase | Folder | Count | Focus |
|-------|--------|-------|-------|
| 1 | `phase-1_pilot-leadership/` | 4 | Pilot leadership (Daksh, Aarya, Mitra, Medha) |
| 2 | `phase-2_content-pilot/` | 16 | Content and social pilot pipeline |
| 3 | `phase-3_ops-client-analytics/` | 29 | Operations, Client Experience, Analytics, CEO Office |
| 4 | `phase-4_platform-assurance-expansion/` | 13 | Platform resilience and assurance expansion |
| 5 | `phase-5_growth-marketing/` | 23 | Growth: Paid Media, SEO and Samrudhi Marketing |
| 6 | `phase-6_sales-finance/` | 22 | Sales and Finance |

---

## Folder Structure

```
digital-marketing/
├── 00_registry/
│   ├── AGENT_REGISTRY.md        # All 137 agents in one table
│   ├── PRIORITY_MAP.md          # P0 = Stage 1, P1 = Stage 2 phases
│   └── CHANGELOG.md             # Every move, rename, delete
├── architecture/
│   └── P0_Architecture.md
├── website/
│   └── Website.md
├── stage-1_P0/
│   ├── 1A_core-agents/          # 4 thinking agents
│   ├── 1B_technology-services/  # 14 service-first roles
│   └── 1C_assurance-team/       # 12 assurance roles
├── stage-2_P1/
│   ├── phase-1_pilot-leadership/            # 4
│   ├── phase-2_content-pilot/               # 16
│   ├── phase-3_ops-client-analytics/        # 29
│   ├── phase-4_platform-assurance-expansion/ # 13
│   ├── phase-5_growth-marketing/            # 23
│   └── phase-6_sales-finance/               # 22
├── _archive_removed/            # Invented files (not in documents)
├── _P2_later/                   # Empty for now
├── admin/                       # Frontend prototype (existing)
├── client/                      # Frontend prototype (existing)
├── P0_Architecture_5.md         # Architecture spec (existing)
├── Website_6.md                 # Website spec (existing)
└── README.md                    # This file
```

**File naming:** `SAM-AG-082_Lekha_Healthcare-Copywriting.md` (canonical ID first, then name, then role). Drop random trailing numbers.

---

## Agent Registry (137 documented agents)

### Stage 1A — Core thinking agents (P0)

| # | Name | ID | Position | Role | Responsibility |
|---|------|----|----------|------|----------------|
| 1 | Arjun | 001 · CEO-001 | AI CEO | Turns Board goals into department priorities; daily executive brief; escalates risks. Cannot approve spend, contracts or pricing. |
| 2 | Sutra | 007 · TEC-001 | AI CTO | Owns the platform, security, integrations and releases. Cannot grant privileged access alone. |
| 3 | Satya | 010 · GOV-001 | AI Chief Assurance Agent | Independent checking and certification; reports critical risks straight to the Board. |
| 4 | Niyantrak | 158 · TEC-007 | AgentOps and DWMS Lead | Runs the agent registry, lifecycle, versions and performance records. |

### Stage 1B — Technology services (P0, 14)

| # | Name | ID | Position | Role | Responsibility |
|---|------|----|----------|------|----------------|
| 5 | Vinyas | 153 · TEC-002 | Platform Architecture Lead | Sets system design standards; reviews technical choices. |
| 6 | Setubandh | 154 · TEC-003 | MCP and Integration Lead | Plans connectors and APIs to Google Workspace and other tools. |
| 7 | Yantra | 155 · TEC-004 | Agent Runtime Lead | Designs how agents run and hand work to each other. |
| 8 | Smaran | 156 · TEC-005 | Knowledge and Context Lead | Controls what each agent can see; keeps clients separate. |
| 9 | Suraksha | 157 · TEC-006 | Security and Reliability Lead | Access control, security rules, incident response. |
| 10 | Pehchaan | 159 · TEC-008 | Agent Identity and Registry | Creates and keeps each agent ID record and status. |
| 11 | Jod | 160 · TEC-009 | MCP Connector Agent | Builds and configures connectors, APIs and webhooks. |
| 12 | Adhikar | 161 · TEC-010 | Tool Permissions and Access Control | Enforces what each agent may use; manages credentials. |
| 13 | Pravahika | 162 · TEC-011 | Workflow Runtime | Runs workflows step by step; retries failures; keeps state. |
| 14 | Sandarbhika | 163 · TEC-012 | Context Retrieval | Fetches the right client context for each task. |
| 15 | Nirikshak | 166 · TEC-015 | Observability and Telemetry | Logs every run: agent, version, time, cost, result. |
| 16 | Parikshak | 167 · TEC-016 | Testing and Evaluation Engineering | Test sets and regression tests for agents. |
| 17 | Sanskaran | 168 · TEC-017 | Versioning and Release | Tracks versions, approvals and releases; supports rollback. |
| 18 | Chaukidar | 170 · TEC-019 | Security Monitoring | Watches for suspicious access and threats. |

### Stage 1C — Assurance team (P0, 12)

| # | Name | ID | Position | Role | Responsibility |
|---|------|----|----------|------|----------------|
| 19 | Pramana | 176 · GOV-002 | Competency and Certification Lead | Sets what an agent must prove before doing work. |
| 20 | Nishtha | 177 · GOV-003 | Performance and Quality Assurance Lead | Method for independent evaluation of agents. |
| 21 | Maryada | 178 · GOV-004 | Compliance, Privacy and Risk Lead | Compliance and risk oversight. |
| 22 | Yogyata | 181 · GOV-007 | Competency Assessment | Runs the competency tests. |
| 23 | Pramanik | 182 · GOV-008 | Certification and Recertification | Tracks certification status and renewals. |
| 24 | Gunvatta | 183 · GOV-009 | Output Quality Evaluation | Independently scores accuracy and quality of outputs. |
| 25 | Nishpaksh | 184 · GOV-010 | Independent Performance Scoring | Scores agents consistently and fairly. |
| 26 | Seema | 185 · GOV-011 | Authority and Permission Audit | Checks agents stay inside their permissions. |
| 27 | Swasthya | 186 · GOV-012 | Healthcare Content and Advertising Compliance | Screens medical claims, for example blocks "guaranteed cure". |
| 28 | Gopniya | 187 · GOV-013 | Privacy and Confidentiality | Tests client-data separation and privacy. |
| 29 | Sakshi | 189 · GOV-015 | Audit Evidence and Traceability | Checks the evidence trail is complete. |
| 30 | Sankat | 192 · GOV-018 | Critical Risk and Escalation | Raises critical alerts fast to humans. |

### Stage 2 — P1 (107 agents, 6 phases)

**Phase 1 — Pilot leadership (4):** Daksh (002 · OPS-001), Aarya (003 · CRT-001), Mitra (004 · CEX-001), Medha (009 · DAT-001)

**Phase 2 — Content and social pilot pipeline (16):** Disha (076), Kalpana (077), Roop (078), Tarangini (079), Shuddhi (080), Anvesh (081), Lekha (082), Chitra (083), Prakash (084), Drishti (085), Pariksha (094), Shruti (050), Smriti (049), Yojana (059), Prativedan (125), Lagaat (146)

**Phase 3 — Operations, Client Experience, Analytics, CEO Office (29):** Lakshya (012), Samanvay (013), Sneha (044), Saarthi (045), Swagat (048), Sandesh (051), Sweekriti (052), Samiksha (053), Samadhan (055), Niyojan (060), Pravartan (061), Nirikshan (062), Sankalan (064), Samay (065), Vitaran (066), Kshamata (067), Gati (068), Suchak (070), Punargathan (071), Pramaan (072), Srotas (116), Satvik (117), Darshan (118), Sangrah (121), Shodhan (122), Samanjasya (123), Paribhasha (124), Darpan (126), Chetak (130)

**Phase 4 — Platform resilience and assurance expansion (13):** Smritikosh (164), Margdarshak (165), Punarsthapana (169), Upalabdh (171), Sanchay (172), Kshamatra (173), Pratikriya (174), Vivek (179), Samyak (180), Lekhapari (188), Vicharana (190), Nivaran (191), Suchita (194)

**Phase 5 — Growth: Paid Media, SEO and Samrudhi Marketing (23):** Tejas (008), Lakshman (097), Arohan (098), Metrika (100), Raksha (101), Khojika (102), Abhikalp (103), Boli (104), Lakshyaved (105), Sandarbh (106), Anveshana (108), Maapan (112), Vishleshan (113), Prahari (115), Prerna (028), Aditi (029), Uday (030), Vaani (031), Spandan (033), Katha (035), Tarang (036), Pravah (041), Maanak (042)

**Phase 6 — Sales and Finance (22):** Vikram (005), Aarav (016), Khoj (018), Lakshit (019), Sampark (020), Amantran (021), Prastav (023), Anugrah (025), Setu (027), Niti (006), Lekhan (134), Dhanika (135), Arth (136), Vidhi (138), Beejak (139), Vasooli (140), Milaan (141), Bhugtan (142), Kosh (143), Labh (145), LekhaPatra (149), Vittadarshi (152)

---

## Changes from Previous Build

The previous build had errors. Here is what is being corrected:

| Action | Files | Count |
|--------|-------|-------|
| Move to Stage 1 (they are P0) | Nirikshak, Pravahika, Gunvatta, Swasthya | 4 |
| Rewrite role (was wrong) | Gunvatta → output-quality evaluator under Satya; Nirikshak → telemetry/logging; Prativedan → client reporting; Lakshya → KPI agent in CEO Office | 4 |
| Fix IDs | Niti (006), Labh (145), all 9 Sales agents | ~12 |
| Move phase | Sales 9 + Niti + Labh → Phase 6; Lakshya → Phase 3 | 12 |
| Archive (invented, not in documents) | Ayaan, Samanya, Kharcha, Vyanjan, Hisab, Budgeet, Kar, Nivesh, Auditable, Vitta, Sahay, Avartan | 12 |
| Keep in place | Sutra, Arjun, Satya, Niyantrak, Daksh, Aarya, Mitra, Medha, Shruti, Yojana, Anvesh, Lekha, Chitra, Shuddhi, Prakash, Lagaat, Kalpana, Disha | 18 |

**New README files to add: 102** (Stage 1: 22, Phase 2: 5, Phase 3: 28, Phase 4: 13, Phase 5: 23, Phase 6: 11)

**Final total: 137 files** (30 P0 + 107 P1). Check: 47 current − 12 archived + 102 new = 137.

---

## Implementation Principles (for the coding AI later)

- **Rules enforced in code**, not prompts — permissions, approvals, client separation, "cannot publish" must be checked by code (a 7B model forgets rules).
- **Numbers computed in code** — KPIs and costs are calculated by code. The model only reads, summarises and drafts.
- **Real vs stand-in connectors** — every README states whether a Google or social connector is real or a local-folder stand-in for now.
- **Model errors** — if the model is down or gives bad output, the agent says so instead of faking a result.
- **Every agent starts as** `Proposed, C0 Unverified`. Nothing is certified.

---

## README Template (every agent)

Each agent README follows this structure:

1. **Document control:** canonical ID, position ID, legacy alias, version, status (Proposed, C0 Unverified)
2. **Stage and phase**
3. **Implementation type:** Thinking agent, Service-first, or Role agent
4. **Role purpose** in two lines
5. **Reports to, and accountable human owner**
6. **Responsibilities** (bullets)
7. **Inputs:** which agents give it work, and what data
8. **Outputs:** which agents receive its work, and what data
9. **Can do alone / needs human approval / must never do**
10. **Competency target** (C0 to C5)
11. **Capacity unit** (starting assumption only)
12. **KPIs and the hard stop failures**
13. **Exceptions and who it escalates to**
14. **Independent evaluator**
15. **Dependencies and tools required**
16. **Test:** one pass case and one deliberate fail case

> Use only what the PDFs say. If a field is not in the PDFs, write "To be defined", never invent. Tag every fact `[PDF]`, `[DESIGN]` or `[TBD]`.

---

## What Is NOT Implemented (by design)

- **No working code** — this is documentation only. No Python, no database, no running agents.
- No backend, APIs, or database
- No real AI agents, LLM orchestration, or Ollama calls
- No real authentication
- No real external integrations (email, ad platforms, analytics, banking, publishing)

The `admin/` and `client/` folders contain a **frontend-only prototype** (React + Vite) that demonstrates the UI with mock data. See the prototype run instructions below.

---

## Frontend Prototype (existing — separate from the agent docs)

> This is a visual demonstration, not the working backend.

```
admin/     # Company administration console (internal)
client/    # Client-facing portal (customer workspace)
```

### Quick start

You need **Node.js 18+** and npm.

**Admin console** (Terminal 1):
```bash
cd admin
npm install
npm run dev
```
Open **http://localhost:5173**

**Client portal** (Terminal 2):
```bash
cd client
npm install
npm run dev
```
Open **http://localhost:5174**

### Demo logins (simulated — not production auth)

**Admin** (password for all: `demo1234`)

| Account | Role | Email |
|---------|------|-------|
| Vikram | Founder / Super Admin | `vikram@samrudhi.ai` |
| Divya | Client Experience Lead | `divya@samrudhi.ai` |
| Satya | Independent Assurance Lead | `satya@samrudhi.ai` |
| Demo User | Demo workspace | `demo@samrudhi.ai` |

**Client** (password for all: `demo1234`)

| Account | Role | Email |
|---------|------|-------|
| R. Iyer | Client Admin | `riyer@citycare.in` |
| S. Menon | Client Owner | `smeon@nirvaan.in` |
| Demo Viewer | Read-only viewer | `viewer@demo.in` |

### Tech stack (prototype)

- React 18 + Vite (both apps)
- React Router, Tailwind CSS, Recharts, Lucide
- Local React state for all interactions (no backend, no database, no real auth)

---

## Build Progress

| Stage | Target | Done | Status |
|-------|--------|------|--------|
| Stage 1A (core agents) | 4 | 4 | ✅ Files exist (need role/ID fixes) |
| Stage 1B (tech services) | 14 | 0 | ⏳ To be created |
| Stage 1C (assurance) | 12 | 0 | ⏳ To be created |
| Phase 1 (pilot leadership) | 4 | 4 | ✅ Files exist |
| Phase 2 (content pilot) | 16 | 16 | ✅ Files exist (5 need role fixes) |
| Phase 3 (ops/client/analytics) | 29 | 0 | ⏳ To be created |
| Phase 4 (platform/assurance) | 13 | 0 | ⏳ To be created |
| Phase 5 (growth/marketing) | 23 | 0 | ⏳ To be created |
| Phase 6 (sales/finance) | 22 | 14 | ⚠️ 9 sales files exist (need ID/phase fixes); 12 finance files archived (invented) |

**Total documented: 47 / 137** (after archiving the 12 invented finance files).

---

## Next Steps

1. **STEP A — Restructure:** Create folder structure, move/rename existing 47 files, archive the 12 invented files, write registry and changelog.
2. **STEP B — Add Stage 1:** Create 22 new P0 READMEs (to reach 30 total).
3. **STOP** and wait for go-ahead for each P1 phase (created one phase at a time).
4. After all documents are complete: **separate plan to turn them into working code**, beginning with the 4 Stage 1A agents and the Stage 1B logging/permission/approval services.
