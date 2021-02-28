import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';
import { CurrentTimeProvider } from '../../../../shared/core/CurrentTimeProvider';
import { PlayerProfileWasCreated } from './event/PlayerProfileWasCreated';
import { PlayerId } from '../../../../shared/core/domain/PlayerId';

export class PlayerProfile {
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

export function createPlayerProfile(
  state: PlayerProfile | undefined,
  command: {
    playerId: PlayerId;
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
  },
  currentTimeProvider: CurrentTimeProvider,
): DomainCommandResult<PlayerProfile> {
  if (state) {
    throw new Error('Such player already exists!');
  }

  const playerProfileWasCreated = new PlayerProfileWasCreated({
    occurredAt: currentTimeProvider(),
    playerId: command.playerId.raw,
    firstName: command.firstName,
    lastName: command.lastName,
    emailAddress: command.emailAddress,
    phoneNumber: command.phoneNumber,
  });

  const newPlayerProfile = onPlayerProfileWasCreated(playerProfileWasCreated);

  return {
    state: newPlayerProfile,
    events: [playerProfileWasCreated],
  };
}

function onPlayerProfileWasCreated(event: PlayerProfileWasCreated): PlayerProfile {
  return new PlayerProfile({
    playerId: PlayerId.from(event.playerId),
    firstName: event.firstName,
    lastName: event.lastName,
    //TODO write new type for emailAddress (perfectly if it will be unique, but it will be hard to code)
    emailAddress: event.emailAddress,
    //TODO write type for phoneNumber (perfectly if unique, but what if there will be abroad numbers?)
    phoneNumber: event.phoneNumber,
  });
}
