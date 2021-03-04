import { testModuleCore, TestModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { EntityIdGenerator } from "../../../../../src/shared/core/application/EntityIdGenerator";
import { TournamentTablesModuleCore } from "../../../../../src/modules/tournament-tables/core/TournamentTablesModuleCore";
import { InMemoryTournamentTablesRepository } from "../../../../../src/modules/tournament-tables/core/infrastructure/repository/inmemory/InMemoryTournamentTablesRepository";

export function testTournamentTablesModule(currentTime: Date, entityIdGenerator: EntityIdGenerator): TestModuleCore {
    const tournamentTablesRepository = new InMemoryTournamentTablesRepository();
    return testModuleCore((commandBus, eventBus, queryBus) =>
        TournamentTablesModuleCore(eventBus, commandBus, () => currentTime, entityIdGenerator, tournamentTablesRepository),
    );
}