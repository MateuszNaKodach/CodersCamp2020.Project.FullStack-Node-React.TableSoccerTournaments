import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { FindAllTournamentDetails, FindAllTournamentDetailsResult } from './FindAllTournamentDetails';
import { TournamentDetailsRepository } from '../TournamentDetailsRepository';

export class FindAllTournamentDetailsQueryHandler implements QueryHandler<FindAllTournamentDetails, FindAllTournamentDetailsResult> {
  constructor(private readonly repository: TournamentDetailsRepository) {}

  execute(query: FindAllTournamentDetails): Promise<FindAllTournamentDetailsResult> {
    return this.repository.findAll();
  }
}
