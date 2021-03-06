import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import express, { Request, Response } from 'express';
import { PostMatchBody } from './request/PostMatchBody';
import { StartMatch } from '../../core/application/command/StartMatch';
import { StatusCodes } from 'http-status-codes';
import { FindMatchById, FindMatchByIdResult } from '../../core/application/query/FindMatchById';
import { Match } from '../../core/domain/Match';
import { MatchDto } from './response/MatchDto';

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

  const getMatchById = async (request: Request, response: Response) => {
    const { matchId } = request.params;
    const queryResult = await queryPublisher.execute<FindMatchByIdResult>(new FindMatchById({ matchId }));
    if (!queryResult) {
      return response.status(StatusCodes.NOT_FOUND).json({ message: `Match with id = ${matchId} was not found!` });
    }
    return response.status(StatusCodes.OK).json(toMatchDto(queryResult));
  };

  const router = express.Router();
  router.post('', postStartMatch);
  router.get('/:matchId', getMatchById);
  return router;
}

function toMatchDto(match: Match): MatchDto {
  return new MatchDto({
    matchId: match.matchId.raw,
    firstMatchSideId: match.firstMatchSideId.raw,
    secondMatchSideId: match.secondMatchSideId.raw,
  });
}
