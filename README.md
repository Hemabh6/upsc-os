# Lakshya Core (upsc-os)

An AI operating system for UPSC aspirants: personal mentor, planner, teacher, examiner,
secretary, and durable learning memory — designed as a TypeScript modular monolith with
event-driven module boundaries.

## Repository layout

| Path | Contents |
| --- | --- |
| `docs/` | Architecture handbook: architecture, domain model, module designs, schemas, data flows. |
| `docs/adr/` | Architectural Decision Records (ADR-0001 … ADR-0011). |
| `packages/` | One package per bounded context plus the shared kernel (created as milestones land). |
| `apps/` | Deployable applications (API gateway, frontend shell). |
| `TASKS.md` | Executable milestone backlog — the source of truth for what's next. |

## Development

Requires Node.js ≥ 22.

```sh
npm ci          # install
npm run lint    # eslint over the workspace
npm run typecheck
npm test        # vitest per package
```

CI runs the same four checks on every push and pull request.

## How this project is built

The project advances milestone by milestone (see [TASKS.md](TASKS.md)); each milestone is
one commit. Phase 1 produced the complete architecture documentation; Phase 2 implements
the system in thin vertical slices. Design decisions live in `docs/adr/` and module
behaviour is specified in `docs/` before code lands.
