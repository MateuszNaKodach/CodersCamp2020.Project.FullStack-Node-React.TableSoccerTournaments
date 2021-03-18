import { DomainEvent } from '../../../../../shared/domain/event/DomainEvent';

export class TournamentTableWasReleased implements DomainEvent {
  readonly occurredAt: Date;
  readonly tournamentId: string;
  readonly tableNumber: number;

  constructor(props: { occurredAt: Date; tournamentId: string; tableNumber: number }) {
    this.occurredAt = props.occurredAt;
    this.tournamentId = props.tournamentId;
    this.tableNumber = props.tableNumber;
  }
}
