export class TournamentTablesDto {
  readonly tables: { tableNumber: number; tableName: string }[];

  constructor(tables: { tableNumber: number; tableName: string }[]) {
    this.tables = tables;
  }
}
