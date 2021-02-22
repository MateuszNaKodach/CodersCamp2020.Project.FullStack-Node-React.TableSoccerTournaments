import express from 'express';
import { CommandBus } from '../../../../shared/core/application/command/CommandBus';
import { QueryBus } from '../../../../shared/core/application/query/QueryBus';
import { DomainEventBus } from '../../../../shared/core/application/event/DomainEventBus';

export const authenticationRouter = (commandBus: CommandBus, eventBus: DomainEventBus, queryBus: QueryBus) => {
  const router = express.Router();

  return router;
};
