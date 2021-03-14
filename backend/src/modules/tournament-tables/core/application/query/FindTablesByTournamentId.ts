import { TournamentTable } from '../../domain/TournamentTable';

export class FindTablesByTournamentId {
  readonly tournamentId: string;

  constructor(props: { tournamentId: string }) {
    this.tournamentId = props.tournamentId;
  }
}

export type FindTablesByTournamentIdResult = TournamentTable[];
