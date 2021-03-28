import { TournamentWasStarted } from '../../../../../src/modules/doubles-tournament/core/domain/event/TournamentWasStarted';
import { testTournamentTreeModule } from './TestTournamentTreeModule';
import { NumberIdGeneratorStub } from '../../../../test-support/shared/core/NumberIdGeneratorStub';
import { CreateTournamentTree } from '../../../../../src/modules/tournament-tree/core/application/command/CreateTournamentTree';
import { testDoublesTournamentsModule } from '../../../doubles-tournament/core/application/TestDoublesTournamentsModule';
import { InMemoryCommandBus } from '../../../../../src/shared/infrastructure/core/application/command/InMemoryCommandBus';
import { FromListIdGeneratorStub } from '../../../../test-support/shared/core/FromListIdGeneratorStub';
import { EnqueueMatch } from '../../../../../src/modules/doubles-tournament/core/application/command/EnqueueMatch';
import { CreateTournamentWithTeams } from '../../../../../src/modules/doubles-tournament/core/application/command/CreateTournamentWithTeams';

describe('Automated match enqueueing', () => {
  it('When tournament was started, then enqueue all ready to start matches', async () => {
    //Given
    const currentTime = new Date();
    const entityIdGenFromList = FromListIdGeneratorStub(['team1', 'team2', 'team3', 'team4']);
    const entityIdGen = NumberIdGeneratorStub(100, 'entityId');
    const commandBus = new InMemoryCommandBus();

    const tournamentTree = testTournamentTreeModule(currentTime, entityIdGen);
    await tournamentTree.executeCommand(createTestTournamentTreeWithFourTeams('SampleTournamentId'));

    const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGenFromList, commandBus);
    const tournament = new CreateTournamentWithTeams('SampleTournamentId', [
      { player1: 'player1', player2: 'player2' },
      { player1: 'player3', player2: 'player4' },
    ]);
    await doublesTournament.executeCommand(tournament);

    //When
    const startedTournament = new TournamentWasStarted({ occurredAt: currentTime, tournamentId: 'SampleTournamentId' });
    doublesTournament.publishEvent(startedTournament);

    //Then
    const firstMatchToEnqueue = new EnqueueMatch({
      tournamentId: 'SampleTournamentId',
      matchNumber: 1,
      team1Id: 'team1',
      team2Id: 'team4',
    });
    const commandResult = await doublesTournament.executeCommand(firstMatchToEnqueue);

    expect(commandResult.isSuccess()).toBeTruthy();
  });
});

function createTestTournamentTreeWithFourTeams(sampleTournamentTreeId: string) {
  return new CreateTournamentTree({
    tournamentId: sampleTournamentTreeId,
    tournamentTeams: [
      {
        teamId: 'team1',
        firstTeamPlayer: 'player1',
        secondTeamPlayer: 'player2',
      },
      {
        teamId: 'team2',
        firstTeamPlayer: 'player3',
        secondTeamPlayer: 'player4',
      },
      {
        teamId: 'team3',
        firstTeamPlayer: 'player5',
        secondTeamPlayer: 'player6',
      },
      {
        teamId: 'team4',
        firstTeamPlayer: 'player7',
        secondTeamPlayer: 'player8',
      },
    ],
  });
}
