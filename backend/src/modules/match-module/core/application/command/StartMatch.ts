export class StartMatch {
  readonly matchId: string;
  readonly team1: string;
  readonly team2: string;

  constructor(matchId: string, team1: string, team2: string) {
    this.matchId = matchId;
    this.team1 = team1;
    this.team2 = team2;
  }
}
