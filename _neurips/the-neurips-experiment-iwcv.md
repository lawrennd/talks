---
title: Revisiting the Revisit of the 2014 NeurIPS Experiment
venue: IWCV
author:
- given: Neil D.
  family: Lawrence
  url: http://inverseprobability.com
  institute: University of Cambridge
  twitter: lawrennd
  gscholar: r3SJcvoAAAAJ
  orchid: 
abstract: >
  In 2014, along with Corinna Cortes, I was Program Chair of the Neural Information Processing Systems conference. At the time, when wondering about innovations for the conference, Corinna and I decided it would be interesting to test the consistency of reviewing. With this in mind, we randomly selected 10% of submissions and had them reviewed by two independent committees. 
  
  In this talk I will review the construction of the experiment, explain how the NeurIPS review process worked and talk about what I felt the implications for reviewing were, vs what the community reaction was.
  
  The talk was originally given in 2021 when the long term impact of papers were measured by seven years of citations. Here we augment the results with citations from today, 2024, nearly a decade after papers were published.
date: 2024-05-22
ipynb: True
categories:
- notes
layout: talk
geometry: ["a4paper", "margin=2cm"]
papersize: a4paper
transition: None
---

\ifdef{SLIDES}
\define{DARKBACKGROUND}
\endif

\section{Introduction}

\notes{The NIPS experiment was an experiment to determine the consistency of the review process. After receiving papers, we selected 10% that would be independently rereviewed. The idea was to determine how consistent the decisions between the two sets of independent papers would be. In 2014 NIPS received 1678 submissions and we selected 170 for the experiment. These papers are referred to below as 'duplicated papers'.}

\notes{To run the experiment, we created two separate committees within the NIPS program committee. The idea was that the two separate committees would review each duplicated paper independently and results compared.}

\include{_neurips/includes/neurips-in-numbers.md}
\include{_neurips/includes/paper-scoring.md}
\include{_neurips/includes/neurips-experiment-speculation.md}
\include{_neurips/includes/neurips-experiment-results.md}
\include{_neurips/includes/neurips-experiment-reaction.md}
\include{_neurips/includes/neurips-2021-experiment.md}
\include{_neurips/includes/neurips-experiment-random-committee.md}

<!--include{_neurips/includes/neurips-experiment.md}-->
\include{_neurips/includes/neurips-reviewer-calibration.md}
\include{_neurips/includes/neurips-simulation.md}
\include{_neurips/includes/where-do-the-rejected-papers-go.md}

\include{_neurips/includes/impact-of-papers-ten-years-on.md}

\newslide{My Conclusion}

\slides{* Inconsistent errors are better than consistent errors
* NeurIPS and Impractical Knives}

\notes{\include{_neurips/includes/neurips-experiment-conclusion.md}}

\notes{I would prefer a world were a conference is no longer viewed as a proxy for research quality. The true test of quality is time. In the current world, papers from conferences such as NeurIPS are being used to judge whether a researcher is worthy of a position at a leading company, or whether a researcher gets tenure. This is problematic and damaging for the community. Reviewing is an inconsistent process, but that is not a bad thing. It is far worse to have a reviewing system that is consistently wrong than one which is inconsistently wrong.}

\notes{My own view of a NeurIPS paper is inspired by the Millenium Galleries in Sheffield. There, among the exhibitions they sometimes have work done by apprentices in their 'qualification'. Sheffield is known for knives, and the work of the apprentices in making knives is sometimes very intricate indeed. But it does lead to some very impractical knives. NeurIPS seems to be good at judging technical skill, but not impact. And I suspect the same is true of many other meetings. So, a publication a NeurIPS does seem to indicate that the author has some of the skills required, but it does not necessarily imply that the paper will be impactful.}


\comment{Post from Balazs Kegl: <https://balazskegl.medium.com/embrace-the-random-2957d078bfb3>}

\section{My Solution}

\slides{* Inspired by PMLR experience.
* And reissue of [AISTATS 2001 proceedings](https://proceedings.mlr.press/r3/).
* Launching the "[Sorrento 'Single Author Paper' Meeting](https://inverseprobability.com/sorrento/)".
* To be held w/c 7th April at the [Grand Hotel Vesuvio](https://www.vesuviosorrento.com/).
}

\notes{I've worked on many community initiatives to improve the sharing of ideas, joining arXiv's scientific advisory board is just the latest. In 2005 I launched what has become PMLR, which has around 250 volumes of ML research from conferences varying from ICML to "I Can't believe it's not better". It also supported "FAcT" at launch and other successful conferences.}

\notes{On seeing that some historic proceedings were disappearing from the web, we launched a reissue series. For expample, the [AISTATS 2001 reissue](https://proceedings.mlr.press/r3/). Inspired by the spirit of these conferences next year I will organise the "Sorrento Single Author Paper Conference", where the constraint is that each paper can only have one author, with the exception that PhD students can co-author with their supervisors.}

\notes{[The event will be held in w/c 7th April](https://inverseprobability.com/sorrento/), likely venue the [Grand Hotel Vesuvio](https://www.vesuviosorrento.com/) in Sorrento.}

\notes{Looking forward to seeing you there!}

\section{Also}

\include{_books/includes/the-atomic-human.md}


\thanks

\references



