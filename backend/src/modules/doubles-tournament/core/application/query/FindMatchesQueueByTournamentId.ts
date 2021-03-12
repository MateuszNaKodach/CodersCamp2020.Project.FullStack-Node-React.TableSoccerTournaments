import { MatchesQueue } from '../../domain/MatchesQueue';

export class FindMatchesQueueByTournamentById {
  readonly tournamentId: string;

  constructor(props: { tournamentId: string }) {
    this.tournamentId = props.tournamentId;
  }
}

export type FindMatchesQueueByTournamentByIdResult = MatchesQueue | undefined;
