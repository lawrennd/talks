---
title: "Information, Energy and Intelligence"
subtitle: "What Emerges from Internal Adjudicability?"
abstract: |
  David MacKay's work emphasized explicit assumptions and operational clarity in modeling information and inference. In games like Conway's Life, rules are explicit and self-contained. In analytic frameworks, we often take implicit adjudicators for granted—external observers, pre-specified outcome spaces, privileged decompositions. What if we forbid such external adjudication and seek only rules that can be applied from within the system?
  
  This talk explores the "inaccessible game," an information-theoretic dynamical system where all rules must be internally adjudicable. Starting from three axioms characterizing information loss (Baez-Fritz-Leinster), we show how a "no-barber principle" selects marginal entropy conservation, maximum entropy dynamics, and specific substrate properties, not by assumption but by consistency requirements. We explore when the constraints imply energy-entropy equivalence in the thermodynamic limit and how entropy time becomes a distinguished clock withn the framework.
  
  This work is dedicated to the memory of David MacKay.
author:
- family: Lawrence
  given: Neil D.
  gscholar: r3SJcvoAAAAJ
  institute: University of Cambridge
  twitter: lawrennd
  url: http://inverseprobability.com
date: 2026-03-27
venue: Cambridge Philosophical Society - David MacKay Memorial Meeting, Cambridge University Engineering Department
transition: None
---

\include{_information/includes/david-mackay-memorial.md}

\subsection{A Tautology}

\notes{> Self-governing systems cannot refer to external arbitration.}

\slides{> Self-governing systems cannot refer to external arbitration.}

\notes{While this is a tautology, we're going to try and suggest how to formalise this notion. Given that this is a memorial to David, we're going to look to define it through information theory.}

\notes{When I arrived in Cambridge in February 1998, David was already working on coding and his meetings consisted of discussions of information theory, which was new to me. My background was as a Mechanical Engineer, and what I had learnt about Bayesian probability came from a terms preparation for my PhD at Aston University.}

