import { DomainEvent } from '../../domain/event/DomainEvent';

export interface DomainEventSource {
  handle<EventType extends DomainEvent>(eventType: EventType['eventType'], handler: (event: EventType) => void): void;
}

export interface DomainEventPublisher {
  publish(event: DomainEvent): void;
}

export interface DomainEventBus extends DomainEventSource, DomainEventPublisher {}
