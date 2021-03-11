import { TeamId } from './TeamId';
import { TournamentId } from './TournamentId';
import { DoublesTournament } from './DoublesTournament';
import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';
import { MatchesQueue } from './MatchesQueue';
import { MatchWasQueued } from './event/MatchWasQueued';

export class QueuedMatch {
  readonly tournamentId: TournamentId;
  readonly matchNumber: number;
  readonly team1Id: TeamId;
  readonly team2Id: TeamId;

  constructor(props: { tournamentId: TournamentId; matchNumber: number; team1Id: TeamId; team2Id: TeamId }) {
    this.tournamentId = props.tournamentId;
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
    queue = new MatchesQueue(command.tournamentId, []);
  }

  const matchToPush = new QueuedMatch({
    tournamentId: command.tournamentId,
    matchNumber: command.matchNumber,
    team1Id: command.team1Id,
    team2Id: command.team2Id,
  });

  queue.queuedMatch.push(matchToPush);

  const matchWasQueued = new MatchWasQueued({
    occurredAt: currentTime,
    tournamentId: command.tournamentId.raw,
    team1Id: command.team1Id.raw,
    team2Id: command.team2Id.raw,
  });

  return {
    state: queue,
    events: [matchWasQueued],
  };
}
