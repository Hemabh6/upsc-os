# ADR-0005: Curated, Versioned Knowledge Graph

- Status: Accepted
- Date: 2026-07-18

## Context

UPSC preparation spans overlapping papers, current affairs, foundational concepts, and answer-writing connections. Flat tags cannot reliably express prerequisites, comparisons, or a concept's position in a changing syllabus. At the same time, a graph generated directly from model output would amplify errors throughout planning and evaluation.

## Decision

Maintain a curated, versioned Knowledge Graph as the authoritative representation of shared syllabus concepts and their typed relationships. Model-assisted extraction may create drafts, but only validated editorial change sets publish graph facts. The graph starts as a logical model backed by relational storage; a specialised graph database is deferred until measured query needs justify it.

## Rationale

This gives consumers stable concept identifiers, explainable paths, controlled syllabus evolution, and strong provenance without introducing premature operational complexity. Separating the graph from learner memory preserves privacy and prevents personal inferences becoming curriculum facts.

## Consequences

- Planning, learning, assessment, revision, and retrieval use versioned `TopicScope` references.
- Graph writes require sources, review, validation, and an audit trail.
- Consumers can reproduce historical decisions with the pinned syllabus version.
- A future graph-store projection is an infrastructure change, not a domain-model rewrite.
