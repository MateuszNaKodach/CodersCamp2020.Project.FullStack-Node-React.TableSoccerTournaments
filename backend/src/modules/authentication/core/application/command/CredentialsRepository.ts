import { Credentials } from '../../domain/Credentials';

export interface CredentialsRepository {
  save(credentials: Credentials): Promise<void>;

  findByLogin(login: string): Promise<Credentials | undefined>;
}
