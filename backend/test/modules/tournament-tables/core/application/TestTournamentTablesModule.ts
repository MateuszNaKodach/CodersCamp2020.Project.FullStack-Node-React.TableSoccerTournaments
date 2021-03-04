import { testModuleCore, TestModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { EntityIdGenerator } from "../../../../../src/shared/core/application/EntityIdGenerator";

export function testTournamentTablesModule(currentTime: Date, entityIdGenerator: EntityIdGenerator): TestModuleCore {
    const tournamentTablesRepository = new InMemoryTournamentTablesRepository();
    return testModuleCore((commandBus, eventBus, queryBus) =>
        TournamentTablesModuleCore(eventBus, commandBus, () => currentTime, entityIdGenerator, tournamentTablesRepository),
    );
}