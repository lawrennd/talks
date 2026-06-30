---
title: "The Inaccessible Game"
subtitle: "Information and the Limits of Intelligence"
abstract: |
  Most games rely on an external adjudicator. That is, an observer outside the system who defines outcomes, measures states, and applies rules. What happens when we forbid this? 
  
  This talk develops the "inaccessible game," an information-theoretic dynamical system that forbids external adjudication.  We introduce the game and present the no-barber principle which supports us when selecting the game's rules.

  We explain how structure emerges from these foundations and speculate on why this framing might be useful in understanding the limits of information infrastructures and the limits of intelligence.
author:
- family: Lawrence
  given: Neil D.
  gscholar: r3SJcvoAAAAJ
  institute: University of Cambridge
  twitter: lawrennd
  orcid: 0000-0001-9258-1030
  url: https://inverseprobability.com
date: 2026-06-30
room: "Aula Toti"
venue: "Department of AI, Data and Decision Sciences, Luiss Guido Carli University, Rome"
transition: None
talkscam:
---

\include{_atomic-human/includes/artificial-general-vehicle.md}

\include{_ai/includes/the-atomic-eye.md}
\undef{noSlideTitle}
\include{_ai/includes/embodiment-factors-walking-vs-light.md}
\define{noSlideTitle}

\include{_information/includes/information-topography-motivation.md}

\include{_information-game/includes/munchkin-provision.md}

\subsection{A Tautology}

\notes{> Self-governing systems cannot refer to external arbitration.}

\slides{> Self-governing systems cannot refer to external arbitration.}

\notes{While this is a tautology, we will try to formalise it through information theory. The key question is: what mathematical structure is forced on a system that cannot appeal to external adjudication?}

\include{_information-game/includes/no-barber-principle.md}

\include{_information-game/includes/baez-information-loss-axioms.md}

\include{_information-game/includes/inaccessible-game-set-up.md}

\include{_information-game/includes/information-isolation.md}

\include{_physics/includes/multigame-entropy.md}
\include{_ml/includes/velocity-independent-sample.md}
\include{_ml/includes/velocity-correlated-sample.md}
\include{_physics/includes/jaynes-maximum-entropy.md}


\include{_physics/includes/classical-observer-velocities.md}

\section{Back to self adjudication}

\include{_information-game/includes/no-barber-principle.md}

\include{_information-game/includes/observer-inaccessible-entropy.md}

\include{_physics/includes/i-plus-h-equals-c.md}

\include{_information-game/includes/entropy-configuration-mapping.md}

\include{_statistics/includes/the-exponential-family.md}

\include{_information-game/includes/axiomatically-distinguished-trajectory.md}

\subsection{Long Story Short}

\notes{Building on these ideas, some interesting conclusions emerge. The marginal engropy constraint leads to GENERIC-like dynamics [@Grmela-dynamics97,@Ottinger-beyond05].}

\slidesincremental{
* Can derive GENERIC-like dynamics.
* Origin suggests von Neumann entropy more natural than Shannon.
}

\notes{When characterising the origin of the game, a shift is forced from Shannon entropy to von Neumann entropy [@vonNeumann-book32]. In retrospect the shift feels natural if we take an algebraic view of quantum probability, where outcomes are no longer primitive. This is consistent with the inaccessible nature of the game.}

\newslide{Connections}

\slidesincremental{
* Nice connections between.
  * Thermodynamics and Inference (Jaynes).
  * Information Geometry and GENERIC.
  * Inaccessibility and noncommutative probability.
}

\notes{The game is inspired by the nice connections between inference and thermodynamics explored by E. T. Jaynes, but the dynamics play out through the framework of information geometry [@Amari-information00] which makes much of the (normally complicated) calculations around Riemanian geometry relatively straightforward.}

\subsection{Energy}

\include{_physics/includes/pendulum-animation.md}
<!-- include{_physics/includes/maxwells-demon.md} -->

\newslide{Energy}

\slidesincremental{
* In certain thermodynamic limits:
  * Marginal entropy conservation $\equiv$ Energy conservation

See @Lawrence-inaccessible25
}

