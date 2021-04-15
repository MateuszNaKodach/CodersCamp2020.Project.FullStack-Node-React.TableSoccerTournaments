import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { FindDoublesTournamentById, FindDoublesTournamentByIdResult } from '../../core/application/query/FindDoublesTournamentById';
import { DoublesTournament } from '../../core/domain/DoublesTournament';
import { TournamentTeamDto } from './response/TournamentTeamDto';
import { TournamentTeamListDto } from './response/TournamentTeamListDto';
import { MatchesQueueDto } from './response/MatchesQueueDto';
import {
  FindMatchesQueueByTournamentId,
  FindMatchesQueueByTournamentIdResult,
} from '../../core/application/query/FindMatchesQueueByTournamentId';
import { QueuedMatchDto } from './response/QueuedMatchDto';
import { FindAllDoublesTournaments, FindAllDoublesTournamentsResult } from '../../core/application/query/FindAllDoublesTournaments';
import { TournamentListDto } from './response/TournamentListDto';
import { TournamentDto } from './response/TournamentDto';
import { StartTournament } from '../../core/application/command/StartTournament';
import {TournamentPlaceDto, TournamentPlaceListDto} from "./response/TournamentPlacesListDto";

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
    const queryResult = await queryPublisher.execute<FindMatchesQueueByTournamentIdResult>(
      new FindMatchesQueueByTournamentId({ tournamentId }),
    );
    if (!queryResult) {
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `Such Matches queue doesn't exist because doubles tournament with id = ${tournamentId} is not found!` });
    }
    const queuedMatchesDto: QueuedMatchDto[] = queryResult.queuedMatches.map((match) => ({
      matchNumber: match.matchNumber.raw,
      team1Id: match.team1Id.raw,
      team2Id: match.team2Id.raw,
      status: match.status,
      tableNumber: match.tableNumber,
    }));
    return response.status(StatusCodes.OK).json(new MatchesQueueDto(queryResult.tournamentId.raw, queuedMatchesDto));
  };

  const getAllTournaments = async (request: Request, response: Response) => {
    const queryResult = await queryPublisher.execute<FindAllDoublesTournamentsResult>(new FindAllDoublesTournaments());
    return response.status(StatusCodes.OK).json(new TournamentListDto(queryResult.map(toTournamentDto)));
  };

  const startTournament = async (request: Request, response: Response) => {
    const { tournamentId } = request.params;
    const commandResult = await commandPublisher.execute(new StartTournament({ tournamentId }));
    return commandResult.process(
      () => response.status(StatusCodes.ACCEPTED).json({ message: 'Tournament was started.' }).send(),
      (failureReason) => response.status(StatusCodes.BAD_REQUEST).json({ message: failureReason.message }),
    );
  };

  const getTournamentPlacesByTournamentId = async (request: Request, response: Response) => {
    const { tournamentId } = request.params;
    const queryResult = await queryPublisher.execute<FindDoublesTournamentByIdResult>(new FindDoublesTournamentById({ tournamentId }));
    if (!queryResult) {
      return response.status(StatusCodes.NOT_FOUND).json({ message: `Doubles tournament with id = ${tournamentId} not found!` });
    }
    return response.status(StatusCodes.OK).json(new TournamentPlaceListDto(toTournamentPlaceDto(queryResult)));
  };

  const router = express.Router();
  router.get('', getAllTournaments);
  router.get('/:tournamentId', getAllTournaments);
  router.post('/:tournamentId/start', startTournament);
  router.get('/:tournamentId/teams', getTournamentTeamsByTournamentId);
  router.get('/:tournamentId/matches', getMatchesQueueByTournamentId);
  router.get('/:tournamentId/places', getTournamentPlacesByTournamentId);
  return router;
}

function toTournamentTeamDto(doublesTournament: DoublesTournament): TournamentTeamDto[] {
  return doublesTournament.tournamentTeams.map((team) => {
    return new TournamentTeamDto(team.teamId.raw, team.firstTeamPlayer, team.secondTeamPlayer);
  });
}

function toTournamentPlaceDto(doublesTournament: DoublesTournament): TournamentPlaceDto[] {
  return doublesTournament.places.map((place) => {
    return new TournamentPlaceDto(place.placeNumber, place.teamId.raw);
  });
}

function toTournamentDto(tournament: DoublesTournament): TournamentDto {
  const tournamentTeams = new TournamentTeamListDto(toTournamentTeamDto(tournament));
  return new TournamentDto(tournament.tournamentId, tournamentTeams, tournament.status);
}
