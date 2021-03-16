export class TournamentTablesDto {
  readonly tables: { tableNumber: number; tableName: string; availableToPlay: boolean }[];

  constructor(tables: { tableNumber: number; tableName: string; availableToPlay: boolean }[]) {
    this.tables = tables;
  }
}
