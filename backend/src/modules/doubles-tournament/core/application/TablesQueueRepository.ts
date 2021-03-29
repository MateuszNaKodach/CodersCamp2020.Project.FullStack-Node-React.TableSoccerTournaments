import { TablesQueue } from '../domain/TablesQueue';

export interface TablesQueueRepository {
  save(tablesQueue: TablesQueue): Promise<void>;

  findByTournamentId(tournamentId: string): Promise<TablesQueue | undefined>;
}
