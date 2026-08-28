import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const modules = [
  {
    id: "ai-campus-copilot",
    name: "AI Campus Copilot",
    owner: "Student Experience",
    maturity: "Prototype",
    health: 86,
    kpi: "AI self-service resolution rate",
    summary: "Answers campus FAQs, recommends services, and routes complex requests.",
    nextMilestone: "Connect searchable knowledge base and ticket handoff."
  },
  {
    id: "digital-student-identity",
    name: "Digital Student Identity",
    owner: "Registrar / IT",
    maturity: "MVP",
    health: 78,
    kpi: "Verification time saved",
    summary: "Unifies profile, campus ID, academic status, and verifiable credentials.",
    nextMilestone: "Add QR credential verification flow."
  },
  {
    id: "academic-intelligence",
    name: "Academic Intelligence",
    owner: "Academic Affairs",
    maturity: "MVP",
    health: 82,
    kpi: "Students with clear progress visibility",
    summary: "Tracks semester progress, credits, attendance, and risk signals.",
    nextMilestone: "Launch advisor alerts and degree plan suggestions."
  },
  {
    id: "campus-services-hub",
    name: "Campus Services Hub",
    owner: "Campus Operations",
    maturity: "MVP",
    health: 91,
    kpi: "Completed service workflows",
    summary: "Coordinates library, dining, transport, housing, printing, and help desk requests.",
    nextMilestone: "Add service marketplace checkout."
  },
  {
    id: "admin-intelligence",
    name: "Admin Intelligence",
    owner: "University Leadership",
    maturity: "Prototype",
    health: 74,
    kpi: "Weekly dashboard-active admins",
    summary: "Shows adoption, workflow load, response quality, and student engagement.",
    nextMilestone: "Add department benchmarking and exportable reports."
  },
  {
    id: "career-research-hub",
    name: "Career & Research Hub",
    owner: "Career Services",
    maturity: "Roadmap",
    health: 62,
    kpi: "Matched opportunities accepted",
    summary: "Matches students with internships, research projects, events, and mentors.",
    nextMilestone: "Prototype opportunity recommendation rules."
  }
];

const metrics = {
  northStarMetric: "Weekly active students completing meaningful campus workflows",
  scorecards: [
    { label: "Weekly active students", value: "18.4K", trend: "+12.8%", tone: "positive" },
    { label: "Workflow completion", value: "71%", trend: "+9.4%", tone: "positive" },
    { label: "Manual tickets avoided", value: "4.8K", trend: "+22%", tone: "positive" },
    { label: "Average resolution time", value: "2.6h", trend: "-31%", tone: "positive" }
  ],
  adoption: [
    { segment: "Identity", activeUsers: 18400, completionRate: 92 },
    { segment: "Academics", activeUsers: 13950, completionRate: 76 },
    { segment: "Services", activeUsers: 11780, completionRate: 81 },
    { segment: "Copilot", activeUsers: 9340, completionRate: 68 },
    { segment: "Career", activeUsers: 5210, completionRate: 54 }
  ],
  supportingMetrics: [
    "Manual request reduction",
    "AI self-service resolution rate",
    "Student satisfaction score",
    "Admin dashboard weekly active users",
    "Service transaction completion rate"
  ]
};

const services = [
  {
    id: "library-renewal",
    title: "Renew Library Book",
    category: "Library",
    status: "Live",
    owner: "Central Library",
    eta: "Instant",
    volume: 1280
  },
  {
    id: "canteen-order",
    title: "Pre-order Canteen Meal",
    category: "Dining",
    status: "Live",
    owner: "Campus Dining",
    eta: "15 min",
    volume: 2310
  },
  {
    id: "document-request",
    title: "Request Bonafide Certificate",
    category: "Registrar",
    status: "Live",
    owner: "Academic Office",
    eta: "4 hours",
    volume: 860
  },
  {
    id: "transport-pass",
    title: "Apply Transport Pass",
    category: "Transport",
    status: "Beta",
    owner: "Transport Desk",
    eta: "1 day",
    volume: 420
  }
];

const studentProfile = {
  id: "COS-2026-1042",
  name: "Aarav Raman",
  program: "B.Tech Computer Science",
  semester: "Semester 7",
  standing: "Good Standing",
  creditsCompleted: 136,
  creditsRequired: 160,
  attendance: 91,
  gpa: 8.7,
  pendingTasks: [
    "Verify internship offer letter",
    "Submit final-year project milestone 2",
    "Renew library book before Friday"
  ],
  credentials: [
    { name: "Digital Student ID", status: "Verified", issuer: "Campus Atlas Identity" },
    { name: "Semester Grade Report", status: "Issued", issuer: "Registrar" },
    { name: "Bonafide Certificate", status: "Ready", issuer: "Academic Office" }
  ]
};

