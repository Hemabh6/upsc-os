import { DomainValidationError } from './errors.js';
import type { Brand } from './ids.js';

/** An instant serialised as an ISO-8601 UTC string (trailing Z), the only wire format for time. */
export type UtcInstant = Brand<string, 'UtcInstant'>;

export function utcNow(): UtcInstant {
  return new Date().toISOString() as UtcInstant;
}

export function toUtcInstant(date: Date): UtcInstant {
  if (Number.isNaN(date.getTime())) {
    throw new DomainValidationError('Cannot convert an invalid Date to UtcInstant');
  }
  return date.toISOString() as UtcInstant;
}

export function parseUtcInstant(value: string): UtcInstant {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime()) || !/[zZ]$|[+-]\d{2}:\d{2}$/.test(value)) {
    throw new DomainValidationError(
      `UtcInstant must be an ISO-8601 timestamp with timezone, got: ${JSON.stringify(value)}`,
    );
  }
  return parsed.toISOString() as UtcInstant;
}

export function compareInstants(a: UtcInstant, b: UtcInstant): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
