import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { FindAllMatches, FindAllMatchesResult } from './FindAllMatches';
import { MatchRepository } from '../MatchRepository';

export class FindAllMatchesQueryHandler implements QueryHandler<FindAllMatches, FindAllMatchesResult> {
  constructor(private readonly repository: MatchRepository) {}

  execute(query: FindAllMatches): Promise<FindAllMatchesResult> {
    return this.repository.findAll();
  }
}
