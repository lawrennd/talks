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
date: 2025-04-15
ipynb: true
geometry: ["a4paper", "margin=2cm"]
papersize: a4paper
venue: "Departmental Seminar, Department of Computer Science, University of Manchester"
transition: None
---

# Some notes from discussing with ChatGPT-4o

# Unfolding Systems: An Entropy-Based Information Game

## Overview

This document outlines a model designed to explore how structure, causality, and time can emerge within a system governed solely by internal information dynamics—without relying on assumptions from traditional physics such as observers, measurements, or collapse. The model serves two purposes:

* As a research framework for exploring how physical-like phenomena may emerge from constrained information flows;
* As a tutorial tool to help non-physicists grasp deep ideas from physics through simple, internally coherent rules.


## Motivation

Many fundamental concepts in physics—like entropy, symmetry breaking, irreversibility, causality, and measurement—can be difficult to explain without invoking the machinery of classical or quantum mechanics. This model offers an alternative:

A minimalist system that evolves purely through information-theoretic constraints, yet gives rise to many structures familiar from physics.

This allows students or researchers to watch these concepts emerge rather than taking them as axioms, offering a bottom-up route to intuition.

## Core Ingredients

## State Variables

	* The system consists of a set of variables $Z$, partitioned at any time into:
		* $M$: latent variables (the information reservoir)
		* $X$: active variables, contributing to observable structure

## Initial Condition
	
	* The system starts in a zero-entropy state:
	* This is a pure quantum state
	* All variables are in $M$: no observable structure exists
	* A maximum entropy bound $N$ bits is imposed

## Information Representation

	* States are described via density matrices \rho(\eta) belonging to a (quantum) exponential family
    $$
	\rho(\eta) = \frac{1}{Z(\eta)} \exp\left( \sum_i \eta_i H_i \right)
	$$
	* \eta: natural parameters, defining the system’s informational geometry


## Dynamics: Steepest Ascent in Entropy Geometry
	
	* The system evolves via steepest ascent of entropy in natural parameter space:
$$
\frac{d\eta}{dt} = -\mathcal{I}(\eta) \eta
$$
	* \mathcal{I}(\eta): Fisher Information Matrix, defining the system's local curvature

## Resolution Threshold
	
	* The system has a finite resolution $\varepsilon$
	* A variable $\eta_i$ is detectably active if:
$$
|\dot{\eta}_i| \geq \varepsilon
$$

## Key Mechanism: Emergence through Symmetry Breaking
	
	* The system begins in a maximally symmetric state (e.g., full mixture or isotropic curvature)
	* Due to curvature anisotropy and resolution limits, some directions emerge first
	* When $\eta_i$ crosses threshold, it moves from $M$ to $X$
	* This triggers a symmetry-breaking event and expands the system's active dimensionality

## Entropy-Time and Irreversibility

	* Define entropy-time $\tau$:
	$$
	\tau(t) := S_X(t)
	$$
	* This internal, monotonic parameter replaces coordinate time
	* It tracks the unfolding of structure and defines:
	* Causal order of variable emergence
	* Irreversibility (since $\tau$ only increases)
	* Time directionality based on entropy growth


## Information Flow and Locality
	
	* The off-diagonal terms $\mathcal{I}_{XM}$ represent curvature coupling between active and latent variables
	* These terms define:
	* Information flow from $M$ to $X$
	* Influence without activation (latent memory)
	* Conditions for conditional independence and emergent locality

## Variational Structure (Inspired by Frieden's EPI)

	* Reinterpreting Frieden's principle:
	* $J$: latent curvature in $M$
	* $I$: active Fisher information in $X$
	* Variational principles apply within symmetry classes:
    $$
	\delta \int_{\tau_i}^{\tau_{i+1}} \eta_X^T \mathcal{I}_{XX} \eta_X \, d\tau = 0
	$$
	* Transitions (symmetry-breaking events) are discrete and define the boundaries of valid variational domains

## Emergent Structures

From these simple ingredients, we recover rich behaviour:

| Emergent Feature | Mechanism |
+------------------+-----------+
| Causality	| Ordered emergence in entropy-time
| Memory	| Latent variables steer active evolution
| Irreversibility	| Entropy-time monotonicity
| Locality	| Conditional independence via weak curvature coupling
| Dimensional expansion	| Variable emergence through detectable curvature
| Action-like dynamics	| Piecewise entropy-gradient flow
| No observers or collapse	| All structure emerges internally from constraints

## Next Steps / Directions

This structure sets the stage for:
	
  * Visualization of unfolding entropy geometry
  * Exploring agency, predictability, or self-reference
  * Mapping to thermodynamic concepts (without thermodynamics)
  * Extending to computational or epistemic systems

It also invites research into:

  * Observer-free generalizations of variational principles
  * How different resolution thresholds affect trajectory space
  * Whether time-reversal or memory-erasure is possible in subspaces



\include{_physics/includes/entropy-intro.md}
\include{_physics/includes/maxwells-demon.md}

\include{_information-game/includes/information-theory-overview.md}

\include{_information-game/includes/the-animal-game.md}

\include{_information-game/includes/intelligence-thermodynamics-connection.md}

\include{_physics/includes/jaynes-maximum-entropy.md}
\include{_information-game/includes/jaynes-world.md}
\include{_physics/includes/jaynes-minimal-entropy.md}
\include{_information-game/includes/jaynes-world-histogram.md}
\include{_information-game/includes/two-bin-example.md}
\include{_information-game/includes/jaynes-world-uncertainty-principle.md}
\include{_physics/includes/jaynes-density-matrices.md}
\include{_information-game/includes/quantum-exponential-family.md}
\include{_information-game/includes/minimal-entropy-states.md}
\include{_information-game/includes/gradient-ascent-uncertainty.md}
\include{_information-game/includes/uncertainty-visualisation.md}
\include{_information-game/includes/gradient-ascent-large-system.md}
\include{_information-game/includes/four-bin-saddle-example.md}
\include{_information-game/includes/jaynes-world-saddle-points.md}
\include{_information-game/includes/gradient-flow-least-action.md}
\include{_information-game/includes/epi-entropy-equivalence.md}
\include{_information-game/includes/spontaneous-organization.md}
\include{_information-game/includes/conditional-independence-structures.md}
\include{_information-game/includes/landauer-shannon-connection.md}
\include{_information-game/includes/mgf-analysis-example.md}

\include{_information-game/includes/jaynes-world-information-reservoirs.md}
\include{_information-game/includes/hierarchical-memory-example.md}

\include{_information-game/includes/jaynes-world-conceptual-framework.md}
\include{_information-game/includes/jaynes-world-conclusion.md}



\subsection{Unifying Perspectives on Intelligence}

\notes{
There are multiple perspectives we can take to understanding optimal decision making: entropy games, thermodynamic information engines, least action principles (and optimal control), and Schrödinger's bridge - provide different views. Through introducing Jaynes' world we look to explore the relationship between these different views of decision making to provide a more complete perspective of the limitations and possibilities for making optimal decisions.
}

\slides{
* Intelligence through multiple lenses:
  * Entropy game: Intelligence as optimal questioning
  * Information engines: Intelligence as energy-efficient computation
  * Least action: Intelligence as path optimization
  * Schrödinger's bridge: Intelligence as probability transport
* Jaynes' world: Initial attempt to Bridge between different views.
}

\include{_information-game/includes/unified-intelligence-perspective.md}



\thanks

\references
