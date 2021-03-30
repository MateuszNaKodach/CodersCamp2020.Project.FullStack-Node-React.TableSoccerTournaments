import {TournamentWasStarted} from '../../../../../src/modules/doubles-tournament/core/domain/event/TournamentWasStarted';
import {testTournamentTreeModule} from './TestTournamentTreeModule';
import {NumberIdGeneratorStub} from '../../../../test-support/shared/core/NumberIdGeneratorStub';
import {CreateTournamentTree} from '../../../../../src/modules/tournament-tree/core/application/command/CreateTournamentTree';
import {testDoublesTournamentsModule} from '../../../doubles-tournament/core/application/TestDoublesTournamentsModule';
import {FromListIdGeneratorStub} from '../../../../test-support/shared/core/FromListIdGeneratorStub';
import {EnqueueMatch} from '../../../../../src/modules/doubles-tournament/core/application/command/EnqueueMatch';
import {CreateTournamentWithTeams} from '../../../../../src/modules/doubles-tournament/core/application/command/CreateTournamentWithTeams';
import {CommandBus} from "../../../../../src/shared/core/application/command/CommandBus";
import {InMemoryCommandBus} from "../../../../../src/shared/infrastructure/core/application/command/InMemoryCommandBus";
import {StoreAndForwardDomainEventBus} from "../../../../../src/shared/infrastructure/core/application/event/StoreAndForwardDomainEventBus";
import {InMemoryDomainEventBus} from "../../../../../src/shared/infrastructure/core/application/event/InMemoryDomainEventBus";

describe('Automated match enqueueing', () => {
  it('When tournament was started, then enqueue all ready to start matches', async () => {
    //Given
    const currentTime = new Date();
    const entityIdGenFromList = FromListIdGeneratorStub(['team1', 'team2', 'team3', 'team4']);
    const entityIdGen = NumberIdGeneratorStub(100, 'entityId');
    const commandBus: CommandBus = new InMemoryCommandBus();
    const eventBus: StoreAndForwardDomainEventBus = new StoreAndForwardDomainEventBus(new InMemoryDomainEventBus());

    const spy = jest.spyOn(commandBus, `execute`)

    const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGenFromList, commandBus, eventBus);
    const tournament = new CreateTournamentWithTeams('SampleTournamentId', [
      { player1: 'player1', player2: 'player2' },
      { player1: 'player3', player2: 'player4' },
      { player1: 'player5', player2: 'player6' },
      { player1: 'player7', player2: 'player8' },
    ]);
    await doublesTournament.executeCommand(tournament);

    const tournamentTree = testTournamentTreeModule(currentTime, entityIdGen, commandBus, eventBus);
    await tournamentTree.executeCommand(createTestTournamentTreeWithFourTeams('SampleTournamentId'));

    spy.mockClear();

    //When
    const startedTournament = new TournamentWasStarted({ occurredAt: currentTime, tournamentId: 'SampleTournamentId' });
    await doublesTournament.publishEvent(startedTournament);

    //Then
    const firstMatchToEnqueue = new EnqueueMatch({
      tournamentId: 'SampleTournamentId',
      matchNumber: 1,
      team1Id: 'team1',
      team2Id: 'team4',
    })
    const secondMatchToEnqueue = new EnqueueMatch({
      tournamentId: 'SampleTournamentId',
      matchNumber: 2,
      team1Id: 'team3',
      team2Id: 'team2',
    });

    expect(spy).toBeCalledWith(firstMatchToEnqueue);
    expect(spy).toBeCalledWith(secondMatchToEnqueue);
    expect(spy).toHaveBeenCalledTimes(2);
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
