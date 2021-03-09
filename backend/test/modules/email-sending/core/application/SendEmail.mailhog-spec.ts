import { MailhogClient } from 'mailhog-awesome';
import { NodeMailerEmailSender } from '../../../../../src/modules/email-sending/infrastructure/mailer/NodeMailerEmailSender';

describe('Example Jest email test-suite', () => {
  let mailhog: MailhogClient;
  const host = 'localhost';

  beforeAll(async () => {
    mailhog = new MailhogClient({
      host,
      port: 8025,
    });
  });

  it('Retrieve the "reset password" email', async () => {
    //Given
    const inbox = 'user1@your-domain.com';
    await mailhog.clearInbox(inbox);
    const transport = new NodeMailerEmailSender({ host: host, port: 1025, secure: false });

    //When
    transport.sendAnEmail({
      from: 'system@your-domain.com',
      to: inbox,
      subject: 'Reset your password',
      html: 'Please follow the link to reset your password.',
    });

    //Then
    const email = await mailhog.getLastEmail({
      from: 'system@your-domain.com',
      to: inbox,
      subject: 'Reset your password',
    });
    expect(email).toBeTruthy();
    await mailhog.clearInbox(inbox);
  });
});
