---
title: "The Atomic Human"
subtitle: "Understanding Ourselves in the Age of AI"
abstract: |
  It seems that wherever we look, on TV, on the internet, or in newspapers, 
  people are telling us how they are using AI to give us better experiences 
  but are they? What does that mean? Is it safe? Should we be concerned?
  
  Artificial Intelligence refers to the ability of machines to perform tasks 
  that typically require human intelligence. This includes capabilities like 
  learning, problem-solving, decision-making, and perception but, as 
  generative AI reshapes the technology landscape, we face fundamental 
  questions about human-machine interaction.
  
  In this talk I'll discuss the limitations of artificial intelligence, 
  why I find the notion of artificial general intelligence absurd, and how 
  there's a part of us that can never be replaced by the machine.
  
  This talk is based on my book, The Atomic Human, published with Allen Lane.
author:
- family: Lawrence
  given: Neil D.
  gscholar: r3SJcvoAAAAJ
  institute: University of Cambridge
  twitter: lawrennd
  url: http://inverseprobability.com
venue: CSES/ARU Christmas Lectures, Anglia Ruskin University
date: 2025-12-10
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

\section{Introduction}

\notes{Welcome to the CSES/ARU Christmas Lectures! Today we're going to talk about artificial intelligence, but not in the way you might expect. Rather than focusing on what computers can do, we're going to focus on what makes us uniquely human.}

\notes{You've probably heard a lot about AI recently. It's everywhere: in your phones, in your apps, in the news. Some people say it will solve all our problems. Others worry it will take over the world. But to understand AI, we first need to understand ourselves.}

\include{_ai/includes/henry-ford-intro.md}

\subsection{What Kind of Intelligence Are We Creating?}

\include{_atomic-human/includes/artificial-general-vehicle.md}

