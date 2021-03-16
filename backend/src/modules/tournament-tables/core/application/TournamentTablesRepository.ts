import { TournamentTable } from '../domain/TournamentTable';

export interface TournamentTablesRepository {
  save(tournamentTable: TournamentTable): Promise<void>;

  saveAll(tournamentTables: TournamentTable[]): Promise<void>;

  findByTournamentIdAndTableNumber(tournamentId: string, tableNumber: number): Promise<TournamentTable | undefined>;

  findAllByTournamentId(tournamentId: string): Promise<TournamentTable[]>;
}
