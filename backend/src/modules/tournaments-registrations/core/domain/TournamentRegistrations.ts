import {TournamentId} from "./TournamentId";
import {DomainEvent} from "../../../shared/domain/event/DomainEvent";
import {CurrentTimeProvider} from "../TournamentsRegistrationsModule";
import {TournamentRegistrationsWasOpened} from "./event/TournamentRegistrationsWasOpened";
import {RegistrationsStatus} from "./RegistrationsStatus";

export class TournamentRegistrations {
  private tournamentId: TournamentId;
  private status: RegistrationsStatus | undefined;

  constructor(private readonly currentTimeProvider: CurrentTimeProvider) {
  }

  openForTournament(props: { tournamentId: TournamentId }): DomainEvent[] {
    if (this.status !== undefined) {
      throw new Error('Registrations was opened before!')
    }
    const tournamentRegistrationsWasOpened = new TournamentRegistrationsWasOpened({occurredAt: this.currentTimeProvider(), tournamentId: props.tournamentId.raw});
    this.onTournamentRegistrationsWasOpened(tournamentRegistrationsWasOpened);
    return [tournamentRegistrationsWasOpened];
  }

  private onTournamentRegistrationsWasOpened(tournamentRegistrationsWasOpened: TournamentRegistrationsWasOpened) {
    this.tournamentId = TournamentId.from(tournamentRegistrationsWasOpened.tournamentId)
    this.status = RegistrationsStatus.OPENED
  }
}
