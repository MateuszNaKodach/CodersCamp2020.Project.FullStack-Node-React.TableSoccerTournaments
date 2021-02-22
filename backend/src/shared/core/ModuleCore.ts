import { EventHandler } from './application/event/EventHandler';
import { QueryHandler } from './application/query/QueryHandler';
import { CommandHandler } from './application/command/CommandHandler';
import { HasConstructor } from '../../common/HasConstructor';

export type ModuleCore = {
  commandHandlers: { commandType: HasConstructor; handler: CommandHandler }[];
  eventHandlers: { eventType: HasConstructor; handler: EventHandler }[];
  queryHandlers: { queryType: HasConstructor; handler: QueryHandler }[];
};
