---
title: "Information Topography"
subtitle: "A Journey Through Jaynes' World"
abstract: |
  Physical landscapes are shaped by elevation, valleys, and peaks. We might expect information 
  landscapes are molded by entropy, precision, and capacity constraints. To explore how these ideas might manifest we introduce Jaynes' world, an entropy game that maximises instantaneous entropy production. 
  
  In this talk we'll argue that this landscape has a precision/capacity trade-off that suggests the underlying configuration requires a density matrix representation.
author:
- family: Lawrence
  given: Neil D.
date: 2025-04-14
ipynb: true
geometry: ["a4paper", "margin=2cm"]
papersize: a4paper
venue: DALI Sorrento Meeting
transition: None
---

\include{_information-game/includes/jaynes-world-overview-and-definitions.md}

\newslide{The Information Game}
\slides{
- Introduced an information game
- Simple dynamics gradient ascent on von Neumann entropy
- Hypothesised complicated behaviour
}

\include{_information-game/includes/two-bin-example.md}

\include{_information-game/includes/four-bin-example.md}

\include{_information-game/includes/four-bin-saddle-example.md}

\thanks

\section{Appendix}
\appendix

\include{_information-game/includes/minimal-entropy-density-matrix-intro.md}

\newslide{The Minimal Entropy State}
\slides{
- System begins in state of minimal entropy
- Represented by density matrix $\rho(\boldsymbol{\theta})$
- Resolution constraint $\varepsilon \sim \frac{1}{2^N}$
}

\include{_information-game/includes/jaynesian-derivation-minimal-entropy.md}

\newslide{Key Insights}
\slides{
- Information topography emerges from precision/capacity trade-off
- Density matrix structure encodes fundamental limits
- System dynamics follow steepest entropy ascent
}

\references
