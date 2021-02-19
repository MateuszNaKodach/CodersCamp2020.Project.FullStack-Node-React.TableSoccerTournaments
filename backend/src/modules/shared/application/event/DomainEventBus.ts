import {DomainEvent} from '../../domain/event/DomainEvent';
import {HasConstructor} from "../../../../common/HasConstructor";
import {EventHandler} from "./EventHandler";

export interface DomainEventSubscriber {
  registerHandler<EventType extends DomainEvent>(eventType: HasConstructor<EventType>, handler: EventHandler<EventType>): void;
}

export interface DomainEventPublisher {
  publish(event: DomainEvent): any;
}

export interface DomainEventBus extends DomainEventSubscriber, DomainEventPublisher {
}
