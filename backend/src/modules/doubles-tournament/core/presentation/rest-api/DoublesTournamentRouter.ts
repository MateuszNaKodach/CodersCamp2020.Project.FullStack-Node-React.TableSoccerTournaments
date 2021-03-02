import { CommandPublisher } from '../../../../../shared/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { QueryPublisher } from '../../../../../shared/core/application/query/QueryBus';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { FindDoublesTournamentById, FindDoublesTournamentByIdResult } from '../../application/query/FindDoublesTournamentById';

export function doublesTournamentRouter(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
): express.Router {
  const getTournamentTeamsByTournamentId = async (request: Request, response: Response) => {
    const { tournamentId } = request.params;
    const queryResult = await queryPublisher.execute<FindDoublesTournamentByIdResult>(new FindDoublesTournamentById({ tournamentId }));
    if (!queryResult) {
      return response.status(StatusCodes.NOT_FOUND).json({ message: `Doubles tournament with id = ${tournamentId} not found!` });
    }
    return response.status(StatusCodes.OK).json(queryResult);
  };

  const router = express.Router();
  router.get(':tournamentId/teams', getTournamentTeamsByTournamentId);
  return router;
}
