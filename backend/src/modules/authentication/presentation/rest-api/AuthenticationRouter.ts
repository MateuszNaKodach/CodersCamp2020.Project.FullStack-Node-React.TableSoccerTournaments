import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PostSetPasswordRequestBody } from './request/PostSetPasswordRequestBody';
import { SetPassword } from '../../core/application/command/SetPassword';
import { PostAuthenticateUserRequestBody } from './request/PostAuthenticateUserRequestBody';
import { AuthenticateUser } from '../../core/application/command/AuthenticateUser';

export function authenticationRouter(commandPublisher: CommandPublisher): express.Router {
  const postSetPassword = async (request: Request, response: Response) => {
    const requestBody: PostSetPasswordRequestBody = request.body;
    const { email, password } = requestBody;
    const commandResult = await commandPublisher.execute(new SetPassword(email, password));
    return commandResult.process(
      () => response.status(StatusCodes.OK).send(),
      (failureReason) => response.status(StatusCodes.BAD_REQUEST).json({ message: failureReason.message }),
    );
  };

  const authenticateUser = async (request: Request, response: Response) => {
    const requestBody: PostAuthenticateUserRequestBody = request.body;
    const { email, password } = requestBody;
    const commandResult = await commandPublisher.execute(new AuthenticateUser(email, password));
    return commandResult.process(
      (token: string) => response.status(StatusCodes.OK).send(token),
      (failureReason) => response.status(StatusCodes.BAD_REQUEST).json({ message: failureReason.message }),
    );
  };

  const router = express.Router();
  router.post('/passwords', postSetPassword);
  router.post('/token', authenticateUser);
  return router;
}
