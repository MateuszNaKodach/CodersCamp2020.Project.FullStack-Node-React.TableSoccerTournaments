import { TournamentWasStarted } from '../../../../../src/modules/doubles-tournament/core/domain/event/TournamentWasStarted';
import { NumberIdGeneratorStub } from '../../../../test-support/shared/core/NumberIdGeneratorStub';
import { CreateTournamentTree } from '../../../../../src/modules/tournament-tree/core/application/command/CreateTournamentTree';
import { FromListIdGeneratorStub } from '../../../../test-support/shared/core/FromListIdGeneratorStub';
import { EnqueueMatch } from '../../../../../src/modules/doubles-tournament/core/application/command/EnqueueMatch';
import { CommandBus } from '../../../../../src/shared/core/application/command/CommandBus';
import { InMemoryCommandBus } from '../../../../../src/shared/infrastructure/core/application/command/InMemoryCommandBus';
import { StoreAndForwardDomainEventBus } from '../../../../../src/shared/infrastructure/core/application/event/StoreAndForwardDomainEventBus';
import { InMemoryDomainEventBus } from '../../../../../src/shared/infrastructure/core/application/event/InMemoryDomainEventBus';
import { TournamentMatchWasEnded } from '../../../../../src/modules/doubles-tournament/core/domain/event/TournamentMatchWasEnded';
import waitForExpect from 'wait-for-expect';
import { EndTournament } from '../../../../../src/modules/doubles-tournament/core/application/command/EndTournament';
import { TournamentWasEnded } from '../../../../../src/modules/doubles-tournament/core/domain/event/TournamentWasEnded';
import { testTournamentTreeModule } from '../../../tournament-tree/core/application/TestTournamentTreeModule';
import { testDoublesTournamentsModule } from './TestDoublesTournamentsModule';
import { CreateTournamentWithTeams } from '../../../../../src/modules/doubles-tournament/core/application/command/CreateTournamentWithTeams';

describe('Ending tournament', () => {
  const currentTime = new Date();
  const tournamentId = 'SampleTournamentId';
  const [team1Id, team2Id, team3Id, team4Id] = ['team1', 'team2', 'team3', 'team4'];
  const entityIdGenFromList = FromListIdGeneratorStub([team1Id, team2Id, team3Id, team4Id]);
  const entityIdGen = NumberIdGeneratorStub(100, 'entityId');
  const commandBus: CommandBus = new InMemoryCommandBus();
  const eventBus: StoreAndForwardDomainEventBus = new StoreAndForwardDomainEventBus(new InMemoryDomainEventBus());
  const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGenFromList, commandBus, eventBus);
  const tournamentTree = testTournamentTreeModule(currentTime, entityIdGen, commandBus, eventBus);

  it('When last tournament match ended, then end tournament', async () => {
    //Given
    const tournament = new CreateTournamentWithTeams(tournamentId, [
      { player1: 'player1', player2: 'player2' },
      { player1: 'player3', player2: 'player4' },
      { player1: 'player5', player2: 'player6' },
    ]);
    await doublesTournament.executeCommand(tournament);
    await tournamentTree.executeCommand(createTestTournamentTree(tournamentId));
    const spy = jest.spyOn(commandBus, `execute`);
    const startedTournament = new TournamentWasStarted({ occurredAt: currentTime, tournamentId: tournamentId });
    await doublesTournament.publishEvent(startedTournament);
    spy.mockClear();
    const tournamentMatchWasEnded = new TournamentMatchWasEnded({
      occurredAt: currentTime,
      tournamentId: tournamentId,
      matchNumber: 1,
      winnerId: team1Id,
    });
    await doublesTournament.publishEvent(tournamentMatchWasEnded);
    const tournamentMatchWasEnded2 = new TournamentMatchWasEnded({
      occurredAt: currentTime,
      tournamentId: tournamentId,
      matchNumber: 2,
      winnerId: team2Id,
    });
    await doublesTournament.publishEvent(tournamentMatchWasEnded2);
    await waitForExpect(() =>
      expect(spy).toBeCalledWith(
        new EnqueueMatch({
          tournamentId: tournamentId,
          matchNumber: 3,
          team1Id: team1Id,
          team2Id: team2Id,
        }),
      ),
    );

    //When
    const tournamentMatchWasEnded3 = new TournamentMatchWasEnded({
      occurredAt: currentTime,
      tournamentId: tournamentId,
      matchNumber: 3,
      winnerId: team2Id,
    });
    await doublesTournament.publishEvent(tournamentMatchWasEnded3);

    //Then
    await waitForExpect(() =>
      expect(spy).toBeCalledWith(
        new EndTournament({
          tournamentId: tournamentId,
          winner: team2Id,
        }),
      ),
    );
    await waitForExpect(() =>
      expect(doublesTournament.lastPublishedEvent()).toStrictEqual(
        new TournamentWasEnded({
          occurredAt: currentTime,
          tournamentId: tournamentId,
          winner: team2Id,
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
    ],
  });
}
