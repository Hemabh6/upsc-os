# Module Map

Each module owns its business rules and its data. Cross-module access occurs through APIs, read models, or domain events—not direct table ownership.

## Secretary

| Aspect | Definition |
| --- | --- |
| Purpose | Turn learner intent into manageable administrative actions and follow-through. |
| Responsibilities | Capture tasks, surface deadlines, coordinate agenda items, record completions, request reminders. |
| Inputs | User requests, planner commitments, calendar preferences, task events. |
| Outputs | Tasks, agenda views, reminder requests, completion events. |
| Dependencies | Authentication, Planner, Notification Service, Memory Engine. |
| Future Extensions | Calendar sync, voice capture, mentor delegation, document follow-ups. |

## Planner

| Aspect | Definition |
| --- | --- |
| Purpose | Convert goals and constraints into adaptable study plans. |
| Responsibilities | Model goals, availability, syllabus coverage, plans, and replanning decisions. |
| Inputs | Goals, availability, progress, performance signals, user edits. |
| Outputs | Daily and long-range plans, study commitments, plan-change events. |
| Dependencies | Learning Engine, Analytics, Memory Engine, Notification Service. |
| Future Extensions | Scenario planning, exam-date optimisation, mentor-reviewed plans. |

## Learning Engine

| Aspect | Definition |
| --- | --- |
| Purpose | Deliver and record purposeful learning activity. |
| Responsibilities | Manage sessions, resources, topic progress, and guided explanations. |
| Inputs | Plan items, content references, learner activity, retrieved context. |
| Outputs | Session records, progress updates, learning observations. |
| Dependencies | Planner, Memory Engine, Knowledge Graph, AI orchestration. |
| Future Extensions | Adaptive paths, multilingual teaching, source provenance scoring. |

## Examiner

| Aspect | Definition |
| --- | --- |
| Purpose | Assess knowledge and provide evidence-based feedback. |
| Responsibilities | Generate quizzes, administer attempts, score deterministic items, evaluate subjective answers with guardrails, publish feedback. |
| Inputs | Topic scope, learner level, source material, attempts, rubrics. |
| Outputs | Assessments, scores, feedback, mastery signals. |
| Dependencies | Knowledge Graph, Memory Engine, Analytics, AI orchestration. |
| Future Extensions | UPSC answer writing, calibrated rubrics, human review queues. |

## Memory Engine

| Aspect | Definition |
| --- | --- |
| Purpose | Maintain useful, consent-aware learner context across interactions. |
| Responsibilities | Store short- and long-term memories, rank relevance, manage embeddings, retrieve context, process correction and deletion. |
| Inputs | User facts, sessions, plans, assessment signals, corrections. |
| Outputs | Retrieved context, memory updates, audit events, deletion confirmations. |
| Dependencies | Database, vector retrieval, Knowledge Graph, AI orchestration. |
| Future Extensions | Consolidation, confidence decay, source conflict resolution. |

## Knowledge Graph

| Aspect | Definition |
| --- | --- |
| Purpose | Represent syllabus concepts and their pedagogical relationships. |
| Responsibilities | Maintain concepts, prerequisites, source links, mastery edges, relationship queries. |
| Inputs | Curated syllabus taxonomy, content metadata, validated learner signals. |
| Outputs | Topic graphs, prerequisite paths, scoped retrieval filters. |
| Dependencies | Database, Search, Learning Engine, Examiner. |
| Future Extensions | Graph projection, editorial tooling, curriculum version comparison. |

## Analytics

| Aspect | Definition |
| --- | --- |
| Purpose | Turn activity and outcomes into useful progress evidence. |
| Responsibilities | Aggregate events, calculate trends, expose dashboards, publish planning signals. |
| Inputs | Session, plan, assessment, notification events. |
| Outputs | Metrics, learner insights, risk signals, reporting views. |
| Dependencies | Event read models, Planner, Examiner. |
| Future Extensions | Consent-based cohorts, forecast models, experiment analysis. |

## Notification Service

| Aspect | Definition |
| --- | --- |
| Purpose | Deliver timely, preference-respecting learner communications. |
| Responsibilities | Resolve preferences, schedule delivery, deduplicate, retry, record status. |
| Inputs | Reminder requests, plan events, performance triggers, preferences. |
| Outputs | In-app, email, push, or SMS delivery events. |
| Dependencies | Secretary, Planner, Authentication, delivery providers. |
| Future Extensions | Intelligent timing, escalation policies, WhatsApp integration. |

## Authentication

| Aspect | Definition |
| --- | --- |
| Purpose | Establish identity and enforce access control. |
| Responsibilities | Authenticate users, issue sessions, map roles, manage consent, support recovery. |
| Inputs | Credentials or OIDC assertions, consent choices, access requests. |
| Outputs | Verified identity, claims, access decisions, audit records. |
| Dependencies | Identity provider, API Gateway. |
| Future Extensions | Mentor roles, institutional SSO, step-up authentication. |

## API Gateway

| Aspect | Definition |
| --- | --- |
| Purpose | Provide a stable, secure entry point for clients. |
| Responsibilities | Authenticate, validate contracts, rate-limit, route commands and queries, attach correlation. |
| Inputs | Client requests and access tokens. |
| Outputs | Versioned responses, routed commands, telemetry. |
| Dependencies | Authentication, domain modules, observability. |
| Future Extensions | BFF endpoints, API sunset policy, partner APIs. |
