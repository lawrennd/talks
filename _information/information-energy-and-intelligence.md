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

\newslide{Formalisation}

\slidesincremental{* Use information theory.
* Introduced to me in David's group meetings from February 1998.}

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

\include{_physics/includes/entropy-billiards.md}
\include{_physics/includes/entropy-histogram.md}
\include{_physics/includes/multigame-entropy.md}

\newslide{Sampling Two Dimensional Variables}

\setupplotcode{import mlai.plot as plot}
\plotcode{plot.independent_gaussians_sample(num_samps=8, 
                               xlabel='$v_x$',
                               ylabel='$v_y$',
                               filestub="independent_velocities",
                               diagrams='\writeDiagramsDir/ml')}
							   
							
\setupdisplaycode{import notutils as nu
from ipywidgets import IntSlider}

\displaycode{nu.display_plots('independent_velocities{fig:0>3}.svg', 
                            directory='\writeDiagramsDir/ml', 
							fig=IntSlider(0, 0, 7, 1))}

\slides{
\define{width}{70%}
\startanimation{independent_velocities}{0}{7}
\newframe{\includediagram{\diagramsDir/ml/independent_velocities000}{\width}}{independent_velocities}
\newframe{\includediagram{\diagramsDir/ml/independent_velocities001}{\width}}{independent_velocities}
\newframe{\includediagram{\diagramsDir/ml/independent_velocities002}{\width}}{independent_velocities}
\newframe{\includediagram{\diagramsDir/ml/independent_velocities003}{\width}}{independent_velocities}
\newframe{\includediagram{\diagramsDir/ml/independent_velocities004}{\width}}{independent_velocities}
\newframe{\includediagram{\diagramsDir/ml/independent_velocities005}{\width}}{independent_velocities}
\newframe{\includediagram{\diagramsDir/ml/independent_velocities006}{\width}}{independent_velocities}
\newframe{\includediagram{\diagramsDir/ml/independent_velocities007}{\width}}{independent_velocities}
\endanimation
}
\notes{\figure{\includediagram{\diagramsDir/ml/independent_velocities007}{70%}}{Samples from independent Gaussian variables that represent horizontal and vertical velocities when our system is at equilibrium.}{independent-height-weight-7}}

\newslide{Correlation}
\slidesincremental{
* Correlation is when two variables are dependent
}

\subsection{Sampling Two Dimensional Variables}

\setupplotcode{import mlai.plot as plot}
\plotcode{plot.correlated_gaussians_sample(num_samps=8, 
                              xlabel='$v_x$',
                              ylabel='$v_y$',
                              filestub='correlated_velocities',
                              diagrams='\writeDiagramsDir/ml')}

\setupdisplaycode{import notutils as nu
from ipywidgets import IntSlider}

\displaycode{nu.display_plots('correlated_velocities{fig:0>3}.svg', 
                            directory='\writeDiagramsDir/ml', 
							fig=IntSlider(0, 0, 7, 1))}


\slides{
\define{weight}{70%}
\startanimation{correlated_velocities}{0}{7}
\newframe{\includediagram{\diagramsDir/ml/correlated_velocities000}{\width}}{correlated_velocities}
\newframe{\includediagram{\diagramsDir/ml/correlated_velocities001}{\width}}{correlated_velocities}
\newframe{\includediagram{\diagramsDir/ml/correlated_velocities002}{\width}}{correlated_velocities}
\newframe{\includediagram{\diagramsDir/ml/correlated_velocities003}{\width}}{correlated_velocities}
\newframe{\includediagram{\diagramsDir/ml/correlated_velocities004}{\width}}{correlated_velocities}
\newframe{\includediagram{\diagramsDir/ml/correlated_velocities005}{\width}}{correlated_velocities}
\newframe{\includediagram{\diagramsDir/ml/correlated_velocities006}{\width}}{correlated_velocities}
\newframe{\includediagram{\diagramsDir/ml/correlated_velocities007}{\width}}{correlated_velocities}
\endanimation
}

\notes{\figure{\includediagram{\diagramsDir/ml/correlated_velocities007}{70%}}{Samples from *correlated* Gaussian variables that represent vertical and horizontal velocity.}{correlated-velocities-7}}


\include{_physics/includes/jaynes-maximum-entropy.md}

\subsection{Exponential Family}

\notes{This mirrors a braodly used representation in statistics known as the \emph{exponential family.}

\slides{
$$
p(X|\boldsymbol{\theta}) = \exp\left(\sum_i \theta_i T(X) - \phi(\boldsymbol{\theta}_i)\right)
$$
where
$\theta_i = \lambda_i$
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
<!--
\subsection{The Classical Observer}

\figure{\includediagramclass{\diagramsDir/physics/observer-eye}{60%}}{A classical physics observer: watching from outside the system, never disturbing it. Shortly, we will see what happens when the observer steps inside.}{observer-eye}

\include{_physics/includes/observer-outside.md}
\include{_physics/includes/observer-inside.md}
-->
\setuphelpercode{import mlai.plot as plot
import mlai
import numpy as np
import os}

\helpercode{def plot_correlated_gaussian(mu_x = 0, 
                             var_x = 1, mu_y = 0, var_y = 1, 
						     xlabel = "$v_x$", ylabel = "$v_y$", correlation = 0.5, ax=None, diagrams="\writeDiagramsDir/ml"):

    sd_x = np.sqrt(var_x)
    sd_y = np.sqrt(var_y)
    tau = 2*np.pi

    x = np.linspace(mu_x-3*sd_x, mu_x+3*sd_x, 100)[:, np.newaxis]
    y = np.linspace(mu_y-3*sd_y, mu_y+3*sd_y, 100)[:, np.newaxis]

    p_x = 1/np.sqrt(tau*var_x)*np.exp(-1/(2*var_x)*(x - mu_x)**2)
    p_y = 1/np.sqrt(tau*var_y)*np.exp(-1/(2*var_y)*(y - mu_y)**2)

    covMat = np.asarray([[1, correlation], [correlation, 1]])
    fact = np.asarray([[sd_x, 0], [0, sd_y]])
    covMat = np.dot(np.dot(fact,covMat), fact)
    v, R = np.linalg.eig(covMat)
	if ax is None:
	    fig, ax = plt.subplots(1, 1, figsize=plot.big_figsize)

    ax.plot(mu_x, mu_y, 'x', color=[1., 0., 1.], markersize=5, linewidth=3)
    theta = np.linspace(0, tau, 100)
    xel = np.sin(theta)*np.sqrt(v[0])
    yel = np.cos(theta)*np.sqrt(v[1])
    vals = np.dot(R,np.vstack([xel, yel]))
    ax.plot(vals[0, :]+mu_x, vals[1, :]+mu_y, '-', color=[1., 0., 1.], linewidth=3)
    ax.set_xlim([np.min(x), np.max(x)])
    ax.set_ylim([np.min(y), np.max(y)])
    ax.set_xticks([mu_x-3*sd_x, mu_x, mu_x+3*sd_x])
    ax.set_yticks([mu_y-3*sd_y, mu_y, mu_y+3*sd_y])
    ax.set_xlabel(xlabel, fontsize=20)
    ax.set_ylabel(ylabel, fontsize=20)
}
\newslide{Independent Gaussians}

\setupplotcode{import matplotlib.pyplot as plt
import mlai}

\plotcode{fig, ax = plt.subplots(1, 1, figsize=plot.big_figsize)
plot_correlated_gaussian(correlation=0.0, ax=ax)

mlai.write_figure(figure=fig, filename=f'independent-gaussians.svg', directory="\writeDiagramsDir/ml", transparent=True)}

\figure{\includediagram{\diagramsDir/ml/independent-gaussians}{60%}}{Two independent Gaussians for the $x$ and $y$ velocity of a ball.}{independent-gaussians}

\newslide{Correlated Gaussians}

\plotcode{fig, ax = plt.subplots(1, 1, figsize=plot.big_figsize)
plot_correlated_gaussian(correlation=0.995, ax=ax)

mlai.write_figure(figure=fig, filename=f'correlated-gaussians.svg', directory="\writeDiagramsDir/ml", transparent=True)
}

\figure{\includediagram{\diagramsDir/ml/correlated-gaussians}{60%}}{A correlated Gaussian for the $x$ and $y$ velocity of a ball. If all balls were correlated in this way, this would imply that the whole box is moving towards the upper right or bottom left.}{independent-gaussians}

\newslide{Anticorrelated Gaussians}

\plotcode{fig, ax = plt.subplots(1, 1, figsize=plot.big_figsize)
plot_correlated_gaussian(correlation=-0.995, ax=ax)

mlai.write_figure(figure=fig, filename=f'anti-correlated-gaussians.svg', directory="\writeDiagramsDir/ml", transparent=True)
}

\figure{\includediagram{\diagramsDir/ml/anti-correlated-gaussians}{60%}}{An anti-correlated Gaussian for the $x$ and $y$ velocity of a ball. If all balls were anti-correlated in this way, this would imply that the whole box is moving towards the upper left or bottom right.}{independent-gaussians}


\subsection{The Classical Observer}

\figure{\includediagramclass{\diagramsDir/physics/observer-composite-independent}{90%}}{Here the observer is monitoring the movements of the particles. We've plotted the velocities alongside the 1 standard deviation contour of their theoretical distribution.}{observer-composite-independent}

\subsection{The Classical Observer - Correlated}

\figure{\includediagramclass{\diagramsDir/physics/observer-composite-correlated}{90%}}{Again the observer is monitoring the movements of the particles, but here their motion is correlated ($\rho=0.95$).}{observer-composite-correlated}

\subsection{The Classical Observer - Anti-correlated}

\figure{\includediagramclass{\diagramsDir/physics/observer-composite-anti-correlated}{90%}}{Here the observer is monitoring the movements of the particles, but here their motion is anti-correlated ($\rho=-0.95$).}{observer-composite-anti-correlated}

\subsection{The Classical Observer - Inaccessible}

\figure{\includediagramclass{\diagramsDir/physics/observer-composite-inaccessible}{90%}}{Here the observer is blocked from monitoring anything inside the sytem.}{observer-composite-inaccessible}

\notes{When we don't know what's going on inside, we can't express *outcomes* in the way we could with an observer. But we can still express entropies. This highlights an interesting characteristic of entropies. If we don't express the probability directly, but just work with the entropies themselves, it feels like we can assess the bounds of possibility without directly expressing what's going on.}

\subsection{Entropy and Impossibility}

\slidesincremental{* `Forget' underlying probability.
* Manipulate entropy directly.
* Discover constraints on possibility.
}

\include{_information-game/includes/no-barber-principle.md}

\section{Foundations: Information Loss and Entropy}

\include{_information-game/includes/inaccessible-game-set-up.md}

\notes{
\include{_information-game/includes/information-isolation.md}
}

\newslide{Marginal Entropy Conservation}

\slidesincremental{
$$
\sum_{i=1}^N h_i = C
$$

* Exchangeable: holds for any finite subset of variables
* Extensive: scales linearly with system size
* Analogous to energy conservation — but for information
}

\subsection{The Conservation Law}

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
\include{_physics/includes/maxwells-demon.md}

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

\notes{The framework reveals constraints on information processing systems, including intelligent systems.}

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

\section{Conclusions}

\slidesincremental{
* I see that approach in others
* I hope to find it in my own work
}

\notes{We have explored what emerges when we demand internal adjudicability in an information-theoretic dynamical system. Starting from consistency requirements rather than physical assumptions, we derived:}


\thanks

\references
