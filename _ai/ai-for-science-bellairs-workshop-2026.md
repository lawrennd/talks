---
title: "AI for Science"
subtitle: "Paradigms, tacit knowledge, and scientific agency in the age of large models"
abstract: |
  AI is changing how science is practiced: from data analysis and surrogate modelling to the use of large, general-purpose models as “scientific assistants” that can read, write, code, and coordinate work.

  This opening lecture frames the workshop’s core questions as questions about *where knowledge lives*, *what we mean by understanding*, and *how we preserve scientific agency* when useful models are not fully intelligible. We’ll sketch a minimal shared vocabulary for modern deep learning, contrast Popper/Kuhn perspectives on scientific progress, and outline a pragmatic AI-for-science “playbook” (simulators, surrogates, differentiable pipelines, uncertainty) alongside the missing tooling: provenance, interfaces, calibration, and trustworthy scientific claims.
author:
- family: Lawrence
  given: Neil D.
  institute: University of Cambridge
date: 2026-03-15
venue: "Bellairs Workshop on AI for Science (Opening Lecture), Barbados"
layout: talk
geometry: ["a4paper", "margin=2cm"]
papersize: a4paper
transition: None
reveal: True
pptx: False
docx: False
ipynb: False
---

\speakernotes{Suggested pacing (flexible): 10 mins shared AI vocabulary; 15 mins philosophy + “knowledge vs technology”; 15 mins AI-for-science playbook + failure modes; 10 mins agents/discovery + open questions. If co-lecturing, this naturally hands over to examples in specific sciences.}

\section{Opening questions}

\newslides{Bellairs workshop: the questions we’ll keep returning to}

\slidesincremental{
* **Where do scientific paradigms live** as knowledge moves from books/equations into code, simulators, and large models?
* **What role should human understanding and agency play** when we can use models we don’t fully understand?
* **What’s the emerging playbook for AI-for-science** (and what tools are still missing)?
}

\speakernotes{This is an opening talk, not a survey. The aim is to offer a shared set of “handles” and vocabulary that we can re-use all week: paradigms/mediums, understanding/agency, playbooks/tools.}

\newslides{Workshop prompts (compressed)}

\slidesincremental{
* Paradigms: shift in *science* or in *storage medium*?
* Understanding: what do we still demand (and from whom)?
* Omni-models vs specialists: what’s gained/lost?
}

\speakernotes{We’ll unroll each into a few concrete “design questions” that show up repeatedly in AI-for-science systems.}

\section{A minimal shared vocabulary for modern AI}

\newslides{A tiny deep learning primer (for scientists)}

\slidesincremental{
* **A model family** \(f_\theta\) that maps inputs to outputs.
* **A learning objective** that scores how well \(f_\theta\) matches data (and priors/constraints).
* **Optimisation + scale**: we fit \(\theta\) with large compute and large datasets.
}

\speakernotes{Assume most people know the mathematics, but not the modern practice: large-scale optimisation, representations, pretraining/finetuning, and why “scale” changes what is feasible.}

\newslides{Foundation models and “pretraining”}

\slidesincremental{
* **Pretraining**: learn representations from broad data with weak/self supervision.
* **Adaptation**: finetune, prompt, or condition on domain data + tools.
* **What changes**: models become *interfaces* (to text, code, images, scientific workflows).
}

\speakernotes{Set up the idea that large models are an *information interface* more than a “solver” in the classical sense. That matters for how paradigms live and move.}

\newslides{What’s new isn’t just prediction — it’s delegation}

\slidesincremental{
* LLMs compress reading/writing/coding into a single interface.
* Tool use turns text into action: search, code execution, lab automation, simulation pipelines.
* This shifts the bottleneck to **verification** and **scientific judgement**.
}

\section{A useful taxonomy (via Terence Tao, IMO 2024)}

\newslides{Tao (IMO 2024): machine assistance in maths}

\slidesincremental{
* **Databases / tables** (OEIS): store patterns and prior results.
* **Solvers** (CAS, SAT/SMT): mechanised search and case analysis.
* **Modern triad**: proof assistants, machine learning, large language models.
}

\speakernotes{Adapted from Terence Tao’s IMO 2024 talk “AI and Mathematics” (AIMO Prize). The appeal is the clean split: storage (databases), mechanised search (solvers), and a modern triad that changes research workflow (proof, pattern-finding, and language/interface).}

