export class AssignTournamentTables {
  readonly tournamentId: string;
  readonly tablesList: { tableNumber: number; tableName: string }[];

  constructor(tournamentId: string, tablesList: { tableNumber: number; tableName: string }[]) {
    this.tournamentId = tournamentId;
    this.tablesList = tablesList;
  }
}
