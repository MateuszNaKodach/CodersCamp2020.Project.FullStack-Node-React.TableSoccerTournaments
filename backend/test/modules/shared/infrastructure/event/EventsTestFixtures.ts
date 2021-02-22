import { DomainEvent } from '../../../../../src/modules/shared/domain/event/DomainEvent';

export class TournamentHasStarted implements DomainEvent {
  readonly occurredAt: Date;

  constructor(props: { occurredAt: Date }) {
    this.occurredAt = props.occurredAt;
  }
}

export class MatchWasFinished implements DomainEvent {
  static readonly eventType: string = 'MatchWasFinished';
  readonly occurredAt: Date;

  constructor(props: { occurredAt: Date }) {
    this.occurredAt = props.occurredAt;
  }
}
