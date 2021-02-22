import {TournamentRegistrations} from "../domain/TournamentRegistrations";
import {TournamentId} from "../domain/TournamentId";

export interface TournamentRegistrationsRepository {

  save(registrations: TournamentRegistrations): Promise<void>

  findByTournamentId(tournamentId: TournamentId): Promise<TournamentRegistrations | undefined>

}
