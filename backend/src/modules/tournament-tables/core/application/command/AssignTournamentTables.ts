export class AssignTournamentTables {
  readonly tournamentId: string;
  readonly tables: { tableNumber: number; tableName: string; availableToPlay?: boolean }[];

  constructor(tournamentId: string, tables: { tableNumber: number; tableName: string; availableToPlay?: boolean }[]) {
    this.tournamentId = tournamentId;
    this.tables = tables;
  }
}
