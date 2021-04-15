import { DatabaseTestSupport } from '../../../../test-support/shared/infrastructure/DatabaseTestSupport';
import { EntityIdGenerator } from '../../../../../src/shared/core/application/EntityIdGenerator';
import { UuidEntityIdGenerator } from '../../../../../src/shared/infrastructure/core/application/UuidEntityIdGenerator';
import { TournamentId } from '../../../../../src/modules/doubles-tournament/core/domain/TournamentId';
import { QueuedTable } from '../../../../../src/modules/doubles-tournament/core/domain/QueuedTable';
import { TablesQueueRepository } from '../../../../../src/modules/doubles-tournament/core/application/TablesQueueRepository';
import { TablesQueue } from '../../../../../src/modules/doubles-tournament/core/domain/TablesQueue';
import { OptimisticLockingException } from '../../../../../src/shared/core/application/OptimisticLockingException';

export function TablesQueueRepositoryTestCases(props: {
  name: string;
  repositoryFactory: () => TablesQueueRepository;
  databaseTestSupport: DatabaseTestSupport;
}): void {
  return describe(props.name, () => {
    const entityIdGenerator: EntityIdGenerator = new UuidEntityIdGenerator();
    const tournamentId = TournamentId.from(entityIdGenerator.generate());
    let repository: TablesQueueRepository;
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

    beforeAll(async () => {
      await props.databaseTestSupport.openConnection();
    });
    beforeEach(() => {
      repository = props.repositoryFactory();
    });
    afterEach(async () => await props.databaseTestSupport.clearDatabase());
    afterAll(async () => await props.databaseTestSupport.closeConnection());

    test('findByTournamentId returns tables queue with given tournament id when it was created and saved', async () => {
      //When
      await repository.save(tablesQueue, 0);

      //Then
      expect(await repository.findByTournamentId(tournamentId.raw)).toStrictEqual({ state: tablesQueue, version: 1 });
    });

    test('findByTournamentId returns undefined when given tournament id when it was not found', async () => {
      //When
      await repository.save(tablesQueue, 0);

      //Then
      const notSavedTournamentId = entityIdGenerator.generate();
      expect(await repository.findByTournamentId(notSavedTournamentId)).toStrictEqual({ state: undefined, version: 0 });
    });

    test('optimistic locking | pass', async () => {
      await repository.save(tablesQueue, 0);
      expect(await repository.findByTournamentId(tournamentId.raw)).toStrictEqual({ state: tablesQueue, version: 1 });

      await repository.save(tablesQueue, 1);
      expect(await repository.findByTournamentId(tournamentId.raw)).toStrictEqual({ state: tablesQueue, version: 2 });
    });

    test('optimistic locking | fail', async () => {
      await repository.save(tablesQueue, 0);
      expect(await repository.findByTournamentId(tournamentId.raw)).toStrictEqual({ state: tablesQueue, version: 1 });

      await expect(repository.save(tablesQueue, 0)).rejects.toStrictEqual(new OptimisticLockingException(0));
      expect(await repository.findByTournamentId(tournamentId.raw)).toStrictEqual({ state: tablesQueue, version: 1 });
    });
  });
}
