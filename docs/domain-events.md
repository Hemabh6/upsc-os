# Domain Events v1

## Event Contract

Events describe facts that have already occurred. They are immutable, versioned, tenant-scoped, and delivered at least once. Producers persist an outbox entry in the same transaction as the state change; consumers are idempotent and record the event ID they processed.

Every event envelope contains:

| Field | Purpose |
| --- | --- |
| `eventId` | Globally unique event identifier. |
| `eventType` and `version` | Stable, versioned contract name. |
| `occurredAt` | UTC time at which the fact occurred. |
| `aggregateType` and `aggregateId` | Owner and subject of the event. |
| `learnerId` | Tenant boundary when applicable. |
| `correlationId` and `causationId` | Trace a workflow and its triggering event. |
| `actor` | User, service, or authorised automation that initiated the change. |
| `data` | Minimal event-specific payload; no unneeded sensitive content. |

## Event Catalogue

| Event | Producer | Consumers | Meaning |
| --- | --- | --- | --- |
| `GoalActivated.v1` | Planning | Secretary, Analytics | A learner goal is ready for planning. |
| `StudyPlanPublished.v1` | Planning | Secretary, Notification, Analytics | A plan is active for a defined horizon. |
| `StudyCommitmentScheduled.v1` | Planning | Notification, Revision | A bounded item of work has a schedule. |
| `StudySessionCompleted.v1` | Learning | Memory, Analytics, Planning | A session was completed with observed activity. |
| `ProgressObserved.v1` | Learning | Memory, Analytics | Learning generated an evidence-bearing progress observation. |
| `AssessmentPublished.v1` | Assessment | Notification | An assessment is ready for the learner. |
| `AttemptSubmitted.v1` | Assessment | Evaluation workflow, Analytics | A learner submitted an immutable response set. |
| `EvaluationPublished.v1` | Assessment | Memory, Analytics, Planning, Revision | Validated feedback and score evidence are available. |
| `MemoryRecordActivated.v1` | Memory | Planning, Learning | Eligible learner context became retrievable. |
| `MemoryRecordDeleted.v1` | Memory | Retrieval index, Audit | A memory and its derived representations must be removed. |
| `RevisionItemDue.v1` | Revision | Notification | A revision item entered its due window. |
| `RevisionCompleted.v1` | Revision | Memory, Analytics, Planning | A learner completed scheduled recall. |
| `InsightProduced.v1` | Analytics | Planner, Secretary | A reproducible learner insight is available. |
| `NotificationDelivered.v1` | Notification | Analytics | A communication reached a provider successfully. |

## Compatibility Rules

Additive fields are permitted in a minor event version. Removing, renaming, or changing the meaning of a field requires a new major event version and a transition period. Event consumers must ignore unknown fields. Sensitive free text, raw answer bodies, and unbounded model context are not published on general event channels; events reference authorised records instead.
