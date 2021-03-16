import { DoublesTournament } from '../../../../../src/modules/doubles-tournament/core/domain/DoublesTournament';
import { generateTournamentTeamsList } from '../domain/TouramentTeamsListGenerator';
import { FindTournamentTreeByTournamentId } from '../../../../../src/modules/tournament-tree/core/application/query/FindTournamentTreeByTournamentId';
import { testDoublesTournamentsModule } from '../../../doubles-tournament/core/application/TestDoublesTournamentsModule';
import { FindAllDoublesTournaments } from '../../../../../src/modules/doubles-tournament/core/application/query/FindAllDoublesTournaments';
import { NumberIdGeneratorStub } from '../../../../test-support/shared/core/NumberIdGeneratorStub';
import { CreateTournamentWithTeams } from '../../../../../src/modules/doubles-tournament/core/application/command/CreateTournamentWithTeams';
import { CreateTournamentTree } from '../../../../../src/modules/tournament-tree/core/application/command/CreateTournamentTree';
import { TeamId } from '../../../../../src/modules/doubles-tournament/core/domain/TeamId';
import { testTournamentTreeModule } from './TestTournamentTreeModule';
import { TournamentTeam } from '../../../../../src/modules/doubles-tournament/core/domain/TournamentTeam';
import { TournamentTree } from '../../../../../src/modules/tournament-tree/core/domain/TournamentTree';

