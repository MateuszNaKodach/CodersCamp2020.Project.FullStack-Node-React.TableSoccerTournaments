import { TournamentRegistrations } from '../../domain/TournamentRegistrations';

export class FindTournamentRegistrationsById {
  readonly tournamentId: string;

  constructor(props: { tournamentId: string }) {
    this.tournamentId = props.tournamentId;
  }
}

export type FindTournamentRegistrationsByIdResult = TournamentRegistrations | undefined;
