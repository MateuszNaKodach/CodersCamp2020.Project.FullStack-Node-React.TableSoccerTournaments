export class StartMatch {
  readonly matchId: string;
  readonly firstTeamId: string;
  readonly secondTeamId: string;

  constructor(matchId: string, firstTeamId: string, secondTeamId: string) {
    this.matchId = matchId;
    this.firstTeamId = firstTeamId;
    this.secondTeamId = secondTeamId;
  }
}
