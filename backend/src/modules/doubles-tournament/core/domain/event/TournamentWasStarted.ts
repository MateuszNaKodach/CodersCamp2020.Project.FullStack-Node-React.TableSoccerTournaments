import { DomainEvent } from '../../../../../shared/domain/event/DomainEvent';

export class TournamentWasStarted implements DomainEvent {
  readonly occurredAt: Date;
  readonly tournamentId: string;

  constructor(props: { occurredAt: Date; tournamentId: string }) {
    this.occurredAt = props.occurredAt;
    this.tournamentId = props.tournamentId;
  }
}
