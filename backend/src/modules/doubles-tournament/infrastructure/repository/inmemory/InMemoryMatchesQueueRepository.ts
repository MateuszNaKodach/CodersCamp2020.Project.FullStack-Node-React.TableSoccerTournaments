import { MatchesQueueRepository } from '../../../core/application/MatchesQueueRepository';
import { MatchesQueue } from '../../../core/domain/MatchesQueue';

export class InMemoryMatchesQueueRepository implements MatchesQueueRepository {
  private readonly entities: { [id: string]: MatchesQueue } = {};

  findByTournamentId(tournamentId: string): Promise<MatchesQueue | undefined> {
    return Promise.resolve(this.entities[tournamentId]);
  }

  async save(matchesQueue: MatchesQueue): Promise<void> {
    this.entities[matchesQueue.tournamentId.raw] = matchesQueue;
  }
}
