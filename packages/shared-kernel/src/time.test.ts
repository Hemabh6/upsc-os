import { describe, expect, it } from 'vitest';
import { DomainValidationError } from './errors.js';
import { compareInstants, parseUtcInstant, utcNow } from './time.js';

describe('UtcInstant', () => {
  it('normalises offset timestamps to UTC', () => {
    expect(parseUtcInstant('2026-07-18T10:30:00+05:30')).toBe('2026-07-18T05:00:00.000Z');
  });

  it('rejects timestamps without a timezone', () => {
    expect(() => parseUtcInstant('2026-07-18T10:30:00')).toThrowError(DomainValidationError);
    expect(() => parseUtcInstant('not a date')).toThrowError(DomainValidationError);
  });

  it('orders instants chronologically', () => {
    const earlier = parseUtcInstant('2026-01-01T00:00:00Z');
    const later = utcNow();
    expect(compareInstants(earlier, later)).toBe(-1);
    expect(compareInstants(later, later)).toBe(0);
  });
});
