import { testSendEmailModule } from './TestSendEmailModule';
import { SendEmail } from '../../../../../src/modules/email-sending/core/application/command/SendEmail';
import { EmailSender } from '../../../../../src/modules/email-sending/core/application/EmailSender';

describe('Send an email to player', () => {
  it('When command SendEmail is sent, then send an email with appropriate arguments', async () => {
    //Given
    const emailSender: EmailSender = {
      mailFrom: 'Test',
      sendAnEmail: jest.fn(),
    };
    const sendEmailModuleCore = testSendEmailModule(emailSender);
    const sendEmail = new SendEmail({
      subject: 'test',
      emailAddress: 'test@gmail.com',
      htmlContent: '<div>test</div>',
    });

    //When
    const commandResult = await sendEmailModuleCore.executeCommand(sendEmail);

    //Then
    expect(commandResult.isSuccess()).toBeTruthy();
    expect(emailSender.sendAnEmail).toHaveBeenCalled();
    expect(emailSender.sendAnEmail).toHaveBeenCalledWith({
      to: 'test@gmail.com',
      subject: 'test',
      html: '<div>test</div>',
    });
  });
});
