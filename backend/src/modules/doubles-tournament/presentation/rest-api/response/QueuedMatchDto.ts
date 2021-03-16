export class QueuedMatchDto {
  readonly matchNumber: number;
  readonly team1Id: string;
  readonly team2Id: string;

  constructor(matchNumber: number, team1Id: string, team2Id: string) {
    this.matchNumber = matchNumber;
    this.team1Id = team1Id;
    this.team2Id = team2Id;
  }
}
