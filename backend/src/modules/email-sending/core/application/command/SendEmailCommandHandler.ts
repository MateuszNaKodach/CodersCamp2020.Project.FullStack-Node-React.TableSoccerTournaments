import {CommandHandler} from "../../../../../shared/core/application/command/CommandHandler";
import {SendEmail} from "./SendEmail";
import {CommandResult} from "../../../../../shared/core/application/command/CommandResult";
import NodeMailer from "nodemailer";

export class SendEmailCommandHandler implements CommandHandler<SendEmail> {
    constructor() {
    }

    async execute(command: SendEmail): Promise<CommandResult> {

        const transporter = NodeMailer.createTransport({
            host: "localhost",
            port: 1025
        });

        await transporter.sendMail({
            from: "My Company <company@companydomain.org>",
            to: command.emailAddress,
            subject: command.subject,
            text: command.content,
        });

        return CommandResult.success();
    }
}