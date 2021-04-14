import { MatchesQueue } from '../domain/MatchesQueue';

export interface MatchesQueueRepository {
  save(matchesQueue: MatchesQueue, expectedVersion: number): Promise<void>;

  findByTournamentId(tournamentId: string): Promise<{ state: MatchesQueue | undefined; version: number }>;
}
