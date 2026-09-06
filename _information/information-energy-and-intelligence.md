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
\include{_information-game/includes/munchkin-provision.md}

\subsection{A Tautology}

\notes{> Self-governing systems cannot refer to external arbitration.}

\slides{> Self-governing systems cannot refer to external arbitration.}

\notes{While this is a tautology, we're going to try and suggest how to formalise this notion. Given that this is a memorial to David, we're going to look to define it through information theory.}

\notes{When I arrived in Cambridge in February 1998, David was already working on coding and his meetings consisted of discussions of information theory, which was new to me. My background was as a Mechanical Engineer, and what I had learnt about Bayesian probability came from a terms preparation for my PhD at Aston University.}

\notes{David's lectures consisted of discussions of Shannon limits and low density parity checking codes. It seemed a little familiar because the decoding was achieved through Bayesian updates.}

\section{Information}

\newslide{Information and Entropy}

\slidesincremental{* Probability and information theory ...
* David's group meetings from February 1998.
* MN codes, fountain codes, turbocodes}

\newslide{Dasher}

\notes{But perhaps the most memorable impression of the technology came through an interface software developed with David Ward and Alan Blackwell. The Dasher system allowed pointer based text entry.}

\figure{\includepng{\diagramsDir/ml/dasher-paper-title}{60%}}{The Dasher system [@Ward-dasher00] is a pointer based text entry system that gave a very practical demonstration of the power of probability.}

\slides{@Ward-dasher00}

\newslide{Dasher}

\figure{\includegif{\diagramsDir/ml/dasher-hello-world}{60%}}{Dasher is a single-mode text interface designed for use with a pointer. It also contains a language model and builds on arithmetic coding to suggest the next letter.}{dasher-hello-world}

\newslide{Dasher}

\notes{It had multiple extensions including a breath system which David later demonstrated in Sheffield in a workshop in 2004.}

\notes{One aspect that left an impression was the use of entropy to demonstrate communication rates.}

\figure{\includepng{\diagramsDir/ml/dasher-bits-per-second}{60%}}{The Dasher system [@Ward-dasher00] is a pointer based text entry system that gave a very practical demonstration of the power of probability.}

<!-- include{_information/includes/dasher.md} -->


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

\subsection{Waterhouse, MacKay and Robinson}

\notes{For me, I first saw this form of variational optimisation through @Waterhouse-bayesian96 work on Bayesian Mixtures of Experts.}

\figure{\includepng{\diagramsDir/ml/waterhouse-mackay-robinson-separable-posterior}{90%}}{Paragraph from @Waterhouse-bayesian96 just after equation (10) introducing a separable (mean-field) approximation to the full Bayesian posterior and the independent optimisation of each component.}{waterhouse-mackay-robinson-separable-posterior}
\slides{From @Waterhouse-bayesian96}

\notes{This approach became a mainstay of the variational Bayesian approach to machine learning.}
<!-- \subsection{The Classical Observer} -->

<!-- \figure{\includediagramclass{\diagramsDir/physics/observer-eye}{60%}}{A classical physics observer: watching from outside the system, never disturbing it. Shortly, we will see what happens when the observer steps inside.}{observer-eye} -->

<!-- include{_physics/includes/observer-outside.md} -->
<!-- include{_physics/includes/observer-inside.md} -->
\include{_ml/includes/velocity-gaussian-contours.md}
\include{_physics/includes/classical-observer-velocities.md}

\section{Back to self adjudication}

\include{_information-game/includes/no-barber-principle.md}

\newslide{The Game}

\slides{\figure{\includejpg{\diagramsDir/information/david-ultimate}{60%}}{David playing ultimate. Picture is taken from [one of his last blog posts](https://itila.blogspot.com/2016/04/perhaps-my-last-post-well-see.html).}{david-ultimate}}


\include{_information-game/includes/observer-inaccessible-entropy.md}
\section{Energy}

\include{_information-game/includes/energy-constraints-intro.md}

\include{_physics/includes/i-plus-h-equals-c.md}

\subsection{Long Story Short}

\notes{Building on these ideas, some interesting conclusions emerge. The marginal engropy constraint leads to GENERIC-like dynamics [@Grmela-dynamics97,@Ottinger-beyond05].}

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

\subsection{Energy}

\figure{\includepng{\diagramsDir/books/sustainable-energy-without-the-hot-air}{50%}}{David's book @MacKay-energy08 brought his clarity of thought to the challenge of sustainable energy.}{sustainable-energy-without-the-hot-air}
\slides{@MacKay-energy08}

\include{_physics/includes/pendulum-animation.md}
<!-- include{_physics/includes/maxwells-demon.md} -->

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

\subsection{David's Approach}

\notes{David MacKay taught us to ask: "What are the fundamental constraints? What do the numbers actually say?". Today this way of thinking still inspires me, and the inaccessible game is the work I'm interested in that I think comes closest in spirit to that legacy.}

\slidesincremental{
* Make assumptions explicit
* Explore consequences rigorously 
* Let mathematics reveal structure
* Use reasoning to illuminate constraints
}

\section{Conclusions and Inspiration}

\slidesincremental{
* I see that approach in others
* I hope to find it in my own work
}

\notes{We have explored what emerges when we demand internal adjudicability in an information-theoretic dynamical system. Starting from consistency requirements rather than physical assumptions, we derived:}


\thanks

\references
