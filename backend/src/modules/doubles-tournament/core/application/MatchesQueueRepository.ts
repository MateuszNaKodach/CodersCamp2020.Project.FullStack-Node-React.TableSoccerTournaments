import { MatchesQueue } from '../domain/MatchesQueue';

export interface MatchesQueueRepository {
  save(matchesQueue: MatchesQueue): Promise<void>;

  findByTournamentId(tournamentId: string): Promise<MatchesQueue | undefined>;
}
