export class TournamentTablesDto {
  readonly tables: { tableNumber: number; tableName: string; isFree: boolean }[];

  constructor(tables: { tableNumber: number; tableName: string; isFree: boolean }[]) {
    this.tables = tables;
  }
}