\newslides{Same taxonomy, for science}

\slidesincremental{
* **Databases**: literature, datasets, code, simulators (where paradigms live).
* **Simulators/solvers**: expensive ground truth and constraint engines.
* **Modern triad**: ML surrogates (speed), LLMs (interface), verification (trust boundary).
}

\speakernotes{In maths, verification can literally mean proof assistants (Lean/Coq). In most sciences, verification is protocols, calibration, provenance, and reproducible pipelines. The point is the same: useful AI shifts work toward the verification boundary.}

\section{Science as knowledge vs science as technology}

\newslides{Two senses of “science”}

\slidesincremental{
* **Science as knowledge**: explanatory, communicable, builds intuition (textbooks, mechanisms).
* **Science as technology**: reliable performance without shared intuition (black-box but validated).
* AI accelerates *technology*; we need to decide what happens to *knowledge*.
}

\speakernotes{This is a deliberately provocative distinction. The question is not whether black boxes exist (they do), but what we choose to teach, certify, and rely on as scientists.}

\newslides{What do we mean by “understanding”?}

\slidesincremental{
* **Operational understanding**: can I use it safely and know when it fails?
* **Mechanistic understanding**: do I have an interpretable causal/mechanistic story?
* **Social understanding**: can the community reproduce, contest, and extend it?
}

\speakernotes{In AI-for-science, we often have operational understanding (benchmarks; validation) without mechanistic understanding. Social understanding depends on shared artefacts and interfaces.}

\section{Popper, Kuhn, and what “progress” looks like}

\newslides{Popper vs Kuhn (cartoon version)}

\slidesincremental{
* **Popper**: bold conjectures + hard refutation; science advances by *falsifiable risk*.
* **Kuhn**: “normal science” solves puzzles within a paradigm; revolutions shift the paradigm.
* Both are partly about **institutions**: communities, incentives, and shared artefacts.
}

\speakernotes{Use this to reframe “AI paradigm shift” talk. Is AI changing the epistemic norms (Popper) or the infrastructure/paradigm carriers (Kuhn), or both?}

\newslides{Where do paradigms live? (a practical inventory)}

\slidesincremental{
* **Text**: papers, books, review articles, pedagogy.
* **Math**: equations, theorems, proofs, identifiability arguments.
* **Code**: simulators, pipelines, datasets, benchmarks, notebooks.
}

\speakernotes{Add a fourth (often ignored) carrier: tacit judgement embedded in labs, collaborations, and review. That becomes visible when you try to automate parts of science.}

\include{_ai/includes/institutional-tacit-knowledge-short.md}

\section{Debt as a lens for AI-for-science}

\newslides{Three “debts” (mapped to science)}

\slidesincremental{
* **Technical debt**: brittle pipelines, undocumented glue code, irreproducible workflows.
* **Intellectual debt**: results we can *run* (or simulate) but can’t fully *grasp*.
* **Scientific debt** (agentic debt): delegated workflows without crisp boundaries for evidence and action.
}

\speakernotes{This is borrowed from the framing in the ai and security talks. It maps well: technical debt is the engineering substrate; intellectual debt is the growing gap between what we can build/use and what we can explain; “scientific debt” (agentic debt, in this context) appears when we delegate steps (analysis, code, even lab actions) without explicit authority, provenance, and recovery paths.}

\newslides{Weather vs Covid: where debt accumulates}

\slidesincremental{
* Weather: large simulations, but anchored in physics + measurement; debt is often *manageable* via calibration/ensembles.
* Covid: “physics” includes behaviour, institutions, and interventions; debt is larger and more contestable.
* Scientific debt: action-facing modelling needs explicit **evidence → decision → authorship/accountability**.
}

\speakernotes{The point isn’t that weather is easy or Covid is impossible; it’s that in Covid-like settings the tacit layer is thicker, the data is more biased/happenstance, and interventions feed back on the system. That’s where intellectual debt (opaque model reliance) and scientific/agentic debt (delegated recommendations/actions without provenance or sign-off) bite hardest.}

\newslides{Authorship and accountability (who answers for the claim?)}

\slidesincremental{
* We can hold **humans** to account for judgement (even when it’s wrong).
* We can’t hold **models** to account; they don’t bear responsibility or liability.
* So we must design systems where a *named actor* signs off, with traceable evidence.
}

