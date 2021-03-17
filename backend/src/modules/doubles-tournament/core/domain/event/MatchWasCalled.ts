import { DomainEvent } from '../../../../../shared/domain/event/DomainEvent';

export class MatchWasCalled implements DomainEvent {
  readonly occurredAt: Date;
  readonly tournamentId: string;
  readonly matchFromQueue: { matchNumber: number; team1Id: string; team2Id: string };
  readonly table: { tableNumber: number; tableName: string; availableToPlay?: boolean };

  constructor(props: {
    occurredAt: Date;
    tournamentId: string;
    matchFromQueue: { matchNumber: number; team1Id: string; team2Id: string };
    table: { tableNumber: number; tableName: string; availableToPlay?: boolean };
  }) {
    this.occurredAt = props.occurredAt;
    this.tournamentId = props.tournamentId;
    this.table = props.table;
    this.matchFromQueue = props.matchFromQueue;
  }
}
