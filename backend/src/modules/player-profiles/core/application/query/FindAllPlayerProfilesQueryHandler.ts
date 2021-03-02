import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { FindAllPlayerProfiles, FindAllPlayerProfilesResult } from './FindAllPlayerProfiles';
import { PlayerProfilesRepository } from '../PlayerProfilesRepository';

export class FindAllPlayerProfilesQueryHandler implements QueryHandler<FindAllPlayerProfiles, FindAllPlayerProfilesResult> {
  constructor(private readonly repository: PlayerProfilesRepository) {}

  execute(query: FindAllPlayerProfiles): Promise<FindAllPlayerProfilesResult> {
    return this.repository.findAll();
  }
}
