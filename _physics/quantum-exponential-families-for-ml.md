---
title: "Quantum Exponential Families for Machine Learning"
subtitle: "From Classical Information Geometry to Quantum Statistical Mechanics"
abstract: |
  If you know classical exponential families and information geometry, you already have the right conceptual framework for quantum statistical mechanics. The move to quantum is not a wholesale replacement; it is a minimal extension to handle one new feature: observables that do not commute.
  
  This talk provides an on-ramp to quantum probability and quantum statistical mechanics designed specifically for machine learning researchers familiar with exponential families, Fisher information, and natural gradients. We map classical probabilistic modeling objects—densities, sufficient statistics, log-partition functions, and Fisher metrics—directly to their quantum counterparts: density matrices, Hermitian operators, and the Bogoliubov–Kubo–Mori metric.
  
  The key obstacle is noncommutativity: matrices don't commute, so differentiating operator exponentials requires new calculus. We introduce the Duhamel formula as the computational fix, showing how it enables all the familiar exponential-family calculations to go through in the quantum setting. We then explore reversible dynamics (unitary evolution), the commutator form of quantum mechanics, and connections to Dyson series and path integrals.
  
  The goal is to demystify quantum mechanics for ML practitioners: it's the same probabilistic modeling and information-geometric framework you already use, plus one computational layer for matrix algebra.
author:
- family: Lawrence
  given: Neil D.
  gscholar: r3SJcvoAAAAJ
  institute: Department of Computer Science and Technology, University of Cambridge
  twitter: lawrennd
  url: http://inverseprobability.com
date: 2025-12-20
geometry: ["a4paper", "margin=2cm"]
papersize: a4paper
venue: TBA
transition: None
categories:
- Lawrence-quantum24
---

\section{Introduction}

