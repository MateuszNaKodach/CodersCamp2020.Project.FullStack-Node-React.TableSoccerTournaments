import { TablesQueue } from '../domain/TablesQueue';
import { QueuedTable } from '../domain/QueuedTable';

export interface TablesQueueRepository {
  save(tablesQueue: TablesQueue): Promise<void>;

  findFreeTablesByTournamentId(tournamentId: string): Promise<QueuedTable[]>;
}
