import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import express, { Request, Response } from 'express';
import {
  FindTournamentTreeByTournamentId,
  FindTournamentTreeByTournamentIdResult,
} from '../../core/application/query/FindTournamentTreeByTournamentId';
import { StatusCodes } from 'http-status-codes';
import { TournamentTeamListDto } from '../../../doubles-tournament/presentation/rest-api/response/TournamentTeamListDto';
import { TournamentTreeDto } from './response/TournamentTreeDto';

export function tournamentTreeRouter(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
): express.Router {
  const getTournamentTreeById = async (request: Request, response: Response) => {
    const { tournamentId } = request.params;
    const queryResult = await queryPublisher.execute<FindTournamentTreeByTournamentIdResult>(
      new FindTournamentTreeByTournamentId({ tournamentId: tournamentId }),
    );
    if (!queryResult) {
      return response.status(StatusCodes.NOT_FOUND).json({
        message: `Tournament tree in tournament with id = ${tournamentId} not found, because tournament with such id doesn't exist!`,
      });
    }

    const x = response
      .status(StatusCodes.OK)
      .json(new TournamentTreeDto(queryResult.tournamentId, queryResult.tournamentTreeArray, queryResult?.tournamentTeams));

    console.log(x);
    return x;
  };

  const router = express.Router();
  router.get('/:tournamentId/tree', getTournamentTreeById);
  return router;
}

// function toTournamentTree
