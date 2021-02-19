import {DomainEvent} from "../../domain/event/DomainEvent";

export interface EventHandler<EventType extends DomainEvent = DomainEvent> {
  handle(eventType: EventType): any
}
