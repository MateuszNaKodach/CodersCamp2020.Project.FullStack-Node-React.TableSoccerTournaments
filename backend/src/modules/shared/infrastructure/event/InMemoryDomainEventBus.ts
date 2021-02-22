import {DomainEventBus} from "../../application/event/DomainEventBus";
import {DomainEvent} from "../../domain/event/DomainEvent";
import {HasConstructor} from "../../../../common/HasConstructor";
import {EventHandler} from "../../application/event/EventHandler";

type EventListener = { readonly eventType: string; readonly handler: EventHandler };

export class InMemoryDomainEventBus implements DomainEventBus {
  private readonly listeners: EventListener[] = [];

  publish(event: DomainEvent): any {
    const eventTypeName: string = Object.getPrototypeOf(event).constructor.name;
    this.listeners
        .filter((it) => it.eventType === eventTypeName)
        .forEach((it) => it.handler.handle(event));
  }

  publishAll(events: DomainEvent[]): any {
    events.forEach(event => this.publish(event))
  }

  registerHandler<EventType extends DomainEvent>(eventType: HasConstructor<EventType>, handler: EventHandler<EventType>): void {
    const eventTypeName: string = eventType.name;
    this.listeners.push({eventType: eventTypeName, handler});
  }

  withHandler<EventType extends DomainEvent>(eventType: HasConstructor<EventType>, handler: EventHandler<EventType>): InMemoryDomainEventBus {
    this.registerHandler(eventType, handler);
    return this;
  }
}
