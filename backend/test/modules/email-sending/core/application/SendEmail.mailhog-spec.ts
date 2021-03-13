import { MailhogClient } from 'mailhog-awesome';
import { NodeMailerEmailSender } from '../../../../../src/modules/email-sending/infrastructure/mailer/NodeMailerEmailSender';

describe('Example email sending using NodeMailer', () => {
  let mailhog: MailhogClient;
  const host = 'localhost';

  beforeAll(async () => {
    mailhog = new MailhogClient({
      host,
      port: 8025,
    });
  });

  it('check if email arrived on correct email address with correct subject', async () => {
    //Given
    const inbox = 'user@test.com';
    await mailhog.clearInbox(inbox);
    const emailSender = new NodeMailerEmailSender({ host: host, port: 1025, secure: false });

    //When
    await emailSender.sendAnEmail({
      from: 'admin@test.com',
      to: inbox,
      subject: 'Test subject',
      html: 'Test html body',
    });

    //Then
    const email = await mailhog.getLastEmail({
      from: 'admin@test.com',
      to: inbox,
      subject: 'Test subject',
    });
    expect(email).toBeTruthy();
    expect(email?.html).toBe('Test html body');
    expect(email?.subject).toBe('Test subject');
    expect(email?.to).toBe('user@test.com');
    expect(email?.from).toBe('admin@test.com');
    await mailhog.clearInbox(inbox);
  });
});
