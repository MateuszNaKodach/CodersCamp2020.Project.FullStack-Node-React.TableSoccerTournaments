import { testDoublesTournamentsModule } from './TestDoublesTournamentsModule';
import { FromListIdGeneratorStub } from '../../../../test-support/shared/core/FromListIdGeneratorStub';
import { TournamentTableWasBooked } from '../../../../../src/modules/tournament-tables/core/domain/event/TournamentTableWasBooked';
import { TournamentTableWasReleased } from '../../../../../src/modules/tournament-tables/core/domain/event/TournamentTableWasReleased';
import { CallMatch } from '../../../../../src/modules/doubles-tournament/core/application/command/CallMatch';
import { MatchWasCalled } from '../../../../../src/modules/doubles-tournament/core/domain/event/MatchWasCalled';
import { CommandBus } from '../../../../../src/shared/core/application/command/CommandBus';
import { EnqueueMatch } from '../../../../../src/modules/doubles-tournament/core/application/command/EnqueueMatch';
import { InMemoryCommandBus } from '../../../../../src/shared/infrastructure/core/application/command/InMemoryCommandBus';
import { CommandHandler } from '../../../../../src/shared/core/application/command/CommandHandler';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';
import { StartMatch } from '../../../../../src/modules/match-module/core/application/command/StartMatch';
import { TestModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { testTournamentTablesModule } from '../../../tournament-tables/core/application/TestTournamentTablesModule';
import { StoreAndForwardDomainEventBus } from '../../../../../src/shared/infrastructure/core/application/event/StoreAndForwardDomainEventBus';
import { InMemoryDomainEventBus } from '../../../../../src/shared/infrastructure/core/application/event/InMemoryDomainEventBus';
import waitForExpect from 'wait-for-expect';

describe('Calling Enqueued Matches', () => {
  const currentTime = new Date();
  const tournamentId = 'TournamentId';
  const matchNumber = 3;
  const team1Id = 'Team1Id';
  const team2Id = 'Team2Id';
  const matchNumber2 = 5;
  const team1Id2 = 'team1Id2';
  const team2Id2 = 'team2Id2';
  const enqueueMatch = new EnqueueMatch({
    tournamentId: tournamentId,
    matchNumber: matchNumber,
    team1Id: team1Id,
    team2Id: team2Id,
  });
  const enqueueMatch2 = new EnqueueMatch({
    tournamentId: tournamentId,
    matchNumber: matchNumber2,
    team1Id: team1Id2,
    team2Id: team2Id2,
  });
  const tableNumber = 1;
  const tableNumber2 = 2;
  const table1Booked = new TournamentTableWasBooked({ occurredAt: currentTime, tournamentId: tournamentId, tableNumber: tableNumber });
  const table1Released = new TournamentTableWasReleased({ occurredAt: currentTime, tournamentId: tournamentId, tableNumber: tableNumber });
  const table2Booked = new TournamentTableWasBooked({ occurredAt: currentTime, tournamentId: tournamentId, tableNumber: tableNumber2 });
  const table2Released = new TournamentTableWasReleased({
    occurredAt: currentTime,
    tournamentId: tournamentId,
    tableNumber: tableNumber2,
  });
  let spy: jest.SpyInstance;
  let doublesTournament: TestModuleCore;
  let tournamentTablesModule: TestModuleCore;

  beforeEach(() => {
    const commandBus: CommandBus = new InMemoryCommandBus();
    const eventBus: StoreAndForwardDomainEventBus = new StoreAndForwardDomainEventBus(new InMemoryDomainEventBus());
    spy = jest.spyOn(commandBus, 'execute');
    const entityIdGen = FromListIdGeneratorStub([team1Id, team2Id, team1Id2, team2Id2]);
    doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen, commandBus, eventBus);
    tournamentTablesModule = testTournamentTablesModule(currentTime, commandBus, eventBus);
    const alwaysSuccessStartMatchCommandHandler: CommandHandler<StartMatch> = {
      async execute(command: StartMatch): Promise<CommandResult> {
        return CommandResult.success();
      },
    };
    commandBus.registerHandler(StartMatch, alwaysSuccessStartMatchCommandHandler);
  });

  it('When matches were enqueued and only one table was released then call the match with lower matchNumber', async () => {
    //Given
    await doublesTournament.executeCommand(enqueueMatch2);
    await doublesTournament.executeCommand(enqueueMatch);
    spy.mockClear();

    //When
    await tournamentTablesModule.publishEvent(table1Booked);
    await tournamentTablesModule.publishEvent(table2Released);

    //Then
    const callMatch = new CallMatch({
      tournamentId: tournamentId,
      calledMatch: { matchNumber: matchNumber, team1Id: team1Id, team2Id: team2Id },
      tableNumber: tableNumber2,
    });
    expect(spy).toHaveBeenCalledWith(callMatch);
  });

  it('When tables are free and new matches were enqueued then call both matches', async () => {
    //Given
    await tournamentTablesModule.publishEvent(table2Released);
    await tournamentTablesModule.publishEvent(table1Released);

    //When
    await doublesTournament.executeCommand(enqueueMatch2);

    //Then
    await waitForExpect(() => expect(spy).toHaveBeenCalledWith(
      new CallMatch({
        tournamentId: tournamentId,
        calledMatch: { matchNumber: matchNumber2, team1Id: team1Id2, team2Id: team2Id2 },
        tableNumber: tableNumber2,
      }),
    ));

    //When
    await doublesTournament.publishEvent(
      new MatchWasCalled({
        occurredAt: currentTime,
        tournamentId: tournamentId,
        calledMatch: {
          matchNumber: matchNumber2,
          team1Id: team1Id2,
          team2Id: team2Id2,
        },
        tableNumber: tableNumber2,
      }),
    );
    await tournamentTablesModule.publishEvent(table2Booked);
    await doublesTournament.executeCommand(enqueueMatch);

    //Then
    expect(spy).toHaveBeenCalledWith(
      new CallMatch({
        tournamentId: tournamentId,
        calledMatch: { matchNumber: matchNumber, team1Id: team1Id, team2Id: team2Id },
        tableNumber: tableNumber,
      }),
    );
  });

  it('When match was enqueued and no table was released then do not call the match', async () => {
    //When
    await doublesTournament.executeCommand(enqueueMatch);
    await tournamentTablesModule.publishEvent(table1Booked);

    //Then
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(enqueueMatch);
  });

  it('When match was already called then do not call the match again', async () => {
    //Given
    await doublesTournament.executeCommand(enqueueMatch);

    //When
    await doublesTournament.publishEvent(
      new MatchWasCalled({
        occurredAt: currentTime,
        tournamentId: tournamentId,
        calledMatch: {
          matchNumber: matchNumber,
          team1Id: team1Id,
          team2Id: team2Id,
        },
        tableNumber: tableNumber,
      }),
    );
    await tournamentTablesModule.publishEvent(table2Released);

    //Then
    expect(spy).not.toHaveBeenCalledWith(
      new CallMatch({
        tournamentId: tournamentId,
        calledMatch: { matchNumber: matchNumber, team1Id: team1Id, team2Id: team2Id },
        tableNumber: tableNumber2,
      }),
    );
  });
});
