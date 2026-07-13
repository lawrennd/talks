---
title: "The Inaccessible Game"
subtitle: "Information Isolation and Selected Dynamics"
abstract: |
  In this talk we will explore a zero-player game based on an information isolation constraint. The dynamics of the game emerge from a "no-barber" selection principle that prohibits external structure. The aim is for the game to avoid impredictive-style inconsistencies. Motivated by the selection principle we will derive a "selected" trajectory in the game that consists of a second-order constrained maximum entropy production along the information geometry.
author:
- family: Lawrence
  given: Neil D.
  gscholar: r3SJcvoAAAAJ
  institute: University of Cambridge
  twitter: lawrennd
  url: http://inverseprobability.com
date: 2026-07-17
venue: ELLIS Summer School
transition: None
talkscam:
---

\include{_information-game/includes/munchkin-provision.md}

\subsection{A Tautology}

\notes{> Self-governing systems cannot refer to external arbitration.}

\slides{> Self-governing systems cannot refer to external arbitration.}

\notes{While this is a tautology, we will try to formalise it through information theory. The key question is: what mathematical structure is forced on a system that cannot appeal to external adjudication?}

\narration{Why should we care about self-governing systems? Well, you'd expect the rules of physics to be self-governing. It would be a problem if a rule of physics had to pause and check VAR — an external decision made outside the game. That clearly cannot work for a dynamical system we expect to be self-sustaining and self-adjudicating. So I'm going to try and formalise this tautology and see what mathematical structure it forces on us.}

\include{_information-game/includes/no-barber-principle.md}

\narration{The core idea actually came to me on the train on the way back from watching Sheffield United lose the playoff final. I was sober enough to think clearly, and this is almost exactly a year ago, though I've been thinking about this problem for longer.}

\include{_information-game/includes/baez-information-loss-axioms.md}

\include{_information-game/includes/inaccessible-game-set-up.md}

\include{_information-game/includes/information-isolation.md}

\include{_physics/includes/classical-observer-velocities.md}

\include{_information-game/includes/observer-inaccessible-entropy.md}

\include{_physics/includes/i-plus-h-equals-c.md}

\include{_information-game/includes/entropy-configuration-mapping.md}

\include{_statistics/includes/the-exponential-family.md}

\include{_information-game/includes/axiomatically-distinguished-trajectory.md}

\include{_information-game/includes/constrained-entropy-ascent.md}

\include{_information-game/includes/generic-like-structure.md}

\include{_information-game/includes/information-relaxation-dynamics.md}

\include{_information-game/includes/shannon-origin-impossibility.md}

\notes{Having seen why the state space must become noncommutative, we now need the corresponding information geometry. The exponential family and Fisher information that organise the classical dynamics have a quantum analogue: the matrix exponential family, equipped with the Bogoliubov–Kubo–Mori metric.}

\include{_information/includes/the-matrix-exponential-family.md}

<!--include{_information-game/includes/no-barber-favours-ncfinprob.md}-->

\include{_information-game/includes/lme-origin-confinement.md}

\include{_information-game/includes/entropy-time.md}

\include{_information-game/includes/hamiltonian-emergence-preview.md}

\subsection{Conclusions}

\notes{We began with a tautology — self-governing systems cannot refer to external arbitration — and asked what mathematical structure it forces. The answer, obtained by applying the no-barber principle to information theory, turns out to be surprisingly rich.

*No-barber principle.* Formalised through the axiomatic frameworks of @Baez-characterisation11 and @Parzygnat-functorial22, the requirement of internal adjudicability prohibits outcome spaces, Hamiltonians, clocks, and external observers from appearing as primitives. The game must define everything it uses from within [@Lawrence-nobarber26].

*Information isolation.* The no-barber principle suggests the marginal entropy sum $\sum_i h_i = C$ as a global conservation law. Question: is information isolation a fourth axiom or a derived necessity? 

*Axiomatic selection.*  We've suggested that the game structure requires a pure-state LME origin with positive marginal entropies — a configuration impossible under Shannon entropy [@Lawrence-origin26]. Is this necessary or sufficient?

*Emergent effective rules.* With no Hamiltonian, no clock, and no spatial structure in the axioms, we look for emergence. Entropy time provides an internal clock, axiomatically distinguished because it is the unique reparametrisation that uniformises entropy production. Next we're studying Gibbs-locked regions an effective Hamiltonian emerges from the modular generator[@Lawrence-hamiltonian26].

The game suggests a quantum-mechanical structure — density matrices, von Neumann entropy, unitary evolution, Gibbs states. Can we show that this is, within the assumptions of the no-barber programme, the internally consistent language for a self-governing system that enforces information isolation and avoids external adjudication?}

\slides{* No barber principle
* Information isolation
* Axiomatic selection
* Emergent effective rules}

\narration{So to summarise: starting from a tautology — self-governing systems can't appeal to external arbitration — and applying information theory, you get a surprisingly specific set of conclusions. The no-barber principle rules out external outcome spaces, clocks, Hamiltonians, and observers as primitives. Information isolation gives you a conservation law for marginal entropies. The requirement for a pure-state origin with positive marginals forces you into quantum probability — you can't stay classical. The GENERIC structure and entropy time emerge from the dynamics. And the idea is that a Hamiltonian would have to emerge conditionally, in Gibbs-locked regions.

There are three papers now: the inaccessible game sets up the framework and derives the GENERIC structure. The origin paper derives the necessity of quantum probability. And the Hamiltonian paper derives the emergence of Hamiltonian dynamics from the Gibbs-locked region. Each paper has a "work in progress" quality — I'm not claiming these are complete. What I hope to have shown is that the tautology is not empty: it has mathematical teeth.

I was told I should finish with a question. Here's mine: can we show that quantum mechanics — density matrices, von Neumann entropy, unitary evolution, Gibbs states — is, within the assumptions of the no-barber programme, the unique internally consistent language for a self-governing system that enforces information isolation? I don't know the answer yet, but I think it's the right question to be asking.}

\thanks

\references
