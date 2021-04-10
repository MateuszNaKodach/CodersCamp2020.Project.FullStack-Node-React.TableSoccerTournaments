import { CommandBus } from '../../../../../src/shared/core/application/command/CommandBus';
import { testDoublesTournamentsModule } from './TestDoublesTournamentsModule';
import { FromListIdGeneratorStub } from '../../../../test-support/shared/core/FromListIdGeneratorStub';
import { InMemoryCommandBus } from '../../../../../src/shared/infrastructure/core/application/command/InMemoryCommandBus';
import { MatchHasEnded } from '../../../../../src/modules/match-module/core/domain/event/MatchHasEnded';
import { StoreAndForwardDomainEventBus } from '../../../../../src/shared/infrastructure/core/application/event/StoreAndForwardDomainEventBus';
import { InMemoryDomainEventBus } from '../../../../../src/shared/infrastructure/core/application/event/InMemoryDomainEventBus';
import { testMatchModule } from '../../../match-module/core/application/TestMatchModule';
import { TestModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { TournamentMatchWasEnded } from '../../../../../src/modules/doubles-tournament/core/domain/event/TournamentMatchWasEnded';

describe('End tournament match', () => {
  it('When match was ended, then end tournament match', async () => {
    //Given
    const team1Id = 'Team1Id';
    const team2Id = 'Team2Id';
    const tournamentId = 'TournamentId';
    const matchNumber = 3;
    const currentTime = new Date();
    const commandBus: CommandBus = new InMemoryCommandBus();
    const eventBus: StoreAndForwardDomainEventBus = new StoreAndForwardDomainEventBus(new InMemoryDomainEventBus());
    const entityIdGen = FromListIdGeneratorStub([team1Id, team2Id]);
    const doublesTournament: TestModuleCore = testDoublesTournamentsModule(currentTime, entityIdGen, commandBus, eventBus);
    const matchModule: TestModuleCore = testMatchModule(currentTime, commandBus, eventBus);

    //When
    const matchHasEnded = new MatchHasEnded({
      occurredAt: currentTime,
      matchId: `${tournamentId}_${matchNumber}`,
      winnerId: team1Id,
      looserId: team2Id,
    });
    matchModule.publishEvent(matchHasEnded);

    //Then
    expect(doublesTournament.lastPublishedEvent()).toStrictEqual(
      new TournamentMatchWasEnded({
        occurredAt: currentTime,
        tournamentId: tournamentId,
        matchId: `${tournamentId}_${matchNumber}`,
        winnerId: team1Id,
      }),
    );
  });
});
