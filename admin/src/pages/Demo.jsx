import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PlayCircle, Sparkles, CheckCircle2, Circle, Loader2, Lock, ArrowRight, RotateCcw, Eye } from 'lucide-react'
import { Card, PageHeader, Badge, SimulationBanner, ProgressBar } from '../components/ui'
import { useApp } from '../state/AppContext'
import { operatingStages, demoRunSteps } from '../data/workflows'

const stageActors = [
  'SBD — Prospect Research, Outreach, Discovery',
  'SBD — Needs capture, stakeholders, success measures',
  'SBD — Scope, assumptions, contract checklist (human review)',
  'CEX — Workspace, profile, assets, goals, restrictions',
  'CRT (Shruti) — Audience, channel, CTA, sources, criteria',
  'OPS (Sankalan / Yojana) — Task graph, owners, dates, gates',
  'CRT (Anvesh) — Source-backed findings with caveats',
  'CRT (Lekha, Chitra) — Copy, visuals, video, ad assets',
  'GOV (Shuddhi, Pariksha) — Factual, clinical, brand, technical',
  'Client — Preview exact version, approve or request changes',
  'CRT (Prakash) — Authorised action or labelled simulation',
  'DAT (Drishti) — Ingest, validate, analyse, explain',
  'FIN — Invoice, reconcile, track (payment human-authorised)',
  'GOV + OPS — Patterns, corrective actions, workflow revision'
]

