# ADR-0002: System Boundaries

- Status: Accepted
- Date: 2026-07-18

## Decision

Lakshya Core separates presentation, domain, intelligence, knowledge, identity, and infrastructure responsibilities. Modules may share deployment during v1, but must not share ownership ambiguously.

| Boundary | Owns | Does not own |
| --- | --- | --- |
| Frontend | Interaction, local presentation state, accessibility | Domain policy, credentials, authoritative learner records |
| Backend | Domain commands, queries, transactions, event publication | Provider-specific logic in business rules |
| AI Layer | Retrieval orchestration, prompt/model configuration, evaluation, provider adapters | Identity decisions or unvalidated authoritative scores |
| Memory Layer | Learner context, provenance, retrieval policy, correction/deletion | Curriculum taxonomy ownership |
| Knowledge Graph | Concepts, prerequisites, source metadata | Personal memory and raw activity events |
| External Integrations | Delivery and content-provider adapters | Core domain rules |
| Authentication | Identity, sessions, roles, consent claims | Product policy beyond issued claims |
| Infrastructure | Compute, storage, queues, secrets, telemetry | Business decisions |

## Rationale

The boundaries keep educational policy portable and testable while isolating volatile concerns such as model providers, identity vendors, and hosting. They make data access and responsibility visible for security review.

## Consequences

All cross-boundary communication uses versioned contracts. The API Gateway is the client entry point. Backend modules enforce domain authorisation even after gateway authentication. Infrastructure adapters may be replaced without changing domain code.
