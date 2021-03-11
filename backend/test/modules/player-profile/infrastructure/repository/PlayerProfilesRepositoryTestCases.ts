import { DatabaseTestSupport } from '../../../../test-support/shared/infrastructure/DatabaseTestSupport';
import { PlayerProfilesRepository } from '../../../../../src/modules/player-profiles/core/application/PlayerProfilesRepository';
import { EntityIdGenerator } from '../../../../../src/shared/core/application/EntityIdGenerator';
import { UuidEntityIdGenerator } from '../../../../../src/shared/infrastructure/core/application/UuidEntityIdGenerator';
import { PlayerId } from '../../../../../src/shared/core/domain/PlayerId';
import { PlayerProfile } from '../../../../../src/modules/player-profiles/core/domain/PlayerProfile';

export function PlayerProfilesRepositoryTestCases(props: {
  name: string;
  repositoryFactory: () => PlayerProfilesRepository;
  databaseTestSupport: DatabaseTestSupport;
}): void {
  return describe(props.name, () => {
    const entityIdGenerator: EntityIdGenerator = new UuidEntityIdGenerator();
    let repository: PlayerProfilesRepository;

    beforeAll(async () => {
      await props.databaseTestSupport.openConnection();
      repository = props.repositoryFactory();
    });
    afterEach(async () => await props.databaseTestSupport.clearDatabase());
    afterAll(async () => await props.databaseTestSupport.closeConnection());

    test('findAll returns empty list when nothing was saved', async () => {
      expect(await repository.findAll()).toBeEmpty();
    });

    test('findAll returns all saved players profiles', async () => {
      const playerId1 = PlayerId.from(entityIdGenerator.generate());
      const playerId2 = PlayerId.from(entityIdGenerator.generate());
      const playerProfile1 = new PlayerProfile({
        playerId: playerId1,
        firstName: 'test1',
        lastName: 'test1',
        phoneNumber: '123456789',
        emailAddress: 'test1@gmail.com',
      });
      const playerProfile2 = new PlayerProfile({
        playerId: playerId2,
        firstName: 'test2',
        lastName: 'test2',
        phoneNumber: '987654321',
        emailAddress: 'test2@gmail.com',
      });

      await repository.save(playerProfile1);
      await repository.save(playerProfile2);

      expect(await repository.findAll()).toStrictEqual([playerProfile1, playerProfile2]);
    });

    test('findByPlayerId returns undefined when player profile with given id is not saved', async () => {
      const playerId1 = PlayerId.from(entityIdGenerator.generate());
      const playerId2 = PlayerId.from(entityIdGenerator.generate());
      const playerProfile1 = new PlayerProfile({
        playerId: playerId1,
        firstName: 'test1',
        lastName: 'test1',
        phoneNumber: '123456789',
        emailAddress: 'test1@gmail.com',
      });
      const playerProfile2 = new PlayerProfile({
        playerId: playerId2,
        firstName: 'test2',
        lastName: 'test2',
        phoneNumber: '987654321',
        emailAddress: 'test2@gmail.com',
      });

      await repository.save(playerProfile1);
      await repository.save(playerProfile2);

      const notExistingPlayerId = PlayerId.from(entityIdGenerator.generate());
      expect(await repository.findByPlayerId(notExistingPlayerId)).toBeUndefined();
    });

    test('findByPlayerId returns players profile with given id when were saved', async () => {
      const playerId1 = PlayerId.from(entityIdGenerator.generate());
      const playerId2 = PlayerId.from(entityIdGenerator.generate());
      const playerProfile1 = new PlayerProfile({
        playerId: playerId1,
        firstName: 'test1',
        lastName: 'test1',
        phoneNumber: '123456789',
        emailAddress: 'test1@gmail.com',
      });
      const playerProfile2 = new PlayerProfile({
        playerId: playerId2,
        firstName: 'test2',
        lastName: 'test2',
        phoneNumber: '987654321',
        emailAddress: 'test2@gmail.com',
      });

      await repository.save(playerProfile1);
      await repository.save(playerProfile2);

      expect(await repository.findByPlayerId(playerId1)).toStrictEqual(playerProfile1);
      expect(await repository.findByPlayerId(playerId2)).toStrictEqual(playerProfile2);
    });
  });
}
