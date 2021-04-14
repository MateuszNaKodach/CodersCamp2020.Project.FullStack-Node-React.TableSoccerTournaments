import { TournamentDetailsRepository } from '../../../core/application/TournamentDetailsRepository';
import { TournamentDetails } from '../../../core/domain/TournamentDetails';

export class InMemoryTournamentDetailsRepository implements TournamentDetailsRepository {
  private readonly entities: { [id: string]: TournamentDetails } = {};

  findByTournamentId(tournamentId: string): Promise<TournamentDetails | undefined> {
    return Promise.resolve(this.entities[tournamentId]);
  }

  async save(tournamentDetails: TournamentDetails): Promise<void> {
    this.entities[tournamentDetails.tournamentId] = tournamentDetails;
  }

  findAll(): Promise<TournamentDetails[]> {
    return Promise.resolve(Object.keys(this.entities).map((id) => this.entities[id]));
  }
}
