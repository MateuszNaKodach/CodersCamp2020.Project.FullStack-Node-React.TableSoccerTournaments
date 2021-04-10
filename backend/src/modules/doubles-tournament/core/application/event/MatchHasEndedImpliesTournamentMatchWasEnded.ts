import { EventHandler } from '../../../../../shared/core/application/event/EventHandler';
import { MatchHasEnded } from '../../../../match-module/core/domain/event/MatchHasEnded';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { TournamentMatchWasEnded } from '../../domain/event/TournamentMatchWasEnded';
import { MatchId } from '../../domain/MatchId';

export class MatchHasEndedImpliesTournamentMatchWasEnded implements EventHandler<MatchHasEnded> {
  constructor(private readonly eventPublisher: DomainEventPublisher, private readonly currentTimeProvider: CurrentTimeProvider) {}

  async handle(event: MatchHasEnded): Promise<void> {
    const matchId = MatchId.fromRaw(event.matchId);
    const tournamentId = matchId.tournamentId;
    const matchNumber = matchId.matchNumber;

    const tournamentMatchWasEnded = new TournamentMatchWasEnded({
      occurredAt: this.currentTimeProvider(),
      tournamentId: tournamentId,
      matchNumber: Number(matchNumber),
      winnerId: event.winnerId,
    });
    this.eventPublisher.publish(tournamentMatchWasEnded);
  }
}
