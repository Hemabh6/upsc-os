# ADR-0001: Project Vision

- Status: Accepted
- Date: 2026-07-18

## Context

UPSC preparation is long-running, multi-subject, and dependent on feedback, consistency, revision, and changing learner circumstances. Standalone notes, calendars, quiz tools, and generic chat do not maintain a coherent view of preparation.

## Decision

Lakshya Core will be an AI operating system for an aspirant: one product that plans work, supports learning, assesses performance, retains useful context, and coordinates follow-through. It uses an AI-native architecture in which retrieval, model orchestration, evaluation, and memory are explicit platform capabilities rather than scattered UI features.

## Rationale

AI can personalise instruction and reduce administrative load only when it receives trustworthy context and operates inside product rules. Explicit AI architecture permits model replacement, task-specific quality checks, provenance, safety controls, and human correction. A long-lived learner relationship makes durable memory and explainability essential.

## Consequences

- V1 invests in domain boundaries, event contracts, memory controls, and observability before feature breadth.
- AI features are evaluated and grounded; they are not opaque chatbot wrappers.
- The architecture supports future specialist agents without coupling the product to one model or provider.

## Long-Term Extensibility

Stable module contracts allow delivery surfaces, mentor workflows, languages, content sources, and providers to evolve independently. Versioned schemas and memory migrations preserve continuity as learner data and capabilities grow.
