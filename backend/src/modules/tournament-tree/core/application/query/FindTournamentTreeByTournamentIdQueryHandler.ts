import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { FindTournamentTreeByTournamentId, FindTournamentTreeByTournamentIdResult } from './FindTournamentTreeByTournamentId';

import { TournamentTreeRepository } from '../TournamentTreeRepository';

export class FindTournamentTreeByTournamentIdQueryHandler
  implements QueryHandler<FindTournamentTreeByTournamentId, FindTournamentTreeByTournamentIdResult> {
  constructor(private readonly repository: TournamentTreeRepository) {}

  execute(query: FindTournamentTreeByTournamentId): Promise<FindTournamentTreeByTournamentIdResult> {
    return this.repository.findByTournamentTreeId(query.tournamentId);
  }
}
