import { DomainEvent } from '../../../../shared/domain/event/DomainEvent';
import { MatchHasStarted } from './event/MatchHasStarted';
import { MatchId } from './MatchId';
import { MatchSideId } from './MatchSideId';

export class Match {
  readonly matchId: MatchId;
  readonly firstTeamId: MatchSideId;
  readonly secondTeamId: MatchSideId;
  readonly winner: MatchSideId | undefined;
  readonly looser: MatchSideId | undefined;
  readonly hasEnded: boolean;

  constructor(props: {
    matchId: MatchId;
    firstTeamId: MatchSideId;
    secondTeamId: MatchSideId;
    winner: MatchSideId | undefined;
    looser: MatchSideId | undefined;
    hasEnded: boolean;
  }) {
    this.matchId = props.matchId;
    this.firstTeamId = props.firstTeamId;
    this.secondTeamId = props.secondTeamId;
    this.winner = props.winner;
    this.looser = props.looser;
    this.hasEnded = props.hasEnded;
  }
}

export function startMatch(
  command: { matchId: string; firstTeamId: string; secondTeamId: string },
  currentTime: Date,
): { events: DomainEvent[] } {
  if (!command.firstTeamId || !command.secondTeamId) {
    throw new Error('Two teams are needed for match to start.');
  }
  return {
    events: [
      new MatchHasStarted({
        occurredAt: currentTime,
        matchId: MatchId.from(command.matchId),
        firstTeamId: MatchSideId.from(command.firstTeamId),
        secondTeamId: MatchSideId.from(command.secondTeamId),
      }),
    ],
  };
}
