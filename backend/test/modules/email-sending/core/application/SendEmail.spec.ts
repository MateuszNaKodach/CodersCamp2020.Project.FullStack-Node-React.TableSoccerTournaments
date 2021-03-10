import { testSendEmailModule } from './TestSendEmailModule';
import { SendEmail } from '../../../../../src/modules/email-sending/core/application/command/SendEmail';

describe('Send an email to player', () => {
  it('When command SendEmail is sent, then send an email with appropriate arguments', async () => {
    //Given
    const sendEmailModuleCore = testSendEmailModule();
    const sendEmail = new SendEmail({
      subject: 'test',
      emailAddress: 'test@gmail.com',
      htmlContent: '<div>test</div>',
    });

    //When
    const commandResult = await sendEmailModuleCore.executeCommand(sendEmail);

    //Then
    expect(commandResult.isSuccess()).toBeTruthy();
  });
});
