import { TableNumber } from '../../domain/TableNumber';

export class AddTournamentTables {
  readonly tournamentId: string;
  readonly tablesList: { tableNumber: TableNumber; tableName: string }[];

  constructor(tournamentId: string, tablesList: { tableNumber: TableNumber; tableName: string }[]) {
    this.tournamentId = tournamentId;
    this.tablesList = tablesList;
  }
}
