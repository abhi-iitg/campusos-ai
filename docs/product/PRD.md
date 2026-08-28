# Product Requirements Document — CampusOS AI

## 1. Summary

CampusOS AI is an AI-native campus operating system case study exploring how universities can unify student services, digital identity, academic workflows, and AI assistance into one measurable product layer.

The MVP focuses on high-frequency student workflows: finding campus resources, understanding academic status, completing service requests, accessing credentials, and giving administrators visibility into adoption and support load.

## 2. Problem Statement

University students often depend on disconnected portals, offices, and manual processes for everyday campus workflows. This creates friction for students and repeated operational work for staff.

Key problems:

- Students do not know where to find the right campus resource.
- Academic, service, identity, and career workflows are fragmented.
- Students miss tasks and deadlines because information is spread across systems.
- Administrators lack a unified view of demand, service completion, and bottlenecks.
- AI assistants can help, but only if answers are grounded, auditable, and safely escalated.

## 3. Target Users

| User | Need |
|---|---|
| Student | Complete campus workflows quickly from one place |
| Faculty / advisor | Understand student context before support conversations |
| Administrator | Reduce repetitive requests and monitor service performance |
| Campus operations team | Coordinate service queues across departments |
| University IT | Maintain secure, scalable integrations and access controls |

## 4. Jobs To Be Done

### Student

When I need help with campus services, I want one trusted place to find answers and complete tasks, so I do not have to search multiple portals or visit offices manually.

### Administrator

When student-service demand increases, I want visibility into common requests and workflow completion, so I can reduce manual work and improve service quality.

### Faculty / Advisor

When advising a student, I want a consolidated view of academic progress and risk signals, so I can provide timely and relevant support.

### University IT

When AI is introduced into campus workflows, I want clear access controls, auditability, and escalation logic, so student data and institutional policy remain protected.

## 5. Goals

- Provide one student command center for identity, academic progress, tasks, services, and credentials.
- Demonstrate a RAG-based campus copilot concept with citations, confidence thresholds, and handoff.
- Give administrators visibility into workflow adoption, completion, and bottlenecks.
- Define measurable AI quality gates and responsible AI controls.
- Show a credible MVP path through experiments, roadmap, and GTM planning.

## 6. Non-Goals

- Replace official university systems of record in the prototype.
- Make production academic, financial, disciplinary, or eligibility decisions with AI.
- Build a real payment system, SIS integration, LMS integration, or identity provider in the current version.
- Claim that Campus Atlas is a first-of-its-kind product category.
- Store real student data.

## 7. MVP Scope

### In Scope

- Student command center
- Campus Copilot preview
- Campus services hub
- Admin intelligence dashboard
- AI PM operating room
- Mock Express API
- Product screenshots
- Customer discovery synthesis
- User journeys
- PRD, metrics, experiment backlog, AI evaluation plan, GTM plan, roadmap, and architecture docs

### Out Of Scope

- Production authentication
- Real LLM API integration
- Real vector database
- Real university integrations
- Real payment processing
- Mobile app
- Production credential verification

## 8. User Stories

### Student Command Center

- As a student, I want to see my academic profile, tasks, credits, attendance, and credentials in one place.
- As a student, I want to know which campus tasks need attention first.
- As a student, I want to access common campus services without searching multiple portals.

### Campus Copilot

- As a student, I want to ask campus questions in natural language.
- As a student, I want answers to be grounded in official sources.
- As a student, I want the assistant to route me to a human when the request is sensitive or uncertain.

### Campus Services

- As a student, I want to renew library items, request documents, order dining, or apply for transport from one service hub.
- As an administrator, I want to see which services are live, in beta, and used most often.

### Admin Intelligence

- As an administrator, I want to see module adoption and workflow health.
- As a campus leader, I want to understand where AI is reducing manual work.
- As an operations team, I want evidence that service completion is improving.

### AI Product Governance

- As a university IT stakeholder, I want role-based access and audit trails.
- As a PM, I want AI evaluation metrics before expanding the copilot.
- As an administrator, I want low-confidence AI cases to escalate to staff.

## 9. Success Metrics

### North Star Metric

Weekly active students completing meaningful campus workflows.

### Product Metrics

| Metric | Target / direction |
|---|---|
| Workflow completion rate | Increase |
| Average time to complete service request | Decrease |
| Manual ticket volume | Decrease |
| Student satisfaction | Increase |
| Admin dashboard weekly active users | Increase |
| Credential verification time | Decrease |

### AI Metrics

| Metric | Target |
|---|---:|
| Answer groundedness | >= 92% |
| Hallucination rate | <= 3% |
| Retrieval hit rate | >= 88% |
| Citation accuracy | >= 90% |
| Escalation precision | >= 85% |
| Student satisfaction after AI help | >= 4.3/5 |

## 10. Risks And Mitigations

| Risk | Mitigation |
|---|---|
| AI gives incorrect policy guidance | Require citations, confidence thresholds, and escalation |
| Sensitive student data is exposed | Role-based access, PII minimization, audit trails |
| Product feels like a generic chatbot | Focus on closed-loop workflows and admin metrics |
| Admin users do not trust AI | Keep staff handoff, trace review, and quality dashboards |
| Scope becomes too broad | Keep MVP focused on student command center, services, copilot, and admin intelligence |
| Market category already has competitors | Position as PM case study and emphasize differentiated product thinking |

## 11. Dependencies

- Campus policy and FAQ content
- Student profile and academic record data
- Service workflow data
- Identity and access controls
- Human escalation process
- AI evaluation dataset
- Admin dashboard adoption tracking

## 12. Launch Plan

### Phase 1: Portfolio Prototype

- Build working web prototype
- Document PM artifacts
- Add screenshots and live demo
- Validate with informal discovery

### Phase 2: Design Partner MVP

- Pilot registrar and service workflows with one institution
- Add grounded RAG copilot
- Track ticket deflection and workflow completion

### Phase 3: Platform Expansion

- Add LMS, SIS, SSO, payments, and credential verification
- Expand admin analytics and department benchmarking
- Build repeatable GTM and onboarding playbook

## 13. Open Questions

- Which campus workflow should be the first live design-partner pilot?
- What level of citation detail would students and administrators trust?
- Which staff team owns escalation review?
- What data can be safely retrieved for personalized answers?
- How should AI quality be reported to university leadership?