\speakernotes{This is the practical meaning of “accountability” here: not blaming the model, but making the chain legible. For science: who is the author of the claim, what evidence supports it, and what were the decision thresholds? That’s a systems/interface problem, not a model-quality problem.}

\section{A pragmatic AI-for-science playbook}

\newslides{A common recipe (across fields)}

\slidesincremental{
* Start with a **slow but trusted simulator/experiment** (ground truth with caveats).
* Fit **surrogates** to accelerate inference, optimisation, and design loops.
* Wrap with **uncertainty** + validation to know when the surrogate is lying.
}

\speakernotes{This corresponds closely to the workshop prompt: accurate but slow simulators, amortised surrogates, differentiable pipelines. The key addition is: validation/certification loops.}

\newslides{Three recurring failure modes}

\slidesincremental{
* **Distribution shift**: the interesting regime is off the training manifold.
* **Confounding/causality**: correlations guide action poorly (interventions differ from prediction).
* **Interface errors**: humans misread outputs; models misread instructions/data provenance.
}

\speakernotes{These are not just “ML problems”; they are socio-technical. They show up as bad scientific decisions, not just bad metrics.}

\newslides{How do we know a surrogate generalises?}

\slidesincremental{
* **Stress tests**: deliberately probe extremes, counterfactuals, and “nasty” corners.
* **Calibration**: uncertainty that tracks real error, not just confidence.
* **Decision-aware validation**: validate the *decision pipeline*, not only pointwise error.
}

\speakernotes{This is a key workshop theme: what tools do we have vs what tools are missing? Much of the missing tooling is about evaluation under action, not prediction.}

\section{Omni-models vs specialists}

\newslides{One model to rule them all?}

\slidesincremental{
* **Generalists**: great interfaces; transfer across domains; help with “glue work”.
* **Specialists**: better inductive bias; easier validation; clearer failure modes.
* The frontier is **hybrids**: generalist interface + specialist cores + explicit tests.
}

\speakernotes{Make this a design choice rather than a religious war. A generalist model can still be part of a specialist scientific system if we control the interface and verification boundary.}

\section{Agents and open-ended discovery}

\newslides{Why “agents” are interesting for science}

\slidesincremental{
* They turn model capability into **workflow**: read → plan → compute → revise.
* They externalise cognition into **teams** (multiple models/tools/roles).
* They force us to specify **division of labour**: what humans do vs what machines do.
}

\speakernotes{This is where your point lands: LLMs look like “human analogue machines” and become more useful when we put them in human-like teams. That reveals what intelligence we’ve actually captured.}

\newslides{Open-ended discovery: what we can and can’t do (yet)}

\slidesincremental{
* We can accelerate **search** (literature, designs, hypotheses) and **synthesis** (code, text).
* We struggle with **grounded novelty**: new concepts that survive hard refutation.
* The bottleneck becomes **experimental design + verification + instrumentation**.
}

\speakernotes{Lead into later talks: lab automation, closed-loop experimentation, mechanistic discovery, causal discovery, symbolic regression, theorem proving, etc.}

\section{What tools do we have, and what tools are missing?}

\newslides{What’s missing is often “scientific infrastructure”}

\slidesincremental{
* **Provenance**: what evidence supports this claim? which data/code produced it?
* **Interfaces**: how do humans ask good questions and detect bad answers?
* **Governance**: who is accountable for decisions made with model-mediated evidence?
}

\speakernotes{This connects back to paradigms: paradigms live in institutions and interfaces as much as in equations.}

\newslides{A “Lean proof” thought experiment}

\slidesincremental{
* In maths, formal proof assistants are close to a gold standard for verifiable claims.
* In many sciences, knowledge is entangled with **context** and **measurement**.
* LLMs may encode that context — but verification must move to *interfaces + protocols*.
}

\speakernotes{This is your Lean / repository-of-knowledge riff, without overcommitting. The point is: the verification unit changes by domain, but science still needs verifiable claims.}

\newslides{Discussion prompts for the week}

\slidesincremental{
* What do we want trainees to be able to **explain**, **verify**, and **challenge**?
* Where should we place the **verification boundary** in AI-for-science systems?
* Which artefacts should become our new “textbooks”: datasets, simulators, model cards, tests?
}

\thanks

\references

