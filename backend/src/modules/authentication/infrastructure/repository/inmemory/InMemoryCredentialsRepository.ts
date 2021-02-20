import {CredentialsRepository} from "../../../core/application/command/CredentialsRepository";
import {CredentialsReadOnlyRepository} from "../../../core/application/query/CredentialsReadOnlyRepository";
import {Credentials} from "../../../core/domain/Credentials";

export class InMemoryCredentialsRepository implements CredentialsRepository, CredentialsReadOnlyRepository {

  private readonly entities: { [id: string]: Credentials } = {}

  findByLogin(login: string): Promise<Credentials | undefined> {
    return Promise.resolve(this.entities[login]);
  }

  async save(credentials: Credentials): Promise<void> {
    this.entities[credentials.login.raw] = credentials;
  }

}
