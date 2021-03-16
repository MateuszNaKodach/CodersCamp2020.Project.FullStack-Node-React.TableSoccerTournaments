import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { FindMatchesQueueByTournamentId, FindMatchesQueueByTournamentIdResult } from './FindMatchesQueueByTournamentId';
import { MatchesQueueRepository } from '../MatchesQueueRepository';

export class FindMatchesQueueByTournamentIdQueryHandler
  implements QueryHandler<FindMatchesQueueByTournamentId, FindMatchesQueueByTournamentIdResult> {
  constructor(private readonly repository: MatchesQueueRepository) {}

  execute(query: FindMatchesQueueByTournamentId): Promise<FindMatchesQueueByTournamentIdResult> {
    return this.repository.findByTournamentId(query.tournamentId);
  }
}
