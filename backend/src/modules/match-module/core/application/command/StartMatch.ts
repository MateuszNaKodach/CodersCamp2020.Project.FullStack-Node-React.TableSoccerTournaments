export class StartMatch {
  readonly matchId: string;
  readonly firstMatchSideId: string;
  readonly secondMatchSideId: string;

  constructor(props: { matchId: string; firstMatchSideId: string; secondMatchSideId: string }) {
    this.matchId = props.matchId;
    this.firstMatchSideId = props.firstMatchSideId;
    this.secondMatchSideId = props.secondMatchSideId;
  }
}
