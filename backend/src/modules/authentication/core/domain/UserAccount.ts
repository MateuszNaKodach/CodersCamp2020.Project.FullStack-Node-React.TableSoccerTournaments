import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';
import { PasswordWasSet } from './event/PasswordWasSet';
import { TokenGenerated } from './event/TokenGenerated';
import { UserId } from './UserId';
import { Email } from './Email';
import { Password } from './Password';

export class UserAccount {
  readonly userId: UserId;
  readonly email: Email;
  readonly password: Password;

  constructor(props: { userId: UserId; email: Email; password: Password }) {
    this.userId = props.userId;
    this.email = props.email;
    this.password = props.password;
  }
}

export async function setPasswordForUserAccount(
  state: UserAccount | undefined,
  command: { userId: string; password: string },
  hashedPassword: string,
  currentTime: Date,
): Promise<DomainCommandResult<UserAccount>> {
  if (!state) {
    throw new Error('Account with this id does not exists.');
  }

  const passwordWasSet = new PasswordWasSet({
    occurredAt: currentTime,
    userId: command.userId,
    password: hashedPassword,
  });

  const accountWithPasswordSet = onPasswordWasSet(state, passwordWasSet);

  return {
    state: accountWithPasswordSet,
    events: [passwordWasSet],
  };
}

function onPasswordWasSet(state: UserAccount, event: PasswordWasSet): UserAccount {
  return new UserAccount({
    userId: UserId.from(event.userId),
    email: state.email,
    password: Password.from(event.password),
  });
}

export async function authenticateUser(
  state: UserAccount | undefined,
  command: { email: string; password: string },
  isPasswordCorrect: boolean,
  token: string,
  currentTime: Date,
): Promise<DomainCommandResult<string>> {
  if (!state) {
    throw new Error('Such email address does not exists.');
  }

  if (!isPasswordCorrect) {
    throw new Error('Wrong password.');
  }

  if (token.length == 0) {
    throw new Error('Empty token.');
  }

  const tokenWasGenerated: TokenGenerated = new TokenGenerated({
    occurredAt: currentTime,
    email: command.email,
  });

  return {
    state: token,
    events: [tokenWasGenerated],
  };
}
