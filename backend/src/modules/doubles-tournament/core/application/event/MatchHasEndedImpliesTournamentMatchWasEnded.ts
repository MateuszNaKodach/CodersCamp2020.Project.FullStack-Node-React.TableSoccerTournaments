import { EventHandler } from '../../../../../shared/core/application/event/EventHandler';
import { MatchHasEnded } from '../../../../match-module/core/domain/event/MatchHasEnded';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { CurrentTimeProvider } from '../../../../../shared/core/CurrentTimeProvider';
import { TournamentMatchWasEnded } from '../../domain/event/TournamentMatchWasEnded';
import { MatchId } from '../../domain/MatchId';
import { changeMatchStatusInMatchesQueue } from '../../domain/QueuedMatch';
import { MatchesQueueRepository } from '../MatchesQueueRepository';
import { MatchNumber } from '../../domain/MatchNumber';
import { TournamentId } from '../../domain/TournamentId';
import { MatchStatus } from '../../domain/MatchStatus';

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

    const { state: matchesQueue, version } = await this.matchesQueueRepository.findByTournamentId(tournamentId);
    const queue = changeMatchStatusInMatchesQueue(
      TournamentId.from(tournamentId),
      MatchNumber.from(matchNumber),
      matchesQueue,
      MatchStatus.ENDED,
    );
    try {
      await this.matchesQueueRepository.save(queue, version);

      const tournamentMatchWasEnded = new TournamentMatchWasEnded({
        occurredAt: this.currentTimeProvider(),
        tournamentId: tournamentId,
        matchNumber: matchNumber,
        winnerId: event.winnerId,
      });
      this.eventPublisher.publish(tournamentMatchWasEnded);
    } catch (e) {
      console.log('Event processing failed due to:', e.message);
    }
  }
}
