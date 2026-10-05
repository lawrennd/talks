---
title: "AI and Software"
subtitle: ""
abstract: |
  Software is at the frontier of change for AI.

  Drawing on *The Atomic Human*, this keynote starts by giving a clear model of what
  machine intelligence is and is not, then applies that model to the software
  industry: how generative systems alter information flows inside the firm,
  why superficial automation can hollow out expertise, and how intellectual
  and agentic debt accumulate when organisations ship faster than they can
  explain. The talk introduces the *judgment layer* — the organisational
  interface where human authority still owns consequence — and how we retain
  it in an age of AI-generated code. It closes with Trent, where we are
  putting that idea into practice for complex software systems.
author:
- given: Neil D.
  family: Lawrence
  url: http://inverseprobability.com
  institute: University of Cambridge
  twitter: lawrennd
  gscholar: r3SJcvoAAAAJ
  orcid: 0000-0001-9258-1030
date: 2026-11-17
time: "18:00"
duration: 30
venue: TBC, Central London
geometry: ["a4paper", "margin=2cm"]
papersize: a4paper
transition: None
pptx: True
potx: ../_includes/custom-reference.potx
reveal: True
---

<!--
LCORPORATE KEYNOTE
Event date: Tuesday 17 November 2026
Arrive: no later than 17:30 | Speak: 18:00 | Leave: ~20:00
All timings TBC. Venue TBC, Central London.

AUDIENCE:
- 100+ software CEOs, founders, senior executives
- Private equity investors and investment bankers
- Across the technology ecosystem

BRIEF:
- 30-minute keynote: impact of AI on software businesses
- How AI is reshaping SaaS and how it may evolve
- Followed by up to 30 minutes Q&A
- Subject to be refined on briefing call (Paula Nieuwoudt, LSB)

CONSTRAINTS:
- Dress: Business
- Travel: speaker arranges and pays (included in fee)
- Tech: client provides and pays for equipment
- Recording: NO audio/video (incl. back projection) without prior
  consent of London Speaker Bureau / Speaker

