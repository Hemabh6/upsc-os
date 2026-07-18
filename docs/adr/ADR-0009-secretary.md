# ADR-0009: Secretary as Orchestrator, Not Owner

- Status: Accepted
- Date: 2026-07-18

## Context

A conversational assistant is the most convenient place to implement everything: it already talks to the learner, so letting it write plans, mark sessions, or edit memory directly is always the shortest path. That convenience is how a chat layer becomes an unreviewed write path into every context—exactly what the domain model's ownership rules exist to prevent. The alternative failure is a secretary so thin it can only chat, forcing learners back into forms for any real action.

## Decision

The Secretary owns exactly two kinds of state: administrative records that no other context claims (tasks, follow-ups, reminder requests) and audit logs of its own intent resolution. Every other effect is achieved by issuing the owning module's typed, validated command, carrying a correlation ID. Model-based intent resolution outputs a command proposal; below a confidence threshold it must ask rather than act. Agenda and status views are composed at read time from owning contexts, never copied.

## Rationale

Typed commands keep the module boundary real: the Planner validates a conversational plan edit exactly as it validates a form edit, so conversation adds convenience without adding a second rulebook. Owning tasks and follow-ups fills a genuine gap—UPSC preparation includes administrative work no other context models—without duplicating domain state. Read-time composition guarantees the agenda cannot drift from the truth it presents.

## Consequences

- Every module the Secretary orchestrates must expose a complete command contract; gaps surface as "I can't do that yet" instead of workarounds.
- Clarifying questions are a designed outcome with a measured rate, not a failure state.
- Intent-resolution quality is auditable from the intent log without inspecting other contexts.
- The Secretary can be rebuilt or its model swapped with zero migration of domain data.
- Latency-sensitive agenda views need efficient read models in owning contexts, which is a deliberate pressure toward good query contracts.
