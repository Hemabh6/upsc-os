# Design Principles

## Single Responsibility

Each module owns one business capability. It may coordinate internal collaborators, but it must not become a shortcut for unrelated policy or persistence.

## Loose Coupling

Modules depend on contracts, not internal data structures. Prefer domain events for completed work and explicit APIs for immediate decisions. Adapters isolate databases, providers, and transport details.

## Domain-Driven Design

The domain is UPSC preparation, not generic chat. Use a shared vocabulary—goal, plan, study session, concept, attempt, revision, mastery, and memory—and keep bounded contexts distinct even when initially deployed together.

## AI-First Architecture

AI is a first-class capability with retrieval, prompt/version control, model routing, evaluation, safety checks, and observability. Suggestions require grounded inputs and deterministic validation where possible; model output never silently overwrites learner-owned data.

## Event-Driven Communication

Publish facts such as `SessionCompleted` and `AssessmentCompleted`. Consumers are idempotent, events are versioned, and asynchronous work has retry and dead-letter handling. Events complement APIs; they do not replace governed synchronous contracts.

## Testability

Keep domain logic deterministic and injectable. Test contracts at boundaries, use fixtures for retrieval and model adapters, and evaluate AI features against representative versioned datasets before release.

## Observability

Every request and event carries correlation and learner-safe identifiers. Record structured logs, latency, errors, delivery status, retrieval provenance, model/version metadata, and quality signals without logging sensitive prompt contents by default.

## Security by Default

Enforce authentication, authorisation, validation, tenant isolation, minimal data disclosure, encryption, rate limits, and audited privileged actions by default. Features must explicitly justify broader access.

## Human Override

Learners control their plans, notifications, and retained personal context. They can edit, reject, correct, pause, or delete AI recommendations and memory; interfaces expose those controls clearly.

## Version Everything

Version public APIs, events, migrations, curriculum taxonomies, prompts, rubrics, model configurations, and analytics definitions. Retain provenance sufficient to reproduce or explain an important decision.

## Configuration over Hardcoding

Put model choices, notification policies, scoring thresholds, feature flags, and endpoints in validated configuration. Do not expose secrets or change domain invariants through runtime configuration.
