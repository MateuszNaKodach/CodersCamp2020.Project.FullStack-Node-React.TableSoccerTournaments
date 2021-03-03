export class StartMatch {
  readonly matchId: string;
  readonly firstTeamId: string;
  readonly secondTeamId: string;

  constructor(matchId: string, team1: string, team2: string) {
    this.matchId = matchId;
    this.firstTeamId = team1;
    this.secondTeamId = team2;
  }
}
