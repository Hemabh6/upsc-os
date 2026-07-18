import { describe, expect, it } from 'vitest';
import { DomainValidationError } from './errors.js';
import { conceptId, learnerId } from './ids.js';

describe('id codecs', () => {
  it('generates valid UUIDs that round-trip through parse', () => {
    const id = learnerId.new_();
    expect(learnerId.parse(id)).toBe(id);
  });

  it('rejects non-UUID strings with the codec label in the message', () => {
    expect(() => conceptId.parse('polity/fundamental-rights')).toThrowError(DomainValidationError);
    expect(() => conceptId.parse('polity/fundamental-rights')).toThrowError(/ConceptId/);
  });
});
