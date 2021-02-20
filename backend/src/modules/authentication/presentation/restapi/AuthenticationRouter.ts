import express from "express";
import {CommandBus} from "../../../shared/application/command/CommandBus";
import {QueryBus} from "../../../shared/application/query/QueryBus";

export const authenticationRouter = (
    commandBus: CommandBus,
    queryBus: QueryBus
) => {
  const router = express.Router();



  return router;
}
