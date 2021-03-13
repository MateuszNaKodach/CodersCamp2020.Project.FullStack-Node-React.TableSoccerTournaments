import { EmailSender } from '../../core/application/EmailSender';

export class ConsoleEmailSender implements EmailSender {
  sendAnEmail(mailOptions: { from: string; to: string; subject: string; html: string }): Promise<void> {
    return Promise.resolve(
      console.log(
        `Email was send from ${mailOptions.from} to ${mailOptions.to} \n Subject: ${mailOptions.subject} \n Content: ${mailOptions.html}`,
      ),
    );
  }
}