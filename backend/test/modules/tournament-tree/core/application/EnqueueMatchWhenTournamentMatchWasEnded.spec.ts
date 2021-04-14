import { TournamentWasStarted } from '../../../../../src/modules/doubles-tournament/core/domain/event/TournamentWasStarted';
import { testTournamentTreeModule } from './TestTournamentTreeModule';
import { NumberIdGeneratorStub } from '../../../../test-support/shared/core/NumberIdGeneratorStub';
import { CreateTournamentTree } from '../../../../../src/modules/tournament-tree/core/application/command/CreateTournamentTree';
import { testDoublesTournamentsModule } from '../../../doubles-tournament/core/application/TestDoublesTournamentsModule';
import { FromListIdGeneratorStub } from '../../../../test-support/shared/core/FromListIdGeneratorStub';
import { EnqueueMatch } from '../../../../../src/modules/doubles-tournament/core/application/command/EnqueueMatch';
import { CommandBus } from '../../../../../src/shared/core/application/command/CommandBus';
import { InMemoryCommandBus } from '../../../../../src/shared/infrastructure/core/application/command/InMemoryCommandBus';
import { StoreAndForwardDomainEventBus } from '../../../../../src/shared/infrastructure/core/application/event/StoreAndForwardDomainEventBus';
import { InMemoryDomainEventBus } from '../../../../../src/shared/infrastructure/core/application/event/InMemoryDomainEventBus';
import { TournamentMatchWasEnded } from '../../../../../src/modules/doubles-tournament/core/domain/event/TournamentMatchWasEnded';
import waitForExpect from 'wait-for-expect';

describe('Enqueueing next level matches', () => {
  const currentTime = new Date();
  const tournamentId = 'SampleTournamentId';
  const [team1Id, team2Id, team3Id, team4Id, team5Id] = ['team1', 'team2', 'team3', 'team4', 'team5'];
  const entityIdGenFromList = FromListIdGeneratorStub([team1Id, team2Id, team3Id, team4Id, team5Id]);
  const entityIdGen = NumberIdGeneratorStub(100, 'entityId');
  const commandBus: CommandBus = new InMemoryCommandBus();
  const eventBus: StoreAndForwardDomainEventBus = new StoreAndForwardDomainEventBus(new InMemoryDomainEventBus());
  const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGenFromList, commandBus, eventBus);
  const tournamentTree = testTournamentTreeModule(currentTime, entityIdGen, commandBus, eventBus);
  const spy = jest.spyOn(commandBus, `execute`);

  it('When both tournament matches ended, then enqueue next level match', async () => {
    //Given
    await tournamentTree.executeCommand(createTestTournamentTree(tournamentId));
    spy.mockClear();
    const startedTournament = new TournamentWasStarted({ occurredAt: currentTime, tournamentId: tournamentId });
    await doublesTournament.publishEvent(startedTournament);
    expect(spy).toBeCalledWith(
      new EnqueueMatch({
        tournamentId: tournamentId,
        matchNumber: 2,
        team1Id: team5Id,
        team2Id: team4Id,
      }),
    );
    expect(spy).toBeCalledWith(
      new EnqueueMatch({
        tournamentId: tournamentId,
        matchNumber: 6,
        team1Id: team3Id,
        team2Id: team2Id,
      }),
    );

    //When
    const tournamentMatchWasEnded = new TournamentMatchWasEnded({
      occurredAt: currentTime,
      tournamentId: tournamentId,
      matchNumber: 2,
      winnerId: team5Id,
    });
    doublesTournament.publishEvent(tournamentMatchWasEnded);

    //Then
    await waitForExpect(() =>
      expect(spy).toBeCalledWith(
        new EnqueueMatch({
          tournamentId: tournamentId,
          matchNumber: 5,
          team1Id: team1Id,
          team2Id: team5Id,
        }),
      ),
    );

    //When
    const tournamentMatchWasEnded2 = new TournamentMatchWasEnded({
      occurredAt: currentTime,
      tournamentId: tournamentId,
      matchNumber: 5,
      winnerId: team5Id,
    });
    doublesTournament.publishEvent(tournamentMatchWasEnded2);

    //Then
    await waitForExpect(() =>
      expect(spy).toHaveBeenLastCalledWith(
        new EnqueueMatch({
          tournamentId: tournamentId,
          matchNumber: 5,
          team1Id: team1Id,
          team2Id: team5Id,
        }),
      ),
    );
  });
});

function createTestTournamentTree(sampleTournamentTreeId: string) {
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
      {
        teamId: 'team5',
        firstTeamPlayer: 'player9',
        secondTeamPlayer: 'player10',
      },
    ],
  });
}
