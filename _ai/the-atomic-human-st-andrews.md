---
title: "The Atomic Human"
subtitle: "Understanding Ourselves in the Age of AI"
abstract: |
  A vital perspective is missing from the discussions we're having
  about Artificial Intelligence: what does it mean for our identity?
 
  Our fascination with AI stems from the perceived uniqueness of human
  intelligence. We believe it's what differentiates us. Fears of AI
  not only concern how it invades our digital lives, but also the
  implied threat of an intelligence that displaces us from our
  position at the centre of the world.
 
  Atomism, proposed by Democritus, suggested it was impossible to
  continue dividing matter down into ever smaller components:
  eventually we reach a point where a cut cannot be made (the Greek
  for uncuttable is 'atom'). In the same way, by slicing away at the
  facets of human intelligence that can be replaced by machines, AI
  uncovers what is left: an indivisible core that is the essence of
  humanity.
 
  By contrasting our own (evolved, locked-in, embodied) intelligence
  with the capabilities of machine intelligence through history, The
  Atomic Human reveals the technical origins, capabilities and
  limitations of AI systems, and how they should be wielded. Not just
  by the experts, but ordinary people. Either AI is a tool for us, or
  we become a tool of AI. Understanding this will enable us to choose
  the future we want.
 
  This talk is based on Neil's forthcoming book to be published with
  Allen Lane in June 2024. Machine learning solutions, in particular
  those based on deep learning methods, form an underpinning of the
  current revolution in "artificial intelligence" that has dominated
  popular press headlines and is having a significant influence on the
  wider tech agenda.
  
  In this talk I will give an overview of where we are now with
  machine learning solutions, and what challenges we face both in the
  near and far future. These include practical application of existing
  algorithms in the face of the need to explain decision making,
  mechanisms for improving the quality and availability of data,
  dealing with large unstructured datasets.
author:
- family: Lawrence
  given: Neil D.
  gscholar: r3SJcvoAAAAJ
  institute: University of Cambridge
  twitter: lawrennd
  url: http://inverseprobability.com
venue: St Andrews' Distinguished Lecture Series
date: 2024-03-12
geometry: ["a4paper", "margin=2cm"]
notation: talk-notation.tex
papersize: a4paper
transition: None
slidesipynb: True
pptx: False
docx: False
ipynb: True
reveal: True
potx: custom-reference.potx 
dotx: custom-reference.dotx
---
\define{noSlideTitle}

\include{_ai/includes/henry-ford-intro.md}
\include{_ai/includes/the-great-ai-fallacy.md}

\notes{In Greek mythology, Panacea was the goddess of the universal remedy. One consequence of the pervasive potential of AI is that it is positioned, like Panacea, as the purveyor of a universal solution. Whether it is overcoming industry’s productivity challenges, or as a salve for strained public sector services, or a remedy for pressing global challenges in sustainable development, AI is presented as an elixir to resolve society’s problems.

In practice, translation of AI technology into practical benefit is not simple. Moreover, a growing body of evidence shows that risks and benefits from AI innovations are unevenly distributed across society.

When carelessly deployed, AI risks exacerbating existing social and economic inequalities.}

\include{_ai/includes/the-diving-bell-butterfly.md}

\include{_ai/includes/jean-dominique-bauby.md}

\newslide

\figure{\columns{\aligncenter{\includejpg{\diagramsDir/ai/Jean-Dominique_Bauby}{100%}}}{\aligncenter{\includejpg{\diagramsDir/ClaudeShannon_MFO3807}{70%}}}}{Claude Shannon developed information theory which allows us to quantify how much Bauby can communicate. This allows us to compare how locked in he is to us.}{bauby-shannon}

\include{_ai/includes/embodiment-factors-short.md}

\include{_ai/includes/cuneiform.md}

\include{_books/includes/the-future-of-professions.md}

\notes{And this is very likely true, but in practice we know that even if the disruption is being felt initially by the professional classes, those groups tend to be protected by their ability to adapt, which is correlated with higher education.}

