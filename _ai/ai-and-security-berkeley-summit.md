---
title: "Viable Systems, Judgment, and AI Safety"
subtitle: "Rethinking AI safety for agentic systems"
abstract: |
  AI safety has been framed as an alignment problem — values, hallucinations,
  constraints. Those are important questions, but they are increasingly
  yesterday's questions. Today's AI systems are teams of collaborating agents
  embedded in real business workflows. Safety stops being solely a machine
  learning problem and becomes an organisational one. The right question is
  not how to make a model produce the right answer; it is who has the authority
  to decide when the answer matters. Organisational theory solved the complexity
  side of this fifty years ago: the Viable Systems Model and the Good Regulator
  Theorem tell us that authority must devolve to where the model of the
  situation lives. Automating agentic operations without preserving that
  authority creates agentic debt — delegation without legible boundaries.
  The technical intervention is making the judgment layer explicit and
  delivering it to the AI-augmented engineer.
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
pptx: True
potx: /Users/neil/lawrennd/lamd/lamd/includes/trent-reference.potx
docx: False
ipynb: False
talktheme: white
talkcss: ../trent.css
cover-image: ../../slides/diagrams/people/neil-trent-portrait.jpg
---

\newslide{AI safety is becoming an organisational problem}

\slides{
* Alignment framing: values, hallucinations, constraints — *yesterday's questions*.
* Today: AI systems execute real workflows inside real organisations.
* The right question: **who has the authority to decide when the answer matters?**
}

\notes{Alignment research — from utility maximisation through Constitutional AI and RLHF — treats safety as a property of a model. But today's systems are multi-agent teams embedded in operations: they plan, use tools, modify software, and execute business workflows. Multi-agent systems succeed because they absorb patterns from effective organisations: diverse perspectives, constructive disagreement, independent judgment, shared context, mechanisms for correction. The question is not why multiple agents perform better together. It is why they behave so much like organisations — and what that implies for AI safety. At that point the question of authority becomes unavoidable. It is not a model property. It is an organisational one.}

\newslide{What organisations already know}

\slides{
* **Viable Systems Model** (Stafford Beer, 1972): authority *down*, signals *up*.
* Beer called this **attenuation** — not less control, *better* control.
* > "Accounting is the numbers. Accountability is the human authority and the judgment."
* AI excels at accounting. Accountability is different — someone must still own the decision.
}

\notes{Long before large language models, organisational theorists wrestled with the same problem: how do you control a system too complex for any one person to fully understand? Stafford Beer's Viable Systems Model gives a simple answer: authority is distributed downward while information is filtered upward. People closest to the work make local decisions. Only what requires intervention reaches leadership. Beer called this filtering process attenuation. The result is not less control — it is better control.

This is where today's discussion around AI safety often falls short. Organisations are rapidly automating operational work using AI agents, but many assume that judgment can be automated alongside execution. AI is becoming exceptionally good at accounting — summarising logs, correlating alerts, generating reports, executing workflows at speed. But accountability remains fundamentally different. Someone must still own the decision. Someone must still carry the authority.}

\newslide{The judgment layer}

\slides{
* **Good Regulator Theorem** (Conant & Ashby, 1970): every good regulator must contain a *model* of what it regulates.
* Humans model not just the software but the organisation: priorities, risk, history, people.
* Automating without preserving judgment makes it *invisible*, not absent — **agentic debt**.
* The intervention: make the judgment layer **explicit**; deliver it to the AI-augmented engineer.
* *The more autonomous AI becomes, the more valuable this judgment becomes — not less.*
}

\notes{The Good Regulator Theorem makes precise why judgment cannot be automated away: every good regulator must contain a model of what it regulates. Humans naturally build these models — not just of the software, but of the organisation: priorities, risk tolerance, previous incidents, customers, deadlines, the personalities of the people making decisions. Should this finding interrupt production? Escalate? Is this noise or signal? These are not deterministic calculations. They are contextual judgments.

When we automate agentic operations without preserving the judgment layer, we remove the regulator that holds the model. The process continues; the model does not. The result is agentic debt: delegation without legible boundaries.

The technical intervention is: make the judgment layer explicit. Separate it architecturally from automated execution. The AI-augmented engineer should receive the rendered judgment layer — here is what the system is about to do, here is the decision it needs from you, here is the context to make it well. That is what Trent's platform delivers. The more autonomous AI systems become, the more valuable this judgment becomes — not less.}

\newslide{}

\slides{
> We need the judgment layer separated, the authority of the AI-augmented engineer preserved, and the system built to deliver both.
}

\notes{The alignment framing asks: how do we make the AI safe? The organisational framing asks: how do we build the system so that human judgment remains structurally authoritative? The answer is not better value specification. It is engineering the judgment layer as a first-class architectural component.}

\thanks

\references
