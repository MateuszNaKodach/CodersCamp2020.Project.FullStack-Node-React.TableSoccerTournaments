import {DomainEventBus} from "../../application/eventbus/DomainEventBus";
import {DomainEvent} from "../../application/eventbus/DomainEvent";

type EventListener = { readonly eventType: string; readonly reaction: (event: DomainEvent) => void };

export class InMemoryDomainEventBus implements DomainEventBus {
  private readonly listeners: EventListener[] = [];

  publish(event: DomainEvent): void {
    this.listeners.filter((it) => it.eventType === event.eventType).forEach((it) => it.reaction(event));
  }

  handle<EventType extends DomainEvent>(eventType: EventType['eventType'], reaction: (event: EventType) => void): void {
    this.listeners.push({eventType, reaction: reaction as (event: DomainEvent) => void});
  }
}
