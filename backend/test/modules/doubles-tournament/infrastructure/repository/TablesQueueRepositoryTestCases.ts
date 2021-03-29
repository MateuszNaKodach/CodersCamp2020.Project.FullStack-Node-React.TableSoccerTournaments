import { DatabaseTestSupport } from '../../../../test-support/shared/infrastructure/DatabaseTestSupport';
import { EntityIdGenerator } from '../../../../../src/shared/core/application/EntityIdGenerator';
import { UuidEntityIdGenerator } from '../../../../../src/shared/infrastructure/core/application/UuidEntityIdGenerator';
import { TournamentId } from '../../../../../src/modules/doubles-tournament/core/domain/TournamentId';
import { QueuedTable } from '../../../../../src/modules/doubles-tournament/core/domain/QueuedTable';
import { TablesQueueRepository } from '../../../../../src/modules/doubles-tournament/core/application/TablesQueueRepository';
import { TablesQueue } from '../../../../../src/modules/doubles-tournament/core/domain/TablesQueue';

export function TablesQueueRepositoryTestCases(props: {
  name: string;
  repositoryFactory: () => TablesQueueRepository;
  databaseTestSupport: DatabaseTestSupport;
}): void {
  return describe(props.name, () => {
    const entityIdGenerator: EntityIdGenerator = new UuidEntityIdGenerator();
    const tournamentId = TournamentId.from(entityIdGenerator.generate());
    let repository: TablesQueueRepository;

    beforeAll(async () => {
      await props.databaseTestSupport.openConnection();
      repository = props.repositoryFactory();
    });
    afterEach(async () => await props.databaseTestSupport.clearDatabase());
    afterAll(async () => await props.databaseTestSupport.closeConnection());

    test('findByTournamentId returns tables queue with given tournament id when it was created and saved', async () => {
      //Given
      const queue: QueuedTable[] = [
        new QueuedTable({
          tableNumber: 1,
          isFree: false,
        }),
        new QueuedTable({
          tableNumber: 2,
          isFree: true,
        }),
      ];
      const tablesQueue = new TablesQueue({ tournamentId: tournamentId, queuedTables: queue });

      //When
      await repository.save(tablesQueue);

      //Then
      expect(await repository.findByTournamentId(tournamentId.raw)).toStrictEqual(tablesQueue);
    });

    test('findByTournamentId returns undefined when given tournament id when it was not found', async () => {
      //Given
      const queue: QueuedTable[] = [
        new QueuedTable({
          tableNumber: 1,
          isFree: false,
        }),
        new QueuedTable({
          tableNumber: 2,
          isFree: true,
        }),
      ];
      const tablesQueue = new TablesQueue({ tournamentId: tournamentId, queuedTables: queue });

      //When
      await repository.save(tablesQueue);

      //Then
      const notSavedTournamentId = entityIdGenerator.generate();
      expect(await repository.findByTournamentId(notSavedTournamentId)).toBeUndefined();
    });
  });
}
