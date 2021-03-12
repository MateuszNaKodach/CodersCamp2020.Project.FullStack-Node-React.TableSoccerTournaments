import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { FindDoublesTournamentById, FindDoublesTournamentByIdResult } from '../../core/application/query/FindDoublesTournamentById';
import { DoublesTournament } from '../../core/domain/DoublesTournament';
import { TournamentTeamDto } from './response/TournamentTeamDto';
import { TournamentTeamListDto } from './response/TournamentTeamListDto';

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
    return response.status(StatusCodes.OK).json(new TournamentTeamListDto(toTournamentTeamDto(queryResult)));
  };

  const router = express.Router();
  router.get('/:tournamentId/teams', getTournamentTeamsByTournamentId);
  return router;
}

function toTournamentTeamDto(doublesTournament: DoublesTournament): TournamentTeamDto[] {
  return doublesTournament.tournamentTeams.map((team) => {
    return new TournamentTeamDto(team.teamId.raw, team.firstTeamPlayer, team.secondTeamPlayer);
  });
}
