import { MatchHasStarted } from './event/MatchHasStarted';
import { MatchId } from './MatchId';
import { MatchSideId } from './MatchSideId';
import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';
import {MatchHasEnded} from "./event/MatchHasEnded";

export class Match {
  readonly matchId: MatchId;
  readonly firstMatchSideId: MatchSideId;
  readonly secondMatchSideId: MatchSideId;
  readonly winner: MatchSideId | undefined;

  constructor(props: { matchId: MatchId; firstMatchSideId: MatchSideId; secondMatchSideId: MatchSideId; winner?: MatchSideId }) {
    this.matchId = props.matchId;
    this.firstMatchSideId = props.firstMatchSideId;
    this.secondMatchSideId = props.secondMatchSideId;
    this.winner = props.winner;
  }

  getLooser(winner: MatchSideId):MatchSideId | undefined {
    return winner.equals(this.firstMatchSideId) ? this.secondMatchSideId : this.firstMatchSideId
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

export function endMatch(
    state: Match | undefined,
    command: { matchId: MatchId; winner: MatchSideId; },
    currentTime: Date,
): DomainCommandResult<Match> {
  if (!state?.matchId) {
    throw new Error('Cannot end match that hasn\'t started.')
  }
  if (!state.firstMatchSideId.equals(command.winner) && !state.secondMatchSideId.equals(command.winner)) {
    throw new Error('One of the participating teams must be a winner.')
  }

  const matchHasEnded = new MatchHasEnded({
    occurredAt: currentTime,
    matchId: command.matchId.raw,
    winner: command.winner.raw,
    looser: state.getLooser(command.winner)?.raw,
  });

  const endedMatch = onMatchHasEnded(state, matchHasEnded);

  return {
    state: endedMatch,
    events: [matchHasEnded],
  };
}


function onMatchHasStarted(state: Match | undefined, event: MatchHasStarted): Match {
  return new Match({
    matchId: MatchId.from(event.matchId),
    firstMatchSideId: MatchSideId.from(event.firstMatchSideId),
    secondMatchSideId: MatchSideId.from(event.secondMatchSideId),
  });
}

function onMatchHasEnded(state: Match, event: MatchHasEnded): Match {
  return new Match({
    matchId: MatchId.from(event.matchId),
    firstMatchSideId: state.firstMatchSideId,
    secondMatchSideId: state.secondMatchSideId,
    winner: MatchSideId.from(event.winner),
  })
}
