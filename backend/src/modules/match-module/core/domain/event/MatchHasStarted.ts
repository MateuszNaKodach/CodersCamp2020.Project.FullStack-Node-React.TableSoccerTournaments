import { MatchId } from '../MatchId';
import { MatchSideId } from '../MatchSideId';

export class MatchHasStarted {
  readonly occurredAt: Date;
  readonly matchId: string;
  readonly firstMatchSideId: string;
  readonly secondMatchSideId: string;

  constructor(props: { occurredAt: Date; matchId: string; firstMatchSideId: string; secondMatchSideId: string }) {
    this.occurredAt = props.occurredAt;
    this.matchId = props.matchId;
    this.firstMatchSideId = props.firstMatchSideId;
    this.secondMatchSideId = props.secondMatchSideId;
  }
}
