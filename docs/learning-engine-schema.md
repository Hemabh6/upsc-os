# Learning Engine Schema v1

Logical schema for the Learning context. Physical storage is PostgreSQL; high-volume session activity is partitioned by time as anticipated in the scalability strategy.

## Entities

| Entity | Key fields | Constraints |
| --- | --- | --- |
| StudySession | `sessionId`, `learnerId`, `commitmentId?`, topicScope, startedAt, endedAt, status | Tenant-scoped; `endedAt` required for completed or abandoned sessions. |
| SessionActivity | `activityId`, `sessionId`, activityType, resourceId?, duration | Belongs to exactly one session; duration is a non-negative `TimeBudget`. |
| LearningResource | `resourceId`, title, mediaType, sourceReference, status | Requires provenance before it can be recommended; learner uploads are private to the learner. |
| ProgressObservation | `observationId`, `sessionId`, conceptIds, signal, basis, provenance | Append-only; concepts must belong to the session's topic scope. |
| ExplanationLog | `explanationId`, `sessionId`, question, citedSourceIds, modelRun | Retained for audit and quality measurement, not re-served as content. |

## Integrity Rules

1. A session references at most one commitment, and only one owned by the same learner.
2. Completed sessions are immutable except for learner-visible annotations.
3. Observations cannot be created for a session that is not completed.
4. An observation's `conceptIds` must resolve in the syllabus version pinned by the session's topic scope.
5. Explanation logs must record cited sources and the `ModelRun`; an explanation with no retrievable context is flagged, not silently stored.
6. LearningResource entries require a `SourceReference`; model-generated text is not a resource.
7. Learner identifiers never appear on shared resource metadata.

## Event Publication

| Event | Trigger | Notes |
| --- | --- | --- |
| `StudySessionCompleted.v1` | Session completion transaction | Outbox entry in the same transaction. |
| `ProgressObserved.v1` | Evidence-bearing activity validated | One event per observation; consumers deduplicate by `observationId`. |

## Retention

Raw session activity is retained separately from derived aggregates and partitioned by time. Observations follow the evidence-retention policy: they are kept while any derived record cites them, and deletion requests cascade through the same verified propagation used by the Memory Engine.
