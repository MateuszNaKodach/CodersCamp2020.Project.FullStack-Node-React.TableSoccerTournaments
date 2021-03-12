import { TeamId } from './TeamId';
import { TournamentId } from './TournamentId';
import { DoublesTournament } from './DoublesTournament';
import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';
import { MatchesQueue } from './MatchesQueue';
import { MatchWasQueued } from './event/MatchWasQueued';

export class QueuedMatch {
  readonly matchNumber: number;
  readonly team1Id: TeamId;
  readonly team2Id: TeamId;

  constructor(props: { matchNumber: number; team1Id: TeamId; team2Id: TeamId }) {
    this.matchNumber = props.matchNumber;
    this.team1Id = props.team1Id;
    this.team2Id = props.team2Id;
  }
}

export function pushMatchToQueue(
  tournament: DoublesTournament | undefined,
  queue: MatchesQueue | undefined,
  command: {
    tournamentId: TournamentId;
    matchNumber: number;
    team1Id: TeamId;
    team2Id: TeamId;
  },
  currentTime: Date,
): DomainCommandResult<MatchesQueue> {
  if (tournament === undefined) {
    throw new Error("This tournament doesn't exists.");
  }
  if (command.matchNumber <= 0) {
    throw new Error('Such match number is incorrect!');
  }
  if (queue === undefined) {
    queue = new MatchesQueue({
      tournamentId: command.tournamentId,
      queuedMatches: [],
    });
  }
  if (isMatchAlreadyInQueue(command.matchNumber, queue)) {
    throw new Error('Such match is already waiting in matches queue!');
  }

  const matchToPush = new QueuedMatch({
    matchNumber: command.matchNumber,
    team1Id: command.team1Id,
    team2Id: command.team2Id,
  });

  queue.queuedMatches.push(matchToPush);

  const matchWasQueued = new MatchWasQueued({
    occurredAt: currentTime,
    matchNumber: command.matchNumber,
    team1Id: command.team1Id.raw,
    team2Id: command.team2Id.raw,
  });

  return {
    state: queue,
    events: [matchWasQueued],
  };
}

function isMatchAlreadyInQueue(matchNumber: number, queue: MatchesQueue): boolean {
  return !!queue.queuedMatches.find((elem) => elem.matchNumber === matchNumber);
}
