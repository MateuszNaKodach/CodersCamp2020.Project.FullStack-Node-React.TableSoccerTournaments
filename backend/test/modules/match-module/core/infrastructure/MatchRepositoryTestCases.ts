import {MatchRepository} from "../../../../../src/modules/match-module/core/application/MatchRepository";
import {DatabaseTestSupport} from "../../../../test-support/shared/infrastructure/DatabaseTestSupport";

export function MatchRepositoryTestCases(props: {
    name: string;
    repositoryFactory: () => MatchRepository;
    databaseTestSupport: DatabaseTestSupport;
}): void {
    return describe(props.name, () => {
        let repository: MatchRepository;

        beforeAll(async () => {
            await props.databaseTestSupport.openConnection();
            repository = props.repositoryFactory();
        });
        afterEach(async () => await props.databaseTestSupport.clearDatabase());
        afterEach(async () => await props.databaseTestSupport.closeConnection());

        test('findAll returns empty list when no matches were started', async () => {
            expect(await repository.findAll()).toBeEmpty();
        })
    });
}