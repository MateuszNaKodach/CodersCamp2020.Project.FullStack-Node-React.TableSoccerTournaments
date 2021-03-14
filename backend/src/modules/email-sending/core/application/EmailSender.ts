export interface EmailSender {
  readonly mailFrom: string;

  sendAnEmail(mailOptions: { to: string; subject: string; html: string }): Promise<void>;
}
