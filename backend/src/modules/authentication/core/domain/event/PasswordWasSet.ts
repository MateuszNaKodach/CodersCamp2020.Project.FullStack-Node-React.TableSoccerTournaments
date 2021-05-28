import { DomainEvent } from '../../../../../shared/domain/event/DomainEvent';

export class PasswordWasSet implements DomainEvent {
  readonly occurredAt: Date;
  readonly userId: string;
  readonly password: string;

  constructor(props: { occurredAt: Date; userId: string; password: string }) {
    this.occurredAt = props.occurredAt;
    this.userId = props.userId;
    this.password = props.password;
  }
}
