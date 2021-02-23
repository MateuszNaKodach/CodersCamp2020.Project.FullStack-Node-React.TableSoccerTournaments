import { DomainEventPublisher } from "../../../../src/shared/core/application/event/DomainEventBus";
import { DomainEvent } from "../../../../src/shared/domain/event/DomainEvent";

export function DomainEventPublisherMock(): DomainEventPublisher {
  const publishMock = jest.fn();
  return {
    publish: publishMock,
    publishAll(events: DomainEvent[]): any {
      events.forEach((event) => publishMock(event));
    },
  };
}
