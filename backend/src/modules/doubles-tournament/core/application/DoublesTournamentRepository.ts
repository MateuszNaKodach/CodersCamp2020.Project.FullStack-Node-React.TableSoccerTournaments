import {DoublesTournament} from '../domain/DoublesTournament';

export interface DoublesTournamentRepository {
  save(tournament: DoublesTournament): Promise<void>;

  findByTournamentId(tournamentId: string): Promise<DoublesTournament | undefined>;

  findAll(): Promise<DoublesTournament[]>;
}
