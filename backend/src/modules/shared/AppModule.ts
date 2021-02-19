import {EventHandler} from "./application/event/EventHandler";
import {QueryHandler} from "./application/query/QueryHandler";
import {CommandHandler} from "./application/command/CommandHandler";

export type AppModule = {
  commandHandlers: CommandHandler[],
  eventHandlers: EventHandler[],
  queryHandlers: QueryHandler[]
}
