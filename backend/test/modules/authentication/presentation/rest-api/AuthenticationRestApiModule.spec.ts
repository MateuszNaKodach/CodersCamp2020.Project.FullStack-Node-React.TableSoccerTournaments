import { CommandPublisherMock } from '../../../../test-support/shared/core/CommandPublisherMock';
import { CommandResult } from '../../../../../src/shared/core/application/command/CommandResult';
import { testModuleRestApi } from '../../../../test-support/shared/presentation/rest-api/TestModuleRestApi';
import { StatusCodes } from 'http-status-codes';
import { authenticationRestApiModule } from '../../../../../src/modules/authentication/presentation/rest-api/AuthenticationRestApiModule';
import { SetPassword } from '../../../../../src/modules/authentication/core/application/command/SetPassword';
import { GenerateToken } from '../../../../../src/modules/authentication/core/application/command/GenerateToken';

describe('Authentication REST API', () => {
  it('POST /rest-api/auth/passwords | when command success', async () => {
    //Given
    const userId = '1';
    const password = 'veryDifficultPassword';
    const commandPublisher = CommandPublisherMock(CommandResult.success());
    const { agent } = testModuleRestApi(authenticationRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/auth/passwords').send({ userId, password });

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(new SetPassword(userId, password));
    expect(status).toBe(StatusCodes.OK);
    expect(body).toBeEmpty();
  });

  it('POST /rest-api/auth/passwords | when command failure', async () => {
    //Given
    const userId = '1';
    const password = 'veryDifficultPassword';
    const commandPublisher = CommandPublisherMock(CommandResult.failureDueTo(new Error('Account with this id does not exists.')));
    const { agent } = testModuleRestApi(authenticationRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/auth/passwords').send({ userId, password });

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(new SetPassword(userId, password));
    expect(status).toBe(StatusCodes.BAD_REQUEST);
    expect(body).toStrictEqual({ message: 'Account with this id does not exists.' });
  });

  it('POST /rest/api/auth/token | when command success', async () => {
    //Given
    const email = 'jan@kowalski.pl';
    const password = 'veryDifficultPassword';
    const token = 'test_token';
    const commandPublisher = CommandPublisherMock(CommandResult.success(token));
    const { agent } = testModuleRestApi(authenticationRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/auth/token').send({ email, password });

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(new GenerateToken(email, password));
    expect(status).toBe(StatusCodes.OK);
    expect(body).toStrictEqual({ token: 'test_token' });
  });

  it('POST /rest/api/auth/token | when command failure', async () => {
    //Given
    const email = 'jan@kowalski.pl';
    const password = 'veryDifficultPassword';
    const commandPublisher = CommandPublisherMock(CommandResult.failureDueTo(new Error('Such email address does not exists.')));
    const { agent } = testModuleRestApi(authenticationRestApiModule, { commandPublisher });

    //When
    const { body, status } = await agent.post('/rest-api/auth/token').send({ email, password });

    //Then
    expect(commandPublisher.executeCalls).toBeCalledWith(new GenerateToken(email, password));
    expect(status).toBe(StatusCodes.BAD_REQUEST);
    expect(body).toStrictEqual({ message: 'Such email address does not exists.' });
  });
});
