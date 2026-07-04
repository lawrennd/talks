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
pptx: False
docx: False
ipynb: False
---

\section{A different question}

\newslide{Yesterday's question vs today's question}

\slides{
* Alignment framing: values, hallucinations, constraints — *important, but increasingly yesterday's questions*.
* Today: AI systems execute real workflows inside real organisations.
* AI safety stops being a machine learning problem and starts being an *organisational* one.
* The right question: **who has the authority to decide when the answer matters?**
}

\notes{The blog post "The Judgment Layer" opens with exactly this reframe, and it is the right place to start for this audience. Alignment research — from utility maximisation through Constitutional AI and RLHF — treats safety as a property of a model. But today's systems are multi-agent teams embedded in operations: they plan, use tools, modify software, and execute business workflows. At that point the question of authority becomes unavoidable. It is not enough to make the model produce the right answer; someone or something has to decide when the answer matters enough to act on. That decision is not a model property. It is an organisational one.}

\section{AI systems are starting to look like organisations}

\newslide{Multi-agent systems mirror human collaboration}

\slides{
* Multi-agent systems: specialised agents that critique one another, share context, coordinate.
* This is not an engineering trick — it mirrors how humans manage complexity: *collaboration*.
* These systems succeed because they absorb patterns found in effective organisations.
* **The interesting question**: why do they behave so much like organisations — and what does that tell us about safety?
}

\notes{One of the most striking developments of the past year is how much the architecture of capable multi-agent systems resembles human organisational structures. Diverse perspectives, constructive disagreement, independent judgment, shared context, mechanisms for correction — these improve both human decision-making and multi-agent AI systems. The question is not why multiple agents perform better together. The question is why they behave so much like effective organisations, and what that implies for AI safety. The answer lies in what organisations already know about managing complexity.}

\section{What organisations know about complexity}

\newslide{Viable Systems Model: authority down, signals up}

\slides{
* Authority distributed *downward*: people closest to the work make local decisions.
* Information filtered *upward*: only what requires intervention reaches leadership.
* Beer called this **attenuation** — the result is not less control; it is *better* control.
* The organisation manages complexity precisely because it recognises not every decision belongs at the top.
}

\notes{Long before large language models, organisational theorists were wrestling with the same problem: how do you control a system too complex for any one individual to fully understand? Stafford Beer's Viable Systems Model, developed in the 1970s, gives a remarkably simple answer: authority is distributed downward while information is filtered upward. People closest to the work make local decisions. Only the information requiring intervention reaches leadership.

Beer called this filtering process attenuation. The result is not less control — it is better control. The organisation becomes capable of managing complexity precisely because it recognises that not every decision belongs at the top. This is the structural logic that agentic AI systems must respect.}

\section{The missing piece}

\newslide{Accounting versus accountability}

\slides{
> "Accounting is the numbers. Accountability is the human authority and the judgment."

* Execution can be delegated to agents. The judgment that determines *what matters* cannot disappear.
* AI is becoming exceptional at accounting: summarising, correlating, generating, executing.
* Accountability remains fundamentally different — someone must still own the decision.
}

\notes{This is where today's discussion around AI safety often falls short. Organisations are rapidly automating operational work using AI agents. But many assume that judgment can be automated alongside execution. That assumption deserves scrutiny.

The operational work may well be delegated to agents. The judgment that determines what matters cannot simply disappear. The distinction between accounting and accountability is the crux: AI is becoming exceptionally good at accounting — summarising logs, correlating alerts, generating reports, executing workflows at extraordinary speed. But accountability remains fundamentally different. Someone must still own the decision. Someone must still carry the authority.}

\section{Why judgment matters}

\newslide{The Good Regulator Theorem}

\slides{
* **Good Regulator Theorem** (Conant & Ashby, 1970): every good regulator must contain a *model* of what it regulates.
* Humans naturally do this: not just the software, but the organisation, priorities, risk tolerance, history, people.
* Those models shape contextual judgments: interrupt production? Escalate? Noise or signal?
* These are not deterministic calculations — context is what organisations depend upon.
* **The more autonomous AI systems become, the more valuable this judgment becomes, not less.**
}

\notes{The Good Regulator Theorem argues that an effective regulator must contain a model of the system it regulates. Humans naturally build these models — not just of the software, but of the organisation: priorities, risk tolerance, previous incidents, customers, deadlines, and the personalities of the people making decisions.

Those models shape countless judgments every day. Should this finding interrupt production? Does this require executive attention? Is this genuinely critical, or simply noisy? These are not deterministic calculations. They are contextual judgments, and context is what organisations depend upon. When we automate agentic operations without preserving the judgment layer, we remove the regulator that holds the model. The process continues; the model does not.

The more autonomous AI systems become, the more valuable this judgment becomes — not less. That is the counterintuitive but correct conclusion from the VSM and Good Regulator frameworks.}

\section{The intervention}

\newslide{The judgment layer}

\slides{
* Judgment = decisions about *what to surface*, *how*, and *when* — inherently contextual.
* Automating without it makes it *invisible*, not absent: **agentic debt**.
* The intervention: make the judgment layer **explicit**, separate it from execution, deliver it to the human.
* The AI-augmented engineer holds authority; the system delivers the context to exercise it well.
}

\notes{The judgment layer is a distributed set of micro-interventions embedded in how work flows through an organisation: approval exceptions, escalation triggers, context-dependent waivers. None of it is written down. It lives in the experience of operators and in the patterns of who calls whom when something looks off.

When we automate with agentic AI, we inherit whatever judgment was embedded in the process. Because it was tacit, we do not know we inherited it, and we do not know when it breaks. The result is agentic debt: delegation without legible boundaries. Who can cause what action, on what evidence, with what recovery path?

The technical intervention is: make the judgment layer explicit. Separate it architecturally from automated execution. The AI-augmented engineer should receive not just a summary but the rendered judgment layer — here is what the system is about to do, here is the decision it needs from you, here is the context you need to make it well.

This is what Trent's platform delivers. The judgment layer is not a residual to be automated away; it is the structural location of human authority in a viable agentic system. That is where AI safety lives.}

\include{_ai/includes/judgment-layer-explicit.md}

\newslide{The one-sentence version}

\slides{
> We need the judgment layer separated, the authority of the AI-augmented engineer preserved, and the system built to deliver both.
}

\notes{Close here. The alignment framing asks: how do we make the AI safe? The organisational framing asks: how do we build the system so that human judgment remains structurally authoritative? The answer is not better value specification. It is engineering the judgment layer as a first-class architectural component — and that is the distinct technical contribution on offer.}

\thanks

\references
