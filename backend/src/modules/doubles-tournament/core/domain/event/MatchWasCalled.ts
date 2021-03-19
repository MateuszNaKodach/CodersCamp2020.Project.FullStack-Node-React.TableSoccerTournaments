import { DomainEvent } from '../../../../../shared/domain/event/DomainEvent';

export class MatchWasCalled implements DomainEvent {
  readonly occurredAt: Date;
  readonly tournamentId: string;
  readonly calledMatch: { matchNumber: number; team1Id: string; team2Id: string };
  readonly tableNumber: number;

  constructor(props: {
    occurredAt: Date;
    tournamentId: string;
    calledMatch: { matchNumber: number; team1Id: string; team2Id: string };
    tableNumber: number;
  }) {
    this.occurredAt = props.occurredAt;
    this.tournamentId = props.tournamentId;
    this.tableNumber = props.tableNumber;
    this.calledMatch = props.calledMatch;
  }
}