\notes{This talk bridges classical and quantum statistical mechanics through the lens familiar to machine learning practitioners: exponential families and information geometry.

Rather than starting from wavefunctions and postulates, we show how quantum mechanics emerges naturally when you extend probabilistic modeling to allow observables that don't commute. The mathematics is similar—you still have log-partition functions, Fisher-like metrics, and natural parameters---but you need one new computational tool (Duhamel calculus) to handle matrix exponentials.

**Scope note:** We focus on the state space, expectations, and reversible dynamics. Measurement and update rules (Born rule, POVMs, etc.) are the extra layer we're not emphasising here---our goal is to show how far you can get with just "exponential families + noncommutativity."}

\slides{
**For ML + info-geometry folks:**

Same structure, one new obstacle (noncommutativity)

Classical exponential families $\rightarrow$ quantum exponential families

*Focus:* states, expectations, reversible dynamics (not measurement)
}

\section{From Classical to Quantum: The Exponential Family Bridge}

\include{_physics/includes/exponential-family-classical-to-quantum.md}

\section{Worked Example: Pauli Matrices (2×2 Case)}

\notes{Before moving to dynamics, let's make the quantum exponential family concrete with the simplest nontrivial case: a qubit (2-level system) using Pauli matrices.

This example shows exactly where noncommutativity appears, why naive differentiation fails, and how Duhamel resolves it.}

\slides{
**Concrete example:** 2×2 qubit exponential family

Shows: where noncommutativity bites + how Duhamel fixes it
}

\include{_physics/includes/pauli-exponential-family-example.md}

\section{Reversible Dynamics and Unitarity}

\notes{With the exponential-family structure in place, we now turn to dynamics: how states evolve in time. In classical probability, reversible transformations are measure-preserving bijections. In quantum probability, reversibility forces a different structure: unitary evolution.

This is not an arbitrary postulate—it's the natural notion of "information-preserving transformation" in a noncommutative setting.}

\slides{
**Next:** What does reversibility mean for quantum states?

→ Forces unitary dynamics $\rho \mapsto U\rho U^\dagger$
}

\include{_physics/includes/quantum-reversibility-unitarity.md}

\section{Computing with Quantum Exponential Families}

\notes{Now that we understand the structure (exponential families + reversible dynamics), we need the computational tools to actually work with operator exponentials. This is where Duhamel and Kubo–Mori calculus come in.

These are not new physical principles; they are the calculus you need to differentiate matrix exponentials when things don't commute.}

\slides{
**Computation layer:**

How to differentiate $e^{K(\theta)}$ when matrices don't commute
}

\include{_physics/includes/duhamel-kubo-mori-calculus.md}

\section{Connecting to Path Integrals and Dyson Series}

\notes{The Duhamel formula might look like an isolated trick for differentiating exponentials, but it's actually part of a broader family of techniques for handling noncommutativity. Time-ordered exponentials (Dyson series), Trotter product formulas, and path integrals all address the same fundamental issue: operator ordering matters.

This section shows how these different formulations connect, demystifying their relationship.}

\slides{
**Unifying theme:** operator ordering

Duhamel / Dyson / Trotter / path integrals = different faces of noncommutativity
}

\include{_physics/includes/duhamel-dyson-path-integral-bridge.md}

\section{The Origin Paradox: Why Quantum?}

\notes{A natural question remains: why do we need quantum mechanics at all? What configuration of reality requires noncommutative probability?

One compelling answer comes from considering a fundamental limit configuration: a globally pure state (zero joint entropy) with maximally uncertain local measurements (maximum multi-information). This configuration is forbidden in classical probability—Shannon entropy cannot be negative—but it is exactly the structure of quantum entanglement.

This "origin paradox" provides conceptual motivation for why nature might require the quantum framework.}

\slides{
**Why quantum at all?**

The "origin" configuration: globally pure + locally maximal uncertainty

→ Forbidden by classical (Shannon) entropy

→ Natural in quantum (von Neumann) entropy
}

\include{_physics/includes/origin-paradox-shannon-von-neumann.md}

\section{Conclusion: Quantum as Extended Probabilistic Modeling}

\notes{The key message for ML practitioners:

- **For states, expectations, and reversible dynamics**, quantum mechanics extends probabilistic modeling to handle noncommuting observables—it's not a wholesale paradigm replacement.
- **The exponential-family structure survives intact**: you still have log-partition functions, Fisher-like metrics (now BKM), natural parameters, and duality.
- **Duhamel calculus is the computational fix** for matrix exponentials, analogous to how you already use matrix calculus in deep learning.
- **Reversible dynamics (unitarity) is structural**, not arbitrary: it's the natural notion of information-preserving transformation in noncommutative probability for closed finite-dimensional systems.

With these tools, quantum statistical mechanics becomes accessible to anyone with a solid grounding in information geometry and exponential families. The measurement/update layer (Born rule, POVMs) adds additional structure beyond what we've covered, but the foundation is the same convex-analytic machinery you already know.}

\slides{
**Take-home for ML folks:**

1. Quantum (states/dynamics) = probabilistic modeling + noncommutativity
2. Exponential families work the same way (with Duhamel for derivatives)
3. BKM metric = canonical quantum Fisher (Hessian of $\psi$)
4. Unitarity = reversibility (closed systems, entropy preservation)
5. Measurement layer adds more structure (Born rule, POVMs)
6. You already have 90% of the conceptual framework
}

\subsection{Further Directions}

\notes{Topics not covered in this talk but natural extensions for ML applications:

- **Quantum natural gradient**: using the BKM metric for optimization on quantum state spaces.
- **Variational quantum algorithms**: exponential-family structure in variational quantum eigensolvers.
- **Quantum neural networks**: parameterized quantum circuits as exponential families.
- **Quantum-classical hybrid models**: combining commutative and noncommutative probability in the same framework.
- **Quantum generative models**: using quantum states as latent variable models.

Each of these areas becomes more accessible once you see quantum mechanics as "exponential families + matrix calculus".}

\slides{
**Further directions:**

- Quantum natural gradient
- Variational quantum algorithms  
- Quantum neural networks (parameterised circuits)
- Quantum-classical hybrid models
- Quantum generative models

All built on exponential-family + BKM structure
}

\thanks

\references