\notes{This is one of my favourite examples because it shows why the term "Artificial General Intelligence" or AGI doesn't really make sense. Just as there's no vehicle that's perfect for every journey, there's no intelligence that's perfect for every problem.}

\section{The Atomic Eye}

\include{_ai/includes/the-atomic-eye.md}

\section{How Are We Different from Machines?}

\notes{To understand what makes us special, let me tell you a story about a remarkable man named Jean-Dominique Bauby.}

\include{_ai/includes/diving-bell-butterfly.md}
\include{_ai/includes/jean-dominique-bauby.md}
\include{_ai/includes/shannon-bauby.md}


\subsection{The Embodiment Factor}

\include{_ai/includes/embodiment-factors-tedx.md}

\notes{This is what I call being "locked in". Jean-Dominique Bauby was physically locked in due to his condition, but in a sense, all of us are locked in compared to machines. We think incredibly fast - your brain is doing billions of calculations every second - but we communicate relatively slowly.}

\notes{Machines are the opposite. They don't think as deeply as we do, but they can share information incredibly quickly. That's why the internet feels so powerful - it's connecting machines that can share information at billions of bits per second.}

\subsection{The Real Conversation}

\include{_ai/includes/conversation-tedx.md}

\notes{Think about your conversations with friends. They're not just about exchanging information - they're about understanding, empathy, shared experiences. That's something that's uniquely human and incredibly difficult for machines to replicate.}

\include{_ai/includes/conversation-computer.md}

\section{The New Flow of Information}

\include{_data-science/includes/new-flow-of-information.md}

\notes{The world has changed dramatically in recent years. We now live in a world where machines mediate much of our communication and decision-making. Understanding this new flow of information is crucial for understanding both AI and ourselves.}

\subsection{Our Data, Our Intelligence}

\include{_atomic-human/includes/their-data-comes-from-us.md}

\notes{Here's something really important to understand: these AI systems seem intelligent, but their "intelligence" comes from us. They learn from human-created data, human-written text, human-taken photos. In a sense, they're mirrors reflecting back our own intelligence.}


\section{The Human Touch}

\include{_ai/includes/baby-shoes.md}

\notes{This is one of my favourite examples of what makes us uniquely human, our ability to understand context, emotion, and meaning with just a few words.}

\section{When Things Go Wrong}

\notes{Understanding AI isn't just about the technology, it's about understanding what happens when we deploy digital systems without proper thought. Let me show you two examples from recent history that demonstrate why we need to be careful.}

\include{_software/includes/horizon-scandal.md}

\notes{The Horizon scandal is a stark reminder that when we trust automated systems without understanding them, real people suffer real consequences. Over 700 sub-postmasters were prosecuted, some went to prison, lives were destroyed, all because the computer system made errors and people assumed the computer must be right.}

\notes{This happened because of what I call the "computer says no" problem. We often trust computers more than we should, assuming they can't make mistakes. But computers only do what they're programmed to do, and if that programming is flawed, or if the system has bugs, the results can be devastating.}

\include{_ai/includes/facebook-us-elections.md}

\subsection{Trust, Autonomy, and Embodiment}

\include{_atomic-human/includes/trust-autonomy-embodiment.md}

\notes{These three concepts - trust, autonomy, and embodiment - are central to understanding the relationship between humans and machines. We need to think carefully about when we should trust machines, what autonomy we should give them, and how their lack of embodiment affects their decision-making.}

\section{What Does the Public Think?}

\notes{In 2017, I was part of a Royal Society working group looking at machine learning. We did something that many technical groups don't do: we actually asked members of the public what they thought. We ran public dialogues with people from all walks of life, not experts, just regular people.}

\include{_ml/includes/rs-report-machine-learning.md}
\include{_ml/includes/rs-report-mori-poll-art.md}

\notes{What's really interesting is where the public were enthusiastic and where they were skeptical. They could see the value in using AI for healthcare, for transport, for solving crimes, for making cities work better. These all made sense to them.}

\notes{But there was one area where they were unanimous: they didn't see the point of AI creating art or poetry. They felt this was fundamentally a human activity that machines could only mimic at best. And I think they were absolutely right about that.}

\include{_ml/includes/chat-gpt-mercutio.md}

\notes{Despite what the public said they wanted, despite their interest in healthcare and transport and crime, one of the areas where we've made the most visible progress is exactly what they didn't want: AI creating art and literature.}

\notes{ChatGPT can write sonnets in the style of Shakespeare. It can create images. It can compose music. But as the public understood back in 2017, this isn't the same as human creativity. It's mimicry, not creation. It's pattern matching, not genuine artistic expression.}

\notes{The machine can produce something that looks like a Shakespearean sonnet, but it doesn't understand love, or loss, or any of the human experiences that make Shakespeare's work meaningful to us. It's learned the patterns, but it hasn't lived the life.}

\section{How Do These Machines Actually Work?}

\include{_simulation/includes/the-moniac.md}

\notes{To understand modern AI, it helps to look at an old machine. The MONIAC was a hydraulic computer that modelled the economy using water flows. Modern AI systems are conceptually similar, they're models that try to capture patterns in data.}

\include{_ai/includes/processor-ham.md}

\notes{But here's the key difference: modern AI systems operate at incredible speed. They can process information much faster than we can. But speed isn't everything.}

\include{_data-science/includes/new-flow-of-information-ham.md}
\include{_ai/includes/bandwidth-vs-complexity.md}

\section{What Makes Us Atomic?}

\notes{So we return to the concept of "The Atomic Human". Atomism, proposed by the ancient Greek philosopher Democritus, suggested that if you kept dividing matter into smaller and smaller pieces, eventually you would reach something that couldn't be divided any further, the atom, from the Greek word for "indivisible".}

\notes{In the same way, as AI takes over more and more tasks that we used to think required human intelligence, e.g. playing chess, recognising faces, translating languages, even writing essays, we discover what's left. What's the part of human intelligence that can't be replaced by a machine?}

\notes{It's not about being better at calculations, machines beat us there. It's not about memory, machines win again. It's not even about pattern recognition, modern AI can do that remarkably well.}

\notes{What makes us uniquely human is our limitations and vulnerabilities. This gives us a shared context from which meaning drawn from lived experience. It gives us capacity for genuine empathy and connection. Our creativity is born from our limitations, not despite them.}

\include{_atomic-human/includes/the-trick-doesnt-replace-the-truth.md}

\notes{This is perhaps the most important point: AI systems can be impressive, they can be useful, but they're fundamentally different from human intelligence. They're tools, not replacements.}

\section{So Should We Worry?}

\include{_atomic-human/includes/nothing-to-worry-about.md}

\notes{I don't think we should be worried about AI taking over the world or becoming conscious. But we should think carefully about how we use these tools. We should understand their limitations. And most importantly, we should value what makes us uniquely human.}

\subsection{Your Role in the Future}

\notes{You're growing up in a world where AI is becoming increasingly prevalent. That gives you a unique opportunity and responsibility. You get to help shape how these technologies are used. You get to decide which tasks we want to automate and which we want to keep human.}

\notes{The key is to understand both the capabilities and limitations of AI. Don't be intimidated by it, but don't be naive about it either. Learn how it works. Question how it's being used. And always remember what makes you uniquely human: your embodiment, your empathy, your creativity, your ability to genuinely understand and connect with other people.}

\notes{The future isn't about humans versus machines. It's about understanding how we can work with these tools while preserving and celebrating what makes us human. That's the essence of being an Atomic Human - recognizing that there's a core of humanity that can't be divided, copied, or replaced by any machine.}

\include{_atomic-human/includes/ai-onto-societys-wicked-problems.md}

\section{What Are We Doing About It?}

\notes{So we've talked about the challenges, the problems, the things that can go wrong. But what are we actually doing to address these issues? Let me tell you about some initiatives that are trying to deploy AI in ways that genuinely help people and address real societal challenges.}

\subsection{Three Complementary Approaches}

\notes{At Cambridge, we're working on three interconnected initiatives that each tackle different aspects of the AI challenge.}

\include{_ai/includes/cambridge-ai-initiatives-logos.md}

\notes{First, there's the **Accelerate Programme for Scientific Discovery**, funded by Schmidt Futures. This is about using AI to solve real scientific problems, from understanding climate change to developing new medicines. It's about making sure AI serves science, not just commerce.}

\notes{Second, there's **Data Science Africa**, a grassroots initiative that I'm particularly proud of. This is about capacity building on the African continent, making sure that AI development isn't just happening in Silicon Valley or Cambridge, but is being shaped by people from diverse backgrounds with diverse needs. It's end-to-end data science, from the farmer's field to the Ministry of Agriculture, from health centers to medicine distribution.}

\notes{Third, there's **ai@cam**, the University's flagship programme. This brings together researchers from across the University, from computer scientists to medics to social scientists to philosophers, all working together to understand and shape how AI develops. It's about ensuring that AI development is informed by diverse expertise and perspectives.}

\subsection{Why This Matters for You}

\notes{These initiatives share a common philosophy: AI should serve people, not the other way around. They focus on real problems, they involve diverse communities, and they think carefully about the human impact of the technology.}

\notes{As you think about your future, remember that you don't have to accept AI as it's given to you. You can help shape it. Whether you become a computer scientist, a doctor, a teacher, a policy maker, or anything else, you'll have opportunities to influence how these technologies are deployed in your field.}

\notes{The key is to stay curious, stay critical, and stay human. Ask questions. Challenge assumptions. And always remember that the goal isn't to build the most impressive AI, it's to build AI that genuinely makes people's lives better.}

\section{Questions to Think About}

\notes{As we close, here are some questions for you to think about:

1. Can you think of situations where you'd prefer a human decision-maker over an AI, even if the AI might be more "accurate"? Why?

2. What human skills do you think will become more valuable, not less, as AI becomes more capable?

3. How can we ensure that AI systems reflect the values we want in society?

4. What role do you want AI to play in your future career?

These aren't questions with simple answers, but they're important questions to think about as you navigate a world increasingly shaped by artificial intelligence.}

\thanks

\references

