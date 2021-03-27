import { TeamId } from './TeamId';
import { TournamentId } from './TournamentId';
import { DoublesTournament } from './DoublesTournament';
import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';
import { MatchesQueue } from './MatchesQueue';
import { MatchWasQueued } from './event/MatchWasQueued';
import { MatchNumber } from './MatchNumber';
import { isDefined } from '../../../../common/Defined';

export class QueuedMatch {
  readonly matchNumber: MatchNumber;
  readonly team1Id: TeamId;
  readonly team2Id: TeamId;
  readonly tableNumber: number | undefined;
  readonly started: boolean;

  constructor(props: { matchNumber: MatchNumber; team1Id: TeamId; team2Id: TeamId; tableNumber?: number | undefined; started?: boolean }) {
    this.matchNumber = props.matchNumber;
    this.team1Id = props.team1Id;
    this.team2Id = props.team2Id;
    this.tableNumber = props.tableNumber;
    this.started = isDefined(props.started) ? props.started : false;
  }
}

export function pushMatchToQueue(
  tournament: DoublesTournament | undefined,
  queue: MatchesQueue | undefined,
  command: {
    tournamentId: TournamentId;
    matchNumber: MatchNumber;
    team1Id: TeamId;
    team2Id: TeamId;
  },
  currentTime: Date,
): DomainCommandResult<MatchesQueue> {
  if (tournament === undefined) {
    throw new Error("This tournament doesn't exists.");
  }
  if (queue === undefined) {
    queue = new MatchesQueue({
      tournamentId: command.tournamentId,
      queuedMatches: [],
    });
  }

  const matchToPush = new QueuedMatch({
    matchNumber: command.matchNumber,
    team1Id: command.team1Id,
    team2Id: command.team2Id,
  });

  const matchWasQueued = new MatchWasQueued({
    occurredAt: currentTime,
    tournamentId: command.tournamentId.raw,
    matchNumber: command.matchNumber.raw,
    team1Id: command.team1Id.raw,
    team2Id: command.team2Id.raw,
  });

  return {
    state: queue.withEnqueuedMatch(matchToPush),
    events: [matchWasQueued],
  };
}

export function updateStartedMatchInQueue(
  tournamentId: TournamentId,
  match: QueuedMatch,
  matchesQueue: MatchesQueue | undefined,
): MatchesQueue {
  if (!tournamentId || !matchesQueue) {
    throw new Error("Tournament or its queue doesn't exists.");
  }

  const startedMatch = new QueuedMatch({
    matchNumber: match.matchNumber,
    team1Id: match.team1Id,
    team2Id: match.team2Id,
  });

  return matchesQueue.withUpdatedMatch(startedMatch);
}
