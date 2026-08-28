# CampusOS AI

**AI Product Management Case Study — AI-Native Campus Operating System for Higher Education**

CampusOS AI is an AI PM case study exploring how I would define, design, evaluate, and launch an AI-native campus operating system. It demonstrates product strategy, AI system design, evaluation frameworks, and go-to-market thinking — grounded in a working prototype with a real eval harness.

🔗 **[Live Demo →](https://abhi-iitg.github.io/campusos-ai/)**
📄 **[Product Strategy →](docs/product/AI-Product-Strategy.md)**
🧠 **[System Architecture →](docs/architecture/System-Architecture.md)**
📊 **[Eval Harness Results →](docs/product/Eval-Harness-Results.md)**

---

## Origin

CampusOS AI started as a final-year engineering project (Student Link) that digitized student records, library services, canteen workflows, and basic campus administration. Moving into product management, I revisited it through a product strategy lens. The original system solved isolated tasks. The larger opportunity was a unified digital operating system for higher education — connecting student identity, campus services, AI assistance, and administrative intelligence into a single platform.

CampusOS AI is that reframed product: designed and documented the way I'd approach it as an AI Product Manager.

---

## The Problem

University students depend on 10+ disconnected portals, offices, and manual processes for everyday campus tasks. This creates friction for students and repeated operational work for staff.

**Three compounding failures:**

**Fragmented access.** A student asking "How do I defer a course?" might visit the registrar site, academic advising portal, and their department page — and still end up emailing a human.

**Overwhelmed admin teams.** Staff receive thousands of repetitive support tickets each semester. Most could be resolved instantly if the right information surfaced at the right moment.

**No intelligence layer.** Existing campus apps don't learn, don't reason, and don't connect. Students start from zero every time they switch between systems.

**Result:** student frustration, admin burnout, and a university that looks less sophisticated than a consumer app — despite housing world-class knowledge in its documents and policies.

---

## Target Users

| Persona | Core Need | Pain |
|---|---|---|
| **Undergraduate Student** | Instant, trustworthy answers to "how do I...?" questions | Spends 20–40 min per task navigating 5+ portals |
| **Graduate Student** | Accurate policy answers with citations (visa, stipends, research) | High-stakes errors from outdated/misunderstood policies |
| **University Admin Staff** | Reduce repetitive ticket volume | ~60% of tickets are answerable from existing documents |
| **Department Head / Registrar** | Visibility into what students are asking and where systems fail | No analytics on where students get stuck |

---

## Product Solution

CampusOS AI unifies the fragmented campus experience into a single AI-native platform. The core insight: **universities aren't unintelligent — their intelligence is inaccessible.** Every policy, deadline, and procedure is documented somewhere. CampusOS AI makes that knowledge retrievable through an AI copilot that understands university-specific context and responds with citations, not hallucinations.

### Phased Scope

| Phase | Features | Goal |
|---|---|---|
| **MVP** | AI Campus Copilot — citation-based answers, confidence-gated escalation, eval harness | Registrar pilot: 90% groundedness, 80% escalation precision |
| **Phase 2** | Student Command Center, Admin Intelligence Dashboard, multi-department corpus | 30% ticket deflection across 3+ departments |
| **Phase 3** | Services Hub — course registration, housing requests, dining — all in one interface | Students complete tasks, not just get answers |
| **Phase 4** | Multi-institution deployment, shared corpus tooling, policy benchmarking | 5+ institutions; corpus quality compounds |

---

## Core Product Features

### 1. AI Campus Copilot (Citation-Based)
Students ask questions in natural language. The copilot retrieves relevant passages from official university documents and surfaces a grounded response with the source so students can verify.

**PM decision:** Citation-first UX over conversational fluency. In high-stakes situations — financial aid, visa deadlines, course withdrawal — students need to *trust* the answer, not just receive it. Showing the source builds trust and eliminates the "but the chatbot told me" escalation problem.

### 2. Confidence-Gated Escalation
When retrieval confidence is low, the copilot doesn't guess — it says "I'm not certain, here's who to contact" and routes to the appropriate office with the student's query and retrieved context attached.

**PM decision:** Escalation over hallucination is a non-negotiable product principle. A confident wrong answer in an institutional context (wrong deadline, wrong requirement) has real consequences. The system earns trust by knowing its limits.

### 3. Offline Eval Harness (Shipped)
A runnable eval harness (`eval/run-eval.mjs`) tests the copilot's response logic against a labeled dataset. It checks whether the system makes the right call — answer with citation vs. escalate vs. surface crisis resources — for each query class defined in the AI Evaluation Plan.

**PM decision:** Built evaluation into the product loop before launch, not as an afterthought. The harness tests the exact same `copilotKnowledgeBase.js` logic the UI runs — not a copy that can drift out of sync.

### 4. Admin Intelligence Dashboard (Phase 2)
Shows query volume by topic, escalation rates by department, most-queried documents, and knowledge gaps (high-volume queries with low-confidence results). Turns the copilot into a continuous audit of where university information systems are failing students.

**PM decision:** Designed the admin view as a product in its own right, not a side panel. If admin teams can see what the AI is doing and where it's failing, they become advocates for the platform — not just passive recipients of a chatbot.

### 5. Student Command Center (Phase 2)
Unified dashboard: upcoming deadlines, pending tasks, personalized alerts across registrar, housing, dining, and library. One login. One view.

---

## System Architecture

### Current Prototype

```
Student / Faculty / Admin
        │
        ▼
CampusOS AI Web App (React + Vite)
        │
        ▼
Express API (apps/api/src/server.js)
        │
        ├── Mock platform data (modules, metrics, student profile)
        ├── AI Copilot logic (copilotKnowledgeBase.js)
        └── Eval harness (eval/run-eval.mjs)
```

### Future-State Architecture

```
Student / Faculty / Admin
        │
        ▼
CampusOS AI Web + Mobile App
        │
        ▼
API Gateway
        │
        ├── Identity & Access Service
        ├── Student Profile Service
        ├── Campus Services Service
        ├── AI Copilot Service ──► Vector Retrieval → LLM → Groundedness Check
        ├── AI Evaluation Service
        ├── Analytics Service
        └── Digital Credentials Service
        │
        ▼
Data Layer (PostgreSQL + Vector Store)
```

**Key AI product decisions:**
- **Institution-specific corpus over general knowledge** — LLMs know how universities generally work. Campus Atlas needs to know how *this* university works. Retrieval over institution-specific documents is the product moat.
- **Citations are a UX requirement, not a technical nicety** — In an institutional context, "trust me" is not good enough. Every answer shows its source.
- **Confidence threshold is a product policy decision** — The right threshold is a risk tolerance decision made by the university, not a hardcoded model hyperparameter.
- **Escalation logs as training data** — Every human resolution is a labeled example for improving retrieval and generation. Designed the escalation flow to capture this systematically.

---

## Product Strategy & PM Thinking

### Problem Framing

The insight that shaped the MVP: **the problem isn't that universities lack information — it's that students can't retrieve it.** Every answer the copilot gives already exists in a policy document, registrar FAQ, or department page. The product is not content creation; it's intelligent retrieval.

### Customer Wedge

Start with the **Registrar** as the institutional buyer. They own the most-queried information, have the clearest ticket volume problem, and feel the most pain when students get wrong answers. A pilot that reduces repetitive email volume by 30% is a story that travels to other departments.

### Prioritization

| Feature | Priority | Rationale |
|---|---|---|
| AI Copilot (citation-based) | P0 | The product without this is a website |
| Confidence-gated escalation | P0 | Without this, hallucinations damage trust |
| Offline eval harness | P0 | Without this, we can't know if the product is working |
| Admin escalation queue | P1 | Needed for HITL loop and staff adoption |
| Student Command Center | P2 | Dependent on copilot trust being established first |
| Services Hub (action layer) | P3 | Requires deep API integrations with campus systems |

### GTM Strategy

**Beachhead:** Registrar + student-service support. High frequency, clear operational pain, measurable ticket reduction, strong expansion path.

**Pilot structure:** Single university, one department, 8-week pilot. Success criteria defined upfront: 20% fewer manual tickets, 4.3/5 student satisfaction.

**Expansion motion:** Registrar success → warm introduction to Housing, Financial Aid, Library. Same platform, new knowledge corpus per department.

See full GTM plan: [docs/product/GTM-Launch-Plan.md](docs/product/GTM-Launch-Plan.md)

---

## Evaluation Framework

### Why evaluation is a PM responsibility

Most AI products treat evaluation as an ML problem. In a university context, a wrong answer has real consequences — a student misses a deadline, files the wrong form, violates their visa status. The PM must own the definition of "good enough" before launch.

### Metrics

| Metric | Target | Why It Matters |
|---|---|---|
| **Groundedness Rate** | ≥ 90% | Responses must be traceable to source documents |
| **Escalation Precision** | ≥ 80% | Escalations should be genuinely ambiguous, not false negatives |
| **Ticket Deflection Rate** | ≥ 20% in 8-week pilot | Primary business outcome for institutional buyer |
| **Student Satisfaction** | ≥ 4.3 / 5.0 | Trust signal alongside deflection |
| **False Confidence Rate** | < 5% | High-confidence answers that are factually wrong |
| **Corpus Coverage** | > 85% of top-100 queries answerable | Measured before launch, tracked weekly after |

### Eval Harness (Shipped)

The harness (`eval/run-eval.mjs`) tests the copilot's response logic against `eval/eval-dataset.json` — a labeled set covering all query classes: answered with citation, escalated, crisis resource surfaced.

See results: [docs/product/Eval-Harness-Results.md](docs/product/Eval-Harness-Results.md)

### Experiment Backlog

Three experiments queued for pilot phase:
1. **Copilot First-Contact Resolution** — Hypothesis: cited answers + one-click workflow actions reduce registrar tickets 20% in 4 weeks
2. **Credential QR Verification** — Hypothesis: secure QR certificates reduce manual verification from days to minutes
3. **Admin Adoption Dashboard** — Hypothesis: bottleneck visibility drives admin weekly active usage above 60%

Full backlog: [docs/product/Experiment-Backlog.md](docs/product/Experiment-Backlog.md)

---

## Key Decisions & Tradeoffs

**Wedge: AI copilot + admin intelligence, not "digitize everything first"**
Chose the copilot as the wedge over leading with Digital Student Identity (credential verification), which has a cleaner deterministic value prop but less immediate adoption leverage.

**Scripted copilot in prototype, not a connected LLM**
The current demo uses a scripted knowledge base as a stand-in for the full RAG pipeline. This lets the eval harness test the *decision logic* (answer vs. escalate vs. crisis) without the cost and latency of a live LLM — while keeping the architecture designed for the real thing.

**Single institution pilot over broad rollout**
One department, one university, defined success criteria upfront. Avoids the trap of shipping to 10 universities and learning nothing from any of them.

Full decisions doc: [docs/product/Key-Decisions-And-Tradeoffs.md](docs/product/Key-Decisions-And-Tradeoffs.md)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite |
| Styling | CSS (custom) |
| Backend API | Express.js (Node) |
| Copilot Logic | Scripted knowledge base (stand-in for RAG pipeline) |
| Eval Harness | Node.js (`eval/run-eval.mjs`) |
| Hosting | GitHub Pages (via `.github/workflows/pages.yml`) |

---

## Repository Structure

```
campusos-ai/
├── apps/
│   ├── api/
│   │   └── src/server.js           # Express API + mock platform data
│   └── web/
│       ├── index.html
│       └── src/
│           ├── main.jsx             # React app entry
│           ├── copilotKnowledgeBase.js  # Copilot response logic + eval source
│           └── styles.css
├── docs/
│   ├── architecture/
│   │   └── System-Architecture.md
│   ├── assets/screenshots/          # Admin intelligence, command center, copilot demo
│   └── product/
│       ├── PRD.md
│       ├── AI-Product-Strategy.md
│       ├── AI-Evaluation-Plan.md
│       ├── Eval-Harness-Results.md
│       ├── Experiment-Backlog.md
│       ├── GTM-Launch-Plan.md
│       ├── Key-Decisions-And-Tradeoffs.md
│       ├── Metrics.md
│       └── Portfolio-Story.md
└── .github/workflows/pages.yml     # GitHub Pages deployment
```

---

## Run Locally

```bash
git clone https://github.com/abhi-iitg/campusos-ai.git
cd campusos-ai

# Install dependencies
npm install

# Start web app (Vite dev server)
cd apps/web && npm run dev

# Start API server
cd apps/api && node src/server.js
```

---

## About

**Abhishek Kumar Gond**
AI Product Management | Chemical Engineering @ IIT Guwahati


**Email id: mr.abhishekaaa@gmail.com**
[Portfolio]() · [LinkedIn](https://linkedin.com/in/abhishekkumargond) · [GitHub](https://github.com/abhi-iitg)

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

*CampusOS AI is an AI Product Management case study for a higher-education operating system — demonstrating how I would define, design, evaluate, and launch an AI-native product inside a real university environment.*
