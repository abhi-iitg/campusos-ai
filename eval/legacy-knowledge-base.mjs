// Snapshot of the AI Copilot knowledge base BEFORE the crisis-support fix.
//
// This file exists only so eval/run-eval.mjs can reproduce the "before"
// results referenced in docs/product/Eval-Harness-Results.md. It is not used
// by the product UI - apps/web/src/copilotKnowledgeBase.js is the live
// source of truth (see that file for the current, fixed knowledge base).

export const COPILOT_RESPONSES = [
  {
    id: "library-fines",
    keywords: ["library", "fine", "fines", "overdue"],
    answer:
      "You can view and pay library fines under My Account -> Fines & Fees. Overdue items accrue $0.25/day, capped at $15 per item.",
    source: "Library Services Knowledge Base",
    confidence: 96
  },
  {
    id: "financial-aid-disbursement",
    keywords: ["financial aid", "disburse", "disbursement", "aid"],
    answer:
      "Financial aid for the Fall term disburses 10 days before classes start, as long as all verification documents are submitted by August 1.",
    source: "Registrar Academic Calendar",
    confidence: 94
  },
  {
    id: "replace-student-id",
    keywords: ["student id", "id card", "replace", "lost id"],
    answer:
      "Replacement student IDs are issued at Campus ID Services (Student Union, Room 102) for a $15 fee. Bring a government-issued photo ID.",
    source: "Campus ID Services Guide",
    confidence: 91
  },
  {
    id: "add-drop-deadline",
    keywords: ["drop", "add/drop", "deadline", "withdraw"],
    answer:
      "Late add/drop requests after the published deadline require instructor and department approval, and the policy varies by course and college.",
    source: null,
    confidence: 58,
    escalateTo: "Registrar's Office - Academic Petitions"
  }
];

export const COPILOT_FALLBACK_RESPONSE = {
  id: "fallback",
  answer:
    "I don't have verified campus information on that yet. I've routed this to a team member who can help.",
  source: null,
  confidence: 42,
  escalateTo: "General Student Services"
};

export function matchCopilotResponse(query) {
  const normalized = query.toLowerCase();
  const hit = COPILOT_RESPONSES.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword))
  );
  return hit ?? COPILOT_FALLBACK_RESPONSE;
}
