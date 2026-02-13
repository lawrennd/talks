---
title: "Leadership and AI: Strategic Decision Making in the Age of Human-Analogue Machines"
subtitle: "An MBA Masterclass on Human-Machine Collaboration"
abstract: |
  As AI technologies reshape business landscapes across industries, leaders face fundamental questions about balancing automation with human judgment, managing information flows, and designing organizational decision-making structures. This masterclass builds on the ideas in *The Atomic Human* to provide MBA students with practical frameworks for understanding AI's strategic implications through the lens of information topography, decision-making architectures, and human-AI collaboration. 
  
  Through a combination of conceptual frameworks, real-world case studies, and interactive exercises, participants will develop the critical thinking tools needed to lead organisations in the age of human-analogue machines. We'll explore how to strategically implement AI while maintaining human agency, building intelligent accountability, and creating organisational effectiveness in a world where machines increasingly mimic human capabilities.
author:
- family: Lawrence
  given: Neil D.
date: 2026-02-25
geometry: ["a4paper", "margin=2cm"]
papersize: a4paper
venue: LUISS Business School, Full-Time MBA Programme, Rome
transition: None
ipynb: True
---

<!-- MASTERCLASS TIMING STRUCTURE:

MORNING SESSION: 10:00-13:00 (3 hours)
==================================================
10:00-11:00 (60 min) - Part 1: Understanding Human vs Machine Intelligence
11:00-11:30 (30 min) - Exercise 1: Mapping Your Organization's Information Flows
11:30-11:45 (15 min) - BREAK
11:45-13:00 (75 min) - Part 2: Information Topography and Decision Making

LUNCH BREAK: 13:00-14:00 (60 min)
==================================================
NOTE: Can extend to 14:30 if students need more time

AFTERNOON SESSION: 14:00-17:00 (3 hours = 180 min)
==================================================
14:00-14:50 (50 min) - Part 3: Maintaining Human Judgment and Building Trust
14:50-15:20 (30 min) - Exercise 2: Case Study Analysis - The Horizon Scandal
15:20-15:35 (15 min) - BREAK
15:35-16:10 (35 min) - Part 4: Strategic Implementation and the Attention Economy
16:10-17:00 (50 min) - Exercise 3: Developing Your Organisation's AI Strategy
                       (35 min group work + 15 min presentations)

TOTAL: 6 hours instruction + 1 hour lunch = 7 hours
-->

\notes{**Welcome and Masterclass Overview**

This masterclass is designed for MBA students preparing to lead organizations through the AI transformation. Unlike traditional technology training, we'll focus on the strategic and organizational challenges that AI creates - challenges that require business leadership rather than technical expertise.

Our journey today will take us from understanding what makes human intelligence unique, through the ways AI is reshaping organizational decision-making, to practical frameworks for strategic AI implementation. Along the way, we'll engage in exercises that apply these concepts to real organizational challenges you'll face as business leaders.}

