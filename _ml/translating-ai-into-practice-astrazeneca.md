---
title: "Translating AI into Practice"
subtitle: "Challenges, Systems Integration, and the Atomic Human Perspective"
abstract: |
  Translating machine learning from research prototypes into robust, reliable systems is one of the greatest challenges facing industry today. This talk explores the practical hurdles of deploying AI in real-world environments, drawing from over 25 years of experience in machine learning systems design at Amazon and insights from "The Atomic Human." 
  
  We'll examine the interface between machine learning and systems research, exploring how traditional software engineering practices must evolve to handle the unique challenges of data-dependent systems. The talk will cover deployment challenges, intellectual debt in ML systems, and the importance of continuous monitoring in production environments.
  
  Central to the discussion is the human perspective: how do we build AI systems that complement rather than replace human expertise, particularly in critical domains like healthcare? We'll explore trust, autonomy, and the essential role of human oversight in ensuring AI serves society's needs while maintaining the reliability and safety standards that sectors like pharmaceuticals demand.
author:
- family: Lawrence
  given: Neil D.
date: 2026-01-12
geometry: ["a4paper", "margin=2cm"]
papersize: a4paper
venue: The AstraZeneca Discovery Centre, Cambridge
transition: None
---

<!-- first draft of talk, needs reworking -->

\section{Introduction: The Translation Challenge}

\newslide{From Research to Practice}

\slides{
* Machine learning research: controlled environments
* Real-world deployment: messy, evolving data
* The gap between prototype and production
}

\notes{Today I want to talk about one of the most significant challenges in modern AI: how we translate machine learning from research prototypes into robust, reliable systems that can operate in the real world. This challenge is particularly acute in industries like pharmaceuticals, where the stakes are high and the tolerance for error is low.}

\include{_ai/includes/what-is-intelligence.md}

\section{The Deployment Challenge}

\include{_ml/includes/ml-deployment-challenge.md}

\section{Machine Learning Systems Design}

\include{_ai/includes/ml-systems-design-long.md}

\section{Organizations and Systems: Conway's Law}

\include{_business/includes/the-api-mandate-bezos.md}

\section{Intellectual Debt in AI Systems}

\include{_ai/includes/intellectual-debt.md}

\section{The Healthcare Imperative}

\include{_ai/includes/rapid-diagnosis-and-consultation.md}
\include{_health/includes/rolls-royce-analogy.md}

\section{The Atomic Human Perspective}

\include{_atomic-human/includes/fascination-with-ourselves.md}
\include{_ai/includes/embodiment-factors-tedx.md}

\newslide{Human-AI Collaboration}

\slides{
* AI augments rather than replaces human expertise
* Critical importance of domain knowledge
* Trust and transparency in high-stakes decisions
}

\notes{The pharmaceutical industry exemplifies why we need AI systems that work with human experts rather than attempting to replace them. The complexity of drug discovery, the regulatory environment, and the life-and-death consequences of decisions all require systems that enhance human capabilities while maintaining human oversight and accountability.}

\section{Trust, Autonomy, and Embodiment}

\include{_atomic-human/includes/trust-autonomy-embodiment.md}

\section{Practical Implications for Industry}

\newslide{Key Lessons for Implementation}

\slides{
* Design for continuous monitoring and adaptation
* Invest early in robust system architecture
* Maintain human expertise in the loop
}

\notes{Drawing from experience deploying machine learning systems at scale, there are several critical lessons for organizations looking to implement AI in practice. First, the world changes around our deployed systems, requiring continuous monitoring and the ability to adapt. Second, intellectual debt accrues quickly if we don't invest early in proper system design. Third, particularly in domains like healthcare and pharmaceuticals, maintaining human expertise and oversight is not just advisable—it's essential.}

\section{The Path Forward}

\include{_atomic-human/includes/the-trick-doesnt-replace-the-truth.md}

\newslide{Building Trustworthy AI Systems}

\slides{
* Separate infrastructure concerns from domain expertise
* Design for interpretability and explainability
* Establish robust governance and oversight
}

\notes{The future of AI in critical industries depends on building systems that are not just accurate, but trustworthy. This means separating concerns appropriately—ensuring that security and reliability experts handle infrastructure while domain experts focus on the science. It means designing systems that can explain their decisions. And it means establishing governance frameworks that ensure AI serves human purposes rather than replacing human judgment.}

\section{Conclusion}

\newslide{Key Takeaways}

\slides{
* Translation requires new engineering practices
* Human expertise remains central
* Success depends on trustworthy, interpretable systems
}

\notes{The challenge of translating AI into practice is not just technical—it's fundamentally about how we integrate machine intelligence with human intelligence. In sectors like pharmaceuticals, where the consequences of decisions affect human lives, this integration must prioritize trust, transparency, and human oversight. The future belongs not to systems that replace human experts, but to those that amplify human capabilities while maintaining the essential human qualities of judgment, responsibility, and care.}

\thanks

\references
