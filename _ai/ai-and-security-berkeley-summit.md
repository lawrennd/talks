---
title: "Viable Systems, Judgment, and AI Safety"
subtitle: "What Stafford Beer knew that alignment research forgot"
abstract: |
  Classical AI alignment assumes we can specify values and goals upfront.
  The Viable Systems Model and the Good Regulator Theorem suggest otherwise:
  control requires variety matching, authority must devolve to context,
  and the controlling entity must contain a model of what it controls.
  Automating operations without preserving the judgment layer — the
  distributed, contextual decisions about what to surface, how, and when
  — creates agentic debt: delegation without authority or authorship.
  The technical intervention is not better value specification; it is
  making the judgment layer explicit and delivering it to the
  AI-augmented engineer.
author:
- family: Lawrence
  given: Neil D.
  institute: Trent.AI and University of Cambridge
date: 2026-08-01
venue: "Agentic AI Summit 2026, UC Berkeley"
layout: talk
geometry: ["a4paper", "margin=2cm"]
papersize: a4paper
transition: None
reveal: True
pptx: False
docx: False
ipynb: False
---

\section{The control problem}

\newslide{What Beer knew}

\slides{
* **Viable Systems Model** (Stafford Beer, 1972): a system survives only if its internal variety *matches* the variety of its environment.
* **Good Regulator Theorem** (Conant & Ashby, 1970): every good regulator of a system must contain a model of that system.
* Corollary: authority must *devolve* to where the model lives; signals must *attenuate* upward.
}

\notes{The Viable Systems Model is Stafford Beer's account of how organisations stay viable under complexity. Its central claim is Ashby's Law of Requisite Variety: only variety can absorb variety. A simple controller cannot govern a complex system; the controller must match the complexity of what it governs.

The Good Regulator Theorem (Conant and Ashby 1970) is the formal version of this intuition: every good regulator of a system must contain a model of that system. This has a direct implication for where authority must live. The model must be close to the context it models — which means authority devolves down, toward the people and systems that hold local knowledge, and signals attenuate upward, with only what matters reaching higher-level oversight.

This is the technical prior. It was worked out fifty years ago for industrial management. It is directly applicable to the current agentic AI moment.}

\section{Where alignment goes wrong}

\newslide{The alignment gap}

\slides{
* Classical alignment: specify correct values/goals, the system pursues them.
* The VSM critique: values are *context-dependent*; the model must live at the point of action.
* Automating operations without the judgment layer = delegation without authority.
* **Agentic debt**: accrued risk from workflows that act without legible boundaries.
}

\notes{Classical AI alignment research — from utility maximisation through to Constitutional AI and RLHF — shares an implicit assumption: that we can specify, at training or deployment time, the values or goals that should govern the system's behaviour. The VSM critique is that this misunderstands where control actually lives.

In a viable organisation, the regulator at each level holds a model of its domain. The model is not a specification handed down from above; it is built from local context, tacit norms, exception handling, and accumulated judgment. When you automate an operational workflow, you are not automating a specification — you are automating a context-sensitive process in which human judgment was doing work that no one wrote down.

The result is agentic debt. Not technical debt (shortcuts in engineering) or intellectual debt (complexity in well-engineered systems), but a third kind: delegation without crisp authority boundaries. Who can cause what action, on what evidence, with what recovery path? When the answer is unclear or implicit, debt accumulates.

This is an AI safety problem, not just an operations problem. The risk is not that the system pursues the wrong objective. The risk is that the judgment about what constitutes the right objective in this context, at this moment, has been silently removed from the loop.}

\include{_ai/includes/agentic-debt-short.md}

\section{The intervention}

\newslide{The judgment layer}

\slides{
* Judgment = decisions about *what to surface*, *how*, and *when*: inherently contextual.
* Make the judgment layer **explicit**: extract it, formalise it, deliver it.
* Separate the judgment layer from automated execution.
* The AI-augmented engineer holds authority; the system delivers the context to exercise it well.
}

\notes{The judgment layer is not a single decision point. It is a distributed set of micro-interventions: approval exceptions, escalation triggers, context-dependent waivers. In a security context — which is where this summit sits — it is the accumulated knowledge of which alerts are usually noise, which anomalies are fine because of a known upstream cause, which deviations warrant a halt.

When we automate with agentic AI, we inherit whatever judgment was embedded in the process. But because it was tacit, we do not know we inherited it, and we do not know when it breaks.

The technical intervention is: make the judgment layer explicit. Separate it architecturally from automated execution. The AI-augmented engineer — the human-in-the-loop who holds contextual authority — should receive not just an alert or a summary but the rendered judgment layer: here is what the system is about to do, here is the decision it needs from you, here is the context you need to make it well.

This is what Trent's platform delivers. The judgment layer is not a residual to be automated away; it is the structural location of human authority in a viable agentic system.}

\include{_ai/includes/judgment-layer-explicit.md}

\newslide{The one-sentence summary}

\slides{
> We need the judgment layer separated, the authority of the AI-augmented engineer preserved, and the system built to deliver both.
}

\notes{Close with the operational claim. Classical alignment asks: how do we make the AI safe? The VSM framing asks: how do we build the system so that human judgment remains structurally authoritative? The answer is not better value specification. It is engineering the judgment layer as a first-class component of the architecture.

If the team delivers the technical implementation before the talk, the third section can describe that concretely. If not, the VSM framing is itself the distinct technical contribution: a fifty-year-old control theory that predicts exactly where current agentic AI safety approaches will fail.}

\thanks

\references
