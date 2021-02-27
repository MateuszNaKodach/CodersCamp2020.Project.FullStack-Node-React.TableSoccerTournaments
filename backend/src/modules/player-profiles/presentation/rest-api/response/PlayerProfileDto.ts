export class PlayerProfileDto {
  readonly playerId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
  readonly emailAddress: string;

  constructor(playerId: string, firstName: string, lastName: string, phoneNumber: string, emailAddress: string) {
    this.playerId = playerId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.emailAddress = emailAddress;
  }
}
