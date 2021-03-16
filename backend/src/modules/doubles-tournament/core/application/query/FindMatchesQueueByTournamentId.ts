import { MatchesQueue } from '../../domain/MatchesQueue';

export class FindMatchesQueueByTournamentId {
  readonly tournamentId: string;

  constructor(props: { tournamentId: string }) {
    this.tournamentId = props.tournamentId;
  }
}

export type FindMatchesQueueByTournamentIdResult = MatchesQueue | undefined;
