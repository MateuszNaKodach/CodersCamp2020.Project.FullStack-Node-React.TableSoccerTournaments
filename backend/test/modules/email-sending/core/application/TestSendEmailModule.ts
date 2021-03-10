import { testModuleCore, TestModuleCore } from '../../../../test-support/shared/core/TestModuleCore';
import { NodeMailerEmailSender } from '../../../../../src/modules/email-sending/infrastructure/mailer/NodeMailerEmailSender';
import { SendEmailModuleCore } from '../../../../../src/modules/email-sending/core/SendEmailModuleCore';

export function testSendEmailModule(): TestModuleCore {
  const emailSender = new NodeMailerEmailSender({ host: 'localhost', port: 1025, secure: false });
  return testModuleCore((commandBus, eventBus, queryBus) => SendEmailModuleCore(emailSender));
}
