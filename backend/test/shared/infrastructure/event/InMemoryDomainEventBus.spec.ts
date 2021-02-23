import { DomainEventBus } from "../../../../src/shared/core/application/event/DomainEventBus";
import { InMemoryDomainEventBus } from "../../../../src/shared/infrastructure/core/application/event/InMemoryDomainEventBus";
import { DomainEvent } from "../../../../src/shared/domain/event/DomainEvent";
import { EventHandler } from "../../../../src/shared/core/application/event/EventHandler";
import { MatchWasFinished, TournamentHasStarted } from "./EventsTestFixtures";

/**
 * //HINT
 * Testy bez zagnieżdżania można pisać jak poniżej.
 * Warto oddzielić sekcje GIVEN - WHEN - THEN.
 */
describe('InMemoryDomainEventBus', () => {
  test('given event handlers are registered, when event is published, then all handlers of this event type should be called', () => {
    //Given
    const tournamentHasStartedHandler1 = eventHandlerMock<TournamentHasStarted>();
    const tournamentHasStartedHandler2 = eventHandlerMock<TournamentHasStarted>();
    const matchWasFinishedHandler = eventHandlerMock<MatchWasFinished>();
    const eventBus: DomainEventBus = new InMemoryDomainEventBus()
      .withHandler(TournamentHasStarted, tournamentHasStartedHandler1)
      .withHandler(TournamentHasStarted, tournamentHasStartedHandler2)
      .withHandler(MatchWasFinished, matchWasFinishedHandler);

    //When
    const tournamentHasStarted = new TournamentHasStarted({ occurredAt: new Date() });
    eventBus.publish(tournamentHasStarted);

    //Then
    expect(tournamentHasStartedHandler1.handle).toBeCalledWith(tournamentHasStarted);
    expect(tournamentHasStartedHandler2.handle).toBeCalledWith(tournamentHasStarted);
    expect(matchWasFinishedHandler.handle).not.toBeCalled();
  });

  test('given no handlers registered, when event is published, then no handlers should be called', () => {
    //Given
    const tournamentHasStartedHandler1 = eventHandlerMock<TournamentHasStarted>();
    const eventBus: DomainEventBus = new InMemoryDomainEventBus();
    const tournamentHasStarted = new TournamentHasStarted({ occurredAt: new Date() });

    //When
    eventBus.publish(tournamentHasStarted);

    //Then
    expect(tournamentHasStartedHandler1.handle).not.toBeCalled();
  });
});

function eventHandlerMock<EventType extends DomainEvent>(): EventHandler<EventType> {
  return {
    handle: jest.fn(),
  };
}
