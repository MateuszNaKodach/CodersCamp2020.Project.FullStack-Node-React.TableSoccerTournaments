import { EmailSender } from '../../core/application/EmailSender';

export class ConsoleEmailSender implements EmailSender {
  readonly mailFrom: string;

  constructor(from: string) {
    this.mailFrom = from;
  }

  sendAnEmail(mailOptions: { to: string; subject: string; html: string }): Promise<void> {
    return Promise.resolve(
      console.log(
        `Email was send from ${this.mailFrom} to ${mailOptions.to} \n Subject: ${mailOptions.subject} \n Content: ${mailOptions.html}`,
      ),
    );
  }
}
