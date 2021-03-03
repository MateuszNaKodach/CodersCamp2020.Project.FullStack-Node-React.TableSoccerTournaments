export class StartMatch {
  readonly matchId: string;
  readonly firstTeamId: string;
  readonly secondTeamId: string;

  constructor(props: { matchId: string; firstTeamId: string; secondTeamId: string }) {
    this.matchId = props.matchId;
    this.firstTeamId = props.firstTeamId;
    this.secondTeamId = props.secondTeamId;
  }
}
