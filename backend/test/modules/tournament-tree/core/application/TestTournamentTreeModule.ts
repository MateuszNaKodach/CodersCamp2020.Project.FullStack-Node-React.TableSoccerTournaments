import {ModuleCoreFactory, TestModuleCore, testModuleCore} from '../../../../test-support/shared/core/TestModuleCore';
import {EntityIdGenerator} from '../../../../../src/shared/core/application/EntityIdGenerator';
import {InMemoryTournamentTreeRepository} from '../../../../../src/modules/tournament-tree/infrastructure/repository/inmemory/InMemoryTournamentTreeRepository';
import {TournamentTreeModuleCore} from '../../../../../src/modules/tournament-tree/core/TournamentTreeModuleCore';
import {CommandBus} from "../../../../../src/shared/core/application/command/CommandBus";
import {InMemoryCommandBus} from "../../../../../src/shared/infrastructure/core/application/command/InMemoryCommandBus";

export function testTournamentTreeModule(currentTime: Date, entityIdGenerator: EntityIdGenerator, commandBus: CommandBus = new InMemoryCommandBus()): TestModuleCore {
  const tournamentTreeRepository = new InMemoryTournamentTreeRepository();
  const moduleCoreFactory: ModuleCoreFactory = (commandBus, eventBus, queryBus) =>
      TournamentTreeModuleCore(
          eventBus,
          commandBus,
          () => currentTime,
          entityIdGenerator,
          tournamentTreeRepository
      );
  return testModuleCore(moduleCoreFactory, commandBus);
}
