import { DomainValidationError } from '../errors.js';
import type { ConceptId, SyllabusVersionId } from '../ids.js';

/**
 * A validated set of syllabus concepts pinned to one syllabus version.
 * See docs/domain-model.md — TopicScope.
 */
export interface TopicScope {
  readonly syllabusVersionId: SyllabusVersionId;
  readonly conceptIds: readonly ConceptId[];
}

export function createTopicScope(
  syllabusVersion: SyllabusVersionId,
  concepts: readonly ConceptId[],
): TopicScope {
  if (concepts.length === 0) {
    throw new DomainValidationError('TopicScope requires at least one concept');
  }
  const unique = [...new Set(concepts)];
  return Object.freeze({
    syllabusVersionId: syllabusVersion,
    conceptIds: Object.freeze(unique),
  });
}

export function scopeContains(scope: TopicScope, concept: ConceptId): boolean {
  return scope.conceptIds.includes(concept);
}
