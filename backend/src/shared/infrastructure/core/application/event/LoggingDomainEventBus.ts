import { DomainEvent } from '../../../../domain/event/DomainEvent';
import { DomainEventBus } from '../../../../core/application/event/DomainEventBus';
import { HasConstructor } from '../../../../../common/HasConstructor';
import { EventHandler } from '../../../../core/application/event/EventHandler';

export class LoggingDomainEventBus implements DomainEventBus {
  constructor(private readonly next: DomainEventBus) {}

  publish(event: DomainEvent): any {
    console.log(`LoggingDomainEventBus | Event published: `, Object.getPrototypeOf(event).constructor.name, JSON.stringify(event));
    return this.next.publish(event);
  }

  publishAll(events: DomainEvent[]): any {
    return events.forEach((event) => this.publish(event));
  }

  registerHandler<EventType extends DomainEvent>(eventType: HasConstructor<EventType>, handler: EventHandler<EventType>): void {
    return this.next.registerHandler<EventType>(eventType, handler);
  }
}
