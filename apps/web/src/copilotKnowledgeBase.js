// Shared knowledge base + matching logic for the AI Campus Copilot demo.
//
// This module is the single source of truth for the copilot's scripted
// responses. It is imported by:
//   - apps/web/src/main.jsx (the interactive Copilot Demo UI)
//   - eval/run-eval.mjs (the offline eval harness described in
//     docs/product/AI-Evaluation-Plan.md and docs/product/Eval-Harness-Results.md)
//
// Keeping the knowledge base and matching function here means the eval
// harness is testing the exact same logic the UI runs - not a copy that can
// drift out of sync.
//
// This is a scripted stand-in for the RAG + guardrails design described in
// docs/architecture/System-Architecture.md: confident answers carry a source
// citation, low-confidence answers are escalated to a human department, and
// sensitive/crisis language is routed to a human with crisis resources
// surfaced immediately (see docs/product/AI-Evaluation-Plan.md guardrail
// policy table).

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
  },
  {
    id: "crisis-support",
    // Matches first by design - see matchCopilotResponse(). Crisis language
    // must never fall through to a generic "I don't know" fallback.
    keywords: [
      "mental health",
      "crisis",
      "suicide",
      "suicidal",
      "self-harm",
      "self harm",
      "depressed",
      "panic attack",
      "emergency"
    ],
    answer:
      "I want to make sure you get support right away. This isn't something I can resolve on my own, so I'm connecting you with a person now.",
    source: null,
    confidence: 40,
    escalateTo: "Counseling and Wellness Center (24/7)",
    crisisResource:
      "If you are in immediate danger, call 911. Campus Counseling & Wellness Center 24/7 line: (555) 010-2273. National Suicide & Crisis Lifeline: call or text 988."
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

export const COPILOT_SUGGESTED_PROMPTS = [
  "How do I check my library fines?",
  "When does financial aid disburse this semester?",
  "I missed the add/drop deadline - what are my options?",
  "Where do I replace a lost student ID?"
];

// Crisis-related entries are checked first and independently of other
// keyword matches, so a message that mentions both a routine topic and
// crisis language (e.g. "I'm too depressed to deal with my library fine")
// is always routed to crisis support rather than answered as a fines query.
export function matchCopilotResponse(query) {
  const normalized = query.toLowerCase();

  const crisisEntry = COPILOT_RESPONSES.find(
    (entry) => entry.id === "crisis-support" && entry.keywords.some((keyword) => normalized.includes(keyword))
  );
  if (crisisEntry) {
    return crisisEntry;
  }

  const hit = COPILOT_RESPONSES.find(
    (entry) => entry.id !== "crisis-support" && entry.keywords.some((keyword) => normalized.includes(keyword))
  );

  return hit ?? COPILOT_FALLBACK_RESPONSE;
}

export function copilotTicketId() {
  return `CMP-${Math.floor(1000 + Math.random() * 9000)}`;
}
