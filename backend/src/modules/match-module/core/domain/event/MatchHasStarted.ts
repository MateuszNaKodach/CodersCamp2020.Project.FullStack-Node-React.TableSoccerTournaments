export class MatchHasStarted {
  readonly occurredAt: Date;
  readonly matchId: string;

  constructor(props: { occurredAt: Date; matchId: string; }) {
    this.occurredAt = props.occurredAt;
    this.matchId = props.matchId;
  }
}
