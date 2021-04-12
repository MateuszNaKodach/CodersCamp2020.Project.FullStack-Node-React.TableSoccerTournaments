import { EventHandler } from '../../../../../shared/core/application/event/EventHandler';
import { MatchHasEnded } from '../../../../match-module/core/domain/event/MatchHasEnded';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { TournamentMatchWasEnded } from '../../domain/event/TournamentMatchWasEnded';
import { MatchId } from '../../domain/MatchId';
import { endMatchInMatchesQueue } from '../../domain/QueuedMatch';
import { MatchesQueueRepository } from '../MatchesQueueRepository';
import { MatchNumber } from '../../domain/MatchNumber';
import { TournamentId } from '../../domain/TournamentId';

export class MatchHasEndedImpliesTournamentMatchWasEnded implements EventHandler<MatchHasEnded> {
  constructor(
    private readonly eventPublisher: DomainEventPublisher,
    private readonly currentTimeProvider: CurrentTimeProvider,
    private readonly matchesQueueRepository: MatchesQueueRepository,
  ) {}

  async handle(event: MatchHasEnded): Promise<void> {
    const matchId = MatchId.fromRaw(event.matchId);
    const tournamentId = matchId.tournamentId;
    const matchNumber = matchId.matchNumber;

    const matchesQueue = await this.matchesQueueRepository.findByTournamentId(tournamentId);
    const queue = endMatchInMatchesQueue(TournamentId.from(tournamentId), MatchNumber.from(matchNumber), matchesQueue);
    await this.matchesQueueRepository.save(queue);

    const tournamentMatchWasEnded = new TournamentMatchWasEnded({
      occurredAt: this.currentTimeProvider(),
      tournamentId: tournamentId,
      matchNumber: matchNumber,
      winnerId: event.winnerId,
    });
    this.eventPublisher.publish(tournamentMatchWasEnded);
  }
}
