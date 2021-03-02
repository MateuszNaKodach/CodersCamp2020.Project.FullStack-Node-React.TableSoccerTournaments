import {testModuleCore, TestModuleCore} from "../../../../test-support/shared/core/TestModuleCore";
import {MatchModuleCore} from "../../../../../src/modules/match-module/core/MatchModuleCore";

export function testMatchModule(currentTime: Date): TestModuleCore {
    return testModuleCore(((commandBus, eventBus, queryBus) =>
    MatchModuleCore(eventBus, commandBus, () => currentTime)));
}