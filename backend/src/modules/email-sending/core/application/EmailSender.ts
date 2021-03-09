export interface EmailSender {
  sendAnEmail(mailOptions: { from: string; to: string; subject: string; html: string }): Promise<void>;
}
