export class AssignTournamentTables {
  readonly tournamentId: string;
  readonly tables: { tableNumber: number; tableName: string }[];

  constructor(tournamentId: string, tables: { tableNumber: number; tableName: string }[]) {
    this.tournamentId = tournamentId;
    this.tables = tables;
  }
}