export default function Demo() {
  const { demoRun, startDemoRun, advanceDemoRun, finishDemoRun, resetDemoRun } = useApp()
  const [autoAdvance, setAutoAdvance] = useState(false)

  const step = demoRun ? demoRunSteps[demoRun.stepIndex] : null

  const handleStart = () => {
    startDemoRun()
    setAutoAdvance(true)
  }
  const handleNext = () => {
    if (!demoRun) return
    if (demoRun.stepIndex >= demoRunSteps.length - 1) {
      finishDemoRun()
      setAutoAdvance(false)
    } else {
      advanceDemoRun(demoRun.stepIndex + 1)
    }
  }

  // Auto-advance timer (simulated pacing)
  useEffect(() => {
    if (!autoAdvance || !demoRun || !demoRun.running) return
    const t = setTimeout(() => {
      if (demoRun.stepIndex >= demoRunSteps.length - 1) {
        finishDemoRun()
        setAutoAdvance(false)
      } else {
        advanceDemoRun(demoRun.stepIndex + 1)
      }
    }, 1400)
    return () => clearTimeout(t)
  }, [autoAdvance, demoRun, advanceDemoRun, finishDemoRun])

  return (
    <div>
      <PageHeader
        title="Demo Mode"
        description="A guided, simulated walkthrough of the full operating model — from client request to reporting. Every step is recorded in demo state; no external action is executed."
        actions={
          demoRun ? (
            <button className="btn-secondary" onClick={() => { resetDemoRun(); setAutoAdvance(false) }}>
              <RotateCcw className="h-4 w-4" /> Reset demo
            </button>
          ) : (
            <button className="btn-primary" onClick={handleStart}>
              <PlayCircle className="h-4 w-4" /> Start demo workflow
            </button>
          )
        }
      />

      <SimulationBanner />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* 14-stage model */}
        <Card title="The 14-stage operating model" subtitle="Every client request flows through these stages" className="lg:col-span-2">
          <div className="space-y-2">
            {operatingStages.map((s, i) => {
              const isDemoStage = demoRun && demoRun.stepIndex !== undefined
              // Map demo steps to stages: brief(5), planning(6), research(7), production(8), QA(9), client review(10)
              const stageToStep = { 5: 0, 6: 1, 7: 2, 8: 3, 9: 4, 10: 5, 11: 6 }
              let state = 'idle'
              if (demoRun) {
                const si = stageToStep[s.id]
                if (si !== undefined) {
                  if (demoRun.done || demoRun.stepIndex > si) state = 'done'
                  else if (demoRun.stepIndex === si) state = 'running'
                }
              }
              return (
                <div key={s.id} className={`flex items-start gap-3 rounded-xl border p-3.5 transition ${state === 'done' ? 'border-emerald-200 bg-emerald-50/50' : state === 'running' ? 'border-indigo-300 bg-indigo-50/60' : 'border-slate-200 bg-white'}`}>
                  <div className="flex flex-col items-center">
                    {state === 'done' ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    ) : state === 'running' ? (
                      <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />
                    ) : (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-400">{s.id}</span>
                    )}
                    {i < operatingStages.length - 1 && <span className="mt-1 h-4 w-px bg-slate-200" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className={`text-sm font-semibold ${state === 'idle' ? 'text-slate-500' : 'text-slate-800'}`}>{s.name}</p>
                      {state === 'running' && <Badge color="indigo" dot>running (simulated)</Badge>}
                      {state === 'done' && <Badge color="green">complete</Badge>}
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500">{stageActors[i]}</p>
                    <div className="mt-1 grid grid-cols-1 gap-x-4 sm:grid-cols-3">
                      <p className="text-[11px] text-slate-400"><span className="font-semibold text-slate-500">In:</span> {s.input}</p>
                      <p className="text-[11px] text-slate-400"><span className="font-semibold text-slate-500">Work:</span> {s.work}</p>
                      <p className="text-[11px] text-slate-400"><span className="font-semibold text-slate-500">Out:</span> {s.output}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Live demo panel */}
        <div className="space-y-4">
          <Card title="Seeded scenario" subtitle="One healthcare social post, end to end">
            <div className="space-y-3">
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Client request</p>
                <p className="mt-1 text-sm font-medium text-slate-800">Cardiac Awareness Week — social post</p>
                <p className="mt-1 text-xs text-slate-500">City Care Multispeciality Hospital · BRIEF-0001 v3</p>
              </div>

              {!demoRun ? (
                <div className="rounded-xl border border-dashed border-slate-200 p-5 text-center">
                  <Sparkles className="mx-auto h-8 w-8 text-indigo-300" />
                  <p className="mt-2 text-sm font-semibold text-slate-700">Ready to demonstrate</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    Start the demo to watch the brief move through planning, research, production, QA and the client approval gate.
                  </p>
                  <button className="btn-primary mt-4 w-full" onClick={handleStart}>
                    <PlayCircle className="h-4 w-4" /> Start demo workflow
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {step && (
                    <div className={`rounded-xl border p-4 ${demoRun.done ? 'border-emerald-200 bg-emerald-50/50' : 'border-indigo-200 bg-indigo-50/50'}`}>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-slate-800">{step.label}</p>
                        <Badge color={demoRun.done ? 'green' : 'indigo'}>{demoRun.done ? 'done' : `step ${demoRun.stepIndex + 1}/${demoRunSteps.length}`}</Badge>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{step.detail}</p>
                    </div>
                  )}
                  {demoRun.done && (
                    <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
                      <p className="flex items-center gap-1.5 text-sm font-bold text-amber-900">
                        <Lock className="h-4 w-4" /> Stopped at the human gate
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-amber-800">
                        The workflow correctly pauses at <span className="font-semibold">Client review</span>. Publishing (stage 11) will only happen with
                        client approval of the exact version, a passed QA gate and an authorised connector — otherwise it records a labelled simulation/blocked state.
                      </p>
                    </div>
                  )}
                  <div className="flex gap-2">
                    {!demoRun.done && (
                      <button className="btn-primary flex-1" onClick={handleNext}>
                        {demoRun.stepIndex >= demoRunSteps.length - 1 ? 'Finish' : 'Next step'} <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                    <button className="btn-secondary flex-1" onClick={() => { resetDemoRun(); setAutoAdvance(false) }}>
                      <RotateCcw className="h-4 w-4" /> Reset
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card title="What this demonstrates" bodyClass="p-5">
            <ul className="space-y-2.5">
              {[
                'Explicit handoffs — each stage output is validated before the next stage starts',
                'Agent identity — named roles (Shruti, Anvesh, Lekha, Chitra) with canonical IDs',
                'Independent QA — GOV evaluates; producers cannot self-approve',
                'Human gates — client approval and clinical sign-off are never automated',
                'Honest simulation — publish/spend actions are labelled, never executed',
                'Audit trail — every transition is recorded with correlation IDs'
              ].map((t) => (
                <li key={t} className="flex items-start gap-2 text-xs leading-relaxed text-slate-600">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  {t}
                </li>
              ))}
            </ul>
          </Card>

          <div className="card p-4">
            <p className="text-xs font-semibold text-slate-700">Explore the live data</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link to="/workflows/WF-CLIENT-CONTENT-0001" className="btn-secondary !justify-start !text-xs">
                <Eye className="h-3.5 w-3.5" /> Open the workflow
              </Link>
              <Link to="/tasks" className="btn-secondary !justify-start !text-xs">
                <Lock className="h-3.5 w-3.5" /> Pending approvals
              </Link>
              <Link to="/agents" className="btn-secondary !justify-start !text-xs">
                <Sparkles className="h-3.5 w-3.5" /> Agent directory
              </Link>
              <Link to="/assurance" className="btn-secondary !justify-start !text-xs">
                <CheckCircle2 className="h-3.5 w-3.5" /> Audit trail
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}