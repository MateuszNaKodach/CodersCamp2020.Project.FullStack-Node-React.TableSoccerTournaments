export class QueuedMatchDto {
  readonly matchNumber: number;
  readonly team1Id: string;
  readonly team2Id: string;
  readonly tableNumber: number | undefined;
  readonly started: boolean;

  constructor(matchNumber: number, team1Id: string, team2Id: string, tableNumber: number | undefined, started: boolean) {
    this.matchNumber = matchNumber;
    this.team1Id = team1Id;
    this.team2Id = team2Id;
    this.tableNumber = tableNumber;
    this.started = started;
  }
}
