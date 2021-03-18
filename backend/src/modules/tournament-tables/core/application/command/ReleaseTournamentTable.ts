export class ReleaseTournamentTable {
  readonly tournamentId: string;
  readonly tableNumber: number;

  constructor(tournamentId: string, tableNumber: number) {
    this.tournamentId = tournamentId;
    this.tableNumber = tableNumber;
  }
}
