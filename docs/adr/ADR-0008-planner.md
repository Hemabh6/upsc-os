# ADR-0008: Deterministic Planning Core with Versioned Supersession

- Status: Accepted
- Date: 2026-07-18

## Context

A UPSC plan spans months and is revised constantly. If the plan is a mutable document edited in place, learners lose the ability to see what changed and why, and the system cannot explain or reproduce its own decisions. If plan generation is delegated to a model end-to-end, identical inputs yield different schedules, replanning becomes unauditable, and trust erodes exactly where the product promises reliability.

## Decision

The scheduling core is deterministic: plans are pure functions of goals, availability, syllabus version, evidence snapshot, and a versioned policy. Plans are immutable once active; every change is a superseding version with a recorded trigger, diff, and accepting actor. AI participates only by drafting proposals—goal decomposition, prioritisation, trade-off explanations—that pass through the same validation and acceptance path as a learner edit.

## Rationale

Determinism makes the Planner testable and its recommendations explainable from pinned inputs. Supersession preserves history without locking learners into stale schedules, and carries unresolved commitments forward explicitly so work is never silently dropped. Routing AI suggestions through the proposal path keeps model quality a tuning concern rather than a correctness risk, honouring the architecture's principle that AI augments deterministic workflows.

## Consequences

- Policy changes require a version bump and take effect through replanning, not retroactive edits.
- Storage holds every plan version; pruning follows retention policy, not convenience.
- "Why this plan" views cite pinned inputs, making planner debugging a data inspection task.
- Replan rate limits are policy, so plan stability is measurable and governable.
- A future scenario-planning feature composes naturally: scenarios are draft versions that never activate.
