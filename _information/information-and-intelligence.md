---
title: "Information and Intelligence"
abstract: |
  In 1925 the automobile was already transforming the world. Imagine if promises had been made of a car that needed no fuel.  We would 
  call that a perpetual motion machine, and we know why it is
  impossible: the second law of thermodynamics. A century later the analogous promise is
  superintelligence. I have no doubt that AI will transform our world
  as much as the automobile did. I also have no doubt that the promise
  of unbounded intelligence is as empty as the promise of unbounded
  motion.

  Thermodynamics limits mechanical engines. Information theory should
  limit information engines. To make that claim precise we need a
  setting in which the rules cannot appeal to an external referee — a
  self-governing system, in the same sense that the laws of physics
  cannot pause to check VAR. That is the inaccessible game: a
  zero-player, information-theoretic dynamical system whose only
  admissible rules are those that can be adjudicated from within.

  From a tautology — self-governing systems cannot refer to external
  arbitration — a surprisingly specific structure follows. A
  "no-barber" principle, in the spirit of Russell's paradox, forbids
  external observers, pre-specified outcome spaces, and privileged
  clocks. What remains is information isolation, a conservation law on
  marginal entropy, and, in the thermodynamic limit, an equivalence
  between that conservation and energy. The same constraints that rule
  out perpetual motion begin to look like constraints on intelligence.
author:
- family: Lawrence
  given: Neil D.
  gscholar: r3SJcvoAAAAJ
  institute: University of Cambridge
  twitter: lawrennd
  url: http://inverseprobability.com
date: 2026-10-12
length:
  talk: 40
  questions: 20
venue: "The Stokes Society, Pembroke College"
geometry: ["a4paper", "margin=2cm"]
papersize: a4paper
transition: None
---

<!-- Stokes Society, 12 October 2026. General-audience sibling of
     Information, Energy and Intelligence (MacKay memorial,
     2026-03-27), reordered: perpetual motion / superintelligence
     first as motivation, then the inaccessible game. -->

\section{Motivation}

\include{_information/includes/perpetual-motion-superintelligence-analogy.md}
\include{_information/includes/information-limits-on-intelligence.md}

\section{Information}

\include{_physics/includes/multigame-entropy.md}
\include{_physics/includes/jaynes-maximum-entropy.md}
\include{_ml/includes/velocity-independent-sample.md}
\include{_ml/includes/velocity-correlated-sample.md}
\include{_ml/includes/velocity-gaussian-contours.md}
\include{_physics/includes/classical-observer-velocities.md}

\section{The Inaccessible Game}

\include{_information-game/includes/munchkin-provision.md}

\subsection{A Tautology}

\notes{> Self-governing systems cannot refer to external arbitration.}

\slides{> Self-governing systems cannot refer to external arbitration.}

\notes{While this is a tautology, we will try to formalise it through information theory. The key question is: what mathematical structure is forced on a system that cannot appeal to external adjudication?}

\include{_information-game/includes/no-barber-principle.md}
\include{_information-game/includes/baez-information-loss-axioms.md}
\include{_information-game/includes/inaccessible-game-set-up.md}
\include{_information-game/includes/information-isolation.md}
\include{_information-game/includes/observer-inaccessible-entropy.md}
\include{_physics/includes/i-plus-h-equals-c.md}

\section{Energy}

\include{_information-game/includes/energy-constraints-intro.md}

\newslide{Energy}

\slidesincremental{
* In certain thermodynamic limits:
  * Marginal entropy conservation $\equiv$ Energy conservation

See @Lawrence-inaccessible25
}

\section{Intelligence}

\notes{The perpetual motion analogy is no longer only an analogy. Once the game is internally adjudicable, the same kind of constraint that forbids a fuel-less engine begins to look like a constraint on unbounded intelligence. Thermodynamics limits mechanical engines. Information isolation limits information engines. Superintelligence, on this view, is the claim that those limits can be wished away.}

\thanks

\references
