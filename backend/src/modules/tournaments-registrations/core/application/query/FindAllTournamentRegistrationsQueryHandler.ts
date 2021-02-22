import { TournamentRegistrationsRepository } from '../TournamentRegistrationsRepository';
import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { FindTournamentRegistrationsById } from './FindTournamentRegistrationsById';
import { FindAllTournamentRegistrations, FindAllTournamentRegistrationsResult } from './FindAllTournamentRegistrations';

export class FindAllTournamentRegistrationsQueryHandler
  implements QueryHandler<FindAllTournamentRegistrations, FindAllTournamentRegistrationsResult> {
  constructor(private readonly repository: TournamentRegistrationsRepository) {}

  execute(query: FindTournamentRegistrationsById): Promise<FindAllTournamentRegistrationsResult> {
    return this.repository.findAll();
  }
}
