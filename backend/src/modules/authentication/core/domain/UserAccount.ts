import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';
import { PasswordWasSet } from './event/PasswordWasSet';
import jwt from 'jsonwebtoken';
import { UserAuthenticated } from './event/UserAuthenticated';

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

export function authenticateUser(
  state: UserAccount | undefined,
  command: { email: string; password: string },
  currentTime: Date,
): DomainCommandResult<string> {
  if (!state) {
    throw new Error('Such email address does not exists.');
  }

  // when password will be salted
  // const isPasswordCorrect = await bcrypt.compare(command.password, state.password);
  const isPasswordCorrect = command.password === state.password;
  if (!isPasswordCorrect) {
    throw new Error('Wrong password.');
  }

  // const token: Token = jwt.sign( { email: command.email, userId: state.userId }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '1h' });
  const token: string = jwt.sign({ email: command.email }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '1h' });

  const userAuthenticated: UserAuthenticated = new UserAuthenticated({
    occurredAt: currentTime,
    email: command.email,
  });

  return {
    state: token,
    events: [userAuthenticated],
  };
}
