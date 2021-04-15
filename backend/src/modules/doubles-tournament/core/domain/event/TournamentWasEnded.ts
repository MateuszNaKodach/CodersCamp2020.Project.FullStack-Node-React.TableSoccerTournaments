import { DomainEvent } from '../../../../../shared/domain/event/DomainEvent';

export class TournamentWasEnded implements DomainEvent {
  readonly occurredAt: Date;
  readonly tournamentId: string;
  readonly winner: string;

  constructor(props: { occurredAt: Date; tournamentId: string; winner: string }) {
    this.occurredAt = props.occurredAt;
    this.tournamentId = props.tournamentId;
    this.winner = props.winner;
  }
}
