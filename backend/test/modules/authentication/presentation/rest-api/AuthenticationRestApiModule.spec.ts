import { CommandPublisherMock } from '../../../../test-support/shared/core/CommandPublisherMock';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';
import { testModuleRestApi } from '../../../../test-support/shared/presentation/rest-api/TestModuleRestApi';
import { StatusCodes } from 'http-status-codes';
import { authenticationRestApiModule } from '../../../../../src/modules/authentication/presentation/rest-api/AuthenticationRestApiModule';
import { SetPassword } from '../../../../../src/modules/authentication/core/application/command/SetPassword';

describe('Authentication REST API', () => {
  it('POST /rest-api/auth/passwords | when command success', async () => {
    //Given
    const email = 'jan@kowalski.pl';
    const password = 'veryDifficultPassword';
    const commandPublisher = CommandPublisherMock(CommandResult.success());
    const { agent } = testModuleRestApi(authenticationRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/auth/passwords').send({ email, password });

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(new SetPassword(email, password));
    expect(status).toBe(StatusCodes.OK);
    expect(body).toBeEmpty();
  });

  it('POST /rest-api/auth/passwords | when command failure', async () => {
    //Given
    const email = 'jan@kowalski.pl';
    const password = 'veryDifficultPassword';
    const commandPublisher = CommandPublisherMock(CommandResult.failureDueTo(new Error('Account with this email address already exists.')));
    const { agent } = testModuleRestApi(authenticationRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/auth/passwords').send({ email, password });

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(new SetPassword(email, password));
    expect(status).toBe(StatusCodes.BAD_REQUEST);
    expect(body).toStrictEqual({ message: 'Account with this email address already exists.' });
  });
});
