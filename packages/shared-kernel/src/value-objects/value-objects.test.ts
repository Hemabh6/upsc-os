import { describe, expect, it } from 'vitest';
import { DomainValidationError } from '../errors.js';
import { conceptId, syllabusVersionId } from '../ids.js';
import { utcNow } from '../time.js';
import { consentAllows, createConsentBasis } from './consent-basis.js';
import { createMasterySignal } from './mastery-signal.js';
import { createProvenance } from './provenance.js';
import { createRubricScore } from './rubric-score.js';
import { addTimeBudgets, timeBudgetFromMinutes } from './time-budget.js';
import { createTopicScope, scopeContains } from './topic-scope.js';

describe('TopicScope', () => {
  const syllabus = syllabusVersionId.new_();

  it('deduplicates concepts and stays immutable', () => {
    const concept = conceptId.new_();
    const scope = createTopicScope(syllabus, [concept, concept]);
    expect(scope.conceptIds).toHaveLength(1);
    expect(scopeContains(scope, concept)).toBe(true);
    expect(Object.isFrozen(scope)).toBe(true);
  });

  it('rejects an empty concept set', () => {
    expect(() => createTopicScope(syllabus, [])).toThrowError(DomainValidationError);
  });
});

describe('TimeBudget', () => {
  it('adds budgets and rejects negative durations', () => {
    expect(addTimeBudgets(timeBudgetFromMinutes(30), timeBudgetFromMinutes(15)).minutes).toBe(45);
    expect(() => timeBudgetFromMinutes(-1)).toThrowError(DomainValidationError);
  });
});

describe('ConsentBasis', () => {
  it('permits only granted, unrevoked purposes', () => {
    const basis = createConsentBasis({
      consentVersion: 'v1',
      purposes: ['planning', 'planning', 'teaching'],
      grantedAt: utcNow(),
    });
    expect(basis.purposes).toHaveLength(2);
    expect(consentAllows(basis, 'planning')).toBe(true);
    expect(consentAllows(basis, 'analytics')).toBe(false);
  });

  it('treats a revoked basis as allowing nothing', () => {
    const grantedAt = utcNow();
    const basis = createConsentBasis({
      consentVersion: 'v1',
      purposes: ['planning'],
      grantedAt,
      revokedAt: grantedAt,
    });
    expect(consentAllows(basis, 'planning')).toBe(false);
  });
});

describe('MasterySignal', () => {
  it('bounds confidence to [0, 1]', () => {
    const provenance = createProvenance({
      sourceType: 'domain-event',
      sourceId: 'evt-1',
      actor: { kind: 'service', name: 'learning-engine' },
      createdAt: utcNow(),
    });
    expect(() =>
      createMasterySignal({
        evidence: 'Scored 9/10 on Fundamental Rights quiz',
        confidence: 1.2,
        observedAt: utcNow(),
        provenance,
      }),
    ).toThrowError(DomainValidationError);
  });
});

describe('RubricScore', () => {
  it('rejects scores outside the criterion mark range', () => {
    expect(() =>
      createRubricScore({
        criterionId: 'structure',
        score: 6,
        maxMarks: 5,
        rationale: 'Well-structured answer',
        evidenceRefs: [],
      }),
    ).toThrowError(DomainValidationError);
  });
});
