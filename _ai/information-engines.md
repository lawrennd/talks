---
title: "Information Engines"
subtitle: "Exploring Connections Between Intelligence and Thermodynamics"
abstract: |
  The relationship between physical systems and intelligence has long fascinated researchers in computer science and physics. This talk explores fundamental connections between thermodynamic systems and intelligent decision-making through the lens of free energy principles.
  
  We examine how concepts from statistical mechanics - particularly the relationship between total energy, free energy, and entropy - might provide novel insights into the nature of intelligence and learning. By drawing parallels between physical systems and information processing, we consider how measurement and observation can be viewed as processes that modify available energy. The discussion encompasses how model approximations and uncertainties might be understood through thermodynamic analogies, and explores the implications of treating intelligence as an energy-efficient state-change process.
  
  While these connections remain speculative, they offer intriguing perspectives for discussing the fundamental nature of intelligence and learning systems. The talk aims to stimulate discussion about these potential relationships rather than present definitive conclusions.
author:
- family: Lawrence
  given: Neil D.
date: 2025-03-26
ipynb: true
geometry: ["a4paper", "margin=2cm"]
papersize: a4paper
venue: "Departmental Seminar, Department of Computer Science, University of Manchester"
transition: None
---

\include{_physics/includes/entropy-intro.md}
\include{_information-game/includes/information-theory-overview.md}

\section{The Entropy Game: Intelligence as Optimal Information Acquisition}

\notes{
Intelligence can be viewed as the capacity to efficiently reduce uncertainty about the world. The Information Entropy Game provides a powerful framework for exploring this perspective. In its simplest form, the game asks how we can identify an unknown entity with the minimum number of yes/no questions. This apparently simple problem reveals deep connections between intelligence, thermodynamics, and optimization.
}

\include{_information-game/includes/entropy-game-introduction.md}
\include{_information-game/includes/intelligence-thermodynamics-connection.md}
\include{_information-game/includes/optimal-questioning.md}

\section{Intelligence as an Information Engine}

\notes{
Having established the framework of the entropy game, we can now explore its connection to thermodynamic systems. Maxwell's demon thought experiment provides an intriguing parallel - a hypothetical entity that seems to decrease entropy through information acquisition. This leads us to consider intelligence itself as a form of "information engine" that converts information into useful work.
}

\include{_physics/includes/maxwells-demon.md}

\include{_ml/includes/szilard-intelligence-intro.md}
\include{_ml/includes/information-engines-concept.md}

\subsection{Free Energy and Intelligence}

\slides{
* Free energy: Energy available to do useful work
* Intelligence minimizes free energy through:
  * Accurate perception (reducing prediction errors)
  * Adaptive action (changing environmental states)
* Entropy game parallel: Questions reduce free energy of belief state
}

\notes{
The free energy principle suggests that intelligent systems operate to minimize a variational free energy bound on surprise. This perspective aligns remarkably well with the entropy game - where intelligent questioning reduces uncertainty (entropy) about the world. Both frameworks view intelligence as a process that minimizes uncertainty through strategic information acquisition.
}

\include{_ml/includes/szilard-energy-basics.md}

\section{Least Action Principles and Entropy Games}

\notes{
Physics teaches us that systems evolve along paths that minimize action - an integral of the Lagrangian over time. This principle of least action has profound connections to how intelligence operates in the entropy game. The optimal questioning strategy in the entropy game follows a path of maximum entropy reduction - effectively a least action principle for information acquisition.
}

\include{_information-game/includes/least-action-connection.md}

\section{Schrödinger's Bridge: Connecting Paths in Probability Space}

\slides{
* Schrödinger's bridge: Optimal transport between probability distributions
* Entropy game parallel: Transforming uncertain distribution to certain one
* Intelligence as optimal path through probability space
* Questioning as control over stochastic processes
}

\notes{
Schrödinger's bridge problem addresses finding the most likely evolution between two probability distributions. This directly connects to the entropy game, where we transform a distribution representing total uncertainty into one with certainty about our target. Intelligent questioning can be viewed as creating an optimal bridge between these states, with each question guiding the probability mass along this bridge.
}

\include{_information-game/includes/schrodingers-bridge-perspective.md}

\section{Unifying Perspectives on Intelligence}

\notes{
These multiple perspectives - entropy games, thermodynamic information engines, least action principles, and Schrödinger's bridge - provide complementary views of the same fundamental process: intelligence as optimal information processing. Each framework highlights different aspects of this process, but together they offer a more complete understanding than any single perspective could provide.
}

\slides{
* Intelligence through multiple lenses:
  * Entropy game: Intelligence as optimal questioning
  * Information engines: Intelligence as energy-efficient computation
  * Least action: Intelligence as path optimization
  * Schrödinger's bridge: Intelligence as probability transport
* Unified view: Intelligence as optimal information processing
}

\include{_information-game/includes/unified-intelligence-perspective.md}



\thanks

\references
