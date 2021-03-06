import { TournamentTable } from '../domain/TournamentTable';

export interface TournamentTablesRepository {
  save(tournamentTable: TournamentTable): Promise<void>;

  saveAll(tournamentTables: TournamentTable[]): Promise<void>;

  findByTournamentId(tournamentId: string): Promise<TournamentTable[] | undefined>;
}
