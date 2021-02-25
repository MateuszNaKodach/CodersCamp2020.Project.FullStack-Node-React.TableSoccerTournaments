import {ModuleRestApi} from "../../../../shared/infrastructure/restapi/ModuleRestApi";
import {playerProfileRouter} from "./PlayerProfileRouter";
import {QueryPublisher} from "../../../../shared/core/application/query/QueryBus";

export function PlayerProfileRestApiModule(
    queryPublisher: QueryPublisher
): ModuleRestApi {
    return {
        router: playerProfileRouter(queryPublisher),
        path: '/players-profiles',
    };
}