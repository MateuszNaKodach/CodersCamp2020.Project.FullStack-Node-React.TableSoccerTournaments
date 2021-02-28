import { testDoublesTournamentsModule } from './TestDoublesTournamentsModule';
import { CreateTournamentWithTeams } from '../../../../../src/modules/doubles-tournament/core/application/command/CreateTournamentWithTeams';
import { TournamentWithTeamsWasCreated } from '../../../../../src/modules/doubles-tournament/core/domain/event/TournamentWithTeamsWasCreated';
import { TournamentTeam } from '../../../../../src/modules/doubles-tournament/core/domain/TournamentTeam';
import { FromListIdGeneratorStub } from '../../../../test-support/shared/core/FromListIdGeneratorStub';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';
import Failure = CommandResult.Failure;
import { TeamId } from '../../../../../src/modules/doubles-tournament/core/domain/TeamId';

describe('Doubles Tournament | Write Side', () => {
  it('given 2 pairs of players, when create tournament, then tournament was created with 2 teams', async () => {
    //Given
    const currentTime = new Date();
    const entityIdGen = FromListIdGeneratorStub(['TeamId1', 'TeamId2']);
    const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen);
    const tournamentId = 'TournamentId';
    const tournamentPairs = [
      { player1: 'player1', player2: 'player2' },
      { player1: 'player3', player2: 'player4' },
    ];

    //When
    const createTournamentWithTeams = new CreateTournamentWithTeams(tournamentId, tournamentPairs);
    const commandResult = await doublesTournament.executeCommand(createTournamentWithTeams);

    //Then
    const tournamentTeams: TournamentTeam[] = [
      new TournamentTeam({ teamId: TeamId.from('TeamId1'), firstTeamPlayer: 'player1', secondTeamPlayer: 'player2' }),
      new TournamentTeam({ teamId: TeamId.from('TeamId2'), firstTeamPlayer: 'player3', secondTeamPlayer: 'player4' }),
    ];

    expect(commandResult.isSuccess()).toBeTruthy();
    debugger;
    expect(doublesTournament.lastPublishedEvent()).toStrictEqual(
      new TournamentWithTeamsWasCreated({ occurredAt: currentTime, tournamentId, tournamentTeams }),
    );
  });

  it('given 4 pairs of players, when create tournament, then tournament was created with 4 teams', async () => {
    //Given
    const currentTime = new Date();
    const entityIdGen = FromListIdGeneratorStub(['TeamId1', 'TeamId2', 'TeamId3', 'TeamId4']);
    const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen);
    const tournamentId = 'TournamentId';

    const tournamentPairs = [
      { player1: 'player1', player2: 'player2' },
      { player1: 'player3', player2: 'player4' },
      { player1: 'player5', player2: 'player6' },
      { player1: 'player7', player2: 'player8' },
    ];

    //When
    const createTournamentWithTeams = new CreateTournamentWithTeams(tournamentId, tournamentPairs);
    const commandResult = await doublesTournament.executeCommand(createTournamentWithTeams);

    //Then
    const tournamentTeams: TournamentTeam[] = [
      new TournamentTeam({ teamId: TeamId.from('TeamId1'), firstTeamPlayer: 'player1', secondTeamPlayer: 'player2' }),
      new TournamentTeam({ teamId: TeamId.from('TeamId2'), firstTeamPlayer: 'player3', secondTeamPlayer: 'player4' }),
      new TournamentTeam({ teamId: TeamId.from('TeamId3'), firstTeamPlayer: 'player5', secondTeamPlayer: 'player6' }),
      new TournamentTeam({ teamId: TeamId.from('TeamId4'), firstTeamPlayer: 'player7', secondTeamPlayer: 'player8' }),
    ];

    expect(commandResult.isSuccess()).toBeTruthy();
    debugger;
    expect(doublesTournament.lastPublishedEvent()).toStrictEqual(
      new TournamentWithTeamsWasCreated({ occurredAt: currentTime, tournamentId, tournamentTeams }),
    );
  });

  it('given no pairs, when create tournament, then command should fail', async () => {
    //Given
    const currentTime = new Date();
    const entityIdGen = FromListIdGeneratorStub(['TeamId']);
    const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen);
    const tournamentId = 'TournamentId';
    const tournamentPairs: { player1: string; player2: string }[] = [];

    //When
    const createTournamentWithTeams = new CreateTournamentWithTeams(tournamentId, tournamentPairs);
    const commandResult = await doublesTournament.executeCommand(createTournamentWithTeams);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Tournament must have at least 2 pairs of players.'));
  });

  it('given only 1 pair of players, when create tournament, then command should fail', async () => {
    //Given
    const currentTime = new Date();
    const entityIdGen = FromListIdGeneratorStub(['TeamId']);
    const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen);
    const tournamentId = 'TournamentId';
    const tournamentPairs = [{ player1: 'player1', player2: 'player2' }];

    //When
    const createTournamentWithTeams = new CreateTournamentWithTeams(tournamentId, tournamentPairs);
    const commandResult = await doublesTournament.executeCommand(createTournamentWithTeams);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error('Tournament must have at least 2 pairs of players.'));
  });

  it('given tournament with certain id, when attempt to create tournament with the same id, command should fail', async () => {
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
    const commandResult = await doublesTournament.executeCommand(createTournamentWithTeams);

    //Then
    expect(commandResult.isSuccess()).toBeFalsy();
    expect((commandResult as Failure).reason).toStrictEqual(new Error('This tournament already exists.'));
  });
});
