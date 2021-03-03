export class MatchHasStarted {
  readonly occurredAt: Date;
  readonly matchId: string;
  readonly firstTeamId: string;
  readonly secondTeamId: string;

  constructor(props: { occurredAt: Date; matchId: string; firstTeamId: string, secondTeamId: string }) {
    this.occurredAt = props.occurredAt;
    this.matchId = props.matchId;
    this.firstTeamId = props.firstTeamId;
    this.secondTeamId = props.secondTeamId;
  }
}
