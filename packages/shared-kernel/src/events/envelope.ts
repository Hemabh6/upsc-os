import { DomainValidationError } from '../errors.js';
import { eventId as eventIdCodec, correlationId as correlationIdCodec } from '../ids.js';
import type { CorrelationId, EventId, LearnerId } from '../ids.js';
import { utcNow } from '../time.js';
import type { UtcInstant } from '../time.js';
import type { ActorRef } from '../value-objects/provenance.js';

/** Versioned contract name, e.g. "StudySessionCompleted.v1". */
export type EventType = `${string}.v${number}`;

const EVENT_TYPE_PATTERN = /^[A-Z][A-Za-z0-9]*\.v[1-9]\d*$/;

/**
 * The envelope every domain event travels in.
 * Field meanings are specified in docs/domain-events.md.
 */
export interface DomainEvent<TType extends EventType = EventType, TData = unknown> {
  readonly eventId: EventId;
  readonly eventType: TType;
  readonly occurredAt: UtcInstant;
  readonly aggregateType: string;
  readonly aggregateId: string;
  readonly learnerId?: LearnerId;
  readonly correlationId: CorrelationId;
  readonly causationId?: EventId;
  readonly actor: ActorRef;
  readonly data: TData;
}

export interface CreateEventInput<TType extends EventType, TData> {
  readonly eventType: TType;
  readonly aggregateType: string;
  readonly aggregateId: string;
  readonly learnerId?: LearnerId;
  readonly correlationId?: CorrelationId;
  readonly causationId?: EventId;
  readonly actor: ActorRef;
  readonly data: TData;
  readonly occurredAt?: UtcInstant;
}

export function createEvent<TType extends EventType, TData>(
  input: CreateEventInput<TType, TData>,
): DomainEvent<TType, TData> {
  if (!EVENT_TYPE_PATTERN.test(input.eventType)) {
    throw new DomainValidationError(
      `Event type must match "Name.vN" (e.g. "GoalActivated.v1"), got: ${JSON.stringify(input.eventType)}`,
    );
  }
  if (input.aggregateType.trim() === '' || input.aggregateId.trim() === '') {
    throw new DomainValidationError('Events require an aggregateType and aggregateId');
  }
  return Object.freeze({
    eventId: eventIdCodec.new_(),
    eventType: input.eventType,
    occurredAt: input.occurredAt ?? utcNow(),
    aggregateType: input.aggregateType,
    aggregateId: input.aggregateId,
    ...(input.learnerId !== undefined && { learnerId: input.learnerId }),
    correlationId: input.correlationId ?? correlationIdCodec.new_(),
    ...(input.causationId !== undefined && { causationId: input.causationId }),
    actor: input.actor,
    data: input.data,
  });
}

/** Derive a follow-on event input that preserves the workflow trace. */
export function causedBy(parent: DomainEvent): {
  correlationId: CorrelationId;
  causationId: EventId;
} {
  return { correlationId: parent.correlationId, causationId: parent.eventId };
}
