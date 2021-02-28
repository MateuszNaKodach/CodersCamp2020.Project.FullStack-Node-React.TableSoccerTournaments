import { DoublesTournamentRepository } from '../../../../../../src/modules/doubles-tournament/core/application/DoublesTournamentRepository';
import { DatabaseTestSupport } from '../../../../../test-support/shared/infrastructure/DatabaseTestSupport';
import { EntityIdGenerator } from '../../../../../../src/shared/core/application/EntityIdGenerator';
import { UuidEntityIdGenerator } from '../../../../../../src/shared/infrastructure/core/application/UuidEntityIdGenerator';
import { DoublesTournament } from '../../../../../../src/modules/doubles-tournament/core/domain/DoublesTournament';
import { TournamentTeam } from '../../../../../../src/modules/doubles-tournament/core/domain/TournamentTeam';
import { TeamId } from '../../../../../../src/modules/doubles-tournament/core/domain/TeamId';

export function DoublesTournamentRepositoryTestCases(props: {
  name: string;
  repositoryFactory: () => DoublesTournamentRepository;
  databaseTestSupport: DatabaseTestSupport;
}): void {
  return describe(props.name, () => {
    const entityIdGenerator: EntityIdGenerator = new UuidEntityIdGenerator();
    let repository: DoublesTournamentRepository;

    beforeAll(async () => {
      await props.databaseTestSupport.openConnection();
      repository = props.repositoryFactory();
    });
    afterEach(async () => await props.databaseTestSupport.clearDatabase());
    afterAll(async () => await props.databaseTestSupport.closeConnection());

    test('findAll returns empty list when nothing was saved', async () => {
      expect(await repository.findAll()).toBeEmpty();
    });

    test('findAll returns all saved doubles tournaments', async () => {
      const tournamentId1 = entityIdGenerator.generate();
      const tournamentTeams1: TournamentTeam[] = [
        new TournamentTeam({
          teamId: TeamId.from('TeamId1'),
          firstTeamPlayer: 'player1',
          secondTeamPlayer: 'player2',
        }),
        new TournamentTeam({
          teamId: TeamId.from('TeamId2'),
          firstTeamPlayer: 'player3',
          secondTeamPlayer: 'player4',
        }),
      ];
      const doublesTournament1 = new DoublesTournament({
        tournamentId: tournamentId1,
        tournamentTeams: tournamentTeams1,
      });

      const tournamentId2 = entityIdGenerator.generate();
      const tournamentTeams2: TournamentTeam[] = [
        new TournamentTeam({ teamId: TeamId.from('TeamId1'), firstTeamPlayer: 'player1', secondTeamPlayer: 'player2' }),
        new TournamentTeam({ teamId: TeamId.from('TeamId2'), firstTeamPlayer: 'player3', secondTeamPlayer: 'player4' }),
        new TournamentTeam({ teamId: TeamId.from('TeamId3'), firstTeamPlayer: 'player5', secondTeamPlayer: 'player6' }),
        new TournamentTeam({ teamId: TeamId.from('TeamId4'), firstTeamPlayer: 'player7', secondTeamPlayer: 'player8' }),
      ];
      const doublesTournament2 = new DoublesTournament({
        tournamentId: tournamentId2,
        tournamentTeams: tournamentTeams2,
      });

      await repository.save(doublesTournament1);
      await repository.save(doublesTournament2);

      expect(await repository.findAll()).toStrictEqual([doublesTournament1, doublesTournament2]);
    });

    test('findByDoublesTournamentId returns doubles tournament with given id when it was saved', async () => {
      const tournamentId = entityIdGenerator.generate();
      const tournamentTeams: TournamentTeam[] = [
        new TournamentTeam({
          teamId: TeamId.from('TeamId1'),
          firstTeamPlayer: 'player1',
          secondTeamPlayer: 'player2',
        }),
        new TournamentTeam({
          teamId: TeamId.from('TeamId2'),
          firstTeamPlayer: 'player3',
          secondTeamPlayer: 'player4',
        }),
      ];
      const doublesTournament = new DoublesTournament({
        tournamentId: tournamentId,
        tournamentTeams: tournamentTeams,
      });

      await repository.save(doublesTournament);

      expect(await repository.findByTournamentId(tournamentId)).toStrictEqual(doublesTournament);
    });

    test('findByDoublesTournamentId returns undefined when doubles tournament with given id was not saved', async () => {
      const tournamentId = entityIdGenerator.generate();
      const tournamentTeams: TournamentTeam[] = [
        new TournamentTeam({
          teamId: TeamId.from('TeamId1'),
          firstTeamPlayer: 'player1',
          secondTeamPlayer: 'player2',
        }),
        new TournamentTeam({
          teamId: TeamId.from('TeamId2'),
          firstTeamPlayer: 'player3',
          secondTeamPlayer: 'player4',
        }),
      ];
      const doublesTournament = new DoublesTournament({
        tournamentId: tournamentId,
        tournamentTeams: tournamentTeams,
      });

      await repository.save(doublesTournament);

      const notSavedTournamentId = entityIdGenerator.generate();
      expect(await repository.findByTournamentId(notSavedTournamentId)).toBeUndefined();
    });
  });
}
