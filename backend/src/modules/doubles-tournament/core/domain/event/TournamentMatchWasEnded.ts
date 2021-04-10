import { DomainEvent } from '../../../../../shared/domain/event/DomainEvent';

export class TournamentMatchWasEnded implements DomainEvent {
  readonly occurredAt: Date;
  readonly tournamentId: string;
  readonly matchNumber: number;
  readonly winnerId: string;

  constructor(props: { occurredAt: Date; tournamentId: string; matchNumber: number; winnerId: string }) {
    this.occurredAt = props.occurredAt;
    this.tournamentId = props.tournamentId;
    this.matchNumber = props.matchNumber;
    this.winnerId = props.winnerId;
  }
}
