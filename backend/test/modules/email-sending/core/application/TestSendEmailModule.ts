import { testModuleCore, TestModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { SendEmailModuleCore } from '../../../../../src/modules/email-sending/core/SendEmailModuleCore';
import { EmailSender } from '../../../../../src/modules/email-sending/core/application/EmailSender';

export function testSendEmailModule(emailSender: EmailSender): TestModuleCore {
  return testModuleCore(() => SendEmailModuleCore(emailSender));
}
