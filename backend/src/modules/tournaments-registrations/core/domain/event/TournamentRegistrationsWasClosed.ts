import { DomainEvent } from '../../../../../shared/domain/event/DomainEvent';

export class TournamentRegistrationsWasClosed implements DomainEvent {
  readonly occurredAt: Date;
  readonly tournamentId: string;
  readonly registeredPlayersIds: string[];

  constructor(props: { occurredAt: Date; tournamentId: string; registeredPlayersIds: string[] }) {
    this.occurredAt = props.occurredAt;
    this.tournamentId = props.tournamentId;
    this.registeredPlayersIds = props.registeredPlayersIds;
  }
}
