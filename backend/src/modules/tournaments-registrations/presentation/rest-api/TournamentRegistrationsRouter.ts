import express, { Request, Response } from "express";
import { CommandPublisher } from "../../../../shared/core/application/command/CommandBus";
import { QueryPublisher } from "../../../../shared/core/application/query/QueryBus";
import { DomainEventPublisher } from "../../../../shared/core/application/event/DomainEventBus";
import { OpenTournamentRegistrations } from "../../core/application/command/OpenTournamentRegistrations";
import { StatusCodes } from "http-status-codes";
import { EntityIdGenerator } from "../../../../shared/core/application/EntityIdGenerator";
import { PostRegisterPlayerForTournamentRequestBody } from "./request/PostRegisterPlayerForTournamentRequestBody";
import { RegisterPlayerForTournament } from "../../core/application/command/RegisterPlayerForTournament";

export const tournamentRegistrationsRouter = (
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
  entityIdGenerator: EntityIdGenerator,
) => {
  const postOpenTournamentRegistrations = async (request: Request, response: Response) => {
    const tournamentId = entityIdGenerator.generate();
    const commandResult = await commandPublisher.execute(new OpenTournamentRegistrations({ tournamentId }));
    commandResult.process(
      () => response.status(StatusCodes.CREATED).send(),
      (failureReason) => response.status(StatusCodes.BAD_REQUEST).json({ message: failureReason.message }).send(),
    );
  };

  const postRegisterPlayerForTournament = async (request: Request, response: Response) => {
    const requestBody: PostRegisterPlayerForTournamentRequestBody = request.body;
    const { tournamentId } = request.params;
    const commandResult = await commandPublisher.execute(new RegisterPlayerForTournament({ tournamentId, playerId: requestBody.playerId }));
    commandResult.process(
      () => response.status(StatusCodes.OK).send(),
      (failureReason) => response.status(StatusCodes.BAD_REQUEST).json({ message: failureReason.message }).send(),
    );
  };

  const router = express.Router();
  router.post('', postOpenTournamentRegistrations);
  router.post('/:tournamentId/players', postRegisterPlayerForTournament);
  return router;
};
