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

    test('When no table is saved for given tournamentId with given tableNumber then findByTournamentIdAndTableNumber returns undefined', async () => {
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
      expect(await repository.findByTournamentIdAndTableNumber(notSavedTournamentId, 2)).toBeUndefined();
      expect(await repository.findByTournamentIdAndTableNumber(tournamentId, 3)).toBeUndefined();
    });

    test('When table with given tableNumber assigned to given tournamentId was saved then findByTournamentIdAndTableNumber returns table', async () => {
      const tournamentId = entityIdGenerator.generate();
      const tournamentTables: TournamentTable[] = [
        new TournamentTable({
          tournamentId,
          tableNumber: TableNumber.from(1),
          tableName: 'Roberto',
          availableToPlay: true,
        }),
        new TournamentTable({
          tournamentId,
          tableNumber: TableNumber.from(2),
          tableName: 'Tornado',
          availableToPlay: false,
        }),
      ];

      await repository.saveAll(tournamentTables);

      expect(await repository.findByTournamentIdAndTableNumber(tournamentId, 2)).toStrictEqual(tournamentTables[1]);
    });

    test('When no table is saved for given tournamentId then findAllByTournamentId returns empty array', async () => {
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

    test('When tables assigned to given tournamentId were saved then findAllByTournamentId returns tables', async () => {
      const tournamentId = entityIdGenerator.generate();
      const tournamentTables: TournamentTable[] = [
        new TournamentTable({
          tournamentId,
          tableNumber: TableNumber.from(1),
          tableName: 'Roberto',
          availableToPlay: false,
        }),
        new TournamentTable({
          tournamentId,
          tableNumber: TableNumber.from(2),
          tableName: 'Tornado',
          availableToPlay: true,
        }),
      ];

      await repository.saveAll(tournamentTables);

      expect(await repository.findAllByTournamentId(tournamentId)).toStrictEqual(tournamentTables);
    });
  });
}
