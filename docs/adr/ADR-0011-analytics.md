# ADR-0011: Reproducible, Advisory-Only Analytics

- Status: Accepted
- Date: 2026-07-18

## Context

Progress numbers drive high-stakes decisions in UPSC preparation: what to study, what to drop, whether the strategy works. Two failure patterns are common. First, dashboards computed by ad-hoc queries drift—the same "study hours" number means different things on different screens, and nobody can reproduce last month's value after a formula tweak. Second, analytics quietly becomes an actor: a "risk score" starts gating features or rewriting plans, turning a derived opinion into unaccountable authority.

## Decision

Analytics is event-sourced and reproducible: raw events are retained immutably, aggregates are computed by versioned policies, and every `MetricSnapshot` pins its policy version, input window, and watermark so recomputation is bit-identical. Analytics is advisory-only: it publishes snapshots and evidence-bearing insights, and owning contexts decide what to do with them. Insight claims come from versioned rules over data; models may phrase, but never originate, a claim.

## Rationale

Reproducibility turns "why did my score trend change" from an argument into a data inspection, and lets formulas evolve through explicit policy versions with recomputed history. The advisory boundary preserves the domain model's ownership rules: the Planner replanning on an insight is a Planning decision with a Planning audit trail, so accountability stays with the module that acted. Keeping models out of claim generation keeps every displayed number explainable to its evidence.

## Consequences

- Storage carries raw events plus derived layers; cost is managed by partitioning and policy-driven pruning, not by discarding provenance.
- Every metric shown to a learner can produce its evidence trail, which is a UI requirement, not an afterthought.
- Formula changes are visible events (new policy version), making silent metric inflation impossible.
- Insight quality is measurable by consumer action rates, giving the rule engine its own feedback loop.
- Future forecasting or cohort features must arrive as new versioned policies with their own consent bases, inheriting this discipline.
