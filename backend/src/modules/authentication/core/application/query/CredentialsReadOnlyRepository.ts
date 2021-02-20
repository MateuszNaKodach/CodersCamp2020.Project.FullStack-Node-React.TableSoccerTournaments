import {Credentials} from "../../domain/Credentials";

export interface CredentialsReadOnlyRepository {

  findByLogin(login: string): Promise<Credentials | undefined>

}
