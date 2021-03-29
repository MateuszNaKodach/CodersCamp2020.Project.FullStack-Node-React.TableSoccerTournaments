import { TablesQueue } from '../../../core/domain/TablesQueue';
import { TablesQueueRepository } from '../../../core/application/TablesQueueRepository';

export class InMemoryTablesQueueRepository implements TablesQueueRepository {
  private readonly entities: { [id: string]: TablesQueue } = {};

  async save(tablesQueue: TablesQueue): Promise<void> {
    this.entities[tablesQueue.tournamentId.raw] = tablesQueue;
  }

  findByTournamentId(tournamentId: string): Promise<TablesQueue | undefined> {
    return Promise.resolve(this.entities[tournamentId]);
  }
}
