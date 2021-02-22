import {DomainEvent} from "../../../../shared/domain/event/DomainEvent";

export class TournamentRegistrationsWasClosed implements DomainEvent {
  readonly occurredAt: Date;
  readonly tournamentId: string;
  readonly participantsIds: string[]

  constructor(props: { occurredAt: Date, tournamentId: string, participantsIds: string[] }) {
    this.occurredAt = props.occurredAt;
    this.tournamentId = props.tournamentId;
    this.participantsIds = props.participantsIds;
  }

}
