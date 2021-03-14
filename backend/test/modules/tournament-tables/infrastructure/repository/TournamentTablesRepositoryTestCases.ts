import { TournamentTablesRepository } from '../../../../../src/modules/tournament-tables/core/application/TournamentTablesRepository';
import { DatabaseTestSupport } from '../../../../test-support/shared/infrastructure/DatabaseTestSupport';
import { TournamentTable } from '../../../../../src/modules/tournament-tables/core/domain/TournamentTable';
import { TableNumber } from '../../../../../src/modules/tournament-tables/core/domain/TableNumber';
import { EntityIdGenerator } from '../../../../../src/shared/core/application/EntityIdGenerator';
import { UuidEntityIdGenerator } from '../../../../../src/shared/infrastructure/core/application/UuidEntityIdGenerator';

export function TournamentTablesRepositoryTestCases(props: {
  name: string;
  repositoryFactory: () => TournamentTablesRepository;
  databaseTestSupport: DatabaseTestSupport;
}): void {
  return describe(props.name, () => {
    const entityIdGenerator: EntityIdGenerator = new UuidEntityIdGenerator();
    let repository: TournamentTablesRepository;

    beforeAll(async () => {
      await props.databaseTestSupport.openConnection();
      repository = props.repositoryFactory();
    });
    afterEach(async () => await props.databaseTestSupport.clearDatabase());
    afterAll(async () => await props.databaseTestSupport.closeConnection());

    test('findAllByTournamentId returns empty array when no table is saved for given tournamentId', async () => {
      const tournamentId = entityIdGenerator.generate();
      const tournamentTables: TournamentTable[] = [
        new TournamentTable({
          tournamentId,
          tableNumber: TableNumber.from(1),
          tableName: 'Roberto',
        }),
        new TournamentTable({
          tournamentId,
          tableNumber: TableNumber.from(2),
          tableName: 'Tornado',
        }),
      ];

      await repository.saveAll(tournamentTables);

      const notSavedTournamentId = entityIdGenerator.generate();
      expect(await repository.findAllByTournamentId(notSavedTournamentId)).toStrictEqual([]);
    });

    test('findAllByTournamentId returns tables assigned to given tournament when were saved', async () => {
      const tournamentId = entityIdGenerator.generate();
      const tournamentTables: TournamentTable[] = [
        new TournamentTable({
          tournamentId,
          tableNumber: TableNumber.from(1),
          tableName: 'Roberto',
        }),
        new TournamentTable({
          tournamentId,
          tableNumber: TableNumber.from(2),
          tableName: 'Tornado',
        }),
      ];

      await repository.saveAll(tournamentTables);

      expect(await repository.findAllByTournamentId(tournamentId)).toStrictEqual(tournamentTables);
    });
  });
}
