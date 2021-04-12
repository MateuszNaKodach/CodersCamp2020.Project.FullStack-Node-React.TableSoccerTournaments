import { QueuedMatch } from './QueuedMatch';
import { TournamentId } from './TournamentId';
import { MatchNumber } from './MatchNumber';
import { MatchStatus } from './MatchStatus';

export class MatchesQueue {
  readonly tournamentId: TournamentId;
  private readonly queue: QueuedMatch[];

  constructor(props: { tournamentId: TournamentId; queuedMatches: QueuedMatch[] }) {
    this.tournamentId = props.tournamentId;
    this.queue = props.queuedMatches;
  }

  withEnqueuedMatch(match: QueuedMatch): MatchesQueue {
    if (this.isMatchAlreadyInQueue(match)) {
      throw new Error('Such match is already waiting in matches queue!');
    }
    return new MatchesQueue({
      tournamentId: this.tournamentId,
      queuedMatches: [...this.queue, match],
    });
  }

  private isMatchAlreadyInQueue(match: QueuedMatch): boolean {
    return !!this.queue.find((elem) => elem.matchNumber.raw === match.matchNumber.raw);
  }

  get queuedMatches(): QueuedMatch[] {
    return [...this.queue];
  }

  withStatusChangedMatch(matchNumber: MatchNumber, status: MatchStatus, tableNumber?: number): MatchesQueue {
    const queue = this.queuedMatches.map((queuedMatch) => {
      if (queuedMatch.matchNumber.raw === matchNumber.raw) {
        queuedMatch.status = status;
        if (tableNumber) {
          queuedMatch.tableNumber = tableNumber;
        }
      }
      return queuedMatch;
    });
    return new MatchesQueue({
      tournamentId: this.tournamentId,
      queuedMatches: [...queue],
    });
  }
}
