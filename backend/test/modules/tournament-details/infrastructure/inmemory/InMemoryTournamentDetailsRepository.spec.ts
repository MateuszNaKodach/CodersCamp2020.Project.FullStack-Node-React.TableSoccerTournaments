import {InMemoryTestSupport} from "../../../../test-support/shared/infrastructure/InMemoryTestSupport";
import {InMemoryTournamentDetailsRepository} from "../../../../../src/modules/tournament-details/infrastructure/repository/inmemory/InMemoryTournamentDetailsRepository";
import {TournamentDetailsRepositoryTestCases} from "../TournamentDetailsRepositoryTestCases";

describe('TournamentDetailsRepository', () => {
    TournamentDetailsRepositoryTestCases({
        name: 'InMemory Implementation',
        repositoryFactory: () => new InMemoryTournamentDetailsRepository(),
        databaseTestSupport: InMemoryTestSupport,
    });
});