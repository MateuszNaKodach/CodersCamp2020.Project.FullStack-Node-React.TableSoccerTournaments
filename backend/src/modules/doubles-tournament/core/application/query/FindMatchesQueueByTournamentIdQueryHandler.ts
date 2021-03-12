import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { FindMatchesQueueByTournamentById, FindMatchesQueueByTournamentByIdResult } from './FindMatchesQueueByTournamentId';
import { MatchesQueueRepository } from '../MatchesQueueRepository';

export class FindMatchesQueueByTournamentIdQueryHandler
  implements QueryHandler<FindMatchesQueueByTournamentById, FindMatchesQueueByTournamentByIdResult> {
  constructor(private readonly repository: MatchesQueueRepository) {}

  execute(query: FindMatchesQueueByTournamentById): Promise<FindMatchesQueueByTournamentByIdResult> {
    return this.repository.findByTournamentId(query.tournamentId);
  }
}
