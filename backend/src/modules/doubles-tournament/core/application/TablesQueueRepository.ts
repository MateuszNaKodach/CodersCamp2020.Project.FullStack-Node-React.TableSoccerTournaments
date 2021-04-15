import { TablesQueue } from '../domain/TablesQueue';

export interface TablesQueueRepository {
  save(matchesQueue: TablesQueue, expectedVersion: number): Promise<void>;

  findByTournamentId(tournamentId: string): Promise<{ state: TablesQueue | undefined; version: number }>;
}
