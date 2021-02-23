import express, { Request, Response } from "express";
import { CommandPublisher } from "../../../../shared/core/application/command/CommandBus";
import { QueryPublisher } from "../../../../shared/core/application/query/QueryBus";
import { DomainEventPublisher } from "../../../../shared/core/application/event/DomainEventBus";
import { PostTournamentRegistrationsRequestBody } from "./request/PostTournamentRegistrationsRequestBody";
import { OpenTournamentRegistrations } from "../../core/application/command/OpenTournamentRegistrations";
import { StatusCodes } from "http-status-codes";
import { EntityIdGenerator } from "../../../../shared/core/application/EntityIdGenerator";

export const tournamentRegistrationsRouter = (
  commandPublisher: CommandPublisher,
  eventPublisher: DomainEventPublisher,
  queryPublisher: QueryPublisher,
  entityIdGenerator: EntityIdGenerator,
) => {
  const postTournamentRegistrations = async (request: Request, response: Response) => {
    const requestBody: PostTournamentRegistrationsRequestBody = request.body;
    const tournamentId = entityIdGenerator.generate();
    const commandResult = await commandPublisher.execute(new OpenTournamentRegistrations({ tournamentId }));
    commandResult.process(
      () => response.status(StatusCodes.CREATED).send(),
      (failureReason) => response.status(StatusCodes.BAD_REQUEST).json({ message: failureReason.message }).send(),
    );
  };

  const router = express.Router();
  router.post('', postTournamentRegistrations);
  return router;
};
