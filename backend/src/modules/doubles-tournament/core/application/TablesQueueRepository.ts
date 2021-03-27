import { TablesQueue } from '../domain/TablesQueue';
import { QueuedTable } from '../domain/QueuedTable';

export interface TablesQueueRepository {
  save(tablesQueue: TablesQueue): Promise<void>;

  findByTournamentId(tournamentId: string): Promise<TablesQueue | undefined>;

  findFreeTablesByTournamentId(tournamentId: string): Promise<QueuedTable[]>;
}
