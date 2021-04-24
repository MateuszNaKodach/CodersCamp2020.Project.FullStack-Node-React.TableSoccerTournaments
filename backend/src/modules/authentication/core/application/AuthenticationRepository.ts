import { UserAccount } from '../domain/UserAccount';

export interface AuthenticationRepository {
  save(userAccount: UserAccount): Promise<void>;

  findByEmail(email: string): Promise<UserAccount>;
}
