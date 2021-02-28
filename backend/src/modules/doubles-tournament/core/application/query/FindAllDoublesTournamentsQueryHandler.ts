import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { FindAllDoublesTournaments, FindAllDoublesTournamentsResult } from './FindAllDoublesTournaments';
import { DoublesTournamentRepository } from '../DoublesTournamentRepository';
import { FindDoublesTournamentById } from './FindDoublesTournamentById';

export class FindAllDoublesTournamentsQueryHandler implements QueryHandler<FindAllDoublesTournaments, FindAllDoublesTournamentsResult> {
  constructor(private readonly repository: DoublesTournamentRepository) {}

  execute(query: FindDoublesTournamentById): Promise<FindAllDoublesTournamentsResult> {
    return this.repository.findAll();
  }
}
