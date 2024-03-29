---
title: "Real World Machine Learning Challenges: Present and Future"
abstract: >
  Machine learning solutions, in particular those based on deep learning methods, form an underpinning of the 
  current revolution in “artificial intelligence” that has dominated popular press headlines and is having a 
  significant influence on the wider tech agenda.
  
  In this talk I will give an overview of where we are now with machine learning solutions, and what challenges 
  we face both in the near and far future. These include practical application of existing algorithms in the 
  face of the need to explain decision making, mechanisms for improving the quality and availability of data, 
  dealing with large unstructured datasets.
author:
- family: Lawrence
  given: Neil D.
  gscholar: r3SJcvoAAAAJ
  institute: Amazon Cambridge and University of Sheffield
  twitter: lawrennd
  url: http://inverseprobability.com
date: 2018-01-23
venue: Stu Hunter Resesearch Conference, Milan
geometry: ["a4paper", "margin=2cm"]
papersize: a4paper
transition: None
---

\include{_ml/includes/what-is-ml.md}
\include{_ml/includes/data-science-vs-ai.md}
\include{_ai/includes/embodiment-factors.md}
\include{_data-science/includes/evolved-relationship.md}
\include{_ml/includes/what-does-machine-learning-do.md}
\include{_ml/includes/deep-learning-overview.md}
\include{_gp/includes/gp-intro-very-short.md}
\include{_deepgp/includes/deep-olympic.md}

<!-- \include{_data-science/includes/a-time-for-professionalisation.md} -->
<!-- \include{_data-science/includes/the-data-crisis.md} -->

<!-- ### Rest of this Talk: Two Areas of Focus  -->

<!-- * Reusability of Data -->

<!-- * Deployment of Machine Learning Systems -->

<!-- ### Rest of this Talk: Two Areas of Focus  -->

<!-- * <s>Reusability of Data</s> -->

<!-- * Deployment of Machine Learning Systems -->

<!--\include{_data-science/includes/data-readiness-levels.md}-->

### Artificial Intelligence

* Challenges in deploying AI.

* Currently this is in the form of "machine learning systems"

### Internet of People

* Fog computing: barrier between cloud and device blurring.
    * Computing on the Edge

* Complex feedback between algorithm and implementation
  
### Deploying ML in Real World: Machine Learning Systems Design

* Major new challenge for systems designers.

* Internet of Intelligence but currently:
	* AI systems are *fragile*

\include{_ai/includes/ml-systems-design-long.md}

\include{_uq/includes/uncertainty-quantification.md}


\newslide{Conclusion}
\slides{
* Artificial Intelligence and Data Science are fundamentally different.

* In one you are dealing with data collected by happenstance.

* In the other you are trying to build systems in the real world, often by actively collecting data.

* Our approaches to systems design are building powerful machines that
will be deployed in evolving environments.
}

\notes{Artificial intelligence and data science are fundamentally different. In one you are dealing with data collecte by happenstance, in the other you are trying to build systems in the real world, often by actively collecting data. Our approaches to systems design are building powerful machines that will be deployed in evolving environments. But this is presenting key challenges in how we maintain and manage our machine learning systems.}

\thanks

\references
