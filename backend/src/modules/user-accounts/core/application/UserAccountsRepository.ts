import { UserAccount } from '../domain/UserAccount';

export interface UserAccountsRepository {
  save(userAccount: UserAccount): Promise<void>;

  findByEmail(email: string): Promise<UserAccount>;
}
