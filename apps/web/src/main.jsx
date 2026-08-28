import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AlertTriangle,
  BadgeCheck,
  BarChart3,
  Bell,
  BookOpen,
  BookOpenCheck,
  Bot,
  Brain,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Compass,
  CreditCard,
  FlaskConical,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  Library,
  MessageSquareText,
  MonitorCheck,
  Radar,
  RefreshCw,
  Rocket,
  Scale,
  Search,
  Send,
  Sparkles,
  Target,
  User,
  Utensils,
  WalletCards
} from "lucide-react";
import "./styles.css";
import {
  COPILOT_SUGGESTED_PROMPTS,
  copilotTicketId,
  matchCopilotResponse
} from "./copilotKnowledgeBase.js";

const isLocalHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
const API_URL = isLocalHost ? `${window.location.protocol}//${window.location.hostname}:4000/api/overview` : null;

const iconMap = {
  "ai-campus-copilot": Brain,
  "digital-student-identity": BadgeCheck,
  "academic-intelligence": GraduationCap,
  "campus-services-hub": Library,
  "admin-intelligence": LayoutDashboard,
  "career-research-hub": BriefcaseBusiness
};

const fallbackOverview = {
  modules: [
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
  ],
  metrics: {
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
    ]
  },
  services: [
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
  ],
  studentProfile: {
    id: "COS-2026-1042",
    name: "Abhishek Kumar Gond",
    program: "B.Tech Chemical Engineering",
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
      { name: "Digital Student ID", status: "Verified", issuer: "CampusOS AI Identity" },
      { name: "Semester Grade Report", status: "Issued", issuer: "Registrar" },
      { name: "Bonafide Certificate", status: "Ready", issuer: "Academic Office" }
    ]
  },
  copilot: {
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
  },
  roadmap: [
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
  ],
  aiProductStrategy: {
    thesis:
      "CampusOS AI uses AI where it compresses high-volume student uncertainty into trusted, measurable campus outcomes.",
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
  },
  aiUseCases: [
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
  ],
  experiments: [
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
    }
  ],
  aiEvaluation: {
    offlineEval: [
      { metric: "Answer groundedness", target: ">= 92%", method: "Compare response claims against retrieved source passages" },
      { metric: "Policy refusal accuracy", target: ">= 95%", method: "Test high-risk campus decision prompts" },
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
      "Policy drift detection after document updates"
    ]
  },
  governance: [
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
    }
  ],
  launchPlan: [
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
  ]
};

const navItems = [
  { id: "command", label: "Command", icon: MonitorCheck },
  { id: "ai-pm", label: "AI PM", icon: Target },
  { id: "student", label: "Student", icon: GraduationCap },
  { id: "services", label: "Services", icon: Building2 },
  { id: "copilot-demo", label: "Copilot Demo", icon: MessageSquareText },
  { id: "admin", label: "Admin", icon: BarChart3 },
  { id: "roadmap", label: "Roadmap", icon: ClipboardList }
];

// The Copilot demo's knowledge base, matching logic, and suggested prompts
// live in ./copilotKnowledgeBase.js so the eval harness (eval/run-eval.mjs)
// tests the exact same logic this UI runs. See that file and
// docs/product/Eval-Harness-Results.md for details.

// Maturity stages map to a 4-step delivery pipeline so non-technical
// reviewers can scan module progress at a glance.
const MATURITY_STAGE = {
  Roadmap: 1,
  Concept: 2,
  Prototype: 3,
  MVP: 4,
  Live: 4
};

const quickActions = [
  { label: "Verify credential", icon: BadgeCheck, tone: "mint" },
  { label: "Ask Copilot", icon: MessageSquareText, tone: "blue" },
  { label: "Pay campus dues", icon: CreditCard, tone: "gold" },
  { label: "Open service desk", icon: CircleHelp, tone: "coral" }
];

const serviceIcons = {
  Library,
  Dining: Utensils,
  Registrar: WalletCards,
  Transport: Building2
};

