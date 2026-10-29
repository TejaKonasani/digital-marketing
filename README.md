# Samrudhi Agentic AI — Frontend Prototype

A complete, **frontend-only** prototype of the Samrudhi Agentic AI platform — a healthcare digital-marketing operating platform supported by a structured **194-position digital workforce across 11 departments**.

This repository demonstrates how the finished product will **look and behave** before any backend, AI agents, database or real integrations are built. Everything runs on **realistic mock data and simulated interactions** — no real emails are sent, no real campaigns are published, and no real payments are processed.

> **Source of truth:** the *Samrudhi Agentic AI — Detailed Implementation PRD*. Department names, role names, workflows, autonomy classes, approval boundaries and terminology are preserved from that document.

---

## What's inside

```
samrudhi-agentic-ai/
├── admin/     # Company administration console (internal)
├── client/    # Client-facing portal (customer workspace)
└── README.md  # This file
```

| App | Who it's for | What it shows |
|-----|-------------|---------------|
| **`admin/`** | Company operators, department leads, assurance & governance | Executive dashboard, all 11 departments, the full 194-position registry, agent directory, workflow orchestration, clients, sales pipeline, marketing/content, tasks & approvals, analytics, finance, technology/AgentOps, independent assurance & audit, notifications, users & access, settings, and a guided **demo mode**. |
| **`client/`** | Clients (non-technical) | A simple, plain-language workspace: home, projects, a guided brief form, approvals & revisions, campaigns, reports, messages, help & support, and account settings. No internal agent codes or jargon. |

Both apps are **independent** — each has its own `package.json`, config, source and run instructions. They share a consistent visual identity (Inter type, card-based layout, status system) while each is designed for its audience: the admin console is a dense, data-rich dark-sidebar dashboard; the client portal is a calm, light, guided experience.

---

## Quick start

You need **Node.js 18+** and npm.

### 1. Admin console

```bash
cd admin
npm install
npm run dev
```

Open **http://localhost:5173**

### 2. Client portal

In a **second terminal**:

```bash
cd client
npm install
npm run dev
```

Open **http://localhost:5174**

### Demo logins

Both apps use **simulated** sign-in (clearly labelled as demo — not production authentication).

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

On each login screen you can also **quick-select** a demo account with one click.

---

## What you can do in the prototype

**Admin**
- Explore the executive overview with live KPIs, charts and activity.
- Browse all **11 departments** and the full **194-position registry** — open any position to see its purpose, input/output contract, dependencies, tool allow-list, authority class (A–E) and independent evaluator.
- Open the **agent directory** and inspect an agent's identity, runs, tools and evaluator.
- Track **workflows** through the 14-stage operating model; open a task to see its inputs, outputs, warnings and execution record.
- Run the **simulated demo workflow** and watch a healthcare social post move through brief → planning → research → copy → visual → QA → the client-approval gate (it correctly stops at the human gate).
- Review and **decide approvals** (approve / request revision) — recorded as simulated decisions.
- Move tasks through their permitted stages, inspect clients, the sales pipeline, marketing/content, analytics, finance, technology/MCP/AgentOps, and the independent **assurance & audit trail**.

**Client**
- See a plain-language home that always answers: *what's happening, what's done, what's in progress, what needs my approval, what happens next.*
- Complete the **guided brief form** (with save-draft).
- **Approve** content or **request revisions** on the exact version under review.
- View campaign status (with a clear "no real spend" notice), read reports with definitions and plain-language explanations, and message the team.

---

## Honesty & governance (by design)

The prototype deliberately mirrors the PRD's governance model:

- **Honest simulation** — every external action is labelled *simulated* or *blocked*. The UI never claims an email was sent, a campaign published, or a payment processed.
- **Human approval gates** — clinical claims, publishing, major ad-spend changes and payments appear as *pending approval*, never as automatically completed.
- **Autonomy classes A–E** — each of the 194 positions carries an authority class; external side-effect (D) and reserved-human (E) roles are explicitly gated.
- **Independent assurance** — a producing role is never the sole evaluator of its output; GOV roles evaluate independently.
- **Tenant isolation** — client records are scoped to their workspace; the UI states cross-client access is denied and logged.

---

## Tech stack

- **React 18** + **Vite** (both apps)
- **React Router** for navigation
- **Tailwind CSS** for the design system
- **Recharts** for charts
- **Lucide** for icons
- Local React state for all interactions (no backend, no database, no real auth)

Mock data lives in organised files under each app's `src/data/`.

---

## What is *not* implemented (by design)

- No backend, APIs, or database
- No real AI agents, LLM orchestration, or Ollama calls
- No real authentication (sign-in is simulated)
- No real external integrations (email, ad platforms, analytics, banking, publishing)
- No real side effects of any kind

This is a visual and behavioural demonstration of the proposed system, intended for presenting to company management and clients before backend development begins.

---

## Scripts

Each app supports:

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start the local dev server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |