import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { FindTablesByTournamentId, FindTablesByTournamentIdResult } from './FindTablesByTournamentId';
import { TournamentTablesRepository } from '../TournamentTablesRepository';

export class FindTablesByTournamentIdQueryHandler implements QueryHandler<FindTablesByTournamentId, FindTablesByTournamentIdResult> {
  constructor(private readonly repository: TournamentTablesRepository) {}

  execute(query: FindTablesByTournamentId): Promise<FindTablesByTournamentIdResult> {
    return this.repository.findAllByTournamentId(query.tournamentId);
  }
}
