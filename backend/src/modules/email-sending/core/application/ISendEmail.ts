import Mail from "nodemailer/lib/mailer";

export interface ISendEmail {
    createTransport(transport: { host: string, port: number, secure?: boolean, auth?: { user: string, pass: string } }): Mail;

    sendMail(mailOptions: { from: string, to: string, subject: string, html: string }): Promise<void>;
}