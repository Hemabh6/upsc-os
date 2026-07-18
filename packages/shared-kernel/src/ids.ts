import { randomUUID } from 'node:crypto';
import { DomainValidationError } from './errors.js';

declare const brand: unique symbol;

/** Nominal typing helper: a T that only functions blessed for B may produce. */
export type Brand<T, B extends string> = T & { readonly [brand]: B };

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type LearnerId = Brand<string, 'LearnerId'>;
export type ConceptId = Brand<string, 'ConceptId'>;
export type SyllabusVersionId = Brand<string, 'SyllabusVersionId'>;
export type GoalId = Brand<string, 'GoalId'>;
export type PlanId = Brand<string, 'PlanId'>;
export type CommitmentId = Brand<string, 'CommitmentId'>;
export type SessionId = Brand<string, 'SessionId'>;
export type AssessmentId = Brand<string, 'AssessmentId'>;
export type AttemptId = Brand<string, 'AttemptId'>;
export type EvaluationId = Brand<string, 'EvaluationId'>;
export type MemoryId = Brand<string, 'MemoryId'>;
export type RevisionItemId = Brand<string, 'RevisionItemId'>;
export type EventId = Brand<string, 'EventId'>;
export type CorrelationId = Brand<string, 'CorrelationId'>;

export interface IdCodec<Id extends Brand<string, string>> {
  new_(): Id;
  parse(value: string): Id;
}

function codec<Id extends Brand<string, string>>(label: string): IdCodec<Id> {
  return {
    new_: () => randomUUID() as Id,
    parse: (value: string): Id => {
      if (!UUID_PATTERN.test(value)) {
        throw new DomainValidationError(`${label} must be a UUID, got: ${JSON.stringify(value)}`);
      }
      return value as Id;
    },
  };
}

export const learnerId = codec<LearnerId>('LearnerId');
export const conceptId = codec<ConceptId>('ConceptId');
export const syllabusVersionId = codec<SyllabusVersionId>('SyllabusVersionId');
export const goalId = codec<GoalId>('GoalId');
export const planId = codec<PlanId>('PlanId');
export const commitmentId = codec<CommitmentId>('CommitmentId');
export const sessionId = codec<SessionId>('SessionId');
export const assessmentId = codec<AssessmentId>('AssessmentId');
export const attemptId = codec<AttemptId>('AttemptId');
export const evaluationId = codec<EvaluationId>('EvaluationId');
export const memoryId = codec<MemoryId>('MemoryId');
export const revisionItemId = codec<RevisionItemId>('RevisionItemId');
export const eventId = codec<EventId>('EventId');
export const correlationId = codec<CorrelationId>('CorrelationId');
