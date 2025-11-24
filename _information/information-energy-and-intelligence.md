---
title: "Information, Energy and Intelligence"
subtitle: "Understanding Limits Through the Inaccessible Game"
abstract: |
  Our fascination with AI and promises of superintelligence mirror the excitement around perpetual motion machines a century ago. Just as thermodynamics places fundamental limits on engines, information theory places fundamental limits on intelligence. This talk introduces the "inaccessible game," an information-theoretic dynamical system built from four axioms. The game reveals how GENERIC structure—combining reversible and irreversible dynamics—emerges from information conservation, how energy and entropy become equivalent in the thermodynamic limit, and why Landauer's principle follows naturally. These results suggest that superintelligence claims violate fundamental information-theoretic constraints, much as perpetual motion violates thermodynamics.
  
  This work is dedicated to the memory of David MacKay, whose approach to cutting through hype with rigorous reasoning inspired this investigation.
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

\include{_information/includes/perpetual-motion-superintelligence-analogy.md}
\include{_information/includes/david-mackay-memorial.md}

\section{Information, Energy and Fundamental Limits}

\include{_information-game/includes/information-theory-overview.md}
\include{_information/includes/information-limits-on-intelligence.md}

\section{The Inaccessible Game}

\subsection{Foundations: The Four Axioms}

\include{_information-game/includes/baez-information-loss-axioms.md}
\include{_information-game/includes/information-conservation-axiom.md}
\include{_information-game/includes/inaccessible-game-introduction.md}

\section{Information Dynamics}

\subsection{The Conservation Law}

\include{_physics/includes/i-plus-h-equals-c.md}

\subsection{Information Relaxation}

\include{_physics/includes/information-relaxation-mep.md}
\include{_physics/includes/constrained-maximum-entropy-production.md}

\section{Emergence of Physical Structure}

\subsection{GENERIC: Reversible and Irreversible Dynamics}

\include{_physics/includes/generic-framework-intro.md}
\include{_physics/includes/generic-equation-structure.md}

\newslide{Automatic Degeneracy}

\include{_physics/includes/degeneracy-conditions-automatic.md}

\section{Information Topography}

\notes{The Fisher information matrix provides mathematical teeth to the intuitive notion of an "information topography" from *The Atomic Human*.}

\include{_information-game/includes/fisher-as-conductance-tensor.md}
\include{_information/includes/information-topography-definition.md}
\include{_information-game/includes/fisher-information-geometry.md}

\section{Connecting Information to Energy}

\subsection{The Thermodynamic Limit}

\include{_physics/includes/thermodynamic-limit-equivalence.md}

\subsection{GENERIC and Thermodynamics}

\include{_physics/includes/generic-thermodynamics-connection.md}

\section{Landauer's Principle}

\notes{One of the most fundamental results connecting information and energy is Landauer's principle. The inaccessible game allows us to derive it from first principles.}

\include{_information-game/includes/landauer-from-inaccessible-game.md}
\include{_information-game/includes/landauer-shannon-connection.md}

\section{Implications for Intelligence}

\subsection{Why Superintelligence is Like Perpetual Motion}

\include{_ai/includes/superintelligence-as-perpetual-motion.md}

\subsection{The Limits of Enhancement}

\include{_ai/includes/transhumanism.md}

\section{Conclusions}

\notes{The inaccessible game provides an information-theoretic foundation for understanding physical systems and, by extension, intelligent systems. Starting from four axioms—three from Baez characterizing information loss, and a fourth imposing information isolation—we derive:}

\slides{
**From Four Axioms:**

1. Functoriality (Baez)
2. Convex linearity (Baez)  
3. Continuity (Baez)
4. Information isolation (new)

**We Derive:**
* GENERIC structure
* Energy-entropy equivalence
* Landauer's principle
* Limits on intelligence
}

\notes{This reverses the usual logic where information bounds follow from thermodynamics. Here, thermodynamic structure emerges from information-theoretic principles. This suggests Wheeler's "it from bit" vision may be realizable: physical laws emerging from information-theoretic constraints.}

\notes{For intelligence, the message is clear: just as no clever arrangement of gears can create a perpetual motion machine, no clever arrangement of algorithms can create unbounded superintelligence. The constraints are fundamental, built into the structure of information itself.}

\slides{
**Key Messages:**

* Information theory → Thermodynamics (not reverse!)
* GENERIC emerges automatically from axioms
* Superintelligence violates information bounds
* Embodiment is necessity, not limitation

**"It from bit" realized**
}

\subsection{David MacKay's Legacy}

\notes{David taught us to ask: "What are the fundamental constraints? What do the numbers actually say?" This work aspires to follow in that tradition. By starting with information-theoretic axioms and deriving physical structure, we can rigorously understand why certain promises, whether perpetual motion or superintelligence, are impossible.}

\notes{I hope that David would have appreciated both the mathematical structure and its application to deflating hype. His legacy continues in work that uses careful reasoning to illuminate real constraints, helping us distinguish transformative but bounded progress from impossible dreams.}

\slides{
**David MacKay's Approach:**

* Start with fundamentals
* Build rigorous framework
* Let mathematics reveal truth
* Use reason to cut through hype

**This work continues that tradition**
}

\subsection{Open Questions}

\notes{Many questions remain open:

1. Can we prove that exponential families are necessary, not just convenient?
2. What is the initial state of the inaccessible game (the origin where $H=0$)?
3. Under what conditions does the Jacobi identity hold globally?
4. Can this framework extend to quantum systems?
5. What are the implications for understanding biological intelligence?

These questions point toward future work connecting information theory, physics, and the nature of intelligence.}

\slides{
**Open Questions:**

* Exponential families.
* Initial state of the game
* Global Poisson structure  

*Much to explore!*
}

\include{_information-game/includes/intelligence-thermodynamics-connection.md}

\thanks

\references

