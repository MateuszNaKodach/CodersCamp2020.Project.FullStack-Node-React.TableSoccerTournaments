import { MatchHasStarted } from './event/MatchHasStarted';
import { MatchId } from './MatchId';
import { MatchSideId } from './MatchSideId';
import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';

export class Match {
  readonly matchId: MatchId;
  readonly firstTeamId: MatchSideId;
  readonly secondTeamId: MatchSideId;
  readonly winner: MatchSideId | undefined;
  readonly looser: MatchSideId | undefined;
  readonly hasEnded: boolean | undefined = false;

  constructor(props: {
    matchId: MatchId;
    firstTeamId: MatchSideId;
    secondTeamId: MatchSideId;
    winner?: MatchSideId;
    looser?: MatchSideId;
    hasEnded?: boolean;
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
  state: Match | undefined,
  command: { matchId: string; firstTeamId: string; secondTeamId: string },
  currentTime: Date,
): DomainCommandResult<Match> {
  if (state?.matchId !== undefined) {
    throw new Error('Cannot start a match that has already begun.');
  }
  if (!command.firstTeamId || !command.secondTeamId) {
    throw new Error('Two teams are needed for match to start.');
  }

  const matchHasStarted = new MatchHasStarted({
    occurredAt: currentTime,
    matchId: command.matchId,
    firstTeamId: command.firstTeamId,
    secondTeamId: command.secondTeamId,
  });
  const startedMatch = onMatchHasStarted(state, matchHasStarted);

  return {
    state: startedMatch,
    events: [matchHasStarted],
  };
}

function onMatchHasStarted(state: Match | undefined, event: MatchHasStarted): Match {
  return new Match({
    matchId: MatchId.from(event.matchId),
    firstTeamId: MatchSideId.from(event.firstTeamId),
    secondTeamId: MatchSideId.from(event.secondTeamId),
  });
}
