import { DomainEvent } from '../../../../../shared/domain/event/DomainEvent';

export class PasswordWasSet implements DomainEvent {
  readonly occurredAt: Date;
  readonly email: string;
  readonly password: string;

  constructor(props: { occurredAt: Date; email: string; password: string }) {
    this.occurredAt = props.occurredAt;
    this.email = props.email;
    this.password = props.password;
  }
}
