import {CommandHandler} from "../../../../../shared/core/application/command/CommandHandler";
import {SendEmail} from "./SendEmail";
import {CommandResult} from "../../../../../shared/core/application/command/CommandResult";

export class SendEmailCommandHandler implements CommandHandler<SendEmail> {
    constructor() {
    }

    async execute(commnad: SendEmail): Promise<CommandResult> {
//TODO here send and email to command.emailAddress
        return CommandResult.success();
    }
}