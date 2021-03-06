import {ModuleCore} from "../../../../shared/core/ModuleCore";
import {SendEmailAfterProfileCreation} from "./command/SendEmailAfterProfileCreation";
import {SendEmailAfterProfileCreationCommandHandler} from "./command/SendEmailAfterProfileCreationCommandHandler";

export function SendEmailModuleCore(): ModuleCore {
    return {
        commandHandlers: [
            {
                commandType: SendEmailAfterProfileCreation,
                handler: new SendEmailAfterProfileCreationCommandHandler()
            }
        ],
        eventHandlers: [],
        queryHandlers: [],
    }
}