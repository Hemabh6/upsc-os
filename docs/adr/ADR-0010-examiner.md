# ADR-0010: Rubric-First Evaluation with Deterministic Validation Gates

- Status: Accepted
- Date: 2026-07-18

## Context

Evaluating subjective UPSC answers is the product's most valuable and most dangerous AI capability. A model asked to "mark this answer out of 15" produces fluent, inconsistent, unanchored scores; two identical answers can receive different marks, and the learner has no path to dispute either. Yet removing AI entirely forfeits the core promise—no human examiner scales to daily answer-writing practice.

## Decision

All subjective evaluation is rubric-first: the model evaluates only against a versioned, human-curated rubric, returning a bounded `RubricScore` per criterion with quoted evidence from the learner's answer. The Examiner validates structure, score bounds, rubric coverage, and evidence references deterministically before anything is published. Low-confidence or validation-failing evaluations divert to a human review queue; deterministic items are always scored by code. Every evaluation permanently pins its rubric version and provenance.

## Rationale

The rubric converts an open-ended judgement into a constrained extraction-and-scoring task, which models perform far more consistently and which humans can audit criterion by criterion. Deterministic gates mean model failure modes degrade to "delayed, human-reviewed" rather than "wrong mark published". Pinned rubric versions make historical scores reproducible and make calibration—model versus human anchors—a measurable, pre-deployment activity instead of a live experiment on learners.

## Consequences

- Rubric authoring and calibration become a first-class editorial workflow, analogous to Knowledge Graph change sets.
- Review-queue staffing is a real operational cost, sized by the confidence threshold—a governable dial.
- Model upgrades require recalibration before scale use; a better model still cannot skip the gates.
- Score disputes resolve against criteria and quoted evidence, not against an opaque model opinion.
- UPSC answer-writing evaluation (long-form GS and essay) extends this design with richer rubrics rather than a new mechanism.
