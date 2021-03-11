import { QueuedMatch } from './QueuedMatch';
import { TournamentId } from './TournamentId';

export class MatchesQueue {
  readonly tournamentId: TournamentId;
  readonly queuedMatch: QueuedMatch[];

  constructor(tournamentId: TournamentId, queuedMatch: QueuedMatch[]) {
    this.tournamentId = tournamentId;
    this.queuedMatch = queuedMatch;
  }
}
