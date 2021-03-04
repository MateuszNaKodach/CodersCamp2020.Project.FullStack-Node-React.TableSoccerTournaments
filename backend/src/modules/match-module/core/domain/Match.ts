import { MatchHasStarted } from './event/MatchHasStarted';
import { MatchId } from './MatchId';
import { MatchSideId } from './MatchSideId';
import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';

export class Match {
  readonly matchId: MatchId;
  readonly firstMatchSideId: MatchSideId;
  readonly secondMatchSideId: MatchSideId;
  readonly winner: MatchSideId | undefined;
  readonly looser: MatchSideId | undefined;
  readonly hasEnded: boolean | undefined = false;

  constructor(props: {
    matchId: MatchId;
    firstMatchSideId: MatchSideId;
    secondMatchSideId: MatchSideId;
    winner?: MatchSideId;
    looser?: MatchSideId;
    hasEnded?: boolean;
  }) {
    this.matchId = props.matchId;
    this.firstMatchSideId = props.firstMatchSideId;
    this.secondMatchSideId = props.secondMatchSideId;
    this.winner = props.winner;
    this.looser = props.looser;
    this.hasEnded = props.hasEnded;
  }
}

export function startMatch(
  state: Match | undefined,
  command: { matchId: MatchId; firstMatchSideId: MatchSideId; secondMatchSideId: MatchSideId },
  currentTime: Date,
): DomainCommandResult<Match> {
  if (state?.matchId !== undefined) {
    throw new Error('Cannot start a match that has already begun.');
  }
  if (command.firstMatchSideId.equals(command.secondMatchSideId)) {
    throw new Error('Cannot start match if opposite teams are the same team.');
  }

  const matchHasStarted = new MatchHasStarted({
    occurredAt: currentTime,
    matchId: command.matchId.raw,
    firstMatchSideId: command.firstMatchSideId.raw,
    secondMatchSideId: command.secondMatchSideId.raw,
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
    firstMatchSideId: MatchSideId.from(event.firstMatchSideId),
    secondMatchSideId: MatchSideId.from(event.secondMatchSideId),
  });
}
