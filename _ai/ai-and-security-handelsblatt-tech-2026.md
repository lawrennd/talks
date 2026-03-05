---
title: "Agentic AI and Security"
subtitle: "From bandwidth limits to accountable tool-using systems"
abstract: |
  Agentic AI changes security because it turns natural language into actions: tool calls, API requests, and workflow execution. That shift amplifies both productivity and risk—incidents can unfold at machine bandwidth while human sense-making remains slow, distributed, and approval-bound.

  This talk offers a practical frame for leaders building and deploying AI in European organisations: how to capture the upside of delegation (faster operations, reduced coordination overhead, partial paydown of technical and intellectual debt) while avoiding a new liability, *agentic debt*, that accumulates when authority boundaries, evidence requirements, and recovery paths are left implicit.

  We’ll move from first principles (bandwidth and interfaces) to concrete patterns: instruction hierarchy, least-privilege tooling, auditable action boundaries, reversible operations, and containment-by-default.
author:
- family: Lawrence
  given: Neil D.
  institute: Trent.AI and University of Cambridge
date: 2026-06-01
venue: "Handelsblatt TECH 2026, Heilbronn"
layout: talk
geometry: ["a4paper", "margin=2cm"]
papersize: a4paper
transition: None
reveal: True
pptx: False
docx: False
ipynb: False
---

\section{Frame: why agentic AI shifts security}

\newslides{Security at machine speed}

\slidesincremental{
* Modern AI systems operate at *machine bandwidth*; humans interpret at *human bandwidth*.
* Incidents unfold faster than review cycles and slower-than-real-time approvals.
* Agentic systems turn text into *actions* (tools, APIs, workflows), expanding the attack surface.
}

\notes{Open with the core mismatch: speed/scale/distance from context. For agentic AI, the key shift is that the model doesn't just generate text; it can act through tools and workflows. That turns prompt injection and instruction hijacking into operational security problems.}

\newslides{The opportunity: a judgement layer}

\slidesincremental{
* Despite rapid change, one constant remains: the attack surface keeps expanding.
* Teams ship faster than ever; threats scale faster than most review and governance cycles.
* Many organisations lack a *judgement layer* that turns security noise into “what matters now”.
}

\notes{This is the wedge: security is becoming an interpretation and coordination problem under time pressure. For Trent, the product claim is “becoming the Security Agent”: a judgement layer that helps small and medium enterprises identify, prioritise, and close their real risks—without turning every decision into a heavyweight process.}

\include{_ai/includes/institutional-tacit-knowledge-short.md}

\newslides{Europe’s opportunity: trust as infrastructure}

\slidesincremental{
* Competitive advantage is not just model quality, it’s *deployability*: delegation that stays legible under audit, incident response, and regulation.
* When authority boundaries are explicit, security becomes an accelerant (faster approvals, safer automation), not a brake.
* Agentic systems need "delegation poilcies": what is allowed, on what evidence, with what recovery path.
}

\include{_policy/includes/shannon-information.md}
\include{_data-science/includes/new-flow-of-information.md}
\include{_ai/includes/bandwidth-vs-complexity.md}

\section{A lens: Human Analogue Machines (HAMs)}

\newslides{HAMs: humans scaled up}

\slidesincremental{
* HAMs amplify capability: summarise, plan, draft, search, coordinate.
* HAMs amplify vulnerability: persuasion, authority bias, social engineering.
* Security becomes *interface security*: what the system can be induced to do, and who can induce it.
}

\include{_ai/includes/human-analogue-machines-short.md}
\include{_ai/includes/processor-ham.md}
\include{_data-science/includes/new-flow-of-information-ham.md}

\section{Three phases of security change}

\newslides{Phase 1: Classical security + GenAI enhancement}

\slidesincremental{
* Use GenAI to *compress bandwidth* for defenders: triage, summarise, correlate, explain.
* Turn logs and alerts into decision-ready narratives with provenance.
* Main risk: over-trust and automation bias (false confidence at scale).
}

\newslides{Practical Phase 1 patterns}

\slidesincremental{
* Secure summarisation: bounded context, redaction, and provenance links to primary logs.
* Analyst copilots: draft investigations, but keep approvals and irreversible actions human.
* “Faster-than-human” response: pre-authorise *containment* actions, not *remediation*.
}

\newslides{Phase 2: GenAI-specific security challenges}

\slidesincremental{
* Prompt injection becomes an *operational* threat when the model has tools.
* Indirect prompt injection via documents/web pages contaminates the instruction stream.
* Data exfiltration shifts from perimeter breach to *model-mediated leakage*.
}

\include{_ml/includes/code-data-separation-transgression.md}

\newslides{Practical Phase 2 patterns}

\slidesincremental{
* Treat prompts, tool outputs, and retrieved documents as *untrusted inputs*.
* Make instruction hierarchy explicit: system/developer/user/tool/data.
* Apply least privilege to tools; require confirmations for high-impact actions.
}

\newslides{Phase 3: Information systems implications}

\slidesincremental{
* Re-design systems for *delegation with accountability*.
* Make authority boundaries explicit: who can cause which actions, with which evidence.
* Build for recovery: audit trails, reversible actions, and containment-by-default.
}

\include{_ai/includes/intellectual-debt-short.md}
\include{_ai/includes/agentic-debt-short.md}
\include{_software/includes/lancelot.md}

\newslides{Practical Phase 3 patterns}

\slidesincremental{
* Separate “thinking” from “acting”: plan, justify, then execute with logged evidence.
* Design for rollback: reversible actions and short-lived credentials.
* Make audits cheap: every action produces an explanation and a trace.
}

\section{Case studies and practical takeaways}

\newslides{Case study: Heathrow}

\slidesincremental{
* What happened can matter less than *how quickly it unfolded*.
* At scale, the defender’s bottleneck is often interpretation and coordination, not detection.
* Modern attackers exploit organisational latency (handoffs, approvals, ambiguity).
}

\notes{Use Heathrow as a recognisable “compressed timeline” story: the organisation is slower than the incident. Emphasise the socio-technical failure mode: partial information, slow approvals, and misaligned authority. Tie back to bandwidth mismatch.}

\newslides{Case study: Notion AI Agents (research framing)}

\slidesincremental{
* Agentic workflows chain: retrieval → reasoning → tool use → action.
* The critical security question: who can influence what the agent *believes* and what it *does*?
* Threat model: indirect prompt injection, authority confusion, and data boundary violations.
}

\notes{Keep this high-level and non-accusatory: it’s a clean example of agentic architecture patterns. Highlight instruction hierarchy and provenance: the agent should distinguish policies from user requests from retrieved content.}

\newslides{Takeaways}

\slidesincremental{
* Bandwidth mismatch is the core risk: systems move faster than human sense-making.
* Agentic AI turns text attacks into action attacks: model + tools = new threat model.
* Design for legibility: instruction hierarchies, provenance, and auditable action boundaries.
* Prefer reversible, least-privilege delegation with strong defaults and fast containment.
}

\thanks

\references

