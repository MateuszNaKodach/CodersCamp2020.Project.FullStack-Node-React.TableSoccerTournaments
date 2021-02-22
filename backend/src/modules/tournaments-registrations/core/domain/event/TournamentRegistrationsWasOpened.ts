import {DomainEvent} from "../../../../shared/domain/event/DomainEvent";

export class TournamentRegistrationsWasOpened implements DomainEvent {
  readonly occurredAt: Date;
  readonly tournamentId: string

  static event(props: { occurredAt: Date, tournamentId: string }): TournamentRegistrationsWasOpened {
    return new TournamentRegistrationsWasOpened(props);
  }

  private constructor(props: { occurredAt: Date, tournamentId: string }) {
    this.occurredAt = props.occurredAt;
    this.tournamentId = props.tournamentId;
  }


}
