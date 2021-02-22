import {DomainEvent} from "../../../../shared/domain/event/DomainEvent";

export class PlayerWasRegisteredForTournament implements DomainEvent {
  readonly occurredAt: Date;
  readonly tournamentId: string
  readonly playerId: string

  constructor(props: { occurredAt: Date, tournamentId: string, playerId: string }) {
    this.occurredAt = props.occurredAt;
    this.tournamentId = props.tournamentId;
    this.playerId = props.playerId;
  }

}
