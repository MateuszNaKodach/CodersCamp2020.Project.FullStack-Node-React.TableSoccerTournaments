import { DoublesTournament } from '../../../core/domain/DoublesTournament';
import { DoublesTournamentRepository } from '../../../core/application/DoublesTournamentRepository';

export class InMemoryDoublesTournamentRepository implements DoublesTournamentRepository {
  private readonly entities: { [id: string]: DoublesTournament } = {};

  async save(tournament: DoublesTournament): Promise<void> {
    this.entities[tournament.tournamentId] = tournament;
  }

  findAll(): Promise<DoublesTournament[]> {
    return Promise.resolve(Object.keys(this.entities).map((id) => this.entities[id]));
  }

  findByTournamentId(tournamentId: string): Promise<DoublesTournament> {
    return Promise.resolve(this.entities[tournamentId]);
  }
}
