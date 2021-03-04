import { InMemoryTestSupport } from '../../../../../test-support/shared/infrastructure/InMemoryTestSupport';
import { PlayerProfilesRepositoryTestCases } from '../PlayerProfilesRepositoryTestCases';
import { InMemoryPlayerProfileRepository } from '../../../../../../src/modules/player-profiles/infrastructure/repository/inmemory/InMemoryPlayerProfileRepository';

describe('PlayersProfilesRepository', () => {
  PlayerProfilesRepositoryTestCases({
    name: 'In memory Implementation',
    repositoryFactory: () => new InMemoryPlayerProfileRepository(),
    databaseTestSupport: InMemoryTestSupport,
  });
});
