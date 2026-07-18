import { DomainValidationError } from '../errors.js';
import type { UtcInstant } from '../time.js';
import type { Provenance } from './provenance.js';

/**
 * A time-bound item of evidence about learner understanding — never a permanent score.
 * See docs/domain-model.md — MasterySignal.
 */
export interface MasterySignal {
  readonly evidence: string;
  readonly confidence: number;
  readonly observedAt: UtcInstant;
  readonly provenance: Provenance;
}

export function createMasterySignal(input: MasterySignal): MasterySignal {
  if (input.evidence.trim() === '') {
    throw new DomainValidationError('MasterySignal requires non-empty evidence');
  }
  if (!Number.isFinite(input.confidence) || input.confidence < 0 || input.confidence > 1) {
    throw new DomainValidationError(
      `MasterySignal confidence must be within [0, 1], got: ${String(input.confidence)}`,
    );
  }
  return Object.freeze({ ...input });
}
