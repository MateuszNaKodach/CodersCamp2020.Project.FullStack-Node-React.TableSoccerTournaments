import { QueryHandler } from '../../../../../shared/core/application/query/QueryHandler';
import { FindPlayerProfileById, FindPlayerProfileByIdResult } from './FindPlayerProfileById';
import { PlayerProfilesRepository } from '../PlayerProfilesRepository';
import { PlayerId } from '../../../../../shared/core/domain/PlayerId';

export class FindPlayerProfileByIdQueryHandler implements QueryHandler<FindPlayerProfileById, FindPlayerProfileByIdResult> {
  constructor(private readonly repository: PlayerProfilesRepository) {}

  execute(query: FindPlayerProfileById): Promise<FindPlayerProfileByIdResult> {
    return this.repository.findByPlayerId(PlayerId.from(query.playerId));
  }
}
