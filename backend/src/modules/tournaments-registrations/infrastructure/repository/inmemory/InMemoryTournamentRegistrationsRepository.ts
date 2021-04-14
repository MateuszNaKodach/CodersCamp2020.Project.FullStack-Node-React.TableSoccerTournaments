import { TournamentRegistrationsRepository } from '../../../core/application/TournamentRegistrationsRepository';
import { TournamentRegistrations } from '../../../core/domain/TournamentRegistrations';
import { TournamentId } from '../../../core/domain/TournamentId';
import { OptimisticLockingException } from '../../../../../shared/core/application/OptimisticLockingException';

export class InMemoryTournamentRegistrationsRepository implements TournamentRegistrationsRepository {
  private readonly entities: { [id: string]: TournamentRegistrations } = {};

  findByTournamentId(tournamentId: TournamentId): Promise<TournamentRegistrations | undefined> {
    return Promise.resolve(this.entities[tournamentId.raw]);
  }

  async save(registrations: TournamentRegistrations): Promise<void> {
    if ((this.entities[registrations.tournamentId.raw]?.version ?? 0) !== registrations.version) {
      return Promise.reject(new OptimisticLockingException(registrations.version));
    }
    this.entities[registrations.tournamentId.raw] = new TournamentRegistrations({
      ...registrations,
      version: registrations.version + 1,
    });
  }

  findAll(): Promise<TournamentRegistrations[]> {
    return Promise.resolve(Object.keys(this.entities).map((id) => this.entities[id]));
  }
}
