import express, { Request, Response } from 'express';
import { CommandPublisher } from '../../../../shared/core/application/command/CommandBus';
import { QueryPublisher } from '../../../../shared/core/application/query/QueryBus';
import { DomainEventPublisher } from '../../../../shared/core/application/event/DomainEventBus';
import { OpenTournamentRegistrations } from '../../core/application/command/OpenTournamentRegistrations';
import { StatusCodes } from 'http-status-codes';
import { EntityIdGenerator } from '../../../../shared/core/application/EntityIdGenerator';
import { PostRegisterPlayerForTournamentRequestBody } from './request/PostRegisterPlayerForTournamentRequestBody';
import { RegisterPlayerForTournament } from '../../core/application/command/RegisterPlayerForTournament';
import { CloseTournamentRegistrations } from '../../core/application/command/CloseTournamentRegistrations';
import {
  FindAllTournamentRegistrations,
  FindAllTournamentRegistrationsResult,
} from '../../core/application/query/FindAllTournamentRegistrations';
import { TournamentRegistrations } from '../../core/domain/TournamentRegistrations';
import { TournamentRegistrationsListDto } from './response/TournamentRegistrationsListDto';
import { TournamentRegistrationsDto } from './response/TournamentRegistrationsDto';
import {
  FindTournamentRegistrationsById,
  FindTournamentRegistrationsByIdResult,
} from '../../core/application/query/FindTournamentRegistrationsById';

export function tournamentRegistrationsRouter(
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
  entityIdGenerator: EntityIdGenerator,
): express.Router {
  const postOpenTournamentRegistrations = async (request: Request, response: Response) => {
    const tournamentId = entityIdGenerator.generate();
    const commandResult = await commandPublisher.execute(new OpenTournamentRegistrations({ tournamentId }));
    return commandResult.process(
      () => response.status(StatusCodes.CREATED).json({ tournamentId }).send(),
      (failureReason) => response.status(StatusCodes.BAD_REQUEST).json({ message: failureReason.message }),
    );
  };

  const postRegisterPlayerForTournament = async (request: Request, response: Response) => {
    const requestBody: PostRegisterPlayerForTournamentRequestBody = request.body;
    const { tournamentId } = request.params;
    const commandResult = await commandPublisher.execute(new RegisterPlayerForTournament({ tournamentId, playerId: requestBody.playerId }));
    return commandResult.process(
      () => response.status(StatusCodes.OK).send(),
      (failureReason) => response.status(StatusCodes.BAD_REQUEST).json({ message: failureReason.message }),
    );
  };

  const postCloseTournamentRegistrations = async (request: Request, response: Response) => {
    const { tournamentId } = request.params;
    const commandResult = await commandPublisher.execute(new CloseTournamentRegistrations({ tournamentId }));
    return commandResult.process(
      () => response.status(StatusCodes.OK).send(),
      (failureReason) => response.status(StatusCodes.BAD_REQUEST).json({ message: failureReason.message }),
    );
  };

  const getAllTournamentRegistrations = async (request: Request, response: Response) => {
    const queryResult = await queryPublisher.execute<FindAllTournamentRegistrationsResult>(new FindAllTournamentRegistrations());
    return response.status(StatusCodes.OK).json(new TournamentRegistrationsListDto(queryResult.map(toTournamentRegistrationsDto)));
  };

  const getTournamentRegistrationsById = async (request: Request, response: Response) => {
    const { tournamentId } = request.params;
    const queryResult = await queryPublisher.execute<FindTournamentRegistrationsByIdResult>(
      new FindTournamentRegistrationsById({ tournamentId }),
    );
    if (!queryResult) {
      return response.status(StatusCodes.NOT_FOUND).json({ message: `Tournament registrations with id = ${tournamentId} not found!` });
    }
    return response.status(StatusCodes.OK).json(toTournamentRegistrationsDto(queryResult));
  };

  const router = express.Router();
  router.post('', postOpenTournamentRegistrations);
  router.post('/:tournamentId/players', postRegisterPlayerForTournament);
  router.post('/:tournamentId/close', postCloseTournamentRegistrations);
  router.get('', getAllTournamentRegistrations);
  router.get('/:tournamentId', getTournamentRegistrationsById);
  return router;
}

function toTournamentRegistrationsDto(tournamentRegistrations: TournamentRegistrations): TournamentRegistrationsDto {
  return new TournamentRegistrationsDto(
    tournamentRegistrations.tournamentId.raw,
    tournamentRegistrations.status,
    tournamentRegistrations.registeredPlayers.map((playerId) => playerId.raw),
  );
}
