export class AssignTablesToTournament {
  readonly tournamentId: string;
  readonly tables: { tableNumber: number; tableName: string; isFree?: boolean }[];

  constructor(tournamentId: string, tables: { tableNumber: number; tableName: string; isFree?: boolean }[]) {
    this.tournamentId = tournamentId;
    this.tables = tables;
  }
}