\notes{Whether this remains true this time is another question. I'm particularly struck by the "convergent evolution" of ChatGPT. The model is trained by reinforcement learning with feedback provided by people. ChatGPT's answers are highly plausible, make use of sophisticated language in an intelligent sounding way and are often incorrect. I'm struck by the similarity to fresh Oxbridge graduates. I wonder if this is also an example of convergent evolution.}

\include{_policy/includes/coin-pusher.md}


<!-- Faster horse -->

<!-- Embodiment Factors -->
\include{_ai/includes/embodiment-factors-celsius.md}

<!-- Information Triangle -->
\include{_data-science/includes/new-flow-of-information.md}
\include{_data-science/includes/societal-effects.md}

<!-- AI Fallacy -->
\include{_ai/includes/the-great-ai-fallacy.md}

<!-- Mathematical Statistics -->
\include{_data-science/includes/lies-damned-lies.md}

\notes{I'm reminded of this because from 2015 to 2017 I was on the Working Group that compiled the Royal Society's machine learning report. The process of constructing the report went across the UK Referendum, and the 2016 US election. I remember vividly a meeting we convened at the Society in London which had experts alongside MPs from all parties, policy advisors and civil servants. One of the MPs (likely correctly) pointed out "I suspect no one around this table voted for Brexit" to which I replied "But isn't that the problem? There are a large number of people who aren't empowered  who are experiencing quite a different reality than us. And they aren't reprented in these forums." So it's no surprise that so much of the press conversation around AI is still focussed on how it is likely to effect middle class jobs. We shouldn't underestimate these effects, but it's often the case that better educated people are better placed to deal with such challenges. For example, when stock brokers' roles disappeared they simply moved on to other roles in banks and related industries.}

\include{_ml/includes/rs-report-machine-learning.md}
\include{_ml/includes/rs-report-mori-poll-art.md}
\include{_ml/includes/chat-gpt-mercutio.md}


<!-- Conversation -->
\include{_ai/includes/conversation.md}

<!-- Fritz Heider -->
\include{_ai/includes/heider-simmel.md}
\include{_ai/includes/baby-shoes.md}
<!-- Conversation LLM -->
\include{_ai/includes/conversation-computer.md}
\include{_ai/includes/conversation-probability.md}
\include{_ai/includes/human-computers-interacting.md}
\include{_ai/includes/human-culture-interacting.md}
\include{_data-science/includes/number-data-theatre.md}
<!--\include{_psychology/includes/selective-attention-bias.md}-->
<!--include{_data-science/includes/data-selection-attention-bias.md}-->
\include{_ai/includes/conversation-llm.md}
\include{_physics/includes/d-day-weather.md}

\notes{Modern artificial intelligence solutions are using very large amounts of data to build a landscape in which this interpolation can take place. Tools like ChatGPT are allowing us to interpolate between different human concepts. This is an amazing achievement, but it is also a challenge.}
\include{_ai/includes/naca-proving.md}
\include{_ai/includes/human-analogue-machines.md}

\include{_ai/includes/p-n-fairness.md}
\include{_books/includes/a-question-of-trust.md}

\notes{Innovating to serve science and society requires a pipeline of interventions. As well as advances in the technical capabilities of AI technologies, engineering knowhow is required to safely deploy and monitor those solutions in practice. Regulatory frameworks need to adapt to ensure trustworthy use of these technologies. Aligning technology development with public interests demands effective stakeholder engagement to bring diverse voices and expertise into technology design.}

\notes{Building this pipeline will take coordination across research, engineering, policy and practice. It also requires action to address the digital divides that influence who benefits from AI advances. These include digital divides within the socioeconomic strata that need to be overcome – AI must not exacerbate existing equalities or create new ones. In addressing these challenges, we can be hindered by divides that exist between traditional academic disciplines. We need to develop common understanding of the problems and a shared knowledge of possible solutions.}

\notes{\subsection{Making AI equitable}}

\notes{AI@Cam is a new flagship University mission that seeks to address these challenges. It recognises that development of safe and effective AI-enabled innovations requires this mix of expertise from across research domains, businesses, policy-makers, civill society, and from affected communities. AI@Cam is setting out a vision for AI-enabled innovation that benefits science, citizens and society.}

\notes{This vision will be achieved through leveraging the University’s vibrant interdisciplinary research community. AI@Cam will form partnerships between researchers, practitioners, and affected communities that embed equity and inclusion. It will develop new platforms for innovation and knowledge transfer. It will deliver innovative interdisciplinary teaching and learning for students, researchers, and professionals. It will build strong connections between the University and national AI priorities.}

\notes{The University operates as both an engine of AI-enabled innovation and steward of those innovations.}

\notes{AI is not a universal remedy. It is a set of tools, techniques and practices that correctly deployed can be leveraged to deliver societal benefit and mitigate social harm.}

\notes{In that sense AI@Cam’s mission is close in spirit to that of Panacea’s elder sister Hygeia. It is focussed on building and maintaining the hygiene of a robust and equitable AI research ecosystem.}


\include{_physics/includes/richard-feynmann-doubt.md}


<!-- Faster horse -->

<!-- Embodiment Factors -->
\include{_ai/includes/embodiment-factors-celsius.md}

<!-- Information Triangle -->
\include{_data-science/includes/new-flow-of-information.md}
\include{_data-science/includes/societal-effects.md}

<!-- AI Fallacy -->
\include{_ai/includes/the-great-ai-fallacy.md}

<!-- Mathematical Statistics -->
\include{_data-science/includes/lies-damned-lies.md}

<!-- Conversation -->
\include{_ai/includes/conversation.md}

<!-- Fritz Heider -->
\include{_ai/includes/heider-simmel.md}
\include{_ai/includes/baby-shoes.md}
<!-- Conversation LLM -->
\include{_ai/includes/conversation-computer.md}
\include{_ai/includes/conversation-probability.md}
\include{_ai/includes/human-computers-interacting.md}
\include{_ai/includes/human-culture-interacting.md}
\include{_data-science/includes/number-data-theatre.md}
<!--\include{_psychology/includes/selective-attention-bias.md}-->
<!--include{_data-science/includes/data-selection-attention-bias.md}-->
\include{_ai/includes/conversation-llm.md}
\include{_ai/includes/human-analogue-machines.md}

\include{_physics/includes/richard-feynmann-doubt.md}

<!-- Interfaces AI for Science -->
<!--include{_ai/includes/interfaces-ai-for-science.md}-->

\subsection{Conclusions}

\notes{The probabilistic modelling community has evolved in an era where the assumption was that ambiguous conclusions are best shared with a (trained) professional through probabilities. Recent advances in generative AI offer the possibility of machines that have a better understanding of human subjective ambiguities and therefore machines that can summarise information in a way that can be interogated rather than just through a series of numbers.}

\slides{* HAMs change how we share ambiguous information.
* We need to think about how that effects our sharing of proabilities.}

<!-- Lecture 2 -->

\newslide{}


Time scales, how when you expand or contract time signal becomes noise and noise becomes signal illustrate with Dirac delta and and stochastic processes in Fourier space, ito calculus. Latent force models.

Practical examples of what happens understochasticity:

0) Derive U = W + TS?? Go from microscopic to macroscopic. 

