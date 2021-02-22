import { DomainEvent } from '../../../../../shared/domain/event/DomainEvent';

export class PlayerProfileWasCreated implements DomainEvent {
  readonly occurredAt: Date;
  readonly playerId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
  readonly emailAddress: string;

  constructor(props: {
    occurredAt: Date;
    playerId: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
  }) {
    this.occurredAt = props.occurredAt;
    this.playerId = props.playerId;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.emailAddress = props.emailAddress;
    this.phoneNumber = props.phoneNumber;
  }
}