TALK STRUCTURE (30 minutes + up to 30 Q&A):
============================================================
0:00–0:03   Opening and framing for software leaders
0:03–0:11   Part 1: What AI is (and isn't) for software businesses
0:11–0:20   Part 2: How AI is reshaping SaaS
0:20–0:26   Part 3: Evolution — HAMs, debt, and the judgment layer
0:26–0:30   Close: Trent and the judgment layer in practice
0:30–1:00   Q&A

JUDGMENT LAYER / TRENT THREAD (from Agentic AI Summit, Berkeley 2026):
- Safety/advantage become organisational: who decides when the answer matters?
- Good Regulator: judgement must still model what it oversees
- Automating without preserving judgment → agentic debt
- Intervention: make the judgment layer explicit; deliver it to the
  AI-augmented engineer — that is what Trent builds

FT THREAD:
- Op-ed (Dec 2024): AI cannot replace the atomic human
  https://www.ft.com/content/6ac0ad1b-29b4-4f43-a4ce-be209649c316
- Letter (May 2026): AI arrives workflow by workflow / software group valuation
  https://www.ft.com/content/75ebaeb0-e250-4030-93b9-25fb517109ca

OPTIONAL CUTS (if briefing shortens the slot):
- Skip baby-shoes (save ~2 min)
- Collapse productivity + attention flywheel into one beat (save ~2 min)
- Drop Horizon to a single cautionary note (save ~2 min)
- Shorten Part 1 embodiment to celsius only (save ~2 min)
- Keep Good Regulator to one slide if Part 3 runs long (save ~2 min)
- Show FT op-ed image only (skip letter slides) if over time (save ~2 min)

POST-BRIEFING TODO:
- Confirm venue, exact title, and any client framing
- Confirm whether PPTX handoff is required and by when
- Tune Part 2 examples to any verticals the client emphasises
- Confirm how much Trent product detail is appropriate for this room
-->

\section{Opening: Software Advantage When Code Gets Cheap}

\notes{Welcome. Thirty minutes on how AI is reshaping software businesses —
and where advantage will sit as the cost of producing software falls.
I will keep this practical for founders, CEOs, and investors: what to
automate, what not to, and what debt you accumulate if you get the
balance wrong. The through-line is the *judgment layer*: the part of the
organisation that still owns consequence when machines act. I will end
with how we are building for that at Trent. Happy to go deeper in the
Q&A that follows.}

\newslide{Today's Arc}

\slidesincremental{
* What AI is — and what it is not
* How AI is reshaping SaaS
* The judgment layer — and what we are building at Trent
}

\notes{Three beats. First, a model of machine versus human intelligence —
without it, SaaS strategy drifts into hype. Second, what that means for
software businesses today: product, delivery, and organisational design.
Third, how the industry evolves when agents act: the judgment layer must
become explicit, or agentic debt accumulates. I close with Trent — where
we put that architecture into practice.}

\section{Part 1: What AI Is (and Isn't) for Software Businesses}

\define{noSlideTitle}
\include{_ai/includes/henry-ford-intro.md}
\include{_atomic-human/includes/artificial-general-vehicle-diagram.md}
\include{_ai/includes/the-atomic-eye.md}
\undef{noSlideTitle}

\include{_ai/includes/embodiment-factors-celsius.md}
\include{_ai/includes/embodiment-factors-walking-vs-light.md}

\define{noSlideTitle}
\include{_ai/includes/conversation-tedx.md}
\include{_ai/includes/baby-shoes.md}
\undef{noSlideTitle}

\include{_economics/includes/homo-atomicus.md}

\notes{For software businesses, the Atomic Human is a strategy filter. If a
capability is easily automated — code generation, boilerplate support,
routine analytics — it will not remain a durable differentiator. Advantage
concentrates in what remains irreducibly human: product judgment under
uncertainty, customer trust, category creation, and the organisational
culture that turns software into a business.}

\newslide{Implication for SaaS}

\slidesincremental{
* AI commoditises *production* of many software artefacts
* It does not create the *judgment layer*
* Durable advantage sits where humans still own consequence
}

\notes{The industry is discovering that generating software is becoming
cheaper and faster. That is not the same as knowing which software to
build, for whom, and with what accountability when it fails. The
judgment layer is that accountability: the organisational interface
where human authority still decides. Investors should separate companies
that use AI to ship more of the same from those that redesign the
business around a legible judgment layer.}

\section{Part 2: How AI Is Reshaping SaaS}

\notes{The SaaS model was built on recurring revenue for software that was
expensive to write, hard to copy, and delivered through a subscription
relationship. Generative AI attacks the first two assumptions and
stresses the third.}

\define{noSlideTitle}
\include{_economics/includes/philosophers-stone.md}
\undef{noSlideTitle}

\include{_ai/includes/the-great-ai-fallacy.md}

\include{_economics/includes/the-attention-economy.md}
\include{_economics/includes/herbert-simon-information.md}

\define{noSlideTitle}
\include{_data-science/includes/new-flow-of-information.md}
\undef{noSlideTitle}

\include{_business/includes/information-flow-structures.md}
\include{_business/includes/the-api-mandate-bezos.md}

\notes{SaaS companies are information businesses. AI changes the topography
of that information: more throughput, more interfaces, more automation
of the middle of the stack. The Bezos API mandate is a useful reminder
that when interfaces proliferate without clear ownership, the
organisation fragments. Software firms that treat AI as a feature bolt-on
will feel that fragmentation first.}

\subsection{Intellectual Debt in Software Organisations}

\include{_ai/includes/intellectual-debt-short.md}

\notes{Technical debt is familiar to every software CEO. Intellectual debt
is the cousin that AI accelerates: systems that work, ship, and bill —
but that nobody can fully explain. In a SaaS context that shows up as
model-driven pricing, support bots, recommendation engines, and agentic
workflows whose failure modes are opaque to the customer and to the
board.}

\subsection{Where Superficial Automation Fails}

\include{_business/includes/superficial-automation.md}
\include{_ai/includes/atrophy-and-cognitive-flattening.md}

\notes{Much of the current SaaS AI wave automates the visible surface —
ticket summaries, CRM notes, code autocomplete — while leaving the
underlying decision problem untouched. Done well, that frees attention.
Done badly, it flattens cognition inside the firm: juniors stop learning,
seniors stop reviewing, and the company loses the expertise that made
the product valuable.}

\include{_business/includes/the-innovators-dilemma.md}

\notes{Incumbent SaaS firms face Christensen's dilemma in a new form. Their
processes are optimised for a world where software was scarce. AI makes
software abundant. The firms that win will not simply add AI features to
existing suites; they will rethink packaging, pricing, and the human
work that surrounds the product.}

\subsection{A Warning on Trust}

\include{_software/includes/horizon-scandal.md}

\notes{Horizon is not a SaaS story, but it is a software story. When
organisations subordinate human judgment to system outputs, trust
collapses. For B2B software businesses selling into regulated or
mission-critical environments, intelligent accountability is part of
the product — not a compliance afterthought. Horizon is what happens
when the judgment layer is present on paper but absent in practice.}

\section{Part 3: How the Industry May Evolve}

\notes{Looking forward, the important shift is not that machines become
digital humans. It is that human-analogue machines change the interface
between people and software — and therefore the shape of the firm.}

\newslide{From Features to Interfaces}

\slidesincremental{
* Generative AI as a human-analogue machine (HAM)
* Information amplifier — not a substitute for judgment
* Old org charts and pricing models become obsolete
}

\include{_ai/includes/processor-ham.md}
\include{_data-science/includes/new-flow-of-information-ham.md}

\include{_business/includes/the-productivity-flywheel.md}
\include{_business/includes/attention-flywheel.md}

\notes{Classical SaaS flywheels reinvest capital into sales and R&D. In the
AI era the scarce input is human attention — of your engineers, your
customers, and your operators. Firms that free attention and then waste
it on more shallow automation will not compound. Firms that reinvest
attention into judgment, relationships, and new product categories will.}

\include{_business/includes/ft-op-ed.md}

\notes{The FT piece — *AI cannot replace the atomic human* — is the shortest
public statement of this point. Attempting to measure human capital poses a
productivity paradox: what machines can quantify, they can automate. The
remainder that matters for software businesses is judgment, trust, and care
for the customer problem — the atomic human contribution that does not
inflate away.}

\include{_ai/includes/agentic-debt-short.md}

\notes{Agentic systems — systems that can act inside workflows — may pay
down technical and intellectual debt. They can also create agentic debt:
delegation without clear authority, evidence, or recovery. For software
CEOs and their investors, the governance question becomes: who or what
can cause what action, on what basis, with what stop-condition?}

\subsection{The Judgment Layer}

\notes{This is the pivot. Once agents execute real workflows, advantage and
safety stop being model properties and become organisational ones. The
right question is not how to make the model produce the right answer. It
is who has the authority to decide when the answer matters.}

\include{_ai/includes/judgment-layer-explicit.md}
\include{_ai/includes/good-regulator-model-minimisation.md}

\notes{The Good Regulator theorem makes the constraint precise: every good
regulator must contain a model of what it regulates. Humans model not
just the software but the organisation — priorities, risk, history,
customers, people. Automating without preserving that judgment makes it
invisible, not absent. That invisibility is agentic debt. The more
autonomous AI becomes, the more valuable this judgment becomes — not
less.}

\newslide{Strategic Priorities for Software Leaders}

\slidesincremental{
* People first, not model first
* Make the judgment layer *explicit* in product and ops
* Keep human authority where consequence lives
* Watch for intellectual *and* agentic debt
}

\newslide{What will evolve in SaaS}

\slidesincremental{
* Production of software gets cheaper; *judgment* gets scarcer
* Seat-based pricing under pressure as agents multiply work
* Moats shift toward data, distribution, trust, and domain judgment
* Winners redesign the firm around a legible judgment layer
}

\notes{A short forward look for the room. As code generation and workflow
automation spread, the marginal cost of software production falls. That
pressures seat-based SaaS economics and elevates everything around the
code: proprietary data, distribution, customer trust, and the judgment
to know what should be built — and when to halt. Private equity and
founders should underwrite the judgment layer as carefully as the model
layer.}

\include{_business/includes/ft-letter-workflow-by-workflow.md}

\notes{The FT letter is aimed at this room. Markets err when they value
software groups as if AI were one centralised programme. Value arrives
workflow by workflow, in the hands of people who understand the work. That
is another way of saying: protect and productise the local judgment layer —
do not assume the centre can create the operational change once for all.}

\include{_books/includes/the-atomic-human.md}

\section{Close: Trent and the Judgment Layer in Practice}

\notes{I will close with what we are building. The argument of this talk is
not only diagnostic. At Trent we treat the judgment layer as a
first-class architectural component — separating it from automated
execution and delivering it to the AI-augmented engineer.}

\include{_business/includes/why-start-trent.md}

\newslide{What Trent Delivers}

\slidesincremental{
* Make the judgment layer *explicit* — not buried in tacit ops
* Preserve authority of the AI-augmented engineer
* Delegate with evidence, time bounds, and recovery paths
* Pay down agentic debt instead of accumulating it
}

\notes{Drawing on the line from the Agentic AI Summit: we need the judgment
layer separated, the authority of the AI-augmented engineer preserved,
and the system built to deliver both. That is the organisational framing
of AI safety — and, for software businesses, of durable advantage. Trent
works with people who are close to complex systems, addressing pain
points now while holding a view on the long-term redesign of information
systems under agentic AI.}

\newslide{Takeaways}

\slidesincremental{
* AI commoditises many software artefacts — not the judgment layer
* Advantage sits in attention, trust, and *legible* human authority
* Intellectual and agentic debt are balance-sheet risks
* Build so judgment remains structurally authoritative — as we are at Trent
}

\newslide{Questions}

\slides{
* Where is your judgment layer today — and is it legible?
* Where is agentic debt already accruing in the product?
* How does your pricing survive when agents do the work?
}

\notes{Open for Q&A. Prefer concrete product, pricing, and diligence
examples from the room. Useful threads: seat vs outcome pricing;
build-vs-buy for models; how PE diligence should treat AI features;
where customer trust breaks when agents act on a user's behalf; how to
make escalation / "I don't know" a first-class product behaviour.}

\thanks

\references
