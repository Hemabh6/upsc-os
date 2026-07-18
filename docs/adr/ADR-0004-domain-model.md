# ADR-0004: Domain Model and Event Contracts

- Status: Accepted
- Date: 2026-07-18

## Context

Lakshya Core coordinates planning, study activity, assessment, memory, revision, and analytics. Without a common model, modules would exchange ambiguous terms such as “progress” and “task,” creating coupled storage and AI outputs that cannot be explained or corrected.

## Decision

Adopt the bounded contexts, aggregates, value objects, glossary, and versioned event contracts in [Domain Model v1](../domain-model.md) and [Domain Events v1](../domain-events.md). Start as a modular monolith, but preserve context ownership and event boundaries from the first implementation.

## Rationale

The model separates learner-private context from shared curriculum knowledge, planned work from observed work, and submitted answers from their evaluation. This improves pedagogical integrity, auditability, privacy, and future extractability without introducing distributed-system complexity prematurely.

## Consequences

- No module directly writes an aggregate owned by another context.
- Every AI-derived evaluation, insight, and memory record carries provenance.
- New concepts use the glossary before entering APIs, persistence, prompts, or events.
- Event producers and consumers follow compatibility and idempotency rules.
- Implementation schemas may optimise storage, but cannot redefine domain ownership.
