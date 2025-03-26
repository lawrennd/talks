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
\include{_physics/includes/maxwells-demon.md}

\include{_information-game/includes/information-theory-overview.md}

\include{_information-game/includes/the-animal-game.md}
\include{_information-game/includes/optimal-questioning.md}

\include{_information-game/includes/intelligence-thermodynamics-connection.md}

\include{_information-game/includes/jaynes-world.md}
\include{_information-game/includes/valid-games.md}

\include{_information-game/includes/two-bin-example.md}
\include{_information-game/includes/jaynes-world-histogram.md}

\include{_information-game/includes/four-bin-saddle-example.md}
\include{_information-game/includes/jaynes-world-saddle-points.md}
\include{_information-game/includes/gradient-flow-least-action.md}

\include{_information-game/includes/jaynes-world-uncertainty-principle.md}
\include{_information-game/includes/uncertainty-visualisation.md}
\include{_information-game/includes/mgf-analysis-example.md}

\include{_information-game/includes/jaynes-world-information-reservoirs.md}
\include{_information-game/includes/hierarchical-memory-example.md}

\include{_information-game/includes/jaynes-world-conceptual-framework.md}
\include{_information-game/includes/jaynes-world-conclusion.md}


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
