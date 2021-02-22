import {DomainEvent} from "../../../../shared/domain/event/DomainEvent";

export class PlayerProfileWasRegistered implements DomainEvent {
  readonly occurredAt: Date
  readonly firstName: string
  readonly lastName: string
  readonly phoneNumber: string
  readonly emailAddress: string

  static event(props: { occurredAt: Date, firstName: string, lastName: string, emailAddress: string, phoneNumber: string }): PlayerProfileWasRegistered {
    return new PlayerProfileWasRegistered(props);
  }

  private constructor(props: { occurredAt: Date, firstName: string, lastName: string, emailAddress: string, phoneNumber: string }) {
    this.occurredAt = props.occurredAt;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.emailAddress = props.emailAddress;
    this.phoneNumber = props.phoneNumber;
  }
}
