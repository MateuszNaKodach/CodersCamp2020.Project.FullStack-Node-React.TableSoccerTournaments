import { TournamentTree } from '../domain/TournamentTree';

export interface TournamentTreeRepository {
  save(tournamentTree: TournamentTree): Promise<void>;

  findByTournamentTreeId(tournamentTreeId: string): Promise<TournamentTree | undefined>;
}
