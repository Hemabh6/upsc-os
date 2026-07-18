import { DomainValidationError } from '../errors.js';
import type { UtcInstant } from '../time.js';

/**
 * AI execution metadata attached to any model-derived output.
 * See docs/domain-model.md — ModelRun.
 */
export interface ModelRun {
  readonly modelId: string;
  readonly promptVersion: string;
  readonly retrievalRefs: readonly string[];
  readonly safetyResult: 'passed' | 'flagged' | 'blocked';
  readonly executedAt: UtcInstant;
}

export function createModelRun(input: ModelRun): ModelRun {
  if (input.modelId.trim() === '' || input.promptVersion.trim() === '') {
    throw new DomainValidationError('ModelRun requires a modelId and promptVersion');
  }
  return Object.freeze({ ...input, retrievalRefs: Object.freeze([...input.retrievalRefs]) });
}
