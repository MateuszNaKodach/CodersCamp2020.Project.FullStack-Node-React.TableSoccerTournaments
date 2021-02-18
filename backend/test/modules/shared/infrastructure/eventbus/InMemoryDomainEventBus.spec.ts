import {DomainEventBus} from "../../../../../src/modules/shared/application/eventbus/DomainEventBus";
import {InMemoryDomainEventBus} from "../../../../../src/modules/shared/infrastructure/eventbus/InMemoryDomainEventBus";
import {DomainEvent} from "../../../../../src/modules/shared/application/eventbus/DomainEvent";

describe('InMemoryDomainEventBus', () => {
  const eventBus: DomainEventBus = new InMemoryDomainEventBus();

  it('when event is published, then all handlers of this event type should be executed', () => {
    const sampleDomainEventHandler1 = jest.fn();
    const sampleDomainEventHandler2 = jest.fn();
    const anotherEventHandler = jest.fn();
    eventBus.handle<TournamentHasStarted>(TournamentHasStarted.eventType, sampleDomainEventHandler1);
    eventBus.handle<TournamentHasStarted>(TournamentHasStarted.eventType, sampleDomainEventHandler2);
    eventBus.handle<MatchWasFinished>(MatchWasFinished.eventType, anotherEventHandler);

    const squareWasClickedEvent = new TournamentHasStarted({eventId: 'eventId', occurredAt: new Date()});
    eventBus.publish(squareWasClickedEvent);

    expect(sampleDomainEventHandler1).toBeCalledWith(squareWasClickedEvent);
    expect(sampleDomainEventHandler2).toBeCalledWith(squareWasClickedEvent);
    expect(anotherEventHandler).not.toBeCalled();
  });
});

class TournamentHasStarted implements DomainEvent {
  static readonly eventType: string = 'TournamentHasStarted';
  readonly eventId: string;
  readonly occurredAt: Date;

  constructor(props: { eventId: string, occurredAt: Date }) {
    this.eventId = props.eventId;
    this.occurredAt = props.occurredAt;
  }

  get eventType(): string {
    return TournamentHasStarted.eventType;
  }
}

class MatchWasFinished implements DomainEvent {
  static readonly eventType: string = 'MatchWasFinished';
  readonly eventId: string;
  readonly occurredAt: Date;

  constructor(props: { eventId: string, occurredAt: Date }) {
    this.eventId = props.eventId;
    this.occurredAt = props.occurredAt;
  }

  get eventType(): string {
    return TournamentHasStarted.eventType;
  }
}
