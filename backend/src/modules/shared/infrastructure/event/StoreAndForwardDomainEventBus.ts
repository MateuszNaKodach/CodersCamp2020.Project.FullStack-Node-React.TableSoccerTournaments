import {DomainEvent} from "../../domain/event/DomainEvent";
import {DomainEventBus} from "../../application/event/DomainEventBus";
import {HasConstructor} from "../../../../common/HasConstructor";
import {EventHandler} from "../../application/event/EventHandler";

export class StoreAndForwardDomainEventBus implements DomainEventBus {

  readonly storedEvents: DomainEvent[] = []

  constructor(private readonly next: DomainEventBus) {
  }

  publish(event: DomainEvent): any {
    this.storedEvents.push(event)
    return this.next.publish(event)
  }

  publishAll(events: DomainEvent[]): any {
    this.storedEvents.push(...events)
    return this.next.publishAll(events)
  }

  registerHandler<EventType extends DomainEvent>(eventType: HasConstructor<EventType>, handler: EventHandler<EventType>): void {
    return this.next.registerHandler<EventType>(eventType, handler)
  }

}

