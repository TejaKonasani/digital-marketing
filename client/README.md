# Samrudhi Agentic AI — Client Portal

The **client-facing portal** for the Samrudhi Agentic AI platform. This is the side your clients (non-technical) actually see: a calm, plain-language workspace that always answers the questions a client cares about — *what's happening, what's done, what's in progress, what needs my approval, and what happens next.*

There are no internal agent codes, no jargon, and no dense dashboards here. It is deliberately the opposite of the admin console: simple, guided, and reassuring.

> **This is a frontend-only prototype.** Everything you see is driven by realistic mock data and simulated interactions. There is no backend, no database, no real authentication, and no real side effects. Every external action is clearly labelled *simulated* or *blocked*, and campaign views carry a clear **"no real spend"** notice.

---

## Quick start

Requires **Node.js 18+** and npm.

```bash
cd client
npm install
npm run dev
```

Open **http://localhost:5174**.

For a production build:

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

---

## Demo logins

Sign-in is **simulated** (clearly labelled as a demo, not production authentication). The password for every account is `demo1234`, and the login screen also offers one-click quick-select for a demo account.

| Account | Role | Email |
|---------|------|-------|
| R. Iyer | Client Admin | `riyer@citycare.in` |
| S. Menon | Client Owner | `smeon@nirvaan.in` |
| Demo Viewer | Read-only viewer | `viewer@demo.in` |

The **read-only viewer** is a good way to see how the portal behaves for a stakeholder who can look but not act.

---

## What's in the portal

| Area | What you can do |
|------|-----------------|
| **Home** | A plain-language overview that always answers: what's happening, what's done, what's in progress, what needs your approval, and what happens next. |
| **Projects** | Everything the team is working on for you, grouped by status (All / Needs you / In progress / Completed). Each project tells you what's happening, what's done, and what happens next. |
| **New Brief** | A **guided brief form** (with save-draft) for requesting new work, written in plain language. |
| **Approvals** | Review content or decisions and **approve** them or **request revisions** — always on the exact version under review. |
| **Campaigns** | See the status of your campaigns, with a clear **"no real spend"** notice. |
| **Reports** | Read reports with definitions and plain-language explanations of the numbers. |
| **Messages** | Message the team directly. |
| **Support** | Help & support. |
| **Settings** | Account and workspace settings. |

---

## Honesty & governance (by design)

Even though this is the client-facing side, the prototype keeps the PRD's honesty rules:

- **Honest simulation** — every external action is labelled *simulated* or *blocked*. The UI never claims an email was sent, a campaign published, or a payment processed.
- **Human approval gates** — anything that would change the outside world (publishing, clinical claims, major ad-spend changes, payments) appears as *pending approval*, never as automatically completed.
- **No real spend** — campaign views always make clear that no real money is being spent.
- **Plain language** — the client never sees internal agent codes, autonomy classes, or jargon.

---

## Tech stack

- **React 18** + **Vite**
- **React Router** for navigation
- **Tailwind CSS** for the design system
- Local React state for all interactions (no backend, no database, no real auth)

Mock data lives in `src/data/clientData.js`.

---

## What is *not* implemented (by design)

- No backend, APIs, or database
- No real AI agents, LLM orchestration, or Ollama calls
- No real authentication (sign-in is simulated)
- No real external integrations (email, ad platforms, analytics, banking, publishing)
- No real side effects of any kind

This is a visual and behavioural demonstration of the proposed client experience, intended for presenting to clients before backend development begins.

---

## Project layout

```
client/
├── src/
│   ├── components/     # Shared UI primitives (Card, Badge, Tabs, …) + ClientLayout
│   ├── data/           # Mock data (clientData.js)
│   ├── pages/          # One file per portal area (see table above)
│   ├── state/          # ClientContext (session, projects, approvals, …)
│   ├── App.jsx         # Router + app shell
│   ├── main.jsx        # Entry point
│   └── index.css       # Tailwind + design tokens
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```