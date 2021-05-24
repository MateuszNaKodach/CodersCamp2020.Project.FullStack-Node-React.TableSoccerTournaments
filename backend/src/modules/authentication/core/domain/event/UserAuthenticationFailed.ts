import { DomainEvent } from '../../../../../shared/domain/event/DomainEvent';

export class UserAuthenticationFailed implements DomainEvent {
  readonly occurredAt: Date;
  readonly email: string;

  constructor(props: { occurredAt: Date; email: string }) {
    this.occurredAt = props.occurredAt;
    this.email = props.email;
  }
}