\notes{One of the nice results of @Lawrence-inaccessible25 is that in certain thermodynamic limits marginal entropy conservation manifests as energy conservation. So in these (meta-stable) regions one can use Jaynes' maximum entropy approach to determin the stationary distribution.}

\section{Intelligence}

\include{_information/includes/perpetual-motion-superintelligence-analogy.md}

\subsection{Information-Theoretic Limits}

\notes{The hope is that this framework might reveal limits on information processing systems, including intelligent systems.}

\include{_information/includes/information-limits-on-intelligence.md}

\notes{The perpetual motion analogy provides an accessible way to think about claims of unbounded intelligence.}

<!--
include{_information-game/includes/constrained-entropy-ascent.md}

include{_information-game/includes/generic-like-structure.md}

include{_information-game/includes/information-relaxation-dynamics.md}

include{_information-game/includes/shannon-origin-impossibility.md}

include{_information/includes/the-matrix-exponential-family.md}

include{_information-game/includes/lme-origin-confinement.md}

include{_information-game/includes/entropy-time.md}

include{_information-game/includes/hamiltonian-emergence-preview.md}

\section{Intelligence}

\include{_information/includes/perpetual-motion-superintelligence-analogy.md}

\include{_information/includes/information-limits-on-intelligence.md}
-->
\section{Information Infrastructures}

\notes{The information-theoretic constraints that bound individual intelligence extend to collective systems we build.  Any institution: organisations, a businesses, government department is an information-processing system embedded subject to the constraints of the information topography.  The bottlenecks and channel capacities that constrain what a human can know also constrain what institutions can know, and therefore what they can do.}

\notes{This was perhaps most famously explored by Stafford Beer whoe developed the Viable System Model  [@Beer-cybernetics59,@Beer-brain72], where a cybernetic account of the information channels an organisation must maintain to remain viable.  Central to Beer's analysis is Ashby's law of requisite variety [@Ashby-requisite-variety12]: the variety of a controller must match the variety of what it seeks to control.  Organisations that lack the information bandwidth to track their environment cannot govern themselves effectively.}

\notes{Recall the embodiment factor introduced earlier: human communication bandwidth is at walking pace while machines operate at light speed.  This asymmetry means that the relationship between people and data is now almost always mediated by machine.  The information topography of modern organisations is therefore shaped not only by their internal reporting hierarchy, but by the machine infrastructure that now sits between people and the world.}

\slides{
* Information limits apply to institutions, not just individuals
* Embodiment factor shapes organisational information topography
* Machine-mediated data changes what organisations can know
* Beer's Viable System Model: requisite variety for institutions [@Beer-brain72]
}

\include{_data-science/includes/new-flow-of-information.md}
\include{_business/includes/information-flow-structures.md}

\subsection{Conclusions}

\notes{We began with a tautology — self-governing systems cannot refer to external arbitration — and asked what mathematical structure it forces. The answer, obtained by applying the no-barber principle to information theory, turns out to be surprisingly rich.

*No-barber principle.* Formalised through the axiomatic frameworks of @Baez-characterisation11 and @Parzygnat-functorial22, the requirement of internal adjudicability prohibits outcome spaces, Hamiltonians, clocks, and external observers from appearing as primitives. The game must define everything it uses from within [@Lawrence-nobarber26].

*Information isolation.* The no-barber principle suggests the marginal entropy sum $\sum_i h_i = C$ as a global conservation law.

*Axiomatic selection.* The game structure requires a pure-state LME origin with positive marginal entropies — a configuration impossible under Shannon entropy [@Lawrence-origin26].

*Emergent effective rules.* With no Hamiltonian, no clock, and no spatial structure in the axioms, structure emerges. Entropy time provides an internal clock. In Gibbs-locked regions an effective Hamiltonian emerges from the modular generator [@Lawrence-hamiltonian26].

*Limits on intelligence.* By analogy with perpetual motion, information-theoretic constraints bound what any self-contained reasoning system can achieve. A system that cannot refer outside itself cannot access information it has not already processed.}

\slides{
* No-barber principle
* Information isolation
* Axiomatic selection
}

\newslide{Conclusions}

\slides{
* Emergent effective rules
* Limits on intelligence
* Social Oranisation
}

\thanks

\references
