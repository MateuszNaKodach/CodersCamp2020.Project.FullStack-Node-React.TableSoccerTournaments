import { DatabaseTestSupport } from '../../../../test-support/shared/infrastructure/DatabaseTestSupport';
import { EntityIdGenerator } from '../../../../../src/shared/core/application/EntityIdGenerator';
import { UuidEntityIdGenerator } from '../../../../../src/shared/infrastructure/core/application/UuidEntityIdGenerator';
import { PlayerId } from '../../../../../src/shared/core/domain/PlayerId';
import {Players} from "../../../../../src/modules/tournaments-registrations/core/application/command/Players";
import {AvailablePlayersForTournament} from "../../../../../src/modules/tournaments-registrations/core/application/command/AvailablePlayersForTournament";

export function PlayersTestCases(props: {
  name: string;
  repositoryFactory: () => Players & AvailablePlayersForTournament;
  databaseTestSupport: DatabaseTestSupport;
}): void {
  return describe(props.name, () => {
    const entityIdGenerator: EntityIdGenerator = new UuidEntityIdGenerator();
    let repository: Players & AvailablePlayersForTournament;

    beforeAll(async () => {
      await props.databaseTestSupport.openConnection();
      repository = props.repositoryFactory();
    });
    afterEach(async () => await props.databaseTestSupport.clearDatabase());
    afterAll(async () => await props.databaseTestSupport.closeConnection());

    test('canPlay returns true when given player was saved', async () => {
      const playerId1 = PlayerId.from(entityIdGenerator.generate());
      const playerId2 = PlayerId.from(entityIdGenerator.generate());
      const playerId3 = PlayerId.from(entityIdGenerator.generate());

      await repository.save({playerId: playerId1});
      await repository.save({playerId: playerId2});

      expect(await repository.canPlay(playerId1)).toBeTruthy();
      expect(await repository.canPlay(playerId2)).toBeTruthy();
      expect(await repository.canPlay(playerId3)).toBeFalsy();
    });

    test('canPlay returns false when given player was not saved', async () => {
      const playerId1 = PlayerId.from(entityIdGenerator.generate());
      const playerId2 = PlayerId.from(entityIdGenerator.generate());

      expect(await repository.canPlay(playerId1)).toBeFalsy();
      expect(await repository.canPlay(playerId2)).toBeFalsy();
    });
  });
}
