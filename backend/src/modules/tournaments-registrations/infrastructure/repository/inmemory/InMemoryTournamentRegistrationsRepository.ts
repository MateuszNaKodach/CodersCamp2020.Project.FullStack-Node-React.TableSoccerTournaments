import {TournamentRegistrationsRepository} from "../../../core/application/TournamentRegistrationsRepository";
import {TournamentRegistrations} from "../../../core/domain/TournamentRegistrations";
import {TournamentId} from "../../../core/domain/TournamentId";

export class InMemoryTournamentRegistrationsRepository implements TournamentRegistrationsRepository {

  private readonly entities: { [id: string]: TournamentRegistrations } = {}

  findByTournamentId(tournamentId: TournamentId): Promise<TournamentRegistrations | undefined> {
    return Promise.resolve(this.entities[tournamentId.raw])
  }

  async save(registrations: TournamentRegistrations): Promise<void> {
    this.entities[registrations.tournamentId.raw] = registrations;
  }

}
