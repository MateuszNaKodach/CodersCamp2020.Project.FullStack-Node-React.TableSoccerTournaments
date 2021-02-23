import { TournamentRegistrationsRepository } from '../TournamentRegistrationsRepository';
import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { FindTournamentRegistrationsById } from './FindTournamentRegistrationsById';
import { FindAllTournamentRegistrations, FindAllTournamentRegistrationsResult } from './FindAllTournamentRegistrations';

/**
 * HINT
 * This style of implementation is using domain model.
 * But in this case, changes in domain model will be reflected in query result.
 * Another option, which is preferred by me, it's creating read model by handling events.
 */
export class FindAllTournamentRegistrationsQueryHandler
  implements QueryHandler<FindAllTournamentRegistrations, FindAllTournamentRegistrationsResult> {
  constructor(private readonly repository: TournamentRegistrationsRepository) {}

  execute(query: FindTournamentRegistrationsById): Promise<FindAllTournamentRegistrationsResult> {
    return this.repository.findAll();
  }
}
