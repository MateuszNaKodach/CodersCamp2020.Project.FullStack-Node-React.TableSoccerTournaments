import { CommandBus } from '../../../../../src/shared/core/application/command/CommandBus';
import { testDoublesTournamentsModule } from './TestDoublesTournamentsModule';
import { FromListIdGeneratorStub } from '../../../../test-support/shared/core/FromListIdGeneratorStub';
import { MatchWasCalled } from '../../../../../src/modules/doubles-tournament/core/domain/event/MatchWasCalled';
import { StartMatch } from '../../../../../src/modules/match-module/core/application/command/StartMatch';
import { EnqueueMatch } from '../../../../../src/modules/doubles-tournament/core/application/command/EnqueueMatch';
import { InMemoryCommandBus } from '../../../../../src/shared/infrastructure/core/application/command/InMemoryCommandBus';
import waitForExpect from 'wait-for-expect';
import { CommandHandler } from '../../../../../src/shared/core/application/command/CommandHandler';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';

describe('Starting match', () => {
  it('when match was called, then execute command for starting such match', async () => {
    //Given
    const team1Id = 'Team1Id';
    const team2Id = 'Team2Id';
    const tournamentId = 'TournamentId';
    const matchNumber = 1;
    const tableNumber = 1;
    const currentTime = new Date();
    const entityIdGen = FromListIdGeneratorStub([team1Id, team2Id]);
    const commandBus: CommandBus = new InMemoryCommandBus();
    const alwaysSuccessStartMatchCommandHandler: CommandHandler<StartMatch> = {
      async execute(command: StartMatch): Promise<CommandResult> {
        return CommandResult.success();
      },
    };
    commandBus.registerHandler(StartMatch, alwaysSuccessStartMatchCommandHandler);
    const spy = jest.spyOn(commandBus, 'execute');
    const doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen, commandBus);
    await doublesTournament.executeCommand(
      new EnqueueMatch({
        tournamentId: tournamentId,
        matchNumber: matchNumber,
        team1Id: team1Id,
        team2Id: team2Id,
      }),
    );
    spy.mockClear();

    //When
    const matchWasCalled = new MatchWasCalled({
      occurredAt: currentTime,
      tournamentId: tournamentId,
      calledMatch: { matchNumber, team1Id, team2Id },
      tableNumber: tableNumber,
    });
    doublesTournament.publishEvent(matchWasCalled);

    //Then
    const startMatch = new StartMatch({
      matchId: 'TournamentId_1',
      firstMatchSideId: team1Id,
      secondMatchSideId: team2Id,
    });
    await waitForExpect(() => expect(spy).toBeCalledWith(startMatch));
  });
});
