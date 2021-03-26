import { MatchesQueue } from '../domain/MatchesQueue';
import { QueuedMatch } from '../domain/QueuedMatch';

export interface MatchesQueueRepository {
  save(matchesQueue: MatchesQueue): Promise<void>;

  findByTournamentId(tournamentId: string): Promise<MatchesQueue | undefined>;

  findNotStartedMatchesByTournamentId(tournamentId: string): Promise<QueuedMatch[]>;
}
