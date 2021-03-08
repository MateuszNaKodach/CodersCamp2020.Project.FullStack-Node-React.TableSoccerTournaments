import { createTransport } from 'nodemailer';
import { MailhogClient } from 'mailhog-awesome';

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
    //GIVEN

    // Inbox email only used for this test
    const inbox = 'user1@your-domain.com';

    // Clear the inbox before starting
    await mailhog.clearInbox(inbox);

    // Trigger the "reset password" email via your server's API
    const transport = createTransport({ host, port: 1025, secure: false });
    transport.sendMail({
      from: 'system@your-domain.com',
      to: inbox,
      subject: 'Reset your password',
      html: 'Please follow the link to reset your password.',
    });

    //WHEN

    // Get the latest email
    const email = await mailhog.getLastEmail({
      from: 'system@your-domain.com',
      to: inbox,
      subject: 'Reset your password',
    });

    //THEN

    // Expect that a "reset password" email was received
    expect(email).toBeTruthy();

    // Clear inbox after the test has passed
    await mailhog.clearInbox(inbox);
  });
});
