---
title: "Information, Energy and Intelligence"
subtitle: "What Emerges from Internal Adjudicability?"
abstract: |
  David MacKay's work emphasized explicit assumptions and operational clarity in modeling information and inference. In games like Conway's Life, rules are explicit and self-contained. In analytic frameworks, we often take implicit adjudicators for granted—external observers, pre-specified outcome spaces, privileged decompositions. What if we forbid such external adjudication and seek only rules that can be applied from within the system?
  
  This talk explores the "inaccessible game," an information-theoretic dynamical system where all rules must be internally adjudicable. Starting from three axioms characterizing information loss (Baez-Fritz-Leinster), we show how a "no-barber principle" selects marginal entropy conservation, maximum entropy dynamics, and specific substrate properties—not by assumption but by consistency requirements. These constraints generate GENERIC structure (combining reversible and irreversible dynamics), imply energy-entropy equivalence in the thermodynamic limit, and yield Landauer's principle as a derived consequence. The framework suggests that certain thermodynamic structures may emerge from information-theoretic consistency rather than being independently imposed, and hints at broader relevance for theory construction.
  
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
\include{_information/includes/mackay-explicit-assumptions.md}

\section{The No-Barber Principle}

\notes{We begin with a conceptual constraint inspired by Russell's paradox: demanding that the rules of our system not appeal to external adjudicators or reference points.}

\include{_information-game/includes/no-barber-principle.md}

\section{Foundations: Information Loss and Entropy}

\subsection{The Three Axioms}

\include{_information-game/includes/baez-information-loss-axioms.md}

\subsection{Information Isolation: Selected by No-Barber}

\include{_information-game/includes/information-isolation-selected.md}

\section{The Inaccessible Game}

\notes{With these foundations, we can now introduce the game itself.}

\include{_information-game/includes/inaccessible-game-introduction.md}

\section{Information Dynamics}

\subsection{The Conservation Law}

\include{_physics/includes/i-plus-h-equals-c.md}

\subsection{Information Relaxation}

\include{_physics/includes/information-relaxation-mep.md}
\include{_physics/includes/constrained-maximum-entropy-production.md}

\section{Emergent Structure: GENERIC}

\subsection{What is GENERIC?}

\notes{One of the most remarkable consequences of constrained maximum entropy production is the emergence of GENERIC structure—a framework from non-equilibrium thermodynamics that combines reversible and irreversible dynamics.}

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

\notes{This reverses the usual logic. Rather than starting with thermodynamics and deriving information bounds, we start with information-theoretic consistency and derive thermodynamic structure. This suggests Wheeler's "it from bit" vision may be realizable: physical laws emerging from information-theoretic constraints.}

\subsection{Broader Relevance?}

\include{_information/includes/theory-construction-hint.md}

\subsection{David MacKay's Legacy}

\notes{David MacKay taught us to ask: "What are the fundamental constraints? What do the numbers actually say?" This work follows that tradition—making assumptions explicit, exploring consequences rigorously, and letting the mathematics reveal structure.}

\notes{David would have appreciated the attempt to build foundations carefully, to derive rather than assume, and to use mathematical structure to illuminate real constraints. His legacy continues in work that combines technical rigor with conceptual clarity.}

\slides{
**MacKay's Approach:**

* Make assumptions explicit
* Explore consequences rigorously  
* Let mathematics reveal structure
* Use reasoning to illuminate constraints

**This work continues that tradition**
}

\subsection{Open Questions}

\notes{Many questions remain:

1. Can we formalize "axiomatic distinguishability" more rigorously?
2. Does the Jacobi identity hold globally, or only for symmetric configurations?
3. Can this framework extend to quantum systems beyond the origin?
4. What other structures emerge from internal adjudicability?
5. Does this constraint illuminate other areas of theory construction?

These point toward future work at the intersection of information theory, geometry, and foundations.}

\slides{
**Open Questions:**

* Formalize axiomatic distinguishability?
* Global Poisson structure?
* Quantum extension?
* Other emergent structures?
* Broader applicability?

*Much to explore*
}

\thanks

\references
