# ADR-0007: Retrieval-First Teaching and Evidence-Only Progress

- Status: Accepted
- Date: 2026-07-18

## Context

The Learning Engine sits closest to the model: it explains concepts, answers questions mid-session, and records what the learner did. The two tempting shortcuts are letting the model teach from its parametric knowledge alone, and letting the engine update a mastery score directly when a session "goes well". The first produces confident, uncitable errors in a domain where source fidelity decides marks; the second turns one module's heuristic into everyone's ground truth.

## Decision

Teaching responses are generated only after scope resolution against the Knowledge Graph and retrieval of curated source passages; factual claims without a citation are labelled unverified before display. Progress is recorded exclusively as append-only ProgressObservation evidence carrying a `MasterySignal`; no module, including Learning itself, writes a mastery level as state.

## Rationale

Retrieval-first teaching makes every explanation auditable against the same sources the Examiner will later use, keeping instruction and assessment consistent. Evidence-only progress keeps mastery a derived, reproducible view: Analytics, Revision, and Planning can each weigh the same observations by their own policy, and a bad heuristic can be recomputed away instead of having corrupted stored scores.

## Consequences

- Explanation latency includes retrieval; caching of curated passages becomes a first-class concern.
- Out-of-syllabus questions get an explicit "outside current scope" path rather than a hallucinated answer.
- Mastery displays anywhere in the product must name the evidence and policy version behind them.
- Observation volume grows unbounded; the retention and partitioning strategy is defined with the schema, not retrofitted.
- Model upgrades change explanation quality but cannot silently change historical progress records.
