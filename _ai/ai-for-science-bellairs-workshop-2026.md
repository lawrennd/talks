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

\subsection{Potential Timing/Framing}

* 0-25: Neil framing (questions, philosophy, paradigm store).
* 25-55: Tim lead (what is science, model types, canonical AI examples).
* 55-70: break.
* 70-95: Neil lead (delegation, tacit knowledge, verification/accountability).
* 95-110: Tim lead (agents, discovery, generalist vs specialist).
* 110-120: joint synthesis and workshop questions.

\subsection{Questions}

\slidesincremental{
* Where do scientific paradigms live? 
* What role does human understanding and agency play?
* What's an emerging playbook for AI-for-science?
}

\subsection{Notes}

* What is science for: prediction, explanation, control (light-touch framing.
* Kinds of scientific models: mechanistic equations, statistical mechanics/effective models, ML surrogates.
* Common touchpoints: old-school ML + recent deep learning in science.
* Open design question: generalist models calling specialist tools, or internalising specialist knowledge?


\notes{As a way of triggering reflection for this workshop I thought to start with three questions. They are:

1. Where do scientific paradigms live as knowledge moves from books/equations into code, simulators, and large models?
2. What role should human understanding and agency play when we can use models we don't fully understand?
3. What’s an emerging playbook for AI-for-science* and what tools will we depend on?}

\notes{To start exploring we'll look at some ideas from the philosophy of science, starting with Thomas Kuhn.}

\include{_books/includes/the-structure-of-scientific-revolutions.md}

\notes{Kuhn's idea that science iterates between normal science (or puzzle solving) and paradigm shifts which change the fundamental assumptions that underpin our scientific ideas. Kuhn was writing in 1962 and he argued that at that time our paradigm was stored in text books. Even before the advent of AI, our modern information infrastructure has shifted, to the extent that one can argue that today our paradigm is (also) stored in computers, through simulations, databases etc..}

\speakernotes{This is an opening talk, not a survey. The aim is to offer a shared set of "handles" and vocabulary that we can re-use all week: paradigms/mediums, understanding/agency, playbooks/tools.}

\newslides{Some prompts}

\slidesincremental{
* Paradigms: shift in *science* or in *underpinning information infrastructure*?
* Understanding: what do we still demand (and from whom)?
* Omni-models vs specialists: what's gained/lost?
}

\notes{This leads to a provocation as to whether we are experiencing a paradigm shift in science, or more structurally a paradigm shift in the way our scientific paradigms are stored and shared. A fundamental change in the underpinning information infrastructure.}

\newslides{Crossing fields: recovering the "totality" of science}

\slidesincremental{
* We already struggle to see the *whole* of science across fields and institutions.
* LLM interfaces can lower the cost of moving across disciplines — but increase the risk of “plausible” error.
* So the skill that matters is *scepticism*: what would convince us we’re wrong, and where is the verification boundary?
}

\notes{Even before modern AI, specialisation plus scale meant no one could hold the whole map of science in their head.
Today, tools can make cross-field exploration easier: you can ask a model to summarise, translate notation, find relevant papers, draft code, or suggest plausible mechanisms.
But the failure mode is also cross-field: confident-sounding claims without the embodied judgement that comes from living inside a discipline.}

\speakernotes{We’ll unroll each into a few concrete “design questions” that show up repeatedly in AI-for-science systems.}


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

\newslides{First Wave of ML: Prediction}

\slidesincremental{
* *A model family* $f_\theta$ that maps inputs to outputs.
* *A learning objective* that scores how well $f_\theta$ matches data (and priors/constraints).
* *Optimisation + scale*: we fit $\theta$ with large compute and large datasets.
}

\notes{In the first wave of ML in science we've seen the increasing use of ML/statistical models for prediction. Here we fit a function $\f_\theta$ on the basis of a large data set or a simulation (statistical emulation/surrogate modelling). This allows us to explore that simulation or data through the model we've created and the predictions it makes.}

\notes{Examples include AlphaFold, GraphCast.}

\newslides{Prediction Examples}

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

\newslides{Physics foundation models}

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


\include{_books/includes/conjectures-and-refutations.md}

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

\newslides{What do we mean by “understanding”?}

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
* *Social understanding*: are the ideas understood in the wider public and other fields?}

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

\newslides{Tao (IMO 2024): machine assistance in maths}

\slidesincremental{
* **Databases / tables** (OEIS): store patterns and prior results.
* **Solvers** (CAS, SAT/SMT): mechanised search and case analysis.
* **Modern triad**: proof assistants, machine learning, large language models.
}

\speakernotes{Adapted from Terence Tao’s IMO 2024 talk “AI and Mathematics” (AIMO Prize). The appeal is the clean split: storage (databases), mechanised search (solvers), and a modern triad that changes research workflow (proof, pattern-finding, and language/interface).}

\newslides{Repositories of knowledge: verifiable vs tacit}

\slidesincremental{
* **Digitally verifiable**: proof assistants (e.g. Lean) and machine-checkable artefacts.
* **Operationally reliable**: code, simulators, pipelines — repeatable, but not always interpretable.
* **Tacit + contextual**: protocols, judgement, and field knowledge (bio/geo/social science).
* LLMs can *compress and transmit* tacit knowledge — but they push the bottleneck to **verification boundaries**.
}

\notes{This is a useful cross-field lens.
Mathematics is close to a “gold standard” for verifiability: once formalised, we can check claims mechanically.
But much of science lives in tacit practice: what counts as a clean sample, a plausible stratigraphy, a credible causal story, a trustworthy instrument calibration.
LLMs are attractive because they can encode and communicate that practice in natural language — but they don’t automatically create verifiable, accountable knowledge.
So the design question becomes: where do we draw the verification boundary, and what artefacts do we insist on at that boundary?}

\newslides{Authorship and accountability}

\slidesincremental{
* We can hold *humans* to account for judgement (even when it’s wrong).
* We can’t hold *models* to account; they don’t bear responsibility or liability.
* So we must design systems where a *named actor* signs off, with traceable evidence.
}

\notes{This is the need for a practical definition of "accountability" here: not blaming the model, but making the chain legible. For science: who is the author of the claim, what evidence supports it, and what were the decision thresholds? That’s a systems/interface problem, not a model-quality problem.}

\subsection{Over to Tim: agents, discovery, specialist tools}

* Perhaps: why current LLMs are useful collaborators, but not autonomous scientists.
* Perhaps: RL/diversity/curiosity as the missing ingredients for discovery.
* Perhaps: generalist models orchestrating specialist tools vs internalising specialist corpora.

\subsection{Developing Science}

\notes{One of the most important roles of science is developing the next generation of scientists. This is something that Universities do very well. What does this look like in a world where we can rapidly iterate scientific pipelines through llm/tool orchestration?}

\notes{How do we train the next generation of scientists to explain, verify and challenge. How do we develop their scepticism? How do we convert our tacit knowledge (institutional and individual) about judgement into verification boundaries for AI-for-science systems?}

\notes{What is the new repository for the paradigm store?}

\slidesincremental{
* What do we want trainees to be able to **explain**, **verify**, and **challenge**?
* Where is the *verification boundary* in AI-for-science systems?
* Which artefacts are the new paradigm stores?
}

\thanks

\references

