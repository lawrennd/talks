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
date: 2026-05-20
venue: Information Theory Seminar, Centre for Mathematical Sciences (MR5), University of Cambridge
transition: None
talkscam:
---

\include{_information-game/includes/munchkin-provision.md}

\subsection{A Tautology}

\notes{> Self-governing systems cannot refer to external arbitration.}

\slides{> Self-governing systems cannot refer to external arbitration.}

\notes{While this is a tautology, we're going to try and suggest how to formalise this notion through information theory.}

\section{Foundations: Information Loss and Entropy}

\include{_information-game/includes/inaccessible-game-set-up.md}

<!-- include{_physics/includes/entropy-billiards.md} -->
<!-- include{_physics/includes/entropy-histogram.md} -->
\include{_physics/includes/multigame-entropy.md}

\include{_ml/includes/velocity-independent-sample.md}

\include{_ml/includes/velocity-correlated-sample.md}

\include{_physics/includes/jaynes-maximum-entropy.md}

\subsection{Exponential Family}

\notes{This mirrors a broadly used representation in statistics known as the *exponential family*.}

\slides{
$$
p(X|\boldsymbol{\theta}) = \exp\left(\sum_i \theta_i T(X) - \phi(\boldsymbol{\theta})\right)
$$
where
$\theta_i = -\lambda_i$
}
\notes{$$
p(X|\boldsymbol{\theta}) = \exp\left(\sum_i \theta_i T(X) - \phi(\boldsymbol{\theta}_i)\right)
$$
where
$\theta_i = \lambda_i$
}

\include{_ml/includes/velocity-gaussian-contours.md}

\include{_physics/includes/classical-observer-velocities.md}

\section{Back to self adjudication}

\include{_information-game/includes/no-barber-principle.md}

\include{_information-game/includes/observer-inaccessible-entropy.md}

\section{Energy}

\include{_information-game/includes/energy-constraints-intro.md}

\include{_physics/includes/i-plus-h-equals-c.md}

\subsection{Long Story Short}

\notes{Building on these ideas, some interesting conclusions emerge. The marginal entropy constraint leads to GENERIC-like dynamics [@Grmela-dynamics97,@Ottinger-beyond05].}

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

\include{_physics/includes/pendulum-animation.md}

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

\subsection{Open Questions}

\notes{Many questions remain:

1. Can we formalize the no-barber principle more rigorously?
2. What is the right internal notion of "stage"/sample space for the game?
3. When are selections actually forced (vs design degrees of freedom)?
4. Can this be extended beyond symmetric configurations / beyond the origin?
5. What other structures emerge from internal adjudicability?

These point toward future work at the intersection of information theory, geometry, and foundations.}

\slides{
**Open Questions:**

* Formalise no barber principle
* What is the stage/game board/space
* Much to explore
}

\thanks

\references
