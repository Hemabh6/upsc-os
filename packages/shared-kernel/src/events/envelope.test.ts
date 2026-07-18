import { describe, expect, it } from 'vitest';
import { DomainValidationError } from '../errors.js';
import { causedBy, createEvent } from './envelope.js';

const actor = { kind: 'service', name: 'planner' } as const;

describe('domain event envelope', () => {
  it('fills identity, time, and correlation defaults', () => {
    const event = createEvent({
      eventType: 'GoalActivated.v1',
      aggregateType: 'Goal',
      aggregateId: 'goal-1',
      actor,
      data: { goalId: 'goal-1' },
    });
    expect(event.eventId).toMatch(/^[0-9a-f-]{36}$/);
    expect(event.correlationId).toMatch(/^[0-9a-f-]{36}$/);
    expect(new Date(event.occurredAt).getTime()).not.toBeNaN();
    expect(Object.isFrozen(event)).toBe(true);
  });

  it('rejects malformed event type names', () => {
    expect(() =>
      createEvent({
        eventType: 'goal-activated' as never,
        aggregateType: 'Goal',
        aggregateId: 'goal-1',
        actor,
        data: {},
      }),
    ).toThrowError(DomainValidationError);
  });

  it('propagates correlation and causation through causedBy', () => {
    const parent = createEvent({
      eventType: 'StudyPlanPublished.v1',
      aggregateType: 'StudyPlan',
      aggregateId: 'plan-1',
      actor,
      data: {},
    });
    const child = createEvent({
      eventType: 'StudyCommitmentScheduled.v1',
      aggregateType: 'StudyCommitment',
      aggregateId: 'commitment-1',
      actor,
      data: {},
      ...causedBy(parent),
    });
    expect(child.correlationId).toBe(parent.correlationId);
    expect(child.causationId).toBe(parent.eventId);
  });
});
