import { testCreateTournamentWithTeamsModule } from './TestCreateTournamentWithTeamsModule';
import { CreateTournamentWithTeams } from '../../../../../src/modules/doubles-tournament/core/application/command/CreateTournamentWithTeams';
import { TournamentWithTeamsWasCreated } from '../../../../../src/modules/doubles-tournament/core/domain/event/TournamentWithTeamsWasCreated';
import { TournamentTeam } from '../../../../../src/modules/doubles-tournament/core/domain/TournamentTeam';
import { TeamIdGeneratorStub } from '../../../../test-support/shared/core/TeamIdGeneratorStub';

describe('Create Tournament With Teams', () => {
  it('given only 1 pair of players, when create tournament, then tournament was created with 1 team', async () => {
    //Given
    const currentTime = new Date();
    const entityIdGen = TeamIdGeneratorStub(['TeamId']);
    const tournamentCreation = testCreateTournamentWithTeamsModule(currentTime, entityIdGen);
    const tournamentId = 'TournamentId';
    const teamId = 'TeamId';
    const tournamentPairs = [{ player1: 'player1', player2: 'player2' }];
    const tournamentTeams: TournamentTeam[] = [
      new TournamentTeam({
        teamId,
        firstTeamPlayer: 'player1',
        secondTeamPlayer: 'player2',
      }),
    ];

    //When
    const createTournamentWithTeams = new CreateTournamentWithTeams(tournamentId, tournamentPairs);
    const commandResult = await tournamentCreation.executeCommand(createTournamentWithTeams);

    //Then
    expect(commandResult.isSuccess()).toBeTruthy();
    debugger;
    expect(tournamentCreation.lastPublishedEvent()).toStrictEqual(
      new TournamentWithTeamsWasCreated({ occurredAt: currentTime, tournamentId, tournamentTeams }),
    );
  });

  it('given 3 pairs of players, when create tournament, then tournament was created with 3 teams', async () => {
    //Given
    const currentTime = new Date();
    const entityIdGen = TeamIdGeneratorStub(['TeamId1', 'TeamId2', 'TeamId3', 'TeamId4']);

    const tournamentCreation = testCreateTournamentWithTeamsModule(currentTime, entityIdGen);
    const tournamentId = 'TournamentId';

    const tournamentPairs = [
      { player1: 'player1', player2: 'player2' },
      { player1: 'player3', player2: 'player4' },
      { player1: 'player5', player2: 'player6' },
      { player1: 'player7', player2: 'player8' },
    ];
    const tournamentTeams: TournamentTeam[] = [
      new TournamentTeam({ teamId: 'TeamId1', firstTeamPlayer: 'player1', secondTeamPlayer: 'player2' }),
      new TournamentTeam({ teamId: 'TeamId2', firstTeamPlayer: 'player3', secondTeamPlayer: 'player4' }),
      new TournamentTeam({ teamId: 'TeamId3', firstTeamPlayer: 'player5', secondTeamPlayer: 'player6' }),
      new TournamentTeam({ teamId: 'TeamId4', firstTeamPlayer: 'player7', secondTeamPlayer: 'player8' }),
    ];

    //When
    const createTournamentWithTeams = new CreateTournamentWithTeams(tournamentId, tournamentPairs);
    const commandResult = await tournamentCreation.executeCommand(createTournamentWithTeams);

    //Then
    expect(commandResult.isSuccess()).toBeTruthy();
    debugger;
    expect(tournamentCreation.lastPublishedEvent()).toStrictEqual(
      new TournamentWithTeamsWasCreated({ occurredAt: currentTime, tournamentId, tournamentTeams }),
    );
  });
});
