import { CommandBus } from '../../../../../src/shared/core/application/command/CommandBus';
import { testDoublesTournamentsModule } from './TestDoublesTournamentsModule';
import { FromListIdGeneratorStub } from '../../../../test-support/shared/core/FromListIdGeneratorStub';
import { InMemoryCommandBus } from '../../../../../src/shared/infrastructure/core/application/command/InMemoryCommandBus';
import { MatchHasEnded } from '../../../../../src/modules/match-module/core/domain/event/MatchHasEnded';
import { StoreAndForwardDomainEventBus } from '../../../../../src/shared/infrastructure/core/application/event/StoreAndForwardDomainEventBus';
import { InMemoryDomainEventBus } from '../../../../../src/shared/infrastructure/core/application/event/InMemoryDomainEventBus';
import { testMatchModule } from '../../../match-module/core/application/TestMatchModule';
import { EnqueueMatch } from '../../../../../src/modules/doubles-tournament/core/application/command/EnqueueMatch';
import { TestModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { TournamentMatchWasEnded } from '../../../../../src/modules/doubles-tournament/core/domain/event/TournamentMatchWasEnded';

describe('End tournament match', () => {
  const team1Id = 'Team1Id';
  const team2Id = 'Team2Id';
  const tournamentId = 'TournamentId';
  const matchNumber = 3;
  const currentTime = new Date();
  const enqueueMatch = new EnqueueMatch({
    tournamentId: tournamentId,
    matchNumber: matchNumber,
    team1Id: team1Id,
    team2Id: team2Id,
  });
  let doublesTournament: TestModuleCore;
  let matchModule: TestModuleCore;

  beforeEach(() => {
    const commandBus: CommandBus = new InMemoryCommandBus();
    const eventBus: StoreAndForwardDomainEventBus = new StoreAndForwardDomainEventBus(new InMemoryDomainEventBus());
    const entityIdGen = FromListIdGeneratorStub([team1Id, team2Id]);
    doublesTournament = testDoublesTournamentsModule(currentTime, entityIdGen, commandBus, eventBus);
    matchModule = testMatchModule(currentTime, commandBus, eventBus);

    it('When match was ended, then end tournament match', async () => {
      //Given
      await doublesTournament.executeCommand(enqueueMatch);

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

    it('When match was ended but such tournamentId does not exist in matches queue, then ignore it', async () => {
      //Given
      await doublesTournament.executeCommand(enqueueMatch);

      //When
      const matchHasEnded = new MatchHasEnded({
        occurredAt: currentTime,
        matchId: `notExistingTournamentId_${matchNumber}`,
        winnerId: team1Id,
        looserId: team2Id,
      });
      matchModule.publishEvent(matchHasEnded);

      //Then
      expect(doublesTournament.lastPublishedEvent()).toBeUndefined();
    });

    it('When match was ended but such match does not exist for given tournament, then ignore it', async () => {
      //Given
      await doublesTournament.executeCommand(enqueueMatch);

      //When
      const matchHasEnded = new MatchHasEnded({
        occurredAt: currentTime,
        matchId: `${tournamentId}_1`,
        winnerId: team1Id,
        looserId: team2Id,
      });
      matchModule.publishEvent(matchHasEnded);

      //Then
      expect(doublesTournament.lastPublishedEvent()).toBeUndefined();
    });
  });
});
