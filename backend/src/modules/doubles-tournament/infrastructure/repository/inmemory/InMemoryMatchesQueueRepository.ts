import { MatchesQueueRepository } from '../../../core/application/MatchesQueueRepository';
import { MatchesQueue } from '../../../core/domain/MatchesQueue';
import { OptimisticLockingException } from '../../../../../shared/core/application/OptimisticLockingException';

export class InMemoryMatchesQueueRepository implements MatchesQueueRepository {
  private readonly entities: { [id: string]: { state: MatchesQueue; version: number } } = {};

  async save(matchesQueue: MatchesQueue, expectedVersion: number): Promise<void> {
    if ((this.entities[matchesQueue.tournamentId.raw]?.version ?? 0) !== expectedVersion) {
      return Promise.reject(new OptimisticLockingException(expectedVersion));
    }
    this.entities[matchesQueue.tournamentId.raw] = { state: matchesQueue, version: expectedVersion + 1 };
  }

  findByTournamentId(tournamentId: string): Promise<{ state: MatchesQueue | undefined; version: number }> {
    const result = this.entities[tournamentId];
    return Promise.resolve(result ?? { state: undefined, version: 0 });
  }
}
