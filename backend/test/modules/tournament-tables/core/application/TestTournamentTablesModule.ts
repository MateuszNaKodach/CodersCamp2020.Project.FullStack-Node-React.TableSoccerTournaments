import { ModuleCoreFactory, testModuleCore, TestModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { TournamentTablesModuleCore } from '../../../../../src/modules/tournament-tables/core/TournamentTablesModuleCore';
import { InMemoryTournamentTablesRepository } from '../../../../../src/modules/tournament-tables/infrastructure/repository/inmemory/InMemoryTournamentTablesRepository';
import { CommandBus } from '../../../../../src/shared/core/application/command/CommandBus';
import { InMemoryCommandBus } from '../../../../../src/shared/infrastructure/core/application/command/InMemoryCommandBus';
import { InMemoryDomainEventBus } from '../../../../../src/shared/infrastructure/core/application/event/InMemoryDomainEventBus';
import { StoreAndForwardDomainEventBus } from '../../../../../src/shared/infrastructure/core/application/event/StoreAndForwardDomainEventBus';

export function testTournamentTablesModule(
  currentTime: Date,
  commandBus: CommandBus = new InMemoryCommandBus(),
  eventBus: StoreAndForwardDomainEventBus = new StoreAndForwardDomainEventBus(new InMemoryDomainEventBus()),
): TestModuleCore {
  const tournamentTablesRepository = new InMemoryTournamentTablesRepository();
  const moduleCoreFactory: ModuleCoreFactory = (commandBus, eventBus, queryBus) =>
    TournamentTablesModuleCore(eventBus, commandBus, () => currentTime, tournamentTablesRepository);
  return testModuleCore(moduleCoreFactory, commandBus, eventBus);
}
