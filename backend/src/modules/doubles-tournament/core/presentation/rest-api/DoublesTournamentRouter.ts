import { CommandPublisher } from '../../../../../shared/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../../shared/core/application/event/DomainEventBus';
import { QueryPublisher } from '../../../../../shared/core/application/query/QueryBus';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { FindDoublesTournamentById, FindDoublesTournamentByIdResult } from '../../application/query/FindDoublesTournamentById';
import { DoublesTournament } from '../../domain/DoublesTournament';
import { TournamentTeamDto } from './response/TournamentTeamDto';
import { TournamentTeamListDto } from './response/TournamentTeamListDto';
import {
  FindMatchesQueueByTournamentById,
  FindMatchesQueueByTournamentByIdResult,
} from '../../application/query/FindMatchesQueueByTournamentId';
import { MatchesQueueDto } from './response/MatchesQueueDto';

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

  const getMatchesQueueByTournamentId = async (request: Request, response: Response) => {
    const { tournamentId } = request.params;
    const queryResult = await queryPublisher.execute<FindMatchesQueueByTournamentByIdResult>(
      new FindMatchesQueueByTournamentById({ tournamentId }),
    );
    if (!queryResult) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `Such Matches queue doesn't exist because doubles tournament with id = ${tournamentId} is not found!` });
    }
    const matchesQueueWithPrimitiveTypes = queryResult.queuedMatches.map((match) => ({
      matchNumber: match.matchNumber.raw,
      team1Id: match.team1Id.raw,
      team2Id: match.team2Id.raw,
    }));
    return response.status(StatusCodes.OK).json(new MatchesQueueDto(queryResult.tournamentId.raw, matchesQueueWithPrimitiveTypes));
  };

  const router = express.Router();
  router.get('/:tournamentId/teams', getTournamentTeamsByTournamentId);
  router.get('/:tournamentId/matches', getMatchesQueueByTournamentId);
  return router;
}

function toTournamentTeamDto(doublesTournament: DoublesTournament): TournamentTeamDto[] {
  return doublesTournament.tournamentTeams.map((team) => {
    return new TournamentTeamDto(team.teamId.raw, team.firstTeamPlayer, team.secondTeamPlayer);
  });
}