describe('Tournament Tree | Query Side', () => {
  it('FindTournamentTreeResult | No tournament tree', async () => {
    //Given
    const currentTime = new Date();
    const entityIdGen = NumberIdGeneratorStub(100, 'entityId');
    // const teamEntityIdGen = NumberIdGeneratorStub(100, "teamId");
    // const playerEntityIdGen = NumberIdGeneratorStub(100, "playerId");
    const tournamentTree = testTournamentTreeModule(currentTime, entityIdGen);

    //When
    const findTournamentTreeResult = await tournamentTree.executeQuery<FindTournamentTreeByTournamentId>(
      new FindTournamentTreeByTournamentId({ tournamentId: 'testNonExistId' }),
    );

    console.log(findTournamentTreeResult);
    //Then
    // expect(findTournamentTreeResult).toBeEmpty();
    expect(findTournamentTreeResult).toBeUndefined();
    // expect(findAllDoublesTournamentsResult).toBeEmpty();
  });

  it('FindTournamentTreeResult | One tournament tree was created', async () => {
    //Given
    const currentTime = new Date();
    const entityIdGen = NumberIdGeneratorStub(100, 'entityId');
    // const teamEntityIdGen = NumberIdGeneratorStub(100, "teamId");
    // const playerEntityIdGen = NumberIdGeneratorStub(100, "playerId");
    const teamEntityIdGenForTestedResult = NumberIdGeneratorStub(1000, 'team');
    const teamEntityIdGenForExpectedResult = NumberIdGeneratorStub(1000, 'match');
    const matchEntityIdGenForTestedResult = NumberIdGeneratorStub(1000, 'match');
    const tournamentTeamsListForTournamentTree = generateTournamentTeamsList(teamEntityIdGenForTestedResult, 4);

    const tournamentTeamsListForCommand = tournamentTeamsListForTournamentTree.map((item) => ({
      teamId: item.teamId.raw,
      firstTeamPlayer: teamEntityIdGenForTestedResult.generate(),
      secondTeamPlayer: teamEntityIdGenForTestedResult.generate(),
    }));

    // //When
    // const tournamentTree: TournamentTree = TournamentTree.createSingleTournamentTree({
    //   tournamentId: testTournamentId.generate(),
    //   tournamentTeams: tournamentTeamsList,
    //   entityIdGenerator: matchEntityIdGen,
    // });

    const createTournamentTree = new CreateTournamentTree({
      tournamentId: 'testTournamentId',
      tournamentTeams: tournamentTeamsListForCommand,
    });

    const tournamentTreeModule = testTournamentTreeModule(currentTime, matchEntityIdGenForTestedResult);
    await tournamentTreeModule.executeCommand(createTournamentTree);
    //When
    const findTournamentTreeResult = await tournamentTreeModule.executeQuery<FindTournamentTreeByTournamentId>(
      new FindTournamentTreeByTournamentId({ tournamentId: 'testTournamentId' }),
    );

    console.log(findTournamentTreeResult);

    expect(findTournamentTreeResult).toStrictEqual(
      TournamentTree.createSingleTournamentTree({
        tournamentId: 'testTournamentId',
        tournamentTeams: tournamentTeamsListForTournamentTree,
        entityIdGenerator: teamEntityIdGenForExpectedResult,
      }),
    );

    //Then
    // expect(findTournamentTreeResult).toBeEmpty();
    // expect(findTournamentTreeResult).toBeUndefined();

    // expect(findAllDoublesTournamentsResult).toBeEmpty();
    //
    //
    // const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen);
    // const tournamentId = 'TournamentId';
    // const tournamentPairs = [
    //     {player1: 'player1', player2: 'player2'},
    //     {player1: 'player3', player2: 'player4'},
    // ];
    //
    // const createTournamentWithTeams = new CreateTournamentWithTeams(tournamentId, tournamentPairs);
    // await doublesTournament.executeCommand(createTournamentWithTeams);
    //
    // //When
    // const findAllDoublesTournamentsResult = await doublesTournament.executeQuery<FindAllDoublesTournaments>(
    //     new FindAllDoublesTournaments(),
    // );
    //
    // //Then
    // const tournamentTeams: TournamentTeam[] = [
    //     new TournamentTeam({
    //         teamId: TeamId.from('TeamId1'),
    //         firstTeamPlayer: 'player1',
    //         secondTeamPlayer: 'player2'
    //     }),
    //     new TournamentTeam({
    //         teamId: TeamId.from('TeamId2'),
    //         firstTeamPlayer: 'player3',
    //         secondTeamPlayer: 'player4'
    //     }),
    // ];

    // expect(findAllDoublesTournamentsResult).toIncludeSameMembers([
    //     new DoublesTournament({
    //         tournamentId: tournamentId,
    //         tournamentTeams: tournamentTeams,
    //     }),
    // ]);
  });

  // it('FindAllDoublesTournamentsResult | Two doubles tournaments were created', async () => {
  //   //Given
  //   const currentTime = new Date();
  //   const entityIdGen = FromListIdGeneratorStub(['TeamId1', 'TeamId2', 'TeamId3', 'TeamId4']);
  //   const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen);
  //   const tournamentId1 = 'TournamentId1';
  //   const tournamentId2 = 'TournamentId2';
  //   const tournamentPairs1 = [
  //     { player1: 'player1', player2: 'player2' },
  //     { player1: 'player3', player2: 'player4' },
  //   ];
  //   const tournamentPairs2 = [
  //     { player1: 'player5', player2: 'player6' },
  //     { player1: 'player7', player2: 'player8' },
  //   ];
  //
  //   const createFirstTournamentWithTeams = new CreateTournamentWithTeams(tournamentId1, tournamentPairs1);
  //   await doublesTournament.executeCommand(createFirstTournamentWithTeams);
  //
  //   const createSecondTournamentWithTeams = new CreateTournamentWithTeams(tournamentId2, tournamentPairs2);
  //   await doublesTournament.executeCommand(createSecondTournamentWithTeams);
  //
  //   //When
  //   const findAllDoublesTournamentsResult = await doublesTournament.executeQuery<FindAllDoublesTournaments>(
  //     new FindAllDoublesTournaments(),
  //   );
  //
  //   //Then
  //   const tournamentTeams1: TournamentTeam[] = [
  //     new TournamentTeam({ teamId: TeamId.from('TeamId1'), firstTeamPlayer: 'player1', secondTeamPlayer: 'player2' }),
  //     new TournamentTeam({ teamId: TeamId.from('TeamId2'), firstTeamPlayer: 'player3', secondTeamPlayer: 'player4' }),
  //   ];
  //
  //   const tournamentTeams2: TournamentTeam[] = [
  //     new TournamentTeam({ teamId: TeamId.from('TeamId3'), firstTeamPlayer: 'player5', secondTeamPlayer: 'player6' }),
  //     new TournamentTeam({ teamId: TeamId.from('TeamId4'), firstTeamPlayer: 'player7', secondTeamPlayer: 'player8' }),
  //   ];
  //
  //   expect(findAllDoublesTournamentsResult).toIncludeSameMembers([
  //     new DoublesTournament({
  //       tournamentId: tournamentId1,
  //       tournamentTeams: tournamentTeams1,
  //     }),
  //     new DoublesTournament({
  //       tournamentId: tournamentId2,
  //       tournamentTeams: tournamentTeams2,
  //     }),
  //   ]);
  // });
  //
  // it('FindDoublesTournamentById | Tournament id exists', async () => {
  //   //Given
  //   const currentTime = new Date();
  //   const entityIdGen = FromListIdGeneratorStub(['TeamId1', 'TeamId2']);
  //   const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen);
  //   const tournamentId = 'TournamentId';
  //   const tournamentPairs = [
  //     { player1: 'player1', player2: 'player2' },
  //     { player1: 'player3', player2: 'player4' },
  //   ];
  //
  //   const createTournamentWithTeams = new CreateTournamentWithTeams(tournamentId, tournamentPairs);
  //   await doublesTournament.executeCommand(createTournamentWithTeams);
  //
  //   //When
  //   const findDoublesTournamentByIdResult = await doublesTournament.executeQuery<FindDoublesTournamentById>(
  //     new FindDoublesTournamentById({ tournamentId }),
  //   );
  //
  //   //Then
  //   const tournamentTeams: TournamentTeam[] = [
  //     new TournamentTeam({ teamId: TeamId.from('TeamId1'), firstTeamPlayer: 'player1', secondTeamPlayer: 'player2' }),
  //     new TournamentTeam({ teamId: TeamId.from('TeamId2'), firstTeamPlayer: 'player3', secondTeamPlayer: 'player4' }),
  //   ];
  //
  //   expect(findDoublesTournamentByIdResult).toStrictEqual(
  //     new DoublesTournament({
  //       tournamentId: tournamentId,
  //       tournamentTeams: tournamentTeams,
  //     }),
  //   );
  // });
  //
  // it('FindDoublesTournamentById | Tournament id does not exist', async () => {
  //   //Given
  //   const currentTime = new Date();
  //   const entityIdGen = FromListIdGeneratorStub(['TeamId1', 'TeamId2']);
  //   const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen);
  //   const tournamentId = 'TournamentId';
  //
  //   //When
  //   const findDoublesTournamentByIdResult = await doublesTournament.executeQuery<FindDoublesTournamentById>(
  //     new FindDoublesTournamentById({ tournamentId }),
  //   );
  //
  //   //Then
  //   expect(findDoublesTournamentByIdResult).toBeUndefined();
  // });
});
