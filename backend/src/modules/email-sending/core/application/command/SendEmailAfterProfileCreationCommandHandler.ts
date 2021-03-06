import {CommandHandler} from "../../../../../shared/core/application/command/CommandHandler";
import {SendEmailAfterProfileCreation} from "./SendEmailAfterProfileCreation";
import {CommandResult} from "../../../../../shared/core/application/command/CommandResult";
import NodeMailer from "nodemailer";

export class SendEmailAfterProfileCreationCommandHandler implements CommandHandler<SendEmailAfterProfileCreation> {
    constructor() {
    }

    async execute(commnad: SendEmailAfterProfileCreation): Promise<CommandResult> {

        const transporter = NodeMailer.createTransport({
            host: "localhost",
            port: 1025
        });

        await transporter.sendMail({
            from: "My Company <company@companydomain.org>",
            to: commnad.emailAddress,
            subject: `Hi ${commnad.firstName} ${commnad.lastName}`,
            text: "Your player profile was successfully created! \n " +
                "We wish you good luck on oncoming tournament!",
        });

        return CommandResult.success();
    }
}