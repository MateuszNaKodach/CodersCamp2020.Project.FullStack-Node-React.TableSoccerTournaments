import { TeamId } from './TeamId';
import { TournamentId } from './TournamentId';
import { DoublesTournament } from './DoublesTournament';
import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';
import { MatchesQueue } from './MatchesQueue';
import { MatchWasQueued } from './event/MatchWasQueued';
import { MatchNumber } from './MatchNumber';

export class QueuedMatch {
  readonly matchNumber: MatchNumber;
  readonly team1Id: TeamId;
  readonly team2Id: TeamId;

  constructor(props: { matchNumber: MatchNumber; team1Id: TeamId; team2Id: TeamId }) {
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
  if (isMatchAlreadyInQueue(command.matchNumber.raw, queue)) {
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
    matchNumber: command.matchNumber.raw,
    team1Id: command.team1Id.raw,
    team2Id: command.team2Id.raw,
  });

  return {
    state: queue,
    events: [matchWasQueued],
  };
}

function isMatchAlreadyInQueue(matchNumber: number, queue: MatchesQueue): boolean {
  return !!queue.queuedMatches.find((elem) => elem.matchNumber.raw === matchNumber);
}
