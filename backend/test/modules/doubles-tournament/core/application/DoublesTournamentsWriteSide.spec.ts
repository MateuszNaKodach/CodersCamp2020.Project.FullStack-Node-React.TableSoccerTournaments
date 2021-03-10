import {testDoublesTournamentsModule} from './TestDoublesTournamentsModule';
import {CreateTournamentWithTeams} from '../../../../../src/modules/doubles-tournament/core/application/command/CreateTournamentWithTeams';
import {TournamentWithTeamsWasCreated} from '../../../../../src/modules/doubles-tournament/core/domain/event/TournamentWithTeamsWasCreated';
import {FromListIdGeneratorStub} from '../../../../test-support/shared/core/FromListIdGeneratorStub';
import {CommandResult} from '../../../../../src/shared/core/application/command/CommandResult';
import {TeamId} from '../../../../../src/modules/doubles-tournament/core/domain/TeamId';
import Failure = CommandResult.Failure;

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
    expect(commandResult.isSuccess()).toBeTruthy();
    expect(doublesTournament.lastPublishedEvent()).toStrictEqual(
      new TournamentWithTeamsWasCreated({ occurredAt: currentTime, tournamentId, tournamentTeams: [{ teamId: 'TeamId1', firstTeamPlayerId: 'player1', secondTeamPlayerId: 'player2' },{ teamId: 'TeamId2', firstTeamPlayerId: 'player3', secondTeamPlayerId: 'player4' }] }),
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
    expect(commandResult.isSuccess()).toBeTruthy();
    expect(doublesTournament.lastPublishedEvent()).toStrictEqual(
      new TournamentWithTeamsWasCreated({ occurredAt: currentTime, tournamentId, tournamentTeams: [{ teamId: 'TeamId1', firstTeamPlayerId: 'player1', secondTeamPlayerId: 'player2' }, { teamId: 'TeamId2', firstTeamPlayerId: 'player3', secondTeamPlayerId: 'player4' }, { teamId: 'TeamId3', firstTeamPlayerId: 'player5', secondTeamPlayerId: 'player6' }, { teamId: 'TeamId4', firstTeamPlayerId: 'player7', secondTeamPlayerId: 'player8' }] }),
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
