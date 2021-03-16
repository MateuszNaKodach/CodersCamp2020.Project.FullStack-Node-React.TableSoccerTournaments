import { generateTournamentTeamsList } from '../domain/TouramentTeamsListGenerator';
import { FindTournamentTreeByTournamentId } from '../../../../../src/modules/tournament-tree/core/application/query/FindTournamentTreeByTournamentId';
import { NumberIdGeneratorStub } from '../../../../test-support/shared/core/NumberIdGeneratorStub';
import { CreateTournamentTree } from '../../../../../src/modules/tournament-tree/core/application/command/CreateTournamentTree';
import { testTournamentTreeModule } from './TestTournamentTreeModule';
import { TournamentTree } from '../../../../../src/modules/tournament-tree/core/domain/TournamentTree';

describe('Tournament Tree | Query Side', () => {
  it('FindTournamentTreeResult | No tournament tree', async () => {
    //Given
    const currentTime = new Date();
    const entityIdGen = NumberIdGeneratorStub(100, 'entityId');
    const tournamentTree = testTournamentTreeModule(currentTime, entityIdGen);

    //When
    const findTournamentTreeResult = await tournamentTree.executeQuery<FindTournamentTreeByTournamentId>(
      new FindTournamentTreeByTournamentId({ tournamentId: 'testNonExistId' }),
    );

    console.log(findTournamentTreeResult);
    //Then
    expect(findTournamentTreeResult).toBeUndefined();
  });

  it('FindTournamentTreeResult | One tournament tree was created', async () => {
    //Given
    const currentTime = new Date();
    const entityIdGen = NumberIdGeneratorStub(100, 'entityId');
    const teamEntityIdGenForTestedResult = NumberIdGeneratorStub(1000, 'team');
    const teamEntityIdGenForExpectedResult = NumberIdGeneratorStub(1000, 'match');
    const matchEntityIdGenForTestedResult = NumberIdGeneratorStub(1000, 'match');
    const tournamentTeamsListForTournamentTree = generateTournamentTeamsList(teamEntityIdGenForTestedResult, 4);
    const tournamentTeamsListForCommand = tournamentTeamsListForTournamentTree.map((item) => ({
      teamId: item.teamId.raw,
      firstTeamPlayer: teamEntityIdGenForTestedResult.generate(),
      secondTeamPlayer: teamEntityIdGenForTestedResult.generate(),
    }));
    const createTournamentTree = new CreateTournamentTree({
      tournamentId: 'testTournamentId',
      tournamentTeams: tournamentTeamsListForCommand,
    });
    const tournamentTreeModule = testTournamentTreeModule(currentTime, matchEntityIdGenForTestedResult);

    //When
    await tournamentTreeModule.executeCommand(createTournamentTree);
    const findTournamentTreeResult = await tournamentTreeModule.executeQuery<FindTournamentTreeByTournamentId>(
      new FindTournamentTreeByTournamentId({ tournamentId: 'testTournamentId' }),
    );

    //Then
    expect(findTournamentTreeResult).toStrictEqual(
      TournamentTree.createSingleTournamentTree({
        tournamentId: 'testTournamentId',
        tournamentTeams: tournamentTeamsListForTournamentTree,
        entityIdGenerator: teamEntityIdGenForExpectedResult,
      }),
    );

  });
});
