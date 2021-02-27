import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';
import { CurrentTimeProvider } from '../../../../shared/core/CurrentTimeProvider';
import { PlayerProfileWasCreated } from './event/PlayerProfileWasCreated';

export class PlayerProfile {
  readonly playerId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
  readonly emailAddress: string;

  constructor(props: { playerId: string; firstName: string; lastName: string; emailAddress: string; phoneNumber: string }) {
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
    playerId: string;
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
    playerId: command.playerId,
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
    //TODO write new type for playerId (as in TournamentRegistrations)
    playerId: event.playerId,
    firstName: event.firstName,
    lastName: event.lastName,
    //TODO write new type for emailAddress (perfectly if it will be unique, but it will be hard to code)
    emailAddress: event.emailAddress,
    //TODO write type for phoneNumber (perfectly if unique, but what if there will be abroad numbers?)
    phoneNumber: event.phoneNumber,
  });
}
