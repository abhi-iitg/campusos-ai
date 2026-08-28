# Key Decisions and Tradeoffs

This document captures a handful of specific decisions made while building CampusOS AI, the alternatives considered, why they were rejected, and what would change with more evidence. The goal is to make the reasoning behind the artifacts visible, not just the artifacts themselves.

## 1. Wedge: AI copilot + admin intelligence, not "digitize everything first"

**Decision:** Treat the AI Campus Copilot and Admin Intelligence as the wedge, with identity, academics, and services as supporting modules rather than the headline.

**Alternatives considered:**
- Lead with Digital Student Identity (credential verification) as the wedge - it has the cleanest, most deterministic value prop (verification time saved) and the least AI risk.
- Lead with a full "unified campus app" covering all six modules at parity.

**Why rejected:** Identity-first is real but it's a feature, not a platform story - it under-sells the AI PM angle this project exists to demonstrate. "All six modules at parity" spreads effort thin and produces a portfolio that's wide but shallow everywhere, which is worse for an interview conversation than being able to go deep on one thing.

**Tradeoff accepted:** The AI copilot is the least mature module from a "would a university buy this today" standpoint (no real retrieval layer, scripted responses), so the wedge is partly aspirational. That's mitigated by being explicit about it - see [`Eval-Harness-Results.md`](./Eval-Harness-Results.md) and the System Architecture's "current prototype vs. future state" split.

**What would change this:** Real conversations with a registrar or student-services office about which workflow generates the most ticket volume. If identity verification turns out to be the actual top pain point, the wedge should follow the evidence, not the narrative that's most interesting to write about.

## 2. Honest "not first-of-its-kind" positioning

**Decision:** Explicitly frame CampusOS AI as a case study in an existing category (campus AI assistants, LMS integrations, student-service chatbots already exist), not a novel invention.

**Alternatives considered:** Position it as a category-defining "smart campus OS" with stronger, more startup-pitch-style claims about being first or unique.

**Why rejected:** The stronger claim is checkable and false - a five-minute search turns up multiple existing products in this space. Making a claim a hiring manager can disprove in five minutes costs more credibility than the claim gains. The honest framing also better demonstrates the actual skill being shown: category analysis and positioning judgment, not invention.

**Tradeoff accepted:** "Case study demonstrating judgment" is a less exciting elevator pitch than "revolutionary new platform." That's fine for a portfolio piece whose audience is hiring managers, not investors.

## 3. Scripted Copilot demo instead of a connected LLM

**Decision:** Build the AI Copilot Demo as a deterministic, keyword-matched script with citations and escalation chips, rather than wiring up a real LLM (even a cheap one) behind it.

**Alternatives considered:**
- Connect a real LLM (e.g., a small hosted model) with a tiny retrieval index over a handful of fake policy documents, for a "real" RAG demo.
- Skip the interactive demo entirely and just describe the intended UX in the PRD.

**Why rejected real LLM:** A live LLM call from a GitHub Pages static site means exposing an API key client-side (a security non-starter) or standing up and paying for a backend that has to stay online indefinitely for a portfolio project. The complexity and ongoing cost weren't justified by what it would add - the goal is to demonstrate the *product decisions* (citations, confidence thresholds, escalation, crisis handling), which a deterministic script can show just as clearly, and more reliably for a recruiter clicking through a demo.

**Why rejected "no interactive demo":** Describing a UX contract in prose is much weaker than letting someone experience it. The interactive demo is what makes the AI Evaluation Plan's guardrail policy tangible - see [`Eval-Harness-Results.md`](./Eval-Harness-Results.md), which would not have been possible to build meaningfully without something runnable.

**Tradeoff accepted:** The demo can't answer arbitrary questions, and anyone who pushes on it will quickly find its edges. The "Try it yourself" framing in the demo says this explicitly, so it reads as an intentional scope decision rather than a hidden limitation.

**What would change this:** If this were being built toward an actual pilot rather than a portfolio piece, a real retrieval layer over real campus documents (even just one institution's public policy pages) would be the first engineering investment - the eval harness's structure was deliberately built so it extends to that case (see "Known limitations" in `Eval-Harness-Results.md`).

## 4. Building an eval harness instead of only writing an eval plan

**Decision:** After writing the AI Evaluation Plan (metrics, targets, guardrails), build a small runnable harness (`eval/run-eval.mjs`) that checks the Copilot's actual logic against a labeled dataset, rather than leaving the plan as a standalone document.

**Alternatives considered:** Leave the AI Evaluation Plan as a planning artifact only - it's already detailed (specific metrics, targets, guardrail table) and arguably "complete" as a PM document.

**Why rejected "plan only":** A plan that's never been run against anything hasn't been stress-tested. Building the harness immediately surfaced a real gap - the original Copilot logic didn't handle crisis/emergency language per the plan's own guardrail policy (see [`Eval-Harness-Results.md`](./Eval-Harness-Results.md)). That gap would not have been visible from the plan document alone. Finding and fixing it is a better demonstration of AI PM judgment than the plan being internally consistent on paper.

**Tradeoff accepted:** The harness is intentionally small and tests routing logic, not real model groundedness (there's no model yet). It's explicit about that scope rather than implying more rigor than it has.

## 5. Keeping customer discovery labeled as informal/portfolio-stage

**Decision:** In [`Customer-Discovery.md`](../research/Customer-Discovery.md), explicitly label the research as informal, small-sample, and not a substitute for commissioned research - rather than presenting synthesized personas and pain points as if they came from a formal study.

**Alternatives considered:** Write the discovery findings in standard "research says..." language without qualification, since the findings themselves (pain points, JTBD) are plausible and commonly cited in higher-ed product discussions.

**Why rejected:** If a hiring manager asks "how many students did you actually talk to," the answer needs to match the document. Overstating the rigor of discovery is the kind of thing that, once caught, makes a reviewer re-read everything else more skeptically. Understating it costs little - the synthesized pain points are still useful as hypotheses - and it demonstrates the judgment to know the difference between a hypothesis and a finding.

**Tradeoff accepted:** It's a less polished-sounding document. That's the point.
