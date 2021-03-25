import { TablesQueue } from '../domain/TablesQueue';

export interface TablesQueueRepository {
  save(tablesQueue: TablesQueue): Promise<void>;

  findFreeTablesByTournamentId(tournamentId: string): Promise<TablesQueue[]>;
}
