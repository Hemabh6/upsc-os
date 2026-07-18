import { DomainValidationError } from '../errors.js';

/**
 * Expected or observed duration with an explicit unit.
 * See docs/domain-model.md — TimeBudget.
 */
export interface TimeBudget {
  readonly minutes: number;
}

export function timeBudgetFromMinutes(minutes: number): TimeBudget {
  if (!Number.isFinite(minutes) || minutes < 0) {
    throw new DomainValidationError(
      `TimeBudget requires a non-negative duration, got: ${String(minutes)}`,
    );
  }
  return Object.freeze({ minutes });
}

export function addTimeBudgets(a: TimeBudget, b: TimeBudget): TimeBudget {
  return timeBudgetFromMinutes(a.minutes + b.minutes);
}
