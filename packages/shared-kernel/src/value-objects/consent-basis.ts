import { DomainValidationError } from '../errors.js';
import type { UtcInstant } from '../time.js';

/** The purposes learner data may be processed for; extend deliberately, never implicitly. */
export type ProcessingPurpose =
  | 'planning'
  | 'teaching'
  | 'assessment'
  | 'revision'
  | 'analytics'
  | 'notification'
  | 'conversation';

/**
 * Explicit, versioned, revocable permission for processing personal context.
 * See docs/domain-model.md — ConsentBasis.
 */
export interface ConsentBasis {
  readonly consentVersion: string;
  readonly purposes: readonly ProcessingPurpose[];
  readonly grantedAt: UtcInstant;
  readonly revokedAt?: UtcInstant;
}

export function createConsentBasis(
  input: Omit<ConsentBasis, 'purposes'> & {
    purposes: readonly ProcessingPurpose[];
  },
): ConsentBasis {
  if (input.purposes.length === 0) {
    throw new DomainValidationError('ConsentBasis requires at least one purpose');
  }
  if (input.revokedAt !== undefined && input.revokedAt < input.grantedAt) {
    throw new DomainValidationError('ConsentBasis cannot be revoked before it was granted');
  }
  return Object.freeze({ ...input, purposes: Object.freeze([...new Set(input.purposes)]) });
}

export function consentAllows(basis: ConsentBasis, purpose: ProcessingPurpose): boolean {
  return basis.revokedAt === undefined && basis.purposes.includes(purpose);
}
