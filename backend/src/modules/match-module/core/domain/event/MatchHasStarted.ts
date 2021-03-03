import {MatchId} from "../MatchId";
import {MatchSideId} from "../MatchSideId";

export class MatchHasStarted {
  readonly occurredAt: Date;
  readonly matchId: MatchId;
  readonly firstTeamId: MatchSideId;
  readonly secondTeamId: MatchSideId;

  constructor(props: { occurredAt: Date; matchId: MatchId; firstTeamId: MatchSideId; secondTeamId: MatchSideId }) {
    this.occurredAt = props.occurredAt;
    this.matchId = props.matchId;
    this.firstTeamId = props.firstTeamId;
    this.secondTeamId = props.secondTeamId;
  }
}
