---
title: "AI for Science"
subtitle: "Paradigms, tacit knowledge, and scientific agency in the age of large models"
abstract: |
  AI is changing how science is practiced: from data analysis and surrogate modelling to the use of large, general-purpose models as scientific assistants that can read, write, code, and coordinate work.

  This opening lecture frames the workshop's core questions as questions about *where knowledge lives*, *what we mean by understanding*, and *how we preserve scientific agency* when useful models are not fully intelligible. We'll build on Popper/Kuhn perspectives on scientific progress, and outline questions for an AI-for-science "playbook" with particular focus on the ideas of tacit knowledge and "agentic debt".
author:
- family: Lawrence
  given: Neil D.
  institute: University of Cambridge and Trent.AI
- family: Lillicrap
  given: Timothy
  institute: Google DeepMind
date: 2026-03-15
venue: Bellairs Workshop on AI for Science
layout: talk
geometry: ["a4paper", "margin=2cm"]
papersize: a4paper
transition: None
reveal: True
pptx: False
docx: False
ipynb: False
---


\include{_ai/includes/rabbit-in-headlights.md}

\subsection{A Provocation}

\notes{With that in mind perhaps it's worth delivering the following provocation.}

> Science is kind of like a rabbit in the headlights of the Deep Learning Machine waiting to be flattened.

\notes{Or are we actually already in the middle of the flood. And if so, where is the high ground?}

\subsection{Questions}

\slidesincremental{
* Where do scientific paradigms live? 
* What role does human understanding and agency play?
* What's an emerging playbook for AI-for-science?
}

\notes{As a way of triggering reflection for this workshop we thought to start with three questions. They are:

1. Where do scientific paradigms live as knowledge moves from books/equations into code, simulators, and large models?
2. What role should human understanding and agency play when we can use models we don't fully understand?
3. What’s an emerging playbook for AI-for-science* and what tools will we depend on?}



\notes{To start exploring we'll look at some ideas from the philosophy of science, starting with Thomas Kuhn.}

\include{_books/includes/the-structure-of-scientific-revolutions.md}

\notes{Kuhn's idea that science iterates between normal science (or puzzle solving) and paradigm shifts which change the fundamental assumptions that underpin our scientific ideas. Kuhn was writing in 1962 and he argued that at that time our paradigm was stored in text books. Even before the advent of AI, our modern information infrastructure has shifted, to the extent that one can argue that today our paradigm is (also) stored in computers, through simulations, databases etc..}


\newslide{Some prompts}

\slidesincremental{
* Paradigms: shift in *science* or in *underpinning information infrastructure*?
* Understanding: what do we still demand (and from whom)?
}

\notes{This leads to a provocation as to whether we are experiencing a paradigm shift in science, or more structurally a paradigm shift in the way our scientific paradigms are stored and shared. A fundamental change in the underpinning information infrastructure.}

\include{_books/includes/conjectures-and-refutations.md}

\subsection{Qualitative vs Quantitative}

\newslide{Qualitative vs Quantitative}

\slidesincremental{
* Questions we care about are often *qualitative* (meaning, values, lived outcomes).
* Questions we can  test are often *quantitative* (metrics, averages, effect sizes).
* AI may help bridge this gap by turning language and practice into analysable data.
}

\notes{Historically questions can be split into two types. Qualitative questions and quantitative questions. Arguably most of the questions we truly care about are qualitiative, "How can I live a happier life?", "How can I do more good in the world?", "Will this drug make me healthier?". But in practice the questions we answer scientifically tend to be quantitative. "Which jobs have the highest income?", "What is the GDP/capita of Kenya?", "Does this drug give an average life extension of greater than 6 months?". }

\notes{This new generation of AI seems in some ways to bridge the qualitative/quantitive gap. Firstly, language can now be used directly as data, perhaps allowing us to bring a more quantitative approach to what were formerly qualitative questions. But secondly traditional techniques in social science that are based on interviews or transcripts (e.g. grounded theory) could be made more scalable with the use of AI technologies. For example, automatic transcription and/or assisted coding.}

\subsection{Coding and Creatives}

\newslide{Coding and Creatives}

\slidesincremental{
* Go back go ICML 2015 Deep Learning Workshop
* Try to imagine a technology with mass impact on *coding* and *creative work*.
}

\notes{Just to contextualise for a moment, imagine we have stepped back to that ICML workshop 11 years ago where I made that quote. I think one thing that would have suprised us is the effect of that Tsunami. Up until last year at least it feels like the main direct societal effect was on *coding* and *creatives*. Although I have some sense of why that is (you might have your own answers), I think I would have found that very difficult to predict, or indeed to have imagined any technology that has a major effect on those two areas.}

\newslide{Crossing fields: recovering the "totality" of science}

\slidesincremental{
* Struggle *whole* of science across fields and institutions.
* LLM interfaces lower cost of moving across disciplines
* Increase the risk of "plausible" error.
* Main skill: *skepticism*
}

\notes{Even before modern AI, specialisation plus scale meant no one could hold the whole map of science in their head.
Today, tools can make cross-field exploration easier: you can ask a model to summarise, translate notation, find relevant papers, draft code, or suggest plausible mechanisms.
But the failure mode is also cross-field: confident-sounding claims without the embodied judgement that comes from living inside a discipline [@Narayanan-ai25; @Kwon-scientists25; @Ogrady-lowquality25].}

\speakernotes{We’ll unroll each into a few concrete “design questions” that show up repeatedly in AI-for-science systems.}


\newslide{AI-for-science framework: three lenses}

\slidesincremental{
* *Task capabilities*: what the model can do (predict, reason, generate, control) [@Krenn-scientific22; @Bommasani-foundation21].
* *Workflow needs*: where value appears (hypothesis, design, analysis, writing, coding) [@Berman-use24; @Arranz-trends23; @ERC-use23].
* *Context constraints*: data, compute, latency, validation culture, uncertainty tolerance [@Duarte-fast18].
* See @Cranmer-science26 (in review).
}

\notes{This framing is meant to reduce the "AI for science" hype conflation by separating three different questions we often mix together. First, what can a model technically do (task capability)? Second, where in scientific practice does it add value (workflow need)? Third, what constraints make deployment viable in a given field (context constraints)? The same model can look transformative in one workflow and marginal in another; likewise, a method that works in one domain can fail in another because validation, latency, compute, or uncertainty tolerance differ. The practical aim is better matching: align capabilities to scientific questions and local constraints, rather than assuming a general model gives general scientific benefit.}

\newslide{The science gap: pattern matching vs mechanism}

\slidesincremental{
* ML is strong at *pattern extraction* and function approximation.
* Science needs *mechanism*: why, when, and under what interventions.
* So many deployments are still *guess-and-verify* pipelines.
* Key question: when is prediction enough, and when do we require explanation? [@Bender-dangers21; @Pearl-causality18].
}

\notes{The "science gap" is the distance between statistical competence and scientific understanding. Pattern matching can produce accurate predictions, but scientific reasoning usually asks for mechanistic structure: what would happen under interventions, out-of-distribution conditions, or policy-relevant counterfactuals. In practice this leads to a guess-and-verify loop: models generate candidates, experiments filter them. That can still be useful science, but it shifts where understanding lives and where cost sits. The key point here is not that prediction is bad, but that prediction and explanation are different epistemic products, and we should be explicit about which one a workflow is optimising for.}

\newslide{Technical priorities for scientific AI}

\slidesincremental{
* *Causality*: distinguish correlation from interventionally robust structure [@Pearl-causality18; @Scholkopf-causality22].
* *Abstraction*: discover useful intermediate scales and effective theories [@Anderson-more72; @Jaynes-information57].
* *Simulation*: hybrid mechanistic + learned systems with explicit validity regimes [@Cranmer-frontier20; @Oreskes-verification94].
}

\notes{These three priorities are an agenda for making AI more scientific. Causality asks whether models can support intervention and policy reasoning, not only retrospective fit. Abstraction asks whether AI can help discover the right intermediate representations across scales, where many scientific breakthroughs occur. Simulation asks how to combine mechanistic structure with learned components so we retain physical plausibility while gaining flexibility and efficiency. Together they move us from "high-performing predictor" toward "scientific instrument": a system that is useful, interrogable, and bounded by clear validity conditions.}

\section{To Tim}

\subsection{To Tim}

* Perhaps: "what is science?" as prediction, explanation, and control.
* Perhaps: where control/RL intuitions shift how we evaluate models.
* Perhaps: how model classes connect (equations, effective statistical models, ML systems).

\subsection{What is science for?}

* **Prediction**: what will happen?
* **Explanation**: why does it happen?
* **Control/Design**: how do we intervene to get desired outcomes?
* Different fields weight these differently; AI changes the balance.

\subsection{Model types in science}

* **Mechanistic** models: equations from domain theory.
* **Effective/statistical** models: coarse-grained abstractions (e.g., stat mech style summaries).
* **Learned** models: ML/DL surrogates and pattern extractors.
* Practice is hybrid: compose all three with clear verification boundaries.


\newslide{First Wave of ML: Prediction}

\slidesincremental{
* *A model family* $f_\theta$ that maps inputs to outputs.
* *A learning objective* that scores how well $f_\theta$ matches data (and priors/constraints).
* *Optimisation + scale*: we fit $\theta$ with large compute and large datasets.
}

\notes{In the first wave of ML in science we've seen the increasing use of ML/statistical models for prediction. Here we fit a function $\f_\theta$ on the basis of a large data set or a simulation (statistical emulation/surrogate modelling). This allows us to explore that simulation or data through the model we've created and the predictions it makes.}

\notes{Examples include AlphaFold and data-driven weather forecasting systems [@Jumper-alphafold21; @Allen-weather25], as well as materials discovery [@Merchant-scaling23].}

\newslide{Prediction Examples}

\slidesincremental{
* AlphaFold
* GraphCast/Aardvark
}

\newslide{Generalist Models}

\notes{Over the last decade we've seen the emergence of new "generalist" or foundation models. Starting with image recognition we found we could fine-tune models trained on one image data set and transfer their capabilities to other data sets.}


\newslide{Generalist Examples}

\notes{The same thing proved true of language once we'd developed transformer architectures and large language models.}

\slides{
* ImageNet
* BERT
* Chat interfaces
* Polymathic
}

\newslide{Physics foundation models}

\slidesincremental{
* If the training data are *rigorous equations* (PDE/ODE solvers), we have a clearer sense of "ground truth".
* These models may not map onto human intuitions — but they can still be scientifically *useful*.
* That makes physics a promising sandbox for a *science of AI*: what is learned, what generalises, and how do we verify?
}

\notes{A "Polymathic"-style model trained on differential equations is interesting because it shifts the discussion.
In many domains we can’t even agree what the canonical "ground truth" representation is; in physics we often can.
That creates a rare opportunity: we can evaluate generalisation against known structure, probe failure modes, and ask whether the learned representations correspond to anything mechanistic or merely operationally effective.}

\notes{At the extreme end of fine tuning these large language models can now be directed by prompting, or setting a context. These models are built to emulate human intelligence by reconstructing what humans might have said. They are augmented by code and maths problems in a process I think of as "vulcanisation"[^vulcanisation].

[^vulcanisation]: not the sulphur and heat treatment of rubber, but the transformation into intelligences which are more like Dr Spock.}

\subsection{Break (15 mins)}

* Return for delegation, tacit knowledge, and verification boundaries.


\notes{Suggested break after Tim's first block. Re-start by recapping the prediction/explanation/control lens and move into accountability.}

\subsection{The Unreasonable Effectiveness of Orchestration}

\notes{The most recent trend is orchestration of these different parts through chat interfaces. Unsurprisingly, since these models are emulating a form of human intelligence, like humans they are more effective when working in a team. But these teams also are given tool calling abilities which allows them rapid access to the information infrastructure. That is leading to the unreasonable effectiveness of agents.}

\slidesincremental{
* LLMs emulate human behaviour
* Unsurprising that the work better "in collaboration"
* Also with rapid access to information infrastructure.
}

\newslide{Agent Examples}

\slidesincremental{
* Denario 
* Claude Code
* Codex
}

\notes{That means that an additional pattern is emerging, its no longer just prediction[^prediction] but \emph{delegation} and this raises new questions about our processes in Science.

[^prediction]: Well arguably under the hood it's still just prediction ... but prediction over data set sizes that we find unimaginable by models with billions of parameters.}

\subsection{What are we Delegating?}

\notes{A distinction that I don't think was relevant for Popper when writing in 1963 was whether it matters that we understand where conjectures are coming from and we have an intuition about why they might work. At the time it might still have seemed fanciful for a machine to be so high powered that it could be used for (perhaps exhaustively) exploring and generating hypotheses. Whereas today that seems feasible, particularly for orchestrated sytems of agents.}

\notes{This separation might be summarised as "science as technology" where we are using science to create new materials or drugs that we can empirically show are effective, even if we don't understand why. Or "science as understanding" where we are building our own understanding through our work.}

\notes{I think the two will actually co-evolve, but I think the separation is useful when thinking about AI for science because different actions prioritise one versus the other.}

\slidesincremental{* Science as technology
* Science as understanding}

\newslide{Judgement Examples}

\notes{Even in the sciene as technology case, society will still require us to have accountability when there are judgment calls. That accountability assumes some understanding. Note that this has already been eroded to some extent. Think, for example, of a computational epidemiologist in the Covid19 pandemic being asked to explain what their model includes (such as hotel closures) and what it doesn't account for (such as facemasks!).

> We might not have data, but we do have arithmetic
}

\slidesincremental{* Covid19 Epidemiological Modelling
* Does your model account for Facemasks?
* Does your model account for Hotel Closures?

> We might not have data, but we can do some arithmetic
}

\notes{This leads to a phenomena I think of as "agentic debt". And the related phenomenon of "scientific or intellectual debt".}

\include{_ai/includes/intellectual-debt-short.md}
\include{_ai/includes/agentic-debt-short.md}

\notes{The answers differ when our understanding of the underlying physics improves: think of Navier Stokes simulations, or quantum field theory for chemical bonding vs economic models or "social digital twins".}

\newslide{Judgment Layer}

\slidesincremental{
* Agentic Orchestration compress reading/writing/coding into a single interface.
* Tool use turns text into action: search, code execution, lab automation, simulation pipelines.
* This shifts the bottleneck to *verification* and *scientific judgement*.
}


\notes{What is the judgment layer for AI in Science? How do we maintain accountability when we have delegated the process of discovery to agents?}

\newslide{What do we mean by “understanding”?}

\slidesincremental{
* *Operational understanding*: can I use it safely and know when it fails?
* *Mechanistic understanding*: do I have an interpretable causal/mechanistic story?
* *Paradigm understanding*: can the community reproduce, contest, and extend it?
* *Social understanding*: are the ideas understood in the wider public and other fields?
}
\notes{We can mean different things by understanding:

* *Operational understanding*: can I use it safely and know when it fails?
* *Mechanistic understanding*: do I have an interpretable causal/mechanistic story?
* *Paradigm understanding*: can the community reproduce, contest, and extend it?
* *Social understanding*: are the ideas understood in the wider public and other fields? [@Lawrence-atomic24]}

\notes{With increasing use of computation in science we could argue that there's a shift from mechanistic to operational understanding. But if AI tools are judiciously deployed we could argue that they could support a shift to better understanding of our own paradigms and broader social understanding.}

\notes{These different forms of understanding enable different forms of individual, institutional and social *accountability*. The machines cannot participate in this social accountability in the same way we do because they are not socially vested.}


\include{_ai/includes/institutional-tacit-knowledge-short.md}


\section{The Information Infrastructure}

\include{_ai/includes/embodiment-factors-walking-vs-light.md}
\include{_data-science/includes/new-flow-of-information.md}
\include{_data-science/includes/new-flow-of-information-ham.md}

\subsection{In Mathematical Context}

\notes{Terrance Tao's IMO 2024 talk on machine assitance in maths gives an excellent overview of how ML techniques can be deployed in maths. Well worth watching for additional insight}

\includeyoutube{e049IoFBnLA}{800}{600}

\newslide{Tao (IMO 2024): machine assistance in maths}

\slidesincremental{
* *Databases / tables* (OEIS): store patterns and prior results.
* *Solvers* (CAS, SAT/SMT): mechanised search and case analysis.
* *Modern triad*: proof assistants, machine learning, large language models.
}

\speakernotes{Adapted from Terence Tao’s IMO 2024 talk “AI and
Mathematics” (AIMO Prize). The appeal is the clean split: storage
(databases), mechanised search (solvers), and a modern triad that
changes research workflow (proof, pattern-finding, and
language/interface).}

\newslide{Repositories of knowledge: verifiable vs tacit}

\slidesincremental{
* *Digitally verifiable*: proof assistants (e.g. Lean) and machine-checkable artefacts.
* *Operationally reliable*: code, simulators, pipelines — repeatable, but not always interpretable.
* *Tacit + contextual*: protocols, judgement, and field knowledge (bio/geo/social science).
* LLMs can *compress and transmit* tacit knowledge — but they push the bottleneck to *verification boundaries*.
}

\notes{This is a useful cross-field lens.  Mathematics is close to a
“gold standard” for verifiability: once formalised, we can check
claims mechanically.  But much of science lives in tacit practice:
what counts as a clean sample, a plausible stratigraphy, a credible
causal story, a trustworthy instrument calibration.  LLMs are
attractive because they can encode and communicate that practice in
natural language, but they don’t automatically create verifiable,
accountable knowledge.  So the design question becomes: where do we
draw the verification boundary, and what artefacts do we insist on at
that boundary?}

\newslide{Authorship and accountability}

\slidesincremental{
* We can hold *humans* to account for judgement 
* We can’t hold *models* (directly) to account
  * they don’t bear responsibility or liability
* Need a named *author* to sign off
}

\notes{This is the need for a practical definition of "accountability" here: not blaming the model, but making the chain legible. For science: who is the author of the claim, what evidence supports it, and what were the decision thresholds? That’s a systems/interface problem, not a model-quality problem.}

\newslide{Institutional readiness: five gaps}

\slidesincremental{
* *Governance gap*: policy exists, practice often lags [@Resnik-ethics25; @Montgomery-framework25].
* *Research culture gap*: weak incentives/careers for interdisciplinary team science [@NAS-facilitating05].
* *Infrastructure gap*: compute and models concentrated in few actors [@Bommasani-foundation21; @Lawrence-accelerating24].
}
\newslide{Institutional readiness: five gaps}
\slidesincremental{
* *Narrative gap*: corporate visibility can eclipse public infrastructure contributions [@Royalsociety-portrayals18; @Moult-casp95].
* *Coordination gap*: funding/governance/data/skills often evolve separately [@Montgomery-framework25].
}

\notes{Technical progress is now moving faster than institutional adaptation. The governance gap is the distance between principles and implementation in day-to-day research practice, including transparency, attribution, and reproducibility. The culture gap reflects incentive systems that still reward disciplinary depth more than the interdisciplinary collaboration AI-for-science needs. The infrastructure gap captures concentration of compute, models, and engineering capacity, which can compromise openness and independence. The narrative gap is about visibility: high-profile corporate successes can obscure the long public investment base that made them possible. The coordination gap recognises that funding, governance, data, and skills policies are often designed in separate silos, even though deployment challenges are coupled.}

\newslide{Policy playbook: what to build now}

\slidesincremental{
* *Funding* for domain-grounded, interdisciplinary AI-for-science work.
* *Governance* for reproducibility, attribution, and safe use [@Ball-reproducibility23; @Wachter-legal24].
* *Infrastructure*: open tooling + shared compute pathways.
* *Data*: trusted access and stewardship.
* *Talent/skills*: train scientists to explain, verify, and challenge [@Montgomery-framework25; @Cranmer-science26].
}

\notes{This playbook is designed as a policy and programme checklist rather than a manifesto. Funding should support both frontier methods and field-embedded deployment teams. Governance should make accountability operational: clear authorship, auditability, and validation norms. Infrastructure policy should widen access to compute and open tools so adoption does not default to a few proprietary stacks. Data policy should focus on trustworthy access, stewardship, and incentives for curation, not just volume. Talent and skills policy should treat explanation, verification, and challenge as core scientific competencies in an AI-mediated workflow. The practical aim is to accelerate adoption while preserving scientific integrity, openness, and public trust.}

\subsection{Developing Science}

\notes{One of the most important roles of science is developing the next generation of scientists. This is something that Universities do very well. What does this look like in a world where we can rapidly iterate scientific pipelines through llm/tool orchestration?}

\notes{How do we train the next generation of scientists to explain, verify and challenge. How do we develop their scepticism? How do we convert our tacit knowledge (institutional and individual) about judgement into verification boundaries for AI-for-science systems?}

\notes{What is the new repository for the paradigm store?}

\slidesincremental{
* What do we want trainees to be able to *explain*, *verify*, and *challenge*?
* Where is the *verification boundary* in AI-for-science systems?
* Which artefacts are the new paradigm stores?
}

\section{Over to Tim: agents, discovery, specialist tools}


\thanks

\references

