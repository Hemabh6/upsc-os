# ADR-0006: Policy-Gated, Event-Driven Memory Writes

- Status: Accepted
- Date: 2026-07-18

## Context

ADR-0003 fixed the layered memory model: short-term context, durable records, the shared Knowledge Graph, and derived embeddings. It left open how records come into existence. Two convenient options are dangerous at scale: letting any module write learner memory directly, and letting an LLM summarise conversations straight into long-term storage. Both erode provenance, consent enforcement, and the learner's ability to trust what the system believes about them.

## Decision

Memory records are created only by the Memory Engine, only in response to domain events or explicit learner statements, and only after a policy gate validates consent basis, purpose limitation, duplication, and minimum evidence. Records enter as candidates and become retrievable solely through gate approval. Model-assisted interpretation may draft candidate content but can never activate a record.

## Rationale

Event-driven writes give every record a traceable trigger and keep producers ignorant of memory internals. The candidate/active split makes the gate an enforcement point rather than a convention, mirroring the editorial gate that protects the Knowledge Graph (ADR-0005). Confining model output to candidate drafts keeps AI useful for interpretation while keeping activation deterministic and auditable.

## Consequences

- Memory quality is governed in one place; tightening policy does not require changes in producing modules.
- Every retrievable record can answer: which event created you, under which consent, for which purposes.
- Candidate rejection rates become an observable quality signal instead of silent data loss.
- Synchronous "remember this" requests still flow through the same gate, so learner statements gain provenance too.
- The gate adds latency to memory formation; this is acceptable because retrieval, not writing, is the hot path.
