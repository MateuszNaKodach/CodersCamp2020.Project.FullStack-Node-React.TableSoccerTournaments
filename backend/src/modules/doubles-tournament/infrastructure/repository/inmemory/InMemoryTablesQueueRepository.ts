import { TablesQueue } from '../../../core/domain/TablesQueue';
import { TablesQueueRepository } from '../../../core/application/TablesQueueRepository';
import { QueuedTable } from '../../../core/domain/QueuedTable';

export class InMemoryTablesQueueRepository implements TablesQueueRepository {
  private readonly entities: { [id: string]: TablesQueue } = {};

  async save(tablesQueue: TablesQueue): Promise<void> {
    this.entities[tablesQueue.tournamentId.raw] = tablesQueue;
  }

  findByTournamentId(tournamentId: string): Promise<TablesQueue | undefined> {
    return Promise.resolve(this.entities[tournamentId]);
  }

  findFreeTablesByTournamentId(tournamentId: string): Promise<QueuedTable[] | undefined> {
    return Promise.resolve(this.entities[tournamentId].queuedTables.filter((table) => table.isFree));
  }
}
