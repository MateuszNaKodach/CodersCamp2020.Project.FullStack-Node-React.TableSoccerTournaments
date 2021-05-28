import { UserAccount } from '../domain/UserAccount';

export interface AuthenticationRepository {
  save(userAccount: UserAccount): Promise<void>;

  findById(userId: string): Promise<UserAccount>;

  findByEmail(email: string): Promise<UserAccount | undefined>;
}
