import { TournamentId } from '../../domain/TournamentId';
import { TournamentRegistrationsRepository } from '../TournamentRegistrationsRepository';
import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { FindTournamentRegistrationsById, FindTournamentRegistrationsByIdResult } from './FindTournamentRegistrationsById';

export class FindTournamentRegistrationsByIdQueryHandler
  implements QueryHandler<FindTournamentRegistrationsById, FindTournamentRegistrationsByIdResult> {
  constructor(private readonly repository: TournamentRegistrationsRepository) {}

  execute(query: FindTournamentRegistrationsById): Promise<FindTournamentRegistrationsByIdResult> {
    return this.repository.findByTournamentId(TournamentId.from(query.tournamentId));
  }
}
