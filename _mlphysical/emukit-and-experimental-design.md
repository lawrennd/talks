---
week: 4
session: 2
layout: lecture
title: "Emukit and Experimental Design"
abstract: >
  In this lecture we introduce Emukit, a software framework for decision programming via surrogage modelling and emulation. We'll then show an example of the use of the framework with experimental design.
layout: lecture
time: "12:00"
date: 2020-10-30
venue: Virtual (Zoom)
ipynb: true
reveal: true
youtube: 0nxa8TOmWB0
transition: None
---

\include{talk-macros.tex}

\include{_mlphysical/includes/mlphysical-notebook-setup.md}

\include{_uq/includes/emukit-software.md}
\include{_uq/includes/emukit-vision.md}
\include{_uq/includes/emukit-tutorial.md}


\notes{This introduction is based on [An Introduction to Experimental Design with Emukit](https://github.com/EmuKit/emukit/blob/master/notebooks/Emukit-tutorial-experimental-design-introduction.ipynb) written by Andrei Paleyes and Maren Mahsereci.}

\include{_uq/includes/model-free-experimental-design.md}

\include{_uq/includes/emukit-experimental-design.md}

\subsection{Conclusions}

\notes{We've introduced the Emukit software and outlined its design philosophy. We've then performed some simple examples using Emukit to perform *experimental design* as a task. In particular we saw how we could define the task as an acquisition funciton, a loop, an emulator model and a target function.

You can compare the design of this software with its predecessor, `GPyOpt`, which is less modular in its design, and more focussed on Bayesian optimization.}

\slides{* Emukit software.
* Example around experimental design.
* Sequential decision making with acquisiton functions.
* Generalizes from the BayesOpt process (e.g. `GPyOpt`)
}

\thanks

\reading

\references
