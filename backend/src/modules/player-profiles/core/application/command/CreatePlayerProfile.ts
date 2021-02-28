import { PlayerId } from '../../../../../shared/core/domain/PlayerId';

export class CreatePlayerProfile {
  readonly playerId: PlayerId;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
  readonly emailAddress: string;

  constructor(props: { playerId: PlayerId; firstName: string; lastName: string; emailAddress: string; phoneNumber: string }) {
    this.playerId = props.playerId;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.emailAddress = props.emailAddress;
    this.phoneNumber = props.phoneNumber;
  }
}
