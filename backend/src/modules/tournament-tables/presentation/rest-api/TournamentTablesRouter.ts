import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import express, { Request, Response } from 'express';
import { AssignTournamentTables } from '../../core/application/command/AssignTournamentTables';
import { StatusCodes } from 'http-status-codes';
import { PostAssignTournamentTablesRequestBody } from './request/PostAssignTournamentTablesRequestBody';
import { FindTablesByTournamentId, FindTablesByTournamentIdResult } from '../../core/application/query/FindTablesByTournamentId';
import { TournamentTable } from '../../core/domain/TournamentTable';
import { TournamentTablesDto } from './response/TournamentTablesDto';

export function tournamentTablesRouter(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
): express.Router {
  const postAssignTournamentTables = async (request: Request, response: Response) => {
    const requestBody: PostAssignTournamentTablesRequestBody = request.body;
    const { tournamentId } = request.params;
    const commandResult = await commandPublisher.execute(new AssignTournamentTables(tournamentId, requestBody.tables));
    return commandResult.process(
      () => response.status(StatusCodes.OK).send(),
      (failureReason) => response.status(StatusCodes.BAD_REQUEST).json({ message: failureReason.message }),
    );
  };

  const getTablesAssignedToTournamentId = async (request: Request, response: Response) => {
    const { tournamentId } = request.params;
    const queryResult = await queryPublisher.execute<FindTablesByTournamentIdResult>(new FindTablesByTournamentId({ tournamentId }));
    return queryResult
      ? response.status(StatusCodes.OK).json(toTournamentTablesDto(queryResult))
      : response.status(StatusCodes.NOT_FOUND).json({ message: 'Tables for given tournament not found!' });
  };

  const router = express.Router();
  router.post('/:tournamentId/tables', postAssignTournamentTables);
  router.get('/:tournamentId/tables', getTablesAssignedToTournamentId);
  return router;
}

function toTournamentTablesDto(tournamentTables: TournamentTable[]): TournamentTablesDto {
  return new TournamentTablesDto(
    tournamentTables.map((table) => {
      return {
        tableNumber: table.tableNumber.raw,
        tableName: table.tableName,
        availableToPlay: table.availableToPlay,
      };
    }),
  );
}
