import { testDoublesTournamentsModule } from './TestDoublesTournamentsModule';
import { FromListIdGeneratorStub } from '../../../../test-support/shared/core/FromListIdGeneratorStub';
import { FindAllDoublesTournaments } from '../../../../../src/modules/doubles-tournament/core/application/query/FindAllDoublesTournaments';
import { CreateTournamentWithTeams } from '../../../../../src/modules/doubles-tournament/core/application/command/CreateTournamentWithTeams';
import { DoublesTournament } from '../../../../../src/modules/doubles-tournament/core/domain/DoublesTournament';
import { TournamentTeam } from '../../../../../src/modules/doubles-tournament/core/domain/TournamentTeam';
import { FindDoublesTournamentById } from '../../../../../src/modules/doubles-tournament/core/application/query/FindDoublesTournamentById';
import { TeamId } from '../../../../../src/modules/doubles-tournament/core/domain/TeamId';

describe('Doubles Tournament | Query Side', () => {
  it('FindAllDoublesTournamentsResult | No doubles tournaments', async () => {
    //Given
    const currentTime = new Date();
    const entityIdGen = FromListIdGeneratorStub(['TeamId1', 'TeamId2']);
    const doublesTournaments = testDoublesTournamentsModule(currentTime, entityIdGen);

    //When
    const findAllDoublesTournamentsResult = await doublesTournaments.executeQuery<FindAllDoublesTournaments>(
      new FindAllDoublesTournaments(),
    );

    //Then
    expect(findAllDoublesTournamentsResult).toBeEmpty();
  });

  it('FindAllDoublesTournamentsResult | One doubles tournament was created', async () => {
    //Given
    const currentTime = new Date();
    const entityIdGen = FromListIdGeneratorStub(['TeamId1', 'TeamId2']);
    const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen);
    const tournamentId = 'TournamentId';
    const tournamentPairs = [
      { player1: 'player1', player2: 'player2' },
      { player1: 'player3', player2: 'player4' },
    ];

    const createTournamentWithTeams = new CreateTournamentWithTeams(tournamentId, tournamentPairs);
    await doublesTournament.executeCommand(createTournamentWithTeams);

    //When
    const findAllDoublesTournamentsResult = await doublesTournament.executeQuery<FindAllDoublesTournaments>(
      new FindAllDoublesTournaments(),
    );

    //Then
    const tournamentTeams: TournamentTeam[] = [
      new TournamentTeam({ teamId: TeamId.from('TeamId1'), firstTeamPlayer: 'player1', secondTeamPlayer: 'player2' }),
      new TournamentTeam({ teamId: TeamId.from('TeamId2'), firstTeamPlayer: 'player3', secondTeamPlayer: 'player4' }),
    ];

    expect(findAllDoublesTournamentsResult).toIncludeSameMembers([
      new DoublesTournament({
        tournamentId: tournamentId,
        tournamentTeams: tournamentTeams,
      }),
    ]);
  });

  it('FindAllDoublesTournamentsResult | Two doubles tournaments were created', async () => {
    //Given
    const currentTime = new Date();
    const entityIdGen = FromListIdGeneratorStub(['TeamId1', 'TeamId2', 'TeamId3', 'TeamId4']);
    const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen);
    const tournamentId1 = 'TournamentId1';
    const tournamentId2 = 'TournamentId2';
    const tournamentPairs1 = [
      { player1: 'player1', player2: 'player2' },
      { player1: 'player3', player2: 'player4' },
    ];
    const tournamentPairs2 = [
      { player1: 'player5', player2: 'player6' },
      { player1: 'player7', player2: 'player8' },
    ];

    const createFirstTournamentWithTeams = new CreateTournamentWithTeams(tournamentId1, tournamentPairs1);
    await doublesTournament.executeCommand(createFirstTournamentWithTeams);

    const createSecondTournamentWithTeams = new CreateTournamentWithTeams(tournamentId2, tournamentPairs2);
    await doublesTournament.executeCommand(createSecondTournamentWithTeams);

    //When
    const findAllDoublesTournamentsResult = await doublesTournament.executeQuery<FindAllDoublesTournaments>(
      new FindAllDoublesTournaments(),
    );

    //Then
    const tournamentTeams1: TournamentTeam[] = [
      new TournamentTeam({ teamId: TeamId.from('TeamId1'), firstTeamPlayer: 'player1', secondTeamPlayer: 'player2' }),
      new TournamentTeam({ teamId: TeamId.from('TeamId2'), firstTeamPlayer: 'player3', secondTeamPlayer: 'player4' }),
    ];

    const tournamentTeams2: TournamentTeam[] = [
      new TournamentTeam({ teamId: TeamId.from('TeamId3'), firstTeamPlayer: 'player5', secondTeamPlayer: 'player6' }),
      new TournamentTeam({ teamId: TeamId.from('TeamId4'), firstTeamPlayer: 'player7', secondTeamPlayer: 'player8' }),
    ];

    expect(findAllDoublesTournamentsResult).toIncludeSameMembers([
      new DoublesTournament({
        tournamentId: tournamentId1,
        tournamentTeams: tournamentTeams1,
      }),
      new DoublesTournament({
        tournamentId: tournamentId2,
        tournamentTeams: tournamentTeams2,
      }),
    ]);
  });

  it('FindDoublesTournamentById | Tournament id exists', async () => {
    //Given
    const currentTime = new Date();
    const entityIdGen = FromListIdGeneratorStub(['TeamId1', 'TeamId2']);
    const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen);
    const tournamentId = 'TournamentId';
    const tournamentPairs = [
      { player1: 'player1', player2: 'player2' },
      { player1: 'player3', player2: 'player4' },
    ];

    const createTournamentWithTeams = new CreateTournamentWithTeams(tournamentId, tournamentPairs);
    await doublesTournament.executeCommand(createTournamentWithTeams);

    //When
    const findDoublesTournamentByIdResult = await doublesTournament.executeQuery<FindDoublesTournamentById>(
      new FindDoublesTournamentById({ tournamentId }),
    );

    //Then
    const tournamentTeams: TournamentTeam[] = [
      new TournamentTeam({ teamId: TeamId.from('TeamId1'), firstTeamPlayer: 'player1', secondTeamPlayer: 'player2' }),
      new TournamentTeam({ teamId: TeamId.from('TeamId2'), firstTeamPlayer: 'player3', secondTeamPlayer: 'player4' }),
    ];

    expect(findDoublesTournamentByIdResult).toStrictEqual(
      new DoublesTournament({
        tournamentId: tournamentId,
        tournamentTeams: tournamentTeams,
      }),
    );
  });

  it('FindDoublesTournamentById | Tournament id does not exist', async () => {
    //Given
    const currentTime = new Date();
    const entityIdGen = FromListIdGeneratorStub(['TeamId1', 'TeamId2']);
    const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen);
    const tournamentId = 'TournamentId';

    //When
    const findDoublesTournamentByIdResult = await doublesTournament.executeQuery<FindDoublesTournamentById>(
      new FindDoublesTournamentById({ tournamentId }),
    );

    //Then
    expect(findDoublesTournamentByIdResult).toBeUndefined();
  });
});
