import {DomainEvent} from "../../../../../src/modules/shared/domain/event/DomainEvent";

export class TournamentHasStarted implements DomainEvent {
  static readonly eventType: string = 'TournamentHasStarted';
  readonly eventId: string;
  readonly occurredAt: Date;

  constructor(props: { eventId: string, occurredAt: Date }) {
    this.eventId = props.eventId;
    this.occurredAt = props.occurredAt;
  }

  get eventType(): string {
    return TournamentHasStarted.eventType;
  }
}

export class MatchWasFinished implements DomainEvent {
  static readonly eventType: string = 'MatchWasFinished';
  readonly eventId: string;
  readonly occurredAt: Date;

  constructor(props: { eventId: string, occurredAt: Date }) {
    this.eventId = props.eventId;
    this.occurredAt = props.occurredAt;
  }

  get eventType(): string {
    return TournamentHasStarted.eventType;
  }
}