\notes{David's lectures consisted of discussions of Shannon limits and low density parity checking codes. It seemed a little familiar because the decoding was achieved through Bayesian updates.}

\newslide{Formalisation}

\slides{* Use information theory.
* Introduced to me in David's group meetings from February 1998.}



\include{_physics/includes/entropy-billiards.md}
\include{_physics/includes/multigame-entropy.md}

\include{_ml/includes/two-d-gaussian-independent-sample.md}

\newslide{Correlation}
\slides{
* Correlation is when two variables are dependent
}

\include{_ml/includes/two-d-gaussian-correlated-sample.md}

\newslide{The Classical Observer}

\figure{\includediagramslide{\diagramsDir/physics/observer-eye}{60%}}{A classical physics observer: watching from outside the system, never disturbing it. Shortly, we will see what happens when the observer steps inside.}{fig:observer-eye}

\include{_physics/includes/observer-outside.md}
\include{_physics/includes/observer-inside.md}

\section{Foundations: Information Loss and Entropy}

\include{_information-game/includes/inaccessible-game-set-up.md}
\include{_information-game/includes/information-isolation.md}


\include{_information-game/includes/no-barber-principle.md}

\include{_maths/includes/lawvere-diagonalisation.md}

\include{_information-game/includes/inaccessible-game-introduction.md}

\section{Information Dynamics}

\subsection{The Conservation Law}

\include{_physics/includes/i-plus-h-equals-c.md}

\subsection{Information Relaxation}

\include{_physics/includes/information-relaxation-mep.md}
\include{_physics/includes/constrained-maximum-entropy-production.md}

\subsection{Entropy Time (Internal Clock)}

\notes{A small but important design point: if we allow an \emph{external} time parameter, we've already violated the no-barber spirit. One candidate is to parameterise trajectories by entropy production itself (an affine freedom remains: choosing units and an origin for the clock). This keeps the ordering internal and avoids appealing to an externally supplied clock.}

\slides{
**Entropy Time:**

* Avoid an externally supplied clock
* Use entropy production to parameterise flow
* Scale/offset are just unit conventions
}

<!--\section{Emergent Structure: GENERIC}

\subsection{What is GENERIC?}

\notes{The constrained maximum entropy production leads to a GENERIC-like structure. A framework from non-equilibrium thermodynamics that combines reversible (energy conserving) and irreversible dynamics (entropy producing).}

\include{_physics/includes/generic-framework-intro.md}
\include{_physics/includes/generic-equation-structure.md}

\subsection{Automatic Degeneracy}

\notes{In standard GENERIC applications, ensuring thermodynamic consistency requires careful hand-crafting of operators. In our framework, the consistency conditions emerge automatically.}

\include{_physics/includes/degeneracy-conditions-automatic.md}

\section{Information Topography}

\notes{The Fisher information matrix provides mathematical precision to the intuitive notion of an "information topography"—the landscape that shapes how information can flow.}

\include{_information-game/includes/fisher-as-conductance-tensor.md}
\include{_information/includes/information-topography-definition.md}
\include{_information-game/includes/fisher-information-geometry.md}

\section{Connecting Information to Energy}

\subsection{The Thermodynamic Limit}

\notes{Perhaps the most surprising result is that our information-theoretic constraint becomes equivalent to energy conservation in appropriate limits.}

\include{_physics/includes/thermodynamic-limit-equivalence.md}

\subsection{GENERIC and Thermodynamics}

\include{_physics/includes/generic-thermodynamics-connection.md}

\section{Landauer's Principle}

\notes{With the energy-entropy equivalence established, we can derive Landauer's principle—the fundamental limit on information erasure—from our information-theoretic framework.}

\include{_information-game/includes/landauer-from-inaccessible-game.md}
\include{_information-game/includes/landauer-shannon-connection.md}
-->
\section{Implications}

\subsection{Information-Theoretic Limits}

\notes{The framework reveals fundamental constraints on information processing systems, including intelligent systems.}

\include{_information/includes/information-limits-on-intelligence.md}

\subsection{A Thought on Intelligence}

\notes{The perpetual motion analogy provides an accessible way to think about claims of unbounded intelligence.}

\include{_information/includes/perpetual-motion-superintelligence-analogy.md}
\include{_ai/includes/superintelligence-as-perpetual-motion.md}

\section{Conclusions}

\notes{We have explored what emerges when we demand internal adjudicability in an information-theoretic dynamical system. Starting from consistency requirements rather than physical assumptions, we derived:}

\slides{
**From Internal Adjudicability:**

No-barber principle
$\Downarrow$
Information isolation: $\sum h_i = C$
$\Downarrow$

* GENERIC structure emerges
* Energy-entropy equivalence
* Landauer's principle
* Information bounds
}

\notes{This reverses the usual logic. Rather than starting with thermodynamics and deriving information bounds, we start with information-theoretic consistency and derive thermodynamic structure. This suggests Wheeler's "it from bit" vision may be realisable: physical laws emerging from information-theoretic constraints.}

\subsection{Broader Relevance?}

\include{_information/includes/theory-construction-hint.md}

\subsection{David MacKay's Legacy}

\notes{David MacKay taught us to ask: "What are the fundamental constraints? What do the numbers actually say?" This work follows that tradition—making assumptions explicit, exploring consequences rigorously, and letting the mathematics reveal structure.}

\notes{I hope that David would have appreciated the attempt to build foundations carefully, to derive rather than assume, and to use mathematical structure to illuminate real constraints. His legacy continues in work that combines technical rigour with conceptual clarity.}

\slides{
**MacKay's Approach:**

* Make assumptions explicit
* Explore consequences rigorously  
* Let mathematics reveal structure
* Use reasoning to illuminate constraints

**This work continues that tradition**
}

\include{_information-game/includes/no-barber-selections.md}

\subsection{Open Questions}

\notes{Many questions remain:

1. Can we formalize "axiomatic distinguishability" more rigorously?
2. Does the Jacobi identity hold globally, or only for symmetric configurations?
3. Can this framework extend to quantum systems beyond the origin?
4. What other structures emerge from internal adjudicability?
5. Does this constraint illuminate other areas of theory construction?

These point toward future work at the intersection of information theory, geometry, and foundations.}

\notes{A common worry is Gödel-style: can any sufficiently expressive system be fully self-adjudicating? The no-barber principle is not a claim of completeness. It is a \emph{consistency condition}: don't quantify over distinctions the system cannot internally represent. If more external structure is needed, the demand is simply that it be made explicit.}

\slides{
**Open Questions:**

* Formalise no barber principle
* What is the stage/game board/space

*Much to explore*
}

\thanks

\references
