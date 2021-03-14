import { TournamentTablesRepository } from '../../../core/application/TournamentTablesRepository';
import { TournamentTable } from '../../../core/domain/TournamentTable';

export class InMemoryTournamentTablesRepository implements TournamentTablesRepository {
  private readonly entities: { [tableId: string]: TournamentTable } = {};

  async save(tournamentTable: TournamentTable): Promise<void> {
    const tableId = `${tournamentTable.tournamentId}_${tournamentTable.tableNumber.raw}`;
    this.entities[tableId] = tournamentTable;
  }

  async saveAll(tournamentTables: TournamentTable[]): Promise<void> {
    Promise.all(tournamentTables.map((table) => this.save(table)));
  }

  findAllByTournamentId(tournamentId: string): Promise<TournamentTable[]> {
    return Promise.resolve(
      Object.keys(this.entities)
        .filter((id) => this.entities[id].tournamentId === tournamentId)
        .map((id) => this.entities[id]),
    );
  }
}
