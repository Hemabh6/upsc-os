# ADR-0003: Memory Architecture

- Status: Accepted
- Date: 2026-07-18

## Context

Useful mentorship requires continuity, while learner data must remain correct, controllable, and minimally disclosed. Conversation history alone is neither reliable nor sufficient for planning and personalised learning.

## Decision

Use layered memory with explicit provenance and user controls.

| Layer | Purpose | Retention and access |
| --- | --- | --- |
| Short-term memory | Current interaction and active task context | Bounded by session or task; minimise and expire automatically. |
| Long-term memory | Durable preferences, goals, verified facts, learning observations | Store source, confidence, timestamps, consent basis, correction/deletion support. |
| Knowledge Graph | Shared syllabus concepts, prerequisites, source provenance | Curated product knowledge; separate from learner-private facts. |
| Embeddings | Semantic index of eligible memory and source chunks | Derived data; refresh or delete with source record. |

## Retrieval

The Memory Engine combines deterministic filters—tenant, consent, topic, recency, and record status—with lexical and vector search. Returned records include provenance and confidence so callers can cite or discount them. Retrieval is purpose-limited: only the minimum relevant context reaches an AI request.

## Rationale

Separating personal memory from the shared knowledge graph prevents mixing private inference with curriculum facts. Explicit records are inspectable and correctable; embeddings improve recall without becoming authoritative data. A provider-agnostic retrieval interface supports future storage change.

## Future Memory Consolidation

Background consolidation may transform repeated low-level observations into bounded, evidence-linked summaries after policy checks. It preserves source links, never deletes raw evidence without a retention policy, respects corrections, and is measured against retrieval quality. Versioned records and audit history make consolidation reversible.

## Consequences

Memory writes are event-driven and policy-checked. Vector indexes are derived and eventually consistent. Learners can inspect, correct, and delete retained information. Storage migration requires validated backfill, a dual-read period where needed, and deletion-propagation verification.
