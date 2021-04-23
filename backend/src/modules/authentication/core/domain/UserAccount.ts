import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';
import { PasswordWasSet } from './event/PasswordWasSet';

export class UserAccount {
  readonly email: string;
  readonly password: string;

  constructor(props: { email: string; password: string }) {
    this.email = props.email;
    this.password = props.password;
  }
}

export function setPasswordForUserAccount(
  state: UserAccount | undefined,
  command: { email: string; password: string },
  currentTime: Date,
): DomainCommandResult<UserAccount> {
  if (state) {
    throw new Error('Account with this email address already exists.');
  }

  const passwordWasSet = new PasswordWasSet({
    occurredAt: currentTime,
    email: command.email,
    password: command.password,
  });

  const accountWithPasswordSet = onPasswordWasSet(state, passwordWasSet);

  return {
    state: accountWithPasswordSet,
    events: [passwordWasSet],
  };
}

function onPasswordWasSet(state: UserAccount | undefined, event: PasswordWasSet): UserAccount {
  return new UserAccount({
    email: event.email,
    password: event.password,
  });
}
