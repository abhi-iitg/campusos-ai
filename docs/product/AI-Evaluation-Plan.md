# AI Evaluation And Safety Plan

## Objective

Campus Atlas needs an AI quality system that helps a university trust answers, verify workflows, and understand when human staff must take over.

## Offline Evaluation

| Metric | Target | Method |
|---|---:|---|
| Answer groundedness | >= 92% | Compare response claims against retrieved source passages |
| Hallucination rate | <= 3% | Human review flags unsupported claims, invented policies, or fabricated dates |
| Policy refusal accuracy | >= 95% | Test high-risk campus decision prompts |
| Retrieval hit rate | >= 88% | Known-answer set across campus policies and service FAQs |
| Retrieval precision@5 | >= 80% | Review whether top retrieved documents are relevant to the user intent |
| Citation accuracy | >= 90% | Check whether cited documents support the final answer |
| Response quality | >= 4.2/5 | Rubric review for helpfulness, clarity, actionability, and tone |
| Escalation classification | >= 85% | Label cases where human staff should handle the request |

## Online Evaluation

| Metric | Target | Method |
|---|---:|---|
| Resolved without staff | 60% | Student confirms answer or completes workflow |
| Escalation precision | 85% | Staff labels whether handoff was needed |
| Student satisfaction | 4.3/5 | Post-resolution micro-survey |
| Workflow completion | 70% | User completes the intended action after AI guidance |
| Repeat contact rate | < 12% | Student reopens same issue within seven days |

## Safety Controls

- Confidence threshold before showing direct answers
- Source citations for policy and academic guidance
- Human handoff for disciplinary, financial, mental-health, legal, or academic-status decisions
- PII minimization in prompts and logs
- Role-based access to student record context
- Audit trails for credential and advisor workflows

## Guardrail Policy

| Scenario | Expected behavior |
|---|---|
| Low retrieval confidence | Ask a clarifying question or route to human staff |
| No supporting citation | Do not provide a definitive answer |
| Academic-status decision | Explain process and escalate to advisor or registrar |
| Financial or payment issue | Provide general navigation only and escalate account-specific cases |
| Mental-health or emergency language | Show crisis/support guidance and human escalation |
| Sensitive student record access | Require role-based authorization before retrieval |

## Escalation Logic

```text
User query
  |
  v
Intent and risk classification
  |
  +-- high-impact / sensitive --> human escalation
  |
  v
Retrieve campus sources
  |
  +-- weak retrieval confidence --> clarify or escalate
  |
  v
Generate cited answer
  |
  +-- missing citation or low confidence --> escalate
  |
  v
Suggest workflow action and collect feedback
```

## Evaluation Dataset

| Dataset slice | Example coverage |
|---|---|
| Registrar FAQs | Certificates, transcripts, enrollment, deadlines |
| Library workflows | Renewals, fines, due dates, reservations |
| Dining and payments | Meal orders, refunds, wallet issues |
| Academic advising | Credits, attendance, course planning |
| Adversarial prompts | Prompt injection, unsupported policy requests, private-data access |
| Escalation cases | Financial, disciplinary, emergency, and ambiguous requests |

## Monitoring Loop

1. Sample prompt, retrieval, and response traces weekly.
2. Review low-confidence and escalated conversations.
3. Compare policy answers against updated university documents.
4. Track quality by student cohort to detect unfair performance.
5. Convert repeated failure modes into backlog items.

## Launch Gate

The AI copilot should not graduate from pilot to MVP until it meets:

- 92% groundedness
- 85% escalation precision
- 4.3/5 student satisfaction
- No unresolved critical safety incidents in the pilot window

## Implementation Note

A small runnable eval harness (`eval/run-eval.mjs`) checks the Copilot Demo's response-routing logic against a labeled dataset covering the slices above, including escalation correctness, citation correctness, and guardrail behavior for adversarial and crisis-language prompts. Running this harness during development surfaced a real guardrail gap (missing crisis resources for emergency/mental-health language) which was then fixed. See [Eval Harness Results](./Eval-Harness-Results.md) for the dataset, methodology, and results - and for what this harness does and does not cover relative to the full plan above.
