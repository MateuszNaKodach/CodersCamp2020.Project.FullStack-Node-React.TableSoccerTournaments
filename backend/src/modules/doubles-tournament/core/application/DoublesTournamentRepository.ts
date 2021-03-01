import { DoublesTournament } from '../domain/DoublesTournament';
import { TournamentTeam } from '../domain/TournamentTeam';

export interface DoublesTournamentRepository {
  save(tournament: DoublesTournament): Promise<void>;

  findByTournamentId(tournamentId: string): Promise<DoublesTournament | undefined>;

  findAll(): Promise<DoublesTournament[]>;

  findAllTeamsByTournamentId(tournamentId: string): Promise<TournamentTeam[] | undefined>;
}
