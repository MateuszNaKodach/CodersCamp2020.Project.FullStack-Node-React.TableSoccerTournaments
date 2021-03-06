import { TournamentTablesRepository } from '../../../application/TournamentTablesRepository';
import { TournamentTable } from '../../../domain/TournamentTable';

export class InMemoryTournamentTablesRepository implements TournamentTablesRepository {
  private readonly entities: { [tableId: string]: TournamentTable } = {};

  async save(tournamentTable: TournamentTable): Promise<void> {
    const tableId = `${tournamentTable.tournamentId}_${tournamentTable.tableNumber}`;
    this.entities[tableId] = tournamentTable;
  }

  async saveAll(tournamentTables: TournamentTable[]): Promise<void> {
    tournamentTables.forEach((table) => this.save(table));
  }

  findByTournamentId(tournamentId: string): Promise<TournamentTable[]> {
    return Promise.resolve(
      Object.keys(this.entities)
        .filter((id) => this.entities[id].tournamentId === tournamentId)
        .map((id) => this.entities[id]),
    );
  }

  findAll(): Promise<TournamentTable[]> {
    return Promise.resolve(Object.keys(this.entities).map((id) => this.entities[id]));
  }
}
