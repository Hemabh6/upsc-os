import { DomainValidationError } from '../errors.js';
import type { UtcInstant } from '../time.js';

/** Who or what produced a record. */
export type ActorRef =
  | { readonly kind: 'learner'; readonly id: string }
  | { readonly kind: 'service'; readonly name: string }
  | { readonly kind: 'model'; readonly modelId: string };

export type ProvenanceSourceType =
  'learner-statement' | 'domain-event' | 'editorial' | 'model-generated' | 'import';

/**
 * Traceable origin of a record or generated output.
 * See docs/domain-model.md — Provenance.
 */
export interface Provenance {
  readonly sourceType: ProvenanceSourceType;
  readonly sourceId: string;
  readonly actor: ActorRef;
  readonly createdAt: UtcInstant;
}

export function createProvenance(input: Provenance): Provenance {
  if (input.sourceId.trim() === '') {
    throw new DomainValidationError('Provenance requires a non-empty sourceId');
  }
  return Object.freeze({ ...input });
}
