export class MatchHasEnded {
  readonly occurredAt: Date;
  readonly matchId: string;
  readonly winnerId: string;
  readonly looserId: string;

  constructor(props: { occurredAt: Date; matchId: string; winnerId: string; looserId: string }) {
    this.occurredAt = props.occurredAt;
    this.matchId = props.matchId;
    this.winnerId = props.winnerId;
    this.looserId = props.looserId;
  }
}
