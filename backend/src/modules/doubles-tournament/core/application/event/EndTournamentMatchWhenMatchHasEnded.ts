import { EventHandler } from '../../../../../shared/core/application/event/EventHandler';
import { MatchHasEnded } from '../../../../match-module/core/domain/event/MatchHasEnded';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { TournamentMatchWasEnded } from '../../domain/event/TournamentMatchWasEnded';

export class EndTournamentMatchWhenMatchHasEnded implements EventHandler<MatchHasEnded> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
  ) {}

  async handle(event: MatchHasEnded): Promise<void> {
    const [tournamentId, matchNumber] = event.matchId.split('_');

    const tournamentMatchWasEnded = new TournamentMatchWasEnded({
      occurredAt: this.currentTimeProvider(),
      tournamentId: tournamentId,
      matchNumber: Number(matchNumber),
      winnerId: event.winnerId,
    });
    this.eventPublisher.publish(tournamentMatchWasEnded);
  }
}
