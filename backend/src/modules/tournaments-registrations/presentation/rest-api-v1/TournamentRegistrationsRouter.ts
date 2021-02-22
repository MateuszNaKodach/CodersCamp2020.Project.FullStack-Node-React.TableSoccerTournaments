import express, { Request, Response } from 'express';
import { CommandBus } from '../../../shared/application/command/CommandBus';
import { QueryBus } from '../../../shared/application/query/QueryBus';
import { DomainEventBus } from '../../../shared/application/event/DomainEventBus';
import { PostTournamentRegistrationsRequestBody } from './request/PostTournamentRegistrationsRequestBody';
import { OpenTournamentRegistrations } from '../../core/application/command/OpenTournamentRegistrations';
import { StatusCodes } from 'http-status-codes';

export const tournamentRegistrationsRouter = (commandBus: CommandBus, eventBus: DomainEventBus, queryBus: QueryBus) => {
  const postTournamentRegistrations = async (request: Request, response: Response) => {
    const requestBody: PostTournamentRegistrationsRequestBody = request.body;
    const { tournamentId } = request.params;
    const commandResult = await commandBus.execute(new OpenTournamentRegistrations({ tournamentId }));
    commandResult.process(
      () => response.status(StatusCodes.CREATED).send(),
      (failureReason) => response.status(StatusCodes.BAD_REQUEST).json({ message: failureReason.message }).send(),
    );
  };

  const router = express.Router();
  router.post(':tournamentId', postTournamentRegistrations);
  return router;
};