1) Kappenball --- world in between where interesting things happen,

2) Queue efficiency (M/M/1  1/(1-\rho))

3) Input to the system being in the form of bias and variance (or perhaps Brownian motion, wiener process)

(Latent force models being driven by this???? Latent force as high frequency information processing? Environment as slow?

\include{_physics/includes/laplaces-demon.md}
\include{_physics/includes/emergent-behaviour.md}
\include{_physics/includes/laplaces-gremlin.md}
\include{_physics/includes/lap-engine.md}
\include{_physics/includes/theory-of-ignorance.md}
\include{_physics/includes/entropy-billiards.md}
\include{_physics/includes/maxwells-demon-short.md}
\include{_ai/includes/embodiment-factors-celsius.md}
\include{_ai/includes/conversation-tedx.md}

\notes{Stories, between humans.}

\speakernotes{I have a great dislike for Russell; I cannot explain it completely, but I feel a detestation for the man. As far as any sympathy with me, or with anyone else, I believe, he is an iceberg. His mind impresses one as a keen, cold, narrow logical machine, that cuts the universe into neat little packets, that measure, as it were, just three inches each way. His type of mathematical analysis he applies as a sort of Procrustean bed to the facts, and those that contain more than his system provides for, he lops short, and those that contain less, he draws out.

Norbert Wiener in a letter to his family, 1913}

\include{_ai/includes/heider-simmel.md}
\include{_ai/includes/conversation-computer.md}


\newslide{}

\notes{\subsection{Artificial Intelligence}}

\notes{One of the struggles of artificial intelligence is that the term means different things to different people. Our intelligence is precious to us, and the notion that it can be easily recreated is disturbing to us. This leads to some dystopian notions of artificial intelligence, such as the singularity.}

\notes{Depending on whether this powerful technology is viewed as beneficent or maleficent, it can be viewed either as a helpful assistant, in the manner of Jeeves, or a tyrannical dictator.}

\include{_ai/includes/ai-as-manservant.md}

\notes{The history of automation and technology is a history of us adapting to technological change. The invention of the railways, and the need for consistent national times to timetable our movements. The development of the factory system in the mills of Derbyshire required workers to operate and maintain the machines that replaced them.}

\notes{Listening to modern to conversations about artificial intelligence, I think the use of the term *intelligence* has given rise to an idea that this technology will be the But amoung these different assessments of artificial intelligence is buried an idea, one that }

\include{_ai/includes/lenox-globe.md}

\notes{Introduce Linnaeus and the hydra.}

\include{_philosophy/includes/the-hamburg-hydra.md}

\speakernotes{Our natural environment provides a Gibbsian hydra for us to do battle with. Statistical ensemble as hydra.}


\include{_ml/includes/deep-face.md}
\include{_ml/includes/deep-learning-as-pinball.md}

\newslide{Royal Swedish Academy of Sciences}

* 2 June 1739
  * Carl Linnaeus (naturalist)
  * Jonas Alströmer (mercantilist)
  * Mårten Triewald (mechanical engineer)
  * Sten Carl Bielke (civil servants)
  * Carl Wilhelm Cederhielm (civil servant)
  * Anders Johan von Höpken (politician)

\newslide{}

\figure{\includejpg{\diagramsDir/ai/ai-for-research}{60%}}{[AI4Research](https://uu.se/en/research/ai4research/
) is a five year project in Uppsala strengthening machine learning and AI but through close interaction with other disciplines (medicine, genetics, digital media, astronomy, political science, mathematics).}{ai-for-research}


\newslide{Cambridge}


\columns{\aligncenter{\circleText{policy}{55%}}}{\aligncenter{\circleText{<tspan x="100" y="90">data</tspan><tspan x="100" y="130">governance</tspan>}{55%}}}{50%}{50%}
\columns{\aligncenter{\circleText{<tspan x="100" y="90">accelerate</tspan><tspan x="100" y="130">science</tspan>}{55%}}}{\aligncenter{\circleText{AutoAI}{55%}}}{50%}{50%}

\newslide{What is Artificial Intelligence?}

\aligncenter{A chance for us to acknowledge our ignorance and to rediscover interdisplinary science.}

\include{_ai/includes/human-computers-interacting.md}

\include{_physics/includes/richard-feynmann-doubt.md}

\include{_physics/includes/entropy-intro.md}
\include{_physics/includes/brownian-wiener.md}
\include{_physics/includes/kappenball.md}
\include{_simulation/includes/game-of-life.md}
\include{_gp/includes/gp-intro-very-short.md}

<!-- lecture 3 -->

Connect supply chain as a "challenge" tot he abstraction of Schroedinger's bridge. Link to Optimal Transport (matching without the "physics"). Maxwell's demon.

Control ability paper with Mauricio and Simo??)

<!-- Interfaces AI for Science -->
<!--include{_ai/includes/interfaces-ai-for-science.md}-->
<!--include{_gp/includes/what-is-a-gp.md} -->

\ifdef{SLIDES}
\define{pydeepgpInclude}
\endif
\define{deepRobotWireless}

\subsection{Deep Gaussian Processes}


* *Deep Gaussian Processes and Variational Propagation of Uncertainty*
    @Damianou:thesis2015

\include{_deepgp/includes/deep-gaussian-processes.md}

\subsection{Conclusions}

\notes{The probabilistic modelling community has evolved in an era where the assumption was that ambiguous conclusions are best shared with a (trained) professional through probabilities. Recent advances in generative AI offer the possibility of machines that have a better understanding of human subjective ambiguities and therefore machines that can summarise information in a way that can be interogated rather than just through a series of numbers.}

\slides{* HAMs change how we share ambiguous information.
* We need to think about how that effects our sharing of proabilities.}

\thanks

\references
