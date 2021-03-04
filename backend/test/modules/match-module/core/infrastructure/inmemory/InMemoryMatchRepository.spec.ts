import {MatchRepositoryTestCases} from "../MatchRepositoryTestCases";
import {InMemoryMatchRepository} from "../../../../../../src/modules/match-module/infrastructure/repository/inmemory/InMemoryMatchRepository";
import {InMemoryTestSupport} from "../../../../../test-support/shared/infrastructure/InMemoryTestSupport";

describe('In Memory Match Repository', () => {
    MatchRepositoryTestCases({
        name: 'In Memory Implementation',
        repositoryFactory: () => new InMemoryMatchRepository,
        databaseTestSupport: InMemoryTestSupport,
    });
});