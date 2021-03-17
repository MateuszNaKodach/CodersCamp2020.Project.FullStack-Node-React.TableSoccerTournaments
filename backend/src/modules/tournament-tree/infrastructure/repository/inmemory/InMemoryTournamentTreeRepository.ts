import { TournamentTreeRepository } from '../../../core/application/TournamentTreeRepository';
import { TournamentTree } from '../../../core/domain/TournamentTree';

export class InMemoryTournamentTreeRepository implements TournamentTreeRepository {
  private readonly entities: { [id: string]: TournamentTree } = {};

  async save(tournamentTree: TournamentTree): Promise<void> {
    this.entities[tournamentTree.tournamentId] = tournamentTree;
  }

  findByTournamentTreeId(tournamentTreeId: string): Promise<TournamentTree> {
    return Promise.resolve(this.entities[tournamentTreeId]);
  }
}