function useOverview() {
  const [overview, setOverview] = useState(fallbackOverview);
  const [apiStatus, setApiStatus] = useState("checking");

  useEffect(() => {
    let cancelled = false;

    async function loadOverview() {
      if (!API_URL) {
        setApiStatus("offline");
        return;
      }

      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();

        if (!cancelled) {
          setOverview(data);
          setApiStatus("connected");
        }
      } catch (error) {
        if (!cancelled) {
          setOverview(fallbackOverview);
          setApiStatus("offline");
        }
      }
    }

    loadOverview();

    return () => {
      cancelled = true;
    };
  }, []);

  return { overview, apiStatus };
}

function App() {
  const { overview, apiStatus } = useOverview();
  const [activeView, setActiveView] = useState("command");
  const [query, setQuery] = useState("");

  const filteredModules = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return overview.modules;
    }

    return overview.modules.filter((module) =>
      [module.name, module.owner, module.maturity, module.kpi]
        .join(" ")
        .toLowerCase()
        .includes(search)
    );
  }, [overview.modules, query]);

  return (
    <main className="appShell">
      <aside className="sidebar" aria-label="CampusOS AI navigation">
        <div className="brandLockup">
          <div className="brandMark">
            <Compass size={24} />
          </div>
          <div>
            <strong>CampusOS AI</strong>
            <span>Campus operating layer</span>
          </div>
        </div>

        <nav className="navStack">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={activeView === item.id ? "navItem active" : "navItem"}
                key={item.id}
                onClick={() => setActiveView(item.id)}
                type="button"
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebarFooter">
          <span className={`statusDot ${apiStatus}`} />
          <div>
            <strong>{apiStatus === "connected" ? "API connected" : "Demo data active"}</strong>
            <span>{apiStatus === "connected" ? "Local API" : "Hosted portfolio demo"}</span>
          </div>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="searchBox">
            <Search size={18} />
            <input
              aria-label="Search modules"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search modules, owners, KPIs"
              value={query}
            />
          </div>

          <div className="topbarActions">
            <button className="iconButton" title="Refresh data" type="button">
              <RefreshCw size={18} />
            </button>
            <button className="iconButton" title="Notifications" type="button">
              <Bell size={18} />
            </button>
            <div className="profileChip">
              <span>AR</span>
              <div>
                <strong>{overview.studentProfile.name}</strong>
                <small>{overview.studentProfile.program}</small>
              </div>
            </div>
          </div>
        </header>

        {activeView === "command" && (
          <>
            <section className="heroPanel" id="command">
              <div className="heroCopy">
                <div className="eyebrow">
                  <Sparkles size={16} />
                  AI-powered smart campus OS
                </div>
                <h1>Run student identity, academics, services, and campus intelligence in one place.</h1>
                <p>
                  CampusOS AI converts a final-year smart campus idea into a product-grade operating system
                  for universities, with student workflows, service operations, admin analytics, and a
                  future-ready AI copilot layer.
                </p>
                <div className="heroActions">
                  <button onClick={() => setActiveView("student")} type="button">
                    Open Student Command Center
                    <ChevronRight size={17} />
                  </button>
                  <button className="secondaryAction" onClick={() => setActiveView("copilot-demo")} type="button">
                    Try the AI Copilot Demo
                  </button>
                  <button className="secondaryAction" onClick={() => setActiveView("admin")} type="button">
                    View Admin Intelligence
                  </button>
                  <button className="secondaryAction" onClick={() => setActiveView("ai-pm")} type="button">
                    See AI PM Strategy
                  </button>
                </div>
              </div>

              <div className="campusMap" aria-label="CampusOS AI workflow map">
                <div className="mapHeader">
                  <span>Live Workflow Map</span>
                  <strong>CampusOS AI 2.0</strong>
                </div>
                <div className="mapGrid">
                  <span className="mapNode identity">Identity</span>
                  <span className="mapNode academics">Academics</span>
                  <span className="mapNode services">Services</span>
                  <span className="mapNode ai">Copilot</span>
                  <span className="mapNode admin">Admin</span>
                  <span className="mapNode pm">AI PM</span>
                </div>
              </div>
            </section>

            <section className="scoreGrid" aria-label="CampusOS AI scorecards">
              {overview.metrics.scorecards.map((metric) => (
                <article className="scoreCard" key={metric.label}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                  <small>{metric.trend} vs last month</small>
                </article>
              ))}
            </section>

            <section className="viewSection">
              <SectionHeader
                eyebrow="Platform Modules"
                title="Six connected product layers"
                copy="Each module has a clear owner, KPI, maturity state, and next build milestone."
              />
              <div className="moduleGrid">
                {filteredModules.map((module) => (
                  <ModuleCard key={module.id} module={module} />
                ))}
              </div>
            </section>
          </>
        )}

        {activeView === "ai-pm" && (
          <section className="viewSection highlighted" id="ai-pm">
            <SectionHeader
              eyebrow="AI Product Manager Showcase"
              title="Strategy, AI architecture, experiments, evals, and launch"
              copy="This layer demonstrates product judgment: where AI belongs, how quality is measured, what risks are controlled, and how the product reaches market."
            />

            <div className="strategyGrid">
              <article className="strategyHero">
                <div className="panelLabel">
                  <Target size={18} />
                  Product thesis
                </div>
                <h3>{overview.aiProductStrategy.thesis}</h3>
                <p>{overview.aiProductStrategy.wedge}</p>
                <div className="strategyMeta">
                  <span>Target customer</span>
                  <strong>{overview.aiProductStrategy.targetCustomer}</strong>
                </div>
              </article>

              <div className="opportunityStack">
                {Object.entries(overview.aiProductStrategy.opportunity).map(([key, value]) => (
                  <article className="opportunityCard" key={key}>
                    <span>{key.replace(/([A-Z])/g, " $1")}</span>
                    <strong>{value}</strong>
                  </article>
                ))}
              </div>
            </div>

            <div className="pmArtifactGrid">
              <article className="artifactPanel">
                <div className="panelLabel">
                  <Brain size={18} />
                  AI use-case canvas
                </div>
                <div className="useCaseStack">
                  {overview.aiUseCases.map((useCase) => (
                    <UseCaseCard key={useCase.name} useCase={useCase} />
                  ))}
                </div>
              </article>

              <article className="artifactPanel">
                <div className="panelLabel">
                  <FlaskConical size={18} />
                  Experiment backlog
                </div>
                <div className="experimentStack">
                  {overview.experiments.map((experiment) => (
                    <ExperimentCard key={experiment.name} experiment={experiment} />
                  ))}
                </div>
              </article>
            </div>

            <div className="pmArtifactGrid">
              <article className="artifactPanel">
                <div className="panelLabel">
                  <Radar size={18} />
                  AI evaluation system
                </div>
                <EvalTable title="Offline quality gates" rows={overview.aiEvaluation.offlineEval} />
                <EvalTable title="Online product gates" rows={overview.aiEvaluation.onlineEval} />
              </article>

              <article className="artifactPanel">
                <div className="panelLabel">
                  <Scale size={18} />
                  Responsible AI controls
                </div>
                <div className="governanceGrid">
                  {overview.governance.map((item) => (
                    <div className="governanceCard" key={item.area}>
                      <strong>{item.area}</strong>
                      <p>{item.control}</p>
                    </div>
                  ))}
                </div>
                <div className="monitoringBox">
                  <strong>Monitoring loop</strong>
                  <ul>
                    {overview.aiEvaluation.monitoring.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>

            <div className="launchStrip">
              <div className="panelLabel">
                <Rocket size={18} />
                GTM and launch plan
              </div>
              <div className="launchGrid">
                {overview.launchPlan.map((stage) => (
                  <article className="launchCard" key={stage.stage}>
                    <span>{stage.timeline}</span>
                    <h3>{stage.stage}</h3>
                    <p>{stage.goal}</p>
                    <strong>{stage.proof}</strong>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeView === "student" && (
          <section className="viewSection highlighted" id="student">
          <SectionHeader
            eyebrow="Student Command Center"
            title="Identity, progress, tasks, and credentials"
            copy="A single student workspace for academic visibility and everyday campus actions."
          />
          <div className="studentGrid">
            <StudentProfile profile={overview.studentProfile} />
            <CopilotPanel copilot={overview.copilot} />
          </div>
        </section>
        )}

        {activeView === "services" && (
          <section className="viewSection highlighted" id="services">
          <SectionHeader
            eyebrow="Campus Services Hub"
            title="Operational workflows students can complete"
            copy="Library, dining, registrar, transport, and service desk flows are modeled as measurable product workflows."
          />
          <div className="quickActions">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button className={`actionTile ${action.tone}`} key={action.label} type="button">
                  <Icon size={20} />
                  <span>{action.label}</span>
                </button>
              );
            })}
          </div>
          <div className="serviceTable">
            {overview.services.map((service) => (
              <ServiceRow key={service.id} service={service} />
            ))}
          </div>
        </section>
        )}

        {activeView === "copilot-demo" && (
          <section className="viewSection highlighted" id="copilot-demo">
            <SectionHeader
              eyebrow="AI Campus Copilot - Interactive Demo"
              title="See the Copilot's UX contract in action"
              copy="A scripted demo, not a connected LLM - it shows the product decisions that matter for a campus AI assistant: source citations on confident answers, and visible escalation to a human department when confidence is low."
            />
            <CopilotDemo />
          </section>
        )}

        {activeView === "admin" && (
          <section className="viewSection highlighted" id="admin">
          <SectionHeader
            eyebrow="Admin Intelligence"
            title="Adoption and workflow health"
            copy={overview.metrics.northStarMetric}
          />
          <div className="analyticsGrid">
            <div className="analyticsPanel">
              <div className="panelLabel">
                <BarChart3 size={18} />
                Module adoption
              </div>
              <div className="barStack">
                {overview.metrics.adoption.map((item) => (
                  <div className="barRow" key={item.segment}>
                    <span>{item.segment}</span>
                    <div className="barTrack">
                      <div style={{ width: `${item.completionRate}%` }} />
                    </div>
                    <strong>{item.completionRate}%</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="analyticsPanel">
              <div className="panelLabel">
                <BookOpenCheck size={18} />
                Leadership readout
              </div>
              <ul className="insightList">
                <li>Identity and services are ready for MVP workflow demos.</li>
                <li>Copilot resolution is strong enough for a RAG prototype milestone.</li>
                <li>Career matching is the clearest Phase 3 portfolio extension.</li>
              </ul>
            </div>
          </div>

          <MaturityPipeline modules={overview.modules} northStar={overview.metrics.northStarMetric} />
        </section>
        )}

        {activeView === "roadmap" && (
          <section className="viewSection highlighted" id="roadmap">
          <SectionHeader
            eyebrow="Execution Roadmap"
            title="From portfolio prototype to scalable platform"
            copy="The roadmap links product strategy, engineering milestones, and future integrations."
          />
          <div className="roadmapGrid">
            {overview.roadmap.map((item) => (
              <article className="roadmapCard" key={item.phase}>
                <span>{item.phase}</span>
                <h3>{item.title}</h3>
                <strong>{item.status}</strong>
                <ul>
                  {item.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
        )}
      </section>
    </main>
  );
}

function SectionHeader({ eyebrow, title, copy }) {
  return (
    <div className="sectionHeader">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

function ModuleCard({ module }) {
  const Icon = iconMap[module.id] || LayoutDashboard;

  return (
    <article className="moduleCard">
      <div className="moduleTopline">
        <div className="moduleIcon">
          <Icon size={23} />
        </div>
        <span>{module.maturity}</span>
      </div>
      <h3>{module.name}</h3>
      <p>{module.summary}</p>
      <div className="healthRow">
        <span>Health</span>
        <div className="healthTrack">
          <div style={{ width: `${module.health}%` }} />
        </div>
        <strong>{module.health}</strong>
      </div>
      <dl>
        <div>
          <dt>Owner</dt>
          <dd>{module.owner}</dd>
        </div>
        <div>
          <dt>KPI</dt>
          <dd>{module.kpi}</dd>
        </div>
      </dl>
      <small>{module.nextMilestone}</small>
    </article>
  );
}

function StudentProfile({ profile }) {
  const creditProgress = Math.round((profile.creditsCompleted / profile.creditsRequired) * 100);

  return (
    <article className="studentPanel">
      <div className="studentIdentity">
        <div className="studentAvatar">AR</div>
        <div>
          <h3>{profile.name}</h3>
          <p>{profile.id}</p>
        </div>
      </div>

      <div className="academicStats">
        <Stat label="Program" value={profile.program} />
        <Stat label="Semester" value={profile.semester} />
        <Stat label="GPA" value={profile.gpa} />
        <Stat label="Attendance" value={`${profile.attendance}%`} />
      </div>

      <div className="progressBlock">
        <div>
          <span>Degree progress</span>
          <strong>{creditProgress}%</strong>
        </div>
        <div className="progressTrack">
          <div style={{ width: `${creditProgress}%` }} />
        </div>
        <small>
          {profile.creditsCompleted} of {profile.creditsRequired} credits completed
        </small>
      </div>

      <div className="taskList">
        <h4>Priority tasks</h4>
        {profile.pendingTasks.map((task) => (
          <div className="taskItem" key={task}>
            <CheckCircle2 size={17} />
            <span>{task}</span>
          </div>
        ))}
      </div>

      <div className="credentialList">
        <h4>Verified credentials</h4>
        {profile.credentials.map((credential) => (
          <div className="credentialItem" key={credential.name}>
            <BadgeCheck size={17} />
            <div>
              <strong>{credential.name}</strong>
              <span>
                {credential.status} by {credential.issuer}
              </span>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function CopilotPanel({ copilot }) {
  return (
    <article className="copilotPanel">
      <div className="panelLabel">
        <Brain size={18} />
        Campus Copilot
      </div>
      <div className="copilotStatus">
        <strong>{copilot.resolutionRate}%</strong>
        <span>self-service resolution target</span>
      </div>
      <div className="chatThread">
        {copilot.sampleThread.map((message) => (
          <div className={`chatBubble ${message.role}`} key={`${message.role}-${message.message}`}>
            {message.message}
          </div>
        ))}
      </div>
      <div className="promptGrid">
        {copilot.suggestedPrompts.map((prompt) => (
          <button key={prompt} type="button">
            {prompt}
          </button>
        ))}
      </div>
    </article>
  );
}

function ServiceRow({ service }) {
  const Icon = serviceIcons[service.category] || Building2;

  return (
    <article className="serviceRow">
      <div className="serviceMain">
        <div className="serviceIcon">
          <Icon size={19} />
        </div>
        <div>
          <h3>{service.title}</h3>
          <span>
            {service.category} - {service.owner}
          </span>
        </div>
      </div>
      <div className="serviceMeta">
        <span className={service.status === "Live" ? "livePill" : "betaPill"}>{service.status}</span>
        <strong>{service.eta}</strong>
        <small>{service.volume.toLocaleString()} monthly uses</small>
      </div>
    </article>
  );
}

function MaturityPipeline({ modules, northStar }) {
  return (
    <div className="analyticsPanel maturityPanel fullSpan">
      <div className="panelLabel">
        <ClipboardList size={18} />
        Module maturity pipeline
      </div>
      {northStar && (
        <div className="northStar">
          <Target size={18} />
          <div>
            <span className="northStarLabel">North Star Metric</span>
            <strong>{northStar}</strong>
          </div>
        </div>
      )}
      <div className="dashboardGrid">
        {modules.map((module) => {
          const stage = MATURITY_STAGE[module.maturity] ?? 1;
          return (
            <article className="dashboardCard" key={module.id}>
              <div className="dashboardCardHeader">
                <h3>{module.name}</h3>
                <span className={`maturityPill maturity-${module.maturity.toLowerCase()}`}>
                  {module.maturity}
                </span>
              </div>
              <p className="dashboardOwner">Owner: {module.owner}</p>
              <div className="progressTrack">
                <div style={{ width: `${(stage / 4) * 100}%` }} />
              </div>
              <p className="dashboardKpi">KPI: {module.kpi}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function CopilotDemo() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      answer:
        "Hi, I'm the CampusOS AI Copilot demo. Ask about library fines, financial aid, IDs, or course drops - or try your own question to see how I handle uncertainty.",
      source: null,
      confidence: null
    }
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef(null);

  function ask(query) {
    const trimmed = query.trim();
    if (!trimmed || isThinking) return;

    setMessages((prev) => [...prev, { role: "user", answer: trimmed }]);
    setInput("");
    setIsThinking(true);

    window.setTimeout(() => {
      const match = matchCopilotResponse(trimmed);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          answer: match.answer,
          source: match.source,
          confidence: match.confidence,
          escalateTo: match.escalateTo,
          crisisResource: match.crisisResource,
          ticket: match.escalateTo ? copilotTicketId() : null
        }
      ]);
      setIsThinking(false);
      window.requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      });
    }, 600);
  }

  return (
    <div className="copilotShell">
      <div className="copilotThread" ref={scrollRef}>
        {messages.map((message, index) => (
          <div className={`bubbleRow ${message.role}`} key={index}>
            <div className="avatar">
              {message.role === "assistant" ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className="bubble">
              <p>{message.answer}</p>
              {message.source && (
                <span className="citationChip">
                  <BookOpen size={12} /> Source: {message.source}
                </span>
              )}
              {message.crisisResource && (
                <span className="crisisChip">
                  <HeartPulse size={12} /> {message.crisisResource}
                </span>
              )}
              {message.escalateTo && (
                <span className="escalationChip">
                  <AlertTriangle size={12} /> {message.confidence}% confidence - escalated to{" "}
                  {message.escalateTo} ({message.ticket})
                </span>
              )}
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="bubbleRow assistant">
            <div className="avatar">
              <Bot size={16} />
            </div>
            <div className="bubble thinking">
              <Sparkles size={14} /> Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="suggestedPrompts">
        {COPILOT_SUGGESTED_PROMPTS.map((prompt) => (
          <button key={prompt} type="button" onClick={() => ask(prompt)} disabled={isThinking}>
            {prompt}
          </button>
        ))}
      </div>

      <form
        className="copilotInput"
        onSubmit={(event) => {
          event.preventDefault();
          ask(input);
        }}
      >
        <input
          type="text"
          placeholder="Ask about a campus service, deadline, or policy..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          disabled={isThinking}
        />
        <button type="submit" disabled={isThinking || !input.trim()} aria-label="Send">
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}

function UseCaseCard({ useCase }) {
  return (
    <article className="useCaseCard">
      <div>
        <span>{useCase.user}</span>
        <h3>{useCase.name}</h3>
      </div>
      <p>{useCase.job}</p>
      <dl>
        <div>
          <dt>Model pattern</dt>
          <dd>{useCase.modelPattern}</dd>
        </div>
        <div>
          <dt>Success metric</dt>
          <dd>{useCase.successMetric}</dd>
        </div>
        <div>
          <dt>Primary risk</dt>
          <dd>{useCase.risk}</dd>
        </div>
        <div>
          <dt>Guardrail</dt>
          <dd>{useCase.guardrail}</dd>
        </div>
      </dl>
      <div className="sourceTags">
        {useCase.dataSources.map((source) => (
          <span key={source}>{source}</span>
        ))}
      </div>
    </article>
  );
}

function ExperimentCard({ experiment }) {
  return (
    <article className="experimentCard">
      <h3>{experiment.name}</h3>
      <p>{experiment.hypothesis}</p>
      <div className="experimentFacts">
        <Stat label="Primary" value={experiment.primaryMetric} />
        <Stat label="Guardrail" value={experiment.guardrailMetric} />
        <Stat label="Sample" value={experiment.sample} />
        <Stat label="Decision" value={experiment.decisionRule} />
      </div>
    </article>
  );
}

function EvalTable({ title, rows }) {
  return (
    <div className="evalTable">
      <h3>{title}</h3>
      {rows.map((row) => (
        <div className="evalRow" key={row.metric}>
          <strong>{row.metric}</strong>
          <span>{row.target}</span>
          <p>{row.method}</p>
        </div>
      ))}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="statBox">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
