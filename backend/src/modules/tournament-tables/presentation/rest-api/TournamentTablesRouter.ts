import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import express, { Request, Response } from 'express';
import { PostAssignTournamentTablesRequestBody } from './request/PostAssignTournamentTablesRequestBody';
import { AssignTournamentTables } from '../../core/application/command/AssignTournamentTables';
import { StatusCodes } from 'http-status-codes';

export function tournamentTablesRouter(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
): express.Router {
  const postAssignTournamentTables = async (request: Request, response: Response) => {
    const requestBody: PostAssignTournamentTablesRequestBody = request.body;
    const { tournamentId } = request.params;
    const commandResult = await commandPublisher.execute(new AssignTournamentTables(tournamentId, requestBody.tablesList));
    return commandResult.process(
      () => response.status(StatusCodes.OK).send(),
      (failureReason) => response.status(StatusCodes.BAD_REQUEST).json({ message: failureReason.message }),
    );
  };

  const router = express.Router();
  router.post('/:tournamentId/tables', postAssignTournamentTables);
  return router;
}
