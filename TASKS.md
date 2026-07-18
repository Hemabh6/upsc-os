# Lakshya Core (UPSC OS) — Milestone Backlog

Executable backlog for the documentation-first roadmap. Each milestone is one commit.
To continue the project: implement the next incomplete milestone, commit with the listed
message, and tick it off here in the same commit.

| # | Milestone | Commit message | Status |
| --- | --- | --- | --- |
| 1 | Initial roadmap | `feat: add initial roadmap` | ✅ Done |
| 2 | Architecture v1 | `feat: Architecture v1` | ✅ Done |
| 3 | Domain Model v1 | `feat: Domain Model v1` | ✅ Done |
| 4 | Knowledge Graph v1 | `feat: Knowledge Graph v1` | ✅ Done |
| 5 | Memory Engine v1 | `feat: Memory Engine v1` | ✅ Done |
| 6 | Learning Engine v1 | `feat: Learning Engine v1` | ✅ Done |
| 7 | Planner v1 | `feat: Planner v1` | ✅ Done |
| 8 | Secretary v1 | `feat: Secretary v1` | ✅ Done |
| 9 | Examiner v1 | `feat: Examiner v1` | ✅ Done |
| 10 | Analytics v1 | `feat: Analytics v1` | ✅ Done |

All ten documentation milestones are complete. Phase 2 below implements the system.

# Phase 2 — Implementation Backlog

Stack per docs/architecture.md: TypeScript modular monolith (npm workspaces, one package
per bounded context), PostgreSQL + pgvector, transactional outbox events, OIDC auth.
Milestones 15–21 are built as thin vertical slices first (one happy path end-to-end),
then deepened, so a usable plan → study → quiz → insight loop exists early.

| # | Milestone | Commit message | Status |
| --- | --- | --- | --- |
| 11 | Project scaffolding | `feat: project scaffolding` | ⬜ Next |
| 12 | Shared kernel | `feat: shared kernel` | ⬜ Pending |
| 13 | Database + event backbone | `feat: database and event backbone` | ⬜ Pending |
| 14 | Identity + API Gateway | `feat: identity and api gateway` | ⬜ Pending |
| 15 | Knowledge Graph module | `feat: knowledge graph module` | ⬜ Pending |
| 16 | Memory Engine module | `feat: memory engine module` | ⬜ Pending |
| 17 | Planner module | `feat: planner module` | ⬜ Pending |
| 18 | Learning Engine module | `feat: learning engine module` | ⬜ Pending |
| 19 | Examiner module | `feat: examiner module` | ⬜ Pending |
| 20 | Analytics + Notification | `feat: analytics and notification` | ⬜ Pending |
| 21 | Secretary + frontend shell | `feat: secretary and frontend shell` | ⬜ Pending |

## Phase 2 conventions

- One milestone per commit, ticked off here in the same commit; push to main after each.
- Packages are created when a milestone needs them — no empty placeholder packages.
- Every package ships with tests; CI (lint, typecheck, test) must pass before commit.
- Module boundaries follow docs/module-map.md; cross-context imports are limited to
  the shared kernel and published contracts.

## Milestone conventions

- Documentation only until the backlog above is complete; no application code or placeholders.
- Each module milestone delivers: `docs/<module>.md` (design), a schema or contract doc
  where the module owns data, and an ADR in `docs/adr/` for its key decision.
- Stay consistent with [docs/domain-model.md](docs/domain-model.md),
  [docs/domain-events.md](docs/domain-events.md), and [docs/glossary.md](docs/glossary.md);
  extend them in the same commit if a milestone introduces new terms or events.
