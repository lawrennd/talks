---
title: "Machine Learning and the Physical World"
abstract: |
  Machine learning technologies have underpinned the recent revolution
  in artificial intelligence. But at their heart, they are simply data
  driven decision making algorithms. While the popular press is filled
  with the achievements of these algorithms in important domains such
  as object detection in images, machine translation and speech
  recognition, there are still many open questions about how these
  technologies might be implemented in domains where we have existing
  solutions but we are constantly looking for improvements. Roughly
  speaking, we characterise this domain as “machine learning in the
  physical world”. How do we design, build and deploy machine learning
  algorithms that are part of a decision making system that interacts
  with the physical world around us. In particular, machine learning
  is a data driven endeavour, but real world systems are physical and
  mechanistic. In this talk we will introduce some of the challenges
  for this domain and and propose some ways forward in terms of
  solutions.
ipynb: True
author:
- family: Lawrence
  given: Neil D.
  gscholar: r3SJcvoAAAAJ
  institute: University of Cambridge
  twitter: lawrennd
  url: http://inverseprobability.com
date: 2021-05-05
venue: Data Centric Engineering, University of Sheffield
transition: None
---

\include{talk-macros.gpp}

\include{_physics/includes/laplaces-demon.md}
\include{_physics/includes/emergent-behaviour.md}
\include{_physics/includes/laplaces-gremlin.md}

\include{_ai/includes/centrifugal-governor.md}
\include{_ml/includes/what-is-ml-2.md}
\include{_ml/includes/process-automation.md}
\include{_ai/includes/ai-vs-data-science-2.md}

\newslide{The Gap}

* There is a gap between the world of data science and AI.
* The mapping of the virtual onto the physical world.
* E.g. Causal understanding. 

\include{_supply-chain/includes/supply-chain.md}
\include{_supply-chain/includes/ml-and-supply-chain.md}
<!--include{_ml/includes/or-control-econometrics-statistics-ml.md}-->

\section{UNCERTAINTY QUANTIFICATION}

\include{_ml/includes/process-emulation.md}
\include{_uq/includes/emukit-playground.md}
\include{_uq/includes/uncertainty-quantification.md}
\include{_uq/includes/emukit-software.md}
\include{_ml/includes/mxfusion-software.md}
\include{_ml/includes/mxfusion-pilco.md}

\subsection{Long term Aim}

* Simulate/Emulate the components of the system.
    * Validate with real world using multifidelity.
	* Interpret system using e.g. sensitivity analysis.
* Perform end to end learning to optimize.
    * Maintain interpretability.


\thanks

\references






