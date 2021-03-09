import { EmailSender } from '../../core/application/EmailSender';
import Mail from 'nodemailer/lib/mailer';
import NodeMailer from 'nodemailer';

export class NodeMailerEmailSender implements EmailSender {
  private readonly transporter: Mail;

  constructor() {
    this.transporter = NodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
  }

  async sendAnEmail(mailOptions: { from: string; to: string; subject: string; html: string }): Promise<void> {
    return await this.transporter.sendMail({
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      html: mailOptions.html,
    });
  }
}
