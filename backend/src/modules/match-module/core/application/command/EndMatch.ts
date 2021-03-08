export class EndMatch {
  readonly matchId: string;
  readonly winnerId: string;

  constructor(props: { matchId: string; winnerId: string }) {
    this.matchId = props.matchId;
    this.winnerId = props.winnerId;
  }
}
