export class MatchDto {
  readonly matchId: string;
  readonly firstMatchSideId: string;
  readonly secondMatchSideId: string;
  readonly winnerId: string | undefined;

  constructor(props: { matchId: string; firstMatchSideId: string; secondMatchSideId: string, winnerId: string | undefined }) {
    this.matchId = props.matchId;
    this.firstMatchSideId = props.firstMatchSideId;
    this.secondMatchSideId = props.secondMatchSideId;
    this.winnerId = props.winnerId;
  }
}