\newslide{Today's Schedule}

\slides{
**Morning Session: 10:00-13:00**
* 10:00-11:00: Human vs Machine Intelligence
* 11:00-11:30: Exercise 1 - Information Flows
* 11:30-11:45: Break
* 11:45-13:00: Information Topography

**Lunch: 13:00-14:00** (can extend if needed)

**Afternoon Session: 14:00-17:00**
* 14:00-14:50: Human Judgment & Trust
* 14:50-15:20: Exercise 2 - Horizon Scandal
* 15:20-15:35: Break
* 15:35-16:10: Strategic Implementation
* 16:10-17:00: Exercise 3 - AI Strategy
}

\include{_notebooks/includes/notebook-setup.md}

<!-- ============================================================ -->
<!-- MORNING SESSION: 10:00-13:00 -->
<!-- ============================================================ -->

<!-- TIMING: 10:00 START -->
\section{Part 1: Understanding Human vs Machine Intelligence (60 minutes)}

\notes{**Time: 10:00-11:00** - We'll spend the first hour understanding what makes human intelligence unique and how it differs fundamentally from machine intelligence. This foundation is essential for everything that follows.}

\subsection{The Age of Human-Analogue Machines}

\include{_ai/includes/henry-ford-intro.md}

\notes{As we enter an era where machines increasingly mimic tasks traditionally undertaken by humans, business leaders face fundamental transformations in how their organizations function. The challenges aren't merely operational - they require us to reimagine the very nature of work, human capital, and organizational culture.}

\include{_ai/includes/the-atomic-eye.md}

\notes{Our fascination with AI stems from the perceived uniqueness of human intelligence. We believe it's what differentiates us. But to understand how AI will reshape business, we first need to understand what makes human intelligence unique and how it differs from machine intelligence.}

\subsection{The Embodied Nature of Human Intelligence}

\include{_ai/includes/diving-bell-butterfly.md}
\include{_ai/includes/jean-dominique-bauby.md}
\include{_ai/includes/shannon-bauby.md}

\notes{The story of Jean-Dominique Bauby illustrates a fundamental truth about human intelligence: it's not just about processing information, but about the embodied experience of being human. This has profound implications for how we think about AI in business.}

\include{_ai/includes/embodiment-factors-tedx.md}

\notes{These bandwidth differences - what I call "embodiment factors" - explain why AI struggles with context and social understanding, the very domains where human leaders excel. The strategic challenge is designing systems that leverage the strengths of both.}

\subsection{The Conversation: Where Humans Excel}

\include{_ai/includes/conversation-tedx.md}
\include{_atomic-human/includes/fascination-with-ourselves.md}
\include{_ai/includes/conversation-computer.md}

\notes{The true potential of AI in business isn't in replacing humans but in creating complementary systems that enhance human capabilities. Moving beyond the 'faster horse' mindset requires understanding what makes human intelligence uniquely valuable in organizational contexts.}

\newslide{Key Takeaways: Human vs Machine Intelligence}

\slides{
* Human intelligence is fundamentally embodied and context-dependent
* Bandwidth differences create complementary strengths
* Conversation and social understanding remain uniquely human
* AI augments rather than replaces human judgment
}

<!-- ============================================================ -->
<!-- EXERCISE 1: MAPPING ORGANIZATIONAL INFORMATION FLOWS -->
<!-- ============================================================ -->

<!-- TIMING: 11:00 -->
\section{Exercise 1: Mapping Your Organisation's Information Flows (30 minutes)}

\notes{**Time: 11:00-11:30** - This hands-on exercise allows you to apply the concepts we've just discussed to real organisational contexts.}

\notes{**Exercise Instructions:**

Working in small groups (3-4 people), map the information flows in an organisation you know well (current employer, previous employer, or case study organization). Consider:

1. **Information Sources**: Where does critical information originate?
   - Customer data
   - Market intelligence
   - Operational metrics
   - Employee knowledge

2. **Decision Points**: Where are key decisions made?
   - Strategic decisions (board level)
   - Tactical decisions (management)
   - Operational decisions (front-line)

3. **Human Bottlenecks**: Where does information require human processing?
   - What types of judgment are needed?
   - What context is essential?
   - Where does social/political understanding matter?

4. **Potential AI Augmentation**: Where could AI enhance (not replace) human decision-making?
   - Information aggregation
   - Pattern recognition
   - Scenario modeling
   - Routine processing

**Deliverable**: Create a simple diagram showing:
- Information flows (arrows)
- Decision points (boxes)
- Human judgment requirements (highlighted)
- Potential AI augmentation opportunities (marked)

Be prepared to share one insight from your mapping exercise with the full group.}

\newslide{Exercise Debrief Questions}

\slides{
* What surprised you about your organisation's information flows?
* Where are the critical human judgment points?
* Where does information get bottlenecked?
* How might AI change these flows - for better or worse?
}

<!-- ============================================================ -->
<!-- BREAK: 15 minutes -->
<!-- ============================================================ -->

<!-- TIMING: 11:30-11:45 BREAK -->
\notes{**11:30-11:45: Break** - 15 minute refreshment break}

<!-- ============================================================ -->
<!-- PART 2: INFORMATION TOPOGRAPHY AND DECISION MAKING -->
<!-- ============================================================ -->

<!-- TIMING: 11:45 -->
\section{Part 2: Information Topography and Decision Making (75 minutes)}

\notes{**Time: 11:45-13:00** - In this extended section, we'll explore how AI fundamentally changes organizational information landscapes and decision-making structures.}

\subsection{The Information Revolution in Organizations}

\include{_data-science/includes/new-flow-of-information.md}

\notes{In an AI-augmented organization, human attention becomes the most precious resource. The strategic allocation of this attention will determine organizational success. This is particularly critical in business where complex decisions require both algorithmic precision and human judgment.}

\subsection{The Evolution of Organizational Decision Making}

\include{_ai/includes/human-computers-interacting.md}
\include{_business/includes/the-api-mandate-bezos.md}

\notes{The way decisions are made in organizations is fundamentally changing. This means rethinking how we balance centralized control with devolved authority, especially in areas like strategy, risk assessment, and customer service.}

\subsection{Understanding Information Topography}

\include{_business/includes/an-attention-economy.md}
\include{_atomic-human/includes/trust-autonomy-embodiment.md}

\notes{AI fundamentally changes the information topography of organizations - the landscape of who knows what, when, and how. Understanding this new landscape is crucial for strategic decision-making.}

\subsection{Balancing Centralised Control with Devolved Authority}

\include{_business/includes/bezos-question-mark-email.md}
\include{_business/includes/executive-sponsorship.md}

\notes{This balance is particularly critical for modern organizations. You need centralized oversight for strategic alignment and risk management, but you also need devolved decision-making for agility and innovation. AI can help achieve both, but only if properly designed.}

\newslide{The Attention Economy Framework}

\slides{
* Human attention is the scarcest organizational resource
* AI changes who pays attention to what
* Strategic allocation of attention determines competitive advantage
* Organizations must design for attention management, not just task automation
}

\subsection{Generative AI as Human-Analogue Machines}

\newslide{Generative AI as HAM}

\slides{
* Generative AI provides us with an "analogue human"
* An information amplifier with a multiplier of 300,000,000
* Radically changes information infrastructure
* From Conway's Law: existing organisational models are redundant
}

\include{_simulation/includes/the-moniac.md}
\include{_ai/includes/processor-ham.md}
\include{_data-science/includes/new-flow-of-information-ham.md}

\notes{Generative AI provides organizations with what I call "Human-Analogue Machines" (HAMs) - systems that can process and generate information at scales far beyond human capacity, but that still require human oversight and judgment for critical decisions.

The challenge for business leaders is that we know our current approaches to AI implementation are likely insufficient, but we don't yet know exactly how they're insufficient. This requires experimentation and adaptive strategy rather than rigid planning.}

\newslide{The Strategic Challenge}

\slides{
* We know everything we're doing now is inadequate
* We don't know exactly how it's inadequate
* Traditional "plan-then-execute" approaches won't work
* Need adaptive, learning-oriented strategies
}

<!-- ============================================================ -->
<!-- LUNCH BREAK: 13:00-14:00 (can extend to 14:30 if needed) -->
<!-- ============================================================ -->

\notes{**13:00-14:00: Lunch Break** - 60 minutes. Can be extended to 14:30 if students need more time, but shorter lunch gives us a full 3 hours in the afternoon.}

<!-- ============================================================ -->
<!-- AFTERNOON SESSION: 14:00-17:00 (3 hours) -->
<!-- ============================================================ -->

<!-- TIMING: 14:00 START AFTERNOON -->
\section{Part 3: Maintaining Human Judgment and Building Trust (50 minutes)}

\notes{**Time: 14:00-14:50** - We'll examine critical cases where algorithmic systems have failed and develop frameworks for maintaining human judgment and trust.}

\subsection{When Algorithms Override Human Judgment: The Horizon Scandal}

\include{_software/includes/horizon-scandal.md}

\notes{The Horizon scandal dramatically demonstrates what happens when human judgment is subordinated to algorithmic outputs. In business, where decisions can have profound consequences for employees, customers, and stakeholders, maintaining human judgment is not optional - it's essential.

Business is fundamentally built on trust - trust between customers and the company, trust in markets, trust in the accuracy of information and decisions. AI systems fundamentally challenge how trust functions in organizations.}

\subsection{Techno-Inattention Bias in Organisations}

\include{_psychology/includes/selective-attention-bias.md}

\slides{
* Organizations develop "techno-inattention bias" - focusing on AI details while missing human dynamics
* The "gorilla" of culture, relationships, and ethics goes unnoticed
* Institutional inattentional blindness develops when leadership fixates on technical aspects
}

\notes{The selective attention phenomenon has a direct parallel in how organizations approach AI and digital transformation. Senior executives are increasingly asked to focus on complex technical details of AI systems and digital technology.

In this process of technological fascination, they miss the metaphorical gorilla walking through their business - the fundamental human and organizational dynamics that actually determine success. The gorilla represents organizational culture, employee development, customer relationships, and ethical considerations - elements that technical systems can never fully replace.}

\include{_business/includes/gorilla-conclusion.md}

\subsection{The Danger of Superficial Automation}

\include{_business/includes/superficial-automation.md}

\notes{Superficial automation that doesn't address underlying human needs can be particularly dangerous. We need systems that enhance human capabilities rather than simply replacing human tasks. This requires deep understanding of the work being automated and its human context.}

\newslide{Maintaining Human Judgment: Key Principles}

\slides{
* Algorithms should inform, not dictate, critical decisions
* Human judgment must remain accessible and exercisable
* Build in mechanisms for questioning algorithmic outputs
* Maintain transparency about when humans vs machines decide
* Develop "intelligent accountability" for AI-assisted decisions
}

<!-- ============================================================ -->
<!-- EXERCISE 2: CASE STUDY ANALYSIS - THE HORIZON SCANDAL -->
<!-- ============================================================ -->

<!-- TIMING: 14:50 -->
\section{Exercise 2: Case Study Analysis - The Horizon Scandal (30 minutes)}

\notes{**Time: 14:50-15:20** - A critical case study exercise examining one of the most significant algorithmic governance failures in modern business.}

\notes{**Exercise Instructions:**

The Horizon scandal at the UK Post Office represents one of the most significant failures of algorithmic governance in modern business history. Working in your groups, analyze this case through the lens of organizational decision-making:

**The Situation:**
- Horizon accounting system had bugs that created phantom shortfalls
- Post Office prosecuted hundreds of sub-postmasters for theft/fraud
- Human testimony (from sub-postmasters) was systematically discounted
- Computer evidence was treated as infallible
- Lives were destroyed, some sub-postmasters imprisoned
- Took nearly 20 years for truth to emerge

**Analysis Questions:**

1. **Organizational Structure**: 
   - How did the organization's structure enable this failure?
   - What checks and balances were missing?

2. **Decision-Making Architecture**:
   - At what points should human judgment have overridden algorithmic outputs?
   - What prevented that from happening?

3. **Information Flows**:
   - How was information about system problems suppressed or ignored?
   - Who had access to what information?

4. **Trust and Power Dynamics**:
   - Why was computer evidence trusted over human testimony?
   - How did power dynamics affect information flows?

5. **Prevention Framework**:
   - What organizational structures could have prevented this?
   - What governance mechanisms are needed for AI systems?

**Deliverable**: Identify 3 specific organizational safeguards that could prevent similar failures in your industry/organization.}

\newslide{Debrief: Lessons for AI Governance}

\slides{
* Never treat algorithmic outputs as infallible
* Maintain accessible human override mechanisms
* Build systems for questioning AI conclusions
* Ensure diverse voices can raise concerns
* Create intelligent accountability frameworks
}

<!-- ============================================================ -->
<!-- BREAK: 15 minutes -->
<!-- ============================================================ -->

<!-- TIMING: 15:20-15:35 BREAK -->
\notes{**15:20-15:35: Break** - 15 minute refreshment break}

<!-- ============================================================ -->
<!-- PART 4: STRATEGIC IMPLEMENTATION AND THE ATTENTION ECONOMY -->
<!-- ============================================================ -->

<!-- TIMING: 15:35 -->
\section{Part 4: Strategic Implementation and the Attention Economy (35 minutes)}

\notes{**Time: 15:35-16:10** - We'll cover the strategic frameworks for AI implementation, focusing on the attention economy and people-first approaches.}

\subsection{Human Attention as Strategic Resource}

\include{_economics/includes/the-attention-economy.md}

\notes{In an AI-augmented organization, human attention becomes the most precious resource. The strategic allocation of this attention will determine organisational success. This is particularly critical in business where complex decisions require both algorithmic precision and human judgment.}

\subsection{The Uncertainty Principle of Human Capital Quantification}

\include{_economics/includes/human-capital-inflation.md}

\notes{The more we try to precisely quantify human contribution in organizations, the more we risk changing the nature of that contribution. This creates fundamental challenges for performance management and strategy in AI-augmented organizations.

In an age where algorithms become commoditized, organizational culture becomes the primary competitive advantage. This is particularly true where trust, relationships, and ethical behavior are central to success.}

\subsection{The Business Imperative: People First, Not AI First}

\include{_business/includes/ft-op-ed.md}

\newslide{The Atomic Human Approach for Business}

\slides{
* Human attention is the differentiator
* Focus on how your human capital needs to adapt
* People-first approach, not AI-first
* Culture becomes the competitive moat
}

\notes{The organisations that will succeed in the AI age will not be those that most aggressively automate, but those that most thoughtfully integrate human and machine intelligence to create systems greater than the sum of their parts.}

\subsection{The Attention Flywheel: Reinvesting Human Capital}

\include{_business/includes/attention-flywheel.md}

\notes{While the traditional productivity flywheel focuses on reinvesting financial capital, the attention flywheel focuses on reinvesting human capital - our most precious resource in an AI-augmented world. This requires deliberately creating systems that capture the value of freed attention and channel it toward human-centered activities that machines cannot replicate.

**The Attention Flywheel Mechanism:**

1. **AI automates routine tasks** → Frees human attention
2. **Freed attention directed to high-value human activities** → Innovation, relationships, complex judgment
3. **High-value human activities generate competitive advantage** → Market differentiation
4. **Competitive advantage generates resources** → Investment in better AI and human development
5. **Cycle accelerates** → Compound growth in organizational capability

The key is ensuring freed attention doesn't just dissipate or get consumed by low-value activities. It requires intentional organizational design.}

\subsection{Emulsion: Combining Human and Machine Intelligence}

\notes{Organizations are like an emulsion mixing oil and water. The machine component could be replaced by better technology, but the human component - the vital, life-giving element - cannot be easily separated or substituted. Successful organizations need to develop structures that combine human and machine intelligence in stable, productive ways.

This means reversing the power dynamics and ensuring the organization remains in touch with its business differentiators, because in the long run those differentiators are unlikely to include AI - they'll include the human elements that AI cannot replicate.}

\subsection{Developing Board-Level Digital Literacy}

\notes{Business leaders must lead in developing digital literacy at the board level to ensure governance structures can effectively oversee AI implementation while maintaining appropriate human oversight. This doesn't mean boards need to become technical experts - it means they need frameworks for asking the right questions about AI systems and their organizational impacts.}

\newslide{Board-Level AI Governance Questions}

\slides{
* What decisions is AI making or influencing?
* Where does human judgment remain essential?
* How do we know when AI systems are failing?
* Who is accountable for AI-assisted decisions?
* How do we maintain organizational culture with AI?
}

<!-- ============================================================ -->
<!-- EXERCISE 3: DEVELOPING YOUR ORGANIZATION'S AI STRATEGY -->
<!-- ============================================================ -->

<!-- TIMING: 16:10 -->
\section{Exercise 3: Developing Your Organisation's AI Strategy (50 minutes)}

\notes{**Time: 16:10-17:00** - Final comprehensive synthesis exercise with group presentations}

\notes{**Final Exercise Instructions:**

This exercise brings together everything we've discussed today to develop a strategic framework for AI implementation in your organization (or an organization you know well).

**TIME ALLOCATION:**
- 35 minutes: Group work on strategic framework
- 15 minutes: 3-minute presentations from 5 groups (selected/volunteers)

Working in groups, create a strategic AI implementation plan that addresses:

**Address 3-4 of these key areas:**

**1. Information Topography Analysis**
   - Map current information flows and decision points
   - Identify where AI could augment (not replace) human intelligence
   - Highlight critical human judgment points that must be preserved

**2. Human-Machine Collaboration Design**
   - For 2-3 key business processes:
     * What should AI do?
     * What should humans do?
     * How do they interact?
   - Define clear accountability for AI-assisted decisions

**3. Attention Reallocation Strategy**
   - What routine tasks will AI automate?
   - Where will you redirect freed human attention?
   - How will you prevent attention dissipation?
   - What new high-value activities will humans focus on?

**4. Trust and Governance Framework**
   - How will you maintain stakeholder trust?
   - What governance mechanisms prevent Horizon-type failures?
   - How do you ensure diverse voices can raise concerns?
   - What metrics indicate healthy human-AI collaboration?

**5. Implementation Roadmap**
   - What are the first three concrete steps?
   - What organizational structures need to change?
   - How will you measure success?
   - What are the biggest risks and how will you mitigate them?

**Deliverable**: 
Create a one-page strategic framework (diagram, table, or structured bullets) showing:
- Key AI augmentation points and human judgment preservation zones
- Attention reallocation plan
- Governance mechanisms
- First three implementation steps
- One key risk and mitigation strategy

Be prepared for 3-minute group presentations sharing your framework and most important insight.}

\newslide{Group Presentations: Key Questions}

\slides{
* What is your most counterintuitive insight?
* Where will you NOT use AI (and why)?
* What is your biggest implementation challenge?
* How will you measure success beyond productivity metrics?
}

<!-- ============================================================ -->
<!-- CONCLUSION AND SYNTHESIS -->
<!-- ============================================================ -->

\section{Conclusion: Architecting Human-Machine Collaboration}

\include{_atomic-human/includes/river-gods-decide.md}

\newslide{Key Takeaways: Strategic Framework}

\slides{
* AI reshapes information flows - understand your information topography
* Human attention is your scarcest and most valuable resource
* Balance centralized oversight with devolved decision-making
* Recognize LLMs as interfaces, not substitutes for judgment
* Build intelligent accountability into all AI deployments
}

\newslide{Leadership Imperatives}

\slides{
* Lead with organizational culture, not technology
* Invest in human capital development alongside AI
* Maintain human judgment in critical decisions
* Build governance for AI systems from day one
* Focus on attention allocation, not just task automation
}

\newslide{The People-First AI Strategy}

\slides{
* Domain expertise must lead AI implementation
* Develop institutional character around AI use
* Create the attention flywheel for your organization
* Build trust through transparency and accountability
* Remember: In the long run, your differentiators are human
}

\notes{**Final Reflection:**

The future of business in the AI age is not about choosing between humans and machines - it's about creating systems that leverage the best of both. The organisations that will thrive will be those that understand that human attention, judgment, creativity, and relationships remain the most valuable assets, even as AI becomes ubiquitous.

As MBA graduates and future business leaders, your role is not to maximise automation but to architect organisations where human and machine intelligence combine to create value that neither could generate alone. This requires:

1. **Strategic thinking** about what should and shouldn't be automated
2. **Organisational design** that preserves human judgment and agency
3. **Cultural leadership** that maintains trust and ethics
4. **Adaptive learning** as we discover what works and what doesn't
5. **Courage** to prioritize long-term human capital over short-term efficiency

The AI revolution is not a technological challenge - it's a leadership challenge. And leadership is uniquely human.}

\subsection{Further Reading and Resources}

\include{_books/includes/the-atomic-human.md}

\newslide{Recommended Reading for MBA Students}

\slides{
* *The Atomic Human* by Neil D. Lawrence
* *Weapons of Math Destruction* by Cathy O'Neil
* *A Question of Trust* by Baroness O'Neill
}

\notes{**Additional Resources:**

- ai@cam: University of Cambridge initiative on AI (www.ai.cam.ac.uk)
- The Alan Turing Institute: UK's national institute for data science and AI
- Partnership on AI: Multi-stakeholder organization working on AI best practices
}

<!-- TIMING: 17:00 END -->
\notes{**End Time: 17:00** - Thank you for your engagement throughout the day!}

\thanks

\references
