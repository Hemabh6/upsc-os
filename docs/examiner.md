# Examiner v1

## Purpose

The Examiner assesses knowledge and returns evidence-based feedback. It owns the Assessment context—Assessment, Attempt, and Evaluation—and covers the full range from deterministic MCQ scoring to guarded, rubric-based evaluation of subjective UPSC answers. Its output is the highest-stakes AI content in the product, so its design centres on validation gates.

## Scope and Boundaries

Assessment owns question sets, attempts, rubrics, and evaluations. It does not own the syllabus (Knowledge), mastery views (derived by consumers from evaluation evidence), or learner context (Memory). Generated questions must stay inside a curated `TopicScope`; evaluations must cite a rubric version and evidence.

## Assessment Generation

Question generation follows the guarded pipeline established in the quiz-generation data flow:

1. Resolve the requested scope against the Knowledge Graph; only curated concepts and permitted sources qualify.
2. Retrieve grounded source context for the scoped concepts.
3. Generate candidate items against a strict schema (stem, options, key, rationale, difficulty, concept links).
4. Validate schema, scope membership, single-key correctness, and rationale-source consistency; rejected items never reach a learner.

Published assessments are immutable and pinned to a syllabus version, so any attempt can be re-evaluated historically.

## Evaluation Pipeline

```mermaid
sequenceDiagram
    actor U as Learner
    participant E as Examiner
    participant AI as AI Orchestration
    U->>E: Submit attempt
    E->>E: Freeze responses (immutable)
    E->>E: Score deterministic items
    E->>AI: Evaluate subjective answers against rubric version
    AI-->>E: Draft evaluation with per-criterion scores and evidence
    E->>E: Validate rubric coverage, score bounds, evidence references
    alt validation passes and confidence sufficient
        E-->>U: Publish evaluation with feedback
    else low confidence or validation failure
        E->>E: Queue for review; learner sees deterministic results meanwhile
    end
```

Subjective evaluation is rubric-first: the model receives a versioned rubric with criterion definitions, mark ranges, and anchor examples, and must return a `RubricScore` per criterion with quoted evidence from the answer. The Examiner validates structure and bounds deterministically. Evaluations below the confidence threshold, or failing validation, go to a review queue instead of being published. Publication emits `EvaluationPublished.v1`.

## Rubric Governance

Rubrics are versioned, curated artefacts like Knowledge Graph change sets: authored, reviewed, and immutable after publication. An evaluation permanently references the rubric version that produced it. Rubric calibration—checking model scoring against human-scored anchors—runs before a rubric version is used at scale, and its results are retained.

## Feedback Content

Learner feedback always contains: per-criterion scores with the rubric's words, quoted evidence from the learner's own answer, the model-answer direction (what a strong answer includes), and concept links for revision. Feedback never presents an unvalidated model opinion as a mark.

## Query Contracts

| Consumer | Request | Result |
| --- | --- | --- |
| Learner | Attempt results | Scores, feedback, evidence, rubric version. |
| Analytics | Evaluation evidence stream | `EvaluationPublished.v1` events with score payloads. |
| Revision | Weak-criterion concepts | Concept links from evaluations, never raw answer text. |
| Planner | Performance deltas | Evaluation summaries scoped to plan horizons. |

## Quality and Success Metrics

Measure agreement between model evaluation and human review on sampled answers, review-queue rate and turnaround, item rejection rate at generation, answer-key error reports per thousand attempts, and learner dispute rate with outcomes. Calibration drift after a model or rubric change must be visible before learners feel it.
