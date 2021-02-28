import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { DoublesTournamentRepository } from '../DoublesTournamentRepository';
import { FindDoublesTournamentById, FindDoublesTournamentByIdResult } from './FindDoublesTournamentById';

export class FindDoublesTournamentByIdQueryHandler implements QueryHandler<FindDoublesTournamentById, FindDoublesTournamentByIdResult> {
  constructor(private readonly repository: DoublesTournamentRepository) {}

  execute(query: FindDoublesTournamentById): Promise<FindDoublesTournamentByIdResult> {
    return this.repository.findByTournamentId(query.tournamentId);
  }
}
