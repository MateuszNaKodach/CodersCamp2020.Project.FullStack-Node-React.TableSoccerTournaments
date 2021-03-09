import {ISendEmail} from "../../core/application/ISendEmail";
import Mail from "nodemailer/lib/mailer";

export class NodeMailerForEmailSending implements ISendEmail {
    constructor(configuration: /* what is going here? */ string) {
    }

    createTransport(transport: { host: string; port: number; secure?: boolean; auth?: { user: string; pass: string } }): Mail {
        return undefined; // ???
    }

    sendMail(mailOptions: { from: string; to: string; subject: string; html: string }): Promise<void> {
        return Promise.resolve(undefined);
    }



}