const copilot = {
  status: "online",
  resolutionRate: 68,
  suggestedPrompts: [
    "Show my pending academic tasks",
    "Find library books due this week",
    "How do I request a bonafide certificate?",
    "Recommend internships matching my profile"
  ],
  sampleThread: [
    {
      role: "student",
      message: "Can I renew my library book and request my grade report?"
    },
    {
      role: "assistant",
      message:
        "Yes. Your library renewal can complete instantly. Your latest semester grade report is already issued and available under verified credentials."
    }
  ]
};

const roadmap = [
  {
    phase: "Phase 1",
    title: "Unified Campus Prototype",
    status: "Complete",
    outcomes: ["Modern web experience", "Mock API", "Product docs", "Portfolio story"]
  },
  {
    phase: "Phase 2",
    title: "Operational MVP",
    status: "In Progress",
    outcomes: ["Role-based dashboards", "Workflow forms", "Admin analytics", "Credential verifier"]
  },
  {
    phase: "Phase 3",
    title: "AI and Integrations",
    status: "Next",
    outcomes: ["RAG copilot", "LMS integrations", "Payments", "SSO"]
  }
];

const aiProductStrategy = {
  thesis:
    "CampusOS-AI uses AI where it compresses high-volume student uncertainty into trusted, measurable campus outcomes.",
  targetCustomer: "Mid-market and enterprise universities with fragmented student-service operations.",
  wedge:
    "Start with AI self-service for registrar, library, dining, transport, and academic FAQs, then expand into identity, workflow automation, and admin intelligence.",
  opportunity: {
    tam: "$18B global higher-education software and services opportunity",
    sam: "$2.4B campus workflow, student success, and service management segment",
    som: "$24M reachable ARR across 80 institutions in first expansion market",
    pricingHypothesis: "$3-6 per active student per month plus implementation and analytics add-ons"
  },
  differentiators: [
    "Campus-specific RAG layer grounded in university policy and service data",
    "Closed-loop workflows instead of chatbot-only answers",
    "Credential-aware identity and verification layer",
    "Admin analytics tied to adoption, resolution quality, and operational load",
    "Responsible AI controls for accuracy, privacy, escalation, and auditability"
  ]
};

const aiUseCases = [
  {
    name: "RAG Campus Copilot",
    user: "Student",
    job: "Resolve academic and service questions without waiting for office staff.",
    dataSources: ["FAQ docs", "Registrar policies", "Library catalog", "Service tickets"],
    modelPattern: "Retrieval augmented generation with answer citations and fallback routing",
    successMetric: "Verified answer resolution rate",
    risk: "Incorrect policy answer",
    guardrail: "Citations, confidence threshold, and human handoff for high-impact queries"
  },
  {
    name: "Advisor Signal Engine",
    user: "Faculty advisor",
    job: "Identify students who need intervention before academic risk becomes severe.",
    dataSources: ["Attendance", "Credits", "GPA trend", "Pending tasks"],
    modelPattern: "Rules-first risk scoring with explainable ML roadmap",
    successMetric: "Advisor action rate",
    risk: "Unfair or opaque risk labels",
    guardrail: "Explainability, opt-out review, and bias monitoring by cohort"
  },
  {
    name: "Credential Verifier",
    user: "Registrar and external verifier",
    job: "Verify student records and certificates faster with tamper-evident status.",
    dataSources: ["Student identity", "Issued documents", "Verifier audit logs"],
    modelPattern: "Deterministic verification with AI-assisted anomaly review",
    successMetric: "Median verification time saved",
    risk: "Credential exposure",
    guardrail: "Role-based access, signed URLs, expiry windows, and audit trails"
  }
];

