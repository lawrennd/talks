---
title: "Agentic Security at Trent: From Judgment to Time-Bounded Delegation"
subtitle: "DOAgents, consistent reasoning limits, and the power of 'I don't know'"
abstract: |
  Building on our first Trent session, this short offsite talk focuses on one practical question: how do we scale agentic systems without ceding the institutional judgement layer that keeps decisions safe?

  We frame the challenge through three ideas: (1) Data-Oriented Agents (DOAgents) for networks of specialised agents, (2) the Consistent Reasoning Paradox and why robust systems need explicit "I don't know" behavior, and (3) agentic debt as the operational cost of delegation without bounded time, authority, and recovery paths.

  The proposal is pragmatic: each subtask in an agent graph receives a time budget and explicit termination policy. Agents either complete with evidence, escalate with "I don't know", or trigger human involvement. These budgets can be tuned empirically by balancing human interruption cost against compute waste and risk exposure.
author:
- family: Lawrence
  given: Neil D.
date: 2026-03-18
time: "10:45 GMT"
venue: "Trent AI Offsite"
layout: talk
geometry: ["a4paper", "margin=2cm"]
papersize: a4paper
transition: None
reveal: True
pptx: False
docx: False
ipynb: False
---

\section{Context and objective}

\newslide{Building on our previous Trent session}

\slidesincremental{
* Last time: explicit intent and shared context reduce misimplementation.
* This time: extend that logic from single assistants to *networks of agents*.
* Core question: how do we keep institutional judgement while scaling delegation?
}

\newslide{Security at machine speed}

\slidesincremental{
* Agentic systems turn language into *actions* (tools, APIs, workflows).
* Teams ship faster; attack surface and ambiguity both expand.
* The bottleneck shifts to judgement, coordination, and timely escalation.
}

\include{_ai/includes/institutional-tacit-knowledge-short.md}

\section{Architecture: DOAgents}

\newslide{DOAgents for agent networks}

\slidesincremental{
* Use a *data-oriented* interface between agents: shared state, explicit contracts, typed handoffs.
* Model work as subgraphs: retrieval, synthesis, planning, tool-use, verification.
* Analyse at the graph level, not just individual prompts.
}

\notes{This section draws on Christian Cabrera and collaborators' data-oriented architecture perspective: in production, robustness comes from making data and boundaries first-class. Here we apply that principle to networks of agents, where each node has scoped authority and each edge carries explicit evidence and constraints.}

\newslide{Why this helps Trent now}

\slidesincremental{
* Makes the judgement layer inspectable: what each agent saw, decided, and handed off.
* Enables selective autonomy: low-risk paths can run fast, high-risk paths route to review.
* Creates a foundation for measurable SLOs on security outcomes, not just latency.
}

\section{Reasoning limits and trust}

\newslide{Consistent Reasoning}

\slidesincremental{
* Assume an agent $R$ with two properties:
  Logical consistency
  $R$ never believes both 
  $P$ and 
  $\not P$.

* Trust in its own reasoning
  If 
  $R$ concludes something by valid reasoning, it believes that conclusion.

* This models an ideal thinker or reasoning AI.
}

\newslide{Consistent Reasoning Paradox (CRP)}

\slidesincremental{* The paradox shows that an agent that is:

* logically consistent

* fully reflective about its own reasoning

* perfectly trusting of its conclusions

* cannot maintain all those properties simultaneously.
}

\notes{Following @Bastounis-crp24, the practical lesson is not philosophical pessimism; it is engineering discipline. If a system cannot reliably discriminate when it is out of depth, "always answer" becomes a liability.}

\newslide{The missing primitive: "I don't know"}

\slidesincremental{
* Agents need an explicit *I don't know* action, not just low-confidence prose.
* "I don't know" must be operational: halt, escalate, or request additional evidence.
* This is a control primitive for safety, not a model weakness.
}

\section{Paying down agentic debt}

\include{_ai/includes/agentic-debt-short.md}

\newslide{Time-bounded delegation in DOAgent graphs}

\slidesincremental{
* Assign each node/subgraph a time budget $\tau_i$ and termination policy.
* At timeout: complete with evidence, or emit *I don't know* and escalate to human.
* Optional prompt augmentation: agents see remaining time and adapt search depth.
}

\notes{This is the key proposal: convert hidden judgement debt into explicit runtime policy. Every delegated decision has a clock, an evidence threshold, and a recovery route.}

\newslide{Choosing time budgets ($\tau_i$)}

\slidesincremental{
* Tune empirically from traces: success rate, escalation rate, and incident outcomes.
* Optimize expected cost: human interruption cost vs compute waste vs risk penalty.
* Different tasks need different $\tau_i$: triage may be short; remediation planning longer.
}

\newslide{20-minute takeaway}

\slidesincremental{
* Institutional tacit knowledge is the judgement layer; don't silently cede it.
* DOAgent-style graphs make delegation explicit, inspectable, and governable.
* "I don't know" + time-bounded escalation can convert agentic debt into managed risk.
}

\thanks

\references

