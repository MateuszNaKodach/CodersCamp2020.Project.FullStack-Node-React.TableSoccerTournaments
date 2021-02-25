import {TestModuleCore, testModuleCore} from '../../../../test-support/shared/core/TestModuleCore';
import {DoublesTournamentModuleCore} from "../../../../../src/modules/doubles-tournament/core/DoublesTournamentModuleCore";

export function testCreateTournamentWithTeamsModule(currentTime: Date): TestModuleCore {
    return testModuleCore((commandBus, eventBus, queryBus) => DoublesTournamentModuleCore(eventBus, commandBus, () => currentTime));
}
