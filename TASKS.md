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
| 8 | Secretary v1 | `feat: Secretary v1` | ⬜ Next |
| 9 | Examiner v1 | `feat: Examiner v1` | ⬜ Pending |
| 10 | Analytics v1 | `feat: Analytics v1` | ⬜ Pending |

## Milestone conventions

- Documentation only until the backlog above is complete; no application code or placeholders.
- Each module milestone delivers: `docs/<module>.md` (design), a schema or contract doc
  where the module owns data, and an ADR in `docs/adr/` for its key decision.
- Stay consistent with [docs/domain-model.md](docs/domain-model.md),
  [docs/domain-events.md](docs/domain-events.md), and [docs/glossary.md](docs/glossary.md);
  extend them in the same commit if a milestone introduces new terms or events.
