import { AuthenticationRepository } from '../../../core/application/AuthenticationRepository';
import { UserAccount } from '../../../core/domain/UserAccount';

export class InMemoryAuthenticationRepository implements AuthenticationRepository {
  private readonly entities: { [id: string]: UserAccount } = {};

  findByEmail(email: string): Promise<UserAccount | undefined> {
    return Promise.resolve(Object.values(this.entities).find((userAccount) => userAccount.email === email));
  }

  findById(userId: string): Promise<UserAccount> {
    return Promise.resolve(this.entities[userId]);
  }

  async save(userAccount: UserAccount): Promise<void> {
    this.entities[userAccount.userId] = userAccount;
  }
}
