export class MatchHasStarted {
  occurredAt: Date;
  matchId: string;
  team1: string;
  team2: string;

  constructor(props: { occurredAt: Date; matchId: string; team1: string; team2: string }) {
    this.occurredAt = props.occurredAt;
    this.matchId = props.matchId;
    this.team1 = props.team1;
    this.team2 = props.team2;
  }
}
