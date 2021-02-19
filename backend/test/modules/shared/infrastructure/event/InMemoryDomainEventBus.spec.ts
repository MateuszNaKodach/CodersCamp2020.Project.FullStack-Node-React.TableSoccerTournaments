import {DomainEventBus} from "../../../../../src/modules/shared/application/event/DomainEventBus";
import {InMemoryDomainEventBus} from "../../../../../src/modules/shared/infrastructure/event/InMemoryDomainEventBus";
import {DomainEvent} from "../../../../../src/modules/shared/domain/event/DomainEvent";
import {CommandHandler} from "../../../../../src/modules/shared/application/command/CommandHandler";
import {CommandResult} from "../../../../../src/modules/shared/application/command/CommandResult";
import {EventHandler} from "../../../../../src/modules/shared/application/event/EventHandler";

describe('InMemoryDomainEventBus', () => {

  it('when event is published, then all handlers of this event type should be executed', () => {
    const eventBus: DomainEventBus = new InMemoryDomainEventBus();

    const tournamentHasStartedHandler1: EventHandler<TournamentHasStarted> = {
      handle: jest.fn()
    }
    const tournamentHasStartedHandler2: EventHandler<TournamentHasStarted> = {
      handle: jest.fn()
    }
    const matchWasFinishedHandler: EventHandler<MatchWasFinished> = {
      handle: jest.fn()
    }
    eventBus.registerHandler(TournamentHasStarted, tournamentHasStartedHandler1);
    eventBus.registerHandler(TournamentHasStarted, tournamentHasStartedHandler2);
    eventBus.registerHandler(MatchWasFinished, matchWasFinishedHandler);

    const tournamentHasStarted = new TournamentHasStarted({eventId: 'eventId', occurredAt: new Date()});
    eventBus.publish(tournamentHasStarted);

    expect(tournamentHasStartedHandler1.handle).toBeCalledWith(tournamentHasStarted);
    expect(tournamentHasStartedHandler2.handle).toBeCalledWith(tournamentHasStarted);
    expect(matchWasFinishedHandler.handle).not.toBeCalled();
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
