import express from 'express';
import { CommandBus } from '../../../shared/application/command/CommandBus';
import { QueryBus } from '../../../shared/application/query/QueryBus';
import { DomainEventBus } from '../../../shared/application/event/DomainEventBus';

export const authenticationRouter = (commandBus: CommandBus, eventBus: DomainEventBus, queryBus: QueryBus) => {
  const router = express.Router();

  return router;
};
