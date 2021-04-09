import { DomainEvent } from '../../../../../shared/domain/event/DomainEvent';

export class TournamentMatchWasEnded implements DomainEvent {
  readonly occurredAt: Date;
  readonly tournamentId: string;
  readonly matchId: string;
  readonly winnerId: string;

  constructor(props: { occurredAt: Date; tournamentId: string; matchId: string; winnerId: string }) {
    this.occurredAt = props.occurredAt;
    this.tournamentId = props.tournamentId;
    this.matchId = props.matchId;
    this.winnerId = props.winnerId;
  }
}
