import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import express, { Request, Response } from 'express';
import { PostMatchBody } from './request/PostMatchBody';
import { StartMatch } from '../../core/application/command/StartMatch';
import { StatusCodes } from 'http-status-codes';

export function matchRouter(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
): express.Router {
  const postStartMatch = async (request: Request, response: Response) => {
    const requestBody: PostMatchBody = request.body;
    const commandResult = await commandPublisher.execute(
      new StartMatch({
        matchId: requestBody.matchId,
        firstMatchSideId: requestBody.firstMatchSideId,
        secondMatchSideId: requestBody.secondMatchSideId,
      }),
    );
    return commandResult.process(
      () =>
        response
          .status(StatusCodes.CREATED)
          .json({
            matchId: requestBody.matchId,
            firstMatchSideId: requestBody.firstMatchSideId,
            secondMatchSideId: requestBody.secondMatchSideId,
          })
          .send(),
      (failureReason) => response.status(StatusCodes.BAD_REQUEST).json({ message: failureReason.message }),
    );
  };

  const router = express.Router();
  router.post('', postStartMatch);
  return router;
}