const experiments = [
  {
    name: "Copilot first-contact resolution",
    hypothesis:
      "If students receive cited answers plus one-click workflow actions, registrar tickets will drop by 20% in four weeks.",
    primaryMetric: "Ticket deflection with verified satisfaction",
    guardrailMetric: "Escalation accuracy",
    sample: "First-year and final-year students across registrar workflows",
    decisionRule: "Ship if deflection improves by 15% without lowering CSAT below 4.2/5"
  },
  {
    name: "Credential QR verification",
    hypothesis:
      "If certificates include secure QR verification, manual verification turnaround will drop from days to minutes.",
    primaryMetric: "Median verification completion time",
    guardrailMetric: "Unauthorized access attempts",
    sample: "Bonafide and semester-grade certificate requests",
    decisionRule: "Expand if 80% of checks complete without staff intervention"
  },
  {
    name: "Admin adoption dashboard",
    hypothesis:
      "If leaders see workflow bottlenecks by department, weekly admin engagement will increase and backlog aging will decline.",
    primaryMetric: "Weekly dashboard-active admins",
    guardrailMetric: "False-positive bottleneck alerts",
    sample: "Registrar, library, dining, and transport teams",
    decisionRule: "Prioritize if two teams change staffing or process based on insights"
  }
];

const aiEvaluation = {
  offlineEval: [
    { metric: "Answer groundedness", target: ">= 92%", method: "Compare response claims against retrieved source passages" },
    { metric: "Policy refusal accuracy", target: ">= 95%", method: "Test high-risk finance, medical, legal, and disciplinary prompts" },
    { metric: "Retrieval hit rate", target: ">= 88%", method: "Known-answer set across campus policies and service FAQs" }
  ],
  onlineEval: [
    { metric: "Resolved without staff", target: "60%", method: "Student confirms answer or completes workflow" },
    { metric: "Escalation precision", target: "85%", method: "Staff labels whether handoff was needed" },
    { metric: "Student satisfaction", target: "4.3/5", method: "Post-resolution micro-survey" }
  ],
  monitoring: [
    "Prompt and retrieval trace sampling",
    "Low-confidence escalation review",
    "Cohort-level fairness checks",
    "Policy drift detection after document updates",
    "Weekly quality review with support and registrar teams"
  ]
};

const governance = [
  {
    area: "Privacy",
    control: "PII minimization, role-based access, audit trails, and retention windows for student records."
  },
  {
    area: "Safety",
    control: "Confidence thresholds, refusal policies, and escalation for disciplinary, financial, or academic-status decisions."
  },
  {
    area: "Fairness",
    control: "Cohort-level monitoring before surfacing risk signals to advisors or administrators."
  },
  {
    area: "Reliability",
    control: "Cited answers, source freshness checks, fallback search, and human review queues."
  }
];

const launchPlan = [
  {
    stage: "Design Partner Pilot",
    timeline: "0-8 weeks",
    goal: "Validate registrar and student-service workflows with one university.",
    proof: "20% fewer manual tickets, 4.3/5 student satisfaction, weekly admin usage"
  },
  {
    stage: "Campus MVP",
    timeline: "2-4 months",
    goal: "Expand to identity, library, dining, and transport workflows.",
    proof: "Six live workflows, credential verification MVP, 60% copilot resolution"
  },
  {
    stage: "Platform Expansion",
    timeline: "4-9 months",
    goal: "Add LMS, SSO, payments, career matching, and analytics exports.",
    proof: "Multi-department adoption, repeatable onboarding, paid expansion path"
  }
];

app.get("/", (request, response) => {
  response.json({
    name: "CampusOS AI API",
    description: "Mock platform API for an AI-powered digital campus operating system.",
    status: "running",
    version: "2.0.0"
  });
});

app.get("/api/overview", (request, response) => {
  response.json({
    modules,
    metrics,
    services,
    studentProfile,
    copilot,
    roadmap,
    aiProductStrategy,
    aiUseCases,
    experiments,
    aiEvaluation,
    governance,
    launchPlan
  });
});

app.get("/api/modules", (request, response) => {
  response.json({ modules });
});

app.get("/api/metrics", (request, response) => {
  response.json(metrics);
});

app.get("/api/services", (request, response) => {
  response.json({ services });
});

app.get("/api/student-profile", (request, response) => {
  response.json({ studentProfile });
});

app.get("/api/copilot", (request, response) => {
  response.json(copilot);
});

app.get("/api/roadmap", (request, response) => {
  response.json({ roadmap });
});

app.get("/api/ai-product-strategy", (request, response) => {
  response.json({
    aiProductStrategy,
    aiUseCases,
    experiments,
    aiEvaluation,
    governance,
    launchPlan
  });
});

app.listen(port, () => {
  console.log(`CampusOS AI API running on http://localhost:${port}`);
});
