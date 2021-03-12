import { QueuedMatch } from './QueuedMatch';
import { TournamentId } from './TournamentId';

export class MatchesQueue {
  readonly tournamentId: TournamentId;
  readonly queuedMatches: QueuedMatch[];

  constructor(props: { tournamentId: TournamentId; queuedMatches: QueuedMatch[] }) {
    this.tournamentId = props.tournamentId;
    this.queuedMatches = props.queuedMatches;
  }
}
