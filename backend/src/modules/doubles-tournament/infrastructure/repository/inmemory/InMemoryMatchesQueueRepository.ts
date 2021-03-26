import { MatchesQueueRepository } from '../../../core/application/MatchesQueueRepository';
import { MatchesQueue } from '../../../core/domain/MatchesQueue';
import { QueuedMatch } from '../../../core/domain/QueuedMatch';

export class InMemoryMatchesQueueRepository implements MatchesQueueRepository {
  private readonly entities: { [id: string]: MatchesQueue } = {};

  async save(matchesQueue: MatchesQueue): Promise<void> {
    this.entities[matchesQueue.tournamentId.raw] = matchesQueue;
  }

  findByTournamentId(tournamentId: string): Promise<MatchesQueue | undefined> {
    return Promise.resolve(this.entities[tournamentId]);
  }

  findNotStartedMatchesByTournamentId(tournamentId: string): Promise<QueuedMatch[]> {
    return Promise.resolve(this.entities[tournamentId].queuedMatches.filter((match) => !match.started));
  }
}
