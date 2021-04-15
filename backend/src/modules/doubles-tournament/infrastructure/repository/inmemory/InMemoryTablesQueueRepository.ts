import { TablesQueue } from '../../../core/domain/TablesQueue';
import { TablesQueueRepository } from '../../../core/application/TablesQueueRepository';
import { OptimisticLockingException } from '../../../../../shared/core/application/OptimisticLockingException';

export class InMemoryTablesQueueRepository implements TablesQueueRepository {
  private readonly entities: { [id: string]: { state: TablesQueue; version: number } } = {};

  async save(tablesQueue: TablesQueue, expectedVersion: number): Promise<void> {
    if ((this.entities[tablesQueue.tournamentId.raw]?.version ?? 0) !== expectedVersion) {
      return Promise.reject(new OptimisticLockingException(expectedVersion));
    }
    this.entities[tablesQueue.tournamentId.raw] = { state: tablesQueue, version: expectedVersion + 1 };
  }

  findByTournamentId(tournamentId: string): Promise<{ state: TablesQueue | undefined; version: number }> {
    const result = this.entities[tournamentId];
    return Promise.resolve(result ?? { state: undefined, version: 0 });
  }
}
