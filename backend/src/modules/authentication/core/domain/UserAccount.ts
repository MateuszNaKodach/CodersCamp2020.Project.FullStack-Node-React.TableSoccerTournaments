import { DomainCommandResult } from '../../../../shared/core/domain/DomainCommandResult';
import { PasswordWasSet } from './event/PasswordWasSet';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { TokenGenerated } from './event/TokenGenerated';

export class UserAccount {
  readonly userId: string;
  readonly email: string | undefined;
  readonly password: string | undefined;

  constructor(props: { userId: string; email: string | undefined; password: string | undefined }) {
    this.userId = props.userId;
    this.email = props.email;
    this.password = props.password;
  }
}

export async function setPasswordForUserAccount(
  state: UserAccount | undefined,
  command: { userId: string; password: string },
  currentTime: Date,
): Promise<DomainCommandResult<UserAccount>> {
  if (!state) {
    throw new Error('Account with this id does not exists.');
  }

  const hashedPassword = await bcrypt.hash(command.password, 12);

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
    userId: event.userId,
    email: state.email,
    password: event.password,
  });
}

export async function authenticateUser(
  state: UserAccount | undefined,
  command: { email: string; password: string },
  currentTime: Date,
): Promise<DomainCommandResult<string | undefined>> {
  if (!state) {
    throw new Error('Such email address does not exists.');
  }

  const isPasswordCorrect = await bcrypt.compare(command.password, state.password!);
  if (!isPasswordCorrect) {
    throw new Error('Wrong password.');
  }

  const token: string = jwt.sign({ email: command.email, userId: state.userId }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '1h' });

  const userAuthenticated: TokenGenerated = new TokenGenerated({
    occurredAt: currentTime,
    email: command.email,
  });

  return {
    state: token,
    events: [userAuthenticated],
  };
}
