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
youtube: bKLPgnaVpEI
pptx: True
potx: /Users/neil/lawrennd/lamd/lamd/includes/trent-reference.potx
docx: False
ipynb: False
talktheme: white
talkcss: trent.css
cover-image: diagrams/people/neil-portrait-trent.jpg
---

\newslide{AI safety - an accountability problem}

\slides{
> Accounting is the numbers. Accountability is the human authority and the judgment.
}

\notes{Alignment research, from utility maximisation through Constitutional AI and RLHF, treats safety as a property of a model. But today's systems are multi-agent teams embedded in operations. They plan, use tools, modify software, and execute business workflows. Multi-agent systems succeed because they absorb patterns from effective organisations: diverse perspectives, constructive disagreement, independent judgment, shared context, mechanisms for correction. The question is not why multiple agents perform better together. It is why they behave so much like organisations and what that implies for AI safety. At that point the question of authority becomes unavoidable. It stops being a property of the model and becomes a property of the organisation.}

\newslide{Agentic debt}

\slides{
> devolving authority without judgment undermines accountability and creates agentic debt
}


\notes{Long before large language models, organisational theorists wrestled with the same problem: how do you control a system too complex for any one person to fully understand? Stafford Beer's Viable Systems Model [@Beer:brainofthefirm72] gives an answer: authority is distributed downward while information is filtered upward. People closest to the work make local decisions. Only what requires intervention reaches leadership. Beer called this filtering process attenuation. The result is not less control, it is better control.}

\notes{This is where today's discussion around AI safety often falls short. Organisations are rapidly automating operational work using AI agents, but many assume that judgment can be automated alongside execution. AI is becoming exceptionally good at accounting — summarising logs, correlating alerts, generating reports, executing workflows at speed. But accountability remains fundamentally different. Someone must still own the decision. Someone must still carry the authority.}

\newslide{Augmented engineers}

\slides{> delegation requies undersanding, augmentation supplies understanding}

\notes{The Good Regulator Theorem [@Conant:goodregulator70] gives this idea mathematical teeth. The theorem tells us that every good regulator must contain a model of what it regulates. Humans naturally build these models, of each other, of the software and of the organisation they sit in. For the organisation this includes risk tolerance, previous incidents, customers, deadlines, the personalities of the people making decisions. Should a particular finding interrupt production? Should it be escalated? Is it noise or signal? These are contextual judgments.}

\notes{If we automate agentic operations without preserving the judgment layer, we remove the regulator that holds the model. The process continues; the model does not. The result is agentic debt: delegation without legible boundaries.}

\notes{The technical intervention is: make the judgment layer explicit. Separate it architecturally from automated execution. The AI-augmented engineer should receive the rendered judgment layer. Here is what the system is about to do, here is the decision it needs from you, here is the context to make it well. That is what Trent's platform delivers. The more autonomous AI systems become, the more valuable this judgment becomes — not less.}


\notes{The alignment framing asks: how do we make the AI safe? The organisational framing asks: how do we build the system so that human judgment remains structurally authoritative? The answer is not better value specification. It is engineering the judgment layer as a first-class architectural component.}

\thanks

\references
