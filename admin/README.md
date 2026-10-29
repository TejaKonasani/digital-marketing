# Samrudhi Agentic AI — Admin Console

The **internal company console** for the Samrudhi Agentic AI platform. This is where company operators, department leads, and assurance & governance staff see the whole machine: all 11 departments, the full 194-position digital workforce, the agents that run them, the workflows that connect them, and the controls that keep it honest.

> **This is a frontend-only prototype.** Everything you see is driven by realistic mock data and simulated interactions. There is no backend, no database, no real authentication, and no real side effects. Every external action is clearly labelled *simulated* or *blocked*.

---

## Quick start

Requires **Node.js 18+** and npm.

```bash
cd admin
npm install
npm run dev
```

Open **http://localhost:5173**.

For a production build:

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

---

## Demo logins

Sign-in is **simulated** (clearly labelled as a demo, not production authentication). The password for every account is `demo1234`, and each login screen also offers one-click quick-select for a demo account.

| Account | Role | Email |
|---------|------|-------|
| Vikram | Founder / Super Admin | `vikram@samrudhi.ai` |
| Divya | Client Experience Lead | `divya@samrudhi.ai` |
| Satya | Independent Assurance Lead | `satya@samrudhi.ai` |
| Demo User | Demo workspace | `demo@samrudhi.ai` |

Different roles surface the console in different ways (e.g. the Independent Assurance Lead sees the assurance & audit trail first), so it's worth signing in as more than one.

---

## What's in the console

| Area | What you can do |
|------|-----------------|
| **Dashboard** | Executive overview: live KPIs, charts, and recent activity across the platform. |
| **Departments** | Browse all **11 departments** with headcount, status, and autonomy mix. |
| **Positions** | The full **194-position registry**. Open any position to see its purpose, input/output contract, dependencies, tool allow-list, authority class (A–E), and independent evaluator. |
| **Agents** | The agent directory. Inspect an agent's identity, recent runs, tools, and evaluator. |
| **Workflows** | Track work through the 14-stage operating model. Open a task to see its inputs, outputs, warnings, and execution record. |
| **Clients** | Client accounts, status, and tenant-scoped context. |
| **Sales** | The sales pipeline and opportunity tracking. |
| **Marketing** | Marketing and content operations. |
| **Tasks & Approvals** | Review and **decide approvals** (approve / request revision) — recorded as simulated decisions. Move tasks through their permitted stages. |
| **Analytics** | Performance and utilisation analytics. |
| **Finance** | Budget, spend, and cost views (no real payments). |
| **Technology / AgentOps** | MCP, tooling, and agent-operations views. |
| **Assurance & Audit** | The independent assurance & audit trail — the governance backbone. |
| **Notifications** | In-app notifications. |
| **Users & Access** | User management and access control. |
| **Settings** | Workspace settings. |
| **Demo** | A guided **demo mode** that runs a simulated workflow end-to-end. |

### The demo workflow

From the **Demo** page you can run a simulated workflow and watch a healthcare social post move through:

**brief → planning → research → copy → visual → QA → client-approval gate**

It deliberately **stops at the human approval gate** — demonstrating that external side effects (publishing, sending, spending) never happen automatically.

---

## Honesty & governance (by design)

The console mirrors the PRD's governance model:

- **Honest simulation** — every external action is labelled *simulated* or *blocked*. The UI never claims an email was sent, a campaign published, or a payment processed.
- **Human approval gates** — clinical claims, publishing, major ad-spend changes, and payments appear as *pending approval*, never as automatically completed.
- **Autonomy classes A–E** — each of the 194 positions carries an authority class; external side-effect (D) and reserved-human (E) roles are explicitly gated.
- **Independent assurance** — a producing role is never the sole evaluator of its own output; GOV roles evaluate independently.
- **Tenant isolation** — client records are scoped to their workspace; the UI states that cross-client access is denied and logged.

---

## Tech stack

- **React 18** + **Vite**
- **React Router** for navigation
- **Tailwind CSS** for the design system
- **Recharts** for charts
- **Lucide** for icons
- Local React state for all interactions (no backend, no database, no real auth)

Mock data lives under `src/data/`.

---

## What is *not* implemented (by design)

- No backend, APIs, or database
- No real AI agents, LLM orchestration, or Ollama calls
- No real authentication (sign-in is simulated)
- No real external integrations (email, ad platforms, analytics, banking, publishing)
- No real side effects of any kind

This is a visual and behavioural demonstration of the proposed system, intended for presenting to company management before backend development begins.

---

## Project layout

```
admin/
├── src/
│   ├── components/     # Shared UI primitives (Card, Badge, Tabs, charts) + Layout
│   ├── data/           # Mock data (departments, positions, clients, tasks, workflows, finance)
│   ├── pages/          # One file per console area (see table above)
│   ├── state/          # App-wide React context (session, demo state)
│   ├── App.jsx         # Router + app shell
│   ├── main.jsx        # Entry point
│   └── index.css       # Tailwind + design tokens
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```