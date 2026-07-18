import { DomainValidationError } from '../errors.js';

/**
 * A score assigned against one rubric criterion, with rationale and evidence.
 * See docs/domain-model.md — RubricScore.
 */
export interface RubricScore {
  readonly criterionId: string;
  readonly score: number;
  readonly maxMarks: number;
  readonly rationale: string;
  readonly evidenceRefs: readonly string[];
}

export function createRubricScore(input: RubricScore): RubricScore {
  if (!Number.isFinite(input.maxMarks) || input.maxMarks <= 0) {
    throw new DomainValidationError(
      `RubricScore maxMarks must be positive, got: ${String(input.maxMarks)}`,
    );
  }
  if (!Number.isFinite(input.score) || input.score < 0 || input.score > input.maxMarks) {
    throw new DomainValidationError(
      `RubricScore score must be within [0, ${String(input.maxMarks)}], got: ${String(input.score)}`,
    );
  }
  if (input.rationale.trim() === '') {
    throw new DomainValidationError('RubricScore requires a rationale');
  }
  return Object.freeze({ ...input, evidenceRefs: Object.freeze([...input.evidenceRefs]) });
}
