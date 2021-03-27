import { TournamentTableWasReleased } from '../../../../tournament-tables/core/domain/event/TournamentTableWasReleased';
import { EventHandler } from '../../../../../shared/core/application/event/EventHandler';
import { TournamentId } from '../../domain/TournamentId';
import { MatchesQueueRepository } from '../MatchesQueueRepository';
import { MatchWasCalled } from '../../domain/event/MatchWasCalled';
import { QueuedMatch, updateStartedMatchInQueue } from '../../domain/QueuedMatch';
import { MatchNumber } from '../../domain/MatchNumber';
import { TeamId } from '../../domain/TeamId';

export class UpdateStartedMatchInQueueWhenMatchWasCalled implements EventHandler<TournamentTableWasReleased> {
  private readonly matchesQueueRepository: MatchesQueueRepository;

  constructor(matchesQueueRepository: MatchesQueueRepository) {
    this.matchesQueueRepository = matchesQueueRepository;
  }

  async handle(event: MatchWasCalled): Promise<void> {
    const tournamentId = TournamentId.from(event.tournamentId);
    const startedMatch: QueuedMatch = {
      matchNumber: MatchNumber.from(event.calledMatch.matchNumber),
      team1Id: TeamId.from(event.calledMatch.team1Id),
      team2Id: TeamId.from(event.calledMatch.team2Id),
      tableNumber: event.tableNumber,
      started: true,
    };
    const matchesQueue = await this.matchesQueueRepository.findByTournamentId(tournamentId.raw);
    const queue = updateStartedMatchInQueue(tournamentId, startedMatch, matchesQueue);

    await this.matchesQueueRepository.save(queue);
  }
}
