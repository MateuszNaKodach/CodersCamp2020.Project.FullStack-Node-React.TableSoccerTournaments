import { MatchesQueueRepository } from '../../../application/MatchesQueueRepository';
import { MatchesQueue } from '../../../domain/MatchesQueue';

export class InMemoryMatchesQueueRepository implements MatchesQueueRepository {
  private readonly entities: { [id: string]: MatchesQueue } = {};

  findByTournamentId(tournamentId: string): Promise<MatchesQueue | undefined> {
    return Promise.resolve(undefined);
  }

  async save(matchesQueue: MatchesQueue): Promise<void> {
    this.entities[matchesQueue.tournamentId] = matchesQueue;
  }
}